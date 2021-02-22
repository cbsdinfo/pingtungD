import React, { useState, useEffect, useContext, useCallback } from 'react';
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
import { ReactComponent as Cross } from '../../../Assets/img/PerDespatchPage/Cross.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { SystemNewsComponent } from '../SystemNewsComponent/SystemNewsComponent'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined, toString } from 'lodash';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { perDespatch: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();

    const driverStatusMapping = {
        3: "抵達上車地點",
        // "check": "確認身分",
        4: "客上",
        5: "已完成"
    }

    const nextStatus = useCallback((status, text = false) => {
        switch (toString(status)) {
            case "2":
                return text ? "抵達上車地點" : 3
            case "3":
                return text ? "客上" : 4
            default:
                break;
        }
    }, [])

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
                        let mapDisplay = [2]
                        let silderDisplay = [2, 3]

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
                                    console.log(data.status, data)

                                    const drawLine = () => {
                                        if (data?.polyLine && mapGoogleControll.getBasicMap("test1")) {
                                            mapGoogleControll.addPolylineRoute("test1", data?.polyLine)
                                        }

                                    }

                                    return (
                                        <>
                                            {/* 卡片下層 容器 */}
                                            <SubContainer
                                                height={Height}
                                                theme={mobileM.bottomContainer}
                                            >
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

                                                {/* 地圖 檢核 */}
                                                {mapDisplay.includes(data.status)
                                                    &&
                                                    <>
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
                                                }

                                                {/* 檢核身分 */}
                                                {
                                                    props.CheckDetail
                                                    &&
                                                    <>
                                                        {/* 檢核身分 容器 */}
                                                        <BasicContainer
                                                            theme={mobileM.checkIdContainer}
                                                        >
                                                            {/* 提醒 */}
                                                            <Text
                                                                theme={mobileM.checkTip}
                                                            >
                                                                小提醒!核對身份
                                                        </Text>

                                                            {/* 檢核資料 容器 */}
                                                            <BasicContainer
                                                                height={Height}
                                                                theme={mobileM.checkDetailContainer}
                                                            >
                                                                <Cross
                                                                    onClick={() => {
                                                                        props.setCheckDetail(false)
                                                                    }}
                                                                />

                                                                {/* 個案名稱 容器 */}
                                                                <SubContainer
                                                                    theme={mobileM.checkCaseNameContainer}
                                                                >
                                                                    {/* 個案名稱 */}
                                                                    <Text
                                                                        theme={mobileM.checkCaseName}
                                                                    >
                                                                        {data.name}
                                                                    </Text>
                                                                </SubContainer>

                                                                {/* 核對身分 下車地點 容器 */}
                                                                <Container
                                                                    theme={mobileM.checkEndContainer}
                                                                >
                                                                    {/* 下車地點 標題 */}
                                                                    <Text
                                                                        theme={mobileM.checkEndTitle}
                                                                    >
                                                                        {`下車地點`}
                                                                    </Text>

                                                                    {/* 下車地點 內文 */}
                                                                    <Text
                                                                        theme={mobileM.checkEndText}
                                                                    >
                                                                        {data.toAddr}

                                                                        {/* 下車地點 備註 */}
                                                                        <Text
                                                                            theme={mobileM.checkEndRemark}
                                                                        >
                                                                            {`(${data.toAddrRemark})`}
                                                                        </Text>
                                                                    </Text>
                                                                </Container>

                                                                {/* 提醒紅字 */}
                                                                <Text
                                                                    theme={mobileM.redTip}
                                                                >
                                                                    {`請與個案核對身分及目的地，若有問題請聯繫行控中心。`}
                                                                </Text>

                                                            </BasicContainer>
                                                        </BasicContainer>
                                                    </>
                                                }

                                                {/* silder 檢核 */}
                                                {silderDisplay.includes(data.status)
                                                    &&
                                                    <>
                                                        {/* silder */}
                                                        <BasicContainer
                                                            theme={mobileM.silderContainer}
                                                        >
                                                            <Silder
                                                                text={nextStatus(data.status, true)}
                                                                onToRight={(resetValue) => {
                                                                    props.setCheckDetail(true)
                                                                    resetValue(0)
                                                                }}
                                                            />

                                                        </BasicContainer>

                                                    </>
                                                }

                                                {/* 確認按鈕 */}
                                                {
                                                    props.CheckDetail
                                                    &&
                                                    <>
                                                        {/* 確認按鈕 容器 */}
                                                        <SubContainer
                                                            theme={mobileM.buttonContainer}
                                                        >
                                                            <NativeLineButton
                                                                theme={mobileM.comfirmButton}
                                                                onClick={() => {
                                                                    props.ChangeStatussExecute({
                                                                        orderId: data.orderId,
                                                                        status: 3
                                                                    })
                                                                    props.setCheckDetail(false)
                                                                }}
                                                            >
                                                                {`確認`}
                                                            </NativeLineButton>
                                                        </SubContainer>
                                                    </>
                                                }

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
