import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './eventspage.routes';

import EventsPageController from './eventspage.controller';

export default angular.module('app.eventspage', [uirouter])
	.config(routing)
	.controller('EventsPageController', EventsPageController)
	.name;