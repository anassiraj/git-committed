export default class BuildingController {
	constructor($state, $stateParams, firebaseServices, $q) {

		this.$state = $state;

		const buildingsData = firebaseServices.getData('buildings');

		$q.all([buildingsData]).then( (data) => {
			console.log(data[0]);
			_.each(data[0], function(values, key) {
				values.key = key;
			});
			data[0] = _.sortBy(data[0], function(n) {
				return n.id
			});
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
