- [1. 目的](#1-目的)
- [2. 主要函數](#2-主要函數)
  - [2.1. set 函數](#21-set-函數)
  - [2.2. get 函數](#22-get-函數)
  - [2.3. remove 函數](#23-remove-函數)
  - [2.4. clear 函數](#24-clear-函數)

## 1. 目的
提供本服務主要目的是為了解決跨組件間傳遞State不斷觸發重新渲染之問題，若無此問題僅用一般State即可。

> 注意事項 <br>
> 1. 路由更變並不會導致文本重置 <br>
> 2. 不同的文本值其key應不同，假使key重複了，前一個文本值將被覆蓋 <br>
> 3. 因為文本的值更變並不會導致畫面更新，所以不應直接使用在頁面上 (除非你手動去控制重新渲染組件)

## 2. 主要函數

 1. set 函數
 2. get 函數
 3. remove 函數
 4. clear 函數

### 2.1. set 函數
    由於文本初始值為空物件，所以提供設定文本值的函數是必須的，
    本函數固定接受 3 個參數，分別是 : 
    pageKey : 所在頁面名稱 String
    varkey : 要設定的Key名 String
    varValue : 要設定的值 Any
    
    Example:
    
```js
//設定選擇的日期
globalContextService.set("HomePage","SelectedDate","2020-11-11"); 

globalContextService.set("HomePage","SelectedDates",{Date1: "2010-10-02" }); 

globalContextService.set("HomePage","SelectedDates", 100); 
```

### 2.2. get 函數
    提供取得文本值的函數。接受 0 個以上的字串參數，分別是 : 
    pageKey : 所在頁面名稱 String
    varkey : 要取得的Key名 String (若其value為物件則支持傳入多個varkey)

    Example:

```js
//取得選擇的日期
globalContextService.get("HomePage","SelectedDate"); 

//取得選擇的日期，代表有set過 { HomePage: { SelectedDates: { Date1: "2010-10-02" } } }
globalContextService.get("HomePage","SelectedDates","Date1"); 


```

### 2.3. remove 函數
    提供移除文本值的函數。接受 1 - 2 個的字串參數，分別是 : 
    pageKey : 所在頁面名稱 String
    varkey : 要取得的Key名 String

    Example:

```js
//移除 文本內 HomePage
globalContextService.remove("HomePage"); 

//移除 文本內 HomePage 下的 SelectedDates
globalContextService.remove("HomePage","SelectedDates"); 


```

### 2.4. clear 函數
    提供清空文本值的函數，會將文本重置為空物件

    Example:

```js
//清空文本
globalContextService.clear(); 


```