import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, modalsService } from '../../../../../Components';
import { valid } from '../../../../../Handlers';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    const { pages: { drivers: { driversAdd: { rwd: { laptopL } } } } } = Theme;

    let history = useHistory();
    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"司機基本資料新增"}
                            theme={laptopL.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/*  回列表按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 回列表按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.returnButton}
                                    onClick={() => {
                                        globalContextService.remove("DriversAddPage")
                                        history.push("/DriverAndCar/Drivers")
                                    }}
                                >
                                    回列表
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
            >

                {/* 新增頁面表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptopL.AddPageContainer}
                >

                    {/* 基本資料編輯 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"基本資料"}
                        theme={laptopL.driverBaseSubTitleBar}
                    >

                        {/*  儲存按鈕 (基本資料編輯 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 儲存按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                text={"儲存"}
                                theme={laptopL.saveButton}
                                onClick={() => {
                                    //#region 表單驗證
                                    let validMsg = "";
                                    if (valid(globalContextService.get("DriversAddPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                        validMsg = valid(globalContextService.get("DriversAddPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                    }
                                    else if (valid(globalContextService.get("DriversAddPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]) {
                                        validMsg = valid(globalContextService.get("DriversAddPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]
                                    }
                                    else if (valid(globalContextService.get("DriversAddPage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["請輸入手機", "請輸入正確的手機號碼"])[1]) {
                                        validMsg = valid(globalContextService.get("DriversAddPage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["請輸入手機", "請輸入正確的手機號碼"])[1]
                                    }
                                    else if (valid(globalContextService.get("DriversAddPage", "CanAssign")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]) {
                                        validMsg = valid(globalContextService.get("DriversAddPage", "CanAssign")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]
                                    }
                                    else if (valid(globalContextService.get("DriversAddPage", "CarDealership")?.value ?? "", ["^.{1,}$"], ["請選擇車行"])[1]) {
                                        validMsg = valid(globalContextService.get("DriversAddPage", "CarDealership")?.value ?? "", ["^.{1,}$"], ["請選擇車行"])[1]
                                    }
                                    else if (
                                        (globalContextService.get("DriversAddPage", "DriverLicenseListCheckedRowKeys") ?? [])
                                            .map((id) => {
                                                return valid(globalContextService.get("DriversAddPage", `LicenseExpiryDate${id}`) ?? "", ["^.{1,}$"], ["請選擇證照到期日"])[1]
                                            })
                                            .includes("請選擇證照到期日")
                                    ) {
                                        validMsg = "請選擇證照到期日";
                                    }
                                    else if (
                                        (globalContextService.get("DriversAddPage", "DriverInsuranceListCheckedRowKeys") ?? [])
                                            .map((id) => {
                                                return valid(globalContextService.get("DriversAddPage", `InsuranceExpiryDate${id}`) ?? "", ["^.{1,}$"], ["請選擇保險到期日"])[1]
                                            })
                                            .includes("請選擇保險到期日")
                                    ) {
                                        validMsg = "請選擇保險到期日";
                                    }
                                    //#endregion

                                    //#region 表單驗證後動作
                                    if (validMsg !== "") {
                                        // console.log(validMsg, globalContextService.get("BusAddPage"))
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
                                        props.AddDriverExecute({
                                            // id 新增不須上送此欄位
                                            // userId 新增不須上送此欄位
                                            account: globalContextService.get("DriversAddPage", "Cellphone"),
                                            password: globalContextService.get("DriversAddPage", "Uid")?.slice(-4),
                                            uid: globalContextService.get("DriversAddPage", "Uid"),
                                            name: globalContextService.get("DriversAddPage", "Name"),
                                            // "pic": "string", // 上傳圖片 待確定
                                            orgId: globalContextService.get("DriversAddPage", "CarDealership")?.value,
                                            sex: 0, // 畫面無此欄位，隨便塞 0
                                            status: globalContextService.get("DriversAddPage", "CanAssign")?.value,
                                            phone: globalContextService.get("DriversAddPage", "Cellphone"),
                                            remark: globalContextService.get("DriversAddPage", "DriverNote"),
                                            driverLicenses: (globalContextService.get("DriversAddPage", "DriverLicenseListCheckedRowsData") ?? []).map((item) => {
                                                return { categoryId: item?.id, categoryName: item?.name, expireDate: globalContextService.get("DriversAddPage", `LicenseExpiryDate${item?.id}`) }
                                            }),
                                            driverInsurance: (globalContextService.get("DriversAddPage", "DriverInsuranceListCheckedRowsData") ?? []).map((item) => {
                                                return { categoryId: item?.id, categoryName: item?.name, expireDate: globalContextService.get("DriversAddPage", `InsuranceExpiryDate${item?.id}`) }
                                            }),
                                        })
                                    }
                                    //#endregion

                                }}
                            />
                        </SubContainer>
                    </MainPageSubTitleBar>

                    {/* 基本資料表單區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.baseContainer}
                    >
                        {/* 上傳司機圖片容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptopL.driverImgFormContainer}
                        >
                            <FormRow>
                                {/* 上傳司機圖片 */}
                                <Upload
                                    // imageUrl={"/logo192.png"}
                                    theme={laptopL.driverImgUpload}
                                />
                            </FormRow>
                        </FormContainer>

                        {/* 基本資料右方容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptopL.baseRightFormContainer}
                        >
                            <FormRow>

                                {/* 姓名 Name */}
                                <TextInput
                                    topLabel={<>姓名<Text theme={laptopL.nameRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DriversAddPage", "Name") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DriversAddPage", "Name", value);
                                    }}
                                    theme={laptopL.name}
                                />

                                {/* 身分證字號 Uid */}
                                <TextInput
                                    topLabel={<>身分證字號<Text theme={laptopL.uidRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DriversAddPage", "Uid") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DriversAddPage", "Uid", value);
                                    }}
                                    theme={laptopL.uid}
                                />

                                {/* 性別 Sex */}
                                {/* <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>性別<Text theme={laptopL.sexRequired}>(必填)</Text></>}
                                    //viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("DriversAddPage", "Sex") ?? {}}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DriversAddPage", "Sex", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇性別", isDisabled: true },
                                        { value: 0, label: '女' },
                                        { value: 1, label: '男' }
                                    ]}
                                    // menuPosition={true}
                                    theme={laptopL.sex}
                                /> */}

                                {/* 手機 Cellphone */}
                                <TextInput
                                    topLabel={<>手機<Text theme={laptopL.cellphoneRequired}>(必填)</Text></>}
                                    bottomLabel={"手機號碼即為司機端APP帳號，建立後無法變更。 "}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DriversAddPage", "Cellphone") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DriversAddPage", "Cellphone", value);
                                    }}
                                    theme={laptopL.cellphone}
                                />

                                {/* 可否派發 CanAssign */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>可否派發<Text theme={laptopL.canAssignRequired}>(必填)</Text></>}
                                    //viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("DriversAddPage", "CanAssign") ?? {}}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DriversAddPage", "CanAssign", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇可否派發", isDisabled: true },
                                        { value: 1, label: '可派發' },
                                        { value: 0, label: '不可派發' }
                                    ]}
                                    // menuPosition={true}
                                    theme={laptopL.canAssign}
                                />

                                {/* 車行 CarDealership */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>車行<Text theme={laptopL.carDealershipRequired}>(必填)</Text></>}
                                    //viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("DriversAddPage", "CarDealership") ?? {}}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DriversAddPage", "CarDealership", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇車行", isDisabled: true },
                                        ...(props?.Orgs ?? [])
                                    ]}
                                    // menuPosition={true}
                                    theme={laptopL.carDealership}
                                />

                            </FormRow>
                        </FormContainer>

                    </BasicContainer>

                    {/* 備註 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"備註"}
                        theme={laptopL.driverNoteSubTitleBar}
                    />

                    {/* 備註表單區域容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.driverNoteContainer}
                    >
                        <FormRow>
                            {/* 備註 DriverNote */}
                            <Textarea
                                baseDefaultTheme={"DefaultTheme"}
                                placeholder={""}
                                value={globalContextService.get("DriversAddPage", "DriverNote") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DriversAddPage", "DriverNote", value);
                                    // console.log(value)
                                }}
                                theme={laptopL.driverNote}
                            />
                        </FormRow>
                    </FormContainer>

                    {/* 證照 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"證照"}
                        theme={laptopL.driverLicenseSubTitleBar}
                    />

                    {/* 證照 List區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        length={props.License?.data?.length}
                        theme={laptopL.driverLicenseListContainer}
                    >

                        {/* 證照 List */}
                        <OldList
                            checkbox={true}
                            checked={globalContextService.get("DriversAddPage", "DriverLicenseListCheckedRowKeys")}
                            checkedRowKeyName={"id"}
                            checkboxOnChecked={
                                (checkedRowKeys, checkedRows) => {
                                    // console.log(`已選擇的RowKeys: ${checkedRowKeys}`, '對應已選擇的RowKeys當列資料: ', checkedRows);
                                    globalContextService.set("DriversAddPage", "DriverLicenseListCheckedRowKeys", checkedRowKeys);
                                    globalContextService.set("DriversAddPage", "DriverLicenseListCheckedRowsData", checkedRows);

                                    //#region 取消勾選項時 清空對應欄位資料
                                    // let data = [
                                    //     { id: "minibus", licenseType: "職業小客車" },
                                    //     { id: "coach", licenseType: "職業大客車" },
                                    // ];
                                    let data = props.License?.data;

                                    (data ?? []).forEach(item => {
                                        if (!(checkedRowKeys ?? []).includes(item?.id)) {
                                            globalContextService.remove("DriversAddPage", `LicenseExpiryDate${item?.id}`);
                                        }
                                    });
                                    //#endregion
                                }
                            }
                            setPerCheckBoxDisabled={(record) => {
                                return {
                                    // ...record, // 對應CheckBox當列資料
                                    disabled: record.name === 'Arhua',// 對於所有的列，設定符合條件 (name等於Arhua) 的就禁用
                                }
                            }}
                            columnsAttr={
                                //#region 資料欄設定
                                [
                                    {
                                        title: '證照類型',
                                        width: "522px",
                                        dataIndex: 'name',
                                        sorter: (a, b) => a.name.length - b.name.length,
                                    },
                                    {
                                        title: <>證照到期日<Text theme={laptopL.licenseExpiryDateRequired}>(有該證照則為必填)</Text></>,
                                        width: "522px",
                                        // dataIndex: 'expiryDate',
                                        // sorter: (a, b) => a.expiryDate.length - b.expiryDate.length,
                                        render: (rowData) => {
                                            return (
                                                <FormRow>
                                                    <DateTimePicker
                                                        // type={"time"} time、date、week、month、quarter、year
                                                        type={"date"}
                                                        format={"YYYY-MM-DD"}
                                                        disable={!(globalContextService.get("DriversAddPage", "DriverLicenseListCheckedRowKeys") ?? []).includes(rowData?.id)}
                                                        bascDefaultTheme={"DefaultTheme"}
                                                        // viewType
                                                        isSearchable
                                                        placeholder={""}
                                                        value={
                                                            (globalContextService.get("DriversAddPage", `LicenseExpiryDate${rowData?.id}`) ?
                                                                moment(globalContextService.get("DriversAddPage", `LicenseExpiryDate${rowData?.id}`), "YYYY-MM-DD")
                                                                :
                                                                null
                                                            )
                                                        }
                                                        onChange={(value, momentObj) => {
                                                            globalContextService.set("DriversAddPage", `LicenseExpiryDate${rowData?.id}`, value);
                                                        }}
                                                        theme={laptopL.licenseExpiryDate}
                                                    />
                                                </FormRow>
                                            )
                                        }
                                    }
                                ]
                                //#endregion
                            }
                            hidePageFoot
                            data={props.License?.data}
                        // data={[
                        //     { id: "minibus", licenseType: "職業小客車" },
                        //     { id: "coach", licenseType: "職業大客車" },
                        // ]} // 寫死項目
                        />
                    </BasicContainer>

                    {/* 保險 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"保險"}
                        theme={laptopL.driverInsuranceSubTitleBar}
                    />

                    {/* 保險 List區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        length={props.Insurance?.data?.length}
                        theme={laptopL.driverInsuranceListContainer}
                    >

                        {/* 保險 List */}
                        <OldList
                            checkbox={true}
                            checked={globalContextService.get("DriversAddPage", "DriverInsuranceListCheckedRowKeys")}
                            checkedRowKeyName={"id"}
                            checkboxOnChecked={
                                (checkedRowKeys, checkedRows) => {
                                    // console.log(`已選擇的RowKeys: ${checkedRowKeys}`, '對應已選擇的RowKeys當列資料: ', checkedRows);
                                    globalContextService.set("DriversAddPage", "DriverInsuranceListCheckedRowKeys", checkedRowKeys);
                                    globalContextService.set("DriversAddPage", "DriverInsuranceListCheckedRowsData", checkedRows);

                                    //#region 取消勾選項時 清空對應欄位資料
                                    // let data = [
                                    //     { id: "labor", insuranceType: "勞保" },
                                    // ];
                                    let data = props.Insurance?.data;

                                    (data ?? []).forEach(item => {
                                        if (!(checkedRowKeys ?? []).includes(item?.id)) {
                                            globalContextService.remove("DriversAddPage", `InsuranceExpiryDate${item?.id}`);
                                        }
                                    });
                                    //#endregion
                                }
                            }
                            setPerCheckBoxDisabled={(record) => {
                                return {
                                    // ...record, // 對應CheckBox當列資料
                                    disabled: record.name === 'Arhua',// 對於所有的列，設定符合條件 (name等於Arhua) 的就禁用
                                }
                            }}
                            columnsAttr={
                                //#region 資料欄設定
                                [
                                    {
                                        title: '保險類型',
                                        width: "522px",
                                        dataIndex: 'name',
                                        sorter: (a, b) => a.name.length - b.name.length,
                                    },
                                    {
                                        title: <>保險到期日<Text theme={laptopL.insuranceExpiryDateRequired}>(有該保險則為必填)</Text></>,
                                        width: "522px",
                                        // dataIndex: 'expiryDate',
                                        // sorter: (a, b) => a.expiryDate.length - b.expiryDate.length,
                                        render: (rowData) => {
                                            return (
                                                <FormRow>
                                                    <DateTimePicker
                                                        // type={"time"} time、date、week、month、quarter、year
                                                        type={"date"}
                                                        format={"YYYY-MM-DD"}
                                                        disable={!(globalContextService.get("DriversAddPage", "DriverInsuranceListCheckedRowKeys") ?? []).includes(rowData?.id)}
                                                        bascDefaultTheme={"DefaultTheme"}
                                                        // viewType
                                                        isSearchable
                                                        placeholder={""}
                                                        value={
                                                            (globalContextService.get("DriversAddPage", `InsuranceExpiryDate${rowData?.id}`) ?
                                                                moment(globalContextService.get("DriversAddPage", `InsuranceExpiryDate${rowData?.id}`), "YYYY-MM-DD")
                                                                :
                                                                null
                                                            )
                                                        }
                                                        onChange={(value, momentObj) => {
                                                            globalContextService.set("DriversAddPage", `InsuranceExpiryDate${rowData?.id}`, value);
                                                        }}
                                                        theme={laptopL.insuranceExpiryDate}
                                                    />
                                                </FormRow>
                                            )
                                        }
                                    }
                                ]
                                //#endregion
                            }
                            hidePageFoot
                            data={props.Insurance?.data}
                        // data={[
                        //     { id: "labor", insuranceType: "勞保" },
                        // ]} // 寫死項目
                        />

                    </BasicContainer>

                    {/* 底部儲存按鈕 外層容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.bottomSaveButtonContainer}
                    >
                        {/* 底部儲存按鈕 列容器 */}
                        <FormRow
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptopL.bottomSaveButtonRowContainer}
                        >
                            {/*  底部儲存按鈕 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 底部儲存按鈕 */}
                                <BasicButton
                                    baseDefaultTheme={"PrimaryTheme"}
                                    text={"儲存"}
                                    theme={laptopL.bottomSaveButton}
                                    onClick={() => {
                                        //#region 表單驗證
                                        let validMsg = "";
                                        if (valid(globalContextService.get("DriversAddPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                            validMsg = valid(globalContextService.get("DriversAddPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                        }
                                        else if (valid(globalContextService.get("DriversAddPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]) {
                                            validMsg = valid(globalContextService.get("DriversAddPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]
                                        }
                                        else if (valid(globalContextService.get("DriversAddPage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["請輸入手機", "請輸入正確的手機號碼"])[1]) {
                                            validMsg = valid(globalContextService.get("DriversAddPage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["請輸入手機", "請輸入正確的手機號碼"])[1]
                                        }
                                        else if (valid(globalContextService.get("DriversAddPage", "CanAssign")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]) {
                                            validMsg = valid(globalContextService.get("DriversAddPage", "CanAssign")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]
                                        }
                                        else if (valid(globalContextService.get("DriversAddPage", "CarDealership")?.value ?? "", ["^.{1,}$"], ["請選擇車行"])[1]) {
                                            validMsg = valid(globalContextService.get("DriversAddPage", "CarDealership")?.value ?? "", ["^.{1,}$"], ["請選擇車行"])[1]
                                        }
                                        else if (
                                            (globalContextService.get("DriversAddPage", "DriverLicenseListCheckedRowKeys") ?? [])
                                                .map((id) => {
                                                    return valid(globalContextService.get("DriversAddPage", `LicenseExpiryDate${id}`) ?? "", ["^.{1,}$"], ["請選擇證照到期日"])[1]
                                                })
                                                .includes("請選擇證照到期日")
                                        ) {
                                            validMsg = "請選擇證照到期日";
                                        }
                                        else if (
                                            (globalContextService.get("DriversAddPage", "DriverInsuranceListCheckedRowKeys") ?? [])
                                                .map((id) => {
                                                    return valid(globalContextService.get("DriversAddPage", `InsuranceExpiryDate${id}`) ?? "", ["^.{1,}$"], ["請選擇保險到期日"])[1]
                                                })
                                                .includes("請選擇保險到期日")
                                        ) {
                                            validMsg = "請選擇保險到期日";
                                        }
                                        //#endregion

                                        //#region 表單驗證後動作
                                        if (validMsg !== "") {
                                            // console.log(validMsg, globalContextService.get("BusAddPage"))
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
                                            props.AddDriverExecute({
                                                // id 新增不須上送此欄位
                                                // userId 新增不須上送此欄位
                                                account: globalContextService.get("DriversAddPage", "Cellphone"),
                                                password: globalContextService.get("DriversAddPage", "Uid")?.slice(-4),
                                                uid: globalContextService.get("DriversAddPage", "Uid"),
                                                name: globalContextService.get("DriversAddPage", "Name"),
                                                // "pic": "string", // 上傳圖片 待確定
                                                orgId: globalContextService.get("DriversAddPage", "CarDealership")?.value,
                                                sex: 0, // 畫面無此欄位，隨便塞 0
                                                status: globalContextService.get("DriversAddPage", "CanAssign")?.value,
                                                phone: globalContextService.get("DriversAddPage", "Cellphone"),
                                                remark: globalContextService.get("DriversAddPage", "DriverNote"),
                                                driverLicenses: (globalContextService.get("DriversAddPage", "DriverLicenseListCheckedRowsData") ?? []).map((item) => {
                                                    return { categoryId: item?.id, categoryName: item?.name, expireDate: globalContextService.get("DriversAddPage", `LicenseExpiryDate${item?.id}`) }
                                                }),
                                                driverInsurance: (globalContextService.get("DriversAddPage", "DriverInsuranceListCheckedRowsData") ?? []).map((item) => {
                                                    return { categoryId: item?.id, categoryName: item?.name, expireDate: globalContextService.get("DriversAddPage", `InsuranceExpiryDate${item?.id}`) }
                                                }),
                                            })
                                        }
                                        //#endregion

                                    }}
                                />
                            </SubContainer>
                        </FormRow>
                    </FormContainer>
                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`