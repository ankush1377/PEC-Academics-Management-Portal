'use strict';

pamp.controller('studentCtrl',['$scope','$rootScope','$location','$route','$http',function($scope,$rootScope,$location,$route,$http){

	
	$scope.notEnrolled = false;
	$scope.getEnrolledSubjects = function( sid, semId) {
		
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
//			console.log("response received");
			if (response.data.records != "0") {
//				console.log(response.data.records);
				$scope.enrolledSubjectList = response.data.records;
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
	$scope.getRelativeMarks = function (semId, subjectCode){

		var relativeMarksData = {
			"semId": semId,
			"subjectCode": subjectCode
		};
		console.log(relativeMarksData);

/*
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
*/
	};



	$scope.getEnrolledSubjects ($rootScope.userId, $rootScope.currentSemId);
/*	$scope.getRelativeMarks ($rootScope.currentSemId, $scope.enrolledSubjectList[0]['subCode']);

	

			*/
	
 /*	var studentMarksData ={
 		"sid": $rootScope.userId,
 		"semId": $rootScope.currentSemId,
 		"subjectCode": $scope.
 	};*/
// 	console.log(data);
		
// 	var enrolledSubjectRequest = $http({
// 		method: "GET",
// 		url: "php/fetchStudentSubjects.php",
// 		data: myPerformanceData
// 	});

// 	enrolledSubjectRequest.then(function(response) {
// 		console.log("response received");
// 		if(response.data.records != "0"){
// 			console.log(response.data.records);
// 			$scope.enrolledSubjectList = response.data.records;
// 		}
// 		else if(response.data.records == "0"){
// 			console.log(response.data.records);
// 			//no records found	
// 		}
// 	});

//	var relativePerformanceData = {
// 		"sid": $rootScope.userId,
// 		"semId": $rootScope.currentSemId,
// 		"subjectCode": $scope.
// 	};
	
	
	$scope.setMyPerformance = function(semCode) {
		
	}
 
	
	
	$scope.logout = function(){
		
	
	};
	
	
  

}]);