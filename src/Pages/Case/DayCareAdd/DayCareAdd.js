import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { useHistory, useLocation } from 'react-router-dom';
import { isUndefined } from 'lodash';
import { clearLocalStorage, clearSession, getParseItemLocalStorage } from '../../../Handlers';
import { useAsync } from '../../../SelfHooks/useAsync';

export const DayCareAdd = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [Client, setClient] = useState({}); // 客戶端用戶的基本資料
    const [ManagerUnit, setManagerUnit] = useState([]); // 管理單位下拉選單選項
    const [Width, Height] = useWindowSize();

    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("DayCareAddPage");
                //#endregion
                break;
            case "Save":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("DayCareAddPage");
                //#endregion
                break;
            case "selectCaseListModalClose":
                //#region 當 選擇欲新增身份彈窗 Modal 關閉時，要清除的資料 !! 注意清的是CasePage的資料
                globalContextService.remove("CasePage", "CaseListSelect");
                if (payload === "API") {
                    globalContextService.remove("CasePage", "CheckedRowKeys");
                    globalContextService.remove("CasePage", "CheckedRowsData");
                }
                //#endregion
                break;
            default:
                break;
        }
    }
    //#endregion

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            // console.log(location, action, "路由變化")
            globalContextService.remove("DayCareAddPage", "firstUseAPIgetClient");
            globalContextService.remove("DayCareAddPage", "firstUseAPIgetSubOrgs");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得 客戶端用戶的基本資料 API
    const getClient = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("DayCareAddPage", "firstUseAPIgetClient")) || useAPI) {
            //#endregion

            //#region 取得 客戶端用戶的基本資料 API
            fetch(`${APIUrl}users/getclient?id=${urlParams.get("userId")}`, // users/getclient?id=6717458081668177920
                {
                    headers: {
                        "X-Token": getParseItemLocalStorage("DAuth"),
                        "content-type": "application/json; charset=utf-8",
                    },
                    method: "GET"
                })
                .then(Result => {
                    const ResultJson = Result.clone().json();//Respone.clone()
                    return ResultJson;
                })
                .then((PreResult) => {

                    if (PreResult.code === 200) {
                        // 成功取得 客戶端用戶的基本資料
                        // console.log(PreResult)
                        setClient(PreResult.result)
                    }
                    else {
                        throw PreResult;
                    }
                })
                .catch((Error) => {
                    modalsService.infoModal.warn({
                        iconRightText: Error.code === 401 ? "請重新登入。" : Error.message,
                        yes: true,
                        yesText: "確認",
                        // no: true,
                        // autoClose: true,
                        backgroundClose: false,
                        yesOnClick: (e, close) => {
                            if (Error.code === 401) {
                                clearSession();
                                clearLocalStorage();
                                globalContextService.clear();
                                Switch();
                            }
                            close();
                        }
                        // theme: {
                        //     yesButton: {
                        //         text: {
                        //             basic: (style, props) => {
                        //                 console.log(style)
                        //                 return {
                        //                     ...style,
                        //                     color: "red"
                        //                 }
                        //             },
                        //         }
                        //     }
                        // }
                    })
                    throw Error.message;
                })
                .finally(() => {
                    //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                    globalContextService.set("DayCareAddPage", "firstUseAPIgetClient", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetClientExecute, GetClientPending] = useAsync(getClient, true);
    //#endregion 

    //#region 取得 管理單位下拉選單選項 API
    const getManagerUnit = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("DayCareAddPage", "firstUseAPIgetSubOrgs")) || useAPI) {
            //#endregion

            //#region 取得 管理單位下拉選單選項 API
            fetch(`${APIUrl}check/getSubOrgs?orgId=6721883683468910592`, // check/getSubOrgs?orgId=8ccf3297-8e45-43eb-8cc1-17476538b70a 
                // 注意!! 目前尚未提供查詢管理單位API，可能因為權限而取不到值，所以目前這裡一律寫死A單位 orgId，直到未來提供新的查詢API
                {
                    headers: {
                        "X-Token": getParseItemLocalStorage("DAuth"),
                        "content-type": "application/json; charset=utf-8",
                    },
                    method: "GET"
                })
                .then(Result => {
                    const ResultJson = Result.clone().json();//Respone.clone()
                    return ResultJson;
                })
                .then((PreResult) => {

                    if (PreResult.code === 200) {
                        // 成功取得 管理單位下拉選單選項 
                        // console.log(PreResult);
                        setManagerUnit(PreResult.data
                            .filter(item => item.parentId !== null)
                            .map(item => ({ value: item.id, label: item.name }))
                        );// 過濾掉A單位本身
                    }
                    else {
                        throw PreResult;
                    }
                })
                .catch((Error) => {
                    modalsService.infoModal.warn({
                        iconRightText: Error.code === 401 ? "請重新登入。" : Error.message,
                        yes: true,
                        yesText: "確認",
                        // no: true,
                        // autoClose: true,
                        backgroundClose: false,
                        yesOnClick: (e, close) => {
                            if (Error.code === 401) {
                                clearSession();
                                clearLocalStorage();
                                globalContextService.clear();
                                Switch();
                            }
                            close();
                        }
                        // theme: {
                        //     yesButton: {
                        //         text: {
                        //             basic: (style, props) => {
                        //                 console.log(style)
                        //                 return {
                        //                     ...style,
                        //                     color: "red"
                        //                 }
                        //             },
                        //         }
                        //     }
                        // }
                    })
                    throw Error.message;
                })
                .finally(() => {
                    //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                    globalContextService.set("DayCareAddPage", "firstUseAPIgetSubOrgs", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetManagerUnitExecute, GetManagerUnitPending] = useAsync(getManagerUnit, true);
    //#endregion 

    //#region 新增、編輯客戶端用戶 API 
    const addOrUpdateDayCareUser = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region 新增、編輯客戶端用戶 API 
        fetch(`${APIUrl}daycareusers/addorupdate`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...addOrUpdateRowdata })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功新增、編輯客戶端用戶 API 
                    // console.log(PreResult.data)
                    controllGCS("Save", "API");
                    if (addOrUpdateRowdata?.historyPush) {
                        history.push(addOrUpdateRowdata?.historyPush); // 前往接續新增身分的分頁
                    }
                    else {
                        history.push("/Case");
                    }
                }
                else {
                    throw PreResult;
                }
            })
            .catch((Error) => {
                modalsService.infoModal.warn({
                    iconRightText: Error.code === 401 ? "請重新登入。" : Error.message,
                    yes: true,
                    yesText: "確認",
                    // no: true,
                    // autoClose: true,
                    backgroundClose: false,
                    yesOnClick: (e, close) => {
                        if (Error.code === 401) {
                            clearSession();
                            clearLocalStorage();
                            globalContextService.clear();
                            Switch();
                        }
                        close();
                    }
                    // theme: {
                    //     yesButton: {
                    //         text: {
                    //             basic: (style, props) => {
                    //                 console.log(style)
                    //                 return {
                    //                     ...style,
                    //                     color: "red"
                    //                 }
                    //             },
                    //         }
                    //     }
                    // }
                })
                throw Error.message;
            })
            .finally(() => {
            });
        //#endregion
    }, [APIUrl, Switch])

    const [AddOrUpdateDayCareUserExecute, AddOrUpdateDayCareUserPending] = useAsync(addOrUpdateDayCareUser, false);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    UserId={urlParams.get("userId")}
                    FastCreat={urlParams.get("fastCreat")} // fastCreat 接續新增身分模式 ，若無此值 FastCreat 為 null
                    Client={Client} // 客戶端用戶的基本資料
                    GetClientExecute={GetClientExecute}
                    GetClientPending={GetClientPending}
                    ManagerUnit={ManagerUnit}
                    GetManagerUnitExecute={GetManagerUnitExecute}
                    GetManagerUnitPending={GetManagerUnitPending}
                    AddOrUpdateDayCareUserExecute={AddOrUpdateDayCareUserExecute}
                    AddOrUpdateDayCareUserPending={AddOrUpdateDayCareUserPending}
                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    UserId={urlParams.get("userId")}
                    FastCreat={urlParams.get("fastCreat")} // fastCreat 接續新增身分模式 ，若無此值 FastCreat 為 null
                    Client={Client} // 客戶端用戶的基本資料
                    GetClientExecute={GetClientExecute}
                    GetClientPending={GetClientPending}
                    ManagerUnit={ManagerUnit}
                    GetManagerUnitExecute={GetManagerUnitExecute}
                    GetManagerUnitPending={GetManagerUnitPending}
                    AddOrUpdateDayCareUserExecute={AddOrUpdateDayCareUserExecute}
                    AddOrUpdateDayCareUserPending={AddOrUpdateDayCareUserPending}
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    UserId={urlParams.get("userId")}
                    FastCreat={urlParams.get("fastCreat")} // fastCreat 接續新增身分模式 ，若無此值 FastCreat 為 null
                    Client={Client} // 客戶端用戶的基本資料
                    GetClientExecute={GetClientExecute}
                    GetClientPending={GetClientPending}
                    ManagerUnit={ManagerUnit}
                    GetManagerUnitExecute={GetManagerUnitExecute}
                    GetManagerUnitPending={GetManagerUnitPending}
                    AddOrUpdateDayCareUserExecute={AddOrUpdateDayCareUserExecute}
                    AddOrUpdateDayCareUserPending={AddOrUpdateDayCareUserPending}
                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM

                />
            }
        </>
    )
}