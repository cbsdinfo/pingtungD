import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../../Store/Store'
import { BUnitSort, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar, MapGoogle, mapGoogleControll, MapGoogleInput } from '../../../../../ProjectComponent';
import { ReactComponent as End2 } from '../../../../../Assets/img/EditWhiteFastCallCarPage/End2.svg'
import { ReactComponent as Start2 } from '../../../../../Assets/img/EditWhiteFastCallCarPage/Start2.svg'
import { ReactComponent as Minus } from '../../../../../Assets/img/EditWhiteFastCallCarPage/Minus.svg'
import { ReactComponent as Vector } from '../../../../../Assets/img/EditWhiteFastCallCarPage/Vector.svg'
import { ReactComponent as Delete } from '../../../../../Assets/img/EditWhiteFastCallCarPage/Delete.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Checkbox, CheckboxItem, modalsService, Container, OldTable } from '../../../../../Components';
import { isEqual, isNil } from 'lodash';
import { valid } from '../../../../../Handlers';
import { tenMinTimes } from '../../../../../Mappings/Mappings';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { fastCallCar: { editFastCallCar: { editWhite: { rwd: { laptopL } } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory()

    //#region 如果起迄點、搭車日期、搭車時間有值、搭車人數皆已有有值，則帶回 本日行程一覽 Table資料
    const getCaseOrderAmtAPI = useCallback(() => {
        let end = mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // 迄點緯度
        let start = mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // 起點緯度

        let validMsg = "";
        if (valid(globalContextService.get("EditWhiteFastCallCarPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
            validMsg = valid(globalContextService.get("EditWhiteFastCallCarPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
        }
        else if (valid(globalContextService.get("EditWhiteFastCallCarPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
            validMsg = valid(globalContextService.get("EditWhiteFastCallCarPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
        }
        else if (valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
            validMsg = valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
        }
        else if (valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
            validMsg = valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
        }
        else if (valid(globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]) {
            validMsg = valid(globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]
        }

        if (validMsg === "") {
            // 如果起迄點、搭車日期、搭車時間有值、搭車人數 皆已有有值
            // props.GetCaseOrderAmtExecute({
            //     CaseUserId: props.CaseUserId,
            //     FromAddr: globalContextService.get("EditWhiteFastCallCarPage", "StartPos"),
            //     // FromAddrId:, // 不用丟
            //     ToAddr: globalContextService.get("EditWhiteFastCallCarPage", "EndPos"),
            //     FamilyWith: globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts")?.value,
            //     // ToAddrId:, // 不用丟
            //     ReservationDate: globalContextService.get("EditWhiteFastCallCarPage", "TravelDate") + " " + globalContextService.get("EditWhiteFastCallCarPage", "TravelTime"), // 預約日期+預約時間	如: "2020-11-25 17:45"
            // })
        }

    }, [])
    //#endregion

    //#region 新增下個地點、立即預約 送出前欄位檢核
    const formValid = useCallback(() => {
        //#region 表單驗證
        let validMsg = "";

        if (valid(globalContextService.get("EditWhiteFastCallCarPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
            validMsg = valid(globalContextService.get("EditWhiteFastCallCarPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
        }
        else if (valid(globalContextService.get("EditWhiteFastCallCarPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
            validMsg = valid(globalContextService.get("EditWhiteFastCallCarPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
        }
        else if (valid(globalContextService.get("EditWhiteFastCallCarPage", "BUnitSort")?.[0]?.id ?? "", ["^.{1,}$"], ["請選擇優先搭乘車行排序，或需先新增B單位"])[1]) {
            validMsg = valid(globalContextService.get("EditWhiteFastCallCarPage", "BUnitSort")?.[0]?.id ?? "", ["^.{1,}$"], ["請選擇優先搭乘車行排序，或需先新增B單位"])[1]
        }
        // 其實 應該要連實際經緯度標記坐標一起檢核，目前尚未防堵 選擇自動完成選項後，又改動輸入框地址內容，然後送出的情況  
        // PS.可以分成 目前輸入框內容 與 onSelect的值，onChange時清掉onSelect的值，然後送出時一律檢核onSelect的值
        else if (valid(globalContextService.get("EditWhiteFastCallCarPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]) {
            validMsg = valid(globalContextService.get("EditWhiteFastCallCarPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]
        }
        else if (valid(globalContextService.get("EditWhiteFastCallCarPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]) {
            validMsg = valid(globalContextService.get("EditWhiteFastCallCarPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]
        }
        // else if (map8Controll.getMarkerPoints("test1").length !== 2) {
        //     validMsg = "請重新輸入起訖地址"
        // }        
        else if (valid(globalContextService.get("EditWhiteFastCallCarPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]) {
            validMsg = valid(globalContextService.get("EditWhiteFastCallCarPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]
        }
        else if (valid(globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]) {
            validMsg = valid(globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]
        }
        else if (valid(globalContextService.get("EditWhiteFastCallCarPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["請輸入接收簡訊號碼", "請輸入正確手機格式"])[1]) {
            validMsg = valid(globalContextService.get("EditWhiteFastCallCarPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["請輸入接收簡訊號碼", "請輸入正確手機格式"])[1]
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
                            王曉明
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
                            {/* 路線名稱 RouteName */}
                            <TextInput
                                // viewType
                                topLabel={"路線名稱"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("EditWhiteFastCallCarPage", "RouteName") ?? null}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("EditWhiteFastCallCarPage", "RouteName", value);
                                }}
                                theme={laptopL.routeName}
                            />

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
                                open={true}
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
                                        {globalContextService.get("EditWhiteFastCallCarPage", "StartPos")}
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
                                        value={globalContextService.get("EditWhiteFastCallCarPage", "StartPos") ?? ""}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("EditWhiteFastCallCarPage", "StartPos", value);
                                        }}
                                        onSelect={(e, option, onInitial, posInfo) => {
                                            if (mapGoogleControll.getPolylineRoutes("test1")?.[0]) {
                                                let endMarker = mapGoogleControll.getMarkers("test1")?.[1]?.position // 迄點經緯度
                                                mapGoogleControll.deletePolylineRoute("test1"); // 移除路線  
                                                mapGoogleControll.addMarkerWithIndex("test1", { lat: posInfo?.lat, lng: posInfo?.lon }, 0) // 更新選中起點
                                                mapGoogleControll.addMarkerWithIndex("test1", endMarker, 1) // 更新選中起點
                                            }

                                            mapGoogleControll.addMarkerWithIndex("test1", { lat: posInfo?.lat, lng: posInfo?.lon }, 0) // 更新選中起點
                                            mapGoogleControll.setCenter("test1", { lat: posInfo?.lat, lng: posInfo?.lon }); // 移動中心點

                                            globalContextService.set("EditWhiteFastCallCarPage", "StartPos", option.label);

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
                                        {globalContextService.get("EditWhiteFastCallCarPage", "EndPos")}
                                    </Text>

                                    {/* 預覽路線按鈕 */}
                                    <NativeLineButton theme={laptopL.seeRouteButton}
                                        onClick={() => {
                                            let end = mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // 迄點緯度
                                            let start = mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // 起點緯度

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
                                                // mapGoogleControll.addRoute("test1",
                                                //     {
                                                //         // origin: new window.google.maps.LatLng(25.012930,121.994708),
                                                //         origin: mapGoogleControll.getMarkers("test1")[0].position,
                                                //         destination: mapGoogleControll.getMarkers("test1")[1].position,// new window.google.maps.LatLng(25.012930,121.974708),
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

                                                // props.GetPolylineRouteExecute(
                                                //     {
                                                //         fromAddr: globalContextService.get("EditWhiteFastCallCarPage", "StartPos"),
                                                //         toAddr: globalContextService.get("EditWhiteFastCallCarPage", "EndPos"),
                                                //         mapId: "test1",
                                                //         routeAttr: {
                                                //             // origin: new window.google.maps.LatLng(25.012930,121.994708),
                                                //             origin: mapGoogleControll.getMarkers("test1")[0].position,
                                                //             destination: mapGoogleControll.getMarkers("test1")[1].position,// new window.google.maps.LatLng(25.012930,121.974708),
                                                //             waypoints: [
                                                //                 // {
                                                //                 //     location: { lat: 25.012930, lng: 121.984708 },// new window.google.maps.LatLng(25.012930,121.984708), // 或是地址
                                                //                 //     stopover: true,
                                                //                 // },
                                                //             ]
                                                //         }
                                                //     }
                                                // )
                                                //#endregion

                                                // setForceUpdate(f => !f)
                                            }
                                        }}
                                    >
                                        路線預覽
                                </NativeLineButton>
                                    <NativeLineButton theme={laptopL.convertButton}
                                        onClick={() => {
                                            let end = mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // 迄點緯度
                                            let start = mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // 起點緯度

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
                                                let startAddr = globalContextService.get("EditWhiteFastCallCarPage", "StartPos");
                                                let endAddr = globalContextService.get("EditWhiteFastCallCarPage", "EndPos");

                                                globalContextService.set("EditWhiteFastCallCarPage", "EndPos", startAddr);
                                                globalContextService.set("EditWhiteFastCallCarPage", "StartPos", endAddr);

                                                let startMarker = mapGoogleControll.getMarkers("test1")?.[0]?.position  // 起點經緯度
                                                let endMarker = mapGoogleControll.getMarkers("test1")?.[1]?.position // 迄點經緯度

                                                // mapGoogleControll.deleteRoute("test1"); // 移除路線 由前端Call Google畫路線的方法
                                                mapGoogleControll.deletePolylineRoute("test1"); // 移除路線 透過後端回傳 加密路徑字串 (decodePath) 並透過 polyline 畫路線的方法      

                                                mapGoogleControll.addMarker("test1", endMarker); // 替換起迄點
                                                mapGoogleControll.addMarker("test1", startMarker); // 替換起迄點
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
                                        value={globalContextService.get("EditWhiteFastCallCarPage", "EndPos") ?? ""}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("EditWhiteFastCallCarPage", "EndPos", value);
                                        }}
                                        onSelect={(e, option, onInitial, posInfo) => {
                                            if (mapGoogleControll.getPolylineRoutes("test1")?.[0]) {
                                                let startMarker = mapGoogleControll.getMarkers("test1")?.[0]?.position // 起點經緯度
                                                mapGoogleControll.deletePolylineRoute("test1"); // 移除路線  
                                                mapGoogleControll.addMarkerWithIndex("test1", startMarker, 0) // 更新選中起點
                                            }

                                            //#region 如果沒有先打起點
                                            if (!mapGoogleControll.getMarkers("test1")?.[0]) {
                                                mapGoogleControll.addMarkerWithIndex("test1", {}, 0) // 更新 一個卡位給 起點
                                            }
                                            //#endregion
                                            mapGoogleControll.addMarkerWithIndex("test1", { lat: posInfo?.lat, lng: posInfo?.lon }, 1) // 更新選中起點
                                            mapGoogleControll.setCenter("test1", { lat: posInfo?.lat, lng: posInfo?.lon }); // 移動中心點

                                            globalContextService.set("EditWhiteFastCallCarPage", "EndPos", option.label);

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
                                        checked={globalContextService.get("EditWhiteFastCallCarPage", "Equipment")}
                                        // disable
                                        topLabel={""}
                                        onChange={(e, value, onInitial) => {
                                            // console.log(value)
                                            globalContextService.set("EditWhiteFastCallCarPage", "Equipment", value);
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
                                        value={globalContextService.get("EditWhiteFastCallCarPage", "CarType") ?? null}
                                        onChange={(e, value, onInitial) => {
                                            // console.log(props?.AllCarType)
                                            globalContextService.set("EditWhiteFastCallCarPage", "CarType", value);
                                        }}

                                        options={[
                                            { value: '0', label: "請選擇車種類型", isDisabled: true },
                                            // ...props?.AllCarType
                                        ]}
                                        // menuPosition={true}
                                        theme={laptopL.carType}
                                    />

                                    {/* 簡訊號碼 SmsNumber */}
                                    <Text theme={laptopL.formSubTitleText}>接收簡訊號碼</Text>
                                    <TextInput
                                        topLabel={<>簡訊號碼</>}
                                        baseDefaultTheme={"DefaultTheme"}
                                        type="text"
                                        placeholder={"請輸入手機號碼"}
                                        value={globalContextService.get("EditWhiteFastCallCarPage", "SmsNumber") ?? null}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("EditWhiteFastCallCarPage", "SmsNumber", value);
                                        }}
                                        theme={laptopL.smsNumber}
                                    />
                                    <Container
                                        style={{ width: "auto" }}
                                    >
                                        {/* 我要預約回程(回居住地址) */}
                                        <Checkbox
                                            // viewType
                                            // disable
                                            // topLabel={"我要預約回程(回居住地址)"}
                                            checked={globalContextService.get("EditWhiteFastCallCarPage", "ScheduleReturnReview") ?? [0]}
                                            onChange={(e, value, onInitial) => {
                                                if (value?.[0] === 1) {
                                                    if (value !== globalContextService.get("EditWhiteFastCallCarPage", "ScheduleReturnReview")) {
                                                        setForceUpdate(f => !f); // 剛選擇 預約回程 是 時，重新渲染
                                                    }
                                                }
                                                else if (globalContextService.get("EditWhiteFastCallCarPage", "ScheduleReturnReview")?.[0] === 1) {
                                                    setForceUpdate(f => !f); // 剛選擇 預約回程 是，重新渲染
                                                }
                                                else {
                                                    //選擇 否時清空回程相關資料避免誤送
                                                    globalContextService.remove("EditWhiteFastCallCarPage", "ReturnTravelTime");
                                                    let preNum = globalContextService.get("EditWhiteFastCallCarPage", "ReturnAccompanyCounts")?.value;
                                                    Array(preNum).fill(0).forEach((it, ind) => {
                                                        globalContextService.remove("EditWhiteFastCallCarPage", `ReturnTakerName_${ind + 1}`)
                                                        globalContextService.remove("EditWhiteFastCallCarPage", `ReturnTakerBirthday_${ind + 1}`)
                                                        globalContextService.remove("EditWhiteFastCallCarPage", `ReturnTakerPhone_${ind + 1}`)
                                                    });
                                                    globalContextService.remove("EditWhiteFastCallCarPage", "ReturnAccompanyCounts");
                                                }
                                                globalContextService.set("EditWhiteFastCallCarPage", "ScheduleReturnReview", value);
                                            }}
                                            theme={laptopL.scheduleReturnReview}
                                        >
                                            {/* 我要預約回程(回居住地址) ScheduleReturnReview  選項 */}
                                            <CheckboxItem value={1} >我要預約回程</CheckboxItem>
                                        </Checkbox>

                                        {
                                            globalContextService.get("EditWhiteFastCallCarPage", "ScheduleReturnReview")?.[0] === 1
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
                                                        value={globalContextService.get("EditWhiteFastCallCarPage", "ReturnTravelTime") ?? null}
                                                        onChange={(e, value, OnInitial) => {
                                                            if (value !== globalContextService.get("EditWhiteFastCallCarPage", "ReturnTravelTime")) {
                                                                globalContextService.set("EditWhiteFastCallCarPage", `ReturnTravelTime`, value);
                                                                setForceUpdate(f => !f); // 剛選擇 預約回程 是 時，重新渲染
                                                            }
                                                        }}

                                                        options={[
                                                            ...tenMinTimes
                                                                .filter((X) => {

                                                                    if (moment(globalContextService.get("EditWhiteFastCallCarPage", "TravelDate") + " " + X.value).isBefore(moment())) {
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
                                    open={true}
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
                                                globalContextService.set("EditWhiteFastCallCarPage", "CheckedRowKeys", checkedRowKeys);
                                                globalContextService.set("EditWhiteFastCallCarPage", "CheckedRowsData", checkedRows);
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
                                        data={[
                                            { id: "1", type: "去程" },
                                            { id: "2", type: "回程" },
                                        ]}
                                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                                        // data={props.WhiteOrderAmt}
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
                                        value={globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts") ?? null}
                                        onChange={(e, value, onInitial) => {
                                            if (!isEqual(value, globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts"))) {
                                                // 清空重新選擇前的值
                                                let preNum = globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts")?.value;
                                                Array(preNum).fill(0).forEach((it, ind) => {
                                                    if (value.value < ind + 1) {
                                                        globalContextService.remove("EditWhiteFastCallCarPage", `TakerName_${ind + 1}`)
                                                        globalContextService.remove("EditWhiteFastCallCarPage", `TakerBirthday_${ind + 1}`)
                                                        globalContextService.remove("EditWhiteFastCallCarPage", `TakerPhone_${ind + 1}`)
                                                    }
                                                });

                                                globalContextService.set("EditWhiteFastCallCarPage", "AccompanyCounts", value)
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
                                                if (!isNil(globalContextService.get("EditWhiteFastCallCarPage", "ReturnAccompanyCounts"))) {
                                                    let orgNum = globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts")?.value;
                                                    //先清空原值
                                                    Array(orgNum).fill(0).forEach((it, ind) => {
                                                        globalContextService.remove("EditWhiteFastCallCarPage", `TakerName_${ind + 1}`)
                                                        globalContextService.remove("EditWhiteFastCallCarPage", `TakerBirthday_${ind + 1}`)
                                                        globalContextService.remove("EditWhiteFastCallCarPage", `TakerPhone_${ind + 1}`)
                                                    });

                                                    let preNum = globalContextService.get("EditWhiteFastCallCarPage", "ReturnAccompanyCounts")?.value;
                                                    //放入新的值
                                                    Array(preNum).fill(0).forEach((it, ind) => {
                                                        globalContextService.set("EditWhiteFastCallCarPage", `TakerName_${ind + 1}`, globalContextService.get("EditWhiteFastCallCarPage", `ReturnTakerName_${ind + 1}`));
                                                        globalContextService.set("EditWhiteFastCallCarPage", `TakerBirthday_${ind + 1}`, globalContextService.get("EditWhiteFastCallCarPage", `ReturnTakerBirthday_${ind + 1}`));
                                                        globalContextService.set("EditWhiteFastCallCarPage", `TakerPhone_${ind + 1}`, globalContextService.get("EditWhiteFastCallCarPage", `ReturnTakerPhone_${ind + 1}`));
                                                    });
                                                    globalContextService.set("EditWhiteFastCallCarPage", "AccompanyCounts", { value: globalContextService.get("EditWhiteFastCallCarPage", "ReturnAccompanyCounts").value, label: globalContextService.get("EditWhiteFastCallCarPage", "ReturnAccompanyCounts").label });
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
                                    {!isNil(globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts"))
                                        &&
                                        (Array(globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts")?.value)).fill(0).map((item, index) => {
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
                                                            value={globalContextService.get("EditWhiteFastCallCarPage", `TakerName_${index + 1}`) ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("EditWhiteFastCallCarPage", `TakerName_${index + 1}`, value);
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
                                                                (globalContextService.get("EditWhiteFastCallCarPage", `TakerBirthday_${index + 1}`)) ?
                                                                    moment(globalContextService.get("EditWhiteFastCallCarPage", `TakerBirthday_${index + 1}`), "YYYY-MM-DD HH:mm:ss")
                                                                    :
                                                                    null
                                                            }
                                                            onChange={(value, momentObj) => {
                                                                globalContextService.set("EditWhiteFastCallCarPage", `TakerBirthday_${index + 1}`, value);
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
                                                                    style={{ fontSize: "14px", fontWeight: "normal" }}
                                                                >
                                                                    <Delete
                                                                        style={laptopL.deleteSvg}
                                                                        onClick={() => {
                                                                            let preNum = globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts")?.value;
                                                                            for (let i = index + 1; i < preNum; i++) {
                                                                                // 將後面資料向前放
                                                                                if (i >= index + 1) {
                                                                                    console.log("i===" + i)
                                                                                    globalContextService.set("EditWhiteFastCallCarPage", `TakerName_${i}`, globalContextService.get("EditWhiteFastCallCarPage", `TakerName_${i + 1}`));
                                                                                    globalContextService.set("EditWhiteFastCallCarPage", `TakerBirthday_${i}`, globalContextService.get("EditWhiteFastCallCarPage", `TakerBirthday_${i + 1}`));
                                                                                    globalContextService.set("EditWhiteFastCallCarPage", `TakerPhone_${i}`, globalContextService.get("EditWhiteFastCallCarPage", `TakerPhone_${i + 1}`));
                                                                                } else {
                                                                                    continue
                                                                                }
                                                                            }
                                                                            // 移除最後一筆資料
                                                                            globalContextService.remove("EditWhiteFastCallCarPage", `TakerName_${preNum}`);
                                                                            globalContextService.remove("EditWhiteFastCallCarPage", `TakerBirthday_${preNum}`);
                                                                            globalContextService.remove("EditWhiteFastCallCarPage", `TakerPhone_${preNum}`);
                                                                            // setDeleteRowIndex(index + 1);
                                                                            if (preNum === 1) {
                                                                                globalContextService.set("EditWhiteFastCallCarPage", "AccompanyCounts", null)
                                                                            } else {
                                                                                globalContextService.set("EditWhiteFastCallCarPage", "AccompanyCounts", { value: globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts").value - 1, label: globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts").value - 1 + "人" });
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
                                                            value={globalContextService.get("EditWhiteFastCallCarPage", `TakerPhone_${index + 1}`) ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("EditWhiteFastCallCarPage", `TakerPhone_${index + 1}`, value);
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
                                    (!isNil(globalContextService.get("EditWhiteFastCallCarPage", "ReturnTravelTime")) && globalContextService.get("EditWhiteFastCallCarPage", "ScheduleReturnReview")?.[0] === 1)
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
                                                value={globalContextService.get("EditWhiteFastCallCarPage", "ReturnAccompanyCounts") ?? null}
                                                onChange={(e, value, onInitial) => {
                                                    if (!isEqual(value, globalContextService.get("EditWhiteFastCallCarPage", "ReturnAccompanyCounts"))) {
                                                        // 清空重新選擇前的值
                                                        let preNum = globalContextService.get("EditWhiteFastCallCarPage", "ReturnAccompanyCounts")?.value;
                                                        Array(preNum).fill(0).forEach((it, ind) => {
                                                            if (value.value < ind + 1) {
                                                                globalContextService.remove("EditWhiteFastCallCarPage", `ReturnTakerName_${ind + 1}`)
                                                                globalContextService.remove("EditWhiteFastCallCarPage", `ReturnTakerBirthday_${ind + 1}`)
                                                                globalContextService.remove("EditWhiteFastCallCarPage", `ReturnTakerPhone_${ind + 1}`)
                                                            }
                                                        });

                                                        globalContextService.set("EditWhiteFastCallCarPage", "ReturnAccompanyCounts", value)
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
                                                        if (!isNil(globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts"))) {
                                                            let orgNum = globalContextService.get("EditWhiteFastCallCarPage", "ReturnAccompanyCounts")?.value;
                                                            //先清空原值
                                                            Array(orgNum).fill(0).forEach((it, ind) => {
                                                                globalContextService.remove("EditWhiteFastCallCarPage", `ReturnTakerName_${ind + 1}`)
                                                                globalContextService.remove("EditWhiteFastCallCarPage", `ReturnTakerBirthday_${ind + 1}`)
                                                                globalContextService.remove("EditWhiteFastCallCarPage", `ReturnTakerPhone_${ind + 1}`)
                                                            });

                                                            let preNum = globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts")?.value;
                                                            //放入新的值
                                                            Array(preNum).fill(0).forEach((it, ind) => {
                                                                globalContextService.set("EditWhiteFastCallCarPage", `ReturnTakerName_${ind + 1}`, globalContextService.get("EditWhiteFastCallCarPage", `TakerName_${ind + 1}`));
                                                                globalContextService.set("EditWhiteFastCallCarPage", `ReturnTakerBirthday_${ind + 1}`, globalContextService.get("EditWhiteFastCallCarPage", `TakerBirthday_${ind + 1}`));
                                                                globalContextService.set("EditWhiteFastCallCarPage", `ReturnTakerPhone_${ind + 1}`, globalContextService.get("EditWhiteFastCallCarPage", `TakerPhone_${ind + 1}`));
                                                            });
                                                            globalContextService.set("EditWhiteFastCallCarPage", "ReturnAccompanyCounts", { value: globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts").value, label: globalContextService.get("EditWhiteFastCallCarPage", "AccompanyCounts").label });
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
                                            {!isNil(globalContextService.get("EditWhiteFastCallCarPage", "ReturnAccompanyCounts"))
                                                &&
                                                (Array(globalContextService.get("EditWhiteFastCallCarPage", "ReturnAccompanyCounts")?.value)).fill(0).map((item, index) => {
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
                                                                    value={globalContextService.get("EditWhiteFastCallCarPage", `ReturnTakerName_${index + 1}`) ?? ""}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("EditWhiteFastCallCarPage", `ReturnTakerName_${index + 1}`, value);
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
                                                                        (globalContextService.get("EditWhiteFastCallCarPage", `ReturnTakerBirthday_${index + 1}`)) ?
                                                                            moment(globalContextService.get("EditWhiteFastCallCarPage", `ReturnTakerBirthday_${index + 1}`), "YYYY-MM-DD HH:mm:ss")
                                                                            :
                                                                            null
                                                                    }
                                                                    onChange={(value, momentObj) => {
                                                                        globalContextService.set("EditWhiteFastCallCarPage", `ReturnTakerBirthday_${index + 1}`, value);
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
                                                                            style={{ fontSize: "14px", fontWeight: "normal" }}
                                                                        >
                                                                            <Delete
                                                                                style={laptopL.deleteSvg}
                                                                                onClick={() => {
                                                                                    let preNum = globalContextService.get("EditWhiteFastCallCarPage", "ReturnAccompanyCounts")?.value;
                                                                                    for (let i = index + 1; i < preNum; i++) {
                                                                                        // 將後面資料向前放
                                                                                        if (i >= index + 1) {
                                                                                            console.log("i===" + i)
                                                                                            globalContextService.set("EditWhiteFastCallCarPage", `ReturnTakerName_${i}`, globalContextService.get("EditWhiteFastCallCarPage", `TakerName_${i + 1}`));
                                                                                            globalContextService.set("EditWhiteFastCallCarPage", `ReturnTakerBirthday_${i}`, globalContextService.get("EditWhiteFastCallCarPage", `TakerBirthday_${i + 1}`));
                                                                                            globalContextService.set("EditWhiteFastCallCarPage", `ReturnTakerPhone_${i}`, globalContextService.get("EditWhiteFastCallCarPage", `TakerPhone_${i + 1}`));
                                                                                        } else {
                                                                                            continue
                                                                                        }
                                                                                    }
                                                                                    // 移除最後一筆資料
                                                                                    globalContextService.remove("EditWhiteFastCallCarPage", `ReturnTakerName_${preNum}`);
                                                                                    globalContextService.remove("EditWhiteFastCallCarPage", `ReturnTakerBirthday_${preNum}`);
                                                                                    globalContextService.remove("EditWhiteFastCallCarPage", `ReturnTakerPhone_${preNum}`);
                                                                                    // setDeleteRowIndex(index + 1);
                                                                                    if (preNum === 1) {
                                                                                        globalContextService.set("EditWhiteFastCallCarPage", "ReturnAccompanyCounts", null)
                                                                                    } else {
                                                                                        globalContextService.set("EditWhiteFastCallCarPage", "ReturnAccompanyCounts", { value: globalContextService.get("EditWhiteFastCallCarPage", "ReturnAccompanyCounts").value - 1, label: globalContextService.get("EditWhiteFastCallCarPage", "ReturnAccompanyCounts").value - 1 + "人" });
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
                                                                    value={globalContextService.get("EditWhiteFastCallCarPage", `ReturnTakerPhone_${index + 1}`) ?? ""}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("EditWhiteFastCallCarPage", `ReturnTakerPhone_${index + 1}`, value);
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
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.returnButton}
                                    onClick={() => {
                                        history.goBack();
                                        // props.controllGCS("return")

                                    }}
                                >
                                    回列表
                            </NativeLineButton>

                                {/* 儲存按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.saveButton}
                                    onClick={() => {

                                    }}
                                >
                                    儲存
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