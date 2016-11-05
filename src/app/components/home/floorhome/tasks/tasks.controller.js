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
		    	$scope.status = 'Adding task. Please refresh';

		    }, function() {
		      $scope.status = 'Task add cancelled.';
		    });
		}

		$scope.deleteTask = function(taskKey, userPin, $event) {
			console.log($event);
			$mdDialog.show({
		      controller: DialogController,
		      template: require('./deleteTask.tmpl.html'),
		      parent: angular.element(document.body),
			  controllerAs: 'deleteTask',
		      targetEvent: $event,
		      clickOutsideToClose:true,
		      locals: {floor: $stateParams.currentFloor, building: $stateParams.currentBuilding,
		      	userPin: userPin, taskKey: taskKey}
		    })
		    .then(function(del) {
		    	$scope.status = 'Deleting event. Please refresh';

		    }, function() {
		      $scope.status = 'Task Delete cancelled.';
		    });
		}
		
		//Display Building : Floor
		//Only add to floor
		function DialogController($scope, $mdDialog, floor, building, userPin, taskKey) {
		    $scope.floor = floor;
		    $scope.building = building;
		    $scope.userPin = userPin;
		    $scope.taskKey = taskKey;

		    $scope.hide = function() {
		      $mdDialog.hide();
		    };

		    $scope.cancel = function() {
		      $mdDialog.cancel();
		    };

		    $scope.delete = function(pin) {
		    	if ($scope.userPin === pin) {
		    		var path = '/buildings/' + $scope.building 
		      		   		 + '/floors/' + $scope.floor
		      		   		 + '/tasks/' + $scope.taskKey;
		    		firebaseServices.removeData(path);
		    		$mdDialog.hide();
		    	} else {
		    		console.log('PIN DOES NOT MATCH');
		    	}
		    };

		    $scope.save = function(add) {	
		      var jsonObj = {
		      	name: $scope.addTask.name,
		      	description: $scope.addTask.description,
		      	type: $scope.addTask.type,
		      	user: $scope.addTask.user,
		      	pin: $scope.addTask.pin
		      };

		      var path = '/buildings/' + $scope.building 
		      		   + '/floors/' + $scope.floor
		      		   + '/tasks/';

		      firebaseServices.pushData(path, jsonObj);
		      $mdDialog.hide();
		      $mdDialog.hide();
		    };
		}
	
	}
	
}