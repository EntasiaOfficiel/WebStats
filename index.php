<html>
	<head>
		<meta charset="utf-8" />
		<title>Visualisation des performances</title>
		<script src='ressources/script.js'></script>
		<script src='ressources/chart.min.js'></script>
		<script src='ressources/chart.js'></script>
		<link rel="stylesheet" type="text/css" href="ressources/global.css">
	</head>
	<body>
		<div id="menu">
			<ul>
				<?php
					require("config.php");

					if(isset($_GET["chart"]))$selected = $_GET["chart"];
					else $selected = "";
					foreach(scandir($FOLDER) as $v){
						if($v == "." || $v == "..")continue;
						echo "<li> <a>".substr($v, 0, 5)."</a> </li>";
					}
				?>
			</ul>
		</div>
		<p id="separator"></p>
		<div id="content">
			<canvas id="chart" width="600" height="400"></canvas>
		</div>
	</body>
</html>