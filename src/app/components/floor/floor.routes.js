routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
	.state('floor', {
		url: '/',
		template: require('./floor.html'),
		controller: 'FloorController',
		controllerAs: 'floor'
	});
}