
var myApp = angular.module('ibet', ['ui.router', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'angular.filter', 'angular-carousel']);

// Router configuration
myApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('signup', {
            url: '/signup',
            templateUrl: "views/directives/login_form.html",
            controller: 'appCtrl'
        })
        .state('sports', {

            url: '/sports',
            templateUrl: 'views/games/sports.html',
            controller: 'sportsCtrl',
        })
        .state('casino', {
            url: '/casino',
            templateUrl: 'views/games/casino.html',
            controller: 'appCtrl',
        })
        .state('live-casino', {
            url: '/live-casino',
            templateUrl: 'views/games/live_casino.html',
            controller: 'appCtrl',
        })
        .state('poker', {
            url: '/poker',
            templateUrl: 'views/games/poker.html',
            controller: 'appCtrl',
        })
        .state('minigame', {
            url: '/minigame',
            templateUrl: 'views/games/minigame.html',
            controller: 'appCtrl',
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
            url: '/livebetLivematch',
            views: {
                'sport-tree@sports': {
                    templateUrl: 'views/directives/sports/sportstree.html',
                },
            }
        })
        .state('sports.prematch', {
            url: '/livebetPrematch',
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
        .state('slot', {
            url: '/slot',
            templateUrl: 'views/games/slot.html',
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



myApp.directive('imageSlider', [function() {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/slider.html',
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

myApp.directive('soccerTemplate', [function() {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/sports/soccer_template.html',
    };
}])

myApp.directive('popMatch', [function() {
    return {
        restrict: 'E',
        scope: {
            img: '=img',
            mdate: '@mdate',
            gamecat: '@gamecat',
            player1: '@player1',
            player2: '@player2'
        },
        templateUrl: 'views/directives/match.html',
    };
}])

myApp.directive('casinoTemplate', [function() {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/casino_template.html',
    };
}])

myApp.directive('sampleMatchtwo', [function() {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/sports/samplematch3.html',
    };
}])

myApp.directive('matchStats', [function() {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/sports/match_stats.html',
    };
}])