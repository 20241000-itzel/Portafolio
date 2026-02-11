const urlApi = "https://rickandmortyapi.com/api/character";
let paginaActual=1;
let textoBusqueda="";

const cargarPersonajes = () => {

    let url=`${urlApi}?page=${paginaActual}`;
    if (textoBusqueda!==""){
        url+=`&name=${textoBusqueda}`;
    }
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            mostrarPersonajes(data.results);
        })
        .catch(error => {
            console.error("Error al cargar personajes:", error);
            alert("Hubo un error al cargar los datos.");
        });
};
const mostrarPersonajes = (personajes) => {

    const contenedor = document.getElementById("contenedor-personajes");
    contenedor.innerHTML = "";

    personajes.slice(0, 8).forEach(personaje => {

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("practice-card");

        tarjeta.innerHTML = `
            <img src="${personaje.image}">
            <h3>${personaje.name}</h3>
        `;
        tarjeta.onclick = () => {
            mostrarDetalle(personaje);
        };
        contenedor.appendChild(tarjeta)
    });
};

const mostrarDetalle=(personaje)=>{
    const detalle= document.getElementById("detalle-personaje")
    const modal = document.getElementById("modal");
            detalle.innerHTML=`
            <h2>${personaje.name}</h2>
            <img src="${personaje.image}" width="200">
            <p><strong>Estado: </strong>${personaje.status}</p>
            <p><strong>Especie: </strong>${personaje.species}</p>
            <p><strong>Género: </strong>${personaje.gender}</p>
            
            `;
            modal.style.display = "block";
};

document.getElementById("cerrar").onclick = () => {
    document.getElementById("modal").style.display = "none";
};

document.getElementById("btnBuscar").onclick=()=>{
    textoBusqueda=document.getElementById("buscador").value;
    paginaActual=1;
    cargarPersonajes();
}

document.getElementById("btnSiguiente").onclick=()=>{
    paginaActual++;
    cargarPersonajes();
}

document.getElementById("btnAnterior").onclick=()=>{
    if(paginaActual>1){
        paginaActual--;
    }
    cargarPersonajes();
}


cargarPersonajes();