<?php

	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "pamp";

	// Create connection
   	$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

	$postdata = file_get_contents("php://input");
   	$request = json_decode($postdata);
   	$marksList = $request->marksList;
   	$weightageList = $request->weightageList;

    // Common
    $subject_code = $marksList->subject_code;
    $sem_id = $marksList->sem_id;

    // Marks Assignment
    $quiz1 = $marksList->quiz1;
    $quiz2 = $marksList->quiz2;
    $quiz3 = $marksList->quiz3;
    $quiz4 = $marksList->quiz4;
    $assignment1 = $marksList->assignment1;
    $assignment2 = $marksList->assignment2;
    $assignment3 = $marksList->assignment3;
    $assignment4 = $marksList->assignment4;
    $assignment5 = $marksList->assignment5;
    $lab1 = $marksList->lab1;
    $lab2 = $marksList->lab2;
    $project = $marksList->project;
    $mst = $marksList->mst;
    $est = $marksList->est;

    $selectSubjectMarksSql = "SELECT * FROM subject_marks WHERE subject_code = '$subject_code' AND sem_id = '$sem_id'";
    $subjectMarksResult = $conn->query($selectSubjectMarksSql);
    if ($subjectMarksResult->num_rows > 0) {
        $updateSubjectMarksSql = "UPDATE subject_marks SET  quiz1='$quiz1', quiz2='$quiz2', quiz3='$quiz3', quiz4='$quiz4', assignment1='$assignment1', assignment2='$assignment2', assignment3='$assignment3', assignment4='$assignment4', assignment5='$assignment5', lab1='$lab1', lab2='$lab2', project='$project', mst='$mst', est='$est' WHERE sem_id='$sem_id' AND subject_code='$subject_code'";
        $conn->query($updateSubjectMarksSql);
    }
    else{
        $insertSubjectMarksSql = "INSERT INTO subject_marks (sem_id, subject_code, quiz1, quiz2, quiz3, quiz4, assignment1, assignment2, assignment3, assignment4, assignment5, lab1, lab2, project, mst, est) VALUES ('$sem_id', '$subject_code', '$quiz1', '$quiz2', '$quiz3', '$quiz4', '$assignment1', '$assignment2', '$assignment3', '$assignment4', '$assignment5', '$lab1', '$lab2', '$project', '$mst', '$est')";
        $conn->query($insertSubjectMarksSql);
    }

    // Weightage Assignment
    $quiz1 = $weightageList->quiz1;
    $quiz2 = $weightageList->quiz2;
    $quiz3 = $weightageList->quiz3;
    $quiz4 = $weightageList->quiz4;
    $assignment1 = $weightageList->assignment1;
    $assignment2 = $weightageList->assignment2;
    $assignment3 = $weightageList->assignment3;
    $assignment4 = $weightageList->assignment4;
    $assignment5 = $weightageList->assignment5;
    $lab1 = $weightageList->lab1;
    $lab2 = $weightageList->lab2;
    $project = $weightageList->project;
    $mst = $weightageList->mst;
    $est = $weightageList->est;

    $selectSubjectWeightageSql = "SELECT * FROM subject_weightage WHERE subject_code = '$subject_code' AND sem_id = '$sem_id'";
    $subjectWeightageResult = $conn->query($selectSubjectWeightageSql);
    if ($subjectWeightageResult->num_rows > 0) {
        $updateSubjectWeightageSql = "UPDATE subject_weightage SET  quiz1='$quiz1', quiz2='$quiz2', quiz3='$quiz3', quiz4='$quiz4', assignment1='$assignment1', assignment2='$assignment2', assignment3='$assignment3', assignment4='$assignment4', assignment5='$assignment5', lab1='$lab1', lab2='$lab2', project='$project', mst='$mst', est='$est' WHERE sem_id='$sem_id' AND subject_code='$subject_code'";
        $conn->query($updateSubjectWeightageSql);
    }
    else{
        $insertSubjectWeightageSql = "INSERT INTO subject_weightage (sem_id, subject_code, quiz1, quiz2, quiz3, quiz4, assignment1, assignment2, assignment3, assignment4, assignment5, lab1, lab2, project, mst, est) VALUES ('$sem_id', '$subject_code', '$quiz1', '$quiz2', '$quiz3', '$quiz4', '$assignment1', '$assignment2', '$assignment3', '$assignment4', '$assignment5', '$lab1', '$lab2', '$project', '$mst', '$est')";
        $conn->query($insertSubjectWeightageSql);
    }

    $conn->close();
?>


