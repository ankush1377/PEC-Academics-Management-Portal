<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");


	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "pamp";

	// Create connection
   	$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

	$postdata = file_get_contents("php://input");
   	$request = json_decode($postdata);
/*	$semId = $request->semId;
	$subCode = $request->subCode;*/
	$semId = '1617-2';
	$subCode = 'a';
	$outp = "";


	$subjectWeightageSql = "SELECT * FROM student_weightage WHERE sem_id = '$semId' AND subject_code = '$subCode' ";
	$subjectWeightageResult = $conn->query($subjectWeightageSql);


	if ($subjectWeightageResult->num_rows > 0) {
		while($row = $subjectWeightageResult->fetch_array(MYSQLI_ASSOC)) {
		    if ($outp != "") {$outp .= ",";}
		    $outp .= (string)json_encode($row);
	    }
		$outp ='{ "records" : [' . $outp . '] }';
	}
	else {
		$outp ='{ "records" : "0" }';
	}


	$conn->close();
	echo($outp);
?>
