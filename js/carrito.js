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
            <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.name}" class="img-producto">
            <h2>${item.name}</h2>
            <p class="precio">$${item.price}</p>
            <p>Cantidad: ${item.cantidad}</p>
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

    // Calcular el total teniendo en cuenta la cantidad de cada producto
    const total = carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
    totalProductos.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);  // Total de productos
    importeTotal.textContent = total.toFixed(2);
};

// Elimina un producto del carrito
export const eliminarDelCarrito = (indice) => {
     const producto = carrito[indice];

    if (producto.cantidad > 1) {
        // Si hay más de una unidad, solo disminuir la cantidad
        producto.cantidad -= 1;
    } else {
        // Si es la última unidad, eliminar el producto
        carrito.splice(indice, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();  // Vuelve a renderizar el carrito con los productos actualizados
};

// Simula la compra
export const realizarCompra = () => {
    alert("Compra realizada con éxito");
    localStorage.removeItem("carrito");  // Elimina el carrito de localStorage
    window.location.href = "../index.html";  // Redirige a la página principal
};

// Inicializa el carrito al cargar la página
document.addEventListener("DOMContentLoaded", mostrarCarrito);
