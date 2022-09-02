document.addEventListener('DOMContentLoaded', function() {

    function checkEmail() {
    
        let inputEmail = document.getElementById('email');
        let mensajeEmail = document.getElementById('mensaje-email');
        let todoOk = true;
    
            if (inputEmail.value.length === 0){
                todoOk = false;
                inputEmail.style.border = 'red solid 2px';
                mensajeEmail.innerText = 'Usuario inválido';
            }

        return todoOk;
    }

    function checkPassword() {
    
        let inputContrasena = document.getElementById('contrasena');
        let mensajeContrasena  = document.getElementById('mensaje-pass')
        let todoOk = true;

            if (inputContrasena.value.length === 0){
                todoOk = false;
                inputContrasena.style.border = 'red solid 2px';
                mensajeContrasena.innerText = 'Constraseña inválida';
            }
        
        return todoOk;
    }

    let formularioLogin = document.getElementById('formulario');

    formularioLogin.addEventListener('submit', function(evento) {
        if (checkEmail(true) && checkPassword(true)){
            let campoUsuario = document.getElementById('email').value;
            localStorage.setItem('Usuario', campoUsuario);
            console.log('Logueado')
        }
        else {
            evento.preventDefault();
            console.log('Error en campos');
        }
    })

});

