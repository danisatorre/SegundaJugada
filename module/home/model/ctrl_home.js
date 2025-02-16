
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
                var owl = $(".carousel-home");
                owl.owlCarousel({
                  items: 3,
                  margin: 10,
                  loop: true,
                  nav: true,
                  autoplay: true,
                  autoplaySpeed: 2500,
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
    // console.log("hola loadCatTipos");
    // return false;
    ajaxPromise('module/home/ctrl/ctrl_home.php?op=homePageTipo','GET', 'JSON')
    .then(function(data) {
            for (row in data) {
                // console.log("hola data FUNCTION loadCatTipos");
                // console.log(data);
                // return false;
                $('<div></div>').attr('class', "div_tipo").attr('id', data[row].id_tipo).appendTo(".carousel-tipo")
                .html(
                    "<img src='" + data[row].img_tipo + "' alt='foto' >" +
                    "<h5>" + data[row].tipo + "</h5>"
                )
            }

            // console.log("hola end FOR row in data loadCatTipos");
            // return false;

              $(function() {
                // Owl Carousel
                var owl = $(".carousel-tipo");
                owl.owlCarousel({
                  items: 4,
                  margin: 10,
                  loop: true,
                  nav: true,
                });
              });
            // console.log("hola end OWL loadCatTipos");
            // return false;
        })
        .catch(function() {
            // console.log("hola CATCH CAROUSELMARCAS");
            // return false;
            window.location.href = "module/exceptions/ctrl/ctrl_exceptions.php?&op=503";
        });
}

function loadProductos() {
    // console.log("hola loadProductos");
    // return false;
    ajaxPromise('module/home/ctrl/ctrl_home.php?op=homePageProductos','GET', 'JSON')
    .then(function(data) {
        // console.log("hola loadProductos then function data");
        // return false;
            for (row in data) {
                // console.log("hola data FUNCTION loadProductos");
                // console.log(data);
                // return false;
                $('<div></div>').attr('class', "div_producto").attr('id', data[row].id_producto).appendTo(".carousel-producto")
                .html(
                    "<img src='" + data[row].img_producto + "' alt='foto' >" +
                    "<h5>" + data[row].nom_prod + "</h5>"
                );
            }

            // console.log("hola end FOR row in data loadProductos");
            // return false;

              $(function() {
                // Owl Carousel
                var owl = $(".carousel-producto");
                owl.owlCarousel({
                  items: 4,
                  margin: 10,
                  loop: true,
                  nav: true,
                });
              });
            // console.log("hola end OWL loadProductos");
            // return false;
        })
        .catch(function() {
            // console.log("hola CATCH loadProductos");
            // return false;
            window.location.href = "module/exceptions/ctrl/ctrl_exceptions.php?&op=503";
        });
}

function loadAccesorios(){
    // console.log("hola loadAccesorios");
    // return false;
    ajaxPromise('module/home/ctrl/ctrl_home.php?op=homePageAccesorios', 'GET', 'JSON')
    .then(function(data){
        for (row in data){
            $('<div></div>').attr('class', "div_accesorio").attr('id', data[row].id_producto).appendTo(".carousel-accesorio")
            .html(
                "<img src=' " + data[row].img_producto + " 'alt='foto'>" +
                "<h5>" + data[row].nom_prod + "</h5>"
            )
        }

        // CAROUSEL

        $(function(){
            var owl = $(".carousel-accesorio");
            owl.owlCarousel({
                items: 4,
                margin: 10,
                loop: true,
                nav: true,
            }); // END owl.owlCarousel
        }); // END FUNCTION OWL
    }) // END FUNCTION DATA
    .catch(function(){
        window.location.href = "module/exceptions/ctrl/ctrl_exceptions.php?&op=503";
    })
}

$(document).ready(function() {
    carouselMarcas();
    loadCategorias();
    loadCatTipos();
    loadProductos();
    loadAccesorios();
});