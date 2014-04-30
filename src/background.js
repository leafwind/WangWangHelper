//note: localStorage only supports Strings

var blackList;

$.ajax({
    url: 'blacklist.json',
    async: false,
    dataType: 'json'
})
.done(function( json ) {
    blackList = json;
})
.fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.error(err);
});

//var whiteList = ["udn.com"];

localStorage["lenList"] = blackList.length;
//localStorage["blackList"] = JSON.stringify(blackList);
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
            if( url.search(new RegExp(blackList[i]["url"]) ) > -1) {
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
    if (request.method == 'getBlackList') {
       sendResponse({myBlackList: blackList});
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

    var urlSwitch = JSON.parse(localStorage["urlSwitch"]);
    for (var i = 0; i < localStorage["lenList"]; ++i)
    {
        if ( (urlSwitch[i] == 1) && (details.url.search(new RegExp(blackList[i]["url"])) > -1) ) //pos
        {
            localStorage["blockedURL"] = details.url;
            console.log(details.url + " matched " + i + " : " + RegExp(blackList[i]["url"]) + " : " + details.url.search(new RegExp(blackList[i]["url"])));
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
            var urlSwitch = JSON.parse(localStorage["urlSwitch"]);
            for (var i = 0; i < localStorage["lenList"]; ++i)
            {
                if ( (urlSwitch[i] == 1) && (tab.url.search(new RegExp(blackList[i]["url"])) > -1) )
                {
                    localStorage["blockedURL"] = tab.url;
                    console.log(tab.url + " matched " + i + " : " + RegExp(blackList[i]["url"]) + " : " + tab.url.search(new RegExp(blackList[i]["url"])));
                    
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