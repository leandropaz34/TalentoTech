// --------------- Utilidades para leer y escribir en el localStorage-------------

export const cargarCarritoDeLocalStorage=()=>{
    return JSON.parse(localStorage.getItem("contenido_carrito_de_compras"));
    
}

export const  guardarCarritoEnLocalStorage=(contenidoCarrito)=>{
    localStorage.setItem("contenido_carrito_de_compras",JSON.stringify(contenidoCarrito));
}


// --------------- Utilidades para contar productos en carrito y mostrar total en HTML -------------


//Suma la cantidad de cada producto en el carrito
export const calcularProductosCarrito = (arrayCarrito)=>{
    //Empecemos por ver si arrayCarrito no es null o undefined
    if(arrayCarrito){
        //Si la array tiene al menos un elemento
        if(arrayCarrito.length>0){
            //Primero un map para obtener las cantidades
            const cantidadCadaProducto = arrayCarrito.map((producto)=>producto.cantidad);
            //Despues se suman las cantidades de cada producto
            const cantidadProductosCarrito = cantidadCadaProducto.reduce((total,cantidad)=>total +=cantidad);
            return cantidadProductosCarrito;
        }
        else{
            //Está vacia...
            return 0;
        } 
    }else{
        //Si arrayCarrito no es null o undefined devolver 0 para que no de error
        return 0;
    }
}    

//Actualiza el HTML para mostrar la cantidad de productos 
//El parametro elemento  es el HTML que represente el "numerito"
export const actualizarNumeroProductosCarrito=(elemento,arrayCarrito)=>{
    const cantidadProductos = calcularProductosCarrito(arrayCarrito);
    elemento.textContent= cantidadProductos;
}
