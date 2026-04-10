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
   ticketFirstInput = document.getElementById('ticket-firstname')

let currentUser = null

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

      if(ticketMessage){
         ticketMessage.textContent = 'Ticket erfolgreich erstellt.'
         ticketMessage.classList.add('ticket-modal__message--success')
      }

      ticketForm.reset()
      closeTicketModal()
   })
}

updateAuthButton()
