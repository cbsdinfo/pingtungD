import React from 'react';
import { isPlainObject, isFunction, cloneDeep } from 'lodash/lang';
import { mediaQueryKey, mediaQuery } from '../MediaQuery/MediaQuery';
import { pseudoClass } from '../PseudoClass/PseudoClass';
import { cssifyObject } from 'css-in-js-utils'

//#region 底層組件用
/* 
   Date   : 2020-07-29 16:08:20
   Author : Arhua Ho
   Content: 本函數旨在返回對應的樣式
            首先組件層傳進來的應為一物件，
            物件內每一個Key對應到每一個可修改項，
            而其value則可為物件或函數，所返回內容會直接取代指定之基底樣式，
            傳進來的物件如 :  
            {
                "可修改樣式1" : {...},
                "可修改樣式2" : ()=>( {...} ),
                "斷點名稱1" : {
                    "可修改樣式1" : {...},
                    "可修改樣式2" : ()=>( {...} ),
                },
                "斷點名稱2" : {
                    "可修改樣式1" : {...},
                    "可修改樣式2" : ()=>( {...} ),
                }
            }

            themeKey 必傳
*/
export const themeBeUsed = (baseThemeName, switchDefaultThemeFunction, theme, ...themeKey) => {
    const DefaultThemeWhichUsedNow = switchDefaultThemeFunction(baseThemeName);// 取得指定的預設樣式

    //#region 取得除了RWD斷點以外的 預設樣式Key
    // const defaultThemeWithoutRWD = Object.keys(DefaultThemeWhichUsedNow).filter(item => !mediaQueryKey.includes(item));
    //#endregion

    //console.log(baseThemeName, theme, themeKey)
    if (themeKey.length > 0) {
        //至少有一個 themeKey

        //非RWD層
        if (themeKey.length === 1) {
            if (isPlainObject(theme?.[themeKey[0]])) {
                //如果物件存在，直接覆蓋
                return theme[themeKey[0]];
            }
            else if (isFunction(theme?.[themeKey[0]])) {
                //如果函數存在，執行後回傳
                return theme[themeKey[0]](DefaultThemeWhichUsedNow[themeKey[0]]);
            }
            else {
                //不是物件或函數，回傳預設樣式 

                return DefaultThemeWhichUsedNow[themeKey[0]];
            }
        }

        //RWD層
        if (themeKey.length === 2) {
            if (isPlainObject(theme?.[themeKey[0]]?.[themeKey[1]])) {
                //如果物件存在，直接覆蓋
                //console.log("fu",theme[themeKey[0]][themeKey[1]])
                return theme[themeKey[0]][themeKey[1]];
            }
            else if (isFunction(theme?.[themeKey[0]]?.[themeKey[1]])) {
                //如果函數存在，執行後回傳
                //console.log("function")
                return theme[themeKey[0]][themeKey[1]](DefaultThemeWhichUsedNow[themeKey[1]]);
            }
            else {
                ////不是物件或函數，回傳theme的預設樣式 或 DefaultTheme的預設樣式
                //console.log("no")
                if (theme?.[themeKey[1]]) {
                    //如果theme的預設樣式存在
                    if (isPlainObject(theme[themeKey[1]])) {
                        //如果物件存在，直接覆蓋
                        return theme[themeKey[1]];
                    }
                    else if (isFunction(theme[themeKey[1]])) {
                        //如果函數存在，執行後回傳
                        return theme[themeKey[1]](DefaultThemeWhichUsedNow[themeKey[1]]);
                    }
                }
                else {
                    //如果theme的預設樣式不存在
                    if (isPlainObject(theme[themeKey[1]])) {
                        //如果 DefaultTheme的預設樣式 物件存在，直接覆蓋
                        return DefaultThemeWhichUsedNow[themeKey[1]];
                    }
                    else if (isFunction(theme[themeKey[1]])) {
                        //如果 DefaultTheme的預設樣式 函數存在，執行後回傳
                        return DefaultThemeWhichUsedNow[themeKey[1]](DefaultThemeWhichUsedNow[themeKey[1]]);
                    }
                }
                //theme裡面都沒有傳對應的 可修改樣式 ，那就從預設裡面拿
                return DefaultThemeWhichUsedNow[themeKey[1]];
            }
        }
    }
}
//#endregion

//#region 次層組件用，判斷為函數就執行函數並返回回傳值;否則直接回傳

/* 
   Date   : 2020-08-12 11:51:07
   Author : Arhua Ho
   Content: 
          @Param : otherOrFun ； 開發者傳入的物件 : 供判斷類型，並依類型提供返回結果
          @Param : executeParam ； 開發者所選擇的預設樣式 : 若 otherOrFun 為函數時傳入使用
          @Param : componentProps ； 開發者傳入的整包props : 若 otherOrFun 為函數時傳入使用
          !!注意 executeParam 若為函數，則以 (null, componentProps) 帶入執行，並返回物件
*/
export const returnObjOrExecute = (otherOrFun, executeParam, componentProps) => {
    if (isFunction(otherOrFun)) {
        //console.log("otherOrFun 是函數")

        // 要一併解決 executeParam (預設樣式) 為函數時的情況
        if (isFunction(executeParam)) {
            return otherOrFun(executeParam(null, componentProps), componentProps);
        } else {
            return otherOrFun(executeParam, componentProps);
        }
    } else if (isPlainObject(otherOrFun)) {
        //console.log("otherOrFun 是物件")
        return otherOrFun;
    } else {
        //console.log("otherOrFun 是其他")

        // 要一併解決 executeParam (預設樣式) 為函數時的情況
        if (isFunction(executeParam)) {
            return executeParam(null, componentProps);
        } else {
            return executeParam;
        }
    }

}

//#endregion

//#region 底層組件取得傳入樣式的方法
/* 
   Date   : 2020-08-12 11:38:05
   Author : Arhua Ho
   Content: 支援同一種組件不同斷點
          @Param : componentProps ； 開發者傳入的props : 供判斷類型，並依類型提供返回結果
          @Param : themeFromProps ； 開發者傳入的props.theme : 若 otherOrFun 為函數時傳入使用
          @Param : switchDefaultThemeResult ； 開發者選擇的預設樣式 : 若 otherOrFun 為函數時傳入使用
*/
export const BaseLevelTheme = (componentProps, themeFromProps, switchDefaultThemeResult) => {
    //console.log(componentProps)
    let keyIsNotBreakPointFromProps = Object.keys(themeFromProps ?? []).filter((item) => !mediaQueryKey.includes(item));// 取得自 props 中 非斷點的key
    let keyIsBreakPointFromProps = Object.keys(themeFromProps ?? []).filter((item) => mediaQueryKey.includes(item));// 取得自 props 中 為斷點的key
    let keyIsNotBreakPointFromDefaultTheme = Object.keys(switchDefaultThemeResult ?? []).filter((item) => !mediaQueryKey.includes(item));// 取得自 props 中 非斷點的key

    let themeFromPropsRegular = cloneDeep(switchDefaultThemeResult);
    let resultOfThemeString = ``;

    //#region 處理非RWD的物件，並轉成模板字串
    keyIsNotBreakPointFromProps = [...keyIsNotBreakPointFromDefaultTheme, ...keyIsNotBreakPointFromProps]
    keyIsNotBreakPointFromProps.forEach((item, index) => {// 連同偽類也包含在物件內

        themeFromPropsRegular[item] = { ...returnObjOrExecute(themeFromProps?.[item], switchDefaultThemeResult?.[item], componentProps) }

        if (item === "basic") {
            resultOfThemeString = resultOfThemeString + `
& {
     ${cssifyObject(themeFromPropsRegular[item])};
}`
        }

        if (pseudoClass.includes(item.split("(")[0])) {//左誇號前字段若屬 pseudoClass 陣列內，則為偽類
            resultOfThemeString = resultOfThemeString + `
&:${item} {
     ${cssifyObject(themeFromPropsRegular[item])};
}`
        }

    })
    //#region 若沒有傳還是要套用 預設樣式
    // if (keyIsNotBreakPointFromProps.length === 0) {//若沒有傳還是要套用 預設樣式
    //     Object.keys(switchDefaultThemeResult).forEach((defauleItem, defaultIndex) => {
    //         if (defauleItem === "basic") {
    //             resultOfThemeString = resultOfThemeString + `
    // & {
    //      ${cssifyObject(themeFromPropsRegular[defauleItem])};
    // }`
    //         }

    //         if (pseudoClass.includes(defauleItem.split("(")[0])) {//左誇號前字段若屬 pseudoClass 陣列內，則為偽類
    //             resultOfThemeString = resultOfThemeString + `
    // &:${defauleItem} {
    //      ${cssifyObject(themeFromPropsRegular[defauleItem])};
    // }`
    //         }
    //     })
    // }
    //#endregion

    //#endregion

    //#region 處理RWD的物件，並轉成模板字串
    //#region 首先先將RWD斷點做排序，確保從小到大
    let sortKeyIsBreakPointFromProps = []; // props中屬RWD的Key由小到大排序
    mediaQueryKey.forEach((mediaBreakPointItem, mediaBreakPointIndex) => {
        if (keyIsBreakPointFromProps.includes(mediaBreakPointItem)) {
            sortKeyIsBreakPointFromProps.push(mediaBreakPointItem);
        }
    })
    //#endregion

    sortKeyIsBreakPointFromProps.forEach((breakPointItem, breakPointIndex, breakPointArr) => { // 用排過順序的下去用  breakPointItem 是排序過的斷點 
        themeFromPropsRegular[breakPointItem] = {}; // 因為預設樣式都不提供RWD樣式
        resultOfThemeString = resultOfThemeString + `
@media ${ mediaQuery[breakPointItem]} {`
        Object.keys(themeFromProps[breakPointItem]).forEach((it, ind) => {// it 是 tablet 下 的 basic, hover ...
            themeFromPropsRegular[breakPointItem][it] = { ...returnObjOrExecute(themeFromProps?.[breakPointItem]?.[it], switchDefaultThemeResult?.[it], componentProps) }
            if (it === "basic") {
                resultOfThemeString = resultOfThemeString + `
    & {
        ${cssifyObject(themeFromPropsRegular[breakPointItem][it])};
    }`
            }

            if (pseudoClass.includes(it.split("(")[0])) {//左誇號前字段若屬 pseudoClass 陣列內，則為偽類
                resultOfThemeString = resultOfThemeString + `
    &:${it} {
         ${cssifyObject(themeFromPropsRegular[breakPointItem][it])};
    }`
            }
        })
        resultOfThemeString = resultOfThemeString + `
}`
    })
    //#endregion

    // console.log(resultOfThemeString)
    return resultOfThemeString;
}
//#endregion

//#region 中層組件使用取得樣式的方法
/* 
   Date   : 2020-08-14 16:51:37
   Author : Arhua Ho
   Content: 
            @Param : componentProps ； 開發者傳入的props : 供判斷類型，並依類型提供返回結果
            @Param : themeFromProps ； 開發者傳入的props.theme : 若 otherOrFun 為函數時傳入使用
            @Param : switchDefaultThemeResult ； 必須為皆為一般物件，開發者選擇的預設樣式 : 若 otherOrFun 為函數時傳入使用，
            @Param : primaryKey ； 參數值 : 取用的中層組件Key
*/
export const iterateTheme = (componentProps, themeFromProps, switchDefaultThemeResult, primaryKey) => {
    //console.log(componentProps)
    let keyIsNotBreakPointFromProps = Object.keys(themeFromProps?.[primaryKey] ?? []).filter((item) => !mediaQueryKey.includes(item));// 取得自 props 中 非斷點的key
    let keyIsBreakPointFromProps = Object.keys(themeFromProps?.[primaryKey] ?? []).filter((item) => mediaQueryKey.includes(item));// 取得自 props 中 為斷點的key
    let keyIsNotBreakPointFromDefaultTheme = Object.keys(switchDefaultThemeResult?.[primaryKey] ?? []).filter((item) => !mediaQueryKey.includes(item));// 取得自 props 中 非斷點的key

    let themeFromPropsRegular = cloneDeep(switchDefaultThemeResult);
    //console.log(switchDefaultThemeResult?.[primaryKey])
    //console.log(themeFromProps)

    keyIsNotBreakPointFromProps = [...keyIsNotBreakPointFromDefaultTheme, ...keyIsNotBreakPointFromProps]

    //console.log(keyIsNotBreakPointFromProps)
    keyIsNotBreakPointFromProps.forEach((item, index) => {
        themeFromPropsRegular[primaryKey][item] = { ...returnObjOrExecute(themeFromProps?.[primaryKey]?.[item], switchDefaultThemeResult?.[primaryKey]?.[item], componentProps) }
    })

    keyIsBreakPointFromProps.forEach((breakPointItem, breakPointIndex) => {
        themeFromPropsRegular[primaryKey][breakPointItem] = {};
        Object.keys(themeFromProps[primaryKey][breakPointItem]).forEach((it, ind) => {
            themeFromPropsRegular[primaryKey][breakPointItem][it] = { ...returnObjOrExecute(themeFromProps?.[primaryKey]?.[breakPointItem]?.[it], switchDefaultThemeResult?.[primaryKey]?.[it], componentProps) }
        })
    })
    //console.log(themeFromPropsRegular)
    return themeFromPropsRegular[primaryKey];
}
//#endregion

//#region 物件內函數<=>字串轉換器
export const functionToStringInObject = (objectNeedConvert) => {
    try {
        const object = { ...objectNeedConvert };
        Object.keys(object).forEach((item, index) => {
            if (isFunction(object[item])) {
                object[item] = object[item].toString().replace(/(\r\n|\n|\r)/gm, "");
            }
        })
        return object;
    } catch (error) {
        return null
    }
}

export const stringToFunctionInObject = (stringOfObject) => {
    try {
        const parseString = JSON.parse(stringOfObject);
        console.log(parseString)
        Object.keys(parseString).forEach((item, index) => {
            console.log(index, parseString[item].toString())
            if (!isPlainObject(parseString[item])) {
                parseString[item] = new Function('return ' + parseString[item])();
            }
        })
        return parseString;
    } catch (error) {
    }
}
//#endregion

//#region 程式碼產生並複製到剪貼簿
/* 
   Date   : 2020-07-30 00:25:47
   Author : Arhua Ho
   Content: 請使用模板字串
*/
export const codeExportAndCopy = (content) => {
    const el = document.createElement('textarea');
    el.value = content;
    //console.log(el.value)
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("程式碼已經產生，並複製到剪貼簿!")
}
//#endregion
