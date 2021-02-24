import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../Components';
// import { LaptopL } from './RWD/LaptopL';
// import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
// import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { clearLocalStorage, clearSession, getParseItemLocalStorage, valid } from '../../Handlers';
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
            "despatchOfCaseOrderCourseViews": [
                {
                    "date": "2021-02-24",
                    "cashCount": "2",
                    "cashAmt": "120",
                    "onePassCardCount": "1",
                    "onePassCardAmt": "310",
                    "creditCardCount": "0",
                    "creditCardAmt": null,
                    "linePayCount": "0",
                    "linePayAmt": null,
                    "applePayCount": "0",
                    "applePayAmt": null,


                    "despatchNo": "DP6762859921754599424",
                    "orderId": "6761019507594534912",
                    "driverId": "6756231610261610497",
                    "reserveDate": "2021-02-23 19:10:00",
                    "name": "王曉明",
                    "wheelchairType": "無",
                    "familyWith": 0,
                    "fromAddr": "新北市新莊區g",
                    "fromAddrRemark": "住家",
                    "toAddr": "台北市中山區南京西路Waku Waku Burger 中山店",
                    "toAddrRemark": "醫院診所",
                    "status": 9,                    
                },
                {
                    "date": "2021-02-26",
                    "cashCount": "2",
                    "cashAmt": "120",
                    "onePassCardCount": "1",
                    "onePassCardAmt": "310",
                    "creditCardCount": "0",
                    "creditCardAmt": null,
                    "linePayCount": "0",
                    "linePayAmt": null,
                    "applePayCount": "0",
                    "applePayAmt": null,

                    "despatchNo": "DP6762859921754599424",
                    "orderId": "6762856821367021568",
                    "driverId": "6756231610261610497",
                    "reserveDate": "2021-02-23 21:00:00",
                    "name": "草莓測試",
                    "wheelchairType": "電動高背輪椅",
                    "familyWith": 1,
                    "fromAddr": "EEC TAIWAN, 台2甲線中山區台北市",
                    "fromAddrRemark": "復健診所",
                    "toAddr": "新北市板橋區板新路27號",
                    "toAddrRemark": "住家",
                    "status": 9,                    
                },
                {
                    "date": "2021-02-2",
                    "cashCount": "2",
                    "cashAmt": "120",
                    "onePassCardCount": "1",
                    "onePassCardAmt": "310",
                    "creditCardCount": "0",
                    "creditCardAmt": null,
                    "linePayCount": "0",
                    "linePayAmt": null,
                    "applePayCount": "0",
                    "applePayAmt": null,

                    "despatchNo": "DP6763451332459802624",
                    "orderId": "6763451080335990784",
                    "driverId": "6756231610261610497",
                    "reserveDate": "2021-02-24 10:00:00",
                    "name": "王曉明",
                    "wheelchairType": "普通輪椅(可收折)",
                    "familyWith": 0,
                    "fromAddr": "新北市新莊區樹新路222號",
                    "fromAddrRemark": "洗腎中心",
                    "toAddr": "新北市新莊區g",
                    "toAddrRemark": "住家",
                    "status": 9,
                }
            ]
        },
        {
            "despatchOfCaseOrderCourseViews": [
                {
                    "despatchNo": "DP6763451332459802624",
                    "orderId": "6763451080335990784",
                    "driverId": "6756231610261610497",
                    "reserveDate": "2021-02-24 10:00:00",
                    "name": "王曉明",
                    "wheelchairType": "普通輪椅(可收折)",
                    "familyWith": 0,
                    "fromAddr": "新北市新莊區樹新路222號",
                    "fromAddrRemark": "洗腎中心",
                    "toAddr": "新北市新莊區g",
                    "toAddrRemark": "住家",
                    "status": 9,
                }
            ]
        },
        {
            "despatchOfCaseOrderCourseViews": [
                {
                    "despatchNo": "DP6763451313426051072",
                    "orderId": "6763451080335990785",
                    "driverId": "6756231610261610497",
                    "reserveDate": "2021-02-24 09:50:00",
                    "name": "王曉明",
                    "wheelchairType": "普通輪椅(可收折)",
                    "familyWith": 0,
                    "fromAddr": "新北市新莊區g",
                    "fromAddrRemark": "住家",
                    "toAddr": "新北市新莊區樹新路222號",
                    "toAddrRemark": "洗腎中心",
                    "status": 4,
                },
                {
                    "despatchNo": "DP6763451313426051072",
                    "orderId": "6763451139546980352",
                    "driverId": "6756231610261610497",
                    "reserveDate": "2021-02-24 09:40:00",
                    "name": "草莓測試",
                    "wheelchairType": "無",
                    "familyWith": 2,
                    "fromAddr": "新北市板橋區板新路27號",
                    "fromAddrRemark": "住家",
                    "toAddr": "新北市板橋區南雅南路二段醫療財團法人徐元智先生醫藥基金會附設亞東紀念醫院",
                    "toAddrRemark": "醫院診所",
                    "status": 5,
                }
            ]
        },
    ]); //所有今日任務
    const [AllNews, setAllNews] = useState([]); // 類別下所有最新消息
    const [CheckDetail, setCheckDetail] = useState({}); // 詳細資料
    const [Width, Height] = useWindowSize();

    let history = useHistory();

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            // console.log(location, action)
            globalContextService.remove("TaskHistoryPage", "firstUseAPIgetTodayTask");
            globalContextService.remove("TaskHistoryPage");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得所有今日任務 選項 API
    const getTodayTask = useCallback(async (useAPI = false, startDate = globalContextService.get("TaskHistoryPage", "DateBegin") ?? fmt(moment().startOf("day").add(1, "day")), endDate = fmt(moment().endOf("day").add(1, "day"))) => {

        let defaultLoad;
        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("TaskHistoryPage", "firstUseAPIgetTodayTask")) || useAPI) {
            //#endregion
            //#region 取得所有任務歷程 API
            await fetch(`${APIUrl}OrderOfCaseUsers/GetCaseOrderCourseByDriver?DriverId=${getParseItemLocalStorage("DriverID")}&StartDate=${startDate}&EndDate=${endDate}`, //categorys/load?page=1&limit=20&TypeId=SYS_DRIVER_LICENSE
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
                        // 成功取得所有今日任務 API
                        // console.log(PreResult)
                        // console.log(PreResult?.data.sort((a, b) => {
                        //     return a.sortNo - b.sortNo;
                        // }).map(d => ({ data: { ...d }, value: d?.id, label: d?.name })))

                        // setTodayTask(PreResult.result);
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
                    globalContextService.set("TaskHistoryPage", "firstUseAPIgetTodayTask", false);
                    //#endregion
                });
            //#endregion
        }
    }, [APIUrl, Switch])

    const [GetTodayTaskExecute, GetTodayTaskPending] = useAsync(getTodayTask, true);
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
                    NowTab={NowTab} // 目前公告頁面
                    setNowTab={setNowTab} // 設定目前公告頁面
                    TodayTask={TodayTask} // 所有最新消息類別
                    AllNews={AllNews} // 類別下所有最新消息
                    CheckDetail={CheckDetail} // 詳細資料
                    setCheckDetail={setCheckDetail} // 設定詳細資料
                    GetTodayTaskExecute={GetTodayTaskExecute} // 選單更新值調用，取得特定類別所有最新消息
                />
            }
        </>
    )
}