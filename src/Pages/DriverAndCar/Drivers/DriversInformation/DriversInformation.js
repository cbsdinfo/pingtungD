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
import { fmt } from '../../../../Handlers/DateHandler';

export const DriversInformation = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [License, setLicense] = useState([]); // 證照名
    const [Insurance, setInsurance] = useState([]); // 保險名
    const [Orgs, setOrgs] = useState([]); // 組織選單
    const [DriverInfo, setDriverInfo] = useState([]); // 司機資料

    const [Width, Height] = useWindowSize();
    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("DriversInformationPage");

                //#region 清除上一頁的勾選項
                globalContextService.remove("DriversPage", "CheckedRowKeys");
                globalContextService.remove("DriversPage", "CheckedRowsData");
                //#endregion

                //#endregion
                break;
            case "Save":
                //#region 當點擊 儲存 按鈕時，要清除的資料
                globalContextService.remove("DriversInformationPage");

                //#region 清除上一頁的勾選項
                globalContextService.remove("DriversPage", "CheckedRowKeys");
                globalContextService.remove("DriversPage", "CheckedRowsData");
                //#endregion

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
            // console.log(location, action, "路由變化")
            globalContextService.remove("DriversInformationPage", "firstUseAPIgetLicenseAndInsurance");
            globalContextService.remove("DriversInformationPage", "firstUseAPIgetDriverInfo");
            globalContextService.remove("DriversInformationPage");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得司機 證照、保險、組織 API
    const getLicenseAndInsurance = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("DriversInformationPage", "firstUseAPIgetLicenseAndInsurance")) || useAPI) {
            //#endregion

            //#region 取得司機 證照 API
            fetch(`${APIUrl}categorys/load?page=1&limit=99999&TypeId=SYS_DRIVER_LICENSE`, //categorys/load?page=1&limit=20&TypeId=SYS_DRIVER_LICENSE
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
                        setLicense(PreResult)
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
                    globalContextService.set("DriversInformationPage", "firstUseAPIgetLicenseAndInsurance", false);
                    //#endregion
                });
            //#endregion

            //#region 取得司機 保險 API
            fetch(`${APIUrl}categorys/load?page=1&limit=99999&TypeId=SYS_DRIVER_INSURANCE`, //categorys/load?page=1&limit=20&TypeId=SYS_DRIVER_INSURANCE
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
                        // 成功取得司機 保險 API
                        // console.log(PreResult)
                        setInsurance(PreResult)
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
                    globalContextService.set("DriversInformationPage", "firstUseAPIgetLicenseAndInsurance", false);
                    //#endregion
                });
            //#endregion

            //#region 取得 組織 API
            fetch(`${APIUrl}check/getorgs`, // check/getorgs?token=5262a5b3
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
                        // 成功取得 組織 API
                        // console.log(PreResult)
                        setOrgs(PreResult?.result.map((r) => { return { ...r, value: r?.id, label: r?.name } }))
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
                    globalContextService.set("DriversInformationPage", "firstUseAPIgetLicenseAndInsurance", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetLicenseAndInsuranceExecute, GetLicenseAndInsurancePending] = useAsync(getLicenseAndInsurance, true);
    //#endregion 

    //#region 取得司機 司機資料 API
    const getDriverInfo = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("DriversInformationPage", "firstUseAPIgetDriverInfo")) || useAPI) {
            //#endregion

            //#region 取得司機資料 API
            fetch(`${APIUrl}driverInfos/get?id=${urlParams.get("driversId")}`, // driverInfos/get?id=6725152393893814273
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
                        // 成功取得司機資料 API
                        // console.log(PreResult)

                        setDriverInfo({
                            ...PreResult?.result,
                            driverLicenses: PreResult?.result?.driverLicenses.map(l => ({ ...l, id: l?.categoryId, name: l?.categoryName, expireDate: fmt(moment(l?.expireDate, "YYYY-MM-DD"), `YYYY-MM-DD`) })),
                            driverInsurance: PreResult?.result?.driverInsurance.map(l => ({ ...l, id: l?.categoryId, name: l?.categoryName, expireDate: fmt(moment(l?.expireDate, "YYYY-MM-DD"), `YYYY-MM-DD`) }))
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
                    globalContextService.set("DriversInformationPage", "firstUseAPIgetDriverInfo", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetDriverInfoExecute, GetDriverInfoPending] = useAsync(getDriverInfo, true);
    //#endregion 


    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    License={License}
                    Insurance={Insurance}
                    Orgs={Orgs}
                    DriverInfo={DriverInfo}
                    DriverId={urlParams.get("driversId")}

                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    License={License}
                    Insurance={Insurance}
                    Orgs={Orgs}
                    DriverInfo={DriverInfo}
                    DriverId={urlParams.get("driversId")}

                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    License={License}
                    Insurance={Insurance}
                    Orgs={Orgs}
                    DriverInfo={DriverInfo}
                    DriverId={urlParams.get("driversId")}

                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    License={License}
                    Insurance={Insurance}
                    Orgs={Orgs}
                    DriverInfo={DriverInfo}
                    DriverId={urlParams.get("driversId")}

                    controllGCS={controllGCS}
                />
            }
        </>
    )
}