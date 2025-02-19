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
                    "<a href='index.php?module=ctrl_shop&op=details&id_producto="+ data[row].id_producto + "'>" +
                    "<img src = " + data[row].img_producto + " alt='foto' </img> " +
                    "</a>" +
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

function loadProductoDetails(id_producto){
    // console.log("hola loadProductoDetails");
    // return false;
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=details&id_producto=' + id_producto, 'GET', 'JSON')
    .then(function(data){
        console.log(data);
        // return false;
            $('<div></div>').attr('class', "producto").attr({'id': data.id_producto}).appendTo('.container-details')
                .html(
                    "<img src = " + data.img_producto + " alt='foto' </img> " +
                    "<div class='inf-producto'>" +
                    "<h3>" + data.nom_prod + "</h5>" +
                    "<p class='precio'>" + data.precio + "€</p>" +
                    "</div>"
                ) // end .html
    }).catch(function(){
        window.location.href = "module/exceptions/ctrl/ctrl_exceptions.php?&op=503";
    })
} // funcion loadProductoDetails

$(document).ready(function(){
    loadProductos();
    loadProductoDetails(id_producto);
});