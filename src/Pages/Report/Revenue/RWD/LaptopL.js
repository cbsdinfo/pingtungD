import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal, CarAndDriverSettingCard } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal, RangeDateTimePicker } from '../../../../Components';
// import { ReactComponent as ToolTipTop } from '../../../../Assets/img/Chart/ToolTipTop.svg'
import { useHistory } from 'react-router-dom';
import { getParseItemLocalStorage, valid } from '../../../../Handlers/'
import Select from 'react-select'
import { treeSelectorTransducer } from '../../../../Components/Form/TreeSelector/TreeSelector';
import isUndefined from 'lodash/isUndefined';
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, } from 'recharts';
import moment from 'moment';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { revenue: { rwd: { laptopL } } } } = Theme;

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
                            titleText={"營收報表"}
                            theme={laptopL.titleBar}
                            onSubmit={(e) => {
                                console.log("目前不支援搜尋功能")
                                // props.GetSubOrgsExecute(true, "");
                            }
                            }
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
                                    (globalContextService.get("RevenuePage", "DateTimeRange") ?
                                        [moment(globalContextService.get("RevenuePage", "DateTimeRange")[0]), moment(globalContextService.get("RevenuePage", "DateTimeRange")[1])]
                                        :
                                        [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-06', "YYYY-MM-DD")]
                                    )
                                }
                                onChange={(value, momentObj) => {
                                    globalContextService.set("RevenuePage", "DateTimeRange", value);
                                }}
                                theme={laptopL.dateTimeRange}
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
                                value={globalContextService.get("RevenuePage", "UserCaseType") ?? null}
                                //value={globalContextService.get("RevenuePage", "UserCaseType") ?? [{ value: '1', label: '長照個案' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RevenuePage", "UserCaseType", value);
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
                                theme={laptopL.userId}

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
                                value={globalContextService.get("RevenuePage", "Unit") ?? null}
                                //value={globalContextService.get("RevenuePage", "Unit") ?? [{ value: '1', label: '長照個案' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RevenuePage", "Unit", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇服務單位", isDisabled: true },
                                    { value: '1', label: 'A單位' },
                                    { value: '2', label: 'B單位' },
                                ]}
                                theme={laptopL.unit}

                            />


                            {/* 匯出檔案按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>

                                {/* 匯出檔案按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.exportButton}
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
                theme={laptopL.mainPageContainer}
            >

                {/* 營收報表長條圖表容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptopL.barChartContainer}
                >
                    <RevenueBarChart />
                </BasicContainer>

                {/* 頁面卡片外層容器 */}
                <Container>
                    {
                        //#region 這裡假裝假資料
                        ([
                            { id: 0, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 1, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 2, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 3, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 4, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 5, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 6, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 7, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 8, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 9, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 10, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 11, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 12, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 13, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 14, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 15, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 16, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 17, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 18, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 19, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 20, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                            { id: 21, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", selfPay: 1234, govPay: 5678, total: 6912 },
                        ] ?? [])
                            //#endregion
                            .map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {/* 卡片容器 */}
                                        <BasicContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptopL.cardContainer}
                                        >
                                            {/* 車牌號碼 */}
                                            <Text
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={laptopL.carNo}
                                            >
                                                {item?.carNo}
                                            </Text>

                                            {/* 公司名稱 */}
                                            <Text
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={laptopL.OrgName}
                                            >
                                                {item?.OrgName}
                                            </Text>

                                            {/* 個案負擔 */}
                                            <BasicContainer>
                                                {/* 個案負擔 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptopL.selfPay}
                                                >
                                                    個案負擔
                                                </Text>

                                                {/* 個案負擔的值 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptopL.selfPayValue}
                                                >
                                                    {item?.selfPay}
                                                </Text>
                                            </BasicContainer>

                                            {/* 政府補助 */}
                                            <BasicContainer>
                                                {/* 政府補助 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptopL.govPay}
                                                >
                                                    政府補助
                                                </Text>

                                                {/* 政府補助的值 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptopL.govPayValue}
                                                >
                                                    {item?.govPay}
                                                </Text>
                                            </BasicContainer>

                                            {/* 總營收 */}
                                            <BasicContainer>
                                                {/* 總營收 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptopL.total}
                                                >
                                                    總營收
                                                </Text>

                                                {/* 總營收的值 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptopL.totalValue}
                                                >
                                                    {item?.total}
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

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`

`

//#region 營收報表長條圖表 待包裝成組件
const RevenueBarChart = (props) => {

    const [ToolTipPosition, setToolTipPosition] = useState(false);
    const data = [
        {
            name: '總車資', value: 1620000,
        },
        {
            name: '政府補助', value: 123400,
        },
        {
            name: '個案負擔', value: 56780,
        }
    ];

    return (
        <>
            <ResponsiveContainer width='100%' height="100%">
                <BarChart
                    layout="vertical"

                    // width={500}
                    // height={300}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid vertical horizontal={false} stroke={"#F0F0F0"} /* verticalFill={['#555555', '#444444']} fillOpacity={0.2} strokeDasharray="3 3"*/ />
                    <XAxis axisLine={{ stroke: 'rgba(0, 0, 0, 0)' }} type="number" tickCount={10} domain={[0, Math.max(...data.map((item) => (item?.value))) + 20000]} />
                    <YAxis axisLine={{ stroke: 'rgba(0, 0, 0, 0)' }} dataKey="name" type="category" />
                    <ChartTooltip cursor={{ fill: 'rgba(0, 0, 0, 0)' }} isAnimationActive={false} position={ToolTipPosition} content={(props) => {
                        if (!ToolTipPosition) {
                            return null;
                        }
                        if (props?.active) {
                            const { payload, label } = props;
                            console.log(props)
                            return (
                                <Text theme={{
                                    basic: () => ({
                                        alignItems: "left",
                                        width: `${84 + 8 * (payload[0].value.toString().length)}px`,
                                        height: "36px", position: "relative", left: "-50px"
                                    })
                                }}>
                                    <TooltipDiv width={`${84 + 8 * (payload[0].value.toString().length)}px`}>
                                        <span className={"tooltiptext"}>{`${label} : $${payload[0].value}`}</span>
                                    </TooltipDiv>
                                </Text>
                            );
                        }
                    }} />
                    <Legend align={"center"} content={(props) => {
                        return (
                            <Text theme={{
                                basic: () => ({
                                    fontSize: "14px",
                                    lineHeight: "22px",
                                    color: "rgba(0, 0, 0, 0.65)",
                                    textAlign: "center",
                                    fontWeight: "700"
                                })
                            }}>
                                單位 NTD
                            </Text>
                        )
                    }} />
                    <Bar dataKey="value" fill="#8884d8" >
                        {
                            data.map((item, index) => {
                                console.log(item, index)
                                let color = ["#69C0FF", "#5CDBD3", "#FF9C6E"];
                                return (
                                    <Cell background={false} onMouseLeave={() => { setToolTipPosition(false) }} onMouseEnter={() => { if (ToolTipPosition?.y !== (-4 + index * 65)) { setToolTipPosition({ y: -4 + index * 65 }) } }} key={`cell-${index}`} fill={color[index]} height={30} y={22 + index * 65} onClick={() => { console.log("asd") }} />
                                )
                            })
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

const TooltipDiv = styled.div.attrs((props) => ({}))`
//#region 
position: relative;
display: inline-block;
border-bottom: 1px dotted black;

& .tooltiptext {
    // visibility: hidden;
    visibility: visible;
    width: ${props => props?.width ?? '100px'};
    background-color: black;
    opacity: 0.75;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 8px 6px;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
    font-size: 14px;
    line-height: 18px;
  }
  
  & .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
  
//   &:hover .tooltiptext {
//     visibility: visible;
//   }
//#endregion
`
//#endregion
