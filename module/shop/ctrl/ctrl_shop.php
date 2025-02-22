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

            try{ // coger los datos del producto sin las imagenes
                $daoshop_producto = new DAOshop();
                // die('<script>console.log('.json_encode( $id_producto ) .');</script>');
                $select_producto = $daoshop_producto->select_producto($id_producto);
                // die('<script>console.log('.json_encode( $id_producto ) .');</script>');
                // die('<script>console.log('.json_encode( $select_producto ) .');</script>');
            }catch(Exception $e){
                echo json_encode("error");
            }
            try{ // coger todas las imagenes del producto
                $daoshop_img = new DAOshop();
                $select_pimg = $daoshop_img->select_pimg($id_producto);
            }catch(Exception $e){
                echo json_encode("error");
            }

            if(!empty($select_producto || $select_pimg)){
                $rdo = array();
                $rdo[0] = $select_producto;
                $rdo[1][] = $select_pimg;
                // die('<script>console.log('.json_encode( $rdo ) .');</script>');
                echo json_encode($rdo);
            }else{
                echo json_encode("error");
            }
        break;

    }

?>