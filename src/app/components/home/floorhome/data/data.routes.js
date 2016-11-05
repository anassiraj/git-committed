routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
	.state('floor-home.data', {
		url: '/data',
		template: require('./data.html'),
		controller: 'DataController',
		controllerAs: 'data'
	});
}