import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { useHistory, useLocation } from 'react-router-dom';
import { isUndefined } from 'lodash';
import { clearLogoutLocalStorage, clearLogoutSession, getParseItemLocalStorage } from '../../../../Handlers';
import { useAsync } from '../../../../SelfHooks/useAsync';
import moment from 'moment';

export const BusRouteEdit = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [Width] = useWindowSize();
    let history = useHistory();
    const [AllStops, setAllStops] = useState([]); // 所有站牌
    const [Sort, setSort] = useState([]); // 目前站牌排序
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    const [RouteInfo, setRouteInfo] = useState({});

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("BusRouteEditPage", "ChRouteName");
                globalContextService.remove("BusRouteEditPage", "EnRouteName");
                globalContextService.remove("BusRouteEditPage", "Sort");
                globalContextService.remove("BusRouteEditPage", "WorkDate");
                //#endregion
                globalContextService.remove("BusRouteEditPage");
                //#region 清除上一頁的勾選項
                globalContextService.remove("BusRoutePage", "CheckedRowKeys");
                globalContextService.remove("BusRoutePage", "CheckedRowsData");
                //#endregion
                break;
            case "Save":
                //#region 當點擊 儲存 按鈕時，要清除的資料
                globalContextService.remove("BusRouteEditPage", "ChRouteName");
                globalContextService.remove("BusRouteEditPage", "EnRouteName");
                globalContextService.remove("BusRouteEditPage", "Sort");
                globalContextService.remove("BusRouteEditPage", "WorkDate");
                //#endregion
                globalContextService.remove("BusRouteEditPage");
                //#region 清除上一頁的勾選項
                globalContextService.remove("BusRoutePage", "CheckedRowKeys");
                globalContextService.remove("BusRoutePage", "CheckedRowsData");
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
            globalContextService.remove("BusRoutEditPage", "firstUseAPIgetAllStops");
            globalContextService.remove("BusRoutEditPage", "firstUseAPIgetStationInfo");
            globalContextService.remove("BusRoutEditPage");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得所有站牌 API
    const getAllStops = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("BusRoutEditPage", "firstUseAPIgetAllStops")) || useAPI) {
            //#endregion

            //#region 取得所有站牌 API
            fetch(`${APIUrl}busStationss/load?page=1&limit=99999`, //busStationss/load?page=1&limit=999
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
                        // 成功取得所有站牌 API
                        // console.log(PreResult)
                        setAllStops(PreResult?.data.map(d => ({ ...d, key: d?.id, title: d?.stationName })))
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
                                clearLogoutSession();
                                clearLogoutLocalStorage();
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
                    globalContextService.set("BusRouteEditPage", "firstUseAPIgetAllStops", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetAllStopsExecute, GetAllStopsPending] = useAsync(getAllStops, true);
    //#endregion 

    //#region 取得 路線資料 API
    const getStationInfo = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("BusRouteEditPage", "firstUseAPIgetStationInfo")) || useAPI) {
            //#endregion
            console.log(urlParams.get("id"))
            //#region 取得 路線資料 API
            fetch(`${APIUrl}busStationLiness/get?id=${urlParams.get("id")}`, // busStationLiness/get?id=6726142567196958721
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
                        // 成功取得路線資料 API
                        // console.log(PreResult)
                        setRouteInfo(PreResult?.result)
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
                                clearLogoutSession();
                                clearLogoutLocalStorage();
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
                    globalContextService.set("BusRouteEditPage", "firstUseAPIgetStationInfo", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetRouteInfoExecute, GetRouteInfoPending] = useAsync(getStationInfo, true);
    //#endregion 

    //#region 編輯路線資料 API 
    const updateRoute = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region 編輯路線資料 API 
        fetch(`${APIUrl}busStationLiness/update`,
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
                    // 成功編輯路線資料 API 
                    controllGCS("Save", "API");
                    history.push("/BusRouteAndStop/BusRoute");
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
                            clearLogoutSession();
                            clearLogoutLocalStorage();
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

    const [UpdateRouteExecute, UpdateRoutePending] = useAsync(updateRoute, false);
    //#endregion

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    Sort={Sort}
                    setSort={setSort}
                    AllStops={AllStops}
                    RouteInfo={RouteInfo}
                    RouteId={urlParams.get("id")}
                    UpdateRouteExecute={UpdateRouteExecute}
                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    Sort={Sort}
                    setSort={setSort}
                    AllStops={AllStops}
                    RouteInfo={RouteInfo}
                    RouteId={urlParams.get("id")}
                    UpdateRouteExecute={UpdateRouteExecute}
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    Sort={Sort}
                    setSort={setSort}
                    AllStops={AllStops}
                    RouteInfo={RouteInfo}
                    RouteId={urlParams.get("id")}
                    UpdateRouteExecute={UpdateRouteExecute}
                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    Sort={Sort}
                    setSort={setSort}
                    AllStops={AllStops}
                    RouteInfo={RouteInfo}
                    RouteId={urlParams.get("id")}
                    UpdateRouteExecute={UpdateRouteExecute}
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}