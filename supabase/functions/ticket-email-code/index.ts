import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

/*
 * Supabase Edge Function: ticket-email-code
 *
 * Actions:
 *   { action: 'send',   email: 'user@tha.de' }
 *   { action: 'verify', email: 'user@tha.de', code: '123456' }
 *
 * Required Edge Function secrets (Supabase Dashboard → Project Settings → Edge Functions → Secrets):
 *   RESEND_API_KEY      – your Resend API key
 *   RESEND_FROM_EMAIL   – sender address (e.g. "noreply@yourdomain.de"), must be a verified Resend domain
 *   SUPABASE_URL        – injected automatically by Supabase
 *   SUPABASE_SERVICE_ROLE_KEY – injected automatically by Supabase
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, apikey, authorization',
}

const CODE_TTL_SECONDS = 10 * 60        // 10 minutes
const COOLDOWN_SECONDS  = 60             // 60 second re-send cooldown
const CODE_LENGTH       = 6
const MAX_ATTEMPTS      = 5              // max wrong guesses per code
const ALLOWED_EMAIL_PATTERN = /^[^\s@]+@tha\.de$/i

// ── Helpers ──────────────────────────────────────────────────────────────────

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  })

const fail = (message: string, status = 400) =>
  jsonResponse({ success: false, message }, status)

const generateCode = (): string => {
  const digits = new Uint8Array(CODE_LENGTH)
  crypto.getRandomValues(digits)
  return Array.from(digits).map((b) => String(b % 10)).join('')
}

const normalizeEmail = (email: string): string =>
  email.trim().toLowerCase().slice(0, 120)

// ── Main handler ─────────────────────────────────────────────────────────────

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS })
  }

  if (req.method !== 'POST') {
    return fail('Method not allowed.', 405)
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return fail('Ungültiger JSON-Body.')
  }

  const action = String(body?.action || '').trim()
  const email  = normalizeEmail(String(body?.email || ''))

  if (!ALLOWED_EMAIL_PATTERN.test(email)) {
    return fail('Nur @tha.de E-Mail-Adressen sind erlaubt.')
  }

  // Service-role Supabase client for DB access
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    { auth: { persistSession: false } },
  )

  // ── ACTION: send ──────────────────────────────────────────────────────────
  if (action === 'send') {
    // Check cooldown
    const { data: existing } = await supabase
      .from('ticket_email_codes')
      .select('created_at')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (existing?.created_at) {
      const ageMs = Date.now() - new Date(existing.created_at).getTime()
      if (ageMs < COOLDOWN_SECONDS * 1000) {
        const remainingSec = Math.ceil((COOLDOWN_SECONDS * 1000 - ageMs) / 1000)
        return fail(`Bitte ${remainingSec}s warten, bevor du erneut einen Code anforderst.`, 429)
      }
    }

    // Delete old codes for this email
    await supabase.from('ticket_email_codes').delete().eq('email', email)

    // Generate & store new code
    const code = generateCode()
    const expiresAt = new Date(Date.now() + CODE_TTL_SECONDS * 1000).toISOString()

    const { error: insertError } = await supabase.from('ticket_email_codes').insert({
      email,
      code,
      expires_at: expiresAt,
      attempts: 0,
    })

    if (insertError) {
      console.error('DB insert error:', insertError.message)
      return fail('Interner Fehler beim Speichern des Codes.', 500)
    }

    // Send email via Resend
    const resendApiKey  = Deno.env.get('RESEND_API_KEY') ?? ''
    const resendFrom    = Deno.env.get('RESEND_FROM_EMAIL') ?? 'noreply@swiss-ticket.de'

    if (!resendApiKey) {
      console.error('RESEND_API_KEY nicht gesetzt.')
      return fail('E-Mail-Service nicht konfiguriert.', 500)
    }

    const emailBody = `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"></head>
<body style="font-family:sans-serif;background:#111;color:#fff;margin:0;padding:2rem;">
  <div style="max-width:36rem;margin:auto;border:1px solid rgba(255,255,255,.15);border-radius:.75rem;padding:2rem;">
    <h1 style="font-size:1.2rem;letter-spacing:.05em;margin-bottom:1rem;">SWISS TICKET – VERIFIZIERUNGS-CODE</h1>
    <p style="color:rgba(255,255,255,.75);">Dein Einmal-Code zum Erstellen eines Tickets:</p>
    <p style="font-size:2.2rem;font-weight:700;letter-spacing:.25em;margin:.75rem 0;">${code}</p>
    <p style="font-size:.85rem;color:rgba(255,255,255,.5);">
      Dieser Code gilt 10 Minuten und kann nur einmal verwendet werden.<br>
      Falls du diesen Code nicht angefordert hast, ignoriere diese E-Mail.
    </p>
  </div>
</body>
</html>`.trim()

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: resendFrom,
        to: [email],
        subject: `${code} – Dein SWISS Ticket Verifizierungs-Code`,
        html: emailBody,
      }),
    })

    if (!resendResponse.ok) {
      const resendBody = await resendResponse.text().catch(() => '')
      console.error('Resend error:', resendResponse.status, resendBody)
      return fail('E-Mail konnte nicht gesendet werden. Bitte später erneut versuchen.', 502)
    }

    return jsonResponse({
      success: true,
      message: 'Code wurde per E-Mail versendet.',
      cooldownMs: COOLDOWN_SECONDS * 1000,
    })
  }

  // ── ACTION: verify ────────────────────────────────────────────────────────
  if (action === 'verify') {
    const enteredCode = String(body?.code || '').trim()

    if (!/^\d{6}$/.test(enteredCode)) {
      return fail('Bitte einen 6-stelligen Code eingeben.')
    }

    const { data: row, error: selectError } = await supabase
      .from('ticket_email_codes')
      .select('id, code, expires_at, attempts')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (selectError || !row) {
      return fail('Kein Code für diese E-Mail gefunden. Bitte zuerst Code anfordern.')
    }

    if (new Date(row.expires_at) < new Date()) {
      await supabase.from('ticket_email_codes').delete().eq('id', row.id)
      return fail('Code ist abgelaufen. Bitte neuen Code anfordern.')
    }

    if (row.attempts >= MAX_ATTEMPTS) {
      await supabase.from('ticket_email_codes').delete().eq('id', row.id)
      return fail('Zu viele Fehlversuche. Bitte neuen Code anfordern.')
    }

    if (row.code !== enteredCode) {
      await supabase
        .from('ticket_email_codes')
        .update({ attempts: row.attempts + 1 })
        .eq('id', row.id)
      return fail('Code ist ungültig.')
    }

    // Mark as used – delete so it cannot be reused
    await supabase.from('ticket_email_codes').delete().eq('id', row.id)

    return jsonResponse({
      success: true,
      message: 'E-Mail erfolgreich verifiziert.',
    })
  }

  return fail('Unbekannte Aktion.')
})
