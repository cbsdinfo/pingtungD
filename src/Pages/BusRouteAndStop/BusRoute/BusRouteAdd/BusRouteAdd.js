import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { isUndefined } from 'lodash';
import { useAsync } from '../../../../SelfHooks/useAsync';
import { clearLocalStorage, clearSession, getParseItemLocalStorage } from '../../../../Handlers';
import { useHistory } from 'react-router-dom';

export const BusRouteAdd = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    //const { pages: { login } } = Theme;

    const [AllStops, setAllStops] = useState([]); // 所有站牌
    const [Sort, setSort] = useState([]); // 目前站牌排序

    const [Width] = useWindowSize();
    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("BusRouteAddPage", "ChRouteName");
                globalContextService.remove("BusRouteAddPage", "EnRouteName");
                globalContextService.remove("BusRouteAddPage", "Sort");
                globalContextService.remove("BusRouteAddPage", "WorkDate");
                //#endregion

                globalContextService.remove("BusRouteAddPage");
                //#region 清除上一頁的勾選項
                globalContextService.remove("BusRoutePage", "CheckedRowKeys");
                globalContextService.remove("BusRoutePage", "CheckedRowsData");
                //#endregion
                break;
            case "Save":
                //#region 當點擊 儲存 按鈕時，要清除的資料
                globalContextService.remove("BusRouteAddPage", "ChRouteName");
                globalContextService.remove("BusRouteAddPage", "EnRouteName");
                globalContextService.remove("BusRouteAddPage", "Sort");
                globalContextService.remove("BusRouteAddPage", "WorkDate");
                //#endregion

                globalContextService.remove("BusRouteAddPage");
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
            globalContextService.remove("BusRouteAddPage", "firstUseAPIgetAllStops");
            globalContextService.remove("BusRouteAddPage");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得所有站牌 API
    const getAllStops = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("BusRouteAddPage", "firstUseAPIgetAllStops")) || useAPI) {
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
                    globalContextService.set("BusRouteAddPage", "firstUseAPIgetAllStops", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetAllStopsExecute, GetAllStopsPending] = useAsync(getAllStops, true);
    //#endregion 

    //#region 新增巴士路線 API 
    const addBusRoute = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region 新增巴士路線 API 
        fetch(`${APIUrl}busStationLiness/add`,
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
                    // 成功新增巴士路線 API 
                    // console.log(PreResult.data)
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

    const [AddBusRouteExecute, AddBusRoutePending] = useAsync(addBusRoute, false);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    Sort={Sort}
                    setSort={setSort}
                    AllStops={AllStops}
                    AddBusRouteExecute={AddBusRouteExecute}
                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    Sort={Sort}
                    setSort={setSort}
                    AllStops={AllStops}
                    AddBusRouteExecute={AddBusRouteExecute}
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    Sort={Sort}
                    setSort={setSort}
                    AllStops={AllStops}
                    AddBusRouteExecute={AddBusRouteExecute}

                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    Sort={Sort}
                    setSort={setSort}
                    AllStops={AllStops}
                    AddBusRouteExecute={AddBusRouteExecute}
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}