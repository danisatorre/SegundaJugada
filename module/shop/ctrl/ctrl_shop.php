<?php 

    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
    include($path . "/module/shop/model/DAOshop.php");

    switch($_GET['op']){

        case 'list_all';
            include('module/shop/view/list_all.html')
        break;

        case 'get_all';
            try{
                $daoshop = new DAOshop();
                $select_all = $dahoshop->get_all();
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