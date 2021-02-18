/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/

const { isNil } = require("lodash");

//#region 檢查原型鍊前陣列是否包含item所有成員 (item 若為 [] 視為包含所有)
/* 
   Date   : 2020-06-22 17:54:42
   Author : Arhua Ho
   Content: 檢查原型鍊前陣列是否包含item所有成員 (item 若為 [] 視為包含所有)，本函數支援傳入單個值
   @Param : item ； 參數值 : 欲檢查有沒有被全部包含的陣列或值
   @return : Boolean ； 回傳值 : true 代表包含所有 false代表不包含所有
*/
Array.prototype.containAll = function (item) {
    //some() 方法會透過給定函式、測試陣列中是否至少有一個元素，通過測試。return Boolean。
    return !([...(Array.isArray(item) ? item : [item])]).some(r => !this.includes(r));
};
//#endregion

//#region 檢查原型鍊前陣列是否包含item部分成員 (item 若為 [] 視為部分包含)
/* 
   Date   : 2020-06-22 17:54:42
   Author : Arhua Ho
   Content: 檢查原型鍊前陣列是否包含item部分成員 (item 若為 [] 視為部分包含)，本函數支援傳入單個值
   @Param : item ； 參數值 : 欲檢查有沒有被部分包含的陣列或值
   @return : Boolean ； 回傳值 : true 代表 false代表
*/
Array.prototype.containPart = function (item) {
    //some() 方法會透過給定函式、測試陣列中是否至少有一個元素，通過測試。return Boolean。
    if (item.length === 0) {
        return true;
    }
    return ([...(Array.isArray(item) ? item : [item])]).some(r => this.includes(r));
};
//#endregion

//#region silce 改寫 silced end參數自 + 1
/* 
   Date   : 2020-06-22 17:54:42
   Author : Arhua Ho
   Content: silce 改寫，
            原本 :
            const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
            console.log(animals.slice(2));
            // expected output: Array ["camel", "duck", "elephant"]

            console.log(animals.slice(2, 4));
            // expected output: Array ["camel", "duck"]
            
            改寫 :
            const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
            console.log(animals.silced(2));
            // expected output: Array ["camel", "duck", "elephant"]

            console.log(animals.silced(2, 3));
            // expected output: Array ["camel", "duck"]

   @Param : startIndex ； 陣列分割起始 index 
   @Param : startIndex ； 陣列分割結束 index 
   @return : Boolean ； 回傳值 : 分割完成之淺拷貝陣列
*/
Array.prototype.silced = function (startIndex, endIndex) {
    let res = this.slice(startIndex, endIndex + 1)
    return res;
};
//#endregion

//#region replace 從陣列指定位置開始取代為傳入陣列
/* 
   Date   : 2020-06-22 17:54:42
   Author : Arhua Ho
   Content: 自splice 改寫，
            const months = ['Jan', 'March', 'April', 'June'];
            months.splice(1, 4, ...['Feb',1,2]);
            // inserts at index 1
            console.log(months);

   @Param : startIndex ； 陣列取代起始 index 
   @Param : startIndex ； 取代陣列  
   @return : Boolean ； 回傳值 : 被移除的項目陣列
*/
Array.prototype.replace = function (startIndex, replaceArray) {

    let res = this.splice(startIndex, replaceArray?.length, ...replaceArray);
    return res; // 被移除的項目陣列
};
//#endregion