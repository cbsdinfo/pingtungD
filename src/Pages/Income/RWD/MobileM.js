import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, TaskCard, TitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { fmt } from '../../../Handlers/DateHandler';
import { SystemNewsComponent } from '../SystemNewsComponent/SystemNewsComponent'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined } from 'lodash';
import { toString } from 'lodash/lang';
import { payWayshMapping } from '../../../Mappings/Mappings';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { income: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();

    // 去識別化
    const deIdentification = (str = "") => {
        const strLen = str.length
        return (
            strLen === 2 ?
                str.substr(0, 1) + "O"
                :
                (
                    strLen > 2 ?
                        str.substr(0, 1) + "O".repeat(str.length - 2) + str.substr(str.length - 1)
                        :
                        str
                )
        )
    }

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
                        isSearchableIncomePage
                        placeholder={""}
                        value={
                            (globalContextService.get("IncomePage", "DateBegin")) ?
                                moment(globalContextService.get("IncomePage", "DateBegin"), "YYYY-MM-DD")
                                :
                                moment().startOf("day")
                        }
                        onChange={(value, momentObj, OnInitial) => {
                            let preSet = globalContextService.get("IncomePage", "DateBegin");
                            if (!isEqual(value, globalContextService.get("IncomePage", "DateBegin"))) {
                                if (!isUndefined(globalContextService.get("IncomePage", "firstUseAPIgetIncome"))) {
                                    if (moment(value).startOf("day").isAfter(moment(globalContextService.get("IncomePage", "DateEnd")))) {
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
                                        props.GetIncomeExecute(
                                            true,
                                            fmt(moment(value, "YYYY-MM-DD").startOf("day")),
                                            fmt(moment(globalContextService.get("IncomePage", "DateEnd"), "YYYY-MM-DD").endOf("day"))
                                        )
                                    }
                                }

                                if (moment(value).startOf("day").isAfter(moment(globalContextService.get("IncomePage", "DateEnd")))) {
                                    globalContextService.set("IncomePage", "DateBegin", preSet);
                                } else {
                                    globalContextService.set("IncomePage", "DateBegin", value);

                                }
                                setForceUpdate(f => !f)
                            }

                        }
                        }
                        // disabledDate={(perMoment) => {
                        //     // 去除掉前後一個月外的日期
                        //     return perMoment && ((perMoment > moment().startOf('day').add(1, "day").add(1, "months")) || (perMoment < moment().startOf('day').add(1, "day").subtract(1, "months")));
                        // }}
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
                        isSearchableIncomePage
                        placeholder={""}
                        value={
                            (globalContextService.get("IncomePage", "DateEnd")) ?
                                moment(globalContextService.get("IncomePage", "DateEnd"), "YYYY-MM-DD")
                                :
                                moment().endOf("day")
                        }
                        onChange={(value, momentObj, OnInitial) => {
                            let preSet = globalContextService.get("IncomePage", "DateEnd");
                            if (!isEqual(value, globalContextService.get("IncomePage", "DateEnd"))) {
                                if (!isUndefined(globalContextService.get("IncomePage", "firstUseAPIgetIncome"))) {
                                    if (moment(value).isBefore(moment(globalContextService.get("IncomePage", "DateBegin")))) {
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
                                        props.GetIncomeExecute(
                                            true,
                                            fmt(moment(globalContextService.get("IncomePage", "DateBegin"), "YYYY-MM-DD").startOf("day")),
                                            fmt(moment(value, "YYYY-MM-DD").endOf("day"))
                                        )
                                    }
                                }

                                if (moment(value).isBefore(moment(globalContextService.get("IncomePage", "DateBegin")))) {
                                    globalContextService.set("IncomePage", "DateEnd", preSet);
                                } else {
                                    globalContextService.set("IncomePage", "DateEnd", value);
                                }
                                setForceUpdate(f => !f)
                            }
                        }}
                        // disabledDate={(perMoment) => {
                        //     // 去除掉前後一個月外的日期
                        //     return perMoment && ((perMoment > moment().startOf('day').add(1, "day").add(1, "months")) || (perMoment < moment().startOf('day').add(1, "day").subtract(1, "months")));
                        // }}
                        theme={mobileM.dateTimeRange}
                    />
                </Container>

                {/* 訂單總計區塊 */}
                <Container
                    theme={{
                        basic: (style, props) => ({
                            ...style,
                            background: "#3c4856",
                            padding: "0 6px"
                        })
                    }}
                >
                    {/* 訂單總計 */}
                    <SubContainer theme={mobileM.totalContainer}>
                        <Text theme={mobileM.totalTitleText}>
                            訂單總計
                        </Text>
                        <Text theme={mobileM.totalAmtText}>
                            {props.Income?.orderCount}
                        </Text>
                    </SubContainer>

                    {/* 現金總計 */}
                    <SubContainer theme={mobileM.totalContainer}>
                        <Text theme={mobileM.totalTitleText}>
                            現金總計
                        </Text>
                        <Text theme={mobileM.totalAmtText}>
                            {props.Income?.cashTotal}
                        </Text>
                    </SubContainer>

                    {/* 非現金總計 */}
                    <SubContainer theme={mobileM.totalContainer2}>
                        <Text theme={mobileM.totalTitleText2}>
                            非現金總計
                        </Text>
                        <Text theme={mobileM.totalAmtText2}>
                            {props.Income?.otherTotal}
                        </Text>
                    </SubContainer>

                </Container>

                <BasicContainer
                    theme={mobileM.cardOutContainer}
                >
                    {/* {props?.TodayTask?.map((item, index) => { */}
                    {/* return ( */}
                    <TaskCard
                        // key={""}

                        // data={props?.TodayTask} // 調度單資料
                        // nameType // timeNameType、nameType 顯示名字、或顯示時間與名字
                        // timeNameType // timeNameType、nameType 顯示名字、或顯示時間與名字
                        // needAction // 是否需要點即後，文字變成執行中
                        // nameKeyName={"name"} // nameKeyName 對應資料 名字 的 key 名
                        // TimeKeyName={"reserveDate"} // TimeKeyName 對應資料 時間 的 key 名
                        // callBackKeyName 有需要回調 則在資料中補上回調，並指定 key名
                        // primaryKey={"orderId"}// primaryKey 對應資料 唯一鍵 的 key 名
                        // defaultUsePrimaryKey={props?.defaultPrimary} // 初始要使用的分頁 (值要對應到 primaryKey)
                        theme={{
                            topContainer: {
                                basic: (style, props) => ({
                                    ...style,
                                    minHeight: "32px",
                                    height: "auto",
                                })
                            },
                            container: {
                                basic: (style, props) => ({
                                    ...style,
                                    height: "0px"
                                })
                            },
                            outcontainer: {
                                basic: (style, props) => ({
                                    ...style,
                                    padding: "10px 10px 12px"
                                })
                            }
                        }}
                        topContent={(data) => {
                            return (
                                <>
                                    {/* Table標題 */}
                                    <Text
                                        theme={mobileM.titleText}
                                    >
                                        車資
                                    </Text>
                                </>
                            )
                        }}
                        bottomContent={(data) => {
                            // console.log(data)
                            return (
                                <>
                                    {/* Table標題容器 */}
                                    <Container
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
                                                theme={mobileM.tableDateTitleText}
                                            >
                                                時間
                                            </Text>

                                            <Text
                                                theme={mobileM.tableCountTitleText}
                                            >
                                                乘客姓名
                                            </Text>

                                            <Text
                                                theme={mobileM.tablePayWayTitleText}
                                            >
                                                付款方式
                                            </Text>

                                            <Text
                                                theme={mobileM.tablePaidTitleText}
                                            >
                                                交易金額
                                            </Text>

                                        </SubContainer>
                                    </Container>

                                    {props?.Income?.payData?.map((item, index) => {
                                        // let effectCount = item.data?.length; // 
                                        // let countNow = 1;
                                        // const countNowAdd = () => {
                                        //     countNow++
                                        // }
                                        return (
                                            <>

                                                <React.Fragment key={index}>
                                                    {/* 列表內容容器 */}
                                                    <Container
                                                        theme={mobileM.paymentRecordContainer}
                                                    >
                                                        {/* 日期容器 */}
                                                        <SubContainer
                                                            theme={mobileM.dateInsideContainer}
                                                        // style={{ height: `${effectCount * 37 - 1}px` }}
                                                        >
                                                            {/* 日期 */}
                                                            <Text
                                                                theme={mobileM.dateText}
                                                            >
                                                                {fmt(moment(item?.reserveDate), "MM/DD")}
                                                            </Text>

                                                        </SubContainer>

                                                        {/* 時間容器 */}
                                                        <SubContainer
                                                            theme={mobileM.timeInsideContainer}
                                                        >
                                                            <Text
                                                                theme={mobileM.timeText}
                                                            >
                                                                {fmt(moment(item?.reserveDate), "HH:mm")}
                                                            </Text>

                                                        </SubContainer>

                                                        {/* 乘客姓名容器 */}
                                                        <SubContainer
                                                            theme={mobileM.nameInsideContainer}
                                                            tableHeight={props.height}
                                                        >
                                                            <Text
                                                                theme={mobileM.nameText}
                                                            >
                                                                {deIdentification(item?.name)}
                                                            </Text>

                                                        </SubContainer>

                                                        {/* 收款方式容器 */}
                                                        <SubContainer
                                                            theme={mobileM.paywayInsideContainer}
                                                        >
                                                            <Text
                                                                theme={mobileM.payWayText}
                                                            >
                                                                {payWayshMapping[item?.payType]}
                                                            </Text>

                                                        </SubContainer>

                                                        {/* 實收容器 */}
                                                        <SubContainer
                                                            theme={mobileM.paidInsideContainer}
                                                        >
                                                            <Text
                                                                theme={mobileM.paidText}
                                                            >
                                                                ${item?.receivePay}
                                                            </Text>

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