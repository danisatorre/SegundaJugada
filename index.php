<?php
	session_start();
	
    if ((isset($_GET['module'])) && ($_GET['module']==="ctrl_home") ){
		include("view/inc/top_page_home.html");
	}else if((isset($_GET['module'])) && ($_GET['module']==="ctrl_shop")){
		include("view/inc/top_page_shop.html");
	}else if((isset($_GET['module'])) && ($_GET['module']==="ctrl_exceptions")){
		include("view/inc/top_page_home.html");
	}else if((isset($_GET['module'])) && ($_GET['module']==="ctrl_auth")){
		include("view/inc/top_page_auth.html");
	}
	else{
		include("view/inc/top_page_home.html");
	}
?>
<div id="wrapper">		
	<?php
    if (!isset($_GET['module']) || $_GET['module'] !== "ctrl_auth") { 
    ?>
        <div id="header">    	
            <?php include("view/inc/header.html"); ?>    
        </div>
    <?php 
    } // no añadir el buscador al estar en la página de login o de register
	?>  
    <div id="menu">
		<?php
		    include("view/inc/menu.html");
		?>
    </div>	
    <div id="">
    	<?php 
		    include("view/inc/modules.php"); 
		?>        
        <br style="clear:both;" />
    </div>
    <div id="footer">   	   
	    <?php
	        include("view/inc/footer.html");
	    ?>        
    </div>
</div>
<?php
    include("view/inc/bottom_page.html");
?>