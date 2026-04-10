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
      authModal = document.getElementById('auth-modal'),
      authClose = document.getElementById('auth-close'),
      authForm = document.getElementById('auth-form'),
      authMessage = document.getElementById('auth-message'),
      authIdentifier = document.getElementById('auth-identifier'),
      authPassword = document.getElementById('auth-password')

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

const openAuthModal = () => {
   if(!authModal) return

   authModal.classList.add('show-auth-modal')
   authModal.setAttribute('aria-hidden', 'false')
   document.body.classList.add('modal-open')
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
   document.body.classList.remove('modal-open')
}

if(loginOpen){
   loginOpen.addEventListener('click', (event) => {
      event.preventDefault()
      openAuthModal()
   })
}

if(authClose){
   authClose.addEventListener('click', closeAuthModal)
}

if(authModal){
   authModal.addEventListener('click', (event) => {
      if(event.target.hasAttribute('data-auth-close')){
         closeAuthModal()
      }
   })
}

document.addEventListener('keydown', (event) => {
   if(event.key === 'Escape' && authModal?.classList.contains('show-auth-modal')){
      closeAuthModal()
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
         authMessage.textContent = `Erfolgreich angemeldet: ${matchedUser.firstName} ${matchedUser.lastName}`
         authMessage.classList.add('auth-modal__message--success')
         authForm.reset()
         return
      }

      authMessage.textContent = 'Anmeldung fehlgeschlagen. Bitte Eingaben prüfen.'
      authMessage.classList.remove('auth-modal__message--success')
   })
}
