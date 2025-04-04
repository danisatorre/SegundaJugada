<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
    include($path . "/module/AUTH/model/DAOauth.php");

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
                    echo json_encode("error_user");
                    exit;
                } else {
                    if (password_verify($pwd, $rdo['pwd'])) {
                        // $token= create_token($rdo["username"]);
                        echo json_encode($rdo['username']);
                        exit;
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

    } // switch

?>