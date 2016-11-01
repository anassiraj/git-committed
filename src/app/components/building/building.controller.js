export default class BuildingController {
	constructor(firebaseServices, $q) {

		const buildingsData = firebaseServices.getData('buildings');

		$q.all([buildingsData]).then( (data) => {
			console.log(data);
			this.buildings = buildings[0]['buildings'];
		});

	}
}
