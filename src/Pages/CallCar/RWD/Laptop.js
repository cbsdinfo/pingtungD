import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Plus } from '../../../Assets/img/QAndA/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/QAndA/Edit.svg'
import { useHistory } from 'react-router-dom';

import { CaseCallCarComponent } from '../CaseCallCarComponent/CaseCallCarComponent'
import { BusCallCarComponent } from '../BusCallCarComponent/BusCallCarComponent'
import { WhiteCallCarComponent } from '../WhiteCallCarComponent/WhiteCallCarComponent'

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { callCar: { rwd: { laptop } } } } = Theme;
    let history = useHistory()

    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "tabUseComponent":
                return (
                    {
                        "長照": <CaseCallCarComponent />,
                        "共享車隊": <WhiteCallCarComponent />,
                        "巴士": <BusCallCarComponent />
                    }
                )
            case "tabArray":
            default:
                return ["長照", "共享車隊", "巴士"]
        }

    }
    //#endregion

    return (
        <>
            <MainPageContainer
                theme={laptop.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"預約訂車"}
                            theme={laptop.titleBar}
                            // onSubmit={(e)=>console.log(e)}
                            centerContent={
                                <>
                                    <BasicContainer>
                                        {tabMap().map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Text
                                                        onClick={() => { props.setNowTab(item) }}
                                                        isActive={props.nowTab === item}
                                                        theme={laptop.titleBarCallCarTab}
                                                    >
                                                        {item}
                                                    </Text>
                                                </React.Fragment>
                                            )
                                        })}
                                    </BasicContainer>
                                </>
                            }
                        >
                            {/* 按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
            >
                {/* 切換使用的組件 */}
                {tabMap("tabUseComponent")?.[props.nowTab]}

            </MainPageContainer>
        </>
    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`