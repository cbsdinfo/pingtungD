import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { clearLogoutLocalStorage, clearLogoutSession, getParseItemLocalStorage, valid } from '../../Handlers';
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../SelfHooks/useAsync';
import { isUndefined } from 'lodash';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { isEqual } from 'lodash';

export const UserInfo = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [BasicInf, setBasicInf] = useState({}); // 用戶基本資料
    const [CaseInf, setCaseInf] = useState({}); // 用戶長照資料
    const [WhiteInf, setWhiteInf] = useState({}); // 用戶白牌資料
    const [BusInf, setBusInf] = useState({}); // 用戶巴士資料
    const [CountryInf, setCountryInf] = useState({}); // 用戶偏鄉運能不足資料
    const [DayCareInf, setDayCareInf] = useState({}); // 用戶日照資料
    const [Quota, setQuota] = useState({}); // 用戶可用額度資料
    const [OpenWhiteModal, setOpenWhiteModal] = useState(false); // 是否開啟白牌註冊
    // const [UserTypeInf, setUserTypeInf] = useState([]); // 用戶所有身分
    const [Width, Height] = useWindowSize();

    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "changePwd":
                //#region 當 編輯 Modal 關閉時，要清除的資料
                globalContextService.remove("UserInfoPage", "OldPwd");
                globalContextService.remove("UserInfoPage", "NewPwd");
                globalContextService.remove("UserInfoPage", "ConfirmPwd");
                //#endregion
                break;
            case "whiteModalClose":
                //#region 當 編輯 Modal 關閉時，要清除的資料
                globalContextService.remove("UserInfoPage", "County");
                globalContextService.remove("UserInfoPage", "District");
                globalContextService.remove("UserInfoPage", "Address");
                globalContextService.remove("UserInfoPage", "Longitude0");
                globalContextService.remove("UserInfoPage", "Latitude0");
                globalContextService.remove("UserInfoPage", "ContactName");
                globalContextService.remove("UserInfoPage", "Relationship");
                globalContextService.remove("UserInfoPage", "ContactCellphone");
                globalContextService.remove("UserInfoPage", "ContactTelephone");
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
            globalContextService.remove("UserInfoPage", "firstUseAPIgetUsers");
            globalContextService.remove("UserInfoPage")
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得用戶資料 API
    const getUsers = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("UserInfoPage", "firstUseAPIgetUsers")) || useAPI) {
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
                    // globalContextService.set("UserInfoPage", "firstUseAPIgetUsers", false);
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
                        // console.log(PreResult.data.filter(X => X.isEnable === true))

                        let CaseYet = 0;
                        let permission = PreResult.data
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
                                            console.log(item.userType, PreResult)
                                            switch (item.userType) {
                                                case "caseuser":
                                                    GetQuotasExecute(item.caseId);
                                                    setCaseInf(PreResult.result);
                                                    break;
                                                case "bususer":
                                                    setBusInf(PreResult.result);
                                                    break;
                                                case "selfpayuser":
                                                    setWhiteInf(PreResult.result);
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
                                        //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                                        // globalContextService.set("UserInfoPage", "firstUseAPIgetUsers", false);
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
                    globalContextService.set("UserInfoPage", "firstUseAPIgetUsers", false);
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
                // globalContextService.set("UserInfoPage", "firstUseAPIgetUsers", false);
                //#endregion
            });
        //#endregion

    }, [APIUrl, Switch])


    const [GetQuotasExecute, GetQuotasPending] = useAsync(getQuota, false);
    //#endregion

    //#region 修改密碼資料 API
    const changePwd = useCallback(async (checkData = {}) => {


        //#region 修改密碼資料 API
        fetch(`${APIUrl}Users/ChangePassword`, ///api/Users/ChangePassword
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify(checkData)
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功用戶資料 API
                    // console.log(PreResult)
                    modalsService.infoModal.success({
                        iconRightText: "密碼修改成功",
                        yes: true,
                        yesText: "確認",
                        // no: true,
                        // autoClose: true,
                        backgroundClose: false,
                        yesOnClick: (e, close) => {
                            close();
                        }
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
                // globalContextService.set("UserInfoPage", "firstUseAPIgetUsers", false);
                //#endregion
            });
        //#endregion

    }, [APIUrl, Switch])


    const [ChangePwdExecute, ChangePwdPending] = useAsync(changePwd, false);
    //#endregion

    //#region 轉換經緯度 API 
    const getGeocode = useCallback(async (addr) => {

        // console.log(updateRowdata)
        //#region 取得經緯度 API 
        fetch(`${APIUrl}Maps/Geocode?_addr=${addr}`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "Get",
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功取得經緯度  
                    // console.log(PreResult.result)
                    globalContextService.set("UserInfoPage", "Latitude0", PreResult?.result?.lat)
                    globalContextService.set("UserInfoPage", "Longitude0", PreResult?.result?.lon)
                    Switch();
                }
                else {
                    throw PreResult;
                }
            })
            .catch((Error) => {
                modalsService.infoModal.warn({
                    id: "top1",
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

    const [GetGeocodeExecute, GetGeocodePending] = useAsync(getGeocode, false);
    //#endregion 

    //#region 新增共享車隊身份 API 
    const addWhiteUser = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region 新增共享車隊身份 API 
        fetch(`${APIUrl}selfpayusers/add`,
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
                    // 成功新增白牌身份 API 
                    // console.log(PreResult)
                    controllGCS("whiteModalClose");
                    // 在查一次客戶資料
                    GetUsersExecute(true);
                    modalsService.infoModal.success({
                        iconRightText: "共享車隊註冊成功",
                        yes: true,
                        yesText: "確認",
                        // no: true,
                        // autoClose: true,
                        backgroundClose: false,
                        yesOnClick: (e, close) => {
                            close();
                        }
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
            });
        //#endregion
    }, [APIUrl, Switch])

    const [AddWhiteUserExecute, AddWhiteUserPending] = useAsync(addWhiteUser, false);
    //#endregion 

    return (
        <>
            {/* laptopL、laptop 共用theme */}
            {
                768 <= Width &&
                <LaptopL
                    BasicInf={BasicInf}  // 用戶基本資料
                    CaseInf={CaseInf} // 用戶長照資料
                    WhiteInf={WhiteInf} // 用戶白牌資料
                    BusInf={BusInf} // 用戶巴士資料
                    CountryInf={CountryInf} // 用戶偏鄉運能不足資料
                    DayCareInf={DayCareInf} // 用戶日照資料
                    Quota={Quota} // 用戶可用額度資料
                    ChangePwdExecute={ChangePwdExecute} // 修改密媽功能
                    ChangePwdPending={ChangePwdPending}
                    GetGeocodeExecute={GetGeocodeExecute} //轉換經緯度
                    GetGeocodePending={GetGeocodePending}
                    AddWhiteUserExecute={AddWhiteUserExecute} // 新增共享車隊
                    AddWhiteUserPending={AddWhiteUserPending}
                    OpenWhiteModal={OpenWhiteModal} // 是否開啟白牌註冊
                    setOpenWhiteModal={setOpenWhiteModal} // 設定開啟白牌註冊
                    controllGCS={controllGCS}
                // CaseListInfo={[CaseInf, WhiteInf, BusInf, CountryInf, DayCareInf].filter(it => !isEqual(it, {}))}
                // GetUsersPending={GetUsersPending}
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
            } */}
            {/* {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    BasicInf={BasicInf}  // 用戶基本資料
                    CaseInf={CaseInf} // 用戶長照資料
                    WhiteInf={WhiteInf} // 用戶白牌資料
                    BusInf={BusInf} // 用戶巴士資料
                    CountryInf={CountryInf} // 用戶偏鄉運能不足資料
                    DayCareInf={DayCareInf} // 用戶日照資料
                    Quota={Quota} // 用戶可用額度資料
                    ChangePwdExecute={ChangePwdExecute} // 修改密媽功能
                    ChangePwdPending={ChangePwdPending}
                    GetGeocodeExecute={GetGeocodeExecute} //轉換經緯度
                    GetGeocodePending={GetGeocodePending}
                    AddWhiteUserExecute={AddWhiteUserExecute} // 新增共享車隊
                    AddWhiteUserPending={AddWhiteUserPending}
                    OpenWhiteModal={OpenWhiteModal} // 是否開啟白牌註冊
                    setOpenWhiteModal={setOpenWhiteModal} // 設定開啟白牌註冊
                    controllGCS={controllGCS}
                />
            } */}
            {
                Width < 768 &&
                <MobileM
                    BasicInf={BasicInf}  // 用戶基本資料
                    CaseInf={CaseInf} // 用戶長照資料
                    WhiteInf={WhiteInf} // 用戶白牌資料
                    BusInf={BusInf} // 用戶巴士資料
                    CountryInf={CountryInf} // 用戶偏鄉運能不足資料
                    DayCareInf={DayCareInf} // 用戶日照資料
                    Quota={Quota} // 用戶可用額度資料
                    ChangePwdExecute={ChangePwdExecute} // 修改密媽功能
                    ChangePwdPending={ChangePwdPending}
                    GetGeocodeExecute={GetGeocodeExecute} //轉換經緯度
                    GetGeocodePending={GetGeocodePending}
                    AddWhiteUserExecute={AddWhiteUserExecute} // 新增共享車隊
                    AddWhiteUserPending={AddWhiteUserPending}
                    OpenWhiteModal={OpenWhiteModal} // 是否開啟白牌註冊
                    setOpenWhiteModal={setOpenWhiteModal} // 設定開啟白牌註冊
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}