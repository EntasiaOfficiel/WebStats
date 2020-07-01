<?php
require("config.php");

header('Content-Type: application/json');

set_error_handler(function($errno, $errstr){
	err($errstr);
});

function a($a){
	$a = intval($a);
	if($a==NULL)return NULL;
	return sprintf("%02d", $a);
}

function parseChart($str){
	$list = explode(".", $str);
	if(sizeof($list)==2){
		$a = a($list[0]);
		if($a==NULL)return NULL;
		$b = a($list[1]);
		if($b==NULL)return NULL;
		return $a.".".$b;
	}else return NULL;
}

function err($msg){
    $msg = array("ok"=>0, "Error"=>$msg);
    exit(json_encode($msg));
}
if(!isset($_GET["chart"]))err("chart name not set");

$chart = parseChart($_GET["chart"]);
if($chart==NULL)err("Invalid chart name");

$content = file_get_contents($FOLDER."/".$chart.".txt");
$ret = [];
$ret["ok"] = 1;
$ret["time"] = [];
$ret["ram"] = [];
$ret["cpu"] = [];
foreach(explode("\n", $content) as $line){
	if($line=="")break;
	$s = explode(" ", $line);
	array_push($ret["time"], $s[0]);
	array_push($ret["ram"], $s[1]);
	if(sizeof($s)==3)array_push($ret["cpu"], $s[2]); // temp
}
echo json_encode($ret);

?>


