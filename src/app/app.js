import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import lodash from 'lodash';
import routing from './app.config';
// import tasks from './components/admin/tasks';
import floorhome from './components/home/floorhome';
import eventspage from './components/home/floorhome/eventspage';
import tasks from './components/home/floorhome/tasks';
import data from './components/home/floorhome/data';
import menus from './components/home/floorhome/menus';
import floor from './components/home/floor';
import building from  './components/home/building';
const firebase = require('firebase/app');

// all 3 are optional and you only need to require them at the start
require('firebase/auth');
require('firebase/database');
require('firebase/storage');
import 'angularfire';
import '../style/app.css';
import 'angular-material/angular-material.css';
import fbs from './app.firebaseServices';
import angularMoment from 'angular-moment';

const config = {
	apiKey: 'AIzaSyDp_CQgna5k7vyPW89PiSY5xnOQCT5QU1U',
	authDomain: 'fall-mobilithon.firebaseapp.com',
	databaseURL: 'https://fall-mobilithon.firebaseio.com',
	storageBucket: 'fall-mobilithon.appspot.com',
	messagingSenderId: '528596178671'
};

firebase.initializeApp(config);

const ref = firebase.database().ref('/');

let app = () => {
	return {
		template: require('./app.html'),
		controller: 'AppCtrl',
		controllerAs: 'app'
	}
};

class AppCtrl {
	constructor($scope, $mdDialog, firebaseServices, $rootScope) {

		this.ref = ref;


		$rootScope.ref = this.ref;

		$rootScope.admin = false;

		var email = 'gitcommitted@att.com';
		var password = '123456';

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log('ERROR: ' + error.code + ': ' + error.message);
		});

		firebase.auth().onAuthStateChanged((user)=> {
		  if (user) {
		    // User is signed in.
		    console.log('User changed');
		    const isAnonymous = user.isAnonymous;
		    const uid = user.uid;
		    console.log(user.email);
		  } else {
		  	// Admin signs out.
		    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  console.log('ERROR: ' + error.code + ': ' + error.message);
			});

			$rootScope.admin = false;
		  }
		  // ...
		});

		$scope.adminLogin = function($event) {
			$mdDialog.show({
		      controller: DialogController,
		      template: require('./app.adminLogin.tmpl.html'),
		      parent: angular.element(document.body),
			  controllerAs: 'adminLogin',
		      targetEvent: $event,
		      clickOutsideToClose:true,
		      locals: {}
		    })
		    .then(function(del) {
		    	$scope.status = 'Admin Login Please refresh';

		    }, function() {
		      $scope.status = 'Admin Login cancelled.';
		    });
		}

		function DialogController($rootScope, $scope, $mdDialog) {

		    /* Hides Modal */
		    $scope.hide = function() {
		        $mdDialog.hide();
		    };

		    /* Closes Modal */
		    $scope.cancel = function() {
		        $mdDialog.cancel();
		    };

		    /* Admin sign in */
		    $scope.login = function(user) {
		    	var result = firebaseServices.signin(user);
		    	if (result) {
		    		$rootScope.admin = true;
		    		$mdDialog.hide();
		    	}
		    };

		    $scope.signout = function() {
		    	firebaseServices.signout();
		    }

		}
	}

	back() {
		window.history.back();
	}
}

const MODULE_NAME = 'app';


angular.module(MODULE_NAME, [
		uirouter,
		tasks,
		data,
		floorhome,
		eventspage,
		menus,
		floor,
		building,
		ngMaterial,
		fbs,
		angularMoment,
		'firebase'
	])

	.directive('app', app)
	.config(routing)
	.controller('AppCtrl', AppCtrl)
	.filter('FirebaseFilter', (moment) => {
		return (eventObj, date) => {
			var filteredEvents = [];
			const selectedMomentDate = moment(date);
			if (eventObj) {
				_.forEach(eventObj, function (event) {
					if (event) {
						if (event.hasOwnProperty('name')) {
							const convertedDate = moment(event.eventDate);
							if (moment(selectedMomentDate).isSame(moment(convertedDate), 'day')) {
								filteredEvents.push(event);
							}
						}
					}
				});
				return filteredEvents;
			}
		}
	});

export default MODULE_NAME;
