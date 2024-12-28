// Seleccionar el botón y el menú
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav_MenuHorizontal');

// Función para alternar la visibilidad del menú
function toggleMenu() {
    menu.classList.toggle('active');
}

// Escuchar el evento de clic en el botón hamburguesa
hamburger.addEventListener('click', toggleMenu);

// Hacer la función accesible globalmente
window.toggleMenu = toggleMenu;
