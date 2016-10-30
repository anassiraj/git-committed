import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './concierge.routes';

import ConciergeController from './concierge.controller';

export default angular.module('app.concierge', [uirouter])
	.config(routing)
	.controller('ConciergeController', ConciergeController)
	.name;