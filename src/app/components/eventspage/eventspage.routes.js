routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
	.state('eventspage', {
		url: '/',
		template: require('./eventspage.html'),
		controller: 'EventsPageController',
		controllerAs: 'eventspage'
	});
}