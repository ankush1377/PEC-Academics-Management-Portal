<?php

	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "pamp";

	// Create connection
   	$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

	$postdata = file_get_contents("php://input");
   	$request = json_decode($postdata);
   	$sidList = $request->sidList;
   	$subjectList = $request->subjectList;
   	$sem_id = $request->semId;
   	$n = count($subjectList);
   	if($n >= 1)
   	    $subject1 = $subjectList[0];
   	else
   	    $subject1 = NULL;
    if($n >= 2)
   	    $subject2 = $subjectList[1];
   	else
   	    $subject2 = NULL;
   	if($n >= 3)
        $subject3 = $subjectList[2];
    else
        $subject3 = NULL;
    if($n >= 4)
        $subject4 = $subjectList[3];
    else
        $subject4 = NULL;
    if($n >= 5)
        $subject5 = $subjectList[4];
    else
        $subject5 = NULL;
    if($n >= 6)
        $subject6 = $subjectList[5];
    else
        $subject6 = NULL;
    if($n >= 7)
        $subject7 = $subjectList[6];
    else
        $subject7 = NULL;


    for ($x = 0; $x < count($sidList); $x++) {
        $sid = $sidList[$x];
        $studentInfoSql = "SELECT * FROM student_subjects WHERE sid = '$sid' AND sem_id = '$sem_id'";
        $studentInfoResult = $conn->query($studentInfoSql);
        if ($studentInfoResult->num_rows > 0) {
            $updateStudentSubjectsSql = "UPDATE student_subjects SET subject1='$subject1', subject2='$subject2', subject3='$subject3', subject4='$subject4', subject5='$subject5', subject6='$subject6', subject7='$subject7' WHERE sid='$sid' AND sem_id='$sem_id'";
            $conn->query($updateStudentSubjectsSql);
            $studentMarksDeleteSql = "DELETE FROM student_marks WHERE sid = '$sid' AND sem_id = '$sem_id'";
            $conn->query($studentMarksDeleteSql);
            for($y = 0; $y<$n; $y++){
                $subject = $subjectList[$y];
                $checkStudentMarksSql = "SELECT * FROM student_marks WHERE sid = '$sid' AND sem_id = '$sem_id' AND subject_code = '$subject'";
                $checkStudentMarksResult = $conn->query($checkStudentMarksSql);
                if ($checkStudentMarksResult->num_rows == 0) {
                    $addStudentMarksSql = "INSERT INTO student_marks (sem_id, subject_code, sid) VALUES ('$sem_id', '$subject', '$sid')";
                    $conn->query($addStudentMarksSql);
                }
            }
        }
        else{
            $addStudentSubjectsSql = "INSERT INTO student_subjects (sem_id, sid, subject1, subject2, subject3, subject4, subject5, subject6, subject7 ) VALUES ('$sem_id', '$sid', '$subject1', '$subject2', '$subject3', '$subject4', '$subject5', '$subject6', '$subject7')";
            $conn->query($addStudentSubjectsSql);
            $studentMarksDeleteSql = "DELETE FROM student_marks WHERE sid = '$sid' AND sem_id = '$sem_id'";
            $conn->query($studentMarksDeleteSql);
            for($y = 0; $y<$n; $y++){
                $subject = $subjectList[$y];
                $checkStudentMarksSql = "SELECT * FROM student_marks WHERE sid = '$sid' AND sem_id = '$sem_id' AND subject_code = '$subject'";
                $checkStudentMarksResult = $conn->query($checkStudentMarksSql);
                if ($checkStudentMarksResult->num_rows == 0) {
                    $addStudentMarksSql = "INSERT INTO student_marks (sem_id, subject_code, sid) VALUES ('$sem_id', '$subject', '$sid')";
                    $conn->query($addStudentMarksSql);
                }
            }
        }
    }

    $conn->close();
?>


