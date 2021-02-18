import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService, Selector } from '../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { useHistory } from 'react-router-dom';
import { clearLocalStorage, clearSession, getParseItemLocalStorage, valid } from '../../Handlers';
import { useAsync } from '../../SelfHooks/useAsync';
import { isUndefined } from 'lodash';
import { caseListSelectOption } from '../../Mappings/Mappings';

export const Case = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    const { pages: { cases: { rwd: { laptopL } } } } = Theme;

    const [AllClient, setAllClient] = useState([]); // 所有 客戶端用戶
    const [AllBUnits, setAllBUnits] = useState([]); // 所有 B單位
    const [ChooseBUnits, setChooseBUnits] = useState([]); // 對應長照身分id 選取的 B單位
    const [QuotaInfo, setQuotaInfo] = useState({}); // 可用額度 回傳值

    const [OpenBUnitModal, setOpenBUnitModal] = useState(false); // 是否開啟B單位彈窗
    const [OpenQuotaModal, setOpenQuotaModal] = useState(false); // 是否開啟可用額度彈窗

    const [Width, Height] = useWindowSize();
    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "addClientModalClose":
                //#region 當 新增客戶端用戶 Modal 關閉時，要清除的資料
                globalContextService.remove("CasePage", "Name");
                globalContextService.remove("CasePage", "Birthday");
                globalContextService.remove("CasePage", "Uid");
                globalContextService.remove("CasePage", "Sex");
                globalContextService.remove("CasePage", "Cellphone");
                if (payload === "API") {
                    globalContextService.remove("CasePage", "CheckedRowKeys");
                    globalContextService.remove("CasePage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "editClientModalClose":
                //#region 當 新增客戶端用戶 Modal 關閉時，要清除的資料
                globalContextService.remove("CasePage", "Name");
                globalContextService.remove("CasePage", "Birthday");
                globalContextService.remove("CasePage", "Uid");
                globalContextService.remove("CasePage", "Sex");
                globalContextService.remove("CasePage", "Cellphone");
                if (payload === "API") {
                    globalContextService.remove("CasePage", "CheckedRowKeys");
                    globalContextService.remove("CasePage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "viewClientModalClose":
                //#region 當 新增客戶端用戶 Modal 關閉時，要清除的資料
                globalContextService.remove("CasePage", "Name");
                globalContextService.remove("CasePage", "Birthday");
                globalContextService.remove("CasePage", "Uid");
                globalContextService.remove("CasePage", "Sex");
                globalContextService.remove("CasePage", "Cellphone");
                if (payload === "API") {
                    globalContextService.remove("CasePage", "CheckedRowKeys");
                    globalContextService.remove("CasePage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "unlockClient":
                //#region 當 新增客戶端用戶 Modal 關閉時，要清除的資料
                if (payload === "API") {
                    globalContextService.remove("CasePage", "CheckedRowKeys");
                    globalContextService.remove("CasePage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "selectCaseListModalClose":
                //#region 當 選擇欲新增身份彈窗 Modal 關閉時，要清除的資料
                globalContextService.remove("CasePage", "CaseListSelect");
                if (payload === "API") {
                    globalContextService.remove("CasePage", "CheckedRowKeys");
                    globalContextService.remove("CasePage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "bUnitModalClose":
                //#region 當 選擇B單位 Modal 關閉時，要清除的資料
                globalContextService.remove("CasePage", "BUnits");
                if (payload === "API") {
                    globalContextService.remove("CasePage", "CheckedRowKeys");
                    globalContextService.remove("CasePage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "QuotaModalClose":
                //#region 當 可用額度 Modal 關閉時，要清除的資料
                globalContextService.remove("CasePage", "NewQuota");
                if (payload === "API") {
                    globalContextService.remove("CasePage", "CheckedRowKeys");
                    globalContextService.remove("CasePage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "backFromChildPage":
                //#region 當 從所有子頁面如 新增長照身分、編輯長照身份、檢視長照身份返回時，要清除的資料
                //#region 長照
                //編輯
                // globalContextService.remove("CaseEditPage", "firstUseAPIgetClient");
                // globalContextService.remove("CaseEditPage", "firstUseAPIgetSubOrgs");
                // globalContextService.remove("CaseEditPage", "firstUseAPIgetCaseUsers");
                globalContextService.remove("CaseEditPage");
                //新增
                // globalContextService.remove("CaseAddPage", "firstUseAPIgetClient");
                // globalContextService.remove("CaseAddPage", "firstUseAPIgetSubOrgs");
                globalContextService.remove("CaseAddPage");
                //檢視
                // globalContextService.remove("CaseInformationPage", "firstUseAPIgetClient");
                // globalContextService.remove("CaseInformationPage", "firstUseAPIgetCaseUsers");
                globalContextService.remove("CaseInformationPage");
                //叫車
                globalContextService.remove("CaseCallCarPage");
                //#endregion
                //#region 白牌
                //編輯
                // globalContextService.remove("WhiteEditPage", "firstUseAPIgetClient");
                // globalContextService.remove("WhiteEditPage", "firstUseAPIgetCaseUsers");
                globalContextService.remove("WhiteEditPage");
                //新增
                // globalContextService.remove("WhiteAddPage", "firstUseAPIgetClient");
                globalContextService.remove("WhiteAddPage");
                //檢視
                // globalContextService.remove("WhiteInformationPage", "firstUseAPIgetClient");
                // globalContextService.remove("WhiteInformationPage", "firstUseAPIgetCaseUsers");
                globalContextService.remove("WhiteInformationPage");
                //叫車
                globalContextService.remove("WhiteCallCarPage");
                //#endregion
                //#region 幸福巴士
                //編輯
                // globalContextService.remove("BusEditPage", "firstUseAPIgetClient");
                // globalContextService.remove("BusEditPage", "firstUseAPIgetCaseUsers");
                globalContextService.remove("BusEditPage");
                //新增
                // globalContextService.remove("BusAddPage", "firstUseAPIgetClient");
                globalContextService.remove("BusAddPage");
                //檢視
                // globalContextService.remove("BusInformationPage", "firstUseAPIgetClient");
                // globalContextService.remove("BusInformationPage", "firstUseAPIgetCaseUsers");
                globalContextService.remove("BusInformationPage");
                //叫車
                globalContextService.remove("BusCallCarPage");
                //#endregion
                //#region 偏鄉
                //編輯
                globalContextService.remove("RuralEditPage");
                //新增
                globalContextService.remove("RuralAddPage");
                //檢視
                globalContextService.remove("RuralInformationPage");
                //叫車
                globalContextService.remove("RuralCallCarPage");
                //#endregion
                //#region 日照
                //編輯
                globalContextService.remove("DayCareEditPage");
                //新增
                globalContextService.remove("DayCareAddPage");
                //檢視
                globalContextService.remove("DayCareInformationPage");
                //叫車
                // globalContextService.remove("DayCareCallCarPage");
                //#endregion
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
            globalContextService.remove("CasePage", "firstUseAPIgetAllClient");
            globalContextService.remove("CasePage");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 新增、編輯客戶端用戶 API 
    const addOrUpdateClient = useCallback(async (addRowdata, isUpdate = false) => {

        // console.log(updateRowdata)
        //#region 新增、編輯客戶端用戶 API 
        fetch(`${APIUrl}users/addorupdateclient`,
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
                    // 成功新增、編輯客戶端用戶 API 
                    // console.log(PreResult.data)
                    controllGCS("addClientModalClose", "API")
                    GetAllClientExecute(true);

                    if (!isUpdate) {
                        //#region 開始詢問是否接續新增身分

                        //#region 打開選擇欲新增身份彈窗 Modal
                        let rowData = { id: PreResult.result }

                        modalsService.titleModal.normal({
                            //id: "top1",
                            title: "接續新增身份",
                            yes: true,
                            yesText: "確認",
                            no: true,
                            noText: "取消",
                            // autoClose: true,
                            backgroundClose: false,
                            noOnClick: (e) => {
                                controllGCS("selectCaseListModalClose")
                            },
                            yesOnClick: (e, close) => {
                                //#region 表單驗證
                                let validMsg = "";
                                if (valid(globalContextService.get("CasePage", "CaseListSelect")?.value ?? "", ["^.{1,}$"], ["請選擇用戶身份"])[1]) {
                                    validMsg = valid(globalContextService.get("CasePage", "CaseListSelect")?.value ?? "", ["^.{1,}$"], ["請選擇用戶身份"])[1]
                                }
                                //#endregion

                                //#region 表單驗證後動作
                                if (validMsg !== "") {
                                    // console.log(validMsg, globalContextService.get("CasePage"))
                                    modalsService.infoModal.error({
                                        id: "top1", //注意 這裡要加上固定id
                                        iconRightText: validMsg,
                                        yes: true,
                                        yesText: "確認",
                                        // no: true,
                                        // autoClose: true,
                                        backgroundClose: false,
                                        yesOnClick: (e, close) => {
                                            close();
                                        }
                                    })
                                }
                                else {
                                    // 前往對應身份路由
                                    // 注意，因為下拉選單的Valu 包含了 _caseId ，所以要將它split過濾掉
                                    switch (globalContextService.get("CasePage", "CaseListSelect")?.value.split('_')[0]) {
                                        case "caseuser":
                                            //#region 打開新增長照身份頁面，並傳遞 userId
                                            history.push(`/Case/Add?userId=${rowData.id}&fastCreat=1`) // 夾帶  fastCreat 參數
                                            //#endregion
                                            break;
                                        case "selfpayuser":
                                            //#region 打開新增白牌車頁面，並傳遞 userId
                                            history.push(`/Case/WhiteAdd?userId=${rowData.id}&fastCreat=1`) // 夾帶  fastCreat 參數
                                            //#endregion
                                            break;
                                        case "countrySide":
                                            //#region 打開新增偏鄉運能不足身份頁面，並傳遞 userId
                                            history.push(`/Case/RuralAdd?userId=${rowData.id}&fastCreat=1`) // 夾帶  fastCreat 參數
                                            //#endregion
                                            break;
                                        case "bususer":
                                            //#region 打開新增幸福巴士身份頁面，並傳遞 userId
                                            history.push(`/Case/BusAdd?userId=${rowData.id}&fastCreat=1`) // 夾帶  fastCreat 參數
                                            //#endregion
                                            break;
                                        case "daycare":
                                            //#region 打開新增日照身份頁面，並傳遞 userId
                                            history.push(`/Case/DayCareAdd?userId=${rowData.id}&fastCreat=1`) // 夾帶  fastCreat 參數
                                            //#endregion
                                            break;
                                        default:
                                            break;
                                    }
                                    controllGCS("selectCaseListModalClose")
                                    close();
                                }
                                //#endregion
                            },
                            closeIconOnClick: (e) => {
                                controllGCS("selectCaseListModalClose")
                            },
                            content: (
                                <FormContainer
                                    baseDefaultTheme={"DefaultTheme"}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                    }}
                                    theme={laptopL.editFormContainer}
                                >
                                    <FormRow baseDefaultTheme={"DefaultTheme"}>
                                        {/* 選擇欲新增身份彈窗 - 用戶身份 caseList */}
                                        <Selector
                                            bascDefaultTheme={"DefaultTheme"}
                                            topLabel={<>用戶身份</>}
                                            //viewType
                                            isSearchable
                                            placeholder={"請選擇用戶身份"}
                                            // isMulti
                                            // hideSelectedOptions={false}
                                            value={globalContextService.get("CasePage", "CaseListSelect") ?? null}
                                            onChange={(e, value, onInitial) => {
                                                // console.log(value)
                                                globalContextService.set("CasePage", "CaseListSelect", value);
                                            }}

                                            options={[
                                                { value: 'hint', label: "請選擇用戶身份", isDisabled: true },
                                                ...caseListSelectOption
                                            ]}
                                            menuPosition={true}
                                            theme={laptopL.caseListSelect}
                                        />

                                    </FormRow>
                                </FormContainer>
                            ),
                            theme: laptopL.caseListSelectModal
                        })
                        //#endregion

                        //#endregion
                    }
                }
                else {
                    if (PreResult.code === 500 && PreResult.message === "用戶賬號已存在") {
                        controllGCS("addClientModalClose")
                    }
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
            });
        //#endregion
    }, [APIUrl, Switch])

    const [AddOrUpdateClientExecute, AddOrUpdateClientPending] = useAsync(addOrUpdateClient, false);
    //#endregion 

    //#region 取得所有 客戶端用戶 API
    const getAllClient = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("CasePage", "firstUseAPIgetAllClient")) || useAPI) {
            //#endregion

            //#region 取得所有 客戶端用戶 API
            fetch(`${APIUrl}users/loadwithtype?page=1&limit=99999&orgId=`, // users/loadwithtype?page=1&limit=20&orgId=
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
                        // 成功取得所有 客戶端用戶 API 資料
                        // console.log(PreResult)
                        setAllClient(PreResult)
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
                    globalContextService.set("CasePage", "firstUseAPIgetAllClient", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetAllClientExecute, GetAllClientPending] = useAsync(getAllClient, true);
    //#endregion 

    //#region 客戶端用戶 帳號解鎖 API 
    const unlockClient = useCallback(async (unlockRowdata) => {

        // console.log(updateRowdata)
        //#region 客戶端用戶 帳號解鎖 API 
        fetch(`${APIUrl}users/unlock`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...unlockRowdata })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功客戶端用戶 帳號解鎖 
                    // console.log(PreResult.data)
                    controllGCS("unlockClient", "API")
                    GetAllClientExecute(true);

                    //#region 成功解鎖訊息
                    modalsService.infoModal.warn({
                        iconRightText: `解鎖${PreResult.message}`,
                        yes: true,
                        yesText: "確認",
                        // no: true,
                        // autoClose: true,
                        backgroundClose: false,
                        yesOnClick: (e, close) => { close(); }
                    })
                    //#endregion
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
            });
        //#endregion
    }, [APIUrl, Switch])

    const [UnlockClientExecute, UnlockClientPending] = useAsync(unlockClient, false);
    //#endregion 

    //#region 取得所有 B單位選項 API
    const getAllBUnits = useCallback(async (useAPI = false) => {

        //#region 取得所有 B單位選項 API
        fetch(`${APIUrl}orgs/LoadOrgB`, // orgs/LoadOrgB
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
                    // 成功取得所有 B單位選項 API 資料
                    // console.log(PreResult)
                    setAllBUnits(PreResult?.result)
                    // controllGCS("backFromChildPage"); // 清除子頁面重新發査API的State
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

    const [GetAllBUnitsExecute, GetAllBUnitsPending] = useAsync(getAllBUnits, false);
    //#endregion 

    //#region 取得已經選擇的B單位選項 API
    const getChooseBUnits = useCallback(async (caseUserId) => {

        //#region 取得已經選擇的B單位選項 API
        fetch(`${APIUrl}caseusers/get?id=${caseUserId}`, // caseusers/get?id=6718179154760081408
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
                    // 成功取得已經選擇的B單位選項 API 資料
                    // console.log(PreResult)
                    setChooseBUnits(PreResult?.result)
                    // controllGCS("backFromChildPage"); // 清除子頁面重新發査API的State
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
            });
        //#endregion

        // }
    }, [APIUrl, Switch])

    const [GetChooseBUnitsExecute, GetChooseBUnitsPending] = useAsync(getChooseBUnits, false);
    //#endregion 

    //#region 編輯已經選擇的B單位 API 
    const updateBUnit = useCallback(async (updateRowdata) => {

        // console.log(updateRowdata)
        //#region 新增、編輯客戶端用戶 API 
        fetch(`${APIUrl}caseusers/updateorgb`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...updateRowdata })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功編輯已經選擇的B單位 API 
                    // console.log(PreResult.data)
                    controllGCS("bUnitModalClose", "API")
                    GetAllClientExecute(true);

                    globalContextService.get("CasePage", "ClosBUnitModalState")(false);
                    globalContextService.remove("CasePage", "ClosBUnitModalState");
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
            });
        //#endregion
    }, [APIUrl, Switch])

    const [UpdateBUnitExecute, UpdateBUnitPending] = useAsync(updateBUnit, false);
    //#endregion 

    //#region 取得 可用餘額 API
    const getCanUseQuota = useCallback(async (selectRowId) => {

        //#region 取得 可用餘額 API
        fetch(`${APIUrl}CaseUserDiscounts/GetDiscountData?caseid=${selectRowId}`, // CaseUserDiscounts/GetDiscountData?caseid=6718179154760081408
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
                    // 成功取得可用餘額資料 API
                    // console.log(PreResult)
                    setQuotaInfo(PreResult?.result)
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

        // }
    }, [APIUrl, Switch])

    const [GetCanUseQuotaExecute, GetCanUseQuotaPending] = useAsync(getCanUseQuota, false);
    //#endregion 

    //#region 編輯 可用餘額 API 
    const updateQuota = useCallback(async (updateRowdata) => {

        // console.log(updateRowdata)
        //#region 編輯 可用餘額 API 
        fetch(`${APIUrl}CaseUserDiscounts/add`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...updateRowdata })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功編輯 可用餘額 API 
                    // console.log(PreResult.data)
                    controllGCS("QuotaModalClose", "API")
                    GetAllClientExecute(true);

                    globalContextService.get("CasePage", "ClosQuotaModalState")(false);
                    globalContextService.remove("CasePage", "ClosQuotaModalState");
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
            });
        //#endregion
    }, [APIUrl, Switch])

    const [UpdateQuotaExecute, UpdateQuotaPending] = useAsync(updateQuota, false);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    AddOrUpdateClientExecute={AddOrUpdateClientExecute}
                    AddOrUpdateClientPending={AddOrUpdateClientPending}
                    GetAllClientExecute={GetAllClientExecute}
                    GetAllClientPending={GetAllClientPending}
                    AllClient={AllClient}
                    UnlockClientExecute={UnlockClientExecute}
                    UnlockClientPending={UnlockClientPending}
                    UpdateBUnitExecute={UpdateBUnitExecute}
                    UpdateBUnitPending={UpdateBUnitPending}

                    GetAllBUnitsExecute={GetAllBUnitsExecute}
                    GetAllBUnitsPending={GetAllBUnitsPending}
                    AllBUnits={AllBUnits}
                    setAllBUnits={setAllBUnits}
                    GetChooseBUnitsExecute={GetChooseBUnitsExecute}
                    GetChooseBUnitsPending={GetChooseBUnitsPending}
                    ChooseBUnits={ChooseBUnits}
                    setChooseBUnits={setChooseBUnits}

                    GetCanUseQuotaExecute={GetCanUseQuotaExecute}
                    GetCanUseQuotaPending={GetCanUseQuotaPending}
                    UpdateQuotaExecute={UpdateQuotaExecute}
                    UpdateQuotaPending={UpdateQuotaPending}

                    OpenBUnitModal={OpenBUnitModal}
                    setOpenBUnitModal={setOpenBUnitModal}
                    OpenQuotaModal={OpenQuotaModal}
                    setOpenQuotaModal={setOpenQuotaModal}
                    QuotaInfo={QuotaInfo}
                    setQuotaInfo={setQuotaInfo}

                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    AddOrUpdateClientExecute={AddOrUpdateClientExecute}
                    AddOrUpdateClientPending={AddOrUpdateClientPending}
                    GetAllClientExecute={GetAllClientExecute}
                    GetAllClientPending={GetAllClientPending}
                    AllClient={AllClient}
                    UnlockClientExecute={UnlockClientExecute}
                    UnlockClientPending={UnlockClientPending}
                    UpdateBUnitExecute={UpdateBUnitExecute}
                    UpdateBUnitPending={UpdateBUnitPending}

                    GetAllBUnitsExecute={GetAllBUnitsExecute}
                    GetAllBUnitsPending={GetAllBUnitsPending}
                    AllBUnits={AllBUnits}
                    setAllBUnits={setAllBUnits}
                    GetChooseBUnitsExecute={GetChooseBUnitsExecute}
                    GetChooseBUnitsPending={GetChooseBUnitsPending}
                    ChooseBUnits={ChooseBUnits}
                    setChooseBUnits={setChooseBUnits}

                    GetCanUseQuotaExecute={GetCanUseQuotaExecute}
                    GetCanUseQuotaPending={GetCanUseQuotaPending}
                    UpdateQuotaExecute={UpdateQuotaExecute}
                    UpdateQuotaPending={UpdateQuotaPending}

                    OpenBUnitModal={OpenBUnitModal}
                    setOpenBUnitModal={setOpenBUnitModal}
                    OpenQuotaModal={OpenQuotaModal}
                    setOpenQuotaModal={setOpenQuotaModal}
                    QuotaInfo={QuotaInfo}
                    setQuotaInfo={setQuotaInfo}

                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    AddOrUpdateClientExecute={AddOrUpdateClientExecute}
                    AddOrUpdateClientPending={AddOrUpdateClientPending}
                    GetAllClientExecute={GetAllClientExecute}
                    GetAllClientPending={GetAllClientPending}
                    AllClient={AllClient}
                    UnlockClientExecute={UnlockClientExecute}
                    UnlockClientPending={UnlockClientPending}
                    UpdateBUnitExecute={UpdateBUnitExecute}
                    UpdateBUnitPending={UpdateBUnitPending}

                    GetAllBUnitsExecute={GetAllBUnitsExecute}
                    GetAllBUnitsPending={GetAllBUnitsPending}
                    AllBUnits={AllBUnits}
                    setAllBUnits={setAllBUnits}
                    GetChooseBUnitsExecute={GetChooseBUnitsExecute}
                    GetChooseBUnitsPending={GetChooseBUnitsPending}
                    ChooseBUnits={ChooseBUnits}
                    setChooseBUnits={setChooseBUnits}

                    GetCanUseQuotaExecute={GetCanUseQuotaExecute}
                    GetCanUseQuotaPending={GetCanUseQuotaPending}
                    UpdateQuotaExecute={UpdateQuotaExecute}
                    UpdateQuotaPending={UpdateQuotaPending}

                    OpenBUnitModal={OpenBUnitModal}
                    setOpenBUnitModal={setOpenBUnitModal}
                    OpenQuotaModal={OpenQuotaModal}
                    setOpenQuotaModal={setOpenQuotaModal}
                    QuotaInfo={QuotaInfo}
                    setQuotaInfo={setQuotaInfo}

                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    AddOrUpdateClientExecute={AddOrUpdateClientExecute}
                    AddOrUpdateClientPending={AddOrUpdateClientPending}
                    GetAllClientExecute={GetAllClientExecute}
                    GetAllClientPending={GetAllClientPending}
                    AllClient={AllClient}
                    UnlockClientExecute={UnlockClientExecute}
                    UnlockClientPending={UnlockClientPending}
                    UpdateBUnitExecute={UpdateBUnitExecute}
                    UpdateBUnitPending={UpdateBUnitPending}

                    GetAllBUnitsExecute={GetAllBUnitsExecute}
                    GetAllBUnitsPending={GetAllBUnitsPending}
                    AllBUnits={AllBUnits}
                    setAllBUnits={setAllBUnits}
                    GetChooseBUnitsExecute={GetChooseBUnitsExecute}
                    GetChooseBUnitsPending={GetChooseBUnitsPending}
                    ChooseBUnits={ChooseBUnits}
                    setChooseBUnits={setChooseBUnits}

                    GetCanUseQuotaExecute={GetCanUseQuotaExecute}
                    GetCanUseQuotaPending={GetCanUseQuotaPending}

                    OpenBUnitModal={OpenBUnitModal}
                    setOpenBUnitModal={setOpenBUnitModal}
                    OpenQuotaModal={OpenQuotaModal}
                    setOpenQuotaModal={setOpenQuotaModal}
                    QuotaInfo={QuotaInfo}
                    setQuotaInfo={setQuotaInfo}

                    controllGCS={controllGCS}
                />
            }
        </>
    )
}