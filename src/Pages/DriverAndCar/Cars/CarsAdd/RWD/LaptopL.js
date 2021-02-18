import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService } from '../../../../../Components';
import { carFromSelectOption } from '../../../../../Mappings/Mappings'
import { valid } from '../../../../../Handlers';
import { isNil } from 'lodash';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cars: { carsAdd: { rwd: { laptopL } } } } } = Theme;
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
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
                            titleText={"車輛基本資料新增"}
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

                {/* 新增頁面表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptopL.AddPageContainer}
                >

                    {/* 基本資料編輯 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"基本資料"}
                        theme={laptopL.driverBaseSubTitleBar}
                    >

                        {/*  儲存按鈕 (基本資料編輯 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 儲存按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                text={"儲存"}
                                theme={laptopL.saveButton}
                                onClick={() => {
                                    //#region 表單驗證
                                    let validMsg = "";
                                    if (valid(globalContextService.get("CarsAddPage", "CarNumber") ?? "", ["^.{1,}$", "^[A-Za-z0-9-]{0,}$"], ["請輸入車牌號碼", "車牌號碼，限定輸入半形英數與 '-'"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsAddPage", "CarNumber") ?? "", ["^.{1,}$", "^[A-Za-z0-9-]{0,}$"], ["請輸入車牌號碼", "車牌號碼，限定輸入半形英數與 '-'"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsAddPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車輛類別"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsAddPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車輛類別"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsAddPage", "CarColor") ?? "", ["^.{1,}$"], ["請輸入車身顏色"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsAddPage", "CarColor") ?? "", ["^.{1,}$"], ["請輸入車身顏色"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsAddPage", "BrandModel") ?? "", ["^.{1,}$"], ["請輸入廠牌型號"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsAddPage", "BrandModel") ?? "", ["^.{1,}$"], ["請輸入廠牌型號"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsAddPage", "CarFrom")?.value ?? "", ["^.{1,}$"], ["請選擇車輛來源"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsAddPage", "CarFrom")?.value ?? "", ["^.{1,}$"], ["請選擇車輛來源"])[1]
                                    }
                                    else if (
                                        (
                                            globalContextService.get("CarsAddPage", "CarFrom")?.label !== '自購'
                                            &&
                                            valid(globalContextService.get("CarsAddPage", "DonateUnit") ?? "", ["^.{1,}$"], ["請輸入捐贈＆獎助單位"])[1]
                                        )
                                    ) {
                                        validMsg = valid(globalContextService.get("CarsAddPage", "DonateUnit") ?? "", ["^.{1,}$"], ["請輸入捐贈＆獎助單位"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsAddPage", "Seat") ?? "", ["^.{1,}$"], ["請輸入座椅數量"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsAddPage", "Seat") ?? "", ["^.{1,}$"], ["請輸入座椅數量"])[1]
                                    }
                                    // else if (valid(globalContextService.get("CarsAddPage", "WheelchairCount") ?? "", ["^.{1,}$"], ["請輸入輪椅數量"])[1]) {
                                    //     validMsg = valid(globalContextService.get("CarsAddPage", "WheelchairCount") ?? "", ["^.{1,}$"], ["請輸入輪椅數量"])[1]
                                    // }
                                    else if (valid(globalContextService.get("CarsAddPage", "CarHeight") ?? "", ["^[0-9]{0,}(.[0-9]+)?$"], ["車身高度，限定輸入半形數字與 '.'"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsAddPage", "CarHeight") ?? "", ["^[0-9]{0,}(.[0-9]+)?$"], ["車身高度，限定輸入半形數字與 '.'"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsAddPage", "Name")?.value ?? "", ["^.{1,}$"], ["請選擇司機姓名"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsAddPage", "Name")?.value ?? "", ["^.{1,}$"], ["請選擇司機姓名"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsAddPage", "CanAssign")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsAddPage", "CanAssign")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]
                                    }
                                    else if (valid(globalContextService.get("CarsAddPage", "FactoryYM") ?? "", ["^.{1,}$"], ["請選擇出廠年月"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsAddPage", "FactoryYM") ?? "", ["^.{1,}$"], ["請選擇出廠年月"])[1]
                                    }
                                    // else if (valid(globalContextService.get("CarsAddPage", "CheckCarDate") ?? "", ["^.{1,}$"], ["請選擇最後驗車日"])[1]) {
                                    //     validMsg = valid(globalContextService.get("CarsAddPage", "CheckCarDate") ?? "", ["^.{1,}$"], ["請選擇最後驗車日"])[1]
                                    // }
                                    // else if (valid(globalContextService.get("CarsAddPage", "CarReview") ?? "", ["^.{1,}$"], ["請選擇車輛審核"])[1]) {
                                    //     validMsg = valid(globalContextService.get("CarsAddPage", "CarReview") ?? "", ["^.{1,}$"], ["請選擇車輛審核"])[1]
                                    // }
                                    // 車輛設備 未確定
                                    else if (valid(globalContextService.get("CarsAddPage", "CarDealership")?.value ?? "", ["^.{1,}$"], ["請選擇車行"])[1]) {
                                        validMsg = valid(globalContextService.get("CarsAddPage", "CarDealership")?.value ?? "", ["^.{1,}$"], ["請選擇車行"])[1]
                                    }
                                    // else if (
                                    //     (globalContextService.get("CarsAddPage", "DriverLicenseListCheckedRowKeys") ?? [])
                                    //         .map((id) => {
                                    //             return valid(globalContextService.get("CarsAddPage", `LicenseExpiryDate${id}`) ?? "", ["^.{1,}$"], ["請選擇證照到期日"])[1]
                                    //         })
                                    //         .includes("請選擇證照到期日")
                                    // ) {
                                    //     validMsg = "請選擇證照到期日";
                                    // }
                                    else if (
                                        (globalContextService.get("CarsAddPage", "CarInsuranceListCheckedRowKeys") ?? [])
                                            .map((id) => {
                                                return valid(globalContextService.get("CarsAddPage", `InsuranceExpiryDate${id}`) ?? "", ["^.{1,}$"], ["請選擇保險到期日"])[1]
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
                                        props.AddCarExecute({
                                            // id 新增不須上送此欄位
                                            orgId: globalContextService.get("CarsAddPage", "CarDealership")?.value, // 車行
                                            driverInfoId: globalContextService.get("CarsAddPage", "Name")?.value, // 司機名對應 id
                                            carCategoryId: globalContextService.get("CarsAddPage", "CarType")?.value, // 車輛類別 id
                                            carCategoryName: globalContextService.get("CarsAddPage", "CarType")?.label, // 車輛類別名 
                                            carNo: globalContextService.get("CarsAddPage", "CarNumber"), // 車牌號碼
                                            // "carPic": "string", // 圖片 未確定
                                            carTop: globalContextService.get("CarsAddPage", "CarHeight"), // 車身高度
                                            factoryType: globalContextService.get("CarsAddPage", "BrandModel"), // 廠牌型號
                                            carFrom: globalContextService.get("CarsAddPage", "CarFrom")?.value, // 車輛來源
                                            donationUnit: globalContextService.get("CarsAddPage", "DonateUnit"), // 捐贈＆獎助單位
                                            carColor: globalContextService.get("CarsAddPage", "CarColor"), // 車身顏色
                                            wheelchairNum: globalContextService.get("CarsAddPage", "WheelchairCount"), // 輪椅數量
                                            seatNum: globalContextService.get("CarsAddPage", "Seat"), // 座椅數量
                                            makeDate: globalContextService.get("CarsAddPage", "FactoryYM"), // 出廠年月
                                            lastCheckDate: globalContextService.get("CarsAddPage", "CheckCarDate"), // 最後驗車日
                                            status: globalContextService.get("CarsAddPage", "CanAssign")?.value, // 可否派發
                                            remark: globalContextService.get("CarsAddPage", "DriverNote"), // 備註
                                            // carLicenses: (globalContextService.get("CarsAddPage", "DriverLicenseListCheckedRowsData") ?? []).map((item) => {
                                            //     return { categoryId: item?.id, categoryName: item?.name, expireDate: globalContextService.get("CarsAddPage", `LicenseExpiryDate${item?.id}`) }
                                            // }),
                                            carLicenses: [],
                                            carInsurances: (globalContextService.get("CarsAddPage", "CarInsuranceListCheckedRowsData") ?? []).map((item) => {
                                                return { categoryId: item?.id, categoryName: item?.name, expireDate: globalContextService.get("CarsAddPage", `InsuranceExpiryDate${item?.id}`) }
                                            }),
                                            carDevices: (globalContextService.get("CarsAddPage", "CarEquipment") ?? []).map((item) => {
                                                return { categoryId: props?.Device.filter(d => d?.id === item)[0]?.id, categoryName: props?.Device.filter(d => d?.id === item)[0]?.name, }
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
                        theme={laptopL.baseContainer}
                    >
                        {/* 上傳車輛圖片容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptopL.carImgFormContainer}
                        >
                            <FormRow>
                                {/* 上傳車輛圖片 */}
                                <Upload
                                    // imageUrl={"/logo192.png"}
                                    theme={laptopL.carImgUpload}
                                />
                            </FormRow>
                        </FormContainer>

                        {/* 基本資料右方容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptopL.baseRightFormContainer}
                        >
                            <FormRow>

                                {/* 車牌號碼 CarNumber */}
                                <TextInput
                                    topLabel={<>車牌號碼<Text theme={laptopL.carNumberRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsAddPage", "CarNumber") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsAddPage", "CarNumber", value);
                                    }}
                                    theme={laptopL.carNumber}
                                />

                                {/* 車輛類別 CarType */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>車輛類別<Text theme={laptopL.carTypeRequired}>(必填)</Text></>}
                                    //viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("CarsAddPage", "CarType") ?? {}}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsAddPage", "CarType", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇車輛類別", isDisabled: true },
                                        ...props?.CarType
                                    ]}
                                    // menuPosition={true}
                                    theme={laptopL.carType}
                                />

                                {/* 車身顏色 CarColor */}
                                <TextInput
                                    topLabel={<>車身顏色<Text theme={laptopL.carColorRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsAddPage", "CarColor") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsAddPage", "CarColor", value);
                                    }}
                                    theme={laptopL.carColor}
                                />

                                {/* 廠牌型號 BrandModel */}
                                <TextInput
                                    topLabel={<>廠牌型號<Text theme={laptopL.brandModelRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsAddPage", "BrandModel") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsAddPage", "BrandModel", value);
                                    }}
                                    theme={laptopL.brandModel}
                                />

                                {/* 車輛來源 CarFrom */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>車輛來源<Text theme={laptopL.carFromRequired}>(必填)</Text></>}
                                    //viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("CarsAddPage", "CarFrom") ?? {}}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        if (value.label ?? "" !== "") {
                                            if (value.label !== '自購') {
                                                if (value.label !== globalContextService.get("CarsAddPage", "CarFrom")?.label) {
                                                    setForceUpdate(f => !f); // 剛選擇 獎助 或 捐贈 時，重新渲染
                                                }
                                            }
                                            else if (globalContextService.get("CarsAddPage", "CarFrom")?.label !== '自購') {
                                                setForceUpdate(f => !f); // 剛選擇 獎助 或 捐贈 時，重新渲染
                                            }
                                        }
                                        globalContextService.set("CarsAddPage", "CarFrom", value);

                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇車輛來源", isDisabled: true },
                                        ...carFromSelectOption
                                    ]}
                                    // menuPosition={true}
                                    theme={laptopL.carFrom}
                                />

                                {/* 捐贈＆獎助單位 DonateUnit */}
                                <TextInput
                                    topLabel={
                                        <>捐贈＆獎助單位
                                            {
                                                (!isNil(globalContextService.get("CarsAddPage", "CarFrom")?.label)
                                                    &&
                                                    globalContextService.get("CarsAddPage", "CarFrom")?.label !== '自購'
                                                )
                                                &&
                                                <Text theme={laptopL.donateUnitRequired}>(必填)</Text>

                                            }
                                        </>
                                    }
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsAddPage", "DonateUnit") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsAddPage", "DonateUnit", value);
                                    }}
                                    theme={laptopL.donateUnit}
                                />

                                {/* 座椅數量 Seat */}
                                <NumberInput
                                    // viewType
                                    // disable
                                    topLabel={<>座椅數量<Text theme={laptopL.seatRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    min={0}
                                    value={globalContextService.get("CarsAddPage", "Seat")}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsAddPage", "Seat", value);
                                    }}
                                    theme={laptopL.seat}
                                />

                                {/* 輪椅數量 WheelchairCount */}
                                <NumberInput
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={"輪椅數量"}
                                    // viewType
                                    // disable
                                    placeholder={""}
                                    min={0}
                                    value={globalContextService.get("CarsAddPage", "WheelchairCount")}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsAddPage", "WheelchairCount", value);
                                    }}
                                    theme={laptopL.wheelchairCount}
                                />

                                {/* 車身高度 CarHeight */}
                                <TextInput
                                    topLabel={<>車身高度(公尺)</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CarsAddPage", "CarHeight") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsAddPage", "CarHeight", value);
                                    }}
                                    theme={laptopL.carHeight}
                                />

                            </FormRow>
                        </FormContainer>

                        {/* 基本資料下方容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptopL.baseBottomFormContainer}
                        >
                            <FormRow>
                                {/* 司機姓名 Name */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>司機姓名<Text theme={laptopL.nameRequired}>(必填)</Text></>}
                                    //viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("CarsAddPage", "Name") ?? {}}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsAddPage", "Name", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇司機姓名", isDisabled: true },
                                        ...props?.Drivers
                                    ]}
                                    // menuPosition={true}
                                    theme={laptopL.name}
                                />

                                {/* 可否派發 CanAssign */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>可否派發<Text theme={laptopL.canAssignRequired}>(必填)</Text></>}
                                    //viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("CarsAddPage", "CanAssign") ?? { value: 0, label: '不可派發' }}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsAddPage", "CanAssign", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇可否派發", isDisabled: true },
                                        { value: 1, label: '可派發' },
                                        { value: 0, label: '不可派發' }
                                    ]}
                                    // menuPosition={true}
                                    theme={laptopL.canAssign}
                                />

                                {/* 出廠年月 FactoryYM */}
                                <DateTimePicker
                                    topLabel={<>出廠年月<Text theme={laptopL.canAssignRequired}>(必填)</Text></>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"month"}
                                    format={"YYYY-MM"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("CarsAddPage", `FactoryYM`) ?
                                            moment(globalContextService.get("CarsAddPage", `FactoryYM`), "YYYY-MM")
                                            :
                                            null
                                        )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("CarsAddPage", `FactoryYM`, value);
                                    }}
                                    theme={laptopL.factoryYM}
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
                                        (globalContextService.get("CarsAddPage", `CheckCarDate`) ?
                                            moment(globalContextService.get("CarsAddPage", `CheckCarDate`), "YYYY-MM-DD")
                                            :
                                            null
                                        )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("CarsAddPage", `CheckCarDate`, value);
                                    }}
                                    theme={laptopL.checkCarDate}
                                />

                                {/* 車輛審核 CarReview */}
                                <Radio
                                    // viewType
                                    // disable
                                    topLabel={"車輛審核"}
                                    value={1}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsAddPage", "CarReview", value);
                                        // console.log(globalContextService.get("CarsAddPage", "CarReview"));
                                    }}
                                    theme={laptopL.carReview}
                                >
                                    {/* 車輛審核 CarReview  選項 */}
                                    <RadioItem value={1} >是</RadioItem>
                                    <RadioItem value={0} >否</RadioItem>
                                </Radio>

                                {/* 車輛設備 CarEquipment */}
                                <Checkbox
                                    // viewType
                                    checked={globalContextService.get("CarsAddPage", "CarEquipment") ?? []}
                                    // disable
                                    topLabel={"車輛設備"}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsAddPage", "CarEquipment", value);
                                        // console.log(globalContextService.get("CarsAddPage", "CarEquipment"));
                                    }}
                                    theme={laptopL.carEquipment}
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
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>車行<Text theme={laptopL.carDealershipRequired}>(必填)</Text></>}
                                    //viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("CarsAddPage", "CarDealership") ?? {}}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("CarsAddPage", "CarDealership", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇車行", isDisabled: true },
                                        ...(props?.Orgs ?? [])
                                    ]}
                                    // menuPosition={true}
                                    theme={laptopL.carDealership}
                                />

                            </FormRow>

                        </FormContainer>

                    </BasicContainer>

                    {/* 備註 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"備註"}
                        theme={laptopL.driverNoteSubTitleBar}
                    />

                    {/* 備註表單區域容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.driverNoteContainer}
                    >
                        <FormRow>
                            {/* 備註 DriverNote */}
                            <Textarea
                                baseDefaultTheme={"DefaultTheme"}
                                placeholder={""}
                                value={globalContextService.get("CarsAddPage", "DriverNote") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CarsAddPage", "DriverNote", value);
                                    // console.log(value)
                                }}
                                theme={laptopL.driverNote}
                            />
                        </FormRow>
                    </FormContainer>

                    {/* 保險 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"保險"}
                        theme={laptopL.driverInsuranceSubTitleBar}
                    />

                    {/* 保險 List區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        length={props.Insurance?.data?.length}
                        theme={laptopL.driverInsuranceListContainer}
                    >

                        {/* 保險 List */}
                        <OldList
                            checkbox={true}
                            checked={globalContextService.get("CarsAddPage", "CarInsuranceListCheckedRowKeys")}
                            checkedRowKeyName={"id"}
                            checkboxOnChecked={
                                (checkedRowKeys, checkedRows) => {
                                    // console.log(`已選擇的RowKeys: ${checkedRowKeys}`, '對應已選擇的RowKeys當列資料: ', checkedRows);
                                    globalContextService.set("CarsAddPage", "CarInsuranceListCheckedRowKeys", checkedRowKeys);
                                    globalContextService.set("CarsAddPage", "CarInsuranceListCheckedRowsData", checkedRows);

                                    //#region 取消勾選項時 清空對應欄位資料
                                    // let data = [
                                    //     { id: "passenger", insuranceType: "乘客險" },
                                    //     { id: "thirdLiability", insuranceType: "第三責任險" },
                                    //     { id: "compulsory", insuranceType: "強制險" }
                                    // ];
                                    let data = props.Insurance?.data;

                                    (data ?? []).forEach(item => {

                                        if (!(checkedRowKeys ?? []).includes(item?.id)) {
                                            globalContextService.remove("CarsAddPage", `InsuranceExpiryDate${item?.id}`);
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
                                        title: <>保險到期日<Text theme={laptopL.insuranceExpiryDateRequired}>(有該保險則為必填)</Text></>,
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
                                                        disable={!(globalContextService.get("CarsAddPage", "CarInsuranceListCheckedRowKeys") ?? []).includes(rowData?.id)}
                                                        bascDefaultTheme={"DefaultTheme"}
                                                        // viewType
                                                        isSearchable
                                                        placeholder={""}
                                                        value={
                                                            (globalContextService.get("CarsAddPage", `InsuranceExpiryDate${rowData?.id}`) ?
                                                                moment(globalContextService.get("CarsAddPage", `InsuranceExpiryDate${rowData?.id}`), "YYYY-MM-DD")
                                                                :
                                                                null
                                                            )
                                                        }
                                                        onChange={(value, momentObj) => {
                                                            globalContextService.set("CarsAddPage", `InsuranceExpiryDate${rowData?.id}`, value);
                                                        }}
                                                        theme={laptopL.insuranceExpiryDate}
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
                        theme={laptopL.bottomSaveButtonContainer}
                    >
                        {/* 底部儲存按鈕 列容器 */}
                        <FormRow
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptopL.bottomSaveButtonRowContainer}
                        >
                            {/*  底部儲存按鈕 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 底部儲存按鈕 */}
                                <BasicButton
                                    baseDefaultTheme={"PrimaryTheme"}
                                    text={"儲存"}
                                    theme={laptopL.bottomSaveButton}
                                    onClick={() => {
                                        //#region 表單驗證
                                        let validMsg = "";
                                        if (valid(globalContextService.get("CarsAddPage", "CarNumber") ?? "", ["^.{1,}$", "^[A-Za-z0-9-]{0,}$"], ["請輸入車牌號碼", "車牌號碼，限定輸入半形英數與 '-'"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsAddPage", "CarNumber") ?? "", ["^.{1,}$", "^[A-Za-z0-9-]{0,}$"], ["請輸入車牌號碼", "車牌號碼，限定輸入半形英數與 '-'"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsAddPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車輛類別"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsAddPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車輛類別"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsAddPage", "CarColor") ?? "", ["^.{1,}$"], ["請輸入車身顏色"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsAddPage", "CarColor") ?? "", ["^.{1,}$"], ["請輸入車身顏色"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsAddPage", "BrandModel") ?? "", ["^.{1,}$"], ["請輸入廠牌型號"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsAddPage", "BrandModel") ?? "", ["^.{1,}$"], ["請輸入廠牌型號"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsAddPage", "CarFrom")?.value ?? "", ["^.{1,}$"], ["請選擇車輛來源"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsAddPage", "CarFrom")?.value ?? "", ["^.{1,}$"], ["請選擇車輛來源"])[1]
                                        }
                                        else if (
                                            (
                                                globalContextService.get("CarsAddPage", "CarFrom")?.label !== '自購'
                                                &&
                                                valid(globalContextService.get("CarsAddPage", "DonateUnit") ?? "", ["^.{1,}$"], ["請輸入捐贈＆獎助單位"])[1]
                                            )
                                        ) {
                                            validMsg = valid(globalContextService.get("CarsAddPage", "DonateUnit") ?? "", ["^.{1,}$"], ["請輸入捐贈＆獎助單位"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsAddPage", "Seat") ?? "", ["^.{1,}$"], ["請輸入座椅數量"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsAddPage", "Seat") ?? "", ["^.{1,}$"], ["請輸入座椅數量"])[1]
                                        }
                                        // else if (valid(globalContextService.get("CarsAddPage", "WheelchairCount") ?? "", ["^.{1,}$"], ["請輸入輪椅數量"])[1]) {
                                        //     validMsg = valid(globalContextService.get("CarsAddPage", "WheelchairCount") ?? "", ["^.{1,}$"], ["請輸入輪椅數量"])[1]
                                        // }
                                        else if (valid(globalContextService.get("CarsAddPage", "CarHeight") ?? "", ["^[0-9]{0,}(.[0-9]+)?$"], ["車身高度，限定輸入半形數字與 '.'"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsAddPage", "CarHeight") ?? "", ["^[0-9]{0,}(.[0-9]+)?$"], ["車身高度，限定輸入半形數字與 '.'"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsAddPage", "Name")?.value ?? "", ["^.{1,}$"], ["請選擇司機姓名"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsAddPage", "Name")?.value ?? "", ["^.{1,}$"], ["請選擇司機姓名"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsAddPage", "CanAssign")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsAddPage", "CanAssign")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]
                                        }
                                        else if (valid(globalContextService.get("CarsAddPage", "FactoryYM") ?? "", ["^.{1,}$"], ["請選擇出廠年月"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsAddPage", "FactoryYM") ?? "", ["^.{1,}$"], ["請選擇出廠年月"])[1]
                                        }
                                        // else if (valid(globalContextService.get("CarsAddPage", "CheckCarDate") ?? "", ["^.{1,}$"], ["請選擇最後驗車日"])[1]) {
                                        //     validMsg = valid(globalContextService.get("CarsAddPage", "CheckCarDate") ?? "", ["^.{1,}$"], ["請選擇最後驗車日"])[1]
                                        // }
                                        // else if (valid(globalContextService.get("CarsAddPage", "CarReview") ?? "", ["^.{1,}$"], ["請選擇車輛審核"])[1]) {
                                        //     validMsg = valid(globalContextService.get("CarsAddPage", "CarReview") ?? "", ["^.{1,}$"], ["請選擇車輛審核"])[1]
                                        // }
                                        // 車輛設備 未確定
                                        else if (valid(globalContextService.get("CarsAddPage", "CarDealership")?.value ?? "", ["^.{1,}$"], ["請選擇車行"])[1]) {
                                            validMsg = valid(globalContextService.get("CarsAddPage", "CarDealership")?.value ?? "", ["^.{1,}$"], ["請選擇車行"])[1]
                                        }
                                        // else if (
                                        //     (globalContextService.get("CarsAddPage", "DriverLicenseListCheckedRowKeys") ?? [])
                                        //         .map((id) => {
                                        //             return valid(globalContextService.get("CarsAddPage", `LicenseExpiryDate${id}`) ?? "", ["^.{1,}$"], ["請選擇證照到期日"])[1]
                                        //         })
                                        //         .includes("請選擇證照到期日")
                                        // ) {
                                        //     validMsg = "請選擇證照到期日";
                                        // }
                                        else if (
                                            (globalContextService.get("CarsAddPage", "CarInsuranceListCheckedRowKeys") ?? [])
                                                .map((id) => {
                                                    return valid(globalContextService.get("CarsAddPage", `InsuranceExpiryDate${id}`) ?? "", ["^.{1,}$"], ["請選擇保險到期日"])[1]
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
                                            props.AddCarExecute({
                                                // id 新增不須上送此欄位
                                                orgId: globalContextService.get("CarsAddPage", "CarDealership")?.value, // 車行
                                                driverInfoId: globalContextService.get("CarsAddPage", "Name")?.value, // 司機名對應 id
                                                carCategoryId: globalContextService.get("CarsAddPage", "CarType")?.value, // 車輛類別 id
                                                carCategoryName: globalContextService.get("CarsAddPage", "CarType")?.label, // 車輛類別名 
                                                carNo: globalContextService.get("CarsAddPage", "CarNumber"), // 車牌號碼
                                                // "carPic": "string", // 圖片 未確定
                                                carTop: globalContextService.get("CarsAddPage", "CarHeight"), // 車身高度
                                                factoryType: globalContextService.get("CarsAddPage", "BrandModel"), // 廠牌型號
                                                carFrom: globalContextService.get("CarsAddPage", "CarFrom")?.value, // 車輛來源
                                                donationUnit: globalContextService.get("CarsAddPage", "DonateUnit"), // 捐贈＆獎助單位
                                                carColor: globalContextService.get("CarsAddPage", "CarColor"), // 車身顏色
                                                wheelchairNum: globalContextService.get("CarsAddPage", "WheelchairCount"), // 輪椅數量
                                                seatNum: globalContextService.get("CarsAddPage", "Seat"), // 座椅數量
                                                makeDate: globalContextService.get("CarsAddPage", "FactoryYM"), // 出廠年月
                                                lastCheckDate: globalContextService.get("CarsAddPage", "CheckCarDate"), // 最後驗車日
                                                status: globalContextService.get("CarsAddPage", "CanAssign")?.value, // 可否派發
                                                remark: globalContextService.get("CarsAddPage", "DriverNote"), // 備註
                                                // carLicenses: (globalContextService.get("CarsAddPage", "DriverLicenseListCheckedRowsData") ?? []).map((item) => {
                                                //     return { categoryId: item?.id, categoryName: item?.name, expireDate: globalContextService.get("CarsAddPage", `LicenseExpiryDate${item?.id}`) }
                                                // }),
                                                carLicenses: [],
                                                carInsurances: (globalContextService.get("CarsAddPage", "CarInsuranceListCheckedRowsData") ?? []).map((item) => {
                                                    return { categoryId: item?.id, categoryName: item?.name, expireDate: globalContextService.get("CarsAddPage", `InsuranceExpiryDate${item?.id}`) }
                                                }),
                                                carDevices: (globalContextService.get("CarsAddPage", "CarEquipment") ?? []).map((item) => {
                                                    return { categoryId: props?.Device.filter(d => d?.id === item)[0]?.id, categoryName: props?.Device.filter(d => d?.id === item)[0]?.name, }
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

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`