<?php

header('Content-Type: application/json');

function parseChart($str){
	$list = explode(".", $str);
	if(sizeof($list)==2){
		$a = intval($list[0]);
		if($a==NULL)return NULL;
		$b = intval($list[1]);
		if($b==NULL)return NULL;
		return $a.".".$b;
	}else return NULL;
}

function err($msg){
    $msg = array("Error"=>$msg);
    exit(json_encode($msg));
}
if(!isset($_GET["chart"]))err("chart name not set");
if(!isset($_GET["type"]))err("chart type not set");

$chart = parseChart($_GET["chart"]);
if($a==NULL)err("Invalid chart name");
$type = strtolower($_GET["type"]);
if($type=="ram"){
    
}else if($type=="cpu"){

}else if($type=="ramcpy"){

}else err("Invalid chart type");
echo "{ok:1}";

?>


