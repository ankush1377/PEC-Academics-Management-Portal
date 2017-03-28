'use strict';

pamp.controller('studentCtrl',['$scope','$rootScope','$location','$route','$http',function($scope,$rootScope,$location,$route,$http){


	$scope.notEnrolled = false;
	var initial = 0;
	$scope.getSubjectWeightages = function (semId, subjectCode){
    	var subjectWeightagesData = {
    		"semId": semId,
    		"subjectCode": subjectCode
    	};

    	var subjectWeightagesRequest = $http({
    	    method: "POST",
    		url: "php/fetchSubjectWeightages.php",
    		data: subjectWeightagesData
    	});

    	subjectWeightagesRequest.then( function(response) {
    		if (response.data.records != "0") {
    			$scope.subjectWeightages = response.data.records;
//    			console.log($scope.subjectWeightages[0].quiz1);
    		}
    		else if (response.data.records == "0") {
//    			console.log(response.data.records);
    			//no records found
    		}
    		else {

    	    }
        });
    };
	$scope.getRelativeMarks = function (semId, subjectCode){
    	var relativeMarksData = {
    		"semId": semId,
    		"subjectCode": subjectCode
    	};

    	var relativeMarksRequest = $http({
    	    method: "POST",
    		url: "php/fetchRelativeMarks.php",
    		data: relativeMarksData
    	});

    	relativeMarksRequest.then( function(response) {
   		if (response.data.records != "0") {
    			$scope.normalizedRelativeMarksList = response.data.records;
    			$scope.getSubjectWeightages(semId, subjectCode);
    		}
    		else if (response.data.records == "0") {
    		    $scope.normalizedRelativeMarksList = response.data.records;
//    			console.log(response.data.records);
    			//no records found
    		}
    		else {

    	    }
        });
    };
	$scope.getEnrolledSubjects = function( sid, semId) {

		var enrolledSubjectData = {
			"sid": sid,
			"semId": semId
		};

		var enrolledSubjectRequest = $http({
			method: "POST",
			url: "php/fetchStudentSubjects.php",
			data: enrolledSubjectData
		});

		enrolledSubjectRequest.then( function(response) {
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
	};
    $scope.updateSubjectList = function (sid, semId){
		var updateSubjectData = {
			"sid": sid,
			"semId": semId
		};

		var updateSubjectRequest = $http({
			method: "POST",
			url: "php/fetchStudentSubjects.php",
			data: updateSubjectData
		});

		updateSubjectRequest.then( function(response) {
			if (response.data.records != "0") {
				$scope.enrolledSubjectList_relative = response.data.records;
			}
			else if (response.data.records == "0") {
//				console.log(response.data.records);
				$scope.enrolledSubjectList_relative = '';
				//no records found
			}
			else {

			}
		});
    };
    $scope.setMyPerformance = function(sid, semCode) {

		var myPerformanceData = {
			"sid": sid,
			"semCode": semCode
		};

		var myPerformanceRequest = $http({
			method: "POST",
			url: "php/fetchStudentMarks.php",
			data: myPerformanceData
		});

		myPerformanceRequest.then( function(response) {
			if (response.data.records != "0") {
			    $scope.myPerformanceList = response.data.records;
//			    console.log($scope.myPerformanceList);
			}
			else if (response.data.records == "0") {
				$scope.myPerformanceList = response.data.records;
				//no records found
			}
			else {

			}
		});
    };


    $scope.getEnrolledSubjects ($rootScope.userId, $rootScope.currentSemId);
    $scope.setMyPerformance($rootScope.userId, $rootScope.currentSemId);

}]);
