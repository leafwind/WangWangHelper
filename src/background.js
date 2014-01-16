//codeing note: localStorage only supports Strings

var blackLists = [
    "chinatimes.com",
    "ctitv.com.tw",
    "ctv.com.tw",
    "want-daily.com",
    "ctweekly.com.tw",
    "wantchinatimes.com",
    "facebook.com\\/ctwgirl"
];
localStorage["lenLists"] = blackLists.length;
localStorage["blackLists"] = JSON.stringify(blackLists);

for (var i = 0, a = new Array(blackLists.length); i < blackLists.length;) a[i++] = 1;
localStorage["urlSwitch"] = JSON.stringify(a); 

//callback
var listener = function(details)
{
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
            if ( (urlSwitch[i] == 1) && (details.url.search(new RegExp(L[i])) > -1) ) //pos
            {
                localStorage["blockedURL"] = details.url;
                console.log(details.url + " matched " + i + " : " + RegExp(L[i]) + " : " + details.url.search(new RegExp(L[i])));
                //return { cancel: true };
                return { redirectUrl : chrome.runtime.getURL("redirect.html")};
            }
        }
        return {};
    }
};
//console.log(chrome.runtime.getURL("options.html"));

var opt_extraInfoSpec = ["blocking"]; //synchronous

chrome.webRequest.onBeforeRequest.addListener(
    listener, { urls: ["<all_urls>"] }, opt_extraInfoSpec);


function plusLocalStorageCount()
{
    var count = parseInt(localStorage["count"],10) || 0;
    count = count + 1;
    localStorage["count"] = count;
}

function checkBlocked(details)
{
    if(details.redirectUrl == chrome.runtime.getURL("redirect.html"))
    {
        plusLocalStorageCount();
    }
}

chrome.webRequest.onBeforeRedirect.addListener(
    checkBlocked, { urls: ["<all_urls>"] }
);