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
	$sid = $request->sid;
	$semId = $request->semId;
	$outp = "";
	
	
	$subjectListSql = "SELECT * FROM student_subjects WHERE sem_id = '$semId' AND sid = '$sid' ";
	$subjectListResult = $conn->query($subjectListSql);
		
	
	if ($subjectListResult->num_rows > 0) {
		while($row = $subjectListResult->fetch_array(MYSQLI_ASSOC)) {
			for ($x = 1; $x <= 7; $x++) {
				$subjectSql = "Select * FROM subject_info WHERE sub_code = '$row[ 'subject' .  '$x' ]' ";
				$subjectResult = $conn->query($subjectSql);
				if ($subjectResult->num_rows > 0) {
					$subjectInfo = $subjectResult->fetch_array(MYSQLI_ASSOC);
					if ($x == 7)
						$outp .= $subjectInfo["name"] . '"';
					else
						$outp .= $subjectInfo["name"] . '",';
				}
			} 
		}		
		$outp ='{ "records" : [' . $outp . '] }';
	}
	else {
		$outp ='{ "records" : "0" }';
	}
	
	
	$conn->close();
	echo($outp);
?>
