import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { useHistory, useLocation } from 'react-router-dom';

export const AllBusRouteAomponent = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);

    const [Width, Height] = useWindowSize();

    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":

                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("AllBusRouteAomponentPage");
                //#endregion

                //#region 清除上一頁的勾選項
                globalContextService.remove("AllBusRouteAomponentPage", "CheckedRowKeys");
                globalContextService.remove("AllBusRouteAomponentPage", "CheckedRowsData");
                //#region Table內 身份下拉選單值清空
                Object.keys(globalContextService.get("AllBusRouteAomponentPage") ?? {}).forEach((item, index) => {
                    if (item.includes("CaseList_")) {
                        globalContextService.remove("AllBusRouteAomponentPage", item);
                    }
                })
                //#endregion

                if (payload === "API") {
                    globalContextService.remove("AllBusRouteAomponentPage", "CheckedRowKeys");
                    globalContextService.remove("AllBusRouteAomponentPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "Save":
                //#region 當點擊 立即預約 按鈕時，要清除的資料
                globalContextService.remove("AllBusRouteAomponentPage");
                //#endregion

                //#region 清除上一頁的勾選項
                globalContextService.remove("AllBusRouteAomponentPage", "CheckedRowKeys");
                globalContextService.remove("AllBusRouteAomponentPage", "CheckedRowsData");
                //#region Table內 身份下拉選單值清空
                Object.keys(globalContextService.get("AllBusRouteAomponentPage") ?? {}).forEach((item, index) => {
                    if (item.includes("CaseList_")) {
                        globalContextService.remove("AllBusRouteAomponentPage", item);
                    }
                })
                //#endregion

                if (payload === "API") {
                    globalContextService.remove("AllBusRouteAomponentPage", "CheckedRowKeys");
                    globalContextService.remove("AllBusRouteAomponentPage", "CheckedRowsData");
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
            globalContextService.remove("AllBusRouteAomponentPage", "firstUseAPIgetCarType");
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
                    data={props.data}
                    controllGCS={controllGCS}
                    CheckDetail={props.CheckDetail}
                    setCheckDetail={props.setCheckDetail}
                />
            }
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    DUserName={urlParams.get("caseName")}
                    data={data}
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    DUserName={urlParams.get("caseName")}
                    data={data}
                    controllGCS={controllGCS}
                />
            } */}
            {
                Width < 768 &&
                <MobileM
                    data={props.data}
                    controllGCS={controllGCS}
                    CheckDetail={props.CheckDetail}
                    setCheckDetail={props.setCheckDetail}
                />
            }
        </>
    )
}