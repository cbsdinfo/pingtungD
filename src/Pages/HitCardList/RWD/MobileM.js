import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, TaskCard, TitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, BasicButton, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { fmt } from '../../../Handlers/DateHandler';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined } from 'lodash';
import { ReactComponent as Arrow } from '../../../Assets/img/HitCardListPage/Arrow.svg'
const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { hitCardList: { rwd: { mobileM } } } } = Theme;
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
            <TitleBar
                returnIcon
                returnIconOnClick={(e) => {
                    e.preventDefault();
                    props.controllGCS("return")
                    history.goBack()
                }}
                customTitleText={<Text theme={mobileM.titleBar}>打卡紀錄</Text>}
            />

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
                        type={"date"}
                        format={"YYYY-MM-DD"}
                        bascDefaultTheme={"DefaultTheme"}
                        // viewType
                        isSearchableHitCardListPage
                        placeholder={""}
                        value={
                            (globalContextService.get("HitCardListPage", "DateBegin")) ?
                                moment(globalContextService.get("HitCardListPage", "DateBegin"), "YYYY-MM-DD")
                                :
                                moment().startOf("day")
                        }
                        onChange={(value, momentObj, OnInitial) => {
                            let preSet = globalContextService.get("HitCardListPage", "DateBegin");
                            if (!isEqual(value, globalContextService.get("HitCardListPage", "DateBegin"))) {
                                if (!isUndefined(globalContextService.get("HitCardListPage", "firstUseAPIgetDriverPunch"))) {
                                    if (moment(value).startOf("day").isAfter(moment(globalContextService.get("HitCardListPage", "DateEnd")))) {
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
                                        props.GetDriverPunchExecute(
                                            true,
                                            fmt(moment(value, "YYYY-MM-DD").startOf("day")),
                                            fmt(moment(globalContextService.get("HitCardListPage", "DateEnd"), "YYYY-MM-DD").startOf("day"))
                                        )
                                    }
                                }

                                if (moment(value).startOf("day").isAfter(moment(globalContextService.get("HitCardListPage", "DateEnd")))) {
                                    globalContextService.set("HitCardListPage", "DateBegin", preSet);
                                } else {
                                    globalContextService.set("HitCardListPage", "DateBegin", value);

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
                        type={"date"}
                        format={"YYYY-MM-DD"}
                        bascDefaultTheme={"DefaultTheme"}
                        // viewType
                        isSearchableHitCardListPage
                        placeholder={""}
                        value={
                            (globalContextService.get("HitCardListPage", "DateEnd")) ?
                                moment(globalContextService.get("HitCardListPage", "DateEnd"), "YYYY-MM-DD")
                                :
                                moment().startOf("day")
                        }
                        onChange={(value, momentObj, OnInitial) => {
                            let preSet = globalContextService.get("HitCardListPage", "DateEnd");
                            if (!isEqual(value, globalContextService.get("HitCardListPage", "DateEnd"))) {
                                if (!isUndefined(globalContextService.get("HitCardListPage", "firstUseAPIgetDriverPunch"))) {
                                    if (moment(value).isBefore(moment(globalContextService.get("HitCardListPage", "DateBegin")))) {
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
                                        props.GetDriverPunchExecute(
                                            true,
                                            fmt(moment(globalContextService.get("HitCardListPage", "DateBegin"), "YYYY-MM-DD").startOf("day")),
                                            fmt(moment(value, "YYYY-MM-DD").startOf("day"))
                                        )
                                    }
                                }

                                if (moment(value).isBefore(moment(globalContextService.get("HitCardListPage", "DateBegin")))) {
                                    globalContextService.set("HitCardListPage", "DateEnd", preSet);
                                } else {
                                    globalContextService.set("HitCardListPage", "DateEnd", value);
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

                {/* 打卡紀錄 容器*/}
                <BasicContainer
                    height={Height}
                    theme={mobileM.hitCardList}
                >
                    {/* 列表標題 容器 */}
                    <SubContainer
                        theme={mobileM.listTitleContainer}
                    >
                        {/* 日期 標題 */}
                        <Text
                            theme={mobileM.dateTitle}
                        >
                            日期
                        </Text>

                        <Text theme={mobileM.arrowSpace} >
                        </Text>

                        {/* 上班 標題 */}
                        <Text
                            theme={mobileM.startWorkTitle}
                        >
                            上班
                        </Text>

                        {/* 下班 標題 */}
                        <Text
                            theme={mobileM.endWorkTitle}
                        >
                            下班
                        </Text>

                    </SubContainer>

                    {/* 列表內文外側 容器 */}
                    <SubContainer
                        theme={mobileM.listOutContainer}
                    >

                        {
                            (props?.DriverPunch ?? []).map((item, index) => {
                                return (
                                    <>
                                        {/* 列表內文 容器 */}
                                        <SubContainer
                                            style={{ padding: "6px 0" }}
                                            onClick={() => {
                                                //  導巷至 hitCard 裡面但試查詢日期 改成 {item?.date}
                                                history.push(`/HitCard?StartDate=${fmt(moment(item?.date, "YYYY-MM-DD").startOf("day"))}&EndDate=${fmt(moment(item?.date, "YYYY-MM-DD").startOf("day"))}`)
                                            }}
                                        >
                                            <SubContainer
                                                theme={mobileM.listContainer}
                                            >
                                                <SubContainer
                                                    style={{ width: "22%", backgroundColor: "#3f3f3f", }}
                                                >
                                                    {/* 日期(年)內文 */}
                                                    <Text
                                                        theme={mobileM.hitCardYearText}
                                                    >
                                                        {item?.date?.substring(0, 4)}
                                                    </Text>
                                                    {/* 日期(日)內文 */}
                                                    <Text
                                                        theme={mobileM.hitCardDateText}
                                                    >
                                                        {item?.date?.substring(5)}
                                                    </Text>
                                                </SubContainer>

                                                {/* 時間 內文 */}
                                                <Text
                                                    theme={mobileM.timeText}
                                                >
                                                    <Arrow style={mobileM.arrowIcon}></Arrow>
                                                    {fmt(moment(item?.start?.punchTime), "HH:mm")}
                                                </Text>

                                                {/* 時間 內文 */}
                                                <Text
                                                    theme={mobileM.timeText}
                                                >
                                                    {fmt(moment(item?.end?.punchTime), "HH:mm")}
                                                </Text>
                                            </SubContainer>
                                        </SubContainer>
                                    </>
                                )
                            })
                        }


                    </SubContainer>

                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`