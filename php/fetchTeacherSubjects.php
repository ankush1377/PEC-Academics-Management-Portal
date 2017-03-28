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
	$tid = $request->tid;
	$semId = $request->semId;
	$outp = "";


	$subjectListSql = "SELECT * FROM teacher_subjects WHERE sem_id = '$semId' AND tid = '$tid' ";
	$subjectListResult = $conn->query($subjectListSql);


	if ($subjectListResult->num_rows > 0) {
		while($row = $subjectListResult->fetch_array(MYSQLI_ASSOC)) {

			$code = $row["subject1"];
			$subjectSql = "Select * FROM subject_info WHERE subject_code = '$code' ";
			$subjectResult = $conn->query($subjectSql);
			if ($subjectResult->num_rows > 0) {
				$subjectInfo = $subjectResult->fetch_array(MYSQLI_ASSOC);
				if ($outp != "") {$outp .= ",";}
				$outp .= '{"subCode":"' . $subjectInfo["subject_code"] . '",';
				$outp .= ' "subName":"' . $subjectInfo["name"] . '"}';
			}
			$code = $row["subject2"];
			$subjectSql = "Select * FROM subject_info WHERE subject_code = '$code' ";
			$subjectResult = $conn->query($subjectSql);
			if ($subjectResult->num_rows > 0) {
				$subjectInfo = $subjectResult->fetch_array(MYSQLI_ASSOC);
				if ($outp != "") {$outp .= ",";}
				$outp .= '{"subCode":"' . $subjectInfo["subject_code"] . '",';
				$outp .= ' "subName":"' . $subjectInfo["name"] . '"}';
			}
			$code = $row["subject3"];
			$subjectSql = "Select * FROM subject_info WHERE subject_code = '$code' ";
			$subjectResult = $conn->query($subjectSql);
			if ($subjectResult->num_rows > 0) {
				$subjectInfo = $subjectResult->fetch_array(MYSQLI_ASSOC);
				if ($outp != "") {$outp .= ",";}
				$outp .= '{"subCode":"' . $subjectInfo["subject_code"] . '",';
				$outp .= ' "subName":"' . $subjectInfo["name"] . '"}';
			}
			$code = $row["subject4"];
			$subjectSql = "Select * FROM subject_info WHERE subject_code = '$code' ";
			$subjectResult = $conn->query($subjectSql);
			if ($subjectResult->num_rows > 0) {
				$subjectInfo = $subjectResult->fetch_array(MYSQLI_ASSOC);
				if ($outp != "") {$outp .= ",";}
				$outp .= '{"subCode":"' . $subjectInfo["subject_code"] . '",';
				$outp .= ' "subName":"' . $subjectInfo["name"] . '"}';
			}
			$code = $row["subject5"];
			$subjectSql = "Select * FROM subject_info WHERE subject_code = '$code' ";
			$subjectResult = $conn->query($subjectSql);
			if ($subjectResult->num_rows > 0) {
				$subjectInfo = $subjectResult->fetch_array(MYSQLI_ASSOC);
				if ($outp != "") {$outp .= ",";}
				$outp .= '{"subCode":"' . $subjectInfo["subject_code"] . '",';
				$outp .= ' "subName":"' . $subjectInfo["name"] . '"}';
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
