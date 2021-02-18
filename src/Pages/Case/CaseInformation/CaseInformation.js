import React, { useCallback, useContext, useState, useEffect } from 'react';
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

export const CaseInformation = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [Client, setClient] = useState({}); // 客戶端用戶的基本資料
    const [CaseUsers, setCaseUsers] = useState({}); // 用戶長照身份的基本資料
    const [ManagerUnit, setManagerUnit] = useState([]); // 管理單位下拉選單選項
    const [Width, Height] = useWindowSize();
    const [Record, setRecord] = useState("近一週"); // 違規紀錄按鈕，哪個被啟用
    const [OrderRecord, setOrderRecord] = useState("近一週"); // 個案預約紀錄按鈕，哪個被啟用

    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("CaseInformationPage", "Name");
                globalContextService.remove("CaseInformationPage", "Birthday");
                globalContextService.remove("CaseInformationPage", "Sex");
                globalContextService.remove("CaseInformationPage", "Uid");
                globalContextService.remove("CaseInformationPage", "CaseNumber");
                globalContextService.remove("CaseInformationPage", "BoonType");
                globalContextService.remove("CaseInformationPage", "Cellphone");
                globalContextService.remove("CaseInformationPage", "Telephone");
                globalContextService.remove("CaseInformationPage", "CaseIdentity");
                globalContextService.remove("CaseInformationPage", "QuotaKeepYM");
                globalContextService.remove("CaseInformationPage", "ManagementUnit");
                globalContextService.remove("CaseInformationPage", "DisabilityLevel");
                globalContextService.remove("CaseInformationPage", "CaseStatus");
                globalContextService.remove("CaseInformationPage", "CloseOther");
                globalContextService.remove("CaseInformationPage", "County");
                globalContextService.remove("CaseInformationPage", "District");
                globalContextService.remove("CaseInformationPage", "Address");
                globalContextService.remove("CaseInformationPage", "DriverNote");
                globalContextService.remove("CaseInformationPage", "ContactName");
                globalContextService.remove("CaseInformationPage", "Relationship");
                globalContextService.remove("CaseInformationPage", "ContactCellphone");
                globalContextService.remove("CaseInformationPage", "ContactTelephone");

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
                    globalContextService.remove("CaseInformationPage", "CheckedRowKeys");
                    globalContextService.remove("CaseInformationPage", "CheckedRowsData");
                }
                //#endregion
                break;

            case "goToEditPage":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("CaseInformationPage", "Name");
                globalContextService.remove("CaseInformationPage", "Birthday");
                globalContextService.remove("CaseInformationPage", "Sex");
                globalContextService.remove("CaseInformationPage", "Uid");
                globalContextService.remove("CaseInformationPage", "CaseNumber");
                globalContextService.remove("CaseInformationPage", "BoonType");
                globalContextService.remove("CaseInformationPage", "Cellphone");
                globalContextService.remove("CaseInformationPage", "Telephone");
                globalContextService.remove("CaseInformationPage", "CaseIdentity");
                globalContextService.remove("CaseInformationPage", "QuotaKeepYM");
                globalContextService.remove("CaseInformationPage", "ManagementUnit");
                globalContextService.remove("CaseInformationPage", "DisabilityLevel");
                globalContextService.remove("CaseInformationPage", "CaseStatus");
                globalContextService.remove("CaseInformationPage", "CloseOther");
                globalContextService.remove("CaseInformationPage", "County");
                globalContextService.remove("CaseInformationPage", "District");
                globalContextService.remove("CaseInformationPage", "Address");
                globalContextService.remove("CaseInformationPage", "DriverNote");
                globalContextService.remove("CaseInformationPage", "ContactName");
                globalContextService.remove("CaseInformationPage", "Relationship");
                globalContextService.remove("CaseInformationPage", "ContactCellphone");
                globalContextService.remove("CaseInformationPage", "ContactTelephone");

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
                    globalContextService.remove("CaseInformationPage", "CheckedRowKeys");
                    globalContextService.remove("CaseInformationPage", "CheckedRowsData");
                }
                //#endregion
                break;

            case "backFromEditPage":
                //#region 當 從所有子頁面如 新增長照身分、編輯長照身份、檢視長照身份返回時，要清除的資料
                globalContextService.remove("CaseEditPage", "firstUseAPIgetClient");
                globalContextService.remove("CaseEditPage", "firstUseAPIgetSubOrgs");
                globalContextService.remove("CaseEditPage", "firstUseAPIgetCaseUsers");
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
            globalContextService.remove("CaseInformationPage", "firstUseAPIgetClient");
            globalContextService.remove("CaseInformationPage", "firstUseAPIgetSubOrgs");
            globalContextService.remove("CaseInformationPage", "firstUseAPIgetCaseUsers");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得 客戶端用戶的基本資料 API
    const getClient = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("CaseInformationPage", "firstUseAPIgetClient")) || useAPI) {
            //#endregion

            //#region 取得 客戶端用戶的基本資料 API
            fetch(`${APIUrl}users/getclient?id=${urlParams.get("userId")}`, // users/getclient?id=6717458081668177920
                {
                    headers: {
                        "X-Token": getParseItemLocalStorage("CAuth"),
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
                        controllGCS("backFromEditPage"); // 清除編輯頁面重新發査API的State
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
                    globalContextService.set("CaseInformationPage", "firstUseAPIgetClient", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetClientExecute, GetClientPending] = useAsync(getClient, true);
    //#endregion 

    //#region 取得 用戶長照身份的基本資料 API
    const getCaseUsers = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("CaseInformationPage", "firstUseAPIgetCaseUsers")) || useAPI) {
            //#endregion

            //#region 取得 用戶長照身份的基本資料 API
            fetch(`${APIUrl}caseusers/get?id=${urlParams.get("caseUserId")}`, // caseusers/get?id=6718179154760081408  (以長照 CaseUser table ID)
                {
                    headers: {
                        "X-Token": getParseItemLocalStorage("CAuth"),
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
                        // 成功取得 用戶長照身份的基本資料 
                        // console.log(PreResult)
                        setCaseUsers(PreResult.result)
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
                    globalContextService.set("CaseInformationPage", "firstUseAPIgetCaseUsers", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetCaseUsersExecute, GetCaseUsersPending] = useAsync(getCaseUsers, true);
    //#endregion 

    //#region 取得 管理單位下拉選單選項 API
    const getManagerUnit = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("CaseInformationPage", "firstUseAPIgetSubOrgs")) || useAPI) {
            //#endregion

            //#region 取得 管理單位下拉選單選項 API
            fetch(`${APIUrl}check/getSubOrgs?orgId=6721883683468910592`, // check/getSubOrgs?orgId=8ccf3297-8e45-43eb-8cc1-17476538b70a 
                // 注意!! 目前尚未提供查詢管理單位API，可能因為權限而取不到值，所以目前這裡一律寫死A單位 orgId，直到未來提供新的查詢API
                {
                    headers: {
                        "X-Token": getParseItemLocalStorage("CAuth"),
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
                    globalContextService.set("CaseInformationPage", "firstUseAPIgetSubOrgs", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetManagerUnitExecute, GetManagerUnitPending] = useAsync(getManagerUnit, true);
    //#endregion 


    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    Client={Client} // 客戶端用戶的基本資料
                    CaseUsers={CaseUsers} // 用戶長照身份的基本資料
                    GetClientExecute={GetClientExecute}
                    GetClientPending={GetClientPending}
                    ManagerUnit={ManagerUnit}
                    GetManagerUnitExecute={GetManagerUnitExecute}
                    GetManagerUnitPending={GetManagerUnitPending}
                    Record={Record}
                    setRecord={setRecord}
                    OrderRecord={OrderRecord}
                    setOrderRecord={setOrderRecord}

                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    Client={Client} // 客戶端用戶的基本資料
                    CaseUsers={CaseUsers} // 用戶長照身份的基本資料
                    GetClientExecute={GetClientExecute}
                    GetClientPending={GetClientPending}
                    ManagerUnit={ManagerUnit}
                    GetManagerUnitExecute={GetManagerUnitExecute}
                    GetManagerUnitPending={GetManagerUnitPending}
                    Record={Record}
                    setRecord={setRecord}
                    OrderRecord={OrderRecord}
                    setOrderRecord={setOrderRecord}

                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    Client={Client} // 客戶端用戶的基本資料
                    CaseUsers={CaseUsers} // 用戶長照身份的基本資料
                    GetClientExecute={GetClientExecute}
                    GetClientPending={GetClientPending}
                    ManagerUnit={ManagerUnit}
                    GetManagerUnitExecute={GetManagerUnitExecute}
                    GetManagerUnitPending={GetManagerUnitPending}
                    Record={Record}
                    setRecord={setRecord}
                    OrderRecord={OrderRecord}
                    setOrderRecord={setOrderRecord}

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