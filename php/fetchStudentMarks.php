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
    $semCode = $request->semCode;
	$outp = "";


	$subjectListSql = "SELECT * FROM student_subjects WHERE sem_id = '$semCode' AND sid = '$sid' ";
	$subjectListResult = $conn->query($subjectListSql);


	if ($subjectListResult->num_rows > 0) {
		$row = $subjectListResult->fetch_array(MYSQLI_ASSOC);


		$subject = $row["subject1"];
		$subjectMarksSql = "SELECT * FROM student_marks WHERE sem_id = '$semCode' AND subject_code = '$subject' AND sid = '$sid' ";
        $subjectNameSql = "SELECT * FROM subject_info WHERE subject_code = '$subject' ";
        $subjectMarksResult = $conn->query($subjectMarksSql);
        $subjectNameResult = $conn->query($subjectNameSql);
        if ($subjectMarksResult->num_rows > 0 && $subjectNameResult->num_rows > 0) {
            $subjectMarksRow = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
            $subjectNameRow = $subjectNameResult->fetch_array(MYSQLI_ASSOC);
            if ($outp != "") {$outp .= ",";}
   		    $outp .='"' . $subjectNameRow["name"] . '":';
		    $outp .= (string)json_encode($subjectMarksRow);
        }
        $subject = $row["subject2"];
        $subjectMarksSql = "SELECT * FROM student_marks WHERE sem_id = '$semCode' AND subject_code = '$subject' AND sid = '$sid' ";
        $subjectNameSql = "SELECT name FROM subject_info WHERE subject_code = '$subject' ";
        $subjectMarksResult = $conn->query($subjectMarksSql);
        $subjectNameResult = $conn->query($subjectNameSql);
        if ($subjectMarksResult->num_rows > 0 && $subjectNameResult->num_rows > 0) {
            $subjectMarksRow = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
            $subjectNameRow = $subjectNameResult->fetch_array(MYSQLI_ASSOC);
            if ($outp != "") {$outp .= ",";}
   		    $outp .='"' . $subjectNameRow["name"] . '":';
		    $outp .= (string)json_encode($subjectMarksRow);
        }
        $subject= $row["subject3"];
        $subjectMarksSql = "SELECT * FROM student_marks WHERE sem_id = '$semCode' AND subject_code = '$subject' AND sid = '$sid' ";
        $subjectNameSql = "SELECT name FROM subject_info WHERE subject_code = '$subject' ";
        $subjectMarksResult = $conn->query($subjectMarksSql);
        $subjectNameResult = $conn->query($subjectNameSql);
        if ($subjectMarksResult->num_rows > 0 && $subjectNameResult->num_rows > 0) {
            $subjectMarksRow = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
            $subjectNameRow = $subjectNameResult->fetch_array(MYSQLI_ASSOC);
            if ($outp != "") {$outp .= ",";}
   		    $outp .='"' . $subjectNameRow["name"] . '":';
		    $outp .= (string)json_encode($subjectMarksRow);
        }
        $subject = $row["subject4"];
        $subjectMarksSql = "SELECT * FROM student_marks WHERE sem_id = '$semCode' AND subject_code = '$subject' AND sid = '$sid' ";
        $subjectNameSql = "SELECT name FROM subject_info WHERE subject_code = '$subject' ";
        $subjectMarksResult = $conn->query($subjectMarksSql);
        $subjectNameResult = $conn->query($subjectNameSql);
        if ($subjectMarksResult->num_rows > 0 && $subjectNameResult->num_rows > 0) {
            $subjectMarksRow = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
            $subjectNameRow = $subjectNameResult->fetch_array(MYSQLI_ASSOC);
            if ($outp != "") {$outp .= ",";}
   		    $outp .='"' . $subjectNameRow["name"] . '":';
		    $outp .= (string)json_encode($subjectMarksRow);
        }
        $subject= $row["subject5"];
        $subjectMarksSql = "SELECT * FROM student_marks WHERE sem_id = '$semCode' AND subject_code = '$subject' AND sid = '$sid' ";
        $subjectNameSql = "SELECT name FROM subject_info WHERE subject_code = '$subject' ";
        $subjectMarksResult = $conn->query($subjectMarksSql);
        $subjectNameResult = $conn->query($subjectNameSql);
        if ($subjectMarksResult->num_rows > 0 && $subjectNameResult->num_rows > 0) {
            $subjectMarksRow = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
            $subjectNameRow = $subjectNameResult->fetch_array(MYSQLI_ASSOC);
            if ($outp != "") {$outp .= ",";}
   		    $outp .='"' . $subjectNameRow["name"] . '":';
		    $outp .= (string)json_encode($subjectMarksRow);
        }
        $subject = $row["subject6"];
        $subjectMarksSql = "SELECT * FROM student_marks WHERE sem_id = '$semCode' AND subject_code = '$subject' AND sid = '$sid' ";
        $subjectNameSql = "SELECT name FROM subject_info WHERE subject_code = '$subject' ";
        $subjectMarksResult = $conn->query($subjectMarksSql);
        $subjectNameResult = $conn->query($subjectNameSql);
        if ($subjectMarksResult->num_rows > 0 && $subjectNameResult->num_rows > 0) {
            $subjectMarksRow = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
            $subjectNameRow = $subjectNameResult->fetch_array(MYSQLI_ASSOC);
            if ($outp != "") {$outp .= ",";}
   		    $outp .='"' . $subjectNameRow["name"] . '":';
		    $outp .= (string)json_encode($subjectMarksRow);
        }
        $subject = $row["subject7"];
        $subjectMarksSql = "SELECT * FROM student_marks WHERE sem_id = '$semCode' AND subject_code = '$subject' AND sid = '$sid' ";
        $subjectNameSql = "SELECT name FROM subject_info WHERE subject_code = '$subject' ";
        $subjectMarksResult = $conn->query($subjectMarksSql);
        $subjectNameResult = $conn->query($subjectNameSql);
        if ($subjectMarksResult->num_rows > 0 && $subjectNameResult->num_rows > 0) {
            $subjectMarksRow = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
            $subjectNameRow = $subjectNameResult->fetch_array(MYSQLI_ASSOC);
            if ($outp != "") {$outp .= ",";}
   		    $outp .='"' . $subjectNameRow["name"] . '":';
		    $outp .= (string)json_encode($subjectMarksRow);
        }
	$outp ='{ "records" : {' . $outp . '} }';
	}
	else {
		$outp ='{ "records" : "0" }';
	}


	$conn->close();
	echo($outp);
?>
