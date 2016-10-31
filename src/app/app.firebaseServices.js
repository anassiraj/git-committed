import angular from 'angular';
const firebase = require('firebase/app');

class firebaseServices {

	/******************************************************
	*                 C.R.U.D. - start                    *
	*******************************************************/

	/* Sets data at given path.*/
	setData(path, data) {
		console.log(firebase.auth());
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

	pushData(path, data) {
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
	updateData(path, data) {
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
	removeData(path) {
		firebase.database().ref(path).remove()
			.then(function(data) {
				console.log('success : data deleted');
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
			});
	};

	// Gets data from directed path, returns a promise.
	getData(path) {
		return firebase.database().ref(path)
			.once('value')
			.then(function(snapshot) {
				console.log('success : data retrieved');
				return snapshot.val();
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
				console.log('ERROR: ' + error.code + ': ' + error.message);
			});
	};

	/******************************************************
	*                  C.R.U.D. - end                     *
	*******************************************************/

}

export default angular.module('fbs', [])
	.service('firebaseServices', firebaseServices)
	.name;
