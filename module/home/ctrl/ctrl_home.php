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
            }else{
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
            }else{
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
            }else{
                echo json_encode("error");
            }
        break;
        
        case 'homePageMarca';
            try{
                $daohome = new DAOhome();
                $selectmarca = $daohome->select_marca();
            } catch(Exception $e){
                echo json_encode("error");
            }

            if(!empty($selectmarca)){
                echo json_encode($selectmarca);
            }else{
                echo json_encode("error");
            }
        break;

        case 'homePageProductos';
            try{
                $daohome = new DAOhome();
                $selectproducto = $daohome->select_productos();
            } catch(Exception $e){
                // $data = 'hola crtl home homePageProductos ERROR catch Exception e';
                // die('<script>console.log('.json_encode( $data ) .');</script>');
                echo json_encode("error");
            }

            if(!empty($selectproducto)){
                echo json_encode($selectproducto);
            }else{
                // $data = 'hola crtl home homePageProductos ERROR !EMPTY';
                // die('<script>console.log('.json_encode( $data ) .');</script>');
                echo json_encode("error");
            }
        break;

        case 'homePageAccesorios';
            try{
                $daohome = new DAOhome();
                $selectaccesorio = $daohome->select_accesorios();
            }catch(Exception $e){
                echo json_encode("error");
            }

            if(!empty($selectaccesorio)){
                echo json_encode($selectaccesorio);
            }else{
                echo json_encode("error");
            }
        break;

        case 'homePagePopulares';
            try{
                $daohome = new DAOhome();
                $selectpopulares = $daohome->select_populares();
            }catch(Exception $e){
                echo json_encode("error");
            }

            if(!empty($selectpopulares)){
                echo json_encode($selectpopulares);
            }else{
                echo json_encode("error");
            }
        break;

        case 'homePageRating';
            try{
                $daohome = new DAOhome();
                $selectrating = $daohome->select_rating();
            }catch(Exception $e){
                echo json_encode("error");
            }

            if(!empty($selectrating)){
                echo json_encode($selectrating);
            }else{
                echo json_encode("error");
            }
        break;

        case 'homePageRatingCategoria';
            try{
                $daohome = new DAOhome();
                $selectrating_categoria = $daohome->select_rating_categoria();
            }catch(Exception $e){
                echo json_encode("error");
            }

            if(!empty($selectrating_categoria)){
                echo json_encode($selectrating_categoria);
            }else{
                echo json_encode("error");
            }
        break;

        case 'homePageRatingTipo';
            try{
                $daohome = new DAOhome();
                $selectrating_tipo = $daohome->select_rating_tipo();
            }catch(Exception $e){
                echo json_encode("error");
            }

            if(!empty($selectrating_tipo)){
                echo json_encode($selectrating_tipo);
            }else{
                echo json_encode("error");
            }
        break;

        default;
            include("index.php?module=ctrl_exceptions&op=404");
        break;
    }
?>