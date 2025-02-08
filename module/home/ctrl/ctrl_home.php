<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/8_MVC_CRUD/Programacion-PHP/';
    include($path . "/module/home/model/DAO_home.php");

    switch ($_GET['op']) {
        case 'list';
            include ('module/home/view/home.html');
        break;

        case 'Carrousel_Marcas';
            try{
                $daohome = new DAOHome();
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
            try{
                $daohome = new DAOHome();
                $selectcategoria = $daohome->select_categoria();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($selectcategoria)){
                echo json_encode($selectcategoria); 
            }
            else{
                echo json_encode("error");
            }
        break;

        case 'homePageTipo';
            try{
                $daohome = new DAOHome();
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