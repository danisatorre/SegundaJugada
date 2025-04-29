<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
    include($path . "/module/AUTH/model/DAOauth.php");
    include($path . "/model/middleware_auth.php");

    @session_start();
    // if(isset($_SESSION['tiempo'])){
    //     $_SESSION['tiempo'] = time(); // devuelve la fecha actual
    // }

    switch($_GET['op']){

        case 'login-view';
            include ('module/AUTH/view/login.html');
        break;

        case 'register-view';
            include ('module/AUTH/view/register.html');
        break;

        case 'register';
            $email = $_POST['email_reg'];
            $username = $_POST['username_reg'];
            $pwd = $_POST['pwd1_reg'];
            // echo json_encode($email);
            // exit;
            // Comprobar que la email no exista
            try {
                $daoauth = new DAOauth();
                $checkEmail = $daoauth->select_email($email);
            } catch (Exception $e) {
                echo json_encode("error");
                exit;
            }

            try {
                $daoauth = new DAOauth();
                $checkUsername = $daoauth->select_user($username);
            } catch (Exception $e) {
                echo json_encode("error");
                exit;
            }
    
            if ($checkEmail) {
                $check_email = false;
            } else {
                $check_email = true;
            }

            if($checkUsername){
                $check_username = false;
            }else {
                $check_username = true;
            }
    
            // Si no existe el email creará el usuario
            if (!$check_email) {
                echo json_encode("error_email");
                exit;
            }else if(!$check_username){
                echo json_encode("error_username");
                exit;
            }else {
                try {
                    $daoauth = new DAOauth();
                    $rdo = $daoauth->insert_user($username, $email, $pwd);
                } catch (Exception $e) {
                    echo json_encode("error");
                    exit;
                }
                if (!$rdo) {
                    echo json_encode("error_user");
                    exit;
                } else {
                    // echo json_encode($rdo); // ver consulta insert por consola
                    echo json_encode("ok");
                    exit;
                }
            }
        break;

        case 'login';
            $username = $_POST['username'];
            $pwd = $_POST['password'];
            try {
                $daoauth = new DAOauth();
                $rdo = $daoauth->select_user_log($username);

                if ($rdo == "error_user") {
                    $rdo_email = $daoauth->select_email_log($username);

                    if($rdo_email == "error_email"){
                        echo json_encode("error_user");
                        exit;
                    }else{
                        if (password_verify($pwd, $rdo_email['pwd'])) {
                            $token = create_token($rdo_email["username"]);
                            // echo json_encode($rdo_email);
                            // exit;
                            $_SESSION['username'] = $rdo_email['username']; //Guardamos el correo
                            $_SESSION['tiempo'] = time(); //Guardamos el tiempo que se logea
                            echo json_encode($token);
                            exit;
                        } else {
                            echo json_encode("error_pwd");
                            exit;
                        }
                    }
                }else{
                    if (password_verify($pwd, $rdo['pwd'])) {
                        $token= create_token($rdo["username"]);
                        // echo json_encode($rdo);
                        // exit;
                        $_SESSION['username'] = $rdo['username']; //Guardamos el usario 
                        $_SESSION['tiempo'] = time(); //Guardamos el tiempo que se logea
                        echo json_encode($token);
                        exit;
                    } else {
                        echo json_encode("error_pwd");
                        exit;
                    }
                }
            } catch (Exception $e) {
                echo json_encode("error");
                exit;
            }
        break;

        case 'data_user';
            $token = $_POST['token'];
            // $data_user = $token;
            // echo json_encode($data_user['username']);
            // exit;
            $json_token = decode_token($token);
            // echo json_encode($json_token);
            // exit();
            $daoauth = new DAOauth();
            $rdo = $daoauth->select_data_user($json_token['username']);
            // $rdo = $daoauth->select_data_user($token['username']);
            echo json_encode($rdo);
            exit();
        break;

        case 'logout';
            unset($_SESSION['username']);
            unset($_SESSION['tiempo']);
            session_destroy();

            echo json_encode('logout_correct');
        break;

        case 'control_user';
            $tokenNormal = $_POST['token'];
            // echo json_encode($tokenNormal);
            // exit();

            $tokenDec = decode_token($tokenNormal);
            // echo json_encode($tokenDec);
            // echo json_encode($tokenDec['username']);
            // exit();

            if ($tokenDec['exp'] < time()) {
                echo json_encode("UsuarioNoValido");
                exit();
            }

            if (isset($_SESSION['username']) && ($_SESSION['username']) == $tokenDec['username']) {
                echo json_encode("UsuarioValido");
                exit();
            } else {
                echo json_encode("UsuarioNoValido");
                exit();
            }
            exit();
        break;

        case 'actividad';
            if(!isset($_SESSION["tiempo"])){
                echo json_encode("inactivo");
                exit();
            }else{
                if((time() - $_SESSION["tiempo"]) >= 60){ // 1800s = 30min
                    echo json_encode("inactivo");
                    exit();
                }else{
                    echo json_encode("activo");
                    exit();
                }
            }
        break;

        case 'refresh_token';
            $tokenNormal = $_POST['token'];
            // echo json_encode($tokenNormal);
            // exit;

            $oldToken = decode_token($tokenNormal);
            $newToken = create_token($oldToken['username']);
            echo json_encode($newToken);
            exit;
        break;

        case 'refresh_cookie';
            session_regenerate_id();
            echo json_encode("cookie_actualizada");
            exit;
        break;

        default;
            include("module/exceptions/view/pages/error404.html");
        break;

    } // switch

?>