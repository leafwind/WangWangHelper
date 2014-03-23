//note: localStorage only supports Strings

var blackLists = [
    "chinatimes.com",
    "ctitv.com.tw",
    "ctv.com.tw",
    "want-daily.com",
    "ctweekly.com.tw",
    //"wantchinatimes.com",
    "facebook.com\\/ctwgirl"
];
localStorage["lenLists"] = blackLists.length;
localStorage["blackLists"] = JSON.stringify(blackLists);
localStorage["mode"] = 0;

for (var i = 0, a = new Array(blackLists.length); i < blackLists.length;) a[i++] = 1;
localStorage["urlSwitch"] = JSON.stringify(a); 

/* onBeforeRequest event: check a URL is in black list or not */

//callback
var listener = function(details)
{
    if( localStorage["mode"] == 0) {
        return {};
    }

    if (details.url.indexOf("blog.chinatimes.com") !== -1) {
        return {};
    }

    var L = JSON.parse(localStorage["blackLists"]);
    var urlSwitch = JSON.parse(localStorage["urlSwitch"]);
    for (var i = 0; i < localStorage["lenLists"]; ++i)
    {
        if ( (urlSwitch[i] == 1) && (details.url.search(new RegExp(L[i])) > -1) ) //pos
        {
            localStorage["blockedURL"] = details.url;
            console.log(details.url + " matched " + i + " : " + RegExp(L[i]) + " : " + details.url.search(new RegExp(L[i])));
            //return { cancel: true };
            return { redirectUrl : chrome.runtime.getURL("redirect.html")};
        }
    }
    return {};
};
//console.log(chrome.runtime.getURL("options.html"));

var opt_extraInfoSpec = ["blocking"]; //synchronous

chrome.webRequest.onBeforeRequest.addListener(
    listener, { urls: ["<all_urls>"] }, opt_extraInfoSpec);



/* onBeforeRedirect event: when a URL in black list detected */

function plusLocalStorageCount() {
    var count = parseInt(localStorage["count"],10) || 0;
    count = count + 1;
    localStorage["count"] = count;
}

function checkBlocked(details) {
    if(details.redirectUrl == chrome.runtime.getURL("redirect.html")) {
        plusLocalStorageCount();
    }
}

chrome.webRequest.onBeforeRedirect.addListener(
    checkBlocked, { urls: ["<all_urls>"] }
);



/* onCompleted event */
/*
function completeCallback(details) {
    if (details.url.indexOf("blog.chinatimes.com") !== -1)
    {
        return {};
    }
    else
    {
        var L = JSON.parse(localStorage["blackLists"]);
        var urlSwitch = JSON.parse(localStorage["urlSwitch"]);
        for (var i = 0; i < localStorage["lenLists"]; ++i)
        {
            if ( 1)//(urlSwitch[i] == 1) && (details.url.search(new RegExp(L[i])) > -1) ) //pos
            {
                localStorage["blockedURL"] = details.url;
                console.log(details.url + " matched " + i + " : " + RegExp(L[i]) + " : " + details.url.search(new RegExp(L[i])));
                //return { cancel: true };

                chrome.tabs.executeScript(null,{code: "document.title = '小心！您可能是旺中媒體的受害者！'"});

                chrome.tabs.executeScript( null, { file: "test.js" } );

                return {};
            }
        }
        return {};
    }
}

chrome.webNavigation.onCompleted.addListener(
    completeCallback, { urls: ["<all_urls>"] }
);
*/


chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
    console.log(tab.url);
        if (tab.url.indexOf("blog.chinatimes.com") !== -1) {
            return {};
        }
        else
        {
            var L = JSON.parse(localStorage["blackLists"]);
            var urlSwitch = JSON.parse(localStorage["urlSwitch"]);
            for (var i = 0; i < localStorage["lenLists"]; ++i)
            {
                if ( (urlSwitch[i] == 1) && (tab.url.search(new RegExp(L[i])) > -1) )
                {
                    localStorage["blockedURL"] = tab.url;
                    console.log(tab.url + " matched " + i + " : " + RegExp(L[i]) + " : " + tab.url.search(new RegExp(L[i])));

                    chrome.tabs.executeScript( null, { file: "notifyWebPage.js" } );
                    return {};
                }
            }
            return {};
        }

    }
})

