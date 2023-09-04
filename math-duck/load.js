window.addEventListener("keydown", function(e) {
 	if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
 	e.preventDefault();
 	}
	}, false);
	</script>
      <script>
      document.addEventListener("adBreakStart", () => {
    	console.log("AdBreak Started")
      c3_callFunction("Pause_Game")
     	});  
      document.addEventListener("adBreakComplete", () => {
    	console.log("adBreak Complete")
      c3_callFunction("Resume_Game")
	});    