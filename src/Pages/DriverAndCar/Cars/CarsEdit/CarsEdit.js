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

export const CarsEdit = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [Width, Height] = useWindowSize();

    const [CarType, setCarType] = useState([]); // 車輛類別
    const [Device, setDevice] = useState([]); // 車輛設備
    const [Insurance, setInsurance] = useState([]); // 車輛保險
    const [License, setLicense] = useState([]); // 車輛證照
    const [Drivers, setDrivers] = useState([]); // 司機
    const [Orgs, setOrgs] = useState([]); // 組織
    const [CarInfo, setCarInfo] = useState([]); // 車輛資料

    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("CarsEditPage");

                //#region 清除上一頁的勾選項
                globalContextService.remove("CarsPage", "CheckedRowKeys");
                globalContextService.remove("CarsPage", "CheckedRowsData");
                //#endregion

                //#endregion
                break;
            case "Save":
                //#region 當點擊 儲存 按鈕時，要清除的資料
                globalContextService.remove("CarsEditPage");

                //#region 清除上一頁的勾選項
                globalContextService.remove("CarsPage", "CheckedRowKeys");
                globalContextService.remove("CarsPage", "CheckedRowsData");
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
            //console.log(location, action)
            globalContextService.remove("CarsEditPage", "firstUseAPIgetOptions");
            globalContextService.remove("CarsEditPage", "firstUseAPIgetCarInfo");
            globalContextService.remove("CarsEditPage");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得所有車輛 選項 API
    const getOptions = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("CarsEditPage", "firstUseAPIgetOptions")) || useAPI) {
            //#endregion

            //#region 取得所有司機 API
            fetch(`${APIUrl}driverInfos/load?page=1&limit=99999`, //driverInfos/load?page=1&limit=999
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
                        // 成功取得所有司機 API 資料
                        // console.log(PreResult)
                        setDrivers(PreResult?.data.map(d => ({ ...d, value: d?.id, label: d?.userName })))
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
                    globalContextService.set("CarsPage", "firstUseAPIgetOptions", false);
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
                        // 成功取得司機 證照 API
                        // console.log(PreResult)
                        setCarType(PreResult?.data.map(d => ({ ...d, value: d?.id, label: d?.name })))
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
                    globalContextService.set("CarsEditPage", "firstUseAPIgetOptions", false);
                    //#endregion
                });
            //#endregion

            //#region 取得車輛設備 API
            fetch(`${APIUrl}categorys/load?page=1&limit=99999&TypeId=SYS_CAR_DEVICE`, //categorys/load?page=1&limit=20&TypeId=SYS_DRIVER_LICENSE
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
                        setDevice(PreResult?.data.map(d => ({ ...d, value: d?.id, label: d?.name })))
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
                    globalContextService.set("CarsEditPage", "firstUseAPIgetOptions", false);
                    //#endregion
                });
            //#endregion

            //#region 取得車輛保險 API
            fetch(`${APIUrl}categorys/load?page=1&limit=99999&TypeId=SYS_CAR_INSURANCE`, //categorys/load?page=1&limit=20&TypeId=SYS_DRIVER_LICENSE
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
                        PreResult.data = PreResult?.data.map(d => ({ ...d, value: d?.id, label: d?.name }))
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
                    globalContextService.set("CarsEditPage", "firstUseAPIgetOptions", false);
                    //#endregion
                });
            //#endregion

            //#region 取得車輛證照 API
            fetch(`${APIUrl}categorys/load?page=1&limit=99999&TypeId=SYS_CAR_LICENSE`, //categorys/load?page=1&limit=20&TypeId=SYS_DRIVER_LICENSE
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
                        setLicense(PreResult?.data.map(d => ({ ...d, value: d?.id, label: d?.name })))
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
                    globalContextService.set("CarsEditPage", "firstUseAPIgetOptions", false);
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
                    globalContextService.set("CarsEditPage", "firstUseAPIgetOptions", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetOptionsExecute, GetOptionsPending] = useAsync(getOptions, true);
    //#endregion 

    //#region 取得車輛資料 API
    const getCarInfo = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("CarsEditPage", "firstUseAPIgetCarInfo")) || useAPI) {
            //#endregion

            //#region 取得車輛資料 API
            fetch(`${APIUrl}cars/get?id=${urlParams.get("carsId")}`, // driverInfos/get?id=6725152393893814273
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
                        // 成功取得車輛資料 API
                        // console.log(PreResult)
                        //#region 優先 將有資料的 證照或保險 的勾選紀錄 加入 List 裡
                        //#region 車輛設備
                        globalContextService.set("CarsEditPage", "CarEquipment", PreResult?.result?.carDevices.map((d) => (d?.categoryId)))
                        //#endregion


                        //#region 證照
                        // globalContextService.set("CarsEditPage", "DriverLicenseListCheckedRowKeys", PreResult?.result?.driverLicenses.map(l => l?.categoryId));
                        // globalContextService.set("CarsEditPage", "DriverLicenseListCheckedRowsData", PreResult?.result?.driverLicenses.map(l => ({ ...l, id: l?.categoryId, name: l?.categoryName, expireDate: moment(l?.expireDate, "YYYY-MM-DD") })));

                        // (PreResult?.result?.driverLicenses ?? []).forEach((l) => {
                        //     globalContextService.set("CarsEditPage", `LicenseExpiryDate${l?.categoryId}`, moment(l?.expireDate, "YYYY-MM-DD"))
                        // })

                        //#endregion
                        //#region 證照
                        globalContextService.set("CarsEditPage", "CarInsuranceListCheckedRowKeys", PreResult?.result?.carInsurances.map(l => l?.categoryId));
                        globalContextService.set("CarsEditPage", "CarInsuranceListCheckedRowsData", PreResult?.result?.carInsurances.map(l => ({ ...l, id: l?.categoryId, name: l?.categoryName, expireDate: moment(l?.expireDate, "YYYY-MM-DD") })));

                        (PreResult?.result?.carInsurances ?? []).forEach((l) => {
                            globalContextService.set("CarsEditPage", `InsuranceExpiryDate${l?.categoryId}`, moment(l?.expireDate, "YYYY-MM-DD"))
                        })

                        //#endregion
                        //#endregion
                        setCarInfo(PreResult?.result)
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
                    globalContextService.set("CarsEditPage", "firstUseAPIgetCarInfo", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetCarInfoExecute, GetCarInfoPending] = useAsync(getCarInfo, true);
    //#endregion 

    //#region 編輯車輛 API 
    const updateCar = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region 編輯車輛 API 
        fetch(`${APIUrl}cars/update`,
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
                    // 成功編輯車輛 API 
                    // console.log(PreResult.data)
                    controllGCS("Save", "API");
                    history.push("/DriverAndCar/Cars");
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

    const [UpdateCarExecute, UpdateCarPending] = useAsync(updateCar, false);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    CarType={CarType}
                    Device={Device}
                    Insurance={Insurance}
                    License={License}
                    Drivers={Drivers}
                    Orgs={Orgs}
                    CarInfo={CarInfo}
                    UpdateCarExecute={UpdateCarExecute}
                    UpdateCarPending={UpdateCarPending}
                    GetOptionsPending={GetOptionsPending}
                    CarsId={urlParams.get("carsId")}

                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    CarType={CarType}
                    Device={Device}
                    Insurance={Insurance}
                    License={License}
                    Drivers={Drivers}
                    Orgs={Orgs}
                    CarInfo={CarInfo}
                    UpdateCarExecute={UpdateCarExecute}
                    UpdateCarPending={UpdateCarPending}
                    GetOptionsPending={GetOptionsPending}
                    CarsId={urlParams.get("carsId")}

                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    CarType={CarType}
                    Device={Device}
                    Insurance={Insurance}
                    License={License}
                    Drivers={Drivers}
                    Orgs={Orgs}
                    CarInfo={CarInfo}
                    UpdateCarExecute={UpdateCarExecute}
                    UpdateCarPending={UpdateCarPending}
                    GetOptionsPending={GetOptionsPending}
                    CarsId={urlParams.get("carsId")}

                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    CarType={CarType}
                    Device={Device}
                    Insurance={Insurance}
                    License={License}
                    Drivers={Drivers}
                    Orgs={Orgs}
                    CarInfo={CarInfo}
                    UpdateCarExecute={UpdateCarExecute}
                    UpdateCarPending={UpdateCarPending}
                    GetOptionsPending={GetOptionsPending}
                    CarsId={urlParams.get("carsId")}

                    controllGCS={controllGCS}
                />
            }
        </>
    )
}