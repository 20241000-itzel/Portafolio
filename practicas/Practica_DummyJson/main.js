const urlApi="https://dummyjson.com/products";

let listaProductos=[]

const cargarProductos=()=>{
    fetch(urlApi)
        .then(respuesta=>respuesta.json())
        .then(data=>{
            listaProductos=data.products;
            console.log("Productos recibidos:",listaProductos);
            mostrarProductos(listaProductos);
        })
        .catch(error=>{
            console.error("Error al cargar los productos:",error);

        });
       
 
};
    
const mostrarProductos=(productos)=>{
    const contenedor=document.getElementById("productos");
    contenedor.innerHTML="";
    productos.forEach(producto => {
        const tarjeta=document.createElement("div");
        tarjeta.classList.add("card");

        tarjeta.addEventListener("click",()=>{
            window.location.href=`detalle.html?id=${producto.id}`;
        });
        tarjeta.innerHTML=`
            <div class="img-box">
                <img src="${producto.images[0]}" alt="${producto.title}">
            </div>
            <h3>${producto.title}</h3>
            <p class="precio">$${producto.price}</p>
            <p class="categoria">${producto.category}</p>
            <button>Ver detalles</button>
        `;

        contenedor.appendChild(tarjeta);
    });
};

const filtrarProductos=()=>{
    const texto=document.getElementById("buscador").value.toLowerCase();

    const filtrados=listaProductos.filter(producto=>
        producto.title.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
};

const guardarproducto=()=>{
    //creamos las variables de los elementos con los que vamos a interactuar
    const titulo=document.getElementById("titulo").value
    const precio=parseFloat(document.getElementById("precio").value)
    const categoria=document.getElementById("categoria").value
    const descripcion=document.getElementById("descripcion").value
    const resultado=document.getElementById("mensaje-exito")

    //validamos que no vengan vacios
    if(!titulo || !precio || !descripcion){
        alert("Completa los campos obligatorios")
        return 
    }

    //creamos el objeto que se va por el body
    const producto={
        title:titulo,
        price:precio,
        category:categoria,
        description:descripcion,
        thumbnail:'https://dummyjson.com/image/400x200/008080/ffffff?text='+titulo
    
    }
    //hacemos la peticion
    fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
    })
    .then(res => res.json())
    .then(data=>{
        console.log("Respuesta del API", data)
        resultado.style.display="block"
        resultado.innerHTML=`
        <strong>¡Producto agregado correctamente!</strong><br>
        Id asignado: ${data.id}<br>
        Nombre: ${data.title}<br>
        Precio: ${data.price}.

        `
    })

}

cargarProductos();