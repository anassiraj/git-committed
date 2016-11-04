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