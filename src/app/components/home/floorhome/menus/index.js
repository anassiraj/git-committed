import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './menus.routes';

import MenusController from './menus.controller';

export default angular.module('app.menus', [uirouter])
	.config(routing)
	.controller('MenusController', MenusController)
	.name;