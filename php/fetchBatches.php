<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");


	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "pamp";

	// Create connection
   	$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

	$postdata = file_get_contents("php://input");
   	$request = json_decode($postdata);
	$outp = "";
    $batches = array();

	$batchListSql = "SELECT batch_id FROM student_info";
	$batchListResult = $conn->query($batchListSql);


	if ($batchListResult->num_rows > 0) {
		while($row = $batchListResult->fetch_array(MYSQLI_ASSOC)) {
            $batch = substr($row["batch_id"], 0, strpos($row["batch_id"], '_'));
            if(!in_array('"' . $batch . '"', $batches)){
                array_push($batches, '"' . $batch . '"');
            }
	    }
		$outp ='{ "records" : [' . implode(",", $batches) . '] }';
	}
	else {
		$outp ='{ "records" : "0" }';
	}


	$conn->close();
	echo($outp);
?>
