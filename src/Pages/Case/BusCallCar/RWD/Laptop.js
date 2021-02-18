import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar, Map8Canvas, map8Controll, Map8Input } from '../../../../ProjectComponent';
import { ReactComponent as Search } from '../../../../Assets/img/BusCallCarPage/Search.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/BusCallCarPage/Convert.svg'
import { ReactComponent as StartToEnd } from '../../../../Assets/img/BusCallCarPage/StartToEnd.svg'
import { ReactComponent as UpCircle } from '../../../../Assets/img/BusCallCarPage/UpCircle.svg'
import { ReactComponent as End } from '../../../../Assets/img/BusCallCarPage/End.svg'
import { ReactComponent as Start } from '../../../../Assets/img/BusCallCarPage/Start.svg'
import { ReactComponent as People } from '../../../../Assets/img/BusCallCarPage/People.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption, notDistributableReasonSelectOption } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';
import { fmt } from '../../../../Handlers/DateHandler';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { busCallCar: { rwd: { laptop } } } } } = Theme;

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
                                {globalContextService.get("BusCallCarPage", "StartPos")?.label}
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
                                {globalContextService.get("BusCallCarPage", "EndPos")?.label}
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
                                        globalContextService.set("BusCallCarPage", "CheckedRowKeys", checkedRowKeys);
                                        globalContextService.set("BusCallCarPage", "CheckedRowsData", checkedRows);
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
                                            dataIndex: 'stroke',
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
                                            width: "110px",
                                            dataIndex: 'estDistance',
                                            // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '預估時間',
                                            width: "110px",
                                            dataIndex: 'estTime',
                                            // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '車資總額',
                                            width: "110px",
                                            dataIndex: 'totalAmount',
                                            // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '陪同總額',
                                            width: "110px",
                                            dataIndex: 'compAmount',
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
                                {props?.CaseName}
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
                                        (globalContextService.get("BusCallCarPage", "TravelDate")) ?
                                            moment(globalContextService.get("BusCallCarPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        if (value !== globalContextService.get("BusCallCarPage", "TravelDate")) {
                                            globalContextService.set("BusCallCarPage", "TravelDate", value);
                                            globalContextService.remove("BusCallCarPage", "Route")
                                            globalContextService.remove("BusCallCarPage", "StartPos")
                                            globalContextService.remove("BusCallCarPage", "EndPos")
                                            setForceUpdate(f => !f)
                                        }
                                    }}
                                    theme={laptop.travelDate}
                                />

                                {/*  乘車日期檢核 */}
                                {
                                    // !isNil(globalContextService.get("BusCallCarPage", "TravelDate"))
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
                                                (globalContextService.get("BusCallCarPage", "TravelTime")) ?
                                                    moment(globalContextService.get("BusCallCarPage", "TravelTime"), "HH:mm")
                                                    :
                                                    null
                                            }
                                            onChange={(value, momentObj) => {
                                                globalContextService.set("BusCallCarPage", "TravelTime", value);
                                            }}
                                            theme={laptop.travelTime}
                                        />
                                    </>
                                }

                                {/* 搭車人數 AccTotalCounts */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<><People style={{ position: "absolute", left: "0px" }} />搭車人數</>}
                                    //viewType
                                    isSearchable
                                    placeholder={"請選擇人數"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("BusCallCarPage", "AccTotalCounts") ?? null}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusCallCarPage", "AccTotalCounts", value);
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
                                    theme={laptop.accTotalCounts}
                                />

                                {/* 路線 Route*/}
                                <Selector
                                    placeholder={"請選擇路線"}
                                    isSearchable
                                    // viewType
                                    disabled={isNil(globalContextService.get("BusCallCarPage", "TravelDate"))}
                                    topLabel={"路線"}
                                    baseDefaultTheme={"DefaultTheme"}
                                    value={globalContextService.get("BusCallCarPage", "Route") ?? null}
                                    onChange={(e, value, onInitial) => {
                                        if (value !== globalContextService.get("BusCallCarPage", "Route")) {
                                            globalContextService.set("BusCallCarPage", "Route", value);
                                            globalContextService.remove("BusCallCarPage", "StartPos")
                                            globalContextService.remove("BusCallCarPage", "EndPos")
                                            props.getStationOnRoute(value?.id)
                                            setForceUpdate(f => !f)
                                        }
                                    }}
                                    options={[
                                        ...props.AllRoute?.filter((item) => (item?.workWeek?.split(",").includes(moment(globalContextService.get("BusCallCarPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss").isoWeekday()?.toString())))
                                        // { value: '0', label: "請選擇路線", isDisabled: true },
                                        // { value: '1', label: '路線A' },
                                        // { value: '2', label: '路線B' },
                                    ]}


                                    theme={laptop.route}
                                />

                                {/* 起點 StartPos*/}
                                <Selector
                                    placeholder={"請選擇起點"}
                                    isSearchable
                                    // viewType
                                    disabled={isNil(globalContextService.get("BusCallCarPage", "Route"))}
                                    topLabel={
                                        <>
                                            起點
                                        < Text theme={laptop.convertContainer}
                                                onClick={() => {
                                                    // let end = map8Controll.getMarkerPoints("test1")?.[1]?.[0] // 迄點緯度
                                                    // let start = map8Controll.getMarkerPoints("test1")?.[0]?.[0] // 起點緯度

                                                    let validMsg = "";
                                                    if (valid(globalContextService.get("BusCallCarPage", "StartPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]) {
                                                        validMsg = valid(globalContextService.get("BusCallCarPage", "StartPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]
                                                    }
                                                    else if (valid(globalContextService.get("BusCallCarPage", "EndPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]) {
                                                        validMsg = valid(globalContextService.get("BusCallCarPage", "EndPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]
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

                                                        let startAddr = globalContextService.get("BusCallCarPage", "StartPos");
                                                        let endAddr = globalContextService.get("BusCallCarPage", "EndPos");
                                                        globalContextService.set("BusCallCarPage", "EndPos", { value: startAddr?.value, label: startAddr?.label });
                                                        globalContextService.set("BusCallCarPage", "StartPos", { value: endAddr?.value, label: endAddr?.label });

                                                        // map8Controll.addOrUpdateMarkerPoints("test1", [
                                                        //     ...([map8Controll.getMarkerPoints("test1")?.[1]]),
                                                        //     ...([map8Controll.getMarkerPoints("test1")?.[0]]),
                                                        // ])

                                                        // map8Controll.removeOneRoute("test1"); // 移除路線
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
                                    value={globalContextService.get("BusCallCarPage", "StartPos") ?? []}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusCallCarPage", "StartPos", value);
                                        setForceUpdate(f => !f)
                                    }}
                                    options={[
                                        ...(props?.StationOnRoute?.assignLineStations ?? []).map((item, index) => {
                                            return props.AllStation.filter(s => s.id === item)[0]
                                        })
                                        // { value: '0', label: "請選擇起點", isDisabled: true },
                                        // { value: '1', label: 'A站' },
                                        // { value: '2', label: 'B站' },
                                    ]}
                                    theme={laptop.startPos}
                                />

                                {/* 迄點 EndPos*/}
                                <Selector
                                    placeholder={"請選擇訖點"}
                                    isSearchable
                                    // viewType
                                    disabled={isNil(globalContextService.get("BusCallCarPage", "Route"))}
                                    topLabel={"迄點"}
                                    baseDefaultTheme={"DefaultTheme"}
                                    value={globalContextService.get("BusCallCarPage", "EndPos") ?? []}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusCallCarPage", "EndPos", value);
                                        setForceUpdate(f => !f)
                                    }}
                                    options={[
                                        ...(props?.StationOnRoute?.assignLineStations ?? []).map((item, index) => {
                                            return props.AllStation.filter(s => s.id === item)[0]
                                        })
                                    ]}

                                    theme={laptop.endPos}
                                />

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
                                    props.controllGCS("return");
                                    history.push("/Case")
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
                                    if (valid(globalContextService.get("BusCallCarPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
                                        validMsg = valid(globalContextService.get("BusCallCarPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
                                    }
                                    else if (valid(globalContextService.get("BusCallCarPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
                                        validMsg = valid(globalContextService.get("BusCallCarPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
                                    }
                                    else if (valid(globalContextService.get("BusCallCarPage", "AccTotalCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]) {
                                        validMsg = valid(globalContextService.get("BusCallCarPage", "AccTotalCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]
                                    }
                                    else if (valid(globalContextService.get("BusCallCarPage", "Route")?.value ?? "", ["^.{1,}$"], ["請選擇路線"])[1]) {
                                        validMsg = valid(globalContextService.get("BusCallCarPage", "Route")?.value ?? "", ["^.{1,}$"], ["請選擇路線"])[1]
                                    }
                                    else if (valid(globalContextService.get("BusCallCarPage", "StartPos")?.value ?? "", ["^.{1,}$"], ["請選擇起點"])[1]) {
                                        validMsg = valid(globalContextService.get("BusCallCarPage", "StartPos")?.value ?? "", ["^.{1,}$"], ["請選擇起點"])[1]
                                    }
                                    else if (valid(globalContextService.get("BusCallCarPage", "EndPos")?.value ?? "", ["^.{1,}$"], ["請選擇訖點"])[1]) {
                                        validMsg = valid(globalContextService.get("BusCallCarPage", "EndPos")?.value ?? "", ["^.{1,}$"], ["請選擇訖點"])[1]
                                    }

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
                                        // console.log("busUserId : " + props.UserId);
                                        // console.log("date : " + globalContextService.get("BusCallCarPage", "TravelDate"));
                                        // console.log("fromStationId : " + globalContextService.get("BusCallCarPage", "StartPos").value);
                                        // console.log("fromStationName : " + globalContextService.get("BusCallCarPage", "StartPos").label);
                                        // console.log("passengerNum : " + globalContextService.get("BusCallCarPage", "AccTotalCounts").value);
                                        // console.log("reserveDate : " + globalContextService.get("BusCallCarPage", "TravelDate") + " " + globalContextService.get("BusCallCarPage", "TravelTime"));
                                        // console.log("stationLineId : " + globalContextService.get("BusCallCarPage", "Route").value);
                                        // console.log("stationLineName : " + globalContextService.get("BusCallCarPage", "Route").label);
                                        // console.log("time : " + globalContextService.get("BusCallCarPage", "TravelTime"));
                                        // console.log("toStationId : " + globalContextService.get("BusCallCarPage", "EndPos").value);
                                        // console.log("toStationName : " + globalContextService.get("BusCallCarPage", "EndPosRoute").label);

                                        props.AddBusCallCarExecute({
                                            busUserId: props.CaseUserId,// 幸福巴士個案id
                                            date: globalContextService.get("BusCallCarPage", "TravelDate"), // 預約日期
                                            fromStationId: globalContextService.get("BusCallCarPage", "StartPos").value, // 起點站牌id
                                            fromStationName: globalContextService.get("BusCallCarPage", "StartPos").label, // 起點站牌名字
                                            // id:  // 幸福巴士預約訂單 id	新增無須上送
                                            orgId: "",	// 畫面無此欄位	代空字串就好 ""
                                            passengerNum: globalContextService.get("BusCallCarPage", "AccTotalCounts").value, // 搭車人數
                                            reserveDate: globalContextService.get("BusCallCarPage", "TravelDate") + " " + globalContextService.get("BusCallCarPage", "TravelTime"), // 預約日期+預約時間	如: "2020-11-25 17:45"
                                            stationLineId: globalContextService.get("BusCallCarPage", "Route").value, // 路線id
                                            stationLineName: globalContextService.get("BusCallCarPage", "Route").label, // 路線名字
                                            time: globalContextService.get("BusCallCarPage", "TravelTime"), //預約時間
                                            toStationId: globalContextService.get("BusCallCarPage", "EndPos").value, // 訖點站牌id
                                            toStationName: globalContextService.get("BusCallCarPage", "EndPos").label, //訖點站牌名字
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
