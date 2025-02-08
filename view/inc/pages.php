<?php
	if(isset($_GET['page'])){
		switch($_GET['page']){
			case "home";
				include("module/home/view/home.html");
				break;
			case "ctrl_home";
				include("module/home/ctrl/".$_GET['page'].".php");
				break;
			case "ctrl_exceptions";
				include("module/exceptions/views/pages/".$_GET['page'].".php");
				break;
		}
	}else{
		include("module/home/view/home.html");
	}
	
?>