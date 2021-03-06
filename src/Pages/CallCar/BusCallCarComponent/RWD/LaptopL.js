import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar, MapGoogle } from '../../../../ProjectComponent';
import { ReactComponent as Search } from '../../../../Assets/img/BusCallCarComponentPage/Search.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/BusCallCarComponentPage/Convert.svg'
import { ReactComponent as StartToEnd } from '../../../../Assets/img/BusCallCarComponentPage/StartToEnd.svg'
import { ReactComponent as UpCircle } from '../../../../Assets/img/BusCallCarComponentPage/UpCircle.svg'
import { ReactComponent as End } from '../../../../Assets/img/BusCallCarComponentPage/End.svg'
import { ReactComponent as Start } from '../../../../Assets/img/BusCallCarComponentPage/Start.svg'
import { ReactComponent as End2 } from '../../../../Assets/img/BusCallCarComponentPage/End2.svg'
import { ReactComponent as Start2 } from '../../../../Assets/img/BusCallCarComponentPage/Start2.svg'
import { ReactComponent as Vector } from '../../../../Assets/img/BusCallCarComponentPage/Vector.svg'
import { ReactComponent as Minus } from '../../../../Assets/img/BusCallCarComponentPage/Minus.svg'
import { ReactComponent as Route } from '../../../../Assets/img/BusCallCarComponentPage/Route.svg'
import { ReactComponent as Magnifier } from '../../../../Assets/img/BusCallCarComponentPage/Magnifier.svg'
import { ReactComponent as People } from '../../../../Assets/img/BusCallCarComponentPage/People.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, NewSelector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { getParseItemLocalStorage, valid } from '../../../../Handlers';
import { fmt } from '../../../../Handlers/DateHandler';
import { tenMinTimes } from '../../../../Mappings/Mappings'

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { callCar: { component: { busCallCarComponent: { rwd: { laptopL } } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // ?????????????????????

    let history = useHistory();

    //#region ?????????????????????API?????? (???????????????????????????API?????????)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            // console.log(location, action, "????????????")
            // globalContextService.remove("BusCallCarPage", "firstUseAPIgetClient");
            // globalContextService.remove("BusCallCarPage", "firstUseAPIgetSubOrgs");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion
    return (
        <>
            {/* ???????????????????????? */}
            <Container
                theme={laptopL.callCarOutContainer}
            >
                {/* ???????????????????????? */}
                <SubContainer
                    theme={laptopL.formContainer}
                >
                    {/* ????????????????????? */}
                    <BasicContainer
                        theme={laptopL.callCarFormTitleContainer}
                    >

                        {/* ???????????? */}
                        <Text
                            theme={laptopL.callCarFormCaseName}
                        >
                            {props?.CaseName}
                        </Text>

                    </BasicContainer>

                    {/* ?????????????????? */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.callCarFormContainer}
                    >
                        <FormRow>

                            {/* ???????????? TravelDate */}
                            <DateTimePicker
                                topLabel={<>????????????</>}
                                // type={"time"} time???date???week???month???quarter???year
                                type={"date"}
                                format={"YYYY-MM-DD"}
                                bascDefaultTheme={"DefaultTheme"}
                                // viewType
                                isSearchable
                                placeholder={""}
                                value={
                                    (globalContextService.get("BusCallCarComponentPage", "TravelDate")) ?
                                        moment(globalContextService.get("BusCallCarComponentPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss")
                                        :
                                        null
                                }
                                onChange={(value, momentObj) => {
                                    if (value !== globalContextService.get("BusCallCarComponentPage", "TravelDate")) {
                                        globalContextService.set("BusCallCarComponentPage", "TravelDate", value);
                                        globalContextService.remove("BusCallCarComponentPage", "Route")
                                        globalContextService.remove("BusCallCarComponentPage", "StartPos")
                                        globalContextService.remove("BusCallCarComponentPage", "EndPos")
                                        globalContextService.remove("BusCallCarComponentPage", "TravelTime")
                                        setForceUpdate(f => !f)
                                    }
                                }}
                                disabledDate={(perMoment) => {
                                    // ??????????????????????????????
                                    return perMoment && (perMoment < moment().startOf('day'));
                                }}
                                theme={laptopL.travelDate}
                            />

                            {/*  ?????????????????? */}
                            {
                                // !isNil(globalContextService.get("BusCallCarComponentPage", "TravelDate"))
                                // &&
                                <>
                                    {/* ???????????? TravelTime */}
                                    <NewSelector
                                        bascDefaultTheme={"DefaultTheme"}
                                        topLabel={"????????????"}
                                        bottomLabel={""}
                                        //viewType
                                        isSearchable
                                        placeholder={""}
                                        // isMulti
                                        // hideSelectedOptions={false}
                                        value={globalContextService.get("BusCallCarComponentPage", "TravelTime") ?? null}
                                        onChange={(e, value, OnInitial) => {
                                            globalContextService.set("BusCallCarComponentPage", "TravelTime", value);
                                        }}

                                        options={[
                                            ...tenMinTimes
                                                .filter((X) => {

                                                    if (moment(globalContextService.get("BusCallCarComponentPage", "TravelDate") + " " + X.value).isBefore(moment())) {
                                                        return null
                                                    }
                                                    else if (parseInt(X.value.split(":")) < 6 || parseInt(X.value.split(":")) > 21) {
                                                        return null
                                                    }
                                                    return X
                                                })
                                        ]}
                                        // menuPosition={true}
                                        theme={laptopL.travelTime}
                                    />
                                </>
                            }

                            {/* ??????????????? */}
                            <BasicContainer
                                theme={laptopL.strokeFormTitleContainer}
                            >

                                {/* ?????? */}
                                <Text
                                    theme={laptopL.strokeText}
                                >
                                    ??????
                                    <Minus
                                        style={laptopL.strokeMinusSvg}
                                    // onClick={(e) => {
                                    //     props.setTodayToDoOpen(t => !t)
                                    // }}
                                    />
                                </Text>

                            </BasicContainer>

                            {/* ?????????????????? */}
                            <Container
                                theme={laptopL.strokeFormContainer}
                                open={props.TodayToDoOpen}
                            >
                                {/* ???????????? */}
                                <Container
                                    theme={laptopL.routeContainer}
                                >
                                    {/* ?????? Route*/}
                                    <Route style={laptopL.routeSvg} />
                                    <NewSelector
                                        placeholder={"???????????????"}
                                        isSearchable
                                        // viewType
                                        disabled={isNil(globalContextService.get("BusCallCarComponentPage", "TravelDate"))}
                                        // topLabel={"??????"}
                                        baseDefaultTheme={"DefaultTheme"}
                                        value={globalContextService.get("BusCallCarComponentPage", "Route") ?? null}
                                        onChange={(e, value, onInitial) => {
                                            if (value !== globalContextService.get("BusCallCarComponentPage", "Route")) {
                                                globalContextService.set("BusCallCarComponentPage", "Route", value);
                                                globalContextService.remove("BusCallCarComponentPage", "StartPos")
                                                globalContextService.remove("BusCallCarComponentPage", "EndPos")
                                                props.getStationOnRoute(value?.id)
                                                setForceUpdate(f => !f)
                                            }
                                        }}
                                        options={[
                                            ...props.AllRoute?.filter((item) => (item?.workWeek?.split(",").includes(moment(globalContextService.get("BusCallCarComponentPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss").isoWeekday()?.toString())))
                                            // { value: '0', label: "???????????????", isDisabled: true },
                                            // { value: '1', label: '??????A' },
                                            // { value: '2', label: '??????B' },
                                        ]}

                                        theme={laptopL.route}
                                    />
                                    <Container style={{ width: "80px" }}>
                                        <Text
                                            theme={laptopL.routeSearchText}
                                            onClick={() => {
                                                // props.controllGCS("return");
                                                history.push("/BusRoute")
                                            }}
                                        >
                                            <Magnifier style={laptopL.searchSvg} />
                                        ????????????
                                        </Text>
                                    </Container>
                                </Container>
                                {/* <Container
                                    theme={laptopL.routeContainer}
                                ></Container> */}
                                {/* ???????????? */}
                                <Container
                                    theme={laptopL.startPosContainer}
                                >
                                    {/* ?????? */}
                                    <Text
                                        theme={laptopL.todayToDoStart}
                                    >
                                        <Start2 style={laptopL.todayToDoStartSvg} />
                                        ??????
                                    </Text>

                                    {/* ???????????? */}
                                    <Text
                                        theme={laptopL.todayToDoStartAddr}
                                    >
                                        {/* {globalContextService.get("BusCallCarComponentPage", "StartPos")?.label} */}
                                    </Text>

                                    {/* ???????????? StartPos*/}
                                    <NewSelector
                                        placeholder={"???????????????"}
                                        isSearchable
                                        // viewType
                                        disabled={isNil(globalContextService.get("BusCallCarComponentPage", "Route"))}
                                        topLabel={"????????????"}
                                        baseDefaultTheme={"DefaultTheme"}
                                        value={globalContextService.get("BusCallCarComponentPage", "StartPos") ?? []}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("BusCallCarComponentPage", "StartPos", value);
                                            setForceUpdate(f => !f)
                                        }}
                                        options={[
                                            ...(props?.StationOnRoute?.assignLineStations ?? []).map((item, index) => {
                                                return props.AllStation.filter(s => s.id === item)[0]
                                            })
                                            // { value: '0', label: "???????????????", isDisabled: true },
                                            // { value: '1', label: 'A???' },
                                            // { value: '2', label: 'B???' },
                                        ]}
                                        theme={laptopL.startPos}
                                    />
                                </Container>
                                {/* ???????????? */}
                                <Container
                                    theme={laptopL.endPosContainer}
                                >
                                    {/* ?????? */}
                                    <Text
                                        theme={laptopL.todayToDoEnd}
                                    >
                                        <End2 style={laptopL.todayToDoEndSvg} />
                                        ??????
                                    </Text>

                                    {/* ???????????? */}
                                    <Text
                                        theme={laptopL.todayToDoEndAddr}
                                    >
                                        {/* {globalContextService.get("BusCallCarComponentPage", "EndPos")?.label} */}
                                    </Text>

                                    <NativeLineButton theme={laptopL.convertButton}
                                        onClick={() => {
                                            let validMsg = "";
                                            if (valid(globalContextService.get("BusCallCarComponentPage", "StartPos").value ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                validMsg = valid(globalContextService.get("BusCallCarComponentPage", "StartPos").value ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                            }
                                            else if (valid(globalContextService.get("BusCallCarComponentPage", "EndPos").value ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                validMsg = valid(globalContextService.get("BusCallCarComponentPage", "EndPos").value ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                            }
                                            if (validMsg !== "") {
                                                modalsService.infoModal.error({
                                                    id: "top1", //?????? ?????????????????????id
                                                    iconRightText: validMsg,
                                                    yes: true,
                                                    yesText: "??????",
                                                    // no: true,
                                                    // autoClose: true,
                                                    backgroundClose: false,
                                                    yesOnClick: (e, close) => {
                                                        close();
                                                    }
                                                })
                                            }
                                            else {
                                                // ??????????????????????????????

                                                let startAddr = globalContextService.get("BusCallCarComponentPage", "StartPos");
                                                let endAddr = globalContextService.get("BusCallCarComponentPage", "EndPos");
                                                globalContextService.set("BusCallCarComponentPage", "EndPos", { value: startAddr?.value, label: startAddr?.label });
                                                globalContextService.set("BusCallCarComponentPage", "StartPos", { value: endAddr?.value, label: endAddr?.label });
                                            }
                                            setForceUpdate(f => !f)
                                        }}
                                    >
                                        <Vector style={laptopL.convertContainerIcon} />
                                                ???????????????
                                    </NativeLineButton>

                                    {/* ???????????? EndPos*/}
                                    <NewSelector
                                        placeholder={"???????????????"}
                                        isSearchable
                                        // viewType
                                        disabled={isNil(globalContextService.get("BusCallCarComponentPage", "Route"))}
                                        topLabel={"????????????"}
                                        baseDefaultTheme={"DefaultTheme"}
                                        value={globalContextService.get("BusCallCarComponentPage", "EndPos") ?? []}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("BusCallCarComponentPage", "EndPos", value);
                                            setForceUpdate(f => !f)
                                        }}
                                        options={[
                                            ...(props?.StationOnRoute?.assignLineStations ?? []).map((item, index) => {
                                                return props.AllStation.filter(s => s.id === item)[0]
                                            })
                                        ]}

                                        theme={laptopL.endPos}
                                    />
                                </Container>

                                {/* ??????????????????????????? */}
                                <Container
                                    theme={laptopL.numberContainer}
                                >

                                    {/* ???????????? AccTotalCounts */}
                                    <Text theme={laptopL.formSubTitleText}>????????????</Text>
                                    <NewSelector
                                        baseDefaultTheme={"DefaultTheme"}
                                        // topLabel={"????????????"}
                                        //viewType
                                        isSearchable
                                        placeholder={""}
                                        // isMulti
                                        // hideSelectedOptions={false}
                                        value={globalContextService.get("BusCallCarComponentPage", "AccTotalCounts") ?? null}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("BusCallCarComponentPage", "AccTotalCounts", value);
                                        }}

                                        options={[
                                            { value: 1, label: "1???" },
                                            { value: 2, label: "2???" },
                                            { value: 3, label: "3???" },
                                            { value: 4, label: "4???" },
                                            { value: 5, label: "5???" },
                                            { value: 6, label: "6???" },
                                            { value: 7, label: "7???" },
                                            { value: 8, label: "8???" },
                                        ]}
                                        // menuPosition={true}
                                        theme={laptopL.accTotalCounts}
                                    />

                                    {/* ???????????? SmsNumber */}
                                    <Text theme={laptopL.formSubTitleText}>??????????????????</Text>
                                    <TextInput
                                        // topLabel={<>??????????????????</>}
                                        baseDefaultTheme={"DefaultTheme"}
                                        type="text"
                                        placeholder={"?????????????????????"}
                                        value={globalContextService.get("BusCallCarComponentPage", "SmsNumber") ?? props.CaseUsers?.enableDate}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("BusCallCarComponentPage", "SmsNumber", value);
                                        }}
                                        theme={laptopL.smsNumber}
                                    />

                                </Container>

                                {/* Table ?????? */}
                                <Container
                                    bascDefaultTheme={"DefaultTheme"}
                                    theme={laptopL.tableContainer}
                                >
                                    <OldTable
                                        pagination={false}
                                        checkbox={false}
                                        // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                                        checkedRowKeyName={"id"}
                                        checkboxOnChecked={
                                            (checkedRowKeys, checkedRows) => {
                                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                                globalContextService.set("BusCallCarComponentPage", "CheckedRowKeys", checkedRowKeys);
                                                globalContextService.set("BusCallCarComponentPage", "CheckedRowsData", checkedRows);
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
                                                    title: '??????',
                                                    width: "70px",
                                                    dataIndex: 'type',
                                                    sorter: (a, b) => a.carNo.length - b.carNo.length,
                                                    fixed: 'left',
                                                    render: (rowData) => {
                                                        return <>
                                                            <Text theme={laptopL.type}>
                                                                {rowData}
                                                            </Text>
                                                        </>
                                                    },
                                                },
                                                {
                                                    title: '????????????',
                                                    width: "110px",
                                                    dataIndex: 'estDistance',
                                                    // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                                    // fixed: 'left',
                                                },
                                                {
                                                    title: '????????????',
                                                    width: "110px",
                                                    dataIndex: 'estTime',
                                                    // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                                    // fixed: 'left',
                                                },
                                                {
                                                    title: '????????????',
                                                    width: "110px",
                                                    dataIndex: 'totalAmount',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
                                                },
                                                {
                                                    title: '????????????',
                                                    width: "110px",
                                                    dataIndex: 'compAmount',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
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
                                        data={[
                                            { id: "1", type: "??????" },
                                        ]}
                                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                                        // data={props.AllCars.data}
                                        clickPage={(currentPage, pageSize) => {
                                        }}
                                    />
                                </Container>
                            </Container>
                            {/* ??????????????????????????? */}
                            <BasicContainer
                                theme={laptopL.callCarFormBottomContainer}
                            >
                                {/* ??????????????? */}
                                {/* <NativeLineButton
                            baseDefaultTheme={"DefaultTheme"}
                            disable={false}
                            type="button" // ????????????
                            theme={laptopL.returnButton}
                            onClick={() => {
                                props.controllGCS("return");
                                history.push("/Case")
                            }}
                        >
                            ?????????
                                </NativeLineButton> */}

                                {/* ?????????????????? */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // ????????????
                                    theme={laptopL.reservationNow}
                                    onClick={() => {
                                        //#region ????????????
                                        let validMsg = "";
                                        if (valid(globalContextService.get("BusCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("BusCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                        }
                                        else if (valid(globalContextService.get("BusCallCarComponentPage", "TravelTime")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("BusCallCarComponentPage", "TravelTime")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                        }
                                        else if (valid(globalContextService.get("BusCallCarComponentPage", "AccTotalCounts")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("BusCallCarComponentPage", "AccTotalCounts")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                        }
                                        else if (valid(globalContextService.get("BusCallCarComponentPage", "Route")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("BusCallCarComponentPage", "Route")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                        }
                                        else if (valid(globalContextService.get("BusCallCarComponentPage", "StartPos")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("BusCallCarComponentPage", "StartPos")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                        }
                                        else if (valid(globalContextService.get("BusCallCarComponentPage", "EndPos")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("BusCallCarComponentPage", "EndPos")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                        }
                                        else if (valid(globalContextService.get("BusCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["???????????????????????????", "???????????????????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("BusCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["???????????????????????????", "???????????????????????????"])[1]
                                        }

                                        //#region ?????????????????????
                                        if (validMsg !== "") {
                                            // console.log(validMsg, globalContextService.get("CaseAddPage"))
                                            modalsService.infoModal.error({
                                                id: "top1", //?????? ?????????????????????id
                                                iconRightText: validMsg,
                                                yes: true,
                                                yesText: "??????",
                                                // no: true,
                                                // autoClose: true,
                                                backgroundClose: false,
                                                yesOnClick: (e, close) => {
                                                    close();
                                                }
                                            })
                                        }

                                        else {
                                            // console.log("busUserId : " + props.UserId);
                                            // console.log("date : " + globalContextService.get("BusCallCarComponentPage", "TravelDate"));
                                            // console.log("fromStationId : " + globalContextService.get("BusCallCarComponentPage", "StartPos").value);
                                            // console.log("fromStationName : " + globalContextService.get("BusCallCarComponentPage", "StartPos").label);
                                            // console.log("passengerNum : " + globalContextService.get("BusCallCarComponentPage", "AccTotalCounts").value);
                                            // console.log("reserveDate : " + globalContextService.get("BusCallCarComponentPage", "TravelDate") + " " + globalContextService.get("BusCallCarComponentPage", "TravelTime"));
                                            // console.log("stationLineId : " + globalContextService.get("BusCallCarComponentPage", "Route").value);
                                            // console.log("stationLineName : " + globalContextService.get("BusCallCarComponentPage", "Route").label);
                                            // console.log("time : " + globalContextService.get("BusCallCarComponentPage", "TravelTime"));
                                            // console.log("toStationId : " + globalContextService.get("BusCallCarComponentPage", "EndPos").value);
                                            // console.log("toStationName : " + globalContextService.get("BusCallCarComponentPage", "EndPosRoute").label);

                                            props.AddBusCallCarExecute({
                                                busUserId: props.CaseUserId,// ??????????????????id
                                                date: globalContextService.get("BusCallCarComponentPage", "TravelDate"), // ????????????
                                                fromStationId: globalContextService.get("BusCallCarComponentPage", "StartPos").value, // ????????????id
                                                fromStationName: globalContextService.get("BusCallCarComponentPage", "StartPos").label, // ??????????????????
                                                id: "",// ???????????????????????? id	??????????????????
                                                orgId: getParseItemLocalStorage("UseOrg")?.id,	// ??????????????????	
                                                passengerNum: globalContextService.get("BusCallCarComponentPage", "AccTotalCounts").value, // ????????????
                                                reserveDate: globalContextService.get("BusCallCarComponentPage", "TravelDate") + " " + globalContextService.get("BusCallCarComponentPage", "TravelTime")?.value, // ????????????+????????????	???: "2020-11-25 17:45"
                                                stationLineId: globalContextService.get("BusCallCarComponentPage", "Route").value, // ??????id
                                                stationLineName: globalContextService.get("BusCallCarComponentPage", "Route").label, // ????????????
                                                time: globalContextService.get("BusCallCarComponentPage", "TravelTime")?.value, //????????????
                                                toStationId: globalContextService.get("BusCallCarComponentPage", "EndPos").value, // ????????????id
                                                toStationName: globalContextService.get("BusCallCarComponentPage", "EndPos").label, //??????????????????
                                                remark: "",
                                                userId: props.UserId
                                            })
                                        }
                                    }}
                                >
                                    ????????????
                                </NativeLineButton>
                            </BasicContainer>
                        </FormRow>
                    </FormContainer>
                </SubContainer>
                <SubContainer
                    theme={laptopL.mapContainer}
                >
                    <MapGoogle
                        mapId={"test1"}
                        mapAttr={{
                            //   maxBounds: [[105, 15], [138.45858, 33.4]], // ??????????????????
                            center: { lat: 25.012930, lng: 121.474708 }, // ?????????????????????????????? [lng, lat]  // 25.012930, 121.474708
                            zoom: 16, // ?????? ZOOM LEVEL; [0-20, 0 ????????? (???), 20 ;?????? (???)]
                            //   minZoom: 6, // ????????????????????????????????????, ?????????, [0-19.99]
                            //   maxZoom: 19.99, // ????????????????????????????????????, ????????? [0-19.99]
                            //   pitch: 0, // ???????????????, ?????????, [0-60] // default 50
                            //   bearing: 0, // ????????????, ?????????, [-180 ~ 180; 0 ???????????????, 180 ???????????????]
                            //   attributionControl: false,
                        }}

                        theme={laptopL.map}
                    />

                </SubContainer>

            </Container>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`
