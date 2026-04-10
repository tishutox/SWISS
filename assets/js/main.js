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
   ticketCountryCode = document.getElementById('ticket-country-code'),
   ticketFirstInput = document.getElementById('ticket-firstname')

let currentUser = null

const TICKETS_STORAGE_KEY = 'swiss_tickets'

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

const users = [
   {
      firstName: 'Armand Patrick',
      lastName: 'Asztalos',
      username: 'armand',
      email: 'armand.patrick.asztalos@tha.de',
      password: '7Gt!kL9$mP2#qR'
   },
   {
      firstName: 'Ibrahim',
      lastName: 'Ghalem',
      username: 'ibrahim',
      email: 'ibrahim.ghalem@tha.de',
      password: 'vX4&zN6@wF1?cJ'
   }
]

const updateAuthButton = () => {
   if(!loginOpen) return

   const label = loginOpen.querySelector('span')
   if(!label) return

   label.textContent = currentUser ? 'Abmelden' : 'Anmelden'
}

const getStoredTickets = () => {
   try{
      const rawTickets = localStorage.getItem(TICKETS_STORAGE_KEY)
      if(!rawTickets) return []

      const parsedTickets = JSON.parse(rawTickets)
      return Array.isArray(parsedTickets) ? parsedTickets : []
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
      const option = document.createElement('option')
      option.value = code
      option.textContent = `${country} (${code})`

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

   document.body.classList.toggle('modal-open', Boolean(authOpen || ticketOpenState))
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
         authForm?.reset()
         if(authMessage){
            authMessage.textContent = ''
            authMessage.classList.remove('auth-modal__message--success')
         }
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
      openTicketModal()
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

document.addEventListener('keydown', (event) => {
   if(event.key !== 'Escape') return

   if(authModal?.classList.contains('show-auth-modal')){
      closeAuthModal()
   }

   if(ticketModal?.classList.contains('show-ticket-modal')){
      closeTicketModal()
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

      const newTicket = {
         ticketId: nextTicketId,
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

      storedTickets.push(newTicket)
      saveStoredTickets(storedTickets)

      if(ticketMessage){
         ticketMessage.textContent = `Ticket #${nextTicketId} erfolgreich erstellt.`
         ticketMessage.classList.add('ticket-modal__message--success')
      }

      ticketForm.reset()
   ticketForm.querySelectorAll('[maxlength]').forEach(syncLengthCounter)
      closeTicketModal()
   })
}

populateCountryCodeSelect()
initializeLengthCounters()
updateAuthButton()
