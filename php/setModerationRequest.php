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
    $sem_id = $request->semCode;
    $tid = $request->tid;
    $status = '0';

    $checkModerationRequestSql = "SELECT * FROM subject_approvals WHERE subject_code = '$subject_code' AND sem_id = '$sem_id'";
    $moderationRequestResult = $conn->query($checkModerationRequestSql);
    if ($moderationRequestResult->num_rows > 0) {
        $moderationRequestRow = $moderationRequestResult->fetch_array(MYSQLI_ASSOC);
        if($moderationRequestRow['status'] == '0'){
            echo "Already sent for moderation!";
        }
        else{
            echo "Already approved!";
        }
    }
    else{
        $insertModerationRequestSql = "INSERT INTO subject_approvals (sem_id, subject_code, status, tid) VALUES ('$sem_id', '$subject_code', '$status', '$tid')";
        if($conn->query($insertModerationRequestSql) === TRUE){
            echo "Moderation request sent!";
        }
    }

    $conn->close();
?>
