routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
	.state('floor-home.eventspage', {
		url: '/events',
		template: require('./eventspage.html'),
		controller: 'EventsPageController',
		controllerAs: 'eventspage'
	});
}