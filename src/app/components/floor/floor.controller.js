export default class FloorController {
	constructor($q, firebaseServices) {

		var $promise = firebaseServices.getData("/buildings/twoBell")


		// $promise.then(function (data) {
		// 	console.log('Floors for 2 Bell:', data);
		// 	this.floors = data.floors;
		// })

		firebaseServices.getData('/buildings/twoBell').then( (data) => {
			console.log(data);
			console.log(data.floors);
			this.floors = data.floors;
		});

	}
}
