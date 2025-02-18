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
            $('<div></div>').attr('class', "producto").attr({'id': data[row].id_tipo}).appendTo('.container-productos')
                .html(
                    "<img src = " + data[row].img_tipo + " alt='foto' </img> " +
                    "<div class='inf-producto'>" +
                    "<h3>" + data[row].tipo + "</h5>" +
                    "<p class='precio'>" + data[row].id_tipo + "€</p>" +
                    "</div>"
                ) // end .html
        } // end row in data
    }).catch(function(){
        window.location.href = "module/exceptions/ctrl/ctrl_exceptions.php?&op=503";
    })
} // funcion loadProductos

$(document).ready(function(){
    loadProductos();
});