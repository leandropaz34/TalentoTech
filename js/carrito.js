// Recuperar el carrito del almacenamiento local
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// importar funsionactualizarContadorCarrito 
import { actualizarContadorCarrito } from './contadorCarrito.js';

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
            <img src="${item.image}" alt="${item.name}" class="imagen-producto" />
            <h2>${item.name}</h2>
            <p class="precio">Precio: $${item.price}</p>
            <p>Cantidad: <span id="cantidad-${indice}">${item.cantidad}</span></p>
            <div class="acciones-carrito">
                <button onclick="disminuirCantidad(${indice})">-</button>
                <button onclick="aumentarCantidad(${indice})">+</button>
                <button onclick="eliminarDelCarrito(${indice})">Eliminar</button>
            </div>
        `;
        lista.appendChild(producto);
    });

    actualizarResumen();
};

// Actualiza el resumen del carrito
const actualizarResumen = () => {
    const totalProductos = document.getElementById("total-productos");
    const importeTotal = document.getElementById("importe-total");

    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalImporte = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);

    totalProductos.textContent = totalCantidad;
    importeTotal.textContent = totalImporte.toFixed(2);
};

// Aumenta la cantidad de un producto en el carrito
export const aumentarCantidad = (indice) => {
    carrito[indice].cantidad += 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
};

// Disminuye la cantidad de un producto en el carrito
export const disminuirCantidad = (indice) => {
    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad -= 1;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    } else {
        eliminarDelCarrito(indice);
    }
};

// Elimina un producto del carrito
export const eliminarDelCarrito = (indice) => {
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(); // Vuelve a renderizar el carrito con los productos actualizados
    actualizarContadorCarrito(); // Actualiza el contador del carrito
};

// Simula la compra
export const realizarCompra = () => {
    alert("Compra realizada con éxito");
    localStorage.removeItem("carrito"); // Elimina el carrito de localStorage
    actualizarContadorCarrito(); // Actualiza el contador del carrito
    window.location.href = "../index.html"; // Redirige a la página principal
};

// Inicializa el carrito al cargar la página
document.addEventListener("DOMContentLoaded", mostrarCarrito);

window.realizarCompra = realizarCompra;
window.aumentarCantidad = aumentarCantidad;
window.disminuirCantidad = disminuirCantidad;
window.eliminarDelCarrito = eliminarDelCarrito;

