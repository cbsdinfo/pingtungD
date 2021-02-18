import React, { useCallback, useContext, useEffect, useState } from 'react';
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
import moment from 'moment';
import { fmt } from '../../../Handlers/DateHandler';

export const BusRoute = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [Width, Height] = useWindowSize();

    const [AllBusStationLiness, setAllBusStationLiness] = useState([]); // 路線管理列表資料
    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "unlockClient":
                //#region 當 新增 Modal 關閉時，要清除的資料
                if (payload === "API") {
                    globalContextService.remove("BusRoutePage", "CheckedRowKeys");
                    globalContextService.remove("BusRoutePage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "backFromChildPage":
                //#region 當 從所有子頁面如 新增巴士路線、編輯巴士路線返回時，要清除的資料
                globalContextService.remove("BusRouteAddPage");
                globalContextService.remove("BusRouteEditPage");

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
            globalContextService.remove("BusRoutePage", "firstUseAPIgetAllBusStationLiness");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得所有路線 API
    const getAllBusStationLiness = useCallback(async (useAPI = false) => {

        let res;

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("BusRoutePage", "firstUseAPIgetAllBusStationLiness")) || useAPI) {
            //#endregion

            //#region 取得所有路線 API
            await fetch(`${APIUrl}busStationLiness/load?page=1&limit=99999`, //cars/load?page=1&limit=20&OrgId=
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
                        // 成功取得所有車輛 API 資料
                        // console.log(PreResult)                        
                        // setAllBusStationLiness(PreResult?.data.map(d => ({ ...d, createDate: fmt(moment(d?.createDate, "YYYY-MM-DD"), `YYYY-MM-DD`), workWeek: fmt(moment(d?.workWeek, "YYYY-MM-DD"), `YYYY-MM-DD`) })))
                        // setAllBusStationLiness({
                        //     ...PreResult.data,
                        //     createDate: PreResult?.data?.map(l => ({ ...l, id: l?.id, name: l?.name, createDate: fmt(moment(l?.createDate, "YYYY-MM-DD"), `YYYY-MM-DD`) })
                        //     ),
                        // })
                        setAllBusStationLiness(PreResult)
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
                    globalContextService.set("BusRoutePage", "firstUseAPIgetAllBusStationLiness", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetAllBusStationLinessExecute, GetAlBusStationLinessPending] = useAsync(getAllBusStationLiness, true);
    //#endregion

    //#region 刪除路線 API
    const carsDel = useCallback(async (delStringArray) => {

        // console.log(updateRowdata)
        //#region 刪除路線 API (右側Table)
        fetch(`${APIUrl}busStationLiness/delete`,
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
                    // 成功刪除路線 API (右側Table)
                    // console.log(PreResult.data)
                    GetAllBusStationLinessExecute(true);
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

    const [BusuRouteDelExecute, BusuRouteDelPending] = useAsync(carsDel, false);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    AllBusStationLiness={AllBusStationLiness}
                    BusuRouteDelExecute={BusuRouteDelExecute}
                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    AllBusStationLiness={AllBusStationLiness}
                    BusuRouteDelExecute={BusuRouteDelExecute}
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    AllBusStationLiness={AllBusStationLiness}
                    BusuRouteDelExecute={BusuRouteDelExecute}
                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    AllBusStationLiness={AllBusStationLiness}
                    BusuRouteDelExecute={BusuRouteDelExecute}
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}