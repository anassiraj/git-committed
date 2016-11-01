import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './building.routes';

import BuildingController from './building.controller';

export default angular.module('app.building', [uirouter])
	.config(routing)
	.controller('BuildingController', BuildingController)
	.name;
