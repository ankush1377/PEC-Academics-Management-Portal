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
//	$semId = '1617-2';
//	$subCode = 'CSN302';
	$outp = "";
	
	
	$marksListSql = "SELECT * FROM student_marks WHERE sem_id = '$semId' AND subject_code = '$subCode' ";
	$marksListResult = $conn->query($marksListSql);
	$subjectMarksSql = "SELECT * FROM subject_marks WHERE sem_id = '$semId' AND subject_code = '$subCode' ";
    $subjectMarksResult = $conn->query($subjectMarksSql);
	$subjectWeightageSql = "SELECT * FROM subject_weightage WHERE sem_id = '$semId' AND subject_code = '$subCode' ";
    $subjectWeightageResult = $conn->query($subjectWeightageSql);
    $subjectMarksRow = $subjectMarksResult->fetch_array(MYSQLI_ASSOC);
    $subjectWeightageRow = $subjectWeightageResult->fetch_array(MYSQLI_ASSOC);

	if ($marksListResult->num_rows > 0) {
		while($marksListRow = $marksListResult->fetch_array(MYSQLI_ASSOC)) {

		    $sid = $marksListRow["sid"];
		    $studentNameSql = "SELECT name FROM student_info WHERE sid = '$sid' ";
		    $studentNameResult = $conn->query($studentNameSql);
		    if($studentNameResult->num_rows > 0){
		    $studentName = $studentNameResult->fetch_array(MYSQLI_ASSOC);
            $total = 0;


                if ($outp != "") {$outp .= ",";}
            //    print (int)$subjectMarksRow["quiz4"];
                $outp .= '{"sid":"' . $marksListRow["sid"] . '",';
                $outp .= '"name":"' . $studentName["name"] . '",';
                if( (int)$marksListRow["quiz1"] != 0 && (int)$subjectMarksRow["quiz1"] != 0 ){
                    $outp .= '"quiz1":"' . round((int)$marksListRow["quiz1"]*(int)$subjectWeightageRow["quiz1"]/(int)$subjectMarksRow["quiz1"],2) . '",';
                    $total +=  round((int)$marksListRow["quiz1"]*(int)$subjectWeightageRow["quiz1"]/(int)$subjectMarksRow["quiz1"],2);
                }
                else
                    $outp .= '"quiz1":"N/A",';
                if( (int)$marksListRow["quiz2"] != 0 && (int)$subjectMarksRow["quiz2"] != 0 ){
                    $outp .= '"quiz2":"' . round((int)$marksListRow["quiz2"]*(int)$subjectWeightageRow["quiz2"]/(int)$subjectMarksRow["quiz2"],2) . '",';
                    $total +=  round((int)$marksListRow["quiz2"]*(int)$subjectWeightageRow["quiz2"]/(int)$subjectMarksRow["quiz2"],2);
                }else
                    $outp .= '"quiz2":"N/A",';
                if( (int)$marksListRow["quiz3"] != 0 && (int)$subjectMarksRow["quiz3"] != 0 ){
                    $total +=  round((int)$marksListRow["quiz3"]*(int)$subjectWeightageRow["quiz3"]/(int)$subjectMarksRow["quiz3"],2);
                    $outp .= '"quiz3":"' . round((int)$marksListRow["quiz3"]*(int)$subjectWeightageRow["quiz3"]/(int)$subjectMarksRow["quiz3"],2) . '",';
                }else
                    $outp .= '"quiz3":"N/A",';
                if( (int)$marksListRow["quiz4"] != 0 && (int)$subjectMarksRow["quiz4"] != 0 ){
                    $total +=  round((int)$marksListRow["quiz4"]*(int)$subjectWeightageRow["quiz4"]/(int)$subjectMarksRow["quiz4"],2);
                    $outp .= '"quiz4":"' . round((int)$marksListRow["quiz4"]*(int)$subjectWeightageRow["quiz4"]/(int)$subjectMarksRow["quiz4"],2) . '",';
                }else
                    $outp .= '"quiz4":"N/A",';
                if( (int)$marksListRow["assignment1"] != 0 && (int)$subjectMarksRow["assignment1"] != 0 ){
                    $total +=  round((int)$marksListRow["assignment1"]*(int)$subjectWeightageRow["assignment1"]/(int)$subjectMarksRow["assignment1"],2);
                    $outp .= '"assignment1":"'. round((int)$marksListRow["assignment1"]*(int)$subjectWeightageRow["assignment1"]/(int)$subjectMarksRow["assignment1"],2) . '",';
                }else
                    $outp .= '"assignment1":"N/A",';
                if( (int)$marksListRow["assignment2"] != 0 && (int)$subjectMarksRow["assignment2"] != 0 ){
                    $total +=  round((int)$marksListRow["assignment2"]*(int)$subjectWeightageRow["assignment2"]/(int)$subjectMarksRow["assignment2"],2);
                    $outp .= '"assignment2":"'. round((int)$marksListRow["assignment2"]*(int)$subjectWeightageRow["assignment2"]/(int)$subjectMarksRow["assignment2"],2) . '",';
                }else
                    $outp .= '"assignment2":"N/A",';
                if( (int)$marksListRow["assignment3"] != 0 && (int)$subjectMarksRow["assignment3"] != 0 ){
                    $total +=  round((int)$marksListRow["assignment3"]*(int)$subjectWeightageRow["assignment3"]/(int)$subjectMarksRow["assignment3"],2);
                    $outp .= '"assignment3":"'. round((int)$marksListRow["assignment3"]*(int)$subjectWeightageRow["assignment3"]/(int)$subjectMarksRow["assignment3"],2) . '",';
                }else
                    $outp .= '"assignment3":"N/A",';
                if( (int)$marksListRow["assignment4"] != 0 && (int)$subjectMarksRow["assignment4"] != 0 ){
                    $total +=  round((int)$marksListRow["assignment4"]*(int)$subjectWeightageRow["assignment4"]/(int)$subjectMarksRow["assignment4"],2);
                    $outp .= '"assignment4":"'. round((int)$marksListRow["assignment4"]*(int)$subjectWeightageRow["assignment4"]/(int)$subjectMarksRow["assignment4"],2) . '",';
                }else
                    $outp .= '"assignment4":"N/A",';
                if( (int)$marksListRow["assignment5"] != 0 && (int)$subjectMarksRow["assignment5"] != 0 ){
                    $total +=  round((int)$marksListRow["assignment5"]*(int)$subjectWeightageRow["assignment5"]/(int)$subjectMarksRow["assignment5"],2);
                    $outp .= '"assignment5":"'. round((int)$marksListRow["assignment5"]*(int)$subjectWeightageRow["assignment5"]/(int)$subjectMarksRow["assignment5"],2) . '",';
                }else
                    $outp .= '"assignment5":"N/A",';
                if( (int)$marksListRow["lab1"] != 0 && (int)$subjectMarksRow["lab1"] != 0 ){
                    $total +=  round((int)$marksListRow["lab1"]*(int)$subjectWeightageRow["lab1"]/(int)$subjectMarksRow["lab1"],2);
                    $outp .= '"lab1":"'. round((int)$marksListRow["lab1"]*(int)$subjectWeightageRow["lab1"]/(int)$subjectMarksRow["lab1"],2) . '",';
                }else
                    $outp .= '"lab1":"N/A",';
                if( (int)$marksListRow["lab2"] != 0 && (int)$subjectMarksRow["lab2"] != 0 ){
                    $total +=  round((int)$marksListRow["lab2"]*(int)$subjectWeightageRow["lab2"]/(int)$subjectMarksRow["lab2"],2);
                    $outp .= '"lab2":"'. round((int)$marksListRow["lab2"]*(int)$subjectWeightageRow["lab2"]/(int)$subjectMarksRow["lab2"],2) . '",';
                }else
                    $outp .= '"lab2":"N/A",';
                if( (int)$marksListRow["project"] != 0 && (int)$subjectMarksRow["project"] != 0 ){
                    $total +=  round((int)$marksListRow["project"]*(int)$subjectWeightageRow["project"]/(int)$subjectMarksRow["project"],2);
                    $outp .= '"project":"'. round((int)$marksListRow["project"]*(int)$subjectWeightageRow["project"]/(int)$subjectMarksRow["project"],2) . '",';
                }else
                    $outp .= '"project":"N/A",';
                if( (int)$marksListRow["mst"] != 0 && (int)$subjectMarksRow["mst"] != 0 ){
                    $total +=  round((int)$marksListRow["mst"]*(int)$subjectWeightageRow["mst"]/(int)$subjectMarksRow["mst"],2);
                    $outp .= '"mst":"'. round((int)$marksListRow["mst"]*(int)$subjectWeightageRow["mst"]/(int)$subjectMarksRow["mst"],2) . '",';
                }else
                    $outp .= '"mst":"N/A",';
                if( (int)$marksListRow["est"] != 0 && (int)$subjectMarksRow["est"] != 0 ){
                    $total +=  round((int)$marksListRow["est"]*(int)$subjectWeightageRow["est"]/(int)$subjectMarksRow["est"],2);
                    $outp .= '"est":"'. round((int)$marksListRow["est"]*(int)$subjectWeightageRow["est"]/(int)$subjectMarksRow["est"],2) . '",';
                }else
                    $outp .= '"est":"N/A",';
                if($total != 0)
                    $outp .= '"total":"'. $total . '",';
                else
                    $outp .= '"total":"N/A",';
                $outp .= '"grade":"'. $marksListRow["grade"] . '"}';
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
