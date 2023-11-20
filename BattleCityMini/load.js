var mobile = ['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile','tablet','mobi'];
	    var ua = navigator.userAgent.toLowerCase();
		var isMobile = false;
	    for (var i in mobile) if (ua.indexOf(mobile[i]) > -1) {
			isMobile = true;
			break;
		}
	   	if(isMobile){
			document.write("<script type='text/javascript' src=js/phaser.min.old.js><\/script>");
		}else {
			document.write("<script type='text/javascript' src=js/phaser.min.js><\/script>");
		}