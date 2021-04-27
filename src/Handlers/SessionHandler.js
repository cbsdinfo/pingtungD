import React from 'react'

/* 
   Date   : 2020-06-07 16:28:28
   Author : Arhua Ho
   Content: sessionStorage操作封裝，包含setItem、setStringifyItemSession、getItem、getParseItemSession、removeItem、clear
   @return : { setItem, getItem, removeItem, clear } ； 回傳值 : { setItem, getItem, removeItem, clear }
*/

const setItemSession = (itemName, item) => {
    sessionStorage.setItem(itemName, item);
};

const setStringifyItemSession = (itemName, item) => {
    sessionStorage.setItem(itemName, JSON.stringify(item));
};

const getItemSession = (itemName) => {
    return sessionStorage.getItem(itemName);
};

const getParseItemSession = (itemName) => {
    return JSON.parse(sessionStorage.getItem(itemName));
};

const removeItemSession = (itemName) => {
    sessionStorage.removeItem(itemName);
};

const clearSession = () => {
    sessionStorage.clear();
};

const clearLogoutSession = () => {
    removeItemSession("Dtab");
};

//#region 用來刪除陣列內物件 "指定物件key的值" 等於 "指定value"
const removeByKeyItemSession = (itemName, key, equalValue) => {
    //必為陣列
    setStringifyItemSession(itemName, (getParseItemSession(itemName) ?? []).filter(i => i?.[key] !== equalValue));
}
//#endregion

//#region 新增一個成員至陣列最後
const pushItemSession = (itemName, item) => {
    //必為陣列
    let arr = getParseItemSession(itemName) ?? [];
    arr.push(item)
    setStringifyItemSession(itemName, arr);
}
//#endregion

//#region 新增一個成員至陣列最後，且檢查無重複 "指定物件key的值" 等於 "指定value"
const pushAndNotExsistItemSession = (itemName, key, equalValue, item) => {
    //必為陣列
    // 比較原陣列 與 移除重複項後的陣列 長度是否一致
    let oriArr = (getParseItemSession(itemName) ?? []);
    let arr = (getParseItemSession(itemName) ?? []).filter(i => i?.[key] !== equalValue);
    if (oriArr.length === arr.length) {
        arr.push(item)
        setStringifyItemSession(itemName, arr);
    }
}
//#endregion

export { setItemSession, setStringifyItemSession, getItemSession, getParseItemSession, removeItemSession, clearSession, clearLogoutSession, removeByKeyItemSession, pushItemSession, pushAndNotExsistItemSession };