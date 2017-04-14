<?php

	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "pamp";

	// Create connection
   	$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

	$postdata = file_get_contents("php://input");
   	$request = json_decode($postdata);

   	$dataList = $request->dataList;

    for ($x = 0; $x < count($dataList); $x++) {
        $sid = $dataList[$x]->sid;
        $subject_code = $dataList[$x]->subject_code;
        $sem_id = $dataList[$x]->sem_id;
        $quiz1 = $dataList[$x]->quiz1;
        $quiz2 = $dataList[$x]->quiz2;
        $quiz3 = $dataList[$x]->quiz3;
        $quiz4 = $dataList[$x]->quiz4;
        $assignment1 = $dataList[$x]->assignment1;
        $assignment2 = $dataList[$x]->assignment2;
        $assignment3 = $dataList[$x]->assignment3;
        $assignment4 = $dataList[$x]->assignment4;
        $assignment5 = $dataList[$x]->assignment5;
        $lab1 = $dataList[$x]->lab1;
        $lab2 = $dataList[$x]->lab2;
        $project = $dataList[$x]->project;
        $mst = $dataList[$x]->mst;
        $est = $dataList[$x]->est;
        $grade = $dataList[$x]->grade;

        $updateStudentMarksSql = "UPDATE student_marks SET  quiz1='$quiz1', quiz2='$quiz2', quiz3='$quiz3', quiz4='$quiz4', assignment1='$assignment1', assignment2='$assignment2', assignment3='$assignment3', assignment4='$assignment4', assignment5='$assignment5', lab1='$lab1', lab2='$lab2', project='$project', mst='$mst', est='$est', grade='$grade' WHERE sid='$sid' AND sem_id='$sem_id' AND subject_code='$subject_code'";
        $conn->query($updateStudentMarksSql);
    }

    $conn->close();
?>


