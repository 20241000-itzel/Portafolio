//obtenermos el id del producto desde la url
const params=new URLSearchParams(window.location.search)
const id=params.get("id")

fetch(`https://dummyjson.com/products/${id}`)
    .then(resultado=>resultado.json())
    .then(producto=>{
        const div=document.getElementById("detalle")

        div.innerHTML = `
            <img src="${producto.images[0]}" alt="${producto.title}">
            
            <div class="detalle-info">
                <h2>${producto.title}</h2>
                <p><strong>Descripción:</strong> ${producto.description}</p>
                <p><strong>Precio:</strong> $${producto.price}</p>
                <p><strong>Categoría:</strong> ${producto.category}</p>

                <h3>Comentarios</h3>
                <ul id="comentarios"></ul>
            </div>
`;
    producto.reviews.forEach(review => {
        document.getElementById("comentarios").innerHTML+=`
        <li>
            ${review.rating}-${review.comment}
            <br><small>Por:${review.reviewerName}</small>
        </li>`
        
    });
})

