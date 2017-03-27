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
	$semId = $request->semCode;
	$outp = "";


	$subjectListSql = "SELECT * FROM student_subjects WHERE sem_id = '$semId' AND sid = '$sid' ";
	$subjectListResult = $conn->query($subjectListSql);


	if ($subjectListResult->num_rows > 0) {
		$row = $subjectListResult->fetch_array(MYSQLI_ASSOC);


		$subject = $row["subject1"];
		$studentSubjectMarksSql = "SELECT * FROM student_marks WHERE sem_id = '$semId' AND subject_code = '$subject' AND sid = '$sid' ";
        $subjectNameSql = "SELECT * FROM subject_info WHERE subject_code = '$subject' ";
		$subjectMarksSql = "SELECT * FROM subject_marks WHERE sem_id = '$semId' AND subject_code = '$subject' ";
		$subjectMarksResult = $conn->query($subjectMarksSql);
        $studentSubjectMarksResult = $conn->query($studentSubjectMarksSql);
        $subjectNameResult = $conn->query($subjectNameSql);
        if ($subjectMarksResult->num_rows > 0 && $studentSubjectMarksResult->num_rows > 0 && $subjectNameResult->num_rows > 0) {
            $subjectMarksRow = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
            $subjectNameRow = $subjectNameResult->fetch_array(MYSQLI_ASSOC);
			$studentSubjectMarksRow = $studentSubjectMarksResult->fetch_array(MYSQLI_ASSOC);
            if ($outp != "") {$outp .= ",";}
			$outp .= '{"subName":"' . $subjectNameRow["name"] . '",';
			$outp .= '"studentSubjectMarks": ' . (string)json_encode($studentSubjectMarksRow) . ' ,';
			$outp .= '"subjectMarks": ' . (string)json_encode($subjectMarksRow) . ' }';
        }
        
		$subject = $row["subject2"];
		$studentSubjectMarksSql = "SELECT * FROM student_marks WHERE sem_id = '$semId' AND subject_code = '$subject' AND sid = '$sid' ";
        $subjectNameSql = "SELECT * FROM subject_info WHERE subject_code = '$subject' ";
		$subjectMarksSql = "SELECT * FROM subject_marks WHERE sem_id = '$semId' AND subject_code = '$subject' ";
		$subjectMarksResult = $conn->query($subjectMarksSql);
        $studentSubjectMarksResult = $conn->query($studentSubjectMarksSql);
        $subjectNameResult = $conn->query($subjectNameSql);
        if ($subjectMarksResult->num_rows > 0 && $studentSubjectMarksResult->num_rows > 0 && $subjectNameResult->num_rows > 0) {
            $subjectMarksRow = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
            $subjectNameRow = $subjectNameResult->fetch_array(MYSQLI_ASSOC);
			$studentSubjectMarksRow = $studentSubjectMarksResult->fetch_array(MYSQLI_ASSOC);
            if ($outp != "") {$outp .= ",";}
			$outp .= '{"subName":"' . $subjectNameRow["name"] . '",';
			$outp .= '"studentSubjectMarks": ' . (string)json_encode($studentSubjectMarksRow) . ' ,';
			$outp .= '"subjectMarks": ' . (string)json_encode($subjectMarksRow) . ' }';
        }
		
		$subject = $row["subject3"];
		$studentSubjectMarksSql = "SELECT * FROM student_marks WHERE sem_id = '$semId' AND subject_code = '$subject' AND sid = '$sid' ";
        $subjectNameSql = "SELECT * FROM subject_info WHERE subject_code = '$subject' ";
		$subjectMarksSql = "SELECT * FROM subject_marks WHERE sem_id = '$semId' AND subject_code = '$subject' ";
		$subjectMarksResult = $conn->query($subjectMarksSql);
        $studentSubjectMarksResult = $conn->query($studentSubjectMarksSql);
        $subjectNameResult = $conn->query($subjectNameSql);
        if ($subjectMarksResult->num_rows > 0 && $studentSubjectMarksResult->num_rows > 0 && $subjectNameResult->num_rows > 0) {
            $subjectMarksRow = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
            $subjectNameRow = $subjectNameResult->fetch_array(MYSQLI_ASSOC);
			$studentSubjectMarksRow = $studentSubjectMarksResult->fetch_array(MYSQLI_ASSOC);
            if ($outp != "") {$outp .= ",";}
			$outp .= '{"subName":"' . $subjectNameRow["name"] . '",';
			$outp .= '"studentSubjectMarks": ' . (string)json_encode($studentSubjectMarksRow) . ' ,';
			$outp .= '"subjectMarks": ' . (string)json_encode($subjectMarksRow) . ' }';
        }
		
		$subject = $row["subject4"];
		$studentSubjectMarksSql = "SELECT * FROM student_marks WHERE sem_id = '$semId' AND subject_code = '$subject' AND sid = '$sid' ";
        $subjectNameSql = "SELECT * FROM subject_info WHERE subject_code = '$subject' ";
		$subjectMarksSql = "SELECT * FROM subject_marks WHERE sem_id = '$semId' AND subject_code = '$subject' ";
		$subjectMarksResult = $conn->query($subjectMarksSql);
        $studentSubjectMarksResult = $conn->query($studentSubjectMarksSql);
        $subjectNameResult = $conn->query($subjectNameSql);
        if ($subjectMarksResult->num_rows > 0 && $studentSubjectMarksResult->num_rows > 0 && $subjectNameResult->num_rows > 0) {
            $subjectMarksRow = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
            $subjectNameRow = $subjectNameResult->fetch_array(MYSQLI_ASSOC);
			$studentSubjectMarksRow = $studentSubjectMarksResult->fetch_array(MYSQLI_ASSOC);
            if ($outp != "") {$outp .= ",";}
			$outp .= '{"subName":"' . $subjectNameRow["name"] . '",';
			$outp .= '"studentSubjectMarks": ' . (string)json_encode($studentSubjectMarksRow) . ' ,';
			$outp .= '"subjectMarks": ' . (string)json_encode($subjectMarksRow) . ' }';
        }
		
		$subject = $row["subject5"];
		$studentSubjectMarksSql = "SELECT * FROM student_marks WHERE sem_id = '$semId' AND subject_code = '$subject' AND sid = '$sid' ";
        $subjectNameSql = "SELECT * FROM subject_info WHERE subject_code = '$subject' ";
		$subjectMarksSql = "SELECT * FROM subject_marks WHERE sem_id = '$semId' AND subject_code = '$subject' ";
		$subjectMarksResult = $conn->query($subjectMarksSql);
        $studentSubjectMarksResult = $conn->query($studentSubjectMarksSql);
        $subjectNameResult = $conn->query($subjectNameSql);
        if ($subjectMarksResult->num_rows > 0 && $studentSubjectMarksResult->num_rows > 0 && $subjectNameResult->num_rows > 0) {
            $subjectMarksRow = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
            $subjectNameRow = $subjectNameResult->fetch_array(MYSQLI_ASSOC);
			$studentSubjectMarksRow = $studentSubjectMarksResult->fetch_array(MYSQLI_ASSOC);
            if ($outp != "") {$outp .= ",";}
			$outp .= '{"subName":"' . $subjectNameRow["name"] . '",';
			$outp .= '"studentSubjectMarks": ' . (string)json_encode($studentSubjectMarksRow) . ' ,';
			$outp .= '"subjectMarks": ' . (string)json_encode($subjectMarksRow) . ' }';
        }
		
		$subject = $row["subject6"];
		$studentSubjectMarksSql = "SELECT * FROM student_marks WHERE sem_id = '$semId' AND subject_code = '$subject' AND sid = '$sid' ";
        $subjectNameSql = "SELECT * FROM subject_info WHERE subject_code = '$subject' ";
		$subjectMarksSql = "SELECT * FROM subject_marks WHERE sem_id = '$semId' AND subject_code = '$subject' ";
		$subjectMarksResult = $conn->query($subjectMarksSql);
        $studentSubjectMarksResult = $conn->query($studentSubjectMarksSql);
        $subjectNameResult = $conn->query($subjectNameSql);
        if ($subjectMarksResult->num_rows > 0 && $studentSubjectMarksResult->num_rows > 0 && $subjectNameResult->num_rows > 0) {
            $subjectMarksRow = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
            $subjectNameRow = $subjectNameResult->fetch_array(MYSQLI_ASSOC);
			$studentSubjectMarksRow = $studentSubjectMarksResult->fetch_array(MYSQLI_ASSOC);
            if ($outp != "") {$outp .= ",";}
			$outp .= '{"subName":"' . $subjectNameRow["name"] . '",';
			$outp .= '"studentSubjectMarks": ' . (string)json_encode($studentSubjectMarksRow) . ' ,';
			$outp .= '"subjectMarks": ' . (string)json_encode($subjectMarksRow) . ' }';
        }
		
		$subject = $row["subject7"];
		$studentSubjectMarksSql = "SELECT * FROM student_marks WHERE sem_id = '$semId' AND subject_code = '$subject' AND sid = '$sid' ";
        $subjectNameSql = "SELECT * FROM subject_info WHERE subject_code = '$subject' ";
		$subjectMarksSql = "SELECT * FROM subject_marks WHERE sem_id = '$semId' AND subject_code = '$subject' ";
		$subjectMarksResult = $conn->query($subjectMarksSql);
        $studentSubjectMarksResult = $conn->query($studentSubjectMarksSql);
        $subjectNameResult = $conn->query($subjectNameSql);
        if ($subjectMarksResult->num_rows > 0 && $studentSubjectMarksResult->num_rows > 0 && $subjectNameResult->num_rows > 0) {
            $subjectMarksRow = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
            $subjectNameRow = $subjectNameResult->fetch_array(MYSQLI_ASSOC);
			$studentSubjectMarksRow = $studentSubjectMarksResult->fetch_array(MYSQLI_ASSOC);
            if ($outp != "") {$outp .= ",";}
			$outp .= '{"subName":"' . $subjectNameRow["name"] . '",';
			$outp .= '"studentSubjectMarks": ' . (string)json_encode($studentSubjectMarksRow) . ' ,';
			$outp .= '"subjectMarks": ' . (string)json_encode($subjectMarksRow) . ' }';
        }

		$outp ='{ "records" : [' . $outp . '] }';
	}
	else {
		$outp ='{ "records" : "0" }';
	}


	$conn->close();
	echo($outp);
?>
