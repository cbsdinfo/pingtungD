import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../ProjectComponent';
import { ReactComponent as Plus } from '../../../../Assets/img/WhiteEditPage/Plus.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/WhiteEditPage/Convert.svg'
import { ReactComponent as Delete } from '../../../../Assets/img/WhiteEditPage/Delete.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { whiteEdit: { rwd: { tablet } } } } } = Theme;

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
                            titleText={"白牌車基本資料編輯"}
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
                                    if (valid(globalContextService.get("WhiteEditPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteEditPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteEditPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteEditPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteEditPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteEditPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteEditPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteEditPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteEditPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteEditPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteEditPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteEditPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteEditPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteEditPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]
                                    }
                                    //#endregion

                                    //#region 表單驗證後動作
                                    if (validMsg !== "") {
                                        // console.log(validMsg, globalContextService.get("WhiteEditPage"))
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
                                        props.UpdateWhiteUserExecute({
                                            userId: props.UserId,
                                            county: globalContextService.get("WhiteEditPage", "County")?.value,
                                            district: globalContextService.get("WhiteEditPage", "District")?.value,
                                            addr: globalContextService.get("WhiteEditPage", "Address"),
                                            urgentName: globalContextService.get("WhiteEditPage", "ContactName"),
                                            urgentRelationship: globalContextService.get("WhiteEditPage", "Relationship"),
                                            urgentPhone: globalContextService.get("WhiteEditPage", "ContactCellphone"),
                                            urgentTel: globalContextService.get("WhiteEditPage", "ContactTelephone"),
                                            lat: 0,// 畫面無對應欄位	lat	緯度
                                            lon: 0,  // 畫面無對應欄位	lon	經度
                                            remark: globalContextService.get("WhiteEditPage", "DriverNote"),
                                            id: props.CaseUsers.id // 畫面無對應欄位	id	白牌個案ID，編輯須上送此欄位
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
                                    value={globalContextService.get("WhiteEditPage", "Name") ?? props.Client?.name}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("WhiteEditPage", "Name", value);
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
                                        // (globalContextService.get("WhiteEditPage", `Birthday`) ?
                                        //     moment(globalContextService.get("WhiteEditPage", `Birthday`), "YYYY-MM-DD")
                                        //     :
                                        (props.Client?.birthday) ?
                                            moment(props.Client.birthday, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                        // )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("WhiteEditPage", `Birthday`, value);
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
                                        // globalContextService.get("WhiteEditPage", "Sex") ?? { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                        (!isNil(props.Client?.sex)) ?
                                            { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                            :
                                            null
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log("value", value)
                                        globalContextService.set("WhiteEditPage", "Sex", value);
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
                                    value={globalContextService.get("WhiteEditPage", "Uid") ?? props.Client?.uid}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("WhiteEditPage", "Uid", value);
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
                                    value={globalContextService.get("WhiteEditPage", "Cellphone") ?? props.Client?.phone}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("WhiteEditPage", "Cellphone", value);
                                    }}
                                    theme={tablet.cellPhone}
                                />

                            </FormRow>
                        </FormContainer>
                    </BasicContainer>

                    {/* 白牌車資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"白牌車資料"}
                        theme={tablet.whiteCaseDataSubTitleBar}
                    />

                    {/* 白牌車資料容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.whiteCaseDataContainer}
                    >
                        <FormRow>
                            {/* 居住地(縣市) County */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>居住地<Text theme={tablet.countyRequired}>(必填)</Text></>}
                                // bottomLabel={"為避免無法成功預約訂車，門牌號碼及巷弄請使用半形數字，且勿填寫樓層及備註"}
                                //viewType
                                isSearchable
                                placeholder={"居住縣市"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={
                                    globalContextService.get("WhiteEditPage", "County") ??
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
                                    // globalContextService.set("WhiteEditPage", "County", value);
                                    // console.log("請選擇居住縣市", value, globalContextService.get("WhiteEditPage", "County"))
                                    if (!isEqual(value, globalContextService.get("WhiteEditPage", "County"))) {
                                        globalContextService.set("WhiteEditPage", "County", value);
                                        globalContextService.set("WhiteEditPage", "District", { value: 'hint', label: "請選擇居住區域", isDisabled: true });
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
                            <Selector
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
                                placeholder={"居住區域"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={
                                    globalContextService.get("WhiteEditPage", "District") ??
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
                                    globalContextService.set("WhiteEditPage", "District", value);
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇居住區域", isDisabled: true },
                                    ...(
                                        !isNil(globalContextService.get("WhiteEditPage", "County")) ?
                                            cityAndCountiesLite[globalContextService.get("WhiteEditPage", "County")?.value]
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
                                value={globalContextService.get("WhiteEditPage", "Longitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteEditPage", "Longitude0", value);
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
                                value={globalContextService.get("WhiteEditPage", "Latitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteEditPage", "Latitude0", value);
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
                                value={globalContextService.get("WhiteEditPage", "Address") ?? props.CaseUsers?.addr}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteEditPage", "Address", value);
                                }}
                                theme={tablet.address}
                            />
                        </FormRow>
                    </FormContainer>

                    {/* 輪住地址區域表單組件 !! 暫時不用 */}
                    {/* <TurnAddressComponents /> */}

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
                                value={globalContextService.get("WhiteEditPage", "DriverNote") ?? props.CaseUsers?.remark}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteEditPage", "DriverNote", value);
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
                                value={globalContextService.get("WhiteEditPage", "ContactName") ?? props.CaseUsers?.urgentName}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteEditPage", "ContactName", value);
                                }}
                                theme={tablet.contactName}
                            />

                            {/* 關係 Relationship */}
                            <TextInput
                                topLabel={"關係"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("WhiteEditPage", "Relationship") ?? props.CaseUsers?.urgentRelationship}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteEditPage", "Relationship", value);
                                }}
                                theme={tablet.relationship}
                            />

                            {/* 聯絡人手機 ContactCellphone */}
                            <TextInput
                                topLabel={"聯絡人手機"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0987654321"}
                                value={globalContextService.get("WhiteEditPage", "ContactCellphone") ?? props.CaseUsers?.urgentPhone}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteEditPage", "ContactCellphone", value);
                                }}
                                theme={tablet.contactCellphone}
                            />

                            {/* 聯絡人市話 ContactTelephone */}
                            <TextInput
                                topLabel={"聯絡人市話"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("WhiteEditPage", "ContactTelephone") ?? props.CaseUsers?.urgentTel}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteEditPage", "ContactTelephone", value);
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
                                        if (valid(globalContextService.get("WhiteEditPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteEditPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteEditPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteEditPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteEditPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteEditPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteEditPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteEditPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteEditPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteEditPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteEditPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteEditPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteEditPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteEditPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]
                                        }
                                        //#endregion

                                        //#region 表單驗證後動作
                                        if (validMsg !== "") {
                                            // console.log(validMsg, globalContextService.get("WhiteEditPage"))
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
                                            props.UpdateWhiteUserExecute({
                                                userId: props.UserId,
                                                county: globalContextService.get("WhiteEditPage", "County")?.value,
                                                district: globalContextService.get("WhiteEditPage", "District")?.value,
                                                addr: globalContextService.get("WhiteEditPage", "Address"),
                                                urgentName: globalContextService.get("WhiteEditPage", "ContactName"),
                                                urgentRelationship: globalContextService.get("WhiteEditPage", "Relationship"),
                                                urgentPhone: globalContextService.get("WhiteEditPage", "ContactCellphone"),
                                                urgentTel: globalContextService.get("WhiteEditPage", "ContactTelephone"),
                                                lat: 0,// 畫面無對應欄位	lat	緯度
                                                lon: 0,  // 畫面無對應欄位	lon	經度
                                                remark: globalContextService.get("WhiteEditPage", "DriverNote"),
                                                id: props.CaseUsers.id // 畫面無對應欄位	id	白牌個案ID，編輯須上送此欄位
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

//#region 輪住地址區域表單組件
const TurnAddressComponents = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { caseAdd: { rwd: { tablet } } } } } = Theme;

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
                    globalContextService.set("WhiteEditPage", "TurnAddressDefault", [value?.[value.length - 1]] ?? null);
                    console.log(globalContextService.get("WhiteEditPage", "TurnAddressDefault"));
                    setCheckList(c => [value?.[value.length - 1]] ?? [])
                }}
                theme={tablet.turnAddressCheckboxGroup}
            >
                {/* 基本資料下方容器 */}
                <FormContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={tablet.turnAddressFormContainer}
                >
                    <FormRow>
                        {/* 輪住地址(縣市) TurnCounty */}
                        <Selector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={
                                <>輪住地址
                                    <CheckboxItem
                                        value={0}
                                        theme={tablet.turnAddressCheckboxItem}
                                    >  </CheckboxItem>
                                </>}
                            bottomLabel={"每月分配之額度1840/2400以居住地為主，若輪住至平區或偏區導致額度不同時，需請個管修改居住地資料。"}
                            //viewType
                            isSearchable
                            placeholder={"居住縣市"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("WhiteEditPage", "TurnCounty0") ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteEditPage", "TurnCounty0", value);
                            }}

                            options={[
                                { value: 'hint', label: "選擇居住縣市", isDisabled: true },
                                { value: 0, label: 'XX縣' },
                                { value: 1, label: 'XX市' }
                            ]}
                            // menuPosition={true}
                            theme={tablet.turnCounty}
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
                            value={globalContextService.get("WhiteEditPage", "TurnDistrict0") ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteEditPage", "TurnDistrict0", value);
                            }}

                            options={[
                                { value: 'hint', label: "選擇居住區域", isDisabled: true },
                                { value: 0, label: 'XX區' },
                                { value: 1, label: 'XX區' }
                            ]}
                            // menuPosition={true}
                            theme={tablet.turnDistrict}
                        />

                        {/* 輪住地址(地址) TurnAddress */}
                        <TextInput
                            topLabel={
                                <Text theme={tablet.convertContainer}
                                    onClick={() => { console.log("轉換經緯度") }}
                                >
                                    <Convert style={tablet.convertContainerIcon} />
                                    轉換經緯度
                                </Text>
                            }
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={"請輸入居住地址"}
                            value={globalContextService.get("WhiteEditPage", "TurnAddress0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteEditPage", "TurnAddress0", value);
                            }}
                            theme={tablet.turnAddress}
                        />

                        {/* 經度 Longitude */}
                        <TextInput
                            // viewType
                            // topLabel={"經度"}
                            topLabel={<>經度<Text theme={tablet.longitudeRequired}>(必填)</Text></>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("WhiteEditPage", "Longitude0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteEditPage", "Longitude0", value);
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
                            value={globalContextService.get("WhiteEditPage", "Latitude0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteEditPage", "Latitude0", value);
                            }}
                            theme={tablet.latitude}
                        />

                        <MoreTurnAddress TurnAddressArray={TurnAddressArray} setTurnAddressArray={setTurnAddressArray} setCheckList={setCheckList} />

                        <SubContainer theme={tablet.addTurnAddressButtonContainer}>
                            {/* 新增輪住地址按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={tablet.addTurnAddressButton}
                                onClick={() => { setTurnAddressArray(t => [...t, 0]); /*console.log(CheckList)*/ }}
                            >
                                <Plus style={tablet.addTurnAddressButtonIcon} />
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
    const { pages: { cases: { caseAdd: { rwd: { tablet } } } } } = Theme;

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
                                        theme={tablet.turnAddressCheckboxItem}
                                    >  </CheckboxItem>
                                </>}
                            bottomLabel={"每月分配之額度1840/2400以居住地為主，若輪住至平區或偏區導致額度不同時，需請個管修改居住地資料。"}
                            //viewType
                            isSearchable
                            placeholder={"居住縣市"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("WhiteEditPage", `TurnCounty${index + 1}`) ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteEditPage", `TurnCounty${index + 1}`, value);
                            }}

                            options={
                                [
                                    { value: 'hint', label: "選擇居住縣市", isDisabled: true },
                                    { value: 0, label: 'XX縣' },
                                    { value: 1, label: 'XX市' }
                                ]}
                            // menuPosition={true}
                            theme={tablet.turnCounty}
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
                            value={globalContextService.get("WhiteEditPage", `TurnDistrict${index + 1}`) ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteEditPage", `TurnDistrict${index + 1}`, value);
                            }}

                            options={
                                [
                                    { value: 'hint', label: "選擇居住區域", isDisabled: true },
                                    { value: 0, label: 'XX區' },
                                    { value: 1, label: 'XX區' }
                                ]}
                            // menuPosition={true}
                            theme={tablet.turnDistrict}
                        />

                        {/* 輪住地址(地址) TurnAddress */}
                        < TextInput
                            topLabel={
                                <>
                                    <Text theme={tablet.delContainer}
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
                                        <Delete style={tablet.delContainerIcon} />
                                        刪除
                                    </Text>
                                    <Text theme={tablet.convertContainer}
                                        onClick={() => { console.log("轉換經緯度") }}
                                    >
                                        <Convert style={tablet.convertContainerIcon} />
                                        轉換經緯度
                                    </Text>
                                </>
                            }
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={"請輸入居住地址"}
                            value={globalContextService.get("WhiteEditPage", `TurnAddress${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteEditPage", `TurnAddress${index + 1}`, value);
                            }}
                            theme={tablet.turnAddress}
                        />

                        {/* 經度 Longitude */}
                        < TextInput
                            // viewType
                            // topLabel={"經度"}
                            topLabel={<>經度<Text theme={tablet.longitudeRequired}>(必填)</Text></>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("WhiteEditPage", `Longitude${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteEditPage", `Longitude${index + 1}`, value);
                            }}
                            theme={tablet.longitude}
                        />

                        {/* 緯度 Latitude */}
                        < TextInput
                            // viewType
                            // topLabel={"緯度"}
                            topLabel={<>緯度<Text theme={tablet.latitudeRequired}>(必填)</Text></>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("WhiteEditPage", `Latitude${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteEditPage", `Latitude${index + 1}`, value);
                            }}
                            theme={tablet.latitude}
                        />
                    </React.Fragment>
                )
            })
            }
        </>
    )
}
//#endregion

