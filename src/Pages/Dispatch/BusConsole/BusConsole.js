import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useAsync } from '../../../SelfHooks/useAsync';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { getParseItemLocalStorage, clearLocalStorage, clearSession } from '../../../Handlers';
import { isUndefined } from 'lodash';
import { useHistory } from 'react-router-dom';

export const BusConsole = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [BusOrder, setBusOrder] = useState([]); // 讀取訂單
    const [DriverInfos, setDriverInfos] = useState([]); // 讀取司機資訊
    const [CarInfos, setCarInfos] = useState([]); // 讀取車輛資訊
    const [BusStationLines, setBusStationLines] = useState([]); // 讀取路線資訊
    const [BusStations, setBusStations] = useState([]); // 讀取站牌資訊
    const [StationOnRoute, setStationOnRoute] = useState([]); // 路線中的站牌
    const [OpenBusOrderEditTitleModal, setOpenBusOrderEditTitleModal] = useState(false); // 是否開啟編輯訂單 Modal

    const [Width, Height] = useWindowSize();
    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "mulRosterModalClose":
                //#region 當 編輯 Modal 關閉時，要清除的資料
                globalContextService.remove("BusConsolePage", "MulRosterOrderDriver");
                globalContextService.remove("BusConsolePage", "MulRosterOrderCar");
                if (payload === "API") {
                    globalContextService.remove("BusConsolePage", "CheckedRowKeys");
                    globalContextService.remove("BusConsolePage", "CheckedRowsData");
                }
                //#endregion
                break;

            case "changeDriveAndCarModalClose":
                //#region 當 更換司機 Modal 關閉時，要清除的資料
                globalContextService.remove("BusConsolePage", "ChangeDriveAndCarOrderDriver");
                globalContextService.remove("BusConsolePage", "ChangeDriveAndCarOrderCar");
                if (payload === "API") {
                    globalContextService.remove("BusConsolePage", "CheckedRowKeys");
                    globalContextService.remove("BusConsolePage", "CheckedRowsData");
                }
                //#endregion
                break;

            case "editOrderModalClose":
                //#region 當 編輯訂單 Modal 關閉時，要清除的資料
                globalContextService.remove("BusConsolePage", "DispatchEditRoute");
                globalContextService.remove("BusConsolePage", "DispatchEditStartPos");
                globalContextService.remove("BusConsolePage", "DispatchEditEndPos");
                globalContextService.remove("BusConsolePage", "DispatchEditTravelDate");
                globalContextService.remove("BusConsolePage", "DispatchEditTravelTime");
                globalContextService.remove("BusConsolePage", "DispatchEditAccTotalCounts");
                if (payload === "API") {
                    globalContextService.remove("BusConsolePage", "CheckedRowKeys");
                    globalContextService.remove("BusConsolePage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "Refresh":
                //#region 當 按下刷新按紐時，要清除的資料
                globalContextService.remove("BusConsolePage", "Keyword");
                if (payload === "API") {
                    globalContextService.remove("BusConsolePage", "CheckedRowKeys");
                    globalContextService.remove("BusConsolePage", "CheckedRowsData");
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
            //console.log(location, action)
            globalContextService.remove("BusConsolePage", "firstUseAPIgetBusOrder");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得 讀取訂單 API
    const getBusOrder = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("BusConsolePage", "firstUseAPIgetBusOrder")) || useAPI) {
            //#endregion

            //#region 取得 讀取訂單 API
            fetch(`${APIUrl}despatchOfBusUsers/load?page=1&limit=99999`, //
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
                        // 成功讀取訂單
                        // console.log(PreResult)
                        setBusOrder(PreResult)
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
                    globalContextService.set("BusConsolePage", "firstUseAPIgetOrgOrder", false);
                    //#endregion
                });
            //#endregion

            //#region 取得 司機資訊 API
            fetch(`${APIUrl}driverInfos/load?limit=99999&page=1`, // 
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
                        // 成功取得 司機資訊
                        // console.log(PreResult)
                        setDriverInfos((PreResult.data ?? []).map(item => ({ data: { ...item }, value: item.id, label: `${item.userName} / ${item.phone}` })))
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
                    // globalContextService.set("BusConsolePage", "firstUseAPIgetOrgOrder", false);
                    //#endregion
                });
            //#endregion

            //#region 取得 車輛資訊 API
            fetch(`${APIUrl}cars/load?limit=99999&page=1`, // 
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
                        // 成功取得 車輛資訊
                        // console.log(PreResult)
                        setCarInfos((PreResult.data ?? []).map(item => ({ data: { ...item }, value: item.id, label: `${item.carCategoryName} / ${item.seatNum}人座 / ${item.carNo}` })))
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
                    // globalContextService.set("BusConsolePage", "firstUseAPIgetOrgOrder", false);
                    //#endregion
                });
            //#endregion

            //#region 取得 路線資訊 API
            fetch(`${APIUrl}busStationLiness/load?page=1&limit=99999`, // 
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
                        // 成功取得 路線資訊
                        // console.log(PreResult)
                        setBusStationLines(PreResult.data
                            .map(item => ({ ...item, value: item.id, label: item.name }))
                        )
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
                    // globalContextService.set("BusConsolePage", "firstUseAPIgetOrgOrder", false);
                    //#endregion
                });
            //#endregion

            //#region 取得 站牌資訊 API
            fetch(`${APIUrl}busStationss/load?page=1&limit=99999`, // 
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
                        // 成功取得 站牌資訊
                        // console.log(PreResult)
                        setBusStations(PreResult.data
                            .map(item => ({ ...item, value: item.id, label: item.stationName }))
                        )
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
                    // globalContextService.set("BusConsolePage", "firstUseAPIgetOrgOrder", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetBusOrderExecute, GetBusOrderPending] = useAsync(getBusOrder, true);
    //#endregion 

    //#region 取得 路線上的所有站牌 API
    const getStationOnRoute = useCallback(async (stationId) => {

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

            });
        //#endregion

        // }
    }, [APIUrl, Switch])

    const [GetStationOnRouteExecute, GetStationOnRoutePending] = useAsync(getStationOnRoute, false);
    //#endregion

    //#region 巴士調度台 - 排班、批量排班、變更司機車輛 API
    const rosterOrder = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region  巴士調度台 - 排班、批量排班、變更司機車輛 API
        fetch(`${APIUrl}despatchOfBusUsers/addOrUpdate`,
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
                    // 成功排班、批量排班、變更司機車輛
                    // 應該透過 HubConnectionBuilder 更新就好，但缺乏 on 監聽狀態，所以主動刷新
                    GetBusOrderExecute(true); // 重新撈組織的訂單
                    // console.log(PreResult.data)
                    controllGCS("mulRosterModalClose", "API");
                    // history.push("/Case");
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

    const [RosterOrderExecute, RosterOrderPending] = useAsync(rosterOrder, false);
    //#endregion 

    //#region 巴士調度台 - 取消排班 API
    const cancelDespatch = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region  巴士調度台 - 取消排班 API
        fetch(`${APIUrl}DespatchOfBusUsers/CancelDespatch`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify([...addOrUpdateRowdata])
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功取消排班
                    // 應該透過 HubConnectionBuilder 更新就好，但缺乏 on 監聽狀態，所以主動刷新
                    GetBusOrderExecute(true); // 重新撈組織的訂單
                    // console.log(PreResult.data)
                    // controllGCS("Save", "API");
                    // history.push("/Case");
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

    const [CancelDespatchExecute, CancelDespatchPending] = useAsync(cancelDespatch, false);
    //#endregion 

    //#region 巴士調度台 - 取消訂單 API
    const cancelOrderReq = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region  巴士調度台 - 取消訂單 API
        fetch(`${APIUrl}orderOfBusUsers/cancelOrderReq`,
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
                    // 成功取消訂單
                    // 應該透過 HubConnectionBuilder 更新就好，但缺乏 on 監聽狀態，所以主動刷新
                    GetBusOrderExecute(true); // 重新撈組織的訂單
                    // console.log(PreResult.data)
                    // controllGCS("Save", "API");
                    // history.push("/Case");
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

    const [CancelOrderReqExecute, CancelOrderReqPending] = useAsync(cancelOrderReq, false);
    //#endregion 

    //#region 巴士調度台 - 編輯訂單 API
    const updateEditOrder = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region  巴士調度台 - 編輯訂單 API
        fetch(`${APIUrl}OrderOfBusUsers/Update`,
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
                    // 成功編輯訂單
                    // 應該透過 HubConnectionBuilder 更新就好，但缺乏 on 監聽狀態，所以主動刷新
                    GetBusOrderExecute(true); // 重新撈組織的訂單
                    globalContextService.get("BusConsolePage", "CloseBusOrderEditTitleModal")(false);
                    globalContextService.remove("BusConsolePage", "CloseBusOrderEditTitleModal");
                    controllGCS("editOrderModalClose")
                    // console.log(PreResult.data)
                    // controllGCS("Save", "API");
                    // history.push("/Case");
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

    const [UpdateEditOrderExecute, UpdateEditOrderPending] = useAsync(updateEditOrder, false);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    BusOrder={BusOrder}
                    DriverInfos={DriverInfos}
                    CarInfos={CarInfos}
                    StationOnRoute={StationOnRoute}
                    BusStationLines={BusStationLines}
                    BusStations={BusStations}

                    OpenBusOrderEditTitleModal={OpenBusOrderEditTitleModal} // 是否開啟編輯訂單 Modal
                    setOpenBusOrderEditTitleModal={setOpenBusOrderEditTitleModal} // 是否開啟編輯訂單 Modal

                    UpdateEditOrderExecute={UpdateEditOrderExecute} // 編輯訂單
                    UpdateEditOrderPending={UpdateEditOrderPending} // 編輯訂單
                    GetStationOnRouteExecute={GetStationOnRouteExecute} // 取得指定路線下所有站牌
                    GetStationOnRoutePending={GetStationOnRoutePending} // 取得指定路線下所有站牌
                    RosterOrderExecute={RosterOrderExecute} // 排班、批量排班、變更司機車輛
                    RosterOrderPending={RosterOrderPending} // 排班、批量排班、變更司機車輛
                    CancelDespatchExecute={CancelDespatchExecute} // 取消排班
                    CancelDespatchPending={CancelDespatchPending} // 取消排班
                    CancelOrderReqExecute={CancelOrderReqExecute} // 取消訂單
                    CancelOrderReqPending={CancelOrderReqPending} // 取消訂單
                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    BusOrder={BusOrder}
                    DriverInfos={DriverInfos}
                    CarInfos={CarInfos}
                    StationOnRoute={StationOnRoute}
                    BusStationLines={BusStationLines}
                    BusStations={BusStations}

                    OpenBusOrderEditTitleModal={OpenBusOrderEditTitleModal} // 是否開啟編輯訂單 Modal
                    setOpenBusOrderEditTitleModal={setOpenBusOrderEditTitleModal} // 是否開啟編輯訂單 Modal

                    GetStationOnRouteExecute={GetStationOnRouteExecute} // 取得指定路線下所有站牌
                    GetStationOnRoutePending={GetStationOnRoutePending} // 取得指定路線下所有站牌
                    RosterOrderExecute={RosterOrderExecute} // 排班、批量排班、變更司機車輛
                    RosterOrderPending={RosterOrderPending} // 排班、批量排班、變更司機車輛
                    CancelDespatchExecute={CancelDespatchExecute} // 取消排班
                    CancelDespatchPending={CancelDespatchPending} // 取消排班
                    CancelOrderReqExecute={CancelOrderReqExecute} // 取消訂單
                    CancelOrderReqPending={CancelOrderReqPending} // 取消訂單
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    BusOrder={BusOrder}
                    DriverInfos={DriverInfos}
                    CarInfos={CarInfos}
                    StationOnRoute={StationOnRoute}
                    BusStationLines={BusStationLines}
                    BusStations={BusStations}

                    OpenBusOrderEditTitleModal={OpenBusOrderEditTitleModal} // 是否開啟編輯訂單 Modal
                    setOpenBusOrderEditTitleModal={setOpenBusOrderEditTitleModal} // 是否開啟編輯訂單 Modal

                    GetStationOnRouteExecute={GetStationOnRouteExecute} // 取得指定路線下所有站牌
                    GetStationOnRoutePending={GetStationOnRoutePending} // 取得指定路線下所有站牌
                    RosterOrderExecute={RosterOrderExecute} // 排班、批量排班、變更司機車輛
                    RosterOrderPending={RosterOrderPending} // 排班、批量排班、變更司機車輛
                    CancelDespatchExecute={CancelDespatchExecute} // 取消排班
                    CancelDespatchPending={CancelDespatchPending} // 取消排班
                    CancelOrderReqExecute={CancelOrderReqExecute} // 取消訂單
                    CancelOrderReqPending={CancelOrderReqPending} // 取消訂單
                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM

                    controllGCS={controllGCS}
                />
            }
        </>
    )
}