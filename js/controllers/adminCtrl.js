'use strict';

pamp.controller('adminCtrl',['$scope','$rootScope','$location','$route','$http',function($scope,$rootScope,$location,$route,$http){


    /***************MANAGE STUDENTS************/
    $scope.incomplete_s = false;
    $scope.studentView = [];
    $scope.cannotAssign = false;
    $scope.selectedStudents = [];
    $scope.assignmentSubjects = [];
    $scope.batchList_add = [];
    $scope.batchList_edit = [];

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
    		    $scope.studentList = response.data.records;
//    			console.log(response.data.records);
    			//no records found
    		}
    		else {

    	    }
        });
    };
    $scope.getSubjects = function (){

        	var subjectRequest = $http({
        	    method: "POST",
        		url: "php/fetchSubjects.php"
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

    $scope.getStudents();
    $scope.getSubjects();

    $scope.addStudent = function(){

        if( $scope.sid == undefined || $scope.sName == undefined || $scope.sDob == undefined || $scope.sFatherName == undefined || $scope.sGender == undefined ||$scope.sMotherName == undefined || $scope.sBatch == undefined || $scope.sProgramme == undefined ){
            $scope.incomplete_s = true;
            return;
        }

        $scope.incomplete_s = false;
        var pw = randomPassword(8);
        var date = new Date($scope.sDob);
        date.setMinutes( date.getMinutes() + 480 );
        console.log(date);
        var addStudentRequest = $http({
            method: "POST",
            url: "php/addStudent.php",
            data: {
                sid: $scope.sid,
                name: $scope.sName,
                dob: date,
                gender: $scope.sGender,
                fatherName: $scope.sFatherName,
                motherName: $scope.sMotherName,
                batchId: $scope.sBatch + "_" + $rootScope.userData['dep_code'],
                programme: $scope.sProgramme,
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
        $scope.sProgramme = undefined;
        $scope.sBatch = undefined;
        $scope.batchList_add = [];
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
                    dob: new Date(studentData.dob),
                    gender: studentData.gender,
                    fatherName: studentData.father_name,
                    motherName: studentData.mother_name,
                    batchId: studentData.batch_id,
                    depCode: $rootScope.userData['dep_code'],
                    programme: studentData.programme,
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

    $scope.setBatches_add = function(programme){
        if(programme == 'Undergraduate'){
            $scope.batchList_add = $rootScope.batchList_ug;
        }
        else if(programme == 'Postgraduate'){
            $scope.batchList_add = $rootScope.batchList_pg;
        }
    };

    $scope.setBatches_edit = function(programme){
            if(programme == 'Undergraduate'){
                $scope.batchList_edit = $rootScope.batchList_ug;
            }
            else if(programme == 'Postgraduate'){
                $scope.batchList_edit = $rootScope.batchList_pg;
            }
        };


    /***************MANAGE TEACHERS************/

    var currentTeacher;
    $scope.count = 0;
    $scope.incomplete_t = false;
    $scope.teacherView = [];
    $scope.cannotAssign_t = false;
    $scope.selectedTeachers = [];
    $scope.assignmentSubjects_t = [];
    $scope.assignmentBatches_t = [];
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
        		url: "php/fetchDepSubjects.php",
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
    };

    $scope.saveTeacher = function(teacherData, index){

//        console.log(studentData);
        $scope.teacherView[index] = true;
        var updateTeacherRequest = $http({
                method: "POST",
                url: "php/updateTeacherInfo.php",
                data: {
                    tid: teacherData.tid,
                    name: teacherData.name,
                    dob: teacherData.dob,
                    gender: teacherData.gender,
                    fatherName: teacherData.father_name,
                    motherName: teacherData.mother_name,
                    depCode: $rootScope.userData['dep_code'],
                    password: teacherData.password
                },
                header: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
    };

    $scope.selectedSubject_t = function(subject, index){
        $scope.assignmentSubjects_t[index] = subject.subject_code;
//        console.log($scope.assignmentSubjects_t);
    };

    $scope.selectedBatch_t = function(batch, index){
        $scope.assignmentBatches_t[index] = batch + "_" + $rootScope.userData.dep_code;
//            console.log($scope.assignmentBatches_t);
    };

     $scope.setTeacherId = function(tid){
        currentTeacher = tid;
//        console.log(currentTeacher);
     };

    $scope.assignSubjects_t = function(){

//        console.log(currentTeacher);
//        console.log($rootScope.currentSemId);
//        console.log($scope.assignmentBatches_t);
//        console.log($scope.assignmentSubjects_t);

        var assignTeacherSubjectsRequest = $http({
                method: "POST",
                url: "php/assignTeacherSubjects.php",
                data: {
                        "tid": currentTeacher,
                        "semId": $rootScope.currentSemId,
                        "batchList" : $scope.assignmentBatches_t,
                        "subjectList": $scope.assignmentSubjects_t
                },
                header: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    };



}]);