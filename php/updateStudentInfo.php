<?php

	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "pamp";

	// Create connection
   	$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

	$postdata = file_get_contents("php://input");
   	$request = json_decode($postdata);
   	$sid = $request->sid;
   	$name = $request->name;
   	$dob = $request->dob;
   	$gender = $request->gender;
   	$father_name = $request->fatherName;
   	$mother_name = $request->motherName;
   	$batch_id = $request->batchId;
   	$programme = $request->programme;


   	$updateStudentSql = "UPDATE student_info SET  name='$name', dob='$dob', gender='$gender', father_name='$father_name', mother_name='$mother_name', batch_id='$batch_id', programme='$programme' WHERE sid='$sid'";
    $conn->query($updateStudentSql);

    $conn->close();
?>


