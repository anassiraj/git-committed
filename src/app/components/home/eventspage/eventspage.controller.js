export default class EventsPageController {

	constructor($state, $stateParams, firebaseServices, $q, $scope , $mdDialog) {

		this.$state = $state;
		
		this.floor = $stateParams.currentFloor;

		const eventData = firebaseServices.getData(`events/${this.floor}`);

		$q.all([eventData]).then( (data) => {
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