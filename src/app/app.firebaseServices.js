'use strict';


angular.module('app')
  .service('firebaseServices', ['$rootScope', function ($rootScope, $firebaseAuth) {

	/******************************************************
	*                 C.R.U.D. - start                    *
	*******************************************************/

	// Sets data at given path.
	this.setData = function(path, data) {
		firebase.database().ref(path).set(data)
			.then(function(data) {
				console.log('success : data set');
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
			});
	};

	this.pushData = function(path, data) {
		firebase.database().ref(path).push(data)
			.then(function(data) {
				console.log('success : data pushed');
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
			});
	};

	// Updates data at given path.
	this.updateData = function(path, data) {
		var updates = {};
		updates[path] = data;
		firebase.database().ref().update(updates)
			.then(function(data) {
				console.log('success : data updated');
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
			});
	};

	// Removes data from given path.
	this.removeData = function(path) {
		firebase.database().ref(path).remove()
			.then(function(data) {
				console.log('success : data Deleted');
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
			});
	};

	// Gets data from directed path, returns a promise.
	this.getData = function(path) {
		return firebase.database().ref(path)
			.once('value')
			.then(function(snapshot) {
				return snapshot.val();
			});
	};

	/******************************************************
	*                  C.R.U.D. - end                     *
	*******************************************************/

  }]);
