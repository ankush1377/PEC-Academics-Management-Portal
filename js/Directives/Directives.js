//Directive for adding buttons on click that show an alert on click
pamp.directive("addassignsubjectsfield", function($compile){
	return function(scope, element, attrs){
		element.bind("click", function(){
		    scope.count++;
			angular.element(document.getElementById('space-for-dropdowns')).append($compile(
			'<div class="modalDropdownList">' +
                                    '<div class="modalDropdown">'+
                                        '<div class="form-group">'+
                                            '<select class="form-control" ng-options="subject.name for subject in depSubjectList"  ng-model="s'+scope.count+ '" ng-change="selectedSubject_t(s'+scope.count+','+scope.count+')">'+
                                                '<option selected="true" disabled="disabled" label="Select Subject"></option>'+
                                            '</select>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="modalDropdown">'+
                                        '<div class="form-group">'+
                                            '<select class="form-control" ng-options="batch for batch in batchList"  ng-model="b'+scope.count+ '" ng-change="selectedBatch_t(b'+scope.count+','+scope.count+')">'+
                                                '<option selected="true" disabled="disabled" label="Select Batch"></option>'+
                                            '</select>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'
			)(scope));
		});
	};
});