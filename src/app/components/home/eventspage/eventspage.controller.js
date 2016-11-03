export default class EventsPageController {

	constructor($state, $stateParams, firebaseServices, $q, $scope , $mdDialog) {

		this.$state = $state;
		
		this.currentFloor = $stateParams.currentFloor;

		this.currentBuilding = $stateParams.currentBuilding;

		const eventData = firebaseServices.getData(`buildings/${this.currentBuilding}/floors/${this.currentFloor}/events`);

		const floorData = firebaseServices.getData(`buildings/${this.currentBuilding}/floors/${this.currentFloor}`);

		const buildingData = firebaseServices.getData(`buildings/${this.currentBuilding}`);

		const selectedDay = '11/1/16';

		$q.all([eventData, floorData, buildingData]).then( (data) => {
			this.buildingName = data[2]['displayName'];
			this.floorName = data[1]['displayName'];
			this.events = _.filter(data[0], function(events) {
				return (events.eventDate == selectedDay);
			});
		});

		$scope.addEvent = function(ev){
			console.log(this.currentFloor);
			$mdDialog.show({
		      controller: DialogController,
		      template: require('./addEvent.tmpl.html'),
		      parent: angular.element(document.body),
			  controllerAs: 'addEvent',
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      locals: {floor: $stateParams.currentFloor, building: $stateParams.currentFloor}
		    })
		    .then(function(answer) {
		    	if(answer === 'add'){
		    		$scope.status = 'Event add was successful'+answer;
		    	}
		    	else{
		    		$scope.status = 'Event add cancelled';
		    	}

		    }, function() {
		      $scope.status = 'Event add cancelled.';
		    });
		}
		
		//Display Building : Floor
		//Only add to floor
		function DialogController($scope, $mdDialog, floor, building) {
		    $scope.hide = function() {
		      $mdDialog.hide();
		    };

		    $scope.cancel = function() {
		      $mdDialog.cancel();
		    };

		    console.log('Opening controller');

		    $scope.test = 'Test Stuff';

		    $scope.save = function() {
		      console.log($scope.name);
		      $mdDialog.hide();
		    };
		  }
	}
}