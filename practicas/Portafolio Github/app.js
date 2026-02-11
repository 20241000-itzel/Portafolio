const usuario = "20241000-itzel";

fetch(`https://api.github.com/users/${usuario}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("avatar").src = data.avatar_url;
        document.getElementById("nombre").textContent = data.name;
        document.getElementById("bio").textContent = data.bio;
        document.getElementById("ubicacion").textContent = data.location;
    });


fetch(`https://api.github.com/users/${usuario}/repos?sort=updated&direction=desc&per_page=6&type=owner`)
    .then(response => response.json())
    .then(repos => {
        const lista = document.getElementById("repos");
        repos.forEach(repo => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
            lista.appendChild(li);
        });
    });


fetch(`https://api.github.com/users/${usuario}/followers?per_page=5`)
    .then(response => response.json())
    .then(followers => {
        const contenedor = document.getElementById("followers");
        followers.forEach(follower => {
            const img = document.createElement("img");
            img.src = follower.avatar_url;
            img.width = 50;
            contenedor.appendChild(img);
        });
    });
