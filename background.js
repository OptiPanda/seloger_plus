if (chrome) {
    browser = chrome;
}

browser.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        if (changeInfo.url) {
            browser.tabs.sendMessage( tabId, {
                message: 'seloger_plus',
                url: changeInfo.url
            })
        }
    }
);