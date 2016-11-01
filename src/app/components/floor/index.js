import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './floor.routes';

import FloorController from './floor.controller';

export default angular.module('app.floor', [uirouter])
	.config(routing)
	.controller('FloorController', FloorController)
	.name;