//note: localStorage only supports Strings

var blackList = [
    "chinatimes.com",
    "ctitv.com.tw",
    "ctv.com.tw",
    "want-daily.com",
    "ctweekly.com.tw",
    "tvbs.com.tw",
    "gtv.com.tw",
    "facebook.com\\/ctwgirl",
    "facebook.com\\/CTfans",
    "facebook.com\\/chinatv",
    "facebook.com\\/wantdaily",
    "facebook.com\\/tvbsfb",
    "facebook.com\\/loveGTV"
];

//var whiteList = ["udn.com"];

localStorage["lenList"] = blackList.length;
localStorage["blackList"] = JSON.stringify(blackList);
//localStorage["blackListName"] = JSON.stringify(blackListName);
localStorage["mode"] = 0;

var b = new Array(blackList.length);
for (var i = 0; i < blackList.length; i++) { b[i] = 1; }
localStorage["urlSwitch"] = JSON.stringify(b);


var check_url = function(url, cb){
    var transaction = opened_db.transaction("report", 'readonly');
    var objectStore = transaction.objectStore("report");
    var index = objectStore.index('news_link');
    var get_request = index.get(url);
    get_request.onsuccess = function() {
        // 如果有找到結果，並且沒有被刪除
        if (get_request.result && !parseInt(get_request.result.deleted_at, 10)) {
          return cb(get_request.result);
        }
        cb(false);
    };
};

// check report by title & url
var check_report = function(title, url, cb) {
    /*if(!url) {
        return cb(false);
    }
    else {*/
        for (var i = 0; i < blackList.length; i++) {
            if( url.search(new RegExp(blackList[i]) ) > -1) {
                return cb({idx: i});
            }
        }
    //}

    /*
    get_newshelper_db(function(opened_db){

    URLNormalizer.query(url, function(normalized_data) {
        if (normalized_data) {
            // 如果有 normalized_data, 就先檢查 normalized_id 是否有符合的，沒有再去找完整網址
            var transaction = opened_db.transaction("report", 'readonly');
            var objectStore = transaction.objectStore("report");
            var index = objectStore.index('news_link_unique');
            var get_request = index.get(normalized_data.normalized_id);
            get_request.onsuccess = function(){
                // 如果有找到結果，並且沒有被刪除
                if (get_request.result && !parseInt(get_request.result.deleted_at, 10)) {
                    return cb(get_request.result);
                }
                check_url(url, cb);
            };
        } else {
            check_url(url, cb);
        }
    });
    });*/
};

function onRequest(request, sender, sendResponse) {
    if (request.method == 'page') {
        // 顯示設定新聞小幫手的 page action
        //chrome.pageAction.show(sender.tab.id);
    }
    if (request.method == 'check_report') {
       check_report(request.title, request.url, sendResponse);
       return;
    }

    // Return nothing to let the connection be cleaned up.
    sendResponse({});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);


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

    var L = JSON.parse(localStorage["blackList"]);
    var urlSwitch = JSON.parse(localStorage["urlSwitch"]);
    for (var i = 0; i < localStorage["lenList"]; ++i)
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

function drawMessageOnScreen(tabId, changeInfo, tab)
{
    if (changeInfo.status == 'complete' && tab.active) {
        if (tab.url.indexOf("blog.chinatimes.com") !== -1) {
            return {};
        }
        //yam tvbs
        //http://video.n.yam.com/20140323186084/%E5%AD%B8%E9%81%8B%E9%AC%A7%E5%88%86%E6%AD%A7%EF%BC%9F%20%E5%82%B3%E7%B6%B2%E5%8F%8B%E8%99%9F%E5%8F%AC%E9%80%BC%E9%80%80%E9%99%B3%E7%82%BA%E5%BB%B7
        //yahoo china
        //http://tw.news.yahoo.com/%E5%82%85-%E8%90%81-%E6%88%91%E8%A6%81%E7%AB%99%E5%87%BA%E4%BE%86%E6%94%AF%E6%8C%81%E5%9C%8B%E6%B0%91%E9%BB%A8-215433643.html
        //yahoo tvbs
        //http://tw.news.yahoo.com/%E5%BC%B5%E5%AE%B6%E7%A5%9D%E6%89%B9-%E6%95%99%E6%8E%88%E8%AA%A4%E5%9C%8B-%E5%8F%B0%E5%A4%A7%E6%95%99%E6%8E%88%E5%87%BA%E9%9D%A2%E5%8F%8D%E9%A7%81-115800084.html
        //msn china
        //http://news.msn.com.tw/news3620596.aspx
        //msn tvbs
        //http://news.msn.com.tw/news3621833.aspx}
        else if (tab.url.indexOf("yam.com") !== -1
              || tab.url.indexOf("news.yahoo.com") !== -1
              || tab.url.indexOf("news.msn.com") !== -1)
        {
            //chrome.tabs.executeScript(null, { file: "jquery-1.8.2.min.js" }, function() {
                //chrome.tabs.executeScript(null, { file: "function.js" });
                chrome.tabs.executeScript(null, { file: "entrySite.js" });
            //});
        }
        else
        {
            var L = JSON.parse(localStorage["blackList"]);
            var urlSwitch = JSON.parse(localStorage["urlSwitch"]);
            for (var i = 0; i < localStorage["lenList"]; ++i)
            {
                if ( (urlSwitch[i] == 1) && (tab.url.search(new RegExp(L[i])) > -1) )
                {
                    localStorage["blockedURL"] = tab.url;
                    console.log(tab.url + " matched " + i + " : " + RegExp(L[i]) + " : " + tab.url.search(new RegExp(L[i])));
                    
                    //chrome.tabs.executeScript(null, { file: "jquery-1.8.2.min.js" }, function() {
                        //chrome.tabs.executeScript(null, { file: "function.js" });
                        chrome.tabs.executeScript(null, {
                            code: "var mediaName = getDiv('_mediaName');"+
                            "draw('旺中集團');"+
                            "mediaName.name = '旺中集團';" });
                    //});
                    return {};
                }
            }
            return {};
        }

    }
}

function promptNewVersion(details) {
    if (details.reason == "install" || details.reason == "update") {
        chrome.tabs.create({url: "options.html"});
    }
}

chrome.tabs.onUpdated.addListener( drawMessageOnScreen );

chrome.runtime.onInstalled.addListener( promptNewVersion );

/*
function onRequest(request, sender, sendResponse) {
    if (request.method == 'filterEntrySite') {
        // 顯示設定新聞小幫手的 page action
        chrome.pageAction.show(sender.tab.id);
    }
    if (request.method == 'checkNewsSite') {
        add_notification(request.title, request.body, request.link);
    }
    if (request.method == 'check_report') {
        check_report(request.title, request.url, sendResponse);
        return;
    }

    // Return nothing to let the connection be cleaned up.
    sendResponse({});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);
*/