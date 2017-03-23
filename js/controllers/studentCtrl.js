'use strict';

pamp.controller('studentCtrl',['$scope','$rootScope','$location','$route','$http',function($scope,$rootScope,$location,$route,$http){
	
	var enrolledSubjectData ={
		"sid": $rootScope.userId,
		"semId": $rootScope.currentSemId
	};
	console.log(enrolledSubjectData);
		
	var enrolledSubjectRequest = $http({
		method: "GET",
		url: "php/fetchStudentSubjects.php",
		data: enrolledSubjectData
	});

	enrolledSubjectRequest.then(function(response) {
		console.log("response received");
		if(response.data.records != "0"){
			console.log(response.data.records);
			$scope.enrolledSubjectList = response.data.records;
		}
		else if(response.data.records == "0"){
			console.log(response.data.records);
			//no records found	
		}
	});
	
	
// 	var studentMarksData ={
// 		"sid": $rootScope.userId,
// 		"semId": $rootScope.currentSemId,
// 		"subjectCode": $scope.
// 	};
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
 
	
	
	$scope.logout = function(){
		
	
	};
	
	
  

}]);

