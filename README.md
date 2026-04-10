# SWISS Ticket

SWISS Ticket ist ein webbasiertes Ticket-Portal mit:

- Ticket-Erstellung durch Studierende
- Admin-Login und Ticket-Board (Kanban-Ansicht)
- E-Mail-Verifizierung per 6-stelligem Code (@tha.de)
- Supabase als Datenbank und Backend (inkl. Edge Function)

## Aktueller Funktionsumfang

### Navigation und UI

- Responsive Navigation mit Mobile-Menue
- Modale Dialoge fuer:
	- Anmeldung
	- Neues Ticket / Ticket bearbeiten
	- Ticketdetails
- Zeichenzaehler auf Feldern mit `maxlength`
- Deadline-Eingabe mit Kalenderauswahl und Validierung (TT.MM.JJJJ)

### Authentifizierung (Client-seitig)

- Login mit Nutzername oder E-Mail + Passwort
- Admin-Session wird in `localStorage` gespeichert
- Session-Laufzeit: 7 Tage
- Admin sieht zusaetzlich den Menuepunkt `Alle Tickets`

Hinweis: Der aktuelle Login basiert auf lokal im Frontend hinterlegten Admin-Benutzern.

### Ticket-Workflow

- Neues Ticket erstellen
- Pflichtfelder inkl. E-Mail-Check auf `@tha.de`
- E-Mail muss vor Ticket-Erstellung verifiziert sein (nur bei neuem Ticket)
- Ticketstatus im Board:
	- Offen
	- In Bearbeitung
	- Geschlossen
- Ticketdetails anzeigen
- Admin kann Tickets aus `Offen` in `In Bearbeitung` und danach in `Geschlossen` ueberfuehren
- Mobile Pull-to-Refresh im Admin-Board

### Datenhaltung und Validierung

- Tickets werden aus Supabase geladen und in die App-Struktur gemappt
- Erstellen/Aktualisieren erfolgt ueber Supabase-Queries
- Eingaben werden vor Persistenz validiert/sanitized
- SQL-Musterfilter im Frontend als zusaetzlicher Schutzlayer

## Projektstruktur

```text
.
|- index.html
|- README.md
|- assets/
|  |- css/
|  |  |- styles.css
|  |- img/
|  |- js/
|  |  |- main.js
|  |- scss/
|     |- styles.scss
|     |- base/
|     |- components/
|     |- config/
|     |- layout/
|- supabase/
	 |- functions/
	 |  |- ticket-email-code/
	 |     |- index.ts
	 |- migrations/
			|- 20260410000000_ticket_email_codes.sql
```

## Supabase Edge Function: ticket-email-code

Datei: `supabase/functions/ticket-email-code/index.ts`

Die Function stellt zwei Aktionen bereit:

- `send`: erzeugt einen Code und versendet ihn per E-Mail
- `verify`: prueft den eingegebenen Code

Regeln laut aktuellem Stand:

- Nur `@tha.de` E-Mails erlaubt
- Code-Laenge: 6 Ziffern
- Gueltigkeit: 10 Minuten
- Cooldown fuer erneutes Senden: 60 Sekunden
- Max. Fehlversuche: 5
- Nach erfolgreicher Verifizierung wird der Code geloescht (One-Time-Use)

### Erforderliche Secrets (Supabase)

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `SUPABASE_URL` (normalerweise automatisch vorhanden)
- `SUPABASE_SERVICE_ROLE_KEY` (normalerweise automatisch vorhanden)

## Migration

Datei: `supabase/migrations/20260410000000_ticket_email_codes.sql`

Erstellt die Tabelle `ticket_email_codes` mit:

- `email`, `code`, `expires_at`, `attempts`, `created_at`
- Index auf `(email, created_at desc)`
- Row Level Security aktiviert

## Lokales Starten

Da es sich um ein statisches Frontend handelt:

1. Projekt lokal oeffnen
2. `index.html` im Browser laden

Fuer volle Funktionalitaet (DB + E-Mail-Verifizierung) muss Supabase korrekt konfiguriert sein.

## Aktuelle technische Hinweise

- Supabase URL und Anon Key sind aktuell im Frontend (`assets/js/main.js`) gesetzt.
- Admin-Benutzer sind aktuell ebenfalls im Frontend definiert.
- Fuer Produktion sollten Zugangsdaten/Secrets nicht client-seitig hardcodiert werden.
