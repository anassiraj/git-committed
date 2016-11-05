import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './data.routes';

import DataController from './data.controller';

export default angular.module('app.data', [uirouter])
	.config(routing)
	.controller('DataController', DataController)
	.name;