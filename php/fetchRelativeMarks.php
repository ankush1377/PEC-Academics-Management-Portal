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
	$semId = $request->semId;
	$subjectCode = $request->subjectCode;
	$outp = "";
	
	
	$marksListSql = "SELECT * FROM student_marks WHERE sem_id = '$semId' AND sub_code = '$subjectCode' ";
	$marksListResult = $conn->query($marksListSql);
		
	
	if ($marksListResult->num_rows > 0) {
		while($row = $marksListResult->fetch_array(MYSQLI_ASSOC)) {
			
	/* 		for ($x = 1; $x <= 7; $x++) {
				$code = $row[ "subject" .  " '$x' " ];
				$subjectSql = "Select * FROM subject_info WHERE sub_code = '$code' ";
				$subjectResult = $conn->query($subjectSql);
				if ($subjectResult->num_rows > 0) {
					$subjectInfo = $subjectResult->fetch_array(MYSQLI_ASSOC);
					
					if ($outp != "") {$outp .= ",";}
					$outp .= '{"subCode":"' . $subjectInfo["sub_code"] . '",';
					$outp .= ' "subName":"' . $subjectInfo["name"] . '"}';
				}
			}  */
		}		
		$outp ='{ "records" : [' . $outp . '] }';
	}
	else {
		$outp ='{ "records" : "0" }';
	}
	
	
	$conn->close();
	echo($outp);
?>