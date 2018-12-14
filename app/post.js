$(document).ready(function () {
    obtenerPost();
});

function meGusta(id) {
    var token = localStorage.getItem("token");

    var data = $('#star-' + id).data();
    $("#star-" + id).removeClass(data.like ? 'fas' : 'far');
    $("#star-" + id).addClass(data.like ? 'far' : 'fas');

    fetch(`http://68.183.27.173:8080/post/${id}/like`, {
        method: data.like ? 'DELETE' : 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + token
        }
    }).then(response => {
        data.like = data.like ? false : true;
    });
}

function obtenerPost() {
    var lista = $("#listadoPost");

    var plantilla = `
        <div class="card mb-3">
            <h5 class="card-header"">
                <i id='star-{id}' class="{star} fa-star" data-like="{liked}" onclick="meGusta({id})"></i>        
                <a href="javascript:;" onclick="abrirDetalle({id})"> {titulo} </a>
            </h5>
            <div class="card-body">
                <p class="card-text">{cuerpo}</p>
                <a href="javascript:;">{email}</a>
                <p>{fecha}</p>
                <p>likes: <span id="post-likes-{id}">{likes}</span></p>
                <p>comentarios: {comentarios}</p>
                <p>vistas: <span id="post-vistas-{id}">{vistas}</span> </p>
            </div>
        </div>
        `

    var token = localStorage.getItem("token");

    // wsConnect(token);

    fetch("http://68.183.27.173:8080/post", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json())
        .then(response => {

               for (var post of response) {
               var fecha = new Date(post.createdAt).toLocaleDateString('es-RD');
           
                var item = plantilla
                    .replace('{star}', (post.liked ? 'fas' : 'far'))
                    .replace(new RegExp('{id}', 'g'), post.id)
                    .replace(new RegExp('{liked}', 'g'), post.liked)
                    .replace('{liked}', post.liked)
                    .replace('{titulo}', post.title)
                    .replace('{cuerpo}', post.body)
                    .replace('{email}', post.userEmail)
                    .replace('{likes}',post.likes)
                    .replace('{comentarios}',post.comments)
                    .replace('{vistas}', post.views)
                    .replace('{fecha}', fecha);

                lista.append(`${item}`);
            }

        })
        .catch(error => console.error('Error:', error));
}

function abrirDetalle(postId) {
    localStorage.setItem("postId", postId);
    location.href = "detallepost.html";
}

function wsConnect(token) {

    console.log("WS- connect ", token);
    var websocket = new WebSocket(`ws://68.183.27.173:8080/?token=${token}`);
    websocket.onopen = function (evt) {
        console.log(evt)
    };
    websocket.onclose = function (evt) {
        console.log(evt)
    };
    websocket.onerror = function (evt) {
        console.log(evt)
    };

    websocket.onmessage = function (evt) {
        var data = JSON.parse(evt.data);
        console.log(data);
        switch (data.type) {
            case "likes":
                $('#post-likes-' + data.postId).text(data.likes);
                break;
            case "view-post":
                $('#post-vistas-' + data.postId).text(data.views);
                break;

        }
    };
}