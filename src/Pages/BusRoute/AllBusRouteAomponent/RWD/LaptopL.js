import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, Map8Canvas, map8Controll, Map8Input } from '../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { ReactComponent as Check } from '../../../../Assets/img/BusRoutePage/Check.svg'
import { DateTimePicker, Upload, BasicContainer, FormContainer, FormRow, globalContextService, Tag, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable, NativeLineButton } from '../../../../Components';
import { isEqual, isNil, isUndefined, toString } from 'lodash';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { busRoute: { component: { allBusRouteComponent: { rwd: { laptopL } } } } } } = Theme;
    const [Width, Height] = useWindowSize();

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    // let routeTime = "每週一至週五行駛，每日營運4班次。去程：8時、15時；返程：9時、16時。遇天候不佳或其他因素視情況停駛。";
    let routeTime = "每週一至週五行駛。採 預約制；遇天候不佳或其他因素視情況停駛。";
    let history = useHistory()
    console.log(props?.CheckDetail?.routeName);
    return (
        <>
            {isUndefined(props?.CheckDetail?.routeName)
                ?
                <Container>
                    {
                        (props?.data ?? []).map(item => {
                            return (
                                <>

                                    {/* 卡片外側容器 */}
                                    <SubContainer
                                        theme={laptopL.outsideContainer}
                                    >
                                        {/* 卡片容器 */}
                                        <BasicContainer
                                            theme={laptopL.cardContainer}
                                        >

                                            {/* 圖片 */}
                                            <Upload
                                                viewType
                                                imageUrl={undefined}
                                                onChange={(info, acceptFileType, imageUrl, OnInitial) => {
                                                    globalContextService.set("CarsEditPage", "CarPic", info?.file?.originFileObj)
                                                }}
                                                theme={laptopL.carImgUpload}
                                            />

                                            {/* 路線名稱 */}
                                            <Text
                                                theme={laptopL.routeName}
                                                onClick={() => {
                                                    console.log("hi")
                                                }}
                                            >
                                                <Check style={laptopL.checkSvg} />
                                                {item}
                                            </Text>

                                            {/* 查看時刻表及站點資訊 */}
                                            {/* <Text
                                                theme={laptopL.checkTime}
                                                onClick={() => {
                                                    console.log("hi")
                                                }}
                                            >
                                                <Check style={laptopL.checkSvg} />
                                            查看時刻表及站點資訊
                                        </Text> */}

                                        </BasicContainer>
                                    </SubContainer>
                                </>
                            )
                        })
                    }
                </Container>
                :
                // {/* 路線詳細資訊容器 */ }
                < Container
                    height={Height}
                    theme={laptopL.detailContainer}
                >
                    {/* 路線詳細資訊卡片容器 */}
                    <BasicContainer
                        theme={laptopL.detailCardContainer}
                    >
                        {/* 詳細資料 路線名稱 */}
                        <Text
                            theme={laptopL.detailRouteName}
                        >
                            {props.CheckDetail?.routeName ?? "綠線(龍口線)"}
                        </Text>

                        {/* 詳細資料 資料容器 */}
                        <SubContainer
                            theme={laptopL.detailDataContainer}
                        >
                            {/* 詳細資料 營運里程 標題 */}
                            <Text
                                theme={laptopL.detailDataTitle}
                            >
                                營運里程：

                                {/* 詳細資料 營運里程 內文 */}
                                <Text
                                    theme={laptopL.detailDataText}
                                >
                                    每班次營運里程約
                                    {
                                        <Text
                                            theme={laptopL.pointText}
                                        >
                                            {props.CheckDetail?.totalMileage ?? 33.9}
                                        </Text>} 公里，約 {
                                        <Text
                                            theme={laptopL.pointText}
                                        >
                                            {props.CheckDetail?.expectedMinute ?? 51}
                                        </Text>
                                    } 分。
                                </Text>
                            </Text>

                            {/* 詳細資料 去程 標題 */}
                            <Text
                                theme={laptopL.detailDataTitle}
                            >
                                去程：

                                {/* 詳細資料 去程 內文 */}
                                <Text
                                    theme={laptopL.detailDataText}
                                >
                                    滿州鄉公所、分水嶺社區、三灣、南仁港、片埔路口、中山港。
                                </Text>
                            </Text>

                            {/* 詳細資料 回程 標題 */}
                            <Text
                                theme={laptopL.detailDataTitle}
                            >
                                回程：

                                {/* 詳細資料 回程 內文 */}
                                <Text
                                    theme={laptopL.detailDataText}
                                >
                                    中山港、片埔路口、南仁港、三灣、分水嶺社區、滿州鄉公所。
                                </Text>
                            </Text>

                            {/* 詳細資料 營運時間 標題 */}
                            <Text
                                theme={laptopL.detailDataTitle}
                            >
                                營運時間：

                                {/* 詳細資料 營運時間 內文 */}
                                <Text
                                    theme={laptopL.detailDataText}
                                >
                                    {routeTime.split('去程：').length > 1
                                        &&
                                        <>
                                            {routeTime.split('去程：')[0]}
                                            去程：
                                            <Text
                                                theme={laptopL.pointText}
                                            >
                                                {routeTime.split('去程：')[1].split('；')[0]}
                                            </Text>
                                            ；回程：
                                            <Text
                                                theme={laptopL.pointText}
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
                                                theme={laptopL.pointText}
                                            >
                                                預約制
                                            </Text>
                                            {routeTime.split('預約制')[1]}
                                        </>
                                    }
                                </Text>
                            </Text>

                        </SubContainer>

                        {/* 詳細資料 圖片 */}
                        <Upload
                            viewType
                            imageUrl={undefined}
                            onChange={(info, acceptFileType, imageUrl, OnInitial) => {
                                globalContextService.set("CarsEditPage", "CarPic", info?.file?.originFileObj)
                            }}
                            theme={laptopL.detailImg}
                        />

                    </BasicContainer>

                    {/*  回列表按鈕 (標題列右方) 容器 */}
                    <SubContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptopL.returnContainer}
                    >
                        {/* 回列表按鈕 */}
                        <NativeLineButton
                            baseDefaultTheme={"DefaultTheme"}
                            disable={false}
                            type="button" // 防止提交
                            theme={laptopL.returnButton}
                            onClick={() => {
                                props.setCheckDetail({})
                            }}
                        >
                            回列表
                        </NativeLineButton>
                    </SubContainer>

                </Container>

            }
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`