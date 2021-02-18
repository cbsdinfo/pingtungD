import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, NumberInput, Checkbox, CheckboxItem, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, SubContainer, TextInput, modalsService, Transfer } from '../../../../../Components';
import { StopDragSort } from '../../../../../ProjectComponent/StopDragSort/StopDragSort';
import { isEqual, isNil } from 'lodash';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { busRoute: { busRouteEdit: { rwd: { tablet } } } } } = Theme;

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                theme={tablet.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"編輯巴士路線"}
                            theme={tablet.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/*  回列表按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 回列表按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.returnButton}
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

                {/* 編輯頁面表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={tablet.AddPageContainer}
                >

                    {/* 路線設定 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"路線設定"}
                        theme={tablet.setRouteSubTitleBar}
                    >

                        {/*  儲存按鈕 (路線設定 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 儲存按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                text={"儲存"}
                                theme={tablet.saveButton}
                                onClick={() => {
                                    //#region 表單驗證
                                    let validMsg = "";
                                    //#region 表單驗證後動作
                                    if (validMsg !== "") {
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
                                        props.UpdateRouteExecute({
                                            id: props.RouteId,
                                            name: globalContextService.get("BusRouteEditPage", "ChRouteName"), // 路線名稱對應 id
                                            lineCode: globalContextService.get("BusRouteEditPage", "EnRouteName"), // 英文路線名稱對應 id
                                            sort: globalContextService.get("BusRouteEditPage", "Sort"), // 排序
                                            workWeek: globalContextService.get("BusRouteEditPage", "WorkDate")?.toString(), // 行駛日
                                            assignLineStations: globalContextService.get("BusRouteEditPage", "SortStops")?.map((stop) => (stop?.id)) ?? [], // 拖曳排序組件
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
                        theme={tablet.baseContainer}
                    >

                        {/* 路線設定容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={tablet.baseFormContainer}
                        >
                            <FormRow>

                                {/* 路線名稱 ChRouteName */}
                                <TextInput
                                    topLabel={"路線名稱"}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("BusRouteEditPage", "ChRouteName") ?? props.RouteInfo?.name}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusRouteEditPage", "ChRouteName", value);
                                    }}
                                    theme={tablet.chRouteName}
                                />

                                {/* 路線名稱(英文) EnRouteName */}
                                <TextInput
                                    topLabel={"路線名稱(英文)"}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("BusRouteEditPage", "EnRouteName") ?? props.RouteInfo?.lineCode}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusRouteEditPage", "EnRouteName", value);
                                    }}
                                    theme={tablet.enRouteName}
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
                                    value={globalContextService.get("BusRouteEditPage", "Sort") ?? props.RouteInfo?.sort}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusRouteEditPage", "Sort", value);
                                    }}
                                    theme={tablet.sort}
                                />

                                {/* 行駛日 WorkDate */}
                                <Checkbox
                                    // viewType
                                    checked={globalContextService.get("BusRouteEditPage", "WorkDate") ?? (props.RouteInfo?.workWeek)?.split(',')}
                                    // disable
                                    topLabel={"行駛日"}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusRouteEditPage", "WorkDate", value);
                                    }}
                                    theme={tablet.workDate}
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
                        theme={tablet.setStationSubTitleBar}
                    />

                    {/* 站牌設定表單區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.transferContainer}
                    >
                        {/* 站牌設定穿梭框 */}
                        <Transfer
                            data={props?.AllStops}
                            rightKeys={globalContextService.get("BusRouteEditPage", "SelectStops") ?? props.RouteInfo?.assignLineStations} // 於編輯時可使用指定，已經選擇站牌
                            onChange={(allRIghtKeys, way, thisTimeKey) => {
                                if (!isEqual(allRIghtKeys, globalContextService.get("BusRouteEditPage", "SelectStops"))) {
                                    props.setSort(props?.AllStops.filter(s => (allRIghtKeys ?? []).includes(s?.id)))
                                }
                                globalContextService.set("BusRouteEditPage", "SelectStops", allRIghtKeys); // 將所選站牌儲存
                            }}
                        />
                    </BasicContainer>

                    {/* 站牌排序設定 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"站牌排序設定"}
                        theme={tablet.setStationSortSubTitleBar}
                    />

                    {/* 站牌排序設定區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.setStationSortContainer}
                    >
                        <StopDragSort
                            stops={
                                isNil(globalContextService.get("BusRouteEditPage", "SortStops"))
                                    ?
                                    (props.RouteInfo?.assignLineStations ?? []).map((sortStopId) => ({ ...(props?.AllStops.filter((stop) => (stop?.id === sortStopId))[0]) }))
                                    :
                                    //判斷 若 穿梭框 右方的key 是否 包含全部 在拖曳排序內的 key
                                    (
                                        (
                                            (globalContextService.get("BusRouteEditPage", "SelectStops") ?? []).containAll(globalContextService.get("BusRouteEditPage", "SortStops").map(s => s?.id))
                                            &&
                                            (globalContextService.get("BusRouteEditPage", "SelectStops") ?? []).length === globalContextService.get("BusRouteEditPage", "SortStops").length
                                        )
                                            ?
                                            // 全部包含，也就是沒變
                                            globalContextService.get("BusRouteEditPage", "SortStops")
                                            :
                                            // 沒有全部包含，也就是變了
                                            (globalContextService.get("BusRouteEditPage", "SelectStops") ?? []).map((sortStopId) => ({ ...(props?.AllStops.filter((stop) => (stop?.id === sortStopId))[0]) }))
                                    )
                            }
                            onChange={(nowSort) => { globalContextService.set("BusRouteEditPage", "SortStops", nowSort); }}
                        />
                    </BasicContainer>
                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`