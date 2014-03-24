# 旺中守門員（改）

會做出這版本的目的是自己也有在用，但作者已經不更新了
一開始是覺得阻擋的頁面可以再優化
後來又認為，如果有軟性的「提醒模式」以及自由選擇阻擋的網站
會吸引更多人使用，就做到現在了。

## 特色

* 阻擋模式 vs. 提醒模式：可自由切換，並選擇是否阻擋各網頁
* 入口網站篩選/提醒功能：針對大型入口網站 (e.g. yahoo) 新聞，提醒此來源為旺中集團
* 阻擋清單有旺中集團底下所有媒體，包含：
** 中時、中視、中天、旺報、時報、TVBS、八大，以及其所有粉絲團

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

* 0.6.0
  - 新功能：入口網站篩選，包含 Yahoo 奇摩(中時/TVBS)、蕃薯藤(TVBS)、MSN(中時/TVBS)
  - 阻擋清單增加 TVBS、八大 以及相關所有粉絲團
* 0.5.0
  - 除了原本的「阻擋模式」之外，新增「提醒模式」，此模式仍然看的到旺中網頁但會有提示
* 0.4.3
  - 網頁增加 meta charset = "UTF-8" 以解決編碼問題
* 0.4.2
  - 介面修改
  - 增加阻檔次數計數器(for fun!)
* ver. 0.4.0
  - 新增單一網頁拒看 on/off
  - 增加阻擋提示：會轉向到另一個網頁說明

阻擋的網址包含：

* 中時電子報 `*.chinatimes.com`, `*.wantchinatimes.com`, `*.facebook.com/CTfans`
  - 例外：中時部落格 `blog.chinatimes.com`
* 中天電視 `*.ctitv.com.tw`
* 中國電視公司 `*.ctv.com.tw`, `*.facebook.com/chinatv`
* 旺報 `*.want-daily.com`, `*.facebook.com/wantdaily`
0.4.0 (2014/1/7)
* 時報週刊 `*.ctweekly.com.tw`
* 愛女生雜誌粉絲團 `*.facebook.com/ctwgirl`
0.6.0 (2014/3/24)
* TVBS `*.tvbs.com.tw`, `*.facebook.com/tvbsfb`
* GTV(八大) `*.gtv.com.tw`, `*.facebook.com/loveGTV`
* 以上所有媒體的粉絲團

根據NCC資料 (摘自蘋果日報2012/7/31)
旺中媒體集團包括: 
* 新聞頻道: 中天新聞台
* 衛星頻道: 中天, TVBS, GTV等
* 無線電視: 中視等頻道
* 報紙: 中國時報等
* 新聞網站: 中時電子報
* 雜誌: 時報周刊等

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
