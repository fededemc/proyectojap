let carritoUsuario = [];

function mostrarCarrito(){
    for (let i = 0; i < carritoUsuario.length; i++){
        
        let infoCarrito = carritoUsuario[i];

        let tablaCarrito = "";

            tablaCarrito += `
            <tr>
            <td><img src="${infoCarrito.image}" height="50"></td>
            <td>${infoCarrito.name}</td>
            <td>${infoCarrito.currency} ${infoCarrito.unitCost}</p></td>
            <td><input id="cantidad`+ [i + 1] + `" type="number" value="${infoCarrito.count}" min="0" onchange="calcularSubtotal()"></td>
            <td id="subtotal`+ [i + 1] + `"></td>
            </tr>
            `

        document.getElementById("tabla-carrito").innerHTML = tablaCarrito;
    }
}

function calcularSubtotal() {

    for (let i = 0; i < carritoUsuario.length; i++) {

        let costoUnitario = carritoUsuario[i].unitCost;
        let cantidad = document.getElementById("cantidad" + [i + 1]).value;

        let subTotalProducto = (cantidad * costoUnitario)

        document.getElementById("subtotal" + [i + 1]).innerHTML = `<b>` + carritoUsuario[i].currency +` `+ subTotalProducto + `</b>`;
    }

}


// Fetch del carrito

    document.addEventListener("DOMContentLoaded", function(e){

        getJSONData(CART_INFO_URL+"25801.json").then(function(resultObj){
            if (resultObj.status === "ok"){
                carritoUsuario = resultObj.data.articles
                console.log(carritoUsuario);

                mostrarCarrito();
               
            }
    
    
        });
    
    });