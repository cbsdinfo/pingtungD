import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, RangeDateTimePicker, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Plus } from '../../../Assets/img/QAndA/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/QAndA/Edit.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { SystemNewsComponent } from '../SystemNewsComponent/SystemNewsComponent'
import { CaseNewsComponent } from '../CaseNewsComponent/CaseNewsComponent'
import { WhiteNewsComponent } from '../WhiteNewsComponent/WhiteNewsComponent'
import { BusNewsComponent } from '../BusNewsComponent/BusNewsComponent'

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { news: { rwd: { tablet } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "tabUseComponent":
                return (
                    {
                        "系統公告": <SystemNewsComponent />,
                        "長照": <CaseNewsComponent />,
                        "共享車隊": <WhiteNewsComponent />,
                        "巴士": <BusNewsComponent />
                    }
                );

            default:
                return ["系統公告", "長照", "共享車隊", "巴士"]
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
                            titleText={"公告"}
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
                                                        theme={tablet.titleBarCallCarTab}
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
                            {/* 日期區間容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 日期區間 DateTimeRange  */}
                                <RangeDateTimePicker
                                    // topLabel={<></>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"date"}
                                    format={"YYYY-MM-DD"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("NewsPage", "DateTimeRange") ?
                                            [moment(globalContextService.get("NewsPage", "DateTimeRange")[0]), moment(globalContextService.get("NewsPage", "DateTimeRange")[1])]
                                            :
                                            [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-08', "YYYY-MM-DD")]
                                        )
                                    }
                                    onChange={(value, momentObj) => {
                                        if (value !== globalContextService.get("NewsPage", "DateTimeRange")) {
                                            globalContextService.set("NewsPage", "DateTimeRange", value);
                                            // setForceUpdate(f => !f)
                                        }
                                    }}
                                    theme={tablet.dateTimeRange}
                                />
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

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`