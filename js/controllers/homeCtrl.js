'use strict';

pamp.controller('homeCtrl',['$scope','$rootScope','$location','$route','$window','$http',function($scope,$rootScope,$location,$route,$window,$http){

    $scope.incomplete = false;
	$scope.fail = false;
 	$scope.username = "";
 	$scope.password = "";
	$scope.accessList =[ 
		"Admin",
		"Teacher",
 		"Moderator",
		"Student"
	];


	$scope.login = function() {

	    if($scope.username == "" || $scope.password == "" || $scope.access==null){
            $scope.incomplete = true;
            $scope.fail = false;
            return;
	    }

		$scope.incomplete = false;
		var data ={
    	    "username": $scope.username,
    	    "password": $scope.password,
            "access": $scope.access
    	};

//    	console.log(data);
	
		var request = $http({
			method: "POST",
			url: "php/login.php",
			data: data
		});

//		console.log(request);
        
		request.then(function(response) {

//		    console.log("response received");

			if(response.data.records != "0"){
//			    console.log(response.data.records);
				$rootScope.userData = response.data.records;
				$rootScope.userId = $scope.username;
				$rootScope.userAccess = $scope.access;
				$location.path("/"+$scope.access.toLowerCase());
			}
			else if(response.data.records == "0"){
//                console.log(response.data.records);
                $scope.fail = true;
				$scope.clearForm();
			}
		});
	};
	
	
	$scope.clearForm = function() {
		$scope.username = '';
		$scope.password = '';
		$scope.access = null;
	}
	
	
}]);

