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
   	$dep_code = $request->depCode;
   	$password = $request->password;
   	$access = 'Teacher';

   	$addTeacherSql = "INSERT INTO teacher_info (tid, name, dob, gender, father_name, mother_name, dep_code, access, password) VALUES ('$tid','$name','$dob','$gender','$father_name','$mother_name','$dep_code','$access','$password')";
    $conn->query($addTeacherSql);

    $conn->close();
?>


