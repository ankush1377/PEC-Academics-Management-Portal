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
    }

    $scope.getModerationRequests($rootScope.currentSemId);


}]);

