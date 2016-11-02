export default class EventsPageController {

	constructor($state, $stateParams, firebaseServices, $q, $scope , $mdDialog) {

		this.$state = $state;
		
		this.floor = $stateParams.currentFloor;

		this.building = $stateParams.currentBuilding;

		const eventData = firebaseServices.getData(`buildings/${this.building}/floors/${this.floor}/events`);

		var selectedDay = '11/1/16';

		$q.all([eventData]).then( (data) => {
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