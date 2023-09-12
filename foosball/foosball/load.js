$(document).ready(function(){
var oMain = new CMain({

                fullscreen:true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                check_orientation:true,     //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                level_menu_rows: 1,     //SET NUM ROW ON LEVEL MENU
                level_menu_cols: 5,     //SET NUM COLS ON LEVEL MENU
                num_goal_friendly: 7,   //SET NUM GOAL FOR WIN IN FRIENDLY MODE
                cpu_speed_friendly: 5  //SET CPU MOVEMENT SPEED, 10 = YOUR MOVEMENT SPEED
               });


// $(oMain).on("start_session", function(evt) {
// LaggedAPI.init('foosball_manv_inits','lagdevaF3001');
// });


$(oMain).on("show_interlevel_ad", function(evt) {
if(typeof prerollStart === 'undefined'){
console.log('skip ad, prerollStart not found')
}else{
createjs.Sound.setMute(true);
LaggedAPI.APIAds.show('interstitial','foosball','foosball-game.png',function(response) {
if(response.success) {
console.log('ad finished');
createjs.Sound.setMute(false);
}else {
console.log('ad error, continue');
createjs.Sound.setMute(false);
}
});
}
});


if(isIOS()){
setTimeout(function(){sizeHandler();},200);
}else{ sizeHandler(); }

});
