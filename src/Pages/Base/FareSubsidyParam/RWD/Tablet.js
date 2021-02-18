import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../ProjectComponent';
import { BasicButton, BasicContainer, FormContainer, FormRow, globalContextService, SubContainer, Text,  TextInput } from '../../../../Components';
import { useHistory } from 'react-router-dom';

import isUndefined from 'lodash/isUndefined';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { fareSubsidyParam: { rwd: { tablet } } } } = Theme;
   
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
                            titleText={"補助車資參數"}
                            theme={tablet.titleBar}
                            onSubmit={(e) => {
                                console.log("目前不支援搜尋功能")
                                // props.GetSubOrgsExecute(true, "");
                            }}
                        >

                        </MainPageTitleBar>

                    </>
                }
            >
                {/* 補助車資參數頁面表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={tablet.fareSubsidyParamPageContainer}
                >
                    {/* 車資參數基本設定 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"車資參數基本設定"}
                        theme={tablet.fareParamSubTitleBar}
                    >
                        {/*  儲存按鈕 (車資參數基本設定 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 儲存按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                text={"儲存"}
                                theme={tablet.saveButton}
                                onClick={() => {

                                }}
                            />
                        </SubContainer>
                    </MainPageSubTitleBar>

                    {/* 車資參數基本設定表單區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.baseContainer}
                    >
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                        >
                            <FormRow>
                                {/* 起跳金額 StartAmount */}
                                <TextInput
                                    topLabel={<>起跳金額<Text theme={tablet.startAmountRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "StartAmount") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "StartAmount", value);
                                    }}
                                    theme={tablet.startAmount}
                                />
                                {/* 起跳公尺數 StartMeters */}
                                <TextInput
                                    topLabel={<>起跳公尺數<Text theme={tablet.startMetersRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "StartMeters") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "StartMeters", value);
                                    }}
                                    theme={tablet.startMeters}
                                />
                                {/* 續跳公尺數 ContinueJumpMeters */}
                                <TextInput
                                    topLabel={<>續跳公尺數<Text theme={tablet.continueJumpMetersRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "ContinueJumpMeters") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "ContinueJumpMeters", value);
                                    }}
                                    theme={tablet.continueJumpMeters}
                                />
                                {/* 續跳金額 ContinueJumpAmount */}
                                <TextInput
                                    topLabel={<>續跳金額<Text theme={tablet.continueJumpAmountRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "ContinueJumpAmount") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "ContinueJumpAmount", value);
                                    }}
                                    theme={tablet.continueJumpAmount}
                                />
                                {/* 國道通行費 NationalHighwayToll */}
                                <TextInput
                                    topLabel={<>國道通行費<Text theme={tablet.nationalHighwayTollRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "NationalHighwayToll") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "NationalHighwayToll", value);
                                    }}
                                    theme={tablet.nationalHighwayToll}
                                />
                                {/* 夜間加成 NightBonus */}
                                <TextInput
                                    topLabel={<>夜間加成<Text theme={tablet.nightBonusRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "NightBonus") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "NightBonus", value);
                                    }}
                                    theme={tablet.nightBonus}
                                />
                                {/* 服務費 ServiceCharge */}
                                <TextInput
                                    topLabel={<>服務費<Text theme={tablet.serviceChargeRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "ServiceCharge") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "ServiceCharge", value);
                                    }}
                                    theme={tablet.serviceCharge}
                                />
                            </FormRow>

                        </FormContainer>
                    </BasicContainer>
                    {/* 自負額比例收費倍率 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"自負額比例收費倍率"}
                        theme={tablet.dedPropChargeRateSubTitleBar}
                    />
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                        >
                            <FormRow>
                                {/* 平地一般戶 GroundGeneralHousehold */}
                                <TextInput
                                    topLabel={<>平地一般戶<Text theme={tablet.groundGeneralHouseholdRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "GroundGeneralHousehold") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "GroundGeneralHousehold", value);
                                    }}
                                    theme={tablet.groundGeneralHousehold}
                                />
                                {/* 平地中低收 GroundMiddleIncomeHousehold */}
                                <TextInput
                                    topLabel={<>平地中低收<Text theme={tablet.groundMiddleIncomeHouseholdRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "GroundMiddleIncomeHousehold") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "GroundMiddleIncomeHousehold", value);
                                    }}
                                    theme={tablet.groundMiddleIncomeHousehold}
                                />
                                {/* 平地低收 GroundLowIncomeHousehold */}
                                <TextInput
                                    topLabel={<>平地低收<Text theme={tablet.groundLowIncomeHouseholdRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "GroundLowIncomeHousehold") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "GroundLowIncomeHousehold", value);
                                    }}
                                    theme={tablet.groundLowIncomeHousehold}
                                />
                                {/* 偏區一般戶 PartialAreaGeneralHousehold */}
                                <TextInput
                                    topLabel={<>偏區一般戶<Text theme={tablet.partialAreaGeneralHouseholdRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "PartialAreaGeneralHousehold") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "PartialAreaGeneralHousehold", value);
                                    }}
                                    theme={tablet.partialAreaGeneralHousehold}
                                />
                                {/* 偏區中低收 PartialAreaMiddleIncomeHousehold */}
                                <TextInput
                                    topLabel={<>偏區中低收<Text theme={tablet.partialAreaMiddleIncomeHouseholdRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "PartialAreaMiddleIncomeHousehold") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "PartialAreaMiddleIncomeHousehold", value);
                                    }}
                                    theme={tablet.partialAreaMiddleIncomeHousehold}
                                />
                                {/* 偏區低收 PartialAreaLowIncomeHousehold */}
                                <TextInput
                                    topLabel={<>偏區低收<Text theme={tablet.partialAreaLowIncomeHouseholdRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "PartialAreaLowIncomeHousehold") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "PartialAreaLowIncomeHousehold", value);
                                    }}
                                    theme={tablet.partialAreaLowIncomeHousehold}
                                />
                            </FormRow>

                        </FormContainer>
                </BasicContainer>

            </MainPageContainer>

        </>

    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`
