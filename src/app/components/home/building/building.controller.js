export default class BuildingController {
	constructor($state, firebaseServices, $q) {

		// console.log('foo');

		this.$state = $state;

		const buildingsData = firebaseServices.getData('buildings');

		$q.all([buildingsData]).then( (data) => {
			this.buildings = data[0];
		});


	}

	setBuilding(building) {
		// this.$rootScope.currentBuilding = building;
		console.log(building);
		// console.log(this.$scope.currentBuilding);
		this.$state.go('floors', { 'currentBuilding': building });
	}
}
