document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mainSidebar = document.getElementById('main-sidebar');
    const body = document.body;
    // ---NUEVO CODIGO PARA RESALTAR CAMPO DE TEXTO ---
    const inputCampo = document.getElementById("miCampoText"); //Obtenemos la referencia al campo de texto
    // Evento cuando el usuario hace foco (click para escribir) en el campo
    inputCampo.addEventListener("focus", () => {
        inputCampo.classList.add("campo-resaltado"); // Añadimos la clase
        console.log("campo de texto enfocado. Clases: ", inputCampo.className)
    });

    // Evento cuando el usuario quita el foco (click fuera del campo)
    inputCampo.addEventListener("blur", () => {
        inputCampo.classList.remove("campo-resaltado"); // Removemos la clase
        console.log("campo de texto desenfocado. Clases: ", inputCampo.className)
    });

    // --- FIN DEL NUEVO CODIGO ---



    hamburgerBtn.addEventListener('click', () => {
        console.log("--- Click en boton hamburguesa ---");
        console.log("Clases de sidebar ANTES del toggle", mainSidebar.className);
        console.log("Clases de boton ANTES del toggle", hamburgerBtn.className );

        mainSidebar.classList.toggle('active'); // Alterna la clase 'active' en la sidebar
        hamburgerBtn.classList.toggle('active'); // Alterna la clase 'active' en el botón (para la animación de "X")
        body.classList.toggle('sidebar-open'); // Alterna la clase 'sidebar-open' en el body (para evitar scroll de fondo)

        console.log("Clases de sidebar DESPUES del toggle", mainSidebar.className);
        console.log("Clases de boton DESPUES del toggle", hamburgerBtn.className );
        console.log("-------------------------------------");
    });

    // Opcional: Cerrar el menú si se hace clic en un enlace de la sidebar
    const sidebarLinks = mainSidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // Solo cierra si estamos en móvil
                console.log("--- Click en Enlace de Sidebar (Movil) ---");
                console.log("Clases de Sidebar ANTES de remover active:", mainSidebar.className);
                
                mainSidebar.classList.remove('active');
                hamburgerBtn.classList.remove('active');
                body.classList.remove('sidebar-open');
                console.log("Clases de Sidebar y DESPUES de remover active:", mainSidebar.className);
                console.log("Clases de boton DESPUES de remover active:", hamburgerBtn.className);
                console.log("-----------------------------------------------");

            }
        });
    });
});