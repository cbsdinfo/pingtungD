import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../Components';
// import { LaptopL } from './RWD/LaptopL';
// import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
// import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { clearLogoutLocalStorage, clearLogoutSession, getParseItemLocalStorage, valid } from '../../Handlers';
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../SelfHooks/useAsync';
import { isUndefined } from 'lodash';
import { fmt } from '../../Handlers/DateHandler';
import moment from 'moment';

export const Income = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [NowTab, setNowTab] = useState("系統公告"); // 目前公告頁面
    const [TodayTask, setTodayTask] = useState([

        {
            "date": "2021-02-24",
            "detail": [
                { type: "onePassCard", typeName: "一卡通", count: 1, receivePay: 120 },
                { type: "creditCard", typeName: "信用卡", count: 3, receivePay: 160 },
                { type: "linePay", typeName: "line pay", count: 0, receivePay: null },
                { type: "applePay", typeName: "apple pay", count: 2, receivePay: 1320 },
            ]
        },
        {
            "date": "2021-02-26",
            "detail": [
                { type: "onePassCard", typeName: "一卡通", count: 1, receivePay: 120 },
                { type: "creditCard", typeName: "信用卡", count: 0, receivePay: null },
                { type: "linePay", typeName: "line pay", count: 5, receivePay: 250 },
                { type: "applePay", typeName: "apple pay", count: 0, receivePay: null },
            ]
        },
        {
            "date": "2021-02-27",
            "detail": [
                { type: "onePassCard", typeName: "一卡通", count: 1, receivePay: 8120 },
                { type: "creditCard", typeName: "信用卡", count: 2, receivePay: 1720 },
                { type: "linePay", typeName: "line pay", count: 6, receivePay: 1220 },
                { type: "applePay", typeName: "apple pay", count: 1, receivePay: 1290 },
            ]
        },
        {
            "date": "2021-02-29",
            "detail": [
                { type: "onePassCard", typeName: "一卡通", count: 1, receivePay: 55 },
                { type: "creditCard", typeName: "信用卡", count: 0, receivePay: 1720 },
                { type: "linePay", typeName: "line pay", count: 0, receivePay: 1220 },
                { type: "applePay", typeName: "apple pay", count: 0, receivePay: 1290 },
            ]
        },
        {
            "date": "2021-02-30",
            "detail": [
                { type: "onePassCard", typeName: "一卡通", count: 1, receivePay: 55 },
                { type: "creditCard", typeName: "信用卡", count: 0, receivePay: 1720 },
                { type: "linePay", typeName: "line pay", count: 0, receivePay: 1220 },
                { type: "applePay", typeName: "apple pay", count: 0, receivePay: 1290 },
            ]
        },

    ]); //所有今日任務
    const [Income, setIncome] = useState([]); // 類別下所有最新消息
    const [OrderCount, setOrderCount] = useState(0) // 訂單總計
    const [CashTotal, setCashTotal] = useState(0) // 現金總計
    const [VirtualTotal, setVirtualTotal] = useState(0) // 非現金總計
    const [Width, Height] = useWindowSize();

    // 訂單總計計算
    let orderCount = 0
    const orderCountAdd = (a) => {
        orderCount += a
    }

    // 現金總計計算
    let cashTotal = 0
    const cashTotalAdd = (a) => {
        cashTotal += a
    }

    // 非現金總計計算
    let virtualTotal = 0
    const virtualTotalAdd = (a) => {
        virtualTotal += a
    }

    let history = useHistory();

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            // console.log(location, action)
            globalContextService.remove("IncomePage", "firstUseAPIgetIncome");
            globalContextService.remove("IncomePage");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得收入列表 選項 API
    const getIncome = useCallback(async (useAPI = false, startDate = globalContextService.get("IncomePage", "DateBegin") ?? fmt(moment().startOf("day")), endDate = fmt(moment().endOf("day"))) => {

        let defaultLoad;
        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("IncomePage", "firstUseAPIgetIncome")) || useAPI) {
            //#endregion
            //#region 取得收入列表 API
            fetch(`${APIUrl}DriverInfos/LoadIncome?DriverId=${getParseItemLocalStorage("DriverID")}&StartDate=${startDate}&EndDate=${endDate}`, //categorys/load?page=1&limit=20&TypeId=SYS_DRIVER_LICENSE
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
                        // 成功取得收入列表 API
                        // console.log(PreResult)
                        // console.log(PreResult?.data.sort((a, b) => {
                        //     return a.sortNo - b.sortNo;
                        // }).map(d => ({ data: { ...d }, value: d?.id, label: d?.name })))
                        setIncome(PreResult.data);


                        // setOrderCount(0)
                        // setCashTotal(0)
                        // setVirtualTotal(0)
                        // orderCount = 0;
                        // cashTotal = 0;
                        // virtualTotal = 0;
                        // PreResult.data.map((item, index) => {
                        //     let effectCount = item.data?.length;
                        //     let countNow = 1;
                        //     const countNowAdd = () => {
                        //         countNow++
                        //     }
                        //     return (
                        //         item.data.map((item2, index2) => {
                        //             return (
                        //                 <>
                        //                     {effectCount === countNow ?
                        //                         <>
                        //                             {orderCountAdd(item2?.orderCount)}
                        //                             {setOrderCount(orderCount)}
                        //                             {item2?.payType === "Cash" ? cashTotalAdd(item2?.receiveTotal) : virtualTotalAdd(item2?.receiveTotal)}
                        //                             {setCashTotal(cashTotal)}
                        //                             {setVirtualTotal(virtualTotal)}
                        //                         </>
                        //                         :
                        //                         <>
                        //                             {orderCountAdd(item2?.orderCount)}
                        //                             {item2?.payType === "Cash" ? cashTotalAdd(item2?.receiveTotal) : virtualTotalAdd(item2?.receiveTotal)}
                        //                             {countNowAdd()}
                        //                         </>
                        //                     }
                        //                 </>
                        //             )
                        //         })
                        //     )
                        // })



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
                    globalContextService.set("IncomePage", "firstUseAPIgetIncome", false);
                    //#endregion
                });
            //#endregion
        }
    }, [APIUrl, Switch])

    const [GetIncomeExecute, GetIncomePending] = useAsync(getIncome, true);
    //#endregion

    return (
        <>
            {/* {
                768 <= Width &&
                <LaptopL
                    NowTab={NowTab} // 目前公告頁面
                    setNowTab={setNowTab} // 設定目前公告頁面
                    NewsType={NewsType} // 所有最新消息類別
                    AllNews={AllNews} // 類別下所有最新消息
                    CheckDetail={CheckDetail} // 詳細資料
                    setCheckDetail={setCheckDetail} // 設定詳細資料
                    GetNewsTypeExecute={GetNewsTypeExecute} // 選單更新值調用，取得特定類別所有最新消息
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
                    OrderCount={OrderCount}
                    CashTotal={CashTotal}
                    VirtualTotal={VirtualTotal}
                    Income={Income}
                    GetIncomeExecute={GetIncomeExecute} // 選單更新值調用，取得特定類別所有最新消息
                />
            }
        </>
    )
}