import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../../Store/Store'
import { BUnitSort, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar, MapGoogle, mapGoogleControll, MapGoogleInput } from '../../../../../ProjectComponent';
import { ReactComponent as Search } from '../../../../../Assets/img/AddCaseFastCallCarPage/Search.svg'
import { ReactComponent as Convert } from '../../../../../Assets/img/AddCaseFastCallCarPage/Convert.svg'
import { ReactComponent as End } from '../../../../../Assets/img/AddCaseFastCallCarPage/End.svg'
import { ReactComponent as Start } from '../../../../../Assets/img/AddCaseFastCallCarPage/Start.svg'
import { ReactComponent as Minus } from '../../../../../Assets/img/AddCaseFastCallCarPage/Minus.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateTimePicker, BasicContainer, FormContainer, FormRow, Checkbox, CheckboxItem, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../../Components';
import { posRemarksSelectOption, tenMinTimes } from '../../../../../Mappings/Mappings';
import { isEqual, isNil } from 'lodash';
import { valid } from '../../../../../Handlers';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { fastCallCar: { addFastCallCar: { addCase: { rwd: { laptopL } } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory()

    //#region 如果起迄點、搭車日期、搭車時間有值、陪同人數皆已有有值，則帶回 本日行程一覽 Table資料
    const getCaseOrderAmtAPI = useCallback(() => {
        let end = mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // 迄點緯度
        let start = mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // 起點緯度

        let validMsg = "";
        if (valid(globalContextService.get("AddCaseFastCallCarPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
        }
        else if (valid(globalContextService.get("AddCaseFastCallCarPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
        }
        else if (valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
            validMsg = valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
        }
        else if (valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
            validMsg = valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
        }
        else if (valid(globalContextService.get("AddCaseFastCallCarPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇陪同人數"])[1]) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇陪同人數"])[1]
        }

        if (validMsg === "") {
            // 如果起迄點、搭車日期、搭車時間有值、陪同人數 皆已有有值
            // props.GetCaseOrderAmtExecute({
            //     CaseUserId: props.CaseUserId,
            //     FromAddr: globalContextService.get("AddCaseFastCallCarPage", "StartPos"),
            //     // FromAddrId:, // 不用丟
            //     ToAddr: globalContextService.get("AddCaseFastCallCarPage", "EndPos"),
            //     FamilyWith: globalContextService.get("AddCaseFastCallCarPage", "AccompanyCounts")?.value,
            //     // ToAddrId:, // 不用丟
            //     ReservationDate: globalContextService.get("AddCaseFastCallCarPage", "TravelDate") + " " + globalContextService.get("AddCaseFastCallCarPage", "TravelTime"), // 預約日期+預約時間	如: "2020-11-25 17:45"
            // })
        }

    }, [])
    //#endregion

    //#region 新增下個地點、立即預約 送出前欄位檢核
    const formValid = useCallback(() => {
        //#region 表單驗證
        let validMsg = "";

        if (valid(globalContextService.get("AddCaseFastCallCarPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
        }
        else if (valid(globalContextService.get("AddCaseFastCallCarPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
        }
        else if (valid(globalContextService.get("AddCaseFastCallCarPage", "BUnitSort")?.[0]?.id ?? "", ["^.{1,}$"], ["請選擇優先搭乘車行排序，或需先新增B單位"])[1]) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "BUnitSort")?.[0]?.id ?? "", ["^.{1,}$"], ["請選擇優先搭乘車行排序，或需先新增B單位"])[1]
        }
        else if (valid(globalContextService.get("AddCaseFastCallCarPage", "Orderer")?.value ?? "", ["^.{1,}$"], ["請選擇訂車人身分"])[1]) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "Orderer")?.value ?? "", ["^.{1,}$"], ["請選擇訂車人身分"])[1]
        }
        // 其實 應該要連實際經緯度標記坐標一起檢核，目前尚未防堵 選擇自動完成選項後，又改動輸入框地址內容，然後送出的情況  
        // PS.可以分成 目前輸入框內容 與 onSelect的值，onChange時清掉onSelect的值，然後送出時一律檢核onSelect的值
        else if (valid(globalContextService.get("AddCaseFastCallCarPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]
        }
        else if (valid(globalContextService.get("AddCaseFastCallCarPage", "StartPosRemarks")?.value ?? "", ["^.{1,}$"], ["請選擇起點備註"])[1]) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "StartPosRemarks")?.value ?? "", ["^.{1,}$"], ["請選擇起點備註"])[1]
        }
        else if (
            (globalContextService.get("AddCaseFastCallCarPage", "StartPosRemarks")?.label === "其他")
            &&
            valid(globalContextService.get("AddCaseFastCallCarPage", "OtherStartPosRemarks") ?? "", ["^.{1,}$"], ["請輸入起點備註 - 其他"])[1]
        ) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "OtherStartPosRemarks") ?? "", ["^.{1,}$"], ["請輸入起點備註 - 其他"])[1]
        }
        else if (valid(globalContextService.get("AddCaseFastCallCarPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]
        }
        else if (valid(globalContextService.get("AddCaseFastCallCarPage", "EndPosRemarks")?.value ?? "", ["^.{1,}$"], ["請選擇迄點備註"])[1]) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "EndPosRemarks")?.value ?? "", ["^.{1,}$"], ["請選擇迄點備註"])[1]
        }
        else if (
            (globalContextService.get("AddCaseFastCallCarPage", "EndPosRemarks")?.label === "其他")
            &&
            valid(globalContextService.get("AddCaseFastCallCarPage", "OtherEndPosRemarks") ?? "", ["^.{1,}$"], ["請輸入迄點備註 - 其他"])[1]
        ) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "OtherEndPosRemarks") ?? "", ["^.{1,}$"], ["請輸入迄點備註 - 其他"])[1]
        }
        // else if (map8Controll.getMarkerPoints("test1").length !== 2) {
        //     validMsg = "請重新輸入起訖地址"
        // }
        else if (
            (globalContextService.get("AddCaseFastCallCarPage", "ScheduleReturnReview") === 1)
            &&
            valid(globalContextService.get("AddCaseFastCallCarPage", "ReturnTravelTime")?.value ?? "", ["^.{1,}$"], ["請選擇回程乘車時間"])[1]
        ) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "ReturnTravelTime")?.value ?? "", ["^.{1,}$"], ["請選擇回程乘車時間"])[1]
        }
        else if (
            (globalContextService.get("AddCaseFastCallCarPage", "ScheduleReturnReview") === 1)
            &&
            !moment(globalContextService.get("AddCaseFastCallCarPage", "ReturnTravelTime")?.value, "HH:mm").isAfter(moment(globalContextService.get("AddCaseFastCallCarPage", "TravelTime"), "HH:mm"))
        ) {  // !(去程時間 > 回程時間)
            validMsg = "回程乘車時間不可早於或等於去程時間"
        }
        else if (valid(globalContextService.get("AddCaseFastCallCarPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]
        }
        else if (valid(globalContextService.get("AddCaseFastCallCarPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]
        }
        else if (valid(globalContextService.get("AddCaseFastCallCarPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇陪同人數"])[1]) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇陪同人數"])[1]
        }
        else if (valid(globalContextService.get("AddCaseFastCallCarPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["請輸入接收簡訊號碼", "請輸入正確手機格式"])[1]) {
            validMsg = valid(globalContextService.get("AddCaseFastCallCarPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["請輸入接收簡訊號碼", "請輸入正確手機格式"])[1]
        }
        //#endregion

        return validMsg;

    }, [])
    //#endregion


    return (
        <>
            {/* 叫車表單容器 */}
            <BasicContainer
                baseDefaultTheme={"DefaultTheme"}
            >
                {/* 叫車表單 子標題列 */}
                <MainPageSubTitleBar
                    bascDefaultTheme={"DefaultTheme"}
                    titleText={"王曉明"}
                    theme={laptopL.callCarSubTitleBar}
                >
                    {/* 可用補助餘額查詢按鈕 */}
                    <NativeLineButton
                        baseDefaultTheme={"DefaultTheme"}
                        disable={false}
                        type="button" // 防止提交
                        theme={laptopL.balanceInquiryButton}
                        onClick={() => {
                            //#region 打開可用補助餘額查詢 Modal
                            modalsService.titleModal.normal({
                                //id: "top1",
                                title: ` 的補助餘額`,
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
                                    <Container>
                                        <BasicContainer theme={laptopL.balanceInquiryMTodalTextContainer}>
                                            <Text
                                                theme={laptopL.balanceInquiryMTodalTitle}
                                            >
                                                總額度
                                                </Text>
                                            <Text
                                                theme={laptopL.balanceInquiryMTodalText}
                                            >
                                                ${`0`}
                                            </Text>
                                        </BasicContainer>
                                        <BasicContainer theme={laptopL.balanceInquiryMTodalTextContainer}>
                                            <Text
                                                theme={laptopL.balanceInquiryMTodalTitle}
                                            >
                                                使用額度
                                            </Text>
                                            <Text
                                                theme={laptopL.balanceInquiryMTodalText}
                                            >
                                                ${`0`}
                                            </Text>
                                        </BasicContainer>
                                        <BasicContainer theme={laptopL.balanceInquiryMTodalTextContainer}>
                                            <Text
                                                theme={laptopL.balanceInquiryMTodalTitle}
                                            >
                                                剩餘額度
                                            </Text>
                                            <Text
                                                theme={laptopL.balanceInquiryMTodalText}
                                            >
                                                ${`0`}
                                            </Text>
                                        </BasicContainer>
                                    </Container>
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
                    </NativeLineButton>
                </MainPageSubTitleBar>

                {/* 叫車表單內容容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptopL.callCarContainer}
                >

                    <Container>
                        {/* 路線名稱 RouteName */}
                        <TextInput
                            // viewType
                            topLabel={"路線名稱"}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("AddCaseFastCallCarPage", "RouteName") ?? null}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("AddCaseFastCallCarPage", "RouteName", value);
                            }}
                            theme={laptopL.routeName}
                        />

                        {/* 訂車人身分 Orderer */}
                        <NewSelector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={<>訂車人身分</>}
                            bottomLabel={""}
                            //viewType
                            isSearchable
                            placeholder={"請選擇訂車人身分"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("AddCaseFastCallCarPage", "Orderer") ?? null}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("AddCaseFastCallCarPage", "Orderer", value);
                            }}

                            options={[
                                { value: 'hint', label: "請選擇訂車人身分", isDisabled: true },
                                { value: '本人', label: "本人" },
                                { value: '家屬', label: "家屬" },
                                { value: 'A單位', label: "A單位" },
                                { value: 'B單位', label: "B單位" },
                                // ...Counties
                            ]}
                            // menuPosition={true}
                            theme={laptopL.orderer}
                        />
                    </Container>

                    {/* 行程容器 */}
                    <BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptopL.strokeContainer}
                    >
                        {/* 行程 子標題列 */}
                        <MainPageSubTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={<>行程<Minus style={laptopL.minusSvg} /></>}
                            theme={laptopL.strokeSubTitleBar}
                        ></MainPageSubTitleBar>

                        {/* 行程內容容器 */}
                        <BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.strokeInContainer}
                        >
                            <Container>
                                {/* 起點容器 */}
                                <SubContainer
                                    theme={laptopL.startPointContainer}
                                >
                                    {/* 起點 */}
                                    <Text
                                        theme={laptopL.todayToDoStart}
                                    >
                                        <Start style={laptopL.todayToDoStartSvg} />
                                        起點
                                </Text>

                                    {/* 起點內容容器 */}
                                    <Container
                                        theme={laptopL.startPointDataContainer}
                                    >

                                        {/* 起點 StartPos*/}
                                        <MapGoogleInput
                                            placeholder={"請輸入搭車地點(XX市XX區XX路XX號)"}
                                            placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // 接後端的API
                                            // viewType
                                            // disable
                                            topLabel={"地址"}
                                            baseDefaultTheme={"DefaultTheme"}
                                            value={globalContextService.get("AddCaseFastCallCarPage", "StartPos") ?? ""}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("AddCaseFastCallCarPage", "StartPos", value);
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

                                                globalContextService.set("AddCaseFastCallCarPage", "StartPos", option.label);

                                                getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、陪同人數皆已有有值，則帶回 本日行程一覽 Table資料

                                                setForceUpdate(f => !f)
                                            }}

                                            theme={laptopL.startPos}
                                        />

                                        {/* 起點備註 StartPosRemarks */}
                                        <NewSelector
                                            bascDefaultTheme={"DefaultTheme"}
                                            topLabel={<>起點備註</>}
                                            bottomLabel={""}
                                            //viewType
                                            isSearchable
                                            placeholder={"請選擇備註"}
                                            // isMulti
                                            // hideSelectedOptions={false}
                                            value={globalContextService.get("AddCaseFastCallCarPage", "StartPosRemarks") ?? null}
                                            onChange={(e, value, onInitial) => {
                                                if (value?.label === '其他') {
                                                    if (value?.label !== globalContextService.get("AddCaseFastCallCarPage", "StartPosRemarks")?.label) {
                                                        setForceUpdate(f => !f); // 剛選擇 起點備註 時，重新渲染
                                                    }
                                                }
                                                else if (globalContextService.get("AddCaseFastCallCarPage", "StartPosRemarks")?.label === '其他') {
                                                    setForceUpdate(f => !f); // 剛選擇 起點備註 時，重新渲染
                                                }
                                                globalContextService.set("AddCaseFastCallCarPage", "StartPosRemarks", value);

                                            }}

                                            options={[
                                                { value: 'hint', label: "請選擇備註", isDisabled: true },
                                                ...posRemarksSelectOption
                                                // ...Counties
                                            ]}
                                            // menuPosition={true}
                                            theme={laptopL.startPosRemarks}
                                        />

                                        {/* 起點備註 - 其他 OtherStartPosRemarks */}
                                        <TextInput
                                            topLabel={""}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="text"
                                            placeholder={"請輸入其他備註"}
                                            value={globalContextService.get("AddCaseFastCallCarPage", "OtherStartPosRemarks") ?? null}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("AddCaseFastCallCarPage", "OtherStartPosRemarks", value);
                                            }}
                                            theme={laptopL.otherStartPosRemarks}
                                        />
                                    </Container>
                                </SubContainer>

                                {/* 迄點容器 */}
                                <SubContainer
                                    theme={laptopL.endPointContainer}
                                >
                                    {/* 路線預覽按鈕 */}
                                    <NativeLineButton theme={laptopL.preViewtButton}
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
                                                //         fromAddr: globalContextService.get("AddCaseFastCallCarPage", "StartPos"),
                                                //         toAddr: globalContextService.get("AddCaseFastCallCarPage", "EndPos"),
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

                                    {/* 起訖點互換按鈕 */}
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
                                                let startAddr = globalContextService.get("AddCaseFastCallCarPage", "StartPos");
                                                let endAddr = globalContextService.get("AddCaseFastCallCarPage", "EndPos");

                                                globalContextService.set("AddCaseFastCallCarPage", "EndPos", startAddr);
                                                globalContextService.set("AddCaseFastCallCarPage", "StartPos", endAddr);

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
                                        <Convert style={laptopL.convertContainerIcon} />
                                    起訖點互換
                                </NativeLineButton>

                                    {/* 迄點 */}
                                    <Text
                                        theme={laptopL.todayToDoEnd}
                                    >
                                        <End style={laptopL.todayToDoEndSvg} />
                                    迄點
                                </Text>

                                    {/* 迄點內容容器 */}
                                    <Container
                                        theme={laptopL.endPointDataContainer}
                                    >
                                        {/* 迄點 EndPos*/}
                                        <MapGoogleInput
                                            placeholder={"請輸入下車地點(XX市XX區XX路XX號)"}
                                            placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // 接後端的API
                                            // viewType
                                            // disable
                                            topLabel={"地址"}
                                            baseDefaultTheme={"DefaultTheme"}
                                            value={globalContextService.get("AddCaseFastCallCarPage", "EndPos") ?? ""}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("AddCaseFastCallCarPage", "EndPos", value);
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

                                                globalContextService.set("AddCaseFastCallCarPage", "EndPos", option.label);

                                                getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、陪同人數皆已有有值，則帶回 本日行程一覽 Table資料

                                                setForceUpdate(f => !f)
                                            }}

                                            theme={laptopL.endPos}
                                        />

                                        {/* 迄點備註 EndPosRemarks */}
                                        <NewSelector
                                            bascDefaultTheme={"DefaultTheme"}
                                            topLabel={<>迄點備註</>}
                                            bottomLabel={""}
                                            //viewType
                                            isSearchable
                                            placeholder={"請選擇備註"}
                                            // isMulti
                                            // hideSelectedOptions={false}
                                            value={globalContextService.get("AddCaseFastCallCarPage", "EndPosRemarks") ?? null}
                                            onChange={(e, value, onInitial) => {
                                                if (value?.label === '其他') {
                                                    if (value?.label !== globalContextService.get("AddCaseFastCallCarPage", "EndPosRemarks")?.label) {
                                                        setForceUpdate(f => !f); // 剛選擇 迄點備註 時，重新渲染
                                                    }
                                                }
                                                else if (globalContextService.get("AddCaseFastCallCarPage", "EndPosRemarks")?.label === '其他') {
                                                    setForceUpdate(f => !f); // 剛選擇 迄點備註 時，重新渲染
                                                }
                                                globalContextService.set("AddCaseFastCallCarPage", "EndPosRemarks", value);

                                            }}

                                            options={[
                                                { value: 'hint', label: "請選擇備註", isDisabled: true },
                                                ...posRemarksSelectOption
                                                // ...Counties
                                            ]}
                                            // menuPosition={true}
                                            theme={laptopL.endPosRemarks}
                                        />

                                        {/* 迄點備註 - 其他 OtherEndPosRemarks */}
                                        <TextInput
                                            topLabel={""}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="text"
                                            placeholder={"請輸入其他備註"}
                                            value={globalContextService.get("AddCaseFastCallCarPage", "OtherEndPosRemarks") ?? null}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("AddCaseFastCallCarPage", "OtherEndPosRemarks", value);
                                            }}
                                            theme={laptopL.otherEndPosRemarks}
                                        />

                                    </Container>

                                </SubContainer>

                            </Container>

                            <Container>
                                {/* 行程資料容器 */}
                                <SubContainer
                                    baseDefaultTheme={"DefaultTheme"}
                                    theme={laptopL.strokeDataContainer}
                                >

                                    <Container>

                                        {/* 願意共乘 CanShareEquipment */}
                                        <Checkbox
                                            // viewType
                                            checked={globalContextService.get("AddCaseFastCallCarPage", "CanShareEquipment")}
                                            // disable
                                            topLabel={""}
                                            onChange={(e, value, onInitial) => {
                                                // console.log(value)
                                                globalContextService.set("AddCaseFastCallCarPage", "CanShareEquipment", value);
                                            }}
                                            theme={laptopL.canShareEquipment}
                                        >
                                            {/* 願意共乘 CarEquipment  選項 */}
                                            <CheckboxItem value={"canShare"} >願意共乘</CheckboxItem>
                                        </Checkbox>

                                        {/* 預約回程 ReturnTipEquipment */}
                                        <Checkbox
                                            // viewType
                                            checked={globalContextService.get("AddCaseFastCallCarPage", "ReturnTipEquipment")}
                                            // disable
                                            topLabel={""}
                                            onChange={(e, value, onInitial) => {
                                                // console.log(value)
                                                globalContextService.set("AddCaseFastCallCarPage", "ReturnTipEquipment", value);
                                            }}
                                            theme={laptopL.returnTipEquipment}
                                        >
                                            {/* 預約回程 CarEquipment  選項 */}
                                            <CheckboxItem value={"returnTip"} >預約回程(回居住地址)</CheckboxItem>
                                        </Checkbox>


                                        {/* 回程乘車時間 標題 */}
                                        <Text
                                            theme={laptopL.returnDateTitle}
                                        >
                                            回程乘車時間

                                            {/* 回程乘車時間 ReturnTravelTime */}
                                            <NewSelector
                                                bascDefaultTheme={"DefaultTheme"}
                                                topLabel={""}
                                                bottomLabel={""}
                                                //viewType
                                                isSearchable
                                                placeholder={""}
                                                // isMulti
                                                // hideSelectedOptions={false}
                                                value={globalContextService.get("AddCaseFastCallCarPage", "ReturnTravelTime") ?? null}
                                                onChange={(e, value, OnInitial) => {
                                                    globalContextService.set("AddCaseFastCallCarPage", "ReturnTravelTime", value);
                                                }}

                                                options={[
                                                    ...tenMinTimes
                                                        .filter((X) => {

                                                            if (moment(globalContextService.get("AddCaseFastCallCarPage", "TravelDate") + " " + X.value).isBefore(moment())) {
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
                                        </Text>

                                    </Container>

                                    <Container>

                                        {/* 車種 標題 */}
                                        <Text
                                            theme={laptopL.carTypeTitle}
                                        >
                                            車種

                                        {/* 車種 CarType */}
                                            <NewSelector
                                                bascDefaultTheme={"DefaultTheme"}
                                                topLabel={""}
                                                bottomLabel={""}
                                                //viewType
                                                isSearchable
                                                placeholder={"請選擇車種類型"}
                                                // isMulti
                                                // hideSelectedOptions={false}
                                                value={globalContextService.get("AddCaseFastCallCarPage", "CarType") ?? null}
                                                onChange={(e, value, onInitial) => {
                                                    // console.log(value?.label)
                                                    // console.log(globalContextService.get("AddCaseFastCallCarPage", "CarType"))
                                                    if (!isEqual(value, globalContextService.get("AddCaseFastCallCarPage", "CarType"))) {
                                                        globalContextService.remove("AddCaseFastCallCarPage", "Wheelchair")
                                                        globalContextService.set("AddCaseFastCallCarPage", "CarType", value);
                                                        setForceUpdate(f => !f); // 剛選擇 車種 時，重新渲染
                                                    }
                                                }}

                                                options={[
                                                    { value: 'hint', label: "請選擇車種類型", isDisabled: true },
                                                    // ...props?.CarType
                                                    // ...Counties
                                                ]}
                                                // menuPosition={true}
                                                theme={laptopL.carType}
                                            />
                                        </Text>

                                        {/* 輪椅種類 標題 */}
                                        <Text
                                            theme={laptopL.wheelchairTitle}
                                        >
                                            輪椅種類
                                        {/* 輪椅種類 Wheelchair */}
                                            <NewSelector
                                                bascDefaultTheme={"DefaultTheme"}
                                                topLabel={""}
                                                bottomLabel={""}
                                                //viewType
                                                isSearchable
                                                placeholder={"請選擇輪椅"}
                                                // isMulti
                                                // hideSelectedOptions={false}
                                                value={globalContextService.get("AddCaseFastCallCarPage", "Wheelchair") ?? null}
                                                onChange={(e, value, onInitial) => {
                                                    globalContextService.set("AddCaseFastCallCarPage", "Wheelchair", value);
                                                    // console.log("請選擇居住縣市", value, globalContextService.get("CaseEditPage", "County"))
                                                }}
                                                options={
                                                    [
                                                        { value: 'hint', label: "請選擇輪椅", isDisabled: true },
                                                        ...(
                                                            (
                                                                globalContextService.get("AddCaseFastCallCarPage", "CarType")?.label === "一般車"
                                                                    ?
                                                                    [
                                                                        { value: '無', label: "無" },
                                                                        { value: '普通輪椅(可收折)', label: "普通輪椅(可收折)" },
                                                                    ]
                                                                    :
                                                                    (
                                                                        globalContextService.get("AddCaseFastCallCarPage", "CarType")?.label === "福祉車"
                                                                            ?
                                                                            [
                                                                                { value: '無', label: "無" },
                                                                                { value: '普通輪椅(可收折)', label: "普通輪椅(可收折)" },
                                                                                { value: '高背輪椅', label: "高背輪椅" },
                                                                                { value: '電動輪椅', label: "電動輪椅" },
                                                                                { value: '電動高背輪椅', label: "電動高背輪椅" },
                                                                            ]
                                                                            :
                                                                            []
                                                                    )
                                                            )
                                                        )
                                                    ]
                                                }
                                                // menuPosition={true}
                                                theme={laptopL.wheelchair}
                                            />
                                        </Text>

                                        {/* 陪同人數 標題 */}
                                        <Text
                                            theme={laptopL.accompanyCountsTitle}
                                        >
                                            陪同人數
                                        {/* 陪同人數 AccompanyCounts */}
                                            <NewSelector
                                                bascDefaultTheme={"DefaultTheme"}
                                                topLabel={""}
                                                bottomLabel={""}
                                                //viewType
                                                isSearchable
                                                placeholder={"0人"}
                                                // isMulti
                                                // hideSelectedOptions={false}
                                                value={globalContextService.get("AddCaseFastCallCarPage", "AccompanyCounts") ?? null}
                                                onChange={(e, value, onInitial) => {

                                                    if ((!isEqual(value?.value, globalContextService.get("AddCaseFastCallCarPage", "AccompanyCounts")?.value))) {
                                                        globalContextService.set("AddCaseFastCallCarPage", "AccompanyCounts", value);
                                                        getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、陪同人數皆已有有值，則帶回 本日行程一覽 Table資料
                                                    }
                                                }
                                                }

                                                options={[
                                                    { value: 'hint', label: "請選擇陪同人數", isDisabled: true },
                                                    { value: 0, label: "0人" },
                                                    { value: 1, label: "1人" },
                                                    { value: 2, label: "2人" },
                                                    { value: 3, label: "3人" },
                                                    { value: 4, label: "4人" },
                                                    { value: 5, label: "5人" },
                                                    { value: 6, label: "6人" },
                                                    { value: 7, label: "7人" },
                                                ]}
                                                // menuPosition={true}
                                                theme={laptopL.accompanyCounts}
                                            />
                                        </Text>

                                        {/* 接收簡訊號碼 標題 */}
                                        <Text
                                            theme={laptopL.smsNumberTitle}
                                        >
                                            接收簡訊號碼

                                        {/* 接收簡訊號碼 SmsNumber */}
                                            <TextInput

                                                topLabel={""}
                                                baseDefaultTheme={"DefaultTheme"}
                                                type="text"
                                                placeholder={"請輸入手機號碼"}
                                                value={globalContextService.get("AddCaseFastCallCarPage", "SmsNumber") ?? null}
                                                onChange={(e, value, onInitial) => {
                                                    globalContextService.set("AddCaseFastCallCarPage", "SmsNumber", value);
                                                }}
                                                theme={laptopL.smsNumber}
                                            />
                                        </Text>

                                        <Text
                                            theme={laptopL.accompanyCountsRequired}
                                        >
                                            註：陪同人數
                                            <Text
                                                theme={laptopL.accompanyCountsRequired.red}
                                            >
                                                第一人免費、第二人自費加價50元、第三人(含)及以上每位自費加價200元。
                                            </Text>
                                        </Text>

                                    </Container>

                                </SubContainer>

                                {/* Table 容器 */}
                                <SubContainer
                                    bascDefaultTheme={"DefaultTheme"}
                                    // open={props.TodayToDoOpen}
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
                                                globalContextService.set("AddCaseFastCallCarPage", "CheckedRowKeys", checkedRowKeys);
                                                globalContextService.set("AddCaseFastCallCarPage", "CheckedRowsData", checkedRows);
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
                                                    title: '總額',
                                                    width: "calc( 20% - 12px )",
                                                    dataIndex: 'totalAmt',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `$${rowData}` : ""
                                                    }
                                                },
                                                {
                                                    title: '補助',
                                                    width: "calc( 20% - 12px )",
                                                    dataIndex: 'subsidyAmt',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `$${rowData}` : ""
                                                    }
                                                },
                                                {
                                                    title: '自負',
                                                    width: "calc( 20% - 12px )",
                                                    dataIndex: 'selfPayAmt',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `$${rowData}` : ""
                                                    }
                                                },
                                                {
                                                    title: '陪同',
                                                    width: "calc( 20% - 12px )",
                                                    dataIndex: 'withAmt',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
                                                    render: (rowData) => {
                                                        return !isNil(rowData) ? `$${rowData}` : ""
                                                    }
                                                },
                                                {
                                                    title: '個案負擔',
                                                    width: "calc( 20% - 12px )",
                                                    // dataIndex: 'seatNum',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    fixed: 'right',
                                                    render: (rowData) => {
                                                        return (

                                                            <Text
                                                                theme={laptopL.redText}
                                                            >
                                                                {!isNil(rowData?.withAmt) ? `$${rowData?.withAmt + rowData?.selfPayAmt}` : ""}
                                                            </Text>

                                                        )
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
                                        // data={props.CaseOrderAmt}
                                        clickPage={(currentPage, pageSize) => {
                                        }}
                                    />
                                </SubContainer>
                            </Container>

                        </BasicContainer>

                    </BasicContainer>

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
                                let validMsg = formValid();
                                //#region 表單驗證後動作
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
                                    // 去程
                                    // props.AddOrderOfCaseUsersExecute({
                                    //     // id: "", // 訂單id，新增無須上送
                                    //     userId: props.UserId, // 用戶id
                                    //     caseUserId: props.CaseUserId, // 長照身份id
                                    //     orgId: "", // 送空字串
                                    //     reserveDate: globalContextService.get("AddCaseFastCallCarPage", "TravelDate") + " " + globalContextService.get("AddCaseFastCallCarPage", "TravelTime"), // 預約日期+預約時間	如: "2020-11-25 17:45",
                                    //     transOrgs: globalContextService.get("AddCaseFastCallCarPage", "BUnitSort")?.map(item => item?.id), // 優先搭乘車行排序
                                    //     createdIdentity: globalContextService.get("AddCaseFastCallCarPage", "Orderer")?.value, // 訂車人身分
                                    //     fromAddr: globalContextService.get("AddCaseFastCallCarPage", "StartPos"), // 起點
                                    //     fromAddrRemark: (
                                    //         globalContextService.get("AddCaseFastCallCarPage", "StartPosRemarks")?.label === "其他" ?
                                    //             globalContextService.get("AddCaseFastCallCarPage", "OtherStartPosRemarks")
                                    //             :
                                    //             globalContextService.get("AddCaseFastCallCarPage", "StartPosRemarks")?.value
                                    //     ), // 起點備註 (含備註 - 其他)
                                    //     toAddr: globalContextService.get("AddCaseFastCallCarPage", "EndPos"), // 迄點
                                    //     toAddrRemark: (
                                    //         globalContextService.get("AddCaseFastCallCarPage", "EndPosRemarks")?.label === "其他" ?
                                    //             globalContextService.get("AddCaseFastCallCarPage", "OtherEndPosRemarks")
                                    //             :
                                    //             globalContextService.get("AddCaseFastCallCarPage", "EndPosRemarks")?.value
                                    //     ), // 迄點備註 (含備註 - 其他)
                                    //     remark: "", // 無此欄位
                                    //     isBack: globalContextService.get("AddCaseFastCallCarPage", "ScheduleReturnReview") === 1 ? true : false, //我要預約回程 
                                    //     canShared: globalContextService.get("AddCaseFastCallCarPage", "RideTogetherReview") === 1 ? true : false, // 願意共乘
                                    //     carCategoryId: globalContextService.get("AddCaseFastCallCarPage", "CarType")?.value, // 車種id
                                    //     carCategoryName: globalContextService.get("AddCaseFastCallCarPage", "CarType")?.label, // 車種名稱
                                    //     wheelchairType: globalContextService.get("AddCaseFastCallCarPage", "Wheelchair")?.value, // 輪椅
                                    //     familyWith: globalContextService.get("AddCaseFastCallCarPage", "AccompanyCounts")?.value, // 陪同人數
                                    //     noticePhone: globalContextService.get("AddCaseFastCallCarPage", "SmsNumber"), // 簡訊號碼
                                    //     haveNextOrderFlag: false, // 立即預約 按鈕發送
                                    //     isBackOrder: false, // 立即預約 按鈕發送 (去程)
                                    // })

                                    // //回程
                                    // props.AddOrderOfCaseUsersExecute({
                                    //     // id: "", // 訂單id，新增無須上送
                                    //     userId: props.UserId, // 用戶id
                                    //     caseUserId: props.CaseUserId, // 長照身份id
                                    //     orgId: "", // 送空字串
                                    //     reserveDate: globalContextService.get("AddCaseFastCallCarPage", "TravelDate") + " " + globalContextService.get("AddCaseFastCallCarPage", "ReturnTravelTime"), // 預約日期+預約回程時間	如: "2020-11-25 17:45",
                                    //     transOrgs: globalContextService.get("AddCaseFastCallCarPage", "BUnitSort")?.map(item => item?.id), // 優先搭乘車行排序
                                    //     createdIdentity: globalContextService.get("AddCaseFastCallCarPage", "Orderer")?.value, // 訂車人身分
                                    //     fromAddr: globalContextService.get("AddCaseFastCallCarPage", "EndPos"), // 起點
                                    //     fromAddrRemark: (
                                    //         globalContextService.get("AddCaseFastCallCarPage", "EndPosRemarks")?.label === "其他" ?
                                    //             globalContextService.get("AddCaseFastCallCarPage", "OtherEndPosRemarks")
                                    //             :
                                    //             globalContextService.get("AddCaseFastCallCarPage", "EndPosRemarks")?.value
                                    //     ), // 起點備註 (含備註 - 其他)
                                    //     toAddr: `${props?.CaseUsers?.county}${props?.CaseUsers?.district}${props?.CaseUsers?.addr}`,
                                    //     toAddrRemark: "住家",
                                    //     remark: "", // 無此欄位
                                    //     isBack: globalContextService.get("AddCaseFastCallCarPage", "ScheduleReturnReview") === 1 ? true : false, //我要預約回程 
                                    //     canShared: globalContextService.get("AddCaseFastCallCarPage", "RideTogetherReview") === 1 ? true : false, // 願意共乘
                                    //     carCategoryId: globalContextService.get("AddCaseFastCallCarPage", "CarType")?.value, // 車種id
                                    //     carCategoryName: globalContextService.get("AddCaseFastCallCarPage", "CarType")?.label, // 車種名稱
                                    //     wheelchairType: globalContextService.get("AddCaseFastCallCarPage", "Wheelchair")?.value, // 輪椅
                                    //     familyWith: globalContextService.get("AddCaseFastCallCarPage", "AccompanyCounts")?.value, // 陪同人數
                                    //     noticePhone: globalContextService.get("AddCaseFastCallCarPage", "SmsNumber"), // 簡訊號碼
                                    //     haveNextOrderFlag: false, // 立即預約 按鈕發送
                                    //     isBackOrder: true, // 立即預約 按鈕發送 (回程)
                                    // })
                                }
                            }}
                        >
                            儲存
                        </NativeLineButton>
                    </BasicContainer>

                    <BasicContainer
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

                    </BasicContainer>

                </BasicContainer>
            </BasicContainer>

        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`