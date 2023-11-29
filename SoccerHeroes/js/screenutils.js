var Utils;
(function (Utils) {
    var ScreenMetrics = (function () {
        function ScreenMetrics() {
        }
        return ScreenMetrics;
    })();
    Utils.ScreenMetrics = ScreenMetrics;
    (function (Orientation) {
        Orientation[Orientation["PORTRAIT"] = 0] = "PORTRAIT";
        Orientation[Orientation["LANDSCAPE"] = 1] = "LANDSCAPE";
    })(Utils.Orientation || (Utils.Orientation = {}));
    var Orientation = Utils.Orientation;
    ;
    var ScreenUtils = (function () {
        function ScreenUtils() {
        }
        // -------------------------------------------------------------------------
        ScreenUtils.calculateScreenMetrics = function (aDefaultWidth, aDefaultHeight, aOrientation, aMaxGameWidth, aMaxGameHeight) {
            if (aOrientation === void 0) { aOrientation = 1 /* LANDSCAPE */; }
            // get dimension of window
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            // swap if window dimensions do not match orientation
            if ((windowWidth < windowHeight && aOrientation === 1 /* LANDSCAPE */) || (windowHeight < windowWidth && aOrientation === 0 /* PORTRAIT */)) {
                var tmp = windowWidth;
                windowWidth = windowHeight;
                windowHeight = tmp;
            }
            // calculate max game dimension. The bounds are iPad and iPhone 
            if (typeof aMaxGameWidth === "undefined" || typeof aMaxGameHeight === "undefined") {
                if (aOrientation === 1 /* LANDSCAPE */) {
                    aMaxGameWidth = Math.round(aDefaultWidth * 1420 / 1280);
                    aMaxGameHeight = Math.round(aDefaultHeight * 960 / 800);
                }else {
                    aMaxGameWidth = Math.round(aDefaultWidth * 960 / 800);
                    aMaxGameHeight = Math.round(aDefaultHeight * 1420 / 1280);
                }
            }
            // default aspect and current window aspect
            var defaultAspect = (aOrientation === 1 /* LANDSCAPE */) ? 960 / 640 : 640 / 960;
            var windowAspect = windowWidth / windowHeight;
            var offsetX = 0;
            var offsetY = 0;
            var gameWidth = 0;
            var gameHeight = 0;
            // if (aOrientation === Orientation.LANDSCAPE) {
            // "iPhone" landscape ... and "iPad" portrait
            if (windowAspect > defaultAspect) {
                gameHeight = aDefaultHeight;
                gameWidth = Math.ceil((gameHeight * windowAspect) / 2.0) * 2;
                gameWidth = Math.min(gameWidth, aMaxGameWidth);
                offsetX = (gameWidth - aDefaultWidth) / 2;
                offsetY = 0;
            }
            else {
                gameWidth = aDefaultWidth;
                gameHeight = Math.ceil((gameWidth / windowAspect) / 2.0) * 2;
                gameHeight = Math.min(gameHeight, aMaxGameHeight);
                offsetX = 0;
                offsetY = (gameHeight - aDefaultHeight) / 2;
            }
            /* } else {    // "iPhone" portrait
                if (windowAspect < defaultAspect) {
                    gameWidth = aDefaultWidth;
                    gameHeight = gameWidth / windowAspect;
                    gameHeight = Math.min(gameHeight, aMaxGameHeight);
                    offsetX = 0;
                    offsetY = (gameHeight - aDefaultHeight) / 2;
                } else {    // "iPad" portrait
                    gameHeight = aDefaultHeight;
                    gameWidth = gameHeight = windowAspect;
                    gameWidth = Math.min(gameWidth, aMaxGameWidth);
                    offsetX = (gameWidth - aDefaultWidth) / 2;
                    offsetY = 0;
                }
            }
            */
            // calculate scale
            var scaleX = windowWidth / gameWidth;
            var scaleY = windowHeight / gameHeight;
            // store values
            this.screenMetrics = new ScreenMetrics();
            this.screenMetrics.windowWidth = windowWidth;
            this.screenMetrics.windowHeight = windowHeight;
            this.screenMetrics.defaultGameWidth = aDefaultWidth;
            this.screenMetrics.defaultGameHeight = aDefaultHeight;
            this.screenMetrics.maxGameWidth = aMaxGameWidth;
            this.screenMetrics.maxGameHeight = aMaxGameHeight;
            this.screenMetrics.gameWidth = gameWidth;
            this.screenMetrics.gameHeight = gameHeight;
            this.screenMetrics.scaleX = scaleX;
            this.screenMetrics.scaleY = scaleY;
            this.screenMetrics.offsetX = offsetX;
            this.screenMetrics.offsetY = offsetY;
            return this.screenMetrics;
        };
        return ScreenUtils;
    })();
    Utils.ScreenUtils = ScreenUtils;
})(Utils || (Utils = {}));
//# sourceMappingURL=screenutils.js.map