<?php 

    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
    include($path . "/module/shop/model/DAOshop.php");
    include($path . "/model/middleware_auth.php");

    // ACTIVIDAD DEL USUARIO
    if(isset($_SESSION['tiempo'])){
        $_SESSION['tiempo'] = time(); // devuelve la fecha actual
    }

    switch($_GET['op']){

        case 'list';
            include('module/shop/view/shop.html');
        break;

        case 'getall';
            $offset = $_POST['offset'];
            $limit = $_POST['limit'];
            try{
                $daoshop = new DAOshop();
                $select_all = $daoshop->get_all($offset, $limit);
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

        case 'filtrar';
            $filtro=($_POST['filtro']);
            // $equipo=($_POST['equipo']);
            // $tipo=($_POST['tipo']);
            // $categoria=($_POST['categoria']);
            // $precio=($_POST['precio']);
            $offset = $_POST['offset'];
            $limit = $_POST['limit'];

            // echo json_encode($filtro);
            // exit;

            $dahoshop_filtros = new DAOshop();
            $select_filtros = $dahoshop_filtros -> filtros($filtro, $offset, $limit);
            if (!empty($select_filtros)) {
                echo json_encode($select_filtros);
            }
            else {
                echo json_encode("error");
            }
        break;

        case 'filtro_equipos';
            $dahoshop_equipos = new DAOshop();
            $select_equipos = $dahoshop_equipos -> checkbox_equipos();
            if(!empty($select_equipos)){
                echo json_encode($select_equipos);
            }else{
                echo json_encode("error");
            }
        break;

        case 'filtro_home';
            $filtro = "";

            if (isset($_POST['filtro_categoria'])) {
                $filtro = $_POST['filtro_categoria'];
                $filtro_home = "p.categoria = '" . $filtro . "'";
            } else if (isset($_POST['filtro_marca'])) {
                $filtro = $_POST['filtro_marca'];
                $filtro_home = "p.marca = '" . $filtro . "'";
            } else if (isset($_POST['filtro_tipo'])) {
                $filtro = $_POST['filtro_tipo'];
                $filtro_home = "p.tipo = '" . $filtro . "'";
            } else if (isset($_POST['filtro_accesorio'])) {
                $filtro = $_POST['filtro_accesorio'];
                $filtro_home = "p.tipo = '" . $filtro . "'";
            }

            $dahoshop_home = new DAOshop();
            $select_home = $dahoshop_home -> filtro_home($filtro_home);
            if(!empty($select_home)){
                echo json_encode($select_home);
            }else{
                echo json_encode("error");
            }
        break;

        case 'filtro_buscador';
            $buscador = $_POST['buscar'];
            $ciudad = ($buscador[0]['filtro_ciudad']);
            $tipo = ($buscador[1]['filtro_tipo'][0]);
            $categoria = ($buscador[2]['filtro_categoria']);
            $offset = $_POST['offset'];
            $limit = $_POST['limit'];

            // echo json_encode($ciudad);
            // echo json_encode($tipo);
            // echo json_encode($categoria);
            // echo json_encode($buscador);
            // exit;

            try {
                $daoshop_buscador = new DAOshop();
                if (($categoria != "0") && ($tipo == "0") && ($ciudad == "0")) {
                    $select_buscador = $daoshop_buscador->select_categoria_buscador($categoria, $offset, $limit);
                } else if (($categoria == "0") && ($tipo != "0") && ($ciudad == "0")) {
                    $select_buscador = $daoshop_buscador->select_tipo_buscador($tipo, $offset, $limit);
                } else if (($categoria == "0") && ($tipo == "0") && ($ciudad != "0")) {
                    $select_buscador = $daoshop_buscador->select_ciudad_buscador($ciudad, $offset, $limit);
                } else if (($categoria != "0") && ($tipo != "0") && ($ciudad == "0")) {
                    $select_buscador = $daoshop_buscador->select_categoria_tipo_buscador($categoria, $tipo, $offset, $limit);
                } else if (($categoria == "0") && ($tipo != "0") && ($ciudad != "0")) {
                    $select_buscador = $daoshop_buscador->select_tipo_ciudad_buscador($tipo, $ciudad, $offset, $limit);
                } else if (($categoria != "0") && ($tipo == "0") && ($ciudad != "0")) {
                    $select_buscador = $daoshop_buscador->select_categoria_ciudad_buscador($categoria, $ciudad, $offset, $limit);
                } else if (($categoria != "0") && ($tipo != "0") && ($ciudad != "0")) {
                    $select_buscador = $daoshop_buscador->select_all_buscador($categoria, $tipo, $ciudad, $offset, $limit);
                } else {
                    $select_buscador = $daoshop_buscador->get_all();
                }
            } catch (Exception $e) {
                echo json_encode("error");
                exit;
            }
            if(!$select_buscador){
                echo json_encode("error");
                exit;
            }else{
                $dinfo = array();
                foreach($select_buscador as $row){
                    array_push($dinfo, $row);
                }
                echo json_encode($dinfo);
            }
        break;

        case 'count_productos_filtros';
            $filtro = $_POST['filtro'];

            try{
                $daoshop_c_p_f = new DAOshop();
                $select_c_p_f = $daoshop_c_p_f->count_productos_filtros($filtro);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }

            if(!$select_c_p_f){
                echo json_encode("error");
                exit;
            }else{
                $dinfo = array();
                foreach($select_c_p_f as $row){
                    array_push($dinfo, $row);
                }
                echo json_encode($dinfo);
            }
        break;

        case 'count_buscador';
            $buscador = $_POST['buscar'];
            $ciudad = ($buscador[0]['filtro_ciudad']);
            $tipo = ($buscador[1]['filtro_tipo'][0]);
            $categoria = ($buscador[2]['filtro_categoria']);

            try{
                $daoshop_c_p_f = new DAOshop();
                $select_c_p_f = $daoshop_c_p_f->count_buscador($categoria, $tipo, $ciudad);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }

            if(!$select_c_p_f){
                echo json_encode("error");
                exit;
            }else{
                $dinfo = array();
                foreach($select_c_p_f as $row){
                    array_push($dinfo, $row);
                }
                echo json_encode($dinfo);
            }
        break;

        case 'count_productos_all';
            try{
                $daoshop_count_all = new DAOshop();
                $select_count_all = $daoshop_count_all->count_all();
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }

            if(!$select_count_all){
                echo json_encode("error");
                exit;
            }else{
                $dinfo = array();
                foreach($select_count_all as $row){
                    array_push($dinfo, $row);
                }
                echo json_encode($dinfo);
            }
        break;

        case 'count_productos_relacionados';
            $tipo = $_POST['tipo'];
            $id_producto = $_POST['id_producto'];
            
            // echo json_encode($id_producto);
            // echo json_encode($tipo);
            // exit;

            try {
                $daoshop_c_p_r = new DAOshop();
                $select_c_p_r = $daoshop_c_p_r->count_productos_relacionados($tipo, $id_producto);
            } catch (Exception $e) {
                echo json_encode("error");
                exit;
            }
            if (!$select_c_p_r) {
                echo json_encode("error");
                exit;
            } else {
                $dinfo = array();
                foreach ($select_c_p_r as $row) {
                    array_push($dinfo, $row);
                }
                echo json_encode($dinfo);
            }
        break;

        case 'productos_relacionados';
            $tipo = $_POST['tipo_producto'];
            $loaded =  $_POST['loaded'];
            $items =  $_POST['items'];
            $id_producto = $_POST['id_producto'];
            try {
                $daoshop_p_r = new DAOshop();
                $select_p_r = $daoshop_p_r->select_productos_relacionados($tipo, $loaded, $items, $id_producto);
            } catch (Exception $e) {
                echo json_encode("error");
                exit;
            }
            if (!$select_p_r) {
                echo json_encode("error");
                exit;
            } else {
                $dinfo = array();
                foreach ($select_p_r as $row) {
                    array_push($dinfo, $row);
                }
                echo json_encode($dinfo);
            }
        break;
        
        case 'update_visitas';
            $id_producto = $_POST['id_producto'];

            // echo json_encode($id_producto);
            // exit;

            try{
                $daoshop_u_v = new DAOshop();
                $select_u_v = $daoshop_u_v->update_visitas($id_producto);
            } catch(Exception $e){
                echo json_encode("error");
                exit;
            }
        break;

        case 'update_rating';
            $id_producto = $_POST['id_producto'];
            $rating = $_POST['rating'];

            // echo json_encode($id_producto);
            // echo json_encode($rating);
            // exit;

            try{
                $daoshop_u_r = new DAOshop();
                $select_u_r = $daoshop_u_r->update_rating($id_producto, $rating);
            } catch(Exception $e){
                echo json_encode("error");
                exit;
            }
        break;

        case 'update_visitas_categoria';
            $id_categoria = $_POST['id_categoria'];

            // echo json_encode($id_producto);
            // echo json_encode($rating);
            // exit;

            try{
                $daoshop_u_v_c = new DAOshop();
                $select_u_v_c = $daoshop_u_v_c->update_visitas_categoria($id_categoria);
            } catch(Exception $e){
                echo json_encode("error");
                exit;
            }
        break;

        case 'update_visitas_tipo';
            $id_tipo = $_POST['id_tipo'];

            // echo json_encode($id_producto);
            // echo json_encode($rating);
            // exit;

            try{
                $daoshop_u_v_t = new DAOshop();
                $select_u_v_t = $daoshop_u_v_t->update_visitas_tipo($id_tipo);
            } catch(Exception $e){
                echo json_encode("error");
                exit;
            }
        break;

        case 'ctrl_likes';
            $tokenNormal = $_POST['token'];
            $id_producto = $_POST['id_producto'];

            try{
                $token = decode_token($tokenNormal);
                // echo json_encode($token['username']);
                // exit;
                $daoshop_ctrl_likes = new DAOshop();
                $select_ctrl_likes = $daoshop_ctrl_likes->select_likes($id_producto, $token['username']);
            }catch(Exception $e){
                echo json_encode('error');
                exit;
            }
            if(!$select_ctrl_likes){
                echo json_encode('error');
                exit;
            }else{
                $dsinfo = array();
                foreach($select_ctrl_likes as $row){
                    array_push($dsinfo, $row);
                }
                if(count($dsinfo) === 0){
                    $daoshop_ctrl_likes = new DAOshop();
                    $select_ctrl_likes = $daoshop_ctrl_likes->like($id_producto, $token['username']);
                    echo json_encode('0');
                    exit;
                }else{
                    $daoshop_ctrl_likes = new DAOshop();
                    $select_ctrl_likes = $daoshop_ctrl_likes->dislike($id_producto, $token['username']);
                    echo json_encode('1');
                    exit;
                }
            }
        break;

        case 'load_likes_user';
            try {
                $tokenNormal = $_POST['token'];
                // echo json_encode($tokenNormal);
                // exit;
                $token = decode_token($tokenNormal);
                $username = $token['username'];
                // echo json_encode($username);
                // exit;
                $daoshop_l_l_u = new DAOshop();
                // echo json_encode("DAOshop_inicializado");
                // exit;
                $select_l_l_u = $daoshop_l_l_u->select_load_likes($username);
                // echo json_encode("despues_del_select...");
                // echo json_encode($select_l_l_u);
                // exit;
            } catch (Exception $e) {
                echo json_encode("error");
                exit;
            }

            if (!$select_l_l_u || empty($select_l_l_u)) {
                echo json_encode("error");
                exit;
            } else {
                // echo json_encode($select_l_l_u);
                // exit;
                $dsinfo = array();
                foreach ($select_l_l_u as $row) {
                    array_push($dsinfo, $row);
                }
                echo json_encode($dsinfo);
                exit;
            }
        break;

    }

?>