const API = 'https://dummyjson.com/products';

fetch(`${API}/category-list`)
    .then(res => res.json())
    .then(data => {
        const select = document.getElementById('categoria');
        select.innerHTML = '<option value="">Selecciona una categoría</option>';
        data.forEach(cat => {
            select.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
    });

function guardarProducto() {
    const titulo = document.getElementById('titulo').value.trim();
    const precio = document.getElementById('precio').value.trim();
    const categoria = document.getElementById('categoria').value;
    const descripcion = document.getElementById('descripcion').value.trim();
    const mensaje = document.getElementById('mensaje-exito');

    if (!titulo || !precio || !categoria || !descripcion) {
        alert('Completa todos los campos');
        return;
    }

    const producto = {
        title: titulo,
        price: Number(precio),
        category: categoria,
        description: descripcion,
        thumbnail: `https://dummyjson.com/image/400x300/ffc0cb/ffffff?text=${encodeURIComponent(titulo)}`
    };

    fetch(`${API}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
    .then(res => res.json())
    .then(data => {
        mensaje.innerHTML = `
            <strong>Producto creado correctamente</strong><br>
            ID: ${data.id}<br>
            PRODUCTO: ${data.title}<br>
            PRECIO: $${data.price}
        `;
    })
    .catch(() => alert('Error al crear producto'));
}
