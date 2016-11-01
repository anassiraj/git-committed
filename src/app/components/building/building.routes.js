routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
	.state('building', {
		url: '/',
		template: require('./building.html'),
		controller: 'BuildingController',
		controllerAs: 'building'
	});
}
