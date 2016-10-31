routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
	.state('tasks', {
		url: '/',
		template: require('./tasks.html'),
		controller: 'TasksController',
		controllerAs: 'tasks'
	});
}