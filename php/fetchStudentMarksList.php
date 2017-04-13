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
	$subject_code = $request->subCode;
	$sem_id = $request->semCode;
	$batch_id = $request->batchId;
/*
	$subject_code = 'CSN301';
	$sem_id = '1617-2';
	$batch_id = '2014-18_3';
*/
    $outp = "";



	$marksListSql = "SELECT * FROM student_marks WHERE sem_id = '$sem_id' AND subject_code = '$subject_code' ";
	$marksListResult = $conn->query($marksListSql);

	if ($marksListResult->num_rows > 0) {
		while($row = $marksListResult->fetch_array(MYSQLI_ASSOC)){
		    $sid = $row['sid'];
            $studentInfoSql = "SELECT * FROM student_info WHERE sid = '$sid'";
            $studentInfoResult = $conn->query($studentInfoSql);
            if($studentInfoResult->num_rows > 0){
                $studentInfoRow = $studentInfoResult->fetch_array(MYSQLI_ASSOC);
                if($studentInfoRow['batch_id'] == $batch_id){
                    if ($outp != "") {$outp .= ",";}
                    $outp .= '{"name":"' . $studentInfoRow["name"] . '",';
                    $outp .= '"studentMarks": ' . (string)json_encode($row) . ' }';
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
