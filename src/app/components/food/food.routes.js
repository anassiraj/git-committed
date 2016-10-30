routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
	.state('food', {
		url: '/',
		template: require('./food.html'),
		controller: 'FoodController',
		controllerAs: 'food'
	});
}