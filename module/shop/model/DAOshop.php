<?php 

    $path = $_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/';
	include($path . "/model/connect.php");

    function get_all(){
        $sql = " SELECT * FROM productos ";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        $retrArray = array();
        if (mysqli_num_rows($res) > 0){
            while ($row = mysqli_fetch_assoc($res)){
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }

?>