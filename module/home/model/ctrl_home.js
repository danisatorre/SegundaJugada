
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
                $('<div></div>').attr('class', "div_marca").attr('id_marca', data[row].id_marca).appendTo(".carousel-home")
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
                  items: 2,
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
                $('<div></div>').attr('class', "div_tipo").attr('id_tipo', data[row].id_tipo).appendTo(".carousel-tipo")
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
                $('<div></div>').attr('class', "div_producto").attr('id_producto', data[row].id_producto).appendTo(".carousel-producto")
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
            window.location.href = "module/exceptions/ctrl/ctrl_exceptions.php&op=503";
        });
}

function loadAccesorios(){
    // console.log("hola loadAccesorios");
    // return false;
    ajaxPromise('module/home/ctrl/ctrl_home.php?op=homePageAccesorios', 'GET', 'JSON')
    .then(function(data){
        for (row in data){
            $('<div></div>').attr('class', "div_accesorio").attr('id_accesorio', data[row].tipo).appendTo(".carousel-accesorio")
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

function goToShop(){
    // categoria
    $(document).on("click", '.div_categoria', function(){
        var filtro_categoria = this.getAttribute('id_categoria');
        localStorage.removeItem('filtro');
        localStorage.removeItem('filtro_tipo');
        localStorage.removeItem('filtro_precio');
        localStorage.removeItem('filtro_equipo');
        localStorage.removeItem('filtro_marca');
        localStorage.setItem('filtro_categoria', filtro_categoria);

        var filtro = [];
        if(localStorage.getItem('filtro_categoria')){
            filtro.push(['categoria', localStorage.getItem('filtro_categoria')])
        }
        localStorage.setItem('filtro', JSON.stringify(filtro)); 

        setTimeout(function(){
            ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=filtro_home', 'POST', 'JSON', {filtro_categoria: filtro_categoria})
            .then(function(data) {
                console.log(data);
                // return false
                window.location.href = 'index.php?module=ctrl_shop&op=list';
            })
            .catch(function(error) {
                console.error(error);
            });
        }, 500);
    });
    // marca
    $(document).on("click", '.div_marca', function(){
        var filtro_marca = this.getAttribute('id_marca');
        localStorage.removeItem('filtro');
        localStorage.removeItem('filtro_tipo');
        localStorage.removeItem('filtro_precio');
        localStorage.removeItem('filtro_equipo');
        localStorage.removeItem('filtro_categoria');
        localStorage.setItem('filtro_marca', filtro_marca);

        var filtro = [];
        if(localStorage.getItem('filtro_marca')){
            filtro.push(['marca', localStorage.getItem('filtro_marca')])
        }
        localStorage.setItem('filtro', JSON.stringify(filtro));

        setTimeout(function(){
            ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=filtro_home', 'POST', 'JSON', {filtro_marca: filtro_marca})
            .then(function(data) {
                console.log(data);
                // return false;
                window.location.href = 'index.php?module=ctrl_shop&op=list';
            })
            .catch(function(error) {
                console.error(error);
            });
        }, 500);
    });
    // tipo
    $(document).on("click", '.div_tipo', function(){
        var filtro_tipo = this.getAttribute('id_tipo');
        localStorage.removeItem('filtro');
        localStorage.removeItem('filtro_marca');
        localStorage.removeItem('filtro_precio');
        localStorage.removeItem('filtro_equipo');
        localStorage.removeItem('filtro_categoria');
        localStorage.setItem('filtro_tipo', filtro_tipo);

        var filtro = [];
        if(localStorage.getItem('filtro_tipo')){
            filtro.push(['tipo', localStorage.getItem('filtro_tipo')])
        }
        localStorage.setItem('filtro', JSON.stringify(filtro));

        setTimeout(function(){
            ajaxPromise('module/shop/ctrl/ctrl_shop?op=filtro_home', 'POST', 'JSON', {filtro_tipo: filtro_tipo})
            .then(function(data){
                console.log(data);
                // return false
                window.location.href = 'index.php?module=ctrl_shop&op=list';
            })
            .catch(function(error){
                console.error(error);
            })
        }, 500);
    });
    // accesorio
    $(document).on("click", '.div_accesorio', function(){
        var filtro_accesorio = this.getAttribute('id_accesorio');
        localStorage.removeItem('filtro');
        localStorage.removeItem('filtro_marca');
        localStorage.removeItem('filtro_precio');
        localStorage.removeItem('filtro_equipo');
        localStorage.removeItem('filtro_categoria');
        localStorage.setItem('filtro_tipo', filtro_accesorio);

        var filtro = [];
        if(localStorage.getItem('filtro_tipo')){
            filtro.push(['tipo', localStorage.getItem('filtro_tipo')])
        }
        localStorage.setItem('filtro', JSON.stringify(filtro));

        setTimeout(function(){
            ajaxPromise('module/shop/ctrl/ctrl_shop?op=filtro_home', 'POST', 'JSON', {filtro_accesorio: filtro_accesorio})
            .then(function(data){
                console.log(data);
                // return false;
                window.location.href = 'index.php?module=ctrl_shop&op=list';
            })
            .catch(function(error){
                console.error(error);
            })
        }, 500);
    });
}

$(document).ready(function() {
    carouselMarcas();
    loadCategorias();
    loadCatTipos();
    loadProductos();
    loadAccesorios();
    goToShop();
});