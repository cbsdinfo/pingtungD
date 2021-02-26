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
import isInteger from 'lodash/isInteger';
import isString from 'lodash/isString';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { perDespatch: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();
    const [DefaultPrimary, setDefaultPrimary] = useState(props?.defaultPrimary);

    const nextStatus = useCallback((status, haveSign = false) => {
        switch (toString(status)) {
            case "2":
                return "抵達上車地點"
            case "3":
                return "客上"
            case "4":
                return haveSign ? "結束行程" : "確認收款"
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
                    } else if (props.PayDetail[0]) {
                        props.setPayDetail([false, false])
                        props.controllGCS("return")
                        props.setRealAmt(null)
                        props.setPayWay("")
                    } else {
                        history.goBack();
                    }
                }}
            />


            <MainPageContainer
                height={Height}
                theme={mobileM.mainPageContainer}
                outSideTopComponent={
                    <>
                    </>
                }
            >
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
                                nameType // timeNameType、nameType 顯示名字、或顯示時間與名字
                                // timeNameType // timeNameType、nameType 顯示名字、或顯示時間與名字
                                // needAction // 是否需要點即後，文字變成執行中
                                nameKeyName={"name"} // nameKeyName 對應資料 名字 的 key 名
                                TimeKeyName={"reserveDate"} // TimeKeyName 對應資料 時間 的 key 名
                                // callBackKeyName 有需要回調 則在資料中補上回調，並指定 key名
                                primaryKey={"orderId"}// primaryKey 對應資料 唯一鍵 的 key 名
                                defaultUsePrimaryKey={DefaultPrimary} // 初始要使用的分頁 (值要對應到 primaryKey)
                                onTabClick={() => {
                                    props.setPayDetail([false, false]);
                                    props.setRealAmt([]);
                                    props.controllGCS("changeTab");
                                }}
                                topContent={(data) => {
                                    // console.log(data)
                                    return (
                                        <>
                                            {/* 收款頁 檢核 */}
                                            {
                                                !props.PayDetail[0]
                                                    ?
                                                    <>
                                                        {/* 預估陪同 */}
                                                        <Text
                                                            theme={mobileM.familyWidhText}
                                                        >
                                                            <Family style={mobileM.withSvg} />

                                                            {`預估陪同`}

                                                            {/* 預估陪同 資料 */}
                                                            <Text
                                                                theme={mobileM.familyWidhData}
                                                            >
                                                                {`${data.familyWith}`}
                                                            </Text>
                                                        </Text>
                                                    </>
                                                    :
                                                    <>
                                                        {/* 收款按鈕 輪椅 */}
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
                                    // console.log(data.status, data)

                                    const drawLine = () => {
                                        if (data?.polyLine && mapGoogleControll.getBasicMap("test1")) {
                                            mapGoogleControll.addPolylineRoute("test1", data?.polyLine)
                                        }

                                    }

                                    return (
                                        <>
                                            {/* 卡片下層 容器 */}
                                            <SubContainer
                                                height={Height}
                                                theme={mobileM.bottomContainer}
                                            >
                                                {/* 收款頁 檢核 */}
                                                {
                                                    !props.PayDetail[0]
                                                        ?
                                                        <>
                                                            <Container>

                                                                {/* 搭車時間 容器 */}
                                                                <SubContainer
                                                                    status={data.status}
                                                                    theme={mobileM.timeDataContainer}
                                                                >
                                                                    {/* 搭車時間 */}
                                                                    <Text
                                                                        status={data.status}
                                                                        theme={mobileM.timeText}
                                                                    >
                                                                        <Clock style={mobileM.clockSvg} />
                                                                        {`${data.reserveDate}`.split(' ')[1].substring(0, 5)}
                                                                    </Text>

                                                                    {/* 輪椅 */}
                                                                    <Text
                                                                        status={data.status}
                                                                        theme={mobileM.wheelchairTypeText}
                                                                    >
                                                                        <Wheelchair style={mobileM.wheelchairSvg} />
                                                                        {`${data.wheelchairType}`}
                                                                    </Text>

                                                                </SubContainer>

                                                                {/* 空趟按鈕 檢核 */}
                                                                {
                                                                    nullButtonDisplay.includes(data.status)
                                                                    &&
                                                                    <>
                                                                        {/* 空趟按鈕 容器 */}
                                                                        <SubContainer
                                                                            theme={mobileM.nullButtonContainer}
                                                                        >
                                                                            {/* 空趟按鈕 */}
                                                                            <NativeLineButton
                                                                                theme={mobileM.nullButton}
                                                                                onClick={() => {
                                                                                    modalsService.infoModal.warn({
                                                                                        id: "top1", //注意 這裡要加上固定id
                                                                                        iconRightText:
                                                                                            <>
                                                                                                {`確定`}
                                                                                                <Text
                                                                                                    theme={mobileM.nullButtonText}
                                                                                                >
                                                                                                    <Warning style={mobileM.warningSvg2} />
                                                                                                    {`空趟`}
                                                                                                </Text>
                                                                                            </>,
                                                                                        yes: true,
                                                                                        yesText: "確認",
                                                                                        no: true,
                                                                                        noText: "取消",
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

                                                                                {`空趟`}
                                                                            </NativeLineButton>

                                                                        </SubContainer>
                                                                    </>
                                                                }

                                                                {/* 收款按鈕 檢核 */}
                                                                {
                                                                    [4].includes(data.status)
                                                                    &&
                                                                    <>
                                                                        {/* 收款按鈕 容器 */}
                                                                        <SubContainer
                                                                            status={data.status}
                                                                            theme={mobileM.payButtonContainer}
                                                                        >
                                                                            {/* 檢核有無簽名檔 */}
                                                                            {
                                                                                isEmpty(data?.orderPay?.signPic)
                                                                                &&
                                                                                <>
                                                                                    {/* 收款按鈕 */}
                                                                                    < NativeLineButton
                                                                                        theme={mobileM.payButton}
                                                                                        onClick={() => {
                                                                                            //#region 判斷有無付款
                                                                                            if (isNil(data?.orderPay)) {
                                                                                                props.GetRealAmtExecute({
                                                                                                    despatchNo: data.despatchNo,
                                                                                                    orderId: data.orderId,
                                                                                                    familyWith: data.familyWith,
                                                                                                })
                                                                                                props.setPayDetail([true, false])
                                                                                            }
                                                                                            //#region 有付款則顯示簽名
                                                                                            else {
                                                                                                props.setDriverSign(true)
                                                                                            }
                                                                                            //#endregion
                                                                                            //#endregion
                                                                                        }}
                                                                                    >
                                                                                        {`${isNil(data?.orderPay) ? "收款" : "簽名"}`}
                                                                                    </NativeLineButton>
                                                                                </>
                                                                            }


                                                                            {/* 收款按鈕 文字 */}
                                                                            <Text
                                                                                thme={mobileM.payCheckText}
                                                                            >
                                                                                {/* 檢核有無付款 */}
                                                                                {
                                                                                    isNil(data.orderPay)
                                                                                        ?
                                                                                        <GrayCheck style={mobileM.payCheckSvg} />
                                                                                        :
                                                                                        <GreenCheck style={mobileM.payCheckSvg} />
                                                                                }

                                                                                {`收款完成`}
                                                                            </Text>

                                                                            {/* 收款按鈕 文字 */}
                                                                            <Text
                                                                                thme={mobileM.payCheckText}
                                                                            >
                                                                                {/* 檢核有無簽名檔 */}
                                                                                {
                                                                                    isEmpty(data?.orderPay?.signPic)
                                                                                        ?
                                                                                        <GrayCheck style={mobileM.payCheckSvg} />
                                                                                        :
                                                                                        <GreenCheck style={mobileM.payCheckSvg} />
                                                                                }

                                                                                {`簽名完成`}
                                                                            </Text>

                                                                            {/* 檢核有無簽名檔 */}
                                                                            {
                                                                                isEmpty(data?.orderPay?.signPic)
                                                                                &&
                                                                                <>
                                                                                    {/* 收款按鈕 提示 */}
                                                                                    <Text
                                                                                        theme={mobileM.payCheckTip}
                                                                                    >
                                                                                        {`先收款不代表已完成訂單`}
                                                                                    </Text>
                                                                                </>
                                                                            }

                                                                        </SubContainer>

                                                                        {/* 收款按鈕 輪椅 容器 */}
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

                                                            {/* 預估容器 */}
                                                            <SubContainer
                                                                open={(props.Open && data.status === 2)}
                                                                theme={mobileM.estimateContainer}
                                                            >
                                                                {/* 預估里程 */}
                                                                <Text
                                                                    theme={mobileM.estimateMileageText}
                                                                >
                                                                    {/* 預估里程 標題 */}
                                                                    <Text
                                                                        theme={mobileM.estimateMileageTitle}
                                                                    >
                                                                        {`預估里程`}
                                                                    </Text>

                                                                    {`${Math.round(data.totalMileage / 1000 * 100) / 100}`}

                                                                    <Text
                                                                        theme={mobileM.minuteText}
                                                                    >
                                                                        {`公里`}
                                                                    </Text>
                                                                </Text>


                                                                {/* 預估時間 */}
                                                                <Text
                                                                    theme={mobileM.estimateTimeText}
                                                                >
                                                                    {/* 預估時間 標題 */}
                                                                    <Text
                                                                        theme={mobileM.estimateTimeTitle}
                                                                    >
                                                                        {`預估時間`}
                                                                    </Text>

                                                                    {`${data.expectedMinute}`}

                                                                    <Text
                                                                        theme={mobileM.minuteText}
                                                                    >
                                                                        {`分鐘`}
                                                                    </Text>
                                                                </Text>

                                                            </SubContainer>

                                                            {/* 起迄點 容器 */}
                                                            <SubContainer
                                                                open={(props.Open || data.status === 3)}
                                                                theme={mobileM.startToEndContainer}
                                                            >
                                                                {/* 上車地點 標題 */}
                                                                <Text
                                                                    status={data.status}
                                                                    open={props.Open}
                                                                    theme={mobileM.startTitle}
                                                                >
                                                                    {`上車地點`}
                                                                </Text>

                                                                {/* 上車地點 內文 */}
                                                                <Text
                                                                    status={data.status}
                                                                    open={props.Open}
                                                                    theme={mobileM.startText}
                                                                >
                                                                    {data.fromAddr}
                                                                </Text>

                                                                {/* 上車地點 備註 */}
                                                                <Text
                                                                    status={data.status}
                                                                    open={props.Open}
                                                                    theme={mobileM.startRemark}
                                                                >
                                                                    {`(${data.fromAddrRemark})`}
                                                                </Text>

                                                                {/* 下車地點 標題 */}
                                                                <Text
                                                                    status={data.status}
                                                                    open={props.Open}
                                                                    theme={mobileM.endTitle}
                                                                >
                                                                    {`下車地點`}
                                                                </Text>

                                                                {/* 下車地點 內文 */}
                                                                <Text
                                                                    status={data.status}
                                                                    open={props.Open}
                                                                    theme={mobileM.endText}
                                                                >
                                                                    {data.toAddr}
                                                                </Text>

                                                                {/* 下車地點 備註 */}
                                                                <Text
                                                                    status={data.status}
                                                                    open={props.Open}
                                                                    theme={mobileM.endRemark}
                                                                >
                                                                    {`(${data.toAddrRemark})`}
                                                                </Text>

                                                            </SubContainer>

                                                            {/* 地圖 檢核 */}
                                                            {mapDisplay.includes(data.status)
                                                                &&
                                                                <>
                                                                    {/* 地圖容器 */}
                                                                    <BasicContainer
                                                                        status={data.status}
                                                                        open={props.Open}
                                                                        height={Height}
                                                                        theme={mobileM.mapContainer}
                                                                    >
                                                                        {/* 導航 */}
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
                                                                                    {/* 收合 */}
                                                                                    <Up
                                                                                        style={mobileM.upSvg}
                                                                                        onClick={() => {
                                                                                            props.setOpen(false)
                                                                                        }}
                                                                                    />
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    {/* 展開 */}
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
                                                                                //   maxBounds: [[105, 15], [138.45858, 33.4]], // 台灣地圖區域
                                                                                center: { lat: 25.012930, lng: 121.474708 }, // 初始中心座標，格式為 [lng, lat]  // 25.012930, 121.474708
                                                                                zoom: 16, // 初始 ZOOM LEVEL; [0-20, 0 為最小 (遠), 20 ;最大 (近)]
                                                                                //   minZoom: 6, // 限制地圖可縮放之最小等級, 可省略, [0-19.99]
                                                                                //   maxZoom: 19.99, // 限制地圖可縮放之最大等級, 可省略 [0-19.99]
                                                                                //   pitch: 0, // 攝影機仰角, 可省略, [0-60] // default 50
                                                                                //   bearing: 0, // 地圖角度, 可省略, [-180 ~ 180; 0 為正北朝上, 180 為正南朝上]
                                                                                //   attributionControl: false,
                                                                            }}

                                                                            theme={mobileM.map}
                                                                        />

                                                                        {drawLine()}

                                                                    </BasicContainer>

                                                                </>
                                                            }

                                                            {/* 檢核身分 */}
                                                            {
                                                                props.CheckDetail
                                                                &&
                                                                <>
                                                                    {/* 檢核身分 容器 */}
                                                                    <BasicContainer
                                                                        theme={mobileM.checkIdContainer}
                                                                    >
                                                                        {/* 提醒 */}
                                                                        <Text
                                                                            theme={mobileM.checkTip}
                                                                        >
                                                                            {`小提醒!核對身份`}
                                                                        </Text>

                                                                        {/* 檢核資料 容器 */}
                                                                        <BasicContainer
                                                                            height={Height}
                                                                            theme={mobileM.checkDetailContainer}
                                                                        >
                                                                            <Cross
                                                                                onClick={() => {
                                                                                    props.setCheckDetail(false)
                                                                                }}
                                                                            />

                                                                            {/* 個案名稱 容器 */}
                                                                            <SubContainer
                                                                                theme={mobileM.checkCaseNameContainer}
                                                                            >
                                                                                {/* 個案名稱 */}
                                                                                <Text
                                                                                    theme={mobileM.checkCaseName}
                                                                                >
                                                                                    {data.name}
                                                                                </Text>
                                                                            </SubContainer>

                                                                            {/* 核對身分 下車地點 容器 */}
                                                                            <Container
                                                                                theme={mobileM.checkEndContainer}
                                                                            >
                                                                                {/* 下車地點 標題 */}
                                                                                <Text
                                                                                    theme={mobileM.checkEndTitle}
                                                                                >
                                                                                    {`下車地點`}
                                                                                </Text>

                                                                                {/* 下車地點 內文 */}
                                                                                <Text
                                                                                    theme={mobileM.checkEndText}
                                                                                >
                                                                                    {data.toAddr}

                                                                                    {/* 下車地點 備註 */}
                                                                                    <Text
                                                                                        theme={mobileM.checkEndRemark}
                                                                                    >
                                                                                        {`(${data.toAddrRemark})`}
                                                                                    </Text>
                                                                                </Text>
                                                                            </Container>

                                                                            {/* 提醒紅字 */}
                                                                            <Text
                                                                                theme={mobileM.redTip}
                                                                            >
                                                                                {`請與個案核對身分及目的地，若有問題請聯繫行控中心。`}
                                                                            </Text>

                                                                        </BasicContainer>
                                                                    </BasicContainer>
                                                                </>
                                                            }
                                                        </>
                                                        :
                                                        <>

                                                            {/* 收款頁 容器 */}
                                                            <BasicContainer
                                                                height={Height}
                                                                theme={mobileM.payDetailContainer}
                                                            >
                                                                {/* 收款頁 陪同人數 */}
                                                                <Text
                                                                    view={props.PayDetail[1]}
                                                                    theme={mobileM.payDetailFamilyWithTitle}
                                                                >
                                                                    {props.PayDetail[1] ? `陪同人數：${globalContextService.get("PerDespatchPage", "payDetailFamilyWith")}` : `陪同人數`}
                                                                </Text>

                                                                {/* 收款頁 陪同人數 */}
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

                                                                    {/* 收款頁 應收車資 容器 */}
                                                                    <Text
                                                                        theme={mobileM.etFareContainer}
                                                                    >
                                                                        {`$`}

                                                                        {/* 收款頁 應收車資 內文 */}
                                                                        <Text
                                                                            theme={mobileM.etFareText}
                                                                        >
                                                                            {props?.RealAmt ?? 0}
                                                                        </Text>

                                                                        {/* 收款頁 應收車資 標題 */}
                                                                        <Text
                                                                            theme={mobileM.etFareTitle}
                                                                        >
                                                                            {`應收車資`}
                                                                        </Text>
                                                                    </Text>

                                                                    {/* 收款頁 實收金額 容器 */}
                                                                    <Text
                                                                        view={props.PayDetail[1]}
                                                                        theme={mobileM.realFareContainer}
                                                                    >
                                                                        {
                                                                            !props.PayDetail[1]
                                                                                ?
                                                                                <>
                                                                                    {/* 收款頁 實收金額 */}
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
                                                                                    {/* 收款頁 實收金額 檢視 內文 */}
                                                                                    <Text
                                                                                        theme={mobileM.realFareViewText}
                                                                                    >
                                                                                        {globalContextService.get("PerDespatchPage", "realFareText") ?? props.RealAmt}
                                                                                    </Text>
                                                                                </>
                                                                        }

                                                                        {/* 收款頁 實收金額 標題 */}
                                                                        <Text
                                                                            theme={mobileM.realFareTitle}
                                                                        >
                                                                            {`實收金額`}
                                                                        </Text>

                                                                    </Text>
                                                                </Container>

                                                                {
                                                                    !props.PayDetail[1]
                                                                        ?
                                                                        <>
                                                                            {/* 收款頁 備註 */}
                                                                            <Text
                                                                                theme={mobileM.noteTitle}
                                                                            >
                                                                                {`備註`}

                                                                                {/* 收款頁 備註 */}
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

                                                                            {/* 收款頁 客戶付款方式 標題 */}
                                                                            <Text
                                                                                theme={mobileM.payDetailWaysTitle}
                                                                            >
                                                                                {`客戶付款方式`}
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
                                                                            {/* 收款頁 修改付款方式按鈕 容器 */}
                                                                            <SubContainer
                                                                                theme={mobileM.editPayWayButtonContainer}
                                                                            >
                                                                                {/* 收款頁 修改實收車資或付款方式 按鈕 */}
                                                                                <NativeLineButton
                                                                                    theme={mobileM.editPayWayButton}
                                                                                    onClick={() => {
                                                                                        props.setPayDetail([true, false])
                                                                                    }}
                                                                                >
                                                                                    {`修改實收車資或付款方式`}
                                                                                </NativeLineButton>
                                                                            </SubContainer>

                                                                            {/* 收款頁 付款方式 檢視 */}
                                                                            <Text
                                                                                theme={mobileM.payDetailWaysViewText}
                                                                            >
                                                                                {`付款方式：${payWayshMapping[props.PayWay]}`}
                                                                            </Text>
                                                                        </>
                                                                }



                                                            </BasicContainer>
                                                        </>
                                                }

                                                {/* silder 檢核 */}
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
                                                                            realFamilyWith: globalContextService.get("PerDespatchPage", "payDetailFamilyWith"),
                                                                            // realMaidWith: props.RealAmt.realMaidWith,
                                                                            // realWithAmt: props.RealAmt.realWithAmt,
                                                                            // realDiscountPercent: props.RealAmt.realDiscountPercent,
                                                                            // realDiscountAmt: props.RealAmt.realDiscountAmt,
                                                                            // totalDiscountAmt: props.RealAmt.totalDiscountAmt,
                                                                            // realSelfPay: props.RealAmt.realSelfPay,
                                                                            receivePay: globalContextService.get("PerDespatchPage", "realFareText"),
                                                                            payType: props.PayWay
                                                                        })
                                                                        props.setDriverSign(true)
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

                                                {/* 確認按鈕 */}
                                                {
                                                    (props.CheckDetail || (props.PayDetail[0] && !props.PayDetail[1]))
                                                    &&
                                                    <>
                                                        {/* 確認按鈕 容器 */}
                                                        <SubContainer
                                                            theme={mobileM.comfirmButtonContainer}
                                                        >
                                                            {/* 確認按鈕 */}
                                                            <NativeLineButton
                                                                theme={mobileM.comfirmButton}
                                                                onClick={() => {
                                                                    if (props.CheckDetail) {
                                                                        props.ChangeStatussExecute({
                                                                            orderId: data.orderId,
                                                                            status: 3
                                                                        })
                                                                        props.setCheckDetail(false)
                                                                    }
                                                                    else if (props.PayDetail[0]) {
                                                                        // console.log(props.PayWay)
                                                                        if (isEmpty(props.PayWay)) {
                                                                            modalsService.infoModal.error({
                                                                                id: "top1", //注意 這裡要加上固定id
                                                                                iconRightText: "請選擇付款方式",
                                                                                yes: true,
                                                                                yesText: "確認",
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
                                                                    }
                                                                }}
                                                            >
                                                                {`確認`}
                                                            </NativeLineButton>
                                                        </SubContainer>
                                                    </>
                                                }

                                                {/* 簽名 */}
                                                {
                                                    props.DriverSign
                                                    &&
                                                    <>
                                                        {/* 簽名 */}
                                                        <BasicContainer
                                                            height={Height}
                                                            theme={mobileM.signContainer}
                                                        >
                                                            <Sign
                                                                height={Height - 56 - 10}
                                                                primaryKey={data.orderId}
                                                                sendOnClick={(base64, isNoSign, clearSign) => {
                                                                    if (isNoSign) {
                                                                        modalsService.infoModal.error({
                                                                            id: "top1", //注意 這裡要加上固定id
                                                                            iconRightText: "請簽名!",
                                                                            yes: true,
                                                                            yesText: "確認",
                                                                            // no: true,
                                                                            // noText: "取消",
                                                                            // autoClose: true,
                                                                            backgroundClose: false,
                                                                            yesOnClick: (e, close) => {
                                                                                close();
                                                                            }
                                                                        })
                                                                    }
                                                                    else {
                                                                        props.UpdatePayExecute({
                                                                            id: data.orderId,
                                                                            signPic: base64
                                                                        })
                                                                        props.setDriverSign(false)
                                                                        props.setPayDetail([false, false])
                                                                        props.controllGCS("return");
                                                                    }
                                                                    // console.log(base64, isNoSign)
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



            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
