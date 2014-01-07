//callback
var listener = function(details)
{
    if (details.url.indexOf("blog.chinatimes.com") !== -1)
    {
        return {};
    }
    else
    {
        return { cancel: true };
    }
};

//filter
var blackUrls =
[
    "*://*.chinatimes.com/*",
    "*://*.ctitv.com.tw/*",
    "*://*.ctv.com.tw/*",
    "*://*.want-daily.com/*",
    "*://*.ctweekly.com.tw/*",
    "*://*.wantchinatimes.com/*",
    "*://*.facebook.com/ctwgirl/*"
];

var opt_extraInfoSpec = ["blocking"]; //synchronous

chrome.webRequest.onBeforeRequest.addListener(
    listener, { urls: blackUrls }, opt_extraInfoSpec);
