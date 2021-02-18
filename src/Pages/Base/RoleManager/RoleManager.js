import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { useHistory } from 'react-router-dom';
import { cloneDeep, isUndefined } from 'lodash';
import { clearLocalStorage, clearSession, getParseItemLocalStorage } from '../../../Handlers';
import { useAsync } from '../../../SelfHooks/useAsync';
import { AssignModuleToRoleTitleModal } from '../../../ProjectComponent';

export const RoleManager = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [OrgsTree, setOrgsTree] = useState([]); // 組織樹狀圖
    const [SubUsers, setSubUsers] = useState([]); // 透過 orgid 取得 組織的全部用戶 API
    const [Allmodules, setAllmodules] = useState([]); // 所有模組 
    const [AllmodulesTree, setAllmodulesTree] = useState([]); // 所有模組 Tree
    const [SelectedModules, setSelectedModules] = useState([]); // 所有模組 Tree
    const [AllMenus, setAllMenus] = useState([]); // 所有可用功能(菜單)
    const [SelectedMenus, setSelectedMenus] = useState([]); // 所有可用功能(菜單)

    const [RolesData, setRolesData] = useState([]); // 所有角色 資料 (包含査回 用戶 資訊)
    const [OpenAssign, setOpenAssign] = useState(""); // 是否打開分配彈窗  "為用戶添加角色"、"為角色分配模塊"
    const [Width, Height] = useWindowSize();
    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "editModalClose":
                //#region 當 編輯 Modal 關閉時，要清除的資料
                globalContextService.remove("RoleManagerPage", "RoleName");
                globalContextService.remove("RoleManagerPage", "Status");
                if (payload === "API") {
                    globalContextService.remove("RoleManagerPage", "CheckedRowKeys");
                    globalContextService.remove("RoleManagerPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "addModalClose":
                //#region 當 編輯 Modal 關閉時，要清除的資料
                globalContextService.remove("RoleManagerPage", "RoleName");
                globalContextService.remove("RoleManagerPage", "Status");
                if (payload === "API") {
                    globalContextService.remove("RoleManagerPage", "CheckedRowKeys");
                    globalContextService.remove("RoleManagerPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "AssignModalClose":
                //#region 當 分配用戶 Modal 關閉時，要清除的資料
                globalContextService.remove("RoleManagerPage", "AssignKeyword");
                globalContextService.remove("RoleManagerPage", "AssignCheckedRowKeys");
                globalContextService.remove("RoleManagerPage", "AssignCheckedRowsData");

                if (payload === "API") {
                    globalContextService.remove("RoleManagerPage", "CheckedRowKeys");
                    globalContextService.remove("RoleManagerPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "AssignModuleModalClose":
                //#region 當 分配用戶 Modal 關閉時，要清除的資料
                if (payload === "API") {
                    globalContextService.remove("RoleManagerPage", "CheckedRowKeys");
                    globalContextService.remove("RoleManagerPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "Refresh":
                //#region 當 按下刷新按紐時，要清除的資料
                globalContextService.remove("RoleManagerPage", "Keyword");
                if (payload === "API") {
                    globalContextService.remove("RoleManagerPage", "CheckedRowKeys");
                    globalContextService.remove("RoleManagerPage", "CheckedRowsData");
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
            globalContextService.remove("RoleManagerPage", "firstUseAPIgetOrgs");
            globalContextService.remove("RoleManagerPage", "firstUseAPIgetSubOrgs");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得 所有角色 資料 API，用以渲染 "權限管理頁面" Table
    const getRoles = useCallback(async (useAPI = false, page = 1, limit = 99999, key = "") => {

        let roleData;
        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("RoleManagerPage", "firstUseAPIgetOrgs")) || useAPI) {
            //#endregion

            //#region 取得 所有角色 資料 API，用以渲染 "權限管理頁面" Table
            await fetch(`${APIUrl}roles/load?page=${page}&limit=${limit}&key=${key}`,
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
                        // 成功取得 取得 所有角色 資料 API，用以渲染 "權限管理頁面" Table
                        // console.log(PreResult.result)
                        roleData = PreResult.result;
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
                    globalContextService.set("RoleManagerPage", "firstUseAPIgetOrgs", false);
                    //#endregion
                });
            //#endregion

            await GetUsersLoadByRoleExecute(roleData); // 傳入所有角色資料，併發查詢用戶資訊
        }
    }, [APIUrl, Switch])

    const [GetRolesExecute, GetRolesPending] = useAsync(getRoles, true);
    //#endregion 

    //#region 取得 所有 "角色" 擁有的 "用戶" 資料 API，用以渲染 "權限管理頁面" Table
    const getUsersLoadByRole = useCallback(async (roleData, limit = 99999, page = 1) => {

        const UsersRes = roleData.map(async role => { //注意這裡 雖然map方法的參數是async函數，但它是並發執行的
            let res;
            //#region 取得 所有 "角色" 擁有的 "用戶" 資料 API，用以渲染 "權限管理頁面" Table
            await fetch(`${APIUrl}users/loadByRole?page=${page}&limit=${limit}&roleId=${role?.id}`,  //    
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
                        // 成功取得 取得 所有 "角色" 擁有的 "用戶" 資料 API，用以渲染 "權限管理頁面" Table
                        // console.log(PreResult)
                        res = { users: { ...PreResult }, ...role };//重組資料，將査回的用戶加進角色資料列
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

            return res;
        });

        // 按次序輸出

        let finalData = [];
        for (const textPromise of UsersRes) {
            finalData.push(await textPromise);
        }
        setRolesData(finalData);
        // console.log(finalData)

    }, [APIUrl, Switch])

    const [GetUsersLoadByRoleExecute, GetUsersLoadByRolePending] = useAsync(getUsersLoadByRole, false);
    //#endregion 

    //#region 新增角色 API (右側Table)
    const rolesAdd = useCallback(async (addRowdata) => {

        // console.log(updateRowdata)
        //#region 新增角色 API (右側Table)
        fetch(`${APIUrl}roles/add`,
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
                    // 成功新增角色 API (右側Table)
                    // console.log(PreResult.data)
                    GetRolesExecute(true);
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

    const [RolesAddExecute, RolesAddPending] = useAsync(rolesAdd, false);
    //#endregion 

    //#region 編輯角色 API (右側Table)
    const rolesUpdate = useCallback(async (updateRowdata) => {

        // console.log(updateRowdata)
        //#region 編輯角色 API (右側Table)
        fetch(`${APIUrl}roles/update`,
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
                    // 成功編輯角色
                    // console.log(PreResult.data)
                    GetRolesExecute(true);
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

    const [RolesUpdateExecute, RolesUpdatePending] = useAsync(rolesUpdate, false);
    //#endregion 

    //#region 刪除下級機構(可批量) API (右側Table)
    const rolesDel = useCallback(async (delStringArray) => {

        // console.log(updateRowdata)
        //#region 新增下級機構 API (右側Table)
        fetch(`${APIUrl}roles/Delete`,
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
                    // 成功新增下級機構 API (右側Table)
                    // console.log(PreResult.data)
                    GetRolesExecute(true);
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

    const [RolesDelExecute, RolesDelPending] = useAsync(rolesDel, false);
    //#endregion 

    //#region 為用戶添加角色 Modal 相關的 API 區域 (注意: 不特別査已經分配的用戶，此資訊直接從Table列資料撈)

    //#region 為用戶添加角色 Modal - 取得組織(orgId)的用戶(不包含下級組織) API
    const getOrgs = useCallback(async () => {

        // console.log(updateRowdata)
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

    const [GetOrgsExecute, GetOrgsPending] = useAsync(getOrgs, false);
    //#endregion 

    //#region 透過 orgid 取得 組織的全部下級用戶 API，用以渲染 "單位管理頁面" 右側Table
    const getSubUsers = useCallback(async (useAPI = false, orgId = (globalContextService.get("RoleManagerPage", "orgId") ?? ""), limit = 99999, page = 1, appendData = false, key = "") => {
        //  預設參數為 查詢所有全部下級用戶

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
                    globalContextService.set("RoleManagerPage", "orgId", orgId); // 讓重新查詢可以停留在同一頁
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

    const [GetSubUsersExecute, GetSubUsersPending] = useAsync(getSubUsers, false);
    //#endregion     

    //#region 為用戶添加角色 確認送出 API
    const assignRoleUsers = useCallback(async (assignRoleUsersRowdata) => {

        // console.log(updateRowdata)
        //#region 編輯下級機構 API (右側Table)
        fetch(`${APIUrl}AccessObjs/AssignRoleUsers`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...assignRoleUsersRowdata })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功編輯下級機構
                    // console.log(PreResult.data)
                    GetRolesExecute(true);
                    controllGCS("AssignModalClose", "API")
                    globalContextService.get("RoleManagerPage", "CloseAssignModalState")("");
                    globalContextService.remove("RoleManagerPage", "CloseAssignModalState");
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

    const [AssignRoleUsersExecute, AssignRoleUsersPending] = useAsync(assignRoleUsers, false);

    //#endregion

    //#endregion

    //#region 為角色分配模塊 Modal 相關的 API 區域

    //#region 取得全部可用模組
    const getAllmodules = useCallback(async () => {

        // console.log(updateRowdata)
        //#region 取得全部可用模組
        fetch(`${APIUrl}check/getmodules`, // api/check/getmodules?token=60fd8ba0
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
                    // 成功取得 取得全部可用模組 資料
                    console.log(PreResult)
                    setAllmodules(PreResult) //所有模組

                    let cloneResult = cloneDeep(PreResult?.result);
                    // 這裡直接寫死 兩層而已，未來增列第三層再改
                    let rootResult = (cloneResult ?? []).filter((item) => { return item?.parentId === null });
                    let treeResult = (rootResult ?? []).map((item, index) => {
                        return {
                            ...item,
                            key: item?.id, //Tree 組件選中值
                            title: item?.name, //Tree 組件顯示文字
                            children: (cloneResult ?? [])
                                .filter((item1) => {
                                    return item1?.parentId === item?.id
                                })
                                .map((item2) => {
                                    return { ...item2, key: item2?.id, title: item2?.name, children: [] }
                                })
                        }
                    })
                    console.log(treeResult)
                    setAllmodulesTree(treeResult); // 所有模組 Tree
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

    const [GetAllmodulesExecute, GetAllmodulesPending] = useAsync(getAllmodules, false);
    //#endregion

    //#region 取得已勾選模組
    const getSelectedModules = useCallback(async (firstId) => {

        // console.log(updateRowdata)
        //#region 取得已勾選模組
        fetch(`${APIUrl}modules/loadforrole?firstId=${firstId}`, // modules/loadforrole?firstId=bd094755-3d3d-4cab-ac6e-e6169ca35637
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
                    // 成功取得 取得已勾選模組 資料
                    console.log(PreResult)
                    setSelectedModules(PreResult?.result) //所有已選擇模組

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

    const [GetSelectedModulesExecute, GetSelectedModulesPending] = useAsync(getSelectedModules, false);
    //#endregion

    //#region 取得全部可用功能(菜單)
    const getAllMenus = useCallback(async () => {

        // console.log(updateRowdata)
        //#region 取得全部可用功能(菜單)
        fetch(`${APIUrl}modules/loadmenus?moduleId=`, // modules/loadmenus?moduleId=
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
                    // 成功取得 取得全部可用功能(菜單) 資料
                    console.log(PreResult)
                    setAllMenus(PreResult) //所有可用功能(菜單)
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

    const [GetAllMenusExecute, GetAllMenusPending] = useAsync(getAllMenus, false);
    //#endregion

    //#region 取得已勾選功能(菜單)
    const getSelectedMenus = useCallback(async (firstId) => {

        // console.log(updateRowdata)
        //#region 取得已勾選模組
        fetch(`${APIUrl}modules/loadmenusforrole?moduleId=&firstId=${firstId}`, // modules/loadmenusforrole?moduleId=&firstId=0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d
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
                    // 成功取得 取得已勾選模組 資料
                    console.log(PreResult)
                    setSelectedMenus(PreResult?.result) //所有已選擇模組

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

    const [GetSelectedMenusExecute, GetSelectedMenusPending] = useAsync(getSelectedMenus, false);
    //#endregion

    //#region 分配模塊與功能給角色 API 
    const unassignModuleAndElementToRole = useCallback(async (updateRowdata) => {

        // console.log(updateRowdata)
        //#region 解除角色模組關聯
        await fetch(`${APIUrl}accessobjs/unassign`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ firstId: updateRowdata.roleId, type: "RoleModule" })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功解除角色模組關聯
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

        //#region 解除角色功能關聯
        await fetch(`${APIUrl}accessobjs/unassign`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ firstId: updateRowdata.roleId, type: "RoleElement" })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功解除角色模組關聯
                    AssignModuleAndElementToRoleExecute(updateRowdata)
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

    const [UnassignModuleAndElementToRoleExecute, UnassignModuleAndElementToRolePending] = useAsync(unassignModuleAndElementToRole, false);
    //#endregion 

    //#region 分配模塊與功能給角色 API 
    const assignModuleAndElementToRole = useCallback(async (updateRowdata) => {

        // console.log(updateRowdata)
        //#region 角色模組關聯
        await fetch(`${APIUrl}accessobjs/assign`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ firstId: updateRowdata.roleId, type: "RoleModule", secIds: updateRowdata.moduleSecIds })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功解除角色模組關聯
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

        //#region 角色功能關聯
        await fetch(`${APIUrl}accessobjs/assign`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ firstId: updateRowdata.roleId, type: "RoleElement", secIds: updateRowdata.elementSecIds })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功解除角色模組關聯
                    // console.log(PreResult.data)
                    GetRolesExecute(true);
                    controllGCS("AssignModuleModalClose", "API")
                    globalContextService.get("RoleManagerPage", "CloseAssignModalState")("");
                    globalContextService.remove("RoleManagerPage", "CloseAssignModalState");
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

    const [AssignModuleAndElementToRoleExecute, AssignModuleAndElementToRolePending] = useAsync(assignModuleAndElementToRole, false);
    //#endregion 
    //#endregion

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    OpenAssign={OpenAssign}
                    setOpenAssign={setOpenAssign}
                    RolesData={RolesData}
                    setRolesData={setRolesData}
                    GetRolesExecute={GetRolesExecute}
                    GetRolesPending={GetRolesPending}
                    RolesAddExecute={RolesAddExecute}
                    RolesAddPending={RolesAddPending}
                    RolesUpdateExecute={RolesUpdateExecute}
                    RolesUpdatePending={RolesUpdatePending}
                    RolesDelExecute={RolesDelExecute}
                    RolesDelPending={RolesDelPending}
                    GetOrgsExecute={GetOrgsExecute}
                    GetOrgsPending={GetOrgsPending}
                    OrgsTree={OrgsTree}
                    GetSubUsersExecute={GetSubUsersExecute}
                    GetSubUsersPending={GetSubUsersPending}
                    SubUsers={SubUsers}
                    AssignRoleUsersExecute={AssignRoleUsersExecute}
                    AssignRoleUsersPending={AssignRoleUsersPending}
                    //#region 為角色分配模塊
                    GetAllmodulesExecute={GetAllmodulesExecute}
                    GetAllmodulesPending={GetAllmodulesPending}
                    Allmodules={Allmodules}
                    AllmodulesTree={AllmodulesTree}
                    GetSelectedModulesExecute={GetSelectedModulesExecute}
                    GetSelectedModulesPending={GetSelectedModulesPending}
                    SelectedModules={SelectedModules}
                    GetAllMenusExecute={GetAllMenusExecute}
                    GetAllMenusPending={GetAllMenusPending}
                    AllMenus={AllMenus}
                    GetSelectedMenusExecute={GetSelectedMenusExecute}
                    GetSelectedMenusPending={GetSelectedMenusPending}
                    SelectedMenus={SelectedMenus}
                    AssignModuleAndElementToRoleExecute={AssignModuleAndElementToRoleExecute}
                    AssignModuleAndElementToRolePending={AssignModuleAndElementToRolePending}
                    UnassignModuleAndElementToRoleExecute={UnassignModuleAndElementToRoleExecute}
                    UnassignModuleAndElementToRolePending={UnassignModuleAndElementToRolePending}
                    //#endregion
                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    OpenAssign={OpenAssign}
                    setOpenAssign={setOpenAssign}
                    RolesData={RolesData}
                    setRolesData={setRolesData}
                    GetRolesExecute={GetRolesExecute}
                    GetRolesPending={GetRolesPending}
                    RolesAddExecute={RolesAddExecute}
                    RolesAddPending={RolesAddPending}
                    RolesUpdateExecute={RolesUpdateExecute}
                    RolesUpdatePending={RolesUpdatePending}
                    RolesDelExecute={RolesDelExecute}
                    RolesDelPending={RolesDelPending}
                    GetOrgsExecute={GetOrgsExecute}
                    GetOrgsPending={GetOrgsPending}
                    OrgsTree={OrgsTree}
                    GetSubUsersExecute={GetSubUsersExecute}
                    GetSubUsersPending={GetSubUsersPending}
                    SubUsers={SubUsers}
                    AssignRoleUsersExecute={AssignRoleUsersExecute}
                    AssignRoleUsersPending={AssignRoleUsersPending}
                    //#region 為角色分配模塊
                    GetAllmodulesExecute={GetAllmodulesExecute}
                    GetAllmodulesPending={GetAllmodulesPending}
                    Allmodules={Allmodules}
                    AllmodulesTree={AllmodulesTree}
                    GetSelectedModulesExecute={GetSelectedModulesExecute}
                    GetSelectedModulesPending={GetSelectedModulesPending}
                    SelectedModules={SelectedModules}
                    GetAllMenusExecute={GetAllMenusExecute}
                    GetAllMenusPending={GetAllMenusPending}
                    AllMenus={AllMenus}
                    GetSelectedMenusExecute={GetSelectedMenusExecute}
                    GetSelectedMenusPending={GetSelectedMenusPending}
                    SelectedMenus={SelectedMenus}
                    AssignModuleAndElementToRoleExecute={AssignModuleAndElementToRoleExecute}
                    AssignModuleAndElementToRolePending={AssignModuleAndElementToRolePending}
                    UnassignModuleAndElementToRoleExecute={UnassignModuleAndElementToRoleExecute}
                    UnassignModuleAndElementToRolePending={UnassignModuleAndElementToRolePending}
                    //#endregion
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    OpenAssign={OpenAssign}
                    setOpenAssign={setOpenAssign}
                    RolesData={RolesData}
                    setRolesData={setRolesData}
                    GetRolesExecute={GetRolesExecute}
                    GetRolesPending={GetRolesPending}
                    RolesAddExecute={RolesAddExecute}
                    RolesAddPending={RolesAddPending}
                    RolesUpdateExecute={RolesUpdateExecute}
                    RolesUpdatePending={RolesUpdatePending}
                    RolesDelExecute={RolesDelExecute}
                    RolesDelPending={RolesDelPending}
                    GetOrgsExecute={GetOrgsExecute}
                    GetOrgsPending={GetOrgsPending}
                    OrgsTree={OrgsTree}
                    GetSubUsersExecute={GetSubUsersExecute}
                    GetSubUsersPending={GetSubUsersPending}
                    SubUsers={SubUsers}
                    AssignRoleUsersExecute={AssignRoleUsersExecute}
                    AssignRoleUsersPending={AssignRoleUsersPending}
                    //#region 為角色分配模塊
                    GetAllmodulesExecute={GetAllmodulesExecute}
                    GetAllmodulesPending={GetAllmodulesPending}
                    Allmodules={Allmodules}
                    AllmodulesTree={AllmodulesTree}
                    GetSelectedModulesExecute={GetSelectedModulesExecute}
                    GetSelectedModulesPending={GetSelectedModulesPending}
                    SelectedModules={SelectedModules}
                    GetAllMenusExecute={GetAllMenusExecute}
                    GetAllMenusPending={GetAllMenusPending}
                    AllMenus={AllMenus}
                    GetSelectedMenusExecute={GetSelectedMenusExecute}
                    GetSelectedMenusPending={GetSelectedMenusPending}
                    SelectedMenus={SelectedMenus}
                    AssignModuleAndElementToRoleExecute={AssignModuleAndElementToRoleExecute}
                    AssignModuleAndElementToRolePending={AssignModuleAndElementToRolePending}
                    UnassignModuleAndElementToRoleExecute={UnassignModuleAndElementToRoleExecute}
                    UnassignModuleAndElementToRolePending={UnassignModuleAndElementToRolePending}
                    //#endregion
                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    OpenAssign={OpenAssign}
                    setOpenAssign={setOpenAssign}
                    RolesData={RolesData}
                    setRolesData={setRolesData}
                    GetRolesExecute={GetRolesExecute}
                    GetRolesPending={GetRolesPending}
                    RolesAddExecute={RolesAddExecute}
                    RolesAddPending={RolesAddPending}
                    RolesUpdateExecute={RolesUpdateExecute}
                    RolesUpdatePending={RolesUpdatePending}
                    RolesDelExecute={RolesDelExecute}
                    RolesDelPending={RolesDelPending}
                    GetOrgsExecute={GetOrgsExecute}
                    GetOrgsPending={GetOrgsPending}
                    OrgsTree={OrgsTree}
                    GetSubUsersExecute={GetSubUsersExecute}
                    GetSubUsersPending={GetSubUsersPending}
                    SubUsers={SubUsers}
                    AssignRoleUsersExecute={AssignRoleUsersExecute}
                    AssignRoleUsersPending={AssignRoleUsersPending}
                    //#region 為角色分配模塊
                    GetAllmodulesExecute={GetAllmodulesExecute}
                    GetAllmodulesPending={GetAllmodulesPending}
                    Allmodules={Allmodules}
                    AllmodulesTree={AllmodulesTree}
                    GetSelectedModulesExecute={GetSelectedModulesExecute}
                    GetSelectedModulesPending={GetSelectedModulesPending}
                    SelectedModules={SelectedModules}
                    GetAllMenusExecute={GetAllMenusExecute}
                    GetAllMenusPending={GetAllMenusPending}
                    AllMenus={AllMenus}
                    GetSelectedMenusExecute={GetSelectedMenusExecute}
                    GetSelectedMenusPending={GetSelectedMenusPending}
                    SelectedMenus={SelectedMenus}
                    AssignModuleAndElementToRoleExecute={AssignModuleAndElementToRoleExecute}
                    AssignModuleAndElementToRolePending={AssignModuleAndElementToRolePending}
                    UnassignModuleAndElementToRoleExecute={UnassignModuleAndElementToRoleExecute}
                    UnassignModuleAndElementToRolePending={UnassignModuleAndElementToRolePending}
                    //#endregion
                    controllGCS={controllGCS}
                />
            }

            {/* 為角色分配模塊彈窗 */}
            {OpenAssign === "為角色分配模塊" &&
                <AssignModuleToRoleTitleModal
                    Allmodules={Allmodules}
                    AllmodulesTree={AllmodulesTree}
                    SelectedModules={SelectedModules}
                    AllMenus={AllMenus}
                    SelectedMenus={SelectedMenus}
                    AssignModuleAndElementToRoleExecute={AssignModuleAndElementToRoleExecute}
                    UnassignModuleAndElementToRoleExecute={UnassignModuleAndElementToRoleExecute}

                    setOpenAssign={setOpenAssign}
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}