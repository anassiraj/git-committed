export default class HomeController {
	constructor(firebaseServices) {
		document.querySelector( "#nav-toggle" )
		  .addEventListener( "click", function() {
		    this.classList.toggle( "active" );
		});
	}
}
