<?php

    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
    include($path . "/model/connect.php");

    class DAOsearch{

        function search(){
            
        }

        function categorias(){
            $sql="SELECT * FROM categorias";
		
			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);
		
			$categorias = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$categorias[] = $row;
				}
			}
			return $categorias;
        }

        function tipos(){
            $sql="SELECT * FROM tipo";

            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);

            $tipos = array();
            if(mysqli_num_rows($res) > 0){
                while($row = mysqli_fetch_assoc($res)){
                    $tipos[] = $row;
                }
            }
            return $tipos;
        }

        // funciones de autocompletar

        function select_producto_tipo($completar, $tipo_producto){
            $sql = "SELECT DISTINCT p.ciudad
                    FROM productos p
                    LEFT JOIN tipo t
                    ON p.tipo = t.id_tipo
                    WHERE t.id_tipo = '$tipo_producto'
                    AND p.ciudad LIKE '$completar%'";
            
            // return $sql;
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);

            $producto_tipo = array();
            if(mysqli_num_rows($res) > 0){
                while($row = mysqli_fetch_assoc($res)){
                    $producto_tipo[] = $row;
                }
            }
            return $producto_tipo;
        }

        function select_producto_tipo_categoria($completar, $tipo_producto, $categoria_producto){
            $sql = "SELECT DISTINCT p.ciudad
                    FROM productos p
                    LEFT JOIN tipo t ON p.tipo = t.id_tipo
                    LEFT JOIN categorias c ON p.categoria = c.id_categoria
                    WHERE t.id_tipo = '$tipo_producto'
                    AND c.id_categoria = '$categoria_producto'
                    AND p.ciudad LIKE '$completar%'";

            // return $sql;
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);

            $producto_tipo_categoria = array();
            if(mysqli_num_rows($res) > 0){
                while($row = mysqli_fetch_assoc($res)){
                    $producto_tipo_categoria[] = $row;
                }
            }
            return $producto_tipo_categoria;
        }

        function select_producto_categoria($completar, $categoria_producto){
            $sql = "SELECT DISTINCT p.ciudad
                    FROM productos p
                    LEFT JOIN categorias c ON p.categoria = c.id_categoria
                    WHERE c.id_categoria = '$categoria_producto'
                    AND p.ciudad LIKE '$completar%'";
            
            // return $sql;
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);

            $producto_categoria = array();
            if(mysqli_num_rows($res) > 0){
                while($row = mysqli_fetch_assoc($res)){
                    $producto_categoria[] = $row;
                }
            }
            return $producto_categoria;
        }

        function select_producto($completar){
            $sql = "SELECT DISTINCT p.ciudad
                    FROM productos p
                    WHERE p.ciudad LIKE '$completar%'";

            // return $sql;
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);

            $producto = array();
            if(mysqli_num_rows($res) > 0){
                while($row = mysqli_fetch_assoc($res)){
                    $producto[] = $row;
                }
            }
            return $producto;
        }

    } // end class DAOsearch

?>