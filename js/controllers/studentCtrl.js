'use strict';

pamp.controller('studentCtrl',['$scope','$rootScope','$location','$route','$http',function($scope,$rootScope,$location,$route,$http){


	
	$scope.notEnrolled = false;
	$scope.enrolledSubjectList_profile = "";
	$scope.getRelativeMarks = function (semId, subjectCode){
        console.log("getRelativeMarks");
    	var relativeMarksData = {
    		"semId": semId,
    		"subjectCode": subjectCode
    	};
    	console.log(relativeMarksData);

    	var relativeMarksRequest = $http({
    	    method: "POST",
    		url: "php/fetchRelativeMarks.php",
    		data: relativeMarksData
    	});

    	relativeMarksRequest.then( function(response) {
    		console.log("response received");
    		if (response.data.records != "0") {
    			console.log(response.data.records);
    			$scope.relativeMarksList = response.data.records;
    		}
    		else if (response.data.records == "0") {
    			console.log(response.data.records);
    			//no records found
    		}
    		else {

    	    }
        });
        console.log("getRelativeMarksEnds");
    };
	$scope.getEnrolledSubjects = function( sid, semId) {
		console.log("getEnrolledSubjects");
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
//				console.log(response.data.records);
				$scope.enrolledSubjectList_profile = response.data.records;
				$scope.enrolledSubjectList_relative = $scope.enrolledSubjectList_profile;
//				$scope.getRelativeMarks ($rootScope.currentSemId, $scope.enrolledSubjectList[0]['subCode']);
			}
			else if (response.data.records == "0") {
//				console.log(response.data.records);
				$scope.notEnrolled = true;
				//no records found	
			}
			else {
				
			}
		});
		console.log("getEnrolledSubjectsEnds");
	};
    $scope.updateSubjectList = function (sid, semId){
        console.log("updateSubjectList");
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
//				console.log(response.data.records);
				$scope.enrolledSubjectList_relative = response.data.records;
//				$scope.getRelativeMarks ($rootScope.currentSemId, $scope.enrolledSubjectList[0]['subCode']);
			}
			else if (response.data.records == "0") {
//				console.log(response.data.records);
				$scope.notEnrolled = true;
				$scope.enrolledSubjectList_relative = '';
				//no records found
			}
			else {

			}
		});
		console.log("updateSubjectListEnds");
    };
    $scope.getSubjectWeightage = function (semId, subjectCode){
            console.log("getSubjectWeightage");
        	var subjectWeightageData = {
        		"semId": semId,
        		"subjectCode": subjectCode
        	};
        	console.log(subjectWeightageData);

        	var subjectWeightageRequest = $http({
        	    method: "POST",
        		url: "php/fetchSubjectWeightages.php",
        		data: subjectWeightageData
        	});

        	subjectWeightageRequest.then( function(response) {
        		console.log("response received");
        		if (response.data.records != "0") {
        			console.log(response.data.records);
                    
//        			$scope.relativeMarksList = response.data.records;
        		}
        		else if (response.data.records == "0") {
        			console.log(response.data.records);
        			//no records found
        		}
        		else {

        	    }
            });
            console.log("getSubjectWeightageEnds");
        };


	$scope.getEnrolledSubjects ($rootScope.userId, $rootScope.currentSemId);
//  console.log($scope.enrolledSubjectList_profile);

	
	$scope.setMyPerformance = function(semCode) {
		
	}

}]);
