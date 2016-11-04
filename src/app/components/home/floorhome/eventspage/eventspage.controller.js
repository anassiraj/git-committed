export default class EventsPageController {

	constructor($state, $stateParams, firebaseServices, $q, $scope , $mdDialog, $filter, events, moment) {

		this.todaysDate = new Date();

		this.events = filterEventsByDate(events, this.todaysDate);

		this.filterEventsByNewDate = function (date) {
			this.events = filterEventsByDate(events, date);
		};

		this.convertToMomentSince = function (date) {
			const momentDate = moment(date);
			return moment().to(momentDate);
		}

		this.formatSelectedDateDisplay = function (date) {
			return moment(date).format("dddd, MMMM Do YYYY");
		}

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

		function filterEventsByDate(events, date) {
			const momentDate = moment(date);
			return _.filter(events, (events) => {
				return moment(momentDate).isSame(moment(events.eventDate), 'day');
			})
		}

	}
}
