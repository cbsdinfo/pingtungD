import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar, Map8Canvas, map8Controll, Map8Input } from '../../../../ProjectComponent';
import { ReactComponent as Search } from '../../../../Assets/img/WhiteCallCarPage/Search.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/WhiteCallCarPage/Convert.svg'
import { ReactComponent as StartToEnd } from '../../../../Assets/img/WhiteCallCarPage/StartToEnd.svg'
import { ReactComponent as UpCircle } from '../../../../Assets/img/WhiteCallCarPage/UpCircle.svg'
import { ReactComponent as End } from '../../../../Assets/img/WhiteCallCarPage/End.svg'
import { ReactComponent as Start } from '../../../../Assets/img/WhiteCallCarPage/Start.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption, notDistributableReasonSelectOption } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';
import { fmt } from '../../../../Handlers/DateHandler';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { whiteCallCar: { rwd: { laptop } } } } } = Theme;
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory();
    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <></>
                }
                theme={laptop.mainPageContainer}
            >
                {/* 叫車頁面外層容器 */}
                <Container
                    theme={laptop.callCarOutContainer}
                >
                    <SubContainer
                        theme={laptop.mapContainer}
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

                            theme={laptop.map}
                        />

                    </SubContainer>

                    {/* 本日行程一覽容器 */}
                    <BasicContainer
                        open={props.TodayToDoOpen}
                        theme={laptop.todayToDoCotainer}
                    >
                        {/* 本日行程一覽標題 */}
                        <Text
                            theme={laptop.todayToDoTitle}
                            onClick={(e) => { props.setTodayToDoOpen(t => !t) }}
                        >
                            本日行程一覽

                            <UpCircle style={laptop.todayToDoTitleIcon} />
                        </Text>

                        {/* 起迄點容器 */}
                        <BasicContainer
                            theme={laptop.startToEndContainer}
                        >
                            <StartToEnd
                                style={laptop.startToEndSvg}
                            />

                            {/* 起點 */}
                            <Text
                                theme={laptop.todayToDoStart}
                            >
                                <Start style={laptop.todayToDoStartSvg} />
                                (起點)
                            </Text>

                            {/* 起點地址 */}
                            <Text
                                theme={laptop.todayToDoStartAddr}
                            >
                                {globalContextService.get("WhiteCallCarPage", "StartPos")}
                            </Text>


                            {/* 迄點 */}
                            <Text
                                theme={laptop.todayToDoEnd}
                            >
                                <End style={laptop.todayToDoEndSvg} />
                                (迄點)
                            </Text>

                            {/* 迄點地址 */}
                            <Text
                                theme={laptop.todayToDoEndAddr}
                            >
                                {globalContextService.get("WhiteCallCarPage", "EndPos")}
                            </Text>
                        </BasicContainer>


                        {/* Table 容器 */}
                        <BasicContainer
                            bascDefaultTheme={"DefaultTheme"}
                            open={props.TodayToDoOpen}
                            theme={laptop.tableContainer}
                        >
                            <OldTable
                                pagination={false}
                                checkbox={false}
                                // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                                checkedRowKeyName={"id"}
                                checkboxOnChecked={
                                    (checkedRowKeys, checkedRows) => {
                                        // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                        globalContextService.set("WhiteCallCarPage", "CheckedRowKeys", checkedRowKeys);
                                        globalContextService.set("WhiteCallCarPage", "CheckedRowsData", checkedRows);
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
                                                    <Text theme={laptop.type}>
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
                                            title: '陪同總額',
                                            width: "100px",
                                            dataIndex: 'seatNum',
                                            // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                            // fixed: 'left',
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
                        theme={laptop.formContainer}
                    >
                        {/* 叫車表單標題列 */}
                        <BasicContainer
                            theme={laptop.callCarFormTitleContainer}
                        >

                            {/* 個案名字 */}
                            <Text
                                theme={laptop.callCarFormCaseName}
                            >
                                {props?.UserName}
                            </Text>
                        </BasicContainer>

                        {/* 叫車表單容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptop.callCarFormContainer}
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
                                        (globalContextService.get("WhiteCallCarPage", "TravelDate")) ?
                                            moment(globalContextService.get("WhiteCallCarPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("WhiteCallCarPage", "TravelDate", value);
                                    }}
                                    theme={laptop.travelDate}
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
                                        (globalContextService.get("WhiteCallCarPage", "TravelTime")) ?
                                            moment(globalContextService.get("WhiteCallCarPage", "TravelTime"), "HH:mm")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("WhiteCallCarPage", "TravelTime", value);
                                    }}
                                    theme={laptop.travelTime}
                                />

                                {/* 起點 StartPos*/}
                                <Map8Input
                                    placeholder={"請輸入搭車地點(XX市XX區XX路XX號)"}

                                    // viewType
                                    // disable
                                    topLabel={
                                        <>
                                            起點
                                        < Text theme={laptop.convertContainer}
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
                                                        let startAddr = globalContextService.get("WhiteCallCarPage", "StartPos");
                                                        let endAddr = globalContextService.get("WhiteCallCarPage", "EndPos");

                                                        globalContextService.set("WhiteCallCarPage", "EndPos", startAddr);
                                                        globalContextService.set("WhiteCallCarPage", "StartPos", endAddr);

                                                        map8Controll.addOrUpdateMarkerPoints("test1", [
                                                            ...([map8Controll.getMarkerPoints("test1")?.[1]]),
                                                            ...([map8Controll.getMarkerPoints("test1")?.[0]]),
                                                        ])

                                                        map8Controll.removeOneRoute("test1"); // 移除路線
                                                    }
                                                    setForceUpdate(f => !f)
                                                }}
                                            >
                                                <Convert style={laptop.convertContainerIcon} />
                                                起訖點互換
                                         </Text>
                                        </>
                                    }
                                    baseDefaultTheme={"DefaultTheme"}
                                    value={globalContextService.get("WhiteCallCarPage", "StartPos") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("WhiteCallCarPage", "StartPos", value);
                                    }}
                                    onSelect={(e, option, onInitial, posInfo) => {
                                        map8Controll.addOrUpdateMarkerPoints("test1", [
                                            [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat],
                                            ...(map8Controll.getMarkerPoints("test1")?.[1] ? [map8Controll.getMarkerPoints("test1")[1]] : []),
                                        ]) // 更新選中起點

                                        map8Controll.setCenter("test1", [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat]); // 移動中心點
                                        map8Controll.removeOneRoute("test1"); // 移除路線

                                        globalContextService.set("WhiteCallCarPage", "StartPos", option.label);
                                        setForceUpdate(f => !f)
                                    }}

                                    theme={laptop.startPos}
                                />

                                {/* 迄點 EndPos*/}
                                <Map8Input
                                    placeholder={"請輸入下車地點(XX市XX區XX路XX號)"}

                                    // viewType
                                    // disable
                                    topLabel={<>
                                        迄點
                                        <Text theme={laptop.convertContainer}
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
                                    value={globalContextService.get("WhiteCallCarPage", "EndPos") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("WhiteCallCarPage", "EndPos", value);
                                    }}
                                    onSelect={(e, option, onInitial, posInfo) => {
                                        map8Controll.addOrUpdateMarkerPoints("test1", [
                                            ...(map8Controll.getMarkerPoints("test1")?.[0] ? [map8Controll.getMarkerPoints("test1")[0]] : []),
                                            [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat],
                                        ]) // 更新選中起點

                                        globalContextService.set("WhiteCallCarPage", "EndPos", option.label);
                                        map8Controll.setCenter("test1", [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat]); // 移動中心點
                                        map8Controll.removeOneRoute("test1"); // 移除路線

                                        setForceUpdate(f => !f)
                                    }}

                                    theme={laptop.endPos}
                                />

                                {/* 願意共乘 RideTogetherReview */}
                                <Radio
                                    // viewType
                                    // disable
                                    topLabel={"願意共乘"}
                                    value={globalContextService.get("WhiteCallCarPage", "RideTogetherReview") ?? 1}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("WhiteCallCarPage", "RideTogetherReview", value);
                                        // console.log(globalContextService.get("CarsAddPage", "CarReview"));
                                    }}
                                    theme={laptop.rideTogetherReview}
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
                                    value={globalContextService.get("WhiteCallCarPage", "CarType") ?? null}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("WhiteCallCarPage", "CarType", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇車種類型", isDisabled: true },
                                        ...props?.AllCarType
                                    ]}
                                    // menuPosition={true}
                                    theme={laptop.carType}
                                />

                                {/* 聯絡電話 Phone */}
                                <TextInput
                                    topLabel={<>聯絡電話</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={"請輸入電話號碼"}
                                    value={globalContextService.get("WhiteCallCarPage", "Phone") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("WhiteCallCarPage", "Phone", value);
                                    }}
                                    theme={laptop.phone}
                                />

                                {/* 搭車人數 AccompanyCounts */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>搭車人數</>}
                                    bottomLabel={""}
                                    //viewType
                                    isSearchable
                                    placeholder={"選擇搭乘人數"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("WhiteCallCarPage", "AccompanyCounts") ?? null}
                                    onChange={(e, value, onInitial) => {
                                        if (!isEqual(value, globalContextService.get("WhiteCallCarPage", "AccompanyCounts"))) {
                                            // 清空重新選擇前的值
                                            let preNum = globalContextService.get("WhiteCallCarPage", "AccompanyCounts")?.value;
                                            Array(preNum).fill(0).forEach((it, ind) => {
                                                globalContextService.remove("WhiteCallCarPage", `TakerName_${ind + 1}`)
                                                globalContextService.remove("WhiteCallCarPage", `TakerBrithday_${ind + 1}`)
                                            });

                                            globalContextService.set("WhiteCallCarPage", "AccompanyCounts", value)
                                            setForceUpdate(f => !f);
                                        }
                                    }}

                                    options={[
                                        { value: 'hint', label: "選擇搭乘人數", isDisabled: true },
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
                                    theme={laptop.accompanyCounts}
                                />

                                {/*維持排版佔位*/}
                                <SubContainer theme={laptop.returnEnableDateOccupy} />

                                {!isNil(globalContextService.get("WhiteCallCarPage", "AccompanyCounts"))
                                    &&
                                    (Array(globalContextService.get("WhiteCallCarPage", "AccompanyCounts")?.value)).fill(0).map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                {/* 搭車姓名 TakerName */}
                                                <TextInput
                                                    topLabel={`搭車姓名${index + 1}`}
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="text"
                                                    placeholder={``}
                                                    value={globalContextService.get("WhiteCallCarPage", `TakerName_${index + 1}`) ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("WhiteCallCarPage", `TakerName_${index + 1}`, value);
                                                    }}
                                                    theme={laptop.takerName}
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
                                                        (globalContextService.get("WhiteCallCarPage", `TakerBrithday_${index + 1}`)) ?
                                                            moment(globalContextService.get("WhiteCallCarPage", `TakerBrithday_${index + 1}`), "YYYY-MM-DD HH:mm:ss")
                                                            :
                                                            null
                                                    }
                                                    onChange={(value, momentObj) => {
                                                        globalContextService.set("WhiteCallCarPage", `TakerBrithday_${index + 1}`, value);
                                                    }}
                                                    theme={laptop.takerBrithday}
                                                />
                                            </React.Fragment>
                                        )
                                    })
                                }

                            </FormRow>
                        </FormContainer>

                        {/* 叫車表單下方按鈕列 */}
                        <BasicContainer
                            theme={laptop.callCarFormBottomContainer}
                        >
                            {/* 回列表按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptop.returnButton}
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
                                theme={laptop.reservationNow}
                                onClick={() => {
                                    //#region 表單驗證
                                    let validMsg = "";

                                    if (valid(globalContextService.get("WhiteCallCarPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteCallCarPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteCallCarPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteCallCarPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteCallCarPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteCallCarPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteCallCarPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteCallCarPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]
                                    }
                                    // else if (map8Controll.getMarkerPoints("test1").length !== 2) {
                                    //     validMsg = "請重新輸入起訖地址"
                                    // }
                                    else if (valid(globalContextService.get("WhiteCallCarPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteCallCarPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteCallCarPage", "Phone") ?? "", ["^.{1,}$"], ["請輸入聯絡電話"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteCallCarPage", "Phone") ?? "", ["^.{1,}$"], ["請輸入聯絡電話"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteCallCarPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteCallCarPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]
                                    }
                                    else if (
                                        !(
                                            (Array(globalContextService.get("WhiteCallCarPage", "AccompanyCounts")?.value)).fill(0)
                                                .map((item, index) => {
                                                    // 必須保留多種檢核的可能，不能只有寫死檢核必輸
                                                    return [
                                                        valid(globalContextService.get("WhiteCallCarPage", `TakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車姓名${index + 1}`])[1],
                                                        valid(globalContextService.get("WhiteCallCarPage", `TakerBrithday_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車生日${index + 1}`])[1]
                                                    ]
                                                }).flat().every(V => (V === null))
                                        )
                                    ) {

                                        validMsg = (Array(globalContextService.get("WhiteCallCarPage", "AccompanyCounts")?.value)).fill(0)
                                            .map((item, index) => {
                                                return [
                                                    valid(globalContextService.get("WhiteCallCarPage", `TakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車姓名${index + 1}`])[1],
                                                    valid(globalContextService.get("WhiteCallCarPage", `TakerBrithday_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車生日${index + 1}`])[1]
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
                                            CarCategoryName: globalContextService.get("WhiteCallCarPage", "CarType").label, //車種 的 label
                                            canShared: globalContextService.get("WhiteCallCarPage", "RideTogetherReview") === 1 ? true : false, //願意共乘
                                            carCategoryId: globalContextService.get("WhiteCallCarPage", "CarType").value,	//車種 的 value
                                            date: globalContextService.get("WhiteCallCarPage", "TravelDate"), //預約日期
                                            fromAddr: globalContextService.get("WhiteCallCarPage", "StartPos"), //	起點
                                            fromLat: map8Controll.getMarkerPoints("test1")?.[0]?.[1] ?? 0, //起點緯度
                                            fromLon: map8Controll.getMarkerPoints("test1")?.[0]?.[0] ?? 0,//起點經度
                                            // id: ""	白牌預約訂單 id
                                            noticePhone: globalContextService.get("WhiteCallCarPage", "Phone"),	//畫面無此欄位
                                            orgId: "",//	畫面無此欄位
                                            passengerNum: globalContextService.get("WhiteCallCarPage", "AccompanyCounts").value,	//搭乘人數
                                            remark: JSON.stringify((Array(globalContextService.get("WhiteCallCarPage", "AccompanyCounts")?.value)).fill(0).map((item, index) => {
                                                return {
                                                    name: globalContextService.get("WhiteCallCarPage", `TakerName_${index + 1}`),
                                                    birth: globalContextService.get("WhiteCallCarPage", `TakerBrithday_${index + 1}`)
                                                }
                                            })),	//搭乘人員資訊陣列
                                            reserveDate: `${globalContextService.get("WhiteCallCarPage", "TravelDate")} ${globalContextService.get("WhiteCallCarPage", "TravelTime")}`,	//預約日期+ 預約時間
                                            selfPayUserId: props.CaseUserId, //白牌個案id
                                            status: 1,	//畫面無此欄位
                                            time: globalContextService.get("WhiteCallCarPage", "TravelTime"), //預約時間
                                            toAddr: globalContextService.get("WhiteCallCarPage", "EndPos"), //	迄點
                                            toLat: map8Controll.getMarkerPoints("test1")?.[1]?.[0] ?? 0,//	迄點緯度
                                            toLon: map8Controll.getMarkerPoints("test1")?.[1]?.[1] ?? 0,//	迄點經度
                                            userId: props.UserId
                                        })
                                    }
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

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`

