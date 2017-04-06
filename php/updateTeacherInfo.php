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
   	$name = $request->name;
   	$dob = $request->dob;
   	$gender = $request->gender;
   	$father_name = $request->fatherName;
   	$mother_name = $request->motherName;


   	$updateTeacherSql = "UPDATE teacher_info SET  name='$name', dob='$dob', gender='$gender', father_name='$father_name', mother_name='$mother_name' WHERE tid='$tid'";
    $conn->query($updateTeacherSql);

    $conn->close();
?>


