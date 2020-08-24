import React, { useState } from 'react';

/* 
   Date   : 2020-06-04 14:45:08
   Author : Arhua Ho
   Content: input 輸入欄位控制與驗證
   @Param : initialValue ； 參數值 : 欄位初始值  
   @Param : regExp ； 參數值 : 檢核欄位的正則表達式  
   @Param : validError ； 參數值 : 驗證失敗的錯誤訊息
   @return : [Value, handlerChange, Regtext, resetValue] ； 回傳值 : [欄位當前值, 輸入時改變值的函數, 測試結果與錯誤訊息, 重設初始值]
*/
export const useForm = (initialValue, regExp, validError) => {

    const [Value, setValue] = useState(initialValue);
    let RegExpTest = true;
    let validErrorIndex = 0;

    [...(Array.isArray(regExp) ? regExp : [regExp])].forEach((item, index) => {
        if (!RegExp(item).test(Value)) {
            if (RegExpTest) {
                RegExpTest = false;
                validErrorIndex = index;
            }
        }
    })

    return [Value, (e) => { setValue(e.target.value) }, RegExpTest ? null : (Array.isArray(validError) ? validError[validErrorIndex] : validError) ?? "驗證失敗", (value) => { setValue(value) }]
}

/* 
   Date   : 2020-06-04 14:45:08
   Author : Arhua Ho
   Content: Selector 輸入欄位控制與驗證
   @Param : initialValue ； 參數值 : 欄位初始值  (應為陣列)
   @Param : regExp ； 參數值 : 檢核欄位的正則表達式  (應為函數陣列，函數返回 true代表通過驗證)
   @Param : validError ； 參數值 : 驗證失敗的錯誤訊息 (應為字串陣列)
   @return : [Value, handlerChange, Regtext, resetValue] ； 回傳值 : [欄位當前值, 輸入時改變值的函數, 測試結果與錯誤訊息, 重設初始值]
*/
export const useSelector = (initialValue, regExp, validError) => {

    const [Value, setValue] = useState(initialValue);
    let RegExpTest = true;
    let validErrorIndex = 0;

    [...(Array.isArray(regExp) ? regExp : [regExp])].forEach((item, index) => {
        if (Value === null) {
            //null的情況跳過檢核
        }
        else if (Value === undefined) {
            //undefined的情況跳過檢核，用於查無資料的情況
        }
        else if (!item(Value)) {
            if (RegExpTest) {
                RegExpTest = false;
                validErrorIndex = index;
            }
        }
    })

    return [Value, (e) => { setValue(e.target.value) }, RegExpTest ? null : (Array.isArray(validError) ? validError[validErrorIndex] : validError) ?? "驗證失敗", (value) => { setValue(value) }]
}