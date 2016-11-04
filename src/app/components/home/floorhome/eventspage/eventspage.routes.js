routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
	.state('floor-home.eventspage', {
		url: '/events',
		template: require('./eventspage.html'),
		controller: 'EventsPageController',
		controllerAs: 'eventspage',
    resolve: {
      events: function(firebaseServices, $stateParams) {
        return firebaseServices.getData(`buildings/${$stateParams.currentBuilding}/floors/${$stateParams.currentFloor}/events`);
      }
    }
	});
}
