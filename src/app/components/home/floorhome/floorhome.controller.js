export default class FloorHomeController {

	constructor($state, $stateParams, firebaseServices, $q, $scope) {

		this.currentFloor = $stateParams.currentFloor;

		this.currentBuilding = $stateParams.currentBuilding;

		const floorData = firebaseServices.getData(`buildings/${this.currentBuilding}/floors/${this.currentFloor}`);

		const buildingData = firebaseServices.getData(`buildings/${this.currentBuilding}`);

		$q.all([floorData, buildingData]).then( (data) => {
			this.buildingName = data[1]['displayName'];
			this.floorName = data[0]['displayName'];
			$scope.$state = $state;
		});
	}

}