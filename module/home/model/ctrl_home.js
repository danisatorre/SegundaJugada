
// console.log("hola ctrl home js");
// return false;

// function carouselMarcas() {
//     ajaxPromise('module/home/ctrl/ctrl_home.php?op=Carrousel_Marcas','GET', 'JSON')
//     .then(function(data) {
//             for (row in data) {
//                 $('<div></div>').attr('class', "carousel__elements").attr('id', data[row].nom_marca).appendTo(".carousel__list")
//                 .html(
//                     "<img class='carousel__img' id='' src='" + data[row].img_marca + "' alt='' >"
//                 )
//             }
//             new Glider(document.querySelector('.carousel__list'), {
//                 slidesToShow: 3,
//                 dots: '.carousel__indicator',
//                 draggable: true,
//                 arrows: {
//                     prev: '.carousel__prev',
//                     next: '.carousel__next'
//                 }
//             });
//         })
//         .catch(function() {
//             window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Marcas HOME";
//         });
// }

function loadMarcas() {
    // console.log("hola MARCAS");
    // return false;
    ajaxPromise('module/home/ctrl/ctrl_home.php?op=homePageMarca','GET', 'JSON')
    .then(function(data) { 
        // console.log("hola data FUNCTION MARCA");
        // return false;
        for (row in data) {
            // console.log("hola data MARCA");
            // return false;
            $('<div></div>').attr('class', "div_marca").attr({ 'id_marca': data[row].id_marca }).appendTo('#containerMarca')
                .html(
                    "<li class='portfolio-item3'>" +
                    "<div class='item-main3'>" +
                    "<div class='portfolio-image3'>" +
                    "<img src = " + data[row].img_marca + " alt='foto' </img> " +
                    "</div>" +
                    "<h5>" + data[row].nom_marca + "</h5>" +
                    "</div>" +
                    "</li>"
                )
        }
    }).catch(function() {
        // console.log("ERROR loadMarca");
        // return false;
        window.location.href = "module/exceptions/ctrl/ctrl_exceptions.php&op=503";
    });
}

function loadCategorias() {
    // console.log("hola LOADCATEGORIAS");
    // return false;
    ajaxPromise('module/home/ctrl/ctrl_home.php?op=homePageCategoria','GET', 'JSON')
    .then(function(data) { 
        // console.log("hola data FUNCTION");
        // return false;
        for (row in data) {
            // console.log("hola data");
            // return false;
            $('<div></div>').attr('class', "div_categoria").attr({ 'id_categoria': data[row].id_categoria }).appendTo('#containerCategoria')
                .html(
                    "<li class='portfolio-item'>" +
                    "<div class='item-main'>" +
                    "<div class='portfolio-image'>" +
                    "<img src = " + data[row].img_categoria + " alt='foto' </img> " +
                    "</div>" +
                    "<h5>" + data[row].categoria + "</h5>" +
                    "</div>" +
                    "</li>"
                )
        }
    }).catch(function() {
        // console.log("ERROR loadCategorias");
        // return false;
        window.location.href = "index.php?module=ctrl_exceptions&op=503";
    });
}

function loadCatTipos() {
    ajaxPromise('module/home/ctrl/ctrl_home.php?op=homePageTipo','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', "div_tipo").attr({ 'id_tipo': data[row].id_tipo }).appendTo('#containerTipo')
                .html(
                    "<li class='portfolio-item2'>" +
                    "<div class='item-main2'>" +
                    "<div class='portfolio-image2'>" +
                    "<img src = " + data[row].img_tipo + " alt='foto'" +
                    "</div>" +
                    "<h5>" + data[row].tipo + "</h5>" +
                    "</div>" +
                    "</li>"
                )
        }
    }).catch(function() {
        // console.log("ERROR loadCatTipos");
        // return false;
        window.location.href = "index.php?module=ctrl_exceptions&op=503";
    });
}

$(document).ready(function() {
    // carouselMarcas();
    loadMarcas();
    loadCategorias();
    loadCatTipos();
});