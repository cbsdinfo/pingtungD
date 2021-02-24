import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, TaskCard, TitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as WheelChair } from '../../../Assets/img/TaskHistoryPage/WheelChair.svg'
import { ReactComponent as Arrow } from '../../../Assets/img/TaskHistoryPage/Arrow.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { fmt } from '../../../Handlers/DateHandler';
import { SystemNewsComponent } from '../SystemNewsComponent/SystemNewsComponent'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined } from 'lodash';
import { toString } from 'lodash/lang';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { income: { rwd: { mobileM } } } } = Theme;
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
                return "已抵達";
            case "4":
                return "客上";
            case "5":
                return "完成";
            case "9":
                return "取消-空趟";
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
                        type={"day"}
                        format={"YYYY-MM-DD"}
                        bascDefaultTheme={"DefaultTheme"}
                        // viewType
                        isSearchableTaskHistoryPage
                        placeholder={""}
                        value={
                            (globalContextService.get("TaskHistoryPage", "DateBegin")) ?
                                moment(globalContextService.get("TaskHistoryPage", "DateBegin"), "YYYY-MM-DD")
                                :
                                moment().startOf("day").add(1, "day")
                        }
                        onChange={(value, momentObj, OnInitial) => {
                            let preSet = globalContextService.get("TaskHistoryPage", "DateBegin");
                            if (!isEqual(value, globalContextService.get("TaskHistoryPage", "DateBegin"))) {
                                if (!isUndefined(globalContextService.get("TaskHistoryPage", "firstUseAPIgetTodayTask"))) {
                                    if (moment(value).startOf("day").isAfter(moment(globalContextService.get("TaskHistoryPage", "DateEnd")))) {
                                        modalsService.infoModal.warn({
                                            iconRightText: "起日不可大於迄日",
                                            yes: true,
                                            yesText: "確認",
                                            // no: true,
                                            // autoClose: true,
                                            backgroundClose: false,
                                            yesOnClick: (e, close) => {
                                                close();
                                            }
                                        })
                                    } else {
                                        props.GetTodayTaskExecute(
                                            true,
                                            fmt(moment(value, "YYYY-MM-DD").startOf("day")),
                                            fmt(moment(globalContextService.get("TaskHistoryPage", "DateEnd"), "YYYY-MM-DD").endOf("day"))
                                        )
                                    }
                                }

                                if (moment(value).startOf("day").isAfter(moment(globalContextService.get("TaskHistoryPage", "DateEnd")))) {
                                    globalContextService.set("TaskHistoryPage", "DateBegin", preSet);
                                } else {
                                    globalContextService.set("TaskHistoryPage", "DateBegin", value);

                                }
                                setForceUpdate(f => !f)
                            }

                        }
                        }
                        disabledDate={(perMoment) => {
                            // 去除掉前後一個月外的日期
                            return perMoment && ((perMoment > moment().startOf('day').add(1, "day").add(1, "months")) || (perMoment < moment().startOf('day').add(1, "day").subtract(1, "months")));
                        }}
                        theme={mobileM.dateTimeRange}
                    />

                    {/* 日期區間 DateTimeRange  */}
                    <DateTimePicker
                        rightText={"(迄)"}
                        topLabel={<>日期區間</>}
                        // type={"time"} time、date、week、month、quarter、year
                        type={"day"}
                        format={"YYYY-MM-DD"}
                        bascDefaultTheme={"DefaultTheme"}
                        // viewType
                        isSearchableTaskHistoryPage
                        placeholder={""}
                        value={
                            (globalContextService.get("TaskHistoryPage", "DateEnd")) ?
                                moment(globalContextService.get("TaskHistoryPage", "DateEnd"), "YYYY-MM-DD")
                                :
                                moment().endOf("day").add(1, "day")
                        }
                        onChange={(value, momentObj, OnInitial) => {
                            let preSet = globalContextService.get("TaskHistoryPage", "DateEnd");
                            if (!isEqual(value, globalContextService.get("TaskHistoryPage", "DateEnd"))) {
                                if (!isUndefined(globalContextService.get("TaskHistoryPage", "firstUseAPIgetTodayTask"))) {
                                    if (moment(value).isBefore(moment(globalContextService.get("TaskHistoryPage", "DateBegin")))) {
                                        modalsService.infoModal.warn({
                                            iconRightText: "迄日不可小於起日",
                                            yes: true,
                                            yesText: "確認",
                                            // no: true,
                                            // autoClose: true,
                                            backgroundClose: false,
                                            yesOnClick: (e, close) => {
                                                close();
                                            }
                                        })
                                    } else {
                                        props.GetTodayTaskExecute(
                                            true,
                                            fmt(moment(globalContextService.get("TaskHistoryPage", "DateBegin"), "YYYY-MM-DD").startOf("day")),
                                            fmt(moment(value, "YYYY-MM-DD").endOf("day"))
                                        )
                                    }
                                }

                                if (moment(value).isBefore(moment(globalContextService.get("TaskHistoryPage", "DateBegin")))) {
                                    globalContextService.set("TaskHistoryPage", "DateEnd", preSet);
                                } else {
                                    globalContextService.set("TaskHistoryPage", "DateEnd", value);
                                }
                                setForceUpdate(f => !f)
                            }
                        }}
                        disabledDate={(perMoment) => {
                            // 去除掉前後一個月外的日期
                            return perMoment && ((perMoment > moment().startOf('day').add(1, "day").add(1, "months")) || (perMoment < moment().startOf('day').add(1, "day").subtract(1, "months")));
                        }}
                        theme={mobileM.dateTimeRange}
                    />
                </Container>

                {/* 訂單總計區塊 */}
                <Container
                    theme={{
                        basic: (style, props) => ({
                            ...style,
                            background: "#3c4856",
                            padding: "0 4px"
                        })
                    }}
                >
                    {/* 訂單總計 */}
                    <SubContainer theme={mobileM.totalContainer}>
                        <Text theme={mobileM.totalTitleText}>
                            訂單總計
                        </Text>
                        <Text theme={mobileM.totalAmtText}>
                            109
                        </Text>
                    </SubContainer>

                    {/* 現金總計 */}
                    <SubContainer theme={mobileM.totalContainer}>
                        <Text theme={mobileM.totalTitleText}>
                            現金總計
                        </Text>
                        <Text theme={mobileM.totalAmtText}>
                            1919
                        </Text>
                    </SubContainer>

                    {/* 非現金總計 */}
                    <SubContainer theme={mobileM.totalContainer2}>
                        <Text theme={mobileM.totalTitleText2}>
                            非現金總計
                        </Text>
                        <Text theme={mobileM.totalAmtText2}>
                            1900
                        </Text>
                    </SubContainer>

                </Container>

                <BasicContainer
                    theme={mobileM.cardOutContainer}
                >
                    {/* {props?.TodayTask?.map((item, index) => { */}
                    {/* return ( */}
                    <TaskCard
                        // key={index}

                        // data={props?.TodayTask} // 調度單資料
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
                                    height: "auto",
                                })
                            },
                            outcontainer: {
                                basic: (style, props) => ({
                                    ...style,
                                    padding: "12px 5px 12px"
                                })
                            }
                        }}
                        topContent={(data) => {
                            // console.log("data", props?.TodayTask)
                            return (
                                <>
                                    {/* 下車地點註記 */}
                                    {/* <Text
                                        theme={mobileM.toAddrRemarkText}
                                    >
                                        {data.toAddrRemark}
                                    </Text> */}

                                    {/* 下車地點 */}
                                    {/* <Text
                                        theme={mobileM.toAddrText}
                                    >
                                        {data.toAddr}
                                    </Text> */}

                                    {/* Table標題容器 */}
                                    <SubContainer
                                        theme={mobileM.tableTitleContainer}
                                    >
                                        <SubContainer
                                            theme={mobileM.tableTitleInsideContainer}
                                        >
                                            <Text
                                                theme={mobileM.tableDateTitleText}
                                            >
                                                日期
                                        </Text>
                                            <Text
                                                theme={mobileM.tableCountTitleText}
                                            >
                                                單數
                                        </Text>
                                            <Text
                                                theme={mobileM.tablePayWayTitleText}
                                            >
                                                收款方式
                                        </Text>
                                            <Text
                                                theme={mobileM.tablePaidTitleText}
                                            >
                                                實收
                                        </Text>
                                        </SubContainer>
                                    </SubContainer>
                                </>
                            )
                        }}
                        bottomContent={(data) => {
                            // console.log(data)


                            return (
                                <>

                                    {props?.TodayTask?.map((item, index) => {
                                        let effectCount = 0;
                                        let countNow = 1;
                                        const countNowAdd = () => {
                                            countNow++
                                        }
                                        return (
                                            <>
                                                {/* 計算有效筆數 */}
                                                {item.detail.map((detail) => {
                                                    if (detail.count > 0) {
                                                        effectCount++;
                                                    }
                                                })}

                                                <React.Fragment key={index}>
                                                    {/* 列表內容容器 */}
                                                    <Container
                                                        theme={mobileM.paymentRecordContainer}
                                                    >
                                                        {/* 日期容器 */}
                                                        <SubContainer
                                                            theme={mobileM.dateInsideContainer}
                                                            style={{ height: `${effectCount * 37 - 1}px` }}
                                                        >

                                                            <BasicContainer
                                                                theme={{
                                                                    basic: (style, props) => ({
                                                                        ...style,
                                                                        width: "100%"
                                                                    })
                                                                }}
                                                            >
                                                                {/* 日期 */}
                                                                <Text
                                                                    theme={mobileM.dateText}
                                                                >
                                                                    {item?.date?.substring(0, 4)}
                                                                </Text>
                                                                <Text
                                                                    theme={mobileM.dateText}
                                                                >
                                                                    {item?.date?.substring(5, 7) + "/" + item?.date?.substring(8)}
                                                                </Text>
                                                            </BasicContainer>

                                                        </SubContainer>

                                                        <SubContainer

                                                            theme={mobileM.countInsideContainer}
                                                        >
                                                            <SubContainer style={{ width: "100%" }}>

                                                                {item.detail.map((item2, index2) => {
                                                                    return (
                                                                        <>
                                                                            <React.Fragment key={index}>
                                                                                {item2?.count > 0 &&
                                                                                    <>
                                                                                        {effectCount === countNow ?
                                                                                            <>
                                                                                                {/* 單數容器 */}
                                                                                                {/* 單數 */}
                                                                                                <Text
                                                                                                    theme={mobileM.countLastText}
                                                                                                >
                                                                                                    {item2?.count}
                                                                                                </Text>

                                                                                                {/* 收款方式 */}
                                                                                                <Text
                                                                                                    theme={mobileM.payWayLastText}
                                                                                                >
                                                                                                    {item2?.typeName}
                                                                                                </Text>

                                                                                                {/* 實收 */}
                                                                                                <Text
                                                                                                    theme={mobileM.paidLastText}
                                                                                                >
                                                                                                    ${item2?.receivePay}
                                                                                                </Text>
                                                                                            </>
                                                                                            :
                                                                                            <>
                                                                                                {/* 單數容器 */}
                                                                                                {/* 單數 */}
                                                                                                <Text
                                                                                                    theme={mobileM.countText}
                                                                                                >
                                                                                                    {item2?.count}
                                                                                                </Text>

                                                                                                {/* 收款方式 */}
                                                                                                <Text
                                                                                                    theme={mobileM.payWayText}
                                                                                                >
                                                                                                    {item2?.typeName}
                                                                                                </Text>

                                                                                                {/* 實收 */}
                                                                                                <Text
                                                                                                    theme={mobileM.paidText}
                                                                                                >
                                                                                                    ${item2?.receivePay}
                                                                                                </Text>

                                                                                                {countNowAdd()}
                                                                                            </>
                                                                                        }

                                                                                    </>
                                                                                }
                                                                            </React.Fragment>
                                                                        </>
                                                                    )
                                                                })
                                                                }
                                                            </SubContainer>
                                                        </SubContainer>

                                                    </Container>

                                                </React.Fragment>
                                            </>
                                        )
                                    })}





                                </>
                            )
                        }}
                    />
                    {/* ) */}
                    {/* })} */}


                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`