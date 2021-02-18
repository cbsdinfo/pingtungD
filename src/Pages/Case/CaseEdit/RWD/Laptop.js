import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../ProjectComponent';
import { BasicButton, BasicContainer, DateTimePicker, FormContainer, FormRow, globalContextService, modalsService, NativeLineButton, Selector, SubContainer, Text, Textarea, TextInput, NewSelector } from '../../../../Components';
import { valid } from '../../../../Handlers';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Convert } from '../../../../Assets/img/CaseEditPage/Convert.svg'
import moment from 'moment';
import { isEqual, isNil } from 'lodash';
import { cityAndCountiesLite, Counties, boonTypeSelectOption, boonTypeMapping, disabilityLevelMapping, disabilityLevelSelectOption, notDistributableReasonSelectOption, notDistributableReasonMapping } from '../../../../Mappings/Mappings';
import { fmt } from '../../../../Handlers/DateHandler';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { caseEdit: { rwd: { laptop } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [BoonTypeEdit, setBoonTypeEdit] = useState(true); // 供強制刷新組件

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
                            titleText={"長照個案基本資料編輯"}
                            theme={laptop.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/*  回上一頁按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 回上一頁按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptop.returnButton}
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
                    theme={laptop.AddPageContainer}
                >

                    {/* 基本資料編輯 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"基本資料"}
                        theme={laptop.driverBaseSubTitleBar}
                    >

                        {/*  儲存按鈕 (基本資料編輯 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 儲存按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                text={"儲存"}
                                theme={laptop.saveButton}
                                onClick={() => {
                                    //#region 表單驗證
                                    let validMsg = "";
                                    if (valid(globalContextService.get("CaseEditPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                    }
                                    else if (valid(globalContextService.get("CaseEditPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]
                                    }
                                    else if (valid(globalContextService.get("CaseEditPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]
                                    }
                                    else if (valid(globalContextService.get("CaseEditPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]
                                    }
                                    else if (
                                        (
                                            valid(globalContextService.get("CaseEditPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                            &&
                                            valid(globalContextService.get("CaseEditPage", "Telephone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                        )
                                    ) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                    }
                                    else if (valid(globalContextService.get("CaseEditPage", "ManagementUnit")?.value ?? "", ["^.{1,}$"], ["請選擇管理單位"])[1]) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "ManagementUnit")?.value ?? "", ["^.{1,}$"], ["請選擇管理單位"])[1]
                                    }
                                    else if (valid(globalContextService.get("CaseEditPage", "CaseNumber") ?? "", ["^.{1,}$", "^[A-Za-z0-9-@#^%_*()]{0,}$"], ["請輸入案號", "請輸入正確的案號"])[1]) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "CaseNumber") ?? "", ["^.{1,}$", "^[A-Za-z0-9-@#^%_*()]{0,}$"], ["請輸入案號", "請輸入正確的案號"])[1]
                                    }
                                    else if (valid(globalContextService.get("CaseEditPage", "BoonType")?.value ?? "", ["^.{1,}$"], ["請選擇社會福利身份"])[1]) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "BoonType")?.value ?? "", ["^.{1,}$"], ["請選擇社會福利身份"])[1]
                                    }
                                    else if (valid(globalContextService.get("CaseEditPage", "DisabilityLevel")?.value ?? "", ["^.{1,}$"], ["請選擇失能等級"])[1]) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "DisabilityLevel")?.value ?? "", ["^.{1,}$"], ["請選擇失能等級"])[1]
                                    }
                                    else if (valid(globalContextService.get("CaseEditPage", "QuotaKeepYM") ?? "", ["^.{1,}$"], ["請選擇額度控管留用首月"])[1]) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "QuotaKeepYM") ?? "", ["^.{1,}$"], ["請選擇額度控管留用首月"])[1]
                                    }
                                    else if (valid(globalContextService.get("CaseEditPage", "Distributable")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "Distributable")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]
                                    }
                                    else if (
                                        (
                                            globalContextService.get("CaseEditPage", "Distributable")?.label === '不可派發'
                                            &&
                                            valid(globalContextService.get("CaseEditPage", "NotDistributableReason")?.value ?? "", ["^.{1,}$"], ["請選擇不可派發原因"])[1]
                                        )
                                    ) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "NotDistributableReason")?.value ?? "", ["^.{1,}$"], ["請選擇不可派發原因"])[1]
                                    }
                                    else if (valid(globalContextService.get("CaseEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                    }
                                    else if (valid(globalContextService.get("CaseEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                    }
                                    else if (valid(globalContextService.get("CaseEditPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]
                                    }
                                    else if (valid(globalContextService.get("CaseEditPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]
                                    }
                                    else if (valid(globalContextService.get("CaseEditPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]) {
                                        validMsg = valid(globalContextService.get("CaseEditPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]
                                    }
                                    // 經緯度 未來再檢核
                                    //#endregion

                                    //#region 表單驗證後動作
                                    if (validMsg !== "") {
                                        // console.log(validMsg, globalContextService.get("CaseEditPage"))
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
                                        props.AddOrUpdateCaseUserExecute({
                                            name: globalContextService.get("CaseEditPage", "Name"), // 無對應欄位
                                            birthday: globalContextService.get("CaseEditPage", `Birthday`),
                                            sex: globalContextService.get("CaseEditPage", "Sex")?.value, // 無對應欄位
                                            uid: globalContextService.get("CaseEditPage", "Uid"),
                                            caseUserNo: globalContextService.get("CaseEditPage", "CaseNumber"),
                                            wealTypeName: globalContextService.get("CaseEditPage", "BoonType")?.label,
                                            wealTypeId: globalContextService.get("CaseEditPage", "BoonType")?.value,
                                            phone: globalContextService.get("CaseEditPage", "Cellphone"),// 手機，無對應欄位
                                            otherPhone: globalContextService.get("CaseEditPage", "Telephone"),// 市話，無對應欄位
                                            reviewDate: globalContextService.get("CaseEditPage", "QuotaKeepYM"),
                                            orgAId: globalContextService.get("CaseEditPage", "ManagementUnit")?.value,
                                            disabilityLevel: globalContextService.get("CaseEditPage", "DisabilityLevel")?.value,
                                            county: globalContextService.get("CaseEditPage", "County")?.value,
                                            district: globalContextService.get("CaseEditPage", "District")?.value,
                                            addr: globalContextService.get("CaseEditPage", "Address"),
                                            // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                            remark: globalContextService.get("CaseEditPage", "DriverNote"),
                                            urgentName: globalContextService.get("CaseEditPage", "ContactName"),
                                            urgentRelationship: globalContextService.get("CaseEditPage", "Relationship"),
                                            urgentPhone: globalContextService.get("CaseEditPage", "ContactCellphone"),
                                            urgentTel: globalContextService.get("CaseEditPage", "ContactTelephone"),
                                            userId: props.UserId,
                                            startDate: globalContextService.get("CaseEditPage", "EnableDate"), // 啟用日期
                                            expiredDate: globalContextService.get("CaseEditPage", "DisableDate"), // 失效日期
                                            // orgBId1: null,// 畫面無對應欄位	orgBId1	選擇B單位 1
                                            // orgBId2: null,// 畫面無對應欄位	orgBId2	選擇B單位 2
                                            // orgBId3: null,// 畫面無對應欄位	orgBId3	選擇B單位 3
                                            lat: 0,// 畫面無對應欄位	lat	緯度
                                            lon: 0,  // 畫面無對應欄位	lon	經度
                                            caseUserStatus: globalContextService.get("CaseEditPage", "Distributable")?.value, // caseUserStatus	可否派發，可: 1，不可: 0
                                            statusReason: globalContextService.get("CaseEditPage", "NotDistributableReason")?.value,// statusReason	不可派發原因
                                            isEffectNow: false, // 畫面無對應欄位	isEffectNow	不知道此欄位用意，尖石有上送此欄位，預代false，但在資料庫找不到此欄位
                                            id: props.CaseUsers.id // 畫面無對應欄位	id	長照個案ID，編輯須上送此欄位
                                        })
                                        props.controllGCS("Save");
                                    }
                                    //#endregion
                                }}
                            />
                        </SubContainer>
                    </MainPageSubTitleBar>

                    {/* 基本資料表單區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.baseContainer}
                    >

                        {/* 基本資料容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptop.baseFormContainer}
                        >
                            <FormRow>

                                {/* 姓名 Name */}
                                <TextInput
                                    viewType
                                    topLabel={<>姓名</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CaseEditPage", "Name") ?? props.Client?.name}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CaseEditPage", "Name", value);
                                    }}
                                    theme={laptop.name}
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
                                        // (globalContextService.get("CaseEditPage", `Birthday`) ?
                                        //     moment(globalContextService.get("CaseEditPage", `Birthday`), "YYYY-MM-DD")
                                        //     :
                                        (props.Client?.birthday) ?
                                            moment(props.Client.birthday, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                        // )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("CaseEditPage", `Birthday`, value);
                                    }}
                                    theme={laptop.birthday}
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
                                        // globalContextService.get("CaseEditPage", "Sex") ?? { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                        (!isNil(props.Client?.sex)) ?
                                            { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                            :
                                            null
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log("value", value)
                                        globalContextService.set("CaseEditPage", "Sex", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇性別", isDisabled: true },
                                        { value: 1, label: '男' },
                                        { value: 0, label: '女' }
                                    ]}
                                    // menuPosition={true}
                                    theme={laptop.sex}
                                />

                                {/* 身分證字號 Uid */}
                                <TextInput
                                    viewType
                                    topLabel={<>身分證字號</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CaseEditPage", "Uid") ?? props.Client?.uid}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CaseEditPage", "Uid", value);
                                    }}
                                    theme={laptop.uid}
                                />

                                {/* 手機 Cellphone */}
                                <TextInput
                                    viewType
                                    topLabel={<>手機</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CaseEditPage", "Cellphone") ?? props.Client?.phone}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CaseEditPage", "Cellphone", value);
                                    }}
                                    theme={laptop.cellphone}
                                />

                            </FormRow>
                        </FormContainer>
                    </BasicContainer>

                    {/* ------------------- */}
                    {/* 長照個案資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"長照個案資料"}
                        theme={laptop.longDataSubTitleBar}
                    />
                    {/* 長照個案資料容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.longDataContainer}
                    >
                        <FormRow>

                            {/* 其他聯絡電話 Telephone */}
                            <TextInput
                                topLabel={<>其他聯絡電話</>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("CaseEditPage", "Telephone") ?? props.CaseUsers.otherPhone}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseEditPage", "Telephone", value);
                                }}
                                theme={laptop.telephone}
                            />

                            {/* 管理單位 ManagementUnit */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>管理單位<Text theme={laptop.managementUnitRequired}>(必填)</Text></>}
                                bottomLabel={"若為自管案，管理單位請輸入新北市政府衛生局。"}
                                //viewType
                                isSearchable
                                placeholder={""}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={
                                    (!isNil(props.CaseUsers?.orgAId)) ?
                                        {
                                            value: props.CaseUsers.orgAId,
                                            label: (props?.ManagerUnit ?? []).filter((i) => (i.value === props.CaseUsers.orgAId))[0]?.label
                                        }
                                        :
                                        null
                                }
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("CaseEditPage", "ManagementUnit", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇管理單位", isDisabled: true },
                                    ...props?.ManagerUnit
                                    // { value: '1', label: '公費個案' },
                                    // { value: '2', label: '結案個案' }
                                ]}
                                // menuPosition={true}
                                theme={laptop.managementUnit}
                            />

                            {/* 案號 CaseNumber */}
                            <TextInput
                                topLabel={<>案號<Text theme={laptop.caseNumberRequired}>(必填)</Text></>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("CaseEditPage", "CaseNumber") ?? props.CaseUsers?.caseUserNo}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseEditPage", "CaseNumber", value);
                                }}
                                theme={laptop.caseNumber}
                            />

                            {/* 社會福利身份 BoonType */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={
                                    <>
                                        社會福利身份
                                            <Text theme={laptop.boonTypeRequired}>(必填)</Text>
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={laptop.boonTypeEditButton}
                                            onClick={() => {
                                                // 因缺乏API，這裡暫時只做成 啟用/禁用 欄位
                                                setBoonTypeEdit(b => !b)
                                            }}
                                        >
                                            修改
                                            </NativeLineButton>
                                    </>
                                }
                                //viewType
                                disabled={BoonTypeEdit}
                                isSearchable
                                placeholder={""}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={
                                    globalContextService.get("CaseEditPage", "BoonType") ?? (
                                        (!isNil(props.CaseUsers?.wealTypeId)) ?
                                            { value: props.CaseUsers.wealTypeId, label: props.CaseUsers.wealTypeName }
                                            :
                                            null
                                    )
                                }
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("CaseEditPage", "BoonType", value);
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇社會福利身份", isDisabled: true },
                                    ...boonTypeSelectOption
                                ]}
                                // menuPosition={true}
                                theme={laptop.boonType}
                            />

                            {/* 失能等級 DisabilityLevel */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>失能等級<Text theme={laptop.disabilityLevelRequired}>(必填)</Text></>}
                                //viewType
                                isSearchable
                                placeholder={""}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={
                                    (!isNil(props.CaseUsers?.disabilityLevel)) ?
                                        {
                                            value: props.CaseUsers.disabilityLevel,
                                            label: disabilityLevelMapping[props.CaseUsers.disabilityLevel]
                                        }
                                        :
                                        null
                                }
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("CaseEditPage", "DisabilityLevel", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇失能等級", isDisabled: true },
                                    ...disabilityLevelSelectOption
                                ]}
                                // menuPosition={true}
                                theme={laptop.disabilityLevel}
                            />

                            {/* 額度控管留用首月 QuotaKeepYM */}
                            <DateTimePicker
                                topLabel={<>額度控管留用首月<Text theme={laptop.quotaKeepYMRequired}>(必填)</Text></>}
                                // type={"time"} time、date、week、month、quarter、year
                                type={"month"}
                                format={"YYYY-MM"}
                                bascDefaultTheme={"DefaultTheme"}
                                // viewType
                                isSearchable
                                placeholder={""}
                                value={
                                    (props.CaseUsers?.birthday) ?
                                        moment(props.CaseUsers.reviewDate, "YYYY-MM-DD HH:mm:ss")
                                        :
                                        null
                                }
                                onChange={(value, momentObj) => {
                                    globalContextService.set("CaseEditPage", `QuotaKeepYM`, value);
                                }}
                                theme={laptop.quotaKeepYM}
                            />

                            {/* 可否派發 Distributable */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>可否派發<Text theme={laptop.distributableRequired}>(必填)</Text></>}
                                //viewType
                                isSearchable
                                placeholder={""}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={
                                    globalContextService.get("CaseEditPage", "Distributable") ??
                                    (
                                        (!isNil(props.CaseUsers?.caseUserStatus)) ?
                                            { value: props.CaseUsers.caseUserStatus, label: props.CaseUsers.caseUserStatus === 1 ? '可派發' : '不可派發' }
                                            :
                                            null
                                    )
                                }
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    if (value.label === '不可派發') {
                                        if (value.label !== globalContextService.get("CaseEditPage", "Distributable")?.label) {
                                            setForceUpdate(f => !f); // 剛選擇 結案 - 其他 時，重新渲染
                                        }
                                    }
                                    else if (globalContextService.get("CaseEditPage", "Distributable")?.label === '不可派發') {
                                        setForceUpdate(f => !f); // 剛不選擇 結案 - 其他 時，重新渲染
                                    }

                                    globalContextService.set("CaseEditPage", "Distributable", value);
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇派發狀態", isDisabled: true },
                                    { value: 1, label: '可派發' },
                                    { value: 0, label: '不可派發' },
                                ]}
                                // menuPosition={true}
                                theme={laptop.distributable}
                            />


                            {/* 不可派發原因 NotDistributableReason */}
                            {/* 唯可否派發為 '不可派發' 顯示本欄位 */}
                            {globalContextService.get("CaseEditPage", "Distributable")?.label === '不可派發' &&
                                <Selector
                                    topLabel={<>不可派發原因<Text theme={laptop.notDistributableReasonRequired}>(必填)</Text></>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        globalContextService.get("CaseEditPage", "NotDistributableReason") ??
                                        (
                                            (!isNil(props.CaseUsers?.statusReason)) ?
                                                {
                                                    value: props.CaseUsers.statusReason,
                                                    label: notDistributableReasonMapping[props.CaseUsers.statusReason],
                                                }
                                                :
                                                null
                                        )
                                    }
                                    onChange={(e, value, onInitial) => {
                                        if (!isEqual(value, globalContextService.get("CaseEditPage", "NotDistributableReason")) && !onInitial) {

                                            //#region 打開選擇失效方式 Modal
                                            modalsService.titleModal.normal({
                                                //id: "top1",
                                                title: "失效方式",
                                                yes: true,
                                                yesText: "確認",
                                                no: true,
                                                noText: "取消",
                                                // autoClose: true,
                                                backgroundClose: false,
                                                noOnClick: (e) => {
                                                    globalContextService.remove("CaseEditPage", "SelectloseType")
                                                },
                                                yesOnClick: (e, close) => {
                                                    globalContextService.remove("CaseEditPage", "SelectloseType")
                                                    close();
                                                },
                                                closeIconOnClick: (e) => {
                                                    globalContextService.remove("CaseEditPage", "SelectloseType")
                                                },
                                                content: (
                                                    <FormContainer
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                        theme={laptop.selectloseTypeFormContainer}
                                                    >
                                                        <FormRow baseDefaultTheme={"DefaultTheme"}>

                                                            {/* 新增彈窗 - 失效方式 SelectloseType */}
                                                            <Selector
                                                                bascDefaultTheme={"DefaultTheme"}
                                                                topLabel={<>失效方式</>}
                                                                //viewType
                                                                isSearchable
                                                                placeholder={"請選擇失效方式"}
                                                                // isMulti
                                                                // hideSelectedOptions={false}
                                                                value={globalContextService.get("CaseEditPage", "SelectloseType") ?? { value: 0, label: '立即' }}
                                                                onChange={(e, value, onInitial) => {
                                                                    // console.log(value)
                                                                    globalContextService.set("CaseEditPage", "SelectloseType", value);
                                                                    if (value?.label === "立即") {
                                                                        globalContextService.set("CaseEditPage", "EnableDate", `${fmt(moment().startOf("day"), `YYYY-MM-DD`)}`);
                                                                        globalContextService.set("CaseEditPage", "DisableDate", `${fmt(moment().startOf("day"), `YYYY-MM-DD`)}`);
                                                                    }
                                                                    else if (value?.label === "次月") {
                                                                        globalContextService.set("CaseEditPage", "EnableDate", `${fmt(moment().startOf("day"), `YYYY-MM-DD`)}`);
                                                                        globalContextService.set("CaseEditPage", "DisableDate", `${fmt(moment().add(1, "month"), `YYYY-MM-DD`)}`);
                                                                    }
                                                                    setForceUpdate(f => !f); // 選擇時，重新渲染
                                                                }}

                                                                options={[
                                                                    { value: 'hint', label: "請選擇失效方式", isDisabled: true },
                                                                    { value: 0, label: '立即' },
                                                                    { value: 1, label: '次月' }
                                                                ]}
                                                                menuPosition={true}
                                                                theme={laptop.selectloseType}
                                                            />
                                                        </FormRow>
                                                    </FormContainer>
                                                ),
                                                theme: laptop.selectloseTypeModal
                                            })
                                            //#endregion
                                        }

                                        if (!isEqual(value, globalContextService.get("CaseEditPage", "NotDistributableReason")) && onInitial) {
                                            setForceUpdate(f => !f); // 選擇時，重新渲染
                                        }
                                        globalContextService.set("CaseEditPage", "NotDistributableReason", value);
                                    }}
                                    options={[
                                        { value: '0', label: "請選擇不可派發原因", isDisabled: true },
                                        ...notDistributableReasonSelectOption
                                    ]}
                                    theme={laptop.notDistributableReason}
                                />
                            }
                            {(
                                globalContextService.get("CaseEditPage", "Distributable")?.label === '不可派發'
                                &&
                                (
                                    !isNil(globalContextService.get("CaseEditPage", "NotDistributableReason")?.label)
                                    &&
                                    (globalContextService.get("CaseEditPage", "NotDistributableReason")?.label !== "")
                                )
                            ) &&
                                <>
                                    {/* 啟用日期 EnableDate */}
                                    <TextInput
                                        viewType
                                        topLabel={<>啟用日期</>}
                                        baseDefaultTheme={"DefaultTheme"}
                                        type="text"
                                        placeholder={""}
                                        value={globalContextService.get("CaseEditPage", "EnableDate") ?? props.CaseUsers?.enableDate}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("CaseEditPage", "EnableDate", value);
                                        }}
                                        theme={laptop.enableDate}
                                    />

                                    {/* 失效日期 DisableDate */}
                                    <TextInput
                                        viewType
                                        topLabel={<>失效日期</>}
                                        baseDefaultTheme={"DefaultTheme"}
                                        type="text"
                                        placeholder={""}
                                        value={globalContextService.get("CaseEditPage", "DisableDate") ?? props.CaseUsers?.disableDate}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("CaseEditPage", "DisableDate", value);
                                        }}
                                        theme={laptop.disableDate}
                                    />
                                </>
                            }

                        </FormRow>

                        <FormRow>
                            {/* 居住地(縣市) County */}
                            <NewSelector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>居住地<Text theme={laptop.countyRequired}>(必填)</Text></>}
                                bottomLabel={"為避免無法成功預約訂車，門牌號碼及巷弄請使用半形數字，且勿填寫樓層及備註"}
                                //viewType
                                isSearchable
                                placeholder={"請選擇居住縣市"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={
                                    globalContextService.get("CaseEditPage", "County") ??
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
                                    // globalContextService.set("CaseEditPage", "County", value);
                                    // console.log("請選擇居住縣市", value, globalContextService.get("CaseEditPage", "County"))
                                    if (!isEqual(value, globalContextService.get("CaseEditPage", "County"))) {
                                        globalContextService.set("CaseEditPage", "County", value);
                                        globalContextService.set("CaseEditPage", "District", { value: 'hint', label: "請選擇居住區域", isDisabled: true });
                                        setForceUpdate(f => !f);
                                    }
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇居住縣市", isDisabled: true },
                                    ...Counties
                                ]}
                                // menuPosition={true}
                                theme={laptop.county}
                            />

                            {/* 居住地(區域) District */}
                            <NewSelector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={""}
                                //viewType
                                isSearchable
                                placeholder={"請選擇居住區域"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={
                                    globalContextService.get("CaseEditPage", "District") ??
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
                                    globalContextService.set("CaseEditPage", "District", value);
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇居住區域", isDisabled: true },
                                    ...(
                                        !isNil(globalContextService.get("CaseEditPage", "County")) ?
                                            cityAndCountiesLite[globalContextService.get("CaseEditPage", "County")?.value]
                                            :
                                            []
                                    )
                                ]}
                                // menuPosition={true}
                                theme={laptop.district}
                            />

                            {/* 居住地(地址) Address */}
                            <TextInput
                                topLabel={
                                    <Text theme={laptop.convertContainer}
                                        onClick={() => { console.log("轉換經緯度") }}
                                    >
                                        <Convert style={laptop.convertContainerIcon} />
                                            轉換經緯度
                                         </Text>
                                }
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"請輸入居住地址"}
                                value={globalContextService.get("CaseEditPage", "Address") ?? props.CaseUsers?.addr}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseEditPage", "Address", value);
                                }}
                                theme={laptop.address}
                            />

                            {/* 經度 Longitude */}
                            <TextInput
                                // viewType
                                // topLabel={"經度"}
                                topLabel={<>經度<Text theme={laptop.longitudeRequired}>(必填)</Text></>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("CaseEditPage", "Longitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseEditPage", "Longitude0", value);
                                }}
                                theme={laptop.longitude}
                            />

                            {/* 緯度 Latitude */}
                            <TextInput
                                // viewType
                                // topLabel={"緯度"}
                                topLabel={<>緯度<Text theme={laptop.latitudeRequired}>(必填)</Text></>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("CaseEditPage", "Latitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseEditPage", "Latitude0", value);
                                }}
                                theme={laptop.latitude}
                            />
                        </FormRow>
                    </FormContainer>

                    {/* 輪住地址區域表單組件 !! 暫時不用 */}
                    {/* <TurnAddressComponents /> */}

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
                                baseDefaultTheme={"DefaultTheme"}
                                placeholder={""}
                                value={globalContextService.get("CaseEditPage", "DriverNote") ?? props.CaseUsers?.remark}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseEditPage", "DriverNote", value);
                                    // console.log(value)
                                }}
                                theme={laptop.driverNote}
                            />
                        </FormRow>
                    </FormContainer>

                    {/* 緊急聯絡人資訊 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"緊急聯絡人資訊"}
                        theme={laptop.emergencyContactSubTitleBar}
                    />

                    {/* 緊急聯絡人資訊 區域容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.emergencyContactContainer}
                    >
                        <FormRow>
                            {/* 聯絡人姓名 ContactName */}
                            <TextInput
                                topLabel={"聯絡人姓名"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("CaseEditPage", "ContactName") ?? props.CaseUsers?.urgentName}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseEditPage", "ContactName", value);
                                }}
                                theme={laptop.contactName}
                            />

                            {/* 關係 Relationship */}
                            <TextInput
                                topLabel={"關係"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("CaseEditPage", "Relationship") ?? props.CaseUsers?.urgentRelationship}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseEditPage", "Relationship", value);
                                }}
                                theme={laptop.relationship}
                            />

                            {/* 聯絡人手機 ContactCellphone */}
                            <TextInput
                                topLabel={"聯絡人手機"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0987654321"}
                                value={globalContextService.get("CaseEditPage", "ContactCellphone") ?? props.CaseUsers?.urgentPhone}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseEditPage", "ContactCellphone", value);
                                }}
                                theme={laptop.contactCellphone}
                            />

                            {/* 聯絡人市話 ContactTelephone */}
                            <TextInput
                                topLabel={"聯絡人市話"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("CaseEditPage", "ContactTelephone") ?? props.CaseUsers?.urgentTel}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseEditPage", "ContactTelephone", value);
                                }}
                                theme={laptop.contactTelephone}
                            />


                        </FormRow>
                    </FormContainer>

                    {/* 底部儲存按鈕 外層容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.bottomSaveButtonContainer}
                    >
                        {/* 底部儲存按鈕 列容器 */}
                        <FormRow
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptop.bottomSaveButtonRowContainer}
                        >
                            {/*  底部儲存按鈕 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 底部儲存按鈕 */}
                                <BasicButton
                                    baseDefaultTheme={"PrimaryTheme"}
                                    text={"儲存"}
                                    theme={laptop.bottomSaveButton}
                                    onClick={() => {
                                        // 同 上方 儲存按鈕

                                        //#region 表單驗證
                                        let validMsg = "";
                                        if (valid(globalContextService.get("CaseEditPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                        }
                                        else if (valid(globalContextService.get("CaseEditPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]
                                        }
                                        else if (valid(globalContextService.get("CaseEditPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]
                                        }
                                        else if (valid(globalContextService.get("CaseEditPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]
                                        }
                                        else if (
                                            (
                                                valid(globalContextService.get("CaseEditPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                                &&
                                                valid(globalContextService.get("CaseEditPage", "Telephone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                            )
                                        ) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                        }
                                        else if (valid(globalContextService.get("CaseEditPage", "ManagementUnit")?.value ?? "", ["^.{1,}$"], ["請選擇管理單位"])[1]) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "ManagementUnit")?.value ?? "", ["^.{1,}$"], ["請選擇管理單位"])[1]
                                        }
                                        else if (valid(globalContextService.get("CaseEditPage", "CaseNumber") ?? "", ["^.{1,}$", "^[A-Za-z0-9-@#^%_*()]{0,}$"], ["請輸入案號", "請輸入正確的案號"])[1]) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "CaseNumber") ?? "", ["^.{1,}$", "^[A-Za-z0-9-@#^%_*()]{0,}$"], ["請輸入案號", "請輸入正確的案號"])[1]
                                        }
                                        else if (valid(globalContextService.get("CaseEditPage", "BoonType")?.value ?? "", ["^.{1,}$"], ["請選擇社會福利身份"])[1]) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "BoonType")?.value ?? "", ["^.{1,}$"], ["請選擇社會福利身份"])[1]
                                        }
                                        else if (valid(globalContextService.get("CaseEditPage", "DisabilityLevel")?.value ?? "", ["^.{1,}$"], ["請選擇失能等級"])[1]) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "DisabilityLevel")?.value ?? "", ["^.{1,}$"], ["請選擇失能等級"])[1]
                                        }
                                        else if (valid(globalContextService.get("CaseEditPage", "QuotaKeepYM") ?? "", ["^.{1,}$"], ["請選擇額度控管留用首月"])[1]) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "QuotaKeepYM") ?? "", ["^.{1,}$"], ["請選擇額度控管留用首月"])[1]
                                        }
                                        else if (valid(globalContextService.get("CaseEditPage", "Distributable")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "Distributable")?.value ?? "", ["^.{1,}$"], ["請選擇可否派發"])[1]
                                        }
                                        else if (
                                            (
                                                globalContextService.get("CaseEditPage", "Distributable")?.label === '不可派發'
                                                &&
                                                valid(globalContextService.get("CaseEditPage", "NotDistributableReason")?.value ?? "", ["^.{1,}$"], ["請選擇不可派發原因"])[1]
                                            )
                                        ) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "NotDistributableReason")?.value ?? "", ["^.{1,}$"], ["請選擇不可派發原因"])[1]
                                        }
                                        else if (valid(globalContextService.get("CaseEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                        }
                                        else if (valid(globalContextService.get("CaseEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                        }
                                        else if (valid(globalContextService.get("CaseEditPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]
                                        }
                                        else if (valid(globalContextService.get("CaseEditPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]
                                        }
                                        else if (valid(globalContextService.get("CaseEditPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]) {
                                            validMsg = valid(globalContextService.get("CaseEditPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]
                                        }
                                        // 經緯度 未來再檢核
                                        //#endregion

                                        //#region 表單驗證後動作
                                        if (validMsg !== "") {
                                            // console.log(validMsg, globalContextService.get("CaseEditPage"))
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
                                            props.AddOrUpdateCaseUserExecute({
                                                name: globalContextService.get("CaseEditPage", "Name"), // 無對應欄位
                                                birthday: globalContextService.get("CaseEditPage", `Birthday`),
                                                sex: globalContextService.get("CaseEditPage", "Sex")?.value, // 無對應欄位
                                                uid: globalContextService.get("CaseEditPage", "Uid"),
                                                caseUserNo: globalContextService.get("CaseEditPage", "CaseNumber"),
                                                wealTypeName: globalContextService.get("CaseEditPage", "BoonType")?.label,
                                                wealTypeId: globalContextService.get("CaseEditPage", "BoonType")?.value,
                                                phone: globalContextService.get("CaseEditPage", "Cellphone"),// 手機，無對應欄位
                                                otherPhone: globalContextService.get("CaseEditPage", "Telephone"),// 市話，無對應欄位
                                                reviewDate: globalContextService.get("CaseEditPage", "QuotaKeepYM"),
                                                orgAId: globalContextService.get("CaseEditPage", "ManagementUnit")?.value,
                                                disabilityLevel: globalContextService.get("CaseEditPage", "DisabilityLevel")?.value,
                                                county: globalContextService.get("CaseEditPage", "County")?.value,
                                                district: globalContextService.get("CaseEditPage", "District")?.value,
                                                addr: globalContextService.get("CaseEditPage", "Address"),
                                                // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                                remark: globalContextService.get("CaseEditPage", "DriverNote"),
                                                urgentName: globalContextService.get("CaseEditPage", "ContactName"),
                                                urgentRelationship: globalContextService.get("CaseEditPage", "Relationship"),
                                                urgentPhone: globalContextService.get("CaseEditPage", "ContactCellphone"),
                                                urgentTel: globalContextService.get("CaseEditPage", "ContactTelephone"),
                                                userId: props.UserId,
                                                startDate: globalContextService.get("CaseEditPage", "EnableDate"), // 啟用日期
                                                expiredDate: globalContextService.get("CaseEditPage", "DisableDate"), // 失效日期
                                                // orgBId1: null,// 畫面無對應欄位	orgBId1	選擇B單位 1
                                                // orgBId2: null,// 畫面無對應欄位	orgBId2	選擇B單位 2
                                                // orgBId3: null,// 畫面無對應欄位	orgBId3	選擇B單位 3
                                                lat: 0,// 畫面無對應欄位	lat	緯度
                                                lon: 0,  // 畫面無對應欄位	lon	經度
                                                caseUserStatus: globalContextService.get("CaseEditPage", "Distributable")?.value, // caseUserStatus	可否派發，可: 1，不可: 0
                                                statusReason: globalContextService.get("CaseEditPage", "NotDistributableReason")?.value,// statusReason	不可派發原因
                                                isEffectNow: false, // 畫面無對應欄位	isEffectNow	不知道此欄位用意，尖石有上送此欄位，預代false，但在資料庫找不到此欄位
                                                id: props.CaseUsers.id // 畫面無對應欄位	id	長照個案ID，編輯須上送此欄位
                                            })
                                            props.controllGCS("Save");
                                        }
                                        //#endregion

                                    }}
                                />
                            </SubContainer>
                        </FormRow>
                    </FormContainer>
                </BasicContainer >

            </MainPageContainer >
        </>
    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`