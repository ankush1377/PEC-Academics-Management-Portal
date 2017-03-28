'use strict';

pamp.controller('teacherCtrl',['$scope','$rootScope','$location','$route','$http',function($scope,$rootScope,$location,$route,$http){


	$scope.getAssignedSubjects = function( tid, semId) {
		var assignedSubjectData = {
			"tid": tid,
			"semId": semId
		};

		var assignedSubjectRequest = $http({
			method: "POST",
			url: "php/fetchTeacherSubjects.php",
			data: assignedSubjectData
		});

		assignedSubjectRequest.then( function(response) {
			if (response.data.records != "0") {
				$scope.assignedSubjectList_profile = response.data.records;
//				console.log($scope.assignedSubjectList_profile);
			}
			else if (response.data.records == "0") {
//				console.log(response.data.records);
				$scope.assignedSubjectList_profile = response.data.records;
				//no records found
			}
			else {

			}
		});
	};

    $scope.getAssignedSubjects ($rootScope.userId, $rootScope.currentSemId);

}]);

