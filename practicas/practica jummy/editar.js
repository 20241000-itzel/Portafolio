const API = 'https://dummyjson.com/products';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');


fetch(`${API}/category-list`)
    .then(res => res.json())
    .then(data => {
        const select = document.getElementById('categoria');
        data.forEach(cat => {
            select.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
    });

fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(p => {
        document.getElementById('titulo').value = p.title;
        document.getElementById('precio').value = p.price;
        document.getElementById('descripcion').value = p.description;
        document.getElementById('thumbnail').value = p.thumbnail;
        document.getElementById('categoria').value = p.category;
    });


function guardarCambios() {
    const producto = {
        title: document.getElementById('titulo').value,
        price: Number(document.getElementById('precio').value),
        category: document.getElementById('categoria').value,
        description: document.getElementById('descripcion').value,
        thumbnail: document.getElementById('thumbnail').value
    };

    fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('mensaje').innerHTML = `
            <strong>Producto actualizado</strong><br>
            ${data.title} - $${data.price}
        `;
    });
}
