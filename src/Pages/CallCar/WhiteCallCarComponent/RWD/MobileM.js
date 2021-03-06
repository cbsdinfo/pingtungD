import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar, MapGoogle, MapGoogleInput } from '../../../../ProjectComponent';
import { ReactComponent as Search } from '../../../../Assets/img/WhiteCallCarComponentPage/Search.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/WhiteCallCarComponentPage/Convert.svg'
import { ReactComponent as StartToEnd } from '../../../../Assets/img/WhiteCallCarComponentPage/StartToEnd.svg'
import { ReactComponent as UpCircle } from '../../../../Assets/img/WhiteCallCarComponentPage/UpCircle.svg'
import { ReactComponent as End } from '../../../../Assets/img/WhiteCallCarComponentPage/End.svg'
import { ReactComponent as Start } from '../../../../Assets/img/WhiteCallCarComponentPage/Start.svg'
import { ReactComponent as End2 } from '../../../../Assets/img/WhiteCallCarComponentPage/End2.svg'
import { ReactComponent as Start2 } from '../../../../Assets/img/WhiteCallCarComponentPage/Start2.svg'
import { ReactComponent as Minus } from '../../../../Assets/img/WhiteCallCarComponentPage/Minus.svg'
import { ReactComponent as Vector } from '../../../../Assets/img/WhiteCallCarComponentPage/Vector.svg'
import { ReactComponent as Delete } from '../../../../Assets/img/WhiteCallCarComponentPage/Delete.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Checkbox, CheckboxItem, modalsService, Container, OldTable } from '../../../../Components';
import { isEqual, isNil } from 'lodash';
import { valid } from '../../../../Handlers';
import { tenMinTimes } from '../../../../Mappings/Mappings';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { callCar: { component: { whiteCallCarComponent: { rwd: { mobileM } } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // ?????????????????????

    let history = useHistory()

    //#region ????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????? Table??????
    const getCaseOrderAmtAPI = useCallback(() => {
        let end = props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // ????????????
        let start = props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // ????????????

        let validMsg = "";
        if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }
        else if (valid(end ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
            validMsg = valid(end ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
        }
        else if (valid(start ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
            validMsg = valid(start ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }

        if (validMsg === "") {
            // ?????????????????????????????????????????????????????????????????? ???????????????
            props.GetCaseOrderAmtExecute({
                CaseUserId: props.CaseUserId,
                FromAddr: globalContextService.get("WhiteCallCarComponentPage", "StartPos"),
                // FromAddrId:, // ?????????
                ToAddr: globalContextService.get("WhiteCallCarComponentPage", "EndPos"),
                FamilyWith: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value,
                // ToAddrId:, // ?????????
                ReservationDate: globalContextService.get("WhiteCallCarComponentPage", "TravelDate") + " " + globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value, // ????????????+????????????	???: "2020-11-25 17:45"
            })
        }

    }, [])
    //#endregion

    //#region ????????????????????????????????? ?????????????????????
    const formValid = useCallback(() => {
        //#region ????????????
        let validMsg = "";

        if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "BUnitSort")?.[0]?.id ?? "", ["^.{1,}$"], ["???????????????????????????????????????????????????B??????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "BUnitSort")?.[0]?.id ?? "", ["^.{1,}$"], ["???????????????????????????????????????????????????B??????"])[1]
        }
        // ?????? ???????????????????????????????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????????????????????  
        // PS.???????????? ????????????????????? ??? onSelect?????????onChange?????????onSelect????????????????????????????????????onSelect??????
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }
        // else if (map8Controll.getMarkerPoints("test1").length !== 2) {
        //     validMsg = "???????????????????????????"
        // }        
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["???????????????????????????", "???????????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["???????????????????????????", "???????????????????????????"])[1]
        }
        //#endregion

        return validMsg;

    }, [])
    //#endregion

    return (
        <>
            {/* ???????????????????????? */}
            <Container
                theme={mobileM.callCarOutContainer}
            >

                {/* ???????????????????????? */}
                <SubContainer
                    theme={mobileM.formContainer}
                >
                    {/* ????????????????????? */}
                    <BasicContainer
                        theme={mobileM.callCarFormTitleContainer}
                    >

                        {/* ???????????? */}
                        <Text
                            theme={mobileM.callCarFormCaseName}
                        >
                            {props?.CaseName}
                        </Text>
                        {/* ?????????????????????????????? */}
                        {/* <NativeLineButton
                            baseDefaultTheme={"DefaultTheme"}
                            disable={false}
                            type="button" // ????????????
                            theme={mobileM.balanceInquiryButton}
                            onClick={() => {
                                //#region ?????????????????????????????? Modal
                                modalsService.titleModal.normal({
                                    //id: "top1",
                                    title: `${props.UserName?.split(" ")?.[0]} ???????????????`,
                                    yes: true,
                                    yesText: "??????",
                                    no: false,
                                    noText: "??????",
                                    // autoClose: true,
                                    backgroundClose: false,
                                    noOnClick: (e) => {
                                    },
                                    yesOnClick: (e, close) => {
                                        close();
                                    },
                                    closeIconOnClick: (e) => {
                                    },
                                    content: (
                                        <BasicContainer>
                                            <Text
                                                theme={mobileM.balanceInquiryMTodalText}
                                            >
                                                ???????????? ${`${props?.CaseDiscount?.totalAmt ?? 0}`}
                                            </Text>
                                            <Text
                                                theme={mobileM.balanceInquiryMTodalText}
                                            >
                                                ???????????????${`${props?.CaseDiscount?.discountAmt ?? 0}`}
                                            </Text>
                                            <Text
                                                theme={mobileM.balanceInquiryMTodalText}
                                            >
                                                ???????????????${`${props?.CaseDiscount?.lastDiscountAmt ?? 0}`}
                                            </Text>
                                        </BasicContainer>
                                    ),
                                    theme: mobileM.editModal
                                })
                                //#endregion

                            }}
                        >
                            <Search
                                style={mobileM.balanceInquiryButtonIcon}
                            />
                                ????????????????????????
                            </NativeLineButton> */}
                    </BasicContainer>

                    {/* ?????????????????? */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={mobileM.callCarFormContainer}
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
                                    (globalContextService.get("WhiteCallCarComponentPage", "TravelDate")) ?
                                        moment(globalContextService.get("WhiteCallCarComponentPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss")
                                        :
                                        null
                                }
                                onChange={(value, momentObj) => {
                                    if (value !== globalContextService.get("WhiteCallCarComponentPage", "TravelDate")) {
                                        globalContextService.set("WhiteCallCarComponentPage", "TravelDate", value);
                                        getCaseOrderAmtAPI(); // ????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????? Table??????
                                        globalContextService.remove("WhiteCallCarComponentPage", "TravelTime")
                                        globalContextService.remove("WhiteCallCarComponentPage", "ReturnTravelTime")
                                        setForceUpdate(f => !f)
                                    }
                                }}
                                disabledDate={(perMoment) => {
                                    // ??????????????????????????????
                                    return perMoment && (perMoment < moment().startOf('day'));
                                }}
                                theme={mobileM.travelDate}
                            />

                            {/*  ?????????????????? */}
                            {
                                // !isNil(globalContextService.get("WhiteCallCarComponentPage", "TravelDate"))
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
                                        value={globalContextService.get("WhiteCallCarComponentPage", "TravelTime") ?? null}
                                        onChange={(e, value, OnInitial) => {
                                            if (value !== globalContextService.get("WhiteCallCarComponentPage", "TravelTime")) {
                                                globalContextService.set("WhiteCallCarComponentPage", "TravelTime", value);
                                                getCaseOrderAmtAPI(); // ????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????? Table??????
                                                setForceUpdate(f => !f)
                                            }
                                        }}

                                        options={[
                                            ...tenMinTimes
                                                .filter((X) => {

                                                    if (moment(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") + " " + X.value).isBefore(moment())) {
                                                        return null
                                                    }
                                                    else if (parseInt(X.value.split(":")) < 6 || parseInt(X.value.split(":")) > 21) {
                                                        return null
                                                    }
                                                    return X
                                                })
                                        ]}
                                        // menuPosition={true}
                                        theme={mobileM.travelTime}
                                    />
                                </>
                            }

                            {/* ???????????????????????? */}
                            {/* <BUnitSort
                                topLabel={<>???????????????????????? <Text theme={mobileM.bUnitSortNote}>(???????????????????????????)</Text></>}
                                // bUnit={props?.CaseUsers?.bUnitForCaseUser}
                                bUnit={[
                                    { id: "0", name: "0XXXX??????" },
                                    { id: "1", name: "1XXXX??????" },
                                    { id: "2", name: "2XXXX??????" },
                                    { id: "3", name: "3XXXX??????" },
                                ]}
                                value={globalContextService.get("WhiteCallCarComponentPage", `BUnitSort`)}
                                onChange={(e, value, onInitial) => {
                                    console.log(value)
                                    globalContextService.set("WhiteCallCarComponentPage", `BUnitSort`, value);
                                }}
                                theme={mobileM.bUnitSort}
                            /> */}

                            {/* ??????????????? */}
                            <BasicContainer
                                theme={mobileM.strokeFormTitleContainer}
                            >

                                {/* ?????? */}
                                <Text
                                    theme={mobileM.strokeText}
                                >
                                    ??????
                                    <Minus
                                        style={mobileM.strokeMinusSvg}
                                    // onClick={(e) => {
                                    //     props.setTodayToDoOpen(t => !t)
                                    // }}
                                    />
                                </Text>

                            </BasicContainer>
                            {/* ?????????????????? */}
                            <Container
                                theme={mobileM.strokeFormContainer}
                                open={props.TodayToDoOpen}
                            >

                                {/* ???????????? */}
                                <Container
                                    theme={mobileM.startPosContainer}
                                >
                                    {/* ?????? */}
                                    <Text
                                        theme={mobileM.todayToDoStart}
                                    >
                                        <Start2 style={mobileM.todayToDoStartSvg} />
                                        ??????
                                    </Text>

                                    {/* ???????????? */}
                                    <Text
                                        theme={mobileM.todayToDoStartAddr}
                                    >
                                        {/* {globalContextService.get("WhiteCallCarComponentPage", "StartPos")} */}
                                    </Text>

                                    {/* ?????? StartPos*/}
                                    <MapGoogleInput
                                        placeholder={"?????????????????????(XX???XX???XX???XX???)"}
                                        placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // ????????????API
                                        // viewType
                                        // disable
                                        topLabel={
                                            <>
                                                ??????
                                        </>
                                        }
                                        baseDefaultTheme={"DefaultTheme"}
                                        value={globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? ""}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("WhiteCallCarComponentPage", "StartPos", value);
                                        }}
                                        onSelect={(e, option, onInitial, posInfo) => {
                                            if (props.mapGoogleControll.getPolylineRoutes("test1")?.[0]) {
                                                let endMarker = props.mapGoogleControll.getMarkers("test1")?.[1]?.position // ???????????????
                                                props.mapGoogleControll.deletePolylineRoute("test1"); // ????????????  
                                                props.mapGoogleControll.addMarkerWithIndex("test1", { lat: posInfo?.lat, lng: posInfo?.lon }, 0) // ??????????????????
                                                props.mapGoogleControll.addMarkerWithIndex("test1", endMarker, 1) // ??????????????????
                                            }

                                            props.mapGoogleControll.addMarkerWithIndex("test1", { lat: posInfo?.lat, lng: posInfo?.lon }, 0) // ??????????????????
                                            props.mapGoogleControll.setCenter("test1", { lat: posInfo?.lat, lng: posInfo?.lon }); // ???????????????

                                            globalContextService.set("WhiteCallCarComponentPage", "StartPos", option.label);

                                            getCaseOrderAmtAPI(); // ????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????? Table??????

                                            setForceUpdate(f => !f)
                                        }}

                                        theme={mobileM.startPos}
                                    />
                                </Container>

                                {/* ???????????? */}
                                <Container
                                    theme={mobileM.endPosContainer}
                                >
                                    {/* ?????? */}
                                    <Text
                                        theme={mobileM.todayToDoEnd}
                                    >
                                        <End2 style={mobileM.todayToDoEndSvg} />
                                        ??????
                                    </Text>

                                    {/* ???????????? */}
                                    <Text
                                        theme={mobileM.todayToDoEndAddr}
                                    >
                                        {/* {globalContextService.get("WhiteCallCarComponentPage", "EndPos")} */}
                                    </Text>

                                    {/* ?????????????????? */}
                                    <NativeLineButton theme={mobileM.seeRouteButton}
                                        onClick={() => {
                                            let end = props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // ????????????
                                            let start = props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // ????????????

                                            let validMsg = "";
                                            if (valid(end ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                validMsg = valid(end ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                            }
                                            else if (valid(start ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                validMsg = valid(start ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
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

                                                //#region ?????????Call Google??????????????????
                                                // props.mapGoogleControll.addRoute("test1",
                                                //     {
                                                //         // origin: new window.google.maps.LatLng(25.012930,121.994708),
                                                //         origin: props.mapGoogleControll.getMarkers("test1")[0].position,
                                                //         destination: props.mapGoogleControll.getMarkers("test1")[1].position,// new window.google.maps.LatLng(25.012930,121.974708),
                                                //         waypoints: [
                                                //             // {
                                                //             //     location: { lat: 25.012930, lng: 121.984708 },// new window.google.maps.LatLng(25.012930,121.984708), // ????????????
                                                //             //     stopover: true,
                                                //             // },
                                                //         ]
                                                //     }
                                                // )
                                                //#endregion

                                                //#region ?????????????????? ?????????????????? (decodePath) ????????? polyline ??????????????????

                                                props.GetPolylineRouteExecute(
                                                    {
                                                        fromAddr: globalContextService.get("WhiteCallCarComponentPage", "StartPos"),
                                                        toAddr: globalContextService.get("WhiteCallCarComponentPage", "EndPos"),
                                                        mapId: "test1",
                                                        routeAttr: {
                                                            // origin: new window.google.maps.LatLng(25.012930,121.994708),
                                                            origin: props.mapGoogleControll.getMarkers("test1")[0].position,
                                                            destination: props.mapGoogleControll.getMarkers("test1")[1].position,// new window.google.maps.LatLng(25.012930,121.974708),
                                                            waypoints: [
                                                                // {
                                                                //     location: { lat: 25.012930, lng: 121.984708 },// new window.google.maps.LatLng(25.012930,121.984708), // ????????????
                                                                //     stopover: true,
                                                                // },
                                                            ]
                                                        }
                                                    }
                                                )
                                                //#endregion

                                                // setForceUpdate(f => !f)
                                            }
                                        }}
                                    >
                                        ????????????
                                    </NativeLineButton>
                                    <NativeLineButton theme={mobileM.convertButton}
                                        onClick={() => {
                                            let end = props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // ????????????
                                            let start = props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // ????????????

                                            let validMsg = "";
                                            if (valid(end ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                validMsg = valid(end ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                            }
                                            else if (valid(start ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                validMsg = valid(start ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
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
                                                let startAddr = globalContextService.get("WhiteCallCarComponentPage", "StartPos");
                                                let endAddr = globalContextService.get("WhiteCallCarComponentPage", "EndPos");

                                                globalContextService.set("WhiteCallCarComponentPage", "EndPos", startAddr);
                                                globalContextService.set("WhiteCallCarComponentPage", "StartPos", endAddr);

                                                let startMarker = props.mapGoogleControll.getMarkers("test1")?.[0]?.position  // ???????????????
                                                let endMarker = props.mapGoogleControll.getMarkers("test1")?.[1]?.position // ???????????????

                                                // props.mapGoogleControll.deleteRoute("test1"); // ???????????? ?????????Call Google??????????????????
                                                props.mapGoogleControll.deletePolylineRoute("test1"); // ???????????? ?????????????????? ?????????????????? (decodePath) ????????? polyline ??????????????????      

                                                props.mapGoogleControll.addMarker("test1", endMarker); // ???????????????
                                                props.mapGoogleControll.addMarker("test1", startMarker); // ???????????????
                                            }
                                            setForceUpdate(f => !f)
                                        }}
                                    >
                                        <Vector style={mobileM.convertContainerIcon} />
                                                ???????????????
                                    </NativeLineButton>

                                    {/* ?????? EndPos*/}
                                    <MapGoogleInput
                                        placeholder={"?????????????????????(XX???XX???XX???XX???)"}
                                        placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // ????????????API
                                        // viewType
                                        // disable
                                        topLabel={
                                            <>
                                                ??????
                                            </>
                                        }
                                        baseDefaultTheme={"DefaultTheme"}
                                        value={globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? ""}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("WhiteCallCarComponentPage", "EndPos", value);
                                        }}
                                        onSelect={(e, option, onInitial, posInfo) => {
                                            if (props.mapGoogleControll.getPolylineRoutes("test1")?.[0]) {
                                                let startMarker = props.mapGoogleControll.getMarkers("test1")?.[0]?.position // ???????????????
                                                props.mapGoogleControll.deletePolylineRoute("test1"); // ????????????  
                                                props.mapGoogleControll.addMarkerWithIndex("test1", startMarker, 0) // ??????????????????
                                            }

                                            //#region ????????????????????????
                                            if (!props.mapGoogleControll.getMarkers("test1")?.[0]) {
                                                props.mapGoogleControll.addMarkerWithIndex("test1", {}, 0) // ?????? ??????????????? ??????
                                            }
                                            //#endregion
                                            props.mapGoogleControll.addMarkerWithIndex("test1", { lat: posInfo?.lat, lng: posInfo?.lon }, 1) // ??????????????????
                                            props.mapGoogleControll.setCenter("test1", { lat: posInfo?.lat, lng: posInfo?.lon }); // ???????????????

                                            globalContextService.set("WhiteCallCarComponentPage", "EndPos", option.label);

                                            getCaseOrderAmtAPI(); // ????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????? Table??????

                                            setForceUpdate(f => !f)
                                        }}

                                        theme={mobileM.endPos}
                                    />
                                </Container>

                                {/* ?????????????????? */}
                                <Container
                                    theme={mobileM.otherInfoContainer}
                                >

                                    {/* ???????????? RideTogetherReview */}
                                    {/* ?????? Equipment */}
                                    <Checkbox
                                        // viewType
                                        checked={globalContextService.get("WhiteCallCarComponentPage", "Equipment")}
                                        // disable
                                        topLabel={""}
                                        onChange={(e, value, onInitial) => {
                                            // console.log(value)
                                            globalContextService.set("WhiteCallCarComponentPage", "Equipment", value);
                                        }}
                                        theme={mobileM.rideTogetherReview}
                                    >
                                        {/* ???????????? RideTogetherReview  ?????? */}
                                        <CheckboxItem value={"canShare"} >????????????</CheckboxItem>
                                    </Checkbox>

                                    {/* ?????? CarType */}
                                    <Text theme={mobileM.formSubTitleText}>??????</Text>
                                    <NewSelector
                                        bascDefaultTheme={"DefaultTheme"}
                                        topLabel={<>??????</>}
                                        bottomLabel={""}
                                        //viewType
                                        isSearchable
                                        placeholder={""}
                                        // isMulti
                                        // hideSelectedOptions={false}
                                        value={globalContextService.get("WhiteCallCarComponentPage", "CarType") ?? null}
                                        onChange={(e, value, onInitial) => {
                                            // console.log(props?.AllCarType)
                                            globalContextService.set("WhiteCallCarComponentPage", "CarType", value);
                                        }}

                                        options={[
                                            // { value: '0', label: "?????????????????????", isDisabled: true },
                                            ...props?.AllCarType
                                        ]}
                                        // menuPosition={true}
                                        theme={mobileM.carType}
                                    />

                                    {/* ?????? Wheelchair */}
                                    <Container style={{ width: "auto" }}>
                                        <Text theme={mobileM.formSubTitleText}>??????</Text>
                                        <NewSelector
                                            bascDefaultTheme={"DefaultTheme"}
                                            topLabel={<>??????</>}
                                            bottomLabel={""}
                                            //viewType
                                            isSearchable
                                            placeholder={""}
                                            // isMulti
                                            // hideSelectedOptions={false}
                                            value={globalContextService.get("WhiteCallCarComponentPage", "Wheelchair") ?? null}
                                            onChange={(e, value, onInitial) => {
                                                // console.log(props?.AllCarType)
                                                globalContextService.set("WhiteCallCarComponentPage", "Wheelchair", value);
                                            }}

                                            options={[
                                                { value: '0', label: "?????????????????????", isDisabled: true },
                                                { value: '1', label: "???" },
                                                { value: '2', label: "????????????(?????????)" },
                                                // ...props?.AllCarType
                                            ]}
                                            // menuPosition={true}
                                            theme={mobileM.wheelchair}
                                        />
                                    </Container>

                                    {/* ???????????? SmsNumber */}
                                    <Container style={{ width: "auto" }}>
                                        <Text theme={mobileM.formSubTitleText}>??????????????????</Text>
                                        <TextInput
                                            topLabel={<>????????????</>}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="text"
                                            placeholder={"?????????????????????"}
                                            value={globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? null}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("WhiteCallCarComponentPage", "SmsNumber", value);
                                            }}
                                            theme={mobileM.smsNumber}
                                        />
                                    </Container>
                                    <Container
                                        style={{ width: "auto" }}
                                    >
                                        {/* ??????????????????(???????????????) */}
                                        <Checkbox
                                            // viewType
                                            // disable
                                            // topLabel={"??????????????????(???????????????)"}
                                            checked={globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview") ?? [0]}
                                            onChange={(e, value, onInitial) => {
                                                if (value?.[0] === 1) {
                                                    if (value !== globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview")) {
                                                        setForceUpdate(f => !f); // ????????? ???????????? ??? ??????????????????
                                                    }
                                                }
                                                else if (globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview")?.[0] === 1) {
                                                    setForceUpdate(f => !f); // ????????? ???????????? ??????????????????
                                                }
                                                else {
                                                    //?????? ??????????????????????????????????????????
                                                    globalContextService.remove("WhiteCallCarComponentPage", "ReturnTravelTime");
                                                    let preNum = globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value;
                                                    Array(preNum).fill(0).forEach((it, ind) => {
                                                        globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerName_${ind + 1}`)
                                                        globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerBirthday_${ind + 1}`)
                                                        globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerPhone_${ind + 1}`)
                                                    });
                                                    globalContextService.remove("WhiteCallCarComponentPage", "ReturnAccompanyCounts");
                                                }
                                                globalContextService.set("WhiteCallCarComponentPage", "ScheduleReturnReview", value);
                                            }}
                                            theme={mobileM.scheduleReturnReview}
                                        >
                                            {/* ??????????????????(???????????????) ScheduleReturnReview  ?????? */}
                                            <CheckboxItem value={1} >??????????????????</CheckboxItem>
                                        </Checkbox>

                                        {
                                            globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview")?.[0] === 1
                                                ?
                                                <>
                                                    {/* ?????????????????? ReturnTravelTime */}
                                                    <Container style={{ width: "auto" }}>
                                                        <Text theme={mobileM.formSubTitleText}>??????????????????</Text>
                                                        <NewSelector
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            topLabel={"??????????????????"}
                                                            bottomLabel={""}
                                                            //viewType
                                                            isSearchable
                                                            placeholder={""}
                                                            // isMulti
                                                            // hideSelectedOptions={false}
                                                            value={globalContextService.get("WhiteCallCarComponentPage", "ReturnTravelTime") ?? null}
                                                            onChange={(e, value, OnInitial) => {
                                                                if (value !== globalContextService.get("WhiteCallCarComponentPage", "ReturnTravelTime")) {
                                                                    globalContextService.set("WhiteCallCarComponentPage", `ReturnTravelTime`, value);
                                                                    setForceUpdate(f => !f); // ????????? ???????????? ??? ??????????????????
                                                                }
                                                            }}

                                                            options={[
                                                                ...tenMinTimes
                                                                    .filter((X) => {

                                                                        if (moment(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") + " " + X.value).isBefore(moment())) {
                                                                            return null
                                                                        }
                                                                        else if (parseInt(X.value.split(":")) < 6 || parseInt(X.value.split(":")) > 21) {
                                                                            return null
                                                                        }
                                                                        return X
                                                                    })
                                                            ]}
                                                            // menuPosition={true}
                                                            theme={mobileM.returnTravelTime}
                                                        />
                                                    </Container>
                                                </>
                                                :
                                                // ??????????????????
                                                <SubContainer style={{ width: "308px" }} />
                                        }
                                    </Container>
                                </Container>
                                {/* ?????????????????? */}
                                {/* <SubContainer theme={mobileM.companyEnableOccupy} /> */}

                                {/* Table ?????? */}
                                <Container
                                    bascDefaultTheme={"DefaultTheme"}
                                    open={props.TodayToDoOpen}
                                    theme={mobileM.tableContainer}
                                >
                                    <OldTable
                                        pagination={false}
                                        checkbox={false}
                                        // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                                        checkedRowKeyName={"id"}
                                        checkboxOnChecked={
                                            (checkedRowKeys, checkedRows) => {
                                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                                globalContextService.set("WhiteCallCarComponentPage", "CheckedRowKeys", checkedRowKeys);
                                                globalContextService.set("WhiteCallCarComponentPage", "CheckedRowsData", checkedRows);
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
                                                    width: "60px",
                                                    dataIndex: 'type',
                                                    sorter: (a, b) => a.carNo.length - b.carNo.length,
                                                    fixed: 'left',
                                                    render: (rowData) => {
                                                        return <>
                                                            <Text theme={mobileM.type}>
                                                                {rowData}
                                                            </Text>
                                                        </>
                                                    },
                                                },
                                                {
                                                    title: '????????????',
                                                    width: "100px",
                                                    dataIndex: 'distance',
                                                    // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `${(rowData / 1000)?.toFixed(2)}??????` : ""
                                                    }
                                                },
                                                {
                                                    title: '????????????',
                                                    width: "100px",
                                                    dataIndex: 'duration',
                                                    // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `${(rowData / 60)?.toFixed(0)}??????` : ""
                                                    }
                                                },
                                                {
                                                    title: '????????????',
                                                    width: "100px",
                                                    dataIndex: 'totalAmt',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `$${rowData}` : ""
                                                    }
                                                },
                                                {
                                                    title: '????????????',
                                                    width: "100px",
                                                    dataIndex: 'subsidyAmt',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `$${rowData}` : ""
                                                    }
                                                },
                                                {
                                                    title: '?????????',
                                                    width: "100px",
                                                    dataIndex: 'selfPayAmt',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `$${rowData}` : ""
                                                    }
                                                },
                                                {
                                                    title: '????????????',
                                                    width: "100px",
                                                    dataIndex: 'withAmt',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `$${rowData}` : ""
                                                    }
                                                },
                                                {
                                                    title: '????????????',
                                                    width: "100px",
                                                    // dataIndex: 'seatNum',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    fixed: 'right',
                                                    render: (rowData) => {
                                                        return !isNil(rowData?.withAmt) ? `$${rowData?.withAmt + rowData?.selfPayAmt}` : ""
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
                                        // data={[
                                        //     { id: "1", type: "??????" },
                                        //     { id: "2", type: "??????" },
                                        // ]}
                                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                                        data={props.WhiteOrderAmt}
                                        clickPage={(currentPage, pageSize) => {
                                        }}
                                    />
                                </Container>


                                {/* ????????????????????????????????? */}
                                <Container
                                    theme={mobileM.takerCountsContainer}
                                >
                                    {/* ???????????? AccompanyCounts */}
                                    <Text theme={mobileM.formSubTitleText}>??????????????????</Text>
                                    <NewSelector
                                        bascDefaultTheme={"DefaultTheme"}
                                        topLabel={<>????????????</>}
                                        bottomLabel={""}
                                        //viewType
                                        isSearchable
                                        placeholder={""}
                                        // isMulti
                                        // hideSelectedOptions={false}
                                        value={globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts") ?? null}
                                        onChange={(e, value, onInitial) => {
                                            if (!isEqual(value, globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts"))) {
                                                // ???????????????????????????
                                                let preNum = globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value;
                                                Array(preNum).fill(0).forEach((it, ind) => {
                                                    if (value.value < ind + 1) {
                                                        globalContextService.remove("WhiteCallCarComponentPage", `TakerName_${ind + 1}`)
                                                        globalContextService.remove("WhiteCallCarComponentPage", `TakerBirthday_${ind + 1}`)
                                                        globalContextService.remove("WhiteCallCarComponentPage", `TakerPhone_${ind + 1}`)
                                                    }
                                                });

                                                globalContextService.set("WhiteCallCarComponentPage", "AccompanyCounts", value)
                                                setForceUpdate(f => !f);
                                            }
                                        }}

                                        options={[
                                            // { value: 'hint', label: "?????????????????????", isDisabled: true },
                                            { value: 1, label: "1???" },
                                            { value: 2, label: "2???" },
                                            { value: 3, label: "3???" },
                                            { value: 4, label: "4???" },
                                            { value: 5, label: "5???" },
                                            { value: 6, label: "6???" },
                                            { value: 7, label: "7???" },
                                            { value: 8, label: "8???" },
                                            // ...Counties
                                        ]}
                                        // menuPosition={true}
                                        theme={mobileM.accompanyCounts}
                                    />

                                    {/* ?????????????????? */}
                                    <SubContainer theme={mobileM.importButtonContainer}>
                                        <NativeLineButton
                                            onClick={() => {
                                                if (!isNil(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts"))) {
                                                    let orgNum = globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value;
                                                    //???????????????
                                                    Array(orgNum).fill(0).forEach((it, ind) => {
                                                        globalContextService.remove("WhiteCallCarComponentPage", `TakerName_${ind + 1}`)
                                                        globalContextService.remove("WhiteCallCarComponentPage", `TakerBirthday_${ind + 1}`)
                                                        globalContextService.remove("WhiteCallCarComponentPage", `TakerPhone_${ind + 1}`)
                                                    });

                                                    let preNum = globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value;
                                                    //???????????????
                                                    Array(preNum).fill(0).forEach((it, ind) => {
                                                        globalContextService.set("WhiteCallCarComponentPage", `TakerName_${ind + 1}`, globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerName_${ind + 1}`));
                                                        globalContextService.set("WhiteCallCarComponentPage", `TakerBirthday_${ind + 1}`, globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerBirthday_${ind + 1}`));
                                                        globalContextService.set("WhiteCallCarComponentPage", `TakerPhone_${ind + 1}`, globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerPhone_${ind + 1}`));
                                                    });
                                                    globalContextService.set("WhiteCallCarComponentPage", "AccompanyCounts", { value: globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts").value, label: globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts").label });
                                                    setForceUpdate(f => !f);
                                                }
                                            }}
                                            theme={mobileM.importButton}
                                        >
                                            ??????????????????
                                    </NativeLineButton>

                                    </SubContainer>
                                </Container>
                                {/* ???????????????????????? */}
                                <Container
                                    theme={mobileM.takerInfoOutContainer}
                                >
                                    {!isNil(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts"))
                                        &&
                                        (Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0).map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    {/* ????????????????????? */}
                                                    <Container
                                                        theme={mobileM.takerInfoContainer}
                                                    >
                                                        {/* ???????????? TakerName */}
                                                        <TextInput
                                                            topLabel={`??????${index + 1}`}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={``}
                                                            value={globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`) ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("WhiteCallCarComponentPage", `TakerName_${index + 1}`, value);
                                                            }}
                                                            theme={mobileM.takerName}
                                                        />

                                                        {/* ???????????? TakerBirthday */}
                                                        <DateTimePicker
                                                            topLabel={`??????${index + 1}`}
                                                            // type={"time"} time???date???week???month???quarter???year
                                                            type={"date"}
                                                            format={"YYYY-MM-DD"}
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            // viewType
                                                            isSearchable
                                                            placeholder={""}
                                                            value={
                                                                (globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${index + 1}`)) ?
                                                                    moment(globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${index + 1}`), "YYYY-MM-DD HH:mm:ss")
                                                                    :
                                                                    null
                                                            }
                                                            onChange={(value, momentObj) => {
                                                                globalContextService.set("WhiteCallCarComponentPage", `TakerBirthday_${index + 1}`, value);
                                                            }}
                                                            disabledDate={(perMoment) => {
                                                                // ??????????????????????????????
                                                                return perMoment && (perMoment > moment().endOf('day'));
                                                            }}
                                                            theme={mobileM.takerBirthday}
                                                        />

                                                        {/* ???????????? TakerPhone */}
                                                        <TextInput
                                                            topLabel={
                                                                <Text
                                                                    style={{ fontSize: "14px", fontWeight: 300 }}
                                                                >
                                                                    <Delete
                                                                        style={mobileM.deleteSvg}
                                                                        onClick={() => {
                                                                            let preNum = globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value;
                                                                            for (let i = index + 1; i < preNum; i++) {
                                                                                // ????????????????????????
                                                                                if (i >= index + 1) {
                                                                                    globalContextService.set("WhiteCallCarComponentPage", `TakerName_${i}`, globalContextService.get("WhiteCallCarComponentPage", `TakerName_${i + 1}`));
                                                                                    globalContextService.set("WhiteCallCarComponentPage", `TakerBirthday_${i}`, globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${i + 1}`));
                                                                                    globalContextService.set("WhiteCallCarComponentPage", `TakerPhone_${i}`, globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${i + 1}`));
                                                                                } else {
                                                                                    continue
                                                                                }
                                                                            }
                                                                            // ????????????????????????
                                                                            globalContextService.remove("WhiteCallCarComponentPage", `TakerName_${preNum}`);
                                                                            globalContextService.remove("WhiteCallCarComponentPage", `TakerBirthday_${preNum}`);
                                                                            globalContextService.remove("WhiteCallCarComponentPage", `TakerPhone_${preNum}`);
                                                                            // setDeleteRowIndex(index + 1);
                                                                            if (preNum === 1) {
                                                                                globalContextService.set("WhiteCallCarComponentPage", "AccompanyCounts", null)
                                                                            } else {
                                                                                globalContextService.set("WhiteCallCarComponentPage", "AccompanyCounts", { value: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts").value - 1, label: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts").value - 1 + "???" });
                                                                            }
                                                                            setForceUpdate(f => !f);
                                                                        }}
                                                                    ></Delete>
                                                                ????????????{index + 1}
                                                                </Text>
                                                            }
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={``}
                                                            value={globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${index + 1}`) ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("WhiteCallCarComponentPage", `TakerPhone_${index + 1}`, value);
                                                            }}
                                                            theme={mobileM.takerPhone}
                                                        />
                                                    </Container>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </Container>

                                {
                                    (!isNil(globalContextService.get("WhiteCallCarComponentPage", "ReturnTravelTime")) && globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview")?.[0] === 1)
                                    &&
                                    <>

                                        {/* ???????????????????????? */}
                                        <Container
                                            theme={mobileM.accompanyCountsContainer}
                                        >
                                            <Text theme={mobileM.formSubTitleText}>??????????????????</Text>
                                            {/* ?????????????????? ReturnAccompanyCounts */}
                                            <NewSelector
                                                bascDefaultTheme={"DefaultTheme"}
                                                // topLabel={<>??????????????????</>}
                                                bottomLabel={""}
                                                //viewType
                                                isSearchable
                                                placeholder={""}
                                                // isMulti
                                                // hideSelectedOptions={false}
                                                value={globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts") ?? null}
                                                onChange={(e, value, onInitial) => {
                                                    if (!isEqual(value, globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts"))) {
                                                        // ???????????????????????????
                                                        let preNum = globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value;
                                                        Array(preNum).fill(0).forEach((it, ind) => {
                                                            if (value.value < ind + 1) {
                                                                globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerName_${ind + 1}`)
                                                                globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerBirthday_${ind + 1}`)
                                                                globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerPhone_${ind + 1}`)
                                                            }
                                                        });

                                                        globalContextService.set("WhiteCallCarComponentPage", "ReturnAccompanyCounts", value)
                                                        setForceUpdate(f => !f);
                                                    }
                                                }}

                                                options={[
                                                    // { value: 'hint', label: "?????????????????????", isDisabled: true },
                                                    { value: 1, label: "1???" },
                                                    { value: 2, label: "2???" },
                                                    { value: 3, label: "3???" },
                                                    { value: 4, label: "4???" },
                                                    { value: 5, label: "5???" },
                                                    { value: 6, label: "6???" },
                                                    { value: 7, label: "7???" },
                                                    { value: 8, label: "8???" },
                                                    // ...Counties
                                                ]}
                                                // menuPosition={true}
                                                theme={mobileM.accompanyCounts}
                                            />
                                            {/* ?????????????????? */}
                                            <SubContainer theme={mobileM.importButtonContainer}>
                                                <NativeLineButton
                                                    onClick={() => {
                                                        if (!isNil(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts"))) {
                                                            let orgNum = globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value;
                                                            //???????????????
                                                            Array(orgNum).fill(0).forEach((it, ind) => {
                                                                globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerName_${ind + 1}`)
                                                                globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerBirthday_${ind + 1}`)
                                                                globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerPhone_${ind + 1}`)
                                                            });

                                                            let preNum = globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value;
                                                            //???????????????
                                                            Array(preNum).fill(0).forEach((it, ind) => {
                                                                globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerName_${ind + 1}`, globalContextService.get("WhiteCallCarComponentPage", `TakerName_${ind + 1}`));
                                                                globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerBirthday_${ind + 1}`, globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${ind + 1}`));
                                                                globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerPhone_${ind + 1}`, globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${ind + 1}`));
                                                            });
                                                            globalContextService.set("WhiteCallCarComponentPage", "ReturnAccompanyCounts", { value: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts").value, label: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts").label });
                                                            setForceUpdate(f => !f);
                                                        }
                                                    }}
                                                    theme={mobileM.importButton}
                                                >
                                                    ??????????????????
                                            </NativeLineButton>
                                            </SubContainer>
                                        </Container>

                                        {/* ?????????????????????????????? */}
                                        <Container
                                            theme={mobileM.takerInfoOutContainer}
                                        >
                                            {!isNil(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts"))
                                                &&
                                                (Array(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value)).fill(0).map((item, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            {/* ????????????????????? */}
                                                            <Container
                                                                theme={mobileM.takerInfoContainer}
                                                            >
                                                                {/* ???????????? TakerName */}
                                                                <TextInput
                                                                    topLabel={`??????${index + 1}`}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={``}
                                                                    value={globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerName_${index + 1}`) ?? ""}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerName_${index + 1}`, value);
                                                                    }}
                                                                    theme={mobileM.takerName}
                                                                />

                                                                {/* ???????????? TakerBirthday */}
                                                                <DateTimePicker
                                                                    topLabel={`??????${index + 1}`}
                                                                    // type={"time"} time???date???week???month???quarter???year
                                                                    type={"date"}
                                                                    format={"YYYY-MM-DD"}
                                                                    bascDefaultTheme={"DefaultTheme"}
                                                                    // viewType
                                                                    isSearchable
                                                                    placeholder={""}
                                                                    value={
                                                                        (globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerBirthday_${index + 1}`)) ?
                                                                            moment(globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerBirthday_${index + 1}`), "YYYY-MM-DD HH:mm:ss")
                                                                            :
                                                                            null
                                                                    }
                                                                    onChange={(value, momentObj) => {
                                                                        globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerBirthday_${index + 1}`, value);
                                                                    }}
                                                                    disabledDate={(perMoment) => {
                                                                        // ??????????????????????????????
                                                                        return perMoment && (perMoment > moment().endOf('day'));
                                                                    }}
                                                                    theme={mobileM.takerBirthday}
                                                                />

                                                                {/* ???????????? TakerPhone */}
                                                                <TextInput
                                                                    topLabel={
                                                                        <Text
                                                                            style={{ fontSize: "14px", fontWeight: 300 }}
                                                                        >
                                                                            <Delete
                                                                                style={mobileM.deleteSvg}
                                                                                onClick={() => {
                                                                                    let preNum = globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value;
                                                                                    for (let i = index + 1; i < preNum; i++) {
                                                                                        // ????????????????????????
                                                                                        if (i >= index + 1) {
                                                                                            globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerName_${i}`, globalContextService.get("WhiteCallCarComponentPage", `TakerName_${i + 1}`));
                                                                                            globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerBirthday_${i}`, globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${i + 1}`));
                                                                                            globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerPhone_${i}`, globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${i + 1}`));
                                                                                        } else {
                                                                                            continue
                                                                                        }
                                                                                    }
                                                                                    // ????????????????????????
                                                                                    globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerName_${preNum}`);
                                                                                    globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerBirthday_${preNum}`);
                                                                                    globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerPhone_${preNum}`);
                                                                                    // setDeleteRowIndex(index + 1);
                                                                                    if (preNum === 1) {
                                                                                        globalContextService.set("WhiteCallCarComponentPage", "ReturnAccompanyCounts", null)
                                                                                    } else {
                                                                                        globalContextService.set("WhiteCallCarComponentPage", "ReturnAccompanyCounts", { value: globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts").value - 1, label: globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts").value - 1 + "???" });
                                                                                    }
                                                                                    setForceUpdate(f => !f);
                                                                                }}
                                                                            ></Delete>
                                                                        ????????????{index + 1}
                                                                        </Text>
                                                                    }
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={``}
                                                                    value={globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerPhone_${index + 1}`) ?? ""}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerPhone_${index + 1}`, value);
                                                                    }}
                                                                    theme={mobileM.takerPhone}
                                                                />
                                                            </Container>
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                        </Container>
                                    </>
                                }
                            </Container>
                            {/* ??????????????????????????? */}
                            <BasicContainer
                                theme={mobileM.callCarFormBottomContainer}
                            >
                                {/* ??????????????? */}
                                {/* <NativeLineButton
                            baseDefaultTheme={"DefaultTheme"}
                            disable={false}
                            type="button" // ????????????
                            theme={mobileM.returnButton}
                            onClick={() => {
                                history.push("/Case");
                                props.controllGCS("return")

                            }}
                        >
                            ?????????
                                </NativeLineButton> */}

                                {/* ?????????????????? */}
                                {/* ?????????????????? */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // ????????????
                                    theme={mobileM.reservationNow}
                                    onClick={() => {
                                        //#region ????????????
                                        let validMsg = "";
                                        if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                        }
                                        else if (globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview")?.[0] === 1 && valid(globalContextService.get("WhiteCallCarComponentPage", "ReturnTravelTime")?.value ?? "", ["^.{1,}$"], ["???????????????????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "ReturnTravelTime")?.value ?? "", ["^.{1,}$"], ["???????????????????????????"])[1]
                                        }
                                        else if (
                                            (globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview")?.[0] === 1)
                                            &&
                                            !moment(globalContextService.get("WhiteCallCarComponentPage", "ReturnTravelTime")?.value, "HH:mm").isAfter(moment(globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value, "HH:mm"))
                                        ) {  // !(???????????? > ????????????)
                                            validMsg = "???????????????????????????????????????????????????"
                                        }
                                        else if (globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview")?.[0] === 1 && valid(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value ?? "", ["^.{1,}$"], ["???????????????????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value ?? "", ["^.{1,}$"], ["???????????????????????????"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["???????????????????????????", "???????????????????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["???????????????????????????", "???????????????????????????"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                        }
                                        else if (
                                            !(
                                                (Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0)
                                                    .map((item, index) => {
                                                        // ??????????????????????????????????????????????????????????????????
                                                        return [
                                                            valid(globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`???????????????${index + 1}`])[1],
                                                            valid(globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${index + 1}`) ?? "", ["^.{1,}$"], [`???????????????${index + 1}`])[1],
                                                            valid(globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${index + 1}`) ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], [`?????????????????????${index + 1}`, `??????????????????????????????${index + 1}`])[1]
                                                        ]
                                                    }).flat().every(V => (V === null))
                                            )
                                        ) {

                                            validMsg = (Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0)
                                                .map((item, index) => {
                                                    return [
                                                        valid(globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`???????????????${index + 1}`])[1],
                                                        valid(globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${index + 1}`) ?? "", ["^.{1,}$"], [`???????????????${index + 1}`])[1],
                                                        valid(globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${index + 1}`) ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], [`?????????????????????${index + 1}`, `??????????????????????????????${index + 1}`])[1]
                                                    ]
                                                }).flat().filter(v => v !== null)[0]; // ??????????????????????????????????????????
                                        }
                                        else if (
                                            !isNil(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")) &&
                                            !(
                                                (Array(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value)).fill(0)
                                                    .map((item, index) => {
                                                        // ??????????????????????????????????????????????????????????????????
                                                        return [
                                                            valid(globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`?????????????????????${index + 1}`])[1],
                                                            valid(globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerBirthday_${index + 1}`) ?? "", ["^.{1,}$"], [`?????????????????????${index + 1}`])[1],
                                                            valid(globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerPhone_${index + 1}`) ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], [`???????????????????????????${index + 1}`, `????????????????????????????????????${index + 1}`])[1]
                                                        ]
                                                    }).flat().every(V => (V === null))
                                            )
                                        ) {

                                            validMsg = (Array(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value)).fill(0)
                                                .map((item, index) => {
                                                    return [
                                                        valid(globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`?????????????????????${index + 1}`])[1],
                                                        valid(globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerBirthday_${index + 1}`) ?? "", ["^.{1,}$"], [`?????????????????????${index + 1}`])[1],
                                                        valid(globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerPhone_${index + 1}`) ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], [`???????????????????????????${index + 1}`, `????????????????????????????????????${index + 1}`])[1]
                                                    ]
                                                }).flat().filter(v => v !== null)[0]; // ??????????????????????????????????????????
                                        }
                                        //#endregion

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
                                            //?????????
                                            if (globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview")?.[0] === 1) {
                                                //??????
                                                props.AddOrderOfSelfPayUsersExecute({
                                                    CarCategoryName: globalContextService.get("WhiteCallCarComponentPage", "CarType").label, //?????? ??? label
                                                    canShared: globalContextService.get("WhiteCallCarComponentPage", "Equipment")?.[0] === 1 ? true : false, //????????????
                                                    carCategoryId: globalContextService.get("WhiteCallCarComponentPage", "CarType").value,	//?????? ??? value
                                                    date: globalContextService.get("WhiteCallCarComponentPage", "TravelDate"), //????????????
                                                    fromAddr: globalContextService.get("WhiteCallCarComponentPage", "StartPos"), //	??????
                                                    fromLat: props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat ?? 0, //????????????
                                                    fromLon: props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lng ?? 0,//????????????
                                                    // id: ""	?????????????????? id
                                                    noticePhone: globalContextService.get("WhiteCallCarComponentPage", "Phone"),	//??????????????????
                                                    orgId: "",//	??????????????????
                                                    passengerNum: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts").value,	//????????????
                                                    remark: JSON.stringify((Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0).map((item, index) => {
                                                        return {
                                                            name: globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`),
                                                            birth: globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${index + 1}`),
                                                            phone: globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${index + 1}`)
                                                        }
                                                    })),	//????????????????????????
                                                    reserveDate: `${globalContextService.get("WhiteCallCarComponentPage", "TravelDate")} ${globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value}`,	//????????????+ ????????????
                                                    selfPayUserId: props.CaseUserId, //????????????id
                                                    status: 1,	//??????????????????
                                                    time: globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value, //????????????
                                                    toAddr: globalContextService.get("WhiteCallCarComponentPage", "EndPos"), //	??????
                                                    toLat: props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat ?? 0,//	????????????
                                                    toLon: props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lng ?? 0,//	????????????
                                                    userId: props.UserId,
                                                    wheelchairType: globalContextService.get("WhiteCallCarComponentPage", "Wheelchair")?.label, //	??????
                                                    isLastOrder: false
                                                })

                                                //??????(???????????????)
                                                props.AddOrderOfSelfPayUsersExecute({
                                                    CarCategoryName: globalContextService.get("WhiteCallCarComponentPage", "CarType").label, //?????? ??? label
                                                    canShared: globalContextService.get("WhiteCallCarComponentPage", "Equipment")?.[0] === 1 ? true : false, //????????????
                                                    carCategoryId: globalContextService.get("WhiteCallCarComponentPage", "CarType").value,	//?????? ??? value
                                                    date: globalContextService.get("WhiteCallCarComponentPage", "TravelDate"), //????????????
                                                    fromAddr: globalContextService.get("WhiteCallCarComponentPage", "EndPos"), //	??????
                                                    fromLat: props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat ?? 0, //????????????
                                                    fromLon: props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lng ?? 0,//????????????
                                                    // id: ""	?????????????????? id
                                                    noticePhone: globalContextService.get("WhiteCallCarComponentPage", "Phone"),	//??????????????????
                                                    orgId: "",//	??????????????????
                                                    passengerNum: globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts").value,	//????????????
                                                    remark: JSON.stringify((Array(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value)).fill(0).map((item, index) => {
                                                        return {
                                                            name: globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerName_${index + 1}`),
                                                            birth: globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerBirthday_${index + 1}`),
                                                            phone: globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerPhone_${index + 1}`)
                                                        }
                                                    })),	//????????????????????????
                                                    reserveDate: `${globalContextService.get("WhiteCallCarComponentPage", "TravelDate")} ${globalContextService.get("WhiteCallCarComponentPage", "ReturnTravelTime")?.value}`,	//????????????+ ????????????
                                                    selfPayUserId: props.CaseUserId, //????????????id
                                                    status: 1,	//??????????????????
                                                    time: globalContextService.get("WhiteCallCarComponentPage", "ReturnTravelTime")?.value, //????????????
                                                    toAddr: globalContextService.get("WhiteCallCarComponentPage", "StartPos"), //	??????
                                                    toLat: props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat ?? 0,//	????????????
                                                    toLon: props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lng ?? 0,//	????????????
                                                    userId: props.UserId,
                                                    wheelchairType: globalContextService.get("WhiteCallCarComponentPage", "Wheelchair")?.label, //	??????
                                                    isLastOrder: true
                                                })
                                            } else {
                                                //????????????
                                                props.AddOrderOfSelfPayUsersExecute({
                                                    CarCategoryName: globalContextService.get("WhiteCallCarComponentPage", "CarType").label, //?????? ??? label
                                                    canShared: globalContextService.get("WhiteCallCarComponentPage", "Equipment")?.[0] === 1 ? true : false, //????????????
                                                    carCategoryId: globalContextService.get("WhiteCallCarComponentPage", "CarType").value,	//?????? ??? value
                                                    date: globalContextService.get("WhiteCallCarComponentPage", "TravelDate"), //????????????
                                                    fromAddr: globalContextService.get("WhiteCallCarComponentPage", "StartPos"), //	??????
                                                    fromLat: props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat ?? 0, //????????????
                                                    fromLon: props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lng ?? 0,//????????????
                                                    // id: ""	?????????????????? id
                                                    noticePhone: globalContextService.get("WhiteCallCarComponentPage", "Phone"),	//??????????????????
                                                    orgId: "",//	??????????????????
                                                    passengerNum: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts").value,	//????????????
                                                    remark: JSON.stringify((Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0).map((item, index) => {
                                                        return {
                                                            name: globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`),
                                                            birth: globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${index + 1}`),
                                                            phone: globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${index + 1}`)
                                                        }
                                                    })),	//????????????????????????
                                                    reserveDate: `${globalContextService.get("WhiteCallCarComponentPage", "TravelDate")} ${globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value}`,	//????????????+ ????????????
                                                    selfPayUserId: props.CaseUserId, //????????????id
                                                    status: 1,	//??????????????????
                                                    time: globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value, //????????????
                                                    toAddr: globalContextService.get("WhiteCallCarComponentPage", "EndPos"), //	??????
                                                    toLat: props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat ?? 0,//	????????????
                                                    toLon: props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lng ?? 0,//	????????????
                                                    userId: props.UserId,
                                                    wheelchairType: globalContextService.get("WhiteCallCarComponentPage", "Wheelchair")?.label, //	??????
                                                    isLastOrder: true
                                                })
                                            }
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
                    theme={mobileM.mapContainer}
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

                        theme={mobileM.map}
                    />

                </SubContainer>
            </Container>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`