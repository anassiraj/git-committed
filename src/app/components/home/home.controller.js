export default class HomeController {
	constructor(firebaseServices, $q) {

		/*Testing firebaseServices*/
		var temp = {'name' : 'James'};
		firebaseServices.setData('/', temp);

		var $promise = firebaseServices.getData('/');

		$promise.then(function(data) {
			console.log(data);
		});
		/*Delete if needed*/

		document.querySelector( "#nav-toggle" )
		  .addEventListener( "click", function() {
		    this.classList.toggle( "active" );
		});

	}
}