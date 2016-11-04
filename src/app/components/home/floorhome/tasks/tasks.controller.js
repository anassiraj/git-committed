export default class TasksController {

	constructor($state, $stateParams, firebaseServices, $q, $scope, $mdDialog) {

		this.$state = $state;

		// var temp = {
		// 	name: 'Broken chair',
		// 	type: 'Work Area',
		// 	description: 'Chair next to elevator'
		// };

		// firebaseServices.pushData('/buildings/twoBell/floors/floor01/tasks/', temp);
		
		const taskData = firebaseServices.getData(`buildings/${$stateParams.currentBuilding}/floors/${$stateParams.currentFloor}/tasks`);

		$q.all([taskData]).then( (data) => {
			this.tasks = data[0];
			console.log(data);
		});

		$scope.addTask = function(ev){
			console.log(this.currentFloor);
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
		      console.log('Event Name' + $scope.addEvent.name);
		      console.log('location' + $scope.addEvent.location);
		      console.log('startDate' + $scope.addEvent.startDate);
		      console.log('endDate' + $scope.addEvent.endDate);
		      console.log('description' + $scope.addEvent.description);
		      console.log('user' + $scope.addEvent.user);
		      $mdDialog.hide();
		    };
		}
	
	}
	
}