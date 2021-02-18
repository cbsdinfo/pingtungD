import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { AssignModuleToRoleTitleModal, AssignRoleToUsersTitleModal, MainPageContainer, MainPageTitleBar } from '../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import { FormContainer, FormRow, globalContextService, modalsService, NativeLineButton, SubContainer, TextInput, Text, Selector, TreeSelector, CheckboxX, BasicContainer, OldTable, Tag, DropDown } from '../../../../Components';
import { ReactComponent as Search } from '../../../../Assets/img/CasePage/Search.svg'
import { ReactComponent as Plus } from '../../../../Assets/img/CasePage/Plus.svg'
import { ReactComponent as Assign } from '../../../../Assets/img/RoleManagerPage/Assign.svg'
import { ReactComponent as Del } from '../../../../Assets/img/RoleManagerPage/Del.svg'
import { ReactComponent as Edit } from '../../../../Assets/img/RoleManagerPage/Edit.svg'
import { ReactComponent as Down } from '../../../../Assets/img/RoleManagerPage/Down.svg'
import { ReactComponent as Group } from '../../../../Assets/img/RoleManagerPage/Group.svg'
import { ReactComponent as RoleMoudle } from '../../../../Assets/img/RoleManagerPage/RoleMoudle.svg'
import { getParseItemLocalStorage, valid } from '../../../../Handlers';
import isUndefined from 'lodash/isUndefined';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { roleManager: { rwd: { laptopL } } } } = Theme;

    const [IdDescribe, setIdDescribe] = useState(globalContextService.get("RoleManagerPage", "IdDescribe") ?? false);

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"權限管理"}
                            theme={laptopL.titleBar}
                            onSubmit={(e) => {
                                props.GetRolesExecute(true, 1, 99999, globalContextService.get("RoleManagerPage", "Keyword"));
                            }}
                        >
                            {/* 一般輸入框 請輸入關鍵字  */}
                            <TextInput
                                bascDefaultTheme={"DefaultTheme"}
                                theme={laptopL.keyword}
                                type="text"
                                placeholder={"請輸入關鍵字"}
                                rightIcon={
                                    <Search
                                        style={laptopL.keywordRightIcon}
                                        onClick={(e) => {
                                            props.GetRolesExecute(true, 1, 99999, globalContextService.get("RoleManagerPage", "Keyword"));
                                        }}
                                    />
                                }
                                value={globalContextService.get("RoleManagerPage", "Keyword") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RoleManagerPage", "Keyword", value);
                                }}
                            />
                            {/* 新增按鈕容器 */}
                            {
                                // 權限判斷
                                (getParseItemLocalStorage("Functions") ?? []).includes("/Base/RoleManager/btnAdd") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* 新增按鈕 */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={laptopL.addButton}
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
                                                        if (valid(globalContextService.get("RoleManagerPage", "RoleName") ?? "", ["^.{1,}$"], ["請輸入角色名稱"])[1]) {
                                                            validMsg = valid(globalContextService.get("RoleManagerPage", "RoleName") ?? "", ["^.{1,}$"], ["請輸入角色名稱"])[1]
                                                        }
                                                        else if (valid(isUndefined(globalContextService.get("RoleManagerPage", "Status")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇狀態"])[1]) {
                                                            validMsg = valid(isUndefined(globalContextService.get("RoleManagerPage", "Status")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇狀態"])[1]
                                                        }
                                                        //#region 表單驗證後動作
                                                        if (validMsg !== "") {
                                                            console.log(validMsg, globalContextService.get("RoleManagerPage"))
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
                                                            props.RolesAddExecute({
                                                                name: globalContextService.get("RoleManagerPage", "RoleName"),
                                                                status: globalContextService.get("RoleManagerPage", "Status")?.value,
                                                                organizationIds: "",
                                                                organizations: ""
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
                                                            theme={laptopL.editFormContainer}
                                                        >
                                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                {/* 新增彈窗 - 角色名稱 RoleName */}
                                                                <TextInput
                                                                    // viewType
                                                                    topLabel={<>角色名稱<Text theme={laptopL.roleNameRequired}>(必填)</Text></>}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={""}
                                                                    value={globalContextService.get("RoleManagerPage", "RoleName") ?? rowData.name}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("RoleManagerPage", "RoleName", value);
                                                                    }}
                                                                    theme={laptopL.roleName}
                                                                />
                                                                {/* 新增彈窗 - 狀態 Status */}
                                                                <Selector
                                                                    bascDefaultTheme={"DefaultTheme"}
                                                                    topLabel={<>狀態<Text theme={laptopL.statusRequired}>(必填)</Text></>}
                                                                    //viewType
                                                                    isSearchable
                                                                    placeholder={"請選擇個案身分"}
                                                                    // isMulti
                                                                    // hideSelectedOptions={false}
                                                                    value={globalContextService.get("RoleManagerPage", "Status") ?? {}}
                                                                    onChange={(e, value, onInitial) => {
                                                                        // console.log(value)
                                                                        globalContextService.set("RoleManagerPage", "Status", value);
                                                                    }}

                                                                    options={[
                                                                        { value: 'hint', label: "請選擇狀態", isDisabled: true },
                                                                        { value: 0, label: '正常' },
                                                                        { value: 1, label: '停用' }
                                                                    ]}
                                                                    menuPosition={true}
                                                                    theme={laptopL.status}
                                                                />
                                                            </FormRow>
                                                        </FormContainer>
                                                    ),
                                                    theme: laptopL.editModal
                                                })
                                                //#endregion
                                            }}
                                        >
                                            {/* 新增按鈕 圖標 */}
                                            <Plus style={laptopL.addButtonIcon} />
                                        新增
                                        </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* 編輯按鈕容器 */}
                            {
                                // 權限判斷
                                (getParseItemLocalStorage("Functions") ?? []).includes("/Base/RoleManager/btnEdit") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* 編輯按鈕 */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={laptopL.editButton}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                // let checkedRowKeys = globalContextService.get("RoleManagerPage", "CheckedRowKeys");
                                                let checkedRowsData = globalContextService.get("RoleManagerPage", "CheckedRowsData");

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
                                                            let validMsg = "";
                                                            if (valid(globalContextService.get("RoleManagerPage", "RoleName") ?? "", ["^.{1,}$"], ["請輸入角色名稱"])[1]) {
                                                                validMsg = valid(globalContextService.get("RoleManagerPage", "RoleName") ?? "", ["^.{1,}$"], ["請輸入角色名稱"])[1]
                                                            }
                                                            else if (valid(isUndefined(globalContextService.get("RoleManagerPage", "Status")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇狀態"])[1]) {
                                                                validMsg = valid(isUndefined(globalContextService.get("RoleManagerPage", "Status")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇狀態"])[1]
                                                            }
                                                            //#endregion

                                                            //#region 表單驗證後動作
                                                            if (validMsg !== "") {
                                                                console.log(validMsg, globalContextService.get("RoleManagerPage"))
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
                                                                props.RolesUpdateExecute({
                                                                    ...rowData,
                                                                    name: globalContextService.get("RoleManagerPage", "RoleName"),
                                                                    status: globalContextService.get("RoleManagerPage", "Status")?.value,
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
                                                                theme={laptopL.editFormContainer}
                                                            >
                                                                <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                    {/* 編輯彈窗 - 角色名稱 RoleName */}
                                                                    <TextInput
                                                                        // viewType
                                                                        topLabel={<>角色名稱<Text theme={laptopL.roleNameRequired}>(必填)</Text></>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={""}
                                                                        value={globalContextService.get("RoleManagerPage", "RoleName") ?? rowData.name}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("RoleManagerPage", "RoleName", value);
                                                                        }}
                                                                        theme={laptopL.roleName}
                                                                    />
                                                                    {/* 編輯彈窗 - 狀態 Status */}
                                                                    <Selector
                                                                        bascDefaultTheme={"DefaultTheme"}
                                                                        topLabel={<>狀態<Text theme={laptopL.statusRequired}>(必填)</Text></>}
                                                                        //viewType
                                                                        isSearchable
                                                                        placeholder={"請選擇個案身分"}
                                                                        // isMulti
                                                                        // hideSelectedOptions={false}
                                                                        value={globalContextService.get("RoleManagerPage", "Status") ?? { value: rowData.status, label: rowData.status === 0 ? '正常' : '停用' }}
                                                                        onChange={(e, value, onInitial) => {
                                                                            // console.log(value)
                                                                            globalContextService.set("RoleManagerPage", "Status", value);
                                                                        }}

                                                                        options={[
                                                                            { value: 'hint', label: "請選擇狀態", isDisabled: true },
                                                                            { value: 0, label: '正常' },
                                                                            { value: 1, label: '停用' }
                                                                        ]}
                                                                        menuPosition={true}
                                                                        theme={laptopL.status}
                                                                    />
                                                                </FormRow>
                                                            </FormContainer>
                                                        ),
                                                        theme: laptopL.editModal
                                                    })
                                                    //#endregion
                                                }
                                                //#endregion
                                            }}
                                        >
                                            {/* 編輯按鈕 圖標 */}
                                            <Edit style={laptopL.editButtonIcon} />
                                            編輯
                                        </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* 刪除按鈕容器 */}
                            {
                                // 權限判斷
                                (getParseItemLocalStorage("Functions") ?? []).includes("/Base/RoleManager/btnDel") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* 刪除按鈕 */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={laptopL.delButton}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                let checkedRowKeys = globalContextService.get("RoleManagerPage", "CheckedRowKeys");
                                                let checkedRowsData = globalContextService.get("RoleManagerPage", "CheckedRowsData");

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
                                                            props.RolesDelExecute(checkedRowKeys);
                                                            close();
                                                        }
                                                    })
                                                }
                                                //#endregion
                                            }}
                                        >
                                            {/* 刪除按鈕 圖標 */}
                                            <Del style={laptopL.delButtonIcon} />
                                刪除
                                </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* 角色分配按鈕容器 */}
                            {
                                // 權限判斷 btnAccessModule、btnRoleAccessUser 其中一個存在
                                ((getParseItemLocalStorage("Functions") ?? []).includes("/Base/RoleManager/btnAccessModule") || (getParseItemLocalStorage("Functions") ?? []).includes("/Base/RoleManager/btnRoleAccessUser")) &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        <DropDown
                                            dropDownItem={
                                                <>
                                                    {/* DropDown 項目容器 */}
                                                    <BasicContainer
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={laptopL.dropDownItemContainer}>
                                                        {/* DropDown 子項目 */}
                                                        <Text
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.dropDownSubItemContainer}
                                                            onClick={() => {
                                                                // let checkedRowKeys = globalContextService.get("RoleManagerPage", "CheckedRowKeys");
                                                                let checkedRowsData = globalContextService.get("RoleManagerPage", "CheckedRowsData");

                                                                //#region 都沒選、選超過一個
                                                                if ((checkedRowsData?.length ?? 0) === 0 || checkedRowsData?.length > 1) {
                                                                    modalsService.infoModal.error({
                                                                        iconRightText: "只能選一個角色進行添加。",
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

                                                                    props.GetOrgsExecute();
                                                                    props.GetSubUsersExecute(true, "");
                                                                    //#region 打開角色分配 Modal
                                                                    props.setOpenAssign("為用戶添加角色");// 直接打開彈窗
                                                                    //#endregion
                                                                }
                                                                //#endregion
                                                            }}
                                                        >
                                                            <Group style={laptopL.dropDownSubItemIcon} />
                                                            為用戶添加角色
                                                        </Text>

                                                        {/* DropDown 子項目 */}
                                                        <Text
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.dropDownSubItemContainer}
                                                            onClick={() => {
                                                                // let checkedRowKeys = globalContextService.get("RoleManagerPage", "CheckedRowKeys");
                                                                let checkedRowsData = globalContextService.get("RoleManagerPage", "CheckedRowsData");
                                                                console.log(checkedRowsData?.length)
                                                                //#region 都沒選、選超過一個
                                                                if ((checkedRowsData?.length ?? 0) === 0 || checkedRowsData?.length > 1) {
                                                                    modalsService.infoModal.error({
                                                                        iconRightText: "只能選一個角色進行分配",
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
                                                                    props.GetAllmodulesExecute();
                                                                    props.GetSelectedModulesExecute(rowData.id);
                                                                    props.GetAllMenusExecute();
                                                                    props.GetSelectedMenusExecute(rowData.id);
                                                                    //#region 打開角色分配 Modal
                                                                    props.setOpenAssign("為角色分配模塊");// 直接打開彈窗
                                                                    //#endregion
                                                                }
                                                                //#endregion
                                                            }}
                                                        >
                                                            <RoleMoudle style={laptopL.dropDownSubItemIcon} />
                                                            為角色分配模塊
                                                        </Text>
                                                    </BasicContainer>
                                                </>
                                            }
                                        >
                                            {/* 角色分配按鈕 */}
                                            <NativeLineButton
                                                baseDefaultTheme={"DefaultTheme"}
                                                disable={false}
                                                type="button" // 防止提交
                                                theme={laptopL.assignButton}
                                                onClick={(e) => { e.preventDefault(); }}
                                            >
                                                角色分配
                                                {/* 角色分配按鈕 圖標 */}
                                                <Down style={laptopL.assignButtonIcon} />
                                            </NativeLineButton>
                                        </DropDown>
                                    </SubContainer>
                                )
                            }

                            {/* id/描述 勾選框 IdDescribe*/}
                            <CheckboxX
                                baseDefaultTheme={"DefaultTheme"}
                                text={"id/描述"}
                                theme={laptopL.idDescribe}
                                checked={globalContextService.get("RoleManagerPage", "IdDescribe") ?? false}
                                onChange={(e, checked, onInitial) => {
                                    setIdDescribe(checked)
                                    globalContextService.set("RoleManagerPage", "IdDescribe", checked);
                                }}
                            />
                        </MainPageTitleBar>
                    </>
                }
            >

                {/* Table 容器 */}
                <BasicContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={laptopL.tableContainer}
                >
                    <OldTable
                        dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                        dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                            if (globalContextService.get("RoleManagerPage", "orgId") !== globalContextService.get("RoleManagerPage", "TableCheckedClearKey")) {
                                globalContextService.remove("RoleManagerPage", "CheckedRowKeys");
                                globalContextService.remove("RoleManagerPage", "CheckedRowsData");
                            }
                        }}
                        checkbox={true}
                        checked={globalContextService.get("RoleManagerPage", "CheckedRowKeys") && globalContextService.get("RoleManagerPage", "CheckedRowKeys")}
                        checkedRowKeyName={"id"}
                        checkboxOnChecked={
                            (checkedRowKeys, checkedRows) => {
                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                globalContextService.set("RoleManagerPage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("RoleManagerPage", "CheckedRowsData", checkedRows);
                                //#region 必須要在勾選項"有異動"之後除˙存一個可判斷值，以保持"已異動勾選項"不被重置
                                globalContextService.set("RoleManagerPage", "TableCheckedClearKey", globalContextService.get("RoleManagerPage", "orgId"));
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
                                    title: '角色名稱',
                                    width: "100px",
                                    dataIndex: 'name',
                                    sorter: (a, b) => a.name.length - b.name.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '用戶列表',
                                    width: "816px",
                                    dataIndex: '',
                                    // sorter: (a, b) => a.carType.length - b.carType.length,
                                    // fixed: 'left',
                                    render: (rowData) => {
                                        return (rowData?.users?.data ?? []).map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Tag
                                                        baseDefaultTheme={"PrimaryTheme"}
                                                        theme={laptopL.tableUserTag}
                                                        text={item?.name}
                                                    />
                                                </React.Fragment>
                                            )
                                        })
                                    }
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
                                    width: "256px",
                                    // dataIndex: 'parentName',
                                    // sorter: (a, b) => a.name.length - b.name.length,
                                    fixed: 'right',
                                    render: (rowData) => {
                                        return (
                                            <>
                                                {rowData.status === 1 ?
                                                    <Tag
                                                        baseDefaultTheme={"SecondaryTheme"}
                                                        theme={laptopL.tableDisableTag}
                                                        text={"停用"}
                                                    />
                                                    :
                                                    <Tag
                                                        baseDefaultTheme={"SuccessTheme"}
                                                        theme={laptopL.tableEnableTag}
                                                        text={"正常"}
                                                    />
                                                }

                                                {/* 編輯按鈕 */}
                                                {
                                                    // 權限判斷
                                                    (getParseItemLocalStorage("Functions") ?? []).includes("/Base/RoleManager/btnEdit") &&
                                                    (
                                                        < NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // 防止提交
                                                            theme={laptopL.tableEditButton}
                                                            onClick={() => {
                                                                // let rowData = { ...checkedRowsData[0] };
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
                                                                        if (valid(globalContextService.get("RoleManagerPage", "RoleName") ?? "", ["^.{1,}$"], ["請輸入角色名稱"])[1]) {
                                                                            validMsg = valid(globalContextService.get("RoleManagerPage", "RoleName") ?? "", ["^.{1,}$"], ["請輸入角色名稱"])[1]
                                                                        }
                                                                        else if (valid(isUndefined(globalContextService.get("RoleManagerPage", "Status")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇狀態"])[1]) {
                                                                            validMsg = valid(isUndefined(globalContextService.get("RoleManagerPage", "Status")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇狀態"])[1]
                                                                        }
                                                                        if (validMsg !== "") {
                                                                            console.log(validMsg, globalContextService.get("RoleManagerPage"))
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
                                                                            props.RolesUpdateExecute({
                                                                                ...rowData,
                                                                                name: globalContextService.get("RoleManagerPage", "RoleName"),
                                                                                status: globalContextService.get("RoleManagerPage", "Status")?.value,
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
                                                                            theme={laptopL.editFormContainer}
                                                                        >
                                                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                                {/* 編輯彈窗 - 角色名稱 RoleName */}
                                                                                <TextInput
                                                                                    // viewType
                                                                                    topLabel={<>角色名稱<Text theme={laptopL.roleNameRequired}>(必填)</Text></>}
                                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                                    type="text"
                                                                                    placeholder={""}
                                                                                    value={globalContextService.get("RoleManagerPage", "RoleName") ?? rowData.name}
                                                                                    onChange={(e, value, onInitial) => {
                                                                                        globalContextService.set("RoleManagerPage", "RoleName", value);
                                                                                    }}
                                                                                    theme={laptopL.roleName}
                                                                                />
                                                                                {/* 編輯彈窗 - 狀態 Status */}
                                                                                <Selector
                                                                                    bascDefaultTheme={"DefaultTheme"}
                                                                                    topLabel={<>狀態<Text theme={laptopL.statusRequired}>(必填)</Text></>}
                                                                                    //viewType
                                                                                    isSearchable
                                                                                    placeholder={"請選擇個案身分"}
                                                                                    // isMulti
                                                                                    // hideSelectedOptions={false}
                                                                                    value={globalContextService.get("RoleManagerPage", "Status") ?? { value: rowData.status, label: rowData.status === 0 ? '正常' : '停用' }}
                                                                                    onChange={(e, value, onInitial) => {
                                                                                        // console.log(value)
                                                                                        globalContextService.set("RoleManagerPage", "Status", value);
                                                                                    }}

                                                                                    options={[
                                                                                        { value: 'hint', label: "請選擇狀態", isDisabled: true },
                                                                                        { value: 0, label: '正常' },
                                                                                        { value: 1, label: '停用' }
                                                                                    ]}
                                                                                    menuPosition={true}
                                                                                    theme={laptopL.status}
                                                                                />
                                                                            </FormRow>
                                                                        </FormContainer>
                                                                    ),
                                                                    theme: laptopL.editModal
                                                                })
                                                            }}
                                                        >
                                                            編輯
                                                        </NativeLineButton>
                                                    )
                                                }

                                                {
                                                    // 權限判斷
                                                    (getParseItemLocalStorage("Functions") ?? []).includes("/Base/RoleManager/btnEnableAndDisable") &&
                                                    (rowData.status !== 1 ?
                                                        <>
                                                            {/* 停用按鈕 */}
                                                            <NativeLineButton
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                disable={false}
                                                                type="button" // 防止提交
                                                                theme={laptopL.disableButton}
                                                                onClick={() => {
                                                                    props.RolesUpdateExecute({ ...rowData, status: 1 })
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
                                                                theme={laptopL.enableButton}
                                                                onClick={() => {
                                                                    props.RolesUpdateExecute({ ...rowData, status: 0 })
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
                        data={props.RolesData}
                        clickPage={(currentPage, pageSize) => {
                        }}
                    />
                </BasicContainer>
            </MainPageContainer>

            {/* 為用戶添加角色彈窗 */}
            {props.OpenAssign === "為用戶添加角色" &&
                <AssignRoleToUsersTitleModal
                    OrgsTree={props.OrgsTree}
                    GetSubUsersExecute={props.GetSubUsersExecute}
                    SubUsers={props.SubUsers}
                    // (注意: 不特別査已經分配的用戶，此資訊直接從Table列資料撈)
                    usersAlreadyAssigned={[...(globalContextService.get("RoleManagerPage", "CheckedRowsData")?.[0]?.users?.data ?? [])]}
                    roleRowData={{ ...(globalContextService.get("RoleManagerPage", "CheckedRowsData")?.[0] ?? {}) }}
                    AssignRoleUsersExecute={props.AssignRoleUsersExecute}

                    setOpenAssign={props.setOpenAssign}
                    controllGCS={props.controllGCS}
                />
            }

        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`