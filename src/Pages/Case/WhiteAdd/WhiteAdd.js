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

export const WhiteAdd = (props) => {

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
                globalContextService.remove("WhiteAddPage", "Name");
                globalContextService.remove("WhiteAddPage", "Birthday");
                globalContextService.remove("WhiteAddPage", "Sex");
                globalContextService.remove("WhiteAddPage", "Uid");
                globalContextService.remove("WhiteAddPage", "Cellphone");
                globalContextService.remove("WhiteAddPage", "County");
                globalContextService.remove("WhiteAddPage", "District");
                globalContextService.remove("WhiteAddPage", "Address");
                globalContextService.remove("WhiteAddPage", "DriverNote");
                globalContextService.remove("WhiteAddPage", "ContactName");
                globalContextService.remove("WhiteAddPage", "Relationship");
                globalContextService.remove("WhiteAddPage", "ContactCellphone");
                globalContextService.remove("WhiteAddPage", "ContactTelephone");
                globalContextService.remove("WhiteAddPage", "Longitude0");
                globalContextService.remove("WhiteAddPage", "Latitude0");
                //#region 清除上一頁的勾選項
                globalContextService.remove("CasePage", "CheckedRowKeys");
                globalContextService.remove("CasePage", "CheckedRowsData");
                //#region Table內 身份下拉選單值清空
                Object.keys(globalContextService.get("CasePage") ?? {}).forEach((item, index) => {
                    if (item.includes("CaseList_")) {
                        globalContextService.remove("CasePage", item);
                    }
                })
                //#endregion
                //#endregion
                if (payload === "API") {
                    globalContextService.remove("WhiteAddPage", "CheckedRowKeys");
                    globalContextService.remove("WhiteAddPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "Save":
                //#region 當點擊 儲存 按鈕時，要清除的資料
                globalContextService.remove("WhiteAddPage", "Name");
                globalContextService.remove("WhiteAddPage", "Birthday");
                globalContextService.remove("WhiteAddPage", "Sex");
                globalContextService.remove("WhiteAddPage", "Uid");
                globalContextService.remove("WhiteAddPage", "Cellphone");
                globalContextService.remove("WhiteAddPage", "County");
                globalContextService.remove("WhiteAddPage", "District");
                globalContextService.remove("WhiteAddPage", "Address");
                globalContextService.remove("WhiteAddPage", "DriverNote");
                globalContextService.remove("WhiteAddPage", "ContactName");
                globalContextService.remove("WhiteAddPage", "Relationship");
                globalContextService.remove("WhiteAddPage", "ContactCellphone");
                globalContextService.remove("WhiteAddPage", "ContactTelephone");
                globalContextService.remove("WhiteAddPage", "Longitude0");
                globalContextService.remove("WhiteAddPage", "Latitude0");

                //#region 清除上一頁的勾選項
                globalContextService.remove("CasePage", "CheckedRowKeys");
                globalContextService.remove("CasePage", "CheckedRowsData");

                //#region Table內 身份下拉選單值清空
                Object.keys(globalContextService.get("CasePage") ?? {}).forEach((item, index) => {
                    if (item.includes("CaseList_")) {
                        globalContextService.remove("CasePage", item);
                    }
                })
                //#endregion

                //#endregion

                if (payload === "API") {
                    globalContextService.remove("WhiteAddPage", "CheckedRowKeys");
                    globalContextService.remove("WhiteAddPage", "CheckedRowsData");
                }
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
            globalContextService.remove("WhiteAddPage", "firstUseAPIgetClient");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得 客戶端用戶的基本資料 API
    const getClient = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("WhiteAddPage", "firstUseAPIgetClient")) || useAPI) {
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
                    globalContextService.set("WhiteAddPage", "firstUseAPIgetClient", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetClientExecute, GetClientPending] = useAsync(getClient, true);
    //#endregion 

    //#region 新增白牌身份 API 
    const addWhiteUser = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region 新增白牌身份 API 
        fetch(`${APIUrl}selfpayusers/add`,
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
                    // 成功新增白牌身份 API 
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

    const [AddWhiteUserExecute, AddWhiteUserPending] = useAsync(addWhiteUser, false);
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
                    AddWhiteUserExecute={AddWhiteUserExecute}
                    AddWhiteUserPending={AddWhiteUserPending}
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
                    AddWhiteUserExecute={AddWhiteUserExecute}
                    AddWhiteUserPending={AddWhiteUserPending}
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
                    AddWhiteUserExecute={AddWhiteUserExecute}
                    AddWhiteUserPending={AddWhiteUserPending}
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