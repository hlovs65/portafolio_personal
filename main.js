// script.js

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const body = document.body;
    const mainNavMovilLinks = document.querySelectorAll('.main-nav-movil a');
    const siteSidebar = document.querySelector('.site-sidebar'); // Obtenemos el elemento sidebar directamente (Apunta a enlaces moviles)
    const siteHeader = document.querySelector(".site-header"); // ¡Importante! Referencia al header fijo
    const menuTransitionDuration = 300; // Duración de la transición del menú en milisegundos (0.3s)
    const mobileBreakpoint = 767; // Tu breakpoint CSS para móvil
    const scrollToTopBtn = document.querySelector(".scroll-to-top-btn"); // Asegúrate de tener esta constante

    // Función para alternar el                    
    function toggleMenu() {
        body.classList.toggle('menu-open');
    }

    // Función para saber si estamos en vista móvil
    function isMobileView() {
        return window.innerWidth <= mobileBreakpoint;
    }

    // Escucha clics en el botón de hamburguesa
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
        });
    }

    // Función para alternar el boton flotante  
    function toggleScrollButton () {
        if (window.pageYOffset > 200) {
            scrollToTopBtn.classList.add("show-scroll-btn");
        } else {
            scrollToTopBtn.classList.remove("show-scroll-btn");
        }
    }

    // Cierra el menú y desplaza a la sección al hacer clic en un enlace de navegación
    mainNavMovilLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // *** LA CLAVE: Condicionamos el comportamiento para móvil ***
            if (isMobileView()) {
                event.preventDefault(); // Previene el comportamiento por defecto (solo en móvil)
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (body.classList.contains('menu-open')) {
                    toggleMenu(); // Cierra el menú en móvil

                    // Espera a que la transición del menú y el ajuste del contenido terminen
                    // Añadimos un pequeño margen extra para mayor robustez
                    setTimeout(() => {
                        if (targetElement) {
                            // Obtenemos la altura del header *después* de que todo se haya reajustado
                            // Esto es más preciso para el cálculo final del scroll
                            const currentHeaderHeight = siteHeader.offsetHeight;
                            
                            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                            const offsetPosition = elementPosition - currentHeaderHeight;
                            
                            // *** Opcional: Debugging en consola para ajustar la posición ***
                            console.log('--- MOBILE SCROLL DEBUG ---');
                            console.log('Target ID:', targetId);
                            console.log('Current Header Height:', currentHeaderHeight);
                            console.log('Element Top (before scroll):', targetElement.getBoundingClientRect().top);
                            console.log('Window Y Offset:', window.pageYOffset);
                            console.log('Calculated Element Position:', elementPosition);
                            console.log('Final Offset Position:', offsetPosition);
                            console.log('---------------------------');
                            // *** Fin Debugging ***

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: "smooth"
                            });
                        }
                    }, menuTransitionDuration + 100); // Aumentado a 100ms extra para estabilidad
                }
            }
            // Si NO es vista móvil, el `event.preventDefault()` no se llama,
            // y el enlace funciona con su comportamiento nativo (desplazamiento a la ancla).
        });
    });

    // Cierra el menú si se hace clic fuera del menú o en la hamburguesa (solo en móvil)
    document.addEventListener('click', (event) => {
        if (isMobileView() && body.classList.contains('menu-open')) { // Aseguramos que solo actúe en móvil
            // Aseguramos que el clic NO fue dentro del botón de hamburguesa
            // Y NO fue dentro del contenedor del menú móvil (siteSidebar)
            const isClickInsideMenuOrHamburger = hamburgerMenu.contains(event.target) || 
                                                 (siteSidebar && siteSidebar.contains(event.target));            
            if (!isClickInsideMenuOrHamburger) {
                toggleMenu();
            }
        }
    });

    // *** Opcional: Cierra el menú automáticamente al cambiar a vista de escritorio ***
    window.addEventListener('resize', () => {
        if (!isMobileView() && body.classList.contains('menu-open')) {
            body.classList.remove('menu-open');
        }
    });

    window.addEventListener("scroll", toggleScrollButton);
    toggleScrollButton(); //Llam una vez al cargar 
});