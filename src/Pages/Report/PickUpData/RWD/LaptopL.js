import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal, CarAndDriverSettingCard, InfoCard, MainPageSubTitleBar } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal, RangeDateTimePicker } from '../../../../Components';
// import { ReactComponent as Search } from '../../../../Assets/img/CasePage/Search.svg'
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

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { pickUpData: { rwd: { laptopL } } } } = Theme;

    const [IdDescribe, setIdDescribe] = useState(globalContextService.get("PickUpDataPage", "IdDescribe") ?? false);
    const [Update, setUpdate] = useState(true) // ????????????

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* ????????? */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"????????????"}
                            theme={laptopL.titleBar}
                            onSubmit={(e) => {
                                console.log("???????????????????????????")
                                // props.GetSubOrgsExecute(true, "");
                            }
                            }
                        >
                            {/* ?????????????????? DateTimeRange  */}
                            <RangeDateTimePicker
                                topLabel={<></>}
                                // type={"time"} time???date???week???month???quarter???year
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
                                theme={laptopL.dateTimeRange}
                            />

                            {/* ?????????????????? ????????????????????? UserCaseType */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                //topLabel={<>????????????<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                //viewType
                                isSearchable
                                placeholder={"?????????????????????"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("PickUpDataPage", "UserCaseType") ?? null}
                                //value={globalContextService.get("PickUpDataPage", "UserCaseType") ?? [{ value: '1', label: '????????????' }]}
                                onChange={(e, value, onInitial) => {
                                    if (!isEqual(value, globalContextService.get("PickUpDataPage", "UserCaseType"))) {
                                        globalContextService.set("PickUpDataPage", "UserCaseType", value);
                                        setUpdate(u => !u);
                                    }
                                }}

                                options={[
                                    { value: '0', label: "?????????????????????", isDisabled: true },
                                    { value: '1', label: '????????????' },
                                    { value: '2', label: '????????????' },
                                    { value: '3', label: '??????????????????' },
                                    { value: '4', label: '?????????' },
                                    { value: '5', label: '????????????' },
                                    { value: '6', label: '????????????' },
                                    { value: '7', label: 'DRTS' }
                                ]}
                                theme={laptopL.userId}

                            />

                            {/* ?????????????????? ????????????????????? Unit */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                //topLabel={<>????????????<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                //viewType
                                isSearchable
                                placeholder={"?????????????????????"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("PickUpDataPage", "Unit") ?? null}
                                //value={globalContextService.get("PickUpDataPage", "Unit") ?? [{ value: '1', label: '????????????' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("PickUpDataPage", "Unit", value);
                                }}

                                options={[
                                    { value: '0', label: "?????????????????????", isDisabled: true },
                                    { value: '1', label: 'A??????' },
                                    { value: '2', label: 'B??????' },
                                ]}
                                theme={laptopL.unit}

                            />


                            {/* ????????????????????????????????? */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>

                                {/* ??????????????????????????? */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // ????????????
                                    theme={laptopL.exportButton}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        let rowData = {};

                                        //#region ???????????? Modal
                                        modalsService.titleModal.normal({
                                            //id: "top1",
                                            title: "?????????????????????",
                                            yes: true,
                                            yesText: "??????",
                                            no: true,
                                            noText: "??????",
                                            // autoClose: true,
                                            backgroundClose: false,
                                            noOnClick: (e) => {
                                                // props.controllGCS("addModalClose")
                                            },
                                            yesOnClick: (e, close) => {
                                                //#region ????????????
                                                // let validMsg = "";
                                                // if (valid(globalContextService.get("RoleManagerPage", "RoleName") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                                //     validMsg = valid(globalContextService.get("RoleManagerPage", "RoleName") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                                // }
                                                // else if (valid(isUndefined(globalContextService.get("RoleManagerPage", "Status")?.value) ? "" : "null???", ["^.{1,}$"], ["???????????????"])[1]) {
                                                //     validMsg = valid(isUndefined(globalContextService.get("RoleManagerPage", "Status")?.value) ? "" : "null???", ["^.{1,}$"], ["???????????????"])[1]
                                                // }
                                                //#region ?????????????????????
                                                // if (validMsg !== "") {
                                                //     console.log(validMsg, globalContextService.get("RoleManagerPage"))
                                                //     modalsService.infoModal.error({
                                                //         id: "top1", //?????? ?????????????????????id
                                                //         iconRightText: validMsg,
                                                //         yes: true,
                                                //         yesText: "??????",
                                                //         // no: true,
                                                //         // autoClose: true,
                                                //         backgroundClose: false,
                                                //         yesOnClick: (e, close) => {
                                                //             close();
                                                //         }
                                                //     })
                                                // }
                                                // else {
                                                //     props.RolesAddExecute({
                                                //         name: globalContextService.get("RoleManagerPage", "RoleName"),
                                                //         status: globalContextService.get("RoleManagerPage", "Status")?.value,
                                                //         organizationIds: "",
                                                //         organizations: ""
                                                //     })
                                                close();
                                                // }
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
                                                    theme={laptopL.exportContainer}
                                                >
                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                        {/* ??????????????????????????? ?????? - ???????????? ExportDateBetween  */}
                                                        <TextInput
                                                            topLabel={"????????????"}
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={"????????????"}
                                                            value={globalContextService.get("PickUpDataPage", "ExportDateBetween") ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("PickUpDataPage", "ExportDateBetween", value);
                                                            }}
                                                            theme={laptopL.exportDateBetween}
                                                        />
                                                        {/* ??????????????????????????? ?????????????????? ??????????????? ExportCarDealership*/}
                                                        <Selector
                                                            topLabel={"??????"}
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            //topLabel={<>????????????<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                                            //viewType
                                                            isSearchable
                                                            placeholder={"???????????????"}
                                                            // isMulti
                                                            // hideSelectedOptions={false}
                                                            // value={globalContextService.get("CarAndDriverSettingPage", "ExportCarDealership") ?? { value: '1', label: '??????A' }}
                                                            value={globalContextService.get("PickUpDataPage", "ExportCarDealership") ?? [{ value: '1', label: '??????B' }]}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("PickUpDataPage", "ExportCarDealership", value);
                                                            }}

                                                            options={[
                                                                { value: '0', label: "???????????????", isDisabled: true },
                                                                { value: '1', label: '??????A' },
                                                                { value: '2', label: '??????B' }
                                                            ]}
                                                            menuPosition={true}
                                                            theme={laptopL.exportCarDealership}

                                                        />
                                                        {/* ??????????????????????????? ?????????????????? ?????? ExportSex */}
                                                        <Selector
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            topLabel={"??????"}
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
                                                                { value: 'hint', label: "???????????????", isDisabled: true },
                                                                { value: '1', label: '???' },
                                                                { value: '0', label: '???' }
                                                            ]}
                                                            menuPosition={true}
                                                            theme={laptopL.exportSex}
                                                        />
                                                        {/* ??????????????????????????? ?????????????????? ?????????????????? ExportBoonType */}
                                                        <Selector
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            // topLabel={<>??????????????????<Text theme={laptopL.boonTypeRequired}>(??????)</Text></>}
                                                            topLabel={"??????????????????"}
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
                                                                { value: 'hint', label: "???????????????????????????", isDisabled: true },
                                                                { value: 0, label: '????????????' },
                                                                { value: 1, label: '???????????????' },
                                                                { value: 2, label: '?????????' }
                                                            ]}
                                                            menuPosition={true}
                                                            theme={laptopL.exportBoonType}

                                                        />
                                                    </FormRow>
                                                </FormContainer>
                                            ),
                                            theme: laptopL.exportModal
                                        })
                                        //#endregion
                                    }}
                                >
                                    ?????????????????????
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
                theme={laptopL.mainPageContainer}
            >
                {/* ????????????????????????????????? */}
                {globalContextService.get("PickUpDataPage", "UserCaseType")?.label !== "????????????" &&
                    <Container
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptopL.totalInfoCardOutContainer}
                    >
                        {/* ????????????????????? ?????? */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.totalInfoCardContainer}
                        >
                            {/* ????????????????????? */}
                            <InfoCard
                                centerText={"?????????"}
                                bottomText={"0"}
                                icon={<BarChartLine style={laptopL.totalInfoCardIcon} />}
                                theme={laptopL.totalInfoCard}
                            />
                        </SubContainer>

                        {/* ????????????????????? ?????? */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.doneInfoCardContainer}
                        >
                            {/* ????????????????????? */}
                            <InfoCard
                                centerText={"?????????"}
                                bottomText={"0"}
                                icon={<CheckCircle style={laptopL.doneInfoCardIcon} />}
                                theme={laptopL.doneInfoCard}
                            />
                        </SubContainer>

                        {/* ?????????????????? ?????? */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.emptyInfoCardContainer}
                        >
                            {/* ?????????????????? */}
                            <InfoCard
                                centerText={"??????"}
                                bottomText={"0"}
                                icon={<Loading3Quarters style={laptopL.emptyInfoCardIcon} />}
                                theme={laptopL.emptyInfoCard}
                            />
                        </SubContainer>

                        {/* ????????????????????? ?????? */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.noDoInfoCardContainer}
                        >
                            {/* ????????????????????? */}
                            <InfoCard
                                centerText={"?????????"}
                                bottomText={"0"}
                                icon={<InfoCircle style={laptopL.noDoInfoCardIcon} />}
                                theme={laptopL.noDoInfoCard}
                            />
                        </SubContainer>

                        {/* ????????????????????? ?????? */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.rateInfoCardContainer}
                        >
                            {/* ????????????????????? */}
                            <InfoCard
                                centerText={"?????????"}
                                bottomText={"0%"}
                                icon={<Star style={laptopL.rateInfoCardIcon} />}
                                theme={laptopL.rateInfoCard}
                            />
                        </SubContainer>

                    </Container>
                }

                {/* ?????????????????????????????? */}
                {globalContextService.get("PickUpDataPage", "UserCaseType")?.label === "????????????" &&
                    <Container
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptopL.caseTotalInfoCardOutContainer}
                    >
                        {/* ????????????????????? ?????? */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.caseTotalInfoCardContainer}
                        >
                            {/* ????????????????????? */}
                            <InfoCard
                                centerText={"?????????"}
                                bottomText={"0"}
                                icon={<BarChartLine style={laptopL.caseTotalInfoCardIcon} />}
                                theme={laptopL.caseTotalInfoCard}
                            />
                        </SubContainer>

                        {/* ????????????????????? (??????) ?????? */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.caseDoneInfoCardContainer}
                        >
                            {/* ????????????????????? (??????) */}
                            <InfoCard
                                centerText={"?????????(??????)"}
                                bottomText={"0"}
                                icon={<CheckCircle style={laptopL.caseDoneInfoCardIcon} />}
                                theme={laptopL.caseDoneInfoCard}
                            />
                        </SubContainer>

                        {/* ????????????????????? (?????????) ?????? */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.caseDoneInfoCardContainer}
                        >
                            {/* ????????????????????? (?????????) */}
                            <InfoCard
                                centerText={"?????????(?????????)"}
                                bottomText={"0"}
                                icon={<CheckCircle style={laptopL.caseDoneInfoCardIcon} />}
                                theme={laptopL.caseDoneInfoCard}
                            />
                        </SubContainer>

                        {/* ?????????????????? ?????? */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.caseEmptyInfoCardContainer}
                        >
                            {/* ?????????????????? */}
                            <InfoCard
                                centerText={"??????"}
                                bottomText={"0"}
                                icon={<Loading3Quarters style={laptopL.caseEmptyInfoCardIcon} />}
                                theme={laptopL.caseEmptyInfoCard}
                            />
                        </SubContainer>

                        {/* ????????????????????? ?????? */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.caseNoDoInfoCardContainer}
                        >
                            {/* ????????????????????? */}
                            <InfoCard
                                centerText={"?????????"}
                                bottomText={"0"}
                                icon={<InfoCircle style={laptopL.caseNoDoInfoCardIcon} />}
                                theme={laptopL.caseNoDoInfoCard}
                            />
                        </SubContainer>

                        {/* ????????????????????? ?????? */}
                        <SubContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.caseRateInfoCardContainer}
                        >
                            {/* ????????????????????? */}
                            <InfoCard
                                centerText={"?????????"}
                                bottomText={"0%"}
                                icon={<Star style={laptopL.caseRateInfoCardIcon} />}
                                theme={laptopL.caseRateInfoCard}
                            />
                        </SubContainer>

                    </Container>
                }

                {/* ????????????????????? */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptopL.pickUpDataContainer}
                >

                    {/* ????????????Chart???????????? */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.pickUpDataChartContainer}
                    >

                        {/* ????????????Chart */}
                        <PickUpDataLineChart />
                    </BasicContainer>
                </BasicContainer>

            </MainPageContainer>

        </>

    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`

`

//#region ???????????????????????? ??????????????????

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
                        {`????????? : ${payload?.[1]?.payload.finished}???`}
                        <br />
                        {`?????? : ${payload?.[1]?.payload.empty}???`}
                        <br />
                        {`????????? : ${payload?.[1]?.payload.noDo}???`}
                        <br />
                        {`????????? : ${payload?.[1]?.payload.total}???`}
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
                                {/* ????????? */}
                                <>
                                    {/* ??????????????? */}
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
                                    {/* ??????????????? */}
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
                                        ?????????
                                    </Text>
                                </>
                                {/* ?????? */}
                                <>
                                    {/* ???????????? */}
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
                                    {/* ???????????? */}
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
                                        ??????
                                    </Text>
                                </>
                                {/* ????????? */}
                                <>
                                    {/* ??????????????? */}
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
                                    {/* ??????????????? */}
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
                                        ?????????
                                    </Text>
                                </>
                                {/* ????????? */}
                                <>
                                    {/* ??????????????? */}
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
                                    {/* ??????????????? */}
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
                                        ?????????
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

