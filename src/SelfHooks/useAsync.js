import React, { useState, useCallback, useEffect } from 'react'

/* 
   Date   : 2020-06-07 16:10:48
   Author : Arhua Ho
   Content: 異步任務封裝
   @Param : asyncFunction ； 參數值 : 異步任務函數   
   @Param : immediate ； 參數值 : 控制是否要再初次渲染時執行，預設為馬上執行(true)   
   @return : [ execute, Pending, Value, Error ] ； 回傳值 : [ 觸發執行異步任務函數, 異步任務執行狀況, 執行結果, 捕獲執行錯誤 ]
*/
export const useAsync = (asyncFunction, immediate = true) => {
    const [Pending, setPending] = useState(false);
    const [Value, setValue] = useState(null);
    const [Error, setError] = useState(null);

    /* 
       Date   : 2020-06-07 16:14:47
       Author : Arhua Ho
       Content: useCallback保證了asyncFunction在重新渲染時不會被呼叫，而重複執行
                並且透過3個State儲存異步任務執行狀況、執行結果、捕獲執行錯誤，
                (每次執行 execute 時，重置Pending、Value、Error)
    */
    const execute = useCallback((...values) => {
        setPending(true);
        setValue(null);
        setError(null);
        return asyncFunction(...values)
            .then(response => setValue(response))
            .catch(error => setError(error))
            .finally(() => setPending(false));
    }, [asyncFunction]);

    /* 
       Date   : 2020-06-07 16:06:55
       Author : Arhua Ho
       Content: 下方useEffect為控制是否要再初次渲染時執行，透過immediate控制，
                再外部通過執行execute觸發內部useState重新渲染，執行Async，
                所以代表我們可以控制是否要馬上執行或將execute裝進Click之類的觸發
                (execute 為了通過ES-Lint)
    */
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return [execute, Pending, Value, Error];
};

/* 
   Date   : 2020-06-07 16:10:48
   Author : Arhua Ho
   Content: 異步任務封裝
   @Param : asyncFunction ； 參數值 : 異步任務函數   
   @Param : immediate ； 參數值 : 控制是否要再初次渲染時執行，預設為馬上執行(true)   
   @return : [ execute, Pending] ； 回傳值 : [ 觸發執行異步任務函數, 異步任務執行狀況 ]
*/
export const useLoginAsync = (asyncFunction, immediate = true) => {
    const [Pending, setPending] = useState(false);

    /* 
       Date   : 2020-06-07 16:14:47
       Author : Arhua Ho
       Content: useCallback保證了asyncFunction在重新渲染時不會被呼叫，而重複執行
    */
    const execute = useCallback(() => {
        setPending(true);
        return asyncFunction()
            .then(response => console.log(response))
            .catch(error => "error")
            .finally(() => "reset");
    }, [asyncFunction]);

    /* 
       Date   : 2020-06-07 16:06:55
       Author : Arhua Ho
       Content: 下方useEffect為控制是否要再初次渲染時執行，透過immediate控制，
                再外部通過執行execute觸發內部useState重新渲染，執行Async，
                所以代表我們可以控制是否要馬上執行或將execute裝進Click之類的觸發
                (execute 為了通過ES-Lint)
    */
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return [execute, Pending];
};