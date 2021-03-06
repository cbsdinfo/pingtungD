import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../Components';
// import { LaptopL } from './RWD/LaptopL';
// import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
// import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { clearLogoutLocalStorage, clearLogoutSession, getParseItemLocalStorage, valid } from '../../Handlers';
import { useHistory, useLocation } from 'react-router-dom';
import { useAsync } from '../../SelfHooks/useAsync';
import { isUndefined } from 'lodash';
import { fmt } from '../../Handlers/DateHandler';
import moment from 'moment';

export const HitCard = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [DriverPunch, setDriverPunch] = useState([]); //所有今日打卡紀錄
    const [Width, Height] = useWindowSize();

    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當 回上一頁時，要清除的資料
                globalContextService.remove("HitCardPage");
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
            // console.log(location, action)
            globalContextService.remove("HitCardPage", "firstUseAPIgetDriverPunch");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得打卡紀錄 選項 API
    const getDriverPunch = useCallback(async (useAPI = false, start = urlParams.get("StartDate") ?? fmt(moment().startOf("day")), end = urlParams.get("EndDate") ?? fmt(moment().startOf("day"))) => {

        let defaultLoad;
        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("HitCardPage", "firstUseAPIgetDriverPunch")) || useAPI) {
            //#endregion

            //#region 取得打卡紀錄 API
            await fetch(`${APIUrl}DriverPunch/Load?page=1&limit=99999&driverid=${getParseItemLocalStorage("DriverID")}&StartDate=${start}&EndDate=${end}`, //DriverPunch/Load
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
                        // 成功取得打卡紀錄 API
                        // console.log(PreResult)
                        // console.log(PreResult?.data.sort((a, b) => {
                        //     return a.sortNo - b.sortNo;
                        // }).map(d => ({ data: { ...d }, value: d?.id, label: d?.name })))

                        setDriverPunch(PreResult.data);
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
                    globalContextService.set("HitCardPage", "firstUseAPIgetDriverPunch", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetDriverPunchExecute, GetDriverPunchPending] = useAsync(getDriverPunch, true);
    //#endregion

    return (
        <>
            {/* {
                768 <= Width &&
                <LaptopL
                    NowTab={NowTab} // 目前公告頁面
                    setNowTab={setNowTab} // 設定目前公告頁面
                    TodayTask={TodayTask} // 所有最新消息類別
                    AllNews={AllNews} // 類別下所有最新消息
                    CheckDetail={CheckDetail} // 詳細資料
                    setCheckDetail={setCheckDetail} // 設定詳細資料
                    GetTodayTaskExecute={GetTodayTaskExecute} // 選單更新值調用，取得特定類別所有最新消息
                />
            } */}
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            } */}
            {
                // Width < 768 &&
                <MobileM
                    DriverPunch={DriverPunch} // 所有最新消息類別
                    controllGCS={controllGCS}
                // GetTodayTaskExecute={GetTodayTaskExecute} // 選單更新值調用，取得特定類別所有最新消息
                />
            }
        </>
    )
}