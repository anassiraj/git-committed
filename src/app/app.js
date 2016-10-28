import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import routing from './app.config';
import home from './components/home';
import admin from './components/admin';
var firebase = require('firebase/app');
// all 3 are optional and you only need to require them at the start
require('firebase/auth');
require('firebase/database');
require('firebase/storage');
import 'angularfire';
import '../style/app.css';
import 'angular-material/angular-material.css';

let app = () => {
	return {
		template: require('./app.html'),
		controller: 'AppCtrl',
		controllerAs: 'app'
	}
};

class AppCtrl {
	constructor() {
		this.data = ['item1', 'item2'];

		this.ref = ref;

		const self = this;

		firebase.auth().signInAnonymously().catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		});


		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User is signed in.
		    var isAnonymous = user.isAnonymous;
		    var uid = user.uid;
		    // ...
		    self.ref.set({ first: 'Ada', last: 'Lovelace' });
		  } else {
		    // User is signed out.
		    // ...
		  }
		  // ...
		});

		
	}
}

const MODULE_NAME = 'app';

const config = {
	apiKey: 'AIzaSyDp_CQgna5k7vyPW89PiSY5xnOQCT5QU1U',
	authDomain: 'fall-mobilithon.firebaseapp.com',
	databaseURL: 'https://fall-mobilithon.firebaseio.com',
	storageBucket: 'fall-mobilithon.appspot.com',
	messagingSenderId: '528596178671'
};

firebase.initializeApp(config);

const ref = firebase.database().ref();

angular.module(MODULE_NAME, [uirouter, home, admin, ngMaterial])
	.directive('app', app)
	.config(routing)
	.controller('AppCtrl', AppCtrl);

export default MODULE_NAME;