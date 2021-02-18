import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Checkbox, Container, Text, TitleModal, globalContextService, OldTable, Tag, Radio, FormContainer, FormRow, TextInput, SubContainer, CheckboxItem, Selector, DateTimePicker, modalsService, RadioItem } from '../../Components';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as Search } from './Assets/img/Search.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { isNil, isUndefined, isEqual } from 'lodash';
import moment from 'moment';
import { CarOrder } from '../CarOrder/CarOrder';
import { getParseItemLocalStorage, valid } from '../../Handlers';
import { Map8Canvas, map8Controll, Map8Input } from '../Map8Canvas/Map8Canvas';
// import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
// import SuccessTheme from './Theme/SuccessTheme'
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "SecondaryTheme":
        //     return SecondaryTheme;
        // case "SuccessTheme":
        //     return SuccessTheme;
        // case "BasicButtonDisableTheme":
        //     return BasicButtonDisableTheme;
        // case "PrimaryTheme":
        //     return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region 組織樹遍歷
const WhiteOrderEditTitleModalBase = (props) => {

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    const EscapeFristRender = useRef(0); // 過濾初次渲染，跳過不執行，因為 上一次 AssignCheckedRowKeys若不為空，會直接吃到上一次的陣列

    //#region 狀態對應顏色
    const statusMapping = {
        1: "#fa8c16", // 新訂單
        2: "#1890ff", // 已排班
        3: "#1890ff", // 抵達搭車地點
        4: "#d4380d", // 客上
        5: "#8c8c8c", // 已完成
        9: "#", // 已取消
    }
    //#endregion

    return (
        <>
            <TitleModal
                //id: "top1",
                title={"編輯訂單"}
                yes={true}
                yesText={"確認"}
                no={true}
                noText={"取消"}
                // autoClose={ true},
                backgroundClose={false}
                noOnClick={(e) => {
                    props.controllGCS("editOrderModalClose")
                    props.setOpenWhiteOrderEditTitleModal(false);
                }}
                yesOnClick={(e, close) => {

                    globalContextService.set("WhiteConsolePage", "CloseWhiteOrderEditTitleModal", props.setOpenWhiteOrderEditTitleModal);

                    //#region 表單驗證
                    let validMsg = "";
                    if (valid(globalContextService.get("WhiteConsolePage", "DispatchEditTravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
                        validMsg = valid(globalContextService.get("WhiteConsolePage", "DispatchEditTravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
                    }
                    else if (valid(globalContextService.get("WhiteConsolePage", "DispatchEditTravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
                        validMsg = valid(globalContextService.get("WhiteConsolePage", "DispatchEditTravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
                    }
                    else if (valid(globalContextService.get("WhiteConsolePage", "DispatchEditOrderStartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]) {
                        validMsg = valid(globalContextService.get("WhiteConsolePage", "DispatchEditOrderStartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]
                    }
                    else if (valid(globalContextService.get("WhiteConsolePage", "DispatchEditOrderEndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]) {
                        validMsg = valid(globalContextService.get("WhiteConsolePage", "DispatchEditOrderEndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]
                    }
                    // else if (map8Controll.getMarkerPoints("test1").length !== 2) {
                    //     validMsg = "請重新輸入起訖地址"
                    // }
                    else if (valid(globalContextService.get("WhiteConsolePage", "DispatchEditOrderCarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]) {
                        validMsg = valid(globalContextService.get("WhiteConsolePage", "DispatchEditOrderCarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]
                    }
                    else if (valid(globalContextService.get("WhiteConsolePage", "DispatchEditOrderPhone") ?? "", ["^.{1,}$"], ["請輸入聯絡電話"])[1]) {
                        validMsg = valid(globalContextService.get("WhiteConsolePage", "DispatchEditOrderPhone") ?? "", ["^.{1,}$"], ["請輸入聯絡電話"])[1]
                    }
                    else if (valid(globalContextService.get("WhiteConsolePage", "DispatchEditAccTotalCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]) {
                        validMsg = valid(globalContextService.get("WhiteConsolePage", "DispatchEditAccTotalCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]
                    }
                    else if (
                        !(
                            (Array(globalContextService.get("WhiteConsolePage", "DispatchEditAccTotalCounts")?.value)).fill(0)
                                .map((item, index) => {
                                    // 必須保留多種檢核的可能，不能只有寫死檢核必輸
                                    return [
                                        valid(globalContextService.get("WhiteConsolePage", `DispatchEditTakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車姓名${index + 1}`])[1],
                                        valid(globalContextService.get("WhiteConsolePage", `DispatchEditTakerBrithday_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車生日${index + 1}`])[1]
                                    ]
                                }).flat().every(V => (V === null))
                        )
                    ) {

                        validMsg = (Array(globalContextService.get("WhiteConsolePage", "DispatchEditAccTotalCounts")?.value)).fill(0)
                            .map((item, index) => {
                                return [
                                    valid(globalContextService.get("WhiteConsolePage", `DispatchEditTakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車姓名${index + 1}`])[1],
                                    valid(globalContextService.get("WhiteConsolePage", `DispatchEditTakerBrithday_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車生日${index + 1}`])[1]
                                ]
                            }).flat().filter(v => v !== null)[0]; // 拿第一個檢核不通過的錯誤訊息
                    }

                    //#endregion

                    //#region 表單驗證後動作
                    if (validMsg !== "") {
                        // console.log(validMsg, globalContextService.get("WhiteConsolePage"))
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

                        //  !!!!!!!!!!!! 暫時拔掉經緯度
                        props.UpdateEditOrderExecute({
                            ...props.rowData,
                            CarCategoryName: globalContextService.get("WhiteConsolePage", "DispatchEditOrderCarType").label, //車種 的 label
                            canShared: globalContextService.get("WhiteConsolePage", "DispatchEditOrderRideTogetherReview") === 1 ? true : false, //願意共乘
                            carCategoryId: globalContextService.get("WhiteConsolePage", "DispatchEditOrderCarType").value,	//車種 的 value
                            date: globalContextService.get("WhiteConsolePage", "DispatchEditTravelDate"), //預約日期
                            fromAddr: globalContextService.get("WhiteConsolePage", "DispatchEditOrderStartPos"), //	起點
                            fromLat: map8Controll.getMarkerPoints("test1")?.[0]?.[1] ?? 0, //起點緯度
                            fromLon: map8Controll.getMarkerPoints("test1")?.[0]?.[0] ?? 0,//起點經度
                            // id: ""	白牌預約訂單 id
                            noticePhone: globalContextService.get("WhiteConsolePage", "DispatchEditOrderPhone"),
                            // orgId: "",//	畫面無此欄位
                            passengerNum: globalContextService.get("WhiteConsolePage", "DispatchEditAccTotalCounts").value,	//搭乘人數
                            remark: JSON.stringify((Array(globalContextService.get("WhiteConsolePage", "DispatchEditAccTotalCounts")?.value)).fill(0).map((item, index) => {
                                return {
                                    name: globalContextService.get("WhiteConsolePage", `DispatchEditTakerName_${index + 1}`),
                                    birth: globalContextService.get("WhiteConsolePage", `DispatchEditTakerBrithday_${index + 1}`)
                                }
                            })),	//搭乘人員資訊陣列
                            reserveDate: `${globalContextService.get("WhiteConsolePage", "DispatchEditTravelDate")} ${globalContextService.get("WhiteConsolePage", "DispatchEditTravelTime")}`,	//預約日期+ 預約時間
                            // selfPayUserId: props.CaseUserId, //白牌個案id
                            // status: 1,	//畫面無此欄位
                            time: globalContextService.get("WhiteConsolePage", "DispatchEditTravelTime"), //預約時間
                            toAddr: globalContextService.get("WhiteConsolePage", "DispatchEditOrderEndPos"), //	迄點
                            // toLat: map8Controll.getMarkerPoints("test1")[1][0],//	迄點緯度
                            // toLon: map8Controll.getMarkerPoints("test1")[1][1],//	迄點經度
                            // userId: props.UserId
                        })
                    }
                    //#endregion
                }}
                closeIconOnClick={(e) => {
                    props.controllGCS("editOrderModalClose")
                    props.setOpenWhiteOrderEditTitleModal(false);
                }}
                content={(
                    <>
                        <FormContainer
                            baseDefaultTheme={"DefaultTheme"}
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                        // theme={laptopL.editFormContainer}
                        >
                            <Map8Canvas
                                mapId={"test1"}
                                mapAttr={{
                                    maxBounds: [[105, 15], [138.45858, 33.4]], // 台灣地圖區域
                                    center: [121.474708, 25.012930], // 初始中心座標，格式為 [lng, lat]  // 25.012930, 121.474708
                                    zoom: 16, // 初始 ZOOM LEVEL; [0-20, 0 為最小 (遠), 20 ;最大 (近)]
                                    minZoom: 6, // 限制地圖可縮放之最小等級, 可省略, [0-19.99]
                                    maxZoom: 19.99, // 限制地圖可縮放之最大等級, 可省略 [0-19.99]
                                    pitch: 0, // 攝影機仰角, 可省略, [0-60] // default 50
                                    bearing: 0, // 地圖角度, 可省略, [-180 ~ 180; 0 為正北朝上, 180 為正南朝上]
                                    attributionControl: false,
                                }}

                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "map") }}
                            />

                            {/* 訂單組件 */}
                            <CarOrder
                                mainColor={statusMapping[props.rowData.status]}
                                title={
                                    <>
                                        {/* 訂單編號 */}
                                        <Text
                                            theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditOrderNo") }}
                                        >
                                            {`訂單編號  ${props.rowData.orderNo}`}
                                        </Text>
                                    </>
                                }
                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditCarOrder") }}
                            >
                                <Container>
                                    {/* 訂單組件左半邊容器 */}
                                    <SubContainer theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditLeftContainer") }} >

                                        {/* 訂單姓名 */}
                                        <Text theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditOrderName") }} >
                                            {props.rowData.userName}
                                        </Text>

                                        <Container>

                                            {/* 聯絡電話 Phone */}
                                            <TextInput
                                                topLabel={<>聯絡電話</>}
                                                baseDefaultTheme={"DefaultTheme"}
                                                type="text"
                                                placeholder={"請輸入電話號碼"}
                                                value={globalContextService.get("WhiteConsolePage", "DispatchEditOrderPhone") ?? props.rowData.noticePhone}
                                                onChange={(e, value, onInitial) => {
                                                    globalContextService.set("WhiteConsolePage", "DispatchEditOrderPhone", value);
                                                }}
                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditOrderPhone") }}
                                            />

                                            {/* 車種 CarType */}
                                            <Selector
                                                bascDefaultTheme={"DefaultTheme"}
                                                topLabel={<>車種</>}
                                                bottomLabel={""}
                                                //viewType
                                                isSearchable
                                                placeholder={"請選擇車種類型"}
                                                // isMulti
                                                // hideSelectedOptions={false}
                                                value={globalContextService.get("WhiteConsolePage", "DispatchEditOrderCarType") ?? { value: props.rowData.carCategoryId, label: props.rowData.carCategoryName }}
                                                onChange={(e, value, onInitial) => {
                                                    // console.log(props?.AllCarType)
                                                    globalContextService.set("WhiteConsolePage", "DispatchEditOrderCarType", value);
                                                }}

                                                options={[
                                                    { value: '0', label: "請選擇車種類型", isDisabled: true },
                                                    ...props?.AllCarType
                                                ]}
                                                menuPosition={true}
                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditOrderCarType") }}
                                            />

                                            {/* 願意共乘 RideTogetherReview */}
                                            <Radio
                                                // viewType
                                                // disable
                                                topLabel={"願意共乘"}
                                                value={(props.rowData.canShared ? 1 : 0)}
                                                onChange={(e, value, onInitial) => {
                                                    // console.log(value)
                                                    globalContextService.set("WhiteConsolePage", "DispatchEditOrderRideTogetherReview", value);
                                                    // console.log(globalContextService.get("CarsAddPage", "CarReview"));
                                                }}
                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditOrderRideTogetherReview") }}
                                            >
                                                {/* 願意共乘 RideTogetherReview  選項 */}
                                                <RadioItem value={1} >是</RadioItem>
                                                <RadioItem value={0} >否</RadioItem>
                                            </Radio>

                                            {/* 起點 StartPos*/}
                                            <Map8Input
                                                placeholder={"請輸入搭車地點(XX市XX區XX路XX號)"}

                                                // viewType
                                                // disable
                                                topLabel={"起點"}
                                                baseDefaultTheme={"DefaultTheme"}
                                                value={globalContextService.get("WhiteConsolePage", "DispatchEditOrderStartPos") ?? props.rowData.fromAddr}
                                                onChange={(e, value, onInitial) => {
                                                    globalContextService.set("WhiteConsolePage", "DispatchEditOrderStartPos", value);
                                                }}
                                                onSelect={(e, option, onInitial, posInfo) => {
                                                    map8Controll.addOrUpdateMarkerPoints("test1", [
                                                        [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat],
                                                        ...(map8Controll.getMarkerPoints("test1")?.[1] ? [map8Controll.getMarkerPoints("test1")[1]] : []),
                                                    ]) // 更新選中起點
                                                    map8Controll.setCenter("test1", [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat]); // 移動中心點
                                                    map8Controll.removeOneRoute("test1"); // 移除路線

                                                    globalContextService.set("WhiteConsolePage", "DispatchEditOrderStartPos", option.label);
                                                    setForceUpdate(f => !f)
                                                }}

                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditOrderStartPos") }}
                                            />

                                            {/* 迄點 EndPos*/}
                                            <Map8Input
                                                placeholder={"請輸入下車地點(XX市XX區XX路XX號)"}

                                                // viewType
                                                // disable
                                                topLabel={"迄點"}
                                                baseDefaultTheme={"DefaultTheme"}
                                                value={globalContextService.get("WhiteConsolePage", "DispatchEditOrderEndPos") ?? props.rowData.toAddr}
                                                onChange={(e, value, onInitial) => {
                                                    globalContextService.set("WhiteConsolePage", "DispatchEditOrderEndPos", value);
                                                }}
                                                onSelect={(e, option, onInitial, posInfo) => {
                                                    map8Controll.addOrUpdateMarkerPoints("test1", [
                                                        ...(map8Controll.getMarkerPoints("test1")?.[0] ? [map8Controll.getMarkerPoints("test1")[0]] : []),
                                                        [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat],
                                                    ]) // 更新選中起點
                                                    globalContextService.set("WhiteConsolePage", "EndPos", option.label);
                                                    map8Controll.setCenter("test1", [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat]); // 移動中心點
                                                    map8Controll.removeOneRoute("test1"); // 移除路線

                                                    setForceUpdate(f => !f)
                                                }}

                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditOrderEndPos") }}
                                            />

                                            {!isNil(globalContextService.get("WhiteConsolePage", "DispatchEditAccTotalCounts") ?? JSON.parse(props.rowData.remark ?? "[]").length)
                                                &&
                                                (Array(globalContextService.get("WhiteConsolePage", "DispatchEditAccTotalCounts")?.value ?? JSON.parse(props.rowData.remark ?? "[]").length)).fill(0).map((item, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            {/* 搭車姓名 TakerName */}
                                                            <TextInput
                                                                topLabel={`搭車姓名${index + 1}`}
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                type="text"
                                                                placeholder={``}
                                                                value={globalContextService.get("WhiteConsolePage", `DispatchEditTakerName_${index + 1}`) ??
                                                                    (JSON.parse(props.rowData.remark ?? "[]")?.[index]?.name ?? null)
                                                                }
                                                                onChange={(e, value, onInitial) => {
                                                                    globalContextService.set("WhiteConsolePage", `DispatchEditTakerName_${index + 1}`, value);
                                                                }}

                                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditTakerName") }}
                                                            />

                                                            {/* 搭車生日 TakerBrithday */}
                                                            <DateTimePicker
                                                                topLabel={`搭車生日${index + 1}`}
                                                                // type={"time"} time、date、week、month、quarter、year
                                                                type={"date"}
                                                                format={"YYYY-MM-DD"}
                                                                bascDefaultTheme={"DefaultTheme"}
                                                                // viewType
                                                                isSearchable
                                                                placeholder={""}
                                                                value={
                                                                    (globalContextService.get("WhiteConsolePage", `DispatchEditTakerBrithday_${index + 1}`)) ?
                                                                        moment(globalContextService.get("WhiteConsolePage", `DispatchEditTakerBrithday_${index + 1}`), "YYYY-MM-DD HH:mm:ss")
                                                                        :
                                                                        (
                                                                            JSON.parse(props.rowData.remark ?? "[]")?.[index]?.birth
                                                                                ?
                                                                                moment(JSON.parse(props.rowData.remark ?? "[]")?.[index]?.birth, "YYYY-MM-DD")
                                                                                :
                                                                                null
                                                                        )
                                                                }
                                                                onChange={(value, momentObj) => {
                                                                    globalContextService.set("WhiteConsolePage", `DispatchEditTakerBrithday_${index + 1}`, value);
                                                                }}
                                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditTakerBrithday") }}
                                                            />
                                                        </React.Fragment>
                                                    )
                                                })
                                            }

                                        </Container>

                                    </SubContainer>

                                    {/* 訂單組件右半邊容器 */}
                                    <SubContainer theme={{ ...iterateTheme({ ...props, height: (globalContextService.get("WhiteConsolePage", "DispatchEditAccTotalCounts")?.value ?? JSON.parse(props.rowData.remark ?? "[]").length) }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditRightContainer") }}>

                                        <Container>
                                            {/* 訂單乘車日期 DispatchEditTravelDate */}
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
                                                    (globalContextService.get("WhiteConsolePage", "DispatchEditTravelDate")) ?
                                                        moment(globalContextService.get("WhiteConsolePage", "DispatchEditTravelDate"), "YYYY-MM-DD HH:mm:ss")
                                                        :
                                                        moment(props.rowData.reserveDate, "YYYY-MM-DD HH:mm:ss")
                                                }
                                                onChange={(value, momentObj, onInitial) => {
                                                    if (!isEqual(value, globalContextService.get("WhiteConsolePage", "DispatchEditTravelDate"))) {
                                                        globalContextService.set("WhiteConsolePage", "DispatchEditTravelDate", value);
                                                        if (!onInitial) {
                                                            globalContextService.set("WhiteConsolePage", "DispatchEditRoute", null)
                                                            globalContextService.set("WhiteConsolePage", "DispatchEditStartPos", null)
                                                            globalContextService.set("WhiteConsolePage", "DispatchEditEndPos", null)
                                                        }
                                                        setForceUpdate(f => !f);
                                                    }
                                                }}
                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditTravelDate") }}
                                            />

                                            {/* 訂單乘車時間 DispatchEditTravelTime */}
                                            <DateTimePicker
                                                topLabel={<>乘車時間</>}
                                                // type={"time"} time、date、week、month、quarter、year
                                                type={"time"}
                                                format={"HH:mm"}
                                                bascDefaultTheme={"DefaultTheme"}
                                                // viewType
                                                isSearchable
                                                placeholder={""}
                                                value={
                                                    (globalContextService.get("WhiteConsolePage", "DispatchEditTravelTime")) ?
                                                        moment(globalContextService.get("WhiteConsolePage", "DispatchEditTravelTime"), "HH:mm")
                                                        :
                                                        moment(props.rowData.reserveDate, "YYYY-MM-DD HH:mm:ss")
                                                }
                                                onChange={(value, momentObj) => {
                                                    globalContextService.set("WhiteConsolePage", "DispatchEditTravelTime", value);
                                                }}
                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditTravelTime") }}
                                            />

                                            {/* 訂單搭車人數 DispatchEditAccTotalCounts */}
                                            <Selector
                                                bascDefaultTheme={"DefaultTheme"}
                                                topLabel={"搭車人數"}
                                                //viewType
                                                menuPosition={true}
                                                isSearchable
                                                placeholder={"請選擇搭車人數"}
                                                // isMulti
                                                // hideSelectedOptions={false}
                                                value={globalContextService.get("WhiteConsolePage", "DispatchEditAccTotalCounts") ?? { value: props.rowData.passengerNum, label: `${props.rowData.passengerNum}人` }}
                                                onChange={(e, value, onInitial) => {
                                                    if (!isEqual(value, globalContextService.get("WhiteConsolePage", "DispatchEditAccTotalCounts"))) {
                                                        setForceUpdate(f => !f)
                                                    }
                                                    globalContextService.set("WhiteConsolePage", "DispatchEditAccTotalCounts", value);
                                                }}

                                                options={[
                                                    { value: 1, label: "1人" },
                                                    { value: 2, label: "2人" },
                                                    { value: 3, label: "3人" },
                                                    { value: 4, label: "4人" },
                                                    { value: 5, label: "5人" },
                                                    { value: 6, label: "6人" },
                                                    { value: 7, label: "7人" },
                                                    { value: 8, label: "8人" },
                                                ]}
                                                // menuPosition={true}
                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditAccTotalCounts") }}
                                            />

                                        </Container>
                                    </SubContainer>
                                </Container>
                            </CarOrder>
                        </FormContainer>
                    </>
                )}
                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditOrderModal") }}

            />
        </>

    )
}
//#endregion

//只給 OrgManagerPage 使用
export const WhiteOrderEditTitleModal = styled(WhiteOrderEditTitleModalBase).attrs((props) => ({}))`
`
//#endregion









