import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { useHistory, useLocation } from 'react-router-dom';
import { isUndefined } from 'lodash';
import { clearLocalStorage, clearSession, getParseItemLocalStorage } from '../../../../Handlers';
import { useAsync } from '../../../../SelfHooks/useAsync';

export const EditBusFastCallCar = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [Client, setClient] = useState(true); // 本日行程一覽 展開
    const [TodayToDoOpen, setTodayToDoOpen] = useState(true); // 本日行程一覽 展開
    const [AllRoute, setAllRoute] = useState([]); // 全部路線
    const [AllStation, setAllStation] = useState([]); // 全部站牌
    const [StationOnRoute, setStationOnRoute] = useState([]); // 路線中的站牌
    const [Width, Height] = useWindowSize();

    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    const [BusOrderAmt, setBusOrderAmt] = useState(
        [
            { id: "1", type: "去程" },
        ]
    ); // 訂單金額資訊


    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("EditBusFastCallCarPage");

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
                    globalContextService.remove("EditBusFastCallCarPage", "CheckedRowKeys");
                    globalContextService.remove("EditBusFastCallCarPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "Add":
                //#region 當點擊 立即預約 按鈕時，要清除的資料
                globalContextService.remove("EditBusFastCallCarPage");
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
                    globalContextService.remove("EditBusFastCallCarPage", "CheckedRowKeys");
                    globalContextService.remove("EditBusFastCallCarPage", "CheckedRowsData");
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
            globalContextService.remove("EditBusFastCallCarPage", "firstUseAPIgetClient");
            globalContextService.remove("EditBusFastCallCarPage", "firstUseAPIgetSubOrgs");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得 全部路線下拉選單選項 API
    const getAllRoute = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("EditBusFastCallCarPage", "firstUseAPIgetAllRoute")) || useAPI) {
            //#endregion

            //#region 取得 全部路線下拉選單選項 API
            fetch(`${APIUrl}busStationLiness/load?page=1&limit=99999`, // busStationLiness/load?page=1&limit=99999              
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
                        // 成功取得 全部路線下拉選單選項 
                        setAllRoute(PreResult.data
                            .map(item => ({ ...item, value: item.id, label: item.name }))
                        );
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
                    //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                    globalContextService.set("EditBusFastCallCarPage", "firstUseAPIgetAllRoute", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetAllRouteExecute, GetAllRoutePending] = useAsync(getAllRoute, true);
    //#endregion

    //#region 取得 路線上的所有站牌 API
    const getStationOnRoute = useCallback(async (stationId) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        // if (isUndefined(globalContextService.get("EditBusFastCallCarPage", "firstUseAPIgetStationOnRoute")) || useAPI) {
        //#endregion

        //#region 取得 路線上的所有站牌 API
        fetch(`${APIUrl}busStationLiness/get?id=${stationId}`, // busStationLiness/get?id=6725790941894451200       
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
                    // 成功取得 路線上的所有站牌 
                    setStationOnRoute(PreResult.result);
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
                //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                globalContextService.set("EditBusFastCallCarPage", "firstUseAPIgetStationOnRoute", false);
                //#endregion
            });
        //#endregion

        // }
    }, [APIUrl, Switch])

    const [GetStationOnRouteExecute, GetStationOnRoutePending] = useAsync(getStationOnRoute, true);
    //#endregion

    //#region 取得 全部站牌 API
    const getAllStation = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("EditBusFastCallCarPage", "firstUseAPIgetAllStation")) || useAPI) {
            //#endregion

            //#region 取得 全部站牌 API
            fetch(`${APIUrl}busStationss/load?page=1&limit=99999`, // busStationss/load?page=1&limit=99999          
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
                        // 成功取得 全部站牌
                        setAllStation(PreResult.data
                            .map(item => ({ ...item, value: item.id, label: item.stationName }))
                        );
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
                    //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                    globalContextService.set("EditBusFastCallCarPage", "firstUseAPIgetAllStation", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetAllStationExecute, GetAllStationPending] = useAsync(getAllStation, true);
    //#endregion

    //#region 新增幸福巴士預約訂單 API 
    const addBusCallCar = useCallback(async (addRowdata) => {

        // console.log(updateRowdata)
        //#region 新增幸福巴士預約訂單 API 
        fetch(`${APIUrl}orderOfBusUsers/add`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...addRowdata })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功新增幸福巴士預約訂單 API 
                    // console.log(PreResult.data)
                    controllGCS("Add", "API");
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

    const [AddBusCallCarExecute, AddBusCallCarPending] = useAsync(addBusCallCar, false);
    //#endregion 

    return (
        <>
            {
                768 <= Width &&
                <LaptopL
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    CaseName={urlParams.get("caseName")}
                    Client={Client} // 客戶端用戶的基本資料
                    BusOrderAmt={BusOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AllRoute={AllRoute}
                    AllStation={AllStation}
                    StationOnRoute={StationOnRoute}
                    getStationOnRoute={getStationOnRoute}
                    AddBusCallCarExecute={AddBusCallCarExecute}
                    controllGCS={controllGCS}
                />
            }
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    CaseName={urlParams.get("caseName")}
                    Client={Client} // 客戶端用戶的基本資料
                    BusOrderAmt={BusOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AllRoute={AllRoute}
                    AllStation={AllStation}
                    StationOnRoute={StationOnRoute}
                    getStationOnRoute={getStationOnRoute}
                    AddBusCallCarExecute={AddBusCallCarExecute}
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    CaseName={urlParams.get("caseName")}
                    Client={Client} // 客戶端用戶的基本資料
                    BusOrderAmt={BusOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AllRoute={AllRoute}
                    AllStation={AllStation}
                    StationOnRoute={StationOnRoute}
                    getStationOnRoute={getStationOnRoute}
                    AddBusCallCarExecute={AddBusCallCarExecute}
                    controllGCS={controllGCS}
                />
            } */}
            {
                Width < 768 &&
                <MobileM
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    CaseName={urlParams.get("caseName")}
                    Client={Client} // 客戶端用戶的基本資料
                    BusOrderAmt={BusOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AllRoute={AllRoute}
                    AllStation={AllStation}
                    StationOnRoute={StationOnRoute}
                    getStationOnRoute={getStationOnRoute}
                    AddBusCallCarExecute={AddBusCallCarExecute}
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}