import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, MapGoogle, mapGoogleControll, Silder, TaskCard, TitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, BasicButton, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as ToGoogleMap } from '../../../Assets/img/PerDespatchPage/ToGoogleMap.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { SystemNewsComponent } from '../SystemNewsComponent/SystemNewsComponent'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined } from 'lodash';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { todayTask: { rwd: { mobileM } } } } = Theme;
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
                    theme={{
                        basic: (style, props) => ({
                            ...style,
                            padding: "0 0 12px 0",
                            width: "100%",
                            backgroundColor: "#3c4856"
                        })
                    }}
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
                                    console.log(data)
                                    return (
                                        <>
                                            {`${data.name}`}
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
                                            {/* <div style={{ height: "300px" }}>asdfsdf</div> */}
                                            {`${data.fromAddr}`}

                                            <BasicContainer
                                                theme={{
                                                    basic: (style, props) => ({
                                                        ...style,
                                                        width: "100%",
                                                        height: "450px"
                                                    })
                                                }}
                                            >
                                                <ToGoogleMap
                                                    style={{
                                                        position: "absolute",
                                                        zIndex: 1,
                                                        right: "12px",
                                                        top: "12px"
                                                    }}
                                                    onClick={() => {
                                                        mapGoogleControll.openNavigation(data?.toAddr)
                                                    }}
                                                />

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

                                                    theme={{
                                                        mapContainer: {
                                                            basic: (style, props) => ({
                                                                ...style,
                                                                width: "100%",
                                                                height: "100%"
                                                            })
                                                        }
                                                    }}
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