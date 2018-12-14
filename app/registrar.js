
function registrarse(){
     var email =  $("#email").val();
     var name =  $("#name").val();
     var password =  $("#password").val();
     var password2 =  $("#password2").val();

     if(password != password2){
          alert("las contraseñas no coinciden");
          return;
     }

     var data = {
          name: name,
          email: email,
          password: password
     }

     fetch("http://68.183.27.173:8080/register", {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
}

$(document).ready(function(){
     $("#registrarse").click(function(){
          registrarse();
     });
 });
 