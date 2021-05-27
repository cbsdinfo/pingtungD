import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal } from '../../../../Components';
import { ReactComponent as Search } from '../../../../Assets/img/CasePage/Search.svg'
import { ReactComponent as Plus } from '../../../../Assets/img/CasePage/Plus.svg'
import { ReactComponent as Assign } from '../../../../Assets/img/OrgManagerPage/Assign.svg'
import { ReactComponent as Del } from '../../../../Assets/img/OrgManagerPage/Del.svg'
import { ReactComponent as Edit } from '../../../../Assets/img/OrgManagerPage/Edit.svg'
import { ReactComponent as CaretDown } from '../../../../Assets/img/OrgManagerPage/CaretDown.svg'
import { ReactComponent as Refresh } from '../../../../Assets/img/OrgManagerPage/Refresh.svg'
import { ReactComponent as TableDisable } from '../../../../Assets/img/OrgManagerPage/TableDisable.svg'
import { ReactComponent as TableEdit } from '../../../../Assets/img/OrgManagerPage/TableEdit.svg'
import { ReactComponent as TableEnable } from '../../../../Assets/img/OrgManagerPage/TableEnable.svg'
import { useHistory } from 'react-router-dom';
import { getParseItemLocalStorage, valid } from '../../../../Handlers/'
import Select from 'react-select'
import { treeSelectorTransducer } from '../../../../Components/Form/TreeSelector/TreeSelector';
import isUndefined from 'lodash/isUndefined';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { orgManager: { rwd: { laptop } } } } = Theme;

    const [IdDescribe, setIdDescribe] = useState(globalContextService.get("OrgManagerPage", "IdDescribe") ?? false);

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"單位管理"}
                            theme={laptop.titleBar}
                            onSubmit={(e) => {
                                console.log("目前不支援搜尋功能")
                                // props.GetSubOrgsExecute(true, "");
                            }}
                        >
                            {/* 一般輸入框 請輸入關鍵字  */}
                            <TextInput
                                bascDefaultTheme={"DefaultTheme"}
                                theme={laptop.keyword}
                                type="text"
                                placeholder={"請輸入關鍵字"}
                                rightIcon={
                                    <Search
                                        style={laptop.keywordRightIcon}
                                        onClick={(e) => {
                                            console.log("目前不支援搜尋功能")
                                            // props.GetSubOrgsExecute(true, "");
                                        }
                                        }
                                    />
                                }
                                value={globalContextService.get("OrgManagerPage", "Keyword") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("OrgManagerPage", "Keyword", value);
                                }}
                            />
                            {/* 新增按鈕容器 */}
                            {
                                // 權限判斷
                                (getParseItemLocalStorage("DFunctions") ?? []).includes("/Base/OrgManager/btnAdd") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* 新增按鈕 */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={laptop.addButton}
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
                                                        if (valid(globalContextService.get("OrgManagerPage", "UnitName") ?? "", ["^.{1,}$"], ["請輸入單位名稱"])[1]) {
                                                            validMsg = valid(globalContextService.get("OrgManagerPage", "UnitName") ?? "", ["^.{1,}$"], ["請輸入單位名稱"])[1]
                                                        }
                                                        else if (valid(globalContextService.get("OrgManagerPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入統一編號"])[1]) {
                                                            validMsg = valid(globalContextService.get("OrgManagerPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入統一編號"])[1]
                                                        }
                                                        else if (valid(globalContextService.get("OrgManagerPage", "FirstContact") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人"])[1]) {
                                                            validMsg = valid(globalContextService.get("OrgManagerPage", "FirstContact") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人"])[1]
                                                        }
                                                        else if (valid(globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人市話"])[1]) {
                                                            validMsg = valid(globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人市話"])[1]
                                                        }
                                                        else if (valid(globalContextService.get("OrgManagerPage", "Status")?.value ?? "", ["^.{1,}$"], ["請選擇狀態"])[1]) {
                                                            validMsg = valid(globalContextService.get("OrgManagerPage", "Status")?.value ?? "", ["^.{1,}$"], ["請選擇狀態"])[1]
                                                        }
                                                        else if (valid(isUndefined(globalContextService.get("OrgManagerPage", "UpperOrg")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇上層機構"])[1]) {
                                                            validMsg = valid(isUndefined(globalContextService.get("OrgManagerPage", "UpperOrg")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇上層機構"])[1]
                                                        }
                                                        //#endregion

                                                        //#region 表單驗證後動作
                                                        if (validMsg !== "") {
                                                            console.log(validMsg, globalContextService.get("OrgManagerPage"))
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
                                                            props.orgsAddExecute({
                                                                cascadeId: "",
                                                                name: globalContextService.get("OrgManagerPage", "UnitName"),
                                                                uidRequired: globalContextService.get("OrgManagerPage", "Uid"),
                                                                firstContact: globalContextService.get("OrgManagerPage", "FirstContact"),
                                                                firstContactTelephone: globalContextService.get("OrgManagerPage", "FirstContactTelephone"),
                                                                firstContacCellhone: globalContextService.get("OrgManagerPage", "FirstContacCellhone"),
                                                                status: globalContextService.get("OrgManagerPage", "Status")?.value,
                                                                parentId: globalContextService.get("OrgManagerPage", "UpperOrg")?.value,
                                                                parentName: globalContextService.get("OrgManagerPage", "UpperOrg")?.label,
                                                            })
                                                            close();
                                                        }
                                                        //#endregion
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
                                                            theme={laptop.editFormContainer}
                                                        >
                                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                {/* 新增彈窗 - 單位名稱 UnitName */}
                                                                <TextInput
                                                                    // viewType
                                                                    topLabel={<>單位名稱<Text theme={laptop.unitNameRequired}>(必填)</Text></>}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={""}
                                                                    value={globalContextService.get("OrgManagerPage", "UnitName") ?? rowData.name}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("OrgManagerPage", "UnitName", value);
                                                                    }}
                                                                    theme={laptop.unitName}
                                                                />
                                                                {/* 新增彈窗 - 統一編號 Uid */}
                                                                <TextInput
                                                                    // viewType
                                                                    topLabel={<>統一編號<Text theme={laptop.uidRequired}>(必填)</Text></>}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={""}
                                                                    value={globalContextService.get("OrgManagerPage", "Uid") ?? rowData.uid}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("OrgManagerPage", "Uid", value);
                                                                    }}
                                                                    theme={laptop.uid}
                                                                />
                                                                {/* 新增彈窗 - 主要聯絡人 FirstContact */}
                                                                <TextInput
                                                                    topLabel={<>主要聯絡人<Text theme={laptop.firstContactRequired}>(必填)</Text></>}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={""}
                                                                    value={globalContextService.get("OrgManagerPage", "FirstContact") ?? rowData.firstContact}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("OrgManagerPage", "FirstContact", value);
                                                                    }}
                                                                    theme={laptop.firstContact}
                                                                />
                                                                {/* 新增彈窗 - 主要聯絡人市話 FirstContactTelephone */}
                                                                <TextInput
                                                                    topLabel={<>主要聯絡人市話<Text theme={laptop.firstContactTelephoneRequired}>(必填)</Text></>}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={""}
                                                                    value={globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? rowData.firstContactTelephone}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("OrgManagerPage", "FirstContactTelephone", value);
                                                                    }}
                                                                    theme={laptop.firstContactTelephone}
                                                                />
                                                                {/* 新增彈窗 - 主要聯絡人手機 FirstContacCellhone */}
                                                                <TextInput
                                                                    topLabel={<>主要聯絡人手機</>}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={""}
                                                                    value={globalContextService.get("OrgManagerPage", "FirstContacCellhone") ?? rowData.firstContacCellhone}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("OrgManagerPage", "FirstContacCellhone", value);
                                                                    }}
                                                                    theme={laptop.firstContacCellhone}
                                                                />
                                                                {/* 新增彈窗 - 狀態 Status */}
                                                                <Selector
                                                                    bascDefaultTheme={"DefaultTheme"}
                                                                    topLabel={<>狀態<Text theme={laptop.statusRequired}>(必填)</Text></>}
                                                                    //viewType
                                                                    isSearchable
                                                                    placeholder={"請選擇個案身分"}
                                                                    // isMulti
                                                                    // hideSelectedOptions={false}
                                                                    value={globalContextService.get("OrgManagerPage", "Status") ?? {}}
                                                                    onChange={(e, value, onInitial) => {
                                                                        // console.log(value)
                                                                        globalContextService.set("OrgManagerPage", "Status", value);
                                                                    }}

                                                                    options={[
                                                                        { value: 'hint', label: "請選擇狀態", isDisabled: true },
                                                                        { value: 0, label: '正常' },
                                                                        { value: 1, label: '停用' }
                                                                    ]}
                                                                    menuPosition={true}
                                                                    theme={laptop.status}
                                                                />
                                                                {/* 新增彈窗 - 上層機構 UpperOrg */}
                                                                <TreeSelector
                                                                    bascDefaultTheme={"DefaultTheme"}
                                                                    topLabel={<>上層機構<Text theme={laptop.upperOrgRequired}>(必填)</Text></>}
                                                                    //viewType
                                                                    isSearchable
                                                                    placeholder={"請選擇個案身分"}
                                                                    // isMulti
                                                                    // hideSelectedOptions={false}
                                                                    value={globalContextService.get("OrgManagerPage", "UpperOrg") ?? { value: rowData.parentId, label: rowData.parentName }}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("OrgManagerPage", "UpperOrg", value);
                                                                    }}
                                                                    options={props.OrgsTree}
                                                                    addHeadOptions={[{ value: null, label: "根節點" }]}
                                                                    optionsValueKeyName={"id"}
                                                                    optionsLabelKeyName={"name"}
                                                                    menuPosition={true}
                                                                    theme={laptop.upperOrg}
                                                                />
                                                            </FormRow>
                                                        </FormContainer>
                                                    ),
                                                    theme: laptop.editModal
                                                })
                                                //#endregion
                                            }}
                                        >
                                            {/* 新增按鈕 圖標 */}
                                            <Plus style={laptop.addButtonIcon} />
                                        新增
                                        </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* 分配用戶按鈕容器 */}
                            {
                                // 權限判斷
                                (getParseItemLocalStorage("DFunctions") ?? []).includes("/Base/OrgManager/btnAssignOrgUser") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* 分配用戶按鈕 */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={laptop.assignButton}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                // let checkedRowKeys = globalContextService.get("OrgManagerPage", "CheckedRowKeys");
                                                let checkedRowsData = globalContextService.get("OrgManagerPage", "CheckedRowsData");

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

                                                    props.GetUsersLoadByOrgExecute(rowData.id);
                                                    props.GetAllUsersLoadByOrgExecute("");
                                                    //#region 打開分配用戶 Modal
                                                    props.setOpenAssign(true);// 直接打開彈窗
                                                    //#endregion
                                                }
                                                //#endregion

                                            }}
                                        >
                                            {/* 分配用戶按鈕 圖標 */}
                                            <Assign style={laptop.assignButtonIcon} />
                                            分配用戶
                                        </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* 編輯按鈕容器 */}
                            {
                                // 權限判斷
                                (getParseItemLocalStorage("DFunctions") ?? []).includes("/Base/OrgManager/btnEdit") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* 編輯按鈕 */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={laptop.editButton}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                // let checkedRowKeys = globalContextService.get("OrgManagerPage", "CheckedRowKeys");
                                                let checkedRowsData = globalContextService.get("OrgManagerPage", "CheckedRowsData");

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
                                                            if (valid(globalContextService.get("OrgManagerPage", "UnitName") ?? "", ["^.{1,}$"], ["請輸入單位名稱"])[1]) {
                                                                validMsg = valid(globalContextService.get("OrgManagerPage", "UnitName") ?? "", ["^.{1,}$"], ["請輸入單位名稱"])[1]
                                                            }
                                                            else if (valid(globalContextService.get("OrgManagerPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入統一編號"])[1]) {
                                                                validMsg = valid(globalContextService.get("OrgManagerPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入統一編號"])[1]
                                                            }
                                                            else if (valid(globalContextService.get("OrgManagerPage", "FirstContact") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人"])[1]) {
                                                                validMsg = valid(globalContextService.get("OrgManagerPage", "FirstContact") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人"])[1]
                                                            }
                                                            else if (valid(globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人市話"])[1]) {
                                                                validMsg = valid(globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人市話"])[1]
                                                            }
                                                            else if (valid(globalContextService.get("OrgManagerPage", "Status")?.value ?? "", ["^.{1,}$"], ["請選擇狀態"])[1]) {
                                                                validMsg = valid(globalContextService.get("OrgManagerPage", "Status")?.value ?? "", ["^.{1,}$"], ["請選擇狀態"])[1]
                                                            }
                                                            else if (valid(isUndefined(globalContextService.get("OrgManagerPage", "UpperOrg")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇上層機構"])[1]) {
                                                                validMsg = valid(isUndefined(globalContextService.get("OrgManagerPage", "UpperOrg")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇上層機構"])[1]
                                                            }
                                                            //#endregion

                                                            //#region 表單驗證後動作
                                                            if (validMsg !== "") {
                                                                console.log(validMsg, globalContextService.get("OrgManagerPage"))
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
                                                                props.orgsAddExecute({
                                                                    cascadeId: "",
                                                                    name: globalContextService.get("OrgManagerPage", "UnitName"),
                                                                    uidRequired: globalContextService.get("OrgManagerPage", "Uid"),
                                                                    firstContact: globalContextService.get("OrgManagerPage", "FirstContact"),
                                                                    firstContactTelephone: globalContextService.get("OrgManagerPage", "FirstContactTelephone"),
                                                                    firstContacCellhone: globalContextService.get("OrgManagerPage", "FirstContacCellhone"),
                                                                    status: globalContextService.get("OrgManagerPage", "Status")?.value,
                                                                    parentId: globalContextService.get("OrgManagerPage", "UpperOrg")?.value,
                                                                    parentName: globalContextService.get("OrgManagerPage", "UpperOrg")?.label,
                                                                })
                                                                close();
                                                            }
                                                            //#endregion
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
                                                                theme={laptop.editFormContainer}
                                                            >
                                                                <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                    {/* 編輯彈窗 - 單位名稱 UnitName */}
                                                                    <TextInput
                                                                        viewType
                                                                        topLabel={<>單位名稱<Text theme={laptop.unitNameRequired}>(必填)</Text></>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={""}
                                                                        value={globalContextService.get("OrgManagerPage", "UnitName") ?? rowData.name}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("OrgManagerPage", "UnitName", value);
                                                                        }}
                                                                        theme={laptop.unitName}
                                                                    />
                                                                    {/* 編輯彈窗 - 統一編號 Uid */}
                                                                    <TextInput
                                                                        viewType
                                                                        topLabel={<>統一編號<Text theme={laptop.uidRequired}>(必填)</Text></>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={""}
                                                                        value={globalContextService.get("OrgManagerPage", "Uid") ?? rowData.uid}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("OrgManagerPage", "Uid", value);
                                                                        }}
                                                                        theme={laptop.uid}
                                                                    />
                                                                    {/* 編輯彈窗 - 主要聯絡人 FirstContact */}
                                                                    <TextInput
                                                                        topLabel={<>主要聯絡人<Text theme={laptop.firstContactRequired}>(必填)</Text></>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={""}
                                                                        value={globalContextService.get("OrgManagerPage", "FirstContact") ?? rowData.firstContact}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("OrgManagerPage", "FirstContact", value);
                                                                        }}
                                                                        theme={laptop.firstContact}
                                                                    />
                                                                    {/* 編輯彈窗 - 主要聯絡人市話 FirstContactTelephone */}
                                                                    <TextInput
                                                                        topLabel={<>主要聯絡人市話<Text theme={laptop.firstContactTelephoneRequired}>(必填)</Text></>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={""}
                                                                        value={globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? rowData.firstContactTelephone}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("OrgManagerPage", "FirstContactTelephone", value);
                                                                        }}
                                                                        theme={laptop.firstContactTelephone}
                                                                    />
                                                                    {/* 編輯彈窗 - 主要聯絡人手機 FirstContacCellhone */}
                                                                    <TextInput
                                                                        topLabel={<>主要聯絡人手機</>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={""}
                                                                        value={globalContextService.get("OrgManagerPage", "FirstContacCellhone") ?? rowData.firstContacCellhone}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("OrgManagerPage", "FirstContacCellhone", value);
                                                                        }}
                                                                        theme={laptop.firstContacCellhone}
                                                                    />
                                                                    {/* 編輯彈窗 - 狀態 Status */}
                                                                    <Selector
                                                                        bascDefaultTheme={"DefaultTheme"}
                                                                        topLabel={<>狀態<Text theme={laptop.statusRequired}>(必填)</Text></>}
                                                                        //viewType
                                                                        isSearchable
                                                                        placeholder={"請選擇個案身分"}
                                                                        // isMulti
                                                                        // hideSelectedOptions={false}
                                                                        value={globalContextService.get("OrgManagerPage", "Status") ?? { value: rowData.status, label: rowData.status === 0 ? '正常' : '停用' }}
                                                                        onChange={(e, value, onInitial) => {
                                                                            // console.log(value)
                                                                            globalContextService.set("OrgManagerPage", "Status", value);
                                                                        }}

                                                                        options={[
                                                                            { value: 'hint', label: "請選擇狀態", isDisabled: true },
                                                                            { value: 0, label: '正常' },
                                                                            { value: 1, label: '停用' }
                                                                        ]}
                                                                        menuPosition={true}
                                                                        theme={laptop.status}
                                                                    />
                                                                    {/* 編輯彈窗 - 上層機構 UpperOrg */}
                                                                    <TreeSelector
                                                                        bascDefaultTheme={"DefaultTheme"}
                                                                        topLabel={<>上層機構<Text theme={laptop.upperOrgRequired}>(必填)</Text></>}
                                                                        //viewType
                                                                        isSearchable
                                                                        placeholder={"請選擇個案身分"}
                                                                        // isMulti
                                                                        // hideSelectedOptions={false}
                                                                        value={globalContextService.get("OrgManagerPage", "UpperOrg") ?? { value: rowData.parentId, label: rowData.parentName }}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("OrgManagerPage", "UpperOrg", value);
                                                                        }}
                                                                        options={props.OrgsTree}
                                                                        addHeadOptions={[{ value: null, label: "根節點" }]}
                                                                        optionsValueKeyName={"id"}
                                                                        optionsLabelKeyName={"name"}
                                                                        menuPosition={true}
                                                                        theme={laptop.upperOrg}
                                                                    />
                                                                </FormRow>
                                                            </FormContainer>
                                                        ),
                                                        theme: laptop.editModal
                                                    })
                                                    //#endregion
                                                }
                                                //#endregion
                                            }}
                                        >
                                            {/* 編輯按鈕 圖標 */}
                                            <Edit style={laptop.editButtonIcon} />
                                編輯
                                </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* 刪除按鈕容器 */}
                            {
                                // 權限判斷
                                (getParseItemLocalStorage("DFunctions") ?? []).includes("/Base/OrgManager/btnDel") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* 刪除按鈕 */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={laptop.delButton}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                let checkedRowKeys = globalContextService.get("OrgManagerPage", "CheckedRowKeys");
                                                let checkedRowsData = globalContextService.get("OrgManagerPage", "CheckedRowsData");

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
                                                            props.orgsDelExecute(checkedRowKeys);
                                                            close();
                                                        }
                                                    })
                                                }
                                                //#endregion
                                            }}
                                        >
                                            {/* 刪除按鈕 圖標 */}
                                            <Del style={laptop.delButtonIcon} />
                                刪除
                                </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* 刷新按鈕容器 */}
                            {
                                // 權限判斷
                                (getParseItemLocalStorage("DFunctions") ?? []).includes("/Base/OrgManager/btnRefresh") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* 刷新按鈕 */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={laptop.refreshButton}
                                            onClick={(e) => {
                                                props.controllGCS("Refresh", "API");
                                                props.GetSubOrgsExecute(true, "");
                                                globalContextService.set("OrgManagerPage", "orgId", "");
                                                globalContextService.get("OrgManagerPage", "setSelectStateForTreeSelector")("");
                                            }}
                                        >
                                            {/* 刷新按鈕 圖標 */}
                                            <Refresh style={laptop.refreshButtonIcon} />
                                刷新
                                </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* id/描述 勾選框 IdDescribe*/}
                            <CheckboxX
                                baseDefaultTheme={"DefaultTheme"}
                                text={"id/描述"}
                                theme={laptop.idDescribe}
                                checked={globalContextService.get("OrgManagerPage", "IdDescribe") ?? false}
                                onChange={(e, checked, onInitial) => {
                                    setIdDescribe(checked)
                                    globalContextService.set("OrgManagerPage", "IdDescribe", checked);
                                }}
                            />
                        </MainPageTitleBar>
                    </>
                }
            >

                {/* 左側選單與右側 Table 容器 */}
                <Container
                    bascDefaultTheme={"DefaultTheme"}
                    theme={laptop.leftMenuRightTableContainer}
                >
                    {/* 左側選單容器 */}
                    <SubContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.leftMenuContainer}
                    >
                        <BasicContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptop.leftMenuSubContainer}
                        >
                            {/* 查詢所有機構 */}
                            <Text
                                bascDefaultTheme={"DefaultTheme"}
                                theme={laptop.getSubOrgsExecute}
                                onClick={() => {
                                    if (globalContextService.get("OrgManagerPage", "orgId") !== "") {
                                        props.GetSubOrgsExecute(true, "");
                                        globalContextService.set("OrgManagerPage", "orgId", "");
                                        globalContextService.get("OrgManagerPage", "setSelectStateForTreeSelector")("");
                                    }
                                }}
                            >
                                {`所有機構 >>`}
                            </Text>

                            {/* 左側選單容器 ScrollBar */}
                            <ScrollBar
                                theme={laptop.leftMenuSubScrollBar}
                            >
                                {/* 在此遍歷選單(機構)內容 */}
                                <OrgsTree
                                    // theme={{}}
                                    OrgsTree={props.OrgsTree}
                                    pageName={"OrgManagerPage"}
                                    GetSubDataExecute={props.GetSubOrgsExecute}
                                />
                            </ScrollBar>
                        </BasicContainer>
                    </SubContainer>

                    {/* 右側 Table 容器 */}
                    <SubContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.rightTableContainer}
                    >
                        <BasicContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptop.rightTableSubContainer}
                        >
                            <OldTable
                                dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                                dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                                    if (globalContextService.get("OrgManagerPage", "orgId") !== globalContextService.get("OrgManagerPage", "TableCheckedClearKey")) {
                                        globalContextService.remove("OrgManagerPage", "CheckedRowKeys");
                                        globalContextService.remove("OrgManagerPage", "CheckedRowsData");
                                    }
                                }}
                                checkbox={true}
                                checked={globalContextService.get("OrgManagerPage", "CheckedRowKeys") && globalContextService.get("OrgManagerPage", "CheckedRowKeys")}
                                checkedRowKeyName={"id"}
                                checkboxOnChecked={
                                    (checkedRowKeys, checkedRows) => {
                                        // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                        globalContextService.set("OrgManagerPage", "CheckedRowKeys", checkedRowKeys);
                                        globalContextService.set("OrgManagerPage", "CheckedRowsData", checkedRows);
                                        //#region 必須要在勾選項"有異動"之後除˙存一個可判斷值，以保持"已異動勾選項"不被重置
                                        globalContextService.set("OrgManagerPage", "TableCheckedClearKey", globalContextService.get("OrgManagerPage", "orgId"));
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
                                            title: '單位名稱',
                                            width: "600px",
                                            dataIndex: 'name',
                                            sorter: (a, b) => a.name.length - b.name.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '統一編號',
                                            width: "120px",
                                            dataIndex: 'uid',
                                            // sorter: (a, b) => a.uid.length - b.uid.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '主要聯絡人',
                                            width: "97px",
                                            dataIndex: 'firstContact',
                                            // sorter: (a, b) => a.firstContact.length - b.firstContact.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '主要聯絡人市話',
                                            width: "123px",
                                            dataIndex: 'firstContactTelephone ',
                                            // sorter: (a, b) => a.firstContactTelephone.length - b.firstContactTelephone.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '主要聯絡人手機',
                                            width: "123px",
                                            dataIndex: 'firstContacCellhone',
                                            // sorter: (a, b) => a.firstContacCellhone.length - b.firstContacCellhone.length,
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
                                            title: '單位層級',
                                            width: "120px",
                                            dataIndex: 'cascadeId',
                                            sorter: (a, b) => a.name.length - b.name.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '上級部門',
                                            width: "600px",
                                            dataIndex: 'parentName',
                                            sorter: (a, b) => a.name.length - b.name.length,
                                            // fixed: 'left',
                                        },
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
                                                                theme={{
                                                                    container: {
                                                                        basic: (style, props) => ({
                                                                            ...style,
                                                                            margin: "0",
                                                                            padding: "0px 7px",
                                                                            fontSize: "12px",
                                                                            lineHeight: "20px"
                                                                        }),
                                                                        hover: {}
                                                                    }
                                                                }}
                                                                text={"停用"}
                                                            />
                                                            :
                                                            <Tag
                                                                baseDefaultTheme={"SuccessTheme"}
                                                                theme={{
                                                                    container: {
                                                                        basic: (style, props) => ({
                                                                            ...style,
                                                                            margin: "0",
                                                                            padding: "0px 7px",
                                                                            fontSize: "12px",
                                                                            lineHeight: "20px"
                                                                        }),
                                                                        hover: {}
                                                                    }
                                                                }}
                                                                text={"正常"}
                                                            />
                                                        }

                                                        {/* 編輯按鈕 */}
                                                        {
                                                            // 權限判斷
                                                            (getParseItemLocalStorage("DFunctions") ?? []).includes("/Base/OrgManager/btnEdit") &&
                                                            (

                                                                < NativeLineButton
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    disable={false}
                                                                    type="button" // 防止提交
                                                                    theme={laptop.tableEditButton}
                                                                    onClick={() => {
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
                                                                                if (valid(globalContextService.get("OrgManagerPage", "UnitName") ?? "", ["^.{1,}$"], ["請輸入單位名稱"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("OrgManagerPage", "UnitName") ?? "", ["^.{1,}$"], ["請輸入單位名稱"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("OrgManagerPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入統一編號"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("OrgManagerPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入統一編號"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("OrgManagerPage", "FirstContact") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("OrgManagerPage", "FirstContact") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人市話"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人市話"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("OrgManagerPage", "Status")?.value ?? "", ["^.{1,}$"], ["請選擇狀態"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("OrgManagerPage", "Status")?.value ?? "", ["^.{1,}$"], ["請選擇狀態"])[1]
                                                                                }
                                                                                else if (valid(isUndefined(globalContextService.get("OrgManagerPage", "UpperOrg")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇上層機構"])[1]) {
                                                                                    validMsg = valid(isUndefined(globalContextService.get("OrgManagerPage", "UpperOrg")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇上層機構"])[1]
                                                                                }
                                                                                //#endregion

                                                                                //#region 表單驗證後動作
                                                                                if (validMsg !== "") {
                                                                                    console.log(validMsg, globalContextService.get("OrgManagerPage"))
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
                                                                                    props.orgsAddExecute({
                                                                                        cascadeId: "",
                                                                                        name: globalContextService.get("OrgManagerPage", "UnitName"),
                                                                                        uidRequired: globalContextService.get("OrgManagerPage", "Uid"),
                                                                                        firstContact: globalContextService.get("OrgManagerPage", "FirstContact"),
                                                                                        firstContactTelephone: globalContextService.get("OrgManagerPage", "FirstContactTelephone"),
                                                                                        firstContacCellhone: globalContextService.get("OrgManagerPage", "FirstContacCellhone"),
                                                                                        status: globalContextService.get("OrgManagerPage", "Status")?.value,
                                                                                        parentId: globalContextService.get("OrgManagerPage", "UpperOrg")?.value,
                                                                                        parentName: globalContextService.get("OrgManagerPage", "UpperOrg")?.label,
                                                                                    })
                                                                                    close();
                                                                                }
                                                                                //#endregion
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
                                                                                    theme={laptop.editFormContainer}
                                                                                >
                                                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                                        {/* 編輯彈窗 - 單位名稱 UnitName */}
                                                                                        <TextInput
                                                                                            viewType
                                                                                            topLabel={<>單位名稱<Text theme={laptop.unitNameRequired}>(必填)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("OrgManagerPage", "UnitName") ?? rowData.name}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("OrgManagerPage", "UnitName", value);
                                                                                            }}
                                                                                            theme={laptop.unitName}
                                                                                        />
                                                                                        {/* 編輯彈窗 - 統一編號 Uid */}
                                                                                        <TextInput
                                                                                            viewType
                                                                                            topLabel={<>統一編號<Text theme={laptop.uidRequired}>(必填)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("OrgManagerPage", "Uid") ?? rowData.uid}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("OrgManagerPage", "Uid", value);
                                                                                            }}
                                                                                            theme={laptop.uid}
                                                                                        />
                                                                                        {/* 編輯彈窗 - 主要聯絡人 FirstContact */}
                                                                                        <TextInput
                                                                                            topLabel={<>主要聯絡人<Text theme={laptop.firstContactRequired}>(必填)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("OrgManagerPage", "FirstContact") ?? rowData.firstContact}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("OrgManagerPage", "FirstContact", value);
                                                                                            }}
                                                                                            theme={laptop.firstContact}
                                                                                        />
                                                                                        {/* 編輯彈窗 - 主要聯絡人市話 FirstContactTelephone */}
                                                                                        <TextInput
                                                                                            topLabel={<>主要聯絡人市話<Text theme={laptop.firstContactTelephoneRequired}>(必填)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? rowData.firstContactTelephone}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("OrgManagerPage", "FirstContactTelephone", value);
                                                                                            }}
                                                                                            theme={laptop.firstContactTelephone}
                                                                                        />
                                                                                        {/* 編輯彈窗 - 主要聯絡人手機 FirstContacCellhone */}
                                                                                        <TextInput
                                                                                            topLabel={<>主要聯絡人手機</>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("OrgManagerPage", "FirstContacCellhone") ?? rowData.firstContacCellhone}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("OrgManagerPage", "FirstContacCellhone", value);
                                                                                            }}
                                                                                            theme={laptop.firstContacCellhone}
                                                                                        />
                                                                                        {/* 編輯彈窗 - 狀態 Status */}
                                                                                        <Selector
                                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                                            topLabel={<>狀態<Text theme={laptop.statusRequired}>(必填)</Text></>}
                                                                                            //viewType
                                                                                            isSearchable
                                                                                            placeholder={"請選擇個案身分"}
                                                                                            // isMulti
                                                                                            // hideSelectedOptions={false}
                                                                                            value={globalContextService.get("OrgManagerPage", "Status") ?? { value: rowData.status, label: rowData.status === 0 ? '正常' : '停用' }}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                // console.log(value)
                                                                                                globalContextService.set("OrgManagerPage", "Status", value);
                                                                                            }}

                                                                                            options={[
                                                                                                { value: 'hint', label: "請選擇狀態", isDisabled: true },
                                                                                                { value: 0, label: '正常' },
                                                                                                { value: 1, label: '停用' }
                                                                                            ]}
                                                                                            menuPosition={true}
                                                                                            theme={laptop.status}
                                                                                        />
                                                                                        {/* 編輯彈窗 - 上層機構 UpperOrg */}
                                                                                        <TreeSelector
                                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                                            topLabel={<>上層機構<Text theme={laptop.upperOrgRequired}>(必填)</Text></>}
                                                                                            //viewType
                                                                                            isSearchable
                                                                                            placeholder={"請選擇個案身分"}
                                                                                            // isMulti
                                                                                            // hideSelectedOptions={false}
                                                                                            value={globalContextService.get("OrgManagerPage", "UpperOrg") ?? { value: rowData.parentId, label: rowData.parentName }}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("OrgManagerPage", "UpperOrg", value);
                                                                                            }}
                                                                                            options={props.OrgsTree}
                                                                                            addHeadOptions={[{ value: null, label: "根節點" }]}
                                                                                            optionsValueKeyName={"id"}
                                                                                            optionsLabelKeyName={"name"}
                                                                                            menuPosition={true}
                                                                                            theme={laptop.upperOrg}
                                                                                        />
                                                                                    </FormRow>
                                                                                </FormContainer>
                                                                            ),
                                                                            theme: laptop.editModal
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
                                                            (getParseItemLocalStorage("DFunctions") ?? []).includes("/Base/OrgManager/btnEnableAndDisable") &&
                                                            (rowData.status !== 1 ?
                                                                <>
                                                                    {/* 停用按鈕 */}
                                                                    <NativeLineButton
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        disable={false}
                                                                        type="button" // 防止提交
                                                                        theme={laptop.disableButton}
                                                                        onClick={() => {
                                                                            props.OrgsUpdateExecute({ ...rowData, status: 1 })
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
                                                                        theme={laptop.enableButton}
                                                                        onClick={() => {
                                                                            props.OrgsUpdateExecute({ ...rowData, status: 0 })
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
                                data={props.SubOrgs.data}
                                clickPage={(currentPage, pageSize) => {
                                }}
                            />
                        </BasicContainer>
                    </SubContainer>
                </Container>

            </MainPageContainer>

            {/* 分配用戶彈窗 */}
            {props.OpenAssign &&
                <AssignUserTitleModal
                    setOpenAssign={props.setOpenAssign}
                    AllUsersLoadByOrg={props.AllUsersLoadByOrg}
                    UsersLoadByOrg={props.UsersLoadByOrg}
                    GetUsersLoadByOrgExecute={props.GetUsersLoadByOrgExecute}
                    GetAllUsersLoadByOrgExecute={props.GetAllUsersLoadByOrgExecute}
                    controllGCS={props.controllGCS}
                    AssignOrgUsersExecute={props.AssignOrgUsersExecute}
                    AssignOrgUsersPending={props.AssignOrgUsersPending}
                />
            }
        </>

    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`

