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

export const RuralCallCar = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [Client, setClient] = useState(true); // 本日行程一覽 展開
    const [TodayToDoOpen, setTodayToDoOpen] = useState(true); // 本日行程一覽 展開

    const [Width, Height] = useWindowSize();

    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("RuralCallCarPage", "Name");
                globalContextService.remove("RuralCallCarPage", "Birthday");
                globalContextService.remove("RuralCallCarPage", "Sex");
                globalContextService.remove("RuralCallCarPage", "Uid");
                globalContextService.remove("RuralCallCarPage", "CaseNumber");
                globalContextService.remove("RuralCallCarPage", "BoonType");
                globalContextService.remove("RuralCallCarPage", "Cellphone");
                globalContextService.remove("RuralCallCarPage", "Telephone");
                globalContextService.remove("RuralCallCarPage", "CaseIdentity");
                globalContextService.remove("RuralCallCarPage", "QuotaKeepYM");
                globalContextService.remove("RuralCallCarPage", "ManagementUnit");
                globalContextService.remove("RuralCallCarPage", "DisabilityLevel");
                globalContextService.remove("RuralCallCarPage", "County");
                globalContextService.remove("RuralCallCarPage", "District");
                globalContextService.remove("RuralCallCarPage", "Address");
                globalContextService.remove("RuralCallCarPage", "DriverNote");
                globalContextService.remove("RuralCallCarPage", "ContactName");
                globalContextService.remove("RuralCallCarPage", "Relationship");
                globalContextService.remove("RuralCallCarPage", "ContactCellphone");
                globalContextService.remove("RuralCallCarPage", "ContactTelephone");
                globalContextService.remove("RuralCallCarPage", "EnableDate");
                globalContextService.remove("RuralCallCarPage", "DisableDate");
                globalContextService.remove("RuralCallCarPage", "Distributable");
                globalContextService.remove("RuralCallCarPage", "NotDistributableReason");

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
                    globalContextService.remove("RuralCallCarPage", "CheckedRowKeys");
                    globalContextService.remove("RuralCallCarPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "Save":
                //#region 當點擊 儲存 按鈕時，要清除的資料
                globalContextService.remove("RuralCallCarPage", "Name");
                globalContextService.remove("RuralCallCarPage", "Birthday");
                globalContextService.remove("RuralCallCarPage", "Sex");
                globalContextService.remove("RuralCallCarPage", "Uid");
                globalContextService.remove("RuralCallCarPage", "CaseNumber");
                globalContextService.remove("RuralCallCarPage", "BoonType");
                globalContextService.remove("RuralCallCarPage", "Cellphone");
                globalContextService.remove("RuralCallCarPage", "Telephone");
                globalContextService.remove("RuralCallCarPage", "CaseIdentity");
                globalContextService.remove("RuralCallCarPage", "QuotaKeepYM");
                globalContextService.remove("RuralCallCarPage", "ManagementUnit");
                globalContextService.remove("RuralCallCarPage", "DisabilityLevel");
                globalContextService.remove("RuralCallCarPage", "County");
                globalContextService.remove("RuralCallCarPage", "District");
                globalContextService.remove("RuralCallCarPage", "Address");
                globalContextService.remove("RuralCallCarPage", "DriverNote");
                globalContextService.remove("RuralCallCarPage", "ContactName");
                globalContextService.remove("RuralCallCarPage", "Relationship");
                globalContextService.remove("RuralCallCarPage", "ContactCellphone");
                globalContextService.remove("RuralCallCarPage", "ContactTelephone");
                globalContextService.remove("RuralCallCarPage", "EnableDate");
                globalContextService.remove("RuralCallCarPage", "DisableDate");
                globalContextService.remove("RuralCallCarPage", "Distributable");
                globalContextService.remove("RuralCallCarPage", "NotDistributableReason");

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
                    globalContextService.remove("RuralCallCarPage", "CheckedRowKeys");
                    globalContextService.remove("RuralCallCarPage", "CheckedRowsData");
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
            globalContextService.remove("RuralCallCarPage", "firstUseAPIgetClient");
            globalContextService.remove("RuralCallCarPage", "firstUseAPIgetSubOrgs");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    UserId={urlParams.get("userId")}
                    Client={Client} // 客戶端用戶的基本資料

                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}

                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    UserId={urlParams.get("userId")}
                    Client={Client} // 客戶端用戶的基本資料

                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}

                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    UserId={urlParams.get("userId")}
                    Client={Client} // 客戶端用戶的基本資料

                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}

                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM

                />
            }
        </>
    )
}