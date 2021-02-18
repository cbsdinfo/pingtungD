import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal, CarAndDriverSettingCard, CarOrder, MainPageSubTitleBar, DispatchTable, WhiteOrderEditTitleModal } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal, RangeDateTimePicker, NewSelector } from '../../../../Components';
import { ReactComponent as OrderCarType } from '../../../../Assets/img/WhiteConsolePage/OrderCarType.svg'
import { ReactComponent as OrderCanShare } from '../../../../Assets/img/WhiteConsolePage/OrderCanShare.svg'
import { ReactComponent as OrderNoShare } from '../../../../Assets/img/WhiteConsolePage/OrderNoShare.svg'
import { ReactComponent as OrderEnd } from '../../../../Assets/img/WhiteConsolePage/OrderEnd.svg'
import { ReactComponent as OrderStart } from '../../../../Assets/img/WhiteConsolePage/OrderStart.svg'
import { ReactComponent as TableEnd } from '../../../../Assets/img/WhiteConsolePage/TableEnd.svg'
import { ReactComponent as TableStart } from '../../../../Assets/img/WhiteConsolePage/TableStart.svg'
import { ReactComponent as TakeNum } from '../../../../Assets/img/WhiteConsolePage/TakeNum.svg'
import { useHistory } from 'react-router-dom';
import { getParseItemLocalStorage, valid } from '../../../../Handlers/'
import { treeSelectorTransducer } from '../../../../Components/Form/TreeSelector/TreeSelector';
import isUndefined from 'lodash/isUndefined';
import moment from 'moment';
import { isNil, toString } from 'lodash/lang';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { whiteConsole: { rwd: { laptopL } } } } = Theme;

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
                            titleText={"白牌車調度台"}
                            theme={laptopL.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/*  共乘按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 共乘按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.shareButton}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        let checkedRowKeys = globalContextService.get("WhiteConsolePage", "CheckedRowKeys");
                                        let checkedRowsData = globalContextService.get("WhiteConsolePage", "CheckedRowsData");

                                        let hasDespatchNo = !((checkedRowsData ?? []).map(item => item.despatchNo).every((currentValue) => (currentValue === null)))
                                        let hasDriverInfoId = !((checkedRowsData ?? []).map(item => item.driverInfoId).every((currentValue) => (currentValue === null)))
                                        let hasNoShare = !((checkedRowsData ?? []).map(item => item.canShared).every((currentValue) => (currentValue === true)))

                                        //#region 都沒選、選一個
                                        if (((checkedRowsData?.length ?? 0) === 0) || ((checkedRowsData?.length ?? 0) < 2)) {
                                            modalsService.infoModal.error({
                                                iconRightText: "只能選一張以上訂單進行共乘。",
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
                                        //#region 選擇的訂單裡面包含 不可共乘 之訂單
                                        else if (hasNoShare) {
                                            modalsService.infoModal.error({
                                                iconRightText: "只能選擇可共乘之訂單進行共乘。",
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
                                        //#region 選擇的訂單裡面包含 共乘單 或 已排班 之訂單
                                        else if (hasDespatchNo || hasDriverInfoId) {
                                            modalsService.infoModal.error({
                                                iconRightText: "只能選擇未排班之訂單進行共乘。",
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
                                            //#region 打開 共乘 Modal
                                            modalsService.titleModal.normal({
                                                //id: "top1",
                                                title: "共乘",
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
                                                    if (valid(globalContextService.get("WhiteConsolePage", "MulRosterOrderDriver")?.value ?? "", ["^.{1,}$"], ["請選擇司機"])[1]) {
                                                        validMsg = valid(globalContextService.get("WhiteConsolePage", "MulRosterOrderDriver")?.value ?? "", ["^.{1,}$"], ["請選擇司機"])[1]
                                                    }
                                                    else if (valid(globalContextService.get("WhiteConsolePage", "MulRosterOrderCar")?.value ?? "", ["^.{1,}$"], ["請選擇車輛"])[1]) {
                                                        validMsg = valid(globalContextService.get("WhiteConsolePage", "MulRosterOrderCar")?.value ?? "", ["^.{1,}$"], ["請選擇車輛"])[1]
                                                    }
                                                    //#endregion

                                                    //#region 表單驗證後動作
                                                    if (validMsg !== "") {
                                                        // console.log(validMsg, globalContextService.get("WhiteConsolePage"))
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
                                                            carId: globalContextService.get("WhiteConsolePage", `MulRosterOrderCar`)?.value,
                                                            carNo: globalContextService.get("WhiteConsolePage", `MulRosterOrderCar`)?.data?.carNo,
                                                            driverInfoId: globalContextService.get("WhiteConsolePage", `MulRosterOrderDriver`)?.value,
                                                            driverInfoName: globalContextService.get("WhiteConsolePage", `MulRosterOrderDriver`)?.data?.userName,
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
                                                        theme={laptopL.editFormContainer}
                                                    >
                                                        <FormRow baseDefaultTheme={"DefaultTheme"}>

                                                            {/* 共乘 - 司機 MulRosterOrderDriver */}
                                                            <NewSelector
                                                                bascDefaultTheme={"DefaultTheme"}
                                                                topLabel={"司機"}
                                                                bottomLabel={""}
                                                                //viewType
                                                                isSearchable
                                                                placeholder={"請選擇司機"}
                                                                // isMulti
                                                                // hideSelectedOptions={false}
                                                                value={globalContextService.get("WhiteConsolePage", `MulRosterOrderDriver`) ?? null}
                                                                onChange={(e, value, onInitial) => {
                                                                    globalContextService.set("WhiteConsolePage", `MulRosterOrderDriver`, value)
                                                                    // console.log(globalContextService.get("WhiteConsolePage", "PassengerNumCount"))
                                                                }}

                                                                options={[
                                                                    { value: 'hint', label: "請選擇司機", isDisabled: true },
                                                                    ...props.DriverInfos
                                                                    // ...Counties
                                                                ]}

                                                                theme={laptopL.mulRosterOrderDriver}
                                                            />

                                                            {/* 共乘 - 車輛 MulRosterOrderCar */}
                                                            <NewSelector
                                                                bascDefaultTheme={"DefaultTheme"}
                                                                topLabel={"車輛"}
                                                                bottomLabel={""}
                                                                // viewType
                                                                isSearchable
                                                                placeholder={"請選擇車輛"}
                                                                // isMulti
                                                                // hideSelectedOptions={false}
                                                                value={globalContextService.get("WhiteConsolePage", `MulRosterOrderCar`) ?? null}
                                                                onChange={(e, value, onInitial) => {
                                                                    globalContextService.set("WhiteConsolePage", `MulRosterOrderCar`, value)
                                                                    // console.log(globalContextService.get("WhiteConsolePage", "PassengerNumCount"))
                                                                }}

                                                                options={[
                                                                    { value: 'hint', label: "請選擇車輛", isDisabled: true },
                                                                    ...props.CarInfos
                                                                    // ...Counties
                                                                ]}

                                                                theme={laptopL.mulRosterOrderCar}
                                                            />

                                                        </FormRow>
                                                    </FormContainer>
                                                ),
                                                theme: laptopL.mulRosterModal
                                            })
                                            //#endregion

                                        }
                                        //#endregion

                                    }}
                                >
                                    共乘
                                </NativeLineButton>
                            </SubContainer>

                            {/*  刪除訂單按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 刪除訂單按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.delOrderButton}
                                    onClick={() => {
                                        let checkedRowKeys = globalContextService.get("WhiteConsolePage", "CheckedRowKeys");
                                        let checkedRowsData = globalContextService.get("WhiteConsolePage", "CheckedRowsData");

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
                                                    props.DelOrderReqExecute([...checkedRowKeys])
                                                    close();
                                                }
                                            })
                                        }
                                        //#endregion
                                    }}
                                >
                                    刪除訂單
                                </NativeLineButton>
                            </SubContainer>

                            {/*  回列表按鈕 (標題列右方) 容器 */}
                            {/* <SubContainer baseDefaultTheme={"DefaultTheme"}> */}
                            {/* 回列表按鈕 */}
                            {/* <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.returnButton}
                                    onClick={() => {
                                        history.push("/Case");
                                        props.controllGCS("return")
                                    }}
                                >
                                    回列表
                            </NativeLineButton>
                            </SubContainer> */}
                        </MainPageTitleBar>
                    </>
                }
                theme={laptopL.mainPageContainer}
            >
                {/* 新訂單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptopL.newOrderContainer}
                >

                    {/* 新訂單 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"新訂單"}
                        theme={laptopL.newOrderSubTitleBar}
                    >

                    </MainPageSubTitleBar>

                    {/* 訂單容器 */}
                    <Container theme={laptopL.orderContainer} >

                        {/* 新訂單遍歷 */}
                        {props.NoOrgOrder.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {/* 訂單組件 */}
                                    <CarOrder
                                        mainColor={"#fa8c16"}
                                        title={
                                            <>
                                                {/* 訂單姓名 */}
                                                <Text
                                                    theme={laptopL.carOrderCarType}
                                                >
                                                    <OrderCarType style={laptopL.carOrderCarTypeSvg} />
                                                    {item.carCategoryName}
                                                </Text>

                                                {/* 接單按鈕 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={laptopL.takeOrderBtn}
                                                    onClick={() => {
                                                        props.UpdateOrgIdExecute(
                                                            {
                                                                id: item.id,
                                                                orgId: getParseItemLocalStorage("UseOrg")?.id
                                                            }
                                                        )
                                                    }}
                                                >
                                                    接單
                                                </NativeLineButton>
                                            </>
                                        }
                                        theme={laptopL.carOrder}
                                    >
                                        {/* 內容部分容器 */}
                                        <BasicContainer
                                            theme={laptopL.carOrderContent}
                                        >
                                            {/* 姓名、可否共乘、搭乘人數容器 */}
                                            <BasicContainer
                                                theme={laptopL.carOrderNameSContainer}
                                            >

                                                {/* 訂單姓名 */}
                                                <Text
                                                    theme={laptopL.carOrderName}
                                                >
                                                    {item.userName}
                                                </Text>

                                                {/* 訂單可否共乘 */}
                                                <Text
                                                    theme={laptopL.carOrderCanShare}
                                                >
                                                    {item.canShared ?
                                                        <>
                                                            <OrderCanShare style={laptopL.carOrderCanShareSvg} />
                                                            可共乘
                                                        </>
                                                        :
                                                        <>
                                                            <OrderNoShare style={laptopL.carOrderNoShareSvg} />
                                                            不可共乘
                                                        </>
                                                    }
                                                </Text>

                                                {/* 訂單搭乘人數 */}
                                                <Text
                                                    theme={laptopL.carOrderManCount}
                                                >
                                                    <TakeNum style={laptopL.carOrderManCountSvg} />
                                                    {item.passengerNum}人搭乘
                                                </Text>
                                            </BasicContainer>

                                            {/* 搭乘日期 */}
                                            <Text
                                                theme={laptopL.carOrderPhone}
                                            >
                                                連絡電話 : {item.noticePhone}
                                            </Text>

                                            {/* 搭乘日期 */}
                                            <Text
                                                theme={laptopL.carOrderDate}
                                            >
                                                搭乘日期 : {item.reserveDate}
                                            </Text>

                                            {/* 搭乘起點 */}
                                            <Text
                                                theme={laptopL.carOrderStartPos}
                                            >
                                                <OrderStart style={laptopL.carOrderStartPosSvg} />
                                                {item.fromAddr}
                                            </Text>

                                            {/* 搭乘冒號 */}
                                            <Text
                                                theme={laptopL.carOrderTo}
                                            >
                                                :
                                            </Text>

                                            {/* 搭乘終點 */}
                                            <Text
                                                theme={laptopL.carOrderEndPos}
                                            >
                                                <OrderEnd style={laptopL.carOrderEndPosSvg} />
                                                {item.toAddr}
                                            </Text>

                                        </BasicContainer>
                                    </CarOrder>
                                </React.Fragment >
                            )
                        })}

                    </Container>

                </BasicContainer>

                {/* 調度台容器 */}
                <BasicContainer theme={laptopL.dispatchContainer} >

                    {/* 調度台 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"調度台"}
                        theme={laptopL.dispatchSubTitleBar}
                    >

                    </MainPageSubTitleBar>

                    {/* 調度台表格容器 */}
                    <BasicContainer
                        theme={laptopL.dispatchTableContainer}
                    >

                        <DispatchTable
                            dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                            dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                                globalContextService.remove("WhiteConsolePage", "CheckedRowKeys");
                                globalContextService.remove("WhiteConsolePage", "CheckedRowsData");
                            }}
                            checkbox={true}
                            // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                            checkedRowKeyName={"id"}
                            checkboxOnChecked={
                                (checkedRowKeys, checkedRows) => {
                                    // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                    globalContextService.set("WhiteConsolePage", "CheckedRowKeys", checkedRowKeys);
                                    globalContextService.set("WhiteConsolePage", "CheckedRowsData", checkedRows);
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
                                                <React.Fragment key={rowData?.id ?? allRowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {allRowData?.isShare
                                                            ?
                                                            <>
                                                                {allRowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 姓名 第一列 */}
                                                                                <Text theme={laptopL.dispatchUserNameOne} >
                                                                                    {it?.userName}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 姓名 接續列 */}
                                                                                <Text theme={laptopL.dispatchUserNameTwo} >
                                                                                    {it?.userName}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* 調度台 姓名 單獨 */}
                                                                <Text theme={laptopL.dispatchUserNameOnly} >
                                                                    {rowData}
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
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
                                                        return (getTheme ? laptopL.dispatchStatusTag.newOrder : "新訂單");
                                                    case "2":
                                                        return (getTheme ? laptopL.dispatchStatusTag.assignedOrder : "已排班");
                                                    case "3":
                                                        return (getTheme ? laptopL.dispatchStatusTag.arrivalOrder : "抵達搭車地點");
                                                    case "4":
                                                        return (getTheme ? laptopL.dispatchStatusTag.customUpOrder : "客上");
                                                    case "5":
                                                        return (getTheme ? laptopL.dispatchStatusTag.finishedOrder : "已完成");
                                                    case "9":
                                                        return (getTheme ? laptopL.dispatchStatusTag.unitCancleOrder : "已取消");
                                                    default:
                                                        return (getTheme ? {} : "無此狀態");
                                                }
                                            }

                                            return (
                                                <React.Fragment key={rowData?.id ?? allRowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {allRowData?.isShare
                                                            ?
                                                            <>
                                                                {allRowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 訂單狀態 第一列 */}
                                                                                <Text theme={laptopL.dispatchStatusOne} >
                                                                                    <Tag
                                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                                        theme={statusMapping(it?.status, true)}
                                                                                        text={statusMapping(it?.status)}
                                                                                    />
                                                                                </Text>
                                                                            </>
                                                                        )

                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 訂單狀態 接續列 */}
                                                                                <Text theme={laptopL.dispatchStatusTwo} >
                                                                                    <Tag
                                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                                        theme={statusMapping(it?.status, true)}
                                                                                        text={statusMapping(it?.status)}
                                                                                    />
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* 調度台 訂單狀態 單獨 */}
                                                                <Text theme={laptopL.dispatchStatusOnly} >
                                                                    <Tag
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        theme={statusMapping(rowData, true)}
                                                                        text={statusMapping(rowData)}
                                                                    />
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
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
                                                <React.Fragment key={rowData?.id ?? allRowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {allRowData?.isShare
                                                            ?
                                                            <>
                                                                {allRowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 乘車預約時間 第一列 */}
                                                                                <Text theme={laptopL.dispatchReserveDateOne} >
                                                                                    {it?.reserveDate}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 乘車預約時間 接續列 */}
                                                                                <Text theme={laptopL.dispatchReserveDateTwo} >
                                                                                    {it?.reserveDate}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* 調度台 乘車預約時間 單獨 */}
                                                                <Text theme={laptopL.dispatchReserveDateOnly} >
                                                                    {rowData}
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
                                            )
                                        }
                                    },
                                    //#endregion

                                    //#region 起迄點
                                    {
                                        title: '起迄點',
                                        width: "400px",
                                        // dataIndex: 'driverInfoName', // fromAddr  toAddr
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <React.Fragment key={rowData?.id ?? rowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {rowData?.isShare
                                                            ?
                                                            <>
                                                                {rowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 起迄點 第一列 */}
                                                                                <Text theme={laptopL.dispatchFromAndToAddrOne} >

                                                                                    {/* 調度台 起點文字 */}
                                                                                    <Text theme={laptopL.dispatchFromAddr}>

                                                                                        {/* 起點 圖標 */}
                                                                                        <TableStart style={laptopL.dispatchFromAddrIcon} />
                                                                                        {it?.fromAddr}
                                                                                    </Text>

                                                                                    {/* 調度台 迄點文字 */}
                                                                                    <Text theme={laptopL.dispatchToAddr} >

                                                                                        {/* 迄點 圖標 */}
                                                                                        <TableEnd style={laptopL.dispatchToAddrIcon} />
                                                                                        {it?.toAddr}
                                                                                    </Text>
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 起迄點 接續列 */}
                                                                                <Text
                                                                                    theme={laptopL.dispatchFromAndToAddrTwo}
                                                                                >
                                                                                    {/* 調度台 起點文字 */}
                                                                                    <Text theme={laptopL.dispatchFromAddr}>

                                                                                        {/* 起點 圖標 */}
                                                                                        <TableStart style={laptopL.dispatchFromAddrIcon} />
                                                                                        {it?.fromAddr}
                                                                                    </Text>

                                                                                    {/* 調度台 迄點文字 */}
                                                                                    <Text theme={laptopL.dispatchToAddr} >

                                                                                        {/* 迄點 圖標 */}
                                                                                        <TableEnd style={laptopL.dispatchToAddrIcon} />
                                                                                        {it?.toAddr}
                                                                                    </Text>
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* 調度台 起迄點 單獨 */}
                                                                <Text theme={laptopL.dispatchFromAndToAddrOnly} >

                                                                    {/* 調度台 起點文字 */}
                                                                    <Text theme={laptopL.dispatchFromAddr}>

                                                                        {/* 起點 圖標 */}
                                                                        <TableStart style={laptopL.dispatchFromAddrIcon} />
                                                                        {rowData?.fromAddr}
                                                                    </Text>

                                                                    {/* 調度台 迄點文字 */}
                                                                    <Text theme={laptopL.dispatchToAddr} >

                                                                        {/* 迄點 圖標 */}
                                                                        <TableEnd style={laptopL.dispatchToAddrIcon} />
                                                                        {rowData?.toAddr}
                                                                    </Text>
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
                                            )
                                        }
                                    },
                                    //#endregion

                                    //#region 共乘
                                    {
                                        title: '共乘',
                                        width: "112px",
                                        dataIndex: 'canShared',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <React.Fragment key={rowData?.id ?? allRowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {allRowData?.isShare
                                                            ?
                                                            <>
                                                                {allRowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 可否共乘 第一列 */}
                                                                                <Text theme={laptopL.dispatchCanSharedOne} >
                                                                                    {it?.canShared ? "是" : "否"}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 可否共乘 接續列 */}
                                                                                <Text theme={laptopL.dispatchCanSharedTwo} >
                                                                                    {it?.canShared ? "是" : "否"}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* 調度台 可否共乘 單獨 */}
                                                                <Text theme={laptopL.dispatchCanSharedOnly} >
                                                                    {rowData ? "是" : "否"}
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
                                            )
                                        }
                                    },
                                    //#endregion

                                    //#region 車輛類型
                                    {
                                        title: '車輛類型',
                                        width: "112px",
                                        dataIndex: 'carCategoryName',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <React.Fragment key={rowData?.id ?? allRowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {allRowData?.isShare
                                                            ?
                                                            <>
                                                                {allRowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 車輛類型 第一列 */}
                                                                                <Text theme={laptopL.dispatchCarCategoryNameOne} >
                                                                                    {it?.carCategoryName}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 車輛類型 接續列 */}
                                                                                <Text theme={laptopL.dispatchCarCategoryNameTwo} >
                                                                                    {it?.carCategoryName}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* 調度台 車輛類型 單獨 */}
                                                                <Text theme={laptopL.dispatchCarCategoryNameOnly} >
                                                                    {rowData}
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
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
                                                <React.Fragment key={rowData?.id ?? allRowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {allRowData?.isShare
                                                            ?
                                                            <>
                                                                {allRowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 搭乘人數 第一列 */}
                                                                                <Text theme={laptopL.dispatchPassengerNumOne} >
                                                                                    {it?.passengerNum}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 搭乘人數 接續列 */}
                                                                                <Text theme={laptopL.dispatchPassengerNumTwo} >
                                                                                    {it?.passengerNum}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* 調度台 搭乘人數 單獨 */}
                                                                <Text theme={laptopL.dispatchPassengerNumOnly} >
                                                                    {rowData}
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
                                            )
                                        }
                                    },
                                    //#endregion

                                    //#region 所屬單位
                                    {
                                        title: '所屬單位',
                                        width: "112px",
                                        dataIndex: 'orgName',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <React.Fragment key={rowData?.id ?? allRowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {allRowData?.isShare
                                                            ?
                                                            <>
                                                                {allRowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 所屬單位 第一列 */}
                                                                                <Text theme={laptopL.dispatchOrgNameOne} >
                                                                                    {it?.orgName}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* 調度台 所屬單位 接續列 */}
                                                                                <Text theme={laptopL.dispatchOrgNameTwo} >
                                                                                    {it?.orgName}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* 調度台 所屬單位 單獨 */}
                                                                <Text theme={laptopL.dispatchOrgNameOnly} >
                                                                    {rowData}
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
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
                                                        {/* 為共乘單時 */}
                                                        {rowData?.isShare
                                                            ?
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
                                                                    {props.DriverInfos.filter(d => d?.data?.id === rowData?.isShare?.[0]?.driverInfoId).map(item => `司機 : ${item?.data?.userName} / ${item?.data?.phone}`)}
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
                                                                    {props.CarInfos.filter(d => d?.data?.id === rowData?.isShare?.[0]?.carId).map(item => `車輛 : ${item?.data?.carCategoryName} / ${item?.data?.seatNum}人座 / ${item?.data?.carNo}`)}
                                                                </Text>
                                                            </>
                                                            :
                                                            <>
                                                                {/* 如果已經存在司機、車輛，代表已經排班 ，則僅顯示資料*/}
                                                                {((isNil(rowData.driverInfoName) && rowData.status !== 9)) ?
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
                                                                            value={globalContextService.get("WhiteConsolePage", `OrderDriver_${rowData.id}`) ?? null}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("WhiteConsolePage", `OrderDriver_${rowData.id}`, value)
                                                                                // console.log(globalContextService.get("WhiteConsolePage", "PassengerNumCount"))
                                                                            }}

                                                                            options={[
                                                                                { value: 'hint', label: "請選擇司機", isDisabled: true },
                                                                                ...props.DriverInfos
                                                                                // ...Counties
                                                                            ]}

                                                                            theme={laptopL.dispatchOrderDriver}
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
                                                                            value={globalContextService.get("WhiteConsolePage", `OrderCar_${rowData.id}`) ?? null}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("WhiteConsolePage", `OrderCar_${rowData.id}`, value)
                                                                                // console.log(globalContextService.get("WhiteConsolePage", "PassengerNumCount"))
                                                                            }}

                                                                            options={[
                                                                                { value: 'hint', label: "請選擇車輛", isDisabled: true },
                                                                                ...props.CarInfos
                                                                                // ...Counties
                                                                            ]}

                                                                            theme={laptopL.dispatchOrderCar}
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
                                                                        theme={laptopL.dispatchRosterBtn}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();

                                                                            //#region 表單驗證
                                                                            let validMsg = "";

                                                                            if (valid(globalContextService.get("WhiteConsolePage", `OrderDriver_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["請選擇司機與車輛後值行排班"])[1]) {
                                                                                validMsg = valid(globalContextService.get("WhiteConsolePage", `OrderDriver_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["請選擇司機與車輛後值行排班"])[1]
                                                                            }
                                                                            else if (valid(globalContextService.get("WhiteConsolePage", `OrderCar_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["請選擇司機與車輛後值行排班"])[1]) {
                                                                                validMsg = valid(globalContextService.get("WhiteConsolePage", `OrderCar_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["請選擇司機與車輛後值行排班"])[1]
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
                                                                                    carId: globalContextService.get("WhiteConsolePage", `OrderCar_${rowData.id}`)?.value,
                                                                                    carNo: globalContextService.get("WhiteConsolePage", `OrderCar_${rowData.id}`)?.data?.carNo,
                                                                                    driverInfoId: globalContextService.get("WhiteConsolePage", `OrderDriver_${rowData.id}`)?.value,
                                                                                    driverInfoName: globalContextService.get("WhiteConsolePage", `OrderDriver_${rowData.id}`)?.data?.userName,
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
                                                                        theme={laptopL.dispatchEditOrderBtn}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();

                                                                            // props.GetStationOnRouteExecute(rowData?.stationLineId) // 取得指定路線下所有站牌
                                                                            globalContextService.set("WhiteConsolePage", "EditOrderrowData", { ...rowData });
                                                                            //#region 打開角色分配 Modal
                                                                            props.setOpenWhiteOrderEditTitleModal(true);// 直接打開彈窗
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
                                                                        theme={laptopL.dispatchECancleOrderBtn}
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

                                                        {/* 為共乘單時 */}
                                                        {rowData?.isShare
                                                            ?
                                                            <>
                                                                {/* 訂單狀態等於 2 已排班 時顯示的按鈕 */}
                                                                {rowData?.isShare?.[0]?.status === 2 &&
                                                                    <>
                                                                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                                                            {/* 變更司機車輛按鈕 */}
                                                                            <NativeLineButton
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                disable={false}
                                                                                type="button" // 防止提交
                                                                                theme={laptopL.dispatchChangeDriveAndCarBtn}
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
                                                                                            if (valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderDriver")?.value ?? "", ["^.{1,}$"], ["請選擇司機"])[1]) {
                                                                                                validMsg = valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderDriver")?.value ?? "", ["^.{1,}$"], ["請選擇司機"])[1]
                                                                                            }
                                                                                            else if (valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderCar")?.value ?? "", ["^.{1,}$"], ["請選擇車輛"])[1]) {
                                                                                                validMsg = valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderCar")?.value ?? "", ["^.{1,}$"], ["請選擇車輛"])[1]
                                                                                            }
                                                                                            //#endregion

                                                                                            //#region 表單驗證後動作
                                                                                            if (validMsg !== "") {
                                                                                                // console.log(validMsg, globalContextService.get("WhiteConsolePage"))
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
                                                                                                    id: [...rowData?.isShare?.map(isShareItem => isShareItem?.id)],
                                                                                                    carId: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderCar`)?.value,
                                                                                                    carNo: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderCar`)?.data?.carNo,
                                                                                                    driverInfoId: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`)?.value,
                                                                                                    driverInfoName: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`)?.data?.userName,
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
                                                                                                theme={laptopL.editFormContainer}
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
                                                                                                        value={globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`) ??
                                                                                                        {
                                                                                                            value: rowData?.isShare?.[0]?.driverInfoId,
                                                                                                            label: props.DriverInfos.filter(d => d?.data?.id === rowData?.isShare?.[0]?.driverInfoId).map(item => `司機 : ${item?.data?.userName} / ${item?.data?.phone}`),
                                                                                                            data: props.DriverInfos.filter(d => d?.data?.id === rowData?.isShare?.[0]?.driverInfoId).map(item => item?.data)?.[0]
                                                                                                        }
                                                                                                        }
                                                                                                        onChange={(e, value, onInitial) => {
                                                                                                            globalContextService.set("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`, value)
                                                                                                            // console.log(props.DriverInfos.filter(d => d?.data?.id === rowData?.isShare?.[0]?.driverInfoId).map(item => item?.data)?.[0])
                                                                                                        }}

                                                                                                        options={[
                                                                                                            { value: 'hint', label: "請選擇司機", isDisabled: true },
                                                                                                            ...props.DriverInfos
                                                                                                            // ...Counties
                                                                                                        ]}

                                                                                                        theme={laptopL.changeDriveAndCarOrderDriver}
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
                                                                                                        value={globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderCar`) ??
                                                                                                        {
                                                                                                            value: rowData?.isShare?.[0]?.carId,
                                                                                                            label: props.CarInfos.filter(d => d?.data?.id === rowData?.isShare?.[0]?.carId).map(item => `車輛 : ${item?.data?.carCategoryName} / ${item?.data?.seatNum}人座 / ${item?.data?.carNo}`),
                                                                                                            data: props.CarInfos.filter(d => d?.data?.id === rowData?.isShare?.[0]?.carId).map(item => item?.data)?.[0]
                                                                                                        }
                                                                                                        }
                                                                                                        onChange={(e, value, onInitial) => {
                                                                                                            globalContextService.set("WhiteConsolePage", `ChangeDriveAndCarOrderCar`, value)
                                                                                                        }}

                                                                                                        options={[
                                                                                                            { value: 'hint', label: "請選擇車輛", isDisabled: true },
                                                                                                            ...props.CarInfos
                                                                                                            // ...Counties
                                                                                                        ]}

                                                                                                        theme={laptopL.changeDriveAndCarOrderCar}
                                                                                                    />

                                                                                                </FormRow>
                                                                                            </FormContainer>
                                                                                        ),
                                                                                        theme: laptopL.changeDriveAndCarModal
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
                                                                                theme={laptopL.dispatchECancleRosterBtn}
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
                                                                                            props.CancelDespatchExecute([rowData?.isShare?.[0]?.despatchNo]);
                                                                                            // props.CancelDespatchExecute([...rowData?.isShare?.map(isShareItem => isShareItem?.id)]);
                                                                                            // props.CancelDespatchExecute({ id: rowData?.isShare?.[0]?.id, cancelRemark: "SYS_ORDERCANCEL_REMARK_ADMIN" });
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
                                                            </>
                                                            :
                                                            <>
                                                                {/* 訂單狀態等於 2 已排班 時顯示的按鈕 */}
                                                                {rowData.status === 2 &&
                                                                    <>
                                                                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                                                            {/* 變更司機車輛按鈕 */}
                                                                            <NativeLineButton
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                disable={false}
                                                                                type="button" // 防止提交
                                                                                theme={laptopL.dispatchChangeDriveAndCarBtn}
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
                                                                                            if (valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderDriver")?.value ?? "", ["^.{1,}$"], ["請選擇司機"])[1]) {
                                                                                                validMsg = valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderDriver")?.value ?? "", ["^.{1,}$"], ["請選擇司機"])[1]
                                                                                            }
                                                                                            else if (valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderCar")?.value ?? "", ["^.{1,}$"], ["請選擇車輛"])[1]) {
                                                                                                validMsg = valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderCar")?.value ?? "", ["^.{1,}$"], ["請選擇車輛"])[1]
                                                                                            }
                                                                                            //#endregion

                                                                                            //#region 表單驗證後動作
                                                                                            if (validMsg !== "") {
                                                                                                // console.log(validMsg, globalContextService.get("WhiteConsolePage"))
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
                                                                                                    carId: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderCar`)?.value,
                                                                                                    carNo: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderCar`)?.data?.carNo,
                                                                                                    driverInfoId: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`)?.value,
                                                                                                    driverInfoName: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`)?.data?.userName,
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
                                                                                                theme={laptopL.editFormContainer}
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
                                                                                                        value={globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`) ??
                                                                                                        {
                                                                                                            value: rowData.driverInfoId,
                                                                                                            label: props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => `司機 : ${item?.data?.userName} / ${item?.data?.phone}`),
                                                                                                            data: props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => item?.data)?.[0]
                                                                                                        }
                                                                                                        }
                                                                                                        onChange={(e, value, onInitial) => {
                                                                                                            console.log("Vvalue", value)

                                                                                                            console.log("GETGI", {
                                                                                                                value: rowData.driverInfoId,
                                                                                                                label: props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => `司機 : ${item?.data?.userName} / ${item?.data?.phone}`),
                                                                                                                data: props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => item?.data)?.[0]
                                                                                                            })
                                                                                                            console.log(globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`))
                                                                                                            globalContextService.set("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`, value)
                                                                                                            // console.log(props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => item?.data)?.[0])
                                                                                                        }}

                                                                                                        options={[
                                                                                                            { value: 'hint', label: "請選擇司機", isDisabled: true },
                                                                                                            ...props.DriverInfos
                                                                                                            // ...Counties
                                                                                                        ]}

                                                                                                        theme={laptopL.changeDriveAndCarOrderDriver}
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
                                                                                                        value={globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderCar`) ??
                                                                                                        {
                                                                                                            value: rowData.carId,
                                                                                                            label: props.CarInfos.filter(d => d?.data?.id === rowData.carId).map(item => `車輛 : ${item?.data?.carCategoryName} / ${item?.data?.seatNum}人座 / ${item?.data?.carNo}`),
                                                                                                            data: props.CarInfos.filter(d => d?.data?.id === rowData.carId).map(item => item?.data)?.[0]
                                                                                                        }
                                                                                                        }
                                                                                                        onChange={(e, value, onInitial) => {
                                                                                                            globalContextService.set("WhiteConsolePage", `ChangeDriveAndCarOrderCar`, value)
                                                                                                        }}

                                                                                                        options={[
                                                                                                            { value: 'hint', label: "請選擇車輛", isDisabled: true },
                                                                                                            ...props.CarInfos
                                                                                                            // ...Counties
                                                                                                        ]}

                                                                                                        theme={laptopL.changeDriveAndCarOrderCar}
                                                                                                    />

                                                                                                </FormRow>
                                                                                            </FormContainer>
                                                                                        ),
                                                                                        theme: laptopL.changeDriveAndCarModal
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
                                                                                theme={laptopL.dispatchECancleRosterBtn}
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
                                                                                            props.CancelDespatchExecute([rowData.despatchNo]);
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
                            data={props.OrgOrder.data}
                            clickPage={(currentPage, pageSize) => {
                            }}
                        />

                    </BasicContainer>

                </BasicContainer>

            </MainPageContainer>

            {/* 編輯訂單彈窗 */}
            {props.OpenWhiteOrderEditTitleModal &&
                <WhiteOrderEditTitleModal
                    // theme={{}}
                    setOpenWhiteOrderEditTitleModal={props.setOpenWhiteOrderEditTitleModal}
                    AllCarType={props.AllCarType}
                    rowData={globalContextService.get("WhiteConsolePage", "EditOrderrowData")}

                    UpdateEditOrderExecute={props.UpdateEditOrderExecute} // 編輯訂單
                    UpdateEditOrderPending={props.UpdateEditOrderPending} // 編輯訂單
                    controllGCS={props.controllGCS}
                />
            }
        </>

    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`

`

