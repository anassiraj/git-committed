export default class FloorController {
	constructor(firebaseServices, $q) {

		const floorData = firebaseServices.getData('/buildings/twoBell');

		$q.all([floorData]).then((data)=>{
			console.log(data)
			this.floors = data[0]['floors'];
		});

	}
}