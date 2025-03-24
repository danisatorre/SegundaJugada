function load_tipo(){
    ajaxPromise('module/search/ctrl/ctrl_search.php?op=tipo', 'POST', 'JSON')
        .then(function(data){
            // console.log("load_tipo data: ", data)
            $('#tipo_producto').empty();
            $('#tipo_producto').append('<option value="0">Tipo</option>');
            for(row in data){
                $('#tipo_producto').append('<option value = "' + data[row].id_tipo + '">' + data[row].tipo + '</option>');
            }
        }).catch(function(data){
            console.log('load_tipo (data == undefined) ERROR al cargar los tipos en el controlador del buscador de js');
            // return false;
            window.location.href = "index.php?module=ctrl_exceptions&op=503";
        })
} // load_categoria

function load_categoria(data){
    if(data == undefined){
        console.log("load_categoria data(undefined)");
        ajaxPromise('module/search/ctrl/ctrl_search.php?op=categoria', 'POST', 'JSON')
            // console.log("load_categoria data undefined: ", data)
            .then(function(data) {
                $('#categoria_producto').empty();
                $('#categoria_producto').append('<option value = "0">Categoria</option>');
                for (row in data) {
                    $('#categoria_producto').append('<option value = "' + data[row].id_categoria + '">' + data[row].categoria + '</option>');
                }
            }).catch(function() {
                console.log("load_categoria ERROR al cargar las categorias en el controlador del buscador de js");
                // return false;
                window.location.href = "index.php?module=ctrl_exceptions&op=503";
            });
    }else{
        console.log("load_categoria data(defined)");
        ajaxPromise('module/search/ctrl/ctrl_search.php?op=categoria', 'POST', 'JSON', data)
            // console.log("load_categoria data defined: ", data)
            .then(function(data) {
                $('#categoria_producto').empty();
                $('#categoria_producto').append('<option value = "0">Categoria</option>');
                for (row in data) {
                    $('#categoria_producto').append('<option value = "' + data[row].id_categoria + '">' + data[row].categoria + '</option>');
                }
            }).catch(function() {
                console.log("load_categoria ERROR al cargar las categorias en el controlador del buscador de js");
                // return false;
                window.location.href = "index.php?module=ctrl_exceptions&op=503";
            });
    }
} // load_tipo

function load_buscador(){
    load_tipo();
    load_categoria();
    $('#tipo_producto').on('change', function(){
        let tipo = $(this).val();
        if(tipo === 0){
            load_categoria();
        }else{
            load_categoria({tipo});
        }
    });
} // load_buscador

function autocompletar(){
    $("#autocompletar").on("keyup", function() {
        let sdata = { completar: $(this).val() };

        if (($('#tipo_producto').val() != 0)) {
            sdata.tipo_producto = $('#tipo_producto').val();
            if (($('#tipo_producto').val() != 0) && ($('#categoria_producto').val() != 0)) {
                sdata.categoria_producto = $('#categoria_producto').val();
            }
        }
        if (($('#tipo_producto').val() == 0) && ($('#categoria_producto').val() != 0)) {
            sdata.categoria_producto = $('#categoria_producto').val();
        }
        ajaxPromise('module/search/ctrl/ctrl_search.php?op=autocompletar', 'POST', 'JSON', sdata)
            .then(function(data) {
                console.log("autocompletar: ", data);
                if(data != "error"){
                    $('#buscar_producto').empty();
                    $('#buscar_producto').fadeIn(10000000);
                    for (row in data) {
                        $('<div></div>').appendTo('#buscar_producto').html(data[row].ciudad).attr({ 'class': 'buscarElemento', 'id': data[row].ciudad });
                    }
                    $(document).on('click', '.buscarElemento', function() {
                        $('#autocompletar').val(this.getAttribute('id'));
                        $('#buscar_producto').fadeOut(900);
                    });
                    $(document).on('click scroll', function(event) {
                        if (event.target.id !== 'autocompletar') {
                            $('#buscar_producto').fadeOut(1000);
                        }
                    });
                }else if(data === "error"){
                    $('#buscar_producto').empty();
                    $('#buscar_producto').fadeIn(10000000);
                    $('<div></div>').appendTo('#buscar_producto').html(
                        "<div class='buscarElemento'>" +
                        "<a>No se encontraron ciudades</a>"
                    )
                    $(document).on('click scroll', function(event) {
                        if (event.target.id !== 'autocompletar') {
                            $('#buscar_producto').fadeOut(1000);
                        }
                    });
                }
            }).catch(function(error) {
                console.error("autocompletar ERROR ajaxPromise: ", error);
                $('#buscar_producto').fadeOut(500);
            });
    });
    $("#autocompletar").on("focus", function() {
        $('#buscar_producto').fadeIn(10000000);
    });
} // autocompletar

function boton_buscar(){
    $('#boton_buscar').on('click', function(){
        var buscar = [];

        if($('#autocompletar').val() == ""){
            localStorage.setItem('filtro_ciudad', '0');
            localStorage.setItem('filtro_tipo', $('#tipo_producto').val());
            localStorage.setItem('filtro_categoria', $('#categoria_producto').val());

            buscar.push({"filtro_ciudad": '0'});
            buscar.push({"filtro_tipo": $('#tipo_producto').val()});
            buscar.push({"filtro_categoria": $('#categoria_producto').val()});
        }else{
            localStorage.setItem('filtro_ciudad', $('#autocompletar').val());
            localStorage.setItem('filtro_tipo', $('#tipo_producto').val());
            localStorage.setItem('filtro_categoria', $('#categoria_producto').val());

            buscar.push({"filtro_ciudad": $('#autocompletar').val()});
            buscar.push({"filtro_tipo": $('#tipo_producto').val()});
            buscar.push({"filtro_categoria": $('#categoria_producto').val()});
        }

        eliminar_filtros_buscar();

        localStorage.setItem('buscar', JSON.stringify(buscar));
        // highlight_buscador();
        // return false;
        console.log("Valores almacenados en localStorage: ", localStorage.getItem('buscar'));
        window.location.href = 'index.php?module=ctrl_shop&op=list';
    });
} // boton_buscar

function eliminar_filtros_buscar(){
    localStorage.removeItem('filtro');
    localStorage.removeItem('filtro_precio');
    localStorage.removeItem('filtro_equipo');
    localStorage.removeItem('filtro_marca');
}

function highlight_buscador(){
    console.log("hola highlight buscador")
    // return false;
    var buscador_filtros = JSON.parse(localStorage.getItem('buscar'));

    if(buscador_filtros){
        var ciudad = (buscador_filtros[0]['filtro_ciudad']);
        var tipo = (buscador_filtros[1]['filtro_tipo'][0]);
        var categoria = (buscador_filtros[2]['filtro_categoria']);

        // console.log(ciudad)
        // console.log(tipo)
        // console.log(categoria)
        // return false;

        if(tipo != '0'){
            document.getElementById('tipo_producto').value = tipo;
        }
        
        if(categoria != '0'){
            document.getElementById('categoria_producto').value = categoria;
        }

        if(ciudad != '0'){
            document.getElementById('autocompletar').value = ciudad;
        }
    }
}

$(document).ready(function() {
    load_buscador();
    autocompletar();
    boton_buscar();
    highlight_buscador();
});