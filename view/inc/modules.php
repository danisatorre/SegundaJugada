<?php
	if(isset($_GET['module'])){
		switch($_GET['module']){
			case "home";
				include("module/home/view/home.html");
				break;
			case "ctrl_home";
				include("module/home/ctrl/".$_GET['module'].".php");
				break;
			case "ctrl_exceptions";
				// $data = 'hola crtl MODULE EXCEPTIONS';
            	// die('<script>console.log('.json_encode( $data ) .');</script>');
				include("module/exceptions/ctrl/".$_GET['module']."php");
				break;
		}
	}else{
		include("module/home/view/home.html");
	}
	
?>