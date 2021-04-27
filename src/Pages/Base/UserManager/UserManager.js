import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { useHistory } from 'react-router-dom';
import { isUndefined } from 'lodash';
import { clearLogoutLocalStorage, clearLogoutSession, getParseItemLocalStorage } from '../../../Handlers';
import { useAsync } from '../../../SelfHooks/useAsync';

export const UserManager = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [OrgsTree, setOrgsTree] = useState([]); // 組織樹狀圖
    const [SubUsers, setSubUsers] = useState([]); // 透過 orgid 取得 組織的全部用戶 API
    const [RolesLoadByUser, setRolesLoadByUser] = useState([]); // 用戶分配角色彈窗 - 取得用戶(userId)的角色(不包含下級組織) API (代入下方Table 資料庫內已有的)
    const [AllRolesLoadByUser, setAllRolesLoadByUser] = useState([]); // 用戶分配角色彈窗 - 所有角色 API (代入下方Table 所有的列資料)
    const [OpenAssign, setOpenAssign] = useState(false); // 是否打開分配用戶彈窗
    const [Width, Height] = useWindowSize();
    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "editModalClose":
                //#region 當 編輯 Modal 關閉時，要清除的資料
                globalContextService.remove("UserManagerPage", "Name");
                globalContextService.remove("UserManagerPage", "Status");
                globalContextService.remove("UserManagerPage", "Organizations");
                globalContextService.remove("UserManagerPage", "Account");
                globalContextService.remove("UserManagerPage", "Cellphone");
                if (payload === "API") {
                    globalContextService.remove("UserManagerPage", "CheckedRowKeys");
                    globalContextService.remove("UserManagerPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "addModalClose":
                //#region 當 編輯 Modal 關閉時，要清除的資料
                globalContextService.remove("UserManagerPage", "Name");
                globalContextService.remove("UserManagerPage", "Status");
                globalContextService.remove("UserManagerPage", "Organizations");
                globalContextService.remove("UserManagerPage", "Account");
                globalContextService.remove("UserManagerPage", "Cellphone");
                if (payload === "API") {
                    globalContextService.remove("UserManagerPage", "CheckedRowKeys");
                    globalContextService.remove("UserManagerPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "AssignModalClose":
                //#region 當 分配用戶 Modal 關閉時，要清除的資料
                if (payload === "API") {
                    globalContextService.remove("UserManagerPage", "CheckedRowKeys");
                    globalContextService.remove("UserManagerPage", "CheckedRowsData");
                }
                // globalContextService.remove("UserManagerPage", "AssignKeyword");
                //#endregion
                break;
            case "Refresh":
                //#region 當 按下刷新按紐時，要清除的資料
                globalContextService.remove("UserManagerPage", "Keyword");
                if (payload === "API") {
                    globalContextService.remove("UserManagerPage", "CheckedRowKeys");
                    globalContextService.remove("UserManagerPage", "CheckedRowsData");
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
            globalContextService.remove("UserManagerPage", "firstUseAPIgetOrgs");
            globalContextService.remove("UserManagerPage", "firstUseAPIgetSubUsers");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得 登入用戶可訪問的組織 tree 資料 API，用以渲染 "單位管理頁面" 左側選單
    const getOrgs = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("UserManagerPage", "firstUseAPIgetOrgs")) || useAPI) {
            //#endregion

            //#region 取得 登入用戶可訪問的組織 tree 資料，用以渲染 "單位管理頁面" 左側選單
            fetch(`${APIUrl}check/GetOrgsTree`,
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
                    globalContextService.set("UserManagerPage", "firstUseAPIgetOrgs", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetOrgsExecute, GetOrgsPending] = useAsync(getOrgs, true);
    //#endregion 

    //#region 透過 orgid 取得 組織的全部下級用戶 API，用以渲染 "單位管理頁面" 右側Table
    const getSubUsers = useCallback(async (useAPI = 0, orgId = (globalContextService.get("UserManagerPage", "orgId") ?? ""), limit = 99999, page = 1, appendData = false, key = "") => {
        //  預設參數為 查詢所有全部下級用戶

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("UserManagerPage", "firstUseAPIgetSubUsers")) || useAPI) {
            //#endregion

            //#region 透過 orgid 取得 組織的全部下級用戶 API
            fetch(`${APIUrl}users/load?page=${page}&limit=${limit}&orgId=${orgId}&key=${key}`,
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
                        // 成功取得 透過 orgid 取得 組織的全部下級用戶 API
                        // console.log(PreResult.data)
                        if (appendData) { // 若為翻頁增加資料的情況 
                            setSubUsers(s => ({ ...s, data: [...s.data, ...PreResult.data] }))
                            // setSubOrgs(s => [...s, ...PreResult.data])
                        }
                        else {
                            setSubUsers(PreResult)
                        }
                        globalContextService.set("UserManagerPage", "orgId", orgId); // 讓重新查詢可以停留在同一頁
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
                    globalContextService.set("UserManagerPage", "firstUseAPIgetSubUsers", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetSubUsersExecute, GetSubUsersPending] = useAsync(getSubUsers, true);
    //#endregion 

    //#region 新增下級用戶 API (右側Table)
    const usersAdd = useCallback(async (addRowdata) => {

        // console.log(updateRowdata)
        //#region 新增下級用戶 API (右側Table)
        fetch(`${APIUrl}users/addorupdate`,
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
                    // 成功新增下級用戶 API (右側Table)
                    // console.log(PreResult.data)
                    GetSubUsersExecute(true, globalContextService.get("UserManagerPage", "orgId"));
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

    const [UsersAddExecute, UsersAddPending] = useAsync(usersAdd, false);
    //#endregion 

    //#region 編輯下級用戶 API (右側Table)
    const usersUpdate = useCallback(async (updateRowdata) => {

        // console.log(updateRowdata)
        //#region 編輯下級用戶 API (右側Table)
        fetch(`${APIUrl}users/addorupdate`,
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
                    // 成功編輯下級用戶
                    // console.log(PreResult.data)
                    GetSubUsersExecute(true, globalContextService.get("UserManagerPage", "orgId"));
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

    const [UsersUpdateExecute, UsersUpdatePending] = useAsync(usersUpdate, false);
    //#endregion 

    //#region 刪除下級用戶(可批量) API (右側Table)
    const usersDel = useCallback(async (delStringArray) => {

        // console.log(updateRowdata)
        //#region 刪除下級用戶 API (右側Table)
        fetch(`${APIUrl}users/delete`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
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
                    // 成功刪除下級用戶 API (右側Table)
                    // console.log(PreResult.data)
                    GetSubUsersExecute(true, globalContextService.get("UserManagerPage", "orgId"));
                    getOrgs(true);
                    // modalsService.infoModal.success({
                    //     iconRightText: "刪除用戶成功!",
                    //     yes: true,
                    //     yesText: "確認",
                    //     // no: true,
                    //     // autoClose: true,
                    //     backgroundClose: false,
                    //     yesOnClick: (e, close) => { close(); }
                    // })
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
                })
                throw Error.message;
            })
            .finally(() => {
            });
        //#endregion
    }, [APIUrl, Switch])

    const [UsersDelExecute, UsersDelPending] = useAsync(usersDel, false);
    //#endregion 

    //#region 為用戶分配角色彈窗 - 取得用戶(userId)的角色(不包含下級組織) API (代入下方Table 資料庫內已有的)
    const getRolesLoadByUser = useCallback(async (userId, limit = 99999, page = 1) => {

        // console.log(updateRowdata)
        //#region 為用戶分配角色彈窗 - 取得用戶(userId)的角色(不包含下級組織) API (代入下方Table 資料庫內已有的)
        fetch(`${APIUrl}roles/loadforuser?userId=${userId}`, // &limit=${limit}&page=${page}
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功取得 為用戶分配角色彈窗 - 取得用戶(userId)的角色(不包含下級組織) 資料
                    // console.log(PreResult)
                    setRolesLoadByUser(PreResult)
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

    const [GetRolesLoadByUserExecute, GetRolesLoadByUserPending] = useAsync(getRolesLoadByUser, false);
    //#endregion 

    //#region 為用戶分配角色彈窗 - 取得所有角色 API (代入下方Table 所有的列資料)
    const getAllRolesLoadByUser = useCallback(async (orgId = "", limit = 99999, page = 1, key = "") => {

        // console.log(updateRowdata)
        //#region 為用戶分配角色彈窗 - 取得所有角色 API (代入下方Table 所有的列資料)
        fetch(`${APIUrl}roles/load`, // users/load?page=${page}&limit=${limit}&key=${key}&orgId=${orgId}`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功取得 為用戶分配角色彈窗 - 取得所有角色 資料
                    // console.log(PreResult)
                    setAllRolesLoadByUser(PreResult)
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

    const [GetAllRolesLoadByUserExecute, GetAllRolesLoadByUserPending] = useAsync(getAllRolesLoadByUser, false);
    //#endregion 

    //#region 分配用戶彈窗 - 部門用戶分配角色 API (確認後發送，包含 unassign、assign)
    const assignUserRoles = useCallback(async (assignObj, type = "UserRole") => {

        // console.log(assignOrgUsersIdArrays)
        //#region 分配用戶彈窗 - 部門用戶分配角色 API (unassign 確認後發送)
        await fetch(`${APIUrl}accessobjs/unassign`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ firstId: assignObj?.firstId, type })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功 部門用戶分配角色 API (確認後發送)
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

        //#region 分配用戶彈窗 - 部門用戶分配角色 API (assign 確認後發送)
        await fetch(`${APIUrl}accessobjs/assign`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...assignObj, type })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功 部門用戶分配角色 API (確認後發送)
                    // console.log(PreResult.data)
                    controllGCS("AssignModalClose", "API")
                    GetSubUsersExecute(true, globalContextService.get("UserManagerPage", "orgId"));
                    getOrgs(true);
                    globalContextService.get("UserManagerPage", "CloseAssignModalState")(false);
                    globalContextService.remove("UserManagerPage", "CloseAssignModalState");
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

    const [AssignUserRolesExecute, AssignUserRolesPending] = useAsync(assignUserRoles, false);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    OrgsTree={OrgsTree}
                    setOrgsTree={setOrgsTree}
                    SubUsers={SubUsers}
                    setSubUsers={setSubUsers}
                    GetOrgsExecute={GetOrgsExecute}
                    GetOrgsPending={GetOrgsPending}
                    GetSubUsersExecute={GetSubUsersExecute}
                    GetSubUsersPending={GetSubUsersPending}
                    UsersAddExecute={UsersAddExecute}
                    UsersAddPending={UsersAddPending}
                    UsersUpdateExecute={UsersUpdateExecute}
                    UsersUpdatePending={UsersUpdatePending}
                    UsersDelExecute={UsersDelExecute}
                    UsersDelPending={UsersDelPending}
                    GetRolesLoadByUserExecute={GetRolesLoadByUserExecute}
                    GetRolesLoadByUserPending={GetRolesLoadByUserPending}
                    RolesLoadByUser={RolesLoadByUser}
                    GetAllRolesLoadByUserExecute={GetAllRolesLoadByUserExecute}
                    GetAllRolesLoadByUserPending={GetAllRolesLoadByUserPending}
                    AllRolesLoadByUser={AllRolesLoadByUser}
                    AssignUserRolesExecute={AssignUserRolesExecute}
                    AssignUserRolesPending={AssignUserRolesPending}
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
                    SubUsers={SubUsers}
                    setSubUsers={setSubUsers}
                    GetOrgsExecute={GetOrgsExecute}
                    GetOrgsPending={GetOrgsPending}
                    GetSubUsersExecute={GetSubUsersExecute}
                    GetSubUsersPending={GetSubUsersPending}
                    UsersAddExecute={UsersAddExecute}
                    UsersAddPending={UsersAddPending}
                    UsersUpdateExecute={UsersUpdateExecute}
                    UsersUpdatePending={UsersUpdatePending}
                    UsersDelExecute={UsersDelExecute}
                    UsersDelPending={UsersDelPending}
                    GetRolesLoadByUserExecute={GetRolesLoadByUserExecute}
                    GetRolesLoadByUserPending={GetRolesLoadByUserPending}
                    RolesLoadByUser={RolesLoadByUser}
                    GetAllRolesLoadByUserExecute={GetAllRolesLoadByUserExecute}
                    GetAllRolesLoadByUserPending={GetAllRolesLoadByUserPending}
                    AllRolesLoadByUser={AllRolesLoadByUser}
                    AssignUserRolesExecute={AssignUserRolesExecute}
                    AssignUserRolesPending={AssignUserRolesPending}
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
                    SubUsers={SubUsers}
                    setSubUsers={setSubUsers}
                    GetOrgsExecute={GetOrgsExecute}
                    GetOrgsPending={GetOrgsPending}
                    GetSubUsersExecute={GetSubUsersExecute}
                    GetSubUsersPending={GetSubUsersPending}
                    UsersAddExecute={UsersAddExecute}
                    UsersAddPending={UsersAddPending}
                    UsersUpdateExecute={UsersUpdateExecute}
                    UsersUpdatePending={UsersUpdatePending}
                    UsersDelExecute={UsersDelExecute}
                    UsersDelPending={UsersDelPending}
                    GetRolesLoadByUserExecute={GetRolesLoadByUserExecute}
                    GetRolesLoadByUserPending={GetRolesLoadByUserPending}
                    RolesLoadByUser={RolesLoadByUser}
                    GetAllRolesLoadByUserExecute={GetAllRolesLoadByUserExecute}
                    GetAllRolesLoadByUserPending={GetAllRolesLoadByUserPending}
                    AllRolesLoadByUser={AllRolesLoadByUser}
                    AssignUserRolesExecute={AssignUserRolesExecute}
                    AssignUserRolesPending={AssignUserRolesPending}
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
                    SubUsers={SubUsers}
                    setSubUsers={setSubUsers}
                    GetOrgsExecute={GetOrgsExecute}
                    GetOrgsPending={GetOrgsPending}
                    GetSubUsersExecute={GetSubUsersExecute}
                    GetSubUsersPending={GetSubUsersPending}
                    UsersAddExecute={UsersAddExecute}
                    UsersAddPending={UsersAddPending}
                    UsersUpdateExecute={UsersUpdateExecute}
                    UsersUpdatePending={UsersUpdatePending}
                    UsersDelExecute={UsersDelExecute}
                    UsersDelPending={UsersDelPending}
                    GetRolesLoadByUserExecute={GetRolesLoadByUserExecute}
                    GetRolesLoadByUserPending={GetRolesLoadByUserPending}
                    RolesLoadByUser={RolesLoadByUser}
                    GetAllRolesLoadByUserExecute={GetAllRolesLoadByUserExecute}
                    GetAllRolesLoadByUserPending={GetAllRolesLoadByUserPending}
                    AllRolesLoadByUser={AllRolesLoadByUser}
                    AssignUserRolesExecute={AssignUserRolesExecute}
                    AssignUserRolesPending={AssignUserRolesPending}
                    OpenAssign={OpenAssign}
                    setOpenAssign={setOpenAssign}
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}