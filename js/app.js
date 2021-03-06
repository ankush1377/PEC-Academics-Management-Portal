'use strict'

var pamp = angular.module('pamp',['ngRoute']);

pamp.config(function($routeProvider) {

      $routeProvider
      .when("/home", {
        controller:"homeCtrl",
        templateUrl : "partials/home.html"
      })
      .when("/student", {
        controller:"studentCtrl",
        templateUrl : "partials/student.html",
      })
      .when("/teacher", {
        controller:"teacherCtrl",
        templateUrl : "partials/teacher.html",
      })
      .when("/admin", {
        controller:"adminCtrl",
        templateUrl : "partials/admin.html",
      })
      .when("/moderator", {
          controller:"moderatorCtrl",
          templateUrl : "partials/moderator.html",
        })
      .otherwise({
        redirectTo:"/home"
      });

});

pamp.run(['$location', '$rootScope', '$http', function ($location, $rootScope, $http) {
  
      $rootScope.semList = ["1617-2","1718-1"];
      $rootScope.batchList_ug = ["2014-18","2015-19","2016-20","2017-21"];
      $rootScope.batchList_pg = ["2014-16","2015-17","2016-18","2017-19",];
      $rootScope.batchList = ["2014-18","2015-19","2016-20","2017-21","2014-16","2015-17","2016-18","2017-19",];
      $rootScope.programmeList = ["Undergraduate","Postgraduate"];
      $rootScope.currentSemId = "1617-2";


      $rootScope.logout = function (){
            $rootScope.userId = "";
            $rootScope.userData = "";
            $rootScope.userAccess = "";
            $location.path("/home");
      };
  
}]);
