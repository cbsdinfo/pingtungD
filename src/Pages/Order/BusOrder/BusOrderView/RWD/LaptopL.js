import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, MainPageSubTitleBar } from '../../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService, RangeDateTimePicker } from '../../../../../Components';
import { ReactComponent as OrderCanShare } from '../../../../../Assets/img/BusOrderViewPage/OrderCanShare.svg'
import { ReactComponent as OrderNoShare } from '../../../../../Assets/img/BusOrderViewPage/OrderNoShare.svg'
import { ReactComponent as Wheelchair } from '../../../../../Assets/img/BusOrderViewPage/Wheelchair.svg'
import { ReactComponent as Accompany } from '../../../../../Assets/img/BusOrderViewPage/Accompany.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { order: { busOrder: { busOrderView: { rwd: { laptopL } } } } } } = Theme;
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"訂單總覽"}
                            theme={laptopL.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/*  回列表按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 回列表按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.returnButton}
                                    onClick={() => {
                                        history.push("/Order/BusOrder");
                                        // props.controllGCS("return")
                                    }}
                                >
                                    回列表
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
            >

                <Container>
                    {/* 個案資訊表單區容器 */}
                    <BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptopL.caseInformationContainer}
                    >
                        {/* 個案資訊 子標題列 */}
                        <MainPageSubTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"個案資訊"}
                            theme={laptopL.caseInformationSubTitleBar}
                        ></MainPageSubTitleBar>
                    </BasicContainer>

                    {/* 訂單資訊表單區容器 */}
                    <BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptopL.orderInformationContainer}
                    >
                        {/* 訂單資訊 子標題列 */}
                        <MainPageSubTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"訂單資訊"}
                            theme={laptopL.orderInformationSubTitleBar}
                        >

                            {/* 訂單可否共乘 */}
                            <Text
                                theme={laptopL.carOrderCanShare}
                            >
                                {true ?
                                    <>
                                        <OrderCanShare style={laptopL.carOrderCanShareSvg} />
                                        可共乘
                                    </>
                                    :
                                    <>
                                        <OrderNoShare style={laptopL.carOrderNoShareSvg} />
                                        不可共乘
                                    </>
                                }
                            </Text>

                            {/* 普通輪椅(可收折) */}
                            <Text
                                theme={laptopL.wheelchair}
                            >
                                {true &&
                                    <>
                                        <Wheelchair style={laptopL.wheelchairSvg} />
                                        普通輪椅(可收折)
                                    </>
                                }
                            </Text>

                            {/* 陪同人數 */}
                            <Text
                                theme={laptopL.accompanyCount}
                            >
                                <Accompany style={laptopL.accompanyCountSvg} />
                                {"10"}人陪同
                            </Text>

                        </MainPageSubTitleBar>
                    </BasicContainer>

                    {/* 車資表單區容器 */}
                    <BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptopL.fareContainer}
                    >
                        {/* 車資 子標題列 */}
                        <MainPageSubTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"車資"}
                            theme={laptopL.fareSubTitleBar}
                        >
                            {/* 修改實收按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptopL.updatePaidButton}
                                onClick={() => {

                                }}
                            >
                                修改實收
                            </NativeLineButton>
                        </MainPageSubTitleBar>
                    </BasicContainer>

                    {/* 行車路線表單區容器 */}
                    <BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptopL.routeContainer}
                    >
                        {/* 行車路線 子標題列 */}
                        <MainPageSubTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"行車路線"}
                            theme={laptopL.routeSubTitleBar}
                        >

                            <Text
                                theme={laptopL.estimatedMileage}>
                                預估里程數
                            </Text>

                            <Text
                                theme={laptopL.mileage}>
                                {"4.332"} 公里
                            </Text>

                            <Text
                                theme={laptopL.estimatedTravelTime}>
                                預估行車時間
                            </Text>

                            <Text
                                theme={laptopL.travelTime}>
                                {"18"} 分鐘
                            </Text>

                            {/* 查看行車路線按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptopL.checkRouteButton}
                                onClick={() => {

                                }}
                            >
                                查看行車路線
                            </NativeLineButton>
                        </MainPageSubTitleBar>
                    </BasicContainer>

                    {/* 行車歷程表單區容器 */}
                    <BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptopL.courseContainer}
                    >
                        {/* 行車歷程 子標題列 */}
                        <MainPageSubTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"行車歷程"}
                            theme={laptopL.courseSubTitleBar}
                        ></MainPageSubTitleBar>
                    </BasicContainer>


                </Container>

            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`