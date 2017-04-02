<?php

	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "pamp";

	// Create connection
   	$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

	$postdata = file_get_contents("php://input");
   	$request = json_decode($postdata);
//   	$sidList = $request->sidList;
    $sidList = ["abc","aaa"];

    echo json_encode($sidList);
  /* 	$updateStudentSql = "UPDATE student_info SET  name='$name', dob='$dob', gender='$gender', father_name='$father_name', mother_name='$mother_name', batch_id='$batch_id' WHERE sid='$sid'";
    $conn->query($updateStudentSql);*/

    $conn->close();
?>


