import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { useHistory, useLocation } from 'react-router-dom';
import { isUndefined, isNil } from 'lodash';
import { clearLogoutLocalStorage, clearLogoutSession, getParseItemLocalStorage } from '../../../Handlers';
import { useAsync } from '../../../SelfHooks/useAsync';

export const BusCallCarComponent = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [Client, setClient] = useState(true); // 本日行程一覽 展開
    const [TodayToDoOpen, setTodayToDoOpen] = useState(true); // 本日行程一覽 展開
    const [AllRoute, setAllRoute] = useState([]); // 全部路線
    const [AllStation, setAllStation] = useState([]); // 全部站牌
    const [StationOnRoute, setStationOnRoute] = useState([]); // 路線中的站牌
    const [Width, Height] = useWindowSize();

    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    const [BusOrderAmt, setBusOrderAmt] = useState(
        [
            { id: "1", type: "去程" },
        ]
    ); // 訂單金額資訊


    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("BusCallCarComponentPage");
                //#endregion
                if (payload === "API") {
                    globalContextService.remove("BusCallCarComponentPage", "CheckedRowKeys");
                    globalContextService.remove("BusCallCarComponentPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "Add":
                //#region 當點擊 立即預約 按鈕時，要清除的資料
                globalContextService.remove("CallCarPage");
                globalContextService.remove("BusCallCarComponentPage");
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
            globalContextService.remove("CallCarPage");
            globalContextService.remove("BusCallCarComponentPage");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 新增幸福巴士預約訂單 API 
    const addBusCallCar = useCallback(async (addRowdata) => {

        // console.log(updateRowdata)
        //#region 新增幸福巴士預約訂單 API 
        fetch(`${APIUrl}orderOfBusUsers/add`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...addRowdata })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功新增幸福巴士預約訂單 API 
                    // console.log(PreResult.data)
                    controllGCS("Add");
                    history.push("/Record");
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

    const [AddBusCallCarExecute, AddBusCallCarPending] = useAsync(addBusCallCar, false);
    //#endregion 

    return (
        <>
            {
                768 <= Width &&
                <LaptopL
                    UserId={getParseItemLocalStorage("UserID")}
                    CaseUserId={props.BusUserId}
                    CaseName={getParseItemLocalStorage("DUserName")}
                    BusOrderAmt={BusOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AllRoute={props.AllRoute}
                    AllStation={props.AllStation}
                    StationOnRoute={props.StationOnRoute}
                    getStationOnRoute={props.getStationOnRoute}
                    AddBusCallCarExecute={AddBusCallCarExecute}
                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    UserId={getParseItemLocalStorage("UserID")}
                    CaseUserId={props.BusUserId}
                    CaseName={getParseItemLocalStorage("DUserName")}
                    BusOrderAmt={BusOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AllRoute={props.AllRoute}
                    AllStation={props.AllStation}
                    StationOnRoute={props.StationOnRoute}
                    getStationOnRoute={props.getStationOnRoute}
                    AddBusCallCarExecute={AddBusCallCarExecute}
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}