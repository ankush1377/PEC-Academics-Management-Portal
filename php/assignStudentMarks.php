<?php

	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "pamp";

	// Create connection
   	$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

	$postdata = file_get_contents("php://input");
   	$request = json_decode($postdata);

   	$marksList = $request->marksList;
    print "abc";
   	if($marksList == NULL)
   	echo "1";
   	else
   	echo "0";

//    for ($x = 0; $x < count($marksList); $x++) {
      /*  $sid = $marksList[0];
        echo $marksList;*/
        /*$updateStudentSql = "UPDATE student_marks SET  name='$name', dob='$dob', gender='$gender', father_name='$father_name', mother_name='$mother_name', batch_id='$batch_id', programme='$programme' WHERE sid='$sid'";
        $conn->query($updateStudentSql);
*/

//    }

    $conn->close();
?>


