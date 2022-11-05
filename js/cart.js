let carritoUsuario = [];
let comisionEnvio = 0;

function mostrarCarrito(){
    for (let i = 0; i < carritoUsuario.length; i++){

        let infoCarrito = carritoUsuario[i];
        
        let tablaCarrito = "";

            tablaCarrito += `
            <tr>
            <td><img src="${infoCarrito.image}" height="50"></td>
            <td>${infoCarrito.name}</td>
            <td>${infoCarrito.currency} ${infoCarrito.unitCost}</td>
            <td><input id="cantidad`+ [i + 1] + `" type="number" value="${infoCarrito.count}" min="1" onchange="calcularSubtotal()"></td>
            <td id="subtotal` + [i + 1] + `">${infoCarrito.unitCost*infoCarrito.count}</td>
            </tr>
            `
        document.getElementById("tabla-carrito").innerHTML = tablaCarrito;
    }
}

// Subtotal que se muestra en el carrito

let inputEnvioPremium = document.getElementById("envioPremium");
let inputEnvioExpress = document.getElementById("envioExpress");
let inputEnvioStandard = document.getElementById("envioStandard");
let divSubtotalInicial = document.getElementById("subtotal-inicial");
let divCostoEnvio = document.getElementById("costo-envio");
let divTotalAPagar = document.getElementById("total-a-pagar");

function calcularSubtotal() {

    let subTotalProducto = 0;

    for (let i = 0; i < carritoUsuario.length; i++) {

        let costoUnitario = carritoUsuario[i].unitCost;
        let cantidad = document.getElementById("cantidad" + [i + 1]).value;

        let precioPorCantidad = (cantidad * costoUnitario);
        subTotalProducto += precioPorCantidad;

        document.getElementById("subtotal" + [i + 1]).innerHTML = `<b>` + carritoUsuario[i].currency +` `+ precioPorCantidad + `</b>`;
    }

    divSubtotalInicial.innerHTML = `USD ` + subTotalProducto;
    divCostoEnvio.innerHTML = `USD ` + subTotalProducto*comisionEnvio;
    divTotalAPagar.innerHTML = `USD ` + (subTotalProducto + subTotalProducto*comisionEnvio);
}

let divMensajeExitoso = document.getElementById("mensaje-exitoso");

// Fetch del carrito

    document.addEventListener("DOMContentLoaded", function(e){

        getJSONData(CART_INFO_URL+"25801.json").then(function(resultObj){
            if (resultObj.status === "ok"){
                carritoUsuario = resultObj.data.articles
                console.log(carritoUsuario);

                mostrarCarrito();
                calcularSubtotal();
            }

        });

        divMensajeExitoso.style.visibility = 'hidden';      // Hide

        inputEnvioPremium.addEventListener("change", function(e){
            comisionEnvio = 0.15;
            calcularSubtotal();
        });

        inputEnvioExpress.addEventListener("change", function(e){
            comisionEnvio = 0.07;
            calcularSubtotal();
        });

        inputEnvioStandard.addEventListener("change", function(e){
            comisionEnvio = 0.05;
            calcularSubtotal();
        });

    });

// Deshabilitar forma de pago

let radioTarjeta = document.getElementById("tarjeta");
let radioTransferencia = document.getElementById("transferencia");
let inputNumTransferencia = document.getElementById("numero-cuenta-transferencia");
let inputNumTarjeta = document.getElementById("numero-tarjeta");
let inputVencimientoTarjeta = document.getElementById("vencimiento-tarjeta");
let inputCodigoSegTarjeta = document.getElementById("codigo-tarjeta");

radioTarjeta.addEventListener("click", function(e){
    inputNumTarjeta.disabled = false;
    inputCodigoSegTarjeta.disabled = false;
    inputVencimientoTarjeta.disabled = false;
    inputNumTransferencia.disabled = true;
    pErrorFormaPago.innerHTML = ``;
});

radioTransferencia.addEventListener("click", function(e){
    inputNumTransferencia.disabled = false;
    inputNumTarjeta.disabled = true;
    inputCodigoSegTarjeta.disabled = true;
    inputVencimientoTarjeta.disabled = true;
    pErrorFormaPago.innerHTML = ``;
});

inputNumTarjeta.addEventListener("input", (e)=>{
    if (e.target.value.length === 4) {
        e.target.value += "-";
    }
    if (e.target.value.length === 9) {
        e.target.value += "-";
    }
    if (e.target.value.length === 14) {
        e.target.value += "-";
    }
})

inputVencimientoTarjeta.addEventListener("input", (e)=>{
    if (e.target.value.length === 2) {
        e.target.value += "/";
    }
});

// Validación del formulario

let botonFinalizarCompra = document.getElementById("boton-finalizar-compra");
let formularioPagar = document.getElementById('pagar');
let inputCalle = document.getElementById("formCalle");
let inputNumero = document.getElementById("formNumero");
let inputEsquina = document.getElementById("formEsquina");
let botonSeleccionarPago = document.getElementById("seleccionar-pago");
let pErrorFormaPago = document.getElementById("pago-seleccionado");


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            validacionMetodoPago()
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
          event.preventDefault()
          mostrarExitoso()
        }, false)
      })
  })();

    function validacionMetodoPago() {
        if (radioTarjeta.checked || radioTransferencia.checked){
            return true;
        }
        else {
            pErrorFormaPago.innerHTML = `Debe seleccionar una forma de pago.`;
        };
    }

    function  viejo() {
            return divMensajeExitoso.style.visibility = 'visible';
            setTimeout(() => {
                divMensajeExitoso.style.visibility = 'hidden';      // Ocultar mensaje exitoso luego de 3 segundos;
            }, "3000");
    }

    function mostrarExitoso(){
        if ((inputCalle != "" && inputNumero != "" && inputEsquina != "")
            && validacionMetodoPago()
            && (inputEnvioPremium.checked || inputEnvioExpress.checked || inputEnvioStandard.checked)
            && ((inputNumTarjeta.value != "" && inputCodigoSegTarjeta.value != "" && inputVencimientoTarjeta !="")
            || (inputNumTransferencia.value != ""))){
            divMensajeExitoso.style.visibility = 'visible';
            setTimeout(() => {
                divMensajeExitoso.style.visibility = 'hidden';      // Ocultar mensaje exitoso luego de 3 segundos;
            }, "3000");
        }
    }