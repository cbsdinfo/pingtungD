import React from 'react'

/* 
   Date   : 2020-06-04 14:45:08
   Author : Arhua Ho
   Content: 輸入欄位控制與驗證
   @Param : initialValue ； 參數值 : 欄位初始值  
   @Param : regExp ； 參數值 : 檢核欄位的正則表達式  
   @Param : validError ； 參數值 : 驗證失敗的錯誤訊息
   @return : [Value, Regtext] ； 回傳值 : [欄位當前值, 測試結果與錯誤訊息]
*/
export const valid = (initialValue, regExp, validError) => {

    let RegExpTest = true;
    let validErrorIndex = 0;

    [...(Array.isArray(regExp) ? regExp : [regExp])].forEach((item, index) => {
        if (!RegExp(item).test(initialValue)) {
            if (RegExpTest) {
                RegExpTest = false;
                validErrorIndex = index;
            }
        }
    })

    return [initialValue, RegExpTest ? null : (Array.isArray(validError) ? validError[validErrorIndex] : validError) ?? "驗證失敗",]

}