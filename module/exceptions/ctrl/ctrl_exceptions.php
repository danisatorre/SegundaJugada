<?php

    // $data = 'hola crtl exceptions';
    // die('<script>console.log('.json_encode( $data ) .');</script>');

    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
    // include($path . "/module/exceptions/");

    switch ($_GET['op']) {
        case '503';
            // $data = 'hola crtl exceptions ERROR 503';
            // die('<script>console.log('.json_encode( $data ) .');</script>');
            include($path . "module/exceptions/view/pages/error503.html");
        break;

        case '404';
            include($path . "module/exceptions/view/pages/error404.html");
        break;

        default;
            include($path . "module/exceptions/view/pages/error404.html");
        break;
    }
?>