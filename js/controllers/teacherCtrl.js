'use strict';

pamp.controller('teacherCtrl',['$scope','$rootScope','$location','$route','$http',function($scope,$rootScope,$location,$route,$http){


	var initial = 0;
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
                if(initial == 0){
				    $scope.assignedSubjectList_plan = response.data.records;
                    $scope.assignedSubjectList_assign = response.data.records;

				}
				initial++;
//				console.log($scope.assignedSubjectList_profile);
			}
			else if (response.data.records == "0") {
//				console.log(response.data.records);
				$scope.assignedSubjectList_plan = response.data.records;
				$scope.assignedSubjectList_assign = response.data.records;
                //no records found
			}
			else {

			}
		});
	};

    $scope.getAssignedSubjects ($rootScope.userId, $rootScope.currentSemId);

}]);

