const API = 'https://dummyjson.com/products';
let skip = 0;
const limit = 10;
let total = 0;

function cargarProductos() {
    fetch(`${API}?limit=${limit}&skip=${skip}`)
        .then(res => res.json())
        .then(data => {
            total = data.total;
            mostrarProductos(data.products);
            actualizarPagina();
        });
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';

    productos.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${p.thumbnail}">
            <h3>${p.title}</h3>
            <p><strong>$${p.price}</strong></p>
            <p>${p.category}</p>
            <button onclick="verDetalle(${p.id})">Ver detalles</button>
        `;
        contenedor.appendChild(card);
    });
}

function verDetalle(id) {
    window.location.href = `detalle.html?id=${id}`;
}

function actualizarPagina() {
    const pagina = Math.floor(skip / limit) + 1;
    const totalPaginas = Math.ceil(total / limit);
    document.getElementById('infoPagina').innerText =
        `Página ${pagina} de ${totalPaginas}`;
}

function siguiente() {
    if (skip + limit < total) {
        skip += limit;
        cargarProductos();
    }
}

function anterior() {
    if (skip > 0) {
        skip -= limit;
        cargarProductos();
    }
}

function buscarProducto() {
    const texto = document.getElementById('buscador').value;
    fetch(`${API}/search?q=${texto}`)
        .then(res => res.json())
        .then(data => mostrarProductos(data.products));
}

function cargarCategorias() {
    fetch(`${API}/category-list`)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById('selectCategoria');
            select.innerHTML = '<option value="">Todas</option>';
            data.forEach(cat => {
                select.innerHTML += `<option value="${cat}">${cat}</option>`;
            });
        });
}

function filtrarCategoria() {
    const cat = document.getElementById('selectCategoria').value;
    if (cat === '') {
        cargarProductos();
    } else {
        fetch(`${API}/category/${cat}`)
            .then(res => res.json())
            .then(data => mostrarProductos(data.products));
    }
}

cargarCategorias();
cargarProductos();
