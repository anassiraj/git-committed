export default class EventsPageController {

	constructor($state, firebaseServices, $q, $rootScope,$scope , $mdDialog) {

		this.$rootScope = $rootScope; 
		this.$state = $state;
		
		//Use this line to Test
		var path = '/buildings/'+ 'twoBell/' + 'floors/'+ 'floor01' + '/events/';

		//Use this line for all use cases
		//var path = '/buildings/'+ $rootScope.currentBuilding +'/floors/' + $rootScope.currentFloor + '/events/';

		const eventData = firebaseServices.getData(path);
		//const eventData = firebaseServices.filterData(path, 'name', 'Football with Daniel');

		$q.all([eventData]).then( (data) => {
			this.events = data[0];
		});

		$scope.addEvent = function(ev){
			var confirm = $mdDialog.prompt()
		      .title('Add event')
		      .textContent('This needs to be implemented.')
		      .placeholder('Not done')
		      .ariaLabel('Not done')
		      .initialValue('Not Done')
		      .targetEvent(ev)
		      .ok('Okay!')
		      .cancel('cancel');
		    $mdDialog.show(confirm);
		};
	}

	showEventforDay(day){		
	 	const eventData = firebaseServices.filterData(path, key,value);
	}

}