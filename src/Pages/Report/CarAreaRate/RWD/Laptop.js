import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal, CarAndDriverSettingCard, MainPageSubTitleBar } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal, RangeDateTimePicker } from '../../../../Components';
// import { ReactComponent as Search } from '../../../../Assets/img/CasePage/Search.svg'
import { useHistory } from 'react-router-dom';
import { getParseItemLocalStorage, valid } from '../../../../Handlers/'
import Select from 'react-select'
import { treeSelectorTransducer } from '../../../../Components/Form/TreeSelector/TreeSelector';
import isUndefined from 'lodash/isUndefined';
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, } from 'recharts';
import moment from 'moment';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { carAreaRate: { rwd: { laptop } } } } = Theme;

    const [IdDescribe, setIdDescribe] = useState(globalContextService.get("CarAreaRatePage", "IdDescribe") ?? false);

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"車輛使用區域比例"}
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
                                    (globalContextService.get("CarAreaRatePage", "DateTimeRange") ?
                                        [moment(globalContextService.get("CarAreaRatePage", "DateTimeRange")[0]), moment(globalContextService.get("CarAreaRatePage", "DateTimeRange")[1])]
                                        :
                                        [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-06', "YYYY-MM-DD")]
                                    )
                                }
                                onChange={(value, momentObj) => {
                                    globalContextService.set("CarAreaRatePage", "DateTimeRange", value);
                                }}
                                theme={laptop.dateTimeRange}
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
                                value={globalContextService.get("CarAreaRatePage", "UserIdentity") ?? [{ value: '0', label: '請選擇用戶身分' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CarAreaRatePage", "UserIdentity", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇用戶身分", isDisabled: true },
                                    { value: '1', label: 'XXX' },
                                    { value: '2', label: 'XXXX' }
                                ]}
                                theme={laptop.userIdentity}

                            />

                            {/* 系統操作問題單按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 匯出報表按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptop.exportButton}
                                // onClick={() => { history.push("/Case/Add") }}
                                >
                                    匯出檔案
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                        <BasicContainer
                            baseDefaultTheme={"DefaultTheme"}>

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
                                value={globalContextService.get("CarAreaRatePage", "ServiceUnits") ?? [{ value: '0', label: '請選擇服務單位' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CarAreaRatePage", "ServiceUnits", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇服務單位", isDisabled: true },
                                    { value: '1', label: 'AAAA' },
                                    { value: '2', label: 'BBBBB' }
                                ]}
                                theme={laptop.serviceUnits}

                            />
                        </BasicContainer>
                    </>
                }
                theme={laptop.mainPageContainer}
            >
                {/* 出發區域比例區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptop.orderRecordContainer}
                >

                    {/* 出發區域比例 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"出發區域比例"}
                        theme={laptop.orderRecordSubTitleBar}
                    >
                        {/* 出發區域比例日期區間 (基本資料 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>

                        </SubContainer>
                    </MainPageSubTitleBar>

                    {/* 出發區域比例Chart區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.orderRecordTableContainer}
                    >

                        {/* 出發區域比例Chart */}
                        <RevenueBarChart />
                    </BasicContainer>
                </BasicContainer>

                 {/* 返回區域比例區容器 */}
                 <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptop.returnRateContainer}
                >

                    {/* 返回區域比例 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"返回區域比例"}
                        theme={laptop.returnRateSubTitleBar}
                    >
                        {/* 返回區域比例日期區間 (基本資料 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>

                        </SubContainer>
                    </MainPageSubTitleBar>

                    {/* 返回區域比例Chart區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.returnRateTableContainer}
                    >

                        {/* 返回區域比例Chart */}
                        <RevenueBarChart />
                    </BasicContainer>
                </BasicContainer>
            </MainPageContainer>

        </>

    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
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
    top: 50%;
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

