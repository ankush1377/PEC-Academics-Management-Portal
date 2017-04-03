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
	$dep_code = $request->depCode;
	$outp = "";


	$subjectListSql = "SELECT * FROM subject_info";
	$subjectListResult = $conn->query($subjectListSql);


	if ($subjectListResult->num_rows > 0) {
		while( $row = $subjectListResult->fetch_array(MYSQLI_ASSOC)){
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
