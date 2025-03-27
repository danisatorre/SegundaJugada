// console.log("hola ctrl shop js");
// return false;

function loadShop(total_productos, items_por_pagina){
    console.log("hola loadShop");
    // console.log(total_productos)
    // return false;
    var verificar_filtros = localStorage.getItem('filtro') || false;
    var buscador_filtros = localStorage.getItem('buscar') || false;
    console.log("loadShop verificar_filtros: ", verificar_filtros);
    console.log("loadShop buscador_filtros: ", buscador_filtros);
    if(verificar_filtros != false){
        console.log("loadShop verificar_filtros");
        getall(total_productos, items_por_pagina);
        highlight();
    }else if(buscador_filtros != false){
        console.log("loadShop buscador_filtros");
        load_buscador_shop();
    }else{
        console.log("loadshop else (url...getall)");
        ajaxForSearch('module/shop/ctrl/ctrl_shop.php?op=getall');
    }
}

function ajaxForSearch(url, filtro = null, total_productos = 0, items_por_pagina = 3) {
    console.log("hola ajaxForSearch");
    console.log("AFS filtros: ", filtro);
    console.log("AFS url: ", url);
    console.log("AFS total_productos: ", total_productos);
    console.log("AFS items_por_pagina: ", items_por_pagina);
    // return false;

    if (total_productos != 0) {
        localStorage.setItem('total_prod', total_productos);
    } else {
        if (localStorage.getItem('total_prod')) {
            total_productos = localStorage.getItem('total_prod');
        } else {
            total_productos = 0;
        }
    }

    const pagina = localStorage.getItem('pagina') || 1;
    const offset = (pagina - 1) * items_por_pagina;

    const sdata = filtro 
        ? { 'filtro': filtro, 'offset': offset, 'limit': items_por_pagina } 
        : { 'offset': offset, 'limit': items_por_pagina };
    
    ajaxPromise(url, 'POST', 'JSON', sdata)
        .then(function (shop) {
            console.log("Datos shop: ", shop);
            // return false;
            $(".container-productos").empty();
            if(shop != "error"){
                console.log("ajaxForSearch shop.id");
                try{
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
                            ); // end .html
                    }
                    leafleft(shop);
                    highlight();
                    botones_filtros();
                } catch (error){
                    console.log("ERROR al pintar productos filtrados");
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
        window.location.href = "index.php?module=ctrl_exceptions&op=503";
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
                            '<option value ="0" disabled selected>Selecciona un tipo</option>' +
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
                            '<option value="0" disabled selected>Selecciona una categoria</option>' +
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
            // select marca
            '<div class="f_marca">' +
                '<h4 class="desplegable-marca">Marca⬇️</h4>' +
                '<div class = "options-marca">' +
                    '<select class="filtro_marca" name="select_marca" id="select_marca">' +
                        '<optgroup label="Marcas">' +
                            '<option value="0" disabled selected>Selecciona una marca</option>' +
                            '<option value="1">Puma</option>' +
                            '<option value="2">Adidas</option>' +
                            '<option value="3">Nike</option>' +
                            '<option value="4">Jordan</option>' +
                            '<option value="5">Reebok</option>' +
                            '<option value="6">Luanvi</option>' +
                            '<option value="7">Spalding</option>' +
                            '<option value="8">Wilson</option>' +
                            '<option value="9">Tenth</option>' +
                            '<option value="10">Joma</option>' +
                            '<option value="11">Under Armour</option>' +
                            '<option value="12">Molten</option>' +
                            '<option value="13">New Era</option>' +
                            '<option value="1200">Kipsta</option>' +
                            '<option value="1201">New Balance</option>' +
                            '<option value="1202">Champion</option>' +
                            '<option value="1203">Hummel</option>' +
                        '</optgroup>' +
                    '</select>' +
                '</div>' + // end .select_marca
            '</div>' + // end .f_marca
            // select ciudad
            '<div class="f_ciudad">' +
                '<h4 class="desplegable-ciudad">Ciudad⬇️</h4>' +
                '<div class = "options-ciudad">' +
                    '<select class="filtro_ciudad" name="select_ciudad" id="select_ciudad">' +
                        '<optgroup label="Ciudades">' +
                            '<option value="0" disabled selected>Selecciona una ciudad</option>' +
                            '<option value="Ontinyent, Valencia">Ontinyent, Valencia</option>' +
                            '<option value="Vallada, Valencia">Vallada, Valencia</option>' +
                            '<option value="Madrid">Madrid</option>' +
                            '<option value="Barcelona">Barcelona</option>' +
                            '<option value="Sevilla">Sevilla</option>' +
                            '<option value="Valencia">Valencia</option>' +
                            '<option value="A Coruna, La Coruna">A Coruna, La Coruna</option>' +
                            '<option value="Malaga">Malaga</option>' +
                            '<option value="Palma, Mallorca">Palma, Mallorca</option>' +
                            '<option value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>' +
                            '<option value="Maspalomas, Canarias">Maspalomas, Canarias</option>' +
                            '<option value="Cordoba">Cordoba</option>' +
                            '<option value="Alicante, Valencia">Alicante, Valencia</option>' +
                            '<option value="Vigo">Vigo</option>' +
                            '<option value="Murcia">Murcia</option>' +
                            '<option value="Zaragoza">Zaragoza</option>' +
                            '<option value="Salamanca">Salamanca</option>' +
                            '<option value="Albacete">Albacete</option>' +
                            '<option value="La Colilla">La Colilla</option>' +
                            '<option value="Bilbao">Bilbao</option>' +
                            '<option value="Granada">Granada</option>' +
                            '<option value="Toledo">Toledo</option>' +
                            '<option value="Monaco">Monaco</option>' +
                        '</optgroup>' +
                    '</select>' +
                '</div>' + // end .options-ciudad
            '</div>' + // end .f_marca
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
    // desplegable marca
    $(document).on('click', '.desplegable-marca', function(){
        $('.options-marca').slideToggle();
    });
    // desplegable ciudad
    $(document).on('click', '.desplegable-ciudad', function(){
        $('.options-ciudad').slideToggle();
    });
}

function eliminar_filtros() {
    localStorage.removeItem('filtro');
    localStorage.removeItem('filtro_tipo');
    localStorage.removeItem('filtro_categoria');
    localStorage.removeItem('filtro_precio');
    localStorage.removeItem('filtro_equipo');
    localStorage.removeItem('filtro_marca');
    localStorage.removeItem('buscar');
    localStorage.removeItem('filtro_ciudad');
    localStorage.removeItem('pagina');
    $("#nofiltros").empty();
    $("#texto-nofiltros").empty();
    location.reload();
    if(!localStorage.getItem('filtro')){
        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=getall");
        highlight();
    }
}

function eliminar_filtros_filtrar(){
    localStorage.removeItem('filtro');
    localStorage.removeItem('filtro_tipo');
    localStorage.removeItem('filtro_categoria');
    localStorage.removeItem('filtro_precio');
    localStorage.removeItem('filtro_equipo');
    localStorage.removeItem('filtro_marca');
    localStorage.removeItem('buscar');
    localStorage.removeItem('filtro_ciudad');
    localStorage.removeItem('pagina');
}

function getall(total_productos, items_por_pagina) {
    var filtro = JSON.parse(localStorage.getItem('filtro'));
    console.log("getall filtros: " + filtro)
    console.log("getall total_productos: ", total_productos)
    console.log("getall items por pagina: ", items_por_pagina)
    // return false;
    if (filtro) {
        console.log("getall yes filtro")
        var filtroequipo = filtro.find(f => f[0] === 'equipo');
        if (filtroequipo && filtroequipo[1].length === 0) {
            filtro = filtro.filter(f => f[0] !== 'equipo');
            localStorage.setItem('filtro', JSON.stringify(filtro));
        }
        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=filtrar", filtro, total_productos, items_por_pagina);
    } else {
        console.log("getall no filtro")
        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=getall");
    }
} // end function getall

function highlight(){
    console.log("hola highlight");

    var all_filtros = JSON.parse(localStorage.getItem('filtro'));

    if (all_filtros) {
        for (var i = 0; i < all_filtros.length; i++) {
            var filtroTipo = all_filtros[i][0];
            var filtroValor = all_filtros[i][1];

            if (filtroTipo === 'tipo' && filtroValor != '*') {
                document.getElementById('select_tipo').value = filtroValor;
            }

            if (filtroTipo === 'categoria' && filtroValor != '*') {
                document.getElementById('select_categoria').value = filtroValor;
            }

            if (filtroTipo === 'precio' && filterValue != '*') {
                document.querySelector(`input[name="precio"][value="${filtroValor}"]`).setAttribute('checked', true);
            }

            if (filtroTipo === 'equipo' && filtroValor.length > 0) {
                for (var j = 0; j < filtroValor.length; j++) {
                    document.getElementById(filtroValor[j]).setAttribute('checked', true);
                }
            }

            if (filtroTipo === 'marca' && filtroValor != '*') {
                document.getElementById('select_marca').value = filtroValor;
            }

            if (filtroTipo === 'ciudad' && filtroValor != '*') {
                document.getElementById('select_ciudad').value = filtroValor;
            }
        }
    }
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
    // filtros de marca
    $('.filtro_marca').change(function (){
        localStorage.setItem('filtro_marca', this.value);
    });
    if(localStorage.getItem('filtro_marca')){
        // console.log(localStorage.getItem('filtro_marca'));
        // return false;
        $('.filtro_marca').val(localStorage.getItem('filtro_marca'));
    }
    // filtros de ciudad
    $('.filtro_ciudad').change(function (){
        localStorage.setItem('filtro_ciudad', this.value);
    });
    if(localStorage.getItem('filtro_ciudad')){
        // console.log(localStorage.getItem('filtro_ciudad'));
        // return false;
        $('.filtro_ciudad').val(localStorage.getItem('filtro_ciudad'));
    }

    $(document).on('click', '.boton_filtrar', function(){

        // eliminar filtros si su valor es 0 para evitar conflictos al filtrar

        // categoria
        if(localStorage.getItem('filtro_categoria') === '0'){
            localStorage.removeItem('filtro_categoria');
        }
        // tipo
        if(localStorage.getItem('filtro_tipo') === '0'){
            localStorage.removeItem('filtro_tipo');
        }
        // ciudad
        if(localStorage.getItem('filtro_ciudad') === '0'){
            localStorage.removeItem('filtro_ciudad');
        }

        // almacenar filtros seleccionados en localstorage

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
        // marca
        if(localStorage.getItem('filtro_marca')){
            filtro.push(['marca', localStorage.getItem('filtro_marca')])
        }
        // ciudad
        if(localStorage.getItem('filtro_ciudad')){
            filtro.push(['ciudad', localStorage.getItem('filtro_ciudad')])
        }

        localStorage.setItem('filtro', JSON.stringify(filtro));

        if(filtro.length > 0){
            paginacion();
            ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=filtrar", filtro);
        }else{
            paginacion();
            ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=getall");
        }

        highlight();
    });
}

function loadProductoDetails(id_producto){
    console.log("hola loadProductoDetails");
    // return false;
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=details&id_producto=' + id_producto, 'GET', 'JSON')
    .then(function(shop){
        $('.container-productos').empty(); // vaciar todos los productos para dejar la web vacia y pintar el details
        $('.container-filtros').empty(); // vaciar los filtros para que no aparezcan en el details
        $('.pimg').empty();
        $('.inf-producto').empty();
        $('#paginacion').empty();
        console.log(shop);
        // return false;
        leafleft(shop[0][0]);
        for (row in shop[1][0]) {
            $('<div></div>').attr({ 'id': shop[1][0].id_pimg, class: 'pimg' }).appendTo('.productos_img')
                .html(
                    "<div class='content-img-details'>" +
                    "<img src= '" + shop[1][0][row].pimage_route + "'" + "</img>" +
                    "</div>" // end .content-img-details
                )
        }
        // console.log(shop[0][0]);
        // return false;
        let extra_entrega = "";
        if(shop[0][0].entrega === 'domicilio'){
            extra_entrega = "<i class='fa-solid fa-truck fa-2xl extra-icons' style='color: #077bd5;'></i>";
        }else if(shop[0][0].entrega === 'persona'){
            extra_entrega = "<i class='fa-solid fa-person fa-2xl' style='color: #077bd5;'></i>";
        } // pintar el camion si la entrega es a domicilio, o la persona si la entrega es en persona
        let nom_equipo = "";
        if (shop[0][0].nom_team !== null) {
            nom_equipo = "<p class='team-details'>" + shop[0][0].nom_team + "</p>";
        } // si el producto tiene equipo lo pinta, de lo contrario no pinta nada
            $('<div></div>').attr({'id': shop[0][0].id_producto, class: 'inf-producto-details'}).appendTo('.inf-details')
                .html(
                    "<style>" +
                    "#map{margin-top:3%;}" +
                    "</style>" +
                    "<div class='inf-prod'>" +
                    "<h3>" + shop[0][0].nom_prod + "</h5>" +
                    "<p class='precio-details'>" + shop[0][0].precio + "€</p>" +
                    "<p class='marca-details'>" + shop[0][0].nom_marca + "</p>" +
                    "<p class='sexo-details'>" + shop[0][0].sexo_prod + "</p>" +
                    "<p class='tipo-details'>" + shop[0][0].tipo + "</p>" +
                    nom_equipo +
                    "<p class='talla-details'>" + shop[0][0].talla + "</p>" +
                    "<b class='letrero-condicion-details'>Condición del producto</b>" +
                    "<a class='condicion-details'> &nbsp;" + shop[0][0].condicion + "</a>" +
                    "<p class='color-details'>" + shop[0][0].color + "</p>" +
                    "<p class='desc-details'>" + shop[0][0].descripcion + "</p>" +
                    "<p class='stock-details'>Hay " + shop[0][0].stock + " unidades disponibles</p>" +
                    "<p class='ciudad-details'><b>Producto ubicado en </b>" + shop[0][0].ciudad + "</p>" +
                    "<p class='entrega-details'>" + shop[0][0].entrega + "</p>" +
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
        window.location.href = "index.php?module=ctrl_exceptions&op=503";
    })
} // funcion loadProductoDetails

function loadDetails() {
    // cargar details desde el producto
    $(document).on("click", ".producto", function() {
        var id_producto = this.getAttribute('id');
        loadProductoDetails(id_producto);
    });
    // cargar details desde el mapa
    $(document).on("click", ".product_popup", function() {
        var id_producto = this.getAttribute('id');
        loadProductoDetails(id_producto);
    });
} // funcion loadDetails

function leafleft(shop){
    // console.log("leafleft shop: ", shop);
    // return false;

    // console.log("leafleft map");
    
    $('#map').remove();
    $('<div id="map"></div>').appendTo('.mapLeafleft');
    
    // if (!document.getElementById('map')) {
    //     console.log("leafleft NO ID MAP");
    //     return false;
    // } else {
    //     console.log("leafleft SI ID MAP");
    // }

    try{
        // var map = L.map('map').setView([38.821, -0.610547], 15);
        var map = L.map('map').setView([shop.altitud || 40.41664790865264, shop.longitud || -3.70093721305357], 6);
    }catch (error){
        console.error("ERROR AL INICIALIZAR EL MAPA");
        return false;
    }
    console.log("leafleft mapa inicializado")

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    if(Array.isArray(shop)){
        console.log("leafleft ARRAY");
        // return false;
        for (row in shop){
            var mapicon = L.icon({
                iconUrl: 'view/images/web-logo/favicon.png',
                iconSize: [50, 50],
                iconAnchor: [50, 50],
                popupAnchor: [20, 20]
            });
            var marker = L.marker([shop[row].altitud, shop[row].longitud], {icon: mapicon}).addTo(map);
            var popup = marker.bindPopup(
                "<div class='product_popup' id='" + shop[row].id_producto + "'>" +
                "<p>" + shop[row].nom_prod + "</p>" +
                "<img src = '" + shop[row].img_producto + "' class='img_popup'>" +
                "</div>");
        }
    }else{
        console.log("leafleft NO ARRAY");
        // return false;
        var mapicon = L.icon({
            iconUrl: 'view/images/web-logo/favicon.png',
            iconSize: [50, 50],
            iconAnchor: [50, 50],
            popupAnchor: [20, 20]
        });
        var marker = L.marker([shop.altitud, shop.longitud], {icon: mapicon}).addTo(map);
        var popup = marker.bindPopup(
            "<div class='product_popup' id='" + shop.id_producto + "'>" +
            "<p>" + shop.nom_prod + "</p>" +
            "<img src = '" + shop.img_producto + "' class='img_popup'>" +
            "</div>"
        );
    }
} // funcion leafleft

function load_buscador_shop(){
    console.log("hola load_buscador");
    // return false;
    var buscar = JSON.parse(localStorage.getItem('buscar'));
    console.log({'datos buscador shop': buscar});
    // return false;
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=filtro_buscador', 'POST', 'JSON', {'buscar': buscar})
        .then(function(buscador){
            console.log(buscador)
            // return false;
            $('.container-productos').empty();
            $("#nofiltros").empty();
            $("#texto-nofiltros").empty();
            
            if(buscador == "error"){
                console.log("load_buscador error")
                $('<div></div>').appendTo('.container-productos')
                    .html(
                        "<div class='nofiltrosdiv'>" +
                        "<h1 id='nofiltros'>No se han encontrado productos con los filtros especificados</h1>" +
                        "<br>" +
                        "<p id='texto-nofiltros'>Pulse el boton 'remover filtros' para volver a la busqueda</p>" +
                        "</div>" // end .nofiltrosdiv
                    );
            }else{
                console.log("load_buscador no error")
                    for (row in buscador) {
                        $("#nofiltros").empty();
                        $("#texto-nofiltros").empty();
                        $('<div></div>').attr('class', "producto").attr({'id': buscador[row].id_producto}).appendTo('.container-productos')
                            .html(
                                "<img src = " + buscador[row].img_producto + " alt='foto' </img> " +
                                "<div class='inf-producto'>" +
                                "<h3>" + buscador[row].nom_prod + "</h5>" +
                                "<p class='precio'>" + buscador[row].precio + "€</p>" +
                                "</div>"
                            ); // end .html
                    }
                    leafleft(buscador);
                    highlight();
                    botones_filtros();
            }
        }).catch(function(){
            window.location.href = "index.php?module=ctrl_exceptions&op=503";
        });
}

function scrollOnTop(){
    $('.sot').append(
        '<button class="sotButton">Volver arriba</button>'
    )
    $(document).on("click", ".sotButton", function() {
        window.scrollTo(0, 0);
    });
}

function paginacion() {
    console.log("hola paginacion")
    // return false;
    let url = '';
    let sdata = {};

    if (localStorage.getItem('filtro')) {
        const filtro = JSON.parse(localStorage.getItem('filtro'));
        url = 'module/shop/ctrl/ctrl_shop.php?op=count_productos_filtros';
        sdata = { 'filtro': filtro };
    } else if (localStorage.getItem('buscar')) {
        const buscar = JSON.parse(localStorage.getItem('buscar'));
        url = 'module/shop/ctrl/ctrl_shop.php?op=count_buscador';
        sdata = { 'buscar': buscar };
    } else if (localStorage.getItem('order')) {
        const value_orderby = JSON.parse(localStorage.getItem('order'));
        url = 'module/shop/ctrl/ctrl_shop.php?op=count_order_filtro';
        sdata = { 'value_orderby': value_orderby };
    } else {
        url = 'module/shop/ctrl/ctrl_shop.php?op=count_productos_all';
    }

    ajaxPromise(url, 'POST', 'JSON', sdata)
        .then(function(data) {
            const total_productos = data[0]?.contador || 0; // Número total de productos
            const items_por_pagina = 3; // Número de productos por página
            const total_paginas = Math.ceil(total_productos / items_por_pagina);

            console.log("Total_productos: ", total_productos, " Items por pagina: ", items_por_pagina, " Total paginas: ", total_paginas)
            // return false;

            // Generar los botones de paginación
            generarBotonesPaginacion(total_paginas, items_por_pagina, total_productos);
        })
        .catch(function(error) {
            console.error('Error en la paginación:', error);
        });
} // end paginacion

function generarBotonesPaginacion(total_paginas, items_por_pagina, total_productos) {
    console.log("hola generarBotonesPaginacion")
    // console.log(total_productos)
    // return false;
    $('#paginacion').empty();

    // Generar los botones de paginación
    for (let i = 1; i <= total_paginas; i++) {
        $('#paginacion').append(`<button class="pagina" data-pagina="${i}">${i}</button>`);
    }

    // Manejar el clic en los botones de paginación
    $(document).on('click', '.pagina', function() {
        const pagina = $(this).data('pagina');
        const offset = (pagina - 1) * items_por_pagina;

        localStorage.setItem('pagina', pagina);

        console.log("generarBotonesPaginacion:\nPagina: ", pagina, "\nOffset: ", offset, "\nTotal paginas: ", total_paginas, "\nItems por pagina: ", items_por_pagina)
        // return false;

        loadShop(total_productos, items_por_pagina);

        // Desplazar la vista hacia la parte superior
        $('html, body').animate({ scrollTop: $(".list__content").offset().top }, 500);
    });
} // end generarBotonesPaginacion

$(document).ready(function(){
    print_filtros();
    loadEquipos();

    loadShop();

    botones_filtros();

    loadDetails();

    scrollOnTop();

    paginacion();
});

// $(document).ready(function(){
//     getall();
//     loadShop();
//     print_filtros();
//     loadEquipos();
//     // loadProductos();
//     loadDetails();
//     botones_filtros();
//     // leafleft();
//     scrollOnTop();
// });