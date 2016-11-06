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

		$scope.deleteEvent = function(eventKey, userPin, $event, editEvent){
			$mdDialog.show({
		      controller: EditEventController,
		      template: require('./deleteEvent.tmpl.html'),
		      parent: angular.element(document.body),
			  controllerAs: 'deleteEvent',
		      targetEvent: $event,
		      clickOutsideToClose:true,
		      locals: {floor: $stateParams.currentFloor, building: $stateParams.currentBuilding,
		      	eventKey: eventKey, userPin: userPin, editEvent: editEvent}
		    })
		    .then(function(del) {
		    	$scope.status = 'Delete Event. Please refresh';

		    }, function() {
		      $scope.status = 'Event Delete cancelled.';
		    });
		}

		$scope.editEvent = function(eventKey, userPin, $event, editEvent){
			$mdDialog.show({
		      controller: EditEventController,
		      template: require('./editEvent.tmpl.html'),
		      parent: angular.element(document.body),
			  controllerAs: 'editEvent',
		      targetEvent: $event,
		      clickOutsideToClose:true,
		      locals: {floor: $stateParams.currentFloor, building: $stateParams.currentBuilding,
		      	eventKey: eventKey, userPin: userPin, editEvent: editEvent}
		    })
		    .then(function(del) {
		    	$scope.status = 'Edit Event. Please refresh';

		    }, function() {
		      $scope.status = 'Event Edit cancelled.';
		    });
		}

		this.selectedDate = this.todaysDate;

		this.maxDate = new Date(
			this.todaysDate.getFullYear() + 1,
			this.todaysDate.getMonth(),
			this.todaysDate.getDate()
		);

		function filterEventsByDate(events, date) {
			const momentDate = moment(date);
			return _.filter(events, (events, keys) => {
				if (moment(momentDate).isSame(moment(events.eventDate), 'day')) {
					events.keyid = keys;
					return true;
				}
			})
		}

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
		      	'location' : $scope.addEvent.location,
		      	'pin': $scope.addEvent.pin
		      	});
					firebaseServices.pushData(`buildings/${$stateParams.currentBuilding}/floors/${$stateParams.currentFloor}/events`,data);
		      $mdDialog.hide();
		    };
		}

		function EditEventController($scope, $mdDialog, floor, building, userPin, eventKey, editEvent) {
		    $scope.floor = floor;
		    $scope.building = building;
		    $scope.userPin = userPin;
		    $scope.eventKey = eventKey;

		    if (editEvent) {
			    $scope.editEvent.description = editEvent.description;
			    $scope.editEvent.startTime = editEvent.startTime;
			    $scope.editEvent.endTime = editEvent.endTime;
			    $scope.editEvent.name = editEvent.name;
			    $scope.editEvent.location = editEvent.location;
		    }

		    $scope.hide = function() {
		      $mdDialog.hide();
		    };

		    $scope.cancel = function() {
		      $mdDialog.cancel();
		    };

		    $scope.delete = function(pin) {
		    	var uid = firebaseServices.getCurrentUserUid();
		    	var isAdmin = firebaseServices.isAdmin(uid);

		    	$q.all([isAdmin]).then( (data) => {
					if ($scope.userPin === pin || data[0]) {
			    		var path = '/buildings/' + $scope.building 
			      		   		 + '/floors/' + $scope.floor
			      		   		 + '/events/' + $scope.eventKey;
			    		firebaseServices.removeData(path);
			    		$mdDialog.hide();
			    	} else {
			    		console.log('PIN DOES NOT MATCH');
			    	}
				});
		    };

		    $scope.edit = function(pin) {
		  		var uid = firebaseServices.getCurrentUserUid();
		    	var isAdmin = firebaseServices.isAdmin(uid);

		        $q.all([isAdmin]).then( (data) => {
					if ($scope.userPin === pin || data[0]) {
				      	var jsonObj = ({
						    'description' : $scope.editEvent.description,
						    'startTime': $scope.editEvent.startTime,
						    'endTime': $scope.editEvent.endTime,
						    'eventDate': $scope.editEvent.eventDate.getTime(),
						    'name' : $scope.editEvent.name,
						    'location' : $scope.editEvent.location
					    });

				      	var path = '/buildings/' + $scope.building 
				      		   	 + '/floors/' + $scope.floor
				      		   	 + '/events/' + $scope.eventKey;
			      		firebaseServices.updateData(path, jsonObj);
			      		$mdDialog.hide();
			        } else {
			      		console.log('PIN DOES NOT MATCH');
			        }
				});
		    };
		}

	}
}
