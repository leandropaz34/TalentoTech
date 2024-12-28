const actualizarContadorCarrito = () => {
    const contadorCarrito = document.getElementById("contador-carrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    contadorCarrito.textContent = carrito.length;
};

document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

