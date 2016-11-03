export default class TasksController {

	constructor($state, $stateParams, firebaseServices, $q, $scope) {

		this.$state = $state;

		// var temp = {
		// 	name: 'Broken chair',
		// 	type: 'Work Area',
		// 	description: 'Chair next to elevator'
		// };

		// firebaseServices.pushData('/buildings/twoBell/floors/floor01/tasks/', temp);
		
		const taskData = firebaseServices.getData(`buildings/${$stateParams.currentBuilding}/floors/${$stateParams.currentFloor}/tasks`);

		$q.all([taskData]).then( (data) => {
			this.tasks = data[0];
			console.log(data);
		});
	
	}
	
}