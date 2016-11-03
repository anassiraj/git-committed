export default class EventsPageController {

	constructor($state, $stateParams, firebaseServices, $q, $scope , $mdDialog, $filter, events, moment) {

		this.todaysDate = new Date();

		this.events = filterEventsByDate(events, this.todaysDate);
		this.currentFloor = $stateParams.currentFloor;
		this.currentBuilding = $stateParams.currentBuilding;
		this.filterEventsByNewDate = function (date) {
			this.events = filterEventsByDate(events, date);
		};

		this.convertToMomentSince = function (date) {
			const momentDate = moment(date);
			return moment().to(momentDate);
		}

		this.formatSelectedDateDisplay = function (date) {
			return moment(date).format("dddd, MMMM Do YYYY");
		}

				$scope.addEvent = function(ev){
			console.log(this.currentFloor);
			$mdDialog.show({
		      controller: DialogController,
		      template: require('./addEvent.tmpl.html'),
		      parent: angular.element(document.body),
			  controllerAs: 'addEvent',
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      locals: {floor: $stateParams.currentFloor, building: $stateParams.currentFloor}
		    })
		    .then(function(answer) {
		    	if(answer === 'add'){
		    		$scope.status = 'Event add was successful'+answer;
		    	}
		    	else{
		    		$scope.status = 'Event add cancelled';
		    	}

		    }, function() {
		      $scope.status = 'Event add cancelled.';
		    });
		}
		
		//Display Building : Floor
		//Only add to floor
		function DialogController($scope, $mdDialog, floor, building) {
		    $scope.hide = function() {
		      $mdDialog.hide();
		    };

		    $scope.cancel = function() {
		      $mdDialog.cancel();
		    };

		    console.log('Opening controller');

		    $scope.test = 'Test Stuff';

		    $scope.save = function() {
		      console.log($scope.name);
		      $mdDialog.hide();
		    };
		}

		this.selectedDate = this.todaysDate;

		this.maxDate = new Date(
			this.todaysDate.getFullYear() + 1,
			this.todaysDate.getMonth(),
			this.todaysDate.getDate()
		);

		function filterEventsByDate(events, date) {
			const momentDate = moment(date);
			return _.filter(events, (events) => {
				return moment(momentDate).isSame(moment(events.eventDate), 'day');
			})
		}

	}
}
