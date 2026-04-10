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
   homeContent = document.getElementById('home-content'),
   adminTicketBoard = document.getElementById('admin-ticket-board'),
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

const TICKETS_STORAGE_KEY = 'swiss_tickets'
const TICKET_STATUS_OPEN = 'offen'
const TICKET_STATUS_IN_PROGRESS = 'in-bearbeitung'
const TICKET_STATUS_DONE = 'erledigt'

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
   Austria: 'Oesterreich',
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
   Denmark: 'Daenemark',
   Djibouti: 'Dschibuti',
   Dominica: 'Dominica',
   'Dominican Republic': 'Dominikanische Republik',
   'East Timor': 'Osttimor',
   Ecuador: 'Ecuador',
   Egypt: 'Aegypten',
   'El Salvador': 'El Salvador',
   'Equatorial Guinea': 'Aequatorialguinea',
   Eritrea: 'Eritrea',
   Estonia: 'Estland',
   Eswatini: 'Eswatini',
   Ethiopia: 'Aethiopien',
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
   'Ivory Coast': 'Elfenbeinkueste',
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
   Palestine: 'Palaestina',
   Panama: 'Panama',
   'Papua New Guinea': 'Papua-Neuguinea',
   Paraguay: 'Paraguay',
   Peru: 'Peru',
   Philippines: 'Philippinen',
   Poland: 'Polen',
   Portugal: 'Portugal',
   Qatar: 'Katar',
   Romania: 'Rumaenien',
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
   'South Africa': 'Suedafrika',
   'South Korea': 'Suedkorea',
   'South Sudan': 'Suedsudan',
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
   Turkey: 'Tuerkei',
   Turkmenistan: 'Turkmenistan',
   Tuvalu: 'Tuvalu',
   Uganda: 'Uganda',
   Ukraine: 'Ukraine',
   'United Arab Emirates': 'Vereinigte Arabische Emirate',
   'United Kingdom': 'Vereinigtes Koenigreich',
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
   const status = ticket?.status || TICKET_STATUS_OPEN
   return {
      ...ticket,
      status
   }
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

      const meta = document.createElement('span')
      meta.className = 'ticket-card__meta'

      const marker = document.createElement('span')
      marker.className = 'ticket-card__marker'
      marker.textContent = getTicketDisplayMarker(ticket)

      const assignment = document.createElement('span')
      assignment.className = 'ticket-card__assignment'
      assignment.textContent = getAssignmentLabel(ticket)

      const title = document.createElement('span')
      title.className = 'ticket-card__title'
      title.textContent = truncateTitle(ticket.title || 'Ohne Titel')

      meta.append(marker, assignment, title)
      card.append(meta)
      columnElement.append(card)
   })
}

const renderTicketBoard = () => {
   if(!currentUser?.isAdmin || !boardViewActive){
      return
   }

   const storedTickets = sortNewestFirst(getStoredTickets())

   const openTickets = storedTickets.filter((ticket) => ticket.status === TICKET_STATUS_OPEN)
   const progressTickets = storedTickets.filter((ticket) => ticket.status === TICKET_STATUS_IN_PROGRESS)
   const doneTickets = storedTickets.filter((ticket) => ticket.status === TICKET_STATUS_DONE)

   renderColumn(ticketColumnOffen, openTickets)
   renderColumn(ticketColumnInBearbeitung, progressTickets)
   renderColumn(ticketColumnErledigt, doneTickets)
}

const showBoardView = () => {
   if(!currentUser?.isAdmin) return
   boardViewActive = true
   homeContent?.setAttribute('hidden', 'true')
   adminTicketBoard?.removeAttribute('hidden')
   allTicketsLink?.querySelector('span')?.replaceChildren('STARTSEITE')
   renderTicketBoard()
}

const showHomeView = () => {
   boardViewActive = false
   homeContent?.removeAttribute('hidden')
   adminTicketBoard?.setAttribute('hidden', 'true')
   allTicketsLink?.querySelector('span')?.replaceChildren('Alle Tickets')
}

const fillTicketDetail = (ticket) => {
   if(!ticketDetailContent) return

   const detailRows = [
      ['Ticket-ID', `#${ticket.ticketId || '-'}`],
      ['Status', ticket.status || TICKET_STATUS_OPEN],
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

const openTicketDetailModal = (ticketId) => {
   if(!currentUser?.isAdmin || !boardViewActive){
      return
   }

   const tickets = getStoredTickets()
   const ticket = tickets.find((entry) => Number(entry.ticketId) === Number(ticketId))
   if(!ticket || !ticketDetailModal) return

   activeTicketId = Number(ticketId)
   fillTicketDetail(ticket)
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

const getStoredTickets = () => {
   try{
      const rawTickets = localStorage.getItem(TICKETS_STORAGE_KEY)
      if(!rawTickets) return []

      const parsedTickets = JSON.parse(rawTickets)
      return Array.isArray(parsedTickets) ? parsedTickets.map(normalizeTicket) : []
   }
   catch{
      return []
   }
}

const saveStoredTickets = (tickets) => {
   localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets))
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
         currentUser = null
         editingTicketId = null
         authForm?.reset()
         if(authMessage){
            authMessage.textContent = ''
            authMessage.classList.remove('auth-modal__message--success')
         }
         closeTicketDetailModal()
         showHomeView()
         closeAuthModal()
         updateAuthButton()
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
   allTicketsLink.addEventListener('click', (event) => {
      event.preventDefault()
      if(!currentUser?.isAdmin) return

      if(boardViewActive){
         showHomeView()
      }
      else{
         showBoardView()
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
   ticketDetailEdit.addEventListener('click', () => {
   if(!currentUser?.isAdmin || !boardViewActive) return

      const tickets = getStoredTickets()
      const ticketIndex = tickets.findIndex((entry) => Number(entry.ticketId) === Number(activeTicketId))
      if(ticketIndex === -1) return

      tickets[ticketIndex] = {
         ...tickets[ticketIndex],
         status: TICKET_STATUS_IN_PROGRESS
      }
      saveStoredTickets(tickets)

      const ticket = tickets[ticketIndex]
      if(!ticket) return

      editingTicketId = ticket.ticketId
      setTicketFormMode(true)
      fillTicketFormForEdit(ticket)
      closeTicketDetailModal()
      openTicketModal()
   })
}

if(ticketDetailComplete){
   ticketDetailComplete.addEventListener('click', () => {
   if(!currentUser?.isAdmin || !boardViewActive) return

      const tickets = getStoredTickets()
      const ticketIndex = tickets.findIndex((entry) => Number(entry.ticketId) === Number(activeTicketId))
      if(ticketIndex === -1) return

      tickets[ticketIndex] = {
         ...tickets[ticketIndex],
         status: TICKET_STATUS_DONE
      }

      saveStoredTickets(tickets)
      closeTicketDetailModal()
      if(boardViewActive){
         renderTicketBoard()
      }
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
   ticketForm.addEventListener('submit', (event) => {
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

      const storedTickets = getStoredTickets()
      const now = new Date()
      const formData = new FormData(ticketForm)
      const nextTicketId = getNextTicketId(storedTickets)
      const phoneCountryCode = formData.get('phoneCountryCode')?.toString() || '+49'
      const phoneNumber = formData.get('phoneNumber')?.toString().trim() || ''

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
            storedTickets[ticketIndex] = {
               ...storedTickets[ticketIndex],
               ...baseTicketData,
               ticketId: storedTickets[ticketIndex].ticketId,
               createdAt: storedTickets[ticketIndex].createdAt,
               createdDate: storedTickets[ticketIndex].createdDate,
               createdTime: storedTickets[ticketIndex].createdTime,
               status: storedTickets[ticketIndex].status || TICKET_STATUS_OPEN,
               updatedAt: now.toISOString()
            }
         }
      }
      else{
         storedTickets.push({
            ticketId: nextTicketId,
            ...baseTicketData,
            status: TICKET_STATUS_OPEN
         })
      }

      saveStoredTickets(storedTickets)

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
         renderTicketBoard()
      }
   })
}

populateCountryCodeSelect()
initializeLengthCounters()
initializeDeadlineInput()
setTicketFormMode(false)
showHomeView()
updateAuthButton()
