import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';

import { AllFastCallCarComponent } from '../AllFastCallCarComponent/AllFastCallCarComponent'
import { CaseFastCallCarComponent } from '../CaseFastCallCarComponent/CaseFastCallCarComponent'
import { WhiteFastCallCarComponent } from '../WhiteFastCallCarComponent/WhiteFastCallCarComponent'
import { BusFastCallCarComponent } from '../BusFastCallCarComponent/BusFastCallCarComponent'

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { fastCallCar: { rwd: { laptopL } } } } = Theme;
    const [Width, Height] = useWindowSize();
    let history = useHistory()

    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "tabUseComponent":
                return (
                    {
                        "全部": <AllFastCallCarComponent />,
                        "長照": <CaseFastCallCarComponent />,
                        "共享車隊": <WhiteFastCallCarComponent />,
                        "巴士": <BusFastCallCarComponent />
                    }
                );

            default:
                return ["全部", "長照", "共享車隊", "巴士"]
        }

    }
    //#endregion

    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
                height={Height}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <BasicContainer
                            theme={laptopL.titleBar}
                        >
                            <Text
                                theme={laptopL.titleText}
                            >
                                快速叫車
                            </Text>
                        </BasicContainer>

                        {/* 分頁 */}
                        <BasicContainer
                            theme={laptopL.whiteContainer}
                        >
                            <BasicContainer
                                theme={laptopL.tabsContainer}
                            >
                                {tabMap().map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Text
                                                onClick={() => { props.setNowTab(item) }}
                                                isActive={props.nowTab === item}
                                                theme={laptopL.titleBarFastCallCarTab}
                                            >
                                                {item}
                                            </Text>
                                        </React.Fragment>
                                    )
                                })}
                            </BasicContainer>
                        </BasicContainer>

                    </>
                }
            >
                {/* 切換使用的組件 */}
                {tabMap("tabUseComponent")?.[props.nowTab]}

            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`