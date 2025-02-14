<?php
	class connect{
		public static function con(){
			$host = '127.0.0.1';  
    		$user = "root";                     
    		$pass = "root";                             
    		$db = "segunda_jugada";                      
    		$port = 3307;
    		
    		$conexion = mysqli_connect($host, $user, $pass, $db, $port)or die(mysql_error());
			return $conexion;
		}
		public static function close($conexion){
			mysqli_close($conexion);
		}
	}