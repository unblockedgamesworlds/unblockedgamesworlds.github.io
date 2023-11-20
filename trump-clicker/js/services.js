angular.module('starter.services', [])
.factory('Settings', function($localStorage) {
//$localStorage.$reset();
$localStorage = $localStorage.$default({
settings: {
money:0,
votes:0,
votesper:0,
click:1,
clicksper:0,
trumpclicks:0,
upgradebadge:0,
hasplayed:0,
statebadge:0,
wongame:0,
timestart:Date.now(),
upgrades:{
clicker:{bought:0,cost:10},
social:{bought:0,cost:100,persec:1},
ads:{bought:0,cost:2500,persec:10},
smear:{bought:0,cost:10000,persec:25},
media:{bought:0,cost:25000,persec:50},
endorse:{bought:0,cost:50000,persec:100},
},
states:{
southwest:{name:'Southwest',bought:0,cost:500000},
midwest:{name:'Midwest',bought:0,cost:1000000},
southeast:{name:'Southeast',bought:0,cost:5000000},
northeast:{name:'Northeast',bought:0,cost:25000000},
west:{name:'West',bought:0,cost:50000000},
}
}
});
var _getAll = function () {
return $localStorage.settings;
};
return {
getAll: _getAll,
};
})
.directive('trumpped', ['$timeout', function($timeout) {
return {
restrict:'E',
replace: false,
transclude: true,
scope:{},
template: '<div class="face addtransition" ng-style="myStyle"></div>',
link:function (scope, element, attrs) {
var top= Math.floor(Math.random() * (70 - 10 + 1)) + 10;
var left= Math.floor(Math.random() * (90 - 10 + 1)) + 10;
scope.myStyle={'top':top+'%','left':left+'%'};
$timeout(function(){
element.remove();
scope.$destroy();
},1200);
}
};
}])
.directive('trumpclicked', function($compile,$timeout) {
var funnyface;
return function(scope, element, attrs) {

element.bind("keydown keypress", function (event) {
if (event.which===13) {
event.preventDefault();
}
});

element.on('click', function(e){
template='<trumpped></trumpped>';	
funnyface = $compile(angular.element(template))(scope);
scope.$digest();
element.parent().parent().prepend(funnyface);
});
}
});