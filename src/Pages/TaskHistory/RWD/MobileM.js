import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, TaskCard, TitleBar } from '../../../ProjectComponent';
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
    const { pages: { taskHistory: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();
    //#region 分頁映射
    const tabMap = (key) => {
        return props.NewsType.map(item => { return item.label })
    }
    //#endregion
    console.log(mobileM.dateTimeRange)
    return (
        <>
            <TitleBar />

            <MainPageContainer
                height={Height}
                theme={mobileM.mainPageContainer}
                outSideTopComponent={
                    <>
                    </>
                }
            >
                <Container
                    theme={{
                        basic: (style, props) => ({
                            ...style,
                            background: "#3c4856"
                        })
                    }}
                >
                    {/* 日期區間 DateTimeRange  */}
                    <DateTimePicker
                        rightText={"(起)"}
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

                    {/* 日期區間 DateTimeRange  */}
                    <DateTimePicker
                        rightText={"(迄)"}
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
                </Container>

                <BasicContainer
                    theme={mobileM.cardOutContainer}
                >
                    {props?.TodayTask?.map((item, index) => {
                        return (
                            <TaskCard
                                key={index}

                                data={item?.despatchOfCaseOrderDayViews} // 調度單資料
                                nameType // timeNameType、nameType 顯示名字、或顯示時間與名字
                                // timeNameType // timeNameType、nameType 顯示名字、或顯示時間與名字
                                // needAction // 是否需要點即後，文字變成執行中
                                nameKeyName={"name"} // nameKeyName 對應資料 名字 的 key 名
                                TimeKeyName={"reserveDate"} // TimeKeyName 對應資料 時間 的 key 名
                                // callBackKeyName 有需要回調 則在資料中補上回調，並指定 key名
                                primaryKey={"orderId"}// primaryKey 對應資料 唯一鍵 的 key 名
                                // defaultUsePrimaryKey={props?.defaultPrimary} // 初始要使用的分頁 (值要對應到 primaryKey)

                                topContent={(data) => {
                                    console.log(data)
                                    return (
                                        <>
                                            dsfsdf
                                        </>
                                    )
                                }}
                                bottomContent={(data) => {
                                    console.log(data)
                                    return (
                                        <>
                                            sdf
                                        </>
                                    )
                                }}
                            />
                        )
                    })}


                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`