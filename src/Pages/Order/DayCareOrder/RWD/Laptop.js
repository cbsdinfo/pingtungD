import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, Textarea, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService, RangeDateTimePicker } from '../../../../Components';
import { ReactComponent as Search } from '../../../../Assets/img/DayCareOrderPage/Search.svg'
import { ReactComponent as TableEnd } from '../../../../Assets/img/DayCareOrderPage/TableEnd.svg'
import { ReactComponent as TableStart } from '../../../../Assets/img/DayCareOrderPage/TableStart.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { fmt } from '../../../../Handlers/DateHandler';
import { valid } from '../../../../Handlers';
import { toString } from 'lodash/lang';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { order: { dayCareOrder: { rwd: { laptop } } } } } = Theme;
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"預約訂單"}
                            theme={laptop.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/* 查詢日期區間 DateTimeRange  */}
                            <RangeDateTimePicker
                                topLabel={<></>}
                                // type={"time"} time、date、week、month、quarter、year
                                type={"date"}
                                format={"YYYY-MM-DD"}
                                bascDefaultTheme={"DefaultTheme"}
                                // viewType
                                isSearchable
                                placeholder={""}
                                value={
                                    (globalContextService.get("DayCareOrderPage", "DateTimeRange") ?
                                        [moment(globalContextService.get("DayCareOrderPage", "DateTimeRange")[0]), moment(globalContextService.get("DayCareOrderPage", "DateTimeRange")[1])]
                                        :
                                        [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-06', "YYYY-MM-DD")]
                                    )
                                }
                                onChange={(value, momentObj) => {
                                    globalContextService.set("DayCareOrderPage", "DateTimeRange", value);
                                }}
                                theme={laptop.dateTimeRange}
                            />

                            {/* 單選下拉選單 請選擇訂單狀態 OrderStatus*/}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                //viewType
                                isSearchable
                                placeholder={"請選擇訂單狀態"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("DayCareOrderPage", "OrderStatus") ?? null}
                                //value={globalContextService.get("DayCareOrderPage", "OrderStatus") ?? [{ value: '1', label: '公費個案' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareOrderPage", "OrderStatus", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇訂單狀態", isDisabled: true },
                                    { value: '1', label: '全部訂單' },
                                    { value: '2', label: '新訂單' },
                                    { value: '3', label: '已排班' },
                                    { value: '4', label: '已出發' },
                                    { value: '5', label: '抵達搭車地點' },
                                    { value: '6', label: '客上' },
                                    { value: '7', label: '客下' },
                                    { value: '8', label: '完成' },
                                    { value: '9', label: '空趟' },
                                    { value: '10', label: '個案取消' },
                                    { value: '11', label: '服務單位取消' },
                                    { value: '12', label: '無派車' },
                                    { value: '13', label: '未執行' },
                                ]}
                                theme={laptop.orderStatus}

                            />

                            {/* 一般輸入框 請輸入關鍵字 Keyword*/}
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
                                value={globalContextService.get("DayCareOrderPage", "Keyword") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareOrderPage", "Keyword", value);
                                }}
                            />
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
                                globalContextService.set("DayCareOrderPage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("DayCareOrderPage", "CheckedRowsData", checkedRows);
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
                                    dataIndex: 'userName',
                                    sorter: false,
                                    fixed: 'left',
                                },
                                //#region 訂單狀態
                                {
                                    title: '訂單狀態',
                                    width: "128px",
                                    dataIndex: 'status',
                                    sorter: false,
                                    // fixed: 'left',
                                    render: (rowData, allRowData) => {
                                        const statusMapping = (status, getTheme = false) => {
                                            switch (toString(status)) {
                                                case "1":
                                                    return (getTheme ? laptop.dispatchStatusTag.newOrder : "新訂單");
                                                case "2":
                                                    return (getTheme ? laptop.dispatchStatusTag.assignedOrder : "已排班");
                                                case "3":
                                                    return (getTheme ? laptop.dispatchStatusTag.arrivalOrder : "抵達搭車地點");
                                                case "4":
                                                    return (getTheme ? laptop.dispatchStatusTag.customUpOrder : "客上");
                                                case "5":
                                                    return (getTheme ? laptop.dispatchStatusTag.finishedOrder : "已完成");
                                                case "9":
                                                    return (getTheme ? laptop.dispatchStatusTag.unitCancleOrder : "已取消");
                                                default:
                                                    return (getTheme ? {} : "無此狀態");
                                            }
                                        }

                                        return (
                                            <>
                                                <Tag
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={statusMapping(rowData, true)}
                                                    text={statusMapping(rowData)}
                                                />
                                            </>
                                        )
                                    }
                                },
                                //#endregion
                                {
                                    title: '預約乘車時間',
                                    width: "141px",
                                    dataIndex: 'reserveDate',
                                    sorter: (a, b) => a.reserveDate - b.reserveDate,
                                    render: (rowData) => {
                                        return `${fmt(moment(rowData), `YYYY-MM-DD hh:mm`)}`
                                    }
                                },
                                {
                                    title: '起迄點',
                                    width: "400px",
                                    // dataIndex: 'ordererId',
                                    sorter: false,
                                    // fixed: 'left',
                                    render: (rowData) => {
                                        return (
                                            <BasicContainer>
                                                {/* 起迄點 容器 */}
                                                <Text theme={laptop.fromAndToAddrOne} >

                                                    {/* 起點文字 */}
                                                    <Text theme={laptop.fromAddr}>

                                                        {/* 起點 圖標 */}
                                                        <TableStart style={laptop.fromAddrIcon} />
                                                        {rowData?.fromAddr}
                                                    </Text>

                                                    {/* 迄點文字 */}
                                                    <Text theme={laptop.toAddr} >

                                                        {/* 迄點 圖標 */}
                                                        <TableEnd style={laptop.toAddrIcon} />
                                                        {rowData?.toAddr}
                                                    </Text>
                                                </Text>
                                            </BasicContainer>
                                        )
                                    }
                                },
                                {
                                    title: '共乘',
                                    width: "112px",
                                    dataIndex: 'canShared',
                                    sorter: false,
                                    // fixed: 'left',
                                    render: (rowData) => {
                                        // console.log("rowData", rowData)
                                        return (
                                            <>
                                                {rowData ?
                                                    '是'
                                                    :
                                                    '否'
                                                }
                                            </>
                                        )
                                    }
                                },
                                {
                                    title: '車輛類型',
                                    width: "112px",
                                    dataIndex: 'carCategoryName',
                                    sorter: false,
                                    // fixed: 'left',
                                },
                                {
                                    title: '搭乘人數',
                                    width: "112px",
                                    dataIndex: 'passengerNum',
                                    sorter: (a, b) => a.passengerNum - b.passengerNum,
                                    // fixed: 'left',
                                },
                                {
                                    title: '所屬單位',
                                    width: "112px",
                                    dataIndex: 'orgName',
                                    sorter: false,
                                    // fixed: 'left',
                                },
                                {
                                    title: '狀態控制台',
                                    width: "576px",
                                    // dataIndex: 'parentName',
                                    sorter: false,
                                    fixed: 'right',
                                    render: (rowData) => {
                                        return (
                                            <>
                                                <Container>
                                                    {rowData.orderStatus === 2 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            // theme={Laptop.newOrder}
                                                            theme={laptop.newOrder}
                                                            text={"新訂單"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 3 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.assignedOrder}
                                                            text={"已排班"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 4 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.goOrder}
                                                            text={"已出發"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 5 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.arrivalOrder}
                                                            text={"抵達搭車地點"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 6 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.customUpOrder}
                                                            text={"客上"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 7 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.customDownOrder}
                                                            text={"客下"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 8 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.finishedOrder}
                                                            text={"已完成"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 9 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.emptyOrder}
                                                            text={"空趟"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 10 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.customCancleOrder}
                                                            text={"個案取消"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 11 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.unitCancleOrder}
                                                            text={"服務單位取消"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 12 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.noAssignedOrder}
                                                            text={"無派車"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 13 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.noDoOrder}
                                                            text={"未執行"}
                                                        />
                                                    }

                                                    {/* 查看訂單按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptop.checkOrderButton}
                                                        onClick={() => { history.push("/Order/DayCareOrder/DayCareOrderView") }}
                                                    >查看訂單
                                                </NativeLineButton>

                                                    {/* 編輯訂單按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptop.editOrderButton}
                                                    // onClick={() => { history.push("/DriverAndCar/Cars/Edit") }}
                                                    >編輯訂單
                                                </NativeLineButton>

                                                    {/* 轉單按鈕 */}
                                                    {rowData.orderStatus === 2 &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // 防止提交
                                                            theme={laptop.forwardOrderButton}
                                                        // onClick={() => { history.push("/DriverAndCar/Cars/Edit") }}
                                                        >轉單
                                                </NativeLineButton>
                                                    }

                                                    {/* 修改狀態按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptop.changeStatusButton}
                                                        onClick={(e) => {
                                                            e.preventDefault();

                                                            //#region 打開修改狀態 Modal
                                                            modalsService.titleModal.normal({
                                                                //id: "top1",
                                                                title: "修改狀態",
                                                                yes: true,
                                                                yesText: "確認",
                                                                no: true,
                                                                noText: "取消",
                                                                // autoClose: true,
                                                                backgroundClose: false,
                                                                noOnClick: (e) => {
                                                                    props.controllGCS("modifyClientModalClose")
                                                                },
                                                                yesOnClick: (e, close) => {
                                                                    //#region 表單驗證
                                                                    let validMsg = "";
                                                                    if (valid(globalContextService.get("DayCareOrderPage", "ControlPanel")?.value ?? "", ["^.{1,}$"], ["請選擇操作介面"])[1]) {
                                                                        validMsg = valid(globalContextService.get("DayCareOrderPage", "ControlPanel")?.value ?? "", ["^.{1,}$"], ["請選擇操作介面"])[1]
                                                                    }
                                                                    else if (valid(globalContextService.get("DayCareOrderPage", "QuestionType")?.value ?? "", ["^.{1,}$"], ["請選擇問題類型"])[1]) {
                                                                        validMsg = valid(globalContextService.get("DayCareOrderPage", "QuestionType")?.value ?? "", ["^.{1,}$"], ["請選擇問題類型"])[1]
                                                                    }
                                                                    else if (valid(globalContextService.get("DayCareOrderPage", "StatusTo")?.value ?? "", ["^.{1,}$"], ["請選擇狀態改為"])[1]) {
                                                                        validMsg = valid(globalContextService.get("DayCareOrderPage", "StatusTo")?.value ?? "", ["^.{1,}$"], ["請選擇狀態改為"])[1]
                                                                    }
                                                                    else if (valid(globalContextService.get("DayCareOrderPage", "QuotaChange")?.value ?? "", ["^.{1,}$"], ["請選擇是否影響民眾額度"])[1]) {
                                                                        validMsg = valid(globalContextService.get("DayCareOrderPage", "QuotaChange")?.value ?? "", ["^.{1,}$"], ["請選擇是否影響民眾額度"])[1]
                                                                    }
                                                                    else if (valid(globalContextService.get("DayCareOrderPage", "QuestionDesc") ?? "", ["^.{1,}$"], ["請輸入問題敘述"])[1]) {
                                                                        validMsg = valid(globalContextService.get("DayCareOrderPage", "QuestionDesc") ?? "", ["^.{1,}$"], ["請輸入問題敘述"])[1]
                                                                    }
                                                                    else if (valid(globalContextService.get("DayCareOrderPage", "ReasonAndImprove") ?? "", ["^.{1,}$"], ["請輸入說明失誤原因及改進方法"])[1]) {
                                                                        validMsg = valid(globalContextService.get("DayCareOrderPage", "ReasonAndImprove") ?? "", ["^.{1,}$"], ["請輸入說明失誤原因及改進方法"])[1]
                                                                    }
                                                                    else if (valid(globalContextService.get("DayCareOrderPage", "SignatureName") ?? "", ["^.{1,}$"], ["請輸入填單人姓名"])[1]) {
                                                                        validMsg = valid(globalContextService.get("DayCareOrderPage", "SignatureName") ?? "", ["^.{1,}$"], ["請輸入填單人姓名"])[1]
                                                                    }
                                                                    else if (valid(globalContextService.get("DayCareOrderPage", "ContactPhone") ?? "", ["^.{1,}$"], ["請輸入聯絡電話"])[1]) {
                                                                        validMsg = valid(globalContextService.get("DayCareOrderPage", "ContactPhone") ?? "", ["^.{1,}$"], ["請輸入聯絡電話"])[1]
                                                                    }
                                                                    //#endregion

                                                                    //#region 表單驗證後動作
                                                                    if (validMsg !== "") {
                                                                        // console.log(validMsg, globalContextService.get("DayCareOrderPage"))
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
                                                                        //     name: globalContextService.get("DayCareOrderPage", `Name`),
                                                                        //     longitude: globalContextService.get("DayCareOrderPage", "Longitude"),
                                                                        //     latitude: globalContextService.get("DayCareOrderPage", "Latitude"),
                                                                        //     counties: globalContextService.get("DayCareOrderPage", "Counties").value,
                                                                        //     district: globalContextService.get("DayCareOrderPage", "District")?.value,
                                                                        //     road: globalContextService.get("DayCareOrderPage", "Road"),
                                                                        // })
                                                                        props.controllGCS("modifyClientModalClose")
                                                                        close();
                                                                    }
                                                                    //#endregion
                                                                },
                                                                closeIconOnClick: (e) => {
                                                                    props.controllGCS("modifyClientModalClose")
                                                                },
                                                                content: (
                                                                    <FormContainer
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        onSubmit={(e) => {
                                                                            e.preventDefault();
                                                                        }}
                                                                        theme={laptop.modifyFormContainer}
                                                                    >
                                                                        <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                            {/* 編輯訂單彈窗 - 操作介面 ControlPanel */}
                                                                            <Selector
                                                                                bascDefaultTheme={"DefaultTheme"}
                                                                                topLabel={<>操作介面<Text theme={laptop.controlPanelRequired}>(必填)</Text></>}
                                                                                //viewType
                                                                                isSearchable
                                                                                // placeholder={""}
                                                                                // isMulti
                                                                                // hideSelectedOptions={false}
                                                                                value={globalContextService.get("DayCareOrderPage", "ControlPanel") ?? {}}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    globalContextService.set("DayCareOrderPage", "ControlPanel", value);
                                                                                }}

                                                                                options={[
                                                                                    { value: 'hint', label: "請選擇操作介面", isDisabled: true },
                                                                                    { value: '0', label: 'A' },
                                                                                    { value: '1', label: 'B' }
                                                                                ]}
                                                                                menuPosition={true}
                                                                                theme={laptop.controlPanel}
                                                                            />

                                                                            {/* 編輯訂單彈窗 - 問題類型 QuestionType */}
                                                                            <Selector
                                                                                bascDefaultTheme={"DefaultTheme"}
                                                                                topLabel={<>問題類型<Text theme={laptop.questionTypeRequired}>(必填)</Text></>}
                                                                                //viewType
                                                                                isSearchable
                                                                                // placeholder={""}
                                                                                // isMulti
                                                                                // hideSelectedOptions={false}
                                                                                value={globalContextService.get("DayCareOrderPage", "QuestionType") ?? {}}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    globalContextService.set("DayCareOrderPage", "QuestionType", value);
                                                                                }}

                                                                                options={[
                                                                                    { value: 'hint', label: "請選擇問題類型", isDisabled: true },
                                                                                    { value: '0', label: 'A' },
                                                                                    { value: '1', label: 'B' }
                                                                                ]}
                                                                                menuPosition={true}
                                                                                theme={laptop.questionType}
                                                                            />

                                                                            {/* 編輯訂單彈窗 - 狀態改為 StatusTo */}
                                                                            <Selector
                                                                                bascDefaultTheme={"DefaultTheme"}
                                                                                topLabel={<>狀態改為<Text theme={laptop.statusToRequired}>(必填)</Text></>}
                                                                                //viewType
                                                                                isSearchable
                                                                                // placeholder={""}
                                                                                // isMulti
                                                                                // hideSelectedOptions={false}
                                                                                value={globalContextService.get("DayCareOrderPage", "StatusTo") ?? {}}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    globalContextService.set("DayCareOrderPage", "StatusTo", value);
                                                                                }}

                                                                                options={[
                                                                                    { value: '0', label: "請選擇狀態", isDisabled: true },
                                                                                    // { value: '1', label: '全部訂單' },
                                                                                    { value: '2', label: '新訂單' },
                                                                                    { value: '3', label: '已排班' },
                                                                                    { value: '4', label: '已出發' },
                                                                                    { value: '5', label: '抵達搭車地點' },
                                                                                    { value: '6', label: '客上' },
                                                                                    { value: '7', label: '客下' },
                                                                                    { value: '8', label: '完成' },
                                                                                    { value: '9', label: '空趟' },
                                                                                    { value: '10', label: '個案取消' },
                                                                                    { value: '11', label: '服務單位取消' },
                                                                                    { value: '12', label: '無派車' },
                                                                                    { value: '13', label: '未執行' },
                                                                                ]}
                                                                                menuPosition={true}
                                                                                theme={laptop.statusTo}
                                                                            />

                                                                            {/* 編輯訂單彈窗 - 是否影響民眾額度 QuotaChange */}
                                                                            <Selector
                                                                                bascDefaultTheme={"DefaultTheme"}
                                                                                topLabel={<>是否影響民眾額度<Text theme={laptop.quotaChangeRequired}>(必填)</Text></>}
                                                                                //viewType
                                                                                isSearchable
                                                                                // placeholder={""}
                                                                                // isMulti
                                                                                // hideSelectedOptions={false}
                                                                                value={globalContextService.get("DayCareOrderPage", "QuotaChange") ?? {}}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    globalContextService.set("DayCareOrderPage", "QuotaChange", value);
                                                                                }}

                                                                                options={[
                                                                                    { value: 'hint', label: "請選擇是否影響民眾額度", isDisabled: true },
                                                                                    { value: '0', label: '是' },
                                                                                    { value: '1', label: '否' }
                                                                                ]}
                                                                                menuPosition={true}
                                                                                theme={laptop.quotaChange}
                                                                            />

                                                                            {/* 編輯訂單彈窗 - 問題敘述 QuestionDesc */}
                                                                            <Textarea
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                topLabel={<>問題敘述<Text theme={laptop.questionDescRequired}>(必填)</Text></>}
                                                                                placeholder={""}
                                                                                value={globalContextService.get("DayCareOrderPage", "QuestionDesc") ?? ""}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    globalContextService.set("DayCareOrderPage", "QuestionDesc", value);
                                                                                    // console.log(value)
                                                                                }}
                                                                                theme={laptop.questionDesc}
                                                                            />

                                                                            {/* 編輯訂單彈窗 - 說明失誤原因及改進方法 ReasonAndImprove */}
                                                                            <Textarea
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                topLabel={<>說明失誤原因及改進方法<Text theme={laptop.reasonAndImproveRequired}>(必填)</Text></>}
                                                                                placeholder={""}
                                                                                value={globalContextService.get("DayCareOrderPage", "ReasonAndImprove") ?? ""}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    globalContextService.set("DayCareOrderPage", "ReasonAndImprove", value);
                                                                                    // console.log(value)
                                                                                }}
                                                                                theme={laptop.reasonAndImprove}
                                                                            />

                                                                            {/* 編輯訂單彈窗 - 填單人姓名 SignatureName */}
                                                                            <TextInput
                                                                                bascDefaultTheme={"DefaultTheme"}
                                                                                topLabel={<>填單人姓名<Text theme={laptop.signatureNameRequired}>(必填)</Text></>}
                                                                                type="text"
                                                                                value={globalContextService.get("DayCareOrderPage", "SignatureName") ?? ""}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    globalContextService.set("DayCareOrderPage", "SignatureName", value);
                                                                                }}
                                                                                theme={laptop.signatureName}
                                                                            />

                                                                            {/* 編輯訂單彈窗 - 聯絡電話 ContactPhone */}
                                                                            <TextInput
                                                                                bascDefaultTheme={"DefaultTheme"}
                                                                                topLabel={<>聯絡電話<Text theme={laptop.contactPhoneRequired}>(必填)</Text></>}
                                                                                type="text"
                                                                                value={globalContextService.get("DayCareOrderPage", "ContactPhone") ?? ""}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    globalContextService.set("DayCareOrderPage", "ContactPhone", value);
                                                                                }}
                                                                                theme={laptop.contactPhone}
                                                                            />
                                                                        </FormRow>
                                                                    </FormContainer>
                                                                ),
                                                                theme: laptop.modifyStatusModal
                                                            })
                                                            //#endregion
                                                        }}
                                                    >修改狀態
                                                </NativeLineButton>

                                                    {/* 取消訂單按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptop.cancelOrderButton}
                                                    // onClick={() => { history.push("/DriverAndCar/Cars/Edit") }}
                                                    >取消訂單
                                                </NativeLineButton>
                                                    {/* 空趟記點按鈕 */}
                                                    {rowData.orderStatus === 9 &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // 防止提交
                                                            theme={laptop.emptyTripRecordButton}
                                                        // onClick={() => { history.push("/DriverAndCar/Cars/Edit") }} 
                                                        >空趟記點
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
                        sort
                        //showHeader={false}
                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                        data={props.DayCareOrder.data}
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