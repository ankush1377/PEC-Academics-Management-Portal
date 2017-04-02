'use strict';

pamp.controller('adminCtrl',['$scope','$rootScope','$location','$route','$http',function($scope,$rootScope,$location,$route,$http){

    $scope.incomplete = false;
    $scope.studentView = [];
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

    $scope.getBatches();
    $scope.getStudents();

    $scope.addStudent = function(){

        if( $scope.sid == undefined || $scope.sName == undefined || $scope.sDob == undefined || $scope.sFatherName == undefined || $scope.sGender == undefined ||$scope.sMotherName == undefined || $scope.sBatch == undefined ){
            $scope.incomplete = true;
            return;
        }

        $scope.incomplete = false;
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
                password: 'abcd'
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

}]);

