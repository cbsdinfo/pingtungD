import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal, CarAndDriverSettingCard, MainPageSubTitleBar, DispatchTable, CarOrder, BusOrderEditTitleModal } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal, RangeDateTimePicker, NewSelector, DateTimePicker } from '../../../../Components';
import { ReactComponent as OrderCarType } from '../../../../Assets/img/BusConsolePage/OrderCarType.svg'
import { ReactComponent as OrderCanShare } from '../../../../Assets/img/BusConsolePage/OrderCanShare.svg'
import { ReactComponent as OrderNoShare } from '../../../../Assets/img/BusConsolePage/OrderNoShare.svg'
import { ReactComponent as OrderEnd } from '../../../../Assets/img/BusConsolePage/OrderEnd.svg'
import { ReactComponent as OrderStart } from '../../../../Assets/img/BusConsolePage/OrderStart.svg'
import { ReactComponent as TableEnd } from '../../../../Assets/img/BusConsolePage/TableEnd.svg'
import { ReactComponent as TableStart } from '../../../../Assets/img/BusConsolePage/TableStart.svg'
import { ReactComponent as TakeNum } from '../../../../Assets/img/BusConsolePage/TakeNum.svg'
import { useHistory } from 'react-router-dom';
import { getParseItemLocalStorage, valid } from '../../../../Handlers'
import Select from 'react-select'
import { treeSelectorTransducer } from '../../../../Components/Form/TreeSelector/TreeSelector';
import isUndefined from 'lodash/isUndefined';
import moment from 'moment';
import { isEqual, isNil, toString } from 'lodash/lang';
import { fmt } from '../../../../Handlers/DateHandler';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { busConsole: { rwd: { laptop } } } } = Theme;

    const [IdDescribe, setIdDescribe] = useState(globalContextService.get("CarUsedPage", "IdDescribe") ?? false);

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"幸福巴士調度台"}
                            theme={laptop.titleBar}
                            onSubmit={(e) => {
                                console.log("目前不支援搜尋功能")
                                // props.GetSubOrgsExecute(true, "");
                            }}
                        >
                            {/*  批量排班按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 批量排班按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptop.mulRosterButton}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        let checkedRowKeys = globalContextService.get("BusConsolePage", "CheckedRowKeys");
                                        let checkedRowsData = globalContextService.get("BusConsolePage", "CheckedRowsData");

                                        //#region 都沒選、選一個
                                        if (((checkedRowsData?.length ?? 0) === 0) || ((checkedRowsData?.length ?? 0) < 2)) {
                                            modalsService.infoModal.error({
                                                iconRightText: "只能選一張以上訂單進行批量排班。",
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
                                        //#region 選超過一個
                                        else {
                                            //#region 打開 批量排班 Modal
                                            modalsService.titleModal.normal({
                                                //id: "top1",
                                                title: "批量排班",
                                                yes: true,
                                                yesText: "確認",
                                                no: true,
                                                noText: "取消",
                                                // autoClose: true,
                                                backgroundClose: false,
                                                noOnClick: (e) => {
                                                    props.controllGCS("mulRosterModalClose")
                                                },
                                                yesOnClick: (e, close) => {
                                                    //#region 表單驗證
                                                    let validMsg = "";
                                                    if (valid(globalContextService.get("BusConsolePage", "MulRosterOrderDriver")?.value ?? "", ["^.{1,}$"], ["請選擇司機"])[1]) {
                                                        validMsg = valid(globalContextService.get("BusConsolePage", "MulRosterOrderDriver")?.value ?? "", ["^.{1,}$"], ["請選擇司機"])[1]
                                                    }
                                                    else if (valid(globalContextService.get("BusConsolePage", "MulRosterOrderCar")?.value ?? "", ["^.{1,}$"], ["請選擇車輛"])[1]) {
                                                        validMsg = valid(globalContextService.get("BusConsolePage", "MulRosterOrderCar")?.value ?? "", ["^.{1,}$"], ["請選擇車輛"])[1]
                                                    }
                                                    //#endregion

                                                    //#region 表單驗證後動作
                                                    if (validMsg !== "") {
                                                        // console.log(validMsg, globalContextService.get("BusConsolePage"))
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
                                                        props.RosterOrderExecute({
                                                            id: checkedRowKeys,
                                                            carId: globalContextService.get("BusConsolePage", `MulRosterOrderCar`)?.value,
                                                            carNo: globalContextService.get("BusConsolePage", `MulRosterOrderCar`)?.data?.carNo,
                                                            driverInfoId: globalContextService.get("BusConsolePage", `MulRosterOrderDriver`)?.value,
                                                            driverInfoName: globalContextService.get("BusConsolePage", `MulRosterOrderDriver`)?.data?.userName,
                                                        });
                                                        close();
                                                    }
                                                    //#endregion
                                                },
                                                closeIconOnClick: (e) => {
                                                    props.controllGCS("mulRosterModalClose")
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

                                                            {/* 批量排班 - 司機 MulRosterOrderDriver */}
                                                            <NewSelector
                                                                bascDefaultTheme={"DefaultTheme"}
                                                                topLabel={"司機"}
                                                                bottomLabel={""}
                                                                //viewType
                                                                isSearchable
                                                                placeholder={"請選擇司機"}
                                                                // isMulti
                                                                // hideSelectedOptions={false}
                                                                value={globalContextService.get("BusConsolePage", `MulRosterOrderDriver`) ?? null}
                                                                onChange={(e, value, onInitial) => {
                                                                    globalContextService.set("BusConsolePage", `MulRosterOrderDriver`, value)
                                                                    // console.log(globalContextService.get("BusConsolePage", "PassengerNumCount"))
                                                                }}

                                                                options={[
                                                                    { value: 'hint', label: "請選擇司機", isDisabled: true },
                                                                    ...props.DriverInfos
                                                                    // ...Counties
                                                                ]}

                                                                theme={laptop.mulRosterOrderDriver}
                                                            />

                                                            {/* 批量排班 - 車輛 MulRosterOrderCar */}
                                                            <NewSelector
                                                                bascDefaultTheme={"DefaultTheme"}
                                                                topLabel={"車輛"}
                                                                bottomLabel={""}
                                                                // viewType
                                                                isSearchable
                                                                placeholder={"請選擇車輛"}
                                                                // isMulti
                                                                // hideSelectedOptions={false}
                                                                value={globalContextService.get("BusConsolePage", `MulRosterOrderCar`) ?? null}
                                                                onChange={(e, value, onInitial) => {
                                                                    globalContextService.set("BusConsolePage", `MulRosterOrderCar`, value)
                                                                    // console.log(globalContextService.get("BusConsolePage", "PassengerNumCount"))
                                                                }}

                                                                options={[
                                                                    { value: 'hint', label: "請選擇車輛", isDisabled: true },
                                                                    ...props.CarInfos
                                                                    // ...Counties
                                                                ]}

                                                                theme={laptop.mulRosterOrderCar}
                                                            />

                                                        </FormRow>
                                                    </FormContainer>
                                                ),
                                                theme: laptop.mulRosterModal
                                            })
                                            //#endregion

                                        }
                                        //#endregion
                                    }}
                                >
                                    批量排班
                                </NativeLineButton>
                            </SubContainer>

                             {/* 回列表按鈕 (標題列右方) 容器
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 回列表按鈕 */}
                                {/* <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptop.returnButton}
                                    onClick={() => {
                                        // history.push("/Case");
                                        // props.controllGCS("return")
                                    }}
                                >
                                    回列表
                                </NativeLineButton> 
                            </SubContainer> */}
                        </MainPageTitleBar>
                    </>
                }
                theme={laptop.mainPageContainer}
            >
                {/* 調度台容器 */}
                <BasicContainer theme={laptop.dispatchContainer} >

                    {/* 調度台 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"調度台"}
                        theme={laptop.dispatchSubTitleBar}
                    >

                    </MainPageSubTitleBar>

                    {/* 調度台表格容器 */}
                    <BasicContainer
                        theme={laptop.dispatchTableContainer}
                    >

                        <DispatchTable
                            dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                            dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                                globalContextService.remove("BusConsolePage", "CheckedRowKeys");
                                globalContextService.remove("BusConsolePage", "CheckedRowsData");
                            }}
                            checkbox={true}
                            // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                            checkedRowKeyName={"id"}
                            checkboxOnChecked={
                                (checkedRowKeys, checkedRows) => {
                                    // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                    globalContextService.set("BusConsolePage", "CheckedRowKeys", checkedRowKeys);
                                    globalContextService.set("BusConsolePage", "CheckedRowsData", checkedRows);
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
                                    // {
                                    //     title: '',
                                    //     width: "0px",
                                    //     dataIndex: 'leftOccupy',
                                    //     fixed: 'left',
                                    //     sorter: false
                                    // },
                                    //#region 姓名
                                    {
                                        title: '姓名',
                                        width: "112px",
                                        dataIndex: 'userName',
                                        // sorter: (a, b) => a.carNumber.length - b.carNumber.length,
                                        fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <>
                                                    {rowData}
                                                </>
                                            )
                                        }
                                    },
                                    //#endregion 

                                    //#region 訂單狀態
                                    {
                                        title: '訂單狀態',
                                        width: "112px",
                                        dataIndex: 'status',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        fixed: 'left',
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

                                    //#region 乘車預約時間
                                    {
                                        title: '乘車預約時間',
                                        width: "250px",
                                        dataIndex: 'reserveDate',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <>
                                                    {rowData}
                                                </>
                                            )
                                        }
                                    },
                                    //#endregion

                                    //#region 預約路線
                                    {
                                        title: '預約路線',
                                        width: "112px",
                                        dataIndex: 'stationLineName',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <>
                                                    {rowData}
                                                </>
                                            )
                                        }
                                    },
                                    //#endregion

                                    //#region 起迄站
                                    {
                                        title: '起迄站',
                                        width: "250px",
                                        // dataIndex: 'driverInfoName', // fromAddr  toAddr
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <>
                                                    {/* 調度台 起迄點  */}
                                                    <Text theme={laptop.dispatchFromAndToAddrOne} >

                                                        {/* 調度台 起點文字 */}
                                                        <Text theme={laptop.dispatchFromAddr}>

                                                            {/* 起點 圖標 */}
                                                            <TableStart style={laptop.dispatchFromAddrIcon} />
                                                            {rowData?.fromStationName}
                                                        </Text>

                                                        {/* 調度台 迄點文字 */}
                                                        <Text theme={laptop.dispatchToAddr} >

                                                            {/* 迄點 圖標 */}
                                                            <TableEnd style={laptop.dispatchToAddrIcon} />
                                                            {rowData?.toStationName}
                                                        </Text>
                                                    </Text>
                                                </>
                                            )
                                        }
                                    },
                                    //#endregion

                                    //#region 搭乘人數
                                    {
                                        title: '搭乘人數',
                                        width: "112px",
                                        dataIndex: 'passengerNum',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <>
                                                    {rowData}
                                                </>
                                            )
                                        }
                                    },
                                    //#endregion

                                    {
                                        title: '狀態控制台',
                                        width: "321px",
                                        // dataIndex: 'parentName',
                                        // sorter: (a, b) => a.name.length - b.name.length,
                                        fixed: 'right',
                                        render: (rowData) => {

                                            return (
                                                <>
                                                    <Container>

                                                        {/* 如果已經存在司機、車輛，代表已經排班 ，則僅顯示資料*/}
                                                        {(isNil(rowData.driverInfoName) && rowData.status !== 9) ?
                                                            <>
                                                                <NewSelector
                                                                    bascDefaultTheme={"DefaultTheme"}
                                                                    topLabel={""}
                                                                    bottomLabel={""}
                                                                    //viewType
                                                                    isSearchable
                                                                    placeholder={"請選擇司機"}
                                                                    // isMulti
                                                                    // hideSelectedOptions={false}
                                                                    value={globalContextService.get("BusConsolePage", `OrderDriver_${rowData.id}`) ?? null}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("BusConsolePage", `OrderDriver_${rowData.id}`, value)
                                                                        // console.log(globalContextService.get("BusConsolePage", "PassengerNumCount"))
                                                                    }}

                                                                    options={[
                                                                        { value: 'hint', label: "請選擇司機", isDisabled: true },
                                                                        ...props.DriverInfos
                                                                        // ...Counties
                                                                    ]}

                                                                    theme={laptop.dispatchOrderDriver}
                                                                />

                                                                <NewSelector
                                                                    bascDefaultTheme={"DefaultTheme"}
                                                                    topLabel={""}
                                                                    bottomLabel={""}
                                                                    // viewType
                                                                    isSearchable
                                                                    placeholder={"請選擇車輛"}
                                                                    // isMulti
                                                                    // hideSelectedOptions={false}
                                                                    value={globalContextService.get("BusConsolePage", `OrderCar_${rowData.id}`) ?? null}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("BusConsolePage", `OrderCar_${rowData.id}`, value)
                                                                        // console.log(globalContextService.get("BusConsolePage", "PassengerNumCount"))
                                                                    }}

                                                                    options={[
                                                                        { value: 'hint', label: "請選擇車輛", isDisabled: true },
                                                                        ...props.CarInfos
                                                                        // ...Counties
                                                                    ]}

                                                                    theme={laptop.dispatchOrderCar}
                                                                />
                                                            </>
                                                            :
                                                            <>
                                                                {/* 已排班司機 */}
                                                                <Text
                                                                    theme={{
                                                                        basic: (style, props) => ({
                                                                            ...style,
                                                                            width: "100%",
                                                                            padding: "0 0 0 8px",
                                                                            height: "40px",
                                                                            fontSize: "14px",
                                                                            lineHeight: "22px",
                                                                            color: "rgba(0, 0, 0, 0.65)"
                                                                        })
                                                                    }}
                                                                >
                                                                    {props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => `司機 : ${item?.data?.userName} / ${item?.data?.phone}`)}
                                                                </Text>

                                                                {/* 已排班車輛 */}
                                                                <Text
                                                                    theme={{
                                                                        basic: (style, props) => ({
                                                                            ...style,
                                                                            width: "100%",
                                                                            padding: "0 0 0 8px",
                                                                            height: "40px",
                                                                            fontSize: "14px",
                                                                            lineHeight: "22px",
                                                                            color: "rgba(0, 0, 0, 0.65)"
                                                                        })
                                                                    }}
                                                                >
                                                                    {props.CarInfos.filter(d => d?.data?.id === rowData.carId).map(item => `車輛 : ${item?.data?.carCategoryName} / ${item?.data?.seatNum}人座 / ${item?.data?.carNo}`)}
                                                                </Text>
                                                            </>
                                                        }

                                                        {/* 訂單狀態等於 1 新訂單 時顯示的按鈕*/}
                                                        {rowData.status === 1 &&
                                                            <>
                                                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                                                    {/* 排班按鈕 */}
                                                                    <NativeLineButton
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        disable={false}
                                                                        type="button" // 防止提交
                                                                        theme={laptop.dispatchRosterBtn}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();

                                                                            //#region 表單驗證
                                                                            let validMsg = "";

                                                                            if (valid(globalContextService.get("BusConsolePage", `OrderDriver_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["請選擇司機與車輛後值行排班"])[1]) {
                                                                                validMsg = valid(globalContextService.get("BusConsolePage", `OrderDriver_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["請選擇司機與車輛後值行排班"])[1]
                                                                            }
                                                                            else if (valid(globalContextService.get("BusConsolePage", `OrderCar_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["請選擇司機與車輛後值行排班"])[1]) {
                                                                                validMsg = valid(globalContextService.get("BusConsolePage", `OrderCar_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["請選擇司機與車輛後值行排班"])[1]
                                                                            }
                                                                            //#endregion

                                                                            //#region 表單驗證後動作
                                                                            if (validMsg !== "") {
                                                                                // console.log(validMsg, globalContextService.get("CaseAddPage"))
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
                                                                                props.RosterOrderExecute({
                                                                                    id: [rowData.id],
                                                                                    carId: globalContextService.get("BusConsolePage", `OrderCar_${rowData.id}`)?.value,
                                                                                    carNo: globalContextService.get("BusConsolePage", `OrderCar_${rowData.id}`)?.data?.carNo,
                                                                                    driverInfoId: globalContextService.get("BusConsolePage", `OrderDriver_${rowData.id}`)?.value,
                                                                                    driverInfoName: globalContextService.get("BusConsolePage", `OrderDriver_${rowData.id}`)?.data?.userName,
                                                                                });
                                                                            }
                                                                            //#endregion
                                                                        }}
                                                                    >
                                                                        排班
                                                                    </NativeLineButton>
                                                                </SubContainer>

                                                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                                                    {/* 編輯訂單按鈕 */}
                                                                    <NativeLineButton
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        disable={false}
                                                                        type="button" // 防止提交
                                                                        theme={laptop.dispatchEditOrderBtn}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();

                                                                            props.GetStationOnRouteExecute(rowData?.stationLineId) // 取得指定路線下所有站牌
                                                                            globalContextService.set("BusConsolePage", "EditOrderrowData", { ...rowData });
                                                                            //#region 打開角色分配 Modal
                                                                            props.setOpenBusOrderEditTitleModal(true);// 直接打開彈窗
                                                                            //#endregion

                                                                        }}
                                                                    >
                                                                        編輯訂單
                                                                    </NativeLineButton>
                                                                </SubContainer>

                                                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                                                    {/* 取消訂單按鈕 */}
                                                                    <NativeLineButton
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        disable={false}
                                                                        type="button" // 防止提交
                                                                        theme={laptop.dispatchECancleOrderBtn}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();

                                                                            modalsService.infoModal.warn({
                                                                                iconRightText: "是否確定進行取消訂單。",
                                                                                yes: true,
                                                                                yesText: "確認",
                                                                                no: true,
                                                                                noText: "取消",
                                                                                // autoClose: true,
                                                                                backgroundClose: false,
                                                                                yesOnClick: (e, close) => {
                                                                                    props.CancelOrderReqExecute({ id: rowData.id, cancelRemark: "SYS_ORDERCANCEL_REMARK_ADMIN" });
                                                                                    close();
                                                                                }
                                                                            })
                                                                            //#endregion
                                                                        }}
                                                                    >
                                                                        取消訂單
                                                                    </NativeLineButton>
                                                                </SubContainer>

                                                            </>
                                                        }

                                                        {/* 訂單狀態等於 2 已排班 時顯示的按鈕 */}
                                                        {rowData.status === 2 &&
                                                            <>
                                                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                                                    {/* 變更司機車輛按鈕 */}
                                                                    <NativeLineButton
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        disable={false}
                                                                        type="button" // 防止提交
                                                                        theme={laptop.dispatchChangeDriveAndCarBtn}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();

                                                                            //#region 打開 變更司機車輛 Modal
                                                                            modalsService.titleModal.normal({
                                                                                //id: "top1",
                                                                                title: "變更司機車輛",
                                                                                yes: true,
                                                                                yesText: "確認",
                                                                                no: true,
                                                                                noText: "取消",
                                                                                // autoClose: true,
                                                                                backgroundClose: false,
                                                                                noOnClick: (e) => {
                                                                                    props.controllGCS("changeDriveAndCarModalClose")
                                                                                },
                                                                                yesOnClick: (e, close) => {
                                                                                    //#region 表單驗證
                                                                                    let validMsg = "";
                                                                                    if (valid(globalContextService.get("BusConsolePage", "ChangeDriveAndCarOrderDriver")?.value ?? "", ["^.{1,}$"], ["請選擇司機"])[1]) {
                                                                                        validMsg = valid(globalContextService.get("BusConsolePage", "ChangeDriveAndCarOrderDriver")?.value ?? "", ["^.{1,}$"], ["請選擇司機"])[1]
                                                                                    }
                                                                                    else if (valid(globalContextService.get("BusConsolePage", "ChangeDriveAndCarOrderCar")?.value ?? "", ["^.{1,}$"], ["請選擇車輛"])[1]) {
                                                                                        validMsg = valid(globalContextService.get("BusConsolePage", "ChangeDriveAndCarOrderCar")?.value ?? "", ["^.{1,}$"], ["請選擇車輛"])[1]
                                                                                    }
                                                                                    //#endregion

                                                                                    //#region 表單驗證後動作
                                                                                    if (validMsg !== "") {
                                                                                        // console.log(validMsg, globalContextService.get("BusConsolePage"))
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
                                                                                        props.RosterOrderExecute({
                                                                                            id: [rowData.id],
                                                                                            carId: globalContextService.get("BusConsolePage", `ChangeDriveAndCarOrderCar`)?.value,
                                                                                            carNo: globalContextService.get("BusConsolePage", `ChangeDriveAndCarOrderCar`)?.data?.carNo,
                                                                                            driverInfoId: globalContextService.get("BusConsolePage", `ChangeDriveAndCarOrderDriver`)?.value,
                                                                                            driverInfoName: globalContextService.get("BusConsolePage", `ChangeDriveAndCarOrderDriver`)?.data?.userName,
                                                                                        });
                                                                                        close();
                                                                                    }
                                                                                    //#endregion
                                                                                },
                                                                                closeIconOnClick: (e) => {
                                                                                    props.controllGCS("changeDriveAndCarModalClose")
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

                                                                                            {/* 變更司機車輛表單 - 司機 ChangeDriveAndCarOrderDriver */}
                                                                                            <NewSelector
                                                                                                bascDefaultTheme={"DefaultTheme"}
                                                                                                topLabel={"司機"}
                                                                                                bottomLabel={""}
                                                                                                //viewType
                                                                                                isSearchable
                                                                                                placeholder={"請選擇司機"}
                                                                                                // isMulti
                                                                                                // hideSelectedOptions={false}
                                                                                                value={globalContextService.get("BusConsolePage", `ChangeDriveAndCarOrderDriver`) ??
                                                                                                {
                                                                                                    value: rowData.driverInfoId,
                                                                                                    label: props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => `司機 : ${item?.data?.userName} / ${item?.data?.phone}`),
                                                                                                    data: props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => item?.data)?.[0]
                                                                                                }
                                                                                                }
                                                                                                onChange={(e, value, onInitial) => {
                                                                                                    globalContextService.set("BusConsolePage", `ChangeDriveAndCarOrderDriver`, value)
                                                                                                    console.log(props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => item?.data)?.[0])
                                                                                                }}

                                                                                                options={[
                                                                                                    { value: 'hint', label: "請選擇司機", isDisabled: true },
                                                                                                    ...props.DriverInfos
                                                                                                    // ...Counties
                                                                                                ]}

                                                                                                theme={laptop.changeDriveAndCarOrderDriver}
                                                                                            />

                                                                                            {/* 變更司機車輛表單 - 車輛 ChangeDriveAndCarOrderCar */}
                                                                                            <NewSelector
                                                                                                bascDefaultTheme={"DefaultTheme"}
                                                                                                topLabel={"車輛"}
                                                                                                bottomLabel={""}
                                                                                                // viewType
                                                                                                isSearchable
                                                                                                placeholder={"請選擇車輛"}
                                                                                                // isMulti
                                                                                                // hideSelectedOptions={false}
                                                                                                value={globalContextService.get("BusConsolePage", `ChangeDriveAndCarOrderCar`) ??
                                                                                                {
                                                                                                    value: rowData.carId,
                                                                                                    label: props.CarInfos.filter(d => d?.data?.id === rowData.carId).map(item => `車輛 : ${item?.data?.carCategoryName} / ${item?.data?.seatNum}人座 / ${item?.data?.carNo}`),
                                                                                                    data: props.CarInfos.filter(d => d?.data?.id === rowData.carId).map(item => item?.data)?.[0]
                                                                                                }
                                                                                                }
                                                                                                onChange={(e, value, onInitial) => {
                                                                                                    globalContextService.set("BusConsolePage", `ChangeDriveAndCarOrderCar`, value)
                                                                                                }}

                                                                                                options={[
                                                                                                    { value: 'hint', label: "請選擇車輛", isDisabled: true },
                                                                                                    ...props.CarInfos
                                                                                                    // ...Counties
                                                                                                ]}

                                                                                                theme={laptop.changeDriveAndCarOrderCar}
                                                                                            />

                                                                                        </FormRow>
                                                                                    </FormContainer>
                                                                                ),
                                                                                theme: laptop.changeDriveAndCarModal
                                                                            })
                                                                            //#endregion
                                                                        }}
                                                                    >
                                                                        變更司機車輛
                                                                    </NativeLineButton>
                                                                </SubContainer>

                                                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                                                    {/* 取消排班按鈕 */}
                                                                    <NativeLineButton
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        disable={false}
                                                                        type="button" // 防止提交
                                                                        theme={laptop.dispatchECancleRosterBtn}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();

                                                                            modalsService.infoModal.warn({
                                                                                iconRightText: "是否確定進行取消排班。",
                                                                                yes: true,
                                                                                yesText: "確認",
                                                                                no: true,
                                                                                noText: "取消",
                                                                                // autoClose: true,
                                                                                backgroundClose: false,
                                                                                yesOnClick: (e, close) => {
                                                                                    props.CancelDespatchExecute([rowData.id]);
                                                                                    // props.CancelDespatchExecute({ id: rowData.id, cancelRemark: "SYS_ORDERCANCEL_REMARK_ADMIN" });
                                                                                    close();
                                                                                }
                                                                            })
                                                                            //#endregion
                                                                        }}
                                                                    >
                                                                        取消排班
                                                                    </NativeLineButton>
                                                                </SubContainer>

                                                            </>
                                                        }

                                                    </Container>
                                                </>
                                            )
                                        }
                                    }
                                ]
                            }
                            //sort
                            //showHeader={false}
                            // data={[{ id: "asdasd-415asd1sa5d-asd", carType: "一般車", seat: 6, brandModel: "BMW", wheelchairCount: 1, name: "名", uid: "G12312512", sex: "男", cellphone: "0987854555", carNumber: "N8N-6541" }]}
                            // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                            data={props.BusOrder.data}
                            clickPage={(currentPage, pageSize) => {
                            }}
                        />

                    </BasicContainer>

                </BasicContainer>

            </MainPageContainer>

            {/* B單位彈窗 */}
            {props.OpenBusOrderEditTitleModal &&
                <BusOrderEditTitleModal
                    // theme={{}}
                    setOpenBusOrderEditTitleModal={props.setOpenBusOrderEditTitleModal}
                    StationOnRoute={props.StationOnRoute}
                    BusStationLines={props.BusStationLines}
                    BusStations={props.BusStations}
                    rowData={globalContextService.get("BusConsolePage", "EditOrderrowData")}

                    GetStationOnRouteExecute={props.GetStationOnRouteExecute} // 取得指定路線下所有站牌
                    GetStationOnRoutePending={props.GetStationOnRoutePending} // 取得指定路線下所有站牌

                    UpdateEditOrderExecute={props.UpdateEditOrderExecute} // 編輯訂單
                    UpdateEditOrderPending={props.UpdateEditOrderPending} // 編輯訂單
                    controllGCS={props.controllGCS}
                />
            }

        </>

    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`

