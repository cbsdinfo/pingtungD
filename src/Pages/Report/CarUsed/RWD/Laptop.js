import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal, RangeDateTimePicker } from '../../../../Components';
import { useHistory } from 'react-router-dom';

import moment from 'moment';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { carUsed: { rwd: { laptop } } } } = Theme;

    const [IdDescribe, setIdDescribe] = useState(globalContextService.get("CarUsedPage", "IdDescribe") ?? false);

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"車輛使用狀況"}
                            theme={laptop.titleBar}
                            onSubmit={(e) => {
                                console.log("目前不支援搜尋功能")
                                // props.GetSubOrgsExecute(true, "");
                            }}
                        >
                            {/* 查詢日期區間 DateTimeRange  */}
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
                                    (globalContextService.get("CarUsedPage", "DateTimeRange") ?
                                        [moment(globalContextService.get("CarUsedPage", "DateTimeRange")[0]), moment(globalContextService.get("CarUsedPage", "DateTimeRange")[1])]
                                        :
                                        [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-06', "YYYY-MM-DD")]
                                    )
                                }
                                onChange={(value, momentObj) => {
                                    globalContextService.set("CarUsedPage", "DateTimeRange", value);
                                }}
                                theme={laptop.dateTimeRange}
                            />

                            {/* 單選下拉選單 請選擇用戶身份 UserCaseType */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                //viewType
                                isSearchable
                                placeholder={"請選擇用戶身份"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("CarUsedPage", "UserCaseType") ?? null}
                                //value={globalContextService.get("CarUsedPage", "UserCaseType") ?? [{ value: '1', label: '長照個案' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CarUsedPage", "UserCaseType", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇用戶身份", isDisabled: true },
                                    { value: '1', label: '長照個案' },
                                    { value: '2', label: '日照個案' },
                                    { value: '3', label: '偏鄉運能不足' },
                                    { value: '4', label: '白牌車' },
                                    { value: '5', label: '噗噗共乘' },
                                    { value: '6', label: '幸福巴士' },
                                    { value: '7', label: 'DRTS' }
                                ]}
                                theme={laptop.userId}

                            />

                            {/* 單選下拉選單 請選擇服務單位 Unit */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                //viewType
                                isSearchable
                                placeholder={"請選擇服務單位"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("CarUsedPage", "Unit") ?? null}
                                //value={globalContextService.get("CarUsedPage", "Unit") ?? [{ value: '1', label: '長照個案' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CarUsedPage", "Unit", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇服務單位", isDisabled: true },
                                    { value: '1', label: 'A單位' },
                                    { value: '2', label: 'B單位' },
                                ]}
                                theme={laptop.unit}

                            />


                            {/* 匯出檔案按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>

                                {/* 匯出檔案按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptop.exportButton}
                                    onClick={(e) => {
                                        e.preventDefault();

                                    }}
                                >
                                    匯出檔案
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
                theme={laptop.mainPageContainer}
            >
                {/* 頁面外層容器 */}
                <Container>
                    {
                        //#region 這裡假裝假資料
                        ([
                            { id: 0, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 1, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 2, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 3, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 4, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 5, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 6, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 7, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 8, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 9, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 10, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 11, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 12, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 13, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 14, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 15, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 16, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 17, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 18, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 19, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 20, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 21, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                        ] ?? [])
                            //#endregion
                            .map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {/* 卡片容器 */}
                                        <BasicContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.cardContainer}
                                        >
                                            {/* 車牌號碼 */}
                                            <Text
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={laptop.carNo}
                                            >
                                                {item?.carNo}
                                            </Text>

                                            {/* 公司名稱 */}
                                            <Text
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={laptop.OrgName}
                                            >
                                                {item?.OrgName}
                                            </Text>

                                            {/* 完成趟次 */}
                                            <BasicContainer>
                                                {/* 完成趟次 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptop.finishTimes}
                                                >
                                                    完成趟次
                                                </Text>

                                                {/* 完成趟次的值 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptop.finishTimesValue}
                                                >
                                                    {item?.finishTimes}
                                                </Text>
                                            </BasicContainer>

                                            {/* 完成總里程數 */}
                                            <BasicContainer>
                                                {/* 完成總里程數 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptop.totalLong}
                                                >
                                                    完成總里程數
                                                </Text>

                                                {/* 完成總里程數的值 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptop.totalLongValue}
                                                >
                                                    {item?.totalLong}
                                                </Text>
                                            </BasicContainer>

                                            {/* 使用率% */}
                                            <BasicContainer>
                                                {/* 使用率% */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptop.useRate}
                                                >
                                                    使用率%
                                                </Text>

                                                {/* 使用率%的值 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptop.useRateValue}
                                                >
                                                    {item?.useRate}
                                                </Text>
                                            </BasicContainer>
                                        </BasicContainer>
                                    </React.Fragment>
                                )
                            })
                    }


                </Container>

            </MainPageContainer>

        </>

    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`

