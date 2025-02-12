
// console.log("hola ctrl home js");
// return false;

function carouselMarcas() {
    // console.log("hola CAROUSELMARCAS");
    // return false;
    ajaxPromise('module/home/ctrl/ctrl_home.php?op=homePageMarca','GET', 'JSON')
    .then(function(data) {
            for (row in data) {
                // console.log("hola data FUNCTION CAROUSELMARCAS");
                // console.log(data);
                // return false;
                $('<div></div>').attr('class', "item").attr('id', data[row].id_marca).appendTo(".carousel-home")
                .html(
                    "<img src='" + data[row].img_marca + "' alt='foto' >"
                )
            }

            // console.log("hola end FOR row in data CAROUSELMARCAS");
            // return false;

              $(function() {
                // Owl Carousel
                var owl = $(".owl-carousel");
                owl.owlCarousel({
                  items: 3,
                  margin: 10,
                  loop: true,
                  nav: true
                });
              });
            // console.log("hola end OWL CAROUSELMARCAS");
            // return false;
        })
        .catch(function() {
            // console.log("hola CATCH CAROUSELMARCAS");
            // return false;
            window.location.href = "module/exceptions/ctrl/ctrl_exceptions.php?&op=503";
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
        window.location.href = "module/exceptions/ctrl/ctrl_exceptions.php?&op=503";
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
        window.location.href = "module/exceptions/ctrl/ctrl_exceptions.php?&op=503";
    });
}

$(document).ready(function() {
    carouselMarcas();
    loadCategorias();
    loadCatTipos();
});