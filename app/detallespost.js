$(document).ready(function () {
    detallepost();
    obtenerComentarios();
});
function volveralistapost() {
    location.href="post.html";
}
function detallepost() {
    var lista = $("#detallePost");

    var plantilla = `
        <div class="card-body">
            <h5 class="card-title">{titulo}</h5>
            <p class="card-text">{cuerpo}</p>
            <p>{email}</p>
            <p>{likes}</p>
            </div>
        </div>
        `
    var token = localStorage.getItem("token");
    var postId = localStorage.getItem("postId");

    fetch(`http://68.183.27.173:8080/post/${postId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.json())
        .then(response => {
            console.log(response);
            var post = response;
            var item = plantilla
                .replace('{titulo}', post.title)
                .replace('{cuerpo}', post.body)
                .replace('{email}', post.userEmail)
                .replace('{likes}', post.likes);

            lista.append(`${item}`);
            

        })
        .catch(error => console.error('Error:', error));

}

function obtenerComentarios() {
    var lista = $("#listadoComentario");
    
    var plantilla = `
    <div class="card-body">
        <h5 class="card-title"> <i id='star-{id}' class="{star} fa-star" data-like="{liked}" onclick="meGusta({id})"></i>{titulo}</h5>
        <p>{usuario}</p>
        <p>{email}</p>
        <p>{comentarios}</p>
    </div>
    `
    var token = localStorage.getItem("token");
    var postId = localStorage.getItem("postId");

    fetch(`http://68.183.27.173:8080/post/${postId}/comment`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.json())
        .then(response => {
            for (var post of response) {
                var item = plantilla
    
                .replace('{titulo}', post.body)
                .replace('{email}', post.userEmail)
                .replace('{usuario}', post.userName)
                .replace('{comentarios}', post.Comment);
                

                lista.append(`${item}`);
            }
        })
        .catch(error => console.error('Error:', error));

}
