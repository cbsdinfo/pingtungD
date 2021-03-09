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
import { mapGoogleControll } from '../../../ProjectComponent';
import { clearLocalStorage, clearSession, getParseItemLocalStorage } from '../../../Handlers';
import { useAsync } from '../../../SelfHooks/useAsync';

export const WhiteCallCarComponent = (props) => {

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
            { id: "2", type: "回程" },
        ]
    ); // 訂單金額資訊
    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":

                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("WhiteCallCarComponentPage");
                //#endregion

                break;
            case "Save":
                //#region 當點擊 立即預約 按鈕時，要清除的資料
                globalContextService.remove("CallCarPage");
                globalContextService.remove("WhiteCallCarComponentPage");
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
            globalContextService.remove("WhiteCallCarComponentPage", "firstUseAPIgetCarType");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 新增、編輯客戶端用戶 API 
    const addOrderOfSelfPayUsers = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region 新增、編輯客戶端用戶 API 
        fetch(`${APIUrl}orderOfSelfPayUsers/add`,
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
                    // 成功新增、編輯客戶端用戶 API 
                    // console.log(PreResult.data)
                    if (addOrUpdateRowdata?.isLastOrder) {
                        history.push("/Record");
                        controllGCS("Save", "API");
                    }
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

    const [AddOrderOfSelfPayUsersExecute, AddOrderOfSelfPayUsersPending] = useAsync(addOrderOfSelfPayUsers, false);
    //#endregion 

    return (
        <>
            {
                768 <= Width &&
                <LaptopL
                    UserId={getParseItemLocalStorage("UserID")}
                    CaseUserId={props.WhiteUserId}
                    CaseName={getParseItemLocalStorage("DUserName")}
                    AllCarType={props.CarType} // 車種
                    WhiteOrderAmt={WhiteOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AddOrderOfSelfPayUsersPending={AddOrderOfSelfPayUsersPending}
                    AddOrderOfSelfPayUsersExecute={AddOrderOfSelfPayUsersExecute}
                    mapGoogleControll={props.mapGoogleControll}
                    GetPolylineRouteExecute={props.GetPolylineRouteExecute}
                    controllGCS={controllGCS}

                />
            }
            {
                Width < 768 &&
                <MobileM
                    UserId={getParseItemLocalStorage("UserID")}
                    CaseUserId={props.WhiteUserId}
                    CaseName={getParseItemLocalStorage("DUserName")}
                    AllCarType={props.CarType} // 車種
                    WhiteOrderAmt={WhiteOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AddOrderOfSelfPayUsersPending={AddOrderOfSelfPayUsersPending}
                    AddOrderOfSelfPayUsersExecute={AddOrderOfSelfPayUsersExecute}
                    mapGoogleControll={props.mapGoogleControll}
                    GetPolylineRouteExecute={props.GetPolylineRouteExecute}
                    controllGCS={controllGCS}

                />
            }
        </>
    )
}