export default class EventsPageController {

	constructor($state, $stateParams, firebaseServices, $q, $scope , $mdDialog, $filter, events, moment) {

		this.todaysDate = new Date();

		this.events = filterEventsByDate(events, this.todaysDate);

		function filterEventsByDate(events, date) {
			console.log(date);
			const momentDate = moment(date);
			return _.filter(events, (events) => {
				return moment(momentDate).isSame(moment(events.eventDate), 'day');
			})
		}

		this.$state = $state;

		this.$q = $q;

		this.firebaseServices = firebaseServices;

		this.$stateParams = $stateParams;

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

		this.selectedDate = this.todaysDate;

		this.maxDate = new Date(
			this.todaysDate.getFullYear() + 1,
			this.todaysDate.getMonth(),
			this.todaysDate.getDate()
		);

		this.getDateEvents = function(date) {
			this.getEventsByDate(date);
		}

	}

	getEventsByDate(date) {
		const eventData = this.firebaseServices.getData(`buildings/${this.$stateParams.currentBuilding}/floors/${this.$stateParams.currentFloor}/events`);
		this.$q.all([eventData]).then( (data) => {
			this.events = _.filter(data[0], (events) => events.eventDate === date);
		});
	}
}
