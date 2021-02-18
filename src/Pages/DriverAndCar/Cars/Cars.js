import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { useHistory } from 'react-router-dom';
import { isUndefined } from 'lodash';
import { clearLocalStorage, clearSession, getParseItemLocalStorage } from '../../../Handlers';
import { useAsync } from '../../../SelfHooks/useAsync';

export const Cars = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [Width, Height] = useWindowSize();

    const [AllCars, setAllCars] = useState([]); // 車輛列表資料
    const [CarType, setCarType] = useState([]); // 車輛類別
    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "unlockClient":
                //#region 當 新增客戶端用戶 Modal 關閉時，要清除的資料
                if (payload === "API") {
                    globalContextService.remove("CarsPage", "CheckedRowKeys");
                    globalContextService.remove("CarsPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "backFromChildPage":
                //#region 當 從所有子頁面如 新增長照身分、編輯長照身份、檢視長照身份返回時，要清除的資料
                globalContextService.remove("CarsAddPage");
                globalContextService.remove("CarsEditPage");
                globalContextService.remove("CarsInformationPage");
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
            globalContextService.remove("CarsPage", "firstUseAPIgetAllCars");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得所有車輛 API
    const getAllCars = useCallback(async (useAPI = false) => {

        let res;

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("CarsPage", "firstUseAPIgetAllCars")) || useAPI) {
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
                        // 成功取得車輛 證照 API
                        // console.log(PreResult)
                        setCarType(PreResult)
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
                    globalContextService.set("DriversAddPage", "firstUseAPIgetAllCars", false);
                    //#endregion
                });
            //#endregion

            //#region 取得所有車輛 API
            await fetch(`${APIUrl}cars/load?page=1&limit=99999`, //cars/load?page=1&limit=20&OrgId=
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
                        // 成功取得所有車輛 API 資料
                        // console.log(PreResult)
                        res = PreResult;
                        // setAllCars(PreResult)
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
                    globalContextService.set("CarsPage", "firstUseAPIgetAllCars", false);
                    //#endregion
                });
            //#endregion

            //#region 取得所有車輛，要取得車輛名與可否派發 API
            await fetch(`${APIUrl}driverInfos/load?page=1&limit=99999`, //driverInfos/load?page=1&limit=999
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
                        // 成功取得所有車輛 API 資料
                        // console.log(PreResult)
                        res.data = (res?.data ?? [])
                            .map((car) => {
                                let driverInfo = (PreResult?.data ?? []).filter((d) => (d?.id === car?.driverInfoId))[0]
                                return { ...car, driverName: driverInfo?.userName, }
                            })
                        setAllCars(res)
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
                    globalContextService.set("CarsPage", "firstUseAPIgetAllCars", false);
                    //#endregion
                });
            //#endregion
        }
    }, [APIUrl, Switch])

    const [GetAllCarsExecute, GetAllCarsPending] = useAsync(getAllCars, true);
    //#endregion 

    //#region 刪除車輛 API
    const carsDel = useCallback(async (delStringArray) => {

        // console.log(updateRowdata)
        //#region 新增下級機構 API (右側Table)
        fetch(`${APIUrl}cars/delete`,
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
                    GetAllCarsExecute(true);
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
                })
                throw Error.message;
            })
            .finally(() => {
            });
        //#endregion
    }, [APIUrl, Switch])

    const [CarsDelExecute, CarsDelPending] = useAsync(carsDel, false);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    AllCars={AllCars}
                    CarType={CarType}
                    CarsDelExecute={CarsDelExecute}
                    CarsDelPending={CarsDelPending}

                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    AllCars={AllCars}
                    CarType={CarType}
                    CarsDelExecute={CarsDelExecute}
                    CarsDelPending={CarsDelPending}

                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    AllCars={AllCars}
                    CarType={CarType}
                    CarsDelExecute={CarsDelExecute}
                    CarsDelPending={CarsDelPending}

                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    AllCars={AllCars}
                    CarType={CarType}
                    CarsDelExecute={CarsDelExecute}
                    CarsDelPending={CarsDelPending}

                    controllGCS={controllGCS}
                />
            }
        </>
    )
}