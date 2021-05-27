import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { AssignRoleToUserTitleModal, MainPageContainer, MainPageTitleBar } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal } from '../../../../Components';
import { OrgsTree } from '../../../../ProjectComponent'
import { useHistory } from 'react-router-dom';
import { getParseItemLocalStorage, valid } from '../../../../Handlers/'
import { ReactComponent as Search } from '../../../../Assets/img/CasePage/Search.svg'
import { ReactComponent as Plus } from '../../../../Assets/img/CasePage/Plus.svg'
import { ReactComponent as Assign } from '../../../../Assets/img/UserManagerPage/Assign.svg'
import { ReactComponent as Edit } from '../../../../Assets/img/UserManagerPage/Edit.svg'
import { ReactComponent as Refresh } from '../../../../Assets/img/UserManagerPage/Refresh.svg'
import { ReactComponent as Del } from '../../../../Assets/img/UserManagerPage/Del.svg'
import isUndefined from 'lodash/isUndefined';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { userManager: { rwd: { tablet } } } } = Theme;

    const [IdDescribe, setIdDescribe] = useState(globalContextService.get("UserManagerPage", "IdDescribe") ?? false);

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"系統管理員設定"}
                            theme={tablet.titleBar}
                            onSubmit={(e) => console.log(e)}
                        >

                            {/* 新增按鈕容器 */}
                            {
                                // 權限判斷
                                (getParseItemLocalStorage("DFunctions") ?? []).includes("/Base/UserManager/btnAdd") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* 新增按鈕 */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={tablet.addButton}
                                            onClick={(e) => {
                                                e.preventDefault();

                                                let rowData = {};

                                                //#region 打開新增 Modal
                                                modalsService.titleModal.normal({
                                                    //id: "top1",
                                                    title: "新增",
                                                    yes: true,
                                                    yesText: "確認",
                                                    no: true,
                                                    noText: "取消",
                                                    // autoClose: true,
                                                    backgroundClose: false,
                                                    noOnClick: (e) => {
                                                        props.controllGCS("addModalClose")
                                                    },
                                                    yesOnClick: (e, close) => {
                                                        //#region 表單驗證
                                                        let validMsg = "";
                                                        if (valid(globalContextService.get("UserManagerPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                                            validMsg = valid(globalContextService.get("UserManagerPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                                        }
                                                        else if (valid(isUndefined(globalContextService.get("UserManagerPage", "Status")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇狀態"])[1]) {
                                                            validMsg = valid(isUndefined(globalContextService.get("UserManagerPage", "Status")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇狀態"])[1]
                                                        }
                                                        else if (valid(globalContextService.get("UserManagerPage", "Organizations") ?? "", ["^.{1,}$"], ["請選擇服務單位"])[1]) {
                                                            validMsg = valid(globalContextService.get("UserManagerPage", "Organizations") ?? "", ["^.{1,}$"], ["請選擇服務單位"])[1]
                                                        }
                                                        else if (valid(globalContextService.get("UserManagerPage", "Account") ?? "", ["^.{1,}$"], ["請輸入帳號"])[1]) {
                                                            validMsg = valid(globalContextService.get("UserManagerPage", "Account") ?? "", ["^.{1,}$"], ["請輸入帳號"])[1]
                                                        }
                                                        else if (valid(globalContextService.get("UserManagerPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機號碼"])[1]) {
                                                            validMsg = valid(globalContextService.get("UserManagerPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機號碼"])[1]
                                                        }
                                                        //#endregion

                                                        //#region 表單驗證後動作
                                                        if (validMsg !== "") {
                                                            console.log(validMsg, globalContextService.get("UserManagerPage"))
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
                                                            let [OrganizationsData, organizationIdsArr, organizationsArr] = [globalContextService.get("UserManagerPage", "Organizations"), [], []];

                                                            (OrganizationsData ?? []).forEach((item) => {
                                                                organizationIdsArr.push(item?.value);
                                                                organizationsArr.push(item?.label)
                                                            })

                                                            props.UsersAddExecute({

                                                                account: globalContextService.get("UserManagerPage", "Account"),
                                                                // description:  globalContextService.get("UserManagerPage", "Description"),
                                                                name: globalContextService.get("UserManagerPage", "Name"),
                                                                organizationIds: organizationIdsArr.join(),
                                                                organizations: organizationsArr.join(),
                                                                // password: globalContextService.get("UserManagerPage", "Password"),
                                                                status: globalContextService.get("UserManagerPage", "Status")?.value,
                                                            })
                                                            close();
                                                        }
                                                    },
                                                    closeIconOnClick: (e) => {
                                                        props.controllGCS("addModalClose")
                                                    },
                                                    content: (
                                                        <FormContainer
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            onSubmit={(e) => {
                                                                e.preventDefault();
                                                            }}
                                                            theme={tablet.editFormContainer}
                                                        >
                                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                {/* 新增彈窗 - 姓名 Name */}
                                                                <TextInput
                                                                    // viewType
                                                                    topLabel={<>姓名<Text theme={tablet.nameRequired}>(必填)</Text></>}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={""}
                                                                    value={globalContextService.get("UserManagerPage", "Name") ?? rowData.name}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("UserManagerPage", "Name", value);
                                                                    }}
                                                                    theme={tablet.name}
                                                                />

                                                                {/* 新增彈窗 - 狀態 Status */}
                                                                <Selector
                                                                    bascDefaultTheme={"DefaultTheme"}
                                                                    topLabel={<>狀態<Text theme={tablet.statusRequired}>(必填)</Text></>}
                                                                    //viewType
                                                                    isSearchable
                                                                    placeholder={"請選擇個案身分"}
                                                                    // isMulti
                                                                    // hideSelectedOptions={false}
                                                                    value={globalContextService.get("UserManagerPage", "Status") ?? {}}
                                                                    onChange={(e, value, onInitial) => {
                                                                        // console.log(value)
                                                                        globalContextService.set("UserManagerPage", "Status", value);
                                                                    }}

                                                                    options={[
                                                                        { value: 'hint', label: "請選擇狀態", isDisabled: true },
                                                                        { value: 0, label: '正常' },
                                                                        { value: 1, label: '停用' }
                                                                    ]}
                                                                    menuPosition={true}
                                                                    theme={tablet.status}
                                                                />

                                                                {/* 新增彈窗 - 服務單位 Organizations */}
                                                                <TreeSelector
                                                                    bascDefaultTheme={"DefaultTheme"}
                                                                    topLabel={<>服務單位<Text theme={tablet.organizationsRequired}>(必填)</Text></>}
                                                                    //viewType
                                                                    isSearchable
                                                                    placeholder={""}
                                                                    isMulti
                                                                    hideSelectedOptions={false}
                                                                    value={globalContextService.get("UserManagerPage", "Organizations") ?? null}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("UserManagerPage", "Organizations", value);
                                                                    }}
                                                                    options={props.OrgsTree}
                                                                    // addHeadOptions={[{ value: null, label: "根節點" }]}
                                                                    optionsValueKeyName={"id"}
                                                                    optionsLabelKeyName={"name"}
                                                                    menuPosition={true}
                                                                    theme={tablet.organizations}
                                                                />

                                                                {/* 新增彈窗 - 帳號 Account */}
                                                                <TextInput
                                                                    // viewType
                                                                    topLabel={<>帳號<Text theme={tablet.accountRequired}>(必填)</Text></>}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={""}
                                                                    value={globalContextService.get("UserManagerPage", "Account") ?? rowData.account}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("UserManagerPage", "Account", value);
                                                                    }}
                                                                    theme={tablet.account}
                                                                />

                                                                {/* 新增彈窗 - 手機號碼 Cellphone */}
                                                                <TextInput
                                                                    // viewType
                                                                    topLabel={<>手機號碼<Text theme={tablet.cellphoneRequired}>(必填)</Text></>}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={""}
                                                                    value={globalContextService.get("UserManagerPage", "Cellphone") ?? rowData.cellphone}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("UserManagerPage", "Cellphone", value);
                                                                    }}
                                                                    theme={tablet.cellphone}
                                                                />

                                                            </FormRow>
                                                        </FormContainer>
                                                    ),
                                                    theme: tablet.editModal
                                                })
                                                //#endregion
                                            }}
                                        >
                                            {/* 新增按鈕 圖標 */}
                                            <Plus style={tablet.addButtonIcon} />
                                                    新增
                                        </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* 編輯按鈕容器 */}
                            {
                                // 權限判斷
                                (getParseItemLocalStorage("DFunctions") ?? []).includes("/Base/UserManager/btnEdit") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* 編輯按鈕 */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={tablet.editButton}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                // let checkedRowKeys = globalContextService.get("UserManagerPage", "CheckedRowKeys");
                                                let checkedRowsData = globalContextService.get("UserManagerPage", "CheckedRowsData");

                                                //#region 都沒選、選超過一個
                                                if ((checkedRowsData?.length ?? 0) === 0 || checkedRowsData?.length > 1) {
                                                    modalsService.infoModal.error({
                                                        iconRightText: "只能選一個進行編輯。",
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
                                                //#endregion
                                                //#region 選一個
                                                else {
                                                    let rowData = { ...checkedRowsData[0] };

                                                    //#region 開啟編輯彈窗時 將預設的組織代入 TreeSelector 內
                                                    let treeOrganizationIdsArr = rowData?.organizationIds?.split(',');
                                                    let treeOrganizationsArr = rowData?.organizations?.split(',');
                                                    let organizationsSelected = [];
                                                    treeOrganizationIdsArr.forEach((element, index) => {
                                                        organizationsSelected.push({ value: treeOrganizationIdsArr[index], label: treeOrganizationsArr[index] });
                                                    });
                                                    //#endregion

                                                    //#region 打開編輯 Modal
                                                    modalsService.titleModal.normal({
                                                        //id: "top1",
                                                        title: "編輯",
                                                        yes: true,
                                                        yesText: "確認",
                                                        no: true,
                                                        noText: "取消",
                                                        // autoClose: true,
                                                        backgroundClose: false,
                                                        noOnClick: (e) => {
                                                            props.controllGCS("editModalClose")
                                                        },
                                                        yesOnClick: (e, close) => {
                                                            //#region 表單驗證
                                                            let validMsg = "";
                                                            if (valid(globalContextService.get("UserManagerPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                                                validMsg = valid(globalContextService.get("UserManagerPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                                            }
                                                            else if (valid(isUndefined(globalContextService.get("UserManagerPage", "Status")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇狀態"])[1]) {
                                                                validMsg = valid(isUndefined(globalContextService.get("UserManagerPage", "Status")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇狀態"])[1]
                                                            }
                                                            else if (valid(globalContextService.get("UserManagerPage", "Organizations") ?? "", ["^.{1,}$"], ["請選擇服務單位"])[1]) {
                                                                validMsg = valid(globalContextService.get("UserManagerPage", "Organizations") ?? "", ["^.{1,}$"], ["請選擇服務單位"])[1]
                                                            }
                                                            else if (valid(globalContextService.get("UserManagerPage", "Account") ?? "", ["^.{1,}$"], ["請輸入帳號"])[1]) {
                                                                validMsg = valid(globalContextService.get("UserManagerPage", "Account") ?? "", ["^.{1,}$"], ["請輸入帳號"])[1]
                                                            }
                                                            else if (valid(globalContextService.get("UserManagerPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機號碼"])[1]) {
                                                                validMsg = valid(globalContextService.get("UserManagerPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機號碼"])[1]
                                                            }
                                                            //#endregion

                                                            //#region 表單驗證後動作
                                                            if (validMsg !== "") {
                                                                console.log(validMsg, globalContextService.get("UserManagerPage"))
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
                                                                //#region 處理要打 編輯 API時，要送的資料
                                                                let [OrganizationsData, organizationIdsArr, organizationsArr] = [globalContextService.get("UserManagerPage", "Organizations"), [], []];
                                                                // console.log(organizationsSelected);
                                                                (OrganizationsData ?? []).forEach((item) => {
                                                                    organizationIdsArr.push(item?.value);
                                                                    organizationsArr.push(item?.label)
                                                                })
                                                                //#endregion

                                                                props.UsersUpdateExecute({
                                                                    ...rowData,
                                                                    id: rowData?.id,
                                                                    account: globalContextService.get("UserManagerPage", "Account"),
                                                                    // description:  globalContextService.get("UserManagerPage", "Description"),
                                                                    name: globalContextService.get("UserManagerPage", "Name"),
                                                                    organizationIds: organizationIdsArr.join(),
                                                                    organizations: organizationsArr.join(),
                                                                    // password: globalContextService.get("UserManagerPage", "Password"),
                                                                    status: globalContextService.get("UserManagerPage", "Status")?.value,
                                                                })
                                                                close();
                                                            }
                                                        },
                                                        closeIconOnClick: (e) => {
                                                            props.controllGCS("editModalClose")
                                                        },
                                                        content: (
                                                            <FormContainer
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                onSubmit={(e) => {
                                                                    e.preventDefault();
                                                                }}
                                                                theme={tablet.editFormContainer}
                                                            >
                                                                <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                    {/* 新增彈窗 - 姓名 Name */}
                                                                    <TextInput
                                                                        // viewType
                                                                        topLabel={<>姓名<Text theme={tablet.nameRequired}>(必填)</Text></>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={""}
                                                                        value={globalContextService.get("UserManagerPage", "Name") ?? rowData.name}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("UserManagerPage", "Name", value);
                                                                        }}
                                                                        theme={tablet.name}
                                                                    />

                                                                    {/* 新增彈窗 - 狀態 Status */}
                                                                    <Selector
                                                                        bascDefaultTheme={"DefaultTheme"}
                                                                        topLabel={<>狀態<Text theme={tablet.statusRequired}>(必填)</Text></>}
                                                                        //viewType
                                                                        isSearchable
                                                                        placeholder={"請選擇個案身分"}
                                                                        // isMulti
                                                                        // hideSelectedOptions={false}
                                                                        value={globalContextService.get("UserManagerPage", "Status") ?? { value: rowData.status, label: rowData.status === 0 ? '正常' : '停用' }}
                                                                        onChange={(e, value, onInitial) => {
                                                                            // console.log(value)
                                                                            globalContextService.set("UserManagerPage", "Status", value);
                                                                        }}

                                                                        options={[
                                                                            { value: 'hint', label: "請選擇狀態", isDisabled: true },
                                                                            { value: 0, label: '正常' },
                                                                            { value: 1, label: '停用' }
                                                                        ]}
                                                                        menuPosition={true}
                                                                        theme={tablet.status}
                                                                    />

                                                                    {/* 新增彈窗 - 服務單位 Organizations */}
                                                                    <TreeSelector
                                                                        bascDefaultTheme={"DefaultTheme"}
                                                                        topLabel={<>服務單位<Text theme={tablet.organizationsRequired}>(必填)</Text></>}
                                                                        //viewType
                                                                        isSearchable
                                                                        placeholder={""}
                                                                        isMulti
                                                                        hideSelectedOptions={false}
                                                                        value={globalContextService.get("UserManagerPage", "Organizations") ?? organizationsSelected}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("UserManagerPage", "Organizations", value);
                                                                        }}
                                                                        options={props.OrgsTree}
                                                                        // addHeadOptions={[{ value: null, label: "根節點" }]}
                                                                        optionsValueKeyName={"id"}
                                                                        optionsLabelKeyName={"name"}
                                                                        menuPosition={true}
                                                                        theme={tablet.organizations}
                                                                    />

                                                                    {/* 新增彈窗 - 帳號 Account */}
                                                                    <TextInput
                                                                        // viewType
                                                                        topLabel={<>帳號<Text theme={tablet.accountRequired}>(必填)</Text></>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={""}
                                                                        value={globalContextService.get("UserManagerPage", "Account") ?? rowData.account}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("UserManagerPage", "Account", value);
                                                                        }}
                                                                        theme={tablet.account}
                                                                    />

                                                                    {/* 新增彈窗 - 手機號碼 Cellphone */}
                                                                    <TextInput
                                                                        // viewType
                                                                        topLabel={<>手機號碼<Text theme={tablet.cellphoneRequired}>(必填)</Text></>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={""}
                                                                        value={globalContextService.get("UserManagerPage", "Cellphone") ?? rowData.cellphone}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("UserManagerPage", "Cellphone", value);
                                                                        }}
                                                                        theme={tablet.cellphone}
                                                                    />

                                                                </FormRow>
                                                            </FormContainer>
                                                        ),
                                                        theme: tablet.editModal
                                                    })
                                                    //#endregion
                                                }
                                                //#endregion
                                            }}
                                        >
                                            {/* 編輯按鈕 圖標 */}
                                            <Edit style={tablet.editButtonIcon} />
                                            編輯
                                        </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* 刪除按鈕容器 */}
                            {
                                // 權限判斷
                                (getParseItemLocalStorage("DFunctions") ?? []).includes("/Base/UserManager/btnDel") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* 刪除按鈕 */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={tablet.delButton}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                let checkedRowKeys = globalContextService.get("UserManagerPage", "CheckedRowKeys");
                                                let checkedRowsData = globalContextService.get("UserManagerPage", "CheckedRowsData");

                                                //#region 都沒選、選超過一個
                                                if ((checkedRowsData?.length ?? 0) === 0) {
                                                    modalsService.infoModal.error({
                                                        iconRightText: "至少選一個進行刪除。",
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
                                                //#endregion
                                                //#region 選一個
                                                else {
                                                    modalsService.infoModal.warn({
                                                        iconRightText: "是否確定進行刪除。",
                                                        yes: true,
                                                        yesText: "確認",
                                                        no: true,
                                                        noText: "取消",
                                                        // autoClose: true,
                                                        backgroundClose: false,
                                                        yesOnClick: (e, close) => {
                                                            props.UsersDelExecute(checkedRowKeys);
                                                            close();
                                                        }
                                                    })
                                                }
                                                //#endregion
                                            }}
                                        >
                                            {/* 刪除按鈕 圖標 */}
                                            <Del style={tablet.delButtonIcon} />
                                            刪除
                                        </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* 刷新按鈕容器 */}
                            {
                                // 權限判斷
                                (getParseItemLocalStorage("DFunctions") ?? []).includes("/Base/UserManager/btnRefresh") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* 刷新按鈕 */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={tablet.refreshButton}
                                            onClick={(e) => {
                                                props.controllGCS("Refresh", "API");
                                                props.GetSubUsersExecute(true, "");
                                                globalContextService.set("UserManagerPage", "orgId", "");
                                                // globalContextService.get("UserManagerPage", "setSelectStateForTreeSelector")("");
                                            }}
                                        >
                                            {/* 刷新按鈕 圖標 */}
                                            <Refresh style={tablet.refreshButtonIcon} />
                                            刷新
                                            </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* 為用戶分配角色按鈕容器 */}
                            {
                                // 權限判斷
                                (getParseItemLocalStorage("DFunctions") ?? []).includes("/Base/UserManager/btnAccessRole") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* 為用戶分配角色按鈕 */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={tablet.assignButton}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                // let checkedRowKeys = globalContextService.get("UserManagerPage", "CheckedRowKeys");
                                                let checkedRowsData = globalContextService.get("UserManagerPage", "CheckedRowsData");

                                                //#region 都沒選、選超過一個
                                                if ((checkedRowsData?.length ?? 0) === 0 || checkedRowsData?.length > 1) {
                                                    modalsService.infoModal.error({
                                                        iconRightText: "只能選一個用戶進行分配角色。",
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
                                                //#endregion
                                                //#region 選一個
                                                else {
                                                    let rowData = { ...checkedRowsData[0] };

                                                    props.GetRolesLoadByUserExecute(rowData.id);
                                                    props.GetAllRolesLoadByUserExecute("");
                                                    //#region 打開為用戶分配角色 Modal
                                                    props.setOpenAssign(true);// 直接打開彈窗
                                                    //#endregion
                                                }
                                                //#endregion

                                            }}
                                        >
                                            {/* 為用戶分配角色按鈕 圖標 */}
                                            <Assign style={tablet.assignButtonIcon} />
                                            為用戶分配角色
                                        </NativeLineButton>
                                    </SubContainer>
                                )
                            }


                        </MainPageTitleBar>
                        <FormContainer
                            theme={tablet.secondFormContainer}
                            onSubmit={(e) => {
                                props.GetSubUsersExecute(true, globalContextService.get("UserManagerPage", "orgId"), 99999, 1, false, globalContextService.get("UserManagerPage", "Keyword"));
                            }}
                        >
                            <FormRow>
                                {/* 選擇機構 SelectOrg */}
                                <TreeSelector
                                    bascDefaultTheme={"DefaultTheme"}
                                    isSearchable
                                    placeholder={"請選擇機構"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={
                                        globalContextService.get("UserManagerPage", "orgId") ?
                                            { value: globalContextService.get("UserManagerPage", "orgId"), label: globalContextService.get("UserManagerPage", "orgNameForTreeSelector") }
                                            :
                                            { value: "", label: "全部機構" }
                                    }
                                    onChange={(e, value, onInitial) => {
                                        if (globalContextService.get("UserManagerPage", "orgId") !== value.value) {
                                            globalContextService.set("UserManagerPage", "orgId", value.value) // 提前更新orgId的值，而不等到API査完才更新
                                            globalContextService.set("UserManagerPage", "orgNameForTreeSelector", value.name)
                                            props.GetSubUsersExecute(true, value.value, 20, 1, false, globalContextService.get("UserManagerPage", "Keyword"));
                                        }
                                    }}
                                    options={props.OrgsTree}
                                    addHeadOptions={[{ value: "", label: "全部機構" }]}
                                    optionsValueKeyName={"id"}
                                    optionsLabelKeyName={"name"}
                                    menuPosition={true}
                                    theme={tablet.selectOrg}
                                />
                                {/* 一般輸入框 請輸入關鍵字  */}
                                <TextInput
                                    bascDefaultTheme={"DefaultTheme"}
                                    theme={tablet.keyword}
                                    type="text"
                                    placeholder={"請輸入關鍵字"}
                                    rightIcon={
                                        <Search
                                            style={tablet.keywordRightIcon}
                                            onClick={(e) => {
                                                props.GetSubUsersExecute(true, globalContextService.get("UserManagerPage", "orgId"), 99999, 1, false, globalContextService.get("UserManagerPage", "Keyword"));
                                            }}
                                        />
                                    }
                                    value={globalContextService.get("UserManagerPage", "Keyword") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("UserManagerPage", "Keyword", value);
                                    }}
                                />
                                {/* id/描述 勾選框 IdDescribe*/}
                                <CheckboxX
                                    baseDefaultTheme={"DefaultTheme"}
                                    text={"id/描述"}
                                    theme={tablet.idDescribe}
                                    checked={globalContextService.get("UserManagerPage", "IdDescribe") ?? false}
                                    onChange={(e, checked, onInitial) => {
                                        setIdDescribe(checked)
                                        globalContextService.set("UserManagerPage", "IdDescribe", checked);
                                    }}
                                />
                                {/* 帳號解鎖按鈕容器 */}
                                {
                                    // 權限判斷
                                    (getParseItemLocalStorage("DFunctions") ?? []).includes("/Base/UserManager/btnEdit") &&
                                    (
                                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                            {/* 帳號解鎖按鈕 */}
                                            <NativeLineButton
                                                baseDefaultTheme={"DefaultTheme"}
                                                disable={false}
                                                type="button" // 防止提交
                                                theme={tablet.unlockButton}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    // let checkedRowKeys = globalContextService.get("UserManagerPage", "CheckedRowKeys");
                                                    let checkedRowsData = globalContextService.get("UserManagerPage", "CheckedRowsData");

                                                    //#region 都沒選、選超過一個
                                                    if ((checkedRowsData?.length ?? 0) === 0 || checkedRowsData?.length > 1) {
                                                        modalsService.infoModal.error({
                                                            iconRightText: "只能選一個進行帳號解鎖。",
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
                                                    //#endregion
                                                    //#region 選一個
                                                    else {
                                                        let rowData = { ...checkedRowsData[0] };
                                                        //#region 打開編輯 Modal
                                                        console.log("暫不支援此功能")
                                                        //#endregion
                                                    }
                                                    //#endregion
                                                }}
                                            >
                                                帳號解鎖
                                        </NativeLineButton>
                                        </SubContainer>
                                    )
                                }
                            </FormRow>
                        </FormContainer>
                    </>
                }
            >
                {/* 左側選單與右側 Table 容器 */}
                <Container
                    bascDefaultTheme={"DefaultTheme"}
                    theme={tablet.leftMenuRightTableContainer}
                >

                    {/* 右側 Table 容器 */}
                    <SubContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.rightTableContainer}
                    >
                        <BasicContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={tablet.rightTableSubContainer}
                        >
                            <OldTable
                                dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                                dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                                    if (globalContextService.get("UserManagerPage", "orgId") !== globalContextService.get("UserManagerPage", "TableCheckedClearKey")) {
                                        globalContextService.remove("UserManagerPage", "CheckedRowKeys");
                                        globalContextService.remove("UserManagerPage", "CheckedRowsData");
                                    }
                                }}
                                checkbox={true}
                                checked={globalContextService.get("UserManagerPage", "CheckedRowKeys") && globalContextService.get("UserManagerPage", "CheckedRowKeys")}
                                checkedRowKeyName={"id"}
                                checkboxOnChecked={
                                    (checkedRowKeys, checkedRows) => {
                                        // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                        globalContextService.set("UserManagerPage", "CheckedRowKeys", checkedRowKeys);
                                        globalContextService.set("UserManagerPage", "CheckedRowsData", checkedRows);
                                        //#region 必須要在勾選項"有異動"之後除˙存一個可判斷值，以保持"已異動勾選項"不被重置
                                        globalContextService.set("UserManagerPage", "TableCheckedClearKey", globalContextService.get("UserManagerPage", "orgId"));
                                        //#endregion
                                    }
                                }
                                setPerCheckBoxDisabled={(record) => {
                                    return {
                                        // ...record, // 對應CheckBox當列資料
                                        // disabled: record.name === 'Edrward 11',
                                    }
                                }}
                                //scrollAreaWidth={"calc( 1900px - 300px )"} // 不用傳 會自適應寬度
                                //scrollAreaHeight={"calc( 100% - 55px )"}
                                columnsAttr={
                                    //#region 資料欄設定
                                    [
                                        {
                                            title: '',
                                            width: "0px",
                                            dataIndex: 'leftOccupy',
                                            fixed: 'left',
                                            sorter: false
                                        },
                                        {
                                            title: '姓名',
                                            width: "112px",
                                            dataIndex: 'name',
                                            sorter: (a, b) => a.name.length - b.name.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '帳號',
                                            width: "120px",
                                            dataIndex: 'account',
                                            // sorter: (a, b) => a.account.length - b.account.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '服務單位',
                                            width: "600px",
                                            dataIndex: 'organizations',
                                            // sorter: (a, b) => a.organizations.length - b.organizations.length,
                                            // fixed: 'left',
                                        },
                                        (IdDescribe &&
                                        {
                                            title: 'Id',
                                            width: "360px",
                                            dataIndex: 'id',
                                            sorter: (a, b) => a.id.length - b.id.length,
                                            // fixed: 'left',
                                        }
                                        ),
                                        {
                                            title: '狀態控制台',
                                            width: "176px",
                                            // dataIndex: 'parentName',
                                            sorter: (a, b) => a.name.length - b.name.length,
                                            fixed: 'right',
                                            render: (rowData) => {
                                                return (
                                                    <>
                                                        {rowData.status === 1 ?
                                                            <Tag
                                                                baseDefaultTheme={"SecondaryTheme"}
                                                                theme={tablet.disableTag}
                                                                text={"停用"}
                                                            />
                                                            :
                                                            <Tag
                                                                baseDefaultTheme={"SuccessTheme"}
                                                                theme={tablet.enableTag}
                                                                text={"正常"}
                                                            />
                                                        }

                                                        {/* 編輯按鈕 */}
                                                        {
                                                            // 權限判斷
                                                            (getParseItemLocalStorage("DFunctions") ?? []).includes("/Base/UserManager/btnEdit") &&
                                                            (
                                                                <NativeLineButton
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    disable={false}
                                                                    type="button" // 防止提交
                                                                    theme={tablet.tableEditButton}
                                                                    onClick={() => {
                                                                        // let checkedRowKeys = globalContextService.get("UserManagerPage", "CheckedRowKeys");
                                                                        // let checkedRowsData = globalContextService.get("UserManagerPage", "CheckedRowsData");

                                                                        // let rowData = { ...checkedRowsData[0] };

                                                                        //#region 開啟編輯彈窗時 將預設的組織代入 TreeSelector 內
                                                                        let treeOrganizationIdsArr = rowData?.organizationIds?.split(',');
                                                                        let treeOrganizationsArr = rowData?.organizations?.split(',');
                                                                        let organizationsSelected = [];
                                                                        treeOrganizationIdsArr.forEach((element, index) => {
                                                                            organizationsSelected.push({ value: treeOrganizationIdsArr[index], label: treeOrganizationsArr[index] });
                                                                        });
                                                                        //#endregion

                                                                        //#region 打開編輯 Modal
                                                                        modalsService.titleModal.normal({
                                                                            //id: "top1",
                                                                            title: "編輯",
                                                                            yes: true,
                                                                            yesText: "確認",
                                                                            no: true,
                                                                            noText: "取消",
                                                                            // autoClose: true,
                                                                            backgroundClose: false,
                                                                            noOnClick: (e) => {
                                                                                props.controllGCS("editModalClose")
                                                                            },
                                                                            yesOnClick: (e, close) => {
                                                                                //#region 表單驗證
                                                                                let validMsg = "";
                                                                                if (valid(globalContextService.get("UserManagerPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("UserManagerPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                                                                }
                                                                                else if (valid(isUndefined(globalContextService.get("UserManagerPage", "Status")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇狀態"])[1]) {
                                                                                    validMsg = valid(isUndefined(globalContextService.get("UserManagerPage", "Status")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇狀態"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("UserManagerPage", "Organizations") ?? "", ["^.{1,}$"], ["請選擇服務單位"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("UserManagerPage", "Organizations") ?? "", ["^.{1,}$"], ["請選擇服務單位"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("UserManagerPage", "Account") ?? "", ["^.{1,}$"], ["請輸入帳號"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("UserManagerPage", "Account") ?? "", ["^.{1,}$"], ["請輸入帳號"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("UserManagerPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機號碼"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("UserManagerPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機號碼"])[1]
                                                                                }
                                                                                //#endregion

                                                                                //#region 表單驗證後動作
                                                                                if (validMsg !== "") {
                                                                                    console.log(validMsg, globalContextService.get("UserManagerPage"))
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
                                                                                    //#region 處理要打 編輯 API時，要送的資料
                                                                                    let [OrganizationsData, organizationIdsArr, organizationsArr] = [globalContextService.get("UserManagerPage", "Organizations"), [], []];
                                                                                    // console.log(organizationsSelected);
                                                                                    (OrganizationsData ?? []).forEach((item) => {
                                                                                        organizationIdsArr.push(item?.value);
                                                                                        organizationsArr.push(item?.label)
                                                                                    })
                                                                                    //#endregion

                                                                                    props.UsersUpdateExecute({
                                                                                        ...rowData,
                                                                                        id: rowData?.id,
                                                                                        account: globalContextService.get("UserManagerPage", "Account"),
                                                                                        // description:  globalContextService.get("UserManagerPage", "Description"),
                                                                                        name: globalContextService.get("UserManagerPage", "Name"),
                                                                                        organizationIds: organizationIdsArr.join(),
                                                                                        organizations: organizationsArr.join(),
                                                                                        // password: globalContextService.get("UserManagerPage", "Password"),
                                                                                        status: globalContextService.get("UserManagerPage", "Status")?.value,
                                                                                    })
                                                                                    close();
                                                                                }
                                                                            },
                                                                            closeIconOnClick: (e) => {
                                                                                props.controllGCS("editModalClose")
                                                                            },
                                                                            content: (
                                                                                <FormContainer
                                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                                    onSubmit={(e) => {
                                                                                        e.preventDefault();
                                                                                    }}
                                                                                    theme={tablet.editFormContainer}
                                                                                >
                                                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                                        {/* 新增彈窗 - 姓名 Name */}
                                                                                        <TextInput
                                                                                            // viewType
                                                                                            topLabel={<>姓名<Text theme={tablet.nameRequired}>(必填)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("UserManagerPage", "Name") ?? rowData.name}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("UserManagerPage", "Name", value);
                                                                                            }}
                                                                                            theme={tablet.name}
                                                                                        />

                                                                                        {/* 新增彈窗 - 狀態 Status */}
                                                                                        <Selector
                                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                                            topLabel={<>狀態<Text theme={tablet.statusRequired}>(必填)</Text></>}
                                                                                            //viewType
                                                                                            isSearchable
                                                                                            placeholder={"請選擇個案身分"}
                                                                                            // isMulti
                                                                                            // hideSelectedOptions={false}
                                                                                            value={globalContextService.get("UserManagerPage", "Status") ?? { value: rowData.status, label: rowData.status === 0 ? '正常' : '停用' }}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                // console.log(value)
                                                                                                globalContextService.set("UserManagerPage", "Status", value);
                                                                                            }}

                                                                                            options={[
                                                                                                { value: 'hint', label: "請選擇狀態", isDisabled: true },
                                                                                                { value: 0, label: '正常' },
                                                                                                { value: 1, label: '停用' }
                                                                                            ]}
                                                                                            menuPosition={true}
                                                                                            theme={tablet.status}
                                                                                        />

                                                                                        {/* 新增彈窗 - 服務單位 Organizations */}
                                                                                        <TreeSelector
                                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                                            topLabel={<>服務單位<Text theme={tablet.organizationsRequired}>(必填)</Text></>}
                                                                                            //viewType
                                                                                            isSearchable
                                                                                            placeholder={""}
                                                                                            isMulti
                                                                                            hideSelectedOptions={false}
                                                                                            value={globalContextService.get("UserManagerPage", "Organizations") ?? organizationsSelected}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("UserManagerPage", "Organizations", value);
                                                                                            }}
                                                                                            options={props.OrgsTree}
                                                                                            // addHeadOptions={[{ value: null, label: "根節點" }]}
                                                                                            optionsValueKeyName={"id"}
                                                                                            optionsLabelKeyName={"name"}
                                                                                            menuPosition={true}
                                                                                            theme={tablet.organizations}
                                                                                        />

                                                                                        {/* 新增彈窗 - 帳號 Account */}
                                                                                        <TextInput
                                                                                            // viewType
                                                                                            topLabel={<>帳號<Text theme={tablet.accountRequired}>(必填)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("UserManagerPage", "Account") ?? rowData.account}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("UserManagerPage", "Account", value);
                                                                                            }}
                                                                                            theme={tablet.account}
                                                                                        />

                                                                                        {/* 新增彈窗 - 手機號碼 Cellphone */}
                                                                                        <TextInput
                                                                                            // viewType
                                                                                            topLabel={<>手機號碼<Text theme={tablet.cellphoneRequired}>(必填)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("UserManagerPage", "Cellphone") ?? rowData.cellphone}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("UserManagerPage", "Cellphone", value);
                                                                                            }}
                                                                                            theme={tablet.cellphone}
                                                                                        />

                                                                                    </FormRow>
                                                                                </FormContainer>
                                                                            ),
                                                                            theme: tablet.editModal
                                                                        })
                                                                        //#endregion
                                                                    }}
                                                                >
                                                                    編輯
                                                                </NativeLineButton>
                                                            )
                                                        }

                                                        {
                                                            // 權限判斷
                                                            (getParseItemLocalStorage("DFunctions") ?? []).includes("/Base/UserManager/btnEnableAndDisable") &&
                                                            (
                                                                rowData.status !== 1 ?
                                                                    <>
                                                                        {/* 停用按鈕 */}
                                                                        <NativeLineButton
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            disable={false}
                                                                            type="button" // 防止提交
                                                                            theme={tablet.disableButton}
                                                                            onClick={() => {
                                                                                props.UsersUpdateExecute({ ...rowData, status: 1 })
                                                                            }}
                                                                        >
                                                                            停用
                                                                        </NativeLineButton>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        {/* 啟用按鈕 */}
                                                                        <NativeLineButton
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            disable={false}
                                                                            type="button" // 防止提交
                                                                            theme={tablet.enableButton}
                                                                            onClick={() => {
                                                                                props.UsersUpdateExecute({ ...rowData, status: 0 })
                                                                            }}
                                                                        >
                                                                            啟用
                                                                        </NativeLineButton>
                                                                    </>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                        },
                                        {
                                            title: '',
                                            width: "0px",
                                            dataIndex: 'rightOccupy',
                                            fixed: 'right',
                                            sorter: false
                                        },
                                    ]
                                    //#endregion
                                }
                                //sort
                                //showHeader={false}
                                data={props.SubUsers.data}
                                clickPage={(currentPage, pageSize) => {
                                }}
                            />
                        </BasicContainer>
                    </SubContainer>
                </Container>
            </MainPageContainer>

            {/* 為用戶分配角色彈窗 */}
            {props.OpenAssign &&
                <AssignRoleToUserTitleModal
                    // theme={{}}
                    setOpenAssign={props.setOpenAssign}
                    GetRolesLoadByUserExecute={props.GetRolesLoadByUserExecute}
                    RolesLoadByUser={props.RolesLoadByUser}
                    GetAllRolesLoadByUserExecute={props.GetAllRolesLoadByUserExecute}
                    AllRolesLoadByUser={props.AllRolesLoadByUser}
                    controllGCS={props.controllGCS}
                    AssignUserRolesExecute={props.AssignUserRolesExecute}
                    AssignUserRolesPending={props.AssignUserRolesPending}
                />
            }
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`

`