let inputPrimerNombre = document.getElementById("inputPrimerNombre");
let inputSegundoNombre = document.getElementById("inputSegundoNombre");
let inputPrimerApellido = document.getElementById("inputPrimerApellido");
let inputSegundoApellido = document.getElementById("inputSegundoApellido");
let inputEmail = document.getElementById("inputEmail");
let inputTelefono = document.getElementById("inputTelefono");
let botonGuardarPerfil = document.getElementById("botonGuardarPerfil");

//Muestra email registrado al ingresar al perfil
inputEmail.value = usuarioLogueado;

document.addEventListener("DOMContentLoaded", function(e){
    var datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    inputPrimerNombre.value = datosUsuario.primerNombre;
    inputPrimerApellido.value = datosUsuario.primerApellido;
    inputSegundoNombre.value = datosUsuario.segundoNombre;
    inputSegundoApellido.value = datosUsuario.segundoApellido;
    inputEmail.value = datosUsuario.email;
    inputTelefono.value = datosUsuario.telefono;
})


// Boton "Guardar" = validar campos obligatorios (nombre, apellido, email) y guardar en local storage
botonGuardarPerfil.addEventListener('click', function(evento) {
    if (validarCamposObligatorios()){
        evento.preventDefault();
        console.log('Faltan completar los campos obligatorios')
    }
    else {
        evento.preventDefault();
        let datosUsuario = {
            primerNombre: inputPrimerNombre.value,
            segundoNombre: inputSegundoNombre.value,
            primerApellido: inputPrimerApellido.value,
            segundoApellido: inputSegundoApellido.value,
            email: inputEmail.value,
            telefono: inputTelefono.value,
        }
        localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
        localStorage.setItem('Usuario', inputEmail.value);
        console.log('Datos guardados!');
        window.location.reload();
    }
})

let mensajePrimerNombre = document.getElementById("mensaje-primer-nombre");
let mensajePrimerApellido = document.getElementById("mensaje-primer-apellido");
let mensajeEmail = document.getElementById("mensaje-email");

function validarCamposObligatorios() {
    if (!inputPrimerNombre.value){
        inputPrimerNombre.style.border = 'red solid 2px';
        mensajePrimerNombre.innerText = 'Debe ingresar un nombre';
        return true;
    }
    else if (!inputPrimerApellido.value){
        inputPrimerApellido.style.border = 'red solid 2px';
        mensajePrimerApellido.innerText = 'Debe ingresar un apellido';
        return true;
    }
    else if (!inputEmail.value){
        inputEmail.style.border = 'red solid 2px';
        mensajeEmail.innerText = 'Debe ingresar un email';
        return true;

    }
}


// Deshabilita botón guardar perfil si los inputs requeridos están vacíos 

inputPrimerNombre.addEventListener("input", function(e){
    if (!inputPrimerNombre.value){
        botonGuardarPerfil.disabled = true
        inputPrimerNombre.style.border = 'red solid 2px';
        mensajePrimerNombre.innerText = 'Debe ingresar un nombre';
    }
    else {
        botonGuardarPerfil.disabled = false
        inputPrimerNombre.style.border = '';
        mensajePrimerNombre.innerText = '';

    }
 
});

inputPrimerApellido.addEventListener("input", function(e){
    if (!inputPrimerApellido.value){
        botonGuardarPerfil.disabled = true
        inputPrimerApellido.style.border = 'red solid 2px';
        mensajePrimerApellido.innerText = 'Debe ingresar un apellido';
    }
    else {
        botonGuardarPerfil.disabled = false
        inputPrimerApellido.style.border = '';
        mensajePrimerApellido.innerText = '';

    }
 
});

inputEmail.addEventListener("input", function(e){
    if (!inputEmail.value){
        botonGuardarPerfil.disabled = true
        inputEmail.style.border = 'red solid 2px';
        mensajeEmail.innerText = 'Debe ingresar un email';
    }
    else {
        botonGuardarPerfil.disabled = false
        inputEmail.style.border = '';
        mensajeEmail.innerText = '';

    }
 
});