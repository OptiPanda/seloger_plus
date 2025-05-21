if (chrome) {
    browser = chrome;
}

if (typeof browser !== "undefined") {
    browser.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.message === 'seloger_plus') {
                run();                    
            }
        }
    );
}

run = (function () {
    'use strict';
    applyOldDate(getPostId());
});
window.addEventListener("DOMContentLoaded", run());

function applyOldDate(postId) {
    var annonce = document.querySelector('[data-testid="aviv.CDP.main"]');

    if (annonce) {
        applyOldDate4Annonce(annonce, postId);
    }
}

function getPostId() {
    return getDatas()?.app_cldp?.data?.classified?.id
}