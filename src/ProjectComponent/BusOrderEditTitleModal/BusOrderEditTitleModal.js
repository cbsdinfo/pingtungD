import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Checkbox, Container, Text, TitleModal, globalContextService, OldTable, Tag, FormContainer, FormRow, TextInput, SubContainer, CheckboxItem, Selector, DateTimePicker, modalsService } from '../../Components';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as Search } from './Assets/img/Search.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { isNil, isUndefined, isEqual } from 'lodash';
import moment from 'moment';
import { CarOrder } from '../CarOrder/CarOrder';
import { valid } from '../../Handlers';
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
const BusOrderEditTitleModalBase = (props) => {

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
                    props.setOpenBusOrderEditTitleModal(false);
                }}
                yesOnClick={(e, close) => {

                    globalContextService.set("BusConsolePage", "CloseBusOrderEditTitleModal", props.setOpenBusOrderEditTitleModal);

                    //#region 表單驗證
                    let validMsg = "";
                    if (valid(globalContextService.get("BusConsolePage", "DispatchEditRoute")?.value ?? "", ["^.{1,}$"], ["請選擇路線"])[1]) {
                        validMsg = valid(globalContextService.get("BusConsolePage", "DispatchEditRoute")?.value ?? "", ["^.{1,}$"], ["請選擇路線"])[1]
                    }
                    else if (valid(globalContextService.get("BusConsolePage", "DispatchEditStartPos")?.value ?? "", ["^.{1,}$"], ["請選擇起點"])[1]) {
                        validMsg = valid(globalContextService.get("BusConsolePage", "DispatchEditStartPos")?.value ?? "", ["^.{1,}$"], ["請選擇起點"])[1]
                    }
                    else if (valid(globalContextService.get("BusConsolePage", "DispatchEditEndPos")?.value ?? "", ["^.{1,}$"], ["請選擇訖點"])[1]) {
                        validMsg = valid(globalContextService.get("BusConsolePage", "DispatchEditEndPos")?.value ?? "", ["^.{1,}$"], ["請選擇訖點"])[1]
                    }
                    else if (valid(globalContextService.get("BusConsolePage", "DispatchEditTravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
                        validMsg = valid(globalContextService.get("BusConsolePage", "DispatchEditTravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
                    }
                    else if (valid(globalContextService.get("BusConsolePage", "DispatchEditTravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
                        validMsg = valid(globalContextService.get("BusConsolePage", "DispatchEditTravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
                    }
                    else if (valid(globalContextService.get("BusConsolePage", "DispatchEditAccTotalCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]) {
                        validMsg = valid(globalContextService.get("BusConsolePage", "DispatchEditAccTotalCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]
                    }

                    //#endregion

                    //#region 表單驗證後動作
                    if (validMsg !== "") {
                        // console.log(validMsg, globalContextService.get("BusConsolePage"))
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
                        props.UpdateEditOrderExecute({
                            ...props.rowData,
                            busUserId: props.CaseUserId,// 幸福巴士個案id
                            date: globalContextService.get("BusConsolePage", "DispatchEditTravelDate"), // 預約日期
                            fromStationId: globalContextService.get("BusConsolePage", "DispatchEditStartPos").value, // 起點站牌id
                            fromStationName: globalContextService.get("BusConsolePage", "DispatchEditStartPos").label, // 起點站牌名字
                            // id: "",// 幸福巴士預約訂單 id	新增無須上送
                            // orgId: "",	// 畫面無此欄位	代空字串就好 ""
                            passengerNum: globalContextService.get("BusConsolePage", "DispatchEditAccTotalCounts").value, // 搭車人數
                            reserveDate: globalContextService.get("BusConsolePage", "DispatchEditTravelDate") + " " + globalContextService.get("BusConsolePage", "DispatchEditTravelTime"), // 預約日期+預約時間	如: "2020-11-25 17:45"
                            stationLineId: globalContextService.get("BusConsolePage", "DispatchEditRoute").value, // 路線id
                            stationLineName: globalContextService.get("BusConsolePage", "DispatchEditRoute").label, // 路線名字
                            time: globalContextService.get("BusConsolePage", "DispatchEditTravelTime"), //預約時間
                            toStationId: globalContextService.get("BusConsolePage", "DispatchEditEndPos").value, // 訖點站牌id
                            toStationName: globalContextService.get("BusConsolePage", "DispatchEditEndPos").label, //訖點站牌名字
                            remark: "",
                        });
                    }
                    //#endregion
                }}
                closeIconOnClick={(e) => {
                    props.controllGCS("editOrderModalClose")
                    props.setOpenBusOrderEditTitleModal(false);
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

                                            {/* 訂單路線 DispatchEditRoute */}
                                            <Selector
                                                placeholder={"請選擇路線"}
                                                menuPosition={true}
                                                isSearchable
                                                // viewType
                                                // disabled={isNil(globalContextService.get("BusConsolePage", "TravelDate"))}
                                                topLabel={"路線"}
                                                baseDefaultTheme={"DefaultTheme"}
                                                value={
                                                    isUndefined(globalContextService.get("BusConsolePage", "DispatchEditRoute"))
                                                        ?
                                                        { value: props.rowData.stationLineId, label: props.rowData.stationLineName }
                                                        :
                                                        globalContextService.get("BusConsolePage", "DispatchEditRoute")
                                                }
                                                onChange={(e, value, onInitial) => {
                                                    console.log(value, globalContextService.get("BusConsolePage", "DispatchEditRoute"))
                                                    if (!isEqual(value, globalContextService.get("BusConsolePage", "DispatchEditRoute"))) {
                                                        globalContextService.set("BusConsolePage", "DispatchEditRoute", value);
                                                        if (!onInitial) {
                                                            globalContextService.set("BusConsolePage", "DispatchEditStartPos", null)
                                                            globalContextService.set("BusConsolePage", "DispatchEditEndPos", null)
                                                            props.GetStationOnRouteExecute(value?.id)
                                                        }
                                                        setForceUpdate(f => !f);
                                                    }
                                                }}
                                                options={[
                                                    ...props.BusStationLines?.filter((item) => (item?.workWeek?.split(",").includes(moment(globalContextService.get("BusConsolePage", "DispatchEditTravelDate"), "YYYY-MM-DD HH:mm:ss").isoWeekday()?.toString())))
                                                ]}

                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditRoute") }}
                                            />

                                            {/* 訂單起站 DispatchEditStartPos */}
                                            < Selector
                                                placeholder={"請選擇起站"}
                                                isSearchable
                                                menuPosition={true}
                                                // viewType
                                                disabled={isNil(globalContextService.get("BusConsolePage", "DispatchEditRoute"))}
                                                topLabel={"起站"}
                                                baseDefaultTheme={"DefaultTheme"}
                                                value={
                                                    isUndefined(globalContextService.get("BusConsolePage", "DispatchEditStartPos"))
                                                        ?
                                                        { value: props.rowData.fromStationId, label: props.rowData.fromStationName } //與資料同一路線，帶原本的就行
                                                        :
                                                        globalContextService.get("BusConsolePage", "DispatchEditStartPos")

                                                }
                                                onChange={(e, value, onInitial) => {
                                                    globalContextService.set("BusConsolePage", "DispatchEditStartPos", value);
                                                }}
                                                options={[
                                                    ...(props?.StationOnRoute?.assignLineStations ?? []).map((item, index) => {
                                                        return props.BusStations.filter(s => s.id === item)[0]
                                                    })
                                                    // { value: '0', label: "請選擇起站", isDisabled: true },
                                                    // { value: '1', label: 'A站' },
                                                    // { value: '2', label: 'B站' },
                                                ]}
                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditStartPos") }}
                                            />
                                            {console.log(props?.StationOnRoute)}
                                            {/* 訂單迄點 DispatchEditEndPos */}
                                            <Selector
                                                placeholder={"請選擇迄站"}
                                                isSearchable
                                                menuPosition={true}
                                                // viewType
                                                disabled={isNil(globalContextService.get("BusConsolePage", "DispatchEditRoute"))}
                                                topLabel={"迄站"}
                                                baseDefaultTheme={"DefaultTheme"}
                                                value={
                                                    isUndefined(globalContextService.get("BusConsolePage", "DispatchEditEndPos"))
                                                        ?
                                                        { value: props.rowData.toStationId, label: props.rowData.toStationName } //與資料同一路線，帶原本的就行
                                                        :
                                                        globalContextService.get("BusConsolePage", "DispatchEditEndPos")
                                                }
                                                onChange={(e, value, onInitial) => {
                                                    globalContextService.set("BusConsolePage", "DispatchEditEndPos", value);
                                                }}
                                                options={[
                                                    ...(props?.StationOnRoute?.assignLineStations ?? []).map((item, index) => {
                                                        return props.BusStations.filter(s => s.id === item)[0]
                                                    })
                                                ]}
                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditEndPos") }}
                                            />

                                        </Container>

                                    </SubContainer>

                                    {/* 訂單組件右半邊容器 */}
                                    <SubContainer theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditRightContainer") }}>

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
                                                    (globalContextService.get("BusConsolePage", "DispatchEditTravelDate")) ?
                                                        moment(globalContextService.get("BusConsolePage", "DispatchEditTravelDate"), "YYYY-MM-DD HH:mm:ss")
                                                        :
                                                        moment(props.rowData.reserveDate, "YYYY-MM-DD HH:mm:ss")
                                                }
                                                onChange={(value, momentObj, onInitial) => {
                                                    if (!isEqual(value, globalContextService.get("BusConsolePage", "DispatchEditTravelDate"))) {
                                                        globalContextService.set("BusConsolePage", "DispatchEditTravelDate", value);
                                                        if (!onInitial) {
                                                            globalContextService.set("BusConsolePage", "DispatchEditRoute", null)
                                                            globalContextService.set("BusConsolePage", "DispatchEditStartPos", null)
                                                            globalContextService.set("BusConsolePage", "DispatchEditEndPos", null)
                                                        }
                                                        setForceUpdate(f => !f);
                                                    }
                                                }}
                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "dispatchEditTravelDate") }}
                                            />
                                            {console.log(globalContextService.get("BusConsolePage", "DispatchEditTravelTime"), moment(globalContextService.get("BusConsolePage", "DispatchEditTravelTime"), "HH:mm"))}

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
                                                    (globalContextService.get("BusConsolePage", "DispatchEditTravelTime")) ?
                                                        moment(globalContextService.get("BusConsolePage", "DispatchEditTravelTime"), "HH:mm")
                                                        :
                                                        moment(props.rowData.reserveDate, "YYYY-MM-DD HH:mm:ss")
                                                }
                                                onChange={(value, momentObj) => {
                                                    globalContextService.set("BusConsolePage", "DispatchEditTravelTime", value);
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
                                                value={globalContextService.get("BusConsolePage", "DispatchEditAccTotalCounts") ?? { value: props.rowData.passengerNum, label: `${props.rowData.passengerNum}人` }}
                                                onChange={(e, value, onInitial) => {
                                                    globalContextService.set("BusConsolePage", "DispatchEditAccTotalCounts", value);
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
export const BusOrderEditTitleModal = styled(BusOrderEditTitleModalBase).attrs((props) => ({}))`
`
//#endregion









