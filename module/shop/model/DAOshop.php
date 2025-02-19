<?php 

    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
	include($path . "/model/connect.php");

    class DAOshop{

        function get_all(){
            $sql= "SELECT * FROM productos ORDER BY id_producto DESC";

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

		function select_producto($id_producto){
			$sql= "SELECT * FROM productos WHERE id_producto = $id_producto";

			// die('<script>console.log('.json_encode( $sql ) .');</script>');

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql)->fetch_object();
			connect::close($conexion);

			return $res;
		}

    }