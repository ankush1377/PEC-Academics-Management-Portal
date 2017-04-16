'use strict';

pamp.controller('moderatorCtrl',['$scope','$rootScope','$location','$route','$http',function($scope,$rootScope,$location,$route,$http){

    $scope.pendingRequests = [];
    $scope.approvedRequests = [];
    $scope.noPendingRequests = false;
    $scope.noApprovedRequests = false;

    $scope.getModerationRequests = function (semId){
    	var moderationRequestData = {
    		"semId": semId
    	};

    	var moderationRequest = $http({
    	    method: "POST",
    		url: "php/fetchModerationRequests.php",
    		data: moderationRequestData
    	});

    	moderationRequest.then( function(response) {
    		if (response.data.records != "0") {
    			var moderationRequestList = response.data.records;
    			for(var i=0;i<moderationRequestList.length;i++){
                    if(moderationRequestList[i].moderationInfo.status == '0')
                       $scope.pendingRequests.push(moderationRequestList[i]);
                    else
                       $scope.approvedRequests.push(moderationRequestList[i]);
    			}

    	        if($scope.pendingRequests.length == 0)
                    $scope.noPendingRequests = true;

                if($scope.approvedRequests.length == 0)
                    $scope.noApprovedRequests = true;

    		}
    		else if (response.data.records == "0") {
    		    $scope.moderationRequestList = response.data.records;
//    			console.log(response.data.records);
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

    $scope.setAssignMarks = function(selectedSubjectCode){

        $scope.getSubjectMarks($rootScope.currentSemId, selectedSubjectCode);

        var assignMarksData = {
    			"subCode": selectedSubjectCode,
    			"semCode": $rootScope.currentSemId,
    		};

    		var assignMarksRequest = $http({
    			method: "POST",
    			url: "php/fetchModerationMarksList.php",
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

        console.log(saveMarksData);
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

    $scope.approve = function(subCode){
    	var approvalData = {
    		"semId": $rootScope.currentSemId,
    		"subCode": subCode
    	};

    	var approvalRequest = $http({
    	    method: "POST",
    		url: "php/approveModerationRequest.php",
    		data: approvalData
    	});

    	approvalRequest.then( function(response) {
    		if (response.data != "") {
                console.log(response.data);
                $scope.saveMarks();
                $scope.getModerationRequests($rootScope.currentSemId);
       		}
        });

    };

    $scope.getModerationRequests($rootScope.currentSemId);


}]);

