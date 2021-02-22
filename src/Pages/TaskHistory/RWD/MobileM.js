import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, TaskCard, TitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as WheelChair } from '../../../Assets/img/TaskHistoryPage/WheelChair.svg'
import { ReactComponent as Arrow } from '../../../Assets/img/TaskHistoryPage/Arrow.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { SystemNewsComponent } from '../SystemNewsComponent/SystemNewsComponent'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined } from 'lodash';
import { toString } from 'lodash/lang';

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

    const statusMapping = (status, getTheme = false) => {

        switch (toString(status)) {
            case "1":
                return "新訂單";
            case "2":
                return "已排班";
            case "3":
                return "抵達搭車地點";
            case "4":
                return "客上";
            case "5":
                return "已完成";
            case "9":
                return "已取消";
            default:
                return "無此狀態";
        }
    }

    const dateToChinese = (date) => {
        const reserveDate = date?.split(' ');
        if (reserveDate?.[0].substring(5, 7) >= 10) {
            return reserveDate?.[0].substring(5, 7) + "月" + (reserveDate?.[0].substring(8, 10) + "日")
        } else {
            return reserveDate?.[0].substring(6, 7) + "月" + (reserveDate?.[0].substring(8, 10) + "日")
        }
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
                        isSearchableTaskHistoryPage
                        placeholder={""}
                        value={
                            (globalContextService.get("TaskHistoryPage", "DateBegin")) ?
                                moment(globalContextService.get("TaskHistoryPage", "DateBegin"), "YYYY-MM")
                                :
                                moment()
                        }
                        onChange={(value, momentObj, OnInitial) => {
                            if (!isEqual(value, globalContextService.get("TaskHistoryPage", "DateBegin"))) {
                                // console.log("undefined", isUndefined(globalContextService.get("NewsPage", "firstUseAPIgetNewsType")))
                                // 阻擋第一次渲染即觸發
                                console.log(value)
                                if (!isUndefined(globalContextService.get("TaskHistoryPage", "firstUseAPIgetTodayTask"))) {
                                    // props.GetNewsTypeExecute(true, props.NewsType.filter((it) => (it.label === props.NowTab))?.[0]?.value, value)
                                    props.GetTodayTaskExecute(
                                        true,
                                        moment(globalContextService.get("TaskHistoryPage", "DateBegin"), "YYYY-MM"),
                                        moment(globalContextService.get("TaskHistoryPage", "DateEnd"), "YYYY-MM")
                                    )
                                }
                                globalContextService.set("TaskHistoryPage", "DateBegin", value);
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
                        isSearchableTaskHistoryPage
                        placeholder={""}
                        value={
                            (globalContextService.get("TaskHistoryPage", "DateEnd")) ?
                                moment(globalContextService.get("TaskHistoryPage", "DateEnd"), "YYYY-MM")
                                :
                                moment()
                        }
                        onChange={(value, momentObj, OnInitial) => {
                            if (!isEqual(value, globalContextService.get("TaskHistoryPage", "DateEnd"))) {
                                // console.log("undefined", isUndefined(globalContextService.get("NewsPage", "firstUseAPIgetNewsType")))
                                // 阻擋第一次渲染即觸發
                                if (!isUndefined(globalContextService.get("NewsPage", "firstUseAPIgetTodayTask"))) {
                                    // console.log(props.NowTab)
                                    // props.GetNewsTypeExecute(true, props.NewsType.filter((it) => (it.label === props.NowTab))?.[0]?.value, value)
                                    props.GetTodayTaskExecute(
                                        true,
                                        moment(globalContextService.get("TaskHistoryPage", "DateBegin"), "YYYY-MM"),
                                        moment(globalContextService.get("TaskHistoryPage", "DateEnd"), "YYYY-MM")
                                    )
                                }
                                globalContextService.set("TaskHistoryPage", "DateEnd", value);
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
                                theme={{
                                    topContainer: {
                                        basic: (style, props) => ({
                                            ...style,
                                            minHeight: "55px",
                                            height: "auto"
                                        })
                                    }
                                }}
                                topContent={(data) => {
                                    console.log(data)
                                    return (
                                        <>
                                            {/* 下車地點註記 */}
                                            <Text
                                                theme={mobileM.toAddrRemarkText}
                                            >
                                                {data.toAddrRemark}
                                            </Text>

                                            {/* 下車地點 */}
                                            <Text
                                                theme={mobileM.toAddrText}
                                            >
                                                {data.toAddr}
                                            </Text>
                                        </>
                                    )
                                }}
                                bottomContent={(data) => {
                                    console.log(data)


                                    return (
                                        <>
                                            <Container>
                                                {/* 乘車時間 */}
                                                <Text
                                                    theme={mobileM.reserveDateFirstText}
                                                >
                                                    {dateToChinese(data?.reserveDate)}
                                                </Text>
                                                <Text
                                                    theme={mobileM.reserveDateSecondText}
                                                >
                                                    {`${data?.reserveDate.split(' ')[1].substring(0, 5)}`}
                                                </Text>

                                                {/* 輪椅 */}
                                                <Text
                                                    theme={mobileM.wheelChairText}
                                                >
                                                    <WheelChair style={mobileM.wheelChairSvg} />
                                                    {data?.wheelchairType}
                                                </Text>
                                            </Container>

                                            {/* 狀態容器 */}
                                            <SubContainer
                                                theme={mobileM.statusContainer}
                                            >
                                                <SubContainer theme={mobileM.statusInsideContainer}>

                                                    {/* 訂單狀態 */}
                                                    <Text
                                                        theme={mobileM.statusText}
                                                    >
                                                        訂單狀態
                                                    </Text>
                                                    <Text
                                                        theme={mobileM.statusRightText}
                                                    >
                                                        {statusMapping(data?.status)}
                                                        <Arrow style={mobileM.arrowSvg} />
                                                    </Text>

                                                </SubContainer>
                                            </SubContainer>
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