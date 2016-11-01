export default class BuildingController {
	constructor(firebaseServices, $q) {

		const buildingsData = firebaseServices.getData('buildings');

		$q.all([buildingsData]).then( (data) => {
			this.buildings = data[0];
		});

	}
}
