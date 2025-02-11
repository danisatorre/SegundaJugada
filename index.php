<?php
    if ((isset($_GET['module'])) && ($_GET['module']==="ctrl_home") ){
		include("view/inc/top_page.html");
	}else{
		include("view/inc/top_page.html");
	}
	//session_start();
?>
<div id="wrapper">		
    <div id="header">    	
    	<?php
    	    include("view/inc/header.html");
    	?>        
    </div>  
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