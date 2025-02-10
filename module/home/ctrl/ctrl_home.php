<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
    include($path . "/module/home/model/DAOhome.php");

    switch ($_GET['op']) {
        case 'list';
            include ('module/home/view/home.html');
        break;

        case 'Carrousel_Marcas';
            try{
                $daohome = new DAOhome();
                $selectmarca = $daohome->select_marca();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($selectmarca)){
                echo json_encode($selectmarca); 
            }
            else{
                echo json_encode("error");
            }
        break;

        case 'homePageCategoria';
            // $data = 'hola crtl home CATEGORIA';
            // die('<script>console.log('.json_encode( $data ) .');</script>');
            try{
                $daohome = new DAOhome();
                $selectcategoria = $daohome->select_categoria();
                // die('<script>console.log('.json_encode( $selectcategoria ) .');</script>');
            } catch(Exception $e){
                // $data = 'hola crtl home EXCEPTION CATEGORIA';
                // die('<script>console.log('.json_encode( $data ) .');</script>');
                echo json_encode("error");
            }
            
            if(!empty($selectcategoria)){
                // $data = 'hola crtl home !EMPTY SELECTCAGTGORIA';
                // die('<script>console.log('.json_encode( $data ) .');</script>');
                // die('<script>console.log('.json_encode( $selectcategoria ) .');</script>');
                echo json_encode($selectcategoria); 
            }
            else{
                // $data = 'hola crtl home ELSE SELECTCAGTGORIA';
                // die('<script>console.log('.json_encode( $data ) .');</script>');
                echo json_encode("error");
            }
        break;

        case 'homePageTipo';
            try{
                $daohome = new DAOhome();
                $selecttipo = $daohome->select_tipo();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($selecttipo)){
                echo json_encode($selecttipo); 
            }
            else{
                echo json_encode("error");
            }
        break;

        default;
            include("module/exceptions/views/pages/error404.html");
        break;
    }
?>