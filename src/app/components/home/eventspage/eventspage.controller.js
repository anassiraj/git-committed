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
			var confirm = $mdDialog.prompt()
		      .title('Add event')
		      .textContent('This needs to be implemented.')
		      .placeholder('Not done')
		      .ariaLabel('Not done')
		      .initialValue('Not Done')
		      .targetEvent(ev)
		      .ok('Okay!')
		      .cancel('cancel');
		    $mdDialog.show(confirm);
		};


		/* JUST test data to add events to database
		var newEvent = {
			createdByUID: 'dr513h',
			description: 'Testing events 3',
			endTime: '11PM',
			eventDate: '11/6/16',
			location: 'Dereks Home',
			name: 'Test Event 3',
			startTime: '6 PM'
		}

		firebaseServices.pushData('/buildings/twoBell/floors/floor01/events', newEvent);
		*/
	}
	
	// showEventforDay(day){		
	//  	const eventData = firebaseServices.filterData(path, key,value);
	// }
}