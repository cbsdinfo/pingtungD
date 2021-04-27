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

export const BusStopEdit = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const [Width] = useWindowSize();
    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    const [StationInfo, setStationInfo] = useState({});

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("BusStopEditPage", "CStopName");
                globalContextService.remove("BusStopEditPage", "EStopName");
                globalContextService.remove("BusStopEditPage", "StopLongitude");
                globalContextService.remove("BusStopEditPage", "StopLatitude");
                globalContextService.remove("BusStopEditPage", "firstUseAPIgetStationInfo");
                break;
            case "Save":
                //#region 當點擊 儲存 按鈕時，要清除的資料
                globalContextService.remove("BusStopEditPage", "CStopName");
                globalContextService.remove("BusStopEditPage", "EStopName");
                globalContextService.remove("BusStopEditPage", "StopLongitude");
                globalContextService.remove("BusStopEditPage", "StopLatitude");
                globalContextService.remove("BusStopEditPage", "firstUseAPIgetStationInfo");
                break;
            //#endregion
            default:
                break;
        }
    }
    //#endregion

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            // console.log(location, action, "路由變化")
            globalContextService.remove("BusStopEditPage", "firstUseAPIgetStationInfo");

        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得 站牌資料 API
    const getStationInfo = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("BusStopEditPage", "firstUseAPIgetStationInfo")) || useAPI) {
            //#endregion
            // console.log(urlParams.get("stationId"))
            //#region 取得站牌資料 API
            fetch(`${APIUrl}busStationss/get?id=${urlParams.get("stationId")}`, // busStationss/get?id=6725794473963986945
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
                        // 成功取得站牌資料 API
                        // console.log(PreResult)
                        setStationInfo(PreResult?.result)
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
                    globalContextService.set("BusStopEditPage", "firstUseAPIgetStationInfo", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetStationInfoExecute, GetStationInfoPending] = useAsync(getStationInfo, true);
    //#endregion 

    //#region 編輯站牌資料 API 
    const updateStation = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region 編輯站牌資料 API 
        fetch(`${APIUrl}busStationss/update`,
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
                    // 成功新增司機 API 
                    controllGCS("Save", "API");
                    history.push("/BusRouteAndStop/BusStop");
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

    const [UpdateStationExecute, UpdateStationPending] = useAsync(updateStation, false);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    StationInfo={StationInfo}
                    StationId={urlParams.get("stationId")}
                    UpdateStationExecute={UpdateStationExecute}
                    UpdateStationPending={UpdateStationPending}
                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    StationInfo={StationInfo}
                    StationId={urlParams.get("stationId")}
                    UpdateStationExecute={UpdateStationExecute}
                    UpdateStationPending={UpdateStationPending}
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    StationInfo={StationInfo}
                    StationId={urlParams.get("stationId")}
                    UpdateStationExecute={UpdateStationExecute}
                    UpdateStationPending={UpdateStationPending}
                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    // WhichForm={WhichForm}
                    // setWhichForm={setWhichForm}
                    // SendedAuthCode={SendedAuthCode}
                    // setSendedAuthCode={setSendedAuthCode}
                    // WaitSecToZero={WaitSecToZero}
                    // setWaitSecToZero={setWaitSecToZero}
                    // nowTab={NowTab}
                    // setNowTab={setNowTab}
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}