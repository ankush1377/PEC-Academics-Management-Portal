<?php

	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "pamp";

	// Create connection
   	$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

	$postdata = file_get_contents("php://input");
   	$request = json_decode($postdata);

   	$tid = $request->tid;
   	$batchList = $request->batchList;
   	$subjectList = $request->subjectList;
   	$sem_id = $request->semId;



  /* 	$tid = 'a';
   	$sem_id = '1617-2';
    $batchList = array("2014-18_3", "2015-19_3");
   	$subjectList = array("CSN303", "CSN302");*/


    for ($x = 0; $x < count($subjectList); $x++) {
        $batchId = $batchList[$x];
        $subject = $subjectList[$x];
        print $batchId;
        print $subject;

        $teacherInfoSql = "SELECT * FROM teacher_subjects WHERE tid = '$tid' AND sem_id = '$sem_id' AND subject_code = '$subject' AND batch_id = '$batchId'";
        $teacherInfoResult = $conn->query($teacherInfoSql);
        print $teacherInfoSql;
        print $teacherInfoResult->num_rows;
        if (!$teacherInfoResult->num_rows > 0) {
                $addTeacherSubjectsSql = "INSERT INTO teacher_subjects (sem_id, tid, subject_code, batch_id ) VALUES ('$sem_id', '$tid', '$subject', '$batchId')";
                $conn->query($addTeacherSubjectsSql);
                print $addTeacherSubjectsSql;
        }
    }

    $conn->close();
?>


