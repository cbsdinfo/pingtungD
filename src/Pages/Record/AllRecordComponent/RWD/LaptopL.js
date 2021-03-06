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


const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { record: { allRecordComponent: { rwd: { laptopL } } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // ?????????????????????
    const [Width, Height] = useWindowSize();

    // console.log("data", data)
    const switchCase = (key) => {
        switch (key) {
            case "??????":
                return (
                    <>
                        {
                            1440 <= Width &&
                            <CaseLaptopL style={laptopL.caseSvg} />
                        }
                        {
                            (1024 <= Width && Width < 1440) &&
                            <CaseLaptop style={laptopL.caseSvg} />
                        }
                        {
                            (768 <= Width && Width < 1024) &&
                            <CaseTablet style={laptopL.caseSvg} />
                        }
                    </>
                );
            case "????????????":
                return (
                    <>
                        {
                            1440 <= Width &&
                            <FleetLaptopL style={laptopL.caseSvg} />
                        }
                        {
                            (1024 <= Width && Width < 1440) &&
                            <FleetLaptop style={laptopL.caseSvg} />
                        }
                        {
                            (768 <= Width && Width < 1024) &&
                            <FleetTablet style={laptopL.caseSvg} />
                        }
                    </>
                );
            case "??????":
                return (
                    <>
                        {
                            1440 <= Width &&
                            <BusLaptopL style={laptopL.caseSvg} />
                        }
                        {
                            (1024 <= Width && Width < 1440) &&
                            <BusLaptop style={laptopL.caseSvg} />
                        }
                        {
                            (768 <= Width && Width < 1024) &&
                            <BusTablet style={laptopL.caseSvg} />
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
            <BasicContainer theme={laptopL.dateTimeRangeContainer}>
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
                    theme={laptopL.orderTime}
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
                            // [moment('2019-06-06', "YYYY-MM-DD"), moment('2019-06-16', "YYYY-MM-DD")]
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
                    theme={laptopL.dateTimeRange}
                />
            </BasicContainer>
            {/* {console.log(data)} */}

            {
                props.data.length === 0
                    ?
                    <>
                        {/* ???????????????????????? */}
                        < BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.noDataContainer}
                        >
                            <NoData style={laptopL.noDataSvg} />
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
                                                            return (getTheme ? laptopL.statusTag.newOrder : "?????????");
                                                        case "2":
                                                            return (getTheme ? laptopL.statusTag.assignedOrder : "?????????");
                                                        case "3":
                                                            return (getTheme ? laptopL.statusTag.arrivalOrder : "??????????????????");
                                                        case "4":
                                                            return (getTheme ? laptopL.statusTag.customUpOrder : "??????");
                                                        case "5":
                                                            return (getTheme ? laptopL.statusTag.finishedOrder : "?????????");
                                                        case "9":
                                                            return (getTheme ? laptopL.statusTag.unitCancleOrder : cancelStatus(cancelReamrk));
                                                        default:
                                                            return (getTheme ? {} : "????????????");
                                                    }
                                                }

                                                return (
                                                    <>
                                                        {/* ??????????????????????????? */}
                                                        < BasicContainer
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.cardContainer}
                                                        >
                                                            <Container>

                                                                {/* ???????????? ?????? */}
                                                                <SubContainer
                                                                    theme={laptopL.firstAreaContainer}
                                                                >
                                                                    {
                                                                        switchCase(props.nowTab)
                                                                    }

                                                                    {/* ??????????????? UserName*/}
                                                                    <Text
                                                                        theme={laptopL.userName}
                                                                    >
                                                                        {rowData?.userName ?? getParseItemLocalStorage("DUserName")}

                                                                        {props.nowTab === "??????"
                                                                            &&
                                                                            <>
                                                                                {/* ?????? ??????*/}
                                                                                < Text
                                                                                    theme={laptopL.caseNumberTitle}
                                                                                >
                                                                                    ??????
                                                                                    {/* ?????? ??????*/}
                                                                                    <Text
                                                                                        theme={laptopL.caseNumberText}
                                                                                    >
                                                                                        {rowData?.caseNumber}
                                                                                    </Text>
                                                                                </Text>
                                                                            </>
                                                                        }
                                                                    </Text>

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
                                                                                theme={laptopL.shareText}
                                                                            >
                                                                                <Share
                                                                                    style={laptopL.shareSvg}
                                                                                />
                                                                                ?????????
                                                                            </Text>
                                                                        </>
                                                                    }

                                                                </SubContainer>


                                                                {/* ???????????? ?????? */}
                                                                <SubContainer
                                                                    theme={laptopL.secondAreaContainer}
                                                                >
                                                                    {/* ???????????? ?????? */}
                                                                    <Text
                                                                        theme={laptopL.orderNumberTitle}
                                                                    >
                                                                        ????????????

                                                                        {/* ???????????? ?????? */}
                                                                        <Text
                                                                            theme={laptopL.orderNumberText}
                                                                        >
                                                                            {rowData?.orderNo}
                                                                        </Text>
                                                                    </Text>

                                                                    {/* ?????????????????? ?????? */}
                                                                    <Text
                                                                        theme={laptopL.bookRideTitle}
                                                                    >
                                                                        ??????????????????

                                                                    {/* ?????????????????? ?????? */}
                                                                        <Text
                                                                            theme={laptopL.bookRideText}
                                                                        >
                                                                            {rowData?.reserveDate}
                                                                        </Text>
                                                                    </Text>

                                                                    {/* ???????????? ?????? */}
                                                                    <Text
                                                                        theme={laptopL.serviceUnitTitle}
                                                                    >
                                                                        ????????????

                                                                        {/* ???????????? ?????? */}
                                                                        <Tooltip placement="top" title={rowData?.orgName ?? "?????????"}>

                                                                            <Text
                                                                                theme={laptopL.serviceUnitText}
                                                                            >
                                                                                {rowData?.orgName ?? "?????????"}
                                                                            </Text>
                                                                        </Tooltip>

                                                                    </Text>

                                                                    {/* ?????? ?????? */}
                                                                    <Text
                                                                        theme={laptopL.driverTitle}
                                                                    >
                                                                        ??????

                                                                    {/* ?????? ?????? */}
                                                                        <Text
                                                                            theme={laptopL.driverText}
                                                                        >
                                                                            {rowData?.driverInfoName ?? "?????????"}
                                                                        </Text>
                                                                    </Text>

                                                                    {/* ?????? ?????? */}
                                                                    <Text
                                                                        theme={laptopL.licensePlateTitle}
                                                                    >
                                                                        ??????

                                                                    {/* ?????? ?????? */}
                                                                        <Text
                                                                            theme={laptopL.licensePlateText}
                                                                        >
                                                                            {rowData?.carNo ?? "?????????"}
                                                                        </Text>
                                                                    </Text>

                                                                    {/* ?????????????????? */}
                                                                    <NativeLineButton
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        disable={false}
                                                                        type="button" // ????????????
                                                                        theme={laptopL.noExecuteButton}
                                                                        onClick={() => {
                                                                            //#region ??????????????????????????? Modal
                                                                            modalsService.infoModal.warn({
                                                                                iconRightText: "???????????????????",
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

                                                                </SubContainer>

                                                                {/* ???????????? ?????? */}
                                                                <SubContainer
                                                                    theme={laptopL.thirdAreaContainer}
                                                                >
                                                                    {props.nowTab === "??????"
                                                                        &&
                                                                        <Container>
                                                                            {/* ???????????? ?????? */}
                                                                            <Text
                                                                                theme={laptopL.totalFareTitle}
                                                                            >
                                                                                ????????????

                                                                                {/* ???????????? ?????? */}
                                                                                <Text
                                                                                    theme={laptopL.totalFareText}
                                                                                >
                                                                                    ${rowData?.totalAmt ?? 0}
                                                                                </Text>
                                                                            </Text>

                                                                            {/* ???????????? ?????? */}
                                                                            <Text
                                                                                theme={laptopL.govSubsidyTitle}
                                                                            >
                                                                                ????????????

                                                                            {/* ???????????? ?????? */}
                                                                                <Text
                                                                                    theme={laptopL.govSubsidyText}
                                                                                >
                                                                                    ${rowData?.govSubsidy ?? 0}
                                                                                </Text>
                                                                            </Text>

                                                                            {/* ???????????? ?????? */}
                                                                            <Text
                                                                                theme={laptopL.accompanyingAmountTitle}
                                                                            >
                                                                                ????????????

                                                                            {/* ???????????? ?????? */}
                                                                                <Text
                                                                                    theme={laptopL.accompanyingAmountText}
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
                                                                                    theme={laptopL.canShareTitle}
                                                                                >
                                                                                    ????????????

                                                                                {/* ???????????? ?????? */}
                                                                                    <Text
                                                                                        theme={laptopL.canShareText}
                                                                                    >
                                                                                        {rowData?.canShared ? "????????????" : "????????????"}
                                                                                    </Text>
                                                                                </Text>
                                                                            </>
                                                                        }

                                                                        {/* ?????? ?????? */}
                                                                        <Text
                                                                            theme={laptopL.numberOfPeopleTitle}
                                                                        >
                                                                            ??????

                                                                        {/* ?????? ?????? */}
                                                                            <Text
                                                                                theme={laptopL.numberOfPeopleText}
                                                                            >
                                                                                {props.nowTab === "??????" ? rowData?.familyWith : rowData?.passengerNum}???
                                                                            </Text>
                                                                        </Text>

                                                                        {props.nowTab === "??????"
                                                                            &&
                                                                            <>
                                                                                {/* ???????????? ?????? */}
                                                                                < Text
                                                                                    theme={laptopL.totalFareTitle}
                                                                                >
                                                                                    ????????????

                                                                                {/* ???????????? ?????? */}
                                                                                    <Text
                                                                                        theme={laptopL.totalFareText}
                                                                                    >
                                                                                        ${rowData?.totalFareText ?? 0}
                                                                                    </Text>
                                                                                </Text>
                                                                            </>
                                                                        }
                                                                    </Container>

                                                                    {props.nowTab !== "??????"
                                                                        &&
                                                                        <Container>
                                                                            {/* ?????? ?????? */}
                                                                            <Text
                                                                                theme={laptopL.passengerTitle}
                                                                            >
                                                                                ??????
                                                                            </Text>

                                                                            {/* ?????? ?????? ??????*/}
                                                                            <Text
                                                                                theme={laptopL.passengerContainer}
                                                                            >
                                                                                <Container>
                                                                                    {

                                                                                        (JSON.parse(isEmpty(rowData?.remark) ? "[]" : rowData.remark)).map((passenger, index) => {
                                                                                            return (
                                                                                                <React.Fragment key={index}>
                                                                                                    {/* ?????? ?????? */}
                                                                                                    <Text
                                                                                                        theme={laptopL.passengerText}
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

                                                                    <Container
                                                                        theme={laptopL.startToEndContainer}
                                                                    >
                                                                        {/* ?????? ?????? */}
                                                                        <Text
                                                                            theme={laptopL.startPointTitle}
                                                                        >

                                                                            <Start style={laptopL.startPointSvg} />
                                                                            ??????

                                                                            {/* ?????? ?????? */}
                                                                            <Text
                                                                                theme={laptopL.startPointText}
                                                                            >
                                                                                {props.nowTab === "??????" ? rowData?.fromStationName : rowData?.fromAddr}
                                                                            </Text>

                                                                        </Text>

                                                                        {/* ?????? ?????? */}
                                                                        <Text
                                                                            theme={laptopL.endPointTitle}
                                                                        >

                                                                            <End style={laptopL.endPointSvg} />
                                                                            ??????

                                                                            {/* ?????? ?????? */}
                                                                            <Text
                                                                                theme={laptopL.endPointText}
                                                                            >
                                                                                {props.nowTab === "??????" ? rowData?.toStationName : rowData?.toAddr}
                                                                            </Text>

                                                                        </Text>

                                                                    </Container>

                                                                </SubContainer>

                                                                {/* ???????????? ?????? */}
                                                                <SubContainer
                                                                    theme={laptopL.forthAreaContainer}
                                                                >

                                                                    {/* ???????????? ?????? */}
                                                                    <Text
                                                                        theme={laptopL.caseBurdenTitle}
                                                                    >
                                                                        {props.nowTab === "??????"
                                                                            ?
                                                                            "????????????"
                                                                            :
                                                                            "????????????"
                                                                        }
                                                                    </Text>

                                                                    {/* ???????????? ?????? */}
                                                                    <Text
                                                                        theme={laptopL.caseBurdenText}
                                                                    >
                                                                        ${rowData?.caseBurden ?? 0}
                                                                    </Text>

                                                                    {props.nowTab !== "??????"
                                                                        &&
                                                                        <>
                                                                            {/* ?????????????????? */}
                                                                            <NativeLineButton
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                disable={false}
                                                                                type="button" // ????????????
                                                                                theme={laptopL.againButton}
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
                                                                        theme={laptopL.rideDetailsButton}
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
                                                                        theme={laptopL.questionnaireButton}
                                                                        onClick={() => {
                                                                            // history.push("/Order/WhiteOrder");
                                                                            // props.controllGCS("return")
                                                                        }}
                                                                    >
                                                                        ????????????
                                                                        </NativeLineButton>

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

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`