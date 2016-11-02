routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
	.state('floor-home.menus', {
		url: '/menus',
		template: require('./menus.html'),
		controller: 'MenusController',
		controllerAs: 'menus'
	});
}