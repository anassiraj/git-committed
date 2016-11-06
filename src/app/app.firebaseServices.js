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

	getNewKey(path) {
		return firebase.database().ref(path).push().key
	}

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

	/******************************************************
	*                   Other - start                     *
	*******************************************************/

	signin(user) {
		return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
			.then(function(data) {
				console.log('success : ' + firebase.auth().currentUser.email + ' signed In');
				return true;
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
	  			return false;
			});
	};

	isAdmin(uid) {
		return firebase.database().ref('/admins/' + uid)
			.once('value')
			.then(function(snapshot) {
				if (snapshot.child('role').val() === 'admin') {
    				console.log('Admin');
    				return true;
  				} else {
  					console.log('Not Admin');
  					return false;
  				}
			});
	}

	getCurrentUserUid() {
		var user = firebase.auth().currentUser
		if (user != null) {
			return user.uid;
		}else{
			return '';
		}
	}

	signout() {
		firebase.auth().signOut()
			.then(function(data) {
				console.log('success : Signed out');
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
			});
	}

	/******************************************************
	*                    Other - end                      *
	*******************************************************/

}

export default angular.module('fbs', [])
	.service('firebaseServices', firebaseServices)
	.name;
