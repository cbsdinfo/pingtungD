import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useAsync } from '../../../SelfHooks/useAsync';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { getParseItemLocalStorage, clearLocalStorage, clearSession } from '../../../Handlers';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { isUndefined } from 'lodash';
import { useHistory } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';

export const WhiteConsole = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [NoOrgOrder, setNoOrgOrder] = useState([]); // 讀取未被搶單的訂單
    const [OrgOrder, setOrgOrder] = useState([]); // 讀取登入可用組織訂單
    const [DriverInfos, setDriverInfos] = useState([]); // 讀取司機資訊
    const [CarInfos, setCarInfos] = useState([]); // 讀取車輛資訊
    const [connection, setConnection] = useState(null);
    const [OpenWhiteOrderEditTitleModal, setOpenWhiteOrderEditTitleModal] = useState(false); // 是否開啟編輯訂單 Modal
    const [AllCarType, setAllCarType] = useState([]); // 本日行程一覽 展開

    const [Width, Height] = useWindowSize();
    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "mulRosterModalClose":
                //#region 當 編輯 Modal 關閉時，要清除的資料
                globalContextService.remove("WhiteConsolePage", "MulRosterOrderDriver");
                globalContextService.remove("WhiteConsolePage", "MulRosterOrderCar");
                if (payload === "API") {
                    globalContextService.remove("WhiteConsolePage", "CheckedRowKeys");
                    globalContextService.remove("WhiteConsolePage", "CheckedRowsData");
                }
                //#endregion
                break;

            case "changeDriveAndCarModalClose":
                //#region 當 更換司機 Modal 關閉時，要清除的資料
                globalContextService.remove("WhiteConsolePage", "ChangeDriveAndCarOrderDriver");
                globalContextService.remove("WhiteConsolePage", "ChangeDriveAndCarOrderCar");
                console.log("56vu/6fu/ tj6", globalContextService.get("WhiteConsolePage"))
                if (payload === "API") {
                    globalContextService.remove("WhiteConsolePage", "CheckedRowKeys");
                    globalContextService.remove("WhiteConsolePage", "CheckedRowsData");
                }
                //#endregion
                break;

            case "editOrderModalClose":
                //#region 當 編輯訂單 Modal 關閉時，要清除的資料
                globalContextService.remove("WhiteConsolePage", "DispatchEditRoute");
                globalContextService.remove("WhiteConsolePage", "DispatchEditStartPos");
                globalContextService.remove("WhiteConsolePage", "DispatchEditEndPos");
                globalContextService.remove("WhiteConsolePage", "DispatchEditTravelDate");
                globalContextService.remove("WhiteConsolePage", "DispatchEditTravelTime");
                globalContextService.remove("WhiteConsolePage", "DispatchEditAccTotalCounts");
                if (payload === "API") {
                    globalContextService.remove("WhiteConsolePage", "CheckedRowKeys");
                    globalContextService.remove("WhiteConsolePage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "Refresh":
                //#region 當 按下刷新按紐時，要清除的資料
                globalContextService.remove("WhiteConsolePage", "Keyword");
                if (payload === "API") {
                    globalContextService.remove("WhiteConsolePage", "CheckedRowKeys");
                    globalContextService.remove("WhiteConsolePage", "CheckedRowsData");
                }
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
            globalContextService.remove("WhiteConsolePage", "firstUseAPIgetNoOrgOrder");
            globalContextService.remove("WhiteConsolePage", "firstUseAPIgetOrgOrder");
            globalContextService.remove("WhiteConsolePage", "firstUseAPIgetCarType");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 串接實時 chatHub API
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            // .withUrl("http://openauth.1966.org.tw/api/chatHub")
            .withUrl(`${APIUrl}chatHub`)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {


            connection.start()
                .then(result => {
                    console.log('Connected!');
                    console.log("result", result)
                    connection.on('ReceiveOrderMessage', message => {
                        // const updatedChat = [...latestChat.current];
                        // updatedChat.push(message);
                        GetNoOrgOrderExecute(true);
                        // setChat(updatedChat);
                        console.log("ReceiveOrderMessage", message)
                    });

                    connection.on('ReceiveOrderHide', message => {
                        // const updatedChat = [...latestChat.current];
                        // updatedChat.push(message);
                        GetNoOrgOrderExecute(true);
                        GetOrgOrderExecute(true); // 重新撈組織的訂單
                        // setChat(updatedChat);
                        console.log("ReceiveOrderHide", message)
                    });


                })
                .catch(e => console.log('Connection failed: ', e));
        }

        return () => {
            if (connection) {
                connection.off("ReceiveOrderMessage");
                connection.off("ReceiveOrderHide");
                connection.stop();
            }
        }
    }, [connection]);
    //#endregion

    //#region 取得 讀取未被搶單的訂單 API
    const getNoOrgOrder = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("WhiteConsolePage", "firstUseAPIgetNoOrgOrder")) || useAPI) {
            //#endregion

            //#region 取得 讀取未被搶單的訂單 API
            fetch(`${APIUrl}orderOfSelfPayUsers/loadNoOrg`, // users/getclient?id=6717458081668177920
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
                        // 成功取得 讀取未被搶單的訂單
                        // console.log(PreResult)
                        setNoOrgOrder(PreResult.data)
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
                    globalContextService.set("WhiteConsolePage", "firstUseAPIgetNoOrgOrder", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetNoOrgOrderExecute, GetNoOrgOrderPending] = useAsync(getNoOrgOrder, true);
    //#endregion 

    //#region 取得 讀取登入可用組織訂單 API
    const getOrgOrder = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("WhiteConsolePage", "firstUseAPIgetOrgOrder")) || useAPI) {
            //#endregion

            //#region 取得 讀取登入可用組織訂單 API
            fetch(`${APIUrl}despatchOfSelfPayUsers/load?page=1&limit=99999`, // users/getclient?id=6717458081668177920
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
                        // 成功取得 讀取登入可用組織訂單
                        // console.log(PreResult)

                        //#region 資料重整，分有共乘與無共乘
                        let cloneRes = cloneDeep(PreResult?.data) ?? []
                        let lengthOfFiltercloneRes = Array(cloneRes.length).fill(0)
                        let res = [];

                        for (let i = 0; i < lengthOfFiltercloneRes.length; i++) {
                            if (cloneRes[i]?.despatchNo) {
                                let filtercloneRes = cloneRes.filter(item => item?.despatchNo === cloneRes[i]?.despatchNo)

                                // 再次判斷有沒有 至少兩張 despatchNo 一樣的 才叫共乘單
                                if (filtercloneRes.length > 1) {
                                    res.push({ isShare: filtercloneRes })
                                    i = i + filtercloneRes.length - 1;
                                }
                                else {
                                    res.push(cloneDeep(cloneRes[i]));
                                }

                            } else {
                                res.push(cloneDeep(cloneRes[i]));
                            }

                        }

                        //#endregion
                        console.log(res)
                        setOrgOrder({ ...PreResult, data: res })
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
                    globalContextService.set("WhiteConsolePage", "firstUseAPIgetOrgOrder", false);
                    //#endregion
                });
            //#endregion

            //#region 取得 司機資訊 API
            fetch(`${APIUrl}driverInfos/load?limit=99999&page=1`, // 
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
                        // 成功取得 司機資訊
                        // console.log(PreResult)
                        setDriverInfos((PreResult.data ?? []).map(item => ({ data: { ...item }, value: item.id, label: `${item.userName} / ${item.phone}` })))
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
                    // globalContextService.set("WhiteConsolePage", "firstUseAPIgetOrgOrder", false);
                    //#endregion
                });
            //#endregion

            //#region 取得 車輛資訊 API
            fetch(`${APIUrl}cars/load?limit=99999&page=1`, // 
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
                        // 成功取得 車輛資訊
                        // console.log(PreResult)
                        setCarInfos((PreResult.data ?? []).map(item => ({ data: { ...item }, value: item.id, label: `${item.carCategoryName} / ${item.seatNum}人座 / ${item.carNo}` })))
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
                    // globalContextService.set("WhiteConsolePage", "firstUseAPIgetOrgOrder", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetOrgOrderExecute, GetOrgOrderPending] = useAsync(getOrgOrder, true);
    //#endregion 

    //#region 取得 車種下拉選單選項 API
    const getCarType = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("WhiteConsolePage", "firstUseAPIgetCarType")) || useAPI) {
            //#endregion

            //#region 取得 車種下拉選單選項 API
            fetch(`${APIUrl}categorys/load?page=1&limit=99999&TypeId=SYS_CAR`, // categorys/load?page=1&limit=99999&TypeId=SYS_CAR
                // 注意!! 目前尚未提供查詢管理單位API，可能因為權限而取不到值，所以目前這裡一律寫死A單位 orgId，直到未來提供新的查詢API
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
                        // 成功取得 車種下拉選單選項 
                        // console.log(PreResult.data);
                        setAllCarType(PreResult.data
                            .map(item => ({ value: item.id, label: item.name }))
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
                    //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                    globalContextService.set("WhiteConsolePage", "firstUseAPIgetCarType", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetCarTypeExecute, GetCarTypePending] = useAsync(getCarType, true);
    //#endregion



    //#region 白牌車調度台 - 搶單 API
    const updateOrgId = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region  白牌車調度台 - 搶單 API
        fetch(`${APIUrl}orderOfSelfPayUsers/updateOrgId`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
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
                    // 成功搶單 
                    // console.log(PreResult.data)
                    // controllGCS("Save", "API");
                    // history.push("/Case");
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

    const [UpdateOrgIdExecute, UpdateOrgIdPending] = useAsync(updateOrgId, false);
    //#endregion 

    //#region 白牌車調度台 - 排班、變更司機車輛、共乘 API
    const rosterOrder = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region  白牌車調度台 - 排班 API
        fetch(`${APIUrl}despatchOfSelfPayUsers/addOrUpdate`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
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
                    // 成功排班
                    // 應該透過 HubConnectionBuilder 更新就好，但缺乏 on 監聽狀態，所以主動刷新
                    GetOrgOrderExecute(true); // 重新撈組織的訂單
                    // console.log(PreResult.data)
                    // controllGCS("Save", "API");
                    // history.push("/Case");
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

    const [RosterOrderExecute, RosterOrderPending] = useAsync(rosterOrder, false);
    //#endregion 

    //#region 白牌車調度台 - 取消排班 API
    const cancelDespatch = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region  白牌車調度台 - 取消排班 API
        fetch(`${APIUrl}DespatchOfSelfPayUsers/CancelDespatch`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify([...addOrUpdateRowdata])
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功取消排班
                    // 應該透過 HubConnectionBuilder 更新就好，但缺乏 on 監聽狀態，所以主動刷新
                    GetOrgOrderExecute(true); // 重新撈組織的訂單 就好
                    // console.log(PreResult.data)
                    // controllGCS("Save", "API");
                    // history.push("/Case");
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

    const [CancelDespatchExecute, CancelDespatchPending] = useAsync(cancelDespatch, false);
    //#endregion 

    //#region 白牌車調度台 - 取消訂單 API
    const cancelOrderReq = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region  白牌車調度台 - 取消訂單 API
        fetch(`${APIUrl}orderOfSelfPayUsers/cancelOrderReq`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
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
                    // 成功取消訂單
                    // 應該透過 HubConnectionBuilder 更新就好，但缺乏 on 監聽狀態，所以主動刷新
                    GetOrgOrderExecute(true); // 重新撈組織的訂單
                    // console.log(PreResult.data)
                    // controllGCS("Save", "API");
                    // history.push("/Case");
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

    const [CancelOrderReqExecute, CancelOrderReqPending] = useAsync(cancelOrderReq, false);
    //#endregion 

    //#region 白牌車調度台 - 編輯訂單 API
    const updateEditOrder = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region  白牌車調度台 - 編輯訂單 API
        fetch(`${APIUrl}OrderOfSelfPayUsers/Update`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
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
                    // 成功編輯訂單
                    // 應該透過 HubConnectionBuilder 更新就好，但缺乏 on 監聽狀態，所以主動刷新
                    GetOrgOrderExecute(true); // 重新撈組織的訂單
                    globalContextService.get("WhiteConsolePage", "CloseWhiteOrderEditTitleModal")(false);
                    globalContextService.remove("WhiteConsolePage", "CloseWhiteOrderEditTitleModal");
                    controllGCS("editOrderModalClose")
                    // console.log(PreResult.data)
                    // controllGCS("Save", "API");
                    // history.push("/Case");
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

    const [UpdateEditOrderExecute, UpdateEditOrderPending] = useAsync(updateEditOrder, false);
    //#endregion 

    //#region 白牌車調度台 - 刪除訂單 API
    const delOrderReq = useCallback(async (delIdArray) => {

        // console.log(updateRowdata)
        //#region  白牌車調度台 - 刪除訂單 API
        fetch(`${APIUrl}orderOfSelfPayUsers/delete`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify([...delIdArray])
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功刪除訂單
                    // 應該透過 HubConnectionBuilder 更新就好，但缺乏 on 監聽狀態，所以主動刷新
                    GetOrgOrderExecute(true); // 重新撈組織的訂單
                    // console.log(PreResult.data)
                    // controllGCS("Save", "API");
                    // history.push("/Case");
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

    const [DelOrderReqExecute, DelOrderReqPending] = useAsync(delOrderReq, false);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    NoOrgOrder={NoOrgOrder}
                    OrgOrder={OrgOrder}
                    DriverInfos={DriverInfos}
                    CarInfos={CarInfos}
                    AllCarType={AllCarType}

                    OpenWhiteOrderEditTitleModal={OpenWhiteOrderEditTitleModal} // 是否開啟編輯訂單 Modal
                    setOpenWhiteOrderEditTitleModal={setOpenWhiteOrderEditTitleModal} // 是否開啟編輯訂單 Modal

                    UpdateOrgIdExecute={UpdateOrgIdExecute} // 搶單
                    UpdateOrgIdPending={UpdateOrgIdPending} // 搶單
                    RosterOrderExecute={RosterOrderExecute} // 排班、變更司機車輛、共乘
                    RosterOrderPending={RosterOrderPending} // 排班、變更司機車輛、共乘
                    CancelDespatchExecute={CancelDespatchExecute} // 取消排班
                    CancelDespatchPending={CancelDespatchPending} // 取消排班
                    CancelOrderReqExecute={CancelOrderReqExecute} // 取消訂單
                    CancelOrderReqPending={CancelOrderReqPending} // 取消訂單
                    UpdateEditOrderExecute={UpdateEditOrderExecute} // 編輯訂單
                    UpdateEditOrderPending={UpdateEditOrderPending} // 編輯訂單
                    DelOrderReqExecute={DelOrderReqExecute} // 刪除訂單
                    DelOrderReqPending={DelOrderReqPending} // 刪除訂單

                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    NoOrgOrder={NoOrgOrder}
                    OrgOrder={OrgOrder}
                    DriverInfos={DriverInfos}
                    CarInfos={CarInfos}
                    AllCarType={AllCarType}

                    OpenWhiteOrderEditTitleModal={OpenWhiteOrderEditTitleModal} // 是否開啟編輯訂單 Modal
                    setOpenWhiteOrderEditTitleModal={setOpenWhiteOrderEditTitleModal} // 是否開啟編輯訂單 Modal

                    UpdateOrgIdExecute={UpdateOrgIdExecute} // 搶單
                    UpdateOrgIdPending={UpdateOrgIdPending} // 搶單
                    RosterOrderExecute={RosterOrderExecute} // 排班、變更司機車輛、共乘
                    RosterOrderPending={RosterOrderPending} // 排班、變更司機車輛、共乘
                    CancelDespatchExecute={CancelDespatchExecute} // 取消排班
                    CancelDespatchPending={CancelDespatchPending} // 取消排班
                    CancelOrderReqExecute={CancelOrderReqExecute} // 取消訂單
                    CancelOrderReqPending={CancelOrderReqPending} // 取消訂單
                    UpdateEditOrderExecute={UpdateEditOrderExecute} // 編輯訂單
                    UpdateEditOrderPending={UpdateEditOrderPending} // 編輯訂單
                    DelOrderReqExecute={DelOrderReqExecute} // 刪除訂單
                    DelOrderReqPending={DelOrderReqPending} // 刪除訂單

                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    NoOrgOrder={NoOrgOrder}
                    OrgOrder={OrgOrder}
                    DriverInfos={DriverInfos}
                    CarInfos={CarInfos}
                    AllCarType={AllCarType}

                    OpenWhiteOrderEditTitleModal={OpenWhiteOrderEditTitleModal} // 是否開啟編輯訂單 Modal
                    setOpenWhiteOrderEditTitleModal={setOpenWhiteOrderEditTitleModal} // 是否開啟編輯訂單 Modal

                    UpdateOrgIdExecute={UpdateOrgIdExecute} // 搶單
                    UpdateOrgIdPending={UpdateOrgIdPending} // 搶單
                    RosterOrderExecute={RosterOrderExecute} // 排班、變更司機車輛、共乘
                    RosterOrderPending={RosterOrderPending} // 排班、變更司機車輛、共乘
                    CancelDespatchExecute={CancelDespatchExecute} // 取消排班
                    CancelDespatchPending={CancelDespatchPending} // 取消排班
                    CancelOrderReqExecute={CancelOrderReqExecute} // 取消訂單
                    CancelOrderReqPending={CancelOrderReqPending} // 取消訂單
                    UpdateEditOrderExecute={UpdateEditOrderExecute} // 編輯訂單
                    UpdateEditOrderPending={UpdateEditOrderPending} // 編輯訂單
                    DelOrderReqExecute={DelOrderReqExecute} // 刪除訂單
                    DelOrderReqPending={DelOrderReqPending} // 刪除訂單

                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}