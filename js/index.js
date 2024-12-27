document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "../json/data.json"; // URL de la API
    const contenedorProductos = document.getElementById("contenedor-productos");
    const selectorCategorias = document.getElementById("selector-categorias");

       // Función para obtener datos de la API 
    let productos = []; // Array para almacenar los productos

// variable global para almacenar los productos seleccionados
let carrito = [];

const agregarAlcarrito = (name,price) =>{
    //agregar el producto como un objeto al carrito
    carrito.push({name,price})

    // actualizar el contador visual del carrito
    actualizarContador()
    // muestra un alerta de confirmacion
    alert(`Agregaste : ${name} al carrito`)
}


// funcion para actualizar el contador del carrito
const actualizarContador = ()=>{
    //cambiamos el contenido del HTML con el ID contador-carrito
    document.getElementById("contador-carrito").textContent = carrito.length

}

// Guarda el contenido del carrito en el almacenamiento local antes de cerrar la pagina

window.addEventListener("beforeunload",()=>{
localStorage.setItem("carrito",JSON.stringify(carrito))
});




    
    async function fetchProductos() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            productos = await response.json();
            cargarCategorias(productos);
            mostrarProductos(productos);
        } catch (error) {
            console.error("Error al obtener datos:", error.message);
            contenedorProductos.innerHTML = `<p>Error al cargar los productos.</p>`;
        }
    }

    // Función para cargar categorías en el selector
    function cargarCategorias(productos) {
        const categorias = [...new Set(productos.map(producto => producto.category || "Sin categoría"))];
        selectorCategorias.innerHTML = `<option value="all">Todas las categorías</option>`;
        categorias.forEach(categoria => {
            const option = document.createElement("option");
            option.value = categoria;
            option.textContent = categoria;
            selectorCategorias.appendChild(option);
        });
    }

    // Función para mostrar productos en el contenedor
function mostrarProductos(productos) {
    contenedorProductos.innerHTML = ""; // Limpiar contenido previo
    if (productos.length === 0) {
        contenedorProductos.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }
    productos.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");

        let contenidoHTML = `
            <img src="${producto.image || 'https://via.placeholder.com/150'}" alt="${producto.name}">
            <h3>${producto.name}</h3>
        `;

        // Verificar cada campo y añadir solo si tiene información
        if (producto.year) {
            contenidoHTML += `<p>Año: ${producto.year}</p>`;
        }
        if (producto.price) {
            contenidoHTML += `<p>Precio: $${producto.price}</p>`;
        }
        if (producto.marca) {
            contenidoHTML += `<p>Marca: ${producto.marca}</p>`;
        }
        if (producto.availability) {
            contenidoHTML += `<p>Disponibilidad: ${producto.availability}</p>`;
        }
        if (producto.branch) {
            contenidoHTML += `<p>Localidad: ${producto.branch}</p>`;
        }
        if (producto.adress) {
            contenidoHTML += `<p>Dirección: ${producto.adress}</p>`;
        }
        if (producto.hours) {
            contenidoHTML += `<p>Horario de atención: ${producto.hours}</p>`;
        }
        if (producto.description) {
            contenidoHTML += `<p>${producto.description}</p>`;
        }

       // Agregar el botón solo si la categoría es 'Repuesto'
        
        if (producto.category === 'Repuesto') {
            contenidoHTML += `<button class="agregar-carrito" onclick="agregarAlCarrito((${producto.id}))">Agregar al carrito</button>`;
        }


        // Añadir el contenido al contenedor del producto
        productoDiv.innerHTML = contenidoHTML;
        contenedorProductos.appendChild(productoDiv);
    });
}


    // Filtrar productos por categoría
    selectorCategorias.addEventListener("change", (e) => {
        const categoriaSeleccionada = e.target.value;
        const productosFiltrados = categoriaSeleccionada === "all"
            ? productos
            : productos.filter(producto => producto.category === categoriaSeleccionada);
        mostrarProductos(productosFiltrados);
    });

    // Llamar a la función para cargar los datos al cargar la página
    fetchProductos();
});
