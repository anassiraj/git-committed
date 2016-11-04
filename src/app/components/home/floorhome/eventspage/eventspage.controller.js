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
		      locals: {floor: $stateParams.currentFloor, building: $stateParams.currentBuilding}
		    })
		    .then(function(add) {
		    	$scope.status = 'Adding event. Please refresh';

		    }, function() {
		      $scope.status = 'Event add cancelled.';
		    });
		}
		
		//Display Building : Floor
		//Only add to floor
		function DialogController($scope, $mdDialog, floor, building) {
		    $scope.floor = floor;
		    $scope.building = building;

		    $scope.hide = function() {
		      $mdDialog.hide();
		    };

		    $scope.cancel = function() {
		      $mdDialog.cancel();
		    };

		    $scope.save = function(add) {
		      console.log('Event Name' + $scope.addEvent.name);
		      console.log('location' + $scope.addEvent.location);
		      console.log('startDate' + $scope.addEvent.startDate);
		      console.log('endDate' + $scope.addEvent.endDate);
		      console.log('description' + $scope.addEvent.description);
		      console.log('user' + $scope.addEvent.user);
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
