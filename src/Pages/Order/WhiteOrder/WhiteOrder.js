import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService, Selector } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { useHistory } from 'react-router-dom';
import { clearLocalStorage, clearSession, getParseItemLocalStorage, valid } from '../../../Handlers';
import { useAsync } from '../../../SelfHooks/useAsync';
import { isUndefined } from 'lodash';

export const WhiteOrder = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    // const [WhichForm, setWhichForm] = useState("Login"); // 切換 登入、忘記密碼、設定登入密碼 表單
    // const [SendedAuthCode, setSendedAuthCode] = useState(false); // 紀錄是否已經發送過驗證碼 (要不要顯示重新發送驗證碼)
    // const [WaitSecToZero, setWaitSecToZero] = useState(true); // 控制驗證碼倒數
    // const [NowTab, setNowTab] = useState("車行公告"); // 目前公告頁面
    const [Width, Height] = useWindowSize();
    const [AllWhiteOrder, setAllWhiteOrder] = useState([]); // 所有 客戶端用戶

    let history = useHistory();

    const controllGCS = (type, payload) => {
        switch (type) {
            case "backFromChildPage":
                //#region 當 從所有子頁面如 新增長照身分、編輯長照身份、檢視長照身份返回時，要清除的資料

                globalContextService.remove("WhiteOrderPage");

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
            globalContextService.remove("WhiteOrderPage", "firstUseAPIgetAllWhiteOrder");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得所有 白牌車訂單 API
    const getAllWhiteOrder = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("WhiteOrderPage", "firstUseAPIgetAllWhiteOrder")) || useAPI) {
            //#endregion

            //#region 取得所有 白牌車訂單 API
            fetch(`${APIUrl}orderOfSelfPayUsers/load?page=1&limit=99999`, // orderOfSelfPayUsers/load?page=1&limit=99999
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
                        // 成功取得所有 白牌車訂單 API 資料
                        console.log(PreResult.data)
                        setAllWhiteOrder(PreResult)
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
                    globalContextService.set("WhiteOrderPage", "firstUseAPIgetAllClient", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetAllWhiteOrderExecute, GetAllWhiteOrderPending] = useAsync(getAllWhiteOrder, true);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    AllWhiteOrder={AllWhiteOrder}


                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    AllWhiteOrder={AllWhiteOrder}


                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    AllWhiteOrder={AllWhiteOrder}


                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    // WhichForm={WhichForm}
                    // setWhichForm={setWhichForm}
                    // SendedAuthCode={SendedAuthCode}
                    // setSendedAuthCode={setSendedAuthCode}
                    // WaitSecToZero={WaitSecToZero}
                    // setWaitSecToZero={setWaitSecToZero}
                    // nowTab={NowTab}
                    // setNowTab={setNowTab}


                />
            }
        </>
    )
}