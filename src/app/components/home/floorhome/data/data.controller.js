export default class DataController {

	constructor($state, $stateParams, firebaseServices, $q, $scope) {

		var bar1 = document.getElementById('bar1'), L = 5;
		for ( var b, h, i=0; i<L; i++ ) {
		    h = 20 + parseInt(Math.random() * 80);
		    b = document.createElement('div');
		    b.style.height = h + 'px';
		    bar1.appendChild(b);
		}

		var bar2 = document.getElementById('bar2'), L = 5;
		for ( var b, h, i=0; i<L; i++ ) {
		    h = 20 + parseInt(Math.random() * 80);
		    b = document.createElement('div');
		    b.style.height = h + 'px';
		    bar2.appendChild(b);
		}
		
	}
	
}