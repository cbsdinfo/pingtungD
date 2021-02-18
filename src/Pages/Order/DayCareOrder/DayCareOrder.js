import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useAsync } from '../../../SelfHooks/useAsync';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isUndefined } from 'lodash';
import { getParseItemLocalStorage, clearLocalStorage, clearSession } from '../../../Handlers';
import { useHistory } from 'react-router-dom';

export const DayCareOrder = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [DayCareOrder, setDayCareOrder] = useState([]);

    const [Width, Height] = useWindowSize();
    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "modifyClientModalClose":
                //#region 當 關閉修改狀態彈窗時，要清除的資料
                globalContextService.remove("DayCareOrderPage", "ControlPanel");
                globalContextService.remove("DayCareOrderPage", "QuestionType");
                globalContextService.remove("DayCareOrderPage", "StatusTo");
                globalContextService.remove("DayCareOrderPage", "QuotaChange");
                globalContextService.remove("DayCareOrderPage", "QuestionDesc");
                globalContextService.remove("DayCareOrderPage", "ReasonAndImprove");
                globalContextService.remove("DayCareOrderPage", "SignatureName");
                globalContextService.remove("DayCareOrderPage", "ContactPhone");
                if (payload === "API") {
                    globalContextService.remove("DayCareOrderPage", "CheckedRowKeys");
                    globalContextService.remove("DayCareOrderPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "Refresh":
                //#region 當 按下刷新按紐時，要清除的資料
                globalContextService.remove("DayCareOrderPage", "Keyword");
                globalContextService.remove("DayCareOrderPage", "OrderStatus");
                if (payload === "API") {
                    globalContextService.remove("DayCareOrderPage", "CheckedRowKeys");
                    globalContextService.remove("DayCareOrderPage", "CheckedRowsData");
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
            globalContextService.remove("DayCareOrderPage", "firstUseAPIgetDayCareOrder");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得 日照預約訂單 API (目前先使用白牌資料 待API取得後要修改API)
    const getDayCareOrder = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("DayCareOrderPage", "firstUseAPIgetDayCareOrder")) || useAPI) {
            //#endregion

            //#region 取得 日照預約訂單 API
            fetch(`${APIUrl}orderOfSelfPayUsers/load?page=1&limit=99999`, // orderOfSelfPayUsers/load?page=1&limit=99999
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
                        // 成功取得 日照預約訂單
                        // console.log(PreResult)
                        setDayCareOrder(PreResult)
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
                    globalContextService.set("DayCareOrderPage", "firstUseAPIgetDayCareOrder", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetDayCareOrderExecute, GetDayCareOrderPending] = useAsync(getDayCareOrder, true);
    //#endregion 


    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    DayCareOrder={DayCareOrder}
                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    DayCareOrder={DayCareOrder}
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    DayCareOrder={DayCareOrder}
                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    DayCareOrder={DayCareOrder}
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}