import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { useHistory, useLocation } from 'react-router-dom';
import { isUndefined } from 'lodash';
import { clearLocalStorage, clearSession, getParseItemLocalStorage } from '../../../Handlers';
import { useAsync } from '../../../SelfHooks/useAsync';

export const BusFastCallCarComponent = (props) => {

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
                globalContextService.remove("BusFastCallCarComponentPage");

                //#region 清除上一頁的勾選項
                globalContextService.remove("CasePage", "CheckedRowKeys");
                globalContextService.remove("CasePage", "CheckedRowsData");
                //#region Table內 身份下拉選單值清空
                Object.keys(globalContextService.get("CasePage") ?? {}).forEach((item, index) => {
                    if (item.includes("CaseList_")) {
                        globalContextService.remove("CasePage", item);
                    }
                })
                //#endregion
                //#endregion
                if (payload === "API") {
                    globalContextService.remove("BusFastCallCarComponentPage", "CheckedRowKeys");
                    globalContextService.remove("BusFastCallCarComponentPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "Add":
                //#region 當點擊 立即預約 按鈕時，要清除的資料
                globalContextService.remove("BusFastCallCarComponentPage");
                //#region 清除上一頁的勾選項
                globalContextService.remove("CasePage", "CheckedRowKeys");
                globalContextService.remove("CasePage", "CheckedRowsData");

                //#region Table內 身份下拉選單值清空
                Object.keys(globalContextService.get("CasePage") ?? {}).forEach((item, index) => {
                    if (item.includes("CaseList_")) {
                        globalContextService.remove("CasePage", item);
                    }
                })
                //#endregion

                //#endregion

                if (payload === "API") {
                    globalContextService.remove("BusFastCallCarComponentPage", "CheckedRowKeys");
                    globalContextService.remove("BusFastCallCarComponentPage", "CheckedRowsData");
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
            // console.log(location, action, "路由變化")
            globalContextService.remove("BusFastCallCarComponentPage", "firstUseAPIgetClient");
            globalContextService.remove("BusFastCallCarComponentPage", "firstUseAPIgetSubOrgs");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    return (
        <>
            {/* 共用theme */}
            {
                768 <= Width &&
                <LaptopL
                    controllGCS={controllGCS}
                />
            }
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    CaseName={urlParams.get("caseName")}
                    Client={Client} // 客戶端用戶的基本資料
                    BusOrderAmt={BusOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AllRoute={AllRoute}
                    AllStation={AllStation}
                    StationOnRoute={StationOnRoute}
                    getStationOnRoute={getStationOnRoute}
                    AddBusCallCarExecute={AddBusCallCarExecute}
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    CaseName={urlParams.get("caseName")}
                    Client={Client} // 客戶端用戶的基本資料
                    BusOrderAmt={BusOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AllRoute={AllRoute}
                    AllStation={AllStation}
                    StationOnRoute={StationOnRoute}
                    getStationOnRoute={getStationOnRoute}
                    AddBusCallCarExecute={AddBusCallCarExecute}
                    controllGCS={controllGCS}
                />
            } */}
            {
                Width < 768 &&
                <MobileM
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}