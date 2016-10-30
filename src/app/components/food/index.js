import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './food.routes';

import FoodController from './food.controller';

export default angular.module('app.food', [uirouter])
	.config(routing)
	.controller('FoodController', FoodController)
	.name;