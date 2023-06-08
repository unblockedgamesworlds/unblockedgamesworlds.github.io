var GameAnalytics = {
    initialize: () => {
        GameAnalytics.Instance = GameAnalytics
    },
    Instance: {},
    setEnabledInfoLog : () => {},
    configureBuild : () => {},
    configureSdkGameEngineVersion : () => {},
};

var gameanalytics = { GameAnalytics: GameAnalytics };
var device = {
    platform: "PC"
};