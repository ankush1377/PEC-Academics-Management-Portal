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
	$username = $request->username;
	$password = $request->password;
	$access = $request->access;
	$dataSql;
	$depCode;
	$outp = "";


	if ($access == "Admin") {
		$dataSql = "SELECT * FROM admin_info WHERE aid = '$username' AND password = '$password'";
	}
	elseif ($access == "Teacher"){
		$dataSql = "SELECT * FROM teacher_info WHERE tid = '$username' AND password = '$password'";
	}
	elseif ($access == "Moderator"){
		$dataSql = "SELECT * FROM moderator_info WHERE mid = '$username' AND password = '$password'";
	}
	elseif ($access == "Student") {
		$dataSql = "SELECT * FROM student_info WHERE sid = '$username' AND password = '$password'";
	}


	$dataResult = $conn->query($dataSql);

		
	if ($dataResult->num_rows > 0) {
		
		while($row = $dataResult->fetch_array(MYSQLI_ASSOC)) {
			$depCode = $row["dep_code"];
			$depSql = "SELECT * FROM department_info WHERE dep_code = '$depCode'";
			$depResult = $conn->query($depSql);
			$depName = $depResult->fetch_array(MYSQLI_ASSOC)["name"];

			if ($outp != "") {$outp .= ",";}
			$outp .= '{"name":"' . $row["name"] . '",';
			$outp .= '"dob":"' . $row["dob"] . '",';
			$outp .= '"gender":"' . $row["gender"] . '",';
			$outp .= '"father_name":"' . $row["father_name"] . '",';
			$outp .= '"mother_name":"' . $row["mother_name"] . '",';
			$outp .= '"dep_name":"' . $depName . '",';
			if ($access == "Student"){
				$outp .= '"batch":"' . $row["batch"] . '",';}
			$outp .= '"phone_no":"'. $row["phone_no"] . '",';
			$outp .= '"email_id":"'. $row["email_id"] . '"}';
		}		
		$outp ='{"records":' . $outp . '}';
	}
	else {
		$outp ='{"records":"0"}';
	}


	$conn->close();
	echo($outp);

?>
