<?php
header("Access-Control-Allow-Origin: *");
require 'flight/Flight.php';

// DB Connect
$db_host = "localhost";  // Change as required
$db_user = "iamcoder2";  // Change as required
$db_pass = "mato1228";  // Change as required
$db_name = "iamcoder2";	// Change as required

$connect = mysql_connect("$db_host","$db_user","$db_pass") or die("MYSQL 연결에 실패하였습니다.");
$db_con = mysql_select_db("$db_name",$connect);
if (!$db_con) {
	one_back ("데이타베이스가 존재하지 않거나 연결 할 수 없습니다.");
}

// Configraiton header
header('Content-Type: application/json');


// 카테고리 조회
Flight::route('GET /categories', 'getCategories');

// 목록 조회
Flight::route('GET /list/@id', 'getList');

Flight::start();




/***
* 카테고리 조회
***/
function getCategories(){
	$countAll = 0;
    $response = array('data'=>array(),'status'=>0, 'countAll'=>$countAll);
	$result = mysql_query("SELECT cate.*, COUNT(list.id) cnt
							FROM ani_categories cate
							LEFT JOIN ani_list list
							ON cate.id = list.cId
							GROUP BY cate.id
							ORDER BY regDate ASC");
	while($list=mysql_fetch_array($result)){
		$countAll = $countAll + $list['cnt'];
		array_push($response['data'], array(		
			"id"=> (int) $list['id'],
			"name"=> $list['name'],
			"type"=> $list['type'],
			"count"=> $list['cnt'],
			"regDate"=> $list['regDate']
		));
	}
	$response['countAll'] = $countAll;
	echo json_encode($response);
}

/***
* 목록 조회
***/
function getList($cate){
	$response = array('data'=>array(),'status'=>0);
	$queryWhere = '';
	if($cate != 'ALL') $queryWhere = "WHERE cId = '$cate'";
	$result = mysql_query("SELECT *
							FROM ani_list
							$queryWhere
							ORDER BY regDate DESC");
	
	while($list=mysql_fetch_array($result)){

		array_push($response['data'], array(		
			"id"=> (int) $list['id'],
			"cId"=> (int) $list['cId'],
			"type"=> $list['type'],
			"title"=> $list['title'],
			"image"=> $list['image'],
			"compatibility"=> $list['compatibility'],
			"description"=> $list['description'],
			"linkId"=> $list['linkId'],
			"regDate"=> $list['regDate']
		));
		
	}
	echo json_encode($response);
}



?>
