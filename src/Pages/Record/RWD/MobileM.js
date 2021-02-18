import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, RangeDateTimePicker, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isUndefined } from 'lodash';
import { fmt } from '../../../Handlers/DateHandler';
import { AllRecordComponent } from '../AllRecordComponent/AllRecordComponent'

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { record: { rwd: { mobileM } } } } = Theme;
    const [Width, Height] = useWindowSize();
    const [OrderStatus, setOrderStatus] = useState(globalContextService.get("RecordPage", "OrderTime") ?? { value: '2', label: "未來訂單" })

    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "長照":
                return props.CaseRecord
            case "共享車隊":
                return props.WhiteRecord
            case "巴士":
                return props.BusRecord
            default:
                return props.AllTabs
        }

    }
    //#endregion

    return (
        <>
            <MainPageContainer
                theme={mobileM.mainPageContainer}
                height={Height}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <BasicContainer
                            theme={mobileM.titleBar}
                        >
                            {/* 訂單按鈕容器 */}
                            <SubContainer style={{ padding: "8px 16px" }}>
                                {/* 過去訂單按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={mobileM.preOrderButton}
                                    orderStatus={OrderStatus.value}
                                    onClick={() => {
                                        if (OrderStatus?.value === '2') {
                                            //過去訂單 - 預設上個月1號到今天 含已完成，已取消的訂單
                                            globalContextService.set("RecordPage", "DateTimeRange", [moment().add(-1, 'months').startOf("month"), moment().startOf("day")]);
                                            globalContextService.set("RecordPage", "OrderTime", { value: '1', label: "過去訂單" })
                                            setOrderStatus({ value: '1', label: "過去訂單" })

                                        }
                                    }}
                                >
                                    過去訂單
                                </NativeLineButton>

                                {/* 未來訂單按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={mobileM.futureOrderButton}
                                    orderStatus={OrderStatus.value}
                                    onClick={() => {
                                        if (OrderStatus?.value === '1') {
                                            //未來訂單 - 預設今天到下個月的最後一天 已完成，已取消之外的訂單
                                            globalContextService.set("RecordPage", "DateTimeRange", [moment().startOf("day"), moment().add(1, 'months').endOf('month')]);
                                            globalContextService.set("RecordPage", "OrderTime", { value: '2', label: "未來訂單" })
                                            setOrderStatus({ value: '2', label: "未來訂單" })
                                        }
                                    }}
                                >
                                    未來訂單
                            </NativeLineButton>
                            </SubContainer>

                            {/* 日期區間容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/*  查詢日期區間 DateTimeRange  */}
                                <RangeDateTimePicker
                                    topLabel={<></>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"date"}
                                    format={"YYYY-MM-DD"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("RecordPage", "DateTimeRange") ?
                                            [moment(globalContextService.get("RecordPage", "DateTimeRange")[0]), moment(globalContextService.get("RecordPage", "DateTimeRange")[1])]
                                            :
                                            [moment().startOf("day"), moment().add(1, 'months').endOf('month')]
                                        )
                                    }
                                    onChange={(value, momentObj) => {
                                        if (!isEqual(value, globalContextService.get("RecordPage", "DateTimeRange"))) {

                                            if (!isUndefined(globalContextService.get("RecordPage", "firstUseAPIgetRecords"))) {
                                                props.GetRecordsExecute(true, fmt(moment(value[0])), fmt(moment(value[1])))

                                            }
                                            globalContextService.set("RecordPage", "DateTimeRange", value);
                                        }
                                    }}
                                    theme={mobileM.dateTimeRange}
                                />
                            </SubContainer>

                            {tabMap().map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Text
                                            onClick={() => { props.setNowTab(item) }}
                                            isActive={props.nowTab === item}
                                            theme={mobileM.titleBarRecordTab}
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
                <AllRecordComponent
                    data={tabMap(props.nowTab)
                        .filter(X => {
                            if (isEqual(globalContextService.get("RecordPage", "OrderTime")?.value ?? '2', '2') && (X.status === 9 || X.status === 5)) {
                                return false
                            }
                            else if (isEqual(globalContextService.get("RecordPage", "OrderTime")?.value, '1') && (X.status !== 9 && X.status !== 5)) {
                                return false
                            }
                            return true
                        })
                    }
                    nowTab={props.nowTab}
                    GetRecordsExecute={props.GetRecordsExecute} // 取得用戶各種訂單紀錄資料
                    GetRecordsPending={props.GetRecordsPending}
                />
            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
