const selecUsuario= document.getElementById("select-usuario")
const muroDiv=document.getElementById("muro")
const avatarImg=document.getElementById("avatar-img")
const nombreHeader=document.getElementById("nombre-usuario")

//cargamos los usuario en el select
fetch("https://jsonplaceholder.typicode.com/users")
.then(response=>response.json())
.then(usuarios=>{
    usuarios.forEach(usuario => {
        const opcion='<option value="'+usuarios.id+'">'+usuario.name+'</option>'
        selecUsuario.innerHTML+=opcion
    })
})

//que va a pasasr cada que seleccione un usuario
const cargaMuro=()=>{
    const userId=selecUsuario.value
    const nombre=selecUsuario.options[selecUsuario.selectedIndex].text

    nombreHeader.innerText=nombre
    avatarImg.src="https://api.dicebear.com/9.x/dylan/svg?seed="+nombre
    avatarImg.style.display="block"

    //cargamos el muro
}