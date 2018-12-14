let login=()=>{
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let data={
        email,
        password
    }
    fetch("http://68.183.27.173:8080/login",{
        method:"POST",
        body: JSON.stringify(data),
        headers: {"Content-Type":'application/json'}
    })
    .then(res => res.json())
    .then(res => {
            if(typeof res.token != 'undefined'){
                //  document.getElementById("error-login").style.display='none';
                localStorage.setItem('token', res.token);
                window.location='post.html';
            } else{
             alert('Login incorrecto!!!');
            
              
            }

        })
    .catch(err=>console.log(err));
}
(function(){
    document.getElementById('login').addEventListener("click", login);
})();
