<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
    include($path . "/module/AUTH/model/DAOauth.php");

    switch($_GET['op']){

        case 'login';
            include ('module/AUTH/view/login.html');
        break;

        case 'register';
            include ('module/AUTH/view/register.html');
        break;

    } // switch

?>