import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, Map8Canvas, map8Controll, Map8Input, CardTable } from '../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { ReactComponent as Check } from '../../../../Assets/img/BusRoutePage/Check.svg'
import { DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, Upload, Tag, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, NativeLineButton } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { busRoute: { component: { allBusRouteComponent: { rwd: { mobileM } } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    const [Width, Height] = useWindowSize();
    // let routeTime = "每週一至週五行駛，每日營運4班次。去程：8時、15時；返程：9時、16時。遇天候不佳或其他因素視情況停駛。";
    let routeTime = "每週一至週五行駛。採 預約制；遇天候不佳或其他因素視情況停駛。";
    let history = useHistory()

    return (
        <>
            {isUndefined(props?.CheckDetail?.routeName)
                ?
                <>
                    {/* 標題  容器*/}
                    <BasicContainer
                        theme={mobileM.titleBar}
                    >

                        {/* 路線名稱 標題 */}
                        <Text
                            theme={mobileM.routeNameTitle}
                        >
                            路線名稱
                </Text>

                        {/* 操作 標題 */}
                        {/* <Text
                    theme={mobileM.operatingTitle}
                >
                    操作
                </Text> */}
                    </BasicContainer>
                    {
                        (props?.data ?? []).map((item, index) => {
                            return (
                                <>
                                    {/* 內文 容器 */}
                                    <BasicContainer
                                        theme={mobileM.dataContainer}
                                        index={index}
                                    >

                                        {/* 路線名稱 內文 */}
                                        <Text
                                            theme={mobileM.routeNameText}
                                            onClick={() => {
                                                console.log("hi")
                                            }}
                                        >
                                            <Check style={mobileM.checkSvg} />
                                            {item}
                                        </Text>

                                        {/* 操作 內文 */}
                                        {/* <Text
                                    theme={mobileM.operatingText}
                                    onClick={() => {
                                        console.log("hi")
                                    }}
                                >

                                    查看時刻表及站點資訊
                                </Text> */}
                                    </BasicContainer>
                                </>
                            )
                        })
                    }
                </>
                :
                <>
                    {/* 路線詳細資訊容器 */}
                    < Container
                        height={Height}
                        theme={mobileM.detailContainer}
                    >
                        {/* 路線詳細資訊卡片容器 */}
                        <BasicContainer
                            theme={mobileM.detailCardContainer}
                        >
                            {/* 詳細資料 路線名稱 */}
                            <Text
                                theme={mobileM.detailRouteName}
                            >
                                {props.CheckDetail?.routeName ?? "綠線(龍口線)"}
                            </Text>

                            {/* 詳細資料 資料容器 */}
                            <SubContainer
                                theme={mobileM.detailDataContainer}
                            >

                                {/* 詳細資料 營運里程 內文 */}
                                <Text
                                    theme={mobileM.detailDataText}
                                >
                                    {/* 詳細資料 營運里程 標題 */}
                                    <Text
                                        theme={mobileM.detailDataTitle}
                                    >
                                        營運里程：
                                    </Text>
                                        每班次營運里程約
                                    {
                                        <Text
                                            theme={mobileM.pointText}
                                        >
                                            {props.CheckDetail?.totalMileage ?? 33.9}
                                        </Text>} 公里，約 {
                                        <Text
                                            theme={mobileM.pointText}
                                        >
                                            {props.CheckDetail?.expectedMinute ?? 51}
                                        </Text>
                                    } 分。

                                </Text>

                                {/* 詳細資料 去程 內文 */}
                                <Text
                                    theme={mobileM.detailDataText}
                                >
                                    {/* 詳細資料 去程 標題 */}
                                    <Text
                                        theme={mobileM.detailDataTitle}
                                    >
                                        去程：
                                    </Text>
                                        滿州鄉公所、分水嶺社區、三灣、南仁港、片埔路口、中山港。
                                </Text>

                                {/* 詳細資料 回程 內文 */}
                                <Text
                                    theme={mobileM.detailDataText}
                                >
                                    {/* 詳細資料 回程 標題 */}
                                    <Text
                                        theme={mobileM.detailDataTitle}
                                    >
                                        回程：
                                    </Text>
                                        中山港、片埔路口、南仁港、三灣、分水嶺社區、滿州鄉公所。
                                </Text>

                                {/* 詳細資料 營運時間 內文 */}
                                <Text
                                    theme={mobileM.detailDataText}
                                >
                                    {/* 詳細資料 營運時間 標題 */}
                                    <Text
                                        theme={mobileM.detailDataTitle}
                                    >
                                        營運時間：
                                    </Text>

                                    {routeTime.split('去程：').length > 1
                                        &&
                                        <>
                                            {routeTime.split('去程：')[0]}
                                            去程：
                                            <Text
                                                theme={mobileM.pointText}
                                            >
                                                {routeTime.split('去程：')[1].split('；')[0]}
                                            </Text>
                                            ；回程：
                                            <Text
                                                theme={mobileM.pointText}
                                            >
                                                {routeTime.split('返程：')[1].split('。')[0]}
                                            </Text>
                                            。
                                            {routeTime.split('返程：')[1].split('。')[1]}
                                        </>
                                    }

                                    {routeTime.split('預約制').length > 1
                                        &&
                                        <>
                                            {routeTime.split('預約制')[0]}
                                            <Text
                                                theme={mobileM.pointText}
                                            >
                                                預約制
                                            </Text>
                                            {routeTime.split('預約制')[1]}
                                        </>
                                    }

                                </Text>

                            </SubContainer>

                            {/* 詳細資料 圖片 */}
                            <Upload
                                viewType
                                imageUrl={undefined}
                                onChange={(info, acceptFileType, imageUrl, OnInitial) => {
                                    globalContextService.set("CarsEditPage", "CarPic", info?.file?.originFileObj)
                                }}
                                theme={mobileM.detailImg}
                            />

                        </BasicContainer>

                        {/*  回列表按鈕 (標題列右方) 容器 */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={mobileM.returnContainer}
                        >
                            {/* 回列表按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={mobileM.returnButton}
                                onClick={() => {
                                    props.setCheckDetail({})
                                }}
                            >
                                回列表
                        </NativeLineButton>
                        </SubContainer>

                    </Container>

                </>
            }
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`