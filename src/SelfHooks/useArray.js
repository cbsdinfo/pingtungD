import { useCallback, useMemo, useState } from 'react';

/* 
   Date   : 2020-06-08 14:54:13
   Author : Arhua Ho
   Content: 建立陣列與其擴充方法供使用
*/
const useArrayBase = (initial) => {

    /* 
       Date   : 2020-06-08 13:46:44
       Author : Arhua Ho
       Content: 初始陣列值
    */
    const [value, setValue] = useState(initial);


    /* 
       Date   : 2020-06-08 13:47:01
       Author : Arhua Ho
       Content: 下為陣列各方法，
                push        : 新增尾部陣列值，支援新增單個值或陣列
                unshift     : 新增頭部陣列值，支援新增單個值或陣列
                pop         : 移除陣列最後一個成員
                shift       : 移除陣列頭一個成員
                move        : 移動陣列內一個成員置指定位置
                clear       : 清空初始陣列
                removeIndex : 移除陣列中指定Index成員
                removeById  : 當陣列內成員為物件且具id屬性時，可透過此id數性做刪除
                modifyById  : 當陣列內成員為物件且具id屬性時，可透過此id數性做修改
                removeByLink  : 當陣列內成員為物件且具link屬性時，可透過此link數性做刪除
    */
    const push = useCallback((a) => {
        /* 
           Date   : 2020-06-08 13:52:51
           Author : Arhua Ho
           Content: 支援新增單個值或陣列
        */
        setValue((v) => [...v, ...(Array.isArray(a) ? a : [a])]);
    }, []);

    const unshift = useCallback((a) => {
        /* 
           Date   : 2020-06-08 13:52:51
           Author : Arhua Ho
           Content: 支援新增單個值或陣列
        */
        setValue((v) => [...(Array.isArray(a) ? a : [a]), ...v])
    }, []);

    const pop = useCallback(() => setValue((v) => v.slice(0, -1)), []);

    const shift = useCallback(() => setValue((v) => v.slice(1)), []);

    const move = useCallback(
        (from, to) => {
            /* 
               Date   : 2020-06-08 14:12:46
               Author : Arhua Ho
               Content: 位置正數從0遞增，逆數從-1遞減，例 :
                        inital = [1, 2, 3, 4, 5]
                        from  | to    | expected
                        3     | 0     | [4, 1, 2, 3, 5]
                        -1    | 0     | [5, 1, 2, 3, 4]
                        1     | -2    | [1, 3, 4, 2, 5]
                        -3    | -4    | [1, 3, 2, 4, 5]
            */
            setValue((it) => {
                const copy = it.slice(); //淺拷貝返回新陣列
                copy.splice(to < 0 ? copy.length + to : to, 0, copy.splice(from, 1)[0]);
                return copy;
            })
        },
        [],
    );

    const clear = useCallback(() => setValue(() => []), []);

    const removeById = useCallback(
        // 
        (id) => setValue((arr) => arr.filter((v) => v && v.id !== id)),
        [],
    );

    const removeByLink = useCallback(
        // 
        (link) => setValue((arr) => arr.filter((v) => v && v.link !== link)),
        [],
    );

    const removeIndex = useCallback(
        (index) =>
            setValue((v) => {
                const copy = v.slice();
                copy.splice(index, 1);
                return copy;
            }),
        [],
    );

    const modifyById = useCallback(
        (id, newValue) =>
            /* 
               Date   : 2020-06-08 14:52:41
               Author : Arhua Ho
               Content: 以覆蓋原有陣列方式進行更新，若為{}則相當於不更新
            */
            setValue((arr) => arr.map((v) => (v.id === id ? { ...v, ...newValue } : v))),
        [],
    );

    /* 
       Date   : 2020-06-08 13:45:20
       Author : Arhua Ho
       Content: 以物件形式返回陣列操作方法
    */
    const actions = useMemo(
        () => ({
            setValue,
            add: push,
            unshift,
            push,
            move,
            clear,
            removeById,
            removeByLink,
            removeIndex,
            pop,
            shift,
            modifyById,
        }),
        [modifyById, push, unshift, move, clear, removeById, removeByLink, removeIndex, pop, shift],
    );

    return [value, actions];
}

/* 
   Date   : 2020-06-08 13:35:59
   Author : Arhua Ho
   Content: 導出陣列操作實例
   @Param : initial ； 參數值 : 初始陣列
*/
export const useArray = (initial) => {

    const [value, actions] = useArrayBase(initial);

    /* 
       Date   : 2020-06-08 13:45:20
       Author : Arhua Ho
       Content: 以物件形式返回陣列值與操作方法
    */
    return useMemo(
        () => ({
            value,
            ...actions,
        }),
        [actions, value],
    );
}

/* 
   Date   : 2020-06-08 13:39:15
   Author : Arhua Ho
   Content: 支援默認引入
*/
export default useArray;
