import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal, CarAndDriverSettingCard, MainPageSubTitleBar } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, OldList, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal, RangeDateTimePicker } from '../../../../Components';
// import { ReactComponent as Search } from '../../../../Assets/img/CasePage/Search.svg'
import { useHistory } from 'react-router-dom';
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, } from 'recharts';
import moment from 'moment';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { serviceMonthlyReport: { rwd: { laptopL } } } } = Theme;

    const [IdDescribe, setIdDescribe] = useState(globalContextService.get("ServiceMonthlyReportPage", "IdDescribe") ?? false);

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"服務使用區域月報表"}
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
                                    (globalContextService.get("ServiceMonthlyReportPage", "DateTimeRange") ?
                                        [moment(globalContextService.get("ServiceMonthlyReportPage", "DateTimeRange")[0]), moment(globalContextService.get("ServiceMonthlyReportPage", "DateTimeRange")[1])]
                                        :
                                        [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-06', "YYYY-MM-DD")]
                                    )
                                }
                                onChange={(value, momentObj) => {
                                    globalContextService.set("ServiceMonthlyReportPage", "DateTimeRange", value);
                                }}
                                theme={laptopL.dateTimeRange}
                            />

                            {/* 單選下拉選單 請選擇用戶身分 UserIdentity*/}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                //viewType
                                isSearchable
                                placeholder={"請選擇用戶身分"}
                                // isMulti
                                // hideSelectedOptions={false}
                                // value={globalContextService.get("CarAndDriverSettingPage", "CarDealership") ?? { value: '1', label: '車行A' }}
                                //value={globalContextService.get("CarAndDriverSettingPage", "CarDealership") ?? [{ value: '1', label: '車行B' }]}
                                value={globalContextService.get("ServiceMonthlyReportPage", "UserIdentity") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("ServiceMonthlyReportPage", "UserIdentity", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇用戶身分", isDisabled: true },
                                    { value: '1', label: 'XXX' },
                                    { value: '2', label: 'XXXX' }
                                ]}
                                theme={laptopL.userIdentity}

                            />
                            {/* 單選下拉選單 請選擇服務單位 ServiceUnits*/}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                //viewType
                                isSearchable
                                placeholder={"請選擇服務單位"}
                                // isMulti
                                // hideSelectedOptions={false}
                                // value={globalContextService.get("CarAndDriverSettingPage", "CarDealership") ?? { value: '1', label: '車行A' }}
                                value={globalContextService.get("ServiceMonthlyReportPage", "ServiceUnits") ?? [{ value: '0', label: '請選擇服務單位' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("ServiceMonthlyReportPage", "ServiceUnits", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇服務單位", isDisabled: true },
                                    { value: '1', label: 'AAAA' },
                                    { value: '2', label: 'BBBBB' }
                                ]}
                                theme={laptopL.serviceUnits}

                            />
                            {/* 系統操作問題單按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 匯出報表按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.exportButton}
                                // onClick={() => { history.push("/Case/Add") }}
                                >
                                    匯出檔案
                                </NativeLineButton>
                            </SubContainer>

                        </MainPageTitleBar>
                    </>
                }
                theme={laptopL.mainPageContainer}
            >

                {/* 區域已完成趟次比例區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptopL.orderRecordContainer}
                >

                    {/* 區域已完成趟次比例 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"區域已完成趟次比例"}
                        theme={laptopL.orderRecordSubTitleBar}
                    >
                        {/* 區域已完成趟次比例日期區間 (基本資料 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>

                        </SubContainer>
                    </MainPageSubTitleBar>

                    {/* 區域已完成趟次比例Chart區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.orderRecordTableContainer}
                    >

                        {/* 區域已完成趟次比例Chart */}
                        <RevenueBarChart />
                    </BasicContainer>
                </BasicContainer>

                {/* 頁面外層容器 */}
                <Container>
                    {
                        //#region 這裡假裝假資料
                        ([
                            { id: 0, areaName: "新莊區", totalTimes: "1111", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 1, areaName: "新莊區", totalTimes: "1111", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 2, areaName: "新莊區", totalTimes: "11151", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 3, areaName: "新莊區", totalTimes: "9111", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 4, areaName: "新莊區", totalTimes: "1111", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 5, areaName: "新莊區", totalTimes: "14511", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 6, areaName: "新莊區", totalTimes: "1111", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 7, areaName: "新莊區", totalTimes: "1111", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 8, areaName: "新莊區", totalTimes: "114", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 9, areaName: "新莊區", totalTimes: "1111", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 10, areaName: "新莊區", totalTimes: "11711", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 11, areaName: "新莊區", totalTimes: "1111", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 12, areaName: "新莊區", totalTimes: "1111", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 13, areaName: "新莊區", totalTimes: "1171", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 14, areaName: "新莊區", totalTimes: "11181", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 15, areaName: "新莊區", totalTimes: "1111", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 16, areaName: "新莊區", totalTimes: "1991", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 17, areaName: "新莊區", totalTimes: "1111", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 18, areaName: "新莊區", totalTimes: "1171", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 19, areaName: "新莊區", totalTimes: "11165", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 20, areaName: "新莊區", totalTimes: "11121", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
                            { id: 21, areaName: "新莊區", totalTimes: "11411", finishTimes: 5000, emptyTimes: 10000, noDo: "50" },
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
                                            {/* 區域名稱 */}
                                            <Text
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={laptopL.areaName}
                                            >
                                                {item?.areaName}
                                            </Text>

                                            {/* 總趟次 */}
                                            <BasicContainer>
                                                {/* 總趟次 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptopL.totalTimes}
                                                >
                                                    總趟次
                                                </Text>

                                                {/* 總趟次的值 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptopL.totalTimesValue}
                                                >
                                                    {item?.totalTimes}
                                                </Text>
                                            </BasicContainer>

                                            {/* 已完成趟次 */}
                                            <BasicContainer>
                                                {/* 已完成趟次 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptopL.finishTimes}
                                                >
                                                    已完成趟次
                                                </Text>

                                                {/* 已完成趟次的值 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptopL.finishTimesValue}
                                                >
                                                    {item?.finishTimes}
                                                </Text>
                                            </BasicContainer>

                                            {/* 空趟趟次 */}
                                            <BasicContainer>
                                                {/* 空趟趟次 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptopL.emptyTimes}
                                                >
                                                    空趟趟次
                                                </Text>

                                                {/* 空趟趟次的值 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptopL.emptyTimesValue}
                                                >
                                                    {item?.emptyTimes}
                                                </Text>
                                            </BasicContainer>

                                            {/* 未執行趟次 */}
                                            <BasicContainer>
                                                {/* 未執行趟次 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptopL.noDo}
                                                >
                                                    未執行趟次
                                                </Text>

                                                {/* 未執行趟次的值 */}
                                                <Text
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptopL.noDoValue}
                                                >
                                                    {item?.noDo}
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

//#region Tooltip
const ToolTipContent = (props) => {

    const { payload, label, coordinate } = props;

    if (props.BarIndex === false) {
        return null
    }

    if (props?.active) {
        let motherArr = (props.data ?? []).map(i => i?.value).reduce((a, b) => a + b);

        return (
            <Text theme={{
                basic: () => ({
                    alignItems: "left",
                    width: `${84 + 8 * (payload[0].value.toString().length)}px`,
                    height: "36px", position: "relative", left: "10px"
                })
            }}>

                < TooltipDiv width={`${84 + 8 * (payload[0].value.toString().length)}px`}>
                    <span className={"tooltiptext"}>
                        {`趟次 : $${payload[0].value}次`}
                        <br />
                        {`比例 : $${Math.round((payload[0].value / motherArr) * 100)}%`}
                    </span>
                </TooltipDiv>

            </Text >
        );
    } else {
        return null
    }
}
//#endregion

//#region tick
const CustomizedAxisTick = (props) => {

    const { x, y, stroke, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
        </g>
    );

}
//#endregion

const RevenueBarChart = (props) => {

    const [ToolTipPosition, setToolTipPosition] = useState(false);
    const [BarIndex, setBarIndex] = useState(false);
    const data = [
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 5000,
        },
        {
            name: '新莊區', value: 3000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        },
        {
            name: '新莊區', value: 1000,
        }
    ];

    return (
        <>
            <ResponsiveContainer width='100%' height="100%">
                <BarChart
                    // layout="vertical"

                    // width={500}
                    // height={300}
                    data={data}
                    margin={{
                        top: 5, right: 55, left: 20, bottom: 24,
                    }}
                >
                    <CartesianGrid vertical={false} horizontal stroke={"#F0F0F0"} /* verticalFill={['#555555', '#444444']} fillOpacity={0.2} strokeDasharray="3 3"*/ />
                    <XAxis axisLine={{ stroke: 'rgba(0, 0, 0, 0)' }} dataKey="name" type="category" tick={<CustomizedAxisTick />} interval={0} />
                    <YAxis axisLine={{ stroke: 'rgba(0, 0, 0, 0)' }} type="number" tickCount={10} domain={[0, Math.max(...data.map((item) => (item?.value))) + 2000]} />
                    <ChartTooltip allowEscapeViewBox={{ x: true, y: false }} cursor={{ fill: 'rgba(0, 0, 0, 0)' }} isAnimationActive={false}
                        content={
                            <ToolTipContent BarIndex={BarIndex} data={data} />
                        } />
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

                            </Text>
                        )
                    }} />
                    <Bar dataKey="value" fill="#8884d8" >
                        {
                            data.map((item, index) => {
                                // console.log("Cell", item, index)
                                let color = ["#69C0FF", "#5CDBD3", "#FF9C6E"];
                                return (
                                    <Cell
                                        background={false}
                                        onMouseLeave={() => {
                                            setBarIndex(false);
                                            // console.log(ToolTipPosition) 
                                        }}
                                        onMouseEnter={() => {
                                            if (BarIndex !== index) {
                                                setBarIndex(index);
                                            }
                                            // if (ToolTipPosition?.x !== (175 + index * 47.5)) { setToolTipPosition({ x: 175 + index * 47.5 }) }

                                        }}
                                        key={`cell-${index}`}
                                        fill={color[index % 3]}
                                        // height={30}
                                        // y={22 + index * 65} 
                                        onClick={() => { console.log("asd") }}
                                    >
                                    </Cell>
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
    height: 49px;
    background-color: black;
    opacity: 0.75;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: -5px;
    left: 110%;
    font-size: 14px;
    line-height: 18px;
  }
  
  & .tooltiptext::after {
    content: "";
    position: absolute;
    top: 50;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent black transparent transparent;
  }
//   &:hover .tooltiptext {
//     visibility: visible;
//   }
//#endregion

`
//#endregion
