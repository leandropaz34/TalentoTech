// Recuperar el carrito del almacenamiento local
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Muestra los productos en el carrito
const mostrarCarrito = () => {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";

    if (carrito.length === 0) {
        lista.innerHTML = '<p>Tu carrito está vacío</p>';
        actualizarResumen();
        return;
    }

    carrito.forEach((item, indice) => {
        const producto = document.createElement("article");
        producto.classList.add("producto");
        producto.innerHTML = `
            <h2>${item.name}</h2>
            <p class="precio">$${item.price}</p>
            <button onclick="eliminarDelCarrito(${indice})">Eliminar</button>
        `;
        lista.appendChild(producto);
    });

    actualizarResumen();
};

// Actualiza el resumen del carrito
const actualizarResumen = () => {
    const totalProductos = document.getElementById("total-productos");
    const importeTotal = document.getElementById("importe-total");

    const total = carrito.reduce((acc, item) => acc + item.price, 0);
    totalProductos.textContent = carrito.length;
    importeTotal.textContent = total.toFixed(2);
};

// Elimina un producto del carrito
const eliminarDelCarrito = (indice) => {
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();  // Vuelve a renderizar el carrito con los productos actualizados
};

// Simula la compra
const realizarCompra = () => {
    alert("Compra realizada con éxito");
    localStorage.removeItem("carrito");  // Elimina el carrito de localStorage
    window.location.href = "../index.html";  // Redirige a la página principal
};

// Inicializa el carrito al cargar la página
document.addEventListener("DOMContentLoaded", mostrarCarrito);
