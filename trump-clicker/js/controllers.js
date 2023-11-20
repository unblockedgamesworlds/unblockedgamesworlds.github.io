angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope,$window,Settings,$interval,$timeout,$localStorage,$ionicPopup,$localStorage) {
$scope.settings = Settings.getAll();
if($scope.settings.hasplayed==0){
var alertPopup = $ionicPopup.alert({
title: 'Tutorial',
template: '1. Click Trump to earn money<br><br>2. Buy upgrades to gain votes.<br><br>3. Use votes to win the election.'
});
alertPopup.then(function(res) {
$scope.settings.hasplayed=1;
});
}
$scope.resetg=function(){
$localStorage.$reset()
$timeout(function(){
$window.location.reload(true);
},50)
}
var check=function(){
upgradenew=0;
angular.forEach($scope.settings.upgrades, function(value, key) {
if($scope.settings.money>=value.cost){
upgradenew+=1;
}
});
$scope.settings.upgradebadge=upgradenew;
statenew=0;
angular.forEach($scope.settings.states, function(value, key) {
if($scope.settings.votes>=value.cost && value.bought==0){
statenew+=1;
}
});
$scope.settings.statebadge=statenew;
}
$scope.clicky=function(){
$scope.settings.money+=$scope.settings.click;
$scope.settings.trumpclicks+=1;
}
$interval(function() {
$scope.settings.votes+=$scope.settings.votesper;
$scope.settings.money+=$scope.settings.clicksper;
check();
},1000);
})

.controller('ChatsCtrl', function($scope, Settings,$ionicPopup) {
$scope.settings = Settings.getAll();

var showpop=function(){
var alertPopup = $ionicPopup.alert({
title: 'Not enough money!',
template: 'Keep clicking Trump to earn more.'
});
}

$scope.upgadeclick=function(){
LaggedAPI.GEvents.next();
if($scope.settings.money>= $scope.settings.upgrades.clicker.cost){
$scope.settings.click=Math.ceil($scope.settings.click+($scope.settings.click*0.4111));
$scope.settings.money-=$scope.settings.upgrades.clicker.cost;
$scope.settings.upgrades.clicker.cost=Math.floor($scope.settings.upgrades.clicker.cost+($scope.settings.upgrades.clicker.cost*0.6));
$scope.settings.upgrades.clicker.bought+=1;
if($scope.settings.upgrades.clicker.bought>5){
$scope.settings.clicksper+=Math.floor($scope.settings.upgrades.clicker.bought/3);
}
upgradenew=0;
angular.forEach($scope.settings.upgrades, function(value, key) {
if($scope.settings.money>=value.cost){
upgradenew+=1;
}
});
$scope.settings.upgradebadge=upgradenew;
}else{
showpop();
}
}

$scope.buyvotes=function(item){
if($scope.settings.money>=$scope.settings.upgrades[item].cost){
$scope.settings.votesper+=$scope.settings.upgrades[item].persec;
$scope.settings.money-=$scope.settings.upgrades[item].cost;
$scope.settings.upgrades[item].cost=Math.floor($scope.settings.upgrades[item].cost+($scope.settings.upgrades[item].cost*0.3999));
$scope.settings.upgrades[item].persec=Math.ceil($scope.settings.upgrades[item].persec+($scope.settings.upgrades[item].persec*0.311));
$scope.settings.upgrades[item].bought+=1;
if($scope.settings.upgrades[item].bought>1){
$scope.settings.clicksper+=Math.floor($scope.settings.upgrades[item].bought/3);
}
upgradenew=0;
angular.forEach($scope.settings.upgrades, function(value, key) {
if($scope.settings.money>=value.cost){
upgradenew+=1;
}
});
$scope.settings.upgradebadge=upgradenew;
}else{
showpop();
}
}
})

.controller('AccountCtrl', function($scope, Settings,$ionicPopup,$filter) {
$scope.settings = Settings.getAll();
var youwin=function(){
var hourDiff = Date.now() - $scope.settings.timestart;
var diffHrs = Math.floor((hourDiff % 86400000) / 3600000);
var diffMins = Math.floor(((hourDiff % 86400000) % 3600000) / 60000);
if(diffHrs>0){
diffMins=diffHrs+' hours and '+	diffMins+' minutes';
}else{
diffMins=diffMins+' minutes';
}
$scope.settings.wongame=1;
var alertPopup = $ionicPopup.alert({
title: 'You Beat the Game',
template: 'Total clicks: '+$filter('number')($scope.settings.trumpclicks)+'<br>Total time: '+diffMins
});
}

var wonit=function(){
var alertPopup = $ionicPopup.alert({
title: 'You Won!',
template: 'Congrats, you helped Trump win an election!'
});
}

var showpop=function(){
var alertPopup = $ionicPopup.alert({
title: 'Not enough votes!',
template: 'Come back when you have more votes.'
});
}

$scope.buyelection=function(k){

if($scope.settings.states[k].bought==0){
if($scope.settings.states[k].cost>$scope.settings.votes){
showpop();
}else{
$scope.settings.states[k].bought=1;
$scope.settings.votes-=$scope.settings.states[k].cost;
wonit();
//check if won
statenew=0;
angular.forEach($scope.settings.states, function(value, key) {
if(value.bought==0){
statenew+=1;
}
});
if(statenew==0){
youwin();
}
}
}
}
})

.controller('checkbadge', function($scope, Settings) {
$scope.settings = Settings.getAll();
})

.controller('checkupgrade', function($scope, Settings) {
$scope.settings = Settings.getAll();
});
