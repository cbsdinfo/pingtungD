import React from 'react';
import { BehaviorSubject } from 'rxjs';

//#region 新建 BehaviorSubject
let GlobalContext = new BehaviorSubject({}); // {} is the initial value
//console.log(GlobalContext)
//#endregion

//#region 主要方法
//#region 取得指定項目
const getChild = (object, childKeyName) => {
    return object[childKeyName];
}

const get = (...keys) => {
    let res = GlobalContext.getValue();
    for (let i = 0; i < keys.length; i++) {
        if (res) {
            res = getChild(res, keys[i])
        }
        else {
            return res;
        }
    }
    return res;
}
//#endregion
//#region 設定、取代指定項目
const set = (...keys) => {
    let res = GlobalContext.getValue();
    if (keys.length === 3) {
        if (!res[`${keys[0]}`]) {
            res[`${keys[0]}`] = {};
        }
        res[`${keys[0]}`][`${keys[1]}`] = keys[2];
        GlobalContext.next(res);
        return GlobalContext.getValue();
    }
    else {
        //若非剛好 pagekey , key ,value，則不處理並返回整個 Context
        console.error("參數設置錯誤")
        return res;
    }
}
//#endregion
//#region 移除指定項目
const remove = (...keys) => {
    let res = GlobalContext.getValue();
    if (keys.length === 1) {
        delete res[`${keys[0]}`]
        GlobalContext.next(res);
        return GlobalContext.getValue();
    }
    else if (keys.length === 2) {
        if (!res[`${keys[0]}`]) {
            return res; // pagekey都不存在，是要移除什麼
        }
        delete res[`${keys[0]}`][`${keys[1]}`]
        GlobalContext.next(res);
        return GlobalContext.getValue();
    }
    else {
        //若非剛好 pagekey , key ,value，則返回不處理並整個 Context
        console.error("參數設置錯誤")
        return res;
    }
}
//#endregion
//#region 清除所有 Context，還原空物件
const clear = (...keys) => {
    GlobalContext.next({});
    return GlobalContext.getValue();
}
//#endregion
//#endregion

//#region 導出操作方法
export const globalContextService = {
    get,
    set,
    remove,
    clear,
};
//#endregion
