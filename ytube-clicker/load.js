var initialized = false;

  function initGDApi(){ // invoke this function to initialize api

    if(!initialized){ // Api will be initialized once, so preroll is shown once either

      var settings = {

        gameId: "d9ef28d7e6a9493da73860d1e0b70414",
        userId: "FB2B5D8E-9E6E-40E0-9909-634EBA5E5F8F-s1",
        resumeGame: resumeGame,
        pauseGame: pauseGame,
        onInit: function (data) {
          initialized = true;
        },
        onError: function (data) {
          console.log("Error:"+data);
        }

      };

     

    }

  }

  initGDApi();

  var gengine = null;

  function resumeGame() {

    if(gengine) {
      gengine.game.onResume.dispatch();
      console.log('resume game');
    }

  }

  function pauseGame() {

    if(gengine) {
      gengine.game.onPause.dispatch();
      console.log('pause game');
    }

  }