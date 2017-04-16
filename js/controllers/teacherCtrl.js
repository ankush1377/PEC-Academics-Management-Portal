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
				$scope.getSubjectMarks($rootScope.currentSemId, $scope.assignedSubjectList_assign[0].subCode, 0);
				$scope.getSubjectMarks($rootScope.currentSemId, $scope.assignedSubjectList_assign[0].subCode, 1);
				$scope.setAssignMarks($scope.assignedSubjectList_assign[0]);
				$scope.setPlanSemester($scope.assignedSubjectList_plan[0]);
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

	$scope.getSubjectMarks = function (semId, subjectCode, flag){   // flag = 1 for assign, 0 for plan
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
        		    if(flag == 0)
        			    $scope.subjectMarks_plan = response.data.records;
        		    else if(flag == 1)
        			    $scope.subjectMarks_assign = response.data.records;
                    //
//        			console.log($scope.subjectMarks);
        		}
        		else if (response.data.records == "0") {
        		    $scope.subjectMarks_plan = response.data.records;
        		    $scope.subjectMarks_assign = response.data.records;
    //    			console.log(response.data.records);
        			//no records found
        		}
        		else {

        	    }
            });
    };

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
//    			console.log($scope.subjectWeightages);
    		}
    		else if (response.data.records == "0") {
//    			console.log(response.data.records);
    			//no records found
    		}
    		else {

    	    }
        });
    };

    $scope.getAssignedSubjects ($rootScope.userId, $rootScope.currentSemId);

    $scope.setAssignMarks = function(selectedSubject){

        $scope.getSubjectMarks($rootScope.currentSemId, selectedSubject.subCode, 1);

        var assignMarksData = {
    			"subCode": selectedSubject.subCode,
    			"semCode": $rootScope.currentSemId,
    			"batchId": selectedSubject.batchId + "_" + $rootScope.userData.dep_code
    		};


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

    $scope.saveMarks = function(){

        var dataList = [];
//        console.log($scope.studentMarksList);
        for(var i=0;i<$scope.studentMarksList.length;i++){
            dataList.push($scope.studentMarksList[i].studentMarks);
        }

        var saveMarksData ={
            "dataList": dataList
        };

 //       console.log(saveMarksData);
        var saveMarksRequest = $http({
        	    method: "POST",
        		url: "php/assignStudentMarks.php",
        		data: saveMarksData
        	});

        /*saveMarksRequest.then( function(response) {
    		if (response.data.records != "0") {
    		    console.log(response.data);
    		}
    		else {
    		}
    	});*/
    };


    $scope.setPlanSemester = function(selectedSubject){

        $scope.getSubjectMarks($rootScope.currentSemId, selectedSubject.subCode, 0);
        $scope.getSubjectWeightages($rootScope.currentSemId, selectedSubject.subCode);

    };

    $scope.saveSemesterPlan = function(){

        var saveSemesterPlanData ={
            "marksList": $scope.subjectMarks_plan,
            "weightageList": $scope.subjectWeightages[0]
        };

        console.log(saveSemesterPlanData);
        var saveSemesterPlanRequest = $http({
        	    method: "POST",
        		url: "php/assignSubjectPlan.php",
        		data: saveSemesterPlanData
        	});

        saveSemesterPlanRequest.then( function(response) {
    		if (response.data.records != "") {
    		    console.log(response.data);
    		}
    	});
        $scope.setAssignMarks($scope.assignedSubjectList_assign[0]);

    };



    $scope.requestModeration = function(selectedSubject){

            var assignMarksData = {
     			"subCode": selectedSubject.subCode,
     			"semCode": $rootScope.currentSemId,
     			"batchId": selectedSubject.batchId + "_" + $rootScope.userData.dep_code
     		};


     		var assignMarksRequest = $http({
     			method: "POST",
     			url: "php/fetchStudentMarksList.php",
     			data: assignMarksData
     		});

     		assignMarksRequest.then( function(response) {
     			if (response.data.records != "0") {
     			    $scope.studentMarksList_moderation = response.data.records;

     	            var allGradesAssigned = true;
                    for(var i=0;i<$scope.studentMarksList_moderation.length;i++){
                        console.log($scope.studentMarksList_moderation[i].studentMarks.grade)
                        if($scope.studentMarksList_moderation[i].studentMarks.grade == null || $scope.studentMarksList_moderation[i].studentMarks.grade == ""){
                            allGradesAssigned = false;
                            break;
                        }
                    }

                    if(allGradesAssigned){
                            var moderationRequestData = {
                     			"subCode": selectedSubject.subCode,
                     			"semCode": $rootScope.currentSemId,
                     			"tid": $rootScope.userId
                     		};


                     		var moderationRequest = $http({
                     			method: "POST",
                     			url: "php/setModerationRequest.php",
                     			data: moderationRequestData
                     		});

                     		moderationRequest.then( function(response) {
                     			if (response.data != "") {
                                    console.log(response.data);
                                }
                            });
 //    			    console.log($scope.studentMarksList);
     			    }
     			}
     			else if (response.data.records == "0") {
     				$scope.studentMarksList_moderation = response.data.records;
     				//no records found
     			}
     			else {

     			}
     		});
    };


}]);

