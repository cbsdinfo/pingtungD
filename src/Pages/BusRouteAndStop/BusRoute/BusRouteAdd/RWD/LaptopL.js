import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, Transfer, modalsService } from '../../../../../Components';
import { StopDragSort } from '../../../../../ProjectComponent/StopDragSort/StopDragSort';
import { isEqual, isNil } from 'lodash';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { busRoute: { busRouteAdd: { rwd: { laptopL } } } } } = Theme;

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"新增巴士路線"}
                            theme={laptopL.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/*  回列表按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 回列表按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.returnButton}
                                    onClick={() => {
                                        props.controllGCS("return")
                                        history.push("/BusRouteAndStop/BusRoute")
                                    }}
                                >
                                    回列表
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
            >

                {/* 新增頁面表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptopL.AddPageContainer}
                >

                    {/* 路線設定 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"路線設定"}
                        theme={laptopL.setRouteSubTitleBar}
                    >

                        {/*  儲存按鈕 (路線設定 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 儲存按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                text={"儲存"}
                                theme={laptopL.saveButton}
                                onClick={() => {
                                    //#region 表單驗證
                                    let validMsg = "";
                                    //#region 表單驗證後動作
                                    if (validMsg !== "") {
                                        // console.log(validMsg, globalContextService.get("BusAddPage"))
                                        modalsService.infoModal.error({
                                            id: "top1", //注意 這裡要加上固定id
                                            iconRightText: validMsg,
                                            yes: true,
                                            yesText: "確認",
                                            // no: true,
                                            // autoClose: true,
                                            backgroundClose: false,
                                            yesOnClick: (e, close) => {
                                                close();
                                            }
                                        })
                                    }
                                    else {
                                        props.AddBusRouteExecute({
                                            // // id 新增不須上送此欄位
                                            name: globalContextService.get("BusRouteAddPage", "ChRouteName"), // 路線名稱對應 id
                                            lineCode: globalContextService.get("BusRouteAddPage", "EnRouteName"), // 英文路線名稱對應 id
                                            sort: globalContextService.get("BusRouteAddPage", "Sort"), // 排序
                                            workWeek: globalContextService.get("BusRouteAddPage", "WorkDate")?.toString(), // 行駛日
                                            assignLineStations: globalContextService.get("BusRouteAddPage", "SortStops")?.map((stop) => (stop?.id)) ?? [], // 拖曳排序組件
                                        })
                                    }
                                    //#endregion
                                }}
                            />
                        </SubContainer>
                    </MainPageSubTitleBar>

                    {/* 路線設定表單區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.baseContainer}
                    >

                        {/* 路線設定容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptopL.baseFormContainer}
                        >
                            <FormRow>

                                {/* 路線名稱 ChRouteName */}
                                <TextInput
                                    topLabel={"路線名稱"}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("BusRouteAddPage", "ChRouteName") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusRouteAddPage", "ChRouteName", value);
                                    }}
                                    theme={laptopL.chRouteName}
                                />

                                {/* 路線名稱(英文) EnRouteName */}
                                <TextInput
                                    topLabel={"路線名稱(英文)"}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("BusRouteAddPage", "EnRouteName") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusRouteAddPage", "EnRouteName", value);
                                    }}
                                    theme={laptopL.enRouteName}
                                />

                                {/* 排序 Sort */}
                                <NumberInput
                                    // viewType
                                    // disable
                                    topLabel={"排序"}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    min={0}
                                    value={globalContextService.get("BusRouteAddPage", "Sort") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusRouteAddPage", "Sort", value);
                                    }}
                                    theme={laptopL.sort}
                                />

                                {/* 行駛日 WorkDate */}
                                <Checkbox
                                    // viewType
                                    checked={globalContextService.get("BusRouteAddPage", "WorkDate")}
                                    // disable
                                    topLabel={"行駛日"}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusRouteAddPage", "WorkDate", value);
                                        console.log(globalContextService.get("BusRouteAddPage", "WorkDate"))
                                    }}
                                    theme={laptopL.workDate}
                                >
                                    {/* 行駛日 WorkDate  選項 */}
                                    <CheckboxItem value={"1"} >星期一</CheckboxItem>
                                    <CheckboxItem value={"2"} >星期二</CheckboxItem>
                                    <CheckboxItem value={"3"} >星期三</CheckboxItem>
                                    <CheckboxItem value={"4"} >星期四</CheckboxItem>
                                    <CheckboxItem value={"5"} >星期五</CheckboxItem>
                                    <CheckboxItem value={"6"} >星期六</CheckboxItem>
                                    <CheckboxItem value={"7"} >星期日</CheckboxItem>
                                </Checkbox>
                            </FormRow>
                        </FormContainer>

                    </BasicContainer>

                    {/* 站牌設定 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"站牌設定"}
                        theme={laptopL.setStationSubTitleBar}
                    />

                    {/* 站牌設定表單區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.transferContainer}
                    >
                        {/* 站牌設定穿梭框 */}
                        <Transfer
                            data={props?.AllStops}
                            rightKeys={globalContextService.get("BusRouteAddPage", "SelectStops") ?? []} // 於編輯時可使用指定，已經選擇站牌
                            onChange={(allRIghtKeys, way, thisTimeKey) => {
                                if (!isEqual(allRIghtKeys, globalContextService.get("BusRouteAddPage", "SelectStops"))) {
                                    props.setSort(props?.AllStops.filter(s => (allRIghtKeys ?? []).includes(s?.id)))
                                }
                                globalContextService.set("BusRouteAddPage", "SelectStops", allRIghtKeys); // 將所選站牌儲存
                            }}
                        />
                    </BasicContainer>

                    {/* 站牌排序設定 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"站牌排序設定"}
                        theme={laptopL.setStationSortSubTitleBar}
                    />

                    {/* 站牌排序設定區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.setStationSortContainer}
                    >
                        <StopDragSort
                            stops={
                                isNil(globalContextService.get("BusRouteAddPage", "SortStops"))
                                    ?
                                    (globalContextService.get("BusRouteAddPage", "SelectStops") ?? []).map((sortStopId) => ({ ...(props?.AllStops.filter((stop) => (stop?.id === sortStopId))[0]) }))
                                    :
                                    //判斷 若 穿梭框 右方的key 是否 包含全部 在拖曳排序內的 key
                                    (
                                        (
                                            (globalContextService.get("BusRouteAddPage", "SelectStops") ?? []).containAll(globalContextService.get("BusRouteAddPage", "SortStops").map(s => s?.id))
                                            &&
                                            (globalContextService.get("BusRouteAddPage", "SelectStops") ?? []).length === globalContextService.get("BusRouteAddPage", "SortStops").length
                                        )
                                            ?
                                            // 全部包含，也就是沒變
                                            globalContextService.get("BusRouteAddPage", "SortStops")
                                            :
                                            // 沒有全部包含，也就是變了
                                            (globalContextService.get("BusRouteAddPage", "SelectStops") ?? []).map((sortStopId) => ({ ...(props?.AllStops.filter((stop) => (stop?.id === sortStopId))[0]) }))
                                    )
                            }
                            onChange={(nowSort) => {
                                globalContextService.set("BusRouteAddPage", "SortStops", nowSort);
                            }}
                        />
                    </BasicContainer>
                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`