 var needAPI = true;
        var game;
        var canvas = document.getElementById("canvas");
        if(canvas) {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
        }

        if (!needAPI) {
            window.onload = function() {
                var game = new App();
            };
        }
        else {
            window.famobi_gameID = "mahjong-classic";
            window.famobi_gameJS = [
                "lib/easeljs-NEXT.min.js",
                "lib/preloadjs-NEXT.min.js",
                "lib/soundjs-NEXT.min.js",
                "lib/tweenjs-NEXT.min.js",
                "proto1.js",

                function () {
                    window.famobi_ads = false;

                    window.famobi_forceSD = true;
                    window.famobi_forceHD = false;

                    game = new App();
                }
            ];
            (function (document, url, fgJS, firstJS) {
                fgJS = document.createElement('script');
                firstJS = document.getElementsByTagName('script')[0];

                fgJS.src = url + encodeURIComponent(document.location.href);
                firstJS.parentNode.insertBefore(fgJS, firstJS);
            })(document, 'html5games/gameapi/v1.js?e=');
        }