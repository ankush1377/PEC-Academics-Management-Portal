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
   	$dep_code = $request->depCode;
   	$password = $request->password;
   	$access = 'Student';

   	$addStudentSql = "INSERT INTO student_info (sid, name, dob, gender, father_name, mother_name, dep_code, batch_id, access, password) VALUES ('$sid','$name','$dob','$gender','$father_name','$mother_name','$dep_code','$batch_id','$access','$password')";

    if ($conn->query($addStudentSql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $addStudentSql . "<br>" . $conn->error;
        }

    $conn->close();
?>


