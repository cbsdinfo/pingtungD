import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../ProjectComponent';
import { BasicButton, BasicContainer, FormContainer, FormRow, globalContextService, SubContainer, Text,  TextInput } from '../../../../Components';

import { useHistory } from 'react-router-dom';

import isUndefined from 'lodash/isUndefined';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { fareSubsidyParam: { rwd: { laptop } } } } = Theme;


    let history = useHistory();

    return (
        <>
            <MainPageContainer
                theme={laptop.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"補助車資參數"}
                            theme={laptop.titleBar}
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
                    theme={laptop.fareSubsidyParamPageContainer}
                >
                    {/* 車資參數基本設定 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"車資參數基本設定"}
                        theme={laptop.fareParamSubTitleBar}
                    >
                        {/*  儲存按鈕 (車資參數基本設定 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 儲存按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                text={"儲存"}
                                theme={laptop.saveButton}
                                onClick={() => {

                                }}
                            />
                        </SubContainer>
                    </MainPageSubTitleBar>

                    {/* 車資參數基本設定表單區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.baseContainer}
                    >
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                        >
                            <FormRow>
                                {/* 起跳金額 StartAmount */}
                                <TextInput
                                    topLabel={<>起跳金額<Text theme={laptop.startAmountRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "StartAmount") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "StartAmount", value);
                                    }}
                                    theme={laptop.startAmount}
                                />
                                {/* 起跳公尺數 StartMeters */}
                                <TextInput
                                    topLabel={<>起跳公尺數<Text theme={laptop.startMetersRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "StartMeters") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "StartMeters", value);
                                    }}
                                    theme={laptop.startMeters}
                                />
                                {/* 續跳公尺數 ContinueJumpMeters */}
                                <TextInput
                                    topLabel={<>續跳公尺數<Text theme={laptop.continueJumpMetersRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "ContinueJumpMeters") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "ContinueJumpMeters", value);
                                    }}
                                    theme={laptop.continueJumpMeters}
                                />
                                {/* 續跳金額 ContinueJumpAmount */}
                                <TextInput
                                    topLabel={<>續跳金額<Text theme={laptop.continueJumpAmountRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "ContinueJumpAmount") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "ContinueJumpAmount", value);
                                    }}
                                    theme={laptop.continueJumpAmount}
                                />
                                {/* 國道通行費 NationalHighwayToll */}
                                <TextInput
                                    topLabel={<>國道通行費<Text theme={laptop.nationalHighwayTollRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "NationalHighwayToll") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "NationalHighwayToll", value);
                                    }}
                                    theme={laptop.nationalHighwayToll}
                                />
                                {/* 夜間加成 NightBonus */}
                                <TextInput
                                    topLabel={<>夜間加成<Text theme={laptop.nightBonusRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "NightBonus") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "NightBonus", value);
                                    }}
                                    theme={laptop.nightBonus}
                                />
                                {/* 服務費 ServiceCharge */}
                                <TextInput
                                    topLabel={<>服務費<Text theme={laptop.serviceChargeRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "ServiceCharge") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "ServiceCharge", value);
                                    }}
                                    theme={laptop.serviceCharge}
                                />
                            </FormRow>

                        </FormContainer>
                    </BasicContainer>
                    {/* 自負額比例收費倍率 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"自負額比例收費倍率"}
                        theme={laptop.dedPropChargeRateSubTitleBar}
                    />
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                        >
                            <FormRow>
                                {/* 平地一般戶 GroundGeneralHousehold */}
                                <TextInput
                                    topLabel={<>平地一般戶<Text theme={laptop.groundGeneralHouseholdRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "GroundGeneralHousehold") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "GroundGeneralHousehold", value);
                                    }}
                                    theme={laptop.groundGeneralHousehold}
                                />
                                {/* 平地中低收 GroundMiddleIncomeHousehold */}
                                <TextInput
                                    topLabel={<>平地中低收<Text theme={laptop.groundMiddleIncomeHouseholdRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "GroundMiddleIncomeHousehold") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "GroundMiddleIncomeHousehold", value);
                                    }}
                                    theme={laptop.groundMiddleIncomeHousehold}
                                />
                                {/* 平地低收 GroundLowIncomeHousehold */}
                                <TextInput
                                    topLabel={<>平地低收<Text theme={laptop.groundLowIncomeHouseholdRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "GroundLowIncomeHousehold") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "GroundLowIncomeHousehold", value);
                                    }}
                                    theme={laptop.groundLowIncomeHousehold}
                                />
                                {/* 偏區一般戶 PartialAreaGeneralHousehold */}
                                <TextInput
                                    topLabel={<>偏區一般戶<Text theme={laptop.partialAreaGeneralHouseholdRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "PartialAreaGeneralHousehold") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "PartialAreaGeneralHousehold", value);
                                    }}
                                    theme={laptop.partialAreaGeneralHousehold}
                                />
                                {/* 偏區中低收 PartialAreaMiddleIncomeHousehold */}
                                <TextInput
                                    topLabel={<>偏區中低收<Text theme={laptop.partialAreaMiddleIncomeHouseholdRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "PartialAreaMiddleIncomeHousehold") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "PartialAreaMiddleIncomeHousehold", value);
                                    }}
                                    theme={laptop.partialAreaMiddleIncomeHousehold}
                                />
                                {/* 偏區低收 PartialAreaLowIncomeHousehold */}
                                <TextInput
                                    topLabel={<>偏區低收<Text theme={laptop.partialAreaLowIncomeHouseholdRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("FareSubsidyParamPage", "PartialAreaLowIncomeHousehold") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("FareSubsidyParamPage", "PartialAreaLowIncomeHousehold", value);
                                    }}
                                    theme={laptop.partialAreaLowIncomeHousehold}
                                />
                            </FormRow>

                        </FormContainer>
                </BasicContainer>

            </MainPageContainer>

        </>

    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`

