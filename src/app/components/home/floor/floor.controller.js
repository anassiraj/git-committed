export default class FloorController {
	constructor($rootScope, firebaseServices, $q) {

		this.building = $rootScope.currentBuilding;

		const floorData = firebaseServices.getData(`/buildings/${this.building}`);

		$q.all([floorData]).then((data)=>{
			this.floors = data[0]['floors'];
			console.log(this.floors);
		});

	}
}
