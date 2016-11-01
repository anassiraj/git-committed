import angular from 'angular';
import uirouter from 'angular-ui-router';

import FloorController from './floor.controller';

import routing from './floor.routes';

export default angular.module('app.floor', [uirouter])
	.config(routing)
	.controller('FloorController', FloorController)
	.name;