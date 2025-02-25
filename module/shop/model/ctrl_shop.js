// console.log("hola ctrl shop js");
// return false;

function loadProductos(){
    // console.log("hola loadProductos");
    // return false;
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=getall', 'GET', 'JSON')
    .then(function(data){
        // console.log(data);
        // return false;
        for (row in data){
            $('<div></div>').attr('class', "producto").attr({'id': data[row].id_producto}).appendTo('.container-productos')
                .html(
                    "<img src = " + data[row].img_producto + " alt='foto' </img> " +
                    "<div class='inf-producto'>" +
                    "<h3>" + data[row].nom_prod + "</h5>" +
                    "<p class='precio'>" + data[row].precio + "€</p>" +
                    "</div>"
                ) // end .html
                .on('click', function() {
                    const id_producto = $(this).attr('id');
                    loadProductoDetails(id_producto);
                }); // end .on
        } // end row in data
    }).catch(function(){
        window.location.href = "module/exceptions/ctrl/ctrl_exceptions.php?&op=503";
    })
} // funcion loadProductos

function print_filtros() {
    $('<div class="div-filtros"></div>').appendTo('.container-filtros')
        .html('<select class="filtro_tipo">' +
            '<option value="1">Cancha</option>' +
            '<option value="2">Calle</option>' +
            '<option value="3">Zapatos</option>' +
            '<option value="4">Gorras</option>' +
            '<option value="5">Balones</option>' +
            '<option value="6">Pantalones</option>' +
            '<option value="7">Camisetas</option>' +
            '<option value="8">Accesorios</option>' +
            '<option value="9">Sudaderas</option>' +
            '<option value="10">Chaquetas</option>' +
            '</select>' +
            '<select class="filtro_categoria">' +
            '<option value="1">Hombre</option>' +
            '<option value="2">Mujer</option>' +
            '<option value="3">Niños</option>' +
            '<option value="4">Adolescentes</option>' +
            '<option value="5">Bebes</option>' +
            '</select>' +
            '<select class="filtro_precio">' +
            '<option value="maymen">De mayor a menor precio</option>' +
            '<option value="menmay">De menor a mayor precio</option>' +
            '</select>' +
            '<div id="overlay">' +
            '<div class= "cv-spinner" >' +
            '<span class="spinner"></span>' +
            '</div >' +
            '</div > ' +
            '</div>' +
            '</div>' +
            '<p> </p>' +
            '<button class="filter_button button_spinner" id="Button_filter">Filtrar</button>' +
            '<button class="filter_remove" id="Remove_filter">Remover filtros</button>');
}

function loadProductoDetails(id_producto){
    console.log("hola loadProductoDetails");
    // return false;
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=details&id_producto=' + id_producto, 'GET', 'JSON')
    .then(function(data){
        $('.container-productos').empty(); // vaciar todos los productos para dejar la web vacia y pintar el details
        $('.pimg').empty();
        $('.inf-producto').empty();
        console.log(data);
        // return false;
        for (row in data[1][0]) {
            $('<div></div>').attr({ 'id': data[1][0].id_pimg, class: 'pimg' }).appendTo('.productos_img')
                .html(
                    "<div class='content-img-details'>" +
                    "<img src= '" + data[1][0][row].pimage_route + "'" + "</img>" +
                    "</div>" // end .content-img-details
                )
        }
        let extra_entrega = "";
        if(data[0][0].entrega === 'domicilio'){
            extra_entrega = "<i class='fa-solid fa-truck fa-2xl extra-icons' style='color: #077bd5;'></i>";
        }else if(data[0][0].entrega === 'persona'){
            extra_entrega = "<i class='fa-solid fa-person fa-2xl' style='color: #077bd5;'></i>";
        } // pintar el camion si la entrega es a domicilio, o la persona si la entrega es en persona
        let nom_equipo = "";
        if (data[0][0].nom_team !== null) {
            nom_equipo = "<p class='team-details'>" + data[0][0].nom_team + "</p>";
        } // si el producto tiene equipo lo pinta, de lo contrario no pinta nada
            $('<div></div>').attr({'id': data[0][0].id_producto, class: 'inf-producto-details'}).appendTo('.inf-details')
                .html(
                    "<div class='inf-prod'>" +
                    "<h3>" + data[0][0].nom_prod + "</h5>" +
                    "<p class='precio-details'>" + data[0][0].precio + "€</p>" +
                    "<p class='marca-details'>" + data[0][0].nom_marca + "</p>" +
                    "<p class='sexo-details'>" + data[0][0].sexo_prod + "</p>" +
                    "<p class='tipo-details'>" + data[0][0].tipo + "</p>" +
                    nom_equipo +
                    "<p class='talla-details'>" + data[0][0].talla + "</p>" +
                    "<b class='letrero-condicion-details'>Condición del producto</b>" +
                    "<a class='condicion-details'> &nbsp;" + data[0][0].condicion + "</a>" +
                    "<p class='color-details'>" + data[0][0].color + "</p>" +
                    "<p class='desc-details'>" + data[0][0].descripcion + "</p>" +
                    "<p class='stock-details'>Hay " + data[0][0].stock + " unidades dispobibles</p>" +
                    "<p class='entrega-details'>" + data[0][0].entrega + "</p>" +
                    "<div class='extras-details'>" +
                    "<div class='icon-container-details'>" +
                    "<p class='entrega-icon-details'>" + extra_entrega + "</p>" +
                    "</div>" + // end .icon-container (truck)
                    "<div class='icon-container-details'>" +
                    "<p class='paypal-icon-details'> <i class='fa-brands fa-paypal fa-2xl' style='color: #077bd5;'></i> </p>" +
                    "</div>" + // end .icon-container (paypal)
                    "<div class='icon-container-details'>" +
                    "<p class='creditcard-icon-details'> <i class='fa-solid fa-credit-card fa-2xl' style='color: #077bd5;'></i> </p>" +
                    "</div>" + // end .icon-container (credit-card)
                    "<div class='icon-container-details'>" +
                    "<p class='gpay-icon-details'> <i class='fa-brands fa-google-pay fa-2xl' style='color: #077bd5;'></i> </p>" +
                    "</div>" + // end .icon-container (google-pay)
                    "<div class='icon-container-details'>" +
                    "<p class='applepay-icon-details'> <i class='fa-brands fa-apple-pay fa-2xl' style='color: #077bd5;'></i> </p>" +
                    "</div>" + // end .icon-container (apple-pay)
                    "</div" + // end .extras-details
                    "</div>" // end .inf-prod
                ) // end .html
            // Owl Carousel
            $('.productos_img').owlCarousel({
                items: 1,
                nav :true
            });
    }).catch(function(){
        window.location.href = "module/exceptions/ctrl/ctrl_exceptions.php?&op=503";
    })
} // funcion loadProductoDetails

$(document).ready(function(){
    loadProductos();
    print_filtros();
});