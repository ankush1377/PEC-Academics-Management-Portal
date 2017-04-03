'use strict';

pamp.controller('adminCtrl',['$scope','$rootScope','$location','$route','$http',function($scope,$rootScope,$location,$route,$http){

    $scope.incomplete = false;
    $scope.studentView = [];
    $scope.selectedStudents = [];
    $scope.getBatches = function (){

    	var batchesRequest = $http({
    	    method: "POST",
    		url: "php/fetchBatches.php"
    	});

    	batchesRequest.then( function(response) {
    		if (response.data.records != "0") {
    			$scope.batchList = response.data.records;
//    			console.log($scope.batchList);
    		}
    		else if (response.data.records == "0") {
//    			console.log(response.data.records);
    			//no records found
    		}
    		else {

    	    }
        });
    };
    $scope.getStudents = function (){

        var studentData ={
            "depCode": $rootScope.userData.dep_code
        };

    	var studentsRequest = $http({
    	    method: "POST",
    		url: "php/fetchStudents.php",
    		data: studentData
    	});

    	studentsRequest.then( function(response) {
    		if (response.data.records != "0") {
    			$scope.studentList = response.data.records;
                for(var i=0;i<$scope.studentList.length;i++){
                    $scope.studentView.push(true);
                    $scope.selectedStudents.push(false);
                    $scope.studentList[i].batch = $scope.studentList[i].batch_id.slice(0, $scope.studentList[i].batch_id.indexOf('_'));
                }
//    			console.log($scope.batchList);
    		}
    		else if (response.data.records == "0") {
//    			console.log(response.data.records);
    			//no records found
    		}
    		else {

    	    }
        });
    };
    $scope.getSubjects = function (){

            var subjectData ={
                "depCode": $rootScope.userData.dep_code
            };

        	var subjectRequest = $http({
        	    method: "POST",
        		url: "php/fetchSubjects.php",
        		data: subjectData
        	});

        	subjectRequest.then( function(response) {
        		if (response.data.records != "0") {
        			$scope.subjectList = response.data.records;

    //    			console.log($scope.batchList);
        		}
        		else if (response.data.records == "0") {
    //    			console.log(response.data.records);
        			//no records found
        		}
        		else {

        	    }
            });
        };

    function randomPassword(length) {
        var chars = "abcdefghijklmnopqrstuvwxyz@$&ABCDEFGHIJKLMNOP1234567890";
        var pass = "";
        for (var x = 0; x < length; x++) {
            var i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        return pass;
    }

    $scope.getBatches();
    $scope.getStudents();
    $scope.getSubjects();

    $scope.addStudent = function(){

        if( $scope.sid == undefined || $scope.sName == undefined || $scope.sDob == undefined || $scope.sFatherName == undefined || $scope.sGender == undefined ||$scope.sMotherName == undefined || $scope.sBatch == undefined ){
            $scope.incomplete = true;
            return;
        }

        $scope.incomplete = false;
        var pw = randomPassword(8);
        var addStudentRequest = $http({
            method: "POST",
            url: "php/addStudent.php",
            data: {
                sid: $scope.sid,
                name: $scope.sName,
                dob: $scope.sDob,
                gender: $scope.sGender,
                fatherName: $scope.sFatherName,
                motherName: $scope.sMotherName,
                batchId: $scope.sBatch + "_" + $rootScope.userData.dep_code,
                depCode: $rootScope.userData.dep_code,
                password: pw
            },
            header: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    };

    $scope.editStudent = function(index){

        $scope.studentView[index] = false;
//        console.log($scope.studentEdit);
    };

    $scope.saveStudent = function(studentData, index){

        studentData.batch_id = studentData.batch + "_" + studentData.dep_code;
//        console.log(studentData);
        $scope.studentView[index] = true;
        var updateStudentRequest = $http({
                method: "POST",
                url: "php/updateStudentInfo.php",
                data: {
                    sid: studentData.sid,
                    name: studentData.name,
                    dob: studentData.dob,
                    gender: studentData.gender,
                    fatherName: studentData.father_name,
                    motherName: studentData.mother_name,
                    batchId: studentData.batch_id,
                    depCode: $rootScope.userData.dep_code,
                    password: studentData.password
                },
                header: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
    };

    $scope.assignSubjects = function(){

        var subjectSid = [];
        for(var i=0;i<$scope.selectedStudents.length;i++){
            if($scope.selectedStudents[i] == true){
                subjectSid.push($scope.studentList[i].sid);
            }
        }

        var assignmentSubjectCodes = [];
        var empty = true;
        for(var i=0;i<$scope.assignmentSubjects.length;i++){
            empty = false;
            assignmentSubjectCodes.push($scope.assignmentSubjects[i].subject_code);
        }

        console.log(assignmentSubjectCodes);
         var assignStudentSubjectsRequest = $http({
            method: "POST",
            url: "php/assignStudentSubjects.php",
            data: {
                "semId": $rootScope.currentSemId,
                "sidList" : subjectSid,
                "subjectList": assignmentSubjectCodes
            },
            header: { 'Content-Type': 'application/x-www-form-urlencoded' }
         });
    };



}]);

