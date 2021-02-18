import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { useHistory } from 'react-router-dom';
import { isUndefined } from 'lodash';
import { clearLocalStorage, clearSession, getParseItemLocalStorage } from '../../../Handlers';
import { useAsync } from '../../../SelfHooks/useAsync';

export const Drivers = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [Width, Height] = useWindowSize();

    const [AllDriver, setAllDriver] = useState([]);
    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "addClientModalClose":
                //#region 當 新增客戶端用戶 Modal 關閉時，要清除的資料
                globalContextService.remove("DriversPage", "Name");
                globalContextService.remove("DriversPage", "Birthday");
                globalContextService.remove("DriversPage", "Uid");
                globalContextService.remove("DriversPage", "Sex");
                globalContextService.remove("DriversPage", "Cellphone");
                if (payload === "API") {
                    globalContextService.remove("DriversPage", "CheckedRowKeys");
                    globalContextService.remove("DriversPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "editClientModalClose":
                //#region 當 新增客戶端用戶 Modal 關閉時，要清除的資料
                globalContextService.remove("DriversPage", "Name");
                globalContextService.remove("DriversPage", "Birthday");
                globalContextService.remove("DriversPage", "Uid");
                globalContextService.remove("DriversPage", "Sex");
                globalContextService.remove("DriversPage", "Cellphone");
                if (payload === "API") {
                    globalContextService.remove("DriversPage", "CheckedRowKeys");
                    globalContextService.remove("DriversPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "viewClientModalClose":
                //#region 當 新增客戶端用戶 Modal 關閉時，要清除的資料
                globalContextService.remove("DriversPage", "Name");
                globalContextService.remove("DriversPage", "Birthday");
                globalContextService.remove("DriversPage", "Uid");
                globalContextService.remove("DriversPage", "Sex");
                globalContextService.remove("DriversPage", "Cellphone");
                if (payload === "API") {
                    globalContextService.remove("DriversPage", "CheckedRowKeys");
                    globalContextService.remove("DriversPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "unlockClient":
                //#region 當 新增客戶端用戶 Modal 關閉時，要清除的資料
                if (payload === "API") {
                    globalContextService.remove("DriversPage", "CheckedRowKeys");
                    globalContextService.remove("DriversPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "selectCaseListModalClose":
                //#region 當 選擇欲新增身份彈窗 Modal 關閉時，要清除的資料
                globalContextService.remove("DriversPage", "CaseListSelect");
                if (payload === "API") {
                    globalContextService.remove("DriversPage", "CheckedRowKeys");
                    globalContextService.remove("DriversPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "backFromChildPage":
                //#region 當 從所有子頁面如 新增長照身分、編輯長照身份、檢視長照身份返回時，要清除的資料
                //#region 長照
                //編輯
                globalContextService.remove("CaseEditPage", "firstUseAPIgetClient");
                globalContextService.remove("CaseEditPage", "firstUseAPIgetSubOrgs");
                globalContextService.remove("CaseEditPage", "firstUseAPIgetCaseUsers");
                //新增
                globalContextService.remove("CaseAddPage", "firstUseAPIgetClient");
                globalContextService.remove("CaseAddPage", "firstUseAPIgetSubOrgs");
                //檢視
                globalContextService.remove("CaseInformationPage", "firstUseAPIgetClient");
                globalContextService.remove("CaseInformationPage", "firstUseAPIgetCaseUsers");
                //#endregion
                //#region 白牌
                //編輯
                globalContextService.remove("WhiteEditPage", "firstUseAPIgetClient");
                globalContextService.remove("WhiteEditPage", "firstUseAPIgetCaseUsers");
                //新增
                globalContextService.remove("WhiteAddPage", "firstUseAPIgetClient");
                //檢視
                globalContextService.remove("WhiteInformationPage", "firstUseAPIgetClient");
                globalContextService.remove("WhiteInformationPage", "firstUseAPIgetCaseUsers");
                //#endregion
                //#region 幸福巴士
                //編輯
                globalContextService.remove("BusEditPage", "firstUseAPIgetClient");
                globalContextService.remove("BusEditPage", "firstUseAPIgetCaseUsers");
                //新增
                globalContextService.remove("BusAddPage", "firstUseAPIgetClient");
                //檢視
                globalContextService.remove("BusInformationPage", "firstUseAPIgetClient");
                globalContextService.remove("BusInformationPage", "firstUseAPIgetCaseUsers");
                //#endregion
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
            //console.log(location, action)
            globalContextService.remove("DriversPage", "firstUseAPIgetAllDriver");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得所有司機 API
    const getAllDriver = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("DriversPage", "firstUseAPIgetAllDriver")) || useAPI) {
            //#endregion

            //#region 取得所有司機 API
            fetch(`${APIUrl}driverInfos/load?page=1&limit=99999`, //driverInfos/load?page=1&limit=99999
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
                        // 成功取得所有司機 API 資料
                        // console.log(PreResult)
                        setAllDriver(PreResult)
                        controllGCS("backFromChildPage"); // 清除子頁面重新發査API的State
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
                    globalContextService.set("DriversPage", "firstUseAPIgetAllDriver", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetAllDriverExecute, GetAllDriverPending] = useAsync(getAllDriver, true);
    //#endregion 

    //#region 刪除司機 API
    const driversDel = useCallback(async (delStringArray) => {

        // console.log(updateRowdata)
        //#region 新增下級機構 API (右側Table)
        fetch(`${APIUrl}driverInfos/delete`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify(delStringArray)
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功新增下級機構 API (右側Table)
                    // console.log(PreResult.data)
                    GetAllDriverExecute(true);
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
                })
                throw Error.message;
            })
            .finally(() => {
            });
        //#endregion
    }, [APIUrl, Switch])

    const [DriversDelExecute, DriversDelPending] = useAsync(driversDel, false);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    AllDriver={AllDriver}
                    DriversDelExecute={DriversDelExecute}
                    DriversDelPending={DriversDelPending}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    AllDriver={AllDriver}
                    DriversDelExecute={DriversDelExecute}
                    DriversDelPending={DriversDelPending}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    AllDriver={AllDriver}
                    DriversDelExecute={DriversDelExecute}
                    DriversDelPending={DriversDelPending}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    AllDriver={AllDriver}
                    DriversDelExecute={DriversDelExecute}
                    DriversDelPending={DriversDelPending}
                />
            }
        </>
    )
}