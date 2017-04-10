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
/*
	$semId = $request->semId;
    $subCode = $request->subjectCode;
*/

    $semId = '1617-2';
    $subCode = 'CSN301';
	$outp = "";


	$subjectMarksSql = "SELECT * FROM subject_marks WHERE sem_id = '$semId' AND subject_code = '$subCode' ";
	$subjectMarksResult = $conn->query($subjectMarksSql);


	if ($subjectMarksResult->num_rows > 0) {
		$row = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
	    $outp .= (string)json_encode($row);
		$outp ='{ "records" : ' . $outp . ' }';
	}
	else {
		$outp ='{ "records" : "0" }';
	}


	$conn->close();
	echo($outp);
?>
