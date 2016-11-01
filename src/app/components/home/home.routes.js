routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
	.state('home', {
		url: '/',
		template: require('./home.html'),
		controller: 'HomeController',
		controllerAs: 'home'
	})
	.state('floor', {
		url: '/floor',
		template: require('./floor/floor.html'),
		controller: 'FloorController',
		controllerAs: 'floor'
	});
}