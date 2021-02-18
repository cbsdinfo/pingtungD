import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, modalsService } from '../../../../../Components';
import { valid } from '../../../../../Handlers';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { busStop: { busStopEdit: { rwd: { tablet } } } } } = Theme;

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
                            titleText={"編輯巴士站牌"}
                            theme={tablet.titleBar}
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
                                        history.push("/BusRouteAndStop/BusStop")
                                        props.controllGCS("return")
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
                    theme={tablet.AddPageContainer}
                >

                    {/* 站牌設定 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"站牌設定"}
                        theme={tablet.busStopAddSubTitleBar}
                    >

                        {/*  儲存按鈕 (基本資料編輯 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 儲存按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                text={"儲存"}
                                theme={tablet.saveButton}
                                onClick={() => {
                                    //#region 表單驗證
                                    let validMsg = "";
                                    if (valid(globalContextService.get("BusStopEditPage", "CStopName") ?? "", ["^.{1,}$"], ["請輸入站牌名稱"])[1]) {
                                        validMsg = valid(globalContextService.get("BusStopEditPage", "CStopName") ?? "", ["^.{1,}$"], ["請輸入站牌名稱"])[1]
                                    }
                                    else if (valid(globalContextService.get("BusStopEditPage", "StopLongitude") ?? "", ["^[0-9]{0,}(.[0-9]+)?$"], ["站牌經度，限定輸入半形數字與 '.'"])[1]) {
                                        validMsg = valid(globalContextService.get("BusStopEditPage", "StopLongitude") ?? "", ["^[0-9]{0,}(.[0-9]+)?$"], ["站牌經度，限定輸入半形數字與 '.'"])[1]
                                    }
                                    else if (valid(globalContextService.get("BusStopEditPage", "StopLatitude") ?? "", ["^[0-9]{0,}(.[0-9]+)?$"], ["站牌緯度，限定輸入半形數字與 '.'"])[1]) {
                                        validMsg = valid(globalContextService.get("BusStopEditPage", "StopLatitude") ?? "", ["^[0-9]{0,}(.[0-9]+)?$"], ["站牌緯度，限定輸入半形數字與 '.'"])[1]
                                    }
                                    //#endregion

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
                                        props.UpdateStationExecute({
                                            id: props?.StationId,
                                            stationName: globalContextService.get("BusStopEditPage", "CStopName"),
                                            stationCode: globalContextService.get("BusStopEditPage", "EStopName"),
                                            lon: globalContextService.get("BusStopEditPage", "StopLongitude"),
                                            lat: globalContextService.get("BusStopEditPage", "StopLatitude")
                                        })
                                    }
                                    //#endregion
                                }}
                            />
                        </SubContainer>
                    </MainPageSubTitleBar>

                    {/* 基本資料表單區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.baseContainer}
                    >
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                        >
                            <FormRow>
                                {/* 站牌名稱 CStopName */}
                                <TextInput
                                    topLabel={<>站牌名稱<Text theme={tablet.cStopNameRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("BusStopEditPage", "CStopName") ?? props.StationInfo?.stationName}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusStopEditPage", "CStopName", value);
                                    }}
                                    theme={tablet.cStopName}
                                />
                                {/* 站牌名稱(英文) EStopName */}
                                <TextInput
                                    topLabel={<>站牌名稱(英文)</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("BusStopEditPage", "EStopName") ?? props.StationInfo?.stationCode}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusStopEditPage", "EStopName", value);
                                    }}
                                    theme={tablet.eStopName}
                                />
                                {/* 站牌經度 StopLongitude */}
                                <TextInput
                                    topLabel={<>站牌經度</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("BusStopEditPage", "StopLongitude") ?? props.StationInfo?.lon}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusStopEditPage", "StopLongitude", value);
                                    }}
                                    theme={tablet.stopLongitude}
                                />
                                {/* 站牌緯度 StopLatitude */}
                                <TextInput
                                    topLabel={<>站牌緯度</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("BusStopEditPage", "StopLatitude") ?? props.StationInfo?.lat}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusStopEditPage", "StopLatitude", value);
                                    }}
                                    theme={tablet.stopLatitude}
                                />
                            </FormRow>
                        </FormContainer>

                    </BasicContainer>


                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
`