document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mainSidebar = document.getElementById('main-sidebar');
    const body = document.body;

    hamburgerBtn.addEventListener('click', () => {
        mainSidebar.classList.toggle('active'); // Alterna la clase 'active' en la sidebar
        hamburgerBtn.classList.toggle('active'); // Alterna la clase 'active' en el botón (para la animación de "X")
        body.classList.toggle('sidebar-open'); // Alterna la clase 'sidebar-open' en el body (para evitar scroll de fondo)
    });

    // Opcional: Cerrar el menú si se hace clic en un enlace de la sidebar
    const sidebarLinks = mainSidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // Solo cierra si estamos en móvil              
                mainSidebar.classList.remove('active');
                hamburgerBtn.classList.remove('active');
                body.classList.remove('sidebar-open');
            }
        });
    });
});