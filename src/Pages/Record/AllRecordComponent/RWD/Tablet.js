import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { ReactComponent as NoData } from '../../../../Assets/img/RecordPage/NoData.svg'
import { ReactComponent as Share } from '../../../../Assets/img/RecordPage/Share.svg'
import { ReactComponent as Start } from '../../../../Assets/img/RecordPage/Start.svg'
import { ReactComponent as End } from '../../../../Assets/img/RecordPage/End.svg'
import { ReactComponent as CaseLaptopL } from '../../../../Assets/img/RecordPage/CaseLaptopL.svg'
import { ReactComponent as CaseLaptop } from '../../../../Assets/img/RecordPage/CaseLaptop.svg'
import { ReactComponent as CaseTablet } from '../../../../Assets/img/RecordPage/CaseTablet.svg'
import { ReactComponent as FleetLaptopL } from '../../../../Assets/img/RecordPage/FleetLaptopL.svg'
import { ReactComponent as FleetLaptop } from '../../../../Assets/img/RecordPage/FleetLaptop.svg'
import { ReactComponent as FleetTablet } from '../../../../Assets/img/RecordPage/FleetTablet.svg'
import { ReactComponent as BusLaptopL } from '../../../../Assets/img/RecordPage/BusLaptopL.svg'
import { ReactComponent as BusLaptop } from '../../../../Assets/img/RecordPage/BusLaptop.svg'
import { ReactComponent as BusTablet } from '../../../../Assets/img/RecordPage/BusTablet.svg'
import { useHistory } from 'react-router-dom';
import { DateTimePicker, BasicContainer, RangeDateTimePicker, Tag, Tooltip, FormContainer, FormRow, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { CardTable } from '../../../../ProjectComponent'
import moment from 'moment';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { fmt } from '../../../../Handlers/DateHandler';
import { isEqual, isEmpty, toString, isUndefined } from 'lodash';
import { getParseItemLocalStorage } from '../../../../Handlers';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { record: { allRecordComponent: { rwd: { tablet } } } } } = Theme;
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory()
    const [Width, Height] = useWindowSize();

    const switchCase = (key) => {
        switch (key) {
            case "長照":
                return (
                    <>
                        {
                            1440 <= Width &&
                            <CaseLaptopL style={tablet.caseSvg} />
                        }
                        {
                            (1024 <= Width && Width < 1440) &&
                            <CaseLaptop style={tablet.caseSvg} />
                        }
                        {
                            (768 <= Width && Width < 1024) &&
                            <CaseTablet style={tablet.caseSvg} />
                        }
                    </>
                );
            case "共享車隊":
                return (
                    <>
                        {
                            1440 <= Width &&
                            <FleetLaptopL style={tablet.caseSvg} />
                        }
                        {
                            (1024 <= Width && Width < 1440) &&
                            <FleetLaptop style={tablet.caseSvg} />
                        }
                        {
                            (768 <= Width && Width < 1024) &&
                            <FleetTablet style={tablet.caseSvg} />
                        }
                    </>
                );
            case "巴士":
                return (
                    <>
                        {
                            1440 <= Width &&
                            <BusLaptopL style={tablet.caseSvg} />
                        }
                        {
                            (1024 <= Width && Width < 1440) &&
                            <BusLaptop style={tablet.caseSvg} />
                        }
                        {
                            (768 <= Width && Width < 1024) &&
                            <BusTablet style={tablet.caseSvg} />
                        }
                    </>
                );
            default:
                return undefined
        }

    }
    //#endregion

    return (
        <>
            {/* 查詢日期區間容器 */}
            <BasicContainer theme={tablet.dateTimeRangeContainer}>
                {/* 過去-未來訂單 */}
                <NewSelector
                    bascDefaultTheme={"DefaultTheme"}
                    topLabel={""}
                    bottomLabel={""}
                    //viewType
                    isSearchable
                    placeholder={""}
                    // isMulti
                    // hideSelectedOptions={false}
                    value={globalContextService.get("RecordPage", "OrderTime") ?? { value: '2', label: "未來訂單" }}
                    onChange={(e, value, onInitial) => {
                        if (!isEqual(value, globalContextService.get("RecordPage", "OrderTime"))) {
                            if (value?.value === '1') {
                                //過去訂單 - 預設上個月1號到今天 含已完成，已取消的訂單
                                globalContextService.set("RecordPage", "DateTimeRange", [moment().add(-1, 'months').startOf("month"), moment().startOf("day")]);
                            } else if (value?.value === '2') {
                                //未來訂單 - 預設今天到下個月的最後一天 已完成，已取消之外的訂單
                                globalContextService.set("RecordPage", "DateTimeRange", [moment().startOf("day"), moment().add(1, 'months').endOf('month')]);
                            }
                            globalContextService.set("RecordPage", "OrderTime", value);

                            setForceUpdate(f => !f)
                        }
                    }
                    }
                    options={
                        [
                            { value: '1', label: "過去訂單" },
                            { value: '2', label: "未來訂單" },
                        ]
                    }
                    // menuPosition={true}
                    theme={tablet.orderTime}
                />

                {/*  查詢日期區間 DateTimeRange  */}
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
                        (globalContextService.get("RecordPage", "DateTimeRange") ?
                            [moment(globalContextService.get("RecordPage", "DateTimeRange")[0]), moment(globalContextService.get("RecordPage", "DateTimeRange")[1])]
                            :
                            [moment().startOf("day"), moment().add(1, 'months').endOf('month')]
                        )
                    }
                    onChange={(value, momentObj) => {
                        if (!isEqual(value, globalContextService.get("RecordPage", "DateTimeRange"))) {

                            if (!isUndefined(globalContextService.get("RecordPage", "firstUseAPIgetRecords"))) {
                                props.GetRecordsExecute(true, fmt(moment(value[0])), fmt(moment(value[1])))

                            }
                            globalContextService.set("RecordPage", "DateTimeRange", value);
                        }
                    }}
                    theme={tablet.dateTimeRange}
                />
            </BasicContainer>

            {props.data.length === 0
                ?
                <>
                    {/* 無資料表單區容器 */}
                    < BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        height={Height}
                        theme={tablet.noDataContainer}
                    >
                        <NoData style={tablet.noDataSvg} />
                    </BasicContainer>
                </>
                :
                <>
                    <Container>
                        <CardTable
                            dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                            dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                                if (globalContextService.get("RecordPage", "orgId") !== globalContextService.get("RecordPage", "TableCheckedClearKey")) {
                                    globalContextService.remove("RecordPage", "CheckedRowKeys");
                                    globalContextService.remove("RecordPage", "CheckedRowsData");
                                }
                            }}
                            checkbox={false}
                            checked={globalContextService.get("RecordPage", "CheckedRowKeys") && globalContextService.get("RecordPage", "CheckedRowKeys")}
                            checkedRowKeyName={"id"}
                            checkboxOnChecked={
                                (checkedRowKeys, checkedRows) => {
                                    // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                    globalContextService.set("RecordPage", "CheckedRowKeys", checkedRowKeys);
                                    globalContextService.set("RecordPage", "CheckedRowsData", checkedRows);
                                    //#region 必須要在勾選項"有異動"之後除˙存一個可判斷值，以保持"已異動勾選項"不被重置
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
                                        // title: '用戶列表',
                                        width: "100%",
                                        dataIndex: '',
                                        // sorter: (a, b) => a.carType.length - b.carType.length,
                                        // fixed: 'left',
                                        render: (rowData) => {
                                            const cancelStatus = (status) => {
                                                switch (toString(status)) {
                                                    case "SYS_ORDERCANCEL_REMARK_ADMIN":
                                                        return "單位取消";
                                                    case "SYS_ORDERCANCEL_REMARK_CLIENT":
                                                        return "個案取消";
                                                    case "SYS_ORDERCANCEL_REMARK_DRIVER":
                                                        return "空趟";
                                                    case "SYS_ORDERCANCEL_REMARK_CLIENT_NOTARRIVED":
                                                        return "司機未到";
                                                    case "SYS_ORDERCANCEL_REMARK_CLIENT_NOORG":
                                                        return "無派車";
                                                    default:
                                                        return "已取消";
                                                }
                                            }

                                            const statusMapping = (status, getTheme = false, cancelReamrk = "") => {
                                                switch (toString(status)) {
                                                    case "1":
                                                        return (getTheme ? tablet.statusTag.newOrder : "新訂單");
                                                    case "2":
                                                        return (getTheme ? tablet.statusTag.assignedOrder : "已排班");
                                                    case "3":
                                                        return (getTheme ? tablet.statusTag.arrivalOrder : "抵達搭車地點");
                                                    case "4":
                                                        return (getTheme ? tablet.statusTag.customUpOrder : "客上");
                                                    case "5":
                                                        return (getTheme ? tablet.statusTag.finishedOrder : "已完成");
                                                    case "9":
                                                        return (getTheme ? tablet.statusTag.unitCancleOrder : cancelStatus(cancelReamrk));
                                                    default:
                                                        return (getTheme ? {} : "無此狀態");
                                                }
                                            }

                                            return (
                                                <>
                                                    {/* 卡片資料表單區容器 */}
                                                    < BasicContainer
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={tablet.cardContainer}
                                                    >
                                                        <Container>

                                                            {/* 第一區塊 容器 */}
                                                            <SubContainer
                                                                theme={tablet.firstAreaContainer}
                                                            >
                                                                {
                                                                    switchCase(props.nowTab)
                                                                }

                                                                {/* 使用者名稱 UserName*/}
                                                                <Text
                                                                    theme={tablet.userName}
                                                                >
                                                                    {rowData?.userName ?? getParseItemLocalStorage("UserName")}

                                                                    {props.nowTab === "長照"
                                                                        &&
                                                                        <>
                                                                            {/* 案號 標題*/}
                                                                            < Text
                                                                                theme={tablet.caseNumberTitle}
                                                                            >
                                                                                案號
                                                                                {/* 案號 內文*/}
                                                                                <Text
                                                                                    theme={tablet.caseNumberText}
                                                                                >
                                                                                    {rowData?.caseNumber}
                                                                                </Text>
                                                                            </Text>
                                                                        </>
                                                                    }
                                                                </Text>

                                                            </SubContainer>

                                                            <Tag
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                theme={statusMapping(rowData.status, true)}
                                                                text={statusMapping(rowData.status, false, rowData.cancelReamrk)}
                                                            />

                                                            {props.nowTab !== "巴士"
                                                                &&
                                                                <>
                                                                    {/* 已共乘  ShareText*/}
                                                                    < Text
                                                                        theme={tablet.shareText}
                                                                    >
                                                                        <Share
                                                                            style={tablet.shareSvg}
                                                                        />
                                                                        已共乘
                                                                    </Text>
                                                                </>
                                                            }

                                                            {/* 右方外側容器 */}
                                                            <SubContainer
                                                                theme={tablet.rightOutContainer}
                                                            >
                                                                <Container>
                                                                    {/* 第二區塊 容器 */}
                                                                    <SubContainer
                                                                        theme={tablet.secondAreaContainer}
                                                                    >
                                                                        {/* 訂單編號 標題 */}
                                                                        <Text
                                                                            theme={tablet.orderNumberTitle}
                                                                        >
                                                                            訂單編號

                                                                            {/* 訂單編號 內文 */}
                                                                            <Text
                                                                                theme={tablet.orderNumberText}
                                                                            >
                                                                                {rowData?.orderNo}
                                                                            </Text>
                                                                        </Text>

                                                                        {/* 預約搭乘時間 標題 */}
                                                                        <Text
                                                                            theme={tablet.bookRideTitle}
                                                                        >
                                                                            預約搭乘時間

                                                                            {/* 預約搭乘時間 內文 */}
                                                                            <Text
                                                                                theme={tablet.bookRideText}
                                                                            >
                                                                                {rowData?.reserveDate}
                                                                            </Text>
                                                                        </Text>



                                                                        {/* 服務單位 標題 */}
                                                                        <Text
                                                                            theme={tablet.serviceUnitTitle}
                                                                        >
                                                                            服務單位

                                                                            {/* 服務單位 內文 */}
                                                                            <Tooltip placement="top" title={rowData?.orgName ?? "未排班"}>

                                                                                <Text
                                                                                    theme={tablet.serviceUnitText}
                                                                                >
                                                                                    {rowData?.orgName ?? "未排班"}
                                                                                </Text>
                                                                            </Tooltip>

                                                                        </Text>

                                                                        {/* 司機 標題 */}
                                                                        <Text
                                                                            theme={tablet.driverTitle}
                                                                        >
                                                                            司機

                                                                            {/* 司機 內文 */}
                                                                            <Text
                                                                                theme={tablet.driverText}
                                                                            >
                                                                                {rowData?.driverInfoName ?? "未排班"}
                                                                            </Text>
                                                                        </Text>

                                                                        {/* 車牌 標題 */}
                                                                        <Text
                                                                            theme={tablet.licensePlateTitle}
                                                                        >
                                                                            車牌

                                                                            {/* 車牌 內文 */}
                                                                            <Text
                                                                                theme={tablet.licensePlateText}
                                                                            >
                                                                                {rowData?.carNo ?? "未排班"}
                                                                            </Text>
                                                                        </Text>

                                                                        {props.nowTab === "長照"
                                                                            &&
                                                                            <Container>
                                                                                {/* 車資總額 標題 */}
                                                                                <Text
                                                                                    theme={tablet.totalFareTitle}
                                                                                >
                                                                                    車資總額

                                                                                    {/* 車資總額 內文 */}
                                                                                    <Text
                                                                                        theme={tablet.totalFareText}
                                                                                    >
                                                                                        ${rowData?.totalAmt ?? 0}
                                                                                    </Text>
                                                                                </Text>

                                                                                {/* 政府補助 標題 */}
                                                                                <Text
                                                                                    theme={tablet.govSubsidyTitle}
                                                                                >
                                                                                    政府補助

                                                                                    {/* 政府補助 內文 */}
                                                                                    <Text
                                                                                        theme={tablet.govSubsidyText}
                                                                                    >
                                                                                        ${rowData?.govSubsidy ?? 0}
                                                                                    </Text>
                                                                                </Text>

                                                                                {/* 陪同金額 標題 */}
                                                                                <Text
                                                                                    theme={tablet.accompanyingAmountTitle}
                                                                                >
                                                                                    陪同金額

                                                                                    {/* 陪同金額 內文 */}
                                                                                    <Text
                                                                                        theme={tablet.accompanyingAmountText}
                                                                                    >
                                                                                        ${rowData?.withAmt ?? 0}
                                                                                    </Text>
                                                                                </Text>

                                                                            </Container>
                                                                        }

                                                                        <Container>

                                                                            {props.nowTab !== "巴士"
                                                                                &&
                                                                                <>
                                                                                    {/* 可否共乘 標題 */}
                                                                                    <Text
                                                                                        theme={tablet.canShareTitle}
                                                                                    >
                                                                                        可否共乘

                                                                                        {/* 可否共乘 內文 */}
                                                                                        <Text
                                                                                            theme={tablet.canShareText}
                                                                                        >
                                                                                            {rowData?.canShared ? "願意共乘" : "不願共乘"}
                                                                                        </Text>
                                                                                    </Text>
                                                                                </>
                                                                            }

                                                                            {/* 人數 標題 */}
                                                                            <Text
                                                                                theme={tablet.numberOfPeopleTitle}
                                                                            >
                                                                                人數

                                                                                {/* 人數 內文 */}
                                                                                <Text
                                                                                    theme={tablet.numberOfPeopleText}
                                                                                >
                                                                                    {props.nowTab === "長照" ? rowData?.familyWith : rowData?.passengerNum}人
                                                                                </Text>
                                                                            </Text>

                                                                            {props.nowTab === "巴士"
                                                                                &&
                                                                                <>
                                                                                    {/* 車資總額 標題 */}
                                                                                    < Text
                                                                                        theme={tablet.totalFareTitle}
                                                                                    >
                                                                                        車資總額

                                                                                        {/* 車資總額 內文 */}
                                                                                        <Text
                                                                                            theme={tablet.totalFareText}
                                                                                        >
                                                                                            ${rowData?.totalFareText ?? 0}
                                                                                        </Text>
                                                                                    </Text>
                                                                                </>
                                                                            }

                                                                        </Container>


                                                                    </SubContainer>


                                                                    {/* 第三區塊 容器 */}
                                                                    <SubContainer
                                                                        theme={tablet.thirdAreaContainer}
                                                                    >

                                                                        {/* 起點 標題 */}
                                                                        <Text
                                                                            theme={tablet.startPointTitle}
                                                                        >

                                                                            <Start style={tablet.startPointSvg} />
                                                                        起點
                                                                        </Text>

                                                                        {/* 起點 內文 */}
                                                                        <Text
                                                                            theme={tablet.startPointText}
                                                                        >
                                                                            {props.nowTab === "巴士" ? rowData?.fromStationName : rowData?.fromAddr}
                                                                        </Text>

                                                                        {/* 迄點 標題 */}
                                                                        <Text
                                                                            theme={tablet.endPointTitle}
                                                                        >

                                                                            <End style={tablet.endPointSvg} />
                                                                        迄點
                                                                        </Text>

                                                                        {/* 迄點 內文 */}
                                                                        <Text
                                                                            theme={tablet.endPointText}
                                                                        >
                                                                            {props.nowTab === "巴士" ? rowData?.toStationName : rowData?.toAddr}
                                                                        </Text>

                                                                        {props.nowTab === "長照"
                                                                            &&
                                                                            <>

                                                                                {/* 個案負擔 容器*/}
                                                                                <Container
                                                                                    theme={tablet.caseBurdenContainer}
                                                                                >

                                                                                    {/* 個案負擔 標題 */}
                                                                                    <Text
                                                                                        theme={tablet.caseBurdenTitle}
                                                                                    >
                                                                                        個案負擔

                                                                                        {/* 個案負擔 內文 */}
                                                                                        <Text
                                                                                            theme={tablet.caseBurdenText}
                                                                                        >
                                                                                            ${rowData?.caseBurden ?? 0}
                                                                                        </Text>
                                                                                    </Text>

                                                                                    <Container
                                                                                        theme={tablet.rightButtonContainer}
                                                                                    >
                                                                                        {/* 司機未執行按鈕 */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // 防止提交
                                                                                            theme={tablet.noExecuteButton}
                                                                                            onClick={() => {
                                                                                                //#region 打開司機未執行警示 Modal
                                                                                                modalsService.infoModal.warn({
                                                                                                    iconRightText: "確定司機未執行?",
                                                                                                    yes: true,
                                                                                                    yesText: "確認",
                                                                                                    no: true,
                                                                                                    noText: "取消",
                                                                                                    // autoClose: true,
                                                                                                    backgroundClose: false,
                                                                                                    yesOnClick: (e, close) => { close(); },
                                                                                                    noOnClick: (e, close) => { },
                                                                                                })
                                                                                                // endregion
                                                                                            }}
                                                                                        >
                                                                                            司機未到
                                                                                        </NativeLineButton>

                                                                                        {props.nowTab !== "巴士"
                                                                                            &&
                                                                                            <>
                                                                                                {/* 再叫一次按鈕 */}
                                                                                                <NativeLineButton
                                                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                                                    disable={false}
                                                                                                    type="button" // 防止提交
                                                                                                    theme={tablet.againButton}
                                                                                                    onClick={() => {
                                                                                                        // history.push("/Order/WhiteOrder");
                                                                                                        // props.controllGCS("return")
                                                                                                    }}
                                                                                                >
                                                                                                    再叫一次
                                                                                                </NativeLineButton>
                                                                                            </>
                                                                                        }

                                                                                        {/* 乘車明細按鈕 */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // 防止提交
                                                                                            theme={tablet.rideDetailsButton}
                                                                                            onClick={() => {
                                                                                                history.push(`/Record/Detail?CaseId=${rowData.id}&&case=${props.nowTab}`);
                                                                                                // props.controllGCS("return")
                                                                                            }}
                                                                                        >
                                                                                            乘車明細
                                                                                        </NativeLineButton>

                                                                                        {/* 填寫問卷按鈕 */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // 防止提交
                                                                                            theme={tablet.questionnaireButton}
                                                                                            onClick={() => {
                                                                                                // history.push("/Order/WhiteOrder");
                                                                                                // props.controllGCS("return")
                                                                                            }}
                                                                                        >
                                                                                            填寫問卷
                                                                                        </NativeLineButton>




                                                                                    </Container>
                                                                                </Container>


                                                                            </>
                                                                        }

                                                                        {props.nowTab !== "長照"
                                                                            &&
                                                                            <Container>

                                                                                {/* 乘客 標題 */}
                                                                                <Text
                                                                                    theme={tablet.passengerTitle}
                                                                                >
                                                                                    乘客


                                                                        </Text>

                                                                                {/* 乘客 內文 容器*/}
                                                                                <Text
                                                                                    theme={tablet.passengerContainer}
                                                                                >
                                                                                    <Container>
                                                                                        {
                                                                                            (JSON.parse(isEmpty(rowData?.remark) ? "[]" : rowData.remark)).map((passenger, index) => {
                                                                                                return (
                                                                                                    <React.Fragment key={index}>
                                                                                                        {/* 乘客 內文 */}
                                                                                                        <Text
                                                                                                            theme={tablet.passengerText}
                                                                                                        >
                                                                                                            {passenger.name}

                                                                                                        </Text>
                                                                                                    </React.Fragment>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </Container>
                                                                                </Text>

                                                                            </Container>
                                                                        }


                                                                    </SubContainer>

                                                                </Container>

                                                                <Container>
                                                                    {props.nowTab !== "長照"
                                                                        &&
                                                                        <>
                                                                            {/* 第四區塊 容器 */}
                                                                            <SubContainer
                                                                                theme={tablet.forthAreaContainer}
                                                                            >


                                                                                <Container>
                                                                                    {/* 用戶負擔 標題 */}
                                                                                    <Text
                                                                                        theme={tablet.userBurdenTitle}
                                                                                    >
                                                                                        用戶負擔

                                                                                        {/* 用戶負擔 內文 */}
                                                                                        <Text
                                                                                            theme={tablet.userBurdenText}
                                                                                        >
                                                                                            ${rowData?.caseBurden ?? 0}
                                                                                        </Text>
                                                                                    </Text>

                                                                                    {/* 下方按鈕容器 */}
                                                                                    <Container
                                                                                        theme={tablet.bottomButtonContainer}
                                                                                    >
                                                                                        {/* 司機未執行按鈕 */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // 防止提交
                                                                                            theme={tablet.noExecuteButton}
                                                                                            onClick={() => {
                                                                                                //#region 打開司機未執行警示 Modal
                                                                                                modalsService.infoModal.warn({
                                                                                                    iconRightText: "確定司機未執行?",
                                                                                                    yes: true,
                                                                                                    yesText: "確認",
                                                                                                    no: true,
                                                                                                    noText: "取消",
                                                                                                    // autoClose: true,
                                                                                                    backgroundClose: false,
                                                                                                    yesOnClick: (e, close) => { close(); },
                                                                                                    noOnClick: (e, close) => { },
                                                                                                })
                                                                                                // endregion
                                                                                            }}
                                                                                        >
                                                                                            司機未到
                                                                                        </NativeLineButton>

                                                                                        {props.nowTab !== "巴士"
                                                                                            &&
                                                                                            <>
                                                                                                {/* 再叫一次按鈕 */}
                                                                                                <NativeLineButton
                                                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                                                    disable={false}
                                                                                                    type="button" // 防止提交
                                                                                                    theme={tablet.againButton}
                                                                                                    onClick={() => {
                                                                                                        // history.push("/Order/WhiteOrder");
                                                                                                        // props.controllGCS("return")
                                                                                                    }}
                                                                                                >
                                                                                                    再叫一次
                                                                                        </NativeLineButton>
                                                                                            </>
                                                                                        }

                                                                                        {/* 乘車明細按鈕 */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // 防止提交
                                                                                            theme={tablet.rideDetailsButton}
                                                                                            onClick={() => {
                                                                                                history.push(`/Record/Detail?CaseId=${rowData.id}&&case=${props.nowTab}`);
                                                                                                // props.controllGCS("return")
                                                                                            }}
                                                                                        >
                                                                                            乘車明細
                                                                                        </NativeLineButton>

                                                                                        {/* 填寫問卷按鈕 */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // 防止提交
                                                                                            theme={tablet.questionnaireButton}
                                                                                            onClick={() => {
                                                                                                // history.push("/Order/WhiteOrder");
                                                                                                // props.controllGCS("return")
                                                                                            }}
                                                                                        >
                                                                                            填寫問卷
                                                                                        </NativeLineButton>
                                                                                    </Container>
                                                                                </Container>
                                                                            </SubContainer>

                                                                        </>
                                                                    }
                                                                </Container>

                                                            </SubContainer>
                                                        </Container>
                                                    </BasicContainer>
                                                </>
                                            )
                                        }
                                    },

                                ]
                                //#endregion
                            }
                            //sort
                            showHeader={false}
                            data={props.data}
                            clickPage={(currentPage, pageSize) => {
                            }}
                        />

                    </Container>
                </>
            }
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
`