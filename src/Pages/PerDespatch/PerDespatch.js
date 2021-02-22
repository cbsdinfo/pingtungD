import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../Components';
// import { LaptopL } from './RWD/LaptopL';
// import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
// import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { clearLocalStorage, clearSession, getParseItemLocalStorage, valid } from '../../Handlers';
import { useHistory, useLocation } from 'react-router-dom';
import { useAsync } from '../../SelfHooks/useAsync';
import { isUndefined } from 'lodash';
import { fmt } from '../../Handlers/DateHandler';
import moment from 'moment';

export const PerDespatch = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [TodayTask, setTodayTask] = useState([]); //所有今日任務
    const [Open, setOpen] = useState(false); // 展開
    const [DriverStatus, setDriverStatus] = useState(""); // 司機狀態
    const [CheckDetail, setCheckDetail] = useState(false); // 確認身分
    const [Width, Height] = useWindowSize();

    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            //console.log(location, action)
            globalContextService.remove("PerDespatchPage", "firstUseAPIgetTodayTask");
        });

        return () => {
            globalContextService.remove("PerDespatchPage")
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得所有最新消息類別 選項 API
    const getTodayTask = useCallback(async (useAPI = false, newsCategoryId = "", releaseDate = fmt(moment(), "YYYY-MM")) => {

        let defaultLoad;
        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("PerDespatchPage", "firstUseAPIgetTodayTask")) || useAPI) {
            //#endregion

            //#region 取得所有最新消息類別 API
            await fetch(`${APIUrl}OrderOfCaseUsers/GetCaseOrderByDriver?driverid=${getParseItemLocalStorage("DriverID")}`, //categorys/load?page=1&limit=20&TypeId=SYS_DRIVER_LICENSE
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
                        // 成功取得司機 證照 API
                        // console.log(PreResult)
                        // console.log(PreResult?.data.sort((a, b) => {
                        //     return a.sortNo - b.sortNo;
                        // }).map(d => ({ data: { ...d }, value: d?.id, label: d?.name })))

                        setTodayTask(PreResult.result.filter(item => (item?.despatchNo === urlParams.get("despatch"))));
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
                    globalContextService.set("PerDespatchPage", "firstUseAPIgetTodayTask", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetTodayTaskExecute, GetTodayTaskPending] = useAsync(getTodayTask, true);
    //#endregion

    //#region 更改訂單狀態 API
    const changeStatus = useCallback(async (changeStatusRowdata) => {

        // console.log(updateRowdata)
        //#region 更改訂單狀態 API
        fetch(`${APIUrl}OrderOfCaseUsers/ChangeStatus`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...changeStatusRowdata })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 更改訂單狀態 API
                    // console.log(PreResult.data)
                    // 重查訂單
                    GetTodayTaskExecute(true);
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

    const [ChangeStatussExecute, ChangeStatusPending] = useAsync(changeStatus, false);
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
                    defaultPrimary={urlParams.get("defaultPrimary")}
                    TodayTask={TodayTask} // 所有最新消息類別
                    Open={Open} // 展開
                    setOpen={setOpen} // 設定展開
                    DriverStatus={DriverStatus} // 司機狀態
                    setDriverStatus={setDriverStatus} // 設定司機狀態
                    CheckDetail={CheckDetail} // 確認身分
                    setCheckDetail={setCheckDetail} // 設定確認身分
                    ChangeStatussExecute={ChangeStatussExecute} // 更改訂單狀態
                    GetTodayTaskExecute={GetTodayTaskExecute} // 選單更新值調用，取得特定類別所有最新消息
                />
            }
        </>
    )
}