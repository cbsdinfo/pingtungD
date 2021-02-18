import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../../Store/Store'
import { InfoCard, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Star } from '../../../../../Assets/img/DriversPage/Star.svg'
import { ReactComponent as EditPen } from '../../../../../Assets/img/DriversPage/EditPen.svg'
import { ReactComponent as BarChartLine } from '../../../../../Assets/img/DriversPage/BarChartLine.svg'
import { ReactComponent as InfoCircle } from '../../../../../Assets/img/DriversPage/InfoCircle.svg'
import { ReactComponent as Loading3Quarters } from '../../../../../Assets/img/DriversPage/Loading3Quarters.svg'
import { ReactComponent as CheckCircle } from '../../../../../Assets/img/DriversPage/CheckCircle.svg'
import moment from 'moment';
import { BasicButton, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Container, modalsService, ScrollBar } from '../../../../../Components';
import { isNil } from 'lodash';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { drivers: { driversInformation: { rwd: { tablet } } } } } = Theme;

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
                            titleText={"司機詳細基本資料"}
                            theme={tablet.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/*  列印按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 列印按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.printButton}
                                    onClick={() => { }}
                                >
                                    列印
                                </NativeLineButton>
                            </SubContainer>

                            {/*  回列表按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 回列表按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.returnButton}
                                    onClick={() => {
                                        props.controllGCS("return");
                                        history.push("/DriverAndCar/Drivers")
                                    }}
                                >
                                    回列表
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
            >

                {/* 頁面 基本資料、備註 表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={tablet.BaseAndNoteContainer}
                >

                    {/* 基本資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"基本資料"}
                        theme={tablet.driverBaseSubTitleBar}
                    >

                        {/*  查看打卡記錄、編輯司機資料 按鈕 (基本資料 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 查看打卡記錄按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                text={"查看打卡記錄"}
                                theme={tablet.clockInButton}
                                onClick={() => {
                                    //#region 查看打卡記錄彈窗
                                    modalsService.titleModal.normal({
                                        //id: "top1",
                                        title: "打卡記錄",
                                        // yes: false,
                                        // yesText: "確認",
                                        // no: false,
                                        // noText: "取消",
                                        // autoClose: true,
                                        backgroundClose: false,
                                        closeIconOnClick: (e) => { },
                                        content: (
                                            <>
                                                {/* 打卡記錄彈窗 Content ScrollBar */}
                                                <ScrollBar
                                                    basedefaulttheme={"DefaultTheme"}
                                                    theme={tablet.clockInModalContentScrollBar}
                                                >
                                                    {/* 打卡記錄彈窗 ScrollBar 下容器 */}
                                                    <BasicContainer
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={tablet.clockInModalMainContent}
                                                    >
                                                        <OldList
                                                            checkbox={false}
                                                            checkedRowKeyName={"id"}
                                                            columnsAttr={
                                                                //#region 資料欄設定
                                                                [
                                                                    {
                                                                        title: '日期',
                                                                        width: "522px",
                                                                        dataIndex: 'workDate',
                                                                        // sorter: (a, b) => a.workDate.length - b.workDate.length,
                                                                    },
                                                                    {
                                                                        title: "上班時間",
                                                                        width: "522px",
                                                                        dataIndex: 'workStartTime',
                                                                        // sorter: (a, b) => a.workStartTime.length - b.workStartTime.length,
                                                                    },
                                                                    {
                                                                        title: "下班時間",
                                                                        width: "522px",
                                                                        dataIndex: 'workEndTime',
                                                                        // sorter: (a, b) => a.workEndTime.length - b.workEndTime.length,
                                                                    }
                                                                ]
                                                                //#endregion
                                                            }
                                                            hidePageFoot
                                                            data={[
                                                                { id: "taxi", workDate: "2022-11-30", workStartTime: "09:00", workEndTime: "18:00" },
                                                            ]} // 寫死項目
                                                        />
                                                    </BasicContainer>
                                                </ScrollBar>
                                            </>
                                        ),
                                        theme: tablet.clockInModal,
                                    })
                                    //#endregion
                                }}
                            />

                            {/* 編輯司機資料按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                icon={<EditPen style={tablet.toEditButtonIcon} />}
                                text={"編輯司機資料"}
                                theme={tablet.toEditButton}
                                onClick={() => {
                                    props.controllGCS("return");
                                    history.push(`/DriverAndCar/Drivers/Edit?driversId=${props?.DriverId}`)
                                }}
                            />
                        </SubContainer>

                    </MainPageSubTitleBar>

                    {/* 基本資料表單區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.baseContainer}
                    >
                        {/* 上傳司機圖片容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={tablet.driverImgFormContainer}
                        >
                            <FormRow>
                                {/* 上傳司機圖片 */}
                                <Upload
                                    viewType
                                    // imageUrl={"/logo192.png"}
                                    theme={tablet.driverImgUpload}
                                />
                            </FormRow>
                        </FormContainer>

                        {/* 基本資料右方容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={tablet.baseRightFormContainer}
                        >
                            <FormRow>

                                {/* 姓名 Name */}
                                <TextInput
                                    viewType
                                    topLabel={<>姓名<Text theme={tablet.nameRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DriversInformationPage", "Name") ?? props.DriverInfo?.name}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DriversInformationPage", "Name", value);
                                    }}
                                    theme={tablet.name}
                                />

                                {/* 身分證字號 Uid */}
                                <TextInput
                                    viewType
                                    topLabel={<>身分證字號<Text theme={tablet.uidRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DriversInformationPage", "Uid") ?? props.DriverInfo?.uid}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DriversInformationPage", "Uid", value);
                                    }}
                                    theme={tablet.uid}
                                />

                                {/* 性別 Sex */}
                                {/* <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>性別<Text theme={tablet.sexRequired}>(必填)</Text></>}
                                    //viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("DriversInformationPage", "Sex") ?? {}}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DriversInformationPage", "Sex", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇性別", isDisabled: true },
                                        { value: 0, label: '女' },
                                        { value: 1, label: '男' }
                                    ]}
                                    // menuPosition={true}
                                    theme={tablet.sex}
                                /> */}

                                {/* 手機 Cellphone */}
                                <TextInput
                                    viewType
                                    topLabel={<>手機<Text theme={tablet.cellphoneRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DriversInformationPage", "Cellphone") ?? props.DriverInfo?.phone}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DriversInformationPage", "Cellphone", value);
                                    }}
                                    theme={tablet.cellphone}
                                />
                            </FormRow>
                        </FormContainer>
                        {/* 基本資料右方容器 下方容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={tablet.baseRightSecondFormContainer}
                        >
                            <FormRow>
                                {/* 可否派發 CanAssign */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>可否派發<Text theme={tablet.canAssignRequired}>(必填)</Text></>}
                                    viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={
                                        globalContextService.get("DriversInformationPage", "CanAssign") ??
                                        (
                                            (!isNil(props.DriverInfo?.status)) ?
                                                { value: props.DriverInfo.status, label: props.DriverInfo.status === 1 ? '可派發' : '不可派發' }
                                                :
                                                null
                                        )
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DriversInformationPage", "CanAssign", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇性別", isDisabled: true },
                                        { value: 1, label: '可派發' },
                                        { value: 0, label: '不可派發' }
                                    ]}
                                    // menuPosition={true}
                                    theme={tablet.canAssign}
                                />

                                {/* 車行 CarDealership */}
                                <TextInput
                                    viewType
                                    topLabel={"車行"}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={
                                        globalContextService.get("DriversInformationPage", "CarDealership") ??
                                        props?.Orgs.filter((org) => { return org?.id === props.DriverInfo.orgId })[0]?.name
                                    }
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DriversInformationPage", "CarDealership", value);
                                    }}
                                    theme={tablet.carDealership}
                                />
                            </FormRow>
                        </FormContainer>

                    </BasicContainer>

                    {/* 備註 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"備註"}
                        theme={tablet.driverNoteSubTitleBar}
                    />

                    {/* 備註表單區域容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.driverNoteContainer}
                    >
                        <FormRow>
                            {/* 備註 DriverNote */}
                            <Textarea
                                viewType
                                baseDefaultTheme={"DefaultTheme"}
                                placeholder={""}
                                value={globalContextService.get("DriversInformationPage", "DriverNote") ?? props.DriverInfo?.remark}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DriversInformationPage", "DriverNote", value);
                                    // console.log(value)
                                }}
                                theme={tablet.driverNote}
                            />
                        </FormRow>
                    </FormContainer>
                </BasicContainer>


                {/* 頁面 資訊卡片 區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={tablet.infoCardContainer}
                >
                    <Container>
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
                </BasicContainer>

                {/* 頁面 證照 表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={tablet.licenseContainer}
                >
                    {/* 證照 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"證照"}
                        theme={tablet.driverLicenseSubTitleBar}
                    />

                    {/* 證照 List區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        length={props?.DriverInfo?.driverLicenses?.length}
                        theme={tablet.driverLicenseListContainer}
                    >

                        {/* 證照 List */}
                        <OldList
                            checkbox={false}
                            checkedRowKeyName={"id"}
                            columnsAttr={
                                //#region 資料欄設定
                                [
                                    {
                                        title: '證照類型',
                                        width: "522px",
                                        // dataIndex: 'name',
                                        render: (rowData) => {
                                            return props?.License?.data.filter(l => l?.id === rowData?.id)[0]?.name
                                        }
                                        // sorter: (a, b) => a.name.length - b.name.length,
                                    },
                                    {
                                        title: "證照到期日",
                                        width: "522px",
                                        dataIndex: 'expireDate',
                                        // sorter: (a, b) => a.expireDate.length - b.expireDate.length,
                                    }
                                ]
                                //#endregion
                            }
                            hidePageFoot
                            data={props?.DriverInfo?.driverLicenses}
                        // data={[
                        //     { id: "minibus", licenseType: "職業小客車", licenseExpiryDate: "2022-11-22" },
                        //     { id: "coach", licenseType: "職業大客車", licenseExpiryDate: "2022-11-22" },
                        // ]} // 寫死項目
                        />
                    </BasicContainer>
                </BasicContainer>

                {/* 頁面 保險 表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={tablet.insuranceContainer}
                >

                    {/* 保險 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"保險"}
                        theme={tablet.driverInsuranceSubTitleBar}
                    />

                    {/* 保險 List區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        length={props?.DriverInfo?.driverInsurance?.length}
                        theme={tablet.driverInsuranceListContainer}
                    >

                        {/* 保險 List */}
                        <OldList
                            checkbox={false}
                            checkedRowKeyName={"id"}
                            columnsAttr={
                                //#region 資料欄設定
                                [
                                    {
                                        title: '保險類型',
                                        width: "522px",
                                        // dataIndex: 'name',
                                        render: (rowData) => {
                                            return props?.Insurance?.data.filter(l => l?.id === rowData?.id)[0]?.name
                                        }
                                        // sorter: (a, b) => a.name.length - b.name.length,
                                    },
                                    {
                                        title: "保險到期日",
                                        width: "522px",
                                        dataIndex: 'expireDate',
                                        // sorter: (a, b) => a.expireDate.length - b.expireDate.length,
                                    }
                                ]
                                //#endregion
                            }
                            hidePageFoot
                            data={props?.DriverInfo?.driverInsurance}
                        // data={[
                        //     { id: "labor", insuranceType: "勞保", insuranceExpiryDate: "2022-11-23" },
                        // ]} // 寫死項目
                        />

                    </BasicContainer>
                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`