<html>
	<head>
		<meta charset="utf-8" />
		<title>Rice Consumption</title>
		<script src='ressources/chart.min.js'></script>
		<script src='ressources/script.js'></script>
		<link rel="stylesheet" type="text/css" href="ressources/global.css">
	</head>
	<body>
		<div id="menu">
			<ul>
				<?php
				foreach(scandir("data") as $v){
					if($v == "." || $v == "..")continue;
					echo "<li> <a> ".$v." </a> </li>";
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