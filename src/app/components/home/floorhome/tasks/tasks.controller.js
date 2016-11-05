export default class TasksController {

	constructor($state, $stateParams, firebaseServices, $q, $scope, $mdDialog) {

		this.$state = $state;
		
		const taskData = firebaseServices.getData(`buildings/${$stateParams.currentBuilding}/floors/${$stateParams.currentFloor}/tasks`);

		$q.all([taskData]).then( (data) => {
			this.tasks = data[0];
			console.log(data);
		});

		$scope.addTask = function(ev){
			console.log($stateParams.currentFloor);
			$mdDialog.show({
		      controller: DialogController,
		      template: require('./addTask.tmpl.html'),
		      parent: angular.element(document.body),
			  controllerAs: 'addTask',
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      locals: {floor: $stateParams.currentFloor, building: $stateParams.currentBuilding}
		    })
		    .then(function(add) {
		    	$scope.status = 'Adding event. Please refresh';

		    }, function() {
		      $scope.status = 'Event add cancelled.';
		    });
		}
		
		//Display Building : Floor
		//Only add to floor
		function DialogController($scope, $mdDialog, floor, building) {
		    $scope.floor = floor;
		    $scope.building = building;

		    $scope.hide = function() {
		      $mdDialog.hide();
		    };

		    $scope.cancel = function() {
		      $mdDialog.cancel();
		    };

		    $scope.save = function(add) {	
		      var jsonObj = {
		      	name: $scope.addTask.name,
		      	description: $scope.addTask.description,
		      	type: $scope.addTask.type,
		      	user: $scope.addTask.user,
		      	pin: $scope.addTask.pin
		      };

		      var path = '/buildings/' + $stateParams.currentBuilding 
		      		   + '/floors/' + $stateParams.currentFloor
		      		   + '/tasks/';

		      firebaseServices.pushData(path, jsonObj);
		      $mdDialog.hide();
		      $mdDialog.hide();
		    };
		}
	
	}
	
}