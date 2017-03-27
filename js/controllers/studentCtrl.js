'use strict';

pamp.controller('studentCtrl',['$scope','$rootScope','$location','$route','$http',function($scope,$rootScope,$location,$route,$http){


	$scope.notEnrolled = false;
	var initial = 0;
	$scope.getSubjectWeightages = function (semId, subjectCode){
//        console.log("getRelativeMarks");
    	var subjectWeightagesData = {
    		"semId": semId,
    		"subjectCode": subjectCode
    	};
//    	console.log(relativeMarksData);

    	var subjectWeightagesRequest = $http({
    	    method: "POST",
    		url: "php/fetchSubjectWeightages.php",
    		data: subjectWeightagesData
    	});

    	subjectWeightagesRequest.then( function(response) {
//    		console.log("response received");
    		if (response.data.records != "0") {
    			$scope.subjectWeightages = response.data.records;
    			console.log($scope.subjectWeightages[0].quiz1);
    		}
    		else if (response.data.records == "0") {
//    			console.log(response.data.records);
    			//no records found
    		}
    		else {

    	    }
        });
//        console.log("getRelativeMarksEnds");
    };
	$scope.getSubjectMarks = function (semId, subjectCode){
//        console.log("getRelativeMarks");
    	var subjectMarksData = {
    		"semId": semId,
    		"subjectCode": subjectCode
    	};
//    	console.log(relativeMarksData);

    	var subjectMarksRequest = $http({
    	    method: "POST",
    		url: "php/fetchSubjectMarks.php",
    		data: subjectMarksData
    	});

    	subjectMarksRequest.then( function(response) {
//    		console.log("response received");
    		if (response.data.records != "0") {
    			$scope.subjectMarks = response.data.records;
//    			console.log($scope.normalizedRelativeMarksList);
    		}
    		else if (response.data.records == "0") {
//    			console.log(response.data.records);
    			//no records found
    		}
    		else {

    	    }
        });
//        console.log("getRelativeMarksEnds");
    };
	$scope.getRelativeMarks = function (semId, subjectCode){
//        console.log("getRelativeMarks");
    	var relativeMarksData = {
    		"semId": semId,
    		"subjectCode": subjectCode
    	};
//    	console.log(relativeMarksData);

    	var relativeMarksRequest = $http({
    	    method: "POST",
    		url: "php/fetchRelativeMarks.php",
    		data: relativeMarksData
    	});

    	relativeMarksRequest.then( function(response) {
//    		console.log("response received");
    		if (response.data.records != "0") {
    			$scope.normalizedRelativeMarksList = response.data.records;
    			$scope.getSubjectWeightages(semId, subjectCode);
    		}
    		else if (response.data.records == "0") {
//    			console.log(response.data.records);
    			//no records found
    		}
    		else {

    	    }
        });
//        console.log("getRelativeMarksEnds");
    };
	$scope.getEnrolledSubjects = function( sid, semId) {
//		console.log("getEnrolledSubjects");

		var enrolledSubjectData = {
			"sid": sid,
			"semId": semId
		};
//		console.log(enrolledSubjectData);
		
		var enrolledSubjectRequest = $http({
			method: "POST",
			url: "php/fetchStudentSubjects.php",
			data: enrolledSubjectData
		});
//      console.log(enrolledSubjectRequest);

		enrolledSubjectRequest.then( function(response) {
//			console.log(response.data);
			if (response.data.records != "0") {
				$scope.enrolledSubjectList_profile = response.data.records;
				if(initial == 0){
				    $scope.enrolledSubjectList_relative = response.data.records;
				    $scope.getRelativeMarks($rootScope.currentSemId, $scope.enrolledSubjectList_relative[0]['subCode']);
				}
				initial++;
			}
			else if (response.data.records == "0") {
//				console.log(response.data.records);
				$scope.notEnrolled = true;
				//no records found	
			}
			else {
				
			}

		});
//		console.log("getEnrolledSubjectsEnds");
	};
    $scope.updateSubjectList = function (sid, semId){
//        console.log("updateSubjectList");
		var updateSubjectData = {
			"sid": sid,
			"semId": semId
		};
//		console.log(updateSubjectData);

		var updateSubjectRequest = $http({
			method: "POST",
			url: "php/fetchStudentSubjects.php",
			data: updateSubjectData
		});
//      console.log(updateSubjectRequest);

		updateSubjectRequest.then( function(response) {
			if (response.data.records != "0") {
				$scope.enrolledSubjectList_relative = response.data.records;
//				$scope.getRelativeMarks ($rootScope.currentSemId, $scope.enrolledSubjectList[0]['subCode']);
			}
			else if (response.data.records == "0") {
//				console.log(response.data.records);
				$scope.enrolledSubjectList_relative = '';
				//no records found
			}
			else {

			}
		});
//		console.log("updateSubjectListEnds");
    };
    $scope.setMyPerformance = function(sid, semCode) {

		var myPerformanceData = {
			"sid": sid,
			"semCode": semCode
		};
//		console.log(myPerformanceData);

		var myPerformanceRequest = $http({
			method: "POST",
			url: "php/fetchStudentMarks.php",
			data: myPerformanceData
		});
//      console.log(myPerformanceRequest);

		myPerformanceRequest.then( function(response) {
//			console.log(response.data);
			if (response.data.records != "0") {
			    $scope.studentPersonalMarks = response.data.records;
			    $scope.getSubjectMarks(sid, semCode);
			    var subNames = [];
			    //var i=0;
			    for(var item in $scope.studentPersonalMarks)
			        subNames.push(item);
			    for(var i=0;i<subNames.length;i++){
			        $scope.studentPersonalMarks[subNames[i]].subName = subNames[i];
			    }
			    console.log($scope.studentPersonalMarks);
			}
			else if (response.data.records == "0") {
				$scope.studentPersonalMarks = "";
				//no records found
			}
			else {

			}
		});
    };

    $scope.getEnrolledSubjects ($rootScope.userId, $rootScope.currentSemId);
    $scope.setMyPerformance($rootScope.userId, $rootScope.currentSemId);

}]);
