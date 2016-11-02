export default class EventsPageController {
	constructor($scope, $mdSidenav) {
		$scope.isSidenavOpen = false;
    
		$scope.openLeftMenu = function() {
			$mdSidenav('left').toggle();
		};
	}
}