import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './tasks.routes';

import TasksController from './tasks.controller';

export default angular.module('app.tasks', [uirouter])
	.config(routing)
	.controller('TasksController', TasksController)
	.name;