<?php 

    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
    include($path . "/module/shop/model/DAOshop.php");

    switch($_GET['op']){

        case 'list';
            include('module/shop/view/shop.html');
        break;

        case 'getall';
            try{
                $daoshop = new DAOshop();
                $select_all = $daoshop->get_all();
            }catch(Exception $e){
                echo json_encode("error");
            }

            if(!empty($select_all)){
                echo json_encode($select_all);
            }else{
                echo json_encode("error");
            }
        break;

    }

?>