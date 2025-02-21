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

        case 'details';
            $id_producto=($_GET['id_producto']);
            // die('<script>console.log('.json_encode( $id_producto ) .');</script>');

            try{
                $daoshop = new DAOshop();
                // die('<script>console.log('.json_encode( $id_producto ) .');</script>');
                $select_producto = $daoshop->select_producto($id_producto);
                // die('<script>console.log('.json_encode( $id_producto ) .');</script>');
                // die('<script>console.log('.json_encode( $select_producto ) .');</script>');
            }catch(Exception $e){
                echo json_encode("error");
            }

            if(!empty($select_producto)){
                echo json_encode($select_producto);
            }else{
                echo json_encode("error");
            }
        break;

    }

?>