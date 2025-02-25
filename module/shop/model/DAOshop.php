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
			//'<option value="Electrico">Electrico</option>'
			//$consulta.= " WHERE c." . $filtro[$i][0] . "=' . $filtro[$i][1].'";
	
			//'<option value="1">Electrico</option>'
			//$consulta.= " WHERE c." . $filtro[$i][0] . "=" . $filtro[$i][1];
	
			$consulta = "SELECT c.*, i.img, ca.cat_name, t.type_name, b.brand_name
			FROM car c INNER JOIN car_img i INNER JOIN categoria ca INNER JOIN type t INNER JOIN brand b
			ON c.id = i.car AND  i.img LIKE ('%1%') AND c.categoria = ca.id_categoria AND c.combustible = t.id_type AND c.marca = b.id_brand";
			
				for ($i=0; $i < count($filtro); $i++){
					if ($i==0){
						$consulta.= " WHERE c." . $filtro[$i][0] . "=" . $filtro[$i][1];
					}else {
						$consulta.= " AND c." . $filtro[$i][0] . "=" . $filtro[$i][1];
					}        
				}   
	
			$conexion = connect::con();
			$res = mysqli_query($conexion, $consulta);
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