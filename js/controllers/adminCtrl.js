'use strict';

pamp.controller('adminCtrl',['$scope','$rootScope','$location','$route','$http',function($scope,$rootScope,$location,$route,$http){


    /***************MANAGE STUDENTS************/
    $scope.incomplete = false;
    $scope.studentView = [];
    $scope.cannotAssign = false;
    $scope.selectedStudents = [];
    $scope.assignmentSubjects = [];
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
            "depCode": $rootScope.userData['dep_code']
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
                batchId: $scope.sBatch + "_" + $rootScope.userData['dep_code'],
                depCode: $rootScope.userData['dep_code'],
                password: pw
            },
            header: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        addStudentRequest.then( function(response) {
            $scope.getStudents();
            $scope.clearStudentData();
        });
    };

    $scope.editStudent = function(index){

        $scope.studentView[index] = false;
//        console.log($scope.studentEdit);
    };

    $scope.clearStudentData = function(){
        $scope.sid = undefined;
        $scope.sName = undefined;
        $scope.sDob = undefined;
        $scope.sFatherName = undefined;
        $scope.sMotherName = undefined;
        $scope.sGender = undefined;
        $scope.sBatch = undefined;
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
                    depCode: $rootScope.userData['dep_code'],
                    password: studentData.password
                },
                header: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
    };

    $scope.assignSubjects = function(){

        if($scope.selectedStudents.length == 0 || $scope.assignmentSubjects.length == 0){
            $scope.cannotAssign = true;
            return;
        }

        $scope.cannotAssign = false;
        $scope.subjectSid = [];
        for(var i=0;i<$scope.selectedStudents.length;i++){
            if($scope.selectedStudents[i] == true){
                $scope.subjectSid.push($scope.studentList[i].sid);
            }
        }

        var assignmentSubjectCodes = [];
        var empty = true;
        for(var i=0;i<$scope.assignmentSubjects.length;i++){
            empty = false;
            assignmentSubjectCodes.push($scope.assignmentSubjects[i].subject_code);
        }

         var assignStudentSubjectsRequest = $http({
            method: "POST",
            url: "php/assignStudentSubjects.php",
            data: {
                "semId": $rootScope.currentSemId,
                "sidList" : $scope.subjectSid,
                "subjectList": assignmentSubjectCodes
            },
            header: { 'Content-Type': 'application/x-www-form-urlencoded' }
         });

         $scope.assignmentSubjects.length = 0;
    };


    /***************MANAGE TEACHERS************/

    $scope.incomplete_t = false;
    $scope.teacherView = [];
    $scope.cannotAssign_t = false;
    $scope.selectedTeachers = [];
    $scope.assignmentSubjects_t = [];
    $scope.getTeachers = function (){

        var teacherData ={
            "depCode": $rootScope.userData['dep_code']
        };

    	var teachersRequest = $http({
    	    method: "POST",
    		url: "php/fetchTeachers.php",
    		data: teacherData
    	});

    	teachersRequest.then( function(response) {
    		if (response.data.records != "0") {
    			$scope.teacherList = response.data.records;
                for(var i=0;i<$scope.teacherList.length;i++){
                    $scope.teacherView.push(true);
                    $scope.selectedTeachers.push(false);
                    $scope.teacherList[i].batch = $scope.teacherList[i].batch_id.slice(0, $scope.teacherList[i].batch_id.indexOf('_'));
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
    $scope.getDepSubjects = function (){

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
        			$scope.depSubjectList = response.data.records;
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


    $scope.getTeachers();
    $scope.getDepSubjects();

    $scope.addTeacher = function(){

        if( $scope.tid == undefined || $scope.tName == undefined || $scope.tDob == undefined || $scope.tFatherName == undefined || $scope.tGender == undefined ||$scope.tMotherName == undefined ){
            $scope.incomplete_t = true;
            return;
        }

        $scope.incomplete_t = false;
        var pw = randomPassword(8);
        var addTeacherRequest = $http({
            method: "POST",
            url: "php/addTeacher.php",
            data: {
                tid: $scope.tid,
                name: $scope.tName,
                dob: $scope.tDob,
                gender: $scope.tGender,
                fatherName: $scope.tFatherName,
                motherName: $scope.tMotherName,
                depCode: $rootScope.userData['dep_code'],
                password: pw
            },
            header: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        addTeacherRequest.then( function(response) {
            $scope.getTeachers();
            $scope.clearTeacherData();
        });
    };

    $scope.editTeacher = function(index){

        $scope.teacherView[index] = false;
//        console.log($scope.studentEdit);
    };

    $scope.clearTeacherData = function(){
        $scope.tid = undefined;
        $scope.tName = undefined;
        $scope.tDob = undefined;
        $scope.tFatherName = undefined;
        $scope.tMotherName = undefined;
        $scope.tGender = undefined;
        $scope.tBatch = undefined;
    };

    $scope.saveTeacher = function(teacherData, index){

//        console.log(studentData);
        $scope.teacherView[index] = true;
        var updateTeacherRequest = $http({
                method: "POST",
                url: "php/updateTeacherInfo.php",
                data: {
                    sid: teacherData.sid,
                    name: teacherData.name,
                    dob: teacherData.dob,
                    gender: teacherData.gender,
                    fatherName: teacherData.father_name,
                    motherName: teacherData.mother_name,
                    batchId: teacherData.batch_id,
                    depCode: $rootScope.userData['dep_code'],
                    password: teacherData.password
                },
                header: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
    };

    $scope.assignSubjects_t = function(){

        if($scope.selectedTeacher.length == 0 || $scope.assignmentSubjects_t.length == 0){
            $scope.cannotAssign_t = true;
            return;
        }

        $scope.cannotAssign_t = false;
        $scope.subjectTid = [];
        for(var i=0;i<$scope.selectedTeachers.length;i++){
            if($scope.selectedTeachers[i] == true){
                $scope.subjectTid.push($scope.teacherList[i].sid);
            }
        }

        var assignmentSubjectCodes_t = [];
        var empty_t = true;
        for(var i=0;i<$scope.assignmentSubjects_t.length;i++){
            empty = false;
            assignmentSubjectCodes.push($scope.assignmentSubjects[i].subject_code);
        }

         var assignStudentSubjectsRequest = $http({
            method: "POST",
            url: "php/assignStudentSubjects.php",
            data: {
                "semId": $rootScope.currentSemId,
                "sidList" : $scope.subjectSid,
                "subjectList": assignmentSubjectCodes
            },
            header: { 'Content-Type': 'application/x-www-form-urlencoded' }
         });

         $scope.assignmentSubjects.length = 0;
    };


}]);