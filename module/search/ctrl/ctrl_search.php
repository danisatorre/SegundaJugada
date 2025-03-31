<?php

    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
    include($path . "/module/search/model/DAOsearch.php");

    switch($_GET['op']){

        case 'search';

        break;

        case 'categoria';
            $daosearch_categoria = new DAOsearch();
            $select_categorias = $daosearch_categoria -> categorias();
            if(!empty($select_categorias)){
                echo json_encode($select_categorias);
            }else{
                echo json_encode("error");
            }
        break;

        case 'tipo';
            $daosearch_tipo = new DAOsearch();
            $select_tipos = $daosearch_tipo -> tipos();
            if(!empty($select_tipos)){
                echo json_encode($select_tipos);
            }else{
                echo json_encode("error");
            }
        break;

        case 'autocompletar';
            $tipo_producto = $_POST['tipo_producto'];
            $categoria_producto = $_POST['categoria_producto'];
            $completar = $_POST['completar'];
            
            try {
                $daosearch_autocompletar = new DAOsearch();
                if ($tipo_producto !== '0' && $categoria_producto === '0') {
                    $select_autocompletar = $daosearch_autocompletar->select_producto_tipo($completar, $tipo_producto);
                } else if ($tipo_producto !== '0' && $categoria_producto !== '0') {
                    $select_autocompletar = $daosearch_autocompletar->select_producto_tipo_categoria($completar, $tipo_producto, $categoria_producto);
                } else if ($tipo_producto === '0' && $categoria_producto !== '0') {
                    $select_autocompletar = $daosearch_autocompletar->select_producto_categoria($completar, $categoria_producto);
                } else {
                    $select_autocompletar = $daosearch_autocompletar->select_producto($completar);
                }
            } catch (Exception $e) {
                echo json_encode("error");
                exit;
            }
            if(!empty($select_autocompletar)){
                echo json_encode($select_autocompletar);
            }else{
                echo json_encode("error");
            }
        break;

    } // end switch GET OP

?>