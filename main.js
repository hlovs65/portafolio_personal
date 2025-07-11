// main.js


document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const body = document.body;
    const mainNavMovilLinks = document.querySelectorAll('.main-nav-movil a');
    const siteSidebar = document.querySelector('.site-sidebar');
    const siteHeader = document.querySelector(".site-header");
    const menuTransitionDuration = 300;
    const mobileBreakpoint = 767;
    const scrollToTopBtn = document.querySelector(".scroll-to-top-btn");

    // Formulario variables:
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // ... (Tus funciones toggleMenu, isMobileView, etc. aquí) ...
    function toggleMenu() {
        body.classList.toggle('menu-open');
    }

    function isMobileView() {
        return window.innerWidth <= mobileBreakpoint;
    }

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
        });
    }

    function toggleScrollButton() {
        if (window.pageYOffset > 200) {
            scrollToTopBtn.classList.add("show-scroll-btn");
        } else {
            scrollToTopBtn.classList.remove("show-scroll-btn");
        }
    }

    mainNavMovilLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            if (isMobileView()) {
                event.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (body.classList.contains('menu-open')) {
                    toggleMenu();
                    setTimeout(() => {
                        if (targetElement) {
                            const currentHeaderHeight = siteHeader.offsetHeight;
                            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                            const offsetPosition = elementPosition - currentHeaderHeight;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: "smooth"
                            });
                        }
                    }, menuTransitionDuration + 100);
                }
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (isMobileView() && body.classList.contains('menu-open')) {
            const isClickInsideMenuOrHamburger = hamburgerMenu.contains(event.target) ||
                (siteSidebar && siteSidebar.contains(event.target));
            if (!isClickInsideMenuOrHamburger) {
                toggleMenu();
            }
        }
    });

    window.addEventListener('resize', () => {
        if (!isMobileView() && body.classList.contains('menu-open')) {
            body.classList.remove('menu-open');
        }
    });

    window.addEventListener("scroll", toggleScrollButton);
    toggleScrollButton();

    // --- Nuevas funciones de validación ---

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidName(name) {    // Valida que el nombre solo contenga letras, espacios, guiones y apóstrofes
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]{2,50}$/;  // Permite letras (con acentos), espacios, guiones, apóstrofes. Mínimo 2 caracteres, máximo 50.
        return nameRegex.test(name);
    }

    function isValidSubject(subject) {   // Valida que el asunto tenga caracteres básicos. Mínimo 5, máximo 100.        
        const subjectRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,!?-]{5,100}$/;  // Permite letras, números, espacios y signos de puntuación comunes.
        return subjectRegex.test(subject);
    }


    function sanitizeMessage(message) {  // Limpia el mensaje de posibles inyecciones HTML básicas (no es seguridad completa)        
        return message.replace(/</g, "&lt;").replace(/>/g, "&gt;");  // Reemplaza < > con sus entidades HTML para evitar que el navegador los interprete como etiquetas
    }

    // --- Lógica de Validación del Formulario ---
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {

            event.preventDefault();  //detenemos el envio del formulario por defecto.

            let isValid = true; // Para la validación global de JS
            const nameValue = nameInput.value.trim();
            const emailValue = emailInput.value.trim();
            const subjectValue = subjectInput.value.trim();
            const messageValue = messageInput.value.trim();

            // 1. Validación del Nombre
            if (nameValue === '') {
                alert('Por favor, ingresa tu nombre.');
                nameInput.focus();
                isValid = false;
            } else if (!isValidName(nameValue)) {
                alert('El nombre solo puede contener letras, espacios, guiones y apóstrofes. Debe tener entre 2 y 50 caracteres.');
                nameInput.focus();
                isValid = false;
            }

            // 2. Validación del Email
            if (isValid) {
                if (emailValue === '') {
                    alert('Por favor, ingresa tu correo electrónico.');
                    emailInput.focus();
                    isValid = false;
                } else if (!isValidEmail(emailValue)) {
                    alert('Por favor, ingresa un formato de correo electrónico válido (ej. tu.email@dominio.com).');
                    emailInput.focus();
                    isValid = false;
                }
            }

            // 3. Validación del Asunto
            if (isValid) {
                if (subjectValue === '') {
                    alert('Por favor, ingresa un asunto para tu mensaje.');
                    subjectInput.focus();
                    isValid = false;
                } else if (!isValidSubject(subjectValue)) {
                    alert('El asunto contiene caracteres no permitidos o es demasiado corto/largo (mín. 5, máx. 100 caracteres).');
                    subjectInput.focus();
                    isValid = false;
                }
            }

            // 4. Validación del Mensaje
            if (isValid) {
                if (messageValue === '') {
                    alert('Por favor, ingresa un mensaje.');
                    messageInput.focus();
                    isValid = false;
                } else if (messageValue.length < 10) {
                    alert('Tu mensaje es demasiado corto (mínimo 10 caracteres).');
                    messageInput.focus();
                    isValid = false;
                } else if (messageValue.length > 500) { // Ejemplo: máximo 500 caracteres
                    alert('Tu mensaje es demasiado largo (máximo 500 caracteres).');
                    messageInput.focus();
                    isValid = false;
                }
            }


            if (isValid) {  // Si todas las validaciones JS pasan
                console.log('Formulario válido, enviando...');
                this.submit();
            }
        });
    }
});