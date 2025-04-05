<?php

    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
	include($path . "/model/connect.php");

    class DAOauth{

        function select_email($email){
            $sql = "SELECT email FROM users WHERE email='$email'";
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            return $res;
        }

        function select_user($username){
            $sql = "SELECT username FROM users WHERE username='$username'";
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            return $res;
        }

        function select_user_log($username){
            $sql = "SELECT `username`, `pwd`, `email`, `tipo_usuario`, `avatar` FROM `users` WHERE username='$username'";
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);

            if ($res) {
                $value = get_object_vars($res);
                return $value;
            }else {
                return "error_user";
            }
        }

        function insert_user($username, $email, $pwd){
            $hashpwd = password_hash($pwd, PASSWORD_DEFAULT, ['cost' => 12]); // encriptar la contraseña
            $hashemail = md5(strtolower(trim($email)));
            $avatar = "https://i.pravatar.cc/500?u=$hashemail";
            $sql ="   INSERT INTO `users`(`username`, `pwd`, `email`, `tipo_usuario`, `avatar`) 
            VALUES ('$username','$hashpwd','$email','Cliente','$avatar')";

            // return $sql;

            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            return $res;
        }

        function select_data_user($username){
			$sql = "SELECT * FROM users WHERE username='$username'";
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            return $res;
        }

    } // class DAOauth

?>