import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, MapGoogle, mapGoogleControll, Sign, Silder, TaskCard, TitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, BasicButton, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService, NumberInput } from '../../../Components';
import { ReactComponent as ToGoogleMap } from '../../../Assets/img/PerDespatchPage/ToGoogleMap.svg'
import { ReactComponent as Family } from '../../../Assets/img/PerDespatchPage/Family.svg'
import { ReactComponent as Clock } from '../../../Assets/img/PerDespatchPage/Clock.svg'
import { ReactComponent as Wheelchair } from '../../../Assets/img/PerDespatchPage/Wheelchair.svg'
import { ReactComponent as Up } from '../../../Assets/img/PerDespatchPage/Up.svg'
import { ReactComponent as Down } from '../../../Assets/img/PerDespatchPage/Down.svg'
import { ReactComponent as Cross } from '../../../Assets/img/PerDespatchPage/Cross.svg'
import { ReactComponent as Warning } from '../../../Assets/img/PerDespatchPage/Warning.svg'
import { ReactComponent as GrayCheck } from '../../../Assets/img/PerDespatchPage/GrayCheck.svg'
import { ReactComponent as GreenCheck } from '../../../Assets/img/PerDespatchPage/GreenCheck.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { SystemNewsComponent } from '../SystemNewsComponent/SystemNewsComponent'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined, toString, isNumber } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { payWayshMapping } from '../../../Mappings/Mappings';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { perDespatch: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // ?????????????????????
    const [Width, Height] = useWindowSize();
    const [DefaultPrimary, setDefaultPrimary] = useState(props?.defaultPrimary);

    const nextStatus = useCallback((status, haveSign = false) => {
        switch (toString(status)) {
            case "2":
                return "??????????????????"
            case "3":
                return "??????"
            case "4":
                return haveSign ? "????????????" : "????????????"
            default:
                break;
        }
    }, [])

    return (
        <>
            <TitleBar
                returnIcon
                returnIconOnClick={(e) => {
                    if (props.DriverSign) {
                        props.setDriverSign(false)
                        props.setPayDetail([false, false])
                        setDefaultPrimary(props?.NowTabOrderData?.orderId)
                    } else if (props.PayDetail[0]) {
                        props.setPayDetail([false, false])
                        props.controllGCS("return")
                        props.setRealAmt(null)
                        props.setPayWay("")
                        setDefaultPrimary(props?.NowTabOrderData?.orderId)
                    } else {
                        history.goBack();
                    }
                }}
            />


            <MainPageContainer
                height={Height}
                isPay={props.PayDetail[0]}
                theme={mobileM.mainPageContainer}
                outSideTopComponent={
                    <>
                    </>
                }
            >

                {/* ????????????????????? ??????*/}
                {
                    (
                        props.DriverSign
                        ||
                        props.CheckDetail
                    )
                        ?
                        <>
                            {/* ???????????? */}
                            {
                                props.CheckDetail
                                    ?
                                    <>
                                        {/* ???????????? ?????? */}
                                        <BasicContainer
                                            height={Height}
                                            theme={mobileM.checkIdContainer}
                                        >
                                            {/* ?????? */}
                                            <Text
                                                theme={mobileM.checkTip}
                                            >
                                                {`?????????!????????????`}
                                            </Text>

                                            {/* ???????????? ?????? */}
                                            <BasicContainer
                                                height={Height}
                                                theme={mobileM.checkDetailContainer}
                                            >
                                                <Cross
                                                    onClick={() => {
                                                        props.setCheckDetail(false)
                                                    }}
                                                />

                                                {/* ???????????? ?????? */}
                                                <SubContainer
                                                    theme={mobileM.checkCaseNameContainer}
                                                >
                                                    {/* ???????????? */}
                                                    <Text
                                                        theme={mobileM.checkCaseName}
                                                    >
                                                        {props.NowTabOrderData.name}
                                                    </Text>
                                                </SubContainer>

                                                {/* ???????????? ???????????? ?????? */}
                                                <Container
                                                    theme={mobileM.checkEndContainer}
                                                >
                                                    {/* ???????????? ?????? */}
                                                    <Text
                                                        theme={mobileM.checkEndTitle}
                                                    >
                                                        {`????????????`}
                                                    </Text>

                                                    {/* ???????????? ?????? */}
                                                    <Text
                                                        theme={mobileM.checkEndText}
                                                    >
                                                        {props.NowTabOrderData.toAddr}

                                                        {/* ???????????? ?????? */}
                                                        <Text
                                                            theme={mobileM.checkEndRemark}
                                                        >
                                                            {`(${props.NowTabOrderData.toAddrRemark})`}
                                                        </Text>
                                                    </Text>
                                                </Container>

                                                {/* ???????????? */}
                                                <Text
                                                    theme={mobileM.redTip}
                                                >
                                                    {`???????????????????????????????????????????????????????????????????????????`}
                                                </Text>

                                                {/* ???????????? ?????? */}
                                                <SubContainer
                                                    theme={mobileM.checkButtonContainer}
                                                >
                                                    {/* ???????????? */}
                                                    <NativeLineButton
                                                        theme={mobileM.comfirmButton}
                                                        onClick={() => {
                                                            props.ChangeStatussExecute({
                                                                orderId: props?.NowTabOrderData?.orderId,
                                                                status: 3
                                                            })
                                                            props.setCheckDetail(false)
                                                        }}
                                                    >
                                                        {`??????`}
                                                    </NativeLineButton>
                                                </SubContainer>

                                            </BasicContainer>

                                        </BasicContainer>
                                    </>
                                    :
                                    <>
                                        {/* ?????? */}
                                        <BasicContainer
                                            height={Height}
                                            theme={mobileM.signContainer}
                                        >
                                            <Sign
                                                height={Height - 56 - 10}
                                                primaryKey={props?.NowTabOrderData?.orderId}
                                                sendOnClick={(base64, isNoSign, clearSign) => {
                                                    if (isNoSign) {
                                                        modalsService.infoModal.error({
                                                            id: "top1", //?????? ?????????????????????id
                                                            iconRightText: "?????????!",
                                                            yes: true,
                                                            yesText: "??????",
                                                            // no: true,
                                                            // noText: "??????",
                                                            // autoClose: true,
                                                            backgroundClose: false,
                                                            yesOnClick: (e, close) => {
                                                                close();
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        props.UpdatePayExecute({
                                                            id: props?.NowTabOrderData?.orderId,
                                                            signPic: base64
                                                        })
                                                        props.setDriverSign(false)
                                                        props.controllGCS("return");
                                                    }
                                                    // console.log(base64, isNoSign)
                                                }}
                                            />

                                        </BasicContainer>
                                    </>
                            }
                        </>
                        :
                        <BasicContainer
                            theme={mobileM.cardOutContainer}
                        >
                            {props?.TodayTask?.map((item, index) => {
                                let nullButtonDisplay = [3]
                                let mapDisplay = [2, 4]
                                let silderDisplay = [2, 3]

                                return (
                                    <TaskCard
                                        key={index}
                                        data={item?.despatchOfCaseOrderDayViews}
                                        nameType // timeNameType???nameType ???????????????????????????????????????
                                        // timeNameType // timeNameType???nameType ???????????????????????????????????????
                                        // needAction // ?????????????????????????????????????????????
                                        nameKeyName={"name"} // nameKeyName ???????????? ?????? ??? key ???
                                        TimeKeyName={"reserveDate"} // TimeKeyName ???????????? ?????? ??? key ???
                                        // callBackKeyName ??????????????? ??????????????????????????????????????? key???
                                        primaryKey={"orderId"}// primaryKey ???????????? ????????? ??? key ???
                                        defaultUsePrimaryKey={DefaultPrimary} // ???????????????????????? (??????????????? primaryKey)
                                        onTabClick={() => {
                                            props.setPayDetail([false, false]);
                                            props.setRealAmt(null);
                                            props.controllGCS("changeTab");
                                            props.setOpen(false);
                                        }}
                                        topContent={(data) => {
                                            // console.log(data)
                                            return (
                                                <>
                                                    {/* ????????? ?????? */}
                                                    {
                                                        !props.PayDetail[0]
                                                            ?
                                                            <>
                                                                {/* ???????????? */}
                                                                <Text
                                                                    theme={mobileM.familyWidhText}
                                                                >
                                                                    <Family style={mobileM.withSvg} />

                                                                    {`????????????`}

                                                                    {/* ???????????? ?????? */}
                                                                    <Text
                                                                        theme={mobileM.familyWidhData}
                                                                    >
                                                                        {`${data.familyWith}`}
                                                                    </Text>
                                                                </Text>
                                                            </>
                                                            :
                                                            <>
                                                                {/* ???????????? ?????? */}
                                                                <Text
                                                                    theme={mobileM.topPayWheelchairTypeText}
                                                                >
                                                                    {`${data.wheelchairType}`}
                                                                </Text>
                                                            </>
                                                    }


                                                </>
                                            )
                                        }}
                                        bottomContent={(data) => {
                                            // console.log(data)

                                            const drawLine = () => {
                                                if (data?.polyLine && mapGoogleControll.getBasicMap("test1")) {
                                                    mapGoogleControll.addPolylineRoute("test1", data?.polyLine)
                                                }

                                            }
                                            // console.log(props.NowTabOrderData)
                                            // ????????????TaskCard??????????????????????????????????????????TaskCard??????????????????????????????
                                            props.setNowTabOrderData(data);
                                            return (
                                                <>
                                                    {/* ???????????? ?????? */}
                                                    <SubContainer
                                                        height={Height}
                                                        width={Width}
                                                        theme={mobileM.bottomContainer}
                                                    >
                                                        {/* ????????? ?????? */}
                                                        {
                                                            !props.PayDetail[0]
                                                                ?
                                                                <>
                                                                    <Container>

                                                                        {/* ???????????? ?????? */}
                                                                        <SubContainer
                                                                            status={data.status}
                                                                            theme={mobileM.timeDataContainer}
                                                                        >
                                                                            {/* ???????????? */}
                                                                            <Text
                                                                                status={data.status}
                                                                                theme={mobileM.timeText}
                                                                            >
                                                                                <Clock style={mobileM.clockSvg} />
                                                                                {`${data.reserveDate}`.split(' ')[1].substring(0, 5)}
                                                                            </Text>

                                                                            {/* ?????? */}
                                                                            <Text
                                                                                status={data.status}
                                                                                theme={mobileM.wheelchairTypeText}
                                                                            >
                                                                                <Wheelchair style={mobileM.wheelchairSvg} />
                                                                                {`${data.wheelchairType}`}
                                                                            </Text>

                                                                        </SubContainer>

                                                                        {/* ???????????? ?????? */}
                                                                        {
                                                                            nullButtonDisplay.includes(data.status)
                                                                            &&
                                                                            <>
                                                                                {/* ???????????? ?????? */}
                                                                                <SubContainer
                                                                                    theme={mobileM.nullButtonContainer}
                                                                                >
                                                                                    {/* ???????????? */}
                                                                                    <NativeLineButton
                                                                                        theme={mobileM.nullButton}
                                                                                        onClick={() => {
                                                                                            modalsService.infoModal.warn({
                                                                                                id: "top1", //?????? ?????????????????????id
                                                                                                iconRightText:
                                                                                                    <>
                                                                                                        {`??????`}
                                                                                                        <Text
                                                                                                            theme={mobileM.nullButtonText}
                                                                                                        >
                                                                                                            <Warning style={mobileM.warningSvg2} />
                                                                                                            {`??????`}
                                                                                                        </Text>
                                                                                                    </>,
                                                                                                yes: true,
                                                                                                yesText: "??????",
                                                                                                no: true,
                                                                                                noText: "??????",
                                                                                                // autoClose: true,
                                                                                                backgroundClose: false,
                                                                                                yesOnClick: (e, close) => {
                                                                                                    props.ChangeStatussExecute({
                                                                                                        orderId: data.orderId,
                                                                                                        status: 9,
                                                                                                        cancelRemark: "SYS_ORDERCANCEL_REMARK_DRIVER"
                                                                                                    })
                                                                                                    close();
                                                                                                    props.controllGCS("return");
                                                                                                    history.goBack();
                                                                                                }
                                                                                            })
                                                                                        }}
                                                                                    >
                                                                                        <Warning style={mobileM.warningSvg} />

                                                                                        {`??????`}
                                                                                    </NativeLineButton>

                                                                                </SubContainer>
                                                                            </>
                                                                        }

                                                                        {/* ???????????? ?????? */}
                                                                        {
                                                                            [4].includes(data.status)
                                                                            &&
                                                                            <>
                                                                                {/* ???????????? ?????? */}
                                                                                <SubContainer
                                                                                    status={data.status}
                                                                                    theme={mobileM.payButtonContainer}
                                                                                >
                                                                                    {/* ????????????????????? */}
                                                                                    {
                                                                                        isEmpty(data?.orderPay?.signPic)
                                                                                        &&
                                                                                        <>
                                                                                            {/* ???????????? */}
                                                                                            < NativeLineButton
                                                                                                width={Width}
                                                                                                theme={mobileM.payButton}
                                                                                                onClick={() => {
                                                                                                    //#region ??????????????????
                                                                                                    if (isNil(data?.orderPay)) {
                                                                                                        props.GetRealAmtExecute({
                                                                                                            despatchNo: data.despatchNo,
                                                                                                            orderId: data.orderId,
                                                                                                            familyWith: data.familyWith,
                                                                                                        })
                                                                                                        props.setPayDetail([true, false])
                                                                                                    }
                                                                                                    //#region ????????????????????????
                                                                                                    else {
                                                                                                        props.setDriverSign(true)
                                                                                                    }
                                                                                                    //#endregion
                                                                                                    //#endregion
                                                                                                }}
                                                                                            >
                                                                                                {`${isNil(data?.orderPay) ? "??????" : "??????"}`}
                                                                                            </NativeLineButton>
                                                                                        </>
                                                                                    }


                                                                                    {/* ???????????? ?????? */}
                                                                                    <Text
                                                                                        thme={mobileM.payCheckText}
                                                                                    >
                                                                                        {/* ?????????????????? */}
                                                                                        {
                                                                                            isNil(data.orderPay)
                                                                                                ?
                                                                                                <GrayCheck style={mobileM.payCheckSvg} />
                                                                                                :
                                                                                                <GreenCheck style={mobileM.payCheckSvg} />
                                                                                        }

                                                                                        {`????????????`}
                                                                                    </Text>

                                                                                    {/* ???????????? ?????? */}
                                                                                    <Text
                                                                                        thme={mobileM.payCheckText}
                                                                                    >
                                                                                        {/* ????????????????????? */}
                                                                                        {
                                                                                            isEmpty(data?.orderPay?.signPic)
                                                                                                ?
                                                                                                <GrayCheck style={mobileM.payCheckSvg} />
                                                                                                :
                                                                                                <GreenCheck style={mobileM.payCheckSvg} />
                                                                                        }

                                                                                        {`????????????`}
                                                                                    </Text>

                                                                                    {/* ????????????????????? */}
                                                                                    {
                                                                                        isEmpty(data?.orderPay?.signPic)
                                                                                        &&
                                                                                        <>
                                                                                            {/* ???????????? ?????? */}
                                                                                            <Text
                                                                                                theme={mobileM.payCheckTip}
                                                                                            >
                                                                                                {`?????????????????????????????????`}
                                                                                            </Text>
                                                                                        </>
                                                                                    }

                                                                                </SubContainer>

                                                                                {/* ???????????? ?????? ?????? */}
                                                                                <SubContainer
                                                                                    status={data.status}
                                                                                    theme={mobileM.payWheelchairTypeContainer}
                                                                                >
                                                                                    <Wheelchair />
                                                                                    <Text
                                                                                        theme={mobileM.payWheelchairTypeText}
                                                                                    >
                                                                                        {`${data.wheelchairType}`}
                                                                                    </Text>

                                                                                </SubContainer>
                                                                            </>
                                                                        }

                                                                    </Container>

                                                                    {/* ???????????? */}
                                                                    <SubContainer
                                                                        open={(props.Open && data.status === 2)}
                                                                        theme={mobileM.estimateContainer}
                                                                    >
                                                                        {/* ???????????? */}
                                                                        <Text
                                                                            theme={mobileM.estimateMileageText}
                                                                        >
                                                                            {/* ???????????? ?????? */}
                                                                            <Text
                                                                                theme={mobileM.estimateMileageTitle}
                                                                            >
                                                                                {`????????????`}
                                                                            </Text>

                                                                            {`${Math.round(data.totalMileage / 1000 * 100) / 100}`}

                                                                            <Text
                                                                                theme={mobileM.minuteText}
                                                                            >
                                                                                {`??????`}
                                                                            </Text>
                                                                        </Text>


                                                                        {/* ???????????? */}
                                                                        <Text
                                                                            theme={mobileM.estimateTimeText}
                                                                        >
                                                                            {/* ???????????? ?????? */}
                                                                            <Text
                                                                                theme={mobileM.estimateTimeTitle}
                                                                            >
                                                                                {`????????????`}
                                                                            </Text>

                                                                            {`${data.expectedMinute}`}

                                                                            <Text
                                                                                theme={mobileM.minuteText}
                                                                            >
                                                                                {`??????`}
                                                                            </Text>
                                                                        </Text>

                                                                    </SubContainer>

                                                                    {/* ????????? ?????? */}
                                                                    <SubContainer
                                                                        open={(props.Open || data.status === 3)}
                                                                        theme={mobileM.startToEndContainer}
                                                                    >
                                                                        {/* ???????????? ?????? */}
                                                                        <Text
                                                                            status={data.status}
                                                                            open={props.Open}
                                                                            theme={mobileM.startTitle}
                                                                        >
                                                                            {`????????????`}
                                                                        </Text>

                                                                        {/* ???????????? ?????? */}
                                                                        <Text
                                                                            status={data.status}
                                                                            open={props.Open}
                                                                            theme={mobileM.startText}
                                                                        >
                                                                            {data.fromAddr}
                                                                        </Text>

                                                                        {/* ???????????? ?????? */}
                                                                        <Text
                                                                            status={data.status}
                                                                            open={props.Open}
                                                                            theme={mobileM.startRemark}
                                                                        >
                                                                            {`(${data.fromAddrRemark})`}
                                                                        </Text>

                                                                        {/* ???????????? ?????? */}
                                                                        <Text
                                                                            status={data.status}
                                                                            open={props.Open}
                                                                            theme={mobileM.endTitle}
                                                                        >
                                                                            {`????????????`}
                                                                        </Text>

                                                                        {/* ???????????? ?????? */}
                                                                        <Text
                                                                            status={data.status}
                                                                            open={props.Open}
                                                                            theme={mobileM.endText}
                                                                        >
                                                                            {data.toAddr}
                                                                        </Text>

                                                                        {/* ???????????? ?????? */}
                                                                        <Text
                                                                            status={data.status}
                                                                            open={props.Open}
                                                                            theme={mobileM.endRemark}
                                                                        >
                                                                            {`(${data.toAddrRemark})`}
                                                                        </Text>

                                                                    </SubContainer>

                                                                    {/* ?????? ?????? */}
                                                                    {mapDisplay.includes(data.status)
                                                                        &&
                                                                        <>
                                                                            {/* ???????????? */}
                                                                            <BasicContainer
                                                                                status={data.status}
                                                                                open={props.Open}
                                                                                height={Height}
                                                                                width={Width}
                                                                                theme={mobileM.mapContainer}
                                                                            >
                                                                                {/* ?????? */}
                                                                                <ToGoogleMap
                                                                                    style={mobileM.toGoogleMapSvg}
                                                                                    onClick={() => {
                                                                                        mapGoogleControll.openNavigation(data?.toAddr)
                                                                                    }}
                                                                                />

                                                                                {
                                                                                    props.Open
                                                                                        ?
                                                                                        <>
                                                                                            {/* ?????? */}
                                                                                            <Up
                                                                                                style={mobileM.upSvg}
                                                                                                onClick={() => {
                                                                                                    props.setOpen(false)
                                                                                                }}
                                                                                            />
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            {/* ?????? */}
                                                                                            <Down
                                                                                                style={mobileM.downSvg}
                                                                                                onClick={() => {
                                                                                                    props.setOpen(true)
                                                                                                }}
                                                                                            />
                                                                                        </>
                                                                                }

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

                                                                                {drawLine()}

                                                                            </BasicContainer>

                                                                        </>
                                                                    }

                                                                </>
                                                                :
                                                                <>
                                                                    {/* ????????? ?????? */}
                                                                    <BasicContainer
                                                                        height={Height}
                                                                        theme={mobileM.payDetailContainer}
                                                                    >
                                                                        {/* ????????? ???????????? */}
                                                                        <Text
                                                                            view={props.PayDetail[1]}
                                                                            theme={mobileM.payDetailFamilyWithTitle}
                                                                        >
                                                                            {props.PayDetail[1] ? `???????????????${globalContextService.get("PerDespatchPage", "payDetailFamilyWith")}` : `????????????`}
                                                                        </Text>

                                                                        {/* ????????? ???????????? */}
                                                                        < NumberInput
                                                                            topLabel={""}
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            type="number"
                                                                            placeholder={""}
                                                                            min={0}
                                                                            max={7}
                                                                            view={props.PayDetail[1]}
                                                                            value={globalContextService.get("PerDespatchPage", "payDetailFamilyWith") ?? data.familyWith}
                                                                            onChange={(e, value, onInitial) => {
                                                                                // console.log(value)
                                                                                // console.log(globalContextService.get("PerDespatchPage", "payDetailFamilyWith"))
                                                                                if (!isEqual(value, globalContextService.get("PerDespatchPage", "payDetailFamilyWith")) && isNumber(value)) {
                                                                                    if (!onInitial) {
                                                                                        props.GetRealAmtExecute({
                                                                                            despatchNo: data.despatchNo,
                                                                                            orderId: data.orderId,
                                                                                            familyWith: value > 7 ? 7 : value,
                                                                                        })
                                                                                    }
                                                                                    // console.log(onInitial)
                                                                                    globalContextService.set("PerDespatchPage", "payDetailFamilyWith", value > 7 ? 7 : value);
                                                                                }

                                                                            }}
                                                                            theme={mobileM.payDetailFamilyWith}
                                                                        />

                                                                        <Container>

                                                                            {/* ????????? ???????????? ?????? */}
                                                                            <Text
                                                                                theme={mobileM.etFareContainer}
                                                                            >
                                                                                {`$`}

                                                                                {/* ????????? ???????????? ?????? */}
                                                                                <Text
                                                                                    theme={mobileM.etFareText}
                                                                                >
                                                                                    {props?.RealAmt ?? 0}
                                                                                </Text>

                                                                                {/* ????????? ???????????? ?????? */}
                                                                                <Text
                                                                                    theme={mobileM.etFareTitle}
                                                                                >
                                                                                    {`????????????`}
                                                                                </Text>
                                                                            </Text>

                                                                            {/* ????????? ???????????? ?????? */}
                                                                            <Text
                                                                                view={props.PayDetail[1]}
                                                                                theme={mobileM.realFareContainer}
                                                                            >
                                                                                {
                                                                                    !props.PayDetail[1]
                                                                                        ?
                                                                                        <>
                                                                                            {/* ????????? ???????????? */}
                                                                                            <TextInput
                                                                                                topLabel={""}
                                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                                type="text"
                                                                                                placeholder={""}
                                                                                                value={globalContextService.get("PerDespatchPage", "realFareText") ?? props?.RealAmt}
                                                                                                onChange={(e, value, onInitial) => {
                                                                                                    if (isEmpty(value.toString())) {
                                                                                                        globalContextService.set("PerDespatchPage", "realFareText", 0);
                                                                                                    }
                                                                                                    else if (value / 10000 < 1 && !isNaN(value)) {
                                                                                                        globalContextService.set("PerDespatchPage", "realFareText", parseInt(value));
                                                                                                    }
                                                                                                    else {
                                                                                                        setForceUpdate(f => !f)
                                                                                                    }

                                                                                                }}
                                                                                                theme={mobileM.realFareText}
                                                                                            />
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            {`$`}
                                                                                            {/* ????????? ???????????? ?????? ?????? */}
                                                                                            <Text
                                                                                                theme={mobileM.realFareViewText}
                                                                                            >
                                                                                                {globalContextService.get("PerDespatchPage", "realFareText") ?? props.RealAmt}
                                                                                            </Text>
                                                                                        </>
                                                                                }

                                                                                {/* ????????? ???????????? ?????? */}
                                                                                <Text
                                                                                    theme={mobileM.realFareTitle}
                                                                                >
                                                                                    {`????????????`}
                                                                                </Text>

                                                                            </Text>
                                                                        </Container>

                                                                        {
                                                                            !props.PayDetail[1]
                                                                                ?
                                                                                <>
                                                                                    {/* ????????? ?????? */}
                                                                                    <Text
                                                                                        theme={mobileM.noteTitle}
                                                                                    >
                                                                                        {`??????`}

                                                                                        {/* ????????? ?????? */}
                                                                                        <TextInput
                                                                                            topLabel={""}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("PerDespatchPage", "NoteText") ?? null}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("PerDespatchPage", "NoteText", value);
                                                                                            }}
                                                                                            theme={mobileM.noteText}
                                                                                        />

                                                                                    </Text>

                                                                                    {/* ????????? ?????????????????? ?????? */}
                                                                                    <Text
                                                                                        theme={mobileM.payDetailWaysTitle}
                                                                                    >
                                                                                        {`??????????????????`}
                                                                                    </Text>

                                                                                    {
                                                                                        Object.keys(payWayshMapping).map((key) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <NativeLineButton
                                                                                                        isSelect={props?.PayWay === key}
                                                                                                        theme={mobileM.payDetailWaysButton}
                                                                                                        onClick={() => {
                                                                                                            props.setPayWay(key)
                                                                                                            // setForceUpdate(f => !f)
                                                                                                        }}
                                                                                                    >
                                                                                                        {payWayshMapping[key]}
                                                                                                    </NativeLineButton>
                                                                                                </>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    {/* ????????? ???????????????????????? ?????? */}
                                                                                    <SubContainer
                                                                                        theme={mobileM.editPayWayButtonContainer}
                                                                                    >
                                                                                        {/* ????????? ????????????????????????????????? ?????? */}
                                                                                        <NativeLineButton
                                                                                            theme={mobileM.editPayWayButton}
                                                                                            onClick={() => {
                                                                                                props.setPayDetail([true, false])
                                                                                            }}
                                                                                        >
                                                                                            {`?????????????????????????????????`}
                                                                                        </NativeLineButton>
                                                                                    </SubContainer>

                                                                                    {/* ????????? ???????????? ?????? */}
                                                                                    <Text
                                                                                        theme={mobileM.payDetailWaysViewText}
                                                                                    >
                                                                                        {`???????????????${payWayshMapping[props.PayWay]}`}
                                                                                    </Text>
                                                                                </>
                                                                        }

                                                                        {/* ???????????? */}
                                                                        {
                                                                            (props.PayDetail[0] && !props.PayDetail[1])
                                                                            &&
                                                                            <>
                                                                                {/* ???????????? ?????? */}
                                                                                <SubContainer
                                                                                    theme={mobileM.payComfirmButtonContainer}
                                                                                >
                                                                                    {/* ???????????? */}
                                                                                    <NativeLineButton
                                                                                        theme={mobileM.comfirmButton}
                                                                                        onClick={() => {
                                                                                            // console.log(props.PayWay)
                                                                                            if (isEmpty(props.PayWay)) {
                                                                                                modalsService.infoModal.error({
                                                                                                    id: "top1", //?????? ?????????????????????id
                                                                                                    iconRightText: "?????????????????????",
                                                                                                    yes: true,
                                                                                                    yesText: "??????",
                                                                                                    // no: true,
                                                                                                    // autoClose: true,
                                                                                                    backgroundClose: false,
                                                                                                    yesOnClick: (e, close) => {
                                                                                                        close();
                                                                                                    }
                                                                                                })
                                                                                            } else {
                                                                                                props.setPayDetail([true, true])
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        {`??????`}
                                                                                    </NativeLineButton>
                                                                                </SubContainer>
                                                                            </>
                                                                        }

                                                                    </BasicContainer>
                                                                </>
                                                        }

                                                        {/* silder ?????? */}
                                                        {
                                                            (
                                                                silderDisplay.includes(data.status)
                                                                ||
                                                                props.PayDetail[1]
                                                                ||
                                                                !isEmpty(data?.orderPay?.signPic)
                                                            )
                                                            &&
                                                            <>
                                                                {/* silder */}
                                                                <BasicContainer
                                                                    theme={mobileM.silderContainer}
                                                                >
                                                                    <Silder
                                                                        text={nextStatus(data.status, !isEmpty(data?.orderPay?.signPic))}
                                                                        onToRight={(resetValue) => {

                                                                            if (data.status === 2) {
                                                                                props.setCheckDetail(true)
                                                                            }
                                                                            else if (data.status === 3) {
                                                                                props.ChangeStatussExecute({
                                                                                    orderId: data.orderId,
                                                                                    status: 4,
                                                                                })
                                                                            }
                                                                            else if (data.status === 4 && isEmpty(data?.orderPay?.signPic)) {
                                                                                props.AddPayExecute({
                                                                                    despatchNo: data.despatchNo,
                                                                                    orderId: data.orderId,
                                                                                    familyWith: globalContextService.get("PerDespatchPage", "payDetailFamilyWith"),
                                                                                    // realMaidWith: props.RealAmt.realMaidWith,
                                                                                    // realWithAmt: props.RealAmt.realWithAmt,
                                                                                    // realDiscountPercent: props.RealAmt.realDiscountPercent,
                                                                                    // realDiscountAmt: props.RealAmt.realDiscountAmt,
                                                                                    // totalDiscountAmt: props.RealAmt.totalDiscountAmt,
                                                                                    // realSelfPay: props.RealAmt.realSelfPay,
                                                                                    receivePay: globalContextService.get("PerDespatchPage", "realFareText"),
                                                                                    payType: props.PayWay,
                                                                                    remark: globalContextService.get("PerDespatchPage", "NoteText") ?? ""
                                                                                })
                                                                                props.setDriverSign(true)
                                                                                props.setPayDetail([false, false])
                                                                            }
                                                                            else if (data.status === 4 && !isEmpty(data?.orderPay?.signPic)) {
                                                                                props.ChangeStatussExecute({
                                                                                    orderId: data.orderId,
                                                                                    status: 5,
                                                                                })
                                                                            }

                                                                            resetValue(0)
                                                                            setDefaultPrimary(data.orderId)
                                                                            props.setOpen(false)
                                                                        }}
                                                                    />

                                                                </BasicContainer>

                                                            </>
                                                        }

                                                    </SubContainer>
                                                </>
                                            )
                                        }}
                                    />
                                )
                            })}

                        </BasicContainer>
                }

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
