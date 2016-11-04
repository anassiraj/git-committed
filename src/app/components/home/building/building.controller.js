export default class BuildingController {
	constructor($state, firebaseServices, $q) {


		this.$state = $state;

		const buildingsData = firebaseServices.getData('buildings');

		$q.all([buildingsData]).then( (data) => {
			console.log(data);
			var temp = _.sortBy(data[0], function(n) {
				console.log(n);
				return n.displayName;
			});
			this.buildings = data[0];
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
