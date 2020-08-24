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
//#region 用來刪除陣列內物件 "指定物件key的值" 等於 "指定value"
const removeByKeyItemSession = (itemName, key, equalValue) => {
    //必為陣列
    setStringifyItemSession(itemName, (getParseItemSession(itemName) ?? []).filter(i => i?.[key] !== equalValue));
}

export { setItemSession, setStringifyItemSession, getItemSession, getParseItemSession, removeItemSession, clearSession, removeByKeyItemSession };