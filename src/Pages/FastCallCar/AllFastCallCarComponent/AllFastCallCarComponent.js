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
import { mapGoogleControll } from '../../../ProjectComponent';
import moment from "moment";
import { fmt } from '../../../Handlers/DateHandler';

export const AllFastCallCarComponent = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [Client, setClient] = useState(true); // 客戶端用戶的基本資料
    const [CaseUsers, setCaseUsers] = useState({}); // 用戶長照身份的基本資料
    // const [AllBUnits, setAllBUnits] = useState([]); // 所有 B單位
    const [TodayToDoOpen, setTodayToDoOpen] = useState(true); // 本日行程一覽 展開
    const [CarType, setCarType] = useState([]); // 車輛類別
    const [CaseDiscount, setCaseDiscount] = useState([]); // 補助餘額

    const [CaseOrderAmt, setCaseOrderAmt] = useState(
        [
            { id: "1", type: "去程" },
            { id: "2", type: "回程" },
        ]
    ); // 訂單金額資訊


    const [Width, Height] = useWindowSize();

    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("AllFastCallCarComponentPage");
                //#endregion
                break;
            case "SaveHaveNextOrderFlag":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("AllFastCallCarComponentPage");
                //#endregion
                break;
            case "SaveNoHaveNextOrderFlag":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("AllFastCallCarComponentPage");
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
            globalContextService.remove("AllFastCallCarComponentPage", "firstUseAPIgetClient");
            globalContextService.remove("AllFastCallCarComponentPage", "firstUseAPIgetCaseUsers");
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
                    UserName={urlParams.get("caseName")}
                    Client={Client} // 客戶端用戶的基本資料
                    CaseUsers={CaseUsers} // 用戶長照身份的基本資料
                    CarType={CarType}  // 車輛類別
                    CaseOrderAmt={CaseOrderAmt} // 訂單金額資訊
                    CaseDiscount={CaseDiscount} // 補助餘額

                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    GetPolylineRouteExecute={GetPolylineRouteExecute} //  取得 Polyline 加密路線字串 API
                    GetCaseOrderAmtExecute={GetCaseOrderAmtExecute} // 抓取訂單金額資訊
                    AddOrderOfCaseUsersExecute={AddOrderOfCaseUsersExecute} // 新增長照訂單

                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    UserName={urlParams.get("caseName")}
                    Client={Client} // 客戶端用戶的基本資料
                    CaseUsers={CaseUsers} // 用戶長照身份的基本資料
                    CarType={CarType}  // 車輛類別
                    CaseOrderAmt={CaseOrderAmt} // 訂單金額資訊
                    CaseDiscount={CaseDiscount} // 補助餘額

                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    GetPolylineRouteExecute={GetPolylineRouteExecute} //  取得 Polyline 加密路線字串 API
                    GetCaseOrderAmtExecute={GetCaseOrderAmtExecute} // 抓取訂單金額資訊
                    AddOrderOfCaseUsersExecute={AddOrderOfCaseUsersExecute} // 新增長照訂單

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