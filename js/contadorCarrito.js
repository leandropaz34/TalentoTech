// Recuperar el contador del carrito del almacenamiento local y actualizar el DOM
const actualizarContadorCarrito = () => {
    const contadorCarrito = document.getElementById("contador-carrito");
    const contador = localStorage.getItem("contador-carrito") || 0;
    contadorCarrito.textContent = contador;
};

// Inicializar el contador del carrito al cargar la página
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
