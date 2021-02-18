import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Search } from '../../../Assets/img/CasePage/Search.svg'
import { useHistory } from 'react-router-dom';

import { CaseContactComponent } from '../CaseContactComponent/CaseContactComponent'
import { BusContactComponent } from '../BusContactComponent/BusContactComponent'
import { FleetContactComponent } from '../FleetContactComponent/FleetContactComponent'


const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { contact: { rwd: { tablet } } } } = Theme;
    let history = useHistory()

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
            <MainPageContainer
                theme={tablet.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"聯繫客服"}
                            theme={tablet.titleBar}
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
                                                        theme={tablet.titleBarContactTab}
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
                            {/* 一般輸入框 請輸入車行名稱  */}
                            <TextInput
                                bascDefaultTheme={"DefaultTheme"}
                                theme={tablet.keyword}
                                type="text"
                                placeholder={"請輸入車行名稱"}
                                rightIcon={
                                    <Search
                                        style={tablet.keywordRightIcon}
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

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
`