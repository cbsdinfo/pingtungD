import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService } from '../../../../../Components';
import { isNil } from 'lodash';
import { carFromMapping, carFromSelectOption } from '../../../../../Mappings/Mappings';
import { valid } from '../../../../../Handlers';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cars: { carsEdit: { rwd: { tablet } } } } } = Theme;
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

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
                            titleText={"車輛基本資料編輯"}
                            theme={tablet.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/*  回上一頁按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 回上一頁按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.returnButton}
                                    onClick={() => {
                                        props.controllGCS("return");
                                        history.goBack();
                                    }}
                                >
                                    回上一頁
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
            >

                {/* 編輯頁面表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={tablet.editPageContainer}
                >

                    {/* 基本資料編輯 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"基本資料"}
                        theme={tablet.driverBaseSubTitleBar}
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
                                    if (valid(globalContextService.get("CarsEditPage", "CarNumber") ?? "", ["^.{1,}$", "^[A-Za-z0-9-]{0,}$"], ["請輸入車牌號碼", "車牌號碼，限定輸入半形英數與 '-'"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsEditPage", "CarNumber") ?? "", ["^.{1,}$", "^[A-Za-z0-9-]{0,}$"], ["請輸入車牌號碼", "車牌號碼，限定輸入半形英數與 '-'"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsEditPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車輛類別"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsEditPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車輛類別"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsEditPage", "CarColor") ?? "", ["^.{1,}$"], ["請輸入車身顏色"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsEditPage", "CarColor") ?? "", ["^.{1,}$"], ["請輸入車身顏色"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsEditPage", "BrandModel") ?? "", ["^.{1,}$"], ["請輸入廠牌型號"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsEditPage", "BrandModel") ?? "", ["^.{1,}$"], ["請輸入廠牌型號"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsEditPage", "CarFrom")?.value ?? "", ["^.{1,}$"], ["請選擇車輛來源"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsEditPage", "CarFrom")?.value ?? "", ["^.{1,}$"], ["請選擇車輛來源"])[1]
                                    }
                                    else if (
                                        (
                                            globalContextService.get("CarsEditPage", "CarFrom")?.label !== '自購'
                                            &&
                                            valid(globalContextService.get("CarsEditPage", "DonateUnit") ?? "", ["^.{1,}$"], ["請輸入捐贈＆獎助單位"])[1]
                                        )
                                    ) {
                                        validMsg = valid(globalContextService.get("CarsEditPage", "DonateUnit") ?? "", ["^.{1,}$"], ["請輸入捐贈＆獎助單位"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsEditPage", "Seat") ?? "", ["^.{1,}$"], ["請輸入座椅數量"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsEditPage", "Seat") ?? "", ["^.{1,}$"], ["請輸入座椅數量"])[1]
                                    }
                                    // else if (valid(globalContextService.get("CarsEditPage", "WheelchairCount") ?? "", ["^.{1,}$"], ["請輸入輪椅數量"])[1]) {
                                    //     validMsg = valid(globalContextService.get("CarsEditPage", "WheelchairCount") ?? "", ["^.{1,}$"], ["請輸入輪椅數量"])[1]
                                    // }
                                    else if (valid(globalContextService.get("CarsEditPage", "CarHeight") ?? "", ["^[0-9]{0,}(.[0-9]+)?$"], ["車身高度，限定輸入半形數字與 '.'"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsEditPage", "CarHeight") ?? "", ["^[0-9]{0,}(.[0-9]+)?$"], ["車身高度，限定輸入半形數字與 '.'"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsEditPage", "Name")?.value ?? "", ["^.{1,}$"], ["請選擇司機姓名"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsEditPage", "Name")?.value ?? "", ["^.{1,}$"], ["請選擇司機姓名"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsEditPage", "CanAssign")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsEditPage", "CanAssign")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsEditPage", "FactoryYM") ?? "", ["^.{1,}$"], ["請選擇出廠年月"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsEditPage", "FactoryYM") ?? "", ["^.{1,}$"], ["請選擇出廠年月"])[1]
                                    }
                                    // else if (valid(globalContextService.get("CarsEditPage", "CheckCarDate") ?? "", ["^.{1,}$"], ["請選擇最後驗車日"])[1]) {
                                    //     validMsg = valid(globalContextService.get("CarsEditPage", "CheckCarDate") ?? "", ["^.{1,}$"], ["請選擇最後驗車日"])[1]
                                    // }
                                    // else if (valid(globalContextService.get("CarsEditPage", "CarReview") ?? "", ["^.{1,}$"], ["請選擇車輛審核"])[1]) {
                                    //     validMsg = valid(globalContextService.get("CarsEditPage", "CarReview") ?? "", ["^.{1,}$"], ["請選擇車輛審核"])[1]
                                    // }
                                    // 車輛設備 未確定
                                    else if (valid(globalContextService.get("CarsEditPage", "CarDealership") ?? "", ["^.{1,}$"], ["請選擇車行"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsEditPage", "CarDealership") ?? "", ["^.{1,}$"], ["請選擇車行"])[1]
                                    }
                                    // else if (
                                    //     (globalContextService.get("CarsEditPage", "DriverLicenseListCheckedRowKeys") ?? [])
                                    //         .map((id) => {
                                    //             return valid(globalContextService.get("CarsEditPage", `LicenseExpiryDate${id}`) ?? "", ["^.{1,}$"], ["請選擇證照到期日"])[1]
                                    //         })
                                    //         .includes("請選擇證照到期日")
                                    // ) {
                                    //     validMsg = "請選擇證照到期日";
                                    // }
                                    else if (
                                        (globalContextService.get("CarsEditPage", "CarInsuranceListCheckedRowKeys") ?? [])
                                            .map((id) => {
                                                return valid(globalContextService.get("CarsEditPage", `InsuranceExpiryDate${id}`) ?? "", ["^.{1,}$"], ["請選擇保險到期日"])[1]
                                            })
                                            .includes("請選擇保險到期日")
                                    ) {
                                        validMsg = "請選擇保險到期日";
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
                                        props.UpdateCarExecute({
                                            id: props.CarsId,// id 新增不須上送此欄位
                                            orgId: props.CarInfo.orgId, // 車行
                                            driverInfoId: globalContextService.get("CarsEditPage", "Name")?.value, // 司機名對應 id
                                            carCategoryId: globalContextService.get("CarsEditPage", "CarType")?.value, // 車輛類別 id
                                            carCategoryName: globalContextService.get("CarsEditPage", "CarType")?.label, // 車輛類別名 
                                            carNo: globalContextService.get("CarsEditPage", "CarNumber"), // 車牌號碼
                                            // "carPic": "string", // 圖片 未確定
                                            carTop: globalContextService.get("CarsEditPage", "CarHeight"), // 車身高度
                                            factoryType: globalContextService.get("CarsEditPage", "BrandModel"), // 廠牌型號
                                            carFrom: globalContextService.get("CarsEditPage", "CarFrom")?.value, // 車輛來源
                                            donationUnit: globalContextService.get("CarsEditPage", "DonateUnit"), // 捐贈＆獎助單位
                                            carColor: globalContextService.get("CarsEditPage", "CarColor"), // 車身顏色
                                            wheelchairNum: globalContextService.get("CarsEditPage", "WheelchairCount"), // 輪椅數量
                                            seatNum: globalContextService.get("CarsEditPage", "Seat"), // 座椅數量
                                            makeDate: globalContextService.get("CarsEditPage", "FactoryYM"), // 出廠年月
                                            lastCheckDate: globalContextService.get("CarsEditPage", "CheckCarDate"), // 最後驗車日
                                            status: globalContextService.get("CarsEditPage", "CanAssign")?.value, // 可否派發
                                            remark: globalContextService.get("CarsEditPage", "DriverNote"), // 備註
                                            // carLicenses: (globalContextService.get("CarsEditPage", "DriverLicenseListCheckedRowsData") ?? []).map((item) => {
                                            //     return { categoryId: item?.id, categoryName: item?.name, expireDate: globalContextService.get("CarsEditPage", `LicenseExpiryDate${item?.id}`) }
                                            // }),
                                            carLicenses: [],
                                            carInsurances: (globalContextService.get("CarsEditPage", "CarInsuranceListCheckedRowsData") ?? []).map((item) => {
                                                return { categoryId: item?.id, categoryName: item?.name, expireDate: globalContextService.get("CarsEditPage", `InsuranceExpiryDate${item?.id}`) }
                                            }),
                                            carDevices: (globalContextService.get("CarsEditPage", "CarEquipment") ?? []).map((item) => {
                                                return { categoryId: props?.Device.filter(d => d?.id === item)[0]?.id, categoryName: props?.Device.filter(d => d?.id === item)[0]?.name }
                                            }),
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
                        {/* 上傳車輛圖片容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={tablet.carImgFormContainer}
                        >
                            <FormRow>
                                {/* 上傳車輛圖片 */}
                                <Upload
                                    // imageUrl={"/logo192.png"}
                                    theme={tablet.carImgUpload}
                                />
                            </FormRow>
                        </FormContainer>

                        {/* 基本資料右方容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={tablet.baseRightFormContainer}
                        >
                            <FormRow>

                                {/* 車牌號碼 CarNumber */}
                                <TextInput
                                    viewType
                                    topLabel={<>車牌號碼<Text theme={tablet.carNumberRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsEditPage", "CarNumber") ?? props.CarInfo?.carNo}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsEditPage", "CarNumber", value);
                                    }}
                                    theme={tablet.carNumber}
                                />

                                {/* 車輛類別 CarType */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>車輛類別<Text theme={tablet.carTypeRequired}>(必填)</Text></>}
                                    //viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={
                                        globalContextService.get("CarsEditPage", "CarType") ??
                                        (
                                            (!isNil(props.CarInfo?.carCategoryId)) ?
                                                { value: props.CarInfo.carCategoryId, label: props.CarInfo.carCategoryName }
                                                :
                                                null
                                        )
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsEditPage", "CarType", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇車輛類別", isDisabled: true },
                                        ...props?.CarType
                                    ]}
                                    // menuPosition={true}
                                    theme={tablet.carType}
                                />

                                {/* 車身顏色 CarColor */}
                                <TextInput
                                    topLabel={<>車身顏色<Text theme={tablet.carColorRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsEditPage", "CarColor") ?? props.CarInfo?.carColor}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsEditPage", "CarColor", value);
                                    }}
                                    theme={tablet.carColor}
                                />

                            </FormRow>
                        </FormContainer>

                        {/* 基本資料下方容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={tablet.baseBottomFormContainer}
                        >
                            <FormRow>

                                {/* 廠牌型號 BrandModel */}
                                <TextInput
                                    topLabel={<>廠牌型號<Text theme={tablet.brandModelRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsEditPage", "BrandModel") ?? props.CarInfo?.factoryType}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsEditPage", "BrandModel", value);
                                    }}
                                    theme={tablet.brandModel}
                                />

                                {/* 車輛來源 CarFrom */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>車輛來源<Text theme={tablet.carFromRequired}>(必填)</Text></>}
                                    //viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={
                                        globalContextService.get("CarsEditPage", "CarFrom") ??
                                        (
                                            (!isNil(props.CarInfo?.carFrom)) ?
                                                { value: props.CarInfo.carFrom, label: carFromMapping[props.CarInfo.carFrom] }
                                                :
                                                null
                                        )
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        if (value.label ?? "" !== "") {
                                            if (value.label !== '自購') {
                                                if (value.label !== globalContextService.get("CarsEditPage", "CarFrom")?.label) {
                                                    setForceUpdate(f => !f); // 剛選擇 獎助 或 捐贈 時，重新渲染
                                                }
                                            }
                                            else if (globalContextService.get("CarsEditPage", "CarFrom")?.label !== '自購') {
                                                setForceUpdate(f => !f); // 剛選擇 獎助 或 捐贈 時，重新渲染
                                            }
                                        }
                                        globalContextService.set("CarsEditPage", "CarFrom", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇車輛來源", isDisabled: true },
                                        ...carFromSelectOption
                                    ]}
                                    // menuPosition={true}
                                    theme={tablet.carFrom}
                                />

                                {/* 捐贈＆獎助單位 DonateUnit */}
                                <TextInput
                                    topLabel={
                                        <>捐贈＆獎助單位
                                        {
                                                (!isNil(globalContextService.get("CarsEditPage", "CarFrom")?.label)
                                                    &&
                                                    globalContextService.get("CarsEditPage", "CarFrom")?.label !== '自購'
                                                )
                                                &&
                                                <Text theme={tablet.donateUnitRequired}>(必填)</Text>

                                            }
                                        </>
                                    }
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsEditPage", "DonateUnit") ?? props.CarInfo?.donationUnit}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsEditPage", "DonateUnit", value);
                                    }}
                                    theme={tablet.donateUnit}
                                />

                                {/* 座椅數量 Seat */}
                                <NumberInput
                                    // viewType
                                    // disable
                                    topLabel={<>座椅數量<Text theme={tablet.seatRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    min={0}
                                    value={globalContextService.get("CarsEditPage", "Seat") ?? props.CarInfo?.seatNum}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsEditPage", "Seat", value);
                                    }}
                                    theme={tablet.seat}
                                />

                                {/* 輪椅數量 WheelchairCount */}
                                <NumberInput
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={"輪椅數量"}
                                    // viewType
                                    // disable
                                    placeholder={""}
                                    min={0}
                                    value={globalContextService.get("CarsEditPage", "WheelchairCount") ?? props.CarInfo?.wheelchairNum}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsEditPage", "WheelchairCount", value);
                                    }}
                                    theme={tablet.wheelchairCount}
                                />

                                {/* 車身高度 CarHeight */}
                                <TextInput
                                    topLabel={<>車身高度(公尺)</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsEditPage", "CarHeight") ?? props.CarInfo?.carTop}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsEditPage", "CarHeight", value);
                                    }}
                                    theme={tablet.carHeight}
                                />
                                {/* 司機姓名 Name */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>司機姓名<Text theme={tablet.nameRequired}>(必填)</Text></>}
                                    //viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={
                                        globalContextService.get("CarsEditPage", "Name") ??
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
                                        globalContextService.set("CarsEditPage", "Name", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇司機姓名", isDisabled: true },
                                        ...props?.Drivers
                                    ]}
                                    // menuPosition={true}
                                    theme={tablet.name}
                                />

                                {/* 可否派發 CanAssign */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>可否派發<Text theme={tablet.canAssignRequired}>(必填)</Text></>}
                                    //viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={
                                        globalContextService.get("CarsEditPage", "CanAssign") ??
                                        (
                                            (!isNil(props.CarInfo?.status)) ?
                                                { value: props.CarInfo.status, label: props.CarInfo.status === 1 ? '可派發' : '不可派發' }
                                                :
                                                null
                                        )
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsEditPage", "CanAssign", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇可否派發", isDisabled: true },
                                        { value: 1, label: '可派發' },
                                        { value: 0, label: '不可派發' }
                                    ]}
                                    // menuPosition={true}
                                    theme={tablet.canAssign}
                                />

                                {/* 出廠年月 FactoryYM */}
                                <DateTimePicker
                                    topLabel={<>出廠年月<Text theme={tablet.canAssignRequired}>(必填)</Text></>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"month"}
                                    format={"YYYY-MM"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (props.CarInfo?.makeDate) ?
                                            moment(props.CarInfo.makeDate, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null

                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("CarsEditPage", `FactoryYM`, value);
                                    }}
                                    theme={tablet.factoryYM}
                                />

                                {/* 最後驗車日 CheckCarDate */}
                                <DateTimePicker
                                    topLabel={"最後驗車日"}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"date"}
                                    format={"YYYY-MM-DD"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (props.CarInfo?.lastCheckDate) ?
                                            moment(props.CarInfo.lastCheckDate, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null

                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("CarsEditPage", `CheckCarDate`, value);
                                    }}
                                    theme={tablet.checkCarDate}
                                />

                                {/* 車輛審核 CarReview */}
                                <Radio
                                    // viewType
                                    // disable
                                    topLabel={"車輛審核"}
                                    value={1}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsEditPage", "CarReview", value);
                                        // console.log(globalContextService.get("CarsEditPage", "CarReview"));
                                    }}
                                    theme={tablet.carReview}
                                >
                                    {/* 車輛審核 CarReview  選項 */}
                                    <RadioItem value={1} >是</RadioItem>
                                    <RadioItem value={0} >否</RadioItem>
                                </Radio>

                                {/* 車輛設備 CarEquipment */}
                                <Checkbox
                                    // viewType
                                    checked={globalContextService.get("CarsEditPage", "CarEquipment")}
                                    // checked={[0]}
                                    // disable
                                    topLabel={"車輛設備"}
                                    onChange={(e, value, onInitial) => {
                                        console.log(value)
                                        globalContextService.set("CarsEditPage", "CarEquipment", value);
                                        // console.log(globalContextService.get("CarsEditPage", "CarEquipment"));
                                    }}
                                    theme={tablet.carEquipment}
                                >
                                    {/* 車輛設備 CarEquipment  選項 */}
                                    {props?.Device.map(d => {
                                        return (
                                            <CheckboxItem key={d?.id} value={d?.id} >{d?.name}</CheckboxItem>
                                        )
                                    })}
                                    {/*<CheckboxItem value={0} >GPS</CheckboxItem>
                                    <CheckboxItem value={1} >車機</CheckboxItem>
                                    <CheckboxItem value={2} >攝影機</CheckboxItem>
                                    <CheckboxItem value={3} >滅火器</CheckboxItem>*/}
                                </Checkbox>

                                {/* 車行 CarDealership */}
                                <TextInput
                                    viewType
                                    topLabel={"車行"}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsEditPage", "CarDealership")
                                        ??
                                        props?.Orgs.filter((org) => { return org?.id === props.CarInfo.orgId })[0]?.name
                                    }
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsEditPage", "CarDealership", value);
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
                                baseDefaultTheme={"DefaultTheme"}
                                placeholder={""}
                                value={globalContextService.get("CarsEditPage", "DriverNote") ?? props.CarInfo?.remark}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CarsEditPage", "DriverNote", value);
                                    // console.log(value)
                                }}
                                theme={tablet.driverNote}
                            />
                        </FormRow>
                    </FormContainer>

                    {/* 保險 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"保險"}
                        theme={tablet.driverInsuranceSubTitleBar}
                    />

                    {/* 保險 List區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        length={props.Insurance?.data?.length}
                        theme={tablet.driverInsuranceListContainer}
                    >

                        {/* 保險 List */}
                        <OldList
                            checkbox={true}
                            checked={globalContextService.get("CarsEditPage", "CarInsuranceListCheckedRowKeys")}
                            checkedRowKeyName={"id"}
                            checkboxOnChecked={
                                (checkedRowKeys, checkedRows) => {
                                    // console.log(`已選擇的RowKeys: ${checkedRowKeys}`, '對應已選擇的RowKeys當列資料: ', checkedRows);
                                    globalContextService.set("CarsEditPage", "CarInsuranceListCheckedRowKeys", checkedRowKeys);
                                    globalContextService.set("CarsEditPage", "CarInsuranceListCheckedRowsData", checkedRows);

                                    //#region 取消勾選項時 清空對應欄位資料
                                    // let data = [
                                    //     { id: "passenger", insuranceType: "乘客險" },
                                    //     { id: "thirdLiability", insuranceType: "第三責任險" },
                                    //     { id: "compulsory", insuranceType: "強制險" }
                                    // ];
                                    let data = props.Insurance?.data;

                                    (data ?? []).forEach(item => {

                                        if (!(checkedRowKeys ?? []).includes(item?.id)) {
                                            globalContextService.remove("CarsEditPage", `InsuranceExpiryDate${item?.id}`);
                                        }
                                    });
                                    //#endregion
                                }
                            }
                            setPerCheckBoxDisabled={(record) => {
                                return {
                                    // ...record, // 對應CheckBox當列資料
                                    disabled: record.name === 'Arhua',// 對於所有的列，設定符合條件 (name等於Arhua) 的就禁用
                                }
                            }}
                            columnsAttr={
                                //#region 資料欄設定
                                [
                                    {
                                        title: '保險類型',
                                        width: "522px",
                                        dataIndex: 'name',
                                        sorter: (a, b) => a.name.length - b.name.length,
                                    },
                                    {
                                        title: <>保險到期日<Text theme={tablet.insuranceExpiryDateRequired}>(有該保險則為必填)</Text></>,
                                        width: "522px",
                                        // dataIndex: 'expiryDate',
                                        // sorter: (a, b) => a.expiryDate.length - b.expiryDate.length,
                                        render: (rowData) => {
                                            return (
                                                <FormRow>
                                                    <DateTimePicker
                                                        // type={"time"} time、date、week、month、quarter、year
                                                        type={"date"}
                                                        format={"YYYY-MM-DD"}
                                                        disable={!(globalContextService.get("CarsEditPage", "CarInsuranceListCheckedRowKeys") ?? []).includes(rowData?.id)}
                                                        bascDefaultTheme={"DefaultTheme"}
                                                        // viewType
                                                        isSearchable
                                                        placeholder={""}
                                                        value={
                                                            (globalContextService.get("CarsEditPage", `InsuranceExpiryDate${rowData?.id}`) ?
                                                                moment(globalContextService.get("CarsEditPage", `InsuranceExpiryDate${rowData?.id}`), "YYYY-MM-DD")
                                                                :
                                                                null
                                                            )
                                                        }
                                                        onChange={(value, momentObj) => {
                                                            globalContextService.set("CarsEditPage", `InsuranceExpiryDate${rowData?.id}`, value);
                                                        }}
                                                        theme={tablet.insuranceExpiryDate}
                                                    />
                                                </FormRow>
                                            )
                                        }
                                    }
                                ]
                                //#endregion
                            }
                            hidePageFoot
                            data={props.Insurance?.data}
                        // data={[
                        //     { id: "passenger", insuranceType: "乘客險" },
                        //     { id: "thirdLiability", insuranceType: "第三責任險" },
                        //     { id: "compulsory", insuranceType: "強制險" }
                        // ]} // 寫死項目
                        />

                    </BasicContainer>

                    {/* 底部儲存按鈕 外層容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.bottomSaveButtonContainer}
                    >
                        {/* 底部儲存按鈕 列容器 */}
                        <FormRow
                            bascDefaultTheme={"DefaultTheme"}
                            theme={tablet.bottomSaveButtonRowContainer}
                        >
                            {/*  底部儲存按鈕 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 底部儲存按鈕 */}
                                <BasicButton
                                    baseDefaultTheme={"PrimaryTheme"}
                                    text={"儲存"}
                                    theme={tablet.bottomSaveButton}
                                    onClick={() => {
                                        //#region 表單驗證
                                        let validMsg = "";
                                        if (valid(globalContextService.get("CarsEditPage", "CarNumber") ?? "", ["^.{1,}$", "^[A-Za-z0-9-]{0,}$"], ["請輸入車牌號碼", "車牌號碼，限定輸入半形英數與 '-'"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsEditPage", "CarNumber") ?? "", ["^.{1,}$", "^[A-Za-z0-9-]{0,}$"], ["請輸入車牌號碼", "車牌號碼，限定輸入半形英數與 '-'"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsEditPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車輛類別"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsEditPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車輛類別"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsEditPage", "CarColor") ?? "", ["^.{1,}$"], ["請輸入車身顏色"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsEditPage", "CarColor") ?? "", ["^.{1,}$"], ["請輸入車身顏色"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsEditPage", "BrandModel") ?? "", ["^.{1,}$"], ["請輸入廠牌型號"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsEditPage", "BrandModel") ?? "", ["^.{1,}$"], ["請輸入廠牌型號"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsEditPage", "CarFrom")?.value ?? "", ["^.{1,}$"], ["請選擇車輛來源"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsEditPage", "CarFrom")?.value ?? "", ["^.{1,}$"], ["請選擇車輛來源"])[1]
                                        }
                                        else if (
                                            (
                                                globalContextService.get("CarsEditPage", "CarFrom")?.label !== '自購'
                                                &&
                                                valid(globalContextService.get("CarsEditPage", "DonateUnit") ?? "", ["^.{1,}$"], ["請輸入捐贈＆獎助單位"])[1]
                                            )
                                        ) {
                                            validMsg = valid(globalContextService.get("CarsEditPage", "DonateUnit") ?? "", ["^.{1,}$"], ["請輸入捐贈＆獎助單位"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsEditPage", "Seat") ?? "", ["^.{1,}$"], ["請輸入座椅數量"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsEditPage", "Seat") ?? "", ["^.{1,}$"], ["請輸入座椅數量"])[1]
                                        }
                                        // else if (valid(globalContextService.get("CarsEditPage", "WheelchairCount") ?? "", ["^.{1,}$"], ["請輸入輪椅數量"])[1]) {
                                        //     validMsg = valid(globalContextService.get("CarsEditPage", "WheelchairCount") ?? "", ["^.{1,}$"], ["請輸入輪椅數量"])[1]
                                        // }
                                        else if (valid(globalContextService.get("CarsEditPage", "CarHeight") ?? "", ["^[0-9]{0,}(.[0-9]+)?$"], ["車身高度，限定輸入半形數字與 '.'"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsEditPage", "CarHeight") ?? "", ["^[0-9]{0,}(.[0-9]+)?$"], ["車身高度，限定輸入半形數字與 '.'"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsEditPage", "Name")?.value ?? "", ["^.{1,}$"], ["請選擇司機姓名"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsEditPage", "Name")?.value ?? "", ["^.{1,}$"], ["請選擇司機姓名"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsEditPage", "CanAssign")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsEditPage", "CanAssign")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsEditPage", "FactoryYM") ?? "", ["^.{1,}$"], ["請選擇出廠年月"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsEditPage", "FactoryYM") ?? "", ["^.{1,}$"], ["請選擇出廠年月"])[1]
                                        }
                                        // else if (valid(globalContextService.get("CarsEditPage", "CheckCarDate") ?? "", ["^.{1,}$"], ["請選擇最後驗車日"])[1]) {
                                        //     validMsg = valid(globalContextService.get("CarsEditPage", "CheckCarDate") ?? "", ["^.{1,}$"], ["請選擇最後驗車日"])[1]
                                        // }
                                        // else if (valid(globalContextService.get("CarsEditPage", "CarReview") ?? "", ["^.{1,}$"], ["請選擇車輛審核"])[1]) {
                                        //     validMsg = valid(globalContextService.get("CarsEditPage", "CarReview") ?? "", ["^.{1,}$"], ["請選擇車輛審核"])[1]
                                        // }
                                        // 車輛設備 未確定
                                        else if (valid(globalContextService.get("CarsEditPage", "CarDealership") ?? "", ["^.{1,}$"], ["請選擇車行"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsEditPage", "CarDealership") ?? "", ["^.{1,}$"], ["請選擇車行"])[1]
                                        }
                                        // else if (
                                        //     (globalContextService.get("CarsEditPage", "DriverLicenseListCheckedRowKeys") ?? [])
                                        //         .map((id) => {
                                        //             return valid(globalContextService.get("CarsEditPage", `LicenseExpiryDate${id}`) ?? "", ["^.{1,}$"], ["請選擇證照到期日"])[1]
                                        //         })
                                        //         .includes("請選擇證照到期日")
                                        // ) {
                                        //     validMsg = "請選擇證照到期日";
                                        // }
                                        else if (
                                            (globalContextService.get("CarsEditPage", "CarInsuranceListCheckedRowKeys") ?? [])
                                                .map((id) => {
                                                    return valid(globalContextService.get("CarsEditPage", `InsuranceExpiryDate${id}`) ?? "", ["^.{1,}$"], ["請選擇保險到期日"])[1]
                                                })
                                                .includes("請選擇保險到期日")
                                        ) {
                                            validMsg = "請選擇保險到期日";
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
                                            props.UpdateCarExecute({
                                                id: props.CarsId,// id 新增不須上送此欄位
                                                orgId: props.CarInfo.orgId, // 車行
                                                driverInfoId: globalContextService.get("CarsEditPage", "Name")?.value, // 司機名對應 id
                                                carCategoryId: globalContextService.get("CarsEditPage", "CarType")?.value, // 車輛類別 id
                                                carCategoryName: globalContextService.get("CarsEditPage", "CarType")?.label, // 車輛類別名 
                                                carNo: globalContextService.get("CarsEditPage", "CarNumber"), // 車牌號碼
                                                // "carPic": "string", // 圖片 未確定
                                                carTop: globalContextService.get("CarsEditPage", "CarHeight"), // 車身高度
                                                factoryType: globalContextService.get("CarsEditPage", "BrandModel"), // 廠牌型號
                                                carFrom: globalContextService.get("CarsEditPage", "CarFrom")?.value, // 車輛來源
                                                donationUnit: globalContextService.get("CarsEditPage", "DonateUnit"), // 捐贈＆獎助單位
                                                carColor: globalContextService.get("CarsEditPage", "CarColor"), // 車身顏色
                                                wheelchairNum: globalContextService.get("CarsEditPage", "WheelchairCount"), // 輪椅數量
                                                seatNum: globalContextService.get("CarsEditPage", "Seat"), // 座椅數量
                                                makeDate: globalContextService.get("CarsEditPage", "FactoryYM"), // 出廠年月
                                                lastCheckDate: globalContextService.get("CarsEditPage", "CheckCarDate"), // 最後驗車日
                                                status: globalContextService.get("CarsEditPage", "CanAssign")?.value, // 可否派發
                                                remark: globalContextService.get("CarsEditPage", "DriverNote"), // 備註
                                                // carLicenses: (globalContextService.get("CarsEditPage", "DriverLicenseListCheckedRowsData") ?? []).map((item) => {
                                                //     return { categoryId: item?.id, categoryName: item?.name, expireDate: globalContextService.get("CarsEditPage", `LicenseExpiryDate${item?.id}`) }
                                                // }),
                                                carLicenses: [],
                                                carInsurances: (globalContextService.get("CarsEditPage", "CarInsuranceListCheckedRowsData") ?? []).map((item) => {
                                                    return { categoryId: item?.id, categoryName: item?.name, expireDate: globalContextService.get("CarsEditPage", `InsuranceExpiryDate${item?.id}`) }
                                                }),
                                                carDevices: (globalContextService.get("CarsEditPage", "CarEquipment") ?? []).map((item) => {
                                                    return { categoryId: props?.Device.filter(d => d?.id === item)[0]?.id, categoryName: props?.Device.filter(d => d?.id === item)[0]?.name }
                                                }),
                                            })
                                        }
                                        //#endregion
                                    }}
                                />
                            </SubContainer>
                        </FormRow>
                    </FormContainer>
                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
`