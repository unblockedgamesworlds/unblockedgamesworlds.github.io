     function initPoki() 
	{
	   	PokiSDK.init().then(
		    () => {
		        // successfully initialized
		        window.initapi = true;
		        // continue to game
		    }   
		).catch(
		    () => {
		        // initialized but the user has an adblock
		         window.initapi = false;
		         window.adcomplete = 1;
		        // feel free to kindly ask the user to disable AdBlock, like forcing weird usernames or showing a sad face; be creative!
		        // continue to the game
		    }   
		);
	}

	function startLoading()
	{
		//if(window.initapi)
			PokiSDK.gameLoadingStart();
	}
	function endLoading()
	{
		//if(window.initapi)
			PokiSDK.gameLoadingFinished();
	}
	function progressLoading(value)
	{
		//if(window.initapi)
			PokiSDK.gameLoadingProgress(value);
	}



	function StartGame() {
		PokiSDK.gameplayStart();
	}
	function EndGame() {
		PokiSDK.gameplayStop();
	}


	function happyTime1() {
		PokiSDK.happyTime(0.1);
	}
	function happyTime2() {
		PokiSDK.happyTime(0.3);
	}
	function happyTime3() {
		PokiSDK.happyTime(0.5);
	}
	function happyTime4() {
		PokiSDK.happyTime(1);
	}


	function requestAd() 
	{
		if(window.initapi)
		{
			window.showad = 1;

			PokiSDK.commercialBreak()
			.then(
			    () => { //you can also use a normal function here
			        window.showad = 0;
			        window.adcomplete = 1;
			    }
			);
		}
		else
			window.adcomplete = 1;
	}

  	function GetAdState()
	{
		return window.showad;
	}

	function getComplete() 
	{
		return window.adcomplete;
	}
	function resetComplete() 
	{
		window.adcomplete = 0;
	}
