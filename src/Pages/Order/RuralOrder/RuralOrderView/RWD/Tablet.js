import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, MainPageSubTitleBar } from '../../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService, RangeDateTimePicker } from '../../../../../Components';
import { ReactComponent as OrderCanShare } from '../../../../../Assets/img/RuralOrderViewPage/OrderCanShare.svg'
import { ReactComponent as OrderNoShare } from '../../../../../Assets/img/RuralOrderViewPage/OrderNoShare.svg'
import { ReactComponent as Wheelchair } from '../../../../../Assets/img/RuralOrderViewPage/Wheelchair.svg'
import { ReactComponent as Accompany } from '../../../../../Assets/img/RuralOrderViewPage/Accompany.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';


const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { order: { ruralOrder: { ruralOrderView: { rwd: { tablet } } } } } } = Theme;
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                theme={tablet.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"訂單總覽"}
                            theme={tablet.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/*  回列表按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 回列表按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.returnButton}
                                    onClick={() => {
                                        history.push("/Order/RuralOrder");
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
                        theme={tablet.caseInformationContainer}
                    >
                        {/* 個案資訊 子標題列 */}
                        <MainPageSubTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"個案資訊"}
                            theme={tablet.caseInformationSubTitleBar}
                        ></MainPageSubTitleBar>
                    </BasicContainer>

                    {/* 訂單資訊表單區容器 */}
                    <BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={tablet.orderInformationContainer}
                    >
                        {/* 訂單資訊 子標題列 */}
                        <MainPageSubTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"訂單資訊"}
                            theme={tablet.orderInformationSubTitleBar}
                        >

                            {/* 訂單可否共乘 */}
                            <Text
                                theme={tablet.carOrderCanShare}
                            >
                                {true ?
                                    <>
                                        <OrderCanShare style={tablet.carOrderCanShareSvg} />
                                        可共乘
                                    </>
                                    :
                                    <>
                                        <OrderNoShare style={tablet.carOrderNoShareSvg} />
                                        不可共乘
                                    </>
                                }
                            </Text>

                            {/* 普通輪椅(可收折) */}
                            <Text
                                theme={tablet.wheelchair}
                            >
                                {true &&
                                    <>
                                        <Wheelchair style={tablet.wheelchairSvg} />
                                        普通輪椅(可收折)
                                    </>
                                }
                            </Text>

                            {/* 陪同人數 */}
                            <Text
                                theme={tablet.accompanyCount}
                            >
                                <Accompany style={tablet.accompanyCountSvg} />
                                {"10"}人陪同
                            </Text>

                        </MainPageSubTitleBar>
                    </BasicContainer>

                    {/* 車資表單區容器 */}
                    <BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={tablet.fareContainer}
                    >
                        {/* 車資 子標題列 */}
                        <MainPageSubTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"車資"}
                            theme={tablet.fareSubTitleBar}
                        >
                            {/* 修改實收按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={tablet.updatePaidButton}
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
                        theme={tablet.routeContainer}
                    >
                        {/* 行車路線 子標題列 */}
                        <MainPageSubTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"行車路線"}
                            theme={tablet.routeSubTitleBar}
                        >

                            <Text
                                theme={tablet.estimatedMileage}>
                                預估里程數
                            </Text>

                            <Text
                                theme={tablet.mileage}>
                                {"4.332"} 公里
                            </Text>

                            <Text
                                theme={tablet.estimatedTravelTime}>
                                預估行車時間
                            </Text>

                            <Text
                                theme={tablet.travelTime}>
                                {"18"} 分鐘
                            </Text>

                            {/* 查看行車路線按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={tablet.checkRouteButton}
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
                        theme={tablet.courseContainer}
                    >
                        {/* 行車歷程 子標題列 */}
                        <MainPageSubTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"行車歷程"}
                            theme={tablet.courseSubTitleBar}
                        ></MainPageSubTitleBar>
                    </BasicContainer>


                </Container>

            </MainPageContainer>
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
`