import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal, CarAndDriverSettingCard, MainPageSubTitleBar } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal, RangeDateTimePicker } from '../../../../Components';
// import { ReactComponent as Search } from '../../../../Assets/img/CasePage/Search.svg'
import { useHistory } from 'react-router-dom';

import moment from 'moment';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { exportReport: { rwd: { laptopL } } } } = Theme;

    const [IdDescribe, setIdDescribe] = useState(globalContextService.get("CarAndDriverSettingPage", "IdDescribe") ?? false);

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"匯出報表"}
                            theme={laptopL.titleBar}
                            onSubmit={(e) => {
                                console.log("目前不支援搜尋功能")
                                // props.GetSubOrgsExecute(true, "");
                            }
                            }
                        >

                        </MainPageTitleBar>
                    </>
                }
                theme={laptopL.mainPageContainer}
            >

                {/* 匯出報表 表單區容器  */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptopL.exportContainer}
                >
                    {/* 匯出報表 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"匯出報表"}
                        theme={laptopL.exportSubTitleBar}
                    />

                    {/* 匯出報表 區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.exportListContainer}
                    >

                        {/* 匯出報表表單區域容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptopL.exportFromContainer}
                        >
                            <FormRow>

                                {/* 查詢日期區間 DateTimeRange  */}
                                <RangeDateTimePicker
                                    topLabel={<>請選擇日期區間</>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"date"}
                                    format={"YYYY-MM-DD"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("ExportReportPage", "DateTimeRange") ?
                                            [moment(globalContextService.get("ExportReportPage", "DateTimeRange")[0]), moment(globalContextService.get("ExportReportPage", "DateTimeRange")[1])]
                                            :
                                            [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-06', "YYYY-MM-DD")]
                                        )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("ExportReportPage", "DateTimeRange", value);
                                    }}
                                    theme={laptopL.dateTimeRange}
                                />
                            </FormRow>

                            <FormRow>
                                <SubContainer>
                                    {/* 請選擇匯出報表 上標題 */}
                                    <Text
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={laptopL.topLabel}
                                    >
                                        請選擇匯出報表
                                    </Text>
                                </SubContainer>
                            </FormRow>

                            <FormRow
                                baseDefaultTheme={"DefaultTheme"}
                                theme={laptopL.bottonContainer}
                            >
                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                    {/* 任務明細檔 按鈕 */}
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // 防止提交
                                        theme={laptopL.detailButton}
                                        onClick={(e) => {
                                            e.preventDefault();

                                        }}
                                    >
                                        任務明細檔
                                    </NativeLineButton>
                                </SubContainer>

                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                    {/* 衛福部核銷檔 按鈕 */}
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // 防止提交
                                        theme={laptopL.reimbursementButton}
                                        onClick={(e) => {
                                            e.preventDefault();

                                        }}
                                    >
                                        衛福部核銷檔
                                    </NativeLineButton>
                                </SubContainer>

                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                    {/* 額度使用明細檔 按鈕 */}
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // 防止提交
                                        theme={laptopL.quotaButton}
                                        onClick={(e) => {
                                            e.preventDefault();

                                        }}
                                    >
                                        額度使用明細檔
                                    </NativeLineButton>
                                </SubContainer>

                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                    {/* 車輛使用證明單 按鈕 */}
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // 防止提交
                                        theme={laptopL.carProofButton}
                                        onClick={(e) => {
                                            e.preventDefault();

                                        }}
                                    >
                                        車輛使用證明單
                                    </NativeLineButton>
                                </SubContainer>

                            </FormRow>

                        </FormContainer>
                    </BasicContainer>
                </BasicContainer>

            </MainPageContainer>

        </>

    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`

`

