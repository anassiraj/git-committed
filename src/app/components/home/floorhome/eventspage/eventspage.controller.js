export default class EventsPageController {

	constructor($state, $stateParams, firebaseServices, $q, $scope , $mdDialog,
		$filter, moment, $firebaseObject, $rootScope, todaysDate) {

		const rootRef = $rootScope.ref;
		const eventsRef = rootRef.child(`buildings/${$stateParams.currentBuilding}/floors/${$stateParams.currentFloor}/events`);
		var eventsObject = $firebaseObject(eventsRef);
		eventsObject.$bindTo($scope, 'events');

		this.todaysDate = todaysDate;
		this.selectedDate = todaysDate;
		this.maxDate = new Date(
			this.todaysDate.getFullYear() + 1,
			this.todaysDate.getMonth(),
			this.todaysDate.getDate()
		);

		this.currentFloor = $stateParams.currentFloor;
		this.currentBuilding = $stateParams.currentBuilding;

		this.convertToMomentSince = function (date, startTime) {
			var splitStartTime = startTime.substring(0, startTime.indexOf(':'));
			const momentDate = moment(date).hour(splitStartTime);
			return moment().to(momentDate);
		}

		this.formatSelectedDateDisplay = function (date) {
			return moment(date).format("dddd, MMMM Do YYYY");
		}

		$scope.addEvent = function(ev){
			$mdDialog.show({
		      controller: AddEventController,
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

		// this.filterEventsByDate = function (events, date) {
		// 	const selectedMomentDate = moment(date);
		// 	var filteredEvents = [];
		// 	_.forEach(events, function (event) {
		// 		if (event) {
		// 			const convertedDate = moment(event.eventDate);
		// 			if (moment(selectedMomentDate).isSame(moment(convertedDate), 'date')) {
		// 				filteredEvents.push(event);
		// 			}
		// 		}
		// 	})
		// 	return filteredEvents;
		// }

		function AddEventController($scope, $mdDialog, floor, building) {
		    $scope.floor = floor;
		    $scope.building = building;

		    $scope.hide = function() {
		      $mdDialog.hide();
		    };

		    $scope.cancel = function() {
		      $mdDialog.cancel();
		    };

		    $scope.save = function(add) {
		      var data = ({
		      	'createdByUID': $scope.addEvent.user,
		      	'description' : $scope.addEvent.description,
		      	'startTime': $scope.addEvent.startTime,
		      	'endTime': $scope.addEvent.endTime,
		      	'eventDate': $scope.addEvent.eventDate.getTime(),
		      	'name' : $scope.addEvent.name,
		      	'location' : $scope.addEvent.location
		      	});
					firebaseServices.pushData(`buildings/${$stateParams.currentBuilding}/floors/${$stateParams.currentFloor}/events`,data);
		      $mdDialog.hide();
		    };
		}

	}
}
