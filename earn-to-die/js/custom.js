
function fullscreen(){
  var main_game = document.querySelector('#game-main');
  if(main_game.classList.contains("fullscreen")){
    main_game.classList.remove("fullscreen");
    document.querySelector('.btn-full svg use').setAttribute("href","#enterFullscreenIcon");
  } else {
    main_game.classList.add("fullscreen");
    document.querySelector('.btn-full svg use').setAttribute("href","#closeFullscreenIcon");
  }
}
function open_fullscreen() {
    let game = document.getElementById("gameframe");
    if (game.requestFullscreen) {
    game.requestFullscreen();
    } else if (game.mozRequestFullScreen) { /* Firefox */
    game.mozRequestFullScreen();
    } else if (game.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    game.webkitRequestFullscreen();
    } else if (game.msRequestFullscreen) { /* IE/Edge */
    game.msRequestFullscreen();
    }
};
 
 
window.alert = {};  
function loadMainGame(){
  document.querySelector('.game-frame').innerHTML = `<iframe src="${document.querySelector('.game-frame').dataset.url}" id="gameframe" frameborder="0" style="height: 500px;width: 750px;"></iframe>`;
}
function playGame(){
  document.querySelector(".game-frame").innerHTML = `<iframe src="${document.querySelector('#talpa-splash-button').dataset.url}" id="gameframe" frameborder="0" style="height: 500px; width: 750px;"></iframe>`;
}
 let x = document.getElementById("talpa-splash-button");
 x.addEventListener("click", playGame);
// document.getElementById("btn").onclick = function() {
//         playGame()
//     };