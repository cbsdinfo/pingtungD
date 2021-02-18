import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/Store'
import styled, { keyframes } from 'styled-components';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { useHistory } from 'react-router-dom';
import { ReactComponent as CheckCircle } from './Asset/img/CheckCircle.svg'
import { ReactComponent as ExclamationCircle } from './Asset/img/ExclamationCircle.svg'
import { ReactComponent as Close } from './Asset/img/Close.svg'
import { BasicContainer, Container, Text, InfoModal, TitleModal } from '../..';
import { iterateTheme } from '../../../Handlers/ThemeHandler';
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
// import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
// import SuccessTheme from './Theme/SuccessTheme'
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region Modals obserable handler，提供modalsService (ModalsService.js)
const modalsSubject = new Subject(); // 啟用訂閱 Modals observable
const defaultId = 'default-modals'; // 預留功能 : 可適應多個Modals

//#region 導出方法供使用
const onModals = (id = defaultId) => {
    return modalsSubject.asObservable().pipe(filter(x => x && x.id === id));//回傳對應id的 Observable
}

// 要新增Modals時，調用的方法
//#region InfoModal
const infoNormal = (options) => {
    modals({ ...options, keepAfterRouteChange: false, type: "normal", component: "InfoModal" });
}

const infoSuccess = (options) => {
    modals({ ...options, keepAfterRouteChange: false, type: "success", component: "InfoModal" });
}

const infoWarn = (options) => {
    modals({ ...options, keepAfterRouteChange: false, type: "warn", component: "InfoModal" });
}

const infoError = (options) => {
    modals({ ...options, keepAfterRouteChange: false, type: "error", component: "InfoModal" });
}

// const info = (options) => {
//     modals({ ...options, keepAfterRouteChange: false, type: "info" });
// }
//#endregion

//#region TitleModal
const titleNormal = (options) => {
    modals({ ...options, keepAfterRouteChange: false, type: "normal", component: "TitleModal" });
}

const titleSuccess = (options) => {
    modals({ ...options, keepAfterRouteChange: false, type: "success", component: "TitleModal" });
}

const titleWarn = (options) => {
    modals({ ...options, keepAfterRouteChange: false, type: "warn", component: "TitleModal" });
}

// const error = (options) => {
//     modals({ ...options, keepAfterRouteChange: false, type: "error" });
// }

// const info = (options) => {
//     modals({ ...options, keepAfterRouteChange: false, type: "info" });
// }
//#endregion

// 新增modals 核心方法
function modals(modals) {
    modals.id = modals.id || defaultId;
    modalsSubject.next(modals);
}

// 清除 modals方法
function clear(id = defaultId) {
    modalsSubject.next({ id });
}

// 重新渲染Modal方法 ，content必須是 function 才起作用
function forceUpdate(id = defaultId) {
    modalsSubject.next({ id, type: "forceUpdate" });
}

export const modalsService = {
    onModals,
    //#region InfoModal 
    infoModal: {
        normal: infoNormal,
        success: infoSuccess,
        warn: infoWarn,
        error: infoError,
        // info,
    },
    //#endregion

    //#region TitleModal 
    titleModal: {
        normal: titleNormal,
        success: titleSuccess,
        warn: titleWarn,
        // error,
        // info,
    },
    //#endregion
    modals,
    clear,
    forceUpdate
};
//#endregion
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "SecondaryTheme":
        //     return SecondaryTheme;
        // case "SuccessTheme":
        //     return SuccessTheme;
        // case "BasicButtonDisableTheme":
        //     return BasicButtonDisableTheme;
        // case "PrimaryTheme":
        //     return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion



const ModalsBase = (props, fade = true) => {

    //const { Theme } = useContext(Context);
    const [Modals, setModals] = useState([]); // 儲存Modals
    const [ForceUpdate, setForceUpdate] = useState(true); // 強制刷新Modal組件
    const history = useHistory();

    //#region 移除 Modals 程序
    const removeModals = (modals, delay = 100) => {
        //console.log("modals", modals)
        // console.log("fade", fade)
        if (fade) {
            // 將要退出的 Modals加上標記 fade : true
            const modalsWithFade = { ...modals, fade: true };
            setModals(modalss => modalss.map(x => x === modals ? modalsWithFade : x)); // by ref equal 

            // 播放動畫後移除 modals
            setTimeout(() => {
                setModals(modalss => modalss.filter(x => x !== modalsWithFade));
            }, delay);//這裡的秒數等同於 "退出動畫秒數"
        } else {
            // 不播放動畫直接移除 modals (一般不會進這裡)
            setModals(modalss => modalss.filter(x => x !== modals));
        }
    }
    //#endregion

    //#region 初始化
    useEffect(() => {
        // 訂閱新的 Modals
        //console.log("?id", props.id)
        let timeOut;
        const subscription = onModals(props.id ?? defaultId)
            .subscribe(modals => {
                //next() 方法
                //console.log(modals)
                // 若訊息為空則清除，因為只讓 clear() 方法時不用傳參數
                if (!modals.type) {
                    // 進來這裡 代表外面呼叫的是 clear()
                    removeModals(modals);
                    // setModals(modalss => {
                    //     const filteredModalss = modalss.filter(x => x.keepAfterRouteChange);//把陣列清空
                    //     // 移除 key 'keepAfterRouteChange' 
                    //     // filteredModalss.forEach(x => delete x.keepAfterRouteChange);
                    //     return filteredModalss;
                    // });
                }
                else if (modals.type === "forceUpdate") {
                    setForceUpdate(u => !u); //強制刷新Modal
                }
                else {
                    // 將本次的 modals 新增至陣列
                    setModals(modalss => ([modals]));
                    //console.log(Modalss)
                    // 自動關閉 modals 設定，預設不自動關閉
                    if (modals.autoClose) {
                        timeOut = setTimeout(() => removeModals(modals), 3000);
                    }
                }
            });

        // 路由變化時清除 Modals
        const historyUnlisten = history.listen(() => {
            clear(props.id ?? defaultId);//清除 default-modals 的 subscribe
        });

        // 清除副作用
        return () => {
            // 取消訂閱，與防止 memory leaks
            subscription.unsubscribe();
            historyUnlisten();
            clearTimeout(timeOut);
        };
    }, []);
    //#endregion

    return (
        <>
            {(Modals.length > 0) &&
                (
                    <>
                        {/* InfoModal */}
                        {Modals[0]?.component === "InfoModal" &&
                            <InfoModal forceUpdate={ForceUpdate} fromModals={{ ...Modals[0], removeModal: removeModals, thisModal: Modals[0] }} />
                        }
                        {/* TitleModal */}
                        {Modals[0]?.component === "TitleModal" &&
                            <TitleModal forceUpdate={ForceUpdate} fromModals={{ ...Modals[0], removeModal: removeModals, thisModal: Modals[0] }} />
                        }
                    </>
                )
            }
        </>
    )
}

export const Modals = styled(ModalsBase).attrs((props) => ({}))`

`


