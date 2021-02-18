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

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { callCar: { component: { whiteCallCarComponent: { rwd: { laptopL } } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory()

    //#region 如果起迄點、搭車日期、搭車時間有值、搭車人數皆已有有值，則帶回 本日行程一覽 Table資料
    const getCaseOrderAmtAPI = useCallback(() => {
        let end = props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // 迄點緯度
        let start = props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // 起點緯度

        let validMsg = "";
        if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
        }
        else if (valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
            validMsg = valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
        }
        else if (valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
            validMsg = valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]
        }
        if (validMsg === "") {
            // 如果起迄點、搭車日期、搭車時間有值、搭車人數 皆已有有值
            props.GetCaseOrderAmtExecute({
                CaseUserId: props.CaseUserId,
                FromAddr: globalContextService.get("WhiteCallCarComponentPage", "StartPos"),
                // FromAddrId:, // 不用丟
                ToAddr: globalContextService.get("WhiteCallCarComponentPage", "EndPos"),
                FamilyWith: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value,
                // ToAddrId:, // 不用丟
                ReservationDate: globalContextService.get("WhiteCallCarComponentPage", "TravelDate") + " " + globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value, // 預約日期+預約時間	如: "2020-11-25 17:45"
            })
        }

    }, [])
    //#endregion

    //#region 新增下個地點、立即預約 送出前欄位檢核
    const formValid = useCallback(() => {
        //#region 表單驗證
        let validMsg = "";

        if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "BUnitSort")?.[0]?.id ?? "", ["^.{1,}$"], ["請選擇優先搭乘車行排序，或需先新增B單位"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "BUnitSort")?.[0]?.id ?? "", ["^.{1,}$"], ["請選擇優先搭乘車行排序，或需先新增B單位"])[1]
        }
        // 其實 應該要連實際經緯度標記坐標一起檢核，目前尚未防堵 選擇自動完成選項後，又改動輸入框地址內容，然後送出的情況  
        // PS.可以分成 目前輸入框內容 與 onSelect的值，onChange時清掉onSelect的值，然後送出時一律檢核onSelect的值
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]
        }
        // else if (map8Controll.getMarkerPoints("test1").length !== 2) {
        //     validMsg = "請重新輸入起訖地址"
        // }        
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["請輸入接收簡訊號碼", "請輸入正確手機格式"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["請輸入接收簡訊號碼", "請輸入正確手機格式"])[1]
        }
        //#endregion

        return validMsg;

    }, [])
    //#endregion

    return (
        <>
            {/* 叫車頁面外層容器 */}
            <Container
                theme={laptopL.callCarOutContainer}
            >

                {/* 叫車表單區域容器 */}
                <SubContainer
                    theme={laptopL.formContainer}
                >
                    {/* 叫車表單標題列 */}
                    <BasicContainer
                        theme={laptopL.callCarFormTitleContainer}
                    >

                        {/* 個案名字 */}
                        <Text
                            theme={laptopL.callCarFormCaseName}
                        >
                            {props?.CaseName}
                        </Text>
                        {/* 可用補助餘額查詢按鈕 */}
                        {/* <NativeLineButton
                            baseDefaultTheme={"DefaultTheme"}
                            disable={false}
                            type="button" // 防止提交
                            theme={laptopL.balanceInquiryButton}
                            onClick={() => {
                                //#region 打開可用補助餘額查詢 Modal
                                modalsService.titleModal.normal({
                                    //id: "top1",
                                    title: `${props.UserName?.split(" ")?.[0]} 的補助餘額`,
                                    yes: true,
                                    yesText: "確認",
                                    no: false,
                                    noText: "取消",
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
                                                theme={laptopL.balanceInquiryMTodalText}
                                            >
                                                總額度： ${`${props?.CaseDiscount?.totalAmt ?? 0}`}
                                            </Text>
                                            <Text
                                                theme={laptopL.balanceInquiryMTodalText}
                                            >
                                                使用額度：${`${props?.CaseDiscount?.discountAmt ?? 0}`}
                                            </Text>
                                            <Text
                                                theme={laptopL.balanceInquiryMTodalText}
                                            >
                                                剩餘額度：${`${props?.CaseDiscount?.lastDiscountAmt ?? 0}`}
                                            </Text>
                                        </BasicContainer>
                                    ),
                                    theme: laptopL.editModal
                                })
                                //#endregion

                            }}
                        >
                            <Search
                                style={laptopL.balanceInquiryButtonIcon}
                            />
                                可用補助餘額查詢
                            </NativeLineButton> */}
                    </BasicContainer>

                    {/* 叫車表單容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.callCarFormContainer}
                    >
                        <FormRow>
                            {/* 乘車日期 TravelDate */}
                            <DateTimePicker
                                topLabel={<>乘車日期</>}
                                // type={"time"} time、date、week、month、quarter、year
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
                                        getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、搭車人數皆已有有值，則帶回 本日行程一覽 Table資料
                                        globalContextService.remove("WhiteCallCarComponentPage", "TravelTime")
                                        globalContextService.remove("WhiteCallCarComponentPage", "ReturnTravelTime")
                                        setForceUpdate(f => !f)
                                    }
                                }}
                                disabledDate={(perMoment) => {
                                    // 去除掉今天以前的日期
                                    return perMoment && (perMoment < moment().startOf('day'));
                                }}
                                theme={laptopL.travelDate}
                            />

                            {/*  乘車日期檢核 */}
                            {
                                // !isNil(globalContextService.get("WhiteCallCarComponentPage", "TravelDate"))
                                // &&
                                <>
                                    {/* 乘車時間 TravelTime */}
                                    <NewSelector
                                        bascDefaultTheme={"DefaultTheme"}
                                        topLabel={"乘車時間"}
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
                                                getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、搭車人數皆已有有值，則帶回 本日行程一覽 Table資料
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
                                        theme={laptopL.travelTime}
                                    />
                                </>
                            }

                            {/* 優先搭乘車行排序 */}
                            {/* <BUnitSort
                                topLabel={<>優先搭乘車行排序 <Text theme={laptopL.bUnitSortNote}>(請依序點擊完成排序)</Text></>}
                                // bUnit={props?.CaseUsers?.bUnitForCaseUser}
                                bUnit={[
                                    { id: "0", name: "0XXXX車行" },
                                    { id: "1", name: "1XXXX車行" },
                                    { id: "2", name: "2XXXX車行" },
                                    { id: "3", name: "3XXXX車行" },
                                ]}
                                value={globalContextService.get("WhiteCallCarComponentPage", `BUnitSort`)}
                                onChange={(e, value, onInitial) => {
                                    console.log(value)
                                    globalContextService.set("WhiteCallCarComponentPage", `BUnitSort`, value);
                                }}
                                theme={laptopL.bUnitSort}
                            /> */}

                            {/* 行程標題列 */}
                            <BasicContainer
                                theme={laptopL.strokeFormTitleContainer}
                            >

                                {/* 行程 */}
                                <Text
                                    theme={laptopL.strokeText}
                                >
                                    行程
                                    <Minus
                                        style={laptopL.strokeMinusSvg}
                                    // onClick={(e) => {
                                    //     props.setTodayToDoOpen(t => !t)
                                    // }}
                                    />
                                </Text>

                            </BasicContainer>
                            {/* 行程內容容器 */}
                            <Container
                                theme={laptopL.strokeFormContainer}
                                open={props.TodayToDoOpen}
                            >

                                {/* 起點容器 */}
                                <Container
                                    theme={laptopL.startPosContainer}
                                >
                                    {/* 起點 */}
                                    <Text
                                        theme={laptopL.todayToDoStart}
                                    >
                                        <Start2 style={laptopL.todayToDoStartSvg} />
                                        起點
                                    </Text>

                                    {/* 起點地址 */}
                                    <Text
                                        theme={laptopL.todayToDoStartAddr}
                                    >
                                        {/* {globalContextService.get("WhiteCallCarComponentPage", "StartPos")} */}
                                    </Text>

                                    {/* 起點 StartPos*/}
                                    <MapGoogleInput
                                        placeholder={"請輸入搭車地點(XX市XX區XX路XX號)"}
                                        placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // 接後端的API
                                        // viewType
                                        // disable
                                        topLabel={
                                            <>
                                                地址
                                        </>
                                        }
                                        baseDefaultTheme={"DefaultTheme"}
                                        value={globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? ""}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("WhiteCallCarComponentPage", "StartPos", value);
                                        }}
                                        onSelect={(e, option, onInitial, posInfo) => {
                                            if (props.mapGoogleControll.getPolylineRoutes("test1")?.[0]) {
                                                let endMarker = props.mapGoogleControll.getMarkers("test1")?.[1]?.position // 迄點經緯度
                                                props.mapGoogleControll.deletePolylineRoute("test1"); // 移除路線  
                                                props.mapGoogleControll.addMarkerWithIndex("test1", { lat: posInfo?.lat, lng: posInfo?.lon }, 0) // 更新選中起點
                                                props.mapGoogleControll.addMarkerWithIndex("test1", endMarker, 1) // 更新選中起點
                                            }

                                            props.mapGoogleControll.addMarkerWithIndex("test1", { lat: posInfo?.lat, lng: posInfo?.lon }, 0) // 更新選中起點
                                            props.mapGoogleControll.setCenter("test1", { lat: posInfo?.lat, lng: posInfo?.lon }); // 移動中心點

                                            globalContextService.set("WhiteCallCarComponentPage", "StartPos", option.label);

                                            getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、搭車人數皆已有有值，則帶回 本日行程一覽 Table資料

                                            setForceUpdate(f => !f)
                                        }}

                                        theme={laptopL.startPos}
                                    />
                                </Container>

                                {/* 迄點容器 */}
                                <Container
                                    theme={laptopL.endPosContainer}
                                >
                                    {/* 迄點 */}
                                    <Text
                                        theme={laptopL.todayToDoEnd}
                                    >
                                        <End2 style={laptopL.todayToDoEndSvg} />
                                        迄點
                                    </Text>

                                    {/* 迄點地址 */}
                                    <Text
                                        theme={laptopL.todayToDoEndAddr}
                                    >
                                        {/* {globalContextService.get("WhiteCallCarComponentPage", "EndPos")} */}
                                    </Text>

                                    {/* 預覽路線按鈕 */}
                                    <NativeLineButton theme={laptopL.seeRouteButton}
                                        onClick={() => {
                                            let end = props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // 迄點緯度
                                            let start = props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // 起點緯度

                                            let validMsg = "";
                                            if (valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
                                                validMsg = valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
                                            }
                                            else if (valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
                                                validMsg = valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
                                            }

                                            if (validMsg !== "") {
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
                                                // 如果起迄點都已經輸入

                                                //#region 由前端Call Google畫路線的方法
                                                // props.mapGoogleControll.addRoute("test1",
                                                //     {
                                                //         // origin: new window.google.maps.LatLng(25.012930,121.994708),
                                                //         origin: props.mapGoogleControll.getMarkers("test1")[0].position,
                                                //         destination: props.mapGoogleControll.getMarkers("test1")[1].position,// new window.google.maps.LatLng(25.012930,121.974708),
                                                //         waypoints: [
                                                //             // {
                                                //             //     location: { lat: 25.012930, lng: 121.984708 },// new window.google.maps.LatLng(25.012930,121.984708), // 或是地址
                                                //             //     stopover: true,
                                                //             // },
                                                //         ]
                                                //     }
                                                // )
                                                //#endregion

                                                //#region 透過後端回傳 加密路徑字串 (decodePath) 並透過 polyline 畫路線的方法

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
                                                                //     location: { lat: 25.012930, lng: 121.984708 },// new window.google.maps.LatLng(25.012930,121.984708), // 或是地址
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
                                        路線預覽
                                    </NativeLineButton>
                                    <NativeLineButton theme={laptopL.convertButton}
                                        onClick={() => {
                                            let end = props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // 迄點緯度
                                            let start = props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // 起點緯度

                                            let validMsg = "";
                                            if (valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
                                                validMsg = valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
                                            }
                                            else if (valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
                                                validMsg = valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
                                            }

                                            if (validMsg !== "") {
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
                                                // 如果起迄點都已經輸入
                                                let startAddr = globalContextService.get("WhiteCallCarComponentPage", "StartPos");
                                                let endAddr = globalContextService.get("WhiteCallCarComponentPage", "EndPos");

                                                globalContextService.set("WhiteCallCarComponentPage", "EndPos", startAddr);
                                                globalContextService.set("WhiteCallCarComponentPage", "StartPos", endAddr);

                                                let startMarker = props.mapGoogleControll.getMarkers("test1")?.[0]?.position  // 起點經緯度
                                                let endMarker = props.mapGoogleControll.getMarkers("test1")?.[1]?.position // 迄點經緯度

                                                // props.mapGoogleControll.deleteRoute("test1"); // 移除路線 由前端Call Google畫路線的方法
                                                props.mapGoogleControll.deletePolylineRoute("test1"); // 移除路線 透過後端回傳 加密路徑字串 (decodePath) 並透過 polyline 畫路線的方法      

                                                props.mapGoogleControll.addMarker("test1", endMarker); // 替換起迄點
                                                props.mapGoogleControll.addMarker("test1", startMarker); // 替換起迄點
                                            }
                                            setForceUpdate(f => !f)
                                        }}
                                    >
                                        <Vector style={laptopL.convertContainerIcon} />
                                                起訖點互換
                                    </NativeLineButton>

                                    {/* 迄點 EndPos*/}
                                    <MapGoogleInput
                                        placeholder={"請輸入下車地點(XX市XX區XX路XX號)"}
                                        placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // 接後端的API
                                        // viewType
                                        // disable
                                        topLabel={
                                            <>
                                                地址
                                            </>
                                        }
                                        baseDefaultTheme={"DefaultTheme"}
                                        value={globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? ""}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("WhiteCallCarComponentPage", "EndPos", value);
                                        }}
                                        onSelect={(e, option, onInitial, posInfo) => {
                                            if (props.mapGoogleControll.getPolylineRoutes("test1")?.[0]) {
                                                let startMarker = props.mapGoogleControll.getMarkers("test1")?.[0]?.position // 起點經緯度
                                                props.mapGoogleControll.deletePolylineRoute("test1"); // 移除路線  
                                                props.mapGoogleControll.addMarkerWithIndex("test1", startMarker, 0) // 更新選中起點
                                            }

                                            //#region 如果沒有先打起點
                                            if (!props.mapGoogleControll.getMarkers("test1")?.[0]) {
                                                props.mapGoogleControll.addMarkerWithIndex("test1", {}, 0) // 更新 一個卡位給 起點
                                            }
                                            //#endregion
                                            props.mapGoogleControll.addMarkerWithIndex("test1", { lat: posInfo?.lat, lng: posInfo?.lon }, 1) // 更新選中起點
                                            props.mapGoogleControll.setCenter("test1", { lat: posInfo?.lat, lng: posInfo?.lon }); // 移動中心點

                                            globalContextService.set("WhiteCallCarComponentPage", "EndPos", option.label);

                                            getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、搭車人數皆已有有值，則帶回 本日行程一覽 Table資料

                                            setForceUpdate(f => !f)
                                        }}

                                        theme={laptopL.endPos}
                                    />
                                </Container>

                                {/* 其他資訊容器 */}
                                <Container
                                    theme={laptopL.otherInfoContainer}
                                >

                                    {/* 願意共乘 RideTogetherReview */}
                                    {/* 選項 Equipment */}
                                    <Checkbox
                                        // viewType
                                        checked={globalContextService.get("WhiteCallCarComponentPage", "Equipment")}
                                        // disable
                                        topLabel={""}
                                        onChange={(e, value, onInitial) => {
                                            // console.log(value)
                                            globalContextService.set("WhiteCallCarComponentPage", "Equipment", value);
                                        }}
                                        theme={laptopL.rideTogetherReview}
                                    >
                                        {/* 願意共乘 RideTogetherReview  選項 */}
                                        <CheckboxItem value={"canShare"} >願意共乘</CheckboxItem>
                                    </Checkbox>

                                    {/* 車種 CarType */}
                                    <Text theme={laptopL.formSubTitleText}>車種</Text>
                                    <NewSelector
                                        bascDefaultTheme={"DefaultTheme"}
                                        topLabel={<>車種</>}
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
                                            // { value: '0', label: "請選擇車種類型", isDisabled: true },
                                            ...props?.AllCarType
                                        ]}
                                        // menuPosition={true}
                                        theme={laptopL.carType}
                                    />

                                    {/* 輪椅 Wheelchair */}
                                    <Text theme={laptopL.formSubTitleText}>輪椅</Text>
                                    <NewSelector
                                        bascDefaultTheme={"DefaultTheme"}
                                        topLabel={<>輪椅</>}
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
                                            { value: '0', label: "請選擇車種類型", isDisabled: true },
                                            { value: '1', label: "無" },
                                            { value: '2', label: "普通輪椅(可收折)" },
                                            // ...props?.AllCarType
                                        ]}
                                        // menuPosition={true}
                                        theme={laptopL.wheelchair}
                                    />

                                    {/* 簡訊號碼 容器 SmsNumberContainer */}
                                    <Container
                                        theme={laptopL.smsNumberContainer}
                                    >
                                        {/* 簡訊號碼 SmsNumber */}
                                        <Text theme={laptopL.formSubTitleText}>接收簡訊號碼</Text>
                                        <TextInput
                                            topLabel={<>簡訊號碼</>}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="text"
                                            placeholder={"請輸入手機號碼"}
                                            value={globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? null}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("WhiteCallCarComponentPage", "SmsNumber", value);
                                            }}
                                            theme={laptopL.smsNumber}
                                        />
                                    </Container>

                                    <Container
                                        style={{ width: "auto" }}
                                    >
                                        {/* 我要預約回程(回居住地址) */}
                                        <Checkbox
                                            // viewType
                                            // disable
                                            // topLabel={"我要預約回程(回居住地址)"}
                                            checked={globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview") ?? [0]}
                                            onChange={(e, value, onInitial) => {
                                                if (value?.[0] === 1) {
                                                    if (value !== globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview")) {
                                                        setForceUpdate(f => !f); // 剛選擇 預約回程 是 時，重新渲染
                                                    }
                                                }
                                                else if (globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview")?.[0] === 1) {
                                                    setForceUpdate(f => !f); // 剛選擇 預約回程 是，重新渲染
                                                }
                                                else {
                                                    //選擇 否時清空回程相關資料避免誤送
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
                                            theme={laptopL.scheduleReturnReview}
                                        >
                                            {/* 我要預約回程(回居住地址) ScheduleReturnReview  選項 */}
                                            <CheckboxItem value={1} >我要預約回程</CheckboxItem>
                                        </Checkbox>

                                        {
                                            globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview")?.[0] === 1
                                                ?
                                                <>
                                                    {/* 回程乘車時間 ReturnTravelTime */}
                                                    <Text theme={laptopL.formSubTitleText}>回程乘車時間</Text>
                                                    <NewSelector
                                                        bascDefaultTheme={"DefaultTheme"}
                                                        topLabel={""}
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
                                                                setForceUpdate(f => !f); // 剛選擇 預約回程 是 時，重新渲染
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
                                                        theme={laptopL.returnTravelTime}
                                                    />
                                                </>
                                                :
                                                // 維持排版佔位
                                                <SubContainer style={{ width: "308px" }} />
                                        }
                                    </Container>
                                </Container>
                                {/* 維持排版佔位 */}
                                {/* <SubContainer theme={laptopL.companyEnableOccupy} /> */}

                                {/* Table 容器 */}
                                <Container
                                    bascDefaultTheme={"DefaultTheme"}
                                    open={props.TodayToDoOpen}
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
                                                globalContextService.set("WhiteCallCarComponentPage", "CheckedRowKeys", checkedRowKeys);
                                                globalContextService.set("WhiteCallCarComponentPage", "CheckedRowsData", checkedRows);
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
                                                    title: '行程',
                                                    width: "60px",
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
                                                    title: '預估距離',
                                                    width: "100px",
                                                    dataIndex: 'distance',
                                                    // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `${(rowData / 1000)?.toFixed(2)}公里` : ""
                                                    }
                                                },
                                                {
                                                    title: '預估時間',
                                                    width: "100px",
                                                    dataIndex: 'duration',
                                                    // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `${(rowData / 60)?.toFixed(0)}分鐘` : ""
                                                    }
                                                },
                                                {
                                                    title: '車資總額',
                                                    width: "100px",
                                                    dataIndex: 'totalAmt',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `$${rowData}` : ""
                                                    }
                                                },
                                                {
                                                    title: '政府補助',
                                                    width: "100px",
                                                    dataIndex: 'subsidyAmt',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `$${rowData}` : ""
                                                    }
                                                },
                                                {
                                                    title: '自負額',
                                                    width: "100px",
                                                    dataIndex: 'selfPayAmt',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `$${rowData}` : ""
                                                    }
                                                },
                                                {
                                                    title: '陪同總額',
                                                    width: "100px",
                                                    dataIndex: 'withAmt',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `$${rowData}` : ""
                                                    }
                                                },
                                                {
                                                    title: '個案負擔',
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
                                        //     { id: "1", type: "去程" },
                                        //     { id: "2", type: "回程" },
                                        // ]}
                                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                                        data={props.WhiteOrderAmt}
                                        clickPage={(currentPage, pageSize) => {
                                        }}
                                    />
                                </Container>


                                {/* 去程搭車人數容器外容器 */}
                                <Container
                                    theme={laptopL.takerCountsContainer}
                                >
                                    {/* 搭車人數 AccompanyCounts */}
                                    <Text theme={laptopL.formSubTitleText}>去程搭車人數</Text>
                                    <NewSelector
                                        bascDefaultTheme={"DefaultTheme"}
                                        topLabel={<>搭車人數</>}
                                        bottomLabel={""}
                                        //viewType
                                        isSearchable
                                        placeholder={""}
                                        // isMulti
                                        // hideSelectedOptions={false}
                                        value={globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts") ?? null}
                                        onChange={(e, value, onInitial) => {
                                            if (!isEqual(value, globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts"))) {
                                                // 清空重新選擇前的值
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
                                            // { value: 'hint', label: "請選擇搭乘人數", isDisabled: true },
                                            { value: 1, label: "1人" },
                                            { value: 2, label: "2人" },
                                            { value: 3, label: "3人" },
                                            { value: 4, label: "4人" },
                                            { value: 5, label: "5人" },
                                            { value: 6, label: "6人" },
                                            { value: 7, label: "7人" },
                                            { value: 8, label: "8人" },
                                            // ...Counties
                                        ]}
                                        // menuPosition={true}
                                        theme={laptopL.accompanyCounts}
                                    />

                                    {/* 代入回程按鈕 */}
                                    <SubContainer theme={laptopL.importButtonContainer}>
                                        <NativeLineButton
                                            onClick={() => {
                                                if (!isNil(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts"))) {
                                                    let orgNum = globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value;
                                                    //先清空原值
                                                    Array(orgNum).fill(0).forEach((it, ind) => {
                                                        globalContextService.remove("WhiteCallCarComponentPage", `TakerName_${ind + 1}`)
                                                        globalContextService.remove("WhiteCallCarComponentPage", `TakerBirthday_${ind + 1}`)
                                                        globalContextService.remove("WhiteCallCarComponentPage", `TakerPhone_${ind + 1}`)
                                                    });

                                                    let preNum = globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value;
                                                    //放入新的值
                                                    Array(preNum).fill(0).forEach((it, ind) => {
                                                        globalContextService.set("WhiteCallCarComponentPage", `TakerName_${ind + 1}`, globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerName_${ind + 1}`));
                                                        globalContextService.set("WhiteCallCarComponentPage", `TakerBirthday_${ind + 1}`, globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerBirthday_${ind + 1}`));
                                                        globalContextService.set("WhiteCallCarComponentPage", `TakerPhone_${ind + 1}`, globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerPhone_${ind + 1}`));
                                                    });
                                                    globalContextService.set("WhiteCallCarComponentPage", "AccompanyCounts", { value: globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts").value, label: globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts").label });
                                                    setForceUpdate(f => !f);
                                                }
                                            }}
                                            theme={laptopL.importButton}
                                        >
                                            代入回程資料
                                    </NativeLineButton>

                                    </SubContainer>
                                </Container>
                                {/* 搭乘者資訊外容器 */}
                                <Container
                                    theme={laptopL.takerInfoOutContainer}
                                >
                                    {!isNil(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts"))
                                        &&
                                        (Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0).map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    {/* 搭乘者資訊容器 */}
                                                    <Container
                                                        theme={laptopL.takerInfoContainer}
                                                    >
                                                        {/* 搭車姓名 TakerName */}
                                                        <TextInput
                                                            topLabel={`姓名${index + 1}`}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={``}
                                                            value={globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`) ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("WhiteCallCarComponentPage", `TakerName_${index + 1}`, value);
                                                            }}
                                                            theme={laptopL.takerName}
                                                        />

                                                        {/* 搭車生日 TakerBirthday */}
                                                        <DateTimePicker
                                                            topLabel={`生日${index + 1}`}
                                                            // type={"time"} time、date、week、month、quarter、year
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
                                                                // 去除掉今天以後的日期
                                                                return perMoment && (perMoment > moment().endOf('day'));
                                                            }}
                                                            theme={laptopL.takerBirthday}
                                                        />

                                                        {/* 搭車電話 TakerPhone */}
                                                        <TextInput
                                                            topLabel={
                                                                <Text
                                                                    style={{ fontSize: "14px", fontWeight: 300 }}
                                                                >
                                                                    <Delete
                                                                        style={laptopL.deleteSvg}
                                                                        onClick={() => {
                                                                            let preNum = globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value;
                                                                            for (let i = index + 1; i < preNum; i++) {
                                                                                // 將後面資料向前放
                                                                                if (i >= index + 1) {
                                                                                    globalContextService.set("WhiteCallCarComponentPage", `TakerName_${i}`, globalContextService.get("WhiteCallCarComponentPage", `TakerName_${i + 1}`));
                                                                                    globalContextService.set("WhiteCallCarComponentPage", `TakerBirthday_${i}`, globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${i + 1}`));
                                                                                    globalContextService.set("WhiteCallCarComponentPage", `TakerPhone_${i}`, globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${i + 1}`));
                                                                                } else {
                                                                                    continue
                                                                                }
                                                                            }
                                                                            // 移除最後一筆資料
                                                                            globalContextService.remove("WhiteCallCarComponentPage", `TakerName_${preNum}`);
                                                                            globalContextService.remove("WhiteCallCarComponentPage", `TakerBirthday_${preNum}`);
                                                                            globalContextService.remove("WhiteCallCarComponentPage", `TakerPhone_${preNum}`);
                                                                            // setDeleteRowIndex(index + 1);
                                                                            if (preNum === 1) {
                                                                                globalContextService.set("WhiteCallCarComponentPage", "AccompanyCounts", null)
                                                                            } else {
                                                                                globalContextService.set("WhiteCallCarComponentPage", "AccompanyCounts", { value: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts").value - 1, label: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts").value - 1 + "人" });
                                                                            }
                                                                            setForceUpdate(f => !f);
                                                                        }}
                                                                    ></Delete>
                                                                聯絡電話{index + 1}
                                                                </Text>
                                                            }
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={``}
                                                            value={globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${index + 1}`) ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("WhiteCallCarComponentPage", `TakerPhone_${index + 1}`, value);
                                                            }}
                                                            theme={laptopL.takerPhone}
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

                                        {/* 回程搭車人數容器 */}
                                        <Container
                                            theme={laptopL.accompanyCountsContainer}
                                        >
                                            <Text theme={laptopL.formSubTitleText}>回程搭車人數</Text>
                                            {/* 回程搭車人數 ReturnAccompanyCounts */}
                                            <NewSelector
                                                bascDefaultTheme={"DefaultTheme"}
                                                // topLabel={<>回程搭車人數</>}
                                                bottomLabel={""}
                                                //viewType
                                                isSearchable
                                                placeholder={""}
                                                // isMulti
                                                // hideSelectedOptions={false}
                                                value={globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts") ?? null}
                                                onChange={(e, value, onInitial) => {
                                                    if (!isEqual(value, globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts"))) {
                                                        // 清空重新選擇前的值
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
                                                    // { value: 'hint', label: "請選擇搭乘人數", isDisabled: true },
                                                    { value: 1, label: "1人" },
                                                    { value: 2, label: "2人" },
                                                    { value: 3, label: "3人" },
                                                    { value: 4, label: "4人" },
                                                    { value: 5, label: "5人" },
                                                    { value: 6, label: "6人" },
                                                    { value: 7, label: "7人" },
                                                    { value: 8, label: "8人" },
                                                    // ...Counties
                                                ]}
                                                // menuPosition={true}
                                                theme={laptopL.accompanyCounts}
                                            />
                                            {/* 代入去程按鈕 */}
                                            <SubContainer theme={laptopL.importButtonContainer}>
                                                <NativeLineButton
                                                    onClick={() => {
                                                        if (!isNil(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts"))) {
                                                            let orgNum = globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value;
                                                            //先清空原值
                                                            Array(orgNum).fill(0).forEach((it, ind) => {
                                                                globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerName_${ind + 1}`)
                                                                globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerBirthday_${ind + 1}`)
                                                                globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerPhone_${ind + 1}`)
                                                            });

                                                            let preNum = globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value;
                                                            //放入新的值
                                                            Array(preNum).fill(0).forEach((it, ind) => {
                                                                globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerName_${ind + 1}`, globalContextService.get("WhiteCallCarComponentPage", `TakerName_${ind + 1}`));
                                                                globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerBirthday_${ind + 1}`, globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${ind + 1}`));
                                                                globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerPhone_${ind + 1}`, globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${ind + 1}`));
                                                            });
                                                            globalContextService.set("WhiteCallCarComponentPage", "ReturnAccompanyCounts", { value: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts").value, label: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts").label });
                                                            setForceUpdate(f => !f);
                                                        }
                                                    }}
                                                    theme={laptopL.importButton}
                                                >
                                                    代入去程資料
                                            </NativeLineButton>
                                            </SubContainer>
                                        </Container>

                                        {/* 回程搭乘者資訊外容器 */}
                                        <Container
                                            theme={laptopL.takerInfoOutContainer}
                                        >
                                            {!isNil(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts"))
                                                &&
                                                (Array(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value)).fill(0).map((item, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            {/* 搭乘者資訊容器 */}
                                                            <Container
                                                                theme={laptopL.takerInfoContainer}
                                                            >
                                                                {/* 搭車姓名 TakerName */}
                                                                <TextInput
                                                                    topLabel={`姓名${index + 1}`}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={``}
                                                                    value={globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerName_${index + 1}`) ?? ""}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerName_${index + 1}`, value);
                                                                    }}
                                                                    theme={laptopL.takerName}
                                                                />

                                                                {/* 搭車生日 TakerBirthday */}
                                                                <DateTimePicker
                                                                    topLabel={`生日${index + 1}`}
                                                                    // type={"time"} time、date、week、month、quarter、year
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
                                                                        // 去除掉今天以後的日期
                                                                        return perMoment && (perMoment > moment().endOf('day'));
                                                                    }}
                                                                    theme={laptopL.takerBirthday}
                                                                />

                                                                {/* 搭車電話 TakerPhone */}
                                                                <TextInput
                                                                    topLabel={
                                                                        <Text
                                                                            style={{ fontSize: "14px", fontWeight: 300 }}
                                                                        >
                                                                            <Delete
                                                                                style={laptopL.deleteSvg}
                                                                                onClick={() => {
                                                                                    let preNum = globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value;
                                                                                    for (let i = index + 1; i < preNum; i++) {
                                                                                        // 將後面資料向前放
                                                                                        if (i >= index + 1) {
                                                                                            globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerName_${i}`, globalContextService.get("WhiteCallCarComponentPage", `TakerName_${i + 1}`));
                                                                                            globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerBirthday_${i}`, globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${i + 1}`));
                                                                                            globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerPhone_${i}`, globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${i + 1}`));
                                                                                        } else {
                                                                                            continue
                                                                                        }
                                                                                    }
                                                                                    // 移除最後一筆資料
                                                                                    globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerName_${preNum}`);
                                                                                    globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerBirthday_${preNum}`);
                                                                                    globalContextService.remove("WhiteCallCarComponentPage", `ReturnTakerPhone_${preNum}`);
                                                                                    // setDeleteRowIndex(index + 1);
                                                                                    if (preNum === 1) {
                                                                                        globalContextService.set("WhiteCallCarComponentPage", "ReturnAccompanyCounts", null)
                                                                                    } else {
                                                                                        globalContextService.set("WhiteCallCarComponentPage", "ReturnAccompanyCounts", { value: globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts").value - 1, label: globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts").value - 1 + "人" });
                                                                                    }
                                                                                    setForceUpdate(f => !f);
                                                                                }}
                                                                            ></Delete>
                                                                        聯絡電話{index + 1}
                                                                        </Text>
                                                                    }
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={``}
                                                                    value={globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerPhone_${index + 1}`) ?? ""}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("WhiteCallCarComponentPage", `ReturnTakerPhone_${index + 1}`, value);
                                                                    }}
                                                                    theme={laptopL.takerPhone}
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
                            {/* 叫車表單下方按鈕列 */}
                            <BasicContainer
                                theme={laptopL.callCarFormBottomContainer}
                            >
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
                                </NativeLineButton> */}

                                {/* 立即預約按鈕 */}
                                {/* 立即預約按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.reservationNow}
                                    onClick={() => {
                                        //#region 表單驗證
                                        let validMsg = "";
                                        if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]
                                        }
                                        else if (globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview")?.[0] === 1 && valid(globalContextService.get("WhiteCallCarComponentPage", "ReturnTravelTime")?.value ?? "", ["^.{1,}$"], ["請選擇回程乘車時間"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "ReturnTravelTime")?.value ?? "", ["^.{1,}$"], ["請選擇回程乘車時間"])[1]
                                        }
                                        else if (
                                            (globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview")?.[0] === 1)
                                            &&
                                            !moment(globalContextService.get("WhiteCallCarComponentPage", "ReturnTravelTime")?.value, "HH:mm").isAfter(moment(globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value, "HH:mm"))
                                        ) {  // !(去程時間 > 回程時間)
                                            validMsg = "回程乘車時間不可早於或等於去程時間"
                                        }
                                        else if (globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview")?.[0] === 1 && valid(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇回程搭車人數"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇回程搭車人數"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["請輸入接收簡訊號碼", "請輸入正確手機格式"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["請輸入接收簡訊號碼", "請輸入正確手機格式"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]
                                        }
                                        else if (
                                            !(
                                                (Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0)
                                                    .map((item, index) => {
                                                        // 必須保留多種檢核的可能，不能只有寫死檢核必輸
                                                        return [
                                                            valid(globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入姓名${index + 1}`])[1],
                                                            valid(globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入生日${index + 1}`])[1],
                                                            valid(globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${index + 1}`) ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], [`請輸入聯絡電話${index + 1}`, `請輸入正確的聯絡電話${index + 1}`])[1]
                                                        ]
                                                    }).flat().every(V => (V === null))
                                            )
                                        ) {

                                            validMsg = (Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0)
                                                .map((item, index) => {
                                                    return [
                                                        valid(globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入姓名${index + 1}`])[1],
                                                        valid(globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入生日${index + 1}`])[1],
                                                        valid(globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${index + 1}`) ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], [`請輸入聯絡電話${index + 1}`, `請輸入正確的聯絡電話${index + 1}`])[1]
                                                    ]
                                                }).flat().filter(v => v !== null)[0]; // 拿第一個檢核不通過的錯誤訊息
                                        }
                                        else if (
                                            !isNil(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")) &&
                                            !(
                                                (Array(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value)).fill(0)
                                                    .map((item, index) => {
                                                        // 必須保留多種檢核的可能，不能只有寫死檢核必輸
                                                        return [
                                                            valid(globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入回程姓名${index + 1}`])[1],
                                                            valid(globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerBirthday_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入回程生日${index + 1}`])[1],
                                                            valid(globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerPhone_${index + 1}`) ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], [`請輸入回程聯絡電話${index + 1}`, `請輸入正確的回程聯絡電話${index + 1}`])[1]
                                                        ]
                                                    }).flat().every(V => (V === null))
                                            )
                                        ) {

                                            validMsg = (Array(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value)).fill(0)
                                                .map((item, index) => {
                                                    return [
                                                        valid(globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入回程姓名${index + 1}`])[1],
                                                        valid(globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerBirthday_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入回程生日${index + 1}`])[1],
                                                        valid(globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerPhone_${index + 1}`) ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], [`請輸入回程聯絡電話${index + 1}`, `請輸入正確的回程聯絡電話${index + 1}`])[1]
                                                    ]
                                                }).flat().filter(v => v !== null)[0]; // 拿第一個檢核不通過的錯誤訊息
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
                                            //有回程
                                            if (globalContextService.get("WhiteCallCarComponentPage", "ScheduleReturnReview")?.[0] === 1) {
                                                //去程
                                                props.AddOrderOfSelfPayUsersExecute({
                                                    CarCategoryName: globalContextService.get("WhiteCallCarComponentPage", "CarType").label, //車種 的 label
                                                    canShared: globalContextService.get("WhiteCallCarComponentPage", "Equipment")?.[0] === 1 ? true : false, //願意共乘
                                                    carCategoryId: globalContextService.get("WhiteCallCarComponentPage", "CarType").value,	//車種 的 value
                                                    date: globalContextService.get("WhiteCallCarComponentPage", "TravelDate"), //預約日期
                                                    fromAddr: globalContextService.get("WhiteCallCarComponentPage", "StartPos"), //	起點
                                                    fromLat: props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat ?? 0, //起點緯度
                                                    fromLon: props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lng ?? 0,//起點經度
                                                    // id: ""	白牌預約訂單 id
                                                    noticePhone: globalContextService.get("WhiteCallCarComponentPage", "Phone"),	//畫面無此欄位
                                                    orgId: "",//	畫面無此欄位
                                                    passengerNum: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts").value,	//搭乘人數
                                                    remark: JSON.stringify((Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0).map((item, index) => {
                                                        return {
                                                            name: globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`),
                                                            birth: globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${index + 1}`),
                                                            phone: globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${index + 1}`)
                                                        }
                                                    })),	//搭乘人員資訊陣列
                                                    reserveDate: `${globalContextService.get("WhiteCallCarComponentPage", "TravelDate")} ${globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value}`,	//預約日期+ 預約時間
                                                    selfPayUserId: props.CaseUserId, //白牌個案id
                                                    status: 1,	//畫面無此欄位
                                                    time: globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value, //預約時間
                                                    toAddr: globalContextService.get("WhiteCallCarComponentPage", "EndPos"), //	迄點
                                                    toLat: props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat ?? 0,//	迄點緯度
                                                    toLon: props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lng ?? 0,//	迄點經度
                                                    userId: props.UserId,
                                                    wheelchairType: globalContextService.get("WhiteCallCarComponentPage", "Wheelchair")?.label, //	輪椅
                                                    isLastOrder: false
                                                })

                                                //回程(起訖點互換)
                                                props.AddOrderOfSelfPayUsersExecute({
                                                    CarCategoryName: globalContextService.get("WhiteCallCarComponentPage", "CarType").label, //車種 的 label
                                                    canShared: globalContextService.get("WhiteCallCarComponentPage", "Equipment")?.[0] === 1 ? true : false, //願意共乘
                                                    carCategoryId: globalContextService.get("WhiteCallCarComponentPage", "CarType").value,	//車種 的 value
                                                    date: globalContextService.get("WhiteCallCarComponentPage", "TravelDate"), //預約日期
                                                    fromAddr: globalContextService.get("WhiteCallCarComponentPage", "EndPos"), //	起點
                                                    fromLat: props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat ?? 0, //起點緯度
                                                    fromLon: props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lng ?? 0,//起點經度
                                                    // id: ""	白牌預約訂單 id
                                                    noticePhone: globalContextService.get("WhiteCallCarComponentPage", "Phone"),	//畫面無此欄位
                                                    orgId: "",//	畫面無此欄位
                                                    passengerNum: globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts").value,	//搭乘人數
                                                    remark: JSON.stringify((Array(globalContextService.get("WhiteCallCarComponentPage", "ReturnAccompanyCounts")?.value)).fill(0).map((item, index) => {
                                                        return {
                                                            name: globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerName_${index + 1}`),
                                                            birth: globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerBirthday_${index + 1}`),
                                                            phone: globalContextService.get("WhiteCallCarComponentPage", `ReturnTakerPhone_${index + 1}`)
                                                        }
                                                    })),	//搭乘人員資訊陣列
                                                    reserveDate: `${globalContextService.get("WhiteCallCarComponentPage", "TravelDate")} ${globalContextService.get("WhiteCallCarComponentPage", "ReturnTravelTime")?.value}`,	//預約日期+ 預約時間
                                                    selfPayUserId: props.CaseUserId, //白牌個案id
                                                    status: 1,	//畫面無此欄位
                                                    time: globalContextService.get("WhiteCallCarComponentPage", "ReturnTravelTime")?.value, //預約時間
                                                    toAddr: globalContextService.get("WhiteCallCarComponentPage", "StartPos"), //	迄點
                                                    toLat: props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat ?? 0,//	迄點緯度
                                                    toLon: props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lng ?? 0,//	迄點經度
                                                    userId: props.UserId,
                                                    wheelchairType: globalContextService.get("WhiteCallCarComponentPage", "Wheelchair")?.label, //	輪椅
                                                    isLastOrder: true
                                                })
                                            } else {
                                                //只有去程
                                                props.AddOrderOfSelfPayUsersExecute({
                                                    CarCategoryName: globalContextService.get("WhiteCallCarComponentPage", "CarType").label, //車種 的 label
                                                    canShared: globalContextService.get("WhiteCallCarComponentPage", "Equipment")?.[0] === 1 ? true : false, //願意共乘
                                                    carCategoryId: globalContextService.get("WhiteCallCarComponentPage", "CarType").value,	//車種 的 value
                                                    date: globalContextService.get("WhiteCallCarComponentPage", "TravelDate"), //預約日期
                                                    fromAddr: globalContextService.get("WhiteCallCarComponentPage", "StartPos"), //	起點
                                                    fromLat: props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat ?? 0, //起點緯度
                                                    fromLon: props.mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lng ?? 0,//起點經度
                                                    // id: ""	白牌預約訂單 id
                                                    noticePhone: globalContextService.get("WhiteCallCarComponentPage", "Phone"),	//畫面無此欄位
                                                    orgId: "",//	畫面無此欄位
                                                    passengerNum: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts").value,	//搭乘人數
                                                    remark: JSON.stringify((Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0).map((item, index) => {
                                                        return {
                                                            name: globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`),
                                                            birth: globalContextService.get("WhiteCallCarComponentPage", `TakerBirthday_${index + 1}`),
                                                            phone: globalContextService.get("WhiteCallCarComponentPage", `TakerPhone_${index + 1}`)
                                                        }
                                                    })),	//搭乘人員資訊陣列
                                                    reserveDate: `${globalContextService.get("WhiteCallCarComponentPage", "TravelDate")} ${globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value}`,	//預約日期+ 預約時間
                                                    selfPayUserId: props.CaseUserId, //白牌個案id
                                                    status: 1,	//畫面無此欄位
                                                    time: globalContextService.get("WhiteCallCarComponentPage", "TravelTime")?.value, //預約時間
                                                    toAddr: globalContextService.get("WhiteCallCarComponentPage", "EndPos"), //	迄點
                                                    toLat: props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat ?? 0,//	迄點緯度
                                                    toLon: props.mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lng ?? 0,//	迄點經度
                                                    userId: props.UserId,
                                                    wheelchairType: globalContextService.get("WhiteCallCarComponentPage", "Wheelchair")?.label, //	輪椅
                                                    isLastOrder: true
                                                })
                                            }
                                        }
                                    }}
                                >
                                    立即預約
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
                            //   maxBounds: [[105, 15], [138.45858, 33.4]], // 台灣地圖區域
                            center: { lat: 25.012930, lng: 121.474708 }, // 初始中心座標，格式為 [lng, lat]  // 25.012930, 121.474708
                            zoom: 16, // 初始 ZOOM LEVEL; [0-20, 0 為最小 (遠), 20 ;最大 (近)]
                            //   minZoom: 6, // 限制地圖可縮放之最小等級, 可省略, [0-19.99]
                            //   maxZoom: 19.99, // 限制地圖可縮放之最大等級, 可省略 [0-19.99]
                            //   pitch: 0, // 攝影機仰角, 可省略, [0-60] // default 50
                            //   bearing: 0, // 地圖角度, 可省略, [-180 ~ 180; 0 為正北朝上, 180 為正南朝上]
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