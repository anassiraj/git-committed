import angular from 'angular';
import uirouter from 'angular-ui-router';

import AdminController from './admin.controller';

import routing from './admin.routes';

export default angular.module('app.admin', [uirouter])
	.config(routing)
	.controller('AdminController', AdminController)
	.name;