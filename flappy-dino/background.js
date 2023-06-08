const installUrl = "https://ubg365.org/game/flappy-dino";
const uninstallUrl = "https://ubg365.org/game/flappy-dino";


class ExtBackground {

    initialize() {
        chrome.runtime.onInstalled.addListener(
            (details) => this.onInstalled(details));

        if (uninstallUrl) {
            chrome.runtime.setUninstallURL(uninstallUrl);
        }
    }



    onInstalled(details) {
        if (details.reason == "install") {
            chrome.tabs.create({
                url: `${installUrl}`,
            });
        }
    }
}



new ExtBackground().initialize();

//

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request.method)
    if (request.method == "runtimeID")
        sendResponse("ok");
});

chrome.action.onClicked.addListener((_reason) => {
  chrome.tabs.create({
      url: 'flappy.html'
  });
});