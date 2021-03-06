export default class TasksController {

	constructor($state, $stateParams, firebaseServices, $q, $rootScope,
		$scope, $mdDialog, $firebaseObject, moment) {

		this.$state = $state;

		$rootScope.typeList = [
			    	'Breakroom',
			    	'Office Space',
			    	'Restrooms',
			    	'Other'
		    	];

		console.log($rootScope.admin);

		this.GetTime = function(time){
			const momentDate = moment(time);
			return moment().to(momentDate);
		}

		const rootRef = $rootScope.ref;
		const tasksRef = rootRef.child(`buildings/${$stateParams.currentBuilding}/floors/${$stateParams.currentFloor}/tasks`);
		var tasksObject = $firebaseObject(tasksRef);
		tasksObject.$bindTo($scope, 'tasksObject');


		$scope.addTask = function(taskKey, userPin, $event, task){
			$mdDialog.show({
		      controller: DialogController,
		      template: require('./addTask.tmpl.html'),
		      parent: angular.element(document.body),
			  controllerAs: 'addTask',
		      targetEvent: $event,
		      clickOutsideToClose:true,
		      locals: {floor: $stateParams.currentFloor, building: $stateParams.currentBuilding,
		      	userPin: userPin, taskKey: taskKey, editTask: task}
		    })
		    .then(function() {
		    	$scope.status = 'Adding task. Please refresh';

		    }, function() {
		      $scope.status = 'Task add cancelled.';
		    });
		}

		$scope.deleteTask = function(taskKey, userPin, $event, task) {
			$mdDialog.show({
		      controller: DialogController,
		      template: require('./deleteTask.tmpl.html'),
		      parent: angular.element(document.body),
			  controllerAs: 'deleteTask',
		      targetEvent: $event,
		      clickOutsideToClose:true,
		      locals: {floor: $stateParams.currentFloor, building: $stateParams.currentBuilding,
		      	userPin: userPin, taskKey: taskKey, editTask: task}
		    })
		    .then(function(del) {
		    	$scope.status = 'Deleting event. Please refresh';

		    }, function() {
		      $scope.status = 'Task Delete cancelled.';
		    });
		}

		$scope.editTask = function(taskKey, userPin, $event, task) {
			$mdDialog.show({
		      controller: DialogController,
		      template: require('./editTask.tmpl.html'),
		      parent: angular.element(document.body),
			  controllerAs: 'editTask',
		      targetEvent: $event,
		      clickOutsideToClose:true,
		      locals: {floor: $stateParams.currentFloor, building: $stateParams.currentBuilding,
		      	userPin: userPin, taskKey: taskKey, editTask: task}
		    })
		    .then(function(del) {
		    	$scope.status = 'editing event. Please refresh';

		    }, function() {
		      $scope.status = 'Task Edit cancelled.';
		    });
		}

		//Display Building : Floor
		//Only add to floor
		function DialogController($scope, $mdDialog, floor, building, userPin, taskKey, editTask) {
		    $scope.floor = floor;
		    $scope.building = building;
		    $scope.userPin = userPin;
		    $scope.taskKey = taskKey;

		    /* If task is being edited, the modal will displa *
		    *  Whats currently on the task in edit modal      */
		    if (editTask) {
		    	$scope.editTask.name = editTask.name;
			    $scope.editTask.description = editTask.description;
			    $scope.editTask.type = editTask.type;
		    }

		    /* Hides Modal */
		    $scope.hide = function() {
		        $mdDialog.hide();
		    };

		    /* Closes Modal */
		    $scope.cancel = function() {
		        $mdDialog.cancel();
		    };

		    /* Deletes existing task */
		    $scope.delete = function(pin) {
		    	var uid = firebaseServices.getCurrentUserUid();
		    	var isAdmin = firebaseServices.isAdmin(uid);

		    	$q.all([isAdmin]).then( (data) => {
					if ($scope.userPin === pin || data[0]) {
			    		var path = '/buildings/' + $scope.building
			      		   		 + '/floors/' + $scope.floor
			      		   		 + '/tasks/' + $scope.taskKey;
			    		firebaseServices.removeData(path);
			    		$mdDialog.hide();
			    	} else {
			    		console.log('PIN DOES NOT MATCH');
			      		$mdDialog.hide();
			      		$mdDialog.show(
					      $mdDialog.alert()
					        .parent(angular.element(document.querySelector('#popupContainer')))
					        .clickOutsideToClose(true)
					        .title('Error')
					        .textContent('PIN DOES NOT MATCH')
					        .ariaLabel('Alert Dialog')
					        .ok('Got it!')
					    );
			    	}
				});
		    };

		    /* Edits existing task */
		    $scope.edit = function(pin) {
		    	var uid = firebaseServices.getCurrentUserUid();
		    	var isAdmin = firebaseServices.isAdmin(uid);

		    	$q.all([isAdmin]).then( (data) => {
					if ($scope.userPin === pin || data[0]) {
			      	  var jsonObj = {
				      	  name: $scope.editTask.name,
				      	  description: $scope.editTask.description,
				      	  type: $scope.editTask.type,
				      	  pin: $scope.userPin,
				      	  submitted: new Date().getTime()
			      	  };

			      	  var path = '/buildings/' + $scope.building
			      		   	   + '/floors/' + $scope.floor
			      		   	   + '/tasks/' + $scope.taskKey;
			      	  firebaseServices.updateData(path, jsonObj);
			      	  $mdDialog.hide();
			        } else {
			      	  console.log('PIN DOES NOT MATCH');
			      		$mdDialog.hide();
			      		$mdDialog.show(
					      $mdDialog.alert()
					        .parent(angular.element(document.querySelector('#popupContainer')))
					        .clickOutsideToClose(true)
					        .title('Error')
					        .textContent('PIN DOES NOT MATCH')
					        .ariaLabel('Alert Dialog')
					        .ok('Got it!')
					    );
			        }
				});
		    };

		    /* Addes new task to the floor */
		    $scope.save = function(add) {
		        var jsonObj = {
		      	  name: $scope.addTask.name,
		      	  description: $scope.addTask.description,
		      	  type: $scope.addTask.type,
		      	  user: $scope.addTask.user,
		      	  pin: $scope.addTask.pin,
		     	  submitted: new Date().getTime()
		        };

		        var path = '/buildings/' + $scope.building
		      		     + '/floors/' + $scope.floor
		      		     + '/tasks/';

		        firebaseServices.pushData(path, jsonObj);
		        $mdDialog.hide();
		        $mdDialog.hide();
		    };
		}

	}

}
