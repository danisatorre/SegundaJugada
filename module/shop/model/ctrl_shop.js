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

function loadProductoDetails(id_producto){
    console.log("hola loadProductoDetails");
    // return false;
    $('.container-productos').empty(); // vaciar todos los productos para dejar la web vacia y pintar el details
    // Limpiar el contenedor de detalles
    $('.container-details').empty();
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=details&id_producto=' + id_producto, 'GET', 'JSON')
    .then(function(data){
        console.log(data);
        // return false;
            $('<div></div>').attr('class', "details").attr({'id': data.id_producto}).appendTo('.container-details')
                .html(
                    "<div class='img-details'>"+
                    "<img class='img-producto-border' src = " + data.img_producto + " alt='foto' </img> " +
                    "</div>" + // end .img-details
                    "<div class='inf-details'>" +
                    "<h3>" + data.nom_prod + "</h5>" +
                    "<p class='precio-details'>" + data.precio + "€</p>" +
                    "<p class='desc-details'>" + data.descripcion + "</p>" +
                    "</div>" // end .inf-producto
                ) // end .html
    }).catch(function(){
        window.location.href = "module/exceptions/ctrl/ctrl_exceptions.php?&op=503";
    })
} // funcion loadProductoDetails

$(document).ready(function(){
    loadProductos();
});