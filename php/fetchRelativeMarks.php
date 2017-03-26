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
	$semId = $request->semId;
	$subCode = $request->subjectCode;
	$outp = "";
	
	
	$marksListSql = "SELECT * FROM student_marks WHERE sem_id = '$semId' AND subject_code = '$subCode' ";
	$marksListResult = $conn->query($marksListSql);
		
	
	if ($marksListResult->num_rows > 0) {
		while($row = $marksListResult->fetch_array(MYSQLI_ASSOC)) {
		    $sid = $row["sid"];
		    $studentNameSql = "SELECT name FROM student_info WHERE sid = '$sid' ";
		    $studentNameResult = $conn->query($studentNameSql);
		    if($studentNameResult->num_rows > 0){
		        $studentName = $studentNameResult->fetch_array(MYSQLI_ASSOC);
                if ($outp != "") {$outp .= ",";}
                $outp .= '{"sid":"' . $row["sid"] . '",';
                $outp .= '"name":"' . $studentName["name"] . '",';
                $outp .= '"quiz1":"' . $row["quiz1"] . '",';
                $outp .= '"quiz2":"' . $row["quiz2"] . '",';
                $outp .= '"quiz3":"' . $row["quiz3"] . '",';
                $outp .= '"quiz4":"' . $row["quiz4"] . '",';
                $outp .= '"assignment1":"'. $row["assignment1"] . '",';
                $outp .= '"assignment2":"'. $row["assignment2"] . '",';
                $outp .= '"assignment3":"'. $row["assignment3"] . '",';
                $outp .= '"assignment4":"'. $row["assignment4"] . '",';
                $outp .= '"assignment5":"'. $row["assignment5"] . '",';
                $outp .= '"lab1":"'. $row["lab1"] . '",';
                $outp .= '"lab2":"'. $row["lab2"] . '",';
                $outp .= '"project":"'. $row["project"] . '",';
                $outp .= '"mst":"'. $row["mst"] . '",';
                $outp .= '"est":"'. $row["est"] . '",';
                $outp .= '"grade":"'. $row["grade"] . '"}';
		    }
	    }
		$outp ='{ "records" : [' . $outp . '] }';
	}
	else {
		$outp ='{ "records" : "0" }';
	}
	
	
	$conn->close();
	echo($outp);
?>
