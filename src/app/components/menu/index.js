import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './menu.routes';

import MenuController from './menu.controller';

export default angular.module('app.menu', [uirouter])
	.config(routing)
	.controller('MenuController', MenuController)
	.name;