import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal, InfoCard } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal, RangeDateTimePicker } from '../../../../Components';
import { ReactComponent as Star } from '../../../../Assets/img/PickUpDataPage/Star.svg'
import { ReactComponent as EditPen } from '../../../../Assets/img/PickUpDataPage/EditPen.svg'
import { ReactComponent as BarChartLine } from '../../../../Assets/img/PickUpDataPage/BarChartLine.svg'
import { ReactComponent as InfoCircle } from '../../../../Assets/img/PickUpDataPage/InfoCircle.svg'
import { ReactComponent as Loading3Quarters } from '../../../../Assets/img/PickUpDataPage/Loading3Quarters.svg'
import { ReactComponent as CheckCircle } from '../../../../Assets/img/PickUpDataPage/CheckCircle.svg'
import { useHistory } from 'react-router-dom';
import { getParseItemLocalStorage, valid } from '../../../../Handlers/'
import Select from 'react-select'
import { treeSelectorTransducer } from '../../../../Components/Form/TreeSelector/TreeSelector';
import isUndefined from 'lodash/isUndefined';
import { isEqual } from 'lodash';
import { LineChart, Line, ResponsiveContainer, Cell, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, } from 'recharts';
import moment from 'moment';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { pickUpData: { rwd: { tablet } } } } = Theme;
    const [IdDescribe, setIdDescribe] = useState(globalContextService.get("PickUpDataPage", "IdDescribe") ?? false);
    const [Update, setUpdate] = useState(true) // 刷新組件

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"接送數據"}
                            theme={tablet.titleBar}
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
                                    (globalContextService.get("PickUpDataPage", "DateTimeRange") ?
                                        [moment(globalContextService.get("PickUpDataPage", "DateTimeRange")[0]), moment(globalContextService.get("PickUpDataPage", "DateTimeRange")[1])]
                                        :
                                        [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-06', "YYYY-MM-DD")]
                                    )
                                }
                                onChange={(value, momentObj) => {
                                    globalContextService.set("PickUpDataPage", "DateTimeRange", value);
                                }}
                                theme={tablet.dateTimeRange}
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
                                value={globalContextService.get("PickUpDataPage", "UserCaseType") ?? null}
                                //value={globalContextService.get("RevenuePage", "UserCaseType") ?? [{ value: '1', label: '長照個案' }]}
                                onChange={(e, value, onInitial) => {
                                    if (!isEqual(value, globalContextService.get("PickUpDataPage", "UserCaseType"))) {
                                        globalContextService.set("PickUpDataPage", "UserCaseType", value);
                                        setUpdate(u => !u);
                                    }
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
                                theme={tablet.userId}

                            />
                            {/* 匯出服務紀錄檔按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>

                                {/* 匯出服務紀錄檔按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.exportButton}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        let rowData = {};

                                        //#region 打開新增 Modal
                                        modalsService.titleModal.normal({
                                            //id: "top1",
                                            title: "匯出服務紀錄檔",
                                            yes: true,
                                            yesText: "確認",
                                            no: true,
                                            noText: "取消",
                                            // autoClose: true,
                                            backgroundClose: false,
                                            noOnClick: (e) => {
                                                // props.controllGCS("addModalClose")
                                            },
                                            yesOnClick: (e, close) => {
                                                close();
                                            },
                                            closeIconOnClick: (e) => {
                                                // props.controllGCS("addModalClose")
                                            },
                                            content: (
                                                <FormContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    theme={tablet.exportContainer}
                                                >
                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                        {/* 匯出服務紀錄檔彈窗 開始 - 結束日期 ExportDateBetween  */}
                                                        <TextInput
                                                            topLabel={"選擇日期"}
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={"暫時使用"}
                                                            value={globalContextService.get("PickUpDataPage", "ExportDateBetween") ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("PickUpDataPage", "ExportDateBetween", value);
                                                            }}
                                                            theme={tablet.exportDateBetween}
                                                        />
                                                        {/* 匯出服務紀錄檔彈窗 單選下拉選單 請選擇車行 ExportCarDealership*/}
                                                        <Selector
                                                            topLabel={"車行"}
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                                            //viewType
                                                            isSearchable
                                                            placeholder={"請選擇車行"}
                                                            // isMulti
                                                            // hideSelectedOptions={false}
                                                            // value={globalContextService.get("CarAndDriverSettingPage", "ExportCarDealership") ?? { value: '1', label: '車行A' }}
                                                            value={globalContextService.get("PickUpDataPage", "ExportCarDealership") ?? [{ value: '1', label: '車行B' }]}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("PickUpDataPage", "ExportCarDealership", value);
                                                            }}

                                                            options={[
                                                                { value: '0', label: "請選擇車行", isDisabled: true },
                                                                { value: '1', label: '車行A' },
                                                                { value: '2', label: '車行B' }
                                                            ]}
                                                            menuPosition={true}
                                                            theme={tablet.exportCarDealership}

                                                        />
                                                        {/* 匯出服務紀錄檔彈窗 單選下拉選單 性別 ExportSex */}
                                                        <Selector
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            topLabel={"性別"}
                                                            //viewType
                                                            isSearchable
                                                            placeholder={""}
                                                            // isMulti
                                                            // hideSelectedOptions={false}
                                                            value={globalContextService.get("PickUpDataPage", "ExportSex") ?? {}}
                                                            onChange={(e, value, onInitial) => {
                                                                // console.log(value)
                                                                globalContextService.set("PickUpDataPage", "ExportSex", value);
                                                            }}

                                                            options={[
                                                                { value: 'hint', label: "請選擇性別", isDisabled: true },
                                                                { value: '1', label: '男' },
                                                                { value: '0', label: '女' }
                                                            ]}
                                                            menuPosition={true}
                                                            theme={tablet.exportSex}
                                                        />
                                                        {/* 匯出服務紀錄檔彈窗 單選下拉選單 社會福利身份 ExportBoonType */}
                                                        <Selector
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            // topLabel={<>社會福利身份<Text theme={tablet.boonTypeRequired}>(必填)</Text></>}
                                                            topLabel={"社會福利身份"}
                                                            //viewType
                                                            isSearchable
                                                            placeholder={""}
                                                            // isMulti
                                                            // hideSelectedOptions={false}
                                                            value={globalContextService.get("PickUpDataPage", "ExportBoonType") ?? {}}
                                                            onChange={(e, value, onInitial) => {
                                                                // console.log(value)
                                                                globalContextService.set("PickUpDataPage", "ExportBoonType", value);
                                                            }}

                                                            options={[
                                                                { value: 'hint', label: "請選擇社會福利身份", isDisabled: true },
                                                                { value: 0, label: '低收入戶' },
                                                                { value: 1, label: '中低收入戶' },
                                                                { value: 2, label: '一般戶' }
                                                            ]}
                                                            menuPosition={true}
                                                            theme={tablet.exportBoonType}

                                                        />
                                                    </FormRow>
                                                </FormContainer>
                                            ),
                                            theme: tablet.exportModal
                                        })
                                        //#endregion
                                    }}
                                >
                                    匯出服務紀錄檔
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                        <BasicContainer
                            bascDefaultTheme={"DefaultTheme"}
                        >
                            {/* 單選下拉選單 請選擇服務單位 Unit */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                //viewType
                                isSearchable
                                placeholder={"請選擇服務單位"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("PickUpDataPage", "Unit") ?? null}
                                //value={globalContextService.get("RevenuePage", "Unit") ?? [{ value: '1', label: '長照個案' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("PickUpDataPage", "Unit", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇服務單位", isDisabled: true },
                                    { value: '1', label: 'A單位' },
                                    { value: '2', label: 'B單位' },
                                ]}
                                theme={tablet.unit}

                            />
                        </BasicContainer>
                    </>
                }
                theme={tablet.mainPageContainer}
            >

                {/* 非長照身份顯示卡片容器 */}
                {globalContextService.get("PickUpDataPage", "UserCaseType")?.label !== "長照個案" &&
                    <Container
                        baseDefaultTheme={"DefaultTheme"}
                        theme={tablet.totalInfoCardOutContainer}
                    >
                        {/* 總趟次資訊卡片 容器 */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={tablet.totalInfoCardContainer}
                        >
                            {/* 總趟次資訊卡片 */}
                            <InfoCard
                                centerText={"總趟次"}
                                bottomText={"0"}
                                icon={<BarChartLine style={tablet.totalInfoCardIcon} />}
                                theme={tablet.totalInfoCard}
                            />
                        </SubContainer>

                        {/* 已完成資訊卡片 容器 */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={tablet.doneInfoCardContainer}
                        >
                            {/* 已完成資訊卡片 */}
                            <InfoCard
                                centerText={"已完成"}
                                bottomText={"0"}
                                icon={<CheckCircle style={tablet.doneInfoCardIcon} />}
                                theme={tablet.doneInfoCard}
                            />
                        </SubContainer>

                        {/* 空趟資訊卡片 容器 */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={tablet.emptyInfoCardContainer}
                        >
                            {/* 空趟資訊卡片 */}
                            <InfoCard
                                centerText={"空趟"}
                                bottomText={"0"}
                                icon={<Loading3Quarters style={tablet.emptyInfoCardIcon} />}
                                theme={tablet.emptyInfoCard}
                            />
                        </SubContainer>

                        {/* 未執行資訊卡片 容器 */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={tablet.noDoInfoCardContainer}
                        >
                            {/* 未執行資訊卡片 */}
                            <InfoCard
                                centerText={"未執行"}
                                bottomText={"0"}
                                icon={<InfoCircle style={tablet.noDoInfoCardIcon} />}
                                theme={tablet.noDoInfoCard}
                            />
                        </SubContainer>

                        {/* 達成率資訊卡片 容器 */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={tablet.rateInfoCardContainer}
                        >
                            {/* 達成率資訊卡片 */}
                            <InfoCard
                                centerText={"達成率"}
                                bottomText={"0%"}
                                icon={<Star style={tablet.rateInfoCardIcon} />}
                                theme={tablet.rateInfoCard}
                            />
                        </SubContainer>

                    </Container>
                }

                {/* 長照身份顯示卡片容器 */}
                {globalContextService.get("PickUpDataPage", "UserCaseType")?.label === "長照個案" &&
                    <Container
                        baseDefaultTheme={"DefaultTheme"}
                        theme={tablet.caseTotalInfoCardOutContainer}
                    >
                        {/* 總趟次資訊卡片 容器 */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={tablet.caseTotalInfoCardContainer}
                        >
                            {/* 總趟次資訊卡片 */}
                            <InfoCard
                                centerText={"總趟次"}
                                bottomText={"0"}
                                icon={<BarChartLine style={tablet.caseTotalInfoCardIcon} />}
                                theme={tablet.caseTotalInfoCard}
                            />
                        </SubContainer>

                        {/* 已完成資訊卡片 (共乘) 容器 */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={tablet.caseDoneInfoCardContainer}
                        >
                            {/* 已完成資訊卡片 (共乘) */}
                            <InfoCard
                                centerText={"已完成(共乘)"}
                                bottomText={"0"}
                                icon={<CheckCircle style={tablet.caseDoneInfoCardIcon} />}
                                theme={tablet.caseDoneInfoCard}
                            />
                        </SubContainer>

                        {/* 已完成資訊卡片 (非共乘) 容器 */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={tablet.caseDoneInfoCardContainer}
                        >
                            {/* 已完成資訊卡片 (非共乘) */}
                            <InfoCard
                                centerText={"已完成(非共乘)"}
                                bottomText={"0"}
                                icon={<CheckCircle style={tablet.caseDoneInfoCardIcon} />}
                                theme={tablet.caseDoneInfoCard}
                            />
                        </SubContainer>

                        {/* 空趟資訊卡片 容器 */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={tablet.caseEmptyInfoCardContainer}
                        >
                            {/* 空趟資訊卡片 */}
                            <InfoCard
                                centerText={"空趟"}
                                bottomText={"0"}
                                icon={<Loading3Quarters style={tablet.caseEmptyInfoCardIcon} />}
                                theme={tablet.caseEmptyInfoCard}
                            />
                        </SubContainer>

                        {/* 未執行資訊卡片 容器 */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={tablet.caseNoDoInfoCardContainer}
                        >
                            {/* 未執行資訊卡片 */}
                            <InfoCard
                                centerText={"未執行"}
                                bottomText={"0"}
                                icon={<InfoCircle style={tablet.caseNoDoInfoCardIcon} />}
                                theme={tablet.caseNoDoInfoCard}
                            />
                        </SubContainer>

                        {/* 達成率資訊卡片 容器 */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={tablet.caseRateInfoCardContainer}
                        >
                            {/* 達成率資訊卡片 */}
                            <InfoCard
                                centerText={"達成率"}
                                bottomText={"0%"}
                                icon={<Star style={tablet.caseRateInfoCardIcon} />}
                                theme={tablet.caseRateInfoCard}
                            />
                        </SubContainer>

                    </Container>
                }

                {/* 接送數據區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={tablet.pickUpDataContainer}
                >

                    {/* 接送數據Chart區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.pickUpDataChartContainer}
                    >

                        {/* 接送數據Chart */}
                        <PickUpDataLineChart />
                    </BasicContainer>
                </BasicContainer>

            </MainPageContainer>

        </>

    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`
//#region 營收報表長條圖表 待包裝成組件

//#region Tooltip
const ToolTipContent = (props) => {

    const { payload, label, coordinate } = props;

    if (props?.active) {
        let motherArr = (props.data ?? []).map(i => i?.value).reduce((a, b) => a + b);

        return (
            <Text theme={{
                basic: () => ({
                    alignItems: "left",
                    width: `${84 + 8 * (payload?.[1]?.payload.total.toString().length)}px`,
                    height: "100px", position: "relative", left: "10px"
                })
            }}>

                < TooltipDiv width={`${84 + 8 * (payload?.[1]?.payload.total.toString().length)}px`}>
                    <span className={"tooltiptext"}>
                        {`${payload?.[1]?.payload.date}`}
                        <br />
                        {`已完成 : ${payload?.[1]?.payload.finished}次`}
                        <br />
                        {`空趟 : ${payload?.[1]?.payload.empty}次`}
                        <br />
                        {`未執行 : ${payload?.[1]?.payload.noDo}次`}
                        <br />
                        {`總趟次 : ${payload?.[1]?.payload.total}次`}
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

const PickUpDataLineChart = (props) => {

    const [ToolTipPosition, setToolTipPosition] = useState(false);
    const [BarIndex, setBarIndex] = useState(false);
    const data = [
        { date: '2020-11-01', finished: 1000, empty: 100, noDo: 200, total: 1300 },
        { date: '2020-11-02', finished: 900, empty: 200, noDo: 200, total: 1300 },
        { date: '2020-11-03', finished: 300, empty: 400, noDo: 200, total: 900 },
        { date: '2020-11-04', finished: 100, empty: 100, noDo: 400, total: 600 },
        { date: '2020-11-05', finished: 500, empty: 100, noDo: 200, total: 800 },
        { date: '2020-11-06', finished: 700, empty: 150, noDo: 200, total: 1050 },
        { date: '2020-11-07', finished: 1000, empty: 0, noDo: 200, total: 1200 },
        { date: '2020-11-08', finished: 900, empty: 100, noDo: 0, total: 1000 },
    ];

    return (
        <>
            <ResponsiveContainer width='100%' height="100%">
                <LineChart
                    // layout="vertical"

                    // width={500}
                    // height={300}
                    data={data}
                    margin={{
                        top: 5, right: 55, left: 20, bottom: 24,
                    }}
                >
                    <CartesianGrid vertical={false} horizontal stroke={"#F0F0F0"} /* verticalFill={['#555555', '#444444']} fillOpacity={0.2} strokeDasharray="3 3"*/ />
                    <XAxis axisLine={{ stroke: 'rgba(0, 0, 0, 0)' }} dataKey="date" type="category" /*tick={<CustomizedAxisTick />}*/ interval={0} />
                    <YAxis axisLine={{ stroke: 'rgba(0, 0, 0, 0)' }} type="number" tickCount={10} domain={[0, Math.max(...data.map((item) => (item?.total))) + 2000]} />
                    <ChartTooltip allowEscapeViewBox={{ x: true, y: false }} cursor={{ fill: 'rgba(0, 0, 0, 0)' }} isAnimationActive={false}
                        content={
                            <ToolTipContent BarIndex={BarIndex} data={data} />
                        } />
                    <Legend verticalAlign="top" align={"right"} height={36} content={(props) => {
                        return (
                            <Container
                                theme={{
                                    basic: (style, props) => ({
                                        ...style,
                                        justifyContent: "flex-end"
                                    })
                                }}
                            >
                                {/* 已完成 */}
                                <>
                                    {/* 已完成方塊 */}
                                    <BasicContainer
                                        theme={{
                                            basic: (style, props) => ({
                                                ...style,
                                                background: "#69c0ff",
                                                width: "24px",
                                                height: "24px",
                                                margin: "0 8px 0 0"
                                            })
                                        }}
                                    />
                                    {/* 已完成文字 */}
                                    <Text theme={{
                                        basic: (style, props) => ({
                                            ...style,
                                            fontSize: "14px",
                                            lineHeight: "22px",
                                            color: "rgba(0, 0, 0, 0.85)",
                                            textAlign: "right",
                                            fontWeight: "500",
                                            margin: "0 8px 0 0"
                                        })
                                    }}>
                                        已完成
                                    </Text>
                                </>
                                {/* 空趟 */}
                                <>
                                    {/* 空趟方塊 */}
                                    <BasicContainer
                                        theme={{
                                            basic: (style, props) => ({
                                                ...style,
                                                background: "#5cdbd3",
                                                width: "24px",
                                                height: "24px",
                                                margin: "0 8px 0 0"
                                            })
                                        }}
                                    />
                                    {/* 空趟文字 */}
                                    <Text theme={{
                                        basic: (style, props) => ({
                                            ...style,
                                            fontSize: "14px",
                                            lineHeight: "22px",
                                            color: "rgba(0, 0, 0, 0.85)",
                                            textAlign: "right",
                                            fontWeight: "500",
                                            margin: "0 8px 0 0"
                                        })
                                    }}>
                                        空趟
                                    </Text>
                                </>
                                {/* 未執行 */}
                                <>
                                    {/* 未執行方塊 */}
                                    <BasicContainer
                                        theme={{
                                            basic: (style, props) => ({
                                                ...style,
                                                background: "#ff7875",
                                                width: "24px",
                                                height: "24px",
                                                margin: "0 8px 0 0"
                                            })
                                        }}
                                    />
                                    {/* 未執行文字 */}
                                    <Text theme={{
                                        basic: (style, props) => ({
                                            ...style,
                                            fontSize: "14px",
                                            lineHeight: "22px",
                                            color: "rgba(0, 0, 0, 0.85)",
                                            textAlign: "right",
                                            fontWeight: "500",
                                            margin: "0 8px 0 0"
                                        })
                                    }}>
                                        未執行
                                    </Text>
                                </>
                                {/* 總趟次 */}
                                <>
                                    {/* 總趟次方塊 */}
                                    <BasicContainer
                                        theme={{
                                            basic: (style, props) => ({
                                                ...style,
                                                background: "#ffc069",
                                                width: "24px",
                                                height: "24px",
                                                margin: "0 8px 0 0"
                                            })
                                        }}
                                    />
                                    {/* 總趟次文字 */}
                                    <Text theme={{
                                        basic: (style, props) => ({
                                            ...style,
                                            fontSize: "14px",
                                            lineHeight: "22px",
                                            color: "rgba(0, 0, 0, 0.85)",
                                            textAlign: "right",
                                            fontWeight: "500",
                                            margin: "0 8px 0 0",
                                        })
                                    }}>
                                        總趟次
                                    </Text>
                                </>
                            </Container>
                        )
                    }} />
                    <Line dataKey="finished" fill="#69c0ff" stroke="#69c0ff"
                        onMouseEnter={(a, b, c) => { console.log(a, b, c) }}
                    >
                    </Line>
                    <Line dataKey="empty" fill="#5cdBd3" stroke="#5cdBd3">
                    </Line>
                    <Line dataKey="noDo" fill="#ff7875" stroke="#ff7875">
                    </Line>
                    <Line dataKey="total" fill="#ffc069" stroke="#ffc069">
                    </Line>
                </LineChart>
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
    height: 100px;
    background-color: black;
    opacity: 0.75;
    color: #fff;
    text-align: left;
    border-radius: 2px;
    padding: 5px 0 5px 4px;
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

