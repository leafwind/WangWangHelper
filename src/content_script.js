var DEBUG_ = false;
var blackList;

// 從 db 中判斷 title, url 是否是錯誤新聞，是的話執行 cb 並傳入資訊
var check_report = function(title, url, cb) {   
    if (!url) {
        return;
    }
    chrome.extension.sendRequest({method: 'check_report', title: title, url: url}, function(ret){
        if (ret !== false && ret) {
            cb(ret);
        }
    });
}

var buildWarningMessage = function(options){
  return '<div class="nowangwang-warning-facebook">' +
  '<div class="nowangwang-arrow-up"></div>' +
  '注意！來源為<b>旺中集團：</b>' +
  '<span class="nowangwang-description">' +
  $('<span></span>').append(options.title).html() +
  '</span>' +
  '</div>';
};

/*
See FB DOM Tree hierarchy
https://github.com/g0v/newshelper-extension/wiki/Facebook-DOM
*/
var censorFacebook = function(baseNode) {
    var t1_ = Date.now();
    if (window.location.host.indexOf("www.facebook.com") !== -1) {
    /* log browsing history into local database for further warning */
    /* add warning message to a Facebook post if necessary */
    var censorFacebookNode = function(containerNode, titleText, linkHref) {
        if (DEBUG_) console.log('censorFacebookNode', containerNode[0], titleText);
        var matches = ('' + linkHref).match('^http://(l|www)\.facebook\.com/l\.php\\?u=([^&]*)');
        if (matches) {
            linkHref = decodeURIComponent(matches[2]);
        }
        // 處理 被加上 ?fb_action_ids=xxxxx 的情況
        matches = ('' + linkHref).match('(.*)[?&]fb_action_ids=.*');
        if (matches) {
            linkHref = matches[1];
        }
        if(linkHref) {
            var domain = linkHref.split("/")[2];
        }

        var containerNode = $(containerNode);
        var className = "nowangwang-checked";
        if (containerNode.hasClass(className)) {
            return;
        }
        else {
            containerNode.addClass(className);
        }

        // 先看看是不是 uiStreamActionFooter, 表示是同一個新聞有多人分享, 那只要最上面加上就好了
        var addedAction = false;
        containerNode.parent('div[role=article]').find('.uiStreamActionFooter').each(function(idx, uiStreamSource) {
            $(uiStreamSource).find('li:first').append(' · ' + buildActionBar({title: titleText, link: linkHref}));
            addedAction = true;
        });

        // 再看看單一動態，要加在 .uiStreamSource
        if (!addedAction) {
            containerNode.parent('div[role=article]').find('.uiStreamSource').each(function(idx, uiStreamSource) {
                $($('<span></span>').html(buildActionBar({title: titleText, link: linkHref}) + ' · ')).insertBefore(uiStreamSource);

                addedAction = true;
                // should only have one uiStreamSource
                if (idx != 0) console.error(idx + titleText);
            });
        }

        // 再來有可能是有人說某個連結讚
        if (!addedAction) {
            containerNode.parent('div.storyInnerContent').find('.uiStreamSource').each(function(idx, uiStreamSource){
                $($('<span></span>').html(buildActionBar({title: titleText, link: linkHref}) + ' · ')).insertBefore(uiStreamSource);
                addedAction = true;
            });
        }

        // 再來是個人頁面
        if (!addedAction) {
            containerNode.parent('div[role="article"]').siblings('.uiCommentContainer').find('.UIActionLinks').each(function(idx, uiStreamSource){
                $(uiStreamSource).append(' · ').append(buildActionBar({title: titleText, link: linkHref}));
                addedAction = true;
            });
        }

        // 新版Timeline
        if (!addedAction) {
            containerNode.parent('._4q_').find('._6p-').find('._5ciy').find('._6j_').each(function(idx, shareAction){
                console.log(shareAction);
                $($('<a class="_5cix"></a>').html(buildActionBar({title: titleText, link: linkHref}))).insertAfter(shareAction);
                addedAction = true;
            });
        }

        if (!addedAction) {
            containerNode.parent().parent('.UFICommentContent').parent().find('.UFICommentActions').each(function(idx, foo){
                $(foo).append(' · ', buildActionBar({title: titleText, link: linkHref}));
                addedAction = true;
            });
        }
        if (!addedAction) {
            // this check sould be after UFICommentContent
            containerNode.parents('._5pax').find('._5pcp').each(function(idx, foo){
                $(foo).append(' · ', buildActionBar({title: titleText, link: linkHref}));
                addedAction = true;
            });
        }

        // 再來是single post
        if (!addedAction) {
            containerNode.parent('div[role="article"]').find('.uiCommentContainer .UIActionLinks').each(function(idx, uiStreamSource){
                $(uiStreamSource).append(' · ').append(buildActionBar({title: titleText, link: linkHref}));
                addedAction = true;
            });
        }

        if (!addedAction) {
            containerNode.siblings().find('.uiCommentContainer').find('.UIActionLinks').each(function(idx, foo){
                $(foo).append(' · ', buildActionBar({title: titleText, link: linkHref}));
                addedAction = true;
            });
        }

        if (DEBUG_ && !addedAction) console.log('fail to insert actionbar');

        // log the link first 
        //chrome.extension.sendRequest({method: 'log_browsed_link', title: titleText, link: linkHref}, function(response){});

        check_report(titleText, domain, function(report){
            containerNode.addClass(className);
            containerNode.append(buildWarningMessage({
                title: blackList[report.idx]["name"],
                link: ""
            }));
        });
    };


    /* my timeline */
    $(baseNode)
    .find(".uiStreamAttachments")
    .not(".nowangwang-checked")
    .each(function(idx, uiStreamAttachment) {
        uiStreamAttachment = $(uiStreamAttachment);
        var titleText = uiStreamAttachment.find(".uiAttachmentTitle").text();
        var linkHref = uiStreamAttachment.find("a").attr("href");
        censorFacebookNode(uiStreamAttachment, titleText, linkHref);
    });

    $(baseNode)
    .find("._5rwo")
    .not(".nowangwang-checked")
    .each(function(idx, userContent) {
        userContent = $(userContent);
        var titleText = userContent.find(".fwb").text();
        var linkHref = userContent.find("a").attr("href");
        censorFacebookNode(userContent, titleText, linkHref);
    });

    $(baseNode)
    .find("._42ef")
    .not(".nowangwang-checked")
    .each(function(idx, userContent) {
        userContent = $(userContent);
        var titleText = userContent.find(".fwb").text();
        var linkHref = userContent.find("a").attr("href");
        censorFacebookNode(userContent, titleText, linkHref);
    });

    /* others' timeline, fan page */
    $(baseNode)
    .find(".shareUnit")
    .not(".nowangwang-checked")
    .each(function(idx, shareUnit) {
        shareUnit = $(shareUnit);
        var titleText = shareUnit.find(".fwb").text();
        var linkHref = shareUnit.find("a").attr("href");
        censorFacebookNode(shareUnit, titleText, linkHref);
    });

    $(baseNode)
    .find("._5rny")
    .not(".nowangwang-checked")
    .each(function(idx, userContent) {
        userContent = $(userContent);
        var titleText = userContent.find(".fwb").text();
        var linkHref = userContent.find("a").attr("href");
        censorFacebookNode(userContent, titleText, linkHref);
    });

    /* post page (single post) */
    $(baseNode)
    .find("._6kv")
    .not(".nowangwang-checked")
    .each(function(idx, userContent) {
        userContent = $(userContent);
        var titleText = userContent.find(".mbs").text();
        var linkHref = userContent.find("a").attr("href");
        censorFacebookNode(userContent, titleText, linkHref);
    });

    $(baseNode)
    .find("._6m2")
    .not(".nowangwang-checked")
    .each(function(idx, userContent) {
        userContent = $(userContent);
        var titleText = userContent.find(".mbs").text();
        var linkHref = userContent.find("a").attr("href");
        censorFacebookNode(userContent, titleText, linkHref);
    });
/*動態（新）
    $(baseNode)
    .find("._1ui5")
    .not(".nowangwang-checked")
    .each(function(idx, userContent) {
        userContent = $(userContent);
        var titleText = userContent.find(".mbs").text();
        var linkHref = userContent.find("a").attr("href");
        censorFacebookNode(userContent, titleText, linkHref);
    });*/
}

if (DEBUG_) console.log('censorFacebook time', Date.now() - t1_);
};


/* deal with changed DOMs (i.e. AJAX-loaded content) */
var registerObserver = function() {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  var throttle = (function() {
    var timer_
    return function(fn, wait) {
      if (timer_) {
        clearTimeout(timer_);
      }
      timer_ = setTimeout(fn, wait);
    };
  })();

  // 直接 censor 整個 document
  // 這樣才能偵測到滑鼠點選換頁的事件
  var target = document;
  var config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  };

  var mutationObserver = new MutationObserver(function(mutations) {
    chrome.extension.sendRequest({method: 'page'}, function(response){});

    var hasNewNode = false;
    mutations.forEach(function(mutation, idx) {
      if(mutation.type == 'childList' && mutation.addedNodes.length > 0)
        hasNewNode = true;
    });
    if (hasNewNode) {
      throttle(function() {
        censorFacebook(target);
      }, 1000);
    }
  });

  mutationObserver.observe(target, config);
};

var buildActionBar = function(options) {
    return "";
    /*
    var url = 'http://newshelper.g0v.tw';
    if ('undefined' !== typeof(options.title) && 'undefined' !== typeof(options.link)) {
        url += '?news_link=' + encodeURIComponent(options.link) + '&news_title= ' + encodeURIComponent(options.title);
    }
    return '<a href="' + url + '" target="_blank">回報給新聞小幫手</a>';
*/
};

var main = function() {
    if (document.location.hostname == 'www.facebook.com') {
        var target = document.getElementById("contentArea") || document.getElementById("content");
        if (target) {
            censorFacebook(target);
            registerObserver();
        }
        else {
            console.error('#contentArea or #content is not ready');
        }
    }
    /* else {
     check_report('', document.location.href, function(report){
	 chrome.extension.sendRequest({method: 'page'}, function(response){});
	 document.body.style.border = "5px solid red";
	 chrome.extension.sendRequest({
	   method: 'add_notification',
	   title: '注意，您可能是問題新聞的受害者',
	   body: report.report_title,
	   link: report.report_link
	 }, function(response){});
     });
    }*/

  //sync_report_data();
};

chrome.extension.sendRequest({method: "getBlackList"}, function(response) {
    blackList = response.myBlackList;
    main();
});

