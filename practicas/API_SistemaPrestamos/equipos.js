const urlApi= "http://localhost/u138650717_loanware/apiEquipos.php";

const cargarEquipos=()=>{
    fetch(urlApi)
        .then(respuesta=>respuesta.json())
        .then(data => {
            console.log("Datos recibidos: ", data);
            mostrarEquipos(data);
        })

        .catch(error =>{
            console.error("Error al cargar los equipos: ",error);
            
        });

};

const mostrarEquipos=(equipos)=>{
    const contenedor=document.getElementById("contenedor-equipos");
    contenedor.innerHTML="";

    equipos.forEach(equipo => {
        const tarjeta=document.createElement("div");
        tarjeta.classList.add("practice-card");

        tarjeta.innerHTML=`
        <img src="${equipo.ruta_imagen}" alt="${equipo.nombre}>
            <h3 class="practice-title">${equipo.nombre}</h3>
            <p><strong>Disponibles: </strong>${equipo.cantidad_disponible}</p>
            <p class="practice-description">${equipo.descripcion}</p>
            `;
        contenedor.appendChild(tarjeta);
    });
};

