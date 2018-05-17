/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_ibet25_main_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_ibet25_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_ibet25_main_scss__);

var myApp = angular.module('ibet', ['ui.router', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'angular.filter']);

// Router configuration
myApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('signup', {
            url: '/signup',
            views: {
                'main': {
                    templateUrl: "views/directives/login_form.html",
                }
            }
        })
        .state('sports', {

            url: '/sports',
            // "@": {

            templateUrl: 'views/games/sports.html',
            controller: 'sportsCtrl',
            // }
            // views: {
            //     'main': {
            //         templateUrl: 'views/games/sports.html',
            //         controller: 'appCtrl',
            //     },

        // }
        })
        .state('casino', {
            url: '/casino',
            // views: {
            //     'casino-game': {
            //         template: "",
            //     },
            //     'main': {
            templateUrl: 'views/games/casino.html',
            controller: 'appCtrl',

        //     }
        // }
        })
        .state('live-casino', {
            url: '/live-casino',
            // views: {
            //     'casino-game': {
            //         template: "",
            //     },
            //     'main': {
            templateUrl: 'views/games/live_casino.html',
            controller: 'appCtrl',

        //     }
        // }
        })
        .state('poker', {
            url: '/poker',
            // views: {
            //     'casino-game': {
            //         template: "",
            //     },
            //     'main': {
            templateUrl: 'views/games/poker.html',
            controller: 'appCtrl',

        //     }
        // }
        })
        .state('virtual-sports', {
            url: '/virtual-sports',
            // views: {
            //     'casino-game': {
            //         template: "",
            //     },
            //     'main': {
            templateUrl: 'views/games/virtual_sports.html',
            controller: 'appCtrl',

        //     }
        // }
        })
        .state('sports.livebet', {
            url: '/livebet',
            views: {
                'sport-tree@sports': {
                    templateUrl: 'views/directives/sports/sportstree.html',

                },


            }
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/directives/home.html',
        })

});

// Application Main Controller
myApp.controller('appCtrl', function($scope, $uibModal, $log, $document) {
    $scope.num = "";
    $scope.bets = [];
    $scope.flag = "en";
    $scope.matches = [{
        id: 1,
        team1: "karuma",
        team2: "abdo",
        gametype: "Tennis",
        location: "ATP Dubai",
        odds: {
            num: ""
        }
    }, {
        id: 2,
        team1: "joribi",
        team2: "duruman",
        gametype: "Tennis",
        location: "ATP Philippines",
        odds: {
            num: ""
        }
    }, {
        id: 3,
        team1: "kurimao",
        team2: "bano",
        gametype: "Tennis",
        location: "ATP Philippines",
        odds: {
            num: ""
        }
    }, {
        id: 4,
        team1: "juju",
        team2: "ekek",
        gametype: "Tennis",
        location: "ATP Philippines",
        odds: {
            num: ""
        }
    },];

    // var modalInstance;

    $scope.setOddActive = function(index, num) {

        if (num != $scope.matches[index].odds.num) {
            $scope.matches[index].odds.num = num;
            var d = checkDuplicate($scope.matches[index].id);
            if (!d) {
                $scope.bets.push($scope.matches[index]);
            }

        } else {
            $scope.matches[index].odds.num = "";
            removeBetbbId($scope.matches[index]);
        }
    };

    $scope.removeMarket = function(id) {
        var mL = $scope.matches.length;
        if (mL > 0) {
            for (var i = 0; i < mL; i++) {
                if ($scope.matches[i].id == id) {
                    $scope.matches[i].odds.num = "";
                }
            }
            removeBetbbId(id);
        }
    }

    $scope.open = function() {
        // var modalInstance = 
        $uibModal.open({
            templateUrl: 'views/directives/modals/lgform.html',
            windowTopClass: 'login-modal fade',
        });

    }

    $scope.closeMe = function() {
        $uibModal.close();
    }

    $scope.clearSelections = function() {
        $scope.bets = [];
        for (var i = 0; i <= $scope.matches.length - 1; i++) {
            $scope.matches[i].odds.num = "";
        }
    }

    function checkDuplicate(id) {
        var bLength = $scope.bets.length;
        if (bLength > 0) {
            for (var i = 0; i < bLength; i++) {
                if ($scope.bets[i].id == id) {
                    return true;
                }
            }
        } else {
            return false;
        }
    }

    function removeBetbbId(id) {
        var bLength = $scope.bets.length;
        var index;
        if (bLength > 0) {
            for (var i = 0; i < bLength; i++) {
                if ($scope.bets[i].id == id) {
                    index = i;
                }
            }

            $scope.bets.splice(index, 1);

        } else {
            return false;
        }
    }

    // window.scope = $scope;

});



myApp.directive('language', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/language.html',
    };

});

myApp.directive('login', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/login.html'
    };
});

myApp.directive('ffooter', function() {
    return {

        templateUrl: 'views/directives/footer.html'
    };
});

myApp.directive('koolbetheader', [function() {
    return {
        templateUrl: 'views/directives/header.html',

    };
}])

myApp.directive('betslip', [function() {
    return {
        templateUrl: 'views/directives/betslip/betslip.html',

    };
}])

myApp.directive('betslipHeaderTabs', [function() {
    return {
        templateUrl: 'views/directives/betslip/betslip_header_tabs.html',

    };
}])

myApp.directive('betslipHeaderTypes', [function() {
    return {
        templateUrl: 'views/directives/betslip/betslip_header_types.html',

    };
}])

myApp.directive('betslipTypeSingle', [function() {
    return {
        templateUrl: 'views/directives/betslip/betslip_type_single.html',

    };
}])

myApp.directive('betslipOutcomes', [function() {
    return {
        templateUrl: 'views/directives/betslip/betslip_outcomes.html',

    };
}])

myApp.directive('betslipOutcomesSimple', [function() {
    return {
        templateUrl: 'views/directives/betslip/betslip_outcomes_simple.html',

    };
}])



myApp.directive('sportMatches', [function() {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/sports/sport_match.html',
    };
}])

myApp.directive('hockeyTemplate', [function() {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/sports/hockey_template.html',
    };
}])



myApp.directive('baseballTemplate', [function() {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/sports/baseball_template.html',
    };
}])



/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);