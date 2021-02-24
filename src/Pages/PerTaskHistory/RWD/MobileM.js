import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, MapGoogle, mapGoogleControll, Silder, TaskCard, TitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, BasicButton, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as WheelChair } from '../../../Assets/img/PerTaskHistoryPage/WheelChair.svg'
import { ReactComponent as GetOn } from '../../../Assets/img/PerTaskHistoryPage/GetOn.svg'
import { ReactComponent as GetOff } from '../../../Assets/img/PerTaskHistoryPage/GetOff.svg'
import { ReactComponent as Family } from '../../../Assets/img/PerTaskHistoryPage/Family.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { SystemNewsComponent } from '../SystemNewsComponent/SystemNewsComponent'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined, toString } from 'lodash';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { perTaskHistory: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();

    const statusMapping = (status, getTheme = false) => {

        switch (toString(status)) {
            case "1":
                return "新訂單";
            case "2":
                return "已排班";
            case "3":
                return "已抵達";
            case "4":
                return "客上";
            case "5":
                return "完成";
            case "9":
                return "取消-空趟";
            default:
                return "無此狀態";
        }
    }

    const dateToChinese = (date) => {
        const reserveDate = date?.split(' ');
        if (reserveDate?.[0].substring(5, 7) >= 10) {
            return reserveDate?.[0].substring(5, 7) + "月" + (reserveDate?.[0].substring(8, 10) + "日")
        } else {
            return reserveDate?.[0].substring(6, 7) + "月" + (reserveDate?.[0].substring(8, 10) + "日")
        }
    }
    //#endregion

    return (
        <>
            <TitleBar
                returnIcon
                returnIconOnClick={(e) => { history.goBack(); }}
            />

            <MainPageContainer
                height={Height}
                theme={mobileM.mainPageContainer}
                outSideTopComponent={
                    <>
                    </>
                }
            >

                <BasicContainer
                    theme={mobileM.cardOutContainer}
                >
                    {props?.TodayTask?.map((item, index) => {
                        return (
                            <TaskCard
                                key={index}
                                data={item?.despatchOfCaseOrderCourseViews} // 調度單資料
                                nameType // timeNameType、nameType 顯示名字、或顯示時間與名字
                                // timeNameType // timeNameType、nameType 顯示名字、或顯示時間與名字
                                // needAction // 是否需要點即後，文字變成執行中
                                nameKeyName={"name"} // nameKeyName 對應資料 名字 的 key 名
                                TimeKeyName={"reserveDate"} // TimeKeyName 對應資料 時間 的 key 名
                                // callBackKeyName 有需要回調 則在資料中補上回調，並指定 key名
                                primaryKey={"orderId"}// primaryKey 對應資料 唯一鍵 的 key 名
                                // defaultUsePrimaryKey={props?.defaultPrimary} // 初始要使用的分頁 (值要對應到 primaryKey)
                                theme={{
                                    topContainer: {
                                        basic: (style, props) => ({
                                            ...style,
                                            minHeight: "55px",
                                            height: "auto"
                                        })
                                    }
                                }}
                                topContent={(data) => {
                                    console.log(data)
                                    return (
                                        <>
                                            <Container>
                                                {/* 乘車時間 */}
                                                <Text
                                                    theme={mobileM.reserveDateFirstText}
                                                >
                                                    {dateToChinese(data?.reserveDate)}
                                                </Text>
                                                <Text
                                                    theme={mobileM.reserveDateSecondText}
                                                >
                                                    {`${data?.reserveDate.split(' ')[1].substring(0, 5)}`}
                                                </Text>

                                                {/* 輪椅 */}
                                                <Text
                                                    theme={mobileM.wheelChairText}
                                                >
                                                    <WheelChair style={mobileM.wheelChairSvg} />
                                                    {data?.wheelchairType}
                                                </Text>
                                            </Container>

                                        </>
                                    )
                                }}
                                bottomContent={(data) => {
                                    console.log(data)
                                    const drawLine = () => {
                                        if (data?.polyLine && mapGoogleControll.getBasicMap("test1")) {
                                            mapGoogleControll.deletePolylineRoute("test1")
                                            mapGoogleControll.addPolylineRoute("test1", data?.polyLine)
                                        }

                                    }

                                    return (
                                        <>

                                            {/* 狀態容器 */}
                                            {/* <SubContainer
                                                theme={mobileM.statusContainer}
                                            >
                                                <SubContainer
                                                    theme={mobileM.statusInsideContainer}
                                                    onClick={() => {
                                                        history.push(`/PerTaskHistory?despatch=${data.despatchNo}&defaultPrimary=${data.orderId}`)
                                                    }}
                                                > */}

                                            {/* 訂單狀態 */}
                                            {/* <Text
                                                        theme={mobileM.statusText}
                                                    >
                                                        訂單狀態
                                                    </Text>
                                                    <Text
                                                        theme={mobileM.statusRightText}
                                                    >
                                                        {statusMapping(data?.status)} */}
                                            {/* <Arrow style={mobileM.arrowSvg} /> */}
                                            {/* </Text>

                                                </SubContainer>
                                            </SubContainer> */}
                                            <Container>
                                                <SubContainer theme={mobileM.expectedContainer}>
                                                    <Text theme={mobileM.expectedTitleText}>
                                                        預估里程
                                                    </Text>
                                                    <Text theme={mobileM.expectedValueText}>
                                                        {data?.totalMileage}
                                                    </Text>
                                                    <Text theme={mobileM.expectedRightText}>
                                                        公里
                                                    </Text>
                                                </SubContainer>
                                                <SubContainer theme={mobileM.expectedContainer}>
                                                    <Text theme={mobileM.expectedTitleText}>
                                                        預估時間
                                                    </Text>
                                                    <Text theme={mobileM.expectedValueText}>
                                                        {data?.expectedMinute}
                                                    </Text>
                                                    <Text theme={mobileM.expectedRightText}>
                                                        分鐘
                                                    </Text>
                                                </SubContainer>
                                            </Container>

                                            {/* 地圖容器 */}
                                            <BasicContainer
                                                open={props.Open}
                                                height={Height}
                                                theme={mobileM.mapContainer}
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

                                                    theme={mobileM.map}
                                                />

                                                {drawLine()}

                                            </BasicContainer>

                                            {/* 地圖下方容器 */}
                                            <Container
                                                theme={mobileM.mapBotContainer}
                                            >
                                                <SubContainer
                                                    theme={mobileM.accompanyContainer}
                                                >
                                                    <Family style={mobileM.accompanyIcon} />
                                                    <Text
                                                        theme={mobileM.accompanyText}
                                                    >
                                                        預估陪同
                                                </Text>
                                                </SubContainer>
                                                <SubContainer
                                                    theme={mobileM.familyContainer}
                                                >
                                                    <Text
                                                        theme={mobileM.familyValueText}
                                                    >
                                                        {data?.familyWith}
                                                    </Text>
                                                    <Text
                                                        theme={mobileM.familyText}
                                                    >
                                                        人
                                                    </Text>
                                                </SubContainer>
                                                {/* <SubContainer
                                                    theme={mobileM.familyContainer}
                                                >
                                                    <Text
                                                        theme={mobileM.familyText}
                                                    >
                                                        家屬
                                                    </Text>
                                                    <Text
                                                        theme={mobileM.familyValueText}
                                                    >
                                                        {"1"}
                                                    </Text>
                                                </SubContainer> */}
                                                {/* <SubContainer
                                                    theme={mobileM.familyContainer}
                                                >
                                                    <Text
                                                        theme={mobileM.familyText}
                                                    >
                                                        外籍
                                                    </Text>
                                                    <Text
                                                        theme={mobileM.familyValueText}
                                                    >
                                                        {"3"}
                                                    </Text>
                                                </SubContainer> */}
                                            </Container>

                                            {/* 上車地點容器 */}
                                            <SubContainer theme={mobileM.addrContainer}>
                                                <Container style={{ height: "40px" }}>
                                                    <GetOn />
                                                    {/* 上車地點標題 */}
                                                    <Text
                                                        theme={mobileM.toAddrTitleText}
                                                    >
                                                        上車地點
                                                </Text>
                                                </Container>
                                                {/* 上車地點註記 */}
                                                <Text
                                                    theme={mobileM.toAddrRemarkText}
                                                >
                                                    {data.fromAddrRemark}
                                                </Text>

                                                {/* 上車地點 */}
                                                <Text
                                                    theme={mobileM.toAddrText}
                                                >
                                                    {data.fromAddr}
                                                </Text>
                                            </SubContainer>

                                            {/* 下車地點容器 */}
                                            <SubContainer theme={mobileM.addrContainer}>
                                                <Container style={{ height: "40px" }}>
                                                    <GetOff />
                                                    {/* 下車地點標題 */}
                                                    <Text
                                                        theme={mobileM.toAddrTitleText}
                                                    >
                                                        下車地點
                                                    </Text>
                                                </Container>

                                                {/* 下車地點註記 */}
                                                <Text
                                                    theme={mobileM.toAddrRemarkText}
                                                >
                                                    {data.toAddrRemark}
                                                </Text>

                                                {/* 下車地點 */}
                                                <Text
                                                    theme={mobileM.toAddrText}
                                                >
                                                    {data.toAddr}
                                                </Text>
                                            </SubContainer>

                                            {/* 車資容器 */}
                                            <Container
                                                theme={mobileM.amtOutContainer}
                                            >
                                                <SubContainer theme={mobileM.amtContainer}>
                                                    <Text theme={mobileM.amtTitleText}>
                                                        應收車資
                                                    </Text>
                                                    <Text theme={mobileM.amtValueText}>
                                                        {data?.totalAmt}
                                                    </Text>
                                                </SubContainer>
                                                <SubContainer theme={mobileM.amtContainer}>
                                                    <Text theme={mobileM.amtTitleText}>
                                                        實收車資
                                                    </Text>
                                                    <Text theme={mobileM.amtValueText}>
                                                        {data?.receivePay}
                                                    </Text>
                                                </SubContainer>
                                            </Container>

                                            {/* 司機備註容器 */}
                                            <SubContainer theme={mobileM.driverRemarkContainer}>
                                                {/* 司機備註標題 */}
                                                <Text
                                                    theme={mobileM.driverRemarkTitleText}
                                                >
                                                    司機備註
                                                </Text>
                                                {/* 司機備註內容 */}
                                                <Text
                                                    theme={mobileM.driverRemarkText}
                                                >
                                                    {data?.remark}
                                                </Text>
                                            </SubContainer>

                                            {/* 底部按鈕容器 */}
                                            <SubContainer theme={mobileM.buttonContainer}>
                                                <NativeLineButton
                                                    theme={mobileM.backButton}
                                                    onClick={() => {
                                                        history.push(`/TaskHistory`)
                                                    }}
                                                >
                                                    返回任務列表
                                                </NativeLineButton>
                                            </SubContainer>
                                        </>
                                    )
                                }}
                            />
                        )
                    })}


                </BasicContainer>


            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
