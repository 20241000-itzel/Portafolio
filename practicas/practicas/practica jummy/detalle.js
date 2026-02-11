const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(p => {
        document.getElementById('detalle').innerHTML = `
            <img src="${p.thumbnail}" width="300">
            <h2>${p.title}</h2>
            <p>${p.description}</p>
            <p><strong>Precio:</strong> $${p.price}</p>
            <p><strong>Categoría:</strong> ${p.category}</p>

            <button onclick="irEditar()">Editar</button>
            <button onclick="eliminarProducto()">Eliminar</button>
        `;
    });

function irEditar() {
    window.location.href = `editar.html?id=${id}`;
}

function eliminarProducto() {
    if (!confirm('¿Eliminar producto?')) return;

    fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        alert('Producto eliminado');
        window.location.href = 'index.html';
    });
}
