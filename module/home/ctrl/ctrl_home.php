<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/8_MVC_CRUD/Programacion-PHP/';
    include($path . "/module/home/model/DAO_home.php");

    switch ($_GET['op']) {
        case 'list';
            include ('module/home/view/home.html');
        break;

        case 'Carrousel_Brand';
            try{
                $daohome = new DAOHome();
                $SelectBrand = $daohome->select_marca();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($SelectBrand)){
                echo json_encode($SelectBrand); 
            }
            else{
                echo json_encode("error");
            }
        break;

        case 'homePageCategory';
            try{
                $daohome = new DAOHome();
                $SelectCategory = $daohome->select_categoria();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($SelectCategory)){
                echo json_encode($SelectCategory); 
            }
            else{
                echo json_encode("error");
            }
        break;

        case 'homePageType';
            try{
                $daohome = new DAOHome();
                $SelectType = $daohome->select_tipo();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($SelectType)){
                echo json_encode($SelectType); 
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