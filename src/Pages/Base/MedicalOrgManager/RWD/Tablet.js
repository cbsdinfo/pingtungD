import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal } from '../../../../Components';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Search } from '../../../../Assets/img/MedicalOrgManager/Search.svg'
import { ReactComponent as Plus } from '../../../../Assets/img/MedicalOrgManager/Plus.svg'
import { getParseItemLocalStorage, valid } from '../../../../Handlers/'
import Select from 'react-select'
import { treeSelectorTransducer } from '../../../../Components/Form/TreeSelector/TreeSelector';
import isUndefined from 'lodash/isUndefined';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { medicalOrgManager: { rwd: { tablet } } } } = Theme;


    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"醫療院所管理"}
                            theme={tablet.titleBar}
                            onSubmit={(e) => {
                                console.log("目前不支援搜尋功能")
                                // props.GetSubOrgsExecute(true, "");
                            }
                            }
                        >
                            {/* 單選下拉選單 請選擇縣市 */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                //viewType
                                isSearchable
                                placeholder={"請選擇縣市"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("MedicalOrgManagerPage", "Counties") ?? [{ value: '2', label: '新北市' }]}
                                //value={globalContextService.get("MedicalOrgManagerPage", "Counties") ?? [{ value: '1', label: '長照個案' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("MedicalOrgManagerPage", "Counties", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇縣市", isDisabled: true },
                                    { value: '1', label: '台北市' },
                                    { value: '2', label: '新北市' },
                                ]}
                                theme={tablet.counties}

                            />
                            {/* 請選擇區域 District */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={""}
                                //viewType
                                isSearchable
                                placeholder={"請選擇區域"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("MedicalOrgManagerPage", "District") ?? null}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("MedicalOrgManagerPage", "District", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇區域", isDisabled: true },
                                    { value: '1', label: 'XX區' },
                                    { value: '2', label: 'XX區' }
                                ]}
                                // menuPosition={true}
                                theme={tablet.district}
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
                                    />
                                }
                                value={globalContextService.get("MedicalOrgManagerPage", "Keyword") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("MedicalOrgManagerPage", "Keyword", value);
                                }}
                            />
                            {/* 新增按鈕容器 */}
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
                                                // props.controllGCS("addClientModalClose")
                                            },
                                            yesOnClick: (e, close) => {
                                                //#region 表單驗證
                                                let validMsg = "";
                                                if (valid(globalContextService.get("MedicalOrgManagerPage", "Name") ?? "", ["^.{1,}$"], ["請輸入名稱"])[1]) {
                                                    validMsg = valid(globalContextService.get("MedicalOrgManagerPage", "Name") ?? "", ["^.{1,}$"], ["請輸入名稱"])[1]
                                                }
                                                else if (valid(globalContextService.get("MedicalOrgManagerPage", "Counties")?.value ?? "", ["^.{1,}$"], ["請選擇縣市"])[1]) {
                                                    validMsg = valid(globalContextService.get("MedicalOrgManagerPage", "Counties")?.value ?? "", ["^.{1,}$"], ["請選擇縣市"])[1]
                                                }
                                                else if (valid(globalContextService.get("MedicalOrgManagerPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇區域"])[1]) {
                                                    validMsg = valid(globalContextService.get("MedicalOrgManagerPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇區域"])[1]
                                                }
                                                else if (valid(globalContextService.get("MedicalOrgManagerPage", "Road") ?? "", ["^.{1,}$"], ["請輸入路名"])[1]) {
                                                    validMsg = valid(globalContextService.get("MedicalOrgManagerPage", "Road") ?? "", ["^.{1,}$"], ["請輸入路名"])[1]
                                                }
                                                //#endregion

                                                //#region 表單驗證後動作
                                                if (validMsg !== "") {
                                                    // console.log(validMsg, globalContextService.get("MedicalOrgManagerPage"))
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
                                                    //     name: globalContextService.get("MedicalOrgManagerPage", `Name`),
                                                    //     longitude: globalContextService.get("MedicalOrgManagerPage", "Longitude"),
                                                    //     latitude: globalContextService.get("MedicalOrgManagerPage", "Latitude"),
                                                    //     counties: globalContextService.get("MedicalOrgManagerPage", "Counties").value,
                                                    //     district: globalContextService.get("MedicalOrgManagerPage", "District")?.value,
                                                    //     road: globalContextService.get("MedicalOrgManagerPage", "Road"),
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
                                                    theme={tablet.addFormContainer}
                                                >
                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                        {/* 新增彈窗 - 名稱 Name */}
                                                        <TextInput
                                                            // viewType
                                                            topLabel={<>名稱<Text theme={tablet.nameRequired}>(必填)</Text></>}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={""}
                                                            value={globalContextService.get("MedicalOrgManagerPage", "Name") ?? rowData.name}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("MedicalOrgManagerPage", "Name", value);
                                                            }}
                                                            theme={tablet.name}
                                                        />

                                                        {/* 新增彈窗 - 經度 Longitude */}
                                                        <TextInput
                                                            // viewType
                                                            topLabel={"經度"}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={""}
                                                            value={globalContextService.get("MedicalOrgManagerPage", "Longitude") ?? rowData.longitude}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("MedicalOrgManagerPage", "Longitude", value);
                                                            }}
                                                            theme={tablet.longitude}
                                                        />

                                                        {/* 新增彈窗 - 緯度 Latitude */}
                                                        <TextInput
                                                            // viewType
                                                            topLabel={"緯度"}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={""}
                                                            value={globalContextService.get("MedicalOrgManagerPage", "Latitude") ?? rowData.latitude}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("MedicalOrgManagerPage", "Latitude", value);
                                                            }}
                                                            theme={tablet.latitude}
                                                        />

                                                        {/* 新增彈窗 - 縣市 Counties */}
                                                        <Selector
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            topLabel={<>地址<Text theme={tablet.addCountiesRequired}>(必填)</Text></>}
                                                            //viewType
                                                            isSearchable
                                                            placeholder={"請選擇縣市"}
                                                            // isMulti
                                                            // hideSelectedOptions={false}
                                                            value={globalContextService.get("MedicalOrgManagerPage", "Counties") ?? {}}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("MedicalOrgManagerPage", "Counties", value);
                                                            }}

                                                            options={[
                                                                { value: 'hint', label: "請選擇縣市", isDisabled: true },
                                                                { value: '0', label: '台北市' },
                                                                { value: '1', label: '新北市' }
                                                            ]}
                                                            menuPosition={true}
                                                            theme={tablet.addCounties}
                                                        />
                                                        {/* 新增彈窗 - 區域 District */}
                                                        <Selector
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            // topLabel={<>區域<Text theme={tablet.addDistrictRequired}>(必填)</Text></>}
                                                            //viewType
                                                            isSearchable
                                                            placeholder={"請選擇區域"}
                                                            // isMulti
                                                            // hideSelectedOptions={false}
                                                            value={globalContextService.get("MedicalOrgManagerPage", "District") ?? null}
                                                            onChange={(e, value, onInitial) => {
                                                                // console.log(value)
                                                                globalContextService.set("MedicalOrgManagerPage", "District", value);
                                                            }}

                                                            options={[
                                                                { value: '0', label: "請選擇區域", isDisabled: true },
                                                                { value: '1', label: 'XX區' },
                                                                { value: '2', label: 'XX區' }
                                                            ]}
                                                            menuPosition={true}
                                                            theme={tablet.addDistrict}
                                                        />
                                                        {/* 新增彈窗 - 路名 Road */}
                                                        <TextInput
                                                            // viewType
                                                            // topLabel={"路名"}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={"請輸入路名"}
                                                            value={globalContextService.get("MedicalOrgManagerPage", "Road") ?? rowData.road}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("MedicalOrgManagerPage", "Road", value);
                                                            }}
                                                            theme={tablet.addRoad}
                                                        />
                                                    </FormRow>
                                                </FormContainer>
                                            ),
                                            theme: tablet.addModal
                                        })
                                        //#endregion
                                    }}
                                >
                                    {/* 新增個案按鈕 圖標 */}
                                    <Plus style={tablet.addButtonIcon} />
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
                    theme={tablet.tableContainer}
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
                                    title: '名稱',
                                    width: "428px",
                                    dataIndex: 'name',
                                    sorter: (a, b) => a.carNumber.length - b.carNumber.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '經度',
                                    width: "58px",
                                    dataIndex: 'longitude',
                                    // sorter: (a, b) => a.carType.length - b.carType.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '緯度',
                                    width: "58px",
                                    dataIndex: 'latitude',
                                    // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '地址(縣市)',
                                    width: "94px",
                                    dataIndex: 'counties',
                                    // sorter: (a, b) => a.wheelchairCount.length - b.wheelchairCount.length,
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
                                    width: "128px",
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
                                                    theme={tablet.editButton}
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
                                                                if (valid(globalContextService.get("MedicalOrgManagerPage", "Name") ?? "", ["^.{1,}$"], ["請輸入名稱"])[1]) {
                                                                    validMsg = valid(globalContextService.get("MedicalOrgManagerPage", "Name") ?? "", ["^.{1,}$"], ["請輸入名稱"])[1]
                                                                }
                                                                else if (valid(globalContextService.get("MedicalOrgManagerPage", "Counties")?.value ?? "", ["^.{1,}$"], ["請選擇縣市"])[1]) {
                                                                    validMsg = valid(globalContextService.get("MedicalOrgManagerPage", "Counties")?.value ?? "", ["^.{1,}$"], ["請選擇縣市"])[1]
                                                                }
                                                                else if (valid(globalContextService.get("MedicalOrgManagerPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇區域"])[1]) {
                                                                    validMsg = valid(globalContextService.get("MedicalOrgManagerPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇區域"])[1]
                                                                }
                                                                else if (valid(globalContextService.get("MedicalOrgManagerPage", "Road") ?? "", ["^.{1,}$"], ["請輸入路名"])[1]) {
                                                                    validMsg = valid(globalContextService.get("MedicalOrgManagerPage", "Road") ?? "", ["^.{1,}$"], ["請輸入路名"])[1]
                                                                }
                                                                //#endregion

                                                                //#region 表單驗證後動作
                                                                if (validMsg !== "") {
                                                                    // console.log(validMsg, globalContextService.get("MedicalOrgManagerPage"))
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
                                                                    //     name: globalContextService.get("MedicalOrgManagerPage", `Name`),
                                                                    //     longitude: globalContextService.get("MedicalOrgManagerPage", "Longitude"),
                                                                    //     latitude: globalContextService.get("MedicalOrgManagerPage", "Latitude"),
                                                                    //     counties: globalContextService.get("MedicalOrgManagerPage", "Counties").value,
                                                                    //     district: globalContextService.get("MedicalOrgManagerPage", "District")?.value,
                                                                    //     road: globalContextService.get("MedicalOrgManagerPage", "Road"),
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
                                                                    theme={tablet.addFormContainer}
                                                                >
                                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                        {/* 新增彈窗 - 名稱 Name */}
                                                                        <TextInput
                                                                            // viewType
                                                                            topLabel={<>名稱<Text theme={tablet.nameRequired}>(必填)</Text></>}
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            type="text"
                                                                            placeholder={""}
                                                                            value={globalContextService.get("MedicalOrgManagerPage", "Name") ?? rowData.name}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("MedicalOrgManagerPage", "Name", value);
                                                                            }}
                                                                            theme={tablet.name}
                                                                        />

                                                                        {/* 新增彈窗 - 經度 Longitude */}
                                                                        <TextInput
                                                                            // viewType
                                                                            topLabel={"經度"}
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            type="text"
                                                                            placeholder={""}
                                                                            value={globalContextService.get("MedicalOrgManagerPage", "Longitude") ?? rowData.longitude}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("MedicalOrgManagerPage", "Longitude", value);
                                                                            }}
                                                                            theme={tablet.longitude}
                                                                        />

                                                                        {/* 新增彈窗 - 緯度 Latitude */}
                                                                        <TextInput
                                                                            // viewType
                                                                            topLabel={"緯度"}
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            type="text"
                                                                            placeholder={""}
                                                                            value={globalContextService.get("MedicalOrgManagerPage", "Latitude") ?? rowData.latitude}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("MedicalOrgManagerPage", "Latitude", value);
                                                                            }}
                                                                            theme={tablet.latitude}
                                                                        />

                                                                        {/* 新增彈窗 - 縣市 Counties */}
                                                                        <Selector
                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                            topLabel={<>地址<Text theme={tablet.addCountiesRequired}>(必填)</Text></>}
                                                                            //viewType
                                                                            isSearchable
                                                                            placeholder={"請選擇縣市"}
                                                                            // isMulti
                                                                            // hideSelectedOptions={false}
                                                                            value={globalContextService.get("MedicalOrgManagerPage", "Counties") ?? {}}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("MedicalOrgManagerPage", "Counties", value);
                                                                            }}

                                                                            options={[
                                                                                { value: 'hint', label: "請選擇縣市", isDisabled: true },
                                                                                { value: '0', label: '台北市' },
                                                                                { value: '1', label: '新北市' }
                                                                            ]}
                                                                            menuPosition={true}
                                                                            theme={tablet.addCounties}
                                                                        />
                                                                        {/* 新增彈窗 - 區域 District */}
                                                                        <Selector
                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                            // topLabel={<>區域<Text theme={tablet.addDistrictRequired}>(必填)</Text></>}
                                                                            //viewType
                                                                            isSearchable
                                                                            placeholder={"請選擇區域"}
                                                                            // isMulti
                                                                            // hideSelectedOptions={false}
                                                                            value={globalContextService.get("MedicalOrgManagerPage", "District") ?? null}
                                                                            onChange={(e, value, onInitial) => {
                                                                                // console.log(value)
                                                                                globalContextService.set("MedicalOrgManagerPage", "District", value);
                                                                            }}

                                                                            options={[
                                                                                { value: '0', label: "請選擇區域", isDisabled: true },
                                                                                { value: '1', label: 'XX區' },
                                                                                { value: '2', label: 'XX區' }
                                                                            ]}
                                                                            menuPosition={true}
                                                                            theme={tablet.addDistrict}
                                                                        />
                                                                        {/* 新增彈窗 - 路名 Road */}
                                                                        <TextInput
                                                                            // viewType
                                                                            // topLabel={"路名"}
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            type="text"
                                                                            placeholder={"請輸入路名"}
                                                                            value={globalContextService.get("MedicalOrgManagerPage", "Road") ?? rowData.road}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("MedicalOrgManagerPage", "Road", value);
                                                                            }}
                                                                            theme={tablet.addRoad}
                                                                        />
                                                                    </FormRow>
                                                                </FormContainer>
                                                            ),
                                                            theme: tablet.addModal
                                                        })
                                                        //#endregion
                                                    }}
                                                >編輯
                                                </NativeLineButton>

                                                {/* 刪除按鈕 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={tablet.deleteButton}
                                                // onClick={() => { history.push("/DriverAndCar/Cars/Information") }}
                                                >刪除
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
                        data={[{id: "asdasd-415asd1sa5d-asd", name: "aaa", longitude: 125, latitude: 23, counties: '台北市', district: "XX區", road: "uiweu" },
                        {id: "asdasd-415a45d1sa5d-asd", name: "bbb", longitude: 123, latitude: 22, counties: '新北市', district: "XX區", road: "hdah" }]}
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

export const Tablet = styled(TabletBase).attrs((props) => ({}))`

`

