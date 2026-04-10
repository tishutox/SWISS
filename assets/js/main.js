/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Menu hidden */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}

/*=============== LOGIN MODAL ===============*/
const loginOpen = document.getElementById('nav-login'),
   ticketOpen = document.getElementById('nav-new-ticket'),
   allTicketsItem = document.getElementById('nav-all-tickets-item'),
   allTicketsLink = document.getElementById('nav-all-tickets'),
   authSessionNote = document.getElementById('auth-session-note'),
   homeContent = document.getElementById('home-content'),
   adminTicketBoard = document.getElementById('admin-ticket-board'),
   boardPullIndicator = document.getElementById('board-pull-indicator'),
   ticketColumnOffen = document.getElementById('ticket-column-offen'),
   ticketColumnInBearbeitung = document.getElementById('ticket-column-in-bearbeitung'),
   ticketColumnErledigt = document.getElementById('ticket-column-erledigt'),
   ticketDetailModal = document.getElementById('ticket-detail-modal'),
   ticketDetailClose = document.getElementById('ticket-detail-close'),
   ticketDetailContent = document.getElementById('ticket-detail-content'),
   ticketDetailEdit = document.getElementById('ticket-detail-edit'),
   ticketDetailComplete = document.getElementById('ticket-detail-complete'),
      authModal = document.getElementById('auth-modal'),
      authClose = document.getElementById('auth-close'),
      authForm = document.getElementById('auth-form'),
      authMessage = document.getElementById('auth-message'),
      authIdentifier = document.getElementById('auth-identifier'),
   authPassword = document.getElementById('auth-password'),
   ticketModal = document.getElementById('ticket-modal'),
   ticketClose = document.getElementById('ticket-close'),
   ticketForm = document.getElementById('ticket-form'),
   ticketMessage = document.getElementById('ticket-message-feedback'),
   ticketEmail = document.getElementById('ticket-email'),
   ticketDeadline = document.getElementById('ticket-deadline'),
   ticketDeadlineButton = document.getElementById('ticket-deadline-button'),
   ticketDeadlineCalendar = document.getElementById('ticket-deadline-calendar'),
   ticketCalendarPrev = document.getElementById('ticket-calendar-prev'),
   ticketCalendarNext = document.getElementById('ticket-calendar-next'),
   ticketCalendarTitle = document.getElementById('ticket-calendar-title'),
   ticketCalendarDays = document.getElementById('ticket-calendar-days'),
   ticketCountryCode = document.getElementById('ticket-country-code'),
   ticketFirstInput = document.getElementById('ticket-firstname'),
   ticketTitleHeading = document.getElementById('ticket-title'),
   ticketSubtitle = document.querySelector('.ticket-modal__subtitle'),
   ticketSubmitButton = ticketForm?.querySelector('.ticket-modal__submit')

let currentUser = null
let boardViewActive = false
let activeTicketId = null
let editingTicketId = null
let ticketsCache = []
let isPullingBoard = false
let boardPullStartY = 0
let boardPullDistance = 0
let isBoardRefreshing = false

const SUPABASE_URL = 'https://vuqrjvnitgmigykrkpfj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1cXJqdm5pdGdtaWd5a3JrcGZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMzI4MzUsImV4cCI6MjA4ODkwODgzNX0.necblqCSqzKv2shs9SuO6Qr3ys-TU4DS4tYNUKHAvvk'
const supabaseClient = window.supabase?.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const TICKET_STATUS_OPEN = 'offen'
const TICKET_STATUS_IN_PROGRESS = 'in-bearbeitung'
const TICKET_STATUS_DONE = 'geschlossen'
const AUTH_SESSION_STORAGE_KEY = 'swiss_auth_session'
const AUTH_SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

const countryCallingCodes = [
   { country: 'Afghanistan', code: '+93' },
   { country: 'Albania', code: '+355' },
   { country: 'Algeria', code: '+213' },
   { country: 'Andorra', code: '+376' },
   { country: 'Angola', code: '+244' },
   { country: 'Antigua and Barbuda', code: '+1-268' },
   { country: 'Argentina', code: '+54' },
   { country: 'Armenia', code: '+374' },
   { country: 'Australia', code: '+61' },
   { country: 'Austria', code: '+43' },
   { country: 'Azerbaijan', code: '+994' },
   { country: 'Bahamas', code: '+1-242' },
   { country: 'Bahrain', code: '+973' },
   { country: 'Bangladesh', code: '+880' },
   { country: 'Barbados', code: '+1-246' },
   { country: 'Belarus', code: '+375' },
   { country: 'Belgium', code: '+32' },
   { country: 'Belize', code: '+501' },
   { country: 'Benin', code: '+229' },
   { country: 'Bhutan', code: '+975' },
   { country: 'Bolivia', code: '+591' },
   { country: 'Bosnia and Herzegovina', code: '+387' },
   { country: 'Botswana', code: '+267' },
   { country: 'Brazil', code: '+55' },
   { country: 'Brunei', code: '+673' },
   { country: 'Bulgaria', code: '+359' },
   { country: 'Burkina Faso', code: '+226' },
   { country: 'Burundi', code: '+257' },
   { country: 'Cambodia', code: '+855' },
   { country: 'Cameroon', code: '+237' },
   { country: 'Canada', code: '+1' },
   { country: 'Cape Verde', code: '+238' },
   { country: 'Central African Republic', code: '+236' },
   { country: 'Chad', code: '+235' },
   { country: 'Chile', code: '+56' },
   { country: 'China', code: '+86' },
   { country: 'Colombia', code: '+57' },
   { country: 'Comoros', code: '+269' },
   { country: 'Congo', code: '+242' },
   { country: 'Costa Rica', code: '+506' },
   { country: 'Croatia', code: '+385' },
   { country: 'Cuba', code: '+53' },
   { country: 'Cyprus', code: '+357' },
   { country: 'Czech Republic', code: '+420' },
   { country: 'Denmark', code: '+45' },
   { country: 'Djibouti', code: '+253' },
   { country: 'Dominica', code: '+1-767' },
   { country: 'Dominican Republic', code: '+1-809' },
   { country: 'East Timor', code: '+670' },
   { country: 'Ecuador', code: '+593' },
   { country: 'Egypt', code: '+20' },
   { country: 'El Salvador', code: '+503' },
   { country: 'Equatorial Guinea', code: '+240' },
   { country: 'Eritrea', code: '+291' },
   { country: 'Estonia', code: '+372' },
   { country: 'Eswatini', code: '+268' },
   { country: 'Ethiopia', code: '+251' },
   { country: 'Fiji', code: '+679' },
   { country: 'Finland', code: '+358' },
   { country: 'France', code: '+33' },
   { country: 'Gabon', code: '+241' },
   { country: 'Gambia', code: '+220' },
   { country: 'Georgia', code: '+995' },
   { country: 'Germany', code: '+49' },
   { country: 'Ghana', code: '+233' },
   { country: 'Greece', code: '+30' },
   { country: 'Grenada', code: '+1-473' },
   { country: 'Guatemala', code: '+502' },
   { country: 'Guinea', code: '+224' },
   { country: 'Guinea-Bissau', code: '+245' },
   { country: 'Guyana', code: '+592' },
   { country: 'Haiti', code: '+509' },
   { country: 'Honduras', code: '+504' },
   { country: 'Hungary', code: '+36' },
   { country: 'Iceland', code: '+354' },
   { country: 'India', code: '+91' },
   { country: 'Indonesia', code: '+62' },
   { country: 'Iran', code: '+98' },
   { country: 'Iraq', code: '+964' },
   { country: 'Ireland', code: '+353' },
   { country: 'Israel', code: '+972' },
   { country: 'Italy', code: '+39' },
   { country: 'Ivory Coast', code: '+225' },
   { country: 'Jamaica', code: '+1-876' },
   { country: 'Japan', code: '+81' },
   { country: 'Jordan', code: '+962' },
   { country: 'Kazakhstan', code: '+7' },
   { country: 'Kenya', code: '+254' },
   { country: 'Kiribati', code: '+686' },
   { country: 'Kuwait', code: '+965' },
   { country: 'Kyrgyzstan', code: '+996' },
   { country: 'Laos', code: '+856' },
   { country: 'Latvia', code: '+371' },
   { country: 'Lebanon', code: '+961' },
   { country: 'Lesotho', code: '+266' },
   { country: 'Liberia', code: '+231' },
   { country: 'Libya', code: '+218' },
   { country: 'Liechtenstein', code: '+423' },
   { country: 'Lithuania', code: '+370' },
   { country: 'Luxembourg', code: '+352' },
   { country: 'Madagascar', code: '+261' },
   { country: 'Malawi', code: '+265' },
   { country: 'Malaysia', code: '+60' },
   { country: 'Maldives', code: '+960' },
   { country: 'Mali', code: '+223' },
   { country: 'Malta', code: '+356' },
   { country: 'Marshall Islands', code: '+692' },
   { country: 'Mauritania', code: '+222' },
   { country: 'Mauritius', code: '+230' },
   { country: 'Mexico', code: '+52' },
   { country: 'Micronesia', code: '+691' },
   { country: 'Moldova', code: '+373' },
   { country: 'Monaco', code: '+377' },
   { country: 'Mongolia', code: '+976' },
   { country: 'Montenegro', code: '+382' },
   { country: 'Morocco', code: '+212' },
   { country: 'Mozambique', code: '+258' },
   { country: 'Myanmar', code: '+95' },
   { country: 'Namibia', code: '+264' },
   { country: 'Nauru', code: '+674' },
   { country: 'Nepal', code: '+977' },
   { country: 'Netherlands', code: '+31' },
   { country: 'New Zealand', code: '+64' },
   { country: 'Nicaragua', code: '+505' },
   { country: 'Niger', code: '+227' },
   { country: 'Nigeria', code: '+234' },
   { country: 'North Korea', code: '+850' },
   { country: 'North Macedonia', code: '+389' },
   { country: 'Norway', code: '+47' },
   { country: 'Oman', code: '+968' },
   { country: 'Pakistan', code: '+92' },
   { country: 'Palau', code: '+680' },
   { country: 'Palestine', code: '+970' },
   { country: 'Panama', code: '+507' },
   { country: 'Papua New Guinea', code: '+675' },
   { country: 'Paraguay', code: '+595' },
   { country: 'Peru', code: '+51' },
   { country: 'Philippines', code: '+63' },
   { country: 'Poland', code: '+48' },
   { country: 'Portugal', code: '+351' },
   { country: 'Qatar', code: '+974' },
   { country: 'Romania', code: '+40' },
   { country: 'Russia', code: '+7' },
   { country: 'Rwanda', code: '+250' },
   { country: 'Saint Kitts and Nevis', code: '+1-869' },
   { country: 'Saint Lucia', code: '+1-758' },
   { country: 'Saint Vincent and the Grenadines', code: '+1-784' },
   { country: 'Samoa', code: '+685' },
   { country: 'San Marino', code: '+378' },
   { country: 'Sao Tome and Principe', code: '+239' },
   { country: 'Saudi Arabia', code: '+966' },
   { country: 'Senegal', code: '+221' },
   { country: 'Serbia', code: '+381' },
   { country: 'Seychelles', code: '+248' },
   { country: 'Sierra Leone', code: '+232' },
   { country: 'Singapore', code: '+65' },
   { country: 'Slovakia', code: '+421' },
   { country: 'Slovenia', code: '+386' },
   { country: 'Solomon Islands', code: '+677' },
   { country: 'Somalia', code: '+252' },
   { country: 'South Africa', code: '+27' },
   { country: 'South Korea', code: '+82' },
   { country: 'South Sudan', code: '+211' },
   { country: 'Spain', code: '+34' },
   { country: 'Sri Lanka', code: '+94' },
   { country: 'Sudan', code: '+249' },
   { country: 'Suriname', code: '+597' },
   { country: 'Sweden', code: '+46' },
   { country: 'Switzerland', code: '+41' },
   { country: 'Syria', code: '+963' },
   { country: 'Taiwan', code: '+886' },
   { country: 'Tajikistan', code: '+992' },
   { country: 'Tanzania', code: '+255' },
   { country: 'Thailand', code: '+66' },
   { country: 'Togo', code: '+228' },
   { country: 'Tonga', code: '+676' },
   { country: 'Trinidad and Tobago', code: '+1-868' },
   { country: 'Tunisia', code: '+216' },
   { country: 'Turkey', code: '+90' },
   { country: 'Turkmenistan', code: '+993' },
   { country: 'Tuvalu', code: '+688' },
   { country: 'Uganda', code: '+256' },
   { country: 'Ukraine', code: '+380' },
   { country: 'United Arab Emirates', code: '+971' },
   { country: 'United Kingdom', code: '+44' },
   { country: 'United States', code: '+1' },
   { country: 'Uruguay', code: '+598' },
   { country: 'Uzbekistan', code: '+998' },
   { country: 'Vanuatu', code: '+678' },
   { country: 'Vatican City', code: '+379' },
   { country: 'Venezuela', code: '+58' },
   { country: 'Vietnam', code: '+84' },
   { country: 'Yemen', code: '+967' },
   { country: 'Zambia', code: '+260' },
   { country: 'Zimbabwe', code: '+263' }
]

const countryNameDe = {
   Afghanistan: 'Afghanistan',
   Albania: 'Albanien',
   Algeria: 'Algerien',
   Andorra: 'Andorra',
   Angola: 'Angola',
   'Antigua and Barbuda': 'Antigua und Barbuda',
   Argentina: 'Argentinien',
   Armenia: 'Armenien',
   Australia: 'Australien',
   Austria: 'Österreich',
   Azerbaijan: 'Aserbaidschan',
   Bahamas: 'Bahamas',
   Bahrain: 'Bahrain',
   Bangladesh: 'Bangladesch',
   Barbados: 'Barbados',
   Belarus: 'Belarus',
   Belgium: 'Belgien',
   Belize: 'Belize',
   Benin: 'Benin',
   Bhutan: 'Bhutan',
   Bolivia: 'Bolivien',
   'Bosnia and Herzegovina': 'Bosnien und Herzegowina',
   Botswana: 'Botswana',
   Brazil: 'Brasilien',
   Brunei: 'Brunei',
   Bulgaria: 'Bulgarien',
   'Burkina Faso': 'Burkina Faso',
   Burundi: 'Burundi',
   Cambodia: 'Kambodscha',
   Cameroon: 'Kamerun',
   Canada: 'Kanada',
   'Cape Verde': 'Kap Verde',
   'Central African Republic': 'Zentralafrikanische Republik',
   Chad: 'Tschad',
   Chile: 'Chile',
   China: 'China',
   Colombia: 'Kolumbien',
   Comoros: 'Komoren',
   Congo: 'Kongo',
   'Costa Rica': 'Costa Rica',
   Croatia: 'Kroatien',
   Cuba: 'Kuba',
   Cyprus: 'Zypern',
   'Czech Republic': 'Tschechien',
   Denmark: 'Dänemark',
   Djibouti: 'Dschibuti',
   Dominica: 'Dominica',
   'Dominican Republic': 'Dominikanische Republik',
   'East Timor': 'Osttimor',
   Ecuador: 'Ecuador',
   Egypt: 'Ägypten',
   'El Salvador': 'El Salvador',
   'Equatorial Guinea': 'Äquatorialguinea',
   Eritrea: 'Eritrea',
   Estonia: 'Estland',
   Eswatini: 'Eswatini',
   Ethiopia: 'Äthiopien',
   Fiji: 'Fidschi',
   Finland: 'Finnland',
   France: 'Frankreich',
   Gabon: 'Gabun',
   Gambia: 'Gambia',
   Georgia: 'Georgien',
   Germany: 'Deutschland',
   Ghana: 'Ghana',
   Greece: 'Griechenland',
   Grenada: 'Grenada',
   Guatemala: 'Guatemala',
   Guinea: 'Guinea',
   'Guinea-Bissau': 'Guinea-Bissau',
   Guyana: 'Guyana',
   Haiti: 'Haiti',
   Honduras: 'Honduras',
   Hungary: 'Ungarn',
   Iceland: 'Island',
   India: 'Indien',
   Indonesia: 'Indonesien',
   Iran: 'Iran',
   Iraq: 'Irak',
   Ireland: 'Irland',
   Israel: 'Israel',
   Italy: 'Italien',
   'Ivory Coast': 'Elfenbeinküste',
   Jamaica: 'Jamaika',
   Japan: 'Japan',
   Jordan: 'Jordanien',
   Kazakhstan: 'Kasachstan',
   Kenya: 'Kenia',
   Kiribati: 'Kiribati',
   Kuwait: 'Kuwait',
   Kyrgyzstan: 'Kirgisistan',
   Laos: 'Laos',
   Latvia: 'Lettland',
   Lebanon: 'Libanon',
   Lesotho: 'Lesotho',
   Liberia: 'Liberia',
   Libya: 'Libyen',
   Liechtenstein: 'Liechtenstein',
   Lithuania: 'Litauen',
   Luxembourg: 'Luxemburg',
   Madagascar: 'Madagaskar',
   Malawi: 'Malawi',
   Malaysia: 'Malaysia',
   Maldives: 'Malediven',
   Mali: 'Mali',
   Malta: 'Malta',
   'Marshall Islands': 'Marshallinseln',
   Mauritania: 'Mauretanien',
   Mauritius: 'Mauritius',
   Mexico: 'Mexiko',
   Micronesia: 'Mikronesien',
   Moldova: 'Moldau',
   Monaco: 'Monaco',
   Mongolia: 'Mongolei',
   Montenegro: 'Montenegro',
   Morocco: 'Marokko',
   Mozambique: 'Mosambik',
   Myanmar: 'Myanmar',
   Namibia: 'Namibia',
   Nauru: 'Nauru',
   Nepal: 'Nepal',
   Netherlands: 'Niederlande',
   'New Zealand': 'Neuseeland',
   Nicaragua: 'Nicaragua',
   Niger: 'Niger',
   Nigeria: 'Nigeria',
   'North Korea': 'Nordkorea',
   'North Macedonia': 'Nordmazedonien',
   Norway: 'Norwegen',
   Oman: 'Oman',
   Pakistan: 'Pakistan',
   Palau: 'Palau',
   Palestine: 'Palästina',
   Panama: 'Panama',
   'Papua New Guinea': 'Papua-Neuguinea',
   Paraguay: 'Paraguay',
   Peru: 'Peru',
   Philippines: 'Philippinen',
   Poland: 'Polen',
   Portugal: 'Portugal',
   Qatar: 'Katar',
   Romania: 'Rumänien',
   Russia: 'Russland',
   Rwanda: 'Ruanda',
   'Saint Kitts and Nevis': 'St. Kitts und Nevis',
   'Saint Lucia': 'St. Lucia',
   'Saint Vincent and the Grenadines': 'St. Vincent und die Grenadinen',
   Samoa: 'Samoa',
   'San Marino': 'San Marino',
   'Sao Tome and Principe': 'Sao Tome und Principe',
   'Saudi Arabia': 'Saudi-Arabien',
   Senegal: 'Senegal',
   Serbia: 'Serbien',
   Seychelles: 'Seychellen',
   'Sierra Leone': 'Sierra Leone',
   Singapore: 'Singapur',
   Slovakia: 'Slowakei',
   Slovenia: 'Slowenien',
   'Solomon Islands': 'Salomonen',
   Somalia: 'Somalia',
   'South Africa': 'Südafrika',
   'South Korea': 'Südkorea',
   'South Sudan': 'Südsudan',
   Spain: 'Spanien',
   'Sri Lanka': 'Sri Lanka',
   Sudan: 'Sudan',
   Suriname: 'Suriname',
   Sweden: 'Schweden',
   Switzerland: 'Schweiz',
   Syria: 'Syrien',
   Taiwan: 'Taiwan',
   Tajikistan: 'Tadschikistan',
   Tanzania: 'Tansania',
   Thailand: 'Thailand',
   Togo: 'Togo',
   Tonga: 'Tonga',
   'Trinidad and Tobago': 'Trinidad und Tobago',
   Tunisia: 'Tunesien',
   Turkey: 'Türkei',
   Turkmenistan: 'Turkmenistan',
   Tuvalu: 'Tuvalu',
   Uganda: 'Uganda',
   Ukraine: 'Ukraine',
   'United Arab Emirates': 'Vereinigte Arabische Emirate',
   'United Kingdom': 'Vereinigtes Königreich',
   'United States': 'Vereinigte Staaten',
   Uruguay: 'Uruguay',
   Uzbekistan: 'Usbekistan',
   Vanuatu: 'Vanuatu',
   'Vatican City': 'Vatikanstadt',
   Venezuela: 'Venezuela',
   Vietnam: 'Vietnam',
   Yemen: 'Jemen',
   Zambia: 'Sambia',
   Zimbabwe: 'Simbabwe'
}

const users = [
   {
      firstName: 'Armand Patrick',
      lastName: 'Asztalos',
      username: 'armand',
      email: 'armand.patrick.asztalos@tha.de',
      password: '7Gt!kL9$mP2#qR',
      isAdmin: true
   },
   {
      firstName: 'Ibrahim',
      lastName: 'Ghalem',
      username: 'ibrahim',
      email: 'ibrahim.ghalem@tha.de',
      password: 'vX4&zN6@wF1?cJ',
      isAdmin: true
   }
]

const clearStoredAuthSession = () => {
   localStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
}

const storeAuthSession = (user) => {
   if(!user) return

   const payload = {
      username: user.username,
      issuedAt: Date.now()
   }

   localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(payload))
}

const getStoredAuthSession = () => {
   try{
      const rawValue = localStorage.getItem(AUTH_SESSION_STORAGE_KEY)
      if(!rawValue) return null

      const parsed = JSON.parse(rawValue)
      if(!parsed?.username || typeof parsed.issuedAt !== 'number') return null
      return parsed
   }
   catch{
      return null
   }
}

const isStoredSessionExpired = (session) => {
   if(!session?.issuedAt) return true
   return (Date.now() - session.issuedAt) >= AUTH_SESSION_MAX_AGE_MS
}

const logoutCurrentUser = () => {
   currentUser = null
   editingTicketId = null
   authForm?.reset()

   if(authMessage){
      authMessage.textContent = ''
      authMessage.classList.remove('auth-modal__message--success')
   }

   clearStoredAuthSession()
   closeTicketDetailModal()
   showHomeView()
   closeAuthModal()
   updateAuthButton()
}

const hydrateUserSession = () => {
   const session = getStoredAuthSession()
   if(!session){
      clearStoredAuthSession()
      return false
   }

   if(isStoredSessionExpired(session)){
      clearStoredAuthSession()
      return false
   }

   const matchedUser = users.find((user) => user.username === session.username)
   if(!matchedUser){
      clearStoredAuthSession()
      return false
   }

   currentUser = matchedUser
   return true
}

const enforceSessionExpiry = () => {
   if(!currentUser) return

   const session = getStoredAuthSession()
   if(!session || isStoredSessionExpired(session)){
      logoutCurrentUser()
      return
   }

   updateAuthSessionNote()
}

const updateAuthButton = () => {
   if(!loginOpen) return

   const label = loginOpen.querySelector('span')
   if(!label) return

   label.textContent = currentUser ? 'Abmelden' : 'Anmelden'

   if(allTicketsItem){
      const canSeeAllTickets = Boolean(currentUser?.isAdmin)
      allTicketsItem.hidden = !canSeeAllTickets

      if(!canSeeAllTickets){
         boardViewActive = false
         allTicketsLink?.querySelector('span')?.replaceChildren('Alle Tickets')
         homeContent?.removeAttribute('hidden')
         adminTicketBoard?.setAttribute('hidden', 'true')
      }
   }

   updateAuthSessionNote()
   enforceAdminDashboardVisibility()
}

const updateAuthSessionNote = () => {
   if(!authSessionNote) return

   if(!currentUser?.isAdmin){
      authSessionNote.hidden = true
      authSessionNote.textContent = ''
      return
   }

   const session = getStoredAuthSession()
   if(!session){
      authSessionNote.hidden = true
      authSessionNote.textContent = ''
      return
   }

   const remainingMs = Math.max(0, AUTH_SESSION_MAX_AGE_MS - (Date.now() - session.issuedAt))
   const remainingDays = Math.ceil(remainingMs / (24 * 60 * 60 * 1000))

   authSessionNote.hidden = false
   authSessionNote.textContent = `Admin-Session läuft in ${remainingDays} Tag${remainingDays === 1 ? '' : 'en'} ab.`
}

const setTicketFormMode = (isEditMode) => {
   if(ticketTitleHeading){
      ticketTitleHeading.textContent = isEditMode ? 'TICKET BEARBEITEN' : 'NEUES TICKET'
   }

   if(ticketSubtitle){
      ticketSubtitle.textContent = isEditMode
         ? 'Ticketdaten aktualisieren und speichern.'
         : 'Bitte alle Pflichtfelder ausfüllen.'
   }

   if(ticketSubmitButton){
      ticketSubmitButton.textContent = isEditMode ? 'SPEICHERN' : 'TICKET ERSTELLEN'
   }
}

const normalizeTicket = (ticket) => {
   const rawStatus = ticket?.status || TICKET_STATUS_OPEN
   const isClosedStatus = rawStatus === 'erledigt' || rawStatus === 'geschlossen'
   const status = isClosedStatus ? TICKET_STATUS_DONE : rawStatus
   return {
      ...ticket,
      status
   }
}

const updateTicketToClosedStatus = async (ticketId) => {
   const candidates = Array.from(new Set([TICKET_STATUS_DONE, 'erledigt', 'geschlossen']))

   for(const statusValue of candidates){
      const updated = await updateTicketInDatabase(ticketId, {
         status: statusValue,
         updatedAt: new Date().toISOString()
      })

      if(updated){
         return true
      }
   }

   return false
}

const getTicketDisplayMarker = (ticket) => {
   if(ticket.deadline){
      return ticket.deadline
   }

   const priorityMap = {
      niedrig: 'NIEDRIG',
      mittel: 'MITTEL',
      hoch: 'HOCH'
   }

   return priorityMap[ticket.priority] || 'OHNE PRIO'
}

const getAssignmentLabel = (ticket) => {
   if(!ticket.assignment || ticket.assignment === 'egal') return 'Egal'
   return ticket.assignment
}

const getStatusLabel = (status) => {
   if(status === TICKET_STATUS_IN_PROGRESS) return 'IN BEARBEITUNG'
   if(status === TICKET_STATUS_DONE) return 'GESCHLOSSEN'
   return 'OFFEN'
}

const getStatusClassName = (status) => {
   if(status === TICKET_STATUS_IN_PROGRESS) return 'ticket-card__status--progress'
   if(status === TICKET_STATUS_DONE) return 'ticket-card__status--closed'
   return 'ticket-card__status--open'
}

const truncateTitle = (title) => {
   if(title.length <= 26) return title
   return `${title.slice(0, 26)}...`
}

const sortNewestFirst = (tickets) => {
   return [...tickets].sort((a, b) => {
      const firstTime = Date.parse(b.createdAt || '') || 0
      const secondTime = Date.parse(a.createdAt || '') || 0
      return firstTime - secondTime
   })
}

const renderColumn = (columnElement, tickets) => {
   if(!columnElement) return

   columnElement.innerHTML = ''

   if(tickets.length === 0){
      const empty = document.createElement('p')
      empty.className = 'ticket-board__empty'
      empty.textContent = 'Keine Tickets vorhanden.'
      columnElement.append(empty)
      return
   }

   tickets.forEach((ticket) => {
      const card = document.createElement('button')
      card.type = 'button'
      card.className = 'ticket-card'
      card.dataset.ticketId = String(ticket.ticketId)

      const header = document.createElement('div')
      header.className = 'ticket-card__header'

      const title = document.createElement('span')
      title.className = 'ticket-card__title'
      title.textContent = truncateTitle(ticket.title || 'Ohne Titel')

      const statusBadge = document.createElement('span')
      statusBadge.className = `ticket-card__status ${getStatusClassName(ticket.status)}`
      statusBadge.textContent = getStatusLabel(ticket.status)

      header.append(title, statusBadge)

      const nickname = document.createElement('span')
      nickname.className = 'ticket-card__nickname'
      nickname.textContent = ticket.nickName || '-'

      const meta = document.createElement('span')
      meta.className = 'ticket-card__meta'

      const marker = document.createElement('span')
      marker.className = 'ticket-card__marker'
      marker.textContent = getTicketDisplayMarker(ticket)

      const assignment = document.createElement('span')
      assignment.className = 'ticket-card__assignment'
      assignment.textContent = getAssignmentLabel(ticket)

      meta.append(marker, assignment)
      card.append(header, nickname, meta)
      columnElement.append(card)
   })
}

const enforceAdminDashboardVisibility = () => {
   const isAdmin = Boolean(currentUser?.isAdmin)
   const shouldShowBoard = Boolean(isAdmin && boardViewActive)

   if(!isAdmin){
      boardViewActive = false
   }

   homeContent?.toggleAttribute('hidden', shouldShowBoard)
   adminTicketBoard?.toggleAttribute('hidden', !shouldShowBoard)
   allTicketsLink?.querySelector('span')?.replaceChildren(shouldShowBoard ? 'STARTSEITE' : 'Alle Tickets')

   if(boardPullIndicator){
      boardPullIndicator.hidden = !shouldShowBoard
   }
}

const renderTicketBoard = async () => {
   if(!currentUser?.isAdmin || !boardViewActive){
      return
   }

   await loadTicketsFromDatabase()
   const storedTickets = sortNewestFirst(getStoredTickets())

   const openTickets = storedTickets.filter((ticket) => ticket.status === TICKET_STATUS_OPEN)
   const progressTickets = storedTickets.filter((ticket) => ticket.status === TICKET_STATUS_IN_PROGRESS)
   const doneTickets = storedTickets.filter((ticket) => ticket.status === TICKET_STATUS_DONE)

   renderColumn(ticketColumnOffen, openTickets)
   renderColumn(ticketColumnInBearbeitung, progressTickets)
   renderColumn(ticketColumnErledigt, doneTickets)
}

const showBoardView = async () => {
   if(!currentUser?.isAdmin) return
   boardViewActive = true
   enforceAdminDashboardVisibility()
   await renderTicketBoard()
}

const showHomeView = () => {
   boardViewActive = false
   enforceAdminDashboardVisibility()
}

const setBoardPullIndicator = (distance, ready = false, text = 'Ziehen zum Aktualisieren') => {
   if(!boardPullIndicator) return

   const clamped = Math.min(distance, 90)
   boardPullIndicator.classList.add('ticket-board__pull-indicator--visible')
   boardPullIndicator.classList.toggle('ticket-board__pull-indicator--ready', ready)
   boardPullIndicator.style.transform = `translate(-50%, ${-120 + clamped}%)`

   const label = boardPullIndicator.querySelector('span')
   if(label){
      label.textContent = text
   }
}

const resetBoardPullIndicator = () => {
   if(!boardPullIndicator) return

   boardPullIndicator.classList.remove('ticket-board__pull-indicator--visible', 'ticket-board__pull-indicator--ready')
   boardPullIndicator.style.transform = 'translate(-50%, -120%)'

   const label = boardPullIndicator.querySelector('span')
   if(label){
      label.textContent = 'Ziehen zum Aktualisieren'
   }
}

const initializeBoardPullToRefresh = () => {
   const refreshThreshold = 70

   window.addEventListener('touchstart', (event) => {
      if(!boardViewActive || !currentUser?.isAdmin || isBoardRefreshing) return
      if(document.body.classList.contains('modal-open')) return
      if(window.scrollY > 0) return

      boardPullStartY = event.touches[0].clientY
      boardPullDistance = 0
      isPullingBoard = true
   }, { passive: true })

   window.addEventListener('touchmove', (event) => {
      if(!isPullingBoard || !boardViewActive || !currentUser?.isAdmin || isBoardRefreshing) return

      const currentY = event.touches[0].clientY
      const delta = currentY - boardPullStartY
      boardPullDistance = Math.max(0, delta)

      if(boardPullDistance <= 0 || window.scrollY > 0){
         resetBoardPullIndicator()
         return
      }

      const isReady = boardPullDistance >= refreshThreshold
      setBoardPullIndicator(boardPullDistance, isReady, isReady ? 'Loslassen zum Aktualisieren' : 'Ziehen zum Aktualisieren')
      event.preventDefault()
   }, { passive: false })

   window.addEventListener('touchend', async () => {
      if(!isPullingBoard) return

      const shouldRefresh = boardViewActive
         && currentUser?.isAdmin
         && !isBoardRefreshing
         && boardPullDistance >= refreshThreshold

      isPullingBoard = false

      if(!shouldRefresh){
         resetBoardPullIndicator()
         return
      }

      isBoardRefreshing = true
      setBoardPullIndicator(refreshThreshold, true, 'Aktualisiere...')
      await renderTicketBoard()
      isBoardRefreshing = false
      resetBoardPullIndicator()
   }, { passive: true })

   window.addEventListener('touchcancel', () => {
      isPullingBoard = false
      resetBoardPullIndicator()
   }, { passive: true })
}

const fillTicketDetail = (ticket) => {
   if(!ticketDetailContent) return

   const statusLabelMap = {
      [TICKET_STATUS_OPEN]: 'OFFEN',
      [TICKET_STATUS_IN_PROGRESS]: 'IN BEARBEITUNG',
      [TICKET_STATUS_DONE]: 'GESCHLOSSEN'
   }

   const detailRows = [
      ['Ticket-ID', `#${ticket.ticketId || '-'}`],
      ['Status', statusLabelMap[ticket.status] || String(ticket.status || TICKET_STATUS_OPEN).toUpperCase()],
      ['Erstellt am', `${ticket.createdDate || '-'} ${ticket.createdTime || ''}`.trim()],
      ['Vorname', ticket.firstName || '-'],
      ['Nachname', ticket.lastName || '-'],
      ['Spitzname', ticket.nickName || '-'],
      ['E-Mail', ticket.email || '-'],
      ['Telefon', ticket.phoneNumberFull || '-'],
      ['Discord', ticket.discord || '-'],
      ['Modul', ticket.module || '-'],
      ['Titel', ticket.title || '-'],
      ['Nachricht', ticket.message || '-'],
      ['Dringlichkeit', ticket.priority || '-'],
      ['Deadline', ticket.deadline || '-'],
      ['Zuweisung', ticket.assignment || '-']
   ]

   ticketDetailContent.innerHTML = ''

   detailRows.forEach(([label, value]) => {
      const row = document.createElement('div')
      row.className = 'ticket-detail-modal__row'

      const labelElement = document.createElement('span')
      labelElement.className = 'ticket-detail-modal__label'
      labelElement.textContent = label

      const valueElement = document.createElement('span')
      valueElement.className = 'ticket-detail-modal__value'
      valueElement.textContent = value

      row.append(labelElement, valueElement)
      ticketDetailContent.append(row)
   })
}

const updateTicketDetailActionsVisibility = (status) => {
   if(ticketDetailEdit){
      ticketDetailEdit.hidden = status !== TICKET_STATUS_OPEN
   }

   if(ticketDetailComplete){
      ticketDetailComplete.hidden = status === TICKET_STATUS_DONE
   }
}

const openTicketDetailModal = (ticketId) => {
   if(!currentUser?.isAdmin || !boardViewActive){
      return
   }

   const tickets = getStoredTickets()
   const ticket = tickets.find((entry) => Number(entry.ticketId) === Number(ticketId))
   if(!ticket || !ticketDetailModal) return

   activeTicketId = Number(ticketId)
   fillTicketDetail(ticket)
   updateTicketDetailActionsVisibility(ticket.status)
   ticketDetailModal.classList.add('show-ticket-detail-modal')
   ticketDetailModal.setAttribute('aria-hidden', 'false')
   syncBodyModalState()
}

const closeTicketDetailModal = () => {
   if(!ticketDetailModal) return

   ticketDetailModal.classList.remove('show-ticket-detail-modal')
   ticketDetailModal.setAttribute('aria-hidden', 'true')
   activeTicketId = null
   syncBodyModalState()
}

const fillTicketFormForEdit = (ticket) => {
   if(!ticketForm) return

   ticketForm.elements.firstName.value = ticket.firstName || ''
   ticketForm.elements.lastName.value = ticket.lastName || ''
   ticketForm.elements.nickName.value = ticket.nickName || ''
   ticketForm.elements.email.value = ticket.email || ''
   ticketForm.elements.phoneCountryCode.value = ticket.phoneCountryCode || '+49'
   ticketForm.elements.phoneNumber.value = ticket.phoneNumber || ''
   ticketForm.elements.discord.value = ticket.discord || ''
   ticketForm.elements.module.value = ticket.module || 'kein-modul'
   ticketForm.elements.title.value = ticket.title || ''
   ticketForm.elements.message.value = ticket.message || ''
   ticketForm.elements.priority.value = ticket.priority || ''
   ticketForm.elements.deadline.value = ticket.deadline || ''
   ticketForm.elements.assignment.value = ticket.assignment || 'egal'

   ticketForm.querySelectorAll('[maxlength]').forEach(syncLengthCounter)
}

const mapDbTicketToApp = (row) => {
   return normalizeTicket({
      ticketId: row.ticket_id,
      createdAt: row.created_at,
      createdDate: row.created_date,
      createdTime: row.created_time,
      firstName: row.first_name,
      lastName: row.last_name,
      nickName: row.nick_name,
      email: row.email,
      phoneCountryCode: row.phone_country_code,
      phoneNumber: row.phone_number,
      phoneNumberFull: row.phone_number_full,
      discord: row.discord,
      module: row.module,
      title: row.title,
      message: row.message,
      priority: row.priority,
      deadline: row.deadline,
      assignment: row.assignment,
      status: row.status,
      updatedAt: row.updated_at
   })
}

const mapAppTicketToDb = (ticket) => {
   return {
      ticket_id: ticket.ticketId,
      created_at: ticket.createdAt,
      created_date: ticket.createdDate,
      created_time: ticket.createdTime,
      first_name: ticket.firstName,
      last_name: ticket.lastName,
      nick_name: ticket.nickName,
      email: ticket.email,
      phone_country_code: ticket.phoneCountryCode,
      phone_number: ticket.phoneNumber,
      phone_number_full: ticket.phoneNumberFull,
      discord: ticket.discord,
      module: ticket.module,
      title: ticket.title,
      message: ticket.message,
      priority: ticket.priority,
      deadline: ticket.deadline,
      assignment: ticket.assignment,
      status: ticket.status,
      updated_at: ticket.updatedAt || null
   }
}

const getStoredTickets = () => {
   return ticketsCache.map(normalizeTicket)
}

const loadTicketsFromDatabase = async () => {
   if(!supabaseClient) return getStoredTickets()

   const { data, error } = await supabaseClient
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false })

   if(error){
      console.error('Supabase Fehler beim Laden der Tickets:', error.message)
      return getStoredTickets()
   }

   ticketsCache = (data || []).map(mapDbTicketToApp)
   return getStoredTickets()
}

const createTicketInDatabase = async (ticket) => {
   if(!supabaseClient) return false

   const { error } = await supabaseClient
      .from('tickets')
      .insert(mapAppTicketToDb(ticket))

   if(error){
      console.error('Supabase Fehler beim Erstellen:', error.message)
      return false
   }

   return true
}

const updateTicketInDatabase = async (ticketId, patch) => {
   if(!supabaseClient) return false

   const dbPatch = {}

   if(Object.hasOwn(patch, 'firstName')) dbPatch.first_name = patch.firstName
   if(Object.hasOwn(patch, 'lastName')) dbPatch.last_name = patch.lastName
   if(Object.hasOwn(patch, 'nickName')) dbPatch.nick_name = patch.nickName
   if(Object.hasOwn(patch, 'email')) dbPatch.email = patch.email
   if(Object.hasOwn(patch, 'phoneCountryCode')) dbPatch.phone_country_code = patch.phoneCountryCode
   if(Object.hasOwn(patch, 'phoneNumber')) dbPatch.phone_number = patch.phoneNumber
   if(Object.hasOwn(patch, 'phoneNumberFull')) dbPatch.phone_number_full = patch.phoneNumberFull
   if(Object.hasOwn(patch, 'discord')) dbPatch.discord = patch.discord
   if(Object.hasOwn(patch, 'module')) dbPatch.module = patch.module
   if(Object.hasOwn(patch, 'title')) dbPatch.title = patch.title
   if(Object.hasOwn(patch, 'message')) dbPatch.message = patch.message
   if(Object.hasOwn(patch, 'priority')) dbPatch.priority = patch.priority
   if(Object.hasOwn(patch, 'deadline')) dbPatch.deadline = patch.deadline
   if(Object.hasOwn(patch, 'assignment')) dbPatch.assignment = patch.assignment
   if(Object.hasOwn(patch, 'status')) dbPatch.status = patch.status
   if(Object.hasOwn(patch, 'updatedAt')) dbPatch.updated_at = patch.updatedAt

   const { error } = await supabaseClient
      .from('tickets')
      .update(dbPatch)
      .eq('ticket_id', ticketId)

   if(error){
      console.error('Supabase Fehler beim Aktualisieren:', error.message)
      return false
   }

   return true
}

const populateCountryCodeSelect = () => {
   if(!ticketCountryCode) return

   const defaultCode = ticketCountryCode.value || '+49'
   ticketCountryCode.innerHTML = ''

   countryCallingCodes.forEach(({ country, code }) => {
      const countryDe = countryNameDe[country] || country
      const option = document.createElement('option')
      option.value = code
      option.textContent = `${countryDe} (${code})`

      if(code === defaultCode && country === 'Germany'){
         option.selected = true
      }

      ticketCountryCode.append(option)
   })
}

const syncLengthCounter = (field) => {
   if(!field?.id) return

   const maxLength = Number(field.getAttribute('maxlength'))
   if(Number.isNaN(maxLength) || maxLength <= 0) return

   const counter = document.querySelector(`[data-counter-for="${field.id}"]`)
   if(!counter) return

   counter.textContent = `${field.value.length}/${maxLength}`
}

const initializeLengthCounters = () => {
   if(!ticketForm) return

   const limitedFields = ticketForm.querySelectorAll('[maxlength]')

   limitedFields.forEach((field) => {
      syncLengthCounter(field)
      field.addEventListener('input', () => syncLengthCounter(field))
   })
}

const formatDeadlineFromDigits = (value) => {
   const digits = value.replace(/\D/g, '').slice(0, 8)
   const day = digits.slice(0, 2)
   const month = digits.slice(2, 4)
   const year = digits.slice(4, 8)

   let formatted = day
   if(digits.length >= 2){
      formatted += '.'
   }
   if(month){
      formatted += month
   }
   if(digits.length >= 4){
      formatted += '.'
   }
   if(year){
      formatted += year
   }

   return formatted
}

const getTodayStart = () => {
   const today = new Date()
   today.setHours(0, 0, 0, 0)
   return today
}

const isPastDate = (date) => {
   return date.getTime() < getTodayStart().getTime()
}

const parseDeadlineToIso = (value) => {
   const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/)
   if(!match) return ''

   const day = Number(match[1])
   const month = Number(match[2])
   const year = Number(match[3])
   const date = new Date(year, month - 1, day)

   const sameDay = date.getDate() === day
   const sameMonth = date.getMonth() === (month - 1)
   const sameYear = date.getFullYear() === year

   if(!sameDay || !sameMonth || !sameYear) return ''

   return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

const parseDeadlineToDate = (value) => {
   const isoValue = parseDeadlineToIso(value)
   if(!isoValue) return null

   const [year, month, day] = isoValue.split('-').map(Number)
   const date = new Date(year, month - 1, day)
   date.setHours(0, 0, 0, 0)
   return date
}

const initializeDeadlineInput = () => {
   if(!ticketDeadline) return

   const calendarState = {
      visibleMonth: (() => {
         const base = getTodayStart()
         return new Date(base.getFullYear(), base.getMonth(), 1)
      })()
   }

   const closeCalendar = () => {
      if(!ticketDeadlineCalendar) return
      ticketDeadlineCalendar.classList.remove('ticket-modal__calendar--open')
      ticketDeadlineCalendar.setAttribute('aria-hidden', 'true')
   }

   const openCalendar = () => {
      if(!ticketDeadlineCalendar) return
      ticketDeadlineCalendar.classList.add('ticket-modal__calendar--open')
      ticketDeadlineCalendar.setAttribute('aria-hidden', 'false')
   }

   const formatDateToDeadline = (date) => {
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = String(date.getFullYear())
      return `${day}.${month}.${year}`
   }

   const setDeadlineFromDate = (date) => {
      ticketDeadline.value = formatDateToDeadline(date)
      syncLengthCounter(ticketDeadline)
      ticketDeadline.setCustomValidity('')
   }

   const renderCalendar = () => {
      if(!ticketCalendarDays || !ticketCalendarTitle) return

      const firstDay = new Date(
         calendarState.visibleMonth.getFullYear(),
         calendarState.visibleMonth.getMonth(),
         1
      )

      const monthLabel = firstDay.toLocaleDateString('de-DE', {
         month: 'long',
         year: 'numeric'
      })
      ticketCalendarTitle.textContent = monthLabel
      ticketCalendarDays.innerHTML = ''

      const weekOffset = (firstDay.getDay() + 6) % 7
      const daysInMonth = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0).getDate()
      const selectedDate = parseDeadlineToDate(ticketDeadline.value)
      const today = getTodayStart()

      for(let i = 0; i < weekOffset; i += 1){
         const emptyDay = document.createElement('span')
         emptyDay.className = 'ticket-modal__calendar-empty'
         ticketCalendarDays.append(emptyDay)
      }

      for(let day = 1; day <= daysInMonth; day += 1){
         const currentDate = new Date(firstDay.getFullYear(), firstDay.getMonth(), day)
         currentDate.setHours(0, 0, 0, 0)

         const dayButton = document.createElement('button')
         dayButton.type = 'button'
         dayButton.className = 'ticket-modal__calendar-day'
         dayButton.textContent = String(day)

         if(currentDate.getTime() === today.getTime()){
            dayButton.classList.add('ticket-modal__calendar-day--today')
         }

         if(selectedDate && currentDate.getTime() === selectedDate.getTime()){
            dayButton.classList.add('ticket-modal__calendar-day--selected')
         }

         if(isPastDate(currentDate)){
            dayButton.disabled = true
         }
         else{
            dayButton.addEventListener('click', () => {
               setDeadlineFromDate(currentDate)
               closeCalendar()
            })
         }

         ticketCalendarDays.append(dayButton)
      }

      if(ticketCalendarPrev){
         const isCurrentMonth = firstDay.getFullYear() === today.getFullYear()
            && firstDay.getMonth() === today.getMonth()
         ticketCalendarPrev.disabled = isCurrentMonth
      }
   }

   ticketDeadline.addEventListener('input', () => {
      ticketDeadline.value = formatDeadlineFromDigits(ticketDeadline.value)
      syncLengthCounter(ticketDeadline)
      ticketDeadline.setCustomValidity('')
      renderCalendar()
   })

   ticketDeadlineButton?.addEventListener('click', () => {
      if(!ticketDeadlineCalendar) return

      const selected = parseDeadlineToDate(ticketDeadline.value)
      const fallbackDate = getTodayStart()
      const selectedMonthBase = selected && !isPastDate(selected) ? selected : fallbackDate
      calendarState.visibleMonth = new Date(selectedMonthBase.getFullYear(), selectedMonthBase.getMonth(), 1)

      const isOpen = ticketDeadlineCalendar.classList.contains('ticket-modal__calendar--open')
      if(isOpen){
         closeCalendar()
         return
      }

      renderCalendar()
      openCalendar()
   })

   ticketCalendarPrev?.addEventListener('click', () => {
      calendarState.visibleMonth = new Date(
         calendarState.visibleMonth.getFullYear(),
         calendarState.visibleMonth.getMonth() - 1,
         1
      )
      renderCalendar()
   })

    ticketCalendarNext?.addEventListener('click', () => {
      calendarState.visibleMonth = new Date(
         calendarState.visibleMonth.getFullYear(),
         calendarState.visibleMonth.getMonth() + 1,
         1
      )
      renderCalendar()
   })

   ticketModal?.addEventListener('click', (event) => {
      if(!ticketDeadlineCalendar) return

      const target = event.target
      const clickedInsideDeadline = target instanceof Element
         && (target.closest('#ticket-deadline-calendar') || target.closest('#ticket-deadline-button'))

      if(!clickedInsideDeadline){
         closeCalendar()
      }
   })

   renderCalendar()
}

const getNextTicketId = (tickets) => {
   const maxId = tickets.reduce((maxValue, ticket) => {
      const numericId = Number(ticket?.ticketId)
      if(Number.isNaN(numericId)) return maxValue
      return Math.max(maxValue, numericId)
   }, 0)

   return maxId + 1
}

const syncBodyModalState = () => {
   const authOpen = authModal?.classList.contains('show-auth-modal')
   const ticketOpenState = ticketModal?.classList.contains('show-ticket-modal')
   const detailOpenState = ticketDetailModal?.classList.contains('show-ticket-detail-modal')

   document.body.classList.toggle('modal-open', Boolean(authOpen || ticketOpenState || detailOpenState))
}

const openAuthModal = () => {
   if(!authModal) return

   authModal.classList.add('show-auth-modal')
   authModal.setAttribute('aria-hidden', 'false')
   syncBodyModalState()
   authMessage.textContent = ''
   authMessage.classList.remove('auth-modal__message--success')

   if(navMenu){
      navMenu.classList.remove('show-menu')
   }

   authIdentifier.focus()
}

const closeAuthModal = () => {
   if(!authModal) return

   authModal.classList.remove('show-auth-modal')
   authModal.setAttribute('aria-hidden', 'true')
   syncBodyModalState()
}

const openTicketModal = () => {
   if(!ticketModal) return

   ticketModal.classList.add('show-ticket-modal')
   ticketModal.setAttribute('aria-hidden', 'false')
   syncBodyModalState()

   if(ticketMessage){
      ticketMessage.textContent = ''
      ticketMessage.classList.remove('ticket-modal__message--success')
   }

   if(navMenu){
      navMenu.classList.remove('show-menu')
   }

   ticketFirstInput?.focus()
   ticketForm?.querySelectorAll('[maxlength]').forEach(syncLengthCounter)
}

const closeTicketModal = () => {
   if(!ticketModal) return

   ticketModal.classList.remove('show-ticket-modal')
   ticketModal.setAttribute('aria-hidden', 'true')
   syncBodyModalState()
}

if(loginOpen){
   loginOpen.addEventListener('click', (event) => {
      event.preventDefault()

      if(currentUser){
         logoutCurrentUser()
         return
      }

      openAuthModal()
   })
}

if(authClose){
   authClose.addEventListener('click', closeAuthModal)
}

if(ticketOpen){
   ticketOpen.addEventListener('click', (event) => {
      event.preventDefault()
      editingTicketId = null
      setTicketFormMode(false)
      ticketForm?.reset()
      ticketForm?.querySelectorAll('[maxlength]').forEach(syncLengthCounter)
      openTicketModal()
   })
}

if(allTicketsLink){
   allTicketsLink.addEventListener('click', async (event) => {
      event.preventDefault()
      enforceSessionExpiry()
      if(!currentUser?.isAdmin) return

      if(navMenu){
         navMenu.classList.remove('show-menu')
      }

      if(boardViewActive){
         showHomeView()
      }
      else{
         await showBoardView()
      }
   })
}

if(ticketClose){
   ticketClose.addEventListener('click', closeTicketModal)
}

if(authModal){
   authModal.addEventListener('click', (event) => {
      if(event.target.hasAttribute('data-auth-close')){
         closeAuthModal()
      }
   })
}

if(ticketModal){
   ticketModal.addEventListener('click', (event) => {
      if(event.target.hasAttribute('data-ticket-close')){
         closeTicketModal()
      }
   })
}

if(ticketDetailModal){
   ticketDetailModal.addEventListener('click', (event) => {
      if(event.target.hasAttribute('data-ticket-detail-close')){
         closeTicketDetailModal()
      }
   })
}

if(adminTicketBoard){
   adminTicketBoard.addEventListener('click', (event) => {
      const target = event.target
      if(!(target instanceof Element)) return

      const ticketCard = target.closest('.ticket-card')
      if(!ticketCard) return

      openTicketDetailModal(ticketCard.dataset.ticketId)
   })
}

if(ticketDetailClose){
   ticketDetailClose.addEventListener('click', closeTicketDetailModal)
}

if(ticketDetailEdit){
   ticketDetailEdit.addEventListener('click', async () => {
      enforceSessionExpiry()
      if(!currentUser?.isAdmin || !boardViewActive) return

      await loadTicketsFromDatabase()

      const tickets = getStoredTickets()
      const ticketIndex = tickets.findIndex((entry) => Number(entry.ticketId) === Number(activeTicketId))
      if(ticketIndex === -1) return

      if(tickets[ticketIndex].status !== TICKET_STATUS_OPEN){
         return
      }

      const statusUpdated = await updateTicketInDatabase(tickets[ticketIndex].ticketId, {
         status: TICKET_STATUS_IN_PROGRESS,
         updatedAt: new Date().toISOString()
      })
      if(!statusUpdated) return

      await loadTicketsFromDatabase()
      await renderTicketBoard()

      const ticket = getStoredTickets().find((entry) => Number(entry.ticketId) === Number(activeTicketId))
      if(!ticket) return

      fillTicketDetail(ticket)
      updateTicketDetailActionsVisibility(ticket.status)
   })
}

if(ticketDetailComplete){
   ticketDetailComplete.addEventListener('click', async () => {
      enforceSessionExpiry()
      if(!currentUser?.isAdmin || !boardViewActive) return

      await loadTicketsFromDatabase()

      const tickets = getStoredTickets()
      const ticketIndex = tickets.findIndex((entry) => Number(entry.ticketId) === Number(activeTicketId))
      if(ticketIndex === -1) return

      if(tickets[ticketIndex].status === TICKET_STATUS_DONE){
         return
      }

      const doneUpdated = await updateTicketToClosedStatus(tickets[ticketIndex].ticketId)
      if(!doneUpdated) return

      await loadTicketsFromDatabase()
      await renderTicketBoard()

      const ticket = getStoredTickets().find((entry) => Number(entry.ticketId) === Number(activeTicketId))
      if(!ticket) return

      fillTicketDetail(ticket)
      updateTicketDetailActionsVisibility(ticket.status)
   })
}

document.addEventListener('keydown', (event) => {
   if(event.key !== 'Escape') return

   if(authModal?.classList.contains('show-auth-modal')){
      closeAuthModal()
   }

   if(ticketModal?.classList.contains('show-ticket-modal')){
      closeTicketModal()
   }

   if(ticketDetailModal?.classList.contains('show-ticket-detail-modal')){
      closeTicketDetailModal()
   }
})

if(authForm){
   authForm.addEventListener('submit', (event) => {
      event.preventDefault()

      const identifier = authIdentifier.value.trim().toLowerCase()
      const password = authPassword.value

      const matchedUser = users.find((user) => {
         const sameIdentity = identifier === user.username.toLowerCase() || identifier === user.email.toLowerCase()
         return sameIdentity && password === user.password
      })

      if(matchedUser){
         currentUser = matchedUser
         storeAuthSession(matchedUser)
         authMessage.textContent = `Erfolgreich angemeldet: ${matchedUser.firstName} ${matchedUser.lastName}`
         authMessage.classList.add('auth-modal__message--success')
         authForm.reset()
         updateAuthButton()
         closeAuthModal()
         return
      }

      authMessage.textContent = 'Anmeldung fehlgeschlagen. Bitte Eingaben prüfen.'
      authMessage.classList.remove('auth-modal__message--success')
   })
}

if(ticketForm){
   ticketForm.addEventListener('submit', async (event) => {
      event.preventDefault()

      ticketEmail?.setCustomValidity('')
      ticketDeadline?.setCustomValidity('')

      const deadlineValue = ticketDeadline?.value.trim() || ''
      const isValidDeadline = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.([0-9]{4})$/.test(deadlineValue)
      const deadlineIso = parseDeadlineToIso(deadlineValue)
      const parsedDeadlineDate = parseDeadlineToDate(deadlineValue)

      if(deadlineValue && (!isValidDeadline || !deadlineIso || !parsedDeadlineDate) && ticketDeadline){
         ticketDeadline.setCustomValidity('Bitte Deadline im Format TT.MM.JJJJ eingeben.')
         ticketDeadline.reportValidity()
         return
      }

      if(parsedDeadlineDate && isPastDate(parsedDeadlineDate) && ticketDeadline){
         ticketDeadline.setCustomValidity('Deadline muss heute oder in der Zukunft liegen.')
         ticketDeadline.reportValidity()
         return
      }

      if(!ticketForm.checkValidity()){
         ticketForm.reportValidity()
         return
      }

      const emailValue = ticketEmail?.value.trim() || ''
      const isThaEmail = /^[^\s@]+@tha\.de$/i.test(emailValue)

      if(!isThaEmail && ticketEmail){
         ticketEmail.setCustomValidity('Bitte nur eine E-Mail mit @tha.de verwenden.')
         ticketEmail.reportValidity()
         return
      }

      await loadTicketsFromDatabase()
      const storedTickets = getStoredTickets()
      const now = new Date()
      const formData = new FormData(ticketForm)
      const nextTicketId = getNextTicketId(storedTickets)
      const phoneCountryCode = formData.get('phoneCountryCode')?.toString() || '+49'
      const phoneNumber = formData.get('phoneNumber')?.toString().trim() || ''

      let savedSuccessfully = false

      const baseTicketData = {
         createdAt: now.toISOString(),
         createdDate: now.toLocaleDateString('de-DE'),
         createdTime: now.toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
         }),
         firstName: formData.get('firstName')?.toString().trim() || '',
         lastName: formData.get('lastName')?.toString().trim() || '',
         nickName: formData.get('nickName')?.toString().trim() || '',
         email: formData.get('email')?.toString().trim() || '',
         phoneCountryCode,
         phoneNumber,
         phoneNumberFull: phoneNumber ? `${phoneCountryCode} ${phoneNumber}` : '',
         discord: formData.get('discord')?.toString().trim() || '',
         module: formData.get('module')?.toString() || 'kein-modul',
         title: formData.get('title')?.toString().trim() || '',
         message: formData.get('message')?.toString().trim() || '',
         priority: formData.get('priority')?.toString() || '',
         deadline: formData.get('deadline')?.toString() || '',
         assignment: formData.get('assignment')?.toString() || 'egal'
      }

      if(editingTicketId){
         const ticketIndex = storedTickets.findIndex((ticket) => Number(ticket.ticketId) === Number(editingTicketId))

         if(ticketIndex !== -1){
            const updatedTicket = {
               ...storedTickets[ticketIndex],
               ...baseTicketData,
               ticketId: storedTickets[ticketIndex].ticketId,
               createdAt: storedTickets[ticketIndex].createdAt,
               createdDate: storedTickets[ticketIndex].createdDate,
               createdTime: storedTickets[ticketIndex].createdTime,
               status: storedTickets[ticketIndex].status || TICKET_STATUS_OPEN,
               updatedAt: now.toISOString()
            }

            savedSuccessfully = await updateTicketInDatabase(updatedTicket.ticketId, updatedTicket)
         }
      }
      else{
         const newTicket = {
            ticketId: nextTicketId,
            ...baseTicketData,
            status: TICKET_STATUS_OPEN
         }

         savedSuccessfully = await createTicketInDatabase(newTicket)
      }

      if(!savedSuccessfully){
         if(ticketMessage){
            ticketMessage.textContent = 'Speichern fehlgeschlagen. Bitte Supabase-Verbindung und Policies prüfen.'
            ticketMessage.classList.remove('ticket-modal__message--success')
         }
         return
      }

      await loadTicketsFromDatabase()

      if(ticketMessage){
         ticketMessage.textContent = editingTicketId
            ? `Ticket #${editingTicketId} erfolgreich aktualisiert.`
            : `Ticket #${nextTicketId} erfolgreich erstellt.`
         ticketMessage.classList.add('ticket-modal__message--success')
      }

      ticketForm.reset()
      ticketForm.querySelectorAll('[maxlength]').forEach(syncLengthCounter)
      editingTicketId = null
      setTicketFormMode(false)
      closeTicketModal()

      if(boardViewActive){
         await renderTicketBoard()
      }
   })
}

populateCountryCodeSelect()
initializeLengthCounters()
initializeDeadlineInput()
initializeBoardPullToRefresh()
setTicketFormMode(false)
showHomeView()
hydrateUserSession()
updateAuthButton()
enforceAdminDashboardVisibility()

loadTicketsFromDatabase()

setInterval(enforceSessionExpiry, 60 * 1000)
document.addEventListener('visibilitychange', () => {
   if(document.visibilityState === 'visible'){
      enforceSessionExpiry()
   }
})
