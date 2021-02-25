import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, TitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Search } from '../../../Assets/img/CasePage/Search.svg'
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';

import { CaseContactComponent } from '../CaseContactComponent/CaseContactComponent'
import { BusContactComponent } from '../BusContactComponent/BusContactComponent'
import { FleetContactComponent } from '../FleetContactComponent/FleetContactComponent'

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { contact: { rwd: { mobileM } } } } = Theme;
    const [Width, Height] = useWindowSize();

    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "tabUseComponent":
                return (
                    {
                        "長照": <CaseContactComponent />,
                        "共享車隊": <FleetContactComponent />,
                        "巴士": <BusContactComponent />
                    }
                );

            default:
                return ["長照", "共享車隊", "巴士"]
        }

    }
    //#endregion

    return (
        <>
            <TitleBar />

            <MainPageContainer
                theme={mobileM.mainPageContainer}
                height={Height}
                outSideTopComponent={
                    <>
                        {/* <Text
                            theme={mobileM.titleText}
                        >
                            聯繫客服
                        </Text> */}

                        {/* 一般輸入框 請輸入車行名稱  */}
                        {/* <TextInput
                            bascDefaultTheme={"DefaultTheme"}
                            theme={mobileM.keyword}
                            type="text"
                            placeholder={"請輸入車行名稱"}
                            rightIcon={
                                <Search
                                    style={mobileM.keywordRightIcon}
                                    onClick={(e) => {
                                        console.log("目前不支援搜尋功能")
                                        // props.GetSubOrgsExecute(true, "");
                                    }
                                    }
                                />
                            }
                            value={globalContextService.get("ContactPage", "Keyword") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("ContactPage", "Keyword", value);
                            }}
                        />

                        <BasicContainer>
                            {tabMap().map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Text
                                            onClick={() => { props.setNowTab(item) }}
                                            isActive={props.nowTab === item}
                                            theme={mobileM.titleBarContactTab}
                                        >
                                            {item}
                                        </Text>
                                    </React.Fragment>
                                )
                            })}
                        </BasicContainer> */}


                    </>
                }
            >
                {/* 切換使用的組件 */}
                {/* {tabMap("tabUseComponent")?.[props.nowTab]} */}

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
