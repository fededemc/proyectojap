

// Mostrar la informacion del producto

let infoProducto = [];

function mostrarInfoProducto(){

    let htmlContentToAppend = "";

            htmlContentToAppend += `
            <h1 class="mt-5 mb-5">${infoProducto.name}</h1>
            <hr>
            <h4 class="mb-1">Precio:</h4>
            <p>${infoProducto.currency} ${infoProducto.cost}</p>
            <h4 class="mb-1">Descripción:</h4>
            <p>${infoProducto.description}</p>
            <h4 class="mb-1">Categoría:</h4>
            <p>${infoProducto.category}</p>
            <h4 class="mb-1">Cantidad de vendidos:</h4>
            <p>${infoProducto.soldCount}</p>
            <h4 class="mb-1">Imágenes ilustrativas:</h4>
            `

        document.getElementById("info-producto").innerHTML = htmlContentToAppend;
    
    let fotosToAppend = "";

        for (let imagen of infoProducto.images){
            fotosToAppend += `
            <img src="${imagen}" width="200">
            `
        }

        document.getElementById("fotos-producto").innerHTML = fotosToAppend;
}

let idProducto = localStorage.getItem("ProductID");

//Fetch del producto.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL+idProducto+".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            infoProducto = resultObj.data
            console.log(infoProducto)

            mostrarInfoProducto()
           
        }


    });

});


//Fetch y function de los comentarios.

function mostrarComentarios(){

    let comentariosToAppend = "";
    comentariosToAppend += `<hr><h2 class="mt-5 mb-5">Comentarios</h2>`;

        for (comentario of comentariosProducto){

            function estrellas(score){
                if (score == "5") {
                    return `<span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>`
                }
                else if (score == "4"){
                    return `<span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>`
                }
                else if (score == "3"){
                   return  `<span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>`
                }
                else if (score == "2"){
                    return  `<span class="fa fa-star checked"></span>
                             <span class="fa fa-star checked"></span>
                             <span class="fa fa-star"></span>
                             <span class="fa fa-star"></span>
                             <span class="fa fa-star"></span>`
                 }
                 else if (score == "1"){
                    return  `<span class="fa fa-star checked"></span>
                             <span class="fa fa-star"></span>
                             <span class="fa fa-star"></span>
                             <span class="fa fa-star"></span>
                             <span class="fa fa-star"></span>`
                 }
                 else {
                    return  `<span class="fa fa-star"></span>
                             <span class="fa fa-star"></span>
                             <span class="fa fa-star"></span>
                             <span class="fa fa-star"></span>
                             <span class="fa fa-star"></span>`
                 }
            }

            comentariosToAppend += `
            <p><b>${comentario.user}</b> - ${comentario.dateTime} - ${estrellas(comentario.score)}</p>
            <p>${comentario.description}</p>
            `
        }

        document.getElementById("comentarios-producto").innerHTML = comentariosToAppend;
}

let comentariosProducto = [];

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_COMMENTS_URL+idProducto+".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            comentariosProducto = resultObj.data
            console.log(comentariosProducto)

            mostrarComentarios()
           
        }


    });

});
