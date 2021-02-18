import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../ProjectComponent';
import { ReactComponent as Convert } from '../../../../Assets/img/DayCareEditPage/Convert.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService, Container, NewSelector } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption, notDistributableReasonSelectOption, weekDayChMapping } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';
import { fmt } from '../../../../Handlers/DateHandler';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { dayCareEdit: { rwd: { tablet } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [BoonTypeEdit, setBoonTypeEdit] = useState(true); // 供強制刷新組件

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
                            titleText={"日照個案基本資料編輯"}
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
                                        history.goBack();
                                        props.controllGCS("return")
                                    }}
                                >
                                    回上一頁
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
                                    if (valid(globalContextService.get("DayCareEditPage", "CaseNumber") ?? "", ["^.{1,}$"], ["請輸入案號"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareEditPage", "CaseNumber") ?? "", ["^.{1,}$"], ["請輸入案號"])[1]
                                    }
                                    else if (
                                        (
                                            valid(globalContextService.get("DayCareEditPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                            &&
                                            valid(globalContextService.get("DayCareEditPage", "Telephone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                        )
                                    ) {
                                        validMsg = valid(globalContextService.get("DayCareEditPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareEditPage", "DayCareCenter")?.value ?? "", ["^.{1,}$"], ["請選擇日照中心"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareEditPage", "DayCareCenter")?.value ?? "", ["^.{1,}$"], ["請選擇日照中心"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareEditPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareEditPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareEditPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareEditPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareEditPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareEditPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareEditPage", "FirstTravelDate") ?? "", ["^.{1,}$"], ["請輸入首次乘車日"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareEditPage", "FirstTravelDate") ?? "", ["^.{1,}$"], ["請輸入首次乘車日"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareEditPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareEditPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]
                                    }
                                    //#endregion

                                    //#region 表單驗證後動作
                                    if (validMsg !== "") {
                                        // console.log(validMsg, globalContextService.get("DayCareEditPage"))
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

                        {/* 基本資料容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={tablet.baseFormContainer}
                        >
                            <FormRow>

                                {/* 姓名 Name */}
                                <TextInput
                                    viewType
                                    topLabel={<>姓名</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DayCareEditPage", "Name") ?? props.Client?.name}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DayCareEditPage", "Name", value);
                                    }}
                                    theme={tablet.name}
                                />

                                {/* 生日 Birthday */}
                                <DateTimePicker
                                    topLabel={<>生日</>}
                                    // type={"time"} // time、date、week、month、quarter、year
                                    type={"date"}
                                    format={"YYYY-MM-DD"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        // (globalContextService.get("DayCareEditPage", `Birthday`) ?
                                        //     moment(globalContextService.get("DayCareEditPage", `Birthday`), "YYYY-MM-DD")
                                        //     :
                                        (props.Client?.birthday) ?
                                            moment(props.Client.birthday, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                        // )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("DayCareEditPage", `Birthday`, value);
                                    }}
                                    theme={tablet.birthday}
                                />

                                {/* 性別 Sex */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>性別</>}
                                    viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={
                                        // globalContextService.get("DayCareEditPage", "Sex") ?? { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                        (!isNil(props.Client?.sex)) ?
                                            { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                            :
                                            null
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log("value", value)
                                        globalContextService.set("DayCareEditPage", "Sex", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇性別", isDisabled: true },
                                        { value: 1, label: '男' },
                                        { value: 0, label: '女' }
                                    ]}
                                    // menuPosition={true}
                                    theme={tablet.sex}
                                />

                                {/* 身分證字號 Uid */}
                                <TextInput
                                    viewType
                                    topLabel={<>身分證字號</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DayCareEditPage", "Uid") ?? props.Client?.uid}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DayCareEditPage", "Uid", value);
                                    }}
                                    theme={tablet.uid}
                                />

                                {/* 手機 Cellphone */}
                                <TextInput
                                    viewType
                                    topLabel={<>手機</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DayCareAddPage", "Cellphone") ?? props.Client?.phone}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DayCareAddPage", "Cellphone", value);
                                    }}
                                    theme={tablet.cellphone}
                                />

                            </FormRow>
                        </FormContainer>
                    </BasicContainer>

                    {/* 日照個案資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"日照個案資料"}
                        theme={tablet.dayCareDataSubTitleBar}
                    />

                    {/* 日照個案資料容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.dayCareDataContainer}
                    >
                        <FormRow>

                            {/* 案號 CaseNumber */}
                            <TextInput
                                topLabel={<>案號<Text theme={tablet.caseNumberRequired}>(必填)</Text></>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareEditPage", "CaseNumber") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareEditPage", "CaseNumber", value);
                                }}
                                theme={tablet.caseNumber}
                            />

                            {/* 市話 Telephone */}
                            <TextInput
                                topLabel={<>市話<Text theme={tablet.telephoneRequired}>(手機、市話擇一輸入)</Text></>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("DayCareEditPage", "Telephone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareEditPage", "Telephone", value);
                                }}
                                theme={tablet.telephone}
                            />

                            {/* 日照中心 DayCareCenter */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>日照中心<Text theme={tablet.dayCareCenterRequired}>(必填)</Text></>}
                                bottomLabel={""}
                                //viewType
                                isSearchable
                                placeholder={"請選擇日照中心"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("DayCareEditPage", "DayCareCenter") ?? null}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("DayCareEditPage", "DayCareCenter", value);
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇日照中心", isDisabled: true },
                                    { value: '1', label: "A中心" },
                                    { value: '2', label: "B中心" },
                                    { value: '3', label: "C中心" },
                                ]}
                                // menuPosition={true}
                                theme={tablet.dayCareCenter}
                            />

                        </FormRow>

                        <FormRow>
                            {/* 居住地(縣市) County */}
                            <NewSelector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>居住地<Text theme={tablet.countyRequired}>(必填)</Text></>}
                                //viewType
                                isSearchable
                                placeholder={"請選擇居住縣市"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={
                                    globalContextService.get("DayCareEditPage", "County") ??
                                    (
                                        (!isNil(props.CaseUsers?.county)) ?
                                            {
                                                value: props.CaseUsers.county,
                                                label: props.CaseUsers.county,
                                            }
                                            :
                                            null
                                    )
                                }
                                onChange={(e, value, onInitial) => {
                                    // globalContextService.set("DayCareEditPage", "County", value);
                                    // console.log("請選擇居住縣市", value, globalContextService.get("DayCareEditPage", "County"))
                                    if (!isEqual(value, globalContextService.get("DayCareEditPage", "County"))) {
                                        globalContextService.set("DayCareEditPage", "County", value);
                                        globalContextService.set("DayCareEditPage", "District", { value: 'hint', label: "請選擇居住區域", isDisabled: true });
                                        setForceUpdate(f => !f);
                                    }
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇居住縣市", isDisabled: true },
                                    ...Counties
                                ]}
                                // menuPosition={true}
                                theme={tablet.county}
                            />

                            {/* 居住地(區域) District */}
                            <NewSelector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={
                                    <Text theme={tablet.convertContainer}
                                        onClick={() => { console.log("轉換經緯度") }}
                                    >
                                        <Convert style={tablet.convertContainerIcon} />
                                            轉換經緯度
                                         </Text>
                                }
                                //viewType
                                isSearchable
                                placeholder={"請選擇居住區域"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={
                                    globalContextService.get("DayCareEditPage", "District") ??
                                    (
                                        (!isNil(props.CaseUsers?.district)) ?
                                            {
                                                value: props.CaseUsers.district,
                                                label: props.CaseUsers.district,
                                            }
                                            :
                                            null
                                    )
                                }
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("DayCareEditPage", "District", value);
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇居住區域", isDisabled: true },
                                    ...(
                                        !isNil(globalContextService.get("DayCareEditPage", "County")) ?
                                            cityAndCountiesLite[globalContextService.get("DayCareEditPage", "County")?.value]
                                            :
                                            []
                                    )
                                ]}
                                // menuPosition={true}
                                theme={tablet.district}
                            />

                            {/* 經度 Longitude */}
                            <TextInput
                                // viewType
                                // topLabel={"經度"}
                                topLabel={<>經度<Text theme={tablet.longitudeRequired}>(必填)</Text></>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareEditPage", "Longitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareEditPage", "Longitude0", value);
                                }}
                                theme={tablet.longitude}
                            />

                            {/* 緯度 Latitude */}
                            <TextInput
                                // viewType
                                // topLabel={"緯度"}
                                topLabel={<>緯度<Text theme={tablet.latitudeRequired}>(必填)</Text></>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareEditPage", "Latitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareEditPage", "Latitude0", value);
                                }}
                                theme={tablet.latitude}
                            />

                            {/* 居住地(地址) Address */}
                            <TextInput
                                topLabel={""}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"請輸入居住地址"}
                                bottomLabel={"為避免無法成功預約訂車，門牌號碼及巷弄請使用半形數字，且勿填寫樓層及備註"}
                                value={globalContextService.get("DayCareEditPage", "Address") ?? props.CaseUsers?.addr}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareEditPage", "Address", value);
                                }}
                                theme={tablet.address}
                            />

                        </FormRow>
                    </FormContainer>

                    {/* 輪住地址區域表單組件 !! 暫時不用 */}
                    {/* <TurnAddressComponents /> */}

                    {/* 包月服務 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"包月服務"}
                        theme={tablet.monthlySubscriptionSubTitleBar}
                    />

                    {/* 包月服務區域容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.monthlySubscriptionContainer}
                    >
                        <FormRow>

                            {/* 當趟費用 TripFee */}
                            <TextInput
                                // viewType
                                // topLabel={"緯度"}
                                topLabel={<>當趟費用</>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareEditPage", "TripFee") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareEditPage", "TripFee", value);
                                }}
                                theme={tablet.tripFee}
                            />

                            {/* 首次乘車日 FirstTravelDate */}
                            <DateTimePicker
                                topLabel={<>首次乘車日<Text theme={tablet.firstTracelDateRequired}>(必填)</Text></>}
                                // type={"time"} time、date、week、month、quarter、year
                                type={"date"}
                                format={"YYYY-MM-DD"}
                                bascDefaultTheme={"DefaultTheme"}
                                // viewType
                                isSearchable
                                placeholder={""}
                                value={
                                    (globalContextService.get("DayCareEditPage", "FirstTravelDate")) ?
                                        moment(globalContextService.get("DayCareEditPage", "FirstTravelDate"), "YYYY-MM-DD HH:mm:ss")
                                        :
                                        null
                                }
                                onChange={(value, momentObj) => {
                                    globalContextService.set("DayCareEditPage", "FirstTravelDate", value);
                                }}
                                theme={tablet.firstTravelDate}
                            />

                            {/* 是否需要踏板 PedalReview */}
                            <Radio
                                // viewType
                                // disable
                                topLabel={"是否需要踏板"}
                                value={globalContextService.get("DayCareEditPage", "PedalReview") ?? 1}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("DayCareEditPage", "PedalReview", value);
                                    // console.log(globalContextService.get("DayCareEditPage", "CarReview"));
                                }}
                                theme={tablet.pedalReview}
                            >
                                {/* 是否需要踏板 PedalReview   選項 */}
                                <RadioItem value={1} >是</RadioItem>
                                <RadioItem value={0} >否</RadioItem>
                            </Radio>

                            {/* 輪椅選擇 Wheelchair */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>輪椅選擇<Text theme={tablet.wheelchairRequired}>(必填)</Text></>}
                                bottomLabel={""}
                                //viewType
                                isSearchable
                                placeholder={"請選擇輪椅"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("DayCareEditPage", "Wheelchair") ?? null}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("DayCareEditPage", "Wheelchair", value);
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇輪椅", isDisabled: true },
                                    { value: '1', label: "A輪椅" },
                                    { value: '2', label: "B輪椅" },
                                    { value: '3', label: "C輪椅" },
                                ]}
                                // menuPosition={true}
                                theme={tablet.wheelchair}
                            />

                            {/* 前往日照容器 */}
                            <Container>
                                {/* 前往日照 GoToCenterReview */}
                                <Radio
                                    // viewType
                                    // disable
                                    topLabel={"前往日照"}
                                    value={globalContextService.get("DayCareEditPage", "GoToCenterReview") ?? 1}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareEditPage", "GoToCenterReview", value);
                                        // console.log(globalContextService.get("DayCareEditPage", "CarReview"));
                                    }}
                                    theme={tablet.goToCenterReview}
                                >
                                    {/* 前往日照 GoToCenterReview  選項 */}
                                    <RadioItem value={1} >是</RadioItem>
                                    <RadioItem value={0} >否</RadioItem>
                                </Radio>

                                {/* 前往日照 日期選擇 GoDateChoiceEquipment */}
                                <Checkbox
                                    // viewType
                                    checked={globalContextService.get("DayCareEditPage", "GoDateChoiceEquipment") ?? []}
                                    // disable
                                    topLabel={"日期選擇"}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareEditPage", "GoDateChoiceEquipment", value);
                                        // console.log(globalContextService.get("DayCareEditPage", "CarEquipment"));
                                    }}
                                    theme={tablet.goDateChoiceEquipment}
                                >

                                    {/* 日期選擇 GoDateChoiceEquipment  選項 */}
                                    {Object.keys(weekDayChMapping).map((key) => {
                                        return (
                                            <CheckboxItem key={key} value={weekDayChMapping[key]} >{weekDayChMapping[key]}</CheckboxItem>
                                        )
                                    })}
                                </Checkbox>

                                {/* 前往日照 車趟出發時間 GoDepartureTime */}
                                <DateTimePicker
                                    topLabel={<>車趟出發時間</>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"time"}
                                    format={"HH:mm"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("DayCareEditPage", "GoDepartureTime")) ?
                                            moment(globalContextService.get("DayCareEditPage", "GoDepartureTime"), "HH:mm")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("DayCareEditPage", "GoDepartureTime", value);
                                    }}
                                    theme={tablet.goDepartureTime}
                                />

                                {/* 個案上車時間 BoardingTime */}
                                <DateTimePicker
                                    topLabel={<>個案上車時間</>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"time"}
                                    format={"HH:mm"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("DayCareEditPage", "BoardingTime")) ?
                                            moment(globalContextService.get("DayCareEditPage", "BoardingTime"), "HH:mm")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("DayCareEditPage", "BoardingTime", value);
                                    }}
                                    theme={tablet.boardingTime}
                                />

                                {/* 去程車號 GoCarNumber */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>去程車號</>}
                                    bottomLabel={""}
                                    //viewType
                                    isSearchable
                                    placeholder={"請選擇車號"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("DayCareEditPage", "GoCarNumber") ?? null}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareEditPage", "GoCarNumber", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇車號", isDisabled: true },
                                        { value: '1', label: "ABC-1111" },
                                        { value: '2', label: "ZZZ-8888" },
                                        { value: '3', label: "XXX-123" },
                                    ]}
                                    // menuPosition={true}
                                    theme={tablet.goCarNumber}
                                />

                            </Container>

                            {/* 返回住家容器 */}
                            <Container>
                                {/* 返回住家 BackToHomeReview */}
                                <Radio
                                    // viewType
                                    // disable
                                    topLabel={"返回住家"}
                                    value={globalContextService.get("DayCareEditPage", "BackToHomeReview") ?? 1}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareEditPage", "BackToHomeReview", value);
                                        // console.log(globalContextService.get("DayCareEditPage", "CarReview"));
                                    }}
                                    theme={tablet.backToHomeReview}
                                >
                                    {/* 返回住家 BackToHome */}
                                    <RadioItem value={1} >是</RadioItem>
                                    <RadioItem value={0} >否</RadioItem>
                                </Radio>

                                {/* 返回住家 日期選擇 BackDateChoiceEquipment */}
                                <Checkbox
                                    // viewType
                                    checked={globalContextService.get("DayCareEditPage", "BackDateChoiceEquipment") ?? []}
                                    // disable
                                    topLabel={"日期選擇"}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareEditPage", "BackDateChoiceEquipment", value);
                                        // console.log(globalContextService.get("DayCareEditPage", "CarEquipment"));
                                    }}
                                    theme={tablet.backDateChoiceEquipment}
                                >
                                    {/* 日期選擇 BackDateChoiceEquipment  選項 */}
                                    {Object.keys(weekDayChMapping).map((key) => {
                                        return (
                                            <CheckboxItem key={key} value={weekDayChMapping[key]} >{weekDayChMapping[key]}</CheckboxItem>
                                        )
                                    })}
                                </Checkbox>

                                {/* 返回住家 車趟出發時間 BackDepartureTime */}
                                <DateTimePicker
                                    topLabel={<>車趟出發時間</>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"time"}
                                    format={"HH:mm"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("DayCareEditPage", "BackDepartureTime")) ?
                                            moment(globalContextService.get("DayCareEditPage", "BackDepartureTime"), "HH:mm")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("DayCareEditPage", "BackDepartureTime", value);
                                    }}
                                    theme={tablet.backDepartureTime}
                                />

                                {/* 預計抵達住家時間 ArrivalTime */}
                                <DateTimePicker
                                    topLabel={<>預計抵達住家時間</>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"time"}
                                    format={"HH:mm"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("DayCareEditPage", "ArrivalTime")) ?
                                            moment(globalContextService.get("DayCareEditPage", "ArrivalTime"), "HH:mm")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("DayCareEditPage", "ArrivalTime", value);
                                    }}
                                    theme={tablet.arrivalTime}
                                />

                                {/* 回程車號 BackCarNumber */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>回程車號</>}
                                    bottomLabel={""}
                                    //viewType
                                    isSearchable
                                    placeholder={"請選擇車號"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("DayCareEditPage", "BackCarNumber") ?? null}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareEditPage", "BackCarNumber", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇車號", isDisabled: true },
                                        { value: '1', label: "ABC-1111" },
                                        { value: '2', label: "ZZZ-8888" },
                                        { value: '3', label: "XXX-123" },
                                    ]}
                                    // menuPosition={true}
                                    theme={tablet.backCarNumber}
                                />

                            </Container>
                        </FormRow>
                    </FormContainer>

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
                                value={globalContextService.get("DayCareEditPage", "DriverNote") ?? props.CaseUsers?.remark}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareEditPage", "DriverNote", value);
                                    // console.log(value)
                                }}
                                theme={tablet.driverNote}
                            />
                        </FormRow>
                    </FormContainer>

                    {/* 緊急聯絡人資訊 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"緊急聯絡人資訊"}
                        theme={tablet.emergencyContactSubTitleBar}
                    />

                    {/* 緊急聯絡人資訊 區域容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.emergencyContactContainer}
                    >
                        <FormRow>
                            {/* 聯絡人姓名 ContactName */}
                            <TextInput
                                topLabel={"聯絡人姓名"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareEditPage", "ContactName") ?? props.CaseUsers?.urgentName}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareEditPage", "ContactName", value);
                                }}
                                theme={tablet.contactName}
                            />

                            {/* 關係 Relationship */}
                            <TextInput
                                topLabel={"關係"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareEditPage", "Relationship") ?? props.CaseUsers?.urgentRelationship}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareEditPage", "Relationship", value);
                                }}
                                theme={tablet.relationship}
                            />

                            {/* 聯絡人手機 ContactCellphone */}
                            <TextInput
                                topLabel={"聯絡人手機"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0987654321"}
                                value={globalContextService.get("DayCareEditPage", "ContactCellphone") ?? props.CaseUsers?.urgentPhone}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareEditPage", "ContactCellphone", value);
                                }}
                                theme={tablet.contactCellphone}
                            />

                            {/* 聯絡人市話 ContactTelephone */}
                            <TextInput
                                topLabel={"聯絡人市話"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("DayCareEditPage", "ContactTelephone") ?? props.CaseUsers?.urgentTel}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareEditPage", "ContactTelephone", value);
                                }}
                                theme={tablet.contactTelephone}
                            />


                        </FormRow>
                    </FormContainer>

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
                                        // 同 上方 儲存按鈕

                                        //#region 表單驗證
                                        let validMsg = "";
                                        if (valid(globalContextService.get("DayCareEditPage", "CaseNumber") ?? "", ["^.{1,}$"], ["請輸入案號"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareEditPage", "CaseNumber") ?? "", ["^.{1,}$"], ["請輸入案號"])[1]
                                        }
                                        else if (
                                            (
                                                valid(globalContextService.get("DayCareEditPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                                &&
                                                valid(globalContextService.get("DayCareEditPage", "Telephone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                            )
                                        ) {
                                            validMsg = valid(globalContextService.get("DayCareEditPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareEditPage", "DayCareCenter")?.value ?? "", ["^.{1,}$"], ["請選擇日照中心"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareEditPage", "DayCareCenter")?.value ?? "", ["^.{1,}$"], ["請選擇日照中心"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareEditPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareEditPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareEditPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareEditPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareEditPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareEditPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareEditPage", "FirstTravelDate") ?? "", ["^.{1,}$"], ["請輸入首次乘車日"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareEditPage", "FirstTravelDate") ?? "", ["^.{1,}$"], ["請輸入首次乘車日"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareEditPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareEditPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]
                                        }
                                        //#endregion

                                        //#region 表單驗證後動作
                                        if (validMsg !== "") {
                                            // console.log(validMsg, globalContextService.get("DayCareEditPage"))
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