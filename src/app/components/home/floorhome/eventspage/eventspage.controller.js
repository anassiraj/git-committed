export default class EventsPageController {

	constructor($state, $stateParams, firebaseServices, $q, $scope , $mdDialog, $filter, events, moment) {
		console.log(moment());
		console.log('baz');
		this.todaysDate = new Date();
		console.log(this.todaysDate);
		this.events = filterEventsByDate(events, this.todaysDate);
		console.log(this.events);

		function filterEventsByDate(events, date) {
			console.log(events);
			console.log(date);
			return _.filter(events, (events) => events.eventDate === date);
		}
		this.$state = $state;

		this.$q = $q;

		this.firebaseServices = firebaseServices;

		this.$stateParams = $stateParams;

		// const eventData = firebaseServices.getData(`buildings/${$stateParams.currentBuilding}/floors/${$stateParams.currentFloor}/events`);

		const selectedDay = '11/3/16';

		// $q.all([eventData]).then( (data) => {
		// 	this.events = _.filter(data[0], (events) => events.eventDate === selectedDay);
		// });



		this.addEvent = function(ev){
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

		this.selectedDate = new Date();



		// this.minDate = new Date(
		// 	this.todaysDate.getFullYear(),
		// 	this.todaysDate.getMonth(),
		// 	this.todaysDate.getDate()
		// );

		this.maxDate = new Date(
			this.todaysDate.getFullYear() + 1,
			this.todaysDate.getMonth(),
			this.todaysDate.getDate()
		);

		this.getDateEvents = function(date) {
			console.log('Date changed to:', date.getTime());
			this.getEventsByDate(date);
		}

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

	getEventsByDate(date) {
		const eventData = this.firebaseServices.getData(`buildings/${this.$stateParams.currentBuilding}/floors/${this.$stateParams.currentFloor}/events`);
		this.$q.all([eventData]).then( (data) => {
			this.events = _.filter(data[0], (events) => events.eventDate === date.getTime());
		});
	}

	// showEventforDay(day){
	//  	const eventData = firebaseServices.filterData(path, key,value);
	// }
}
