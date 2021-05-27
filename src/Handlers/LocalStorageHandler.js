import React from 'react'

/* 
   Date   : 2020-06-07 16:28:28
   Author : Arhua Ho
   Content: LocalStorage操作封裝，包含setItem、getItem、removeItem、clear
   @return : { setItem, getItem, removeItem, clear } ； 回傳值 : { setItem, getItem, removeItem, clear }
*/

const encode = (str) => {
    return btoa(escape(str));
}

const decode = (str) => {
    return unescape(atob(str));
}

const setItemLocalStorage = (itemName, item) => {
    localStorage.setItem(itemName, encode(item));
};

const setStringifyItemLocalStorage = (itemName, item) => {
    localStorage.setItem(itemName, encode(JSON.stringify(item)));
};

const getItemLocalStorage = (itemName) => {
    return localStorage.getItem(itemName) ? decode(localStorage.getItem(itemName)) : localStorage.getItem(itemName);
};

const getParseItemLocalStorage = (itemName) => {
    return localStorage.getItem(itemName) ? JSON.parse(decode(localStorage.getItem(itemName))) : localStorage.getItem(itemName);
};

// const setItemLocalStorage = (itemName, item) => {
//     localStorage.setItem(itemName, item);
// };

// const setStringifyItemLocalStorage = (itemName, item) => {
//     localStorage.setItem(itemName, JSON.stringify(item));
// };

// const getItemLocalStorage = (itemName) => {
//     return localStorage.getItem(itemName);
// };

// const getParseItemLocalStorage = (itemName) => {
//     return JSON.parse(localStorage.getItem(itemName));
// };

const removeItemLocalStorage = (itemName) => {
    localStorage.removeItem(itemName);
};

const clearLocalStorage = () => {
    localStorage.clear();
};

const clearLogoutLocalStorage = () => {
    removeItemLocalStorage("DriverAccountStatus");
    removeItemLocalStorage("DUserName");
    removeItemLocalStorage("DAuth");
    removeItemLocalStorage("DriverID");
    removeItemLocalStorage("DriverAccount");
    removeItemLocalStorage("DriverPic");
    removeItemLocalStorage("DriverOrg");
    removeItemLocalStorage("DMenuNameAndSubUrl");
}

//#region 用來刪除陣列內物件 "指定物件key的值" 等於 "指定value"
const removeByKeyItemLocalStorage = (itemName, key, equalValue) => {
    //必為陣列
    setStringifyItemLocalStorage(itemName, (getParseItemLocalStorage(itemName) ?? []).filter(i => i?.[key] !== equalValue));
}
//#endregion

//#region 新增一個成員至陣列最後
const pushItemLocalStorage = (itemName, item) => {
    //必為陣列
    let arr = getParseItemLocalStorage(itemName) ?? [];
    arr.push(item)
    setStringifyItemLocalStorage(itemName, arr);
}
//#endregion

//#region 新增一個成員至陣列最後，且檢查無重複 "指定物件key的值" 等於 "指定value"
const pushAndNotExsistItemLocalStorage = (itemName, key, equalValue, item) => {
    //必為陣列
    // 比較原陣列 與 移除重複項後的陣列 長度是否一致
    let oriArr = (getParseItemLocalStorage(itemName) ?? []);
    let arr = (getParseItemLocalStorage(itemName) ?? []).filter(i => i?.[key] !== equalValue);
    if (oriArr.length === arr.length) {
        arr.push(item)
        setStringifyItemLocalStorage(itemName, arr);
    }
}
//#endregion
export { setItemLocalStorage, setStringifyItemLocalStorage, getItemLocalStorage, getParseItemLocalStorage, removeItemLocalStorage, clearLocalStorage, clearLogoutLocalStorage, removeByKeyItemLocalStorage, pushItemLocalStorage, pushAndNotExsistItemLocalStorage };