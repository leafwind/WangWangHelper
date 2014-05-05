# 旺中小幫手

## 緣由
偶然之下安裝了原本的[旺中守門員](https://github.com/leafwind/no-wang-wang.git)  
覺得這個概念很棒，但作者暫時沒有繼續更新  
  
一開始是覺得阻擋的提示可以再優化  
因為自己有使用上的需要，便開始著手做些小修改  
後來又認為，如果有軟性的「提醒模式」以及自由選擇阻擋的網站，會吸引更多人使用  
就更新到現在

## 更新紀錄

* 0.7.1
  * 改名為旺中小幫手
  * 程式架構微調
* 0.7.0
  * 新功能「FB提示功能」（參考新聞小幫手）
  * 阻擋頁面視覺優化(by muan)
* 0.6.1
  * 修復「視窗變更大小的時候紅框不會更新」的bug
  * 警告區域視覺優化
  * 軟體更新時自動顯示更新記錄
* 0.6.0
  * 新功能「入口網站篩選」：包含 Yahoo 奇摩(中時/TVBS)、蕃薯藤(TVBS)、MSN(中時/TVBS)
  * 阻擋清單增加：TVBS、八大（及所有相關粉絲團）
* 0.5.0
  * 新功能「提醒模式」：此模式下仍然看得到旺中網頁，但會有提示
  * 原本的「阻擋模式」不受影響
* 0.4.3
  * 解決編碼問題(meta: charset = "UTF-8")
* 0.4.2
  * 介面修改
  * 增加阻檔次數計數器(for fun!)
* 0.4.0
  * 新增單一網頁拒看 on/off
  * 增加阻擋提示：會轉向到另一個網頁說明

## 特色

* FB提醒功能：可在塗鴉牆、粉絲專頁等地方提醒連結來源為旺中集團
* 阻擋模式 vs. 提醒模式：可自由切換，並選擇是否阻擋各網頁
* 入口網站篩選/提醒功能：針對大型入口網站 (e.g. yahoo) 新聞，提醒此來源為旺中集團
* 阻擋清單包含旺中集團底下所有媒體：中時、中視、中天、旺報、時報、TVBS、八大，以及其所有粉絲團

## 安裝方式

* 本軟體為 Chrome 擴充程式
  - [原始碼 @ git repo](https://github.com/leafwind/no-wang-wang.git)
  - [安裝網址 @ Chrome Web Store](https://chrome.google.com/webstore/detail/kkihipkdoiapaengcegmaeplaocbhbne/publish-accepted-testers)

* 原始版本「旺中守門員」
  - [原始碼 @ git repo](https://github.com/chitsaou/no-wang-wang.git) 作者 [chitsaou](https://github.com/chitsaou)
  - [安裝網址 @ Chrome Web Store](https://chrome.google.com/webstore/detail/jgoljbdcdakinkigihjocpniamcgofmm/)

## 技術細節

本外掛會偵測您瀏覽網頁時的網址，當網址/新聞內容包含旺中旗下的媒體網站時，自動提示/阻擋瀏覽：

### 阻擋的網址

* 中時電子報 `*.chinatimes.com`, `*.wantchinatimes.com`, `*.facebook.com/CTfans`
  * 例外：中時部落格 `blog.chinatimes.com`
* 中天電視 `*.ctitv.com.tw`
* 中國電視公司 `*.ctv.com.tw`, `*.facebook.com/chinatv`
* 旺報 `*.want-daily.com`, `*.facebook.com/wantdaily`
* 0.4.0 (2014/1/7)
  * 時報週刊 `*.ctweekly.com.tw`
  * 愛女生雜誌粉絲團 `*.facebook.com/ctwgirl`
* 0.6.0 (2014/3/24)
  * TVBS `*.tvbs.com.tw`, `*.facebook.com/tvbsfb`
  * GTV(八大) `*.gtv.com.tw`, `*.facebook.com/loveGTV`
  * 以上所有媒體的粉絲團

### 旺中媒體集團包括（根據蘋果日報2012/7/31 NCC資料）

* 新聞頻道：中天新聞台
* 衛星頻道：中天, TVBS, GTV等
* 無線電視：中視等頻道
* 報紙：中國時報等
* 新聞網站：中時電子報
* 雜誌：時報周刊等

## 聲明

本軟體：

* 不會記錄您的上網歷程
* 不會記錄您試圖上幾次這些網站
* 不會記錄您與這些網站傳輸了什麼資料
