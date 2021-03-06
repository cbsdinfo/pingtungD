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
    const [ForceUpdate, setForceUpdate] = useState(false); // ?????????????????????

    let history = useHistory()
    const [Width, Height] = useWindowSize();

    const switchCase = (key) => {
        switch (key) {
            case "??????":
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
            case "????????????":
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
            case "??????":
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
            {/* ???????????????????????? */}
            <BasicContainer theme={tablet.dateTimeRangeContainer}>
                {/* ??????-???????????? */}
                <NewSelector
                    bascDefaultTheme={"DefaultTheme"}
                    topLabel={""}
                    bottomLabel={""}
                    //viewType
                    isSearchable
                    placeholder={""}
                    // isMulti
                    // hideSelectedOptions={false}
                    value={globalContextService.get("RecordPage", "OrderTime") ?? { value: '2', label: "????????????" }}
                    onChange={(e, value, onInitial) => {
                        if (!isEqual(value, globalContextService.get("RecordPage", "OrderTime"))) {
                            if (value?.value === '1') {
                                //???????????? - ???????????????1???????????? ?????????????????????????????????
                                globalContextService.set("RecordPage", "DateTimeRange", [moment().add(-1, 'months').startOf("month"), moment().startOf("day")]);
                            } else if (value?.value === '2') {
                                //???????????? - ??????????????????????????????????????? ????????????????????????????????????
                                globalContextService.set("RecordPage", "DateTimeRange", [moment().startOf("day"), moment().add(1, 'months').endOf('month')]);
                            }
                            globalContextService.set("RecordPage", "OrderTime", value);

                            setForceUpdate(f => !f)
                        }
                    }
                    }
                    options={
                        [
                            { value: '1', label: "????????????" },
                            { value: '2', label: "????????????" },
                        ]
                    }
                    // menuPosition={true}
                    theme={tablet.orderTime}
                />

                {/*  ?????????????????? DateTimeRange  */}
                <RangeDateTimePicker
                    topLabel={<></>}
                    // type={"time"} time???date???week???month???quarter???year
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
                    {/* ???????????????????????? */}
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
                            dataChangeClearChecked={true} //???Data????????? ????????????????????????
                            dataChangeClearCheckedToDo={() => { //???Data????????? ???????????????????????????????????????
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
                                    //#region ?????????????????????"?????????"????????????????????????????????????????????"??????????????????"????????????
                                    //#endregion
                                }
                            }
                            setPerCheckBoxDisabled={(record) => {
                                return {
                                    // ...record, // ??????CheckBox????????????
                                    // disabled: record.name === 'Edrward 11',
                                }
                            }}
                            //scrollAreaWidth={"calc( 1900px - 300px )"} // ????????? ??????????????????
                            //scrollAreaHeight={"calc( 100% - 55px )"}
                            columnsAttr={
                                //#region ???????????????
                                [
                                    {
                                        // title: '????????????',
                                        width: "100%",
                                        dataIndex: '',
                                        // sorter: (a, b) => a.carType.length - b.carType.length,
                                        // fixed: 'left',
                                        render: (rowData) => {
                                            const cancelStatus = (status) => {
                                                switch (toString(status)) {
                                                    case "SYS_ORDERCANCEL_REMARK_ADMIN":
                                                        return "????????????";
                                                    case "SYS_ORDERCANCEL_REMARK_CLIENT":
                                                        return "????????????";
                                                    case "SYS_ORDERCANCEL_REMARK_DRIVER":
                                                        return "??????";
                                                    case "SYS_ORDERCANCEL_REMARK_CLIENT_NOTARRIVED":
                                                        return "????????????";
                                                    case "SYS_ORDERCANCEL_REMARK_CLIENT_NOORG":
                                                        return "?????????";
                                                    default:
                                                        return "?????????";
                                                }
                                            }

                                            const statusMapping = (status, getTheme = false, cancelReamrk = "") => {
                                                switch (toString(status)) {
                                                    case "1":
                                                        return (getTheme ? tablet.statusTag.newOrder : "?????????");
                                                    case "2":
                                                        return (getTheme ? tablet.statusTag.assignedOrder : "?????????");
                                                    case "3":
                                                        return (getTheme ? tablet.statusTag.arrivalOrder : "??????????????????");
                                                    case "4":
                                                        return (getTheme ? tablet.statusTag.customUpOrder : "??????");
                                                    case "5":
                                                        return (getTheme ? tablet.statusTag.finishedOrder : "?????????");
                                                    case "9":
                                                        return (getTheme ? tablet.statusTag.unitCancleOrder : cancelStatus(cancelReamrk));
                                                    default:
                                                        return (getTheme ? {} : "????????????");
                                                }
                                            }

                                            return (
                                                <>
                                                    {/* ??????????????????????????? */}
                                                    < BasicContainer
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={tablet.cardContainer}
                                                    >
                                                        <Container>

                                                            {/* ???????????? ?????? */}
                                                            <SubContainer
                                                                theme={tablet.firstAreaContainer}
                                                            >
                                                                {
                                                                    switchCase(props.nowTab)
                                                                }

                                                                {/* ??????????????? UserName*/}
                                                                <Text
                                                                    theme={tablet.userName}
                                                                >
                                                                    {rowData?.userName ?? getParseItemLocalStorage("DUserName")}

                                                                    {props.nowTab === "??????"
                                                                        &&
                                                                        <>
                                                                            {/* ?????? ??????*/}
                                                                            < Text
                                                                                theme={tablet.caseNumberTitle}
                                                                            >
                                                                                ??????
                                                                                {/* ?????? ??????*/}
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

                                                            {props.nowTab !== "??????"
                                                                &&
                                                                <>
                                                                    {/* ?????????  ShareText*/}
                                                                    < Text
                                                                        theme={tablet.shareText}
                                                                    >
                                                                        <Share
                                                                            style={tablet.shareSvg}
                                                                        />
                                                                        ?????????
                                                                    </Text>
                                                                </>
                                                            }

                                                            {/* ?????????????????? */}
                                                            <SubContainer
                                                                theme={tablet.rightOutContainer}
                                                            >
                                                                <Container>
                                                                    {/* ???????????? ?????? */}
                                                                    <SubContainer
                                                                        theme={tablet.secondAreaContainer}
                                                                    >
                                                                        {/* ???????????? ?????? */}
                                                                        <Text
                                                                            theme={tablet.orderNumberTitle}
                                                                        >
                                                                            ????????????

                                                                            {/* ???????????? ?????? */}
                                                                            <Text
                                                                                theme={tablet.orderNumberText}
                                                                            >
                                                                                {rowData?.orderNo}
                                                                            </Text>
                                                                        </Text>

                                                                        {/* ?????????????????? ?????? */}
                                                                        <Text
                                                                            theme={tablet.bookRideTitle}
                                                                        >
                                                                            ??????????????????

                                                                            {/* ?????????????????? ?????? */}
                                                                            <Text
                                                                                theme={tablet.bookRideText}
                                                                            >
                                                                                {rowData?.reserveDate}
                                                                            </Text>
                                                                        </Text>



                                                                        {/* ???????????? ?????? */}
                                                                        <Text
                                                                            theme={tablet.serviceUnitTitle}
                                                                        >
                                                                            ????????????

                                                                            {/* ???????????? ?????? */}
                                                                            <Tooltip placement="top" title={rowData?.orgName ?? "?????????"}>

                                                                                <Text
                                                                                    theme={tablet.serviceUnitText}
                                                                                >
                                                                                    {rowData?.orgName ?? "?????????"}
                                                                                </Text>
                                                                            </Tooltip>

                                                                        </Text>

                                                                        {/* ?????? ?????? */}
                                                                        <Text
                                                                            theme={tablet.driverTitle}
                                                                        >
                                                                            ??????

                                                                            {/* ?????? ?????? */}
                                                                            <Text
                                                                                theme={tablet.driverText}
                                                                            >
                                                                                {rowData?.driverInfoName ?? "?????????"}
                                                                            </Text>
                                                                        </Text>

                                                                        {/* ?????? ?????? */}
                                                                        <Text
                                                                            theme={tablet.licensePlateTitle}
                                                                        >
                                                                            ??????

                                                                            {/* ?????? ?????? */}
                                                                            <Text
                                                                                theme={tablet.licensePlateText}
                                                                            >
                                                                                {rowData?.carNo ?? "?????????"}
                                                                            </Text>
                                                                        </Text>

                                                                        {props.nowTab === "??????"
                                                                            &&
                                                                            <Container>
                                                                                {/* ???????????? ?????? */}
                                                                                <Text
                                                                                    theme={tablet.totalFareTitle}
                                                                                >
                                                                                    ????????????

                                                                                    {/* ???????????? ?????? */}
                                                                                    <Text
                                                                                        theme={tablet.totalFareText}
                                                                                    >
                                                                                        ${rowData?.totalAmt ?? 0}
                                                                                    </Text>
                                                                                </Text>

                                                                                {/* ???????????? ?????? */}
                                                                                <Text
                                                                                    theme={tablet.govSubsidyTitle}
                                                                                >
                                                                                    ????????????

                                                                                    {/* ???????????? ?????? */}
                                                                                    <Text
                                                                                        theme={tablet.govSubsidyText}
                                                                                    >
                                                                                        ${rowData?.govSubsidy ?? 0}
                                                                                    </Text>
                                                                                </Text>

                                                                                {/* ???????????? ?????? */}
                                                                                <Text
                                                                                    theme={tablet.accompanyingAmountTitle}
                                                                                >
                                                                                    ????????????

                                                                                    {/* ???????????? ?????? */}
                                                                                    <Text
                                                                                        theme={tablet.accompanyingAmountText}
                                                                                    >
                                                                                        ${rowData?.withAmt ?? 0}
                                                                                    </Text>
                                                                                </Text>

                                                                            </Container>
                                                                        }

                                                                        <Container>

                                                                            {props.nowTab !== "??????"
                                                                                &&
                                                                                <>
                                                                                    {/* ???????????? ?????? */}
                                                                                    <Text
                                                                                        theme={tablet.canShareTitle}
                                                                                    >
                                                                                        ????????????

                                                                                        {/* ???????????? ?????? */}
                                                                                        <Text
                                                                                            theme={tablet.canShareText}
                                                                                        >
                                                                                            {rowData?.canShared ? "????????????" : "????????????"}
                                                                                        </Text>
                                                                                    </Text>
                                                                                </>
                                                                            }

                                                                            {/* ?????? ?????? */}
                                                                            <Text
                                                                                theme={tablet.numberOfPeopleTitle}
                                                                            >
                                                                                ??????

                                                                                {/* ?????? ?????? */}
                                                                                <Text
                                                                                    theme={tablet.numberOfPeopleText}
                                                                                >
                                                                                    {props.nowTab === "??????" ? rowData?.familyWith : rowData?.passengerNum}???
                                                                                </Text>
                                                                            </Text>

                                                                            {props.nowTab === "??????"
                                                                                &&
                                                                                <>
                                                                                    {/* ???????????? ?????? */}
                                                                                    < Text
                                                                                        theme={tablet.totalFareTitle}
                                                                                    >
                                                                                        ????????????

                                                                                        {/* ???????????? ?????? */}
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


                                                                    {/* ???????????? ?????? */}
                                                                    <SubContainer
                                                                        theme={tablet.thirdAreaContainer}
                                                                    >

                                                                        {/* ?????? ?????? */}
                                                                        <Text
                                                                            theme={tablet.startPointTitle}
                                                                        >

                                                                            <Start style={tablet.startPointSvg} />
                                                                        ??????
                                                                        </Text>

                                                                        {/* ?????? ?????? */}
                                                                        <Text
                                                                            theme={tablet.startPointText}
                                                                        >
                                                                            {props.nowTab === "??????" ? rowData?.fromStationName : rowData?.fromAddr}
                                                                        </Text>

                                                                        {/* ?????? ?????? */}
                                                                        <Text
                                                                            theme={tablet.endPointTitle}
                                                                        >

                                                                            <End style={tablet.endPointSvg} />
                                                                        ??????
                                                                        </Text>

                                                                        {/* ?????? ?????? */}
                                                                        <Text
                                                                            theme={tablet.endPointText}
                                                                        >
                                                                            {props.nowTab === "??????" ? rowData?.toStationName : rowData?.toAddr}
                                                                        </Text>

                                                                        {props.nowTab === "??????"
                                                                            &&
                                                                            <>

                                                                                {/* ???????????? ??????*/}
                                                                                <Container
                                                                                    theme={tablet.caseBurdenContainer}
                                                                                >

                                                                                    {/* ???????????? ?????? */}
                                                                                    <Text
                                                                                        theme={tablet.caseBurdenTitle}
                                                                                    >
                                                                                        ????????????

                                                                                        {/* ???????????? ?????? */}
                                                                                        <Text
                                                                                            theme={tablet.caseBurdenText}
                                                                                        >
                                                                                            ${rowData?.caseBurden ?? 0}
                                                                                        </Text>
                                                                                    </Text>

                                                                                    <Container
                                                                                        theme={tablet.rightButtonContainer}
                                                                                    >
                                                                                        {/* ????????????????????? */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // ????????????
                                                                                            theme={tablet.noExecuteButton}
                                                                                            onClick={() => {
                                                                                                //#region ??????????????????????????? Modal
                                                                                                modalsService.infoModal.warn({
                                                                                                    iconRightText: "??????????????????????",
                                                                                                    yes: true,
                                                                                                    yesText: "??????",
                                                                                                    no: true,
                                                                                                    noText: "??????",
                                                                                                    // autoClose: true,
                                                                                                    backgroundClose: false,
                                                                                                    yesOnClick: (e, close) => { close(); },
                                                                                                    noOnClick: (e, close) => { },
                                                                                                })
                                                                                                // endregion
                                                                                            }}
                                                                                        >
                                                                                            ????????????
                                                                                        </NativeLineButton>

                                                                                        {props.nowTab !== "??????"
                                                                                            &&
                                                                                            <>
                                                                                                {/* ?????????????????? */}
                                                                                                <NativeLineButton
                                                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                                                    disable={false}
                                                                                                    type="button" // ????????????
                                                                                                    theme={tablet.againButton}
                                                                                                    onClick={() => {
                                                                                                        // history.push("/Order/WhiteOrder");
                                                                                                        // props.controllGCS("return")
                                                                                                    }}
                                                                                                >
                                                                                                    ????????????
                                                                                                </NativeLineButton>
                                                                                            </>
                                                                                        }

                                                                                        {/* ?????????????????? */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // ????????????
                                                                                            theme={tablet.rideDetailsButton}
                                                                                            onClick={() => {
                                                                                                history.push(`/Record/Detail?CaseId=${rowData.id}&&case=${props.nowTab}`);
                                                                                                // props.controllGCS("return")
                                                                                            }}
                                                                                        >
                                                                                            ????????????
                                                                                        </NativeLineButton>

                                                                                        {/* ?????????????????? */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // ????????????
                                                                                            theme={tablet.questionnaireButton}
                                                                                            onClick={() => {
                                                                                                // history.push("/Order/WhiteOrder");
                                                                                                // props.controllGCS("return")
                                                                                            }}
                                                                                        >
                                                                                            ????????????
                                                                                        </NativeLineButton>




                                                                                    </Container>
                                                                                </Container>


                                                                            </>
                                                                        }

                                                                        {props.nowTab !== "??????"
                                                                            &&
                                                                            <Container>

                                                                                {/* ?????? ?????? */}
                                                                                <Text
                                                                                    theme={tablet.passengerTitle}
                                                                                >
                                                                                    ??????


                                                                        </Text>

                                                                                {/* ?????? ?????? ??????*/}
                                                                                <Text
                                                                                    theme={tablet.passengerContainer}
                                                                                >
                                                                                    <Container>
                                                                                        {
                                                                                            (JSON.parse(isEmpty(rowData?.remark) ? "[]" : rowData.remark)).map((passenger, index) => {
                                                                                                return (
                                                                                                    <React.Fragment key={index}>
                                                                                                        {/* ?????? ?????? */}
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
                                                                    {props.nowTab !== "??????"
                                                                        &&
                                                                        <>
                                                                            {/* ???????????? ?????? */}
                                                                            <SubContainer
                                                                                theme={tablet.forthAreaContainer}
                                                                            >


                                                                                <Container>
                                                                                    {/* ???????????? ?????? */}
                                                                                    <Text
                                                                                        theme={tablet.userBurdenTitle}
                                                                                    >
                                                                                        ????????????

                                                                                        {/* ???????????? ?????? */}
                                                                                        <Text
                                                                                            theme={tablet.userBurdenText}
                                                                                        >
                                                                                            ${rowData?.caseBurden ?? 0}
                                                                                        </Text>
                                                                                    </Text>

                                                                                    {/* ?????????????????? */}
                                                                                    <Container
                                                                                        theme={tablet.bottomButtonContainer}
                                                                                    >
                                                                                        {/* ????????????????????? */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // ????????????
                                                                                            theme={tablet.noExecuteButton}
                                                                                            onClick={() => {
                                                                                                //#region ??????????????????????????? Modal
                                                                                                modalsService.infoModal.warn({
                                                                                                    iconRightText: "??????????????????????",
                                                                                                    yes: true,
                                                                                                    yesText: "??????",
                                                                                                    no: true,
                                                                                                    noText: "??????",
                                                                                                    // autoClose: true,
                                                                                                    backgroundClose: false,
                                                                                                    yesOnClick: (e, close) => { close(); },
                                                                                                    noOnClick: (e, close) => { },
                                                                                                })
                                                                                                // endregion
                                                                                            }}
                                                                                        >
                                                                                            ????????????
                                                                                        </NativeLineButton>

                                                                                        {props.nowTab !== "??????"
                                                                                            &&
                                                                                            <>
                                                                                                {/* ?????????????????? */}
                                                                                                <NativeLineButton
                                                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                                                    disable={false}
                                                                                                    type="button" // ????????????
                                                                                                    theme={tablet.againButton}
                                                                                                    onClick={() => {
                                                                                                        // history.push("/Order/WhiteOrder");
                                                                                                        // props.controllGCS("return")
                                                                                                    }}
                                                                                                >
                                                                                                    ????????????
                                                                                        </NativeLineButton>
                                                                                            </>
                                                                                        }

                                                                                        {/* ?????????????????? */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // ????????????
                                                                                            theme={tablet.rideDetailsButton}
                                                                                            onClick={() => {
                                                                                                history.push(`/Record/Detail?CaseId=${rowData.id}&&case=${props.nowTab}`);
                                                                                                // props.controllGCS("return")
                                                                                            }}
                                                                                        >
                                                                                            ????????????
                                                                                        </NativeLineButton>

                                                                                        {/* ?????????????????? */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // ????????????
                                                                                            theme={tablet.questionnaireButton}
                                                                                            onClick={() => {
                                                                                                // history.push("/Order/WhiteOrder");
                                                                                                // props.controllGCS("return")
                                                                                            }}
                                                                                        >
                                                                                            ????????????
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