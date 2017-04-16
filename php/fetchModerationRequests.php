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
   	$sem_id = $request->semId;
//	$sem_id = '1617-2';

	$outp = "";

	$moderationRequestListSql = "SELECT * FROM subject_approvals WHERE sem_id = '$sem_id' ";
	$moderationRequestListResult = $conn->query($moderationRequestListSql);


	if ($moderationRequestListResult->num_rows > 0) {
		while($row = $moderationRequestListResult->fetch_array(MYSQLI_ASSOC)) {

		    $subject_code = $row["subject_code"];
        	$subjectSql = "Select * FROM subject_info WHERE subject_code = '$subject_code' ";
        	$subjectResult = $conn->query($subjectSql);
        	$subjectInfo = $subjectResult->fetch_array(MYSQLI_ASSOC);

        	$tid = $row["tid"];
            $teacherSql = "Select * FROM teacher_info WHERE tid = '$tid' ";
            $teacherResult = $conn->query($teacherSql);
            $teacherInfo = $teacherResult->fetch_array(MYSQLI_ASSOC);


		    if ($outp != "") {$outp .= ",";}
		    $outp .= '{"subName":"' . $subjectInfo["name"] . '",' ;
		    $outp .= '"teacherName":"' . $teacherInfo["name"] . '",' ;
            $outp .= '"moderationInfo":' . (string)json_encode($row) . '}' ;
	    }
		$outp ='{ "records" : [' . $outp . '] }';
	}
	else {
		$outp ='{ "records" : "0" }';
	}


	$conn->close();
	echo($outp);
?>
