import angular from 'angular';
import uirouter from 'angular-ui-router';

import ngMaterial from 'angular-material';

import routing from './app.config';

import home from './components/home';

import admin from './components/admin';

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
	}
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [uirouter, home, admin, ngMaterial])
	.directive('app', app)
	.config(routing)
	.controller('AppCtrl', AppCtrl);

export default MODULE_NAME;