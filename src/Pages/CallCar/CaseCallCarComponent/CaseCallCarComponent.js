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
import { mapGoogleControll } from '../../../ProjectComponent';
import moment from "moment";
import { fmt } from '../../../Handlers/DateHandler';

export const CaseCallCarComponent = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [Client, setClient] = useState(true); // 客戶端用戶的基本資料
    const [CaseUsers, setCaseUsers] = useState({}); // 用戶長照身份的基本資料
    // const [AllBUnits, setAllBUnits] = useState([]); // 所有 B單位
    const [TodayToDoOpen, setTodayToDoOpen] = useState(true); // 本日行程一覽 展開
    const [CarType, setCarType] = useState([]); // 車輛類別
    const [CaseDiscount, setCaseDiscount] = useState([]); // 補助餘額

    const [CaseOrderAmt, setCaseOrderAmt] = useState(
        [
            { id: "1", type: "去程" },
            { id: "2", type: "回程" },
        ]
    ); // 訂單金額資訊


    const [Width, Height] = useWindowSize();

    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("CaseCallCarComponentPage");
                //#endregion
                break;
            case "SaveHaveNextOrderFlag":
                //#region 當點擊 新增下一個地點 按鈕時，要清除的資料
                globalContextService.remove("CaseCallCarComponentPage");
                setCaseOrderAmt(
                    [
                        { id: "1", type: "去程" },
                        { id: "2", type: "回程" },
                    ]
                ); // 訂單金額資訊
                //#endregion
                break;
            case "SaveNoHaveNextOrderFlag":
                //#region 當點擊 立即預約 按鈕時，要清除的資料
                globalContextService.remove("CaseCallCarComponentPage");
                globalContextService.remove("CallCarPage");
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
            globalContextService.remove("CaseCallCarComponentPage");
            globalContextService.remove("CallCarPage");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 抓取訂單金額資訊 API 
    const getCaseOrderAmt = useCallback(async (data) => {

        //#region 本API GET參數
        // CaseUserId
        // FromAddr
        // FromAddrId
        // ToAddr
        // FamilyWith
        // ToAddrId
        // ReservationDate
        //#endregion
        let paramStr = "?";
        (Object.keys(data) ?? []).forEach(key => { paramStr = paramStr + `${key}=${data[key]}&` }) // 組合參數
        paramStr = paramStr.substring(0, paramStr.length - 1); // 去除 最後面的 & 

        //#region 抓取訂單金額資訊 API 
        fetch(`${APIUrl}OrderOfCaseUsers/GetCaseOrderAmt${paramStr}`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "Get",
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功抓取訂單金額資訊 API 
                    // console.log(PreResult)
                    setCaseOrderAmt([{ id: "1", type: "去程", ...PreResult?.result }, { id: "2", type: "回程", ...PreResult?.result }]) //去程與回程一樣
                    // Switch();
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

    const [GetCaseOrderAmtExecute, GetCaseOrderAmtPending] = useAsync(getCaseOrderAmt, false);
    //#endregion 

    //#region 新增長照訂單 API
    const addOrderOfCaseUsers = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region 新增長照訂單 API
        fetch(`${APIUrl}OrderOfCaseUsers/Add`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
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
                    // 新增長照訂單 API
                    // console.log(PreResult.data)

                    if (addOrUpdateRowdata?.haveNextOrderFlag) {
                        // 新增下個地點 按鈕發送
                        controllGCS("SaveHaveNextOrderFlag", "API");
                        Switch();

                        modalsService.infoModal.success({
                            iconRightText: "預約成功，請接續預約。",
                            yes: true,
                            yesText: "確認",
                            // no: true,
                            // autoClose: true,
                            backgroundClose: false,
                            yesOnClick: (e, close) => {
                                close();
                            }
                        })

                    }
                    else {
                        // 立即預約 按鈕發送
                        if (addOrUpdateRowdata?.isBackOrder) {
                            history.push("/Record");
                            controllGCS("SaveNoHaveNextOrderFlag", "API");
                        }
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

    const [AddOrderOfCaseUsersExecute, AddOrderOfCaseUsersPending] = useAsync(addOrderOfCaseUsers, false);
    //#endregion 

    return (
        <>
            {/* 共用theme */}
            {
                768 <= Width &&
                <LaptopL
                    UserId={getParseItemLocalStorage("UserID")}
                    CaseUserId={props.CaseUserId}
                    UserName={getParseItemLocalStorage("UserName")}
                    BasicInf={props.BasicInf}
                    CaseUsers={props.CaseInf} // 用戶長照身份的基本資料
                    CarType={props.CarType}  // 車輛類別
                    CaseOrderAmt={CaseOrderAmt} // 訂單金額資訊
                    CaseDiscount={props.Quota} // 補助餘額   
                    BUnits={props.BUnits}
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    mapGoogleControll={props.mapGoogleControll}
                    GetPolylineRouteExecute={props.GetPolylineRouteExecute} //  取得 Polyline 加密路線字串 API
                    GetCaseOrderAmtExecute={GetCaseOrderAmtExecute} // 抓取訂單金額資訊
                    AddOrderOfCaseUsersExecute={AddOrderOfCaseUsersExecute} // 新增長照訂單
                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    UserId={getParseItemLocalStorage("UserID")}
                    CaseUserId={urlParams.get("caseUserId")}
                    UserName={getParseItemLocalStorage("UserName")}
                    BasicInf={props.BasicInf}
                    CaseUsers={props.CaseInf} // 用戶長照身份的基本資料
                    CarType={props.CarType}  // 車輛類別
                    CaseOrderAmt={CaseOrderAmt} // 訂單金額資訊
                    CaseDiscount={props.Quota} // 補助餘額   
                    BUnits={props.BUnits}
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    mapGoogleControll={props.mapGoogleControll}
                    GetPolylineRouteExecute={props.GetPolylineRouteExecute} //  取得 Polyline 加密路線字串 API
                    GetCaseOrderAmtExecute={GetCaseOrderAmtExecute} // 抓取訂單金額資訊
                    AddOrderOfCaseUsersExecute={AddOrderOfCaseUsersExecute} // 新增長照訂單

                    controllGCS={controllGCS}
                />
            }
        </>
    )
}