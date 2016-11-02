routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
	.state('floors', {
		url: '/floors/:currentBuilding',
		template: require('./floor.html'),
		controller: 'FloorController',
		controllerAs: 'floor'
	});
}
