import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { useHistory, useLocation } from 'react-router-dom';
import { isUndefined } from 'lodash';
import { mapGoogleControll } from '../../../../ProjectComponent';
import { clearLogoutLocalStorage, clearLogoutSession, getParseItemLocalStorage } from '../../../../Handlers';
import { useAsync } from '../../../../SelfHooks/useAsync';

export const EditWhiteFastCallCar = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [AllCarType, setAllCarType] = useState([]); // 本日行程一覽 展開
    const [TodayToDoOpen, setTodayToDoOpen] = useState(true); // 本日行程一覽 展開

    const [Width, Height] = useWindowSize();

    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    const [WhiteOrderAmt, setWhiteOrderAmt] = useState(
        [
            { id: "1", type: "去程" },
        ]
    ); // 訂單金額資訊
    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":

                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("EditWhiteFastCallCarPage");
                //#endregion

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
                    globalContextService.remove("EditWhiteFastCallCarPage", "CheckedRowKeys");
                    globalContextService.remove("EditWhiteFastCallCarPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "Save":
                //#region 當點擊 立即預約 按鈕時，要清除的資料
                globalContextService.remove("EditWhiteFastCallCarPage");
                //#endregion

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
                    globalContextService.remove("EditWhiteFastCallCarPage", "CheckedRowKeys");
                    globalContextService.remove("EditWhiteFastCallCarPage", "CheckedRowsData");
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
            globalContextService.remove("EditWhiteFastCallCarPage", "firstUseAPIgetCarType");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion


    //#region 取得 Polyline 加密路線字串 API
    const getPolylineRoute = useCallback(async (addrData) => {

        // console.log(updateRowdata)
        //#region 取得 Polyline 加密路線字串 API
        fetch(`${APIUrl}Maps/Route`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...addrData })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 取得 Polyline 加密路線字串 API
                    // console.log(PreResult.data)
                    // controllGCS("UpdateWealType", "API");
                    mapGoogleControll.addPolylineRoute(addrData?.mapId, PreResult?.result?.polyLine, addrData?.routeAttr)
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

    const [GetPolylineRouteExecute, GetPolylineRoutePending] = useAsync(getPolylineRoute, false);
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
                    AllCarType={AllCarType} // 車種
                    WhiteOrderAmt={WhiteOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AddOrderOfSelfPayUsersPending={AddOrderOfSelfPayUsersPending}
                    AddOrderOfSelfPayUsersExecute={AddOrderOfSelfPayUsersExecute}
                    GetPolylineRouteExecute={GetPolylineRouteExecute}
                    controllGCS={controllGCS}

                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    UserName={urlParams.get("caseName")}
                    AllCarType={AllCarType} // 車種
                    WhiteOrderAmt={WhiteOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AddOrderOfSelfPayUsersPending={AddOrderOfSelfPayUsersPending}
                    AddOrderOfSelfPayUsersExecute={AddOrderOfSelfPayUsersExecute}
                    GetPolylineRouteExecute={GetPolylineRouteExecute}

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