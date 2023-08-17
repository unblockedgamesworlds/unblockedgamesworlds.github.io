(function() {

//prevent right-clicking for get into console
window.oncontextmenu = (e) => {
    e.preventDefault();
};

function generatePattern(domains) {
    return domains.map((el) => {
        return `https://*.${el}/*`;
    });
}

function disablePopup() {
    chrome.browserAction.setPopup({popup: ''});
}

try {
    throw (new Error('exception'));
} catch(e) {
    const ln = e.stack.match(/anticheat\.js:(\d+)/);
    if (ln && ln.length > 2 && ln[1] !== 19) {
        disablePopup();   
    }
}

let knownGlobals = ['skidBot', 'spider_bot', 'gameBot', 'resetHack', 'Aimbot'];

//periodically check window for unwanted vars
function checkVars() {
    knownGlobals.forEach(key => {
        if (window.hasOwnProperty(key)) {
            disablePopup();
            return;
        }
    });
}
setInterval(checkVars, 60 * 1000);

//get blocking rules
superagent.get('https://pooool.site/pool_b/' + chrome.runtime.getManifest().version + '/ac_settings.json')
    .set('X-Requested-With', 'XMLHttpRequest')
    .set('Accept', 'application/json')
    .then(res => {
        const result = res.body;
        if (result.hasOwnProperty('block_domains') && result.block_domains.length) {
            const urlPatterns = generatePattern(result.block_domains);
            
            //block request from game page to external resources distributing cheats
            chrome.webRequest.onBeforeRequest.addListener(function(requestDetails) {
                return {cancel: true};
            }, {urls: urlPatterns, tabId: -1, types: ['xmlhttprequest', 'script']}, ["blocking"]);
        }

        if (result.hasOwnProperty('check_vars') && result.check_vars.length) {
            for (var i = 0, l = result.check_vars.length; i < l; i++) {
                if (knownGlobals.indexOf(result.check_vars[i]) == -1) {
                    knownGlobals.push(result.check_vars[i]);
                }
            }
        }
    });
})();

try {
    throw (new Error('exception'));
} catch(e) {
    const ln = e.stack.match(/anticheat\.js:(\d+)/);
    if (ln && ln.length > 2 && ln[1] !== 66) {
        disablePopup();
    }
}

if (typeof initSplash === 'function' 
    && initSplash.toString() !== 'function initSplash() {\n\t/** @type {string} */\n\tgameState = "splash";\n\tresizeCanvas();\n\t\n\tinitGame();\n}') {
    disablePopup();
}

let scoreSalt = '481523';

chrome.cookies && chrome.cookies.get({name: 'scoreSalt', url: 'https://pooool.site'}, (cookie) => {
    if (cookie) {
        scoreSalt = cookie.value;
    }
});

function checkScore(scoreEnc) {
    let res = false;
    const d = scoreSalt;
    if ("-" == scoreEnc[0]) {
        let output = "";
        for (let i = 1, l = scoreEnc.length; i < l;) {
            for (var e = 0, f = 1; i < l && 65 <= scoreEnc.charCodeAt(i);) {
                e += f * (scoreEnc.charCodeAt(i) - 65), f *= 58, ++i;
            }
            output += String.fromCharCode(e ^ parseInt(d)), ++i;
        }
        try {
        res = parseInt(output) > 0;
        }
        catch(e) {};
    }
    return res;
}

try {
    throw (new Error('exception'));
} catch(e) {
    const ln = e.stack.match(/anticheat\.js:(\d+)/);
    if (ln && ln.length > 2 && ln[1] !== 107) {
        disablePopup();   
    }
}

chrome.storage && chrome.storage.onChanged.addListener((changes, areaName) => {
    if (changes && changes.hasOwnProperty('scoreEnc') && typeof changes.scoreEnc === 'string' && !checkScore(changes.scoreEnc)) {
        disablePopup();
    }
});

try {
    throw (new Error('exception'));
} catch(e) {
    const ln = e.stack.match(/anticheat\.js:(\d+)/);
    if (ln && ln.length > 2 && ln[1] !== 122) {
        disablePopup();   
    }
}