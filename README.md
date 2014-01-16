# 進擊的旺中獸

原名為旺中守門員，更名的意義有二：
一是表達勢力龐大的媒體，其濫用第五權的力量大到像個怪獸
二是進一步增加功能，所以「旺中獸」也可以想成「對抗旺中的怪獸」
希望平民對抗財團的「武器」也能夠像怪獸一般「進化」。


原版介紹：
「
自動拒看旺旺中時集團旗下所有網路媒體。

拒絕旺旺中時，因為其旗下的中天電視台、中國電視公司（中視）、中國時報，在[併購中嘉網路](http://zh.wikipedia.org/zh-tw/%E6%97%BA%E6%97%BA%E4%B8%AD%E6%99%82%E4%BD%B5%E8%B3%BC%E4%B8%AD%E5%98%89%E6%A1%88)時，態度乖張、處理相關新聞內容偏頗、公器私用，有失其身為大眾媒體應有的態度。

為表達抗議，以及防止手殘誤上這些網站，本軟體會將這幾個新聞媒體的網站封鎖，於是你就看不到這些網站上的廣告了，要是夠多人使用這個軟體，廣告主就知道在這些站投廣告的效果比以前差，投給旺旺中時集團的廣告量會降低，間接達到抗議的目的。
」

## 安裝方式

* 本軟體為一個 Chrome 擴充程式
  - [原始碼 @ git repo] (https://github.com/leafwind/no-wang-wang.git)
  - [安裝網址 @ Chrome Web Store] (https://chrome.google.com/webstore/detail/kkihipkdoiapaengcegmaeplaocbhbne/publish-accepted-testers)

* 原始版本「旺中守門員」作者為 [chitsaou] (https://github.com/chitsaou)
  - [原始碼 @ git repo] (https://github.com/chitsaou/no-wang-wang.git)
  - [安裝網址 @ Chrome Web Store] (https://chrome.google.com/webstore/detail/jgoljbdcdakinkigihjocpniamcgofmm/)

## 技術細節

本外掛會偵測您瀏覽網頁時的網址，當網址包含旺中旗下的媒體網站時，自動阻擋瀏覽：

更新紀錄，：

* 0.4.3
  - 網頁增加 <meta charset = "UTF-8"> 以解決編碼問題
* 0.4.2
  - 介面修改
  - 增加阻檔次數計數器(for fun!)
* ver. 0.4.0
  - 新增單一網頁拒看 on/off
  - 增加阻擋提示：會轉向到另一個網頁說明

阻擋的網址包含：

* 中時電子報 `*.chinatimes.com`
  - 例外：中時部落格 `blog.chinatimes.com`
* 中天電視 `*.ctitv.com.tw`
* 中國電視公司 `*.ctv.com.tw`
* 旺報 `*.want-daily.com`
* 時報週刊 `*.ctweekly.com.tw` (0.4.0, 2014/1/7)
* 英文旺報 `*.wantchinatimes.com` (0.4.0, 2014/1/7)
* 愛女生雜誌粉絲團 `*.facebook.com/ctwgirl` (0.4.0, 2014/1/7)


## 聲明

本軟體：
* 不會記錄您的上網歷程
* 不會記錄您試圖上幾次這些網站
* 不會記錄您與這些網站傳輸了什麼資料

## 軟體授權

本軟體以 MIT License 授權

Copyright (c) 2014 Connor Hsu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
