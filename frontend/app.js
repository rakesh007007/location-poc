var testApp = angular.module('testApp', ['ngRoute', 'ngCookies', 'LocalStorageModule','ui.bootstrap', 'angular-loading-bar']);
testApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/index', {
                templateUrl: 'templates/main.html',
                controller: 'mainController'
            }).
            when('/', {
                templateUrl: 'templates/main.html',
                controller: 'mainController'
            }).
            when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'loginController'
            }).
            when('/notfound', {
                templateUrl: 'templates/notfound.html',
                controller: 'loginController'
            }).
            when('/logout', {
                templateUrl: 'templates/logout.html',
                controller: 'loginController'
            }).
            otherwise({
                redirectTo: '/notfound'
            });
        }
    ])
testApp.config(['$httpProvider',
    function($httpProvider, bugsnagProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        /*$httpProvider.defaults.headers.common = {};*/
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
        /*bug snag configs start from here*/
    }
]);
testApp.config(function(localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('testls')
        .setStorageType('localStorage');
});