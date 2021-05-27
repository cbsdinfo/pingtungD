import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { BUnitTitleModal, MainPageContainer, MainPageTitleBar, QuotaTitleModal } from '../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NewSelector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService, DateTimePicker } from '../../../Components';
import { ReactComponent as Search } from '../../../Assets/img/CasePage/Search.svg'
import { ReactComponent as Plus } from '../../../Assets/img/CasePage/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/CasePage/Edit.svg'
import { ReactComponent as ToView } from '../../../Assets/img/CasePage/ToView.svg'
import { ReactComponent as TableEdit } from '../../../Assets/img/CasePage/TableEdit.svg'
import { ReactComponent as CallCar } from '../../../Assets/img/CasePage/CallCar.svg'
import { ReactComponent as Quota } from '../../../Assets/img/CasePage/Quota.svg'
import { ReactComponent as BUnit } from '../../../Assets/img/CasePage/BUnit.svg'
import { ReactComponent as Unlock } from '../../../Assets/img/CasePage/Unlock.svg'
import { ReactComponent as Lock } from '../../../Assets/img/CasePage/Lock.svg'
import { ReactComponent as Man } from '../../../Assets/img/CasePage/Man.svg'
import { ReactComponent as Woman } from '../../../Assets/img/CasePage/Woman.svg'
import { useHistory } from 'react-router-dom';
import { getParseItemLocalStorage, valid } from '../../../Handlers';
import { isEqual, isUndefined } from 'lodash';
import moment from 'moment';
import { allCaseListSelectOption, caseListMapping, caseListSelectOption } from '../../../Mappings/Mappings';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { rwd: { laptop } } } } = Theme;
    const [UpdateComponent, setUpdateComponent] = useState(false); // 刷新組件
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"用戶基本資料"}
                            theme={laptop.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/* 單選下拉選單 請選擇用戶身份 */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                //viewType
                                isSearchable
                                placeholder={"請選擇用戶身份"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("CasePage", "UserId") ?? null}
                                //value={globalContextService.get("CasePage", "UserId") ?? [{ value: '1', label: '長照個案' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CasePage", "UserId", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇用戶身份", isDisabled: true },
                                    ...allCaseListSelectOption
                                ]}
                                theme={laptop.userId}

                            />

                            {/* 一般輸入框 請輸入關鍵字  */}
                            <TextInput
                                bascDefaultTheme={"DefaultTheme"}
                                theme={laptop.keyword}
                                type="text"
                                placeholder={"請輸入關鍵字"}
                                rightIcon={
                                    <Search
                                        style={laptop.keywordRightIcon}
                                    />
                                }
                                value={globalContextService.get("CasePage", "Keyword") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CasePage", "Keyword", value);
                                }}
                            />

                            {/* 新增個案按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>

                                {/* 帳號解鎖按鈕 */}
                                {/* 權限判斷 */}
                                {(getParseItemLocalStorage("DFunctions") ?? []).includes("/Case/btnUnlock")
                                    &&
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // 防止提交
                                        theme={laptop.unlockButton}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // let checkedRowKeys = globalContextService.get("CasePage", "CheckedRowKeys");
                                            let checkedRowsData = globalContextService.get("CasePage", "CheckedRowsData");

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
                                                props.UnlockClientExecute({ id: rowData.id })
                                                //#endregion
                                            }
                                            //#endregion
                                        }}
                                    >
                                        帳號解鎖
                                </NativeLineButton>
                                }

                                {/* 新增用戶按鈕 */}
                                {/* 權限判斷 */}
                                {(getParseItemLocalStorage("DFunctions") ?? []).includes("/Case/AddUser")
                                    &&
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // 防止提交
                                        theme={laptop.addUserButton}
                                        onClick={(e) => {
                                            e.preventDefault();

                                            let rowData = {};

                                            //#region 打開新增用戶 Modal
                                            modalsService.titleModal.normal({
                                                //id: "top1",
                                                title: "新增用戶",
                                                yes: true,
                                                yesText: "確認",
                                                no: true,
                                                noText: "取消",
                                                // autoClose: true,
                                                backgroundClose: false,
                                                noOnClick: (e) => {
                                                    props.controllGCS("addClientModalClose")
                                                },
                                                yesOnClick: (e, close) => {
                                                    //#region 表單驗證
                                                    let validMsg = "";
                                                    if (valid(globalContextService.get("CasePage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                                        validMsg = valid(globalContextService.get("CasePage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                                    }
                                                    else if (valid(globalContextService.get("CasePage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]) {
                                                        validMsg = valid(globalContextService.get("CasePage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]
                                                    }
                                                    else if (valid(globalContextService.get("CasePage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]) {
                                                        validMsg = valid(globalContextService.get("CasePage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]
                                                    }
                                                    else if (valid(globalContextService.get("CasePage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]) {
                                                        validMsg = valid(globalContextService.get("CasePage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]
                                                    }
                                                    else if (valid(globalContextService.get("CasePage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["請輸入手機", "請輸入正確的手機號碼"])[1]) {
                                                        validMsg = valid(globalContextService.get("CasePage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["請輸入手機", "請輸入正確的手機號碼"])[1]
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
                                                        props.AddOrUpdateClientExecute({
                                                            account: globalContextService.get("CasePage", "Uid"), //目前預代與身分證相同
                                                            birthday: globalContextService.get("CasePage", `Birthday`),
                                                            name: globalContextService.get("CasePage", `Name`),
                                                            organizationIds: "", // 隨便找一個
                                                            password: globalContextService.get("CasePage", `Birthday`).replaceAll("-", ""),
                                                            phone: globalContextService.get("CasePage", "Cellphone"),
                                                            sex: globalContextService.get("CasePage", "Sex")?.value,
                                                            status: 1, // 狀態
                                                            uid: globalContextService.get("CasePage", "Uid"),
                                                        })
                                                        close();
                                                    }
                                                    //#endregion
                                                },
                                                closeIconOnClick: (e) => {
                                                    props.controllGCS("addClientModalClose")
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
                                                            {/* 新增彈窗 - 姓名 Name */}
                                                            <TextInput
                                                                // viewType
                                                                topLabel={<>姓名<Text theme={laptop.nameRequired}>(必填)</Text></>}
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                type="text"
                                                                placeholder={""}
                                                                value={globalContextService.get("CasePage", "Name") ?? rowData.name}
                                                                onChange={(e, value, onInitial) => {
                                                                    globalContextService.set("CasePage", "Name", value);
                                                                }}
                                                                theme={laptop.name}
                                                            />

                                                            {/* 新增彈窗 - 出生年月日 Birthday */}
                                                            <DateTimePicker
                                                                topLabel={<>出生年月日<Text theme={laptop.birthdayRequired}>(必填)</Text></>}
                                                                // type={"time"} time、date、week、month、quarter、year
                                                                type={"date"}
                                                                format={"YYYY-MM-DD"}
                                                                bascDefaultTheme={"DefaultTheme"}
                                                                // viewType
                                                                isSearchable
                                                                placeholder={""}
                                                                value={
                                                                    (globalContextService.get("CasePage", `Birthday`) ?
                                                                        moment(globalContextService.get("CasePage", `Birthday`), "YYYY-MM-DD")
                                                                        :
                                                                        null
                                                                    )
                                                                }
                                                                onChange={(value, momentObj) => {
                                                                    globalContextService.set("CasePage", `Birthday`, value);
                                                                }}
                                                                theme={laptop.birthday}
                                                            />

                                                            {/* 新增彈窗 - 身分證字號 Uid */}
                                                            <TextInput
                                                                // viewType
                                                                topLabel={<>身分證字號<Text theme={laptop.uidRequired}>(必填)</Text></>}
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                type="text"
                                                                placeholder={""}
                                                                value={globalContextService.get("CasePage", "Uid") ?? rowData.uid}
                                                                onChange={(e, value, onInitial) => {
                                                                    globalContextService.set("CasePage", "Uid", value);
                                                                }}
                                                                theme={laptop.uid}
                                                            />

                                                            {/* 新增彈窗 - 性別 Sex */}
                                                            <Selector
                                                                bascDefaultTheme={"DefaultTheme"}
                                                                topLabel={<>性別<Text theme={laptop.sexRequired}>(必填)</Text></>}
                                                                //viewType
                                                                isSearchable
                                                                placeholder={"請選擇性別"}
                                                                // isMulti
                                                                // hideSelectedOptions={false}
                                                                value={globalContextService.get("CasePage", "Sex") ?? {}}
                                                                onChange={(e, value, onInitial) => {
                                                                    // console.log(value)
                                                                    globalContextService.set("CasePage", "Sex", value);
                                                                }}

                                                                options={[
                                                                    { value: 'hint', label: "請選擇性別", isDisabled: true },
                                                                    { value: 0, label: '女' },
                                                                    { value: 1, label: '男' }
                                                                ]}
                                                                menuPosition={true}
                                                                theme={laptop.sex}
                                                            />

                                                            {/* 新增彈窗 - 手機 Cellphone */}
                                                            <TextInput
                                                                // viewType
                                                                topLabel={<>手機<Text theme={laptop.cellphoneRequired}>(必填)</Text></>}
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                type="text"
                                                                placeholder={""}
                                                                value={globalContextService.get("CasePage", "Cellphone") ?? rowData.cellphone}
                                                                onChange={(e, value, onInitial) => {
                                                                    globalContextService.set("CasePage", "Cellphone", value);
                                                                }}
                                                                theme={laptop.cellphone}
                                                            />

                                                        </FormRow>
                                                    </FormContainer>
                                                ),
                                                theme: laptop.editModal
                                            })
                                            //#endregion
                                        }}
                                    >
                                        {/* 新增個案按鈕 圖標 */}
                                        <Plus style={laptop.addButtonIcon} />
                                    新增用戶
                                </NativeLineButton>
                                }

                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
            >
                {/* Table 容器 */}
                <BasicContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={laptop.tableContainer}
                >
                    <OldTable
                        dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                        dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                            globalContextService.remove("CasePage", "CheckedRowKeys");
                            globalContextService.remove("CasePage", "CheckedRowsData");
                        }}
                        checkbox={true}
                        // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                        checkedRowKeyName={"id"}
                        checkboxOnChecked={
                            (checkedRowKeys, checkedRows) => {
                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                globalContextService.set("CasePage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("CasePage", "CheckedRowsData", checkedRows);
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
                                    width: "118px",
                                    dataIndex: 'name',
                                    // sorter: (a, b) => a.carNumber.length - b.carNumber.length,
                                    fixed: 'left',
                                    render: (rowData, allRowData) => {
                                        // console.log("rowData", rowData, allRowData)
                                        // console.log(!moment(allRowData.unLockDate, "YYYY-MM-DD HH:mm:ss").isBefore(moment()))
                                        return (
                                            <>
                                                <Text theme={laptop.nameContainer}>
                                                    {!(moment(allRowData.unLockDate, "YYYY-MM-DD HH:mm:ss").subtract(5, "seconds").isBefore(moment()) || allRowData.unLockDate === null) && <Lock style={laptop.userlocked} />}
                                                    {rowData}

                                                    {/* 編輯用戶基本資料按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptop.editUserButton}
                                                        onClick={(e) => {
                                                            //#region 開啟編輯用戶 Modal
                                                            modalsService.titleModal.normal({
                                                                //id: "top1",
                                                                title: "編輯用戶",
                                                                yes: true,
                                                                yesText: "確認",
                                                                no: true,
                                                                noText: "取消",
                                                                // autoClose: true,
                                                                backgroundClose: false,
                                                                noOnClick: (e) => {
                                                                    props.controllGCS("editClientModalClose")
                                                                },
                                                                yesOnClick: (e, close) => {
                                                                    //#region 表單驗證
                                                                    let validMsg = "";
                                                                    if (valid(globalContextService.get("CasePage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                                                        validMsg = valid(globalContextService.get("CasePage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                                                    }
                                                                    else if (valid(globalContextService.get("CasePage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]) {
                                                                        validMsg = valid(globalContextService.get("CasePage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]
                                                                    }
                                                                    else if (valid(globalContextService.get("CasePage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]) {
                                                                        validMsg = valid(globalContextService.get("CasePage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]
                                                                    }
                                                                    else if (valid(globalContextService.get("CasePage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]) {
                                                                        validMsg = valid(globalContextService.get("CasePage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]
                                                                    }
                                                                    else if (valid(globalContextService.get("CasePage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["請輸入手機", "請輸入正確的手機號碼"])[1]) {
                                                                        validMsg = valid(globalContextService.get("CasePage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["請輸入手機", "請輸入正確的手機號碼"])[1]
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
                                                                        props.AddOrUpdateClientExecute({
                                                                            id: allRowData.id,
                                                                            account: globalContextService.get("CasePage", "Uid"), //目前預代與身分證相同
                                                                            birthday: globalContextService.get("CasePage", `Birthday`),
                                                                            name: globalContextService.get("CasePage", `Name`),
                                                                            organizationIds: "", // 隨便找一個
                                                                            password: globalContextService.get("CasePage", `Birthday`).replaceAll("-", ""),
                                                                            phone: globalContextService.get("CasePage", "Cellphone"),
                                                                            sex: globalContextService.get("CasePage", "Sex")?.value,
                                                                            status: 1, // 狀態
                                                                            uid: globalContextService.get("CasePage", "Uid"),
                                                                        }, true)
                                                                        close();
                                                                    }
                                                                    //#endregion
                                                                },
                                                                closeIconOnClick: (e) => {
                                                                    props.controllGCS("editClientModalClose")
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
                                                                            {/* 新增彈窗 - 姓名 Name */}
                                                                            <TextInput
                                                                                // viewType
                                                                                topLabel={<>姓名<Text theme={laptop.nameRequired}>(必填)</Text></>}
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                type="text"
                                                                                placeholder={""}
                                                                                value={globalContextService.get("CasePage", "Name") ?? allRowData.name}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    globalContextService.set("CasePage", "Name", value);
                                                                                }}
                                                                                theme={laptop.name}
                                                                            />

                                                                            {/* 新增彈窗 - 出生年月日 Birthday */}
                                                                            <DateTimePicker
                                                                                topLabel={<>出生年月日<Text theme={laptop.birthdayRequired}>(必填)</Text></>}
                                                                                // type={"time"} time、date、week、month、quarter、year
                                                                                type={"date"}
                                                                                format={"YYYY-MM-DD"}
                                                                                bascDefaultTheme={"DefaultTheme"}
                                                                                // viewType
                                                                                isSearchable
                                                                                placeholder={""}
                                                                                value={moment(allRowData.birthday, "YYYY-MM-DD")}
                                                                                onChange={(value, momentObj) => {
                                                                                    globalContextService.set("CasePage", `Birthday`, value);
                                                                                }}
                                                                                theme={laptop.birthday}
                                                                            />

                                                                            {/* 新增彈窗 - 身分證字號 Uid */}
                                                                            <TextInput
                                                                                // viewType
                                                                                topLabel={<>身分證字號<Text theme={laptop.uidRequired}>(必填)</Text></>}
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                type="text"
                                                                                placeholder={""}
                                                                                value={globalContextService.get("CasePage", "Uid") ?? allRowData.uid}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    globalContextService.set("CasePage", "Uid", value);
                                                                                }}
                                                                                theme={laptop.uid}
                                                                            />

                                                                            {/* 新增彈窗 - 性別 Sex */}
                                                                            <Selector
                                                                                bascDefaultTheme={"DefaultTheme"}
                                                                                topLabel={<>性別<Text theme={laptop.sexRequired}>(必填)</Text></>}
                                                                                //viewType
                                                                                isSearchable
                                                                                placeholder={"請選擇性別"}
                                                                                // isMulti
                                                                                // hideSelectedOptions={false}
                                                                                value={globalContextService.get("CasePage", "Sex") ?? { value: allRowData.sex, label: allRowData.label === 0 ? '女' : '男' }}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    // console.log(value)
                                                                                    globalContextService.set("CasePage", "Sex", value);
                                                                                }}

                                                                                options={[
                                                                                    { value: 'hint', label: "請選擇性別", isDisabled: true },
                                                                                    { value: 0, label: '女' },
                                                                                    { value: 1, label: '男' }
                                                                                ]}
                                                                                menuPosition={true}
                                                                                theme={laptop.sex}
                                                                            />

                                                                            {/* 新增彈窗 - 手機 Cellphone */}
                                                                            <TextInput
                                                                                // viewType
                                                                                topLabel={<>手機<Text theme={laptop.cellphoneRequired}>(必填)</Text></>}
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                type="text"
                                                                                placeholder={""}
                                                                                value={globalContextService.get("CasePage", "Cellphone") ?? allRowData.phone}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    globalContextService.set("CasePage", "Cellphone", value);
                                                                                }}
                                                                                theme={laptop.cellphone}
                                                                            />

                                                                        </FormRow>
                                                                    </FormContainer>
                                                                ),
                                                                theme: laptop.editModal
                                                            })

                                                            //#endregion

                                                        }}
                                                    >
                                                        {/* 編輯用戶基本資料按鈕 圖標 */}
                                                        <Edit style={laptop.addButtonIcon} />
                                                    </NativeLineButton>
                                                </Text>
                                            </>
                                        )
                                    }
                                },
                                {
                                    title: '身份',
                                    width: "200px",
                                    dataIndex: 'caseList',
                                    // sorter: (a, b) => a.seat.length - b.seat.length,
                                    // fixed: 'right',
                                    render: (rowData, allRowData) => {
                                        // console.log("caseListrowData", rowData, allRowData)

                                        //#region 身份選項處理
                                        let option = (rowData ?? []).map((item, index) => {
                                            return ({
                                                value: `${item.userType}_${item.caseId}`, // 這裡的value 包含了 caseId 以避免重複
                                                label: `${caseListMapping[item.userType]}`
                                            })
                                            // caseId: "6718179154760081408"
                                            // caseUserNo: "4"
                                            // userId: "6717458163956228096"
                                            // userType: "caseuser"
                                        })

                                        if (option.length < 1) {
                                            option.push({ value: 'noCaseList', label: "該用戶尚未新增身份", isDisabled: true })
                                        }
                                        //#endregion

                                        return (
                                            <>
                                                <BasicContainer theme={laptop.canUseCaseListTagContainer}>
                                                    {/* 可用身分 Tag */}
                                                    {option.map(item => (
                                                        <Tag
                                                            key={item.value}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.canUseCaseListTag}
                                                            text={item.label}
                                                        />
                                                    ))}

                                                    {/* 新增身份按鈕 */}
                                                    {/* 權限判斷 */}
                                                    {(getParseItemLocalStorage("DFunctions") ?? []).includes("/Case/AddCaseList")
                                                        &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // 防止提交
                                                            theme={laptop.addIdentityButton}
                                                            onClick={(e) => {
                                                                e.preventDefault();

                                                                //#region 打開選擇欲新增身份彈窗 Modal
                                                                modalsService.titleModal.normal({
                                                                    //id: "top1",
                                                                    title: "新增身份",
                                                                    yes: true,
                                                                    yesText: "確認",
                                                                    no: true,
                                                                    noText: "取消",
                                                                    // autoClose: true,
                                                                    backgroundClose: false,
                                                                    noOnClick: (e) => {
                                                                        props.controllGCS("selectCaseListModalClose")
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
                                                                                    history.push(`/Case/Add?userId=${allRowData.id}`)
                                                                                    //#endregion
                                                                                    break;
                                                                                case "selfpayuser":
                                                                                    //#region 打開新增白牌車頁面，並傳遞 userId
                                                                                    history.push(`/Case/WhiteAdd?userId=${allRowData.id}`)
                                                                                    //#endregion
                                                                                    break;
                                                                                case "countrySide":
                                                                                    //#region 打開新增偏鄉運能不足身份頁面，並傳遞 userId
                                                                                    history.push(`/Case/RuralAdd?userId=${allRowData.id}`)
                                                                                    //#endregion
                                                                                    break;
                                                                                case "bususer":
                                                                                    //#region 打開新增幸福巴士身份頁面，並傳遞 userId
                                                                                    history.push(`/Case/BusAdd?userId=${allRowData.id}`)
                                                                                    //#endregion
                                                                                    break;
                                                                                case "daycare":
                                                                                    //#region 打開新增日照身份頁面，並傳遞 userId
                                                                                    history.push(`/Case/DayCareAdd?userId=${allRowData.id}`)
                                                                                    //#endregion
                                                                                    break;
                                                                                default:
                                                                                    break;
                                                                            }
                                                                            props.controllGCS("selectCaseListModalClose")
                                                                            close();
                                                                        }
                                                                        //#endregion
                                                                    },
                                                                    closeIconOnClick: (e) => {
                                                                        props.controllGCS("selectCaseListModalClose")
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
                                                                                    theme={laptop.caseListSelect}
                                                                                />

                                                                            </FormRow>
                                                                        </FormContainer>
                                                                    ),
                                                                    theme: laptop.caseListSelectModal
                                                                })
                                                                //#endregion


                                                                //#endregion
                                                            }}
                                                        >
                                                            {/* 新增個案按鈕 圖標 */}
                                                            <Plus style={laptop.addButtonIcon} />
                                                        </NativeLineButton>
                                                    }
                                                </BasicContainer>
                                            </>
                                        )
                                    }
                                },
                                {
                                    title: '身分證字號',
                                    width: "112px",
                                    dataIndex: 'uid',
                                    // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '出生年月日',
                                    width: "125px",
                                    dataIndex: 'birthday',
                                    // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                    // fixed: 'left',
                                    render: (rowData) => {
                                        // console.log("rowData", rowData)
                                        return (
                                            <>
                                                {rowData.split(' ')[0]}
                                            </>
                                        )
                                    }
                                },
                                {
                                    title: '性別',
                                    width: "60px",
                                    dataIndex: 'sex',
                                    // sorter: (a, b) => a.wheelchairCount.length - b.wheelchairCount.length,
                                    // fixed: 'left',
                                    render: (rowData) => {
                                        // console.log("rowData", rowData)
                                        return (
                                            <>
                                                {rowData === 1 ?
                                                    <Man />
                                                    :
                                                    <Woman />
                                                }
                                            </>
                                        )
                                    }
                                },
                                {
                                    title: '手機',
                                    width: "130px",
                                    dataIndex: 'phone',
                                    // sorter: (a, b) => a.seat.length - b.seat.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '狀態控制台',
                                    width: "321px",
                                    // dataIndex: 'parentName',
                                    // sorter: (a, b) => a.name.length - b.name.length,
                                    fixed: 'right',
                                    render: (rowData) => {
                                        // !!!!!!! ----------         注意 !! 現在還沒寫例如  "XX角色 沒有 編輯巴士 但是有新增、檢視巴士" 的這種判斷
                                        // 基本資料     -- 編輯、檢視
                                        // 長照各案     -- 叫車、編輯、檢視、可用額度、B單位
                                        // 白牌         -- 叫車、編輯、檢視、B單位
                                        // 偏鄉運能不足  -- 叫車、編輯、檢視、B單位
                                        // 巴士         -- 叫車、編輯、檢視
                                        // 日照         -- 編輯、檢視

                                        let showCallCar = ["長照", "白牌", "偏鄉運能不足", "幸福巴士"]; // 顯示 叫車 的身份
                                        let showEditButton = ["基本資料", "長照", "白牌", "偏鄉運能不足", "幸福巴士", "日照"]; // 顯示 編輯 的身份
                                        let showToViewButton = ["基本資料", "長照", "白牌", "偏鄉運能不足", "幸福巴士", "日照"]; // 顯示 檢視 的身份
                                        let showQuotaButton = ["長照"]; // 顯示 可用額度 的身份
                                        let showBUnitButton = ["長照", "白牌", "偏鄉運能不足"]; // 顯示 B單位 的身份

                                        //#region 身份選項處理
                                        let option = (rowData?.caseList ?? []).map((item, index) => {
                                            return ({
                                                value: `${item.userType}_${item.caseId}`, // 這裡的value 包含了 caseId 以避免重複
                                                label: `${caseListMapping[item.userType]}${item.caseUserNo !== "" ? `(${item.caseUserNo})` : ""}`
                                            })
                                            // caseId: "6718179154760081408"
                                            // caseUserNo: "4"
                                            // userId: "6717458163956228096"
                                            // userType: "caseuser"
                                        })

                                        if (option.length < 1) {
                                            option.push({ value: 'noCaseList', label: "該用戶尚未新增身份", isDisabled: true })
                                        }
                                        //#endregion

                                        return (
                                            <>
                                                <Container>

                                                    {/* 身份 CaseList */}
                                                    <NewSelector
                                                        bascDefaultTheme={"DefaultTheme"}
                                                        topLabel={""}
                                                        //viewType
                                                        disabled={isEqual(option?.[0], { value: 'noCaseList', label: "該用戶尚未新增身份", isDisabled: true })}
                                                        isSearchable
                                                        placeholder={"請選擇用戶身份"}
                                                        // isMulti
                                                        // hideSelectedOptions={false}
                                                        value={globalContextService.get("CasePage", `CaseList_${rowData.id}`) ?? option?.[0]}// { value: 'baseInfo', label: "基本資料", isDisabled: false }} // ?? {}}
                                                        onChange={(e, value, onInitial) => {
                                                            // console.log(value)
                                                            if (!isEqual(value, globalContextService.get("CasePage", `CaseList_${rowData.id}`))) {

                                                                setUpdateComponent(u => !u); // 刷新組件
                                                            }
                                                            globalContextService.set("CasePage", `CaseList_${rowData.id}`, value);
                                                        }}

                                                        options={[
                                                            // { value: 'baseInfo', label: "基本資料", isDisabled: false },
                                                            ...option,
                                                            // 因為 後端並未能顯示個案身份，所以硬補上去，但API開通 再刪掉
                                                            { value: "countrySide", label: "偏鄉運能不足", isDisabled: false },
                                                            { value: 'daycare', label: "日照", isDisabled: false }
                                                        ]}
                                                        menuPosition={true}
                                                        theme={laptop.caseList}
                                                    />

                                                    {/* 叫車按鈕 */}
                                                    {/* 具功能權限時，且選擇"長照", "白牌", "幸福巴士"時 顯示 */}
                                                    {
                                                        (
                                                            (getParseItemLocalStorage("DFunctions") ?? []).includes("/Case/btnCallCar")
                                                            &&
                                                            showCallCar.some(c => globalContextService.get("CasePage", `CaseList_${rowData.id}`)?.label?.includes(c))
                                                        )
                                                        &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // 防止提交
                                                            theme={laptop.callCarButton}
                                                            onClick={() => {
                                                                let selectCaseList = globalContextService.get("CasePage", `CaseList_${rowData.id}`)

                                                                //#region 處理各種身份 Switch
                                                                // 注意，因為下拉選單的Valu 包含了 _caseId ，所以要將它split過濾掉
                                                                switch (selectCaseList?.value.split("_")[0]) {
                                                                    case "caseuser": // 長照
                                                                        //#region 打開編輯長照身份頁面，並傳遞 userId
                                                                        history.push(`/Case/CallCar?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}&caseName=${rowData.name} (${selectCaseList.label})`)
                                                                        //#endregion
                                                                        break;
                                                                    case "selfpayuser": // 白牌
                                                                        //#region 打開編輯白牌身份頁面，並傳遞 userId
                                                                        history.push(`/Case/WhiteCallCar?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}&caseName=${rowData.name} (白牌)`)
                                                                        //#endregion
                                                                        break;
                                                                    case "countrySide": // 偏鄉運能不足
                                                                        //#region 打開編輯偏鄉運能不足身份頁面，並傳遞 userId
                                                                        history.push(`/Case/RuralCallCar?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}&caseName=${rowData.name} (偏鄉運能不足)`)
                                                                        //#endregion
                                                                        break;
                                                                    case "bususer": // 幸福巴士
                                                                        //#region 打開編輯幸福巴士身份頁面，並傳遞 userId
                                                                        history.push(`/Case/BusCallCar?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}&caseName=${rowData.name} (幸福巴士)`)
                                                                        //#endregion
                                                                        break;
                                                                    default:
                                                                        break;
                                                                }
                                                                //#endregion

                                                            }}
                                                        >
                                                            叫車
                                                        </NativeLineButton>
                                                    }


                                                    {/* 編輯按鈕 */}
                                                    {/* 具功能權限時，且選擇"基本資料", "長照", "白牌", "幸福巴士"時 顯示 */}
                                                    {
                                                        (
                                                            (getParseItemLocalStorage("DFunctions") ?? []).includes("/Case/btnEdit")
                                                            &&
                                                            showEditButton.some(c => globalContextService.get("CasePage", `CaseList_${rowData.id}`)?.label?.includes(c))
                                                        )
                                                        &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // 防止提交
                                                            theme={laptop.editButton}
                                                            onClick={() => {
                                                                let selectCaseList = globalContextService.get("CasePage", `CaseList_${rowData.id}`)
                                                                // console.log(rowData.birthday)
                                                                // console.log(moment(rowData.birthday, "YYYY-MM-DD"))

                                                                //#region 處理各種身份 Switch
                                                                // 注意，因為下拉選單的Valu 包含了 _caseId ，所以要將它split過濾掉
                                                                switch (selectCaseList?.value.split("_")[0]) {
                                                                    case "baseInfo": // 基本資料
                                                                        //#region 開啟編輯用戶 Modal
                                                                        modalsService.titleModal.normal({
                                                                            //id: "top1",
                                                                            title: "編輯用戶",
                                                                            yes: true,
                                                                            yesText: "確認",
                                                                            no: true,
                                                                            noText: "取消",
                                                                            // autoClose: true,
                                                                            backgroundClose: false,
                                                                            noOnClick: (e) => {
                                                                                props.controllGCS("editClientModalClose")
                                                                            },
                                                                            yesOnClick: (e, close) => {
                                                                                //#region 表單驗證
                                                                                let validMsg = "";
                                                                                if (valid(globalContextService.get("CasePage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("CasePage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("CasePage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("CasePage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("CasePage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("CasePage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("CasePage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("CasePage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("CasePage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["請輸入手機", "請輸入正確的手機號碼"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("CasePage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["請輸入手機", "請輸入正確的手機號碼"])[1]
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
                                                                                    props.AddOrUpdateClientExecute({
                                                                                        id: rowData.id,
                                                                                        account: globalContextService.get("CasePage", "Uid"), //目前預代與身分證相同
                                                                                        birthday: globalContextService.get("CasePage", `Birthday`),
                                                                                        name: globalContextService.get("CasePage", `Name`),
                                                                                        organizationIds: "", // 隨便找一個
                                                                                        password: globalContextService.get("CasePage", `Birthday`).replaceAll("-", ""),
                                                                                        phone: globalContextService.get("CasePage", "Cellphone"),
                                                                                        sex: globalContextService.get("CasePage", "Sex")?.value,
                                                                                        status: 1, // 狀態
                                                                                        uid: globalContextService.get("CasePage", "Uid"),
                                                                                    })
                                                                                    close();
                                                                                }
                                                                                //#endregion
                                                                            },
                                                                            closeIconOnClick: (e) => {
                                                                                props.controllGCS("editClientModalClose")
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
                                                                                        {/* 新增彈窗 - 姓名 Name */}
                                                                                        <TextInput
                                                                                            // viewType
                                                                                            topLabel={<>姓名<Text theme={laptop.nameRequired}>(必填)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("CasePage", "Name") ?? rowData.name}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("CasePage", "Name", value);
                                                                                            }}
                                                                                            theme={laptop.name}
                                                                                        />

                                                                                        {/* 新增彈窗 - 出生年月日 Birthday */}
                                                                                        <DateTimePicker
                                                                                            topLabel={<>出生年月日<Text theme={laptop.birthdayRequired}>(必填)</Text></>}
                                                                                            // type={"time"} time、date、week、month、quarter、year
                                                                                            type={"date"}
                                                                                            format={"YYYY-MM-DD"}
                                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                                            // viewType
                                                                                            isSearchable
                                                                                            placeholder={""}
                                                                                            value={moment(rowData.birthday, "YYYY-MM-DD")}
                                                                                            onChange={(value, momentObj) => {
                                                                                                globalContextService.set("CasePage", `Birthday`, value);
                                                                                            }}
                                                                                            theme={laptop.birthday}
                                                                                        />

                                                                                        {/* 新增彈窗 - 身分證字號 Uid */}
                                                                                        <TextInput
                                                                                            // viewType
                                                                                            topLabel={<>身分證字號<Text theme={laptop.uidRequired}>(必填)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("CasePage", "Uid") ?? rowData.uid}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("CasePage", "Uid", value);
                                                                                            }}
                                                                                            theme={laptop.uid}
                                                                                        />

                                                                                        {/* 新增彈窗 - 性別 Sex */}
                                                                                        <Selector
                                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                                            topLabel={<>性別<Text theme={laptop.sexRequired}>(必填)</Text></>}
                                                                                            //viewType
                                                                                            isSearchable
                                                                                            placeholder={"請選擇性別"}
                                                                                            // isMulti
                                                                                            // hideSelectedOptions={false}
                                                                                            value={globalContextService.get("CasePage", "Sex") ?? { value: rowData.sex, label: rowData.label === 0 ? '女' : '男' }}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                // console.log(value)
                                                                                                globalContextService.set("CasePage", "Sex", value);
                                                                                            }}

                                                                                            options={[
                                                                                                { value: 'hint', label: "請選擇性別", isDisabled: true },
                                                                                                { value: 0, label: '女' },
                                                                                                { value: 1, label: '男' }
                                                                                            ]}
                                                                                            menuPosition={true}
                                                                                            theme={laptop.sex}
                                                                                        />

                                                                                        {/* 新增彈窗 - 手機 Cellphone */}
                                                                                        <TextInput
                                                                                            // viewType
                                                                                            topLabel={<>手機<Text theme={laptop.cellphoneRequired}>(必填)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("CasePage", "Cellphone") ?? rowData.phone}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("CasePage", "Cellphone", value);
                                                                                            }}
                                                                                            theme={laptop.cellphone}
                                                                                        />

                                                                                    </FormRow>
                                                                                </FormContainer>
                                                                            ),
                                                                            theme: laptop.editModal
                                                                        })

                                                                        //#endregion
                                                                        break;
                                                                    case "caseuser": // 長照
                                                                        //#region 打開編輯長照身份頁面，並傳遞 userId
                                                                        history.push(`/Case/Edit?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "selfpayuser": // 白牌
                                                                        //#region 打開編輯白牌身份頁面，並傳遞 userId
                                                                        history.push(`/Case/WhiteEdit?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "countrySide": // 偏鄉運能不足
                                                                        //#region 打開編輯偏鄉運能不足身份頁面，並傳遞 userId
                                                                        history.push(`/Case/RuralEdit?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "bususer": // 幸福巴士
                                                                        //#region 打開編輯幸福巴士身份頁面，並傳遞 userId
                                                                        history.push(`/Case/BusEdit?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "daycare": // 日照
                                                                        //#region 打開編輯日照身份頁面，並傳遞 userId
                                                                        history.push(`/Case/DayCareEdit?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    default:
                                                                        break;
                                                                }
                                                                //#endregion
                                                            }}
                                                        >
                                                            編輯
                                                        </NativeLineButton>
                                                    }

                                                    {/* 檢視按鈕 */}
                                                    {/* 具功能權限時，且選擇"基本資料", "長照", "白牌", "幸福巴士"時 顯示 */}
                                                    {
                                                        (
                                                            (getParseItemLocalStorage("DFunctions") ?? []).includes("/Case/btnToView")
                                                            &&
                                                            showToViewButton.some(c => globalContextService.get("CasePage", `CaseList_${rowData.id}`)?.label?.includes(c))
                                                        )
                                                        &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // 防止提交
                                                            theme={laptop.toViewButton}
                                                            onClick={() => {
                                                                let selectCaseList = globalContextService.get("CasePage", `CaseList_${rowData.id}`)
                                                                // console.log("selectCaseList檢視", selectCaseList)
                                                                // console.log(moment(rowData.birthday, "YYYY-MM-DD"))

                                                                //#region 處理各種身份 Switch
                                                                switch (selectCaseList?.value.split("_")[0]) {
                                                                    case "baseInfo": // 基本資料
                                                                        //#region 開啟檢視用戶 Modal
                                                                        modalsService.titleModal.normal({
                                                                            //id: "top1",
                                                                            title: "檢視用戶",
                                                                            yes: true,
                                                                            yesText: "確認",
                                                                            no: false,
                                                                            noText: "取消",
                                                                            // autoClose: true,
                                                                            backgroundClose: false,
                                                                            noOnClick: (e) => {
                                                                                props.controllGCS("viewClientModalClose")
                                                                            },
                                                                            yesOnClick: (e, close) => { close(); },
                                                                            closeIconOnClick: (e) => {
                                                                                props.controllGCS("viewClientModalClose")
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
                                                                                        {/* 新增彈窗 - 姓名 Name */}
                                                                                        <TextInput
                                                                                            viewType
                                                                                            topLabel={<>姓名<Text theme={laptop.nameRequired}>(必填)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("CasePage", "Name") ?? rowData.name}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("CasePage", "Name", value);
                                                                                            }}
                                                                                            theme={laptop.name}
                                                                                        />

                                                                                        {/* 新增彈窗 - 出生年月日 Birthday */}
                                                                                        <DateTimePicker
                                                                                            topLabel={<>出生年月日<Text theme={laptop.birthdayRequired}>(必填)</Text></>}
                                                                                            // type={"time"} time、date、week、month、quarter、year
                                                                                            type={"date"}
                                                                                            format={"YYYY-MM-DD"}
                                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                                            viewType
                                                                                            isSearchable
                                                                                            placeholder={""}
                                                                                            value={moment(rowData.birthday, "YYYY-MM-DD")}
                                                                                            onChange={(value, momentObj) => {
                                                                                                globalContextService.set("CasePage", `Birthday`, value);
                                                                                            }}
                                                                                            theme={laptop.birthday}
                                                                                        />

                                                                                        {/* 新增彈窗 - 身分證字號 Uid */}
                                                                                        <TextInput
                                                                                            viewType
                                                                                            topLabel={<>身分證字號<Text theme={laptop.uidRequired}>(必填)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("CasePage", "Uid") ?? rowData.uid}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("CasePage", "Uid", value);
                                                                                            }}
                                                                                            theme={laptop.uid}
                                                                                        />

                                                                                        {/* 新增彈窗 - 性別 Sex */}
                                                                                        <Selector
                                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                                            topLabel={<>性別<Text theme={laptop.sexRequired}>(必填)</Text></>}
                                                                                            viewType
                                                                                            isSearchable
                                                                                            placeholder={"請選擇性別"}
                                                                                            // isMulti
                                                                                            // hideSelectedOptions={false}
                                                                                            value={globalContextService.get("CasePage", "Sex") ?? { value: rowData.sex, label: rowData.label === 0 ? '女' : '男' }}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                // console.log(value)
                                                                                                globalContextService.set("CasePage", "Sex", value);
                                                                                            }}

                                                                                            options={[
                                                                                                { value: 'hint', label: "請選擇性別", isDisabled: true },
                                                                                                { value: 0, label: '女' },
                                                                                                { value: 1, label: '男' }
                                                                                            ]}
                                                                                            menuPosition={true}
                                                                                            theme={laptop.sex}
                                                                                        />

                                                                                        {/* 新增彈窗 - 手機 Cellphone */}
                                                                                        <TextInput
                                                                                            viewType
                                                                                            topLabel={<>手機<Text theme={laptop.cellphoneRequired}>(必填)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("CasePage", "Cellphone") ?? rowData.phone}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("CasePage", "Cellphone", value);
                                                                                            }}
                                                                                            theme={laptop.cellphone}
                                                                                        />

                                                                                    </FormRow>
                                                                                </FormContainer>
                                                                            ),
                                                                            theme: laptop.editModal
                                                                        })

                                                                        //#endregion
                                                                        break;
                                                                    case "caseuser": // 長照
                                                                        //#region 打開編輯長照身份頁面，並傳遞 userId
                                                                        history.push(`/Case/Information?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "selfpayuser": // 白牌
                                                                        //#region 打開編輯白牌身份頁面，並傳遞 userId
                                                                        history.push(`/Case/WhiteInformation?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "countrySide": // 偏鄉運能不足
                                                                        //#region 打開編輯偏鄉運能不足身份頁面，並傳遞 userId
                                                                        history.push(`/Case/RuralInformation?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "bususer": // 幸福巴士
                                                                        //#region 打開編輯幸福巴士身份頁面，並傳遞 userId
                                                                        history.push(`/Case/BusInformation?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "daycare": // 日照
                                                                        //#region 打開編輯日照身份頁面，並傳遞 userId
                                                                        history.push(`/Case/DayCareInformation?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    default:
                                                                        break;
                                                                }
                                                                //#endregion
                                                            }}
                                                        >
                                                            檢視
                                                        </NativeLineButton>
                                                    }

                                                    {/* 可用額度按鈕 */}
                                                    {/* 具功能權限時，且選擇"長照"時 顯示 */}
                                                    {
                                                        (
                                                            (getParseItemLocalStorage("DFunctions") ?? []).includes("/Case/btnQuota")
                                                            &&
                                                            showQuotaButton.some(c => globalContextService.get("CasePage", `CaseList_${rowData.id}`)?.label?.includes(c))
                                                        )
                                                        &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // 防止提交
                                                            theme={laptop.quotaButton}
                                                            onClick={() => {
                                                                let selectCaseList = globalContextService.get("CasePage", `CaseList_${rowData.id}`)
                                                                // globalContextService.set("CasePage", "APIError", selectCaseList?.value.split("_")[1]); // 因應目前後端api 沒有回傳id錯誤

                                                                props.GetCanUseQuotaExecute(selectCaseList?.value.split("_")[1]);
                                                                //#region 打開可用額度 Modal
                                                                props.setOpenQuotaModal(true);
                                                                //#endregion
                                                            }}
                                                        >
                                                            可用額度
                                                        </NativeLineButton>
                                                    }

                                                    {/* B單位按鈕 */}
                                                    {/* 具功能權限時，且選擇"長照"時 顯示 */}
                                                    {
                                                        (
                                                            (getParseItemLocalStorage("DFunctions") ?? []).includes("/Case/btnBUnit")
                                                            &&
                                                            showBUnitButton.some(c => globalContextService.get("CasePage", `CaseList_${rowData.id}`)?.label?.includes(c))
                                                        )
                                                        &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // 防止提交
                                                            theme={laptop.bUnitButton}
                                                            onClick={() => {
                                                                let selectCaseList = globalContextService.get("CasePage", `CaseList_${rowData.id}`)

                                                                props.GetAllBUnitsExecute();
                                                                props.GetChooseBUnitsExecute(selectCaseList?.value.split("_")[1]);
                                                                //#region 打開B單位 Modal
                                                                props.setOpenBUnitModal(true);
                                                                //#endregion
                                                            }}
                                                        >
                                                            B單位
                                                        </NativeLineButton>
                                                    }
                                                </Container>
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
                        data={props.AllClient.data}
                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                        // data={props.SubOrgs.data}
                        clickPage={(currentPage, pageSize) => {
                        }}
                    />
                </BasicContainer>
            </MainPageContainer>

            {/* B單位彈窗 */}
            {props.OpenBUnitModal &&
                <BUnitTitleModal
                    // theme={{}}
                    setOpenBUnitModal={props.setOpenBUnitModal}
                    AllBUnits={props.AllBUnits}
                    setAllBUnits={props.setAllBUnits}
                    ChooseBUnits={props.ChooseBUnits}
                    setChooseBUnits={props.setChooseBUnits}
                    UpdateBUnitExecute={props.UpdateBUnitExecute}


                    controllGCS={props.controllGCS}
                />
            }

            {/* 可用額度彈窗 */}
            {props.OpenQuotaModal &&
                <QuotaTitleModal
                    // theme={{}}
                    setQuotaInfo={props.setQuotaInfo}
                    QuotaInfo={props.QuotaInfo}
                    UpdateQuotaExecute={props.UpdateQuotaExecute}
                    setOpenQuotaModal={props.setOpenQuotaModal}
                    controllGCS={props.controllGCS}
                />
            }
        </>
    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`