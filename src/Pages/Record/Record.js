import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { useAsync } from '../../SelfHooks/useAsync';
import { clearSession, clearLocalStorage, getParseItemLocalStorage } from '../../Handlers';
import { isUndefined } from 'lodash';
import { fmt } from '../../Handlers/DateHandler';
import moment from 'moment';
import { allCaseListMapping } from '../../Mappings/Mappings';

export const Record = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [CaseRecord, setCaseRecord] = useState([]); // 長照搭乘紀錄
    const [WhiteRecord, setWhiteRecord] = useState([]); // 共享車隊搭乘紀錄
    const [BusRecord, setBusRecord] = useState([]); // 巴士搭乘紀錄
    // const [RemoteCithRecord, setRemoteCithRecord] = useState([]); // 偏鄉搭乘紀錄
    // const [DayCareRecord, setDayCareRecord] = useState([]); // 日照搭乘紀錄
    const [NowTab, setNowTab] = useState("長照"); // 目前搭乘紀錄頁面
    const [AllTabs, setAllTabs] = useState([]); // 用戶身分頁面
    const [Width, Height] = useWindowSize();
    let history = useHistory();

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            // console.log(location, action)
            globalContextService.remove("RecordPage", "firstUseAPIgetRecords");
            globalContextService.remove("RecordPage", "firstUseAPIgetUsers");
            globalContextService.remove("RecordPage")
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得用戶所有身分 API
    const getUsers = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("RecordPage", "firstUseAPIgetUsers")) || useAPI) {
            //#endregion

            //#region 取得用戶所有身分 API
            fetch(`${APIUrl}Users/GetUnPermissionUserType?userId=${getParseItemLocalStorage("UserID")}&UID=${getParseItemLocalStorage("UserAccount")}`, //Users/GetUnPermissionUserType
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
                        // 成功用戶資料 API
                        // console.log(PreResult.data.filter(X => X.isEnable === true))
                        // console.log(PreResult.data);
                        let CaseYet = 0;
                        let filterTabs = PreResult.data
                            .map(X => {
                                // console.log(X.userType)
                                if (X.userType === "caseuser") {
                                    if (CaseYet === 0 && X.isEnable === true) {
                                        CaseYet = 1;
                                        return allCaseListMapping[X.userType];
                                    }
                                    else {
                                        return null
                                    }
                                }
                                else if (X.isEnable === true) {
                                    return allCaseListMapping[X.userType];
                                }
                                return null
                            })
                        let allTabs = Object.values(allCaseListMapping)
                            .filter(V => {
                                return filterTabs.includes(V)
                            })
                        // console.log(allTabs)
                        setAllTabs(allTabs)
                        setNowTab(allTabs[0])
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
                    globalContextService.set("RecordPage", "firstUseAPIgetUsers", false);
                    //#endregion
                });
            //#endregion
        }
    }, [APIUrl, Switch])


    const [GetUsersExecute, GetUsersPending] = useAsync(getUsers, true);
    //#endregion


    //#region 取得用戶各種訂單紀錄資料 API
    const getRecords = useCallback(async (useAPI = false, startData = fmt(moment().startOf("day")), endDate = fmt(moment().add(1, 'months').endOf('month'))) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("RecordPage", "firstUseAPIgetRecords")) || useAPI) {
            //#endregion

            //#region 取得用戶各種訂單紀錄資料 API
            [
                "CaseUsers",
                "SelfPayUsers",
                "BusUsers",
                // "RemoteCityUser"
            ].map(async item => {

                //#region 取得用戶身分資料 API
                await fetch(`${APIUrl}OrderOf${item}/load?page=1&limit=99999&StartDate=${startData}&EndDate=${endDate}`, //orderOfSelfPayUsers/load?page=1&limit=99999&StartDate=2021-01-21%2000:00:00&EndDate=2021-02-28%2023:59:59
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
                            // 成功用戶資料 API
                            // console.log(item, PreResult)
                            switch (item) {
                                case "CaseUsers":
                                    setCaseRecord(PreResult.data);
                                    break;
                                case "BusUsers":
                                    setBusRecord(PreResult.data);
                                    break;
                                case "SelfPayUsers":
                                    setWhiteRecord(PreResult.data);
                                    break;
                                // case "RemoteCityUser":
                                //     setRemoteCithRecord(PreResult.result);
                                //     break;
                                // case "daycare":
                                //     setDayCareRecord(PreResult.result);
                                //     break;
                                default:
                                    break;
                            }
                            // setCaseInf(PreResult);
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
                        globalContextService.set("RecordPage", "firstUseAPIgetRecords", false);
                        //#endregion
                    });
                //#endregion


                return item;
            })
            //#endregion
        }
    }, [APIUrl, Switch])


    const [GetRecordsExecute, GetRecordsPending] = useAsync(getRecords, true);
    //#endregion

    return (
        <>
            {
                768 <= Width &&
                <LaptopL
                    CaseRecord={CaseRecord} // 長照搭乘紀錄
                    WhiteRecord={WhiteRecord} // 共享車隊搭乘紀錄
                    BusRecord={BusRecord}  // 巴士搭乘紀錄
                    nowTab={NowTab}  // 目前搭乘紀錄頁面
                    GetRecordsExecute={GetRecordsExecute} // 取得用戶各種訂單紀錄資料
                    GetRecordsPending={GetRecordsPending}
                    setNowTab={setNowTab} // 設定目前搭乘紀錄葉面
                    AllTabs={AllTabs} // 用戶身分頁面
                />
            }
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            } */}
            {
                Width < 768 &&
                <MobileM
                    CaseRecord={CaseRecord} // 長照搭乘紀錄
                    WhiteRecord={WhiteRecord} // 共享車隊搭乘紀錄
                    BusRecord={BusRecord}  // 巴士搭乘紀錄
                    nowTab={NowTab}  // 目前搭乘紀錄頁面
                    GetRecordsExecute={GetRecordsExecute} // 取得用戶各種訂單紀錄資料
                    GetRecordsPending={GetRecordsPending}
                    setNowTab={setNowTab} // 設定目前搭乘紀錄葉面
                    AllTabs={AllTabs} // 用戶身分頁面
                />
            }
        </>
    )
}