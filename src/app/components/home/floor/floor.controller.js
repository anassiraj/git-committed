export default class FloorController {
	constructor($state, $stateParams, firebaseServices, $q) {

		this.$state = $state; 
		
		this.building = $stateParams.currentBuilding;

		const floorData = firebaseServices.getData(`/buildings/${this.building}`);

		$q.all([floorData]).then((data)=>{
			this.floors = data[0]['floors'];
		});

	}

	setFloor(floor) {
		this.$state.go('eventspage', { 
			'currentFloor': floor,
			'currentBuilding': this.building
		});
	}
}