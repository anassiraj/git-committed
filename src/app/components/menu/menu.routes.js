routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
	.state('menu', {
		url: '/',
		template: require('./menu.html'),
		controller: 'MenuController',
		controllerAs: 'menu'
	});
}