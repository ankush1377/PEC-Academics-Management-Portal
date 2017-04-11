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
				$scope.assignedSubjectList_plan = response.data.records;
				$scope.assignedSubjectList_assign = response.data.records;
//				console.log($scope.assignedSubjectList_assign);
				$scope.getSubjectMarks($rootScope.currentSemId, $scope.assignedSubjectList_assign[0].subCode);
				$scope.setAssignMarks($scope.assignedSubjectList_assign[0]);
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

	$scope.getSubjectMarks = function (semId, subjectCode){
        	var subjectMarksData = {
        		"semId": semId,
        		"subjectCode": subjectCode
        	};

        	var subjectMarksRequest = $http({
        	    method: "POST",
        		url: "php/fetchSubjectMarks.php",
        		data: subjectMarksData
        	});

        	subjectMarksRequest.then( function(response) {
        		if (response.data.records != "0") {
        			$scope.subjectMarks = response.data.records;
//        			console.log($scope.subjectMarks);
        		}
        		else if (response.data.records == "0") {
        		    $scope.subjectMarks = response.data.records;
    //    			console.log(response.data.records);
        			//no records found
        		}
        		else {

        	    }
            });
    };

    $scope.getAssignedSubjects ($rootScope.userId, $rootScope.currentSemId);

    $scope.setAssignMarks = function(selectedSubject){

        $scope.getSubjectMarks($rootScope.currentSemId, selectedSubject.subCode);

        var assignMarksData = {
    			"subCode": selectedSubject.subCode,
    			"semCode": $rootScope.currentSemId,
    			"batchId": selectedSubject.batchId + "_" + $rootScope.userData.dep_code
    		};

//    		console.log(assignMarksData);

    		var assignMarksRequest = $http({
    			method: "POST",
    			url: "php/fetchStudentMarksList.php",
    			data: assignMarksData
    		});

    		assignMarksRequest.then( function(response) {
    			if (response.data.records != "0") {
    			    $scope.studentMarksList = response.data.records;
//    			    console.log($scope.studentMarksList);
    			}
    			else if (response.data.records == "0") {
    				$scope.studentMarksList = response.data.records;
    				//no records found
    			}
    			else {

    			}
    		});
    };

}]);

