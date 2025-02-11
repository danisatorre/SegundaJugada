<?php
	$path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
	include($path . "/model/connect.php");
    
	class DAOHome {
		function select_marca() {
			$sql= "SELECT * FROM `marcas` ORDER BY nom_marca ASC LIMIT 30;";

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

		function select_categoria() {
			// $sql= "SELECT * FROM categorias";

			// // die('<script>console.log('.json_encode( $sql ) .');</script>');

			// $conexion = connect::con();
			// $res = mysqli_query($conexion, $sql);
			// // die('<script>console.log('.json_encode( $res ) .');</script>');
			// connect::close($conexion);

			// $retrArray = array();
			// // die('<script>console.log('.json_encode( $retrArray ) .');</script>');
			// if (mysqli_num_rows($res) > 0) {
			// 	// die('<script>console.log('.json_encode( mysqli_num_rows($res) ) .');</script>');
			// 	while ($row = mysqli_fetch_assoc($res)) {
			// 		// die('<script>console.log('.json_encode( mysqli_num_rows($res) ) .');</script>');
			// 		// die('<script>console.log('.json_encode( $res ) .');</script>');
			// 		// die('<script>console.log('.json_encode( $row ) .');</script>');
			// 		// if(mysqli_num_rows($res) > 3){
			// 		// 	// die('<script>console.log('.json_encode( mysqli_num_rows($res) ) .');</script>');
			// 		// 	// die('<script>console.log('.json_encode( $row ) .');</script>');
			// 		// }
			// 		$retrArray[] = $row;
			// 		// die('<script>console.log('.json_encode( $retrArray ) .');</script>');
			// 		// die('<script>console.log('.json_encode( $row ) .');</script>');
			// 		// return $retrArray;
			// 		return $row;
			// 	}
			// }
			// // die('<script>console.log('.json_encode( $retrArray ) .');</script>');
			// // die('<script>console.log('.json_encode( $row ) .');</script>');
			// // return $retrArray;

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
	
		
	}