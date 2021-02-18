import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, RangeDateTimePicker, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Plus } from '../../../Assets/img/QAndA/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/QAndA/Edit.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { AllRecordComponent } from '../AllRecordComponent/AllRecordComponent'


const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { record: { rwd: { laptop } } } } = Theme;
    let history = useHistory()

    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "tabUseComponent":
                return (
                    {
                        "全部": <AllRecordComponent />,
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
                theme={laptop.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"訂單檢視"}
                            theme={laptop.titleBar}
                            centerContent={
                                <>
                                    <BasicContainer>
                                        {tabMap().map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Text
                                                        onClick={() => { props.setNowTab(item) }}
                                                        isActive={props.nowTab === item}
                                                        theme={laptop.titleBarRecordTab}
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