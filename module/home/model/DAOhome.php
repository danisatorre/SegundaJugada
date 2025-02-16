<?php
	$path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
	include($path . "/model/connect.php");
    
	class DAOHome {
		function select_marca() {
			$sql= "SELECT * FROM marcas ORDER BY nom_marca ASC LIMIT 30;";

			// die('<script>console.log('.json_encode( $sql ) .');</script>');

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
					// die('<script>console.log('.json_encode( $retrArray ) .');</script>');
				}
			}
			return $retrArray;
		}

		function select_categoria() {
			$sql= "SELECT * FROM categorias ORDER BY id_categoria ASC";

			// die('<script>console.log('.json_encode( $sql ) .');</script>');

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

		function select_tipo() {
			$sql= "SELECT * FROM tipo ORDER BY id_tipo DESC";

			// die('<script>console.log('.json_encode( $sql ) .');</script>');

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

		function select_productos(){
			$sql= "SELECT * FROM productos ORDER BY id_producto DESC LIMIT 6";

			// die('<script>console.log('.json_encode( $sql ) .');</script>');

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
			
		}

		function select_accesorios(){
			$sql= "SELECT * FROM productos WHERE tipo = 8 ORDER BY nom_prod LIMIT 10";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0){
				while($row = mysqli_fetch_assoc($res)){
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}
	
		
	}