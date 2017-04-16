<?php

	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "pamp";

	// Create connection
   	$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

	$postdata = file_get_contents("php://input");
   	$request = json_decode($postdata);
    $subject_code = $request->subCode;
    $sem_id = $request->semId;
    $status = '1';

    $approveModerationRequestSql = "UPDATE subject_approvals SET  status='$status' WHERE sem_id='$sem_id' AND subject_code = '$subject_code'";

    if($conn->query($approveModerationRequestSql) === TRUE)
        echo "Successfully approved!";
    else
        echo "Could not approve at thi point in time!";

    $conn->close();
?>
