export default class FloorController {
	constructor($state, $stateParams, firebaseServices, $q) {

		this.$state = $state; 
		
		this.currentBuilding = $stateParams.currentBuilding;

		const floorData = firebaseServices.getData(`/buildings/${this.currentBuilding}`);

		$q.all([floorData]).then((data)=>{
			this.buildingName = data[0]['displayName'];
			this.floors = data[0]['floors'];
		});

	}

	setFloor(floor) {
		this.$state.go('eventspage', { 
			'currentFloor': floor,
			'currentBuilding': this.currentBuilding
		});
	}
}