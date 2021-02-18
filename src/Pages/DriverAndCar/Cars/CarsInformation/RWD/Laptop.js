import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import { ReactComponent as EditPen } from '../../../../../Assets/img/CarsPage/EditPen.svg'
import moment from 'moment';
import { BasicButton, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem } from '../../../../../Components';
import { isNil } from 'lodash';
import { carFromMapping, carFromSelectOption } from '../../../../../Mappings/Mappings';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cars: { carsInformation: { rwd: { laptop } } } } } = Theme;

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
                            titleText={"車輛詳細基本資料"}
                            theme={laptop.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/*  列印按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 列印按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptop.printButton}
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
                                    theme={laptop.returnButton}
                                    onClick={() => {
                                        props.controllGCS("return");
                                        history.push("/DriverAndCar/Cars")
                                    }}
                                >
                                    回列表
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
            >

                {/* 頁面 基本資料、備註 表單區容器  */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptop.baseAndNoteContainer}
                >

                    {/* 基本資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"基本資料"}
                        theme={laptop.driverBaseSubTitleBar}
                    >

                        {/*  編輯車輛資料按鈕 (基本資料 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 編輯車輛資料按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                icon={<EditPen style={laptop.toEditButtonIcon} />}
                                text={"編輯車輛資料"}
                                theme={laptop.toEditButton}
                                onClick={() => {
                                    props.controllGCS("return");
                                    history.push(`/DriverAndCar/Cars/Edit?carsId=${props.CarsId}`)
                                }}
                            />
                        </SubContainer>
                    </MainPageSubTitleBar>

                    {/* 基本資料表單區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.baseContainer}
                    >
                        {/* 上傳車輛圖片容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptop.carImgFormContainer}
                        >
                            <FormRow>
                                {/* 上傳車輛圖片 */}
                                <Upload
                                    viewType
                                    // imageUrl={"/logo192.png"}
                                    theme={laptop.carImgUpload}
                                />
                            </FormRow>
                        </FormContainer>

                        {/* 基本資料右方容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptop.baseRightFormContainer}
                        >
                            <FormRow>

                                {/* 車牌號碼 CarNumber */}
                                <TextInput
                                    viewType
                                    topLabel={<>車牌號碼<Text theme={laptop.carNumberRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsInformationPage", "CarNumber") ?? props.CarInfo?.carNo}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsInformationPage", "CarNumber", value);
                                    }}
                                    theme={laptop.carNumber}
                                />

                                {/* 車輛類別 CarType */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>車輛類別<Text theme={laptop.carTypeRequired}>(必填)</Text></>}
                                    viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={
                                        globalContextService.get("CarsInformationPage", "CarType") ??
                                        (
                                            (!isNil(props.CarInfo?.carCategoryId)) ?
                                                { value: props.CarInfo.carCategoryId, label: props.CarInfo.carCategoryName }
                                                :
                                                null
                                        )
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsInformationPage", "CarType", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇車輛類別", isDisabled: true },
                                        ...props?.CarType
                                    ]}
                                    // menuPosition={true}
                                    theme={laptop.carType}
                                />

                                {/* 車身顏色 CarColor */}
                                <TextInput
                                    viewType
                                    topLabel={<>車身顏色<Text theme={laptop.carColorRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsInformationPage", "CarColor") ?? props.CarInfo?.carColor}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsInformationPage", "CarColor", value);
                                    }}
                                    theme={laptop.carColor}
                                />

                                {/* 廠牌型號 BrandModel */}
                                <TextInput
                                    viewType
                                    topLabel={<>廠牌型號<Text theme={laptop.brandModelRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsInformationPage", "BrandModel") ?? props.CarInfo?.factoryType}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsInformationPage", "BrandModel", value);
                                    }}
                                    theme={laptop.brandModel}
                                />

                                {/* 車輛來源 CarFrom */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>車輛來源<Text theme={laptop.carFromRequired}>(必填)</Text></>}
                                    viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={
                                        globalContextService.get("CarsInformationPage", "CarFrom") ??
                                        (
                                            (!isNil(props.CarInfo?.carFrom)) ?
                                                { value: props.CarInfo.carFrom, label: carFromMapping[props.CarInfo.carFrom] }
                                                :
                                                null
                                        )
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsInformationPage", "CarFrom", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇車輛來源", isDisabled: true },
                                        ...carFromSelectOption
                                    ]}
                                    // menuPosition={true}
                                    theme={laptop.carFrom}
                                />

                                {/* 捐贈＆獎助單位 DonateUnit */}
                                <TextInput
                                    viewType
                                    topLabel={<>捐贈＆獎助單位<Text theme={laptop.donateUnitRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsInformationPage", "DonateUnit") ?? props.CarInfo?.donationUnit}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsInformationPage", "DonateUnit", value);
                                    }}
                                    theme={laptop.donateUnit}
                                />

                            </FormRow>
                        </FormContainer>

                        {/* 基本資料下方容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptop.baseBottomFormContainer}
                        >
                            <FormRow>

                                {/* 座椅數量 Seat */}
                                <NumberInput
                                    viewType
                                    // disable
                                    topLabel={<>座椅數量<Text theme={laptop.seatRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    min={0}
                                    value={globalContextService.get("CarsInformationPage", "Seat") ?? props.CarInfo?.seatNum}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsInformationPage", "Seat", value);
                                    }}
                                    theme={laptop.seat}
                                />

                                {/* 輪椅數量 WheelchairCount */}
                                <NumberInput
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={"輪椅數量"}
                                    viewType
                                    // disable
                                    placeholder={""}
                                    min={0}
                                    value={globalContextService.get("CarsInformationPage", "WheelchairCount") ?? props.CarInfo?.wheelchairNum}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsInformationPage", "WheelchairCount", value);
                                    }}
                                    theme={laptop.wheelchairCount}
                                />

                                {/* 車身高度 CarHeight */}
                                <TextInput
                                    viewType
                                    topLabel={<>車身高度<Text theme={laptop.carHeightRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsInformationPage", "CarHeight") ?? props.CarInfo?.carTop}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsInformationPage", "CarHeight", value);
                                    }}
                                    theme={laptop.carHeight}
                                />
                                {/* 司機姓名 Name */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>司機姓名<Text theme={laptop.nameRequired}>(必填)</Text></>}
                                    viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={
                                        globalContextService.get("CarsInformationPage", "Name") ??
                                        (
                                            (!isNil(props.CarInfo?.driverInfoId)) ?
                                                {
                                                    value: props.CarInfo.driverInfoId,
                                                    label: props?.Drivers.filter((driver) => { return driver?.id === props.CarInfo.driverInfoId })[0]?.userName
                                                }
                                                :
                                                null
                                        )
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsInformationPage", "Name", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇司機姓名", isDisabled: true },
                                        ...props?.Drivers
                                    ]}
                                    // menuPosition={true}
                                    theme={laptop.name}
                                />

                                {/* 可否派發 CanAssign */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>可否派發<Text theme={laptop.canAssignRequired}>(必填)</Text></>}
                                    viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={
                                        globalContextService.get("CarsInformationPage", "CanAssign") ??
                                        (
                                            (!isNil(props.CarInfo?.status)) ?
                                                { value: props.CarInfo.status, label: props.CarInfo.status === 1 ? '可派發' : '不可派發' }
                                                :
                                                null
                                        )
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsInformationPage", "CanAssign", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇可否派發", isDisabled: true },
                                        { value: 1, label: '可派發' },
                                        { value: 0, label: '不可派發' }
                                    ]}
                                    // menuPosition={true}
                                    theme={laptop.canAssign}
                                />

                                {/* 出廠年月 FactoryYM */}
                                <DateTimePicker
                                    topLabel={<>出廠年月<Text theme={laptop.canAssignRequired}>(必填)</Text></>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"month"}
                                    format={"YYYY-MM"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (props.CarInfo?.makeDate) ?
                                            moment(props.CarInfo.makeDate, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("CarsInformationPage", `FactoryYM`, value);
                                    }}
                                    theme={laptop.factoryYM}
                                />

                                {/* 最後驗車日 CheckCarDate */}
                                <DateTimePicker
                                    topLabel={"最後驗車日"}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"date"}
                                    format={"YYYY-MM-DD"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (props.CarInfo?.lastCheckDate) ?
                                            moment(props.CarInfo.lastCheckDate, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("CarsInformationPage", `CheckCarDate`, value);
                                    }}
                                    theme={laptop.checkCarDate}
                                />

                                {/* 車輛審核 CarReview */}
                                <Radio
                                    viewType
                                    // disable
                                    topLabel={"車輛審核"}
                                    value={1}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsInformationPage", "CarReview", value);
                                        // console.log(globalContextService.get("CarsInformationPage", "CarReview"));
                                    }}
                                    theme={laptop.carReview}
                                >
                                    {/* 車輛審核 CarReview  選項 */}
                                    <RadioItem value={1} >是</RadioItem>
                                    <RadioItem value={0} >否</RadioItem>
                                </Radio>

                                {/* 車輛設備 CarEquipment */}
                                <Checkbox
                                    viewType
                                    checked={globalContextService.get("CarsInformationPage", "CarEquipment")}
                                    // disable
                                    topLabel={"車輛設備"}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsInformationPage", "CarEquipment", value);
                                        // console.log(globalContextService.get("CarsInformationPage", "CarEquipment"));
                                    }}
                                    theme={laptop.carEquipment}
                                >
                                    {/* 車輛設備 CarEquipment  選項 */}
                                    {props?.Device.map(d => {
                                        return (
                                            <CheckboxItem key={d?.id} value={d?.id} >{d?.name}</CheckboxItem>
                                        )
                                    })}
                                    {/* <CheckboxItem value={0} >GPS</CheckboxItem>
                                    <CheckboxItem value={1} >車機</CheckboxItem>
                                    <CheckboxItem value={2} >攝影機</CheckboxItem>
                                    <CheckboxItem value={3} >滅火器</CheckboxItem> */}
                                </Checkbox>

                                {/* 車行 CarDealership */}
                                <TextInput
                                    viewType
                                    topLabel={"車行"}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsInformationPage", "CarDealership")
                                        ??
                                        props?.Orgs.filter((org) => { return org?.id === props.CarInfo.orgId })[0]?.name
                                    }
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsInformationPage", "CarDealership", value);
                                    }}
                                    theme={laptop.carDealership}
                                />
                            </FormRow>
                        </FormContainer>

                    </BasicContainer>

                    {/* 備註 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"備註"}
                        theme={laptop.driverNoteSubTitleBar}
                    />

                    {/* 備註表單區域容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.driverNoteContainer}
                    >
                        <FormRow>
                            {/* 備註 DriverNote */}
                            <Textarea
                                viewType
                                baseDefaultTheme={"DefaultTheme"}
                                placeholder={""}
                                value={globalContextService.get("CarsInformationPage", "DriverNote") ?? props.CarInfo?.remark}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CarsInformationPage", "DriverNote", value);
                                    // console.log(value)
                                }}
                                theme={laptop.driverNote}
                            />
                        </FormRow>
                    </FormContainer>

                </BasicContainer>

                {/* 保險 表單區容器  */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptop.insuranceContainer}
                >
                    {/* 保險 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"保險"}
                        theme={laptop.driverInsuranceSubTitleBar}
                    />

                    {/* 保險 List區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        length={props?.CarInfo?.carInsurances?.length}
                        theme={laptop.driverInsuranceListContainer}
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
                                        sorter: (a, b) => a.name.length - b.name.length,
                                        render: (rowData) => {
                                            return props.Insurance?.data.filter(l => l?.id === rowData?.id)[0]?.name
                                        }
                                    },
                                    {
                                        title: "保險到期日",
                                        width: "522px",
                                        dataIndex: 'expireDate',
                                        // sorter: (a, b) => a.insuranceExpiryDate.length - b.insuranceExpiryDate.length,
                                    }
                                ]
                                //#endregion
                            }
                            hidePageFoot
                            data={props.CarInfo?.carInsurances}
                        // data={[
                        //     { id: "passenger", insuranceType: "乘客險", insuranceExpiryDate: "2022-09-23" },
                        //     { id: "thirdLiability", insuranceType: "第三責任險", insuranceExpiryDate: "2022-10-23" },
                        //     { id: "compulsory", insuranceType: "強制險", insuranceExpiryDate: "2022-11-13" }
                        // ]} // 寫死項目
                        />

                    </BasicContainer>

                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`