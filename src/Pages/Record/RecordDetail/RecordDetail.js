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
import { clearLogoutLocalStorage, clearLogoutSession, getParseItemLocalStorage } from '../../../Handlers';
import { useAsync } from '../../../SelfHooks/useAsync';

export const RecordDetail = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [Width, Height] = useWindowSize();
    const [CaseData, setCaseData] = useState([]); // 用戶訂單紀錄資料
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    let history = useHistory();
    // console.log(urlParams.get("CaseId"))
    // console.log(urlParams.get("case"))

    //#region 個案類型
    const caseSwitch = (key) => {
        switch (key) {
            case "長照":
                return "CaseUsers"
            case "共享車隊":
                return "SelfPayUsers"
            case "巴士":
                return "BusUsers"
            default:
                return "CaseUsers"
        }

    }
    //#endregion

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            // console.log(location, action)
            globalContextService.remove("RecordDetailPage", "firstUseAPIgetCaseRecords");
            globalContextService.remove("RecordDetailPage")
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得用戶訂單紀錄資料 選項 API
    const getCaseRecord = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("RecordDetailPage", "firstUseAPIgetCaseRecords")) || useAPI) {
            //#endregion

            //#region 取得用戶訂單紀錄資料 API
            fetch(`${APIUrl}OrderOf${caseSwitch(urlParams.get("case"))}/Get?id=${urlParams.get("CaseId")}`, ///api/OrderOfCaseUsers/Get?id=
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
                        // 成功取得司機 證照 API
                        console.log(PreResult.result)
                        setCaseData(PreResult.result)
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
                    //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                    globalContextService.set("RecordDetailPage", "firstUseAPIgetCaseRecords", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])


    const [GetCaseRecordExecute, GetCaseRecordPending] = useAsync(getCaseRecord, true);
    //#endregion

    return (
        <>
            {/* 共用theme */}
            {
                768 <= Width &&
                <LaptopL
                    data={CaseData}
                    case={urlParams.get("case")}
                />
            }
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            } */}
            {
                Width < 768 &&
                <MobileM
                    data={CaseData}
                    case={urlParams.get("case")}
                />
            }
        </>
    )
}