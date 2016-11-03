routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
	.state('floor-home', {
		url: '/floor-home/:currentBuilding/:currentFloor',
		template: require('./floorhome.html'),
		controller: 'FloorHomeController',
		controllerAs: 'floorhome'
	});
}