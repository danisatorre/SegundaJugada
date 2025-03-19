<?php 

    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
	include($path . "/model/connect.php");

    class DAOshop{

        function get_all(){
            $sql= "SELECT * FROM productos ORDER BY nom_prod DESC";

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
			// $sql= "SELECT * FROM productos WHERE id_producto = $id_producto";
			$sql="SELECT *
			FROM productos p
			LEFT JOIN marcas m ON p.marca = m.id_marca
			LEFT JOIN teams t ON p.equipo = t.id_team
			LEFT JOIN tipo ti ON p.tipo = ti.id_tipo
			WHERE p.id_producto = $id_producto";

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

		function select_pimg($id_producto){
			$sql="SELECT pi.pimage_producto, pi.pimage_route
				FROM producto_img pi
				WHERE pi.pimage_producto = '$id_producto'";
			
			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$arrayimg = array();
			if(mysqli_num_rows($res) > 0){
				foreach ($res as $row){
					array_push($arrayimg, $row);
				}
			}
			return $arrayimg;
		}

		function filtros($filtro){

			$sql = "SELECT *
			FROM productos p
			LEFT JOIN marcas m ON p.marca = m.id_marca
			LEFT JOIN teams t ON p.equipo = t.id_team
			LEFT JOIN tipo ti ON p.tipo = ti.id_tipo
			LEFT JOIN categorias c ON p.categoria = c.id_categoria";
			
			$primeraCondicion = true;
			$orderby = "";

				for ($i=0; $i < count($filtro); $i++){
					if ($filtro[$i][0] == 'equipo' && is_array($filtro[$i][1])) {
						if ($primeraCondicion) {
							$sql .= " WHERE (";
							$primeraCondicion = false;
						} else {
							$sql .= " AND (";
						}
						for ($j = 0; $j < count($filtro[$i][1]); $j++) {
							if ($j > 0) {
								$sql .= " OR ";
							}
							$sql .= "p.equipo = '" . $filtro[$i][1][$j] . "'";
						}
						$sql .= ")";
					}else if($filtro[$i][0] == 'precio'){
						if($filtro[$i][1] == "menmay"){
							$orderby = " ORDER BY p.precio ASC";
						}else if($filtro[$i][1] == "maymen"){
							$orderby = " ORDER BY p.precio DESC";
						}
					}else{
						if($primeraCondicion){
							$sql .= " WHERE p." . $filtro[$i][0] . " = '" . $filtro[$i][1] . "'";
                			$primeraCondicion = false;
						}else{
							$sql .= " AND p." . $filtro[$i][0] . " = '" . $filtro[$i][1] . "'";
						}
					} // end if-else
				} // end for

			$sql .= $orderby; // añadir el 'ORDER BY' siempre al final de la consulta

			// $sql = $filtro[0][1];
			// $sql = $filtro;

			// return $sql;
			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);
	
			$retrArray = array();
			if ($res -> num_rows > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

		function checkbox_equipos(){
			$sql="SELECT * FROM teams";
		
			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);
		
			$equipos = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$equipos[] = $row;
				}
			}
			return $equipos;
		}

		function filtro_home($filtro_home){
			$sql = "SELECT *
			FROM productos p
			LEFT JOIN marcas m ON p.marca = m.id_marca
			LEFT JOIN teams t ON p.equipo = t.id_team
			LEFT JOIN tipo ti ON p.tipo = ti.id_tipo
			LEFT JOIN categorias c ON p.categoria = c.id_categoria"
			AND $filtro_home;

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);
	
			$retrArray = array();
			if ($res -> num_rows > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

    }