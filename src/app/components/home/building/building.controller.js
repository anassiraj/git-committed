export default class BuildingController {
	constructor($state, firebaseServices, $q) {


		this.$state = $state;

		const buildingsData = firebaseServices.getData('buildings');

		$q.all([buildingsData]).then( (data) => {
			var array = [], i = 0;
			_.each(data[0], function(n) {
				array[i] = n.displayName;
				i++;
			});
			this.buildings = _.sortBy(array);
			console.log(this.buildings);
		});


	}

	setBuilding(building) {
		// this.$rootScope.currentBuilding = building;
		console.log(building);
		// console.log(this.$scope.currentBuilding);
		this.$state.go('floors', { 'currentBuilding': building });
	}
}
