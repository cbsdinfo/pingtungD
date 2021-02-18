import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../../Components';
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';

import { AddCaseFastCallCar } from '../AddCaseFastCallCar/AddCaseFastCallCar'
import { AddBusFastCallCar } from '../AddBusFastCallCar/AddBusFastCallCar'
import { AddWhiteFastCallCar } from '../AddWhiteFastCallCar/AddWhiteFastCallCar'

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { fastCallCar: { addFastCallCar: { rwd: { mobileM } } } } } = Theme;
    const [Width, Height] = useWindowSize();
    let history = useHistory()

    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "tabUseComponent":
                return (
                    {
                        "長照": <AddCaseFastCallCar />,
                        "共享車隊": <AddWhiteFastCallCar />,
                        "巴士": <AddBusFastCallCar />
                    }
                );

            default:
                return ["長照", "共享車隊", "巴士"]
        }

    }
    //#endregion

    return (
        <>
            <MainPageContainer
                theme={mobileM.mainPageContainer}
                height={Height}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <Text
                            theme={mobileM.titleBar}
                        >
                            快速叫車-新增常用路線

                        </Text>

                        {/* 分頁 */}
                        <BasicContainer
                            theme={mobileM.whiteContainer}
                        >
                            <BasicContainer
                                theme={mobileM.tabsContainer}
                            >
                                {tabMap().map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Text
                                                onClick={() => { props.setNowTab(item) }}
                                                isActive={props.nowTab === item}
                                                theme={mobileM.titleBarAddFastCallCarTab}
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

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
