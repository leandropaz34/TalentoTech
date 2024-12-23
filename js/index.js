document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://fakestoreapi.com/products"; // URL de la API
    const contenedorProductos = document.getElementById("contenedor-productos");
    const selectorCategorias = document.getElementById("selector-categorias");

    let productos = []; // Array para almacenar los productos

    // Función para obtener datos de la API
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

            productoDiv.innerHTML = `
                <img src="${producto.image || 'https://via.placeholder.com/150'}" alt="${producto.name}">
                <h3>${producto.name}</h3>
                <p>Año: ${producto.year || "N/A"}</p>
                <p>Precio: $${producto.price || "N/A"}</p>
                <p>${producto.description || "Sin descripción disponible."}</p>
            `;
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
