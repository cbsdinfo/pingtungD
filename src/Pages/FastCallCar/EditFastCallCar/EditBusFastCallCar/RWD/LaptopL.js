import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../../Store/Store'
import { BUnitSort, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar, MapGoogle } from '../../../../../ProjectComponent';
import { ReactComponent as End2 } from '../../../../../Assets/img/EditBusFastCallCarPage/End2.svg'
import { ReactComponent as Start2 } from '../../../../../Assets/img/EditBusFastCallCarPage/Start2.svg'
import { ReactComponent as Vector } from '../../../../../Assets/img/EditBusFastCallCarPage/Vector.svg'
import { ReactComponent as Minus } from '../../../../../Assets/img/EditBusFastCallCarPage/Minus.svg'
import { ReactComponent as People } from '../../../../../Assets/img/EditBusFastCallCarPage/People.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, NewSelector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { getParseItemLocalStorage, valid } from '../../../../../Handlers';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { fastCallCar: { editFastCallCar: { editBus: { rwd: { laptopL } } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory();

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            console.log(location, action, "路由變化")
            // globalContextService.remove("BusCallCarPage", "firstUseAPIgetClient");
            // globalContextService.remove("BusCallCarPage", "firstUseAPIgetSubOrgs");
        });

        return () => {
            historyUnlisten();
        }
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
                            {/* {props?.CaseName} */}
                        王曉明
                    </Text>

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
                                value={globalContextService.get("EditBusFastCallCarPage", "RouteName") ?? null}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("EditBusFastCallCarPage", "RouteName", value);
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
                                open={props.TodayToDoOpen}
                            >
                                {/* 車行 CarDealership */}
                                {/* <TextInput
                            viewType
                            topLabel={<>車行</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            // placeholder={""}
                            value={globalContextService.get("EditBusFastCallCarPage", "CarDealership") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("EditBusFastCallCarPage", "CarDealership", value);
                            }}
                            theme={laptopL.carDealership}
                        /> */}

                                {/* 路線容器 */}
                                <Container
                                    theme={laptopL.routeContainer}
                                >
                                    {/* 路線 Route*/}
                                    <NewSelector
                                        placeholder={"請選擇路線"}
                                        isSearchable
                                        // viewType
                                        disabled={isNil(globalContextService.get("EditBusFastCallCarPage", "TravelDate"))}
                                        topLabel={"路線"}
                                        baseDefaultTheme={"DefaultTheme"}
                                        value={globalContextService.get("EditBusFastCallCarPage", "Route") ?? null}
                                        onChange={(e, value, onInitial) => {
                                            if (value !== globalContextService.get("EditBusFastCallCarPage", "Route")) {
                                                console.log("路線")
                                                globalContextService.set("EditBusFastCallCarPage", "Route", value);
                                                globalContextService.remove("EditBusFastCallCarPage", "StartPos")
                                                globalContextService.remove("EditBusFastCallCarPage", "EndPos")
                                                props.getStationOnRoute(value?.id)
                                                setForceUpdate(f => !f)
                                            }
                                        }}
                                        options={[
                                            ...props.AllRoute?.filter((item) => (item?.workWeek?.split(",").includes(moment(globalContextService.get("EditBusFastCallCarPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss").isoWeekday()?.toString())))
                                            // { value: '0', label: "請選擇路線", isDisabled: true },
                                            // { value: '1', label: '路線A' },
                                            // { value: '2', label: '路線B' },
                                        ]}

                                        theme={laptopL.route}
                                    />
                                </Container>
                                <Container
                                    theme={laptopL.routeContainer}
                                ></Container>
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
                                        {globalContextService.get("EditBusFastCallCarPage", "StartPos")?.label}
                                    </Text>

                                    {/* 起點站牌 StartPos*/}
                                    <NewSelector
                                        placeholder={"請選擇起點"}
                                        isSearchable
                                        // viewType
                                        disabled={isNil(globalContextService.get("EditBusFastCallCarPage", "Route"))}
                                        topLabel={"起點站牌"}
                                        baseDefaultTheme={"DefaultTheme"}
                                        value={globalContextService.get("EditBusFastCallCarPage", "StartPos") ?? []}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("EditBusFastCallCarPage", "StartPos", value);
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
                                        {globalContextService.get("EditBusFastCallCarPage", "EndPos")?.label}
                                    </Text>

                                    <NativeLineButton theme={laptopL.convertButton}
                                        onClick={() => {
                                            let validMsg = "";
                                            if (valid(globalContextService.get("EditBusFastCallCarPage", "StartPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]) {
                                                validMsg = valid(globalContextService.get("EditBusFastCallCarPage", "StartPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]
                                            }
                                            else if (valid(globalContextService.get("EditBusFastCallCarPage", "EndPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]) {
                                                validMsg = valid(globalContextService.get("EditBusFastCallCarPage", "EndPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]
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

                                                let startAddr = globalContextService.get("EditBusFastCallCarPage", "StartPos");
                                                let endAddr = globalContextService.get("EditBusFastCallCarPage", "EndPos");
                                                globalContextService.set("EditBusFastCallCarPage", "EndPos", { value: startAddr?.value, label: startAddr?.label });
                                                globalContextService.set("EditBusFastCallCarPage", "StartPos", { value: endAddr?.value, label: endAddr?.label });
                                            }
                                            setForceUpdate(f => !f)
                                        }}
                                    >
                                        <Vector style={laptopL.convertContainerIcon} />
                                            起訖點互換
                                </NativeLineButton>

                                    {/* 迄點站牌 EndPos*/}
                                    <NewSelector
                                        placeholder={"請選擇訖點"}
                                        isSearchable
                                        // viewType
                                        disabled={isNil(globalContextService.get("EditBusFastCallCarPage", "Route"))}
                                        topLabel={"迄點站牌"}
                                        baseDefaultTheme={"DefaultTheme"}
                                        value={globalContextService.get("EditBusFastCallCarPage", "EndPos") ?? []}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("EditBusFastCallCarPage", "EndPos", value);
                                            setForceUpdate(f => !f)
                                        }}
                                        options={[
                                            ...(props?.StationOnRoute?.assignLineStations ?? []).map((item, index) => {
                                                return props.AllStation.filter(s => s.id === item)[0]
                                            })
                                        ]}

                                        theme={laptopL.endPos}
                                    />
                                </Container>

                                {/* 搭車人數及簡訊容器 */}
                                <Container
                                    theme={laptopL.numberContainer}
                                >
                                    {/* 簡訊號碼 SmsNumber */}
                                    <Text theme={laptopL.formSubTitleText}>接收簡訊號碼</Text>
                                    <TextInput
                                        // topLabel={<>接收簡訊號碼</>}
                                        baseDefaultTheme={"DefaultTheme"}
                                        type="text"
                                        placeholder={"請輸入手機號碼"}
                                        value={globalContextService.get("EditBusFastCallCarPage", "SmsNumber") ?? props.CaseUsers?.enableDate}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("EditBusFastCallCarPage", "SmsNumber", value);
                                        }}
                                        theme={laptopL.smsNumber}
                                    />

                                    {/* 搭車人數 AccTotalCounts */}
                                    <Text theme={laptopL.formSubTitleText}>搭車人數</Text>
                                    <NewSelector
                                        baseDefaultTheme={"DefaultTheme"}
                                        // topLabel={"搭車人數"}
                                        //viewType
                                        isSearchable
                                        placeholder={""}
                                        // isMulti
                                        // hideSelectedOptions={false}
                                        value={globalContextService.get("EditBusFastCallCarPage", "AccTotalCounts") ?? null}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("EditBusFastCallCarPage", "AccTotalCounts", value);
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
                                        theme={laptopL.accTotalCounts}
                                    />

                                </Container>

                                {/* Table 容器 */}
                                <Container
                                    bascDefaultTheme={"DefaultTheme"}
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
                                                globalContextService.set("EditBusFastCallCarPage", "CheckedRowKeys", checkedRowKeys);
                                                globalContextService.set("EditBusFastCallCarPage", "CheckedRowsData", checkedRows);
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
                                                    width: "70px",
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
                                        ]}
                                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                                        // data={props.AllCars.data}
                                        clickPage={(currentPage, pageSize) => {
                                        }}
                                    />
                                </Container>
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
                                        let validMsg = "";
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
                                            //     reserveDate: globalContextService.get("EditBusFastCallCarPage", "TravelDate") + " " + globalContextService.get("EditBusFastCallCarPage", "TravelTime"), // 預約日期+預約時間	如: "2020-11-25 17:45",
                                            //     transOrgs: globalContextService.get("EditBusFastCallCarPage", "BUnitSort")?.map(item => item?.id), // 優先搭乘車行排序
                                            //     createdIdentity: globalContextService.get("EditBusFastCallCarPage", "Orderer")?.value, // 訂車人身分
                                            //     fromAddr: globalContextService.get("EditBusFastCallCarPage", "StartPos"), // 起點
                                            //     fromAddrRemark: (
                                            //         globalContextService.get("EditBusFastCallCarPage", "StartPosRemarks")?.label === "其他" ?
                                            //             globalContextService.get("EditBusFastCallCarPage", "OtherStartPosRemarks")
                                            //             :
                                            //             globalContextService.get("EditBusFastCallCarPage", "StartPosRemarks")?.value
                                            //     ), // 起點備註 (含備註 - 其他)
                                            //     toAddr: globalContextService.get("EditBusFastCallCarPage", "EndPos"), // 迄點
                                            //     toAddrRemark: (
                                            //         globalContextService.get("EditBusFastCallCarPage", "EndPosRemarks")?.label === "其他" ?
                                            //             globalContextService.get("EditBusFastCallCarPage", "OtherEndPosRemarks")
                                            //             :
                                            //             globalContextService.get("EditBusFastCallCarPage", "EndPosRemarks")?.value
                                            //     ), // 迄點備註 (含備註 - 其他)
                                            //     remark: "", // 無此欄位
                                            //     isBack: globalContextService.get("EditBusFastCallCarPage", "ScheduleReturnReview") === 1 ? true : false, //我要預約回程 
                                            //     canShared: globalContextService.get("EditBusFastCallCarPage", "RideTogetherReview") === 1 ? true : false, // 願意共乘
                                            //     carCategoryId: globalContextService.get("EditBusFastCallCarPage", "CarType")?.value, // 車種id
                                            //     carCategoryName: globalContextService.get("EditBusFastCallCarPage", "CarType")?.label, // 車種名稱
                                            //     wheelchairType: globalContextService.get("EditBusFastCallCarPage", "Wheelchair")?.value, // 輪椅
                                            //     familyWith: globalContextService.get("EditBusFastCallCarPage", "AccompanyCounts")?.value, // 陪同人數
                                            //     noticePhone: globalContextService.get("EditBusFastCallCarPage", "SmsNumber"), // 簡訊號碼
                                            //     haveNextOrderFlag: false, // 立即預約 按鈕發送
                                            //     isBackOrder: false, // 立即預約 按鈕發送 (去程)
                                            // })

                                            // //回程
                                            // props.AddOrderOfCaseUsersExecute({
                                            //     // id: "", // 訂單id，新增無須上送
                                            //     userId: props.UserId, // 用戶id
                                            //     caseUserId: props.CaseUserId, // 長照身份id
                                            //     orgId: "", // 送空字串
                                            //     reserveDate: globalContextService.get("EditBusFastCallCarPage", "TravelDate") + " " + globalContextService.get("EditBusFastCallCarPage", "ReturnEnableDate"), // 預約日期+預約回程時間	如: "2020-11-25 17:45",
                                            //     transOrgs: globalContextService.get("EditBusFastCallCarPage", "BUnitSort")?.map(item => item?.id), // 優先搭乘車行排序
                                            //     createdIdentity: globalContextService.get("EditBusFastCallCarPage", "Orderer")?.value, // 訂車人身分
                                            //     fromAddr: globalContextService.get("EditBusFastCallCarPage", "EndPos"), // 起點
                                            //     fromAddrRemark: (
                                            //         globalContextService.get("EditBusFastCallCarPage", "EndPosRemarks")?.label === "其他" ?
                                            //             globalContextService.get("EditBusFastCallCarPage", "OtherEndPosRemarks")
                                            //             :
                                            //             globalContextService.get("EditBusFastCallCarPage", "EndPosRemarks")?.value
                                            //     ), // 起點備註 (含備註 - 其他)
                                            //     toAddr: `${props?.CaseUsers?.county}${props?.CaseUsers?.district}${props?.CaseUsers?.addr}`,
                                            //     toAddrRemark: "住家",
                                            //     remark: "", // 無此欄位
                                            //     isBack: globalContextService.get("EditBusFastCallCarPage", "ScheduleReturnReview") === 1 ? true : false, //我要預約回程 
                                            //     canShared: globalContextService.get("EditBusFastCallCarPage", "RideTogetherReview") === 1 ? true : false, // 願意共乘
                                            //     carCategoryId: globalContextService.get("EditBusFastCallCarPage", "CarType")?.value, // 車種id
                                            //     carCategoryName: globalContextService.get("EditBusFastCallCarPage", "CarType")?.label, // 車種名稱
                                            //     wheelchairType: globalContextService.get("EditBusFastCallCarPage", "Wheelchair")?.value, // 輪椅
                                            //     familyWith: globalContextService.get("EditBusFastCallCarPage", "AccompanyCounts")?.value, // 陪同人數
                                            //     noticePhone: globalContextService.get("EditBusFastCallCarPage", "SmsNumber"), // 簡訊號碼
                                            //     haveNextOrderFlag: false, // 立即預約 按鈕發送
                                            //     isBackOrder: true, // 立即預約 按鈕發送 (回程)
                                            // })
                                        }
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
