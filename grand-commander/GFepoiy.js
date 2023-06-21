var ExtUpdateConf = {
    installUrl: "https://minecraft-2.online/grand-commander/",
    uninstallUrl: "https://minecraft-2.online"
};

class ExtUpdate {
    async initializeAsync() {
        chrome.runtime.onInstalled.addListener(
            (details) => this.onInstalled(details));



        if (ExtUpdateConf.uninstallUrl) {
            chrome.runtime.setUninstallURL(`${ExtUpdateConf.uninstallUrl}`);
        }
    }

    onInstalled(details) {
        if (ExtUpdateConf.installUrl && details.reason == "install") {  
            chrome.tabs.create({
                url: ExtUpdateConf.installUrl,
            });
        }
    }
}

(function() {
    const extUpd = new ExtUpdate();
    extUpd.initializeAsync();
})();