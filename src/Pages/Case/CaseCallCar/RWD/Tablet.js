import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar, Map8Canvas, map8Controll, Map8Input } from '../../../../ProjectComponent';
import { ReactComponent as Resize } from '../../../../Assets/img/CaseCallCarPage/Resize.svg'
import { ReactComponent as Search } from '../../../../Assets/img/CaseCallCarPage/Search.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/CaseCallCarPage/Convert.svg'
import { ReactComponent as StartToEnd } from '../../../../Assets/img/CaseCallCarPage/Arrow.svg'
import { ReactComponent as UpCircle } from '../../../../Assets/img/CaseCallCarPage/UpCircle.svg'
import { ReactComponent as End } from '../../../../Assets/img/CaseCallCarPage/End.svg'
import { ReactComponent as Start } from '../../../../Assets/img/CaseCallCarPage/Start.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, Container, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService, Resizable, OldTable, NewSelector } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption, notDistributableReasonSelectOption } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';
import { fmt } from '../../../../Handlers/DateHandler';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { caseCallCar: { rwd: { tablet } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件



    let history = useHistory();
    return (
        <>
            <MainPageContainer
                theme={tablet.mainPageContainer}
                outSideTopComponent={
                    <></>
                }
            >

                {/* 底層的地圖容器 */}
                <BasicContainer
                    theme={tablet.mapContainer}
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

                        theme={tablet.map}
                    />
                </BasicContainer>

                {/* 地圖上層的表單容器 */}
                <Resizable
                    width={"100%"}
                    height={"684px"}
                    maxHeight={"900px"}
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
                        {/* 可用補助餘額查詢按鈕 */}
                        <NativeLineButton
                            baseDefaultTheme={"DefaultTheme"}
                            disable={false}
                            type="button" // 防止提交
                            theme={tablet.balanceInquiryButton}
                        // onClick={() => {
                        //     history.push(`/BusRouteAndStop/BusStop/Edit?stationId=${rowData.id}`)
                        // }}
                        >
                            <Search
                                style={tablet.balanceInquiryButtonIcon}
                            />
                                可用補助餘額查詢
                            </NativeLineButton>
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
                                    (globalContextService.get("CaseCallCarPage", "TravelDate")) ?
                                        moment(globalContextService.get("CaseCallCarPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss")
                                        :
                                        null
                                }
                                onChange={(value, momentObj) => {
                                    if (value !== globalContextService.get("CaseCallCarPage", "TravelDate")) {
                                        globalContextService.set("CaseCallCarPage", "TravelDate", value);
                                        setForceUpdate(f => !f)
                                    }
                                }}
                                theme={tablet.travelDate}
                            />

                            {/*  乘車日期檢核 */}
                            {
                                !isNil(globalContextService.get("CaseCallCarPage", "TravelDate"))
                                &&
                                <>
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
                                            (globalContextService.get("CaseCallCarPage", "TravelTime")) ?
                                                moment(globalContextService.get("CaseCallCarPage", "TravelTime"), "HH:mm")
                                                :
                                                null
                                        }
                                        onChange={(value, momentObj) => {
                                            globalContextService.set("CaseCallCarPage", "TravelTime", value);
                                        }}
                                        theme={tablet.travelTime}
                                    />
                                </>
                            }

                            {/* 優先搭乘車行排序 */}
                            <BUnitSort
                                topLabel={<>優先搭乘車行排序 <Text theme={tablet.bUnitSortNote}>(請依序點擊完成排序)</Text></>}
                                bUnit={[
                                    { id: "0", name: "0XXXX車行" },
                                    { id: "1", name: "1XXXX車行" },
                                    { id: "2", name: "2XXXX車行" },
                                    { id: "3", name: "3XXXX車行" },
                                ]}
                                value={globalContextService.get("CaseCallCarPage", `BUnitSort`)}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("CaseCallCarPage", `BUnitSort`, value);
                                }}
                                theme={tablet.bUnitSort}
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
                                value={
                                    { value: 'hint', label: "請選擇訂車人身分", isDisabled: true }
                                }
                                onChange={(e, value, onInitial) => {
                                    // globalContextService.set("CaseEditPage", "County", value);
                                    // console.log("請選擇居住縣市", value, globalContextService.get("CaseEditPage", "County"))

                                }}

                                options={[
                                    { value: 'hint', label: "請選擇訂車人身分", isDisabled: true },
                                    { value: '0', label: "1" },
                                    { value: '1', label: "1" },
                                    { value: '2', label: "1" },
                                    { value: '3', label: "1" },
                                    { value: '4', label: "1" },
                                    { value: '5', label: "1" },
                                    { value: '6', label: "1" },
                                    { value: '7', label: "1" },
                                    { value: '8', label: "1" },
                                    { value: '9', label: "1" }
                                ]}
                                // menuPosition={true}
                                theme={tablet.orderer}
                            />

                            {/* 起點 StartPos*/}
                            <Map8Input
                                placeholder={"請輸入搭車地點(XX市XX區XX路XX號)"}

                                // viewType
                                // disable
                                topLabel={
                                    <>
                                        起點
                                        < Text theme={tablet.convertContainer}
                                            onClick={() => {
                                                let end = map8Controll.getMarkerPoints("test1")?.[1]?.[0] // 迄點緯度
                                                let start = map8Controll.getMarkerPoints("test1")?.[0]?.[0] // 起點緯度

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
                                                    let startAddr = globalContextService.get("CaseCallCarPage", "StartPos");
                                                    let endAddr = globalContextService.get("CaseCallCarPage", "EndPos");

                                                    globalContextService.set("CaseCallCarPage", "EndPos", startAddr);
                                                    globalContextService.set("CaseCallCarPage", "StartPos", endAddr);

                                                    map8Controll.addOrUpdateMarkerPoints("test1", [
                                                        ...([map8Controll.getMarkerPoints("test1")?.[1]]),
                                                        ...([map8Controll.getMarkerPoints("test1")?.[0]]),
                                                    ])

                                                    map8Controll.removeOneRoute("test1"); // 移除路線
                                                }
                                                setForceUpdate(f => !f)
                                            }}
                                        >
                                            <Convert style={tablet.convertContainerIcon} />
                                                起訖點互換
                                         </Text>
                                    </>
                                }
                                baseDefaultTheme={"DefaultTheme"}
                                value={globalContextService.get("CaseCallCarPage", "StartPos") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseCallCarPage", "StartPos", value);
                                }}
                                onSelect={(e, option, onInitial, posInfo) => {
                                    map8Controll.addOrUpdateMarkerPoints("test1", [
                                        [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat],
                                        ...(map8Controll.getMarkerPoints("test1")?.[1] ? [map8Controll.getMarkerPoints("test1")[1]] : []),
                                    ]) // 更新選中起點

                                    map8Controll.setCenter("test1", [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat]); // 移動中心點
                                    map8Controll.removeOneRoute("test1"); // 移除路線

                                    globalContextService.set("CaseCallCarPage", "StartPos", option.label);
                                    setForceUpdate(f => !f)
                                }}

                                theme={tablet.startPos}
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
                                value={globalContextService.get("CaseCallCarPage", "StartPosRemarks") ?? { value: 'hint', label: "請選擇備註", isDisabled: true }}
                                onChange={(e, value, onInitial) => {
                                    if (value?.label === '其他') {
                                        if (value?.label !== globalContextService.get("CaseCallCarPage", "StartPosRemarks")?.label) {
                                            setForceUpdate(f => !f); // 剛選擇 起點備註 時，重新渲染
                                        }
                                    }
                                    else if (globalContextService.get("CaseCallCarPage", "StartPosRemarks")?.label === '其他') {
                                        setForceUpdate(f => !f); // 剛選擇 起點備註 時，重新渲染
                                    }
                                    globalContextService.set("CaseCallCarPage", "StartPosRemarks", value);

                                }}

                                options={[
                                    { value: 'hint', label: "請選擇備註", isDisabled: true },
                                    { value: '0', label: "其他" },
                                    { value: '1', label: "test1" },
                                    { value: '2', label: "test2" }
                                    // ...Counties
                                ]}
                                // menuPosition={true}
                                theme={tablet.startPosRemarks}
                            />

                            {/*  起點備註檢核 */}
                            {
                                globalContextService.get("CaseCallCarPage", "StartPosRemarks")?.label === "其他"
                                &&
                                <>
                                    {/* 起點備註 - 其他 OtherStartPosRemarks */}
                                    <TextInput
                                        topLabel={<>起點備註 - 其他</>}
                                        baseDefaultTheme={"DefaultTheme"}
                                        type="text"
                                        placeholder={"請輸入起點備註"}
                                        value={globalContextService.get("CaseCallCarPage", "OtherStartPosRemarks") ?? props.CaseUsers?.enableDate}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("CaseCallCarPage", "OtherStartPosRemarks", value);
                                        }}
                                        theme={tablet.otherStartPosRemarks}
                                    />
                                </>
                            }
                            {/* 迄點 EndPos*/}
                            <Map8Input
                                placeholder={"請輸入下車地點(XX市XX區XX路XX號)"}

                                // viewType
                                // disable
                                topLabel={<>
                                    迄點
                                        <Text theme={tablet.convertContainer}
                                        onClick={() => {

                                            let end = map8Controll.getMarkerPoints("test1")?.[1]?.[0] // 迄點緯度
                                            let start = map8Controll.getMarkerPoints("test1")?.[0]?.[0] // 起點緯度

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
                                                let routeInfo = map8Controll.addOneRoute("test1", {
                                                    origin: map8Controll.getMarkerPoints("test1")[0].filter(i => i !== "hide"), //[121.474708, 25.012930] or [121.474708, 25.012930, "hide"], // 公司
                                                    destination: map8Controll.getMarkerPoints("test1")[1].filter(i => i !== "hide")// [121.570260, 25.032806] or [121.474708, 25.012930, "hide"], // 象山
                                                    // waypoints: [
                                                    //     [121.49993, 25.03678], // 龍山寺
                                                    //     [121.517498, 25.046273] // 台北摻站
                                                    // ],
                                                })
                                                // routeInfo?.getOrigin && console.log(routeInfo.getOrigin())
                                                map8Controll.hideAllMarkerPoints("test1")
                                                // setForceUpdate(f => !f)
                                            }
                                        }}
                                    >
                                        路線預覽
                                         </Text>
                                </>}
                                baseDefaultTheme={"DefaultTheme"}
                                value={globalContextService.get("CaseCallCarPage", "EndPos") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseCallCarPage", "EndPos", value);
                                }}
                                onSelect={(e, option, onInitial, posInfo) => {
                                    map8Controll.addOrUpdateMarkerPoints("test1", [
                                        ...(map8Controll.getMarkerPoints("test1")?.[0] ? [map8Controll.getMarkerPoints("test1")[0]] : []),
                                        [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat],
                                    ]) // 更新選中起點

                                    globalContextService.set("CaseCallCarPage", "EndPos", option.label);
                                    map8Controll.setCenter("test1", [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat]); // 移動中心點
                                    map8Controll.removeOneRoute("test1"); // 移除路線

                                    setForceUpdate(f => !f)
                                }}

                                theme={tablet.endPos}
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
                                value={globalContextService.get("CaseCallCarPage", "EndPosRemarks") ?? { value: 'hint', label: "請選擇備註", isDisabled: true }}
                                onChange={(e, value, onInitial) => {
                                    if (value?.label === '其他') {
                                        if (value?.label !== globalContextService.get("CaseCallCarPage", "EndPosRemarks")?.label) {
                                            setForceUpdate(f => !f); // 剛選擇 迄點備註 時，重新渲染
                                        }
                                    }
                                    else if (globalContextService.get("CaseCallCarPage", "EndPosRemarks")?.label === '其他') {
                                        setForceUpdate(f => !f); // 剛選擇 迄點備註 時，重新渲染
                                    }
                                    globalContextService.set("CaseCallCarPage", "EndPosRemarks", value);

                                }}

                                options={[
                                    { value: 'hint', label: "請選擇備註", isDisabled: true },
                                    { value: '0', label: "其他" },
                                    { value: '1', label: "test1" },
                                    { value: '2', label: "test2" }
                                    // ...Counties
                                ]}
                                // menuPosition={true}
                                theme={tablet.endPosRemarks}
                            />

                            {/*  迄點備註註檢核 */}
                            {
                                globalContextService.get("CaseCallCarPage", "EndPosRemarks")?.label === "其他"
                                &&
                                <>
                                    {/* 迄點備註 - 其他 OtherEndPosRemarks */}
                                    <TextInput
                                        topLabel={<>迄點備註 - 其他</>}
                                        baseDefaultTheme={"DefaultTheme"}
                                        type="text"
                                        placeholder={"請輸入迄點備註"}
                                        value={globalContextService.get("CaseCallCarPage", "OtherStartPosRemarks") ?? props.CaseUsers?.enableDate}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("CaseCallCarPage", "OtherStartPosRemarks", value);
                                        }}
                                        theme={tablet.otherEndPosRemarks}
                                    />
                                </>
                            }

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
                                            {globalContextService.get("CaseCallCarPage", "StartPos")}
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
                                            {globalContextService.get("CaseCallCarPage", "EndPos")}
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
                                            globalContextService.set("CaseCallCarPage", "CheckedRowKeys", checkedRowKeys);
                                            globalContextService.set("CaseCallCarPage", "CheckedRowsData", checkedRows);
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
                                                dataIndex: 'carCategoryName',
                                                // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                                // fixed: 'left',
                                            },
                                            {
                                                title: '預估時間',
                                                width: "100px",
                                                dataIndex: 'carCategoryName',
                                                // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                                // fixed: 'left',
                                            },
                                            {
                                                title: '車資總額',
                                                width: "100px",
                                                dataIndex: 'seatNum',
                                                // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                // fixed: 'left',
                                            },
                                            {
                                                title: '政府補助',
                                                width: "100px",
                                                dataIndex: 'seatNum',
                                                // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                // fixed: 'left',
                                            },
                                            {
                                                title: '自負額',
                                                width: "100px",
                                                dataIndex: 'seatNum',
                                                // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                // fixed: 'left',
                                            },
                                            {
                                                title: '陪同總額',
                                                width: "100px",
                                                dataIndex: 'seatNum',
                                                // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                // fixed: 'left',
                                            },
                                            {
                                                title: '個案負擔',
                                                width: "100px",
                                                dataIndex: 'seatNum',
                                                // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                fixed: 'right',
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
                                    // data={props.AllCars.data}
                                    clickPage={(currentPage, pageSize) => {
                                    }}
                                />
                            </BasicContainer>

                            {/* 預約回程檢核 */}
                            {
                                !isNil(globalContextService.get("CaseCallCarPage", "TravelDate"))
                                &&
                                <>
                                    {/* 我要預約回程(回居住地址) ScheduleReturnReview */}
                                    <Radio
                                        // viewType
                                        // disable
                                        topLabel={"我要預約回程(回居住地址)"}
                                        value={globalContextService.get("CaseCallCarPage", "ScheduleReturnReview") ?? 0}
                                        onChange={(e, value, onInitial) => {
                                            if (value === 1) {
                                                if (value !== globalContextService.get("CaseCallCarPage", "ScheduleReturnReview")) {
                                                    setForceUpdate(f => !f); // 剛選擇 預約回程 是 時，重新渲染
                                                }
                                            }
                                            else if (globalContextService.get("CaseCallCarPage", "ScheduleReturnReview") === 1) {
                                                setForceUpdate(f => !f); // 剛選擇 預約回程 是，重新渲染
                                            }
                                            globalContextService.set("CaseCallCarPage", "ScheduleReturnReview", value);
                                        }}
                                        theme={tablet.scheduleReturnReview}
                                    >
                                        {/* 我要預約回程(回居住地址) ScheduleReturnReview  選項 */}
                                        <RadioItem value={1} >是</RadioItem>
                                        <RadioItem value={0} >否</RadioItem>
                                    </Radio>

                                    {
                                        globalContextService.get("CaseCallCarPage", "ScheduleReturnReview") === 1
                                            ?
                                            <>
                                                {/* 回程乘車時間 ReturnEnableDate */}
                                                <DateTimePicker
                                                    topLabel={<>回程乘車時間</>}
                                                    // type={"time"} time、date、week、month、quarter、year
                                                    type={"time"}
                                                    format={"mm:ss"}
                                                    bascDefaultTheme={"DefaultTheme"}
                                                    // viewType
                                                    isSearchable
                                                    placeholder={""}
                                                    value={
                                                        (props.CaseUsers?.birthday) ?
                                                            moment(props.CaseUsers.reviewDate, "mm:ss")
                                                            :
                                                            null
                                                    }
                                                    onChange={(value, momentObj) => {
                                                        globalContextService.set("CaseCallCarPage", `ReturnEnableDate`, value);
                                                    }}
                                                    theme={tablet.returnTravelTime}
                                                />
                                            </>
                                            :
                                            // 維持排版佔位
                                            <SubContainer theme={tablet.returnEnableDateOccupy} />
                                    }
                                </>
                            }

                            {/* 願意共乘 RideTogetherReview */}
                            <Radio
                                // viewType
                                // disable
                                topLabel={"願意共乘"}
                                value={1}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("CaseCallCarPage", "RideTogetherReview", value);
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
                                value={globalContextService.get("CaseCallCarPage", "CarType") ?? { value: 'hint', label: "請選擇車種類型", isDisabled: true }}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value?.label)
                                    // console.log(globalContextService.get("CaseCallCarPage", "CarType"))
                                    if (!isEqual(value, globalContextService.get("CaseCallCarPage", "CarType"))) {
                                        globalContextService.remove("CaseCallCarPage", "Wheelchair")
                                        globalContextService.set("CaseCallCarPage", "CarType", value);
                                        setForceUpdate(f => !f); // 剛選擇 車種 時，重新渲染
                                    }
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇車種類型", isDisabled: true },
                                    { value: '0', label: '三輪車' },
                                    { value: '1', label: '麵包車' }
                                    // ...Counties
                                ]}
                                // menuPosition={true}
                                theme={tablet.carType}
                            />

                            {/* 輪椅 Wheelchair */}
                            <NewSelector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>輪椅</>}
                                bottomLabel={""}
                                //viewType
                                isSearchable
                                placeholder={"請選擇輪椅"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("CaseCallCarPage", "Wheelchair") ?? { value: 'hint', label: "請選擇輪椅", isDisabled: true }}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseCallCarPage", "Wheelchair", value);
                                    // console.log("請選擇居住縣市", value, globalContextService.get("CaseEditPage", "County"))
                                }}
                                options={
                                    (
                                        globalContextService.get("CaseCallCarPage", "CarType")?.label === "三輪車"
                                        &&
                                        [
                                            { value: 'hint', label: "請選擇輪椅", isDisabled: true },
                                            { value: '0', label: "輔助輪" },
                                        ]
                                    )
                                    ||
                                    (
                                        globalContextService.get("CaseCallCarPage", "CarType")?.label === "麵包車"
                                        &&
                                        [
                                            { value: 'hint', label: "請選擇輪椅", isDisabled: true },
                                            { value: '0', label: "腳踏車" },
                                            { value: '1', label: "輪椅" },
                                        ]
                                    )
                                    ||
                                    [{ value: 'hint', label: "請選擇輪椅", isDisabled: true },]
                                    // ...Counties
                                }
                                // menuPosition={true}
                                theme={tablet.wheelchair}
                            />

                            {/* 陪同人數 AccompanyCounts */}
                            <NewSelector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>陪同人數</>}
                                bottomLabel={<><Text theme={tablet.accompanyCountsRequired}>第一人免費、第二人自費加價50元、第三人(含)及以上每位自費加價200元</Text></>}
                                //viewType
                                isSearchable
                                placeholder={"0人"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={
                                    { value: 'hint', label: "0人", isDisabled: true }
                                }
                                onChange={(e, value, onInitial) => {
                                    // globalContextService.set("CaseEditPage", "County", value);
                                    // console.log("請選擇居住縣市", value, globalContextService.get("CaseEditPage", "County"))

                                }}

                                options={[
                                    { value: 'hint', label: "0人", isDisabled: true },
                                    // ...Counties
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
                                value={globalContextService.get("CaseCallCarPage", "SmsNumber") ?? props.CaseUsers?.enableDate}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseCallCarPage", "SmsNumber", value);
                                }}
                                theme={tablet.smsNumber}
                            />

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

                        {/* 新增下個地點檢核 */}
                        {
                            globalContextService.get("CaseCallCarPage", "ScheduleReturnReview") !== 1
                            &&
                            <>
                                {/* 新增下個地點按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.addNextLocation}
                                    onClick={() => {
                                        // props.controllGCS("return");
                                        // history.push("/DriverAndCar/Cars")
                                    }}
                                >
                                    新增下個地點
                                </NativeLineButton>
                            </>
                        }

                        {/* 立即預約按鈕 */}
                        <NativeLineButton
                            baseDefaultTheme={"DefaultTheme"}
                            disable={false}
                            type="button" // 防止提交
                            theme={tablet.reservationNow}
                            onClick={() => {
                                // props.controllGCS("return");
                                // history.push("/DriverAndCar/Cars")
                            }}
                        >
                            立即預約
                                </NativeLineButton>
                    </BasicContainer>

                </Resizable>

            </MainPageContainer>
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`
