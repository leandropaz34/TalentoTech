function toggleMenu() {
    const menu = document.querySelector('.nav_MenuHorizontal');
    menu.classList.toggle('active');
}

// Hacer la función accesible globalmente
window.toggleMenu = toggleMenu;
