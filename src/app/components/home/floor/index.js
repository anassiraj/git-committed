import angular from 'angular';
import uirouter from 'angular-ui-router';

import FloorController from './floor.controller';

export default angular.module('app.floor', [uirouter])
	.controller('FloorController', FloorController)
	.name;