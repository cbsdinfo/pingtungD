import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar, Map8Canvas, map8Controll, Map8Input } from '../../../../ProjectComponent';
import { ReactComponent as Search } from '../../../../Assets/img/RuralCallCarPage/Search.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/RuralCallCarPage/Convert.svg'
import { ReactComponent as StartToEnd } from '../../../../Assets/img/RuralCallCarPage/StartToEnd.svg'
import { ReactComponent as UpCircle } from '../../../../Assets/img/RuralCallCarPage/UpCircle.svg'
import { ReactComponent as End } from '../../../../Assets/img/RuralCallCarPage/End.svg'
import { ReactComponent as Start } from '../../../../Assets/img/RuralCallCarPage/Start.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption, notDistributableReasonSelectOption } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';
import { fmt } from '../../../../Handlers/DateHandler';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { ruralCallCar: { rwd: { laptopL } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <></>
                }
                theme={laptopL.mainPageContainer}
            >
                {/* 叫車頁面外層容器 */}
                <Container
                    theme={laptopL.callCarOutContainer}
                >
                    <SubContainer
                        theme={laptopL.mapContainer}
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

                            theme={laptopL.map}
                        />

                    </SubContainer>

                    {/* 本日行程一覽容器 */}
                    <BasicContainer
                        open={props.TodayToDoOpen}
                        theme={laptopL.todayToDoCotainer}
                    >
                        {/* 本日行程一覽標題 */}
                        <Text
                            theme={laptopL.todayToDoTitle}
                            onClick={(e) => { props.setTodayToDoOpen(t => !t) }}
                        >
                            本日行程一覽

                            <UpCircle style={laptopL.todayToDoTitleIcon} />
                        </Text>

                        {/* 起迄點容器 */}
                        <BasicContainer
                            theme={laptopL.startToEndContainer}
                        >
                            <StartToEnd
                                style={laptopL.startToEndSvg}
                            />

                            {/* 起點 */}
                            <Text
                                theme={laptopL.todayToDoStart}
                            >
                                <Start style={laptopL.todayToDoStartSvg} />
                                (起點)
                            </Text>

                            {/* 起點地址 */}
                            <Text
                                theme={laptopL.todayToDoStartAddr}
                            >
                                {globalContextService.get("RuralCallCarPage", "StartPos")}
                            </Text>


                            {/* 迄點 */}
                            <Text
                                theme={laptopL.todayToDoEnd}
                            >
                                <End style={laptopL.todayToDoEndSvg} />
                                (迄點)
                            </Text>

                            {/* 迄點地址 */}
                            <Text
                                theme={laptopL.todayToDoEndAddr}
                            >
                                {globalContextService.get("RuralCallCarPage", "EndPos")}
                            </Text>
                        </BasicContainer>


                        {/* Table 容器 */}
                        <BasicContainer
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
                                        globalContextService.set("CarsPage", "CheckedRowKeys", checkedRowKeys);
                                        globalContextService.set("CarsPage", "CheckedRowsData", checkedRows);
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

                    </BasicContainer>


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
                                王小明
                            </Text>
                            {/* 可用補助餘額查詢按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptopL.balanceInquiryButton}
                            // onClick={() => {
                            //     history.push(`/BusRouteAndStop/BusStop/Edit?stationId=${rowData.id}`)
                            // }}
                            >
                                <Search
                                    style={laptopL.balanceInquiryButtonIcon}
                                />
                                可用補助餘額查詢
                            </NativeLineButton>
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
                                        (globalContextService.get("RuralCallCarPage", "TravelDate")) ?
                                            moment(globalContextService.get("RuralCallCarPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        if (value !== globalContextService.get("RuralCallCarPage", "TravelDate")) {
                                            globalContextService.set("RuralCallCarPage", "TravelDate", value);
                                            setForceUpdate(f => !f)
                                        }
                                    }}
                                    theme={laptopL.travelDate}
                                />

                                {/*  乘車日期檢核 */}
                                {
                                    // !isNil(globalContextService.get("RuralCallCarPage", "TravelDate"))
                                    // &&
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
                                                (globalContextService.get("RuralCallCarPage", "TravelTime")) ?
                                                    moment(globalContextService.get("RuralCallCarPage", "TravelTime"), "HH:mm")
                                                    :
                                                    null
                                            }
                                            onChange={(value, momentObj) => {
                                                if (value !== globalContextService.get("RuralCallCarPage", "TravelTime")) {
                                                    globalContextService.set("RuralCallCarPage", "TravelTime", value);
                                                    setForceUpdate(f => !f)
                                                }
                                            }}
                                            theme={laptopL.travelTime}
                                        />
                                    </>
                                }

                                {/* 優先搭乘車行排序 */}
                                <BUnitSort
                                    topLabel={<>優先搭乘車行排序 <Text theme={laptopL.bUnitSortNote}>(請依序點擊完成排序)</Text></>}
                                    bUnit={[
                                        { id: "0", name: "0XXXX車行" },
                                        { id: "1", name: "1XXXX車行" },
                                        { id: "2", name: "2XXXX車行" },
                                        { id: "3", name: "3XXXX車行" },
                                    ]}
                                    value={globalContextService.get("RuralCallCarPage", `BUnitSort`)}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("RuralCallCarPage", `BUnitSort`, value);
                                    }}
                                    theme={laptopL.bUnitSort}
                                />

                                {/* 訂車人身分 Orderer */}
                                <Selector
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
                                        // ...Counties
                                    ]}
                                    // menuPosition={true}
                                    theme={laptopL.orderer}
                                />

                                {/* 起點 StartPos*/}
                                <Map8Input
                                    placeholder={"請輸入搭車地點(XX市XX區XX路XX號)"}

                                    // viewType
                                    // disable
                                    topLabel={
                                        <>
                                            起點
                                        < Text theme={laptopL.convertContainer}
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
                                                        let startAddr = globalContextService.get("RuralCallCarPage", "StartPos");
                                                        let endAddr = globalContextService.get("RuralCallCarPage", "EndPos");

                                                        globalContextService.set("RuralCallCarPage", "EndPos", startAddr);
                                                        globalContextService.set("RuralCallCarPage", "StartPos", endAddr);

                                                        map8Controll.addOrUpdateMarkerPoints("test1", [
                                                            ...([map8Controll.getMarkerPoints("test1")?.[1]]),
                                                            ...([map8Controll.getMarkerPoints("test1")?.[0]]),
                                                        ])

                                                        map8Controll.removeOneRoute("test1"); // 移除路線
                                                    }
                                                    setForceUpdate(f => !f)
                                                }}
                                            >
                                                <Convert style={laptopL.convertContainerIcon} />
                                                起訖點互換
                                         </Text>
                                        </>
                                    }
                                    baseDefaultTheme={"DefaultTheme"}
                                    value={globalContextService.get("RuralCallCarPage", "StartPos") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("RuralCallCarPage", "StartPos", value);
                                    }}
                                    onSelect={(e, option, onInitial, posInfo) => {
                                        map8Controll.addOrUpdateMarkerPoints("test1", [
                                            [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat],
                                            ...(map8Controll.getMarkerPoints("test1")?.[1] ? [map8Controll.getMarkerPoints("test1")[1]] : []),
                                        ]) // 更新選中起點

                                        map8Controll.setCenter("test1", [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat]); // 移動中心點
                                        map8Controll.removeOneRoute("test1"); // 移除路線

                                        globalContextService.set("RuralCallCarPage", "StartPos", option.label);
                                        setForceUpdate(f => !f)
                                    }}

                                    theme={laptopL.startPos}
                                />

                                {/* 起點備註 StartPosRemarks */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>起點備註</>}
                                    bottomLabel={""}
                                    //viewType
                                    isSearchable
                                    placeholder={"請選擇備註"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("RuralCallCarPage", "StartPosRemarks") ?? { value: 'hint', label: "請選擇備註", isDisabled: true }}
                                    onChange={(e, value, onInitial) => {
                                        if (value?.label === '其他') {
                                            if (value?.label !== globalContextService.get("RuralCallCarPage", "StartPosRemarks")?.label) {
                                                setForceUpdate(f => !f); // 剛選擇 起點備註 時，重新渲染
                                            }
                                        }
                                        else if (globalContextService.get("RuralCallCarPage", "StartPosRemarks")?.label === '其他') {
                                            setForceUpdate(f => !f); // 剛選擇 起點備註 時，重新渲染
                                        }
                                        globalContextService.set("RuralCallCarPage", "StartPosRemarks", value);

                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇備註", isDisabled: true },
                                        { value: '0', label: "其他" },
                                        { value: '1', label: "test1" },
                                        { value: '2', label: "test2" }
                                        // ...Counties
                                    ]}
                                    // menuPosition={true}
                                    theme={laptopL.startPosRemarks}
                                />

                                {/*  起點備註檢核 */}
                                {
                                    globalContextService.get("RuralCallCarPage", "StartPosRemarks")?.label === "其他"
                                    &&
                                    <>
                                        {/* 起點備註 - 其他 OtherStartPosRemarks */}
                                        <TextInput
                                            topLabel={<>起點備註 - 其他</>}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="text"
                                            placeholder={"請輸入起點備註"}
                                            value={globalContextService.get("RuralCallCarPage", "OtherStartPosRemarks") ?? props.CaseUsers?.enableDate}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("RuralCallCarPage", "OtherStartPosRemarks", value);
                                            }}
                                            theme={laptopL.otherStartPosRemarks}
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
                                        <Text theme={laptopL.convertContainer}
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
                                    value={globalContextService.get("RuralCallCarPage", "EndPos") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("RuralCallCarPage", "EndPos", value);
                                    }}
                                    onSelect={(e, option, onInitial, posInfo) => {
                                        map8Controll.addOrUpdateMarkerPoints("test1", [
                                            ...(map8Controll.getMarkerPoints("test1")?.[0] ? [map8Controll.getMarkerPoints("test1")[0]] : []),
                                            [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat],
                                        ]) // 更新選中起點

                                        globalContextService.set("RuralCallCarPage", "EndPos", option.label);
                                        map8Controll.setCenter("test1", [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat]); // 移動中心點
                                        map8Controll.removeOneRoute("test1"); // 移除路線

                                        setForceUpdate(f => !f)
                                    }}

                                    theme={laptopL.endPos}
                                />

                                {/* 迄點備註 EndPosRemarks */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>迄點備註</>}
                                    bottomLabel={""}
                                    //viewType
                                    isSearchable
                                    placeholder={"請選擇備註"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("RuralCallCarPage", "EndPosRemarks") ?? { value: 'hint', label: "請選擇備註", isDisabled: true }}
                                    onChange={(e, value, onInitial) => {
                                        if (value?.label === '其他') {
                                            if (value?.label !== globalContextService.get("RuralCallCarPage", "EndPosRemarks")?.label) {
                                                setForceUpdate(f => !f); // 剛選擇 迄點備註 時，重新渲染
                                            }
                                        }
                                        else if (globalContextService.get("RuralCallCarPage", "EndPosRemarks")?.label === '其他') {
                                            setForceUpdate(f => !f); // 剛選擇 迄點備註 時，重新渲染
                                        }
                                        globalContextService.set("RuralCallCarPage", "EndPosRemarks", value);

                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇備註", isDisabled: true },
                                        { value: '0', label: "其他" },
                                        { value: '1', label: "test1" },
                                        { value: '2', label: "test2" }
                                        // ...Counties
                                    ]}
                                    // menuPosition={true}
                                    theme={laptopL.endPosRemarks}
                                />

                                {/*  迄點備註註檢核 */}
                                {
                                    globalContextService.get("RuralCallCarPage", "EndPosRemarks")?.label === "其他"
                                    &&
                                    <>
                                        {/* 迄點備註 - 其他 OtherEndPosRemarks */}
                                        <TextInput
                                            topLabel={<>迄點備註 - 其他</>}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="text"
                                            placeholder={"請輸入迄點備註"}
                                            value={globalContextService.get("RuralCallCarPage", "OtherStartPosRemarks") ?? props.CaseUsers?.enableDate}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("RuralCallCarPage", "OtherStartPosRemarks", value);
                                            }}
                                            theme={laptopL.otherEndPosRemarks}
                                        />
                                    </>
                                }

                                {/* 預約回程檢核 */}
                                {
                                    (!isNil(globalContextService.get("RuralCallCarPage", "TravelDate")) && !isNil(globalContextService.get("RuralCallCarPage", "TravelTime")))
                                    &&
                                    <>
                                        {/* 我要預約回程(回居住地址) ScheduleReturnReview */}
                                        <Radio
                                            // viewType
                                            // disable
                                            topLabel={"我要預約回程(回居住地址)"}
                                            value={globalContextService.get("RuralCallCarPage", "ScheduleReturnReview") ?? 0}
                                            onChange={(e, value, onInitial) => {
                                                if (value === 1) {
                                                    if (value !== globalContextService.get("RuralCallCarPage", "ScheduleReturnReview")) {
                                                        setForceUpdate(f => !f); // 剛選擇 預約回程 是 時，重新渲染
                                                    }
                                                }
                                                else if (globalContextService.get("RuralCallCarPage", "ScheduleReturnReview") === 1) {
                                                    setForceUpdate(f => !f); // 剛選擇 預約回程 是，重新渲染
                                                }
                                                globalContextService.set("RuralCallCarPage", "ScheduleReturnReview", value);
                                            }}
                                            theme={laptopL.scheduleReturnReview}
                                        >
                                            {/* 我要預約回程(回居住地址) ScheduleReturnReview  選項 */}
                                            <RadioItem value={1} >是</RadioItem>
                                            <RadioItem value={0} >否</RadioItem>
                                        </Radio>

                                        {
                                            globalContextService.get("RuralCallCarPage", "ScheduleReturnReview") === 1
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
                                                            globalContextService.set("RuralCallCarPage", `ReturnEnableDate`, value);
                                                        }}
                                                        theme={laptopL.returnTravelTime}
                                                    />
                                                </>
                                                :
                                                // 維持排版佔位
                                                <SubContainer theme={laptopL.returnEnableDateOccupy} />
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
                                        globalContextService.set("RuralCallCarPage", "RideTogetherReview", value);
                                        // console.log(globalContextService.get("CarsAddPage", "CarReview"));
                                    }}
                                    theme={laptopL.rideTogetherReview}
                                >
                                    {/* 願意共乘 RideTogetherReview  選項 */}
                                    <RadioItem value={1} >是</RadioItem>
                                    <RadioItem value={0} >否</RadioItem>
                                </Radio>

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
                                    value={globalContextService.get("RuralCallCarPage", "CarType") ?? { value: 'hint', label: "請選擇車種類型", isDisabled: true }}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value?.label)
                                        // console.log(globalContextService.get("RuralCallCarPage", "CarType"))
                                        if (!isEqual(value, globalContextService.get("RuralCallCarPage", "CarType"))) {
                                            globalContextService.remove("RuralCallCarPage", "Wheelchair")
                                            globalContextService.set("RuralCallCarPage", "CarType", value);
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
                                    theme={laptopL.carType}
                                />

                                {/* 輪椅 Wheelchair */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>輪椅</>}
                                    bottomLabel={""}
                                    //viewType
                                    isSearchable
                                    placeholder={"請選擇輪椅"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("RuralCallCarPage", "Wheelchair") ?? { value: 'hint', label: "請選擇輪椅", isDisabled: true }}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("RuralCallCarPage", "Wheelchair", value);
                                        // console.log("請選擇居住縣市", value, globalContextService.get("CaseEditPage", "County"))
                                    }}
                                    options={
                                        (
                                            globalContextService.get("RuralCallCarPage", "CarType")?.label === "三輪車"
                                            &&
                                            [
                                                { value: 'hint', label: "請選擇輪椅", isDisabled: true },
                                                { value: '0', label: "輔助輪" },
                                            ]
                                        )
                                        ||
                                        (
                                            globalContextService.get("RuralCallCarPage", "CarType")?.label === "麵包車"
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
                                    theme={laptopL.wheelchair}
                                />

                                {/* 陪同人數 AccompanyCounts */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>陪同人數</>}
                                    bottomLabel={<><Text theme={laptopL.accompanyCountsRequired}>第一人免費、第二人自費加價50元、第三人(含)及以上每位自費加價200元</Text></>}
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
                                    theme={laptopL.accompanyCounts}
                                />

                                {/* 簡訊號碼 SmsNumber */}
                                <TextInput

                                    topLabel={<>簡訊號碼</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={"請輸入接收簡訊號碼"}
                                    value={globalContextService.get("RuralCallCarPage", "SmsNumber") ?? props.CaseUsers?.enableDate}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("RuralCallCarPage", "SmsNumber", value);
                                    }}
                                    theme={laptopL.smsNumber}
                                />

                            </FormRow>
                        </FormContainer>

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
                                    // props.controllGCS("return");
                                    // history.push("/DriverAndCar/Cars")
                                }}
                            >
                                回列表
                                </NativeLineButton>

                            {/* 新增下個地點檢核 */}
                            {
                                globalContextService.get("RuralCallCarPage", "ScheduleReturnReview") !== 1
                                &&
                                <>
                                    {/* 新增下個地點按鈕 */}
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // 防止提交
                                        theme={laptopL.addNextLocation}
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
                                theme={laptopL.reservationNow}
                                onClick={() => {
                                    // props.controllGCS("return");
                                    // history.push("/DriverAndCar/Cars")
                                }}
                            >
                                立即預約
                                </NativeLineButton>
                        </BasicContainer>

                    </SubContainer>
                </Container>
            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`
