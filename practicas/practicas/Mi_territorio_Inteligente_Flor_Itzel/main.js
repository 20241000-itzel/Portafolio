let lat=21.02787
let lon= -98.29050

    const coordenadas=[lat,lon]
            
    let map= L.map('map').setView(coordenadas,13)

     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    let marcador=L.marker(coordenadas).addTo(map)
    marcador.bindPopup('<b>Estoy aquí</b><br>Las coordenadas de mi casa son: <br>Latitud: ' +
    lat+'<br>Longitud: '+lon)

    let polygon=L.polygon([
    [21.02787 + 0.00009, -98.29050 - 0.00019],
    [21.02787 + 0.00009, -98.29050 + 0.00019],
    [21.02787 - 0.00009, -98.29050 + 0.00019],
    [21.02787 - 0.00009, -98.29050 - 0.00019]
    ],{
        color:'pink',
        fillcolor:'rgb(255, 0, 191)'
    }).addTo(map)
            
        
