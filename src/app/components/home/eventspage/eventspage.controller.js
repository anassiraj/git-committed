export default class EventsPageController {

	constructor($state, $stateParams, firebaseServices, $q, $scope , $mdDialog) {

		this.$state = $state;
		
		this.currentFloor = $stateParams.currentFloor;

		this.currentBuilding = $stateParams.currentBuilding;

		const eventData = firebaseServices.getData(`buildings/${this.currentBuilding}/floors/${this.currentFloor}/events`);

		const floorData = firebaseServices.getData(`buildings/${this.currentBuilding}/floors/${this.currentFloor}`);

		const buildingData = firebaseServices.getData(`buildings/${this.currentBuilding}`);

		$q.all([eventData, floorData, buildingData]).then( (data) => {
			this.buildingName = data[2]['displayName'];
			this.floorName = data[1]['displayName'];
			this.events = data[0];
		});

	// 	$scope.addEvent = function(ev){
	// 		var confirm = $mdDialog.prompt()
	// 	      .title('Add event')
	// 	      .textContent('This needs to be implemented.')
	// 	      .placeholder('Not done')
	// 	      .ariaLabel('Not done')
	// 	      .initialValue('Not Done')
	// 	      .targetEvent(ev)
	// 	      .ok('Okay!')
	// 	      .cancel('cancel');
	// 	    $mdDialog.show(confirm);
	// 	};
	}
	
	// showEventforDay(day){		
	//  	const eventData = firebaseServices.filterData(path, key,value);
	// }

}