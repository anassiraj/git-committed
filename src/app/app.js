import angular from 'angular';
import uirouter from 'angular-ui-router';

import 'bootstrap/dist/css/bootstrap.css';

import routing from './app.config';

import home from './components/home';

import admin from './components/admin';

import '../style/app.css';

let app = () => {
	return {
		template: require('./app.html'),
		controller: 'AppCtrl',
		controllerAs: 'app'
	}
};

class AppCtrl {
	constructor() {
		this.mentees = ['Lucy', 'Jill', 'Jean', 'Foo', 'Bar'];
		this.mentors = ['Jane', 'Sue', 'Sally'];
	}
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [uirouter, home, admin])
	.directive('app', app)
	.config(routing)
	.controller('AppCtrl', AppCtrl);

export default MODULE_NAME;