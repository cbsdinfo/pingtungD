import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../Components';
import { mapGoogleControll } from '../../ProjectComponent';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { clearLogoutLocalStorage, clearLogoutSession, getParseItemLocalStorage, valid } from '../../Handlers';
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../SelfHooks/useAsync';
import { isUndefined, isNil } from 'lodash';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { allCaseListMapping } from '../../Mappings/Mappings';

export const CallCar = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [BasicInf, setBasicInf] = useState({}); // 用戶基本資料
    const [CaseInf, setCaseInf] = useState({}); // 用戶長照資料
    const [WhiteInf, setWhiteInf] = useState({}); // 用戶白牌資料
    const [BusInf, setBusInf] = useState({}); // 用戶巴士資料
    const [CountryInf, setCountryInf] = useState({}); // 用戶偏鄉運能不足資料
    const [DayCareInf, setDayCareInf] = useState({}); // 用戶日照資料
    const [Quota, setQuota] = useState({}); // 用戶可用額度資料
    const [BUnits, setBUnits] = useState([]); // B單位
    const [CarType, setCarType] = useState([]); // 車種
    const [AllRoute, setAllRoute] = useState([]); // 全部路線
    const [AllStation, setAllStation] = useState([]); // 全部站牌
    const [CaseUserId, setCaseUserId] = useState(); // CaseUserId
    const [WhiteUserId, setWhiteUserId] = useState(); // WhiteUserId
    const [BusUserId, setBusUserId] = useState(); // BusUserId
    const [OpenWhiteModal, setOpenWhiteModal] = useState(false); // 是否開啟白牌註冊
    // const [UserTypeInf, setUserTypeInf] = useState([]); // 用戶所有身分
    const [Width, Height] = useWindowSize();
    const [TabMenu, setTabMenu] = useState([]); // 頁籤
    const [NowTab, setNowTab] = useState(); // 目前預約訂車頁面
    const [StationOnRoute, setStationOnRoute] = useState(); // 路線下站牌資訊

    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, page) => {
        switch (type) {
            case "deleteTabData":
                //#region 當點擊不同頁籤時，將當前頁面資料清除
                globalContextService.remove(page);
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
            globalContextService.remove("CallCarPage", "firstUseAPIgetUsers");
            globalContextService.remove("CallCarPage", "firstUseAPIgetAllRoute");
            globalContextService.remove("CallCarPage", "firstUseAPIgetAllStation");
            globalContextService.remove("CallCarPage")
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得用戶資料 API
    const getUsers = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("CallCarPage", "firstUseAPIgetUsers")) || useAPI) {
            //#endregion

            //#region 取得用戶基本資料 API
            fetch(`${APIUrl}Users/GetClient?id=${getParseItemLocalStorage("UserID")}`, //users/get
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
                        // 成功用戶資料 API
                        // console.log(PreResult)
                        setBasicInf(PreResult.result);
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
                    // globalContextService.set("CallCarPage", "firstUseAPIgetUsers", false);
                    //#endregion
                });
            //#endregion

            //#region 取得用戶所有身分 API
            fetch(`${APIUrl}Users/GetUnPermissionUserType?userId=${getParseItemLocalStorage("UserID")}&UID=${getParseItemLocalStorage("UserAccount")}`, //Users/GetUnPermissionUserType
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
                        // 成功用戶資料 API
                        // console.log(PreResult.data)
                        let allBunit;
                        //#region 取得所有 B單位選項 API
                        fetch(`${APIUrl}orgs/LoadOrgB`, // orgs/LoadOrgB
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
                                    // 成功取得所有 B單位選項 API 資料
                                    // console.log(PreResult)
                                    allBunit = PreResult?.result;
                                    // setAllBUnits(PreResult?.result)
                                    // controllGCS("backFromChildPage"); // 清除子頁面重新發査API的State
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

                        let CaseYet = 0;
                        // let tabMenu = []
                        let filterTabs = PreResult.data
                            .filter(X => {
                                if (X.userType === "caseuser") {
                                    if (CaseYet === 0 && X.isEnable === true) {
                                        CaseYet = 1;
                                        return X;
                                    }
                                    else {
                                        return null
                                    }
                                }
                                else {
                                    return X.isEnable === true
                                }
                            })

                        //#region 分頁篩選
                        let allTabs = Object.values(allCaseListMapping)
                            .filter(V => {
                                return filterTabs.map(X => { return allCaseListMapping[X.userType] }).includes(V)
                            })
                        // console.log(allTabs)
                        setTabMenu(allTabs)
                        setNowTab(allTabs?.[0])
                        //#endregion

                        let permission = filterTabs
                            .map(async item => {
                                //#region 取得用戶身分資料 API
                                await fetch(`${APIUrl}${item.userType}s/Get?id=${item.caseId}`, //CaseUsers/Get
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
                                            // 成功用戶資料 API
                                            // console.log(item.userType, PreResult)
                                            switch (item.userType) {
                                                case "caseuser":
                                                    // tabMenu.push("長照")
                                                    GetQuotasExecute(item.caseId);
                                                    setCaseUserId(item.caseId)
                                                    setCaseInf(PreResult.result);
                                                    let hadBUnit = ["orgBId1", "orgBId2", "orgBId3"].map(item => PreResult?.result?.[item]).filter(i => i !== null)

                                                    let bUnitForCaseUser = (allBunit ?? []).filter(item => hadBUnit.includes(item?.id))
                                                    setBUnits(bUnitForCaseUser)

                                                    break;
                                                case "selfpayuser":
                                                    // tabMenu.push("共享車隊")
                                                    setWhiteUserId(item.caseId)
                                                    setWhiteInf(PreResult.result);

                                                    break;
                                                case "bususer":
                                                    // tabMenu.push("巴士")
                                                    setBusUserId(item.caseId)
                                                    setBusInf(PreResult.result);

                                                    break;
                                                case "countryside":
                                                    setCountryInf(PreResult.result);
                                                    break;
                                                case "daycare":
                                                    setDayCareInf(PreResult.result);
                                                    break;
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
                                        // console.log(tabMenu.sort())
                                        // let allTabs = Object.values(allCaseListMapping)
                                        //     .filter(V => {
                                        //         return tabMenu.includes(V)
                                        //     })
                                        // setTabMenu(allTabs)
                                        // setNowTab(allTabs?.[0])
                                        //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                                        // globalContextService.set("CallCarPage", "firstUseAPIgetUsers", false);
                                        //#endregion
                                    });
                                //#endregion


                                return item;
                            })


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
                    globalContextService.set("CallCarPage", "firstUseAPIgetUsers", false);
                    //#endregion
                });
            //#endregion

            //#region 取得車輛類別 API
            fetch(`${APIUrl}categorys/load?page=1&limit=99999&TypeId=SYS_CAR`, //categorys/load?page=1&limit=20&TypeId=SYS_DRIVER_LICENSE
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
                        // 成功取得車輛類別 API
                        // console.log(PreResult)
                        setCarType(PreResult?.data.map(d => ({ value: d?.id, label: d?.name })))

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
                    // globalContextService.set("CaseCallCarComponentPage", "firstUseAPIgetAllCars", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])


    const [GetUsersExecute, GetUsersPending] = useAsync(getUsers, true);
    //#endregion

    //#region 取得用戶可用額度資料 API
    const getQuota = useCallback(async (caseId = "") => {

        //#region 取得用戶可用額度資料 API
        fetch(`${APIUrl}CaseUserDiscounts/GetDiscountData?caseuserId=${caseId}`, //CaseUserDiscounts/GetDiscountData?caseuserId=6746156401844330496
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
                    // 成功用戶資料 API
                    // console.log(PreResult)
                    setQuota(PreResult.result);
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
                // globalContextService.set("CallCarPage", "firstUseAPIgetUsers", false);
                //#endregion
            });
        //#endregion

    }, [APIUrl, Switch])


    const [GetQuotasExecute, GetQuotasPending] = useAsync(getQuota, false);
    //#endregion

    //#region 取得 全部路線下拉選單選項 API
    const getAllRoute = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("CallCarPage", "firstUseAPIgetAllRoute")) || useAPI) {
            //#endregion

            //#region 取得 全部路線下拉選單選項 API
            fetch(`${APIUrl}busStationLiness/load?page=1&limit=99999`, // busStationLiness/load?page=1&limit=99999              
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
                        // 成功取得 全部路線下拉選單選項 
                        setAllRoute(PreResult.data
                            .map(item => ({ ...item, value: item.id, label: item.name }))
                        );
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
                    globalContextService.set("CallCarPage", "firstUseAPIgetAllRoute", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetAllRouteExecute, GetAllRoutePending] = useAsync(getAllRoute, true);
    //#endregion

    //#region 取得 全部站牌 API
    const getAllStation = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("CallCarPage", "firstUseAPIgetAllStation")) || useAPI) {
            //#endregion

            //#region 取得 全部站牌 API
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
                        // 成功取得 全部站牌
                        setAllStation(PreResult.data
                            .map(item => ({ ...item, value: item.id, label: item.stationName }))
                        );
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
                    globalContextService.set("CallCarPage", "firstUseAPIgetAllStation", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetAllStationExecute, GetAllStationPending] = useAsync(getAllStation, true);
    //#endregion

    //#region 取得 路線上的所有站牌 API
    const getStationOnRoute = useCallback(async (stationId) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (!isNil(stationId)) {
            //#endregion

            //#region 取得 路線上的所有站牌 API
            fetch(`${APIUrl}busStationLiness/get?id=${stationId}`, // busStationLiness/get?id=6725790941894451200       
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
                        // 成功取得 路線上的所有站牌 
                        setStationOnRoute(PreResult.result);
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
                    globalContextService.set("CallCarPage", "firstUseAPIgetStationOnRoute", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetStationOnRouteExecute, GetStationOnRoutePending] = useAsync(getStationOnRoute, true);
    //#endregion

    //#region 取得 Polyline 加密路線字串 API
    const getPolylineRoute = useCallback(async (addrData) => {

        // console.log(updateRowdata)
        //#region 取得 Polyline 加密路線字串 API
        fetch(`${APIUrl}Maps/Route`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...addrData })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 取得 Polyline 加密路線字串 API
                    // console.log(PreResult.data)
                    // controllGCS("UpdateWealType", "API");
                    mapGoogleControll.addPolylineRoute(addrData?.mapId, PreResult?.result?.polyLine, addrData?.routeAttr)
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
            });
        //#endregion
    }, [APIUrl, Switch])

    const [GetPolylineRouteExecute, GetPolylineRoutePending] = useAsync(getPolylineRoute, false);
    //#endregion 

    return (
        <>
            {/* 共用theme */}
            {
                768 <= Width &&
                <LaptopL
                    BasicInf={BasicInf}
                    BUnits={BUnits}
                    CarType={CarType}

                    Quota={Quota}
                    CaseInf={CaseInf}
                    CaseUserId={CaseUserId}

                    WhiteInf={WhiteInf}
                    WhiteUserId={WhiteUserId}

                    BusInf={BusInf}
                    BusUserId={BusUserId}
                    AllRoute={AllRoute}
                    AllStation={AllStation}
                    StationOnRoute={StationOnRoute}
                    getStationOnRoute={getStationOnRoute}

                    nowTab={NowTab}
                    setNowTab={setNowTab}
                    TabMenu={TabMenu}
                    controllGCS={controllGCS}
                    mapGoogleControll={mapGoogleControll}
                    GetPolylineRouteExecute={GetPolylineRouteExecute}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    BasicInf={BasicInf}
                    BUnits={BUnits}
                    CarType={CarType}

                    Quota={Quota}
                    CaseInf={CaseInf}
                    CaseUserId={CaseUserId}

                    WhiteInf={WhiteInf}
                    WhiteUserId={WhiteUserId}

                    BusInf={BusInf}
                    BusUserId={BusUserId}
                    AllRoute={AllRoute}
                    AllStation={AllStation}
                    StationOnRoute={StationOnRoute}
                    getStationOnRoute={getStationOnRoute}

                    nowTab={NowTab}
                    setNowTab={setNowTab}
                    TabMenu={TabMenu}
                    controllGCS={controllGCS}
                    mapGoogleControll={mapGoogleControll}
                    GetPolylineRouteExecute={GetPolylineRouteExecute}
                />
            }
        </>
    )
}