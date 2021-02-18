import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar, MapGoogle, mapGoogleControll, MapGoogleInput } from '../../../../ProjectComponent';
import { ReactComponent as Resize } from '../../../../Assets/img/WhiteCallCarComponentPage/Resize.svg'
import { ReactComponent as Search } from '../../../../Assets/img/WhiteCallCarComponentPage/Search.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/WhiteCallCarComponentPage/Convert.svg'
import { ReactComponent as StartToEnd } from '../../../../Assets/img/WhiteCallCarComponentPage/Arrow.svg'
import { ReactComponent as UpCircle } from '../../../../Assets/img/WhiteCallCarComponentPage/UpCircle.svg'
import { ReactComponent as End } from '../../../../Assets/img/WhiteCallCarComponentPage/End.svg'
import { ReactComponent as Start } from '../../../../Assets/img/WhiteCallCarComponentPage/Start.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, NewSelector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService, Container, Resizable, OldTable } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption, notDistributableReasonSelectOption } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';
import { fmt } from '../../../../Handlers/DateHandler';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { callCar: { component: { whiteCallCarComponent: { rwd: { tablet } } } } } } = Theme;
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory();


    //#region 如果起迄點、搭車日期、搭車時間有值、搭車人數皆已有有值，則帶回 本日行程一覽 Table資料
    const getCaseOrderAmtAPI = useCallback(() => {
        let end = mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // 迄點緯度
        let start = mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // 起點緯度

        let validMsg = "";
        if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
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
                ReservationDate: globalContextService.get("WhiteCallCarComponentPage", "TravelDate") + " " + globalContextService.get("WhiteCallCarComponentPage", "TravelTime"), // 預約日期+預約時間	如: "2020-11-25 17:45"
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
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
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
            {/* 底層的地圖容器 */}
            <BasicContainer
                theme={tablet.mapContainer}
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

                    theme={tablet.map}
                />
            </BasicContainer>

            {/* 地圖上層的表單容器 */}
            <Resizable
                width={"100%"}
                height={"480px"}
                maxHeight={"70vh"}
                minHeight={"280px"}
                enable={{ top: true, right: false, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
                theme={tablet.resizableContainer}
            >
                {/* 可調整大小圖標 */}
                <Resize style={tablet.resizeSvg} />

                {/* 叫車表單標題列 */}
                <BasicContainer
                    theme={tablet.callCarFormTitleContainer}
                >

                    {/* 個案名字 */}
                    <Text
                        theme={tablet.callCarFormCaseName}
                    >
                        {props?.UserName}
                    </Text>
                </BasicContainer>

                {/* 叫車表單容器 */}
                <FormContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={tablet.callCarFormContainer}
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
                                globalContextService.set("WhiteCallCarComponentPage", "TravelDate", value);
                            }}
                            theme={tablet.travelDate}
                        />

                        {/* 乘車時間 TravelTime */}
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
                                (globalContextService.get("WhiteCallCarComponentPage", "TravelTime")) ?
                                    moment(globalContextService.get("WhiteCallCarComponentPage", "TravelTime"), "HH:mm")
                                    :
                                    null
                            }
                            onChange={(value, momentObj) => {
                                globalContextService.set("WhiteCallCarComponentPage", "TravelTime", value);
                            }}
                            theme={tablet.travelTime}
                        />

                        {/* 優先搭乘車行排序 */}
                        {/* <BUnitSort
                            topLabel={<>優先搭乘車行排序 <Text theme={tablet.bUnitSortNote}>(請依序點擊完成排序)</Text></>}
                            bUnit={[
                                { id: "0", name: "0XXXX車行" },
                                { id: "1", name: "1XXXX車行" },
                                { id: "2", name: "2XXXX車行" },
                                { id: "3", name: "3XXXX車行" },
                                { id: "4", name: "3XXXX車行" },
                                { id: "5", name: "3XXXX車行" },
                            ]}
                            value={globalContextService.get("WhiteCallCarComponentPage", `BUnitSort`)}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteCallCarComponentPage", `BUnitSort`, value);
                            }}
                            theme={tablet.bUnitSort}
                        /> */}
                        {/* 起點 StartPos*/}
                        <MapGoogleInput
                            placeholder={"請輸入搭車地點(XX市XX區XX路XX號)"}
                            placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // 接後端的API
                            // viewType
                            // disable
                            topLabel={
                                <>
                                    起點
                                        </>
                            }
                            baseDefaultTheme={"DefaultTheme"}
                            value={globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteCallCarComponentPage", "StartPos", value);
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

                                globalContextService.set("WhiteCallCarComponentPage", "StartPos", option.label);

                                getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、搭車人數皆已有有值，則帶回 本日行程一覽 Table資料

                                setForceUpdate(f => !f)
                            }}

                            theme={tablet.startPos}
                        />

                        {/* 起訖點互換按鈕容器 */}
                        <BasicContainer theme={tablet.convertButtonContainer}>
                            <NativeLineButton theme={tablet.convertButton}
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
                                        let startAddr = globalContextService.get("WhiteCallCarComponentPage", "StartPos");
                                        let endAddr = globalContextService.get("WhiteCallCarComponentPage", "EndPos");

                                        globalContextService.set("WhiteCallCarComponentPage", "EndPos", startAddr);
                                        globalContextService.set("WhiteCallCarComponentPage", "StartPos", endAddr);

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
                                <Convert style={tablet.convertContainerIcon} />
                                                起訖點互換
                        </NativeLineButton>

                        </BasicContainer>


                        {/* 迄點 EndPos*/}
                        <MapGoogleInput
                            placeholder={"請輸入下車地點(XX市XX區XX路XX號)"}
                            placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // 接後端的API
                            // viewType
                            // disable
                            topLabel={
                                <>
                                    迄點
                                            <Text theme={tablet.convertContainer}
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

                                                props.GetPolylineRouteExecute(
                                                    {
                                                        fromAddr: globalContextService.get("WhiteCallCarComponentPage", "StartPos"),
                                                        toAddr: globalContextService.get("WhiteCallCarComponentPage", "EndPos"),
                                                        mapId: "test1",
                                                        routeAttr: {
                                                            // origin: new window.google.maps.LatLng(25.012930,121.994708),
                                                            origin: mapGoogleControll.getMarkers("test1")[0].position,
                                                            destination: mapGoogleControll.getMarkers("test1")[1].position,// new window.google.maps.LatLng(25.012930,121.974708),
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
                                            </Text>
                                </>
                            }
                            baseDefaultTheme={"DefaultTheme"}
                            value={globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteCallCarComponentPage", "EndPos", value);
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

                                globalContextService.set("WhiteCallCarComponentPage", "EndPos", option.label);

                                getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、搭車人數皆已有有值，則帶回 本日行程一覽 Table資料

                                setForceUpdate(f => !f)
                            }}

                            theme={tablet.endPos}
                        />

                        {/* 本日行程一覽容器 */}
                        <BasicContainer
                            theme={tablet.todayToDoContainer}
                        >
                            {/* 本日行程一覽標題 */}
                            <Text
                                theme={tablet.todayToDoTitle}
                            >
                                本日行程一覽

                                </Text>

                            <Container>
                                {/* 起點容器 */}
                                <SubContainer theme={tablet.todayToDoStartContainer}>

                                    {/* 起點 */}
                                    <Text
                                        theme={tablet.todayToDoStart}
                                    >
                                        <Start style={tablet.todayToDoStartSvg} />
                                            (起點)
                                        </Text>

                                    <StartToEnd
                                        style={tablet.startToEndSvg}
                                    />

                                    {/* 起點地址 */}
                                    <Text
                                        theme={tablet.todayToDoStartAddr}
                                    >
                                        {globalContextService.get("WhiteCallCarComponentPage", "StartPos")}
                                    </Text>

                                </SubContainer>

                                {/* 迄點容器 */}
                                <SubContainer theme={tablet.todayToDoEndContainer}>

                                    {/* 迄點 */}
                                    <Text
                                        theme={tablet.todayToDoEnd}
                                    >
                                        <End style={tablet.todayToDoEndSvg} />
                                            (迄點)
                                        </Text>

                                    {/* 迄點地址 */}
                                    <Text
                                        theme={tablet.todayToDoEndAddr}
                                    >
                                        {globalContextService.get("WhiteCallCarComponentPage", "EndPos")}
                                    </Text>

                                </SubContainer>

                            </Container>

                        </BasicContainer>


                        {/* Table 容器 */}
                        <BasicContainer
                            bascDefaultTheme={"DefaultTheme"}
                            open={props.TodayToDoOpen}
                            theme={tablet.tableContainer}
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
                                                    <Text theme={tablet.type}>
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
                                    // { id: "2", type: "回程" },
                                ]}
                                // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                                // data={props.AllCars.data}
                                clickPage={(currentPage, pageSize) => {
                                }}
                            />
                        </BasicContainer>


                        {/* 願意共乘 RideTogetherReview */}
                        <Radio
                            // viewType
                            // disable
                            topLabel={"願意共乘"}
                            value={globalContextService.get("WhiteCallCarComponentPage", "RideTogetherReview") ?? 1}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteCallCarComponentPage", "RideTogetherReview", value);
                                // console.log(globalContextService.get("CarsAddPage", "CarReview"));
                            }}
                            theme={tablet.rideTogetherReview}
                        >
                            {/* 願意共乘 RideTogetherReview  選項 */}
                            <RadioItem value={1} >是</RadioItem>
                            <RadioItem value={0} >否</RadioItem>
                        </Radio>

                        {/* 車種 CarType */}
                        <NewSelector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={<>車種</>}
                            bottomLabel={""}
                            //viewType
                            isSearchable
                            placeholder={"請選擇車種類型"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("WhiteCallCarComponentPage", "CarType") ?? null}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteCallCarComponentPage", "CarType", value);
                            }}

                            options={[
                                { value: 'hint', label: "請選擇車種類型", isDisabled: true },
                                ...props?.AllCarType
                            ]}
                            // menuPosition={true}
                            theme={tablet.carType}
                        />

                        {/* 搭車人數 AccompanyCounts */}
                        <NewSelector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={<>搭車人數</>}
                            bottomLabel={""}
                            //viewType
                            isSearchable
                            placeholder={"請選擇搭乘人數"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts") ?? null}
                            onChange={(e, value, onInitial) => {
                                if (!isEqual(value, globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts"))) {
                                    // 清空重新選擇前的值
                                    let preNum = globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value;
                                    Array(preNum).fill(0).forEach((it, ind) => {
                                        globalContextService.remove("WhiteCallCarComponentPage", `TakerName_${ind + 1}`)
                                        globalContextService.remove("WhiteCallCarComponentPage", `TakerBrithday_${ind + 1}`)
                                    });

                                    globalContextService.set("WhiteCallCarComponentPage", "AccompanyCounts", value)
                                    setForceUpdate(f => !f);
                                }
                            }}

                            options={[
                                { value: 'hint', label: "請選擇搭乘人數", isDisabled: true },
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
                            theme={tablet.accompanyCounts}
                        />

                        {/* 簡訊號碼 SmsNumber */}
                        <TextInput

                            topLabel={<>簡訊號碼</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={"請輸入接收簡訊號碼"}
                            value={globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? null}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteCallCarComponentPage", "SmsNumber", value);
                            }}
                            theme={tablet.smsNumber}
                        />

                        {/*維持排版佔位*/}
                        <SubContainer theme={tablet.companyEnableOccupy} />

                        {!isNil(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts"))
                            &&
                            (Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0).map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {/* 搭車姓名 TakerName */}
                                        <TextInput
                                            topLabel={`搭車姓名${index + 1}`}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="text"
                                            placeholder={``}
                                            value={globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`) ?? ""}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("WhiteCallCarComponentPage", `TakerName_${index + 1}`, value);
                                            }}
                                            theme={tablet.takerName}
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
                                                (globalContextService.get("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`)) ?
                                                    moment(globalContextService.get("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`), "YYYY-MM-DD HH:mm:ss")
                                                    :
                                                    null
                                            }
                                            onChange={(value, momentObj) => {
                                                globalContextService.set("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`, value);
                                            }}
                                            theme={tablet.takerBrithday}
                                        />
                                    </React.Fragment>
                                )
                            })
                        }

                    </FormRow>
                </FormContainer>

                {/* 叫車表單下方按鈕列 */}
                <BasicContainer
                    theme={tablet.callCarFormBottomContainer}
                >
                    {/* 回列表按鈕 */}
                    <NativeLineButton
                        baseDefaultTheme={"DefaultTheme"}
                        disable={false}
                        type="button" // 防止提交
                        theme={tablet.returnButton}
                        onClick={() => {
                            history.push("/Case");
                            props.controllGCS("return")
                        }}
                    >
                        回列表
                                </NativeLineButton>

                    {/* 立即預約按鈕 */}
                    <NativeLineButton
                        baseDefaultTheme={"DefaultTheme"}
                        disable={false}
                        type="button" // 防止提交
                        theme={tablet.reservationNow}
                        onClick={() => {
                            //#region 表單驗證
                            let validMsg = "";

                            if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
                            }
                            else if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
                            }
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
                            else if (
                                !(
                                    (Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0)
                                        .map((item, index) => {
                                            // 必須保留多種檢核的可能，不能只有寫死檢核必輸
                                            return [
                                                valid(globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車姓名${index + 1}`])[1],
                                                valid(globalContextService.get("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車生日${index + 1}`])[1]
                                            ]
                                        }).flat().every(V => (V === null))
                                )
                            ) {

                                validMsg = (Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0)
                                    .map((item, index) => {
                                        return [
                                            valid(globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車姓名${index + 1}`])[1],
                                            valid(globalContextService.get("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車生日${index + 1}`])[1]
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
                                props.AddOrderOfSelfPayUsersExecute({
                                    CarCategoryName: globalContextService.get("WhiteCallCarComponentPage", "CarType").label, //車種 的 label
                                    canShared: globalContextService.get("WhiteCallCarComponentPage", "RideTogetherReview") === 1 ? true : false, //願意共乘
                                    carCategoryId: globalContextService.get("WhiteCallCarComponentPage", "CarType").value,	//車種 的 value
                                    date: globalContextService.get("WhiteCallCarComponentPage", "TravelDate"), //預約日期
                                    fromAddr: globalContextService.get("WhiteCallCarComponentPage", "StartPos"), //	起點
                                    fromLat: mapGoogleControll.getMarkerPoints("test1")?.[0]?.[1] ?? 0, //起點緯度
                                    fromLon: mapGoogleControll.getMarkerPoints("test1")?.[0]?.[0] ?? 0,//起點經度
                                    // id: ""	白牌預約訂單 id
                                    noticePhone: globalContextService.get("WhiteCallCarComponentPage", "SmsNumber"),	//畫面無此欄位
                                    orgId: "",//	畫面無此欄位
                                    passengerNum: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts").value,	//搭乘人數
                                    remark: JSON.stringify((Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0).map((item, index) => {
                                        return {
                                            name: globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`),
                                            birth: globalContextService.get("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`)
                                        }
                                    })),	//搭乘人員資訊陣列
                                    reserveDate: `${globalContextService.get("WhiteCallCarComponentPage", "TravelDate")} ${globalContextService.get("WhiteCallCarComponentPage", "TravelTime")}`,	//預約日期+ 預約時間
                                    selfPayUserId: props.CaseUserId, //白牌個案id
                                    status: 1,	//畫面無此欄位
                                    time: globalContextService.get("WhiteCallCarComponentPage", "TravelTime"), //預約時間
                                    toAddr: globalContextService.get("WhiteCallCarComponentPage", "EndPos"), //	迄點
                                    toLat: mapGoogleControll.getMarkerPoints("test1")?.[1]?.[0] ?? 0,//	迄點緯度
                                    toLon: mapGoogleControll.getMarkerPoints("test1")?.[1]?.[1] ?? 0,//	迄點經度
                                    userId: props.UserId
                                })
                            }
                        }}
                    >
                        立即預約
                                </NativeLineButton>
                </BasicContainer>

            </Resizable>
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`

