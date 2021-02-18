import React from 'react';
/* 
   Date   : 2020-06-07 16:28:28
   Author : Arhua Ho
   Content: 日期處理、轉換 包含: dateTrans, dateTransAndGetWeek, addDays, addMonths, addYear
   @return : { dateTrans, dateTransAndGetWeek, addDays, addMonths, addYear } ； 回傳值 : { dateTrans, dateTransAndGetWeek, addDays, addMonths, addYear }
*/
//#region 日期處理
const dateTrans = (date) => {
    if (!!date) {
        let newDate = new Date(date);
        let year = (newDate.getFullYear()).toString();
        let month = (newDate.getMonth() + 1).toString().length < 2 ? "0" + (newDate.getMonth() + 1).toString() : (newDate.getMonth() + 1).toString();
        let day = (newDate.getDate()).toString().length < 2 ? "0" + (newDate.getDate()).toString() : (newDate.getDate()).toString()
        return `${year}-${month}-${day}`;
    } else {
        let today = new Date();
        let year = (today.getFullYear()).toString();
        let month = (today.getMonth() + 1).toString().length < 2 ? "0" + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString();
        let day = (today.getDate()).toString().length < 2 ? "0" + (new Date().getDate()).toString() : (new Date().getDate()).toString()
        return `${year}-${month}-${day}`;
    }
}

const dateTransAndGetWeek = (date) => {
    if (!!date) {
        let passWeek = addDays(new Date(date), 6);
        let year = (passWeek.getFullYear()).toString();
        let month = (passWeek.getMonth() + 1).toString().length < 2 ? "0" + (passWeek.getMonth() + 1).toString() : (passWeek.getMonth() + 1).toString();
        let day = (passWeek.getDate()).toString().length < 2 ? "0" + (passWeek.getDate()).toString() : (passWeek.getDate()).toString()
        return `${year}-${month}-${day}`;
    } else {
        let today = addDays(new Date(), 6);
        let year = (today.getFullYear()).toString();
        let month = (today.getMonth() + 1).toString().length < 2 ? "0" + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString();
        let day = (today.getDate()).toString().length < 2 ? "0" + (today.getDate()).toString() : (today.getDate()).toString()
        return `${year}-${month}-${day}`;
    }
}

const addDays = (date, days) => {
    //Date()
    let res = new Date(date);
    res.setDate(date.getDate() + days);
    return res;
}

const addMonths = (date, months) => {
    //Date()
    let res = new Date(date);
    res.setMonth(date.getMonth() + months);
    return res;
}

const addYear = (date, years) => {
    //Date()
    let res = new Date(date);
    res.setFullYear(res.getFullYear() + years);
    return res;
}
//#endregion

//#region moment 取出字串
const fmt = (momentObj, format = `YYYY-MM-DD HH:mm:ss`) => {
    return momentObj.format(`${format}`);
}
//#endregion
export { dateTrans, dateTransAndGetWeek, addDays, addMonths, addYear, fmt };
