// console.log("hola ctrl shop js");
// return false;

function ajaxForSearch(url, filtro) {
    console.log("hola ajaxForSearch");
    console.log("Filtro: ", filtro);
    // return false;
    ajaxPromise(url, 'POST', 'JSON', { 'filtro': filtro})
        .then(function (shop) {
            console.log("Datos shop: ", shop);
            // return false;
            $(".container-productos").empty();
            if(shop != "error"){
                console.log("ajaxForSearch shop.id");
                for (row in shop) {
                    $("#nofiltros").empty();
                    $("#texto-nofiltros").empty();
                    $('<div></div>').attr('class', "producto").attr({'id': shop[row].id_producto}).appendTo('.container-productos')
                        .html(
                            "<img src = " + shop[row].img_producto + " alt='foto' </img> " +
                            "<div class='inf-producto'>" +
                            "<h3>" + shop[row].nom_prod + "</h5>" +
                            "<p class='precio'>" + shop[row].precio + "€</p>" +
                            "</div>"
                        ) // end .html
                }
            }else{
                console.log("ajaxForSearch else shop.id");
                $(".container-productos").empty();
                $("#nofiltros").empty();
                $("#texto-nofiltros").empty();
                $(".nofiltrosdiv").empty();
                $('<div></div>').appendTo('.container-shop-list')
                .html(
                    "<div class='nofiltrosdiv'>" +
                    "<h1 id='nofiltros'>No se han encontrado productos con los filtros especificados</h1>" +
                    "<br>" +
                    "<p id='texto-nofiltros'>Pulse el boton 'remover filtros' para volver a la busqueda</p>" +
                    "</div>" // end .nofiltrosdiv
                );
            }
        }).catch(function (e) {
            console.log("ajaxForSearch catch");
            $(".container-productos").empty();
            $(".nofiltrosdiv").empty();
            $('<div></div>').appendTo('.container-shop-list')
                .html(
                    "<div class='nofiltrosdiv'>" +
                    "<h1 id='nofiltros'>¡UPS! Ha ocurrido un error al buscar productos😓</h1>" +
                    "<br>" +
                    "<p id='texto-nofiltros'>Pulse el boton 'remover filtros' para volver a la busqueda</p>" +
                    "</div>" // end .nofiltrosdiv
                );
        });
} // end ajaxForSearch

function loadProductos(){
    console.log("hola loadProductos");
    // return false;
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=getall', 'GET', 'JSON')
    .then(function(data){
        // console.log(data);
        // return false;
        primera_entrada();
        for (row in data){
            $('<div></div>').attr('class', "producto").attr({'id': data[row].id_producto}).appendTo('.container-productos')
                .html(
                    "<img src = " + data[row].img_producto + " alt='foto' </img> " +
                    "<div class='inf-producto'>" +
                    "<h3>" + data[row].nom_prod + "</h5>" +
                    "<p class='precio'>" + data[row].precio + "€</p>" +
                    "</div>"
                ) // end .html
        } // end row in data
    }).catch(function(){
        window.location.href = "module/exceptions/ctrl/ctrl_exceptions.php?&op=503";
    })
} // funcion loadProductos

function primera_entrada(){
    localStorage.removeItem('filtro');
    localStorage.removeItem('filtro_tipo');
    localStorage.removeItem('filtro_categoria');
    localStorage.removeItem('filtro_precio');
    localStorage.removeItem('filtro_equipo');
    $("#nofiltros").empty();
    $("#texto-nofiltros").empty();
}

function loadEquipos() { // llenar los checkboxes de equipos dinamicamente desde la base de datos
    console.log("hola loadEquipos");
    // return false;
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=filtro_equipos', 'POST', 'JSON')
    .then(function(equipos){
        $('.checkbox-equipo').empty();
        for (row in equipos){
            $('.checkbox-equipo').append(
                '<input type="checkbox" value="' + equipos[row].id_team + '" id="' + equipos[row].id_team + '" class="filtro_equipo" name="equipo">' + equipos[row].nom_team + '</br>'
            );
        } // end row in data
        // Restore the selected checkboxes from localStorage
        if(localStorage.getItem('filtro_equipo')){
            var equipo = JSON.parse(localStorage.getItem('filtro_equipo'));
            $.each(equipo, function(index, value) {
                $("input[class='filtro_equipo'][value='" + value + "']").prop('checked', true);
            });
        }
    }).catch(function(error){
        console.error('Error al cargar los equipos:', error);
    });
}

function print_filtros() {
    $('<div class="div-filtros"></div>').appendTo('.container-filtros')
        .html(
            // select tipo
            '<div class="f_tipo">' +
                '<h4 class="desplegable-tipo">Tipos⬇️</h4>' +
                '<div class="options-tipo" style="display: none;">' +
                    '<select class="filtro_tipo" name="select_tipo" id="select_tipo">' +
                        '<optgroup label="Tipos">' +
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
                        '</optgroup>' +
                    '</select>' +
                '</div>' + // end .options-tipo
            '</div>' +
            // select categoria
            '<div class="f_categoria">' +
                '<h4 class="desplegable-categoria">Categorias⬇️</h4>' +
                '<div class="options-categoria" style="display: none;">' +
                    '<select class="filtro_categoria" name="select_categoria" id="select_categoria">' +
                        '<optgroup label="Categorias">' +
                            '<option value="1">Hombre</option>' +
                            '<option value="2">Mujer</option>' +
                            '<option value="3">Niños</option>' +
                            '<option value="4">Adolescentes</option>' +
                            '<option value="5">Bebes</option>' +
                        '</optgroup>' +
                    '</select>' +
                '</div>' + // end .options-categoria
            '</div>' +
            // radiobutton precio
            '<div class="f_precio">' +
                '<h4 class="desplegable-precio">Precio⬇️</h4>' +
                '<div class="radio-precio" style="display: none;">' +
                    '<input type="radio" name="precio" value="maymen" class="filtro_precio">De mayor a menor precio</br>' +
                    '<input type="radio" name="precio" value="menmay" class="filtro_precio">De menor a mayor precio</br>' +
                '</div>' + // end .radio-precio
            '</div>' +
            // checkbox equipo (dinamico)
            '<div class="f_equipo">' +
                '<h4 class="desplegable-equipo">Equipo⬇️</h4>' +
                '<div class="checkbox-equipo" style="display: none;">' +
                    
                '</div>' + // end .checkbox-equipo
            '</div>' + // end .f_equipo
            '<div id="overlay">' +
            '<div class= "cv-spinner" >' +
            '<span class="spinner"></span>' +
            '</div >' +
            '</div > ' +
            '</div>' +
            '</div>' +
            '<p> </p>' +
            '<button class="boton_filtrar button_spinner" id="Button_filter">Filtrar</button>' +
            '<button class="boton_remover" id="Remove_filter">Remover filtros</button>' +
            '<button class="boton_mapa" id="goToMap"> Viajar al mapa de productos </button>'
        
        );
    // funciones de clic en los botones y titulos

    // boton filtrar
    $(document).on('click', '.boton_filtrar', function() {
        botones_filtros();
    });
    // boton remover filtros
    $(document).on('click', '.boton_remover', function() {
        eliminar_filtros();
    });
    // boton para desplazarse al mapa
    $(document).on('click', '.boton_mapa', function() {
        document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
    });
    // desplegable tipo
    $(document).on('click', '.desplegable-tipo', function(){
        $('.options-tipo').slideToggle();
    });
    // desplegable categoria
    $(document).on('click', '.desplegable-categoria', function(){
        $('.options-categoria').slideToggle();
    });
    // desplegable precio
    $(document).on('click', '.desplegable-precio', function(){
        $('.radio-precio').slideToggle();
    });
    // desplegable equipo
    $(document).on('click', '.desplegable-equipo', function(){
        $('.checkbox-equipo').slideToggle();
    });
}

function eliminar_filtros() {
    localStorage.removeItem('filtro');
    localStorage.removeItem('filtro_tipo');
    localStorage.removeItem('filtro_categoria');
    localStorage.removeItem('filtro_precio');
    localStorage.removeItem('filtro_equipo');
    $("#nofiltros").empty();
    $("#texto-nofiltros").empty();
    location.reload();
    if(!localStorage.getItem('filtro')){
        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=getall");
        highlight(filtro);
    }
}

function getall() {
    var filtro = JSON.parse(localStorage.getItem('filtro'));
    console.log("getall filtros: " + filtro);
    if (filtro) {
        console.log("getall yes filtro")
        var filtroequipo = filtro.find(f => f[0] === 'equipo');
        if (filtroequipo && filtroequipo[1].length === 0) {
            filtro = filtro.filter(f => f[0] !== 'equipo');
            localStorage.setItem('filtro', JSON.stringify(filtro));
        }
        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=filtrar", filtro);
    } else {
        console.log("getall no filtro")
        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=getall");
    }
} // end function getall

function highlight(filtro){
    if(filtro.length > 0){
        $('.highlight').empty();
        $('<div style="display: inline; float: right;"></div>').appendTo('.highlight')
            .html('<p style="display: inline; margin: 10px;">Sus filtros: </p>');
        for(row in filtro){
            $('<div style="display: inline; float:right;"></div>').appendTo('.highlight')
                .html('<p style="display: inline; margin: 3px;">' + filtro[row][1] + '</p>');
        } // end row in filtro
    } else{
        $('.highlight').empty();
        location.reload();
    } // end if-else
} // end function highlight

function botones_filtros(){
    // filtros de tipos
    $('.filtro_tipo').change(function (){
        localStorage.setItem('filtro_tipo', this.value);
    });
    if(localStorage.getItem('filtro_tipo')){
        // console.log(localStorage.getItem('filtro_tipo'));
        // return false;
        $('.filtro_tipo').val(localStorage.getItem('filtro_tipo'));
    }
    // filtro de categoria
    $('.filtro_categoria').change(function (){
        localStorage.setItem('filtro_categoria', this.value);
    });
    if(localStorage.getItem('filtro_categoria')){
        $('.filtro_categoria').val(localStorage.getItem('filtro_categoria'));
        // console.log($('.filtro_categoria').val(localStorage.getItem('filtro_categoria')))
        // return false;
    }
    // filtro de precio
    $('.filtro_precio').change(function (){
        localStorage.setItem('filtro_precio', this.value);
    });
    if(localStorage.getItem('filtro_precio')){
        $('.filtro_precio').each(function() {
            if ($(this).val() === localStorage.getItem('filtro_precio')) {
                $(this).prop('checked', true);
            }
        });
    }
    // filtro de equipo
    $(document).on('change', '.filtro_equipo', function(){
        var equipo = [];
        $.each($("input[class='filtro_equipo']:checked"), function() {
            equipo.push($(this).val());
        });
        localStorage.setItem('filtro_equipo', JSON.stringify(equipo));
    });
    if(localStorage.getItem('filtro_equipo')){
        var equipo = JSON.parse(localStorage.getItem('filtro_equipo'));
        $.each(equipo, function(index, value) {
            $("input[class='filtro_equipo'][value='" + value + "']").prop('checked', true);
        });
    }

    // $('.filtro_equipo').change(function(){
    //     localStorage.setItem('filtro_equipo', this.value);
    // });
    // if(localStorage.getItem('filtro_equipo')){
    //     $('.filtro_equipo').val(localStorage.getItem('filtro_equipo'));
    // }

    $(document).on('click', '.boton_filtrar', function(){
        var filtro = [];
        // tipo
        if(localStorage.getItem('filtro_tipo')){
            filtro.push(['tipo', localStorage.getItem('filtro_tipo')])
        }
        // categoria
        if(localStorage.getItem('filtro_categoria')){
            filtro.push(['categoria', localStorage.getItem('filtro_categoria')])
        }
        // precio
        if(localStorage.getItem('filtro_precio')){
            filtro.push(['precio', localStorage.getItem('filtro_precio')])
        }
        // equipo
        if(localStorage.getItem('filtro_equipo')){
            var equipo = JSON.parse(localStorage.getItem('filtro_equipo'));
            if (equipo.length > 0) {
                filtro.push(['equipo', equipo]);
            } else {
                localStorage.removeItem('filtro_equipo');
            }
        }

        localStorage.setItem('filtro', JSON.stringify(filtro));

        if(filtro.length > 0){
            ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=filtrar", filtro);
        }else{
            ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=getall");
        }

        highlight(filtro);
    });
}

function loadProductoDetails(id_producto){
    console.log("hola loadProductoDetails");
    // return false;
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=details&id_producto=' + id_producto, 'GET', 'JSON')
    .then(function(data){
        $('.container-productos').empty(); // vaciar todos los productos para dejar la web vacia y pintar el details
        $('.container-filtros').empty(); // vaciar los filtros para que no aparezcan en el details
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
                    "<p class='stock-details'>Hay " + data[0][0].stock + " unidades disponibles</p>" +
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

function loadDetails() {
    $(document).on("click", ".producto", function() {
        var id_producto = this.getAttribute('id');
        loadProductoDetails(id_producto);
    });
}

function leafleft(){
    console.log("hola leaflet");

    

    var map = L.map('map').setView([38.821, -0.610547], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

function scrollOnTop(){
    $('.sot').append(
        '<button class="sotButton">Volver arriba</button>'
    )
    $(document).on("click", ".sotButton", function() {
        window.scrollTo(0, 0);
    });
}

$(document).ready(function(){
    getall();
    loadProductos();
    loadDetails();
    print_filtros();
    botones_filtros();
    loadEquipos();
    leafleft();
    scrollOnTop();
});