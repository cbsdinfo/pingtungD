import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../ProjectComponent';
import { ReactComponent as Plus } from '../../../../Assets/img/RuralEditPage/Plus.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/RuralEditPage/Convert.svg'
import { ReactComponent as Delete } from '../../../../Assets/img/RuralEditPage/Delete.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { ruralEdit: { rwd: { laptopL } } } } } = Theme;

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
                            titleText={"偏鄉運能不足基本資料編輯"}
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
                                        history.push("/Case");
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
                                    if (valid(globalContextService.get("RuralEditPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                        validMsg = valid(globalContextService.get("RuralEditPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                    }
                                    else if (valid(globalContextService.get("RuralEditPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]) {
                                        validMsg = valid(globalContextService.get("RuralEditPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]
                                    }
                                    else if (valid(globalContextService.get("RuralEditPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]) {
                                        validMsg = valid(globalContextService.get("RuralEditPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]
                                    }
                                    else if (valid(globalContextService.get("RuralEditPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]) {
                                        validMsg = valid(globalContextService.get("RuralEditPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]
                                    }
                                    else if (valid(globalContextService.get("RuralEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                        validMsg = valid(globalContextService.get("RuralEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                    }
                                    else if (valid(globalContextService.get("RuralEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                        validMsg = valid(globalContextService.get("RuralEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                    }
                                    else if (valid(globalContextService.get("RuralEditPage", "Address") ?? "", ["^.{1,}$"], ["請輸入居住地址"])[1]) {
                                        validMsg = valid(globalContextService.get("RuralEditPage", "Address") ?? "", ["^.{1,}$"], ["請輸入居住地址"])[1]
                                    }
                                    //#endregion

                                    //#region 表單驗證後動作
                                    if (validMsg !== "") {
                                        // console.log(validMsg, globalContextService.get("RuralEditPage"))
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
                                        // props.AddOrUpdateCaseUserExecute({
                                        //     name: globalContextService.get("RuralEditPage", "Name"), // 無對應欄位
                                        //     birthday: globalContextService.get("RuralEditPage", `Birthday`),
                                        //     sex: globalContextService.get("RuralEditPage", "Sex")?.value, // 無對應欄位
                                        //     uid: globalContextService.get("RuralEditPage", "Uid"),
                                        //     caseUserNo: globalContextService.get("RuralEditPage", "CaseNumber"),
                                        //     wealTypeName: globalContextService.get("RuralEditPage", "BoonType")?.label,
                                        //     wealTypeId: globalContextService.get("RuralEditPage", "BoonType")?.value,
                                        //     phone: globalContextService.get("RuralEditPage", "Cellphone"),// 手機，無對應欄位
                                        //     tel: globalContextService.get("RuralEditPage", "Telephone"),// 市話，無對應欄位
                                        //     "個案身份": globalContextService.get("RuralEditPage", "CaseIdentity")?.value,//個案身份，無對應欄位
                                        //     reviewDate: globalContextService.get("RuralEditPage", "QuotaKeepYM"),
                                        //     orgAId: globalContextService.get("RuralEditPage", "ManagementUnit")?.value,
                                        //     disabilityLevel: globalContextService.get("RuralEditPage", "DisabilityLevel")?.value,
                                        //     "案件狀態": globalContextService.get("RuralEditPage", "CaseStatus")?.value,//案件狀態	無對應欄位
                                        //     "結案其他": globalContextService.get("RuralEditPage", "CloseOther") ?? "",//結案、其他 無對應欄位
                                        //     county: globalContextService.get("RuralEditPage", "County")?.value,
                                        //     district: globalContextService.get("RuralEditPage", "District")?.value,
                                        //     addr: globalContextService.get("RuralEditPage", "Address"),
                                        //     // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                        //     remark: globalContextService.get("RuralEditPage", "DriverNote"),
                                        //     urgentName: globalContextService.get("RuralEditPage", "ContactName"),
                                        //     urgentRelationship: globalContextService.get("RuralEditPage", "Relationship"),
                                        //     urgentPhone: globalContextService.get("RuralEditPage", "ContactCellphone"),
                                        //     urgentTel: globalContextService.get("RuralEditPage", "ContactTelephone"),
                                        //     userId: props.UserId,
                                        // orgBId1: null,// 畫面無對應欄位	orgBId1	選擇B單位 1
                                        // orgBId2: null,// 畫面無對應欄位	orgBId2	選擇B單位 2
                                        // orgBId3: null,// 畫面無對應欄位	orgBId3	選擇B單位 3
                                        // lat: 0,// 畫面無對應欄位	lat	緯度
                                        // lon: 0,  // 畫面無對應欄位	lon	經度
                                        // caseUserStatus: 1, // 畫面無對應欄位	caseUserStatus	可否派發，可: 1，不可: 0
                                        // statusReason: "",// 畫面無對應欄位	statusReason	不可派發原因
                                        // isEffectNow: false, // 畫面無對應欄位	isEffectNow	不知道此欄位用意，尖石有上送此欄位，預代false，但在資料庫找不到此欄位

                                        // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                        // })
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

                        {/* 基本資料容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptopL.baseFormContainer}
                        >
                            <FormRow>

                                {/* 姓名 Name */}
                                <TextInput
                                    viewType
                                    topLabel={<>姓名</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("RuralEditPage", "Name") ?? props.Client?.name}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("RuralEditPage", "Name", value);
                                    }}
                                    theme={laptopL.name}
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
                                        // (globalContextService.get("RuralEditPage", `Birthday`) ?
                                        //     moment(globalContextService.get("RuralEditPage", `Birthday`), "YYYY-MM-DD")
                                        //     :
                                        (props.Client?.birthday) ?
                                            moment(props.Client.birthday, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                        // )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("RuralEditPage", `Birthday`, value);
                                    }}
                                    theme={laptopL.birthday}
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
                                        // globalContextService.get("RuralEditPage", "Sex") ?? { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                        (!isNil(props.Client?.sex)) ?
                                            { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                            :
                                            null
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log("value", value)
                                        globalContextService.set("RuralEditPage", "Sex", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇性別", isDisabled: true },
                                        { value: 1, label: '男' },
                                        { value: 0, label: '女' }
                                    ]}
                                    // menuPosition={true}
                                    theme={laptopL.sex}
                                />

                                {/* 身分證字號 Uid */}
                                <TextInput
                                    viewType
                                    topLabel={<>身分證字號</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("RuralEditPage", "Uid") ?? props.Client?.uid}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("RuralEditPage", "Uid", value);
                                    }}
                                    theme={laptopL.uid}
                                />

                                {/* 手機 Cellphone */}
                                <TextInput
                                    viewType
                                    topLabel={<>手機</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("RuralEditPage", "Cellphone") ?? props.Client?.phone}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("RuralEditPage", "Cellphone", value);
                                    }}
                                    theme={laptopL.cellPhone}
                                />

                            </FormRow>
                        </FormContainer>
                    </BasicContainer>

                    {/* 偏鄉運能不足資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"偏鄉運能不足資料"}
                        theme={laptopL.ruralDataSubTitleBar}
                    />

                    {/* 偏鄉運能不足資料容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.ruralDataContainer}
                    >
                        <FormRow>
                            {/* 居住地(縣市) County */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>居住地<Text theme={laptopL.countyRequired}>(必填)</Text></>}
                                bottomLabel={"為避免無法成功預約訂車，門牌號碼及巷弄請使用半形數字，且勿填寫樓層及備註"}
                                //viewType
                                isSearchable
                                placeholder={"居住縣市"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("RuralEditPage", "County") ?? null}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    if (!isEqual(value, globalContextService.get("RuralEditPage", "County"))) {
                                        globalContextService.set("RuralEditPage", "County", value);
                                        setForceUpdate(f => !f);
                                    }
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇居住縣市", isDisabled: true },
                                    ...Counties
                                ]}
                                // menuPosition={true}
                                theme={laptopL.county}
                            />

                            {/* 居住地(區域) District */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={""}
                                //viewType
                                isSearchable
                                placeholder={"居住區域"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("RuralEditPage", "District") ?? null}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("RuralEditPage", "District", value);
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇居住區域", isDisabled: true },
                                    ...(
                                        !isNil(globalContextService.get("RuralEditPage", "County")) ?
                                            cityAndCountiesLite[globalContextService.get("RuralEditPage", "County")?.value]
                                            :
                                            []
                                    )
                                ]}
                                // menuPosition={true}
                                theme={laptopL.district}
                            />

                            {/* 居住地(地址) Address */}
                            <TextInput
                                topLabel={
                                    <Text theme={laptopL.convertContainer}
                                        onClick={() => { console.log("轉換經緯度") }}
                                    >
                                        <Convert style={laptopL.convertContainerIcon} />
                                            轉換經緯度
                                        </Text>
                                }
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"請輸入居住地址"}
                                value={globalContextService.get("RuralEditPage", "Address") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralEditPage", "Address", value);
                                }}
                                theme={laptopL.address}
                            />
                            {/* 經度 Longitude */}
                            <TextInput
                                viewType
                                topLabel={"經度"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("RuralEditPage", "Longitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralEditPage", "Longitude0", value);
                                }}
                                theme={laptopL.longitude}
                            />

                            {/* 緯度 Latitude */}
                            <TextInput
                                viewType
                                topLabel={"緯度"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("RuralEditPage", "Latitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralEditPage", "Latitude0", value);
                                }}
                                theme={laptopL.latitude}
                            />
                        </FormRow>
                    </FormContainer>

                    {/* 輪住地址區域表單組件 !! 暫時不用 */}
                    {/* <TurnAddressComponents /> */}

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
                                value={globalContextService.get("RuralEditPage", "DriverNote") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralEditPage", "DriverNote", value);
                                    // console.log(value)
                                }}
                                theme={laptopL.driverNote}
                            />
                        </FormRow>
                    </FormContainer>

                    {/* 緊急聯絡人資訊 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"緊急聯絡人資訊"}
                        theme={laptopL.emergencyContactSubTitleBar}
                    />

                    {/* 緊急聯絡人資訊 區域容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.emergencyContactContainer}
                    >
                        <FormRow>
                            {/* 聯絡人姓名 ContactName */}
                            <TextInput
                                topLabel={"聯絡人姓名"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("RuralEditPage", "ContactName") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralEditPage", "ContactName", value);
                                }}
                                theme={laptopL.contactName}
                            />

                            {/* 關係 Relationship */}
                            <TextInput
                                topLabel={"關係"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("RuralEditPage", "Relationship") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralEditPage", "Relationship", value);
                                }}
                                theme={laptopL.relationship}
                            />

                            {/* 聯絡人手機 ContactCellphone */}
                            <TextInput
                                topLabel={"聯絡人手機"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0987654321"}
                                value={globalContextService.get("RuralEditPage", "ContactCellphone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralEditPage", "ContactCellphone", value);
                                }}
                                theme={laptopL.contactCellphone}
                            />

                            {/* 聯絡人市話 ContactTelephone */}
                            <TextInput
                                topLabel={"聯絡人市話"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("RuralEditPage", "ContactTelephone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralEditPage", "ContactTelephone", value);
                                }}
                                theme={laptopL.contactTelephone}
                            />


                        </FormRow>
                    </FormContainer>

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
                                        // 同 上方 儲存按鈕

                                        //#region 表單驗證
                                        let validMsg = "";
                                        if (valid(globalContextService.get("RuralEditPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                            validMsg = valid(globalContextService.get("RuralEditPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                        }
                                        else if (valid(globalContextService.get("RuralEditPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]) {
                                            validMsg = valid(globalContextService.get("RuralEditPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]
                                        }
                                        else if (valid(globalContextService.get("RuralEditPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]) {
                                            validMsg = valid(globalContextService.get("RuralEditPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]
                                        }
                                        else if (valid(globalContextService.get("RuralEditPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]) {
                                            validMsg = valid(globalContextService.get("RuralEditPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]
                                        }
                                        else if (valid(globalContextService.get("RuralEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                            validMsg = valid(globalContextService.get("RuralEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                        }
                                        else if (valid(globalContextService.get("RuralEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                            validMsg = valid(globalContextService.get("RuralEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                        }
                                        else if (valid(globalContextService.get("RuralEditPage", "Address") ?? "", ["^.{1,}$"], ["請輸入居住地址"])[1]) {
                                            validMsg = valid(globalContextService.get("RuralEditPage", "Address") ?? "", ["^.{1,}$"], ["請輸入居住地址"])[1]
                                        }
                                        //#endregion

                                        //#region 表單驗證後動作
                                        if (validMsg !== "") {
                                            // console.log(validMsg, globalContextService.get("RuralEditPage"))
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
                                            // props.AddOrUpdateCaseUserExecute({
                                            //     name: globalContextService.get("RuralEditPage", "Name"), // 無對應欄位
                                            //     birthday: globalContextService.get("RuralEditPage", `Birthday`),
                                            //     sex: globalContextService.get("RuralEditPage", "Sex")?.value, // 無對應欄位
                                            //     uid: globalContextService.get("RuralEditPage", "Uid"),
                                            //     caseUserNo: globalContextService.get("RuralEditPage", "CaseNumber"),
                                            //     wealTypeName: globalContextService.get("RuralEditPage", "BoonType")?.label,
                                            //     wealTypeId: globalContextService.get("RuralEditPage", "BoonType")?.value,
                                            //     phone: globalContextService.get("RuralEditPage", "Cellphone"),// 手機，無對應欄位
                                            //     tel: globalContextService.get("RuralEditPage", "Telephone"),// 市話，無對應欄位
                                            //     "個案身份": globalContextService.get("RuralEditPage", "CaseIdentity")?.value,//個案身份，無對應欄位
                                            //     reviewDate: globalContextService.get("RuralEditPage", "QuotaKeepYM"),
                                            //     orgAId: globalContextService.get("RuralEditPage", "ManagementUnit")?.value,
                                            //     disabilityLevel: globalContextService.get("RuralEditPage", "DisabilityLevel")?.value,
                                            //     "案件狀態": globalContextService.get("RuralEditPage", "CaseStatus")?.value,//案件狀態	無對應欄位
                                            //     "結案其他": globalContextService.get("RuralEditPage", "CloseOther") ?? "",//結案、其他 無對應欄位
                                            //     county: globalContextService.get("RuralEditPage", "County")?.value,
                                            //     district: globalContextService.get("RuralEditPage", "District")?.value,
                                            //     addr: globalContextService.get("RuralEditPage", "Address"),
                                            //     // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                            //     remark: globalContextService.get("RuralEditPage", "DriverNote"),
                                            //     urgentName: globalContextService.get("RuralEditPage", "ContactName"),
                                            //     urgentRelationship: globalContextService.get("RuralEditPage", "Relationship"),
                                            //     urgentPhone: globalContextService.get("RuralEditPage", "ContactCellphone"),
                                            //     urgentTel: globalContextService.get("RuralEditPage", "ContactTelephone"),
                                            //     userId: props.UserId,
                                            //     // orgBId1: null,// 畫面無對應欄位	orgBId1	選擇B單位 1
                                            //     // orgBId2: null,// 畫面無對應欄位	orgBId2	選擇B單位 2
                                            //     // orgBId3: null,// 畫面無對應欄位	orgBId3	選擇B單位 3
                                            //     lat: 0,// 畫面無對應欄位	lat	緯度
                                            //     lon: 0,  // 畫面無對應欄位	lon	經度
                                            //     caseUserStatus: 1, // 畫面無對應欄位	caseUserStatus	可否派發，可: 1，不可: 0
                                            //     statusReason: "",// 畫面無對應欄位	statusReason	不可派發原因
                                            //     isEffectNow: false, // 畫面無對應欄位	isEffectNow	不知道此欄位用意，尖石有上送此欄位，預代false，但在資料庫找不到此欄位

                                            // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                            // })
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

//#region 輪住地址區域表單組件
const TurnAddressComponents = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { caseAdd: { rwd: { laptopL } } } } } = Theme;

    const [TurnAddressArray, setTurnAddressArray] = useState([]);
    const [CheckList, setCheckList] = useState([]);

    return (
        <>
            <CheckboxGroup
                // viewType
                checked={CheckList}
                // disable
                onChange={(value) => {
                    // console.log(value)
                    globalContextService.set("RuralEditPage", "TurnAddressDefault", [value?.[value.length - 1]] ?? null);
                    console.log(globalContextService.get("RuralEditPage", "TurnAddressDefault"));
                    setCheckList(c => [value?.[value.length - 1]] ?? [])
                }}
                theme={laptopL.turnAddressCheckboxGroup}
            >
                {/* 基本資料下方容器 */}
                <FormContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={laptopL.turnAddressFormContainer}
                >
                    <FormRow>
                        {/* 輪住地址(縣市) TurnCounty */}
                        <Selector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={
                                <>輪住地址
                                    <CheckboxItem
                                        value={0}
                                        theme={laptopL.turnAddressCheckboxItem}
                                    >  </CheckboxItem>
                                </>}
                            bottomLabel={"每月分配之額度1840/2400以居住地為主，若輪住至平區或偏區導致額度不同時，需請個管修改居住地資料。"}
                            //viewType
                            isSearchable
                            placeholder={"居住縣市"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("RuralEditPage", "TurnCounty0") ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("RuralEditPage", "TurnCounty0", value);
                            }}

                            options={[
                                { value: 'hint', label: "選擇居住縣市", isDisabled: true },
                                { value: 0, label: 'XX縣' },
                                { value: 1, label: 'XX市' }
                            ]}
                            // menuPosition={true}
                            theme={laptopL.turnCounty}
                        />

                        {/* 輪住地址(區域) TurnDistrict */}
                        <Selector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={""}
                            //viewType
                            isSearchable
                            placeholder={"居住區域"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("RuralEditPage", "TurnDistrict0") ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("RuralEditPage", "TurnDistrict0", value);
                            }}

                            options={[
                                { value: 'hint', label: "選擇居住區域", isDisabled: true },
                                { value: 0, label: 'XX區' },
                                { value: 1, label: 'XX區' }
                            ]}
                            // menuPosition={true}
                            theme={laptopL.turnDistrict}
                        />

                        {/* 輪住地址(地址) TurnAddress */}
                        <TextInput
                            topLabel={
                                <Text theme={laptopL.convertContainer}
                                    onClick={() => { console.log("轉換經緯度") }}
                                >
                                    <Convert style={laptopL.convertContainerIcon} />
                                    轉換經緯度
                                </Text>
                            }
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={"請輸入居住地址"}
                            value={globalContextService.get("RuralEditPage", "TurnAddress0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("RuralEditPage", "TurnAddress0", value);
                            }}
                            theme={laptopL.turnAddress}
                        />

                        {/* 經度 Longitude */}
                        <TextInput
                            viewType
                            topLabel={"經度"}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("RuralEditPage", "Longitude0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("RuralEditPage", "Longitude0", value);
                            }}
                            theme={laptopL.longitude}
                        />

                        {/* 緯度 Latitude */}
                        <TextInput
                            viewType
                            topLabel={"緯度"}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("RuralEditPage", "Latitude0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("RuralEditPage", "Latitude0", value);
                            }}
                            theme={laptopL.latitude}
                        />

                        <MoreTurnAddress TurnAddressArray={TurnAddressArray} setTurnAddressArray={setTurnAddressArray} setCheckList={setCheckList} />

                        <SubContainer theme={laptopL.addTurnAddressButtonContainer}>
                            {/* 新增輪住地址按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptopL.addTurnAddressButton}
                                onClick={() => { setTurnAddressArray(t => [...t, 0]); /*console.log(CheckList)*/ }}
                            >
                                <Plus style={laptopL.addTurnAddressButtonIcon} />
                                新增輪住地址
                            </NativeLineButton>
                        </SubContainer>

                    </FormRow>
                </FormContainer>
            </CheckboxGroup>
        </>
    )
}
//#endregion

//#region 渲染新增的輪住地址組件
const MoreTurnAddress = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { caseAdd: { rwd: { laptopL } } } } } = Theme;

    return (
        <>
            {(props.TurnAddressArray ?? []).map((item, index) => {
                if (item === null) {
                    return null;
                }

                return (
                    <React.Fragment key={index + 1}>
                        {/* 輪住地址(縣市) TurnCounty */}
                        < Selector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={
                                <> 輪住地址
                                    < CheckboxItem
                                        value={index + 1}
                                        theme={laptopL.turnAddressCheckboxItem}
                                    >  </CheckboxItem>
                                </>}
                            bottomLabel={"每月分配之額度1840/2400以居住地為主，若輪住至平區或偏區導致額度不同時，需請個管修改居住地資料。"}
                            //viewType
                            isSearchable
                            placeholder={"居住縣市"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("RuralEditPage", `TurnCounty${index + 1}`) ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("RuralEditPage", `TurnCounty${index + 1}`, value);
                            }}

                            options={
                                [
                                    { value: 'hint', label: "選擇居住縣市", isDisabled: true },
                                    { value: 0, label: 'XX縣' },
                                    { value: 1, label: 'XX市' }
                                ]}
                            // menuPosition={true}
                            theme={laptopL.turnCounty}
                        />

                        {/* 輪住地址(區域) TurnDistrict */}
                        < Selector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={""}
                            //viewType
                            isSearchable
                            placeholder={"居住區域"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("RuralEditPage", `TurnDistrict${index + 1}`) ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("RuralEditPage", `TurnDistrict${index + 1}`, value);
                            }}

                            options={
                                [
                                    { value: 'hint', label: "選擇居住區域", isDisabled: true },
                                    { value: 0, label: 'XX區' },
                                    { value: 1, label: 'XX區' }
                                ]}
                            // menuPosition={true}
                            theme={laptopL.turnDistrict}
                        />

                        {/* 輪住地址(地址) TurnAddress */}
                        < TextInput
                            topLabel={
                                <>
                                    <Text theme={laptopL.delContainer}
                                        onClick={() => {
                                            props?.setTurnAddressArray && props.setTurnAddressArray(t => {
                                                let delRes = [...t]
                                                delRes[index] = null;
                                                return delRes;
                                            })
                                            props?.setCheckList && props.setCheckList(c => {
                                                if (c?.[0] === index + 1) {
                                                    return []
                                                }
                                                else {
                                                    return c;
                                                }
                                            })
                                        }}
                                    >
                                        <Delete style={laptopL.delContainerIcon} />
                                        刪除
                                    </Text>
                                    <Text theme={laptopL.convertContainer}
                                        onClick={() => { console.log("轉換經緯度") }}
                                    >
                                        <Convert style={laptopL.convertContainerIcon} />
                                        轉換經緯度
                                    </Text>
                                </>
                            }
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={"請輸入居住地址"}
                            value={globalContextService.get("RuralEditPage", `TurnAddress${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("RuralEditPage", `TurnAddress${index + 1}`, value);
                            }}
                            theme={laptopL.turnAddress}
                        />

                        {/* 經度 Longitude */}
                        < TextInput
                            viewType
                            topLabel={"經度"}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("RuralEditPage", `Longitude${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("RuralEditPage", `Longitude${index + 1}`, value);
                            }}
                            theme={laptopL.longitude}
                        />

                        {/* 緯度 Latitude */}
                        < TextInput
                            viewType
                            topLabel={"緯度"}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("RuralEditPage", `Latitude${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("RuralEditPage", `Latitude${index + 1}`, value);
                            }}
                            theme={laptopL.latitude}
                        />
                    </React.Fragment>
                )
            })
            }
        </>
    )
}
//#endregion

