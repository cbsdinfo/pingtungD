import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useAsync } from '../../../SelfHooks/useAsync';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { getParseItemLocalStorage, clearLocalStorage, clearSession } from '../../../Handlers';
import { isUndefined } from 'lodash';
import { useHistory } from 'react-router-dom';

export const OrgManager = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [OrgsTree, setOrgsTree] = useState([]); // 組織樹狀圖
    const [SubOrgs, setSubOrgs] = useState([]); // 透過 orgid 取得 組織的全部下級機構 API
    const [UsersLoadByOrg, setUsersLoadByOrg] = useState([]); // 分配用戶彈窗 - 取得組織(orgId)的用戶(不包含下級組織) API (代入下方Table 資料庫內已有的)
    const [AllUsersLoadByOrg, setAllUsersLoadByOrg] = useState([]); // 分配用戶彈窗 - 取得組織(orgId)的所有用戶(不包含下級組織) API (代入下方Table 所有的列資料)
    const [OpenAssign, setOpenAssign] = useState(false); // 是否打開分配用戶彈窗
    const [Width, Height] = useWindowSize();
    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "editModalClose":
                //#region 當 編輯 Modal 關閉時，要清除的資料
                globalContextService.remove("OrgManagerPage", "UnitName");
                globalContextService.remove("OrgManagerPage", "Uid");
                globalContextService.remove("OrgManagerPage", "FirstContact");
                globalContextService.remove("OrgManagerPage", "FirstContactTelephone");
                globalContextService.remove("OrgManagerPage", "FirstContacCellhone");
                globalContextService.remove("OrgManagerPage", "Status");
                globalContextService.remove("OrgManagerPage", "UpperOrg");
                if (payload === "API") {
                    globalContextService.remove("OrgManagerPage", "CheckedRowKeys");
                    globalContextService.remove("OrgManagerPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "addModalClose":
                //#region 當 編輯 Modal 關閉時，要清除的資料
                globalContextService.remove("OrgManagerPage", "UnitName");
                globalContextService.remove("OrgManagerPage", "Uid");
                globalContextService.remove("OrgManagerPage", "FirstContact");
                globalContextService.remove("OrgManagerPage", "FirstContactTelephone");
                globalContextService.remove("OrgManagerPage", "FirstContacCellhone");
                globalContextService.remove("OrgManagerPage", "Status");
                globalContextService.remove("OrgManagerPage", "UpperOrg");
                if (payload === "API") {
                    globalContextService.remove("OrgManagerPage", "CheckedRowKeys");
                    globalContextService.remove("OrgManagerPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "AssignModalClose":
                //#region 當 分配用戶 Modal 關閉時，要清除的資料
                globalContextService.remove("OrgManagerPage", "AssignKeyword");
                globalContextService.remove("OrgManagerPage", "AssignCheckedRowKeys");
                globalContextService.remove("OrgManagerPage", "AssignCheckedRowsData");
                if (payload === "API") {
                    globalContextService.remove("OrgManagerPage", "CheckedRowKeys");
                    globalContextService.remove("OrgManagerPage", "CheckedRowsData");
                }
                // globalContextService.remove("OrgManagerPage", "IdOfAllUsersLoadByOrg"); 
                // globalContextService.remove("OrgManagerPage", "CloseAssignModalState"); 
                // console.log(globalContextService.get("OrgManagerPage"))
                //#endregion
                break;
            case "Refresh":
                //#region 當 按下刷新按紐時，要清除的資料
                globalContextService.remove("OrgManagerPage", "Keyword");
                if (payload === "API") {
                    globalContextService.remove("OrgManagerPage", "CheckedRowKeys");
                    globalContextService.remove("OrgManagerPage", "CheckedRowsData");
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
            globalContextService.remove("OrgManagerPage", "firstUseAPIgetOrgs");
            globalContextService.remove("OrgManagerPage", "firstUseAPIgetSubOrgs");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得 登入用戶可訪問的組織 tree 資料 API，用以渲染 "單位管理頁面" 左側選單
    const getOrgs = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("OrgManagerPage", "firstUseAPIgetOrgs")) || useAPI) {
            //#endregion

            //#region 取得 登入用戶可訪問的組織 tree 資料，用以渲染 "單位管理頁面" 左側選單
            fetch(`${APIUrl}check/GetOrgsTree`,
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
                        // 成功取得 登入用戶可訪問的組織 tree 資料
                        // console.log(PreResult.result)
                        setOrgsTree(PreResult.result)
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
                    globalContextService.set("OrgManagerPage", "firstUseAPIgetOrgs", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetOrgsExecute, GetOrgsPending] = useAsync(getOrgs, true);
    //#endregion 

    //#region 透過 orgid 取得 組織的全部下級機構 API，用以渲染 "單位管理頁面" 右側Table
    const getSubOrgs = useCallback(async (useAPI = 0, orgId = (globalContextService.get("OrgManagerPage", "orgId") ?? ""), limit = 99999, page = 1, appendData = false) => {
        //  預設參數為 查詢所有全部下級機構

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("OrgManagerPage", "firstUseAPIgetSubOrgs")) || useAPI) {
            //#endregion

            //#region 透過 orgid 取得 組織的全部下級機構 API
            fetch(`${APIUrl}check/GetSubOrgs?orgId=${orgId}&limit=${limit}&page=${page}`,
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
                        // 成功取得 透過 orgid 取得 組織的全部下級機構 API
                        // console.log(PreResult.data)
                        if (appendData) { // 若為翻頁增加資料的情況 
                            setSubOrgs(s => ({ ...s, data: [...s.data, ...PreResult.data] }))
                            // setSubOrgs(s => [...s, ...PreResult.data])
                        }
                        else {
                            setSubOrgs(PreResult)
                        }
                        globalContextService.set("OrgManagerPage", "orgId", orgId); // 讓重新查詢可以停留在同一頁
                    }
                    else {
                        throw PreResult;
                    }
                })
                .catch((Error) => {
                    modalsService.infoModal.warn({
                        iconRightText: Error.code === 401 ? "請重新登入。" : (Error.message ?? Error.msg),
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

                            if (Error.code === 500) {
                                switch (Error.message ?? Error.msg) {
                                    case "未找到指定的節點":
                                        controllGCS("Refresh", "API");
                                        GetSubOrgsExecute(true, "");
                                        globalContextService.set("OrgManagerPage", "orgId", "");
                                        globalContextService.get("OrgManagerPage", "setSelectStateForTreeSelector")("");
                                        break;
                                    default:
                                        break;
                                }
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
                    globalContextService.set("OrgManagerPage", "firstUseAPIgetSubOrgs", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetSubOrgsExecute, GetSubOrgsPending] = useAsync(getSubOrgs, true);
    //#endregion 

    //#region 編輯下級機構 API (右側Table)
    const orgsUpdate = useCallback(async (updateRowdata) => {

        // console.log(updateRowdata)
        //#region 編輯下級機構 API (右側Table)
        fetch(`${APIUrl}orgs/update`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
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
                    // 成功編輯下級機構
                    // console.log(PreResult.data)
                    GetSubOrgsExecute(true, globalContextService.get("OrgManagerPage", "orgId"));
                    getOrgs(true);
                    controllGCS("editModalClose", "API")
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

    const [OrgsUpdateExecute, OrgsUpdatePending] = useAsync(orgsUpdate, false);
    //#endregion 

    //#region 新增下級機構 API (右側Table)
    const orgsAdd = useCallback(async (addRowdata) => {

        // console.log(updateRowdata)
        //#region 新增下級機構 API (右側Table)
        fetch(`${APIUrl}orgs/add`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
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
                    // 成功新增下級機構 API (右側Table)
                    // console.log(PreResult.data)
                    GetSubOrgsExecute(true, globalContextService.get("OrgManagerPage", "orgId"));
                    getOrgs(true);
                    controllGCS("addModalClose", "API")
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

    const [orgsAddExecute, orgsAddPending] = useAsync(orgsAdd, false);
    //#endregion 

    //#region 刪除下級機構(可批量) API (右側Table)
    const orgsDel = useCallback(async (delStringArray) => {

        // console.log(updateRowdata)
        //#region 新增下級機構 API (右側Table)
        fetch(`${APIUrl}orgs/Delete`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify(delStringArray)
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功新增下級機構 API (右側Table)
                    // console.log(PreResult.data)
                    GetSubOrgsExecute(true, globalContextService.get("OrgManagerPage", "orgId"));
                    getOrgs(true);
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

    const [orgsDelExecute, orgsDelPending] = useAsync(orgsDel, false);
    //#endregion 

    //#region 分配用戶彈窗 - 取得組織(orgId)的用戶(不包含下級組織) API (代入下方Table 資料庫內已有的)
    const getUsersLoadByOrg = useCallback(async (orgId, limit = 99999, page = 1) => {

        // console.log(updateRowdata)
        //#region 分配用戶彈窗 - 取得組織(orgId)的用戶(不包含下級組織) API (代入下方Table 資料庫內已有的)
        fetch(`${APIUrl}Users/LoadByOrg?orgId=${orgId}&limit=${limit}&page=${page}`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功取得 分配用戶彈窗 - 取得組織(orgId)的用戶(不包含下級組織) 資料
                    // console.log(PreResult)
                    setUsersLoadByOrg(PreResult)
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

    const [GetUsersLoadByOrgExecute, GetUsersLoadByOrgPending] = useAsync(getUsersLoadByOrg, false);
    //#endregion 

    //#region 分配用戶彈窗 - 取得組織(orgId)的所有用戶 API (代入下方Table 所有的列資料)
    const getAllUsersLoadByOrg = useCallback(async (orgId = "", limit = 99999, page = 1, key = "") => {

        // console.log(updateRowdata)
        //#region 分配用戶彈窗 - 取得組織(orgId)的用戶 API (代入下方Table 所有的列資料)
        fetch(`${APIUrl}users/load?page=${page}&limit=${limit}&key=${key}&orgId=${orgId}`,     // users/load?page=1&limit=15&orgId=&key=
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功取得 分配用戶彈窗 - 取得組織(orgId)的用戶 資料
                    // console.log(PreResult)
                    setAllUsersLoadByOrg(PreResult)
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

    const [GetAllUsersLoadByOrgExecute, GetAllUsersLoadByOrgPending] = useAsync(getAllUsersLoadByOrg, false);
    //#endregion 

    //#region 分配用戶彈窗 - 部門分配用戶 API (確認後發送)
    const assignOrgUsers = useCallback(async (assignOrgUsersIdArrays) => {

        // console.log(assignOrgUsersIdArrays)
        //#region 分配用戶彈窗 - 部門分配用戶 API (確認後發送)
        fetch(`${APIUrl}AccessObjs/AssignOrgUsers`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...assignOrgUsersIdArrays })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功 分配部門用戶 API (確認後發送)
                    // console.log(PreResult.data)
                    GetSubOrgsExecute(true, globalContextService.get("OrgManagerPage", "orgId"));
                    getOrgs(true);
                    controllGCS("AssignModalClose", "API")
                    globalContextService.get("OrgManagerPage", "CloseAssignModalState")(false);
                    globalContextService.remove("OrgManagerPage", "CloseAssignModalState");
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

    const [AssignOrgUsersExecute, AssignOrgUsersPending] = useAsync(assignOrgUsers, false);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    OrgsTree={OrgsTree}
                    setOrgsTree={setOrgsTree}
                    SubOrgs={SubOrgs}
                    setSubOrgs={setSubOrgs}
                    GetOrgsExecute={GetOrgsExecute}
                    GetOrgsPending={GetOrgsPending}
                    GetSubOrgsExecute={GetSubOrgsExecute}
                    GetSubOrgsPending={GetSubOrgsPending}
                    OrgsUpdateExecute={OrgsUpdateExecute}
                    OrgsUpdatePending={OrgsUpdatePending}
                    orgsAddExecute={orgsAddExecute}
                    orgsAddPending={orgsAddPending}
                    orgsDelExecute={orgsDelExecute}
                    orgsDelPending={orgsDelPending}
                    UsersLoadByOrg={UsersLoadByOrg}
                    setUsersLoadByOrg={setUsersLoadByOrg}
                    GetUsersLoadByOrgExecute={GetUsersLoadByOrgExecute}
                    GetUsersLoadByOrgPending={GetUsersLoadByOrgPending}
                    AllUsersLoadByOrg={AllUsersLoadByOrg}
                    setAllUsersLoadByOrg={setAllUsersLoadByOrg}
                    GetAllUsersLoadByOrgExecute={GetAllUsersLoadByOrgExecute}
                    GetAllUsersLoadByOrgPending={GetAllUsersLoadByOrgPending}
                    AssignOrgUsersExecute={AssignOrgUsersExecute}
                    AssignOrgUsersPending={AssignOrgUsersPending}
                    OpenAssign={OpenAssign}
                    setOpenAssign={setOpenAssign}
                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    OrgsTree={OrgsTree}
                    setOrgsTree={setOrgsTree}
                    SubOrgs={SubOrgs}
                    setSubOrgs={setSubOrgs}
                    GetOrgsExecute={GetOrgsExecute}
                    GetOrgsPending={GetOrgsPending}
                    GetSubOrgsExecute={GetSubOrgsExecute}
                    GetSubOrgsPending={GetSubOrgsPending}
                    OrgsUpdateExecute={OrgsUpdateExecute}
                    OrgsUpdatePending={OrgsUpdatePending}
                    orgsAddExecute={orgsAddExecute}
                    orgsAddPending={orgsAddPending}
                    orgsDelExecute={orgsDelExecute}
                    orgsDelPending={orgsDelPending}
                    UsersLoadByOrg={UsersLoadByOrg}
                    setUsersLoadByOrg={setUsersLoadByOrg}
                    GetUsersLoadByOrgExecute={GetUsersLoadByOrgExecute}
                    GetUsersLoadByOrgPending={GetUsersLoadByOrgPending}
                    AllUsersLoadByOrg={AllUsersLoadByOrg}
                    setAllUsersLoadByOrg={setAllUsersLoadByOrg}
                    GetAllUsersLoadByOrgExecute={GetAllUsersLoadByOrgExecute}
                    GetAllUsersLoadByOrgPending={GetAllUsersLoadByOrgPending}
                    AssignOrgUsersExecute={AssignOrgUsersExecute}
                    AssignOrgUsersPending={AssignOrgUsersPending}
                    OpenAssign={OpenAssign}
                    setOpenAssign={setOpenAssign}
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    OrgsTree={OrgsTree}
                    setOrgsTree={setOrgsTree}
                    SubOrgs={SubOrgs}
                    setSubOrgs={setSubOrgs}
                    GetOrgsExecute={GetOrgsExecute}
                    GetOrgsPending={GetOrgsPending}
                    GetSubOrgsExecute={GetSubOrgsExecute}
                    GetSubOrgsPending={GetSubOrgsPending}
                    OrgsUpdateExecute={OrgsUpdateExecute}
                    OrgsUpdatePending={OrgsUpdatePending}
                    orgsAddExecute={orgsAddExecute}
                    orgsAddPending={orgsAddPending}
                    orgsDelExecute={orgsDelExecute}
                    orgsDelPending={orgsDelPending}
                    UsersLoadByOrg={UsersLoadByOrg}
                    setUsersLoadByOrg={setUsersLoadByOrg}
                    GetUsersLoadByOrgExecute={GetUsersLoadByOrgExecute}
                    GetUsersLoadByOrgPending={GetUsersLoadByOrgPending}
                    AllUsersLoadByOrg={AllUsersLoadByOrg}
                    setAllUsersLoadByOrg={setAllUsersLoadByOrg}
                    GetAllUsersLoadByOrgExecute={GetAllUsersLoadByOrgExecute}
                    GetAllUsersLoadByOrgPending={GetAllUsersLoadByOrgPending}
                    AssignOrgUsersExecute={AssignOrgUsersExecute}
                    AssignOrgUsersPending={AssignOrgUsersPending}
                    OpenAssign={OpenAssign}
                    setOpenAssign={setOpenAssign}
                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    OrgsTree={OrgsTree}
                    setOrgsTree={setOrgsTree}
                    SubOrgs={SubOrgs}
                    setSubOrgs={setSubOrgs}
                    GetOrgsExecute={GetOrgsExecute}
                    GetOrgsPending={GetOrgsPending}
                    GetSubOrgsExecute={GetSubOrgsExecute}
                    GetSubOrgsPending={GetSubOrgsPending}
                    OrgsUpdateExecute={OrgsUpdateExecute}
                    OrgsUpdatePending={OrgsUpdatePending}
                    orgsAddExecute={orgsAddExecute}
                    orgsAddPending={orgsAddPending}
                    orgsDelExecute={orgsDelExecute}
                    orgsDelPending={orgsDelPending}
                    UsersLoadByOrg={UsersLoadByOrg}
                    setUsersLoadByOrg={setUsersLoadByOrg}
                    GetUsersLoadByOrgExecute={GetUsersLoadByOrgExecute}
                    GetUsersLoadByOrgPending={GetUsersLoadByOrgPending}
                    AllUsersLoadByOrg={AllUsersLoadByOrg}
                    setAllUsersLoadByOrg={setAllUsersLoadByOrg}
                    GetAllUsersLoadByOrgExecute={GetAllUsersLoadByOrgExecute}
                    GetAllUsersLoadByOrgPending={GetAllUsersLoadByOrgPending}
                    AssignOrgUsersExecute={AssignOrgUsersExecute}
                    AssignOrgUsersPending={AssignOrgUsersPending}
                    OpenAssign={OpenAssign}
                    setOpenAssign={setOpenAssign}
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}