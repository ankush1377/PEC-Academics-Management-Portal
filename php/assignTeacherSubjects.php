<?php

	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "pamp";

	// Create connection
   	$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

	$postdata = file_get_contents("php://input");
   	$request = json_decode($postdata);
   	$tidList = $request->tidList;
   	$subjectList = $request->subjectList;
   	$sem_id = $request->semId;


    for ($x = 0; $x < count($tidList); $x++) {
        $tid = $tidList[$x];
        for ($y = 0; $y < count($subjectList); $y++) {
            $subject = $subjectList[$y];
            $teacherInfoSql = "SELECT * FROM teacher_subjects WHERE tid = '$tid' AND sem_id = '$sem_id' AND subject_code = '$subject'";
            $teacherInfoResult = $conn->query($teacherInfoSql);
            if (!$teacherInfoResult->num_rows > 0) {
                $addTeacherSubjectsSql = "INSERT INTO teacher_subjects (sem_id, tid, subject_code, batch_id ) VALUES ('$sem_id', '$tid', '$subject', '$batch_id')";
                $conn->query($addTeacherSubjectsSql);
            }
        }

        $teacherInfoSql = "SELECT * FROM teacher_subjects WHERE tid = '$tid' AND sem_id = '$sem_id'";
        $teacherInfoResult = $conn->query($teacherInfoSql);
        if ($teacherInfoResult->num_rows > 0) {
            $updateTeacherSubjectsSql = "UPDATE teacher_subjects SET subject1='$subject1', subject2='$subject2', subject3='$subject3', subject4='$subject4', subject5='$subject5' WHERE tid='$tid' AND sem_id='$sem_id'";
            $conn->query($updateTeacherSubjectsSql);
        }
        else{
            $addTeacherSubjectsSql = "INSERT INTO teacher_subjects (sem_id, tid, subject1, subject2, subject3, subject4, subject5 ) VALUES ('$sem_id', '$tid', '$subject1', '$subject2', '$subject3', '$subject4', '$subject5')";
            $conn->query($addTeacherSubjectsSql);
        }
    }

    $conn->close();
?>


