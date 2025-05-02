<?php
	class connect {
		private static function getConfig() {
			$credenciales_db = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/model/db.ini';
			if (!file_exists($credenciales_db)) {
				die("Error: Archivo de configuración no encontrado.");
			}
			return parse_ini_file($credenciales_db, true)['db'];
		}

		public static function con() {
			$config = self::getConfig();

			$host = $config['DB_HOST'];
			$user = $config['DB_USER'];
			$pwd = $config['DB_PWD'];
			$db = $config['DB_DB'];
			$port = $config['DB_PORT'];

			$conexion = mysqli_connect($host, $user, $pwd, $db, $port);

			if (!$conexion) {
				die("Error de conexión a la base de datos: " . mysqli_connect_error());
			}

			return $conexion;
		}

		public static function close($conexion) {
			mysqli_close($conexion);
		}
	}