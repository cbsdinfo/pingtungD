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

export const BusEdit = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [Client, setClient] = useState({}); // 客戶端用戶的基本資料
    const [BusUsers, setBusUsers] = useState({}); // 用戶幸福巴士身份的基本資料
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
                globalContextService.remove("BusEditPage", "Name");
                globalContextService.remove("BusEditPage", "Birthday");
                globalContextService.remove("BusEditPage", "Sex");
                globalContextService.remove("BusEditPage", "Uid");
                globalContextService.remove("BusEditPage", "Cellphone");
                globalContextService.remove("BusEditPage", "Telephone");
                globalContextService.remove("BusEditPage", "CardNumber");
                // globalContextService.remove("BusEditPage", "DriverNote");
                // globalContextService.remove("BusEditPage", "ContactName");
                // globalContextService.remove("BusEditPage", "Relationship");
                // globalContextService.remove("BusEditPage", "ContactCellphone");
                // globalContextService.remove("BusEditPage", "ContactTelephone");

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
                    globalContextService.remove("BusEditPage", "CheckedRowKeys");
                    globalContextService.remove("BusEditPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "Save":
                //#region 當點擊 儲存 按鈕時，要清除的資料
                globalContextService.remove("BusEditPage", "Name");
                globalContextService.remove("BusEditPage", "Birthday");
                globalContextService.remove("BusEditPage", "Sex");
                globalContextService.remove("BusEditPage", "Uid");
                globalContextService.remove("BusEditPage", "Cellphone");
                globalContextService.remove("BusEditPage", "Telephone");
                globalContextService.remove("BusEditPage", "CardNumber");
                // globalContextService.remove("BusEditPage", "DriverNote");
                // globalContextService.remove("BusEditPage", "ContactName");
                // globalContextService.remove("BusEditPage", "Relationship");
                // globalContextService.remove("BusEditPage", "ContactCellphone");
                // globalContextService.remove("BusEditPage", "ContactTelephone");

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
                    globalContextService.remove("BusEditPage", "CheckedRowKeys");
                    globalContextService.remove("BusEditPage", "CheckedRowsData");
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
            globalContextService.remove("BusEditPage", "firstUseAPIgetClient");
            globalContextService.remove("BusEditPage", "firstUseAPIgetCaseUsers");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得 客戶端用戶的基本資料 API
    const getClient = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("BusEditPage", "firstUseAPIgetClient")) || useAPI) {
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
                    return PreResult.result;
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
                .finally((res) => {
                    //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                    globalContextService.set("BusEditPage", "firstUseAPIgetClient", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetClientExecute, GetClientPending] = useAsync(getClient, true);
    //#endregion 

    //#region 取得 用戶幸福巴士身份的基本資料 API
    const getBusUsers = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("BusEditPage", "firstUseAPIgetCaseUsers")) || useAPI) {
            //#endregion

            //#region 取得 用戶幸福巴士身份的基本資料 API
            fetch(`${APIUrl}BusUsers/Get?id=${urlParams.get("caseUserId")}`, // api/busUsers/get?id=6724691099893932033  (以幸福巴士 CaseUser table ID)
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
                        // 成功取得 用戶幸福巴士身份的基本資料 
                        // console.log(PreResult)
                        setBusUsers(PreResult.result)
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
                    globalContextService.set("BusEditPage", "firstUseAPIgetCaseUsers", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetBusUsersExecute, GetBusUsersPending] = useAsync(getBusUsers, true);
    //#endregion 

    //#region 編輯幸福巴士身份 API 
    const updateBusUser = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region 編輯幸福巴士身份 API 
        fetch(`${APIUrl}busUsers/update`,
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
                    // 成功編輯幸福巴士身份 API 
                    // console.log(PreResult.data)
                    controllGCS("Save", "API");
                    history.push("/Case");
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

    const [UpdateBusUserExecute, UpdateBusUserPending] = useAsync(updateBusUser, false);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    UserId={urlParams.get("userId")}
                    Client={Client} // 客戶端用戶的基本資料
                    BusUsers={BusUsers} // 用戶幸福巴士身份的基本資料
                    GetClientExecute={GetClientExecute}
                    GetClientPending={GetClientPending}
                    ManagerUnit={ManagerUnit}
                    UpdateBusUserExecute={UpdateBusUserExecute}
                    UpdateBusUserPending={UpdateBusUserPending}
                    GetBusUsersExecute={GetBusUsersExecute}
                    GetBusUsersPending={GetBusUsersPending}
                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    serId={urlParams.get("userId")}
                    Client={Client} // 客戶端用戶的基本資料
                    BusUsers={BusUsers} // 用戶幸福巴士身份的基本資料
                    GetClientExecute={GetClientExecute}
                    GetClientPending={GetClientPending}
                    ManagerUnit={ManagerUnit}
                    UpdateBusUserExecute={UpdateBusUserExecute}
                    UpdateBusUserPending={UpdateBusUserPending}
                    GetBusUsersExecute={GetBusUsersExecute}
                    GetBusUsersPending={GetBusUsersPending}
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    serId={urlParams.get("userId")}
                    Client={Client} // 客戶端用戶的基本資料
                    BusUsers={BusUsers} // 用戶幸福巴士身份的基本資料
                    GetClientExecute={GetClientExecute}
                    GetClientPending={GetClientPending}
                    ManagerUnit={ManagerUnit}
                    UpdateBusUserExecute={UpdateBusUserExecute}
                    UpdateBusUserPending={UpdateBusUserPending}
                    GetBusUsersExecute={GetBusUsersExecute}
                    GetBusUsersPending={GetBusUsersPending}
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