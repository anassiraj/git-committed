import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.routes';

import HomeController from './home.controller';

import admin from '../admin';

export default angular.module('app.home', [uirouter])
	.config(routing)
	.controller('HomeController', HomeController)
	.name;