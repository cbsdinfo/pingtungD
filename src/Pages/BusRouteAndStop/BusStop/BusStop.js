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
import { clearLogoutLocalStorage, clearLogoutSession, getParseItemLocalStorage } from '../../../Handlers';
import { useAsync } from '../../../SelfHooks/useAsync';

export const BusStop = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    const [Width, Height] = useWindowSize();
    const [AllStation, setAllStation] = useState([]);
    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        // console.log(type, payload)
        switch (type) {
            case "backFromChildPage":
                //#region 當 從所有子頁面返回時，要清除的資料
                globalContextService.remove("BusStopAddPage");
                globalContextService.remove("BusStopEditPage");

                globalContextService.remove("BusStopPage", "CheckedRowKeys");
                globalContextService.remove("BusStopPage", "CheckedRowsData");
            //#endregion
            default:
                break
        }
    }
    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            // console.log(location, action)
            globalContextService.remove("BusStopPage", "firstUseAPIgetAlStation");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得所有 站牌資料 API
    const getAlStation = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("BusStopPage", "firstUseAPIgetAlStation")) || useAPI) {
            //#endregion

            //#region 取得所有 站牌資料 API
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
                        // 成功取得所有 站牌資料 API 資料
                        // console.log("bus")
                        // console.log(PreResult)
                        setAllStation(PreResult)
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
                    globalContextService.set("BusStopPage", "firstUseAPIgetAlStation", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetAllStationExecute, GetAllStationPending] = useAsync(getAlStation, true);
    //#endregion

    //#region 刪除站牌資料 API
    const busStationDel = useCallback(async (delStringArray) => {

        // console.log(updateRowdata)
        //#region 新增下級機構 API (右側Table)
        fetch(`${APIUrl}busStationss/delete`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
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
                    GetAllStationExecute(true);
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

    const [BusStationDelExecute, BusStationDelPending] = useAsync(busStationDel, false);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    AllStation={AllStation}
                    BusStationDelExecute={BusStationDelExecute}
                    BusStationDelPending={BusStationDelPending}

                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    AllStation={AllStation}
                    BusStationDelExecute={BusStationDelExecute}
                    BusStationDelPending={BusStationDelPending}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    AllStation={AllStation}
                    BusStationDelExecute={BusStationDelExecute}
                    BusStationDelPending={BusStationDelPending}
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
                />
            }
        </>
    )
}