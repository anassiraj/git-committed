routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
	.state('concierge', {
		url: '/',
		template: require('./concierge.html'),
		controller: 'ConciergeController',
		controllerAs: 'concierge'
	});
}