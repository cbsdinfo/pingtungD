import React, { useState } from 'react';

/* 
   Date   : 2020-06-04 14:45:08
   Author : Arhua Ho
   Content: 開關控制器，或作為組件re-render觸發器
   @Param : initalValue ； 參數值 : 開關初始值
   @return : [Value, Switch, Open, Close] ； 回傳值 : [欄位當前值, 開關控制, 開啟控制 , 關閉控制]
*/
export const useSwitch = (initalValue = false) => {

    const [Value, setValue] = useState(initalValue);

    return [Value, () => { setValue(!Value) }, () => { setValue(true) }, () => { setValue(false) }]
}