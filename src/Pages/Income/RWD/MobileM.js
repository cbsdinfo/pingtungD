import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Plus } from '../../../Assets/img/QAndA/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/QAndA/Edit.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { SystemNewsComponent } from '../SystemNewsComponent/SystemNewsComponent'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined } from 'lodash';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { news: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();
    //#region 分頁映射
    const tabMap = (key) => {
        return props.NewsType.map(item => { return item.label })
    }
    //#endregion

    return (
        <>
            <MainPageContainer
                height={Height}
                theme={mobileM.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <BasicContainer
                            theme={mobileM.titleBar}
                        >
                            {/* 日期區間容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 日期區間 DateTimeRange  */}
                                <DateTimePicker
                                    topLabel={<>日期區間</>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"month"}
                                    format={"YYYY-MM"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchableSystemNewsComponentPage
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("SystemNewsComponentPage", "DateTimeRange")) ?
                                            moment(globalContextService.get("SystemNewsComponentPage", "DateTimeRange"), "YYYY-MM")
                                            :
                                            moment()
                                    }
                                    onChange={(value, momentObj, OnInitial) => {
                                        if (!isEqual(value, globalContextService.get("SystemNewsComponentPage", "DateTimeRange"))) {
                                            // console.log("undefined", isUndefined(globalContextService.get("NewsPage", "firstUseAPIgetNewsType")))
                                            // 阻擋第一次渲染即觸發
                                            if (!isUndefined(globalContextService.get("NewsPage", "firstUseAPIgetNewsType"))) {
                                                console.log(props.NowTab)
                                                props.GetNewsTypeExecute(true, props.NewsType.filter((it) => (it.label === props.NowTab))?.[0]?.value, value)
                                            }
                                            globalContextService.set("SystemNewsComponentPage", "DateTimeRange", value);
                                            setForceUpdate(f => !f)
                                        }
                                    }}
                                    theme={mobileM.dateTimeRange}
                                />
                            </SubContainer>

                            {tabMap().map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Text
                                            onClick={() => {
                                                if (props.NowTab !== item) {
                                                    props.setNowTab(item);
                                                    props.GetNewsTypeExecute(true, props.NewsType[index]?.value, globalContextService.get("SystemNewsComponentPage", "DateTimeRange"));
                                                }
                                            }}
                                            isActive={props.NowTab === item}
                                            theme={mobileM.titleBarCallCarTab}
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
                {/* 切換使用的組件 */}
                {/* {tabMap("tabUseComponent")?.[props.nowTab]} */}
                {/* {console.log(props.NewsType)} */}
                {/* {console.log(props.AllNews)} */}
                {!isUndefined(props?.CheckDetail?.title)
                    ?
                    <>
                        <Container>
                            {/* 詳細資料外側容器 */}
                            <BasicContainer
                                height={Height}
                                theme={mobileM.detailOutContainer}
                            >
                                {/* 詳細資料容器 */}
                                <BasicContainer
                                    theme={mobileM.detailContainer}
                                >
                                    {/* 詳細資料 標題 */}
                                    <Text
                                        theme={mobileM.detailHeader}
                                    >
                                        {props.CheckDetail.title}
                                    </Text>

                                    {/* 詳細資料 內文 */}
                                    <TextEditor
                                        viewType
                                        value={props.CheckDetail.contents?.replaceAll('<img', `<img style="max-width:100%" `)}
                                        // onChange={(e, value, onInitial) => {
                                        //     console.log(value)
                                        //     globalContextService.set("NewsAddPage", "NewsEditor", value)
                                        // }}
                                        // placeholder={'請輸入最新消息內容...'}
                                        theme={mobileM.newsEditor}
                                    />

                                </BasicContainer>

                                {/* 回列表按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={mobileM.returnButton}
                                    onClick={() => {
                                        props.setCheckDetail({})
                                    }}
                                >
                                    回列表
                                </NativeLineButton>
                            </BasicContainer>
                        </Container>
                    </>
                    :
                    <SystemNewsComponent
                        AllNews={props.AllNews} // 類別下所有最新消息
                        NowTab={props.NewsType.filter((it) => (it.label === props.NowTab))?.[0]}
                        CheckDetail={props.CheckDetail} // 詳細資料
                        setCheckDetail={props.setCheckDetail} // 設定詳細資料
                    />
                }
            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`