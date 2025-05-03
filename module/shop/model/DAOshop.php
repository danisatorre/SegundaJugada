<?php 

    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
	include($path . "/model/connect.php");

    class DAOshop{

        function get_all($offset, $limit){
            $sql= "SELECT * FROM productos ORDER BY nom_prod DESC LIMIT $offset, $limit";

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
			LEFT JOIN categorias c ON p.categoria = c.id_categoria
			LEFT JOIN users u ON p.id_vendedor = u.id_user
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

		function filtros($filtro, $offset, $limit){

			// return $filtro;

			$sql = "SELECT *
			FROM productos p
			LEFT JOIN marcas m ON p.marca = m.id_marca
			LEFT JOIN teams t ON p.equipo = t.id_team
			LEFT JOIN tipo ti ON p.tipo = ti.id_tipo
			LEFT JOIN categorias c ON p.categoria = c.id_categoria";
			
			$primeraCondicion = true;
			$primeraCondicionOredrBy = true;
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
					}else if($filtro[$i][0] == 'visitas'){
						if($filtro[$i][1] == "menmay"){
							$orderby = " ORDER BY p.visitas ASC";
						}else if($filtro[$i][1] == "maymen"){
							$orderby = " ORDER BY p.visitas DESC";
						}
					}else {
						if($primeraCondicion){
							$sql .= " WHERE p." . $filtro[$i][0] . " = '" . $filtro[$i][1] . "'";
                			$primeraCondicion = false;
						}else{
							$sql .= " AND p." . $filtro[$i][0] . " = '" . $filtro[$i][1] . "'";
						}
					} // end if-else
				} // end for

			$sql .= $orderby; // añadir el 'ORDER BY' siempre al final de la consulta
			$sql .= " LIMIT $offset, $limit"; // añadir la paginacion
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
			LEFT JOIN categorias c ON p.categoria = c.id_categoria
			WHERE $filtro_home";

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

		// FILTROS BUSCADOR

		function select_categoria_buscador($categoria, $offset, $limit){
			$sql = "SELECT *
			FROM productos p
			LEFT JOIN marcas m ON p.marca = m.id_marca
			LEFT JOIN teams t ON p.equipo = t.id_team
			LEFT JOIN tipo ti ON p.tipo = ti.id_tipo
			LEFT JOIN categorias c ON p.categoria = c.id_categoria
			WHERE c.id_categoria = '$categoria'
			LIMIT $offset, $limit";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$categoria_buscador = array();
			if ($res -> num_rows > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$categoria_buscador[] = $row;
				}
			}
			return $categoria_buscador;
		}

		function select_tipo_buscador($tipo, $offset, $limit){
			$sql = "SELECT *
			FROM productos p
			LEFT JOIN marcas m ON p.marca = m.id_marca
			LEFT JOIN teams t ON p.equipo = t.id_team
			LEFT JOIN tipo ti ON p.tipo = ti.id_tipo
			LEFT JOIN categorias c ON p.categoria = c.id_categoria
			WHERE ti.id_tipo = '$tipo'
			LIMIT $offset, $limit";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$tipo_buscador = array();
			if ($res -> num_rows > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$tipo_buscador[] = $row;
				}
			}
			return $tipo_buscador;
		}

		function select_ciudad_buscador($ciudad, $offset, $limit){
			$sql = "SELECT *
			FROM productos p
			LEFT JOIN marcas m ON p.marca = m.id_marca
			LEFT JOIN teams t ON p.equipo = t.id_team
			LEFT JOIN tipo ti ON p.tipo = ti.id_tipo
			LEFT JOIN categorias c ON p.categoria = c.id_categoria
			WHERE p.ciudad = '$ciudad'
			LIMIT $offset, $limit";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$ciudad_buscador = array();
			if ($res -> num_rows > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$ciudad_buscador[] = $row;
				}
			}
			return $ciudad_buscador;
		}

		function select_categoria_tipo_buscador($categoria, $tipo, $offset, $limit){
			$sql = "SELECT *
			FROM productos p
			LEFT JOIN marcas m ON p.marca = m.id_marca
			LEFT JOIN teams t ON p.equipo = t.id_team
			LEFT JOIN tipo ti ON p.tipo = ti.id_tipo
			LEFT JOIN categorias c ON p.categoria = c.id_categoria
			WHERE c.id_categoria = '$categoria'
			AND ti.id_tipo = '$tipo'
			LIMIT $offset, $limit";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$categoria_tipo_buscador = array();
			if ($res -> num_rows > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$categoria_tipo_buscador[] = $row;
				}
			}
			return $categoria_tipo_buscador;
		}

		function select_tipo_ciudad_buscador($tipo, $ciudad, $offset, $limit){
			$sql = "SELECT *
			FROM productos p
			LEFT JOIN marcas m ON p.marca = m.id_marca
			LEFT JOIN teams t ON p.equipo = t.id_team
			LEFT JOIN tipo ti ON p.tipo = ti.id_tipo
			LEFT JOIN categorias c ON p.categoria = c.id_categoria
			WHERE p.ciudad = '$ciudad'
			AND ti.id_tipo = '$tipo'
			LIMIT $offset, $limit";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$tipo_ciudad_buscador = array();
			if ($res -> num_rows > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$tipo_ciudad_buscador[] = $row;
				}
			}
			return $tipo_ciudad_buscador;
		}

		function select_categoria_ciudad_buscador($categoria, $ciudad, $offset, $limit){
			$sql = "SELECT *
			FROM productos p
			LEFT JOIN marcas m ON p.marca = m.id_marca
			LEFT JOIN teams t ON p.equipo = t.id_team
			LEFT JOIN tipo ti ON p.tipo = ti.id_tipo
			LEFT JOIN categorias c ON p.categoria = c.id_categoria
			WHERE p.ciudad = '$ciudad'
			AND c.id_categoria = '$categoria'
			LIMIT $offset, $limit";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$categoria_ciudad_buscador = array();
			if ($res -> num_rows > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$categoria_ciudad_buscador[] = $row;
				}
			}
			return $categoria_ciudad_buscador;
		}

		function select_all_buscador($categoria, $tipo, $ciudad, $offset, $limit){
			$sql = "SELECT *
			FROM productos p
			LEFT JOIN marcas m ON p.marca = m.id_marca
			LEFT JOIN teams t ON p.equipo = t.id_team
			LEFT JOIN tipo ti ON p.tipo = ti.id_tipo
			LEFT JOIN categorias c ON p.categoria = c.id_categoria
			WHERE p.ciudad = '$ciudad'
			AND c.id_categoria = '$categoria'
			AND ti.id_tipo = '$tipo'
			LIMIT $offset, $limit";

			// return $sql;

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$categoria_tipo_ciudad_buscador = array();
			if ($res -> num_rows > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$categoria_tipo_ciudad_buscador[] = $row;
				}
			}
			return $categoria_tipo_ciudad_buscador;
		}

		// PAGINACION

		function count_productos_filtros($filtro){
			$sql = "SELECT COUNT(*) contador
			FROM productos p
			LEFT JOIN marcas m ON p.marca = m.id_marca
			LEFT JOIN teams t ON p.equipo = t.id_team
			LEFT JOIN tipo ti ON p.tipo = ti.id_tipo
			LEFT JOIN categorias c ON p.categoria = c.id_categoria";
			
			$primeraCondicion = true;
			$primeraCondicionOredrBy = true;
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
					}else if($filtro[$i][0] == 'visitas'){
						if($filtro[$i][1] == "menmay"){
							$orderby = " ORDER BY p.visitas ASC";
						}else if($filtro[$i][1] == "maymen"){
							$orderby = " ORDER BY p.visitas DESC";
						}
					}else {
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

		function count_buscador($categoria, $tipo, $ciudad){
			$sql = "SELECT COUNT(*) contador
			FROM productos p
			LEFT JOIN marcas m ON p.marca = m.id_marca
			LEFT JOIN teams t ON p.equipo = t.id_team
			LEFT JOIN tipo ti ON p.tipo = ti.id_tipo
			LEFT JOIN categorias c ON p.categoria = c.id_categoria";

			$primeraCondicion = true;

			if($categoria != 0){
				if($primeraCondicion){
					$sql .= " WHERE c.id_categoria = '$categoria'";
					$primeraCondicion = false;
				}else{
					$sql .= " AND c.id_categoria = '$categoria'";
				}
			}

			if($tipo != 0){
				if($primeraCondicion){
					$sql .= " WHERE ti.id_tipo = '$tipo'";
					$primeraCondicion = false;
				}else{
					$sql .= " AND ti.id_tipo = '$tipo'";
				}
			}

			if($ciudad != 0){
				if($primeraCondicion){
					$sql .= " WHERE p.ciudad = '$ciudad'";
					$primeraCondicion = false;
				}else{
					$sql .= " AND p.ciudad = '$ciudad'";
				}
			}

			// return $sql;

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$count_buscador = array();
			if ($res -> num_rows > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$count_buscador[] = $row;
				}
			}
			return $count_buscador;
		}

		function count_all(){
            $sql= "SELECT COUNT(*) contador FROM productos ORDER BY nom_prod DESC";

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

		// --- DETAILS ---

		// PRODUCTOS RELACIONADOS

		function count_productos_relacionados($tipo, $id_producto){
			$sql = "SELECT COUNT(*) contador
			FROM productos p 
			WHERE p.tipo = '$tipo'
			AND p.id_producto <> $id_producto";

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

		function select_productos_relacionados($tipo, $loaded, $items, $id_producto){
			$sql = "SELECT * 
				FROM productos p
				LEFT JOIN marcas m ON p.marca = m.id_marca
				LEFT JOIN teams t ON p.equipo = t.id_team
				LEFT JOIN tipo ti ON p.tipo = ti.id_tipo
				LEFT JOIN categorias c ON p.categoria = c.id_categoria
				WHERE p.tipo = '$tipo'
				AND p.id_producto <> $id_producto
				LIMIT $loaded, $items";

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

		// UPDATE VALORES

		function update_visitas($id_producto){
			$sql = "UPDATE productos p
			SET p.visitas = p.visitas + 1
			WHERE id_producto = $id_producto";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);
		}

		function update_rating($id_producto, $rating){
			$sql = "UPDATE productos p
			SET p.rating = $rating
			WHERE id_producto = $id_producto";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);
		}

		function update_visitas_categoria($id_categoria){
			$sql = "UPDATE categorias c
			SET c.visitas_cat = c.visitas_cat + 1
			WHERE id_categoria = $id_categoria";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);
		}

		function update_visitas_tipo($id_tipo){
			$sql = "UPDATE tipo t
			SET t.visitas_tipo = t.visitas_tipo + 1
			WHERE id_tipo = $id_tipo";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);
		}

		// LIKES

		function select_load_likes($username){
			$sql = "SELECT l.id_producto_like
			FROM likes l
			WHERE l.id_user_like = (SELECT u.id_user
							FROM users u
							WHERE u.username = '$username')";
			
			// return $sql;

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			return $res;

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

		function select_likes($id_producto, $username){
			$sql = "SELECT l.id_producto_like
			FROM likes l
			WHERE l.id_user_like = (SELECT u.id_user
							FROM users u
							WHERE u.username = '$username')
			AND l.id_producto_like = '$id_producto'";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$likes = array();
			if ($res && mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$likes[] = $row;
				}
			}

			return $res;
		}

		function like($id_producto, $username){
			$sql = "INSERT INTO likes (id_user_like, id_producto_like) VALUES ((SELECT u.id_user FROM users u WHERE u.username = '$username'), '$id_producto');";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);
			return $res;
		}

		function dislike($id_producto, $username){
			$sql = "DELETE l FROM likes l
			JOIN users u ON l.id_user_like = u.id_user
			WHERE l.id_producto_like = '$id_producto'
			AND u.username = '$username';";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);
			return $res;
		}

		function sumar_like($id_producto){
			$sql = "UPDATE productos p
			SET p.likes = p.likes +1
			WHERE p.id_producto = $id_producto";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);
		}

		function restar_like($id_producto){
			$sql = "UPDATE productos p
			SET p.likes = p.likes -1
			WHERE p.id_producto = $id_producto";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);
		}

    }