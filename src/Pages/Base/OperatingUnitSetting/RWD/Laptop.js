import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal } from '../../../../Components';
import { ReactComponent as Plus } from '../../../../Assets/img/CasePage/Plus.svg'
import { useHistory } from 'react-router-dom';
import { getParseItemLocalStorage, valid } from '../../../../Handlers/'
import Select from 'react-select'
import { treeSelectorTransducer } from '../../../../Components/Form/TreeSelector/TreeSelector';
import isUndefined from 'lodash/isUndefined';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { operatingUnitSetting: { rwd: { laptop } } } } = Theme;

  
    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"營運單位設定"}
                            theme={laptop.titleBar}
                            onSubmit={(e) => {
                                console.log("目前不支援搜尋功能")
                                // props.GetSubOrgsExecute(true, "");
                            }}
                        >
                            {/* 新增按鈕容器 */}
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
                                                // props.controllGCS("addClientModalClose")
                                            },
                                            yesOnClick: (e, close) => {
                                                //#region 表單驗證
                                                let validMsg = "";
                                                if (valid(globalContextService.get("OperatingUnitSettingPage", "CarDealerShipName") ?? "", ["^.{1,}$"], ["請輸入車行名稱"])[1]) {
                                                    validMsg = valid(globalContextService.get("OperatingUnitSettingPage", "CarDealerShipName") ?? "", ["^.{1,}$"], ["請輸入車行名稱"])[1]
                                                }
                                                else if (valid(globalContextService.get("OperatingUnitSettingPage", "Email") ?? "", ["^.{1,}$"], ["請輸入電子郵件"])[1]) {
                                                    validMsg = valid(globalContextService.get("OperatingUnitSettingPage", "Email") ?? "", ["^.{1,}$"], ["請輸入電子郵件"])[1]
                                                }
                                                else if (valid(globalContextService.get("OperatingUnitSettingPage", "MainContactName") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人姓名"])[1]) {
                                                    validMsg = valid(globalContextService.get("OperatingUnitSettingPage", "MainContactName") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人姓名"])[1]
                                                }
                                                else if (valid(globalContextService.get("OperatingUnitSettingPage", "Phone") ?? "", ["^.{1,}$"], ["請輸入主要聯絡市話"])[1]) {
                                                    validMsg = valid(globalContextService.get("OperatingUnitSettingPage", "Phone") ?? "", ["^.{1,}$"], ["請輸入主要聯絡市話"])[1]
                                                }
                                                else if (valid(globalContextService.get("OperatingUnitSettingPage", "Counties")?.value ?? "", ["^.{1,}$"], ["請選擇縣市"])[1]) {
                                                    validMsg = valid(globalContextService.get("OperatingUnitSettingPage", "Counties")?.value ?? "", ["^.{1,}$"], ["請選擇縣市"])[1]
                                                }
                                                else if (valid(globalContextService.get("OperatingUnitSettingPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇區域"])[1]) {
                                                    validMsg = valid(globalContextService.get("OperatingUnitSettingPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇區域"])[1]
                                                }
                                                else if (valid(globalContextService.get("OperatingUnitSettingPage", "Road") ?? "", ["^.{1,}$"], ["請輸入路名"])[1]) {
                                                    validMsg = valid(globalContextService.get("OperatingUnitSettingPage", "Road") ?? "", ["^.{1,}$"], ["請輸入路名"])[1]
                                                }
                                                //#endregion

                                                //#region 表單驗證後動作
                                                if (validMsg !== "") {
                                                    // console.log(validMsg, globalContextService.get("OperatingUnitSettingPage"))
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
                                                    // props.AddOrUpdateClientExecute({
                                                    //     name: globalContextService.get("OperatingUnitSettingPage", `Name`),
                                                    //     longitude: globalContextService.get("OperatingUnitSettingPage", "Longitude"),
                                                    //     latitude: globalContextService.get("OperatingUnitSettingPage", "Latitude"),
                                                    //     counties: globalContextService.get("OperatingUnitSettingPage", "Counties").value,
                                                    //     district: globalContextService.get("OperatingUnitSettingPage", "District")?.value,
                                                    //     road: globalContextService.get("OperatingUnitSettingPage", "Road"),
                                                    // })
                                                    close();
                                                }
                                                //#endregion
                                            },
                                            closeIconOnClick: (e) => {
                                                // props.controllGCS("addClientModalClose")
                                            },
                                            content: (
                                                <FormContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    theme={laptop.addFormContainer}
                                                >
                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                        {/* 新增彈窗 - 車行名稱 CarDealerShipName */}
                                                        <TextInput
                                                            // viewType
                                                            topLabel={<>車行名稱<Text theme={laptop.carDealerShipNameRequired}>(必填)</Text></>}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={""}
                                                            value={globalContextService.get("OperatingUnitSettingPage", "CarDealerShipName") ?? rowData.carDealerShipName}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("OperatingUnitSettingPage", "CarDealerShipName", value);
                                                            }}
                                                            theme={laptop.carDealerShipName}
                                                        />

                                                        {/* 新增彈窗 - 接收訂單通知Email Email */}
                                                        <TextInput
                                                            // viewType
                                                            topLabel={<>接收訂單通知Email<Text theme={laptop.emailRequired}>(必填)</Text></>}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={""}
                                                            value={globalContextService.get("OperatingUnitSettingPage", "Email") ?? rowData.email}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("OperatingUnitSettingPage", "Email", value);
                                                            }}
                                                            theme={laptop.email}
                                                        />

                                                        {/* 新增彈窗 - 主要聯絡人姓名 MainContactName */}
                                                        <TextInput
                                                            // viewType
                                                            topLabel={<>主要聯絡人姓名<Text theme={laptop.mainContactNameRequired}>(必填)</Text></>}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={""}
                                                            value={globalContextService.get("OperatingUnitSettingPage", "MainContactName") ?? rowData.mainContactName}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("OperatingUnitSettingPage", "MainContactName", value);
                                                            }}
                                                            theme={laptop.mainContactName}
                                                        />

                                                        {/* 新增彈窗 - 聯絡市話 Phone */}
                                                        <TextInput
                                                            // viewType
                                                            topLabel={<>聯絡市話<Text theme={laptop.phoneRequired}>(必填)</Text></>}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={""}
                                                            value={globalContextService.get("OperatingUnitSettingPage", "Phone") ?? rowData.phone}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("OperatingUnitSettingPage", "Phone", value);
                                                            }}
                                                            theme={laptop.phone}
                                                        />

                                                        {/* 新增彈窗 - 聯絡手機 Cellphone */}
                                                        <TextInput
                                                            // viewType
                                                            topLabel={"聯絡手機"}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={""}
                                                            value={globalContextService.get("OperatingUnitSettingPage", "Cellphone") ?? rowData.cellPhone}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("OperatingUnitSettingPage", "Cellphone", value);
                                                            }}
                                                            theme={laptop.cellPhone}
                                                        />

                                                        {/* 新增彈窗 - 縣市 Counties */}
                                                        <Selector
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            topLabel={<>地址<Text theme={laptop.addCountiesRequired}>(必填)</Text></>}
                                                            //viewType
                                                            isSearchable
                                                            placeholder={"請選擇縣市"}
                                                            // isMulti
                                                            // hideSelectedOptions={false}
                                                            value={globalContextService.get("OperatingUnitSettingPage", "Counties") ?? {}}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("OperatingUnitSettingPage", "Counties", value);
                                                            }}

                                                            options={[
                                                                { value: 'hint', label: "請選擇縣市", isDisabled: true },
                                                                { value: '0', label: '台北市' },
                                                                { value: '1', label: '新北市' }
                                                            ]}
                                                            menuPosition={true}
                                                            theme={laptop.addCounties}
                                                        />
                                                        {/* 新增彈窗 - 區域 District */}
                                                        <Selector
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            // topLabel={<>區域<Text theme={laptop.addDistrictRequired}>(必填)</Text></>}
                                                            //viewType
                                                            isSearchable
                                                            placeholder={"請選擇區域"}
                                                            // isMulti
                                                            // hideSelectedOptions={false}
                                                            value={globalContextService.get("OperatingUnitSettingPage", "District") ?? null}
                                                            onChange={(e, value, onInitial) => {
                                                                // console.log(value)
                                                                globalContextService.set("OperatingUnitSettingPage", "District", value);
                                                            }}

                                                            options={[
                                                                { value: '0', label: "請選擇區域", isDisabled: true },
                                                                { value: '1', label: 'XX區' },
                                                                { value: '2', label: 'XX區' }
                                                            ]}
                                                            menuPosition={true}
                                                            theme={laptop.addDistrict}
                                                        />
                                                        {/* 新增彈窗 - 路名 Road */}
                                                        <TextInput
                                                            // viewType
                                                            // topLabel={"路名"}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={"請輸入路名"}
                                                            value={globalContextService.get("OperatingUnitSettingPage", "Road") ?? rowData.road}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("OperatingUnitSettingPage", "Road", value);
                                                            }}
                                                            theme={laptop.addRoad}
                                                        />
                                                    </FormRow>
                                                </FormContainer>
                                            ),
                                            theme: laptop.addModal
                                        })
                                        //#endregion
                                    }}
                                >
                                    {/* 新增個案按鈕 圖標 */}
                                    <Plus style={laptop.addButtonIcon} />
                                    新增
                                </NativeLineButton>
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
                        checkbox={false}
                        // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                        checkedRowKeyName={"id"}
                        checkboxOnChecked={
                            (checkedRowKeys, checkedRows) => {
                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                globalContextService.set("CarsPage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("CarsPage", "CheckedRowsData", checkedRows);
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
                                    title: '車行名稱',
                                    width: "250px",
                                    dataIndex: 'carDealerShipName',
                                    sorter: (a, b) => a.carDealerShipName.length - b.carDealerShipName.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '接收訂單通知email',
                                    width: "200px",
                                    dataIndex: 'email',
                                    // sorter: (a, b) => a.carType.length - b.carType.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '主要聯絡人姓名',
                                    width: "123px",
                                    dataIndex: 'mainContactName',
                                    // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '聯絡市話',
                                    width: "111px",
                                    dataIndex: 'phone',
                                    // sorter: (a, b) => a.wheelchairCount.length - b.wheelchairCount.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '聯絡手機',
                                    width: "111px",
                                    dataIndex: 'cellPhone',
                                    // sorter: (a, b) => a.wheelchairCount.length - b.wheelchairCount.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '地址(縣市)',
                                    width: "94px",
                                    dataIndex: 'counties',
                                    // sorter: (a, b) => a.seat.length - b.seat.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '地址(區域)',
                                    width: "94px",
                                    dataIndex: 'district',
                                    // sorter: (a, b) => a.seat.length - b.seat.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '地址(路名)',
                                    width: "292px",
                                    dataIndex: 'road',
                                    // sorter: (a, b) => a.name.length - b.name.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '狀態控制台',
                                    width: "97px",
                                    // dataIndex: 'parentName',
                                    // sorter: (a, b) => a.name.length - b.name.length,
                                    fixed: 'right',
                                    render: (rowData) => {
                                        return (
                                            <>
                                                {/* 編輯按鈕 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={laptop.editButton}
                                                    onClick={(e) => {
                                                        e.preventDefault();

                                                        let rowData = {};

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
                                                                // props.controllGCS("addClientModalClose")
                                                            },
                                                            yesOnClick: (e, close) => {
                                                                //#region 表單驗證
                                                                let validMsg = "";
                                                                if (valid(globalContextService.get("OperatingUnitSettingPage", "CarDealerShipName") ?? "", ["^.{1,}$"], ["請輸入車行名稱"])[1]) {
                                                                    validMsg = valid(globalContextService.get("OperatingUnitSettingPage", "CarDealerShipName") ?? "", ["^.{1,}$"], ["請輸入車行名稱"])[1]
                                                                }
                                                                else if (valid(globalContextService.get("OperatingUnitSettingPage", "Email") ?? "", ["^.{1,}$"], ["請輸入電子郵件"])[1]) {
                                                                    validMsg = valid(globalContextService.get("OperatingUnitSettingPage", "Email") ?? "", ["^.{1,}$"], ["請輸入電子郵件"])[1]
                                                                }
                                                                else if (valid(globalContextService.get("OperatingUnitSettingPage", "MainContactName") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人姓名"])[1]) {
                                                                    validMsg = valid(globalContextService.get("OperatingUnitSettingPage", "MainContactName") ?? "", ["^.{1,}$"], ["請輸入主要聯絡人姓名"])[1]
                                                                }
                                                                else if (valid(globalContextService.get("OperatingUnitSettingPage", "Phone") ?? "", ["^.{1,}$"], ["請輸入主要聯絡市話"])[1]) {
                                                                    validMsg = valid(globalContextService.get("OperatingUnitSettingPage", "Phone") ?? "", ["^.{1,}$"], ["請輸入主要聯絡市話"])[1]
                                                                }
                                                                else if (valid(globalContextService.get("OperatingUnitSettingPage", "Counties")?.value ?? "", ["^.{1,}$"], ["請選擇縣市"])[1]) {
                                                                    validMsg = valid(globalContextService.get("OperatingUnitSettingPage", "Counties")?.value ?? "", ["^.{1,}$"], ["請選擇縣市"])[1]
                                                                }
                                                                else if (valid(globalContextService.get("OperatingUnitSettingPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇區域"])[1]) {
                                                                    validMsg = valid(globalContextService.get("OperatingUnitSettingPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇區域"])[1]
                                                                }
                                                                else if (valid(globalContextService.get("OperatingUnitSettingPage", "Road") ?? "", ["^.{1,}$"], ["請輸入路名"])[1]) {
                                                                    validMsg = valid(globalContextService.get("OperatingUnitSettingPage", "Road") ?? "", ["^.{1,}$"], ["請輸入路名"])[1]
                                                                }
                                                                //#endregion

                                                                //#region 表單驗證後動作
                                                                if (validMsg !== "") {
                                                                    // console.log(validMsg, globalContextService.get("OperatingUnitSettingPage"))
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
                                                                    // props.AddOrUpdateClientExecute({
                                                                    //     name: globalContextService.get("OperatingUnitSettingPage", `Name`),
                                                                    //     longitude: globalContextService.get("OperatingUnitSettingPage", "Longitude"),
                                                                    //     latitude: globalContextService.get("OperatingUnitSettingPage", "Latitude"),
                                                                    //     counties: globalContextService.get("OperatingUnitSettingPage", "Counties").value,
                                                                    //     district: globalContextService.get("OperatingUnitSettingPage", "District")?.value,
                                                                    //     road: globalContextService.get("OperatingUnitSettingPage", "Road"),
                                                                    // })
                                                                    close();
                                                                }
                                                                //#endregion
                                                            },
                                                            closeIconOnClick: (e) => {
                                                                // props.controllGCS("addClientModalClose")
                                                            },
                                                            content: (
                                                                <FormContainer
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    onSubmit={(e) => {
                                                                        e.preventDefault();
                                                                    }}
                                                                    theme={laptop.addFormContainer}
                                                                >
                                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                        {/* 新增彈窗 - 車行名稱 CarDealerShipName */}
                                                                        <TextInput
                                                                            // viewType
                                                                            topLabel={<>車行名稱<Text theme={laptop.carDealerShipNameRequired}>(必填)</Text></>}
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            type="text"
                                                                            placeholder={""}
                                                                            value={globalContextService.get("OperatingUnitSettingPage", "CarDealerShipName") ?? rowData.carDealerShipName}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("OperatingUnitSettingPage", "CarDealerShipName", value);
                                                                            }}
                                                                            theme={laptop.carDealerShipName}
                                                                        />

                                                                        {/* 新增彈窗 - 接收訂單通知Email Email */}
                                                                        <TextInput
                                                                            // viewType
                                                                            topLabel={<>接收訂單通知Email<Text theme={laptop.emailRequired}>(必填)</Text></>}
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            type="text"
                                                                            placeholder={""}
                                                                            value={globalContextService.get("OperatingUnitSettingPage", "Email") ?? rowData.email}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("OperatingUnitSettingPage", "Email", value);
                                                                            }}
                                                                            theme={laptop.email}
                                                                        />

                                                                        {/* 新增彈窗 - 主要聯絡人姓名 MainContactName */}
                                                                        <TextInput
                                                                            // viewType
                                                                            topLabel={<>主要聯絡人姓名<Text theme={laptop.mainContactNameRequired}>(必填)</Text></>}
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            type="text"
                                                                            placeholder={""}
                                                                            value={globalContextService.get("OperatingUnitSettingPage", "MainContactName") ?? rowData.mainContactName}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("OperatingUnitSettingPage", "MainContactName", value);
                                                                            }}
                                                                            theme={laptop.mainContactName}
                                                                        />

                                                                        {/* 新增彈窗 - 聯絡市話 Phone */}
                                                                        <TextInput
                                                                            // viewType
                                                                            topLabel={<>聯絡市話<Text theme={laptop.phoneRequired}>(必填)</Text></>}
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            type="text"
                                                                            placeholder={""}
                                                                            value={globalContextService.get("OperatingUnitSettingPage", "Phone") ?? rowData.phone}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("OperatingUnitSettingPage", "Phone", value);
                                                                            }}
                                                                            theme={laptop.phone}
                                                                        />

                                                                        {/* 新增彈窗 - 聯絡手機 Cellphone */}
                                                                        <TextInput
                                                                            // viewType
                                                                            topLabel={"聯絡手機"}
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            type="text"
                                                                            placeholder={""}
                                                                            value={globalContextService.get("OperatingUnitSettingPage", "Cellphone") ?? rowData.cellPhone}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("OperatingUnitSettingPage", "Cellphone", value);
                                                                            }}
                                                                            theme={laptop.cellPhone}
                                                                        />

                                                                        {/* 新增彈窗 - 縣市 Counties */}
                                                                        <Selector
                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                            topLabel={<>地址<Text theme={laptop.addCountiesRequired}>(必填)</Text></>}
                                                                            //viewType
                                                                            isSearchable
                                                                            placeholder={"請選擇縣市"}
                                                                            // isMulti
                                                                            // hideSelectedOptions={false}
                                                                            value={globalContextService.get("OperatingUnitSettingPage", "Counties") ?? null}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("OperatingUnitSettingPage", "Counties", value);
                                                                            }}

                                                                            options={[
                                                                                { value: 'hint', label: "請選擇縣市", isDisabled: true },
                                                                                { value: '0', label: '台北市' },
                                                                                { value: '1', label: '新北市' }
                                                                            ]}
                                                                            menuPosition={true}
                                                                            theme={laptop.addCounties}
                                                                        />
                                                                        {/* 新增彈窗 - 區域 District */}
                                                                        <Selector
                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                            // topLabel={<>區域<Text theme={laptop.addDistrictRequired}>(必填)</Text></>}
                                                                            //viewType
                                                                            isSearchable
                                                                            placeholder={"請選擇區域"}
                                                                            // isMulti
                                                                            // hideSelectedOptions={false}
                                                                            value={globalContextService.get("OperatingUnitSettingPage", "District") ?? null}
                                                                            onChange={(e, value, onInitial) => {
                                                                                // console.log(value)
                                                                                globalContextService.set("OperatingUnitSettingPage", "District", value);
                                                                            }}

                                                                            options={[
                                                                                { value: '0', label: "請選擇區域", isDisabled: true },
                                                                                { value: '1', label: 'XX區' },
                                                                                { value: '2', label: 'XX區' }
                                                                            ]}
                                                                            menuPosition={true}
                                                                            theme={laptop.addDistrict}
                                                                        />
                                                                        {/* 新增彈窗 - 路名 Road */}
                                                                        <TextInput
                                                                            // viewType
                                                                            // topLabel={"路名"}
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            type="text"
                                                                            placeholder={"請輸入路名"}
                                                                            value={globalContextService.get("OperatingUnitSettingPage", "Road") ?? rowData.road}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("OperatingUnitSettingPage", "Road", value);
                                                                            }}
                                                                            theme={laptop.addRoad}
                                                                        />
                                                                    </FormRow>
                                                                </FormContainer>
                                                            ),
                                                            theme: laptop.addModal
                                                        })
                                                        //#endregion
                                                    }}
                                                >編輯
                                                </NativeLineButton>
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
                        data={[{ id: "asdasd-415asd1sa5d-asd", carDealerShipName: "aaa", email: "abc123@gmail.com", mainContactName: "ccc", phone: "0212345678", cellPhone: "0912345678", counties: '台北市', district: "XX區", road: "uiweu" },
                        ]}
                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                        // data={props.SubOrgs.data}
                        clickPage={(currentPage, pageSize) => {
                        }}
                    />
                </BasicContainer>

            </MainPageContainer>

        </>

    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`

