import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, MapGoogle, mapGoogleControll, Silder, TaskCard, TitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, BasicButton, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as ToGoogleMap } from '../../../Assets/img/PerDespatchPage/ToGoogleMap.svg'
import { ReactComponent as Family } from '../../../Assets/img/PerDespatchPage/Family.svg'
import { ReactComponent as Clock } from '../../../Assets/img/PerDespatchPage/Clock.svg'
import { ReactComponent as Wheelchair } from '../../../Assets/img/PerDespatchPage/Wheelchair.svg'
import { ReactComponent as Up } from '../../../Assets/img/PerDespatchPage/Up.svg'
import { ReactComponent as Down } from '../../../Assets/img/PerDespatchPage/Down.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { SystemNewsComponent } from '../SystemNewsComponent/SystemNewsComponent'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined } from 'lodash';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { perDespatch: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();
    //#region 分頁映射
    const tabMap = (key) => {
        return props.NewsType.map(item => { return item.label })
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
                                data={item?.despatchOfCaseOrderDayViews}
                                nameType // timeNameType、nameType 顯示名字、或顯示時間與名字
                                // timeNameType // timeNameType、nameType 顯示名字、或顯示時間與名字
                                // needAction // 是否需要點即後，文字變成執行中
                                nameKeyName={"name"} // nameKeyName 對應資料 名字 的 key 名
                                TimeKeyName={"reserveDate"} // TimeKeyName 對應資料 時間 的 key 名
                                // callBackKeyName 有需要回調 則在資料中補上回調，並指定 key名
                                primaryKey={"orderId"}// primaryKey 對應資料 唯一鍵 的 key 名
                                defaultUsePrimaryKey={props?.defaultPrimary} // 初始要使用的分頁 (值要對應到 primaryKey)

                                topContent={(data) => {
                                    // console.log(data)
                                    return (
                                        <>
                                            {/* 預估陪同 */}
                                            <Text
                                                theme={mobileM.familyWidhText}
                                            >
                                                <Family style={mobileM.withSvg} />

                                                預估陪同

                                                {/* 預估陪同 資料 */}
                                                <Text
                                                    theme={mobileM.familyWidhData}
                                                >
                                                    {`${data.familyWith}`}
                                                </Text>
                                            </Text>

                                        </>
                                    )
                                }}
                                bottomContent={(data) => {
                                    console.log(data)

                                    const drawLine = () => {
                                        if (data?.polyLine && mapGoogleControll.getBasicMap("test1")) {
                                            mapGoogleControll.addPolylineRoute("test1", data?.polyLine)
                                        }

                                    }

                                    return (
                                        <>
                                            <Container>
                                                {/* 搭車時間 */}
                                                <Text
                                                    theme={mobileM.timeText}
                                                >
                                                    <Clock style={mobileM.clockSvg} />
                                                    {`${data.reserveDate}`.split(' ')[1].substring(0, 5)}
                                                </Text>


                                                {/* 輪椅 */}
                                                <Text
                                                    theme={mobileM.wheelchairTypeText}
                                                >
                                                    <Wheelchair style={mobileM.wheelchairSvg} />
                                                    {`${data.wheelchairType}`}
                                                </Text>

                                            </Container>

                                            {/* 預估容器 */}
                                            <SubContainer
                                                open={props.Open}
                                                theme={mobileM.estimateContainer}
                                            >
                                                {/* 預估里程 */}
                                                <Text
                                                    theme={mobileM.estimateMileageText}
                                                >
                                                    {/* 預估里程 標題 */}
                                                    <Text
                                                        theme={mobileM.estimateMileageTitle}
                                                    >
                                                        {`預估里程`}
                                                    </Text>

                                                    {`${data.totalMileage / 1000}`}

                                                    <Text
                                                        theme={mobileM.minuteText}
                                                    >
                                                        {`公里`}
                                                    </Text>
                                                </Text>


                                                {/* 預估時間 */}
                                                <Text
                                                    theme={mobileM.estimateTimeText}
                                                >
                                                    {/* 預估時間 標題 */}
                                                    <Text
                                                        theme={mobileM.estimateTimeTitle}
                                                    >
                                                        {`預估時間`}
                                                    </Text>

                                                    {`${data.expectedMinute}`}

                                                    <Text
                                                        theme={mobileM.minuteText}
                                                    >
                                                        {`分鐘`}
                                                    </Text>
                                                </Text>

                                            </SubContainer>

                                            {/* 起迄點 容器 */}
                                            <SubContainer
                                                open={props.Open}
                                                theme={mobileM.startToEndContainer}
                                            >
                                                {/* 上車地點 標題 */}
                                                <Text
                                                    open={props.Open}
                                                    theme={mobileM.startTitle}
                                                >
                                                    {`上車地點`}
                                                </Text>

                                                {/* 上車地點 內文 */}
                                                <Text
                                                    open={props.Open}
                                                    theme={mobileM.startText}
                                                >
                                                    {data.fromAddr}
                                                </Text>

                                                {/* 上車地點 備註 */}
                                                <Text
                                                    open={props.Open}
                                                    theme={mobileM.startRemark}
                                                >
                                                    {`(${data.fromAddrRemark})`}
                                                </Text>

                                                {/* 下車地點 標題 */}
                                                <Text
                                                    open={props.Open}
                                                    theme={mobileM.endTitle}
                                                >
                                                    {`下車地點`}
                                                </Text>

                                                {/* 下車地點 內文 */}
                                                <Text
                                                    open={props.Open}
                                                    theme={mobileM.endText}
                                                >
                                                    {data.toAddr}
                                                </Text>

                                                {/* 下車地點 備註 */}
                                                <Text
                                                    open={props.Open}
                                                    theme={mobileM.endRemark}
                                                >
                                                    {`(${data.toAddrRemark})`}
                                                </Text>

                                            </SubContainer>

                                            {/* 地圖容器 */}
                                            <BasicContainer
                                                open={props.Open}
                                                height={Height}
                                                theme={mobileM.mapContainer}
                                            >
                                                {/* 導航 */}
                                                <ToGoogleMap
                                                    style={mobileM.toGoogleMapSvg}
                                                    onClick={() => {
                                                        mapGoogleControll.openNavigation(data?.toAddr)
                                                    }}
                                                />

                                                {
                                                    props.Open
                                                        ?
                                                        <>
                                                            {/* 收合 */}
                                                            <Up
                                                                style={mobileM.upSvg}
                                                                onClick={() => {
                                                                    props.setOpen(false)
                                                                }}
                                                            />
                                                        </>
                                                        :
                                                        <>
                                                            {/* 展開 */}
                                                            <Down
                                                                style={mobileM.downSvg}
                                                                onClick={() => {
                                                                    props.setOpen(true)
                                                                }}
                                                            />
                                                        </>
                                                }

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

                                        </>
                                    )
                                }}
                            />
                        )
                    })}
                    <BasicContainer
                        theme={{
                            basic: (style, props) => ({
                                ...style,
                                padding: "12px",
                                position: "fixed",
                                bottom: "5%",
                                width: "100%"
                            })
                        }}
                    >
                        <Silder text={"抵達上車地點"} onToRight={() => { console.log("right") }} />
                    </BasicContainer>


                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`