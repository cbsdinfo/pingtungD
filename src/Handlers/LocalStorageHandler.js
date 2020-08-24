import React from 'react'

/* 
   Date   : 2020-06-07 16:28:28
   Author : Arhua Ho
   Content: LocalStorage操作封裝，包含setItem、getItem、removeItem、clear
   @return : { setItem, getItem, removeItem, clear } ； 回傳值 : { setItem, getItem, removeItem, clear }
*/

const setItemlocalStorage = (itemName, item) => {
    localStorage.setItem(itemName, item);
};

const getItemlocalStorage = (itemName) => {
    return localStorage.getItem(itemName);
};

const removeItemlocalStorage = (itemName) => {
    localStorage.removeItem(itemName);
};

const clearlocalStorage = () => {
    localStorage.clear();
};

export { setItemlocalStorage, getItemlocalStorage, removeItemlocalStorage, clearlocalStorage };