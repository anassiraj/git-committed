import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './floorhome.routes';

import FloorHomeController from './floorhome.controller';

export default angular.module('app.floorhome', [uirouter])
	.config(routing)
	.controller('FloorHomeController', FloorHomeController)
	.name;