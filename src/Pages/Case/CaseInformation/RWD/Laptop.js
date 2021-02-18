import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../ProjectComponent';
import { BasicButton, BasicContainer, DateTimePicker, FormContainer, FormRow, globalContextService, modalsService, NativeLineButton, Selector, SubContainer, OldTable, Text, Textarea, TextInput, RangeDateTimePicker } from '../../../../Components';
import { useHistory } from 'react-router-dom';
import { valid } from '../../../../Handlers';
import moment from 'moment';
import { ReactComponent as EditPen } from '../../../../Assets/img/CaseInformationPage/EditPen.svg'
import { isEqual, isNil } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelMapping, disabilityLevelSelectOption, notDistributableReasonMapping, notDistributableReasonSelectOption } from '../../../../Mappings/Mappings';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { caseInformation: { rwd: { laptop } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

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
                            titleText={"長照個案詳細基本資料"}
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
                                        props.controllGCS("return")
                                        history.push("/Case")
                                    }}
                                >
                                    回列表
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
            >

                {/* 檢視頁面表單區容器 */}
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
                        {/*  編輯長照個案基本資料按鈕 (基本資料 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 編輯長照個案基本資料按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                icon={<EditPen style={laptop.toEditButtonIcon} />}
                                text={"編輯長照個案基本資料"}
                                theme={laptop.toEditButton}
                                onClick={() => {
                                    props.controllGCS("goToEditPage");
                                    history.push(`/Case/Edit?userId=${props.UserId}&caseUserId=${props.CaseUserId}`)
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
                                    value={globalContextService.get("CaseInformationPage", "Name") ?? props.Client?.name}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CaseInformationPage", "Name", value);
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
                                        // (globalContextService.get("CaseInformationPage", `Birthday`) ?
                                        //     moment(globalContextService.get("CaseInformationPage", `Birthday`), "YYYY-MM-DD")
                                        //     :
                                        (props.Client?.birthday) ?
                                            moment(props.Client.birthday, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                        // )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("CaseInformationPage", `Birthday`, value);
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
                                        // globalContextService.get("CaseInformationPage", "Sex") ?? { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                        (!isNil(props.Client?.sex)) ?
                                            { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                            :
                                            null
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log("value", value)
                                        globalContextService.set("CaseInformationPage", "Sex", value);
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
                                    value={globalContextService.get("CaseInformationPage", "Uid") ?? props.Client?.uid}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CaseInformationPage", "Uid", value);
                                    }}
                                    theme={laptop.uid}
                                />
                                {/* 手機 Cellphone */}
                                <TextInput
                                    viewType
                                    topLabel={"手機"}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={"格式：0987654321"}
                                    value={globalContextService.get("CaseInformationPage", "Cellphone") ?? props.Client?.phone}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CaseInformationPage", "Cellphone", value);
                                    }}
                                    theme={laptop.cellphone}
                                />

                            </FormRow>
                        </FormContainer>
                    </BasicContainer>

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
                                viewType
                                topLabel={"其他聯絡電話"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("CaseInformationPage", "Telephone") ?? props.CaseUsers.otherPhone}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseInformationPage", "Telephone", value);
                                }}
                                theme={laptop.telephone}
                            />

                            {/* 管理單位 ManagementUnit */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={"管理單位"}
                                // bottomLabel={"若為自管案，管理單位請輸入新北市政府衛生局。"}
                                viewType
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
                                    globalContextService.set("CaseInformationPage", "ManagementUnit", value);
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
                                viewType
                                topLabel={"案號"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("CaseInformationPage", "CaseNumber") ?? props.CaseUsers?.caseUserNo}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseInformationPage", "CaseNumber", value);
                                }}
                                theme={laptop.caseNumber}
                            />

                            {/* 社會福利身份 BoonType */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={"社會福利身份"}
                                viewType
                                isSearchable
                                placeholder={""}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={
                                    globalContextService.get("CaseInformationPage", "BoonType") ?? (
                                        (!isNil(props.CaseUsers?.wealTypeId)) ?
                                            { value: props.CaseUsers.wealTypeId, label: props.CaseUsers.wealTypeName }
                                            :
                                            null
                                    )
                                }
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("CaseInformationPage", "BoonType", value);
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
                                topLabel={"失能等級"}
                                viewType
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
                                    globalContextService.set("CaseInformationPage", "DisabilityLevel", value);
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
                                topLabel={"額度控管留用首月"}
                                // type={"time"} time、date、week、month、quarter、year
                                type={"month"}
                                format={"YYYY-MM"}
                                bascDefaultTheme={"DefaultTheme"}
                                viewType
                                isSearchable
                                placeholder={""}
                                value={
                                    (props.CaseUsers?.birthday) ?
                                        moment(props.CaseUsers.reviewDate, "YYYY-MM-DD HH:mm:ss")
                                        :
                                        null
                                }
                                onChange={(value, momentObj) => {
                                    globalContextService.set("CaseInformationPage", `QuotaKeepYM`, value);
                                }}
                                theme={laptop.quotaKeepYM}
                            />

                            {/* 可否派發 Distributable */}
                            <Selector
                                viewType
                                baseDefaultTheme={"DefaultTheme"}
                                topLabel={"可否派發"}
                                //viewType
                                isSearchable
                                placeholder={""}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={
                                    (!isNil(props.CaseUsers?.caseUserStatus)) ?
                                        { value: props.CaseUsers.caseUserStatus, label: props.CaseUsers.caseUserStatus === 1 ? '可派發' : '不可派發' }
                                        :
                                        null
                                }
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("CaseInformationPage", "Distributable", value);
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇可否派發", isDisabled: true },
                                    { value: 1, label: '可派發' },
                                    { value: 0, label: '不可派發' }
                                ]}
                                // menuPosition={true}
                                theme={laptop.distributable}
                            />

                            {/* 不可派發原因 NotDistributableReason */}
                            {/* 唯可否派發為 '不可派發' 顯示本欄位 */}
                            {globalContextService.get("CaseInformationPage", "Distributable")?.label === '不可派發' &&
                                <Selector
                                    viewType
                                    topLabel={"不可派發原因"}
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
                                    options={[
                                        { value: '0', label: "請選擇不可派發原因", isDisabled: true },
                                        ...notDistributableReasonSelectOption
                                    ]}
                                    theme={laptop.notDistributableReason}
                                />
                            }

                            {/* 啟用日期 EnableDate */}
                            {/* 唯可否派發為 '不可派發' 顯示本欄位 */}
                            {globalContextService.get("CaseInformationPage", "Distributable")?.label === '不可派發' &&
                                <TextInput
                                    viewType
                                    topLabel={<>啟用日期</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CaseInformationPage", "EnableDate") ?? props.CaseUsers?.enableDate}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CaseInformationPage", "EnableDate", value);
                                    }}
                                    theme={laptop.enableDate}
                                />
                            }

                            {/* 失效日期 DisableDate */}
                            {/* 唯可否派發為 '不可派發' 顯示本欄位 */}
                            {globalContextService.get("CaseInformationPage", "Distributable")?.label === '不可派發' &&
                                <TextInput
                                    viewType
                                    topLabel={<>失效日期</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CaseInformationPage", "DisableDate") ?? props.CaseUsers?.disableDate}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CaseInformationPage", "DisableDate", value);
                                    }}
                                    theme={laptop.disableDate}
                                />
                            }
                        </FormRow>

                        <FormRow>
                            {/* 居住地(地址) Address */}
                            <TextInput
                                viewType
                                topLabel={"居住地"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                // placeholder={"請輸入居住地址"}
                                // bottomLabel={"為避免無法成功預約訂車，門牌號碼及巷弄請使用半形數字，且勿填寫樓層及備註"}
                                value={
                                    globalContextService.get("CaseInformationPage", "Address") ??
                                    (
                                        (!isNil(props.CaseUsers?.county)) ?
                                            `${props.CaseUsers.county}${props.CaseUsers.district}${props.CaseUsers.addr}`
                                            :
                                            null
                                    )
                                }
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseInformationPage", "Address", value);
                                }}
                                theme={laptop.address}
                            />

                            {/* 經度 Longitude */}
                            <TextInput
                                viewType
                                topLabel={"經度"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("CaseInformationPage", "Longitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseInformationPage", "Longitude0", value);
                                }}
                                theme={laptop.longitude}
                            />

                            {/* 緯度 Latitude */}
                            <TextInput
                                viewType
                                topLabel={"緯度"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("CaseInformationPage", "Latitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseInformationPage", "Latitude0", value);
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
                                viewType
                                baseDefaultTheme={"DefaultTheme"}
                                placeholder={""}
                                value={globalContextService.get("CaseInformationPage", "DriverNote") ?? props.CaseUsers?.remark}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseInformationPage", "DriverNote", value);
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
                                viewType
                                topLabel={"聯絡人姓名"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("CaseInformationPage", "ContactName") ?? props.CaseUsers?.urgentName}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseInformationPage", "ContactName", value);
                                }}
                                theme={laptop.contactName}
                            />

                            {/* 關係 Relationship */}
                            <TextInput
                                viewType
                                topLabel={"關係"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("CaseInformationPage", "Relationship") ?? props.CaseUsers?.urgentRelationship}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseInformationPage", "Relationship", value);
                                }}
                                theme={laptop.relationship}
                            />

                            {/* 聯絡人手機 ContactCellphone */}
                            <TextInput
                                viewType
                                topLabel={"聯絡人手機"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0987654321"}
                                value={globalContextService.get("CaseInformationPage", "ContactCellphone") ?? props.CaseUsers?.urgentPhone}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseInformationPage", "ContactCellphone", value);
                                }}
                                theme={laptop.contactCellphone}
                            />

                            {/* 聯絡人市話 ContactTelephone */}
                            <TextInput
                                viewType
                                topLabel={"聯絡人市話"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("CaseInformationPage", "ContactTelephone") ?? props.CaseUsers?.urgentTel}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseInformationPage", "ContactTelephone", value);
                                }}
                                theme={laptop.contactTelephone}
                            />


                        </FormRow>
                    </FormContainer>
                </BasicContainer>

                {/* 違規紀錄區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptop.recordContainer}
                >

                    {/* 違規紀錄 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"違規紀錄"}
                        theme={laptop.recordSubTitleBar}
                    >
                        {/*  違規紀錄日期區間 (基本資料 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>

                            {/* 解除停權按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptop.recordUnLockButton}
                                onClick={() => { }}
                            >
                                解除停權
                            </NativeLineButton>

                            {/* 今天按鈕 */}
                            <NativeLineButton
                                clicked={props.Record === "今天"}
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptop.recordTodayButton}
                                onClick={() => { props.setRecord("今天") }}
                            >
                                今天
                            </NativeLineButton>

                            {/* 今天按鈕 */}
                            <NativeLineButton
                                clicked={props.Record === "近一週"}
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptop.recordWeekButton}
                                onClick={() => { props.setRecord("近一週") }}
                            >
                                近一週
                            </NativeLineButton>

                            {/* 近一個月按鈕 */}
                            <NativeLineButton
                                clicked={props.Record === "近一個月"}
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptop.recordOneMonthButton}
                                onClick={() => { props.setRecord("近一個月") }}
                            >
                                近一個月
                            </NativeLineButton>

                            {/* 近三個月按鈕 */}
                            <NativeLineButton
                                clicked={props.Record === "近三個月"}
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptop.recordThreeMonthButton}
                                onClick={() => { props.setRecord("近三個月") }}
                            >
                                近三個月
                            </NativeLineButton>

                        </SubContainer>

                        {/* 違規紀錄 查詢日期區間 RecordDateTimeRange  */}
                        <RangeDateTimePicker
                            topLabel={<></>}
                            // type={"time"} time、date、week、month、quarter、year
                            type={"date"}
                            format={"YYYY-MM-DD"}
                            bascDefaultTheme={"DefaultTheme"}
                            // viewType
                            isSearchable
                            placeholder={""}
                            value={
                                (globalContextService.get("CaseInformationPage", "RecordDateTimeRange") ?
                                    [moment(globalContextService.get("CaseInformationPage", "RecordDateTimeRange")[0]), moment(globalContextService.get("CaseInformationPage", "RecordDateTimeRange")[1])]
                                    :
                                    [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-06', "YYYY-MM-DD")]
                                )
                            }
                            onChange={(value, momentObj) => {
                                globalContextService.set("CaseInformationPage", "RecordDateTimeRange", value);
                            }}
                            theme={laptop.recordDateTimeRange}
                        />

                    </MainPageSubTitleBar>

                    {/* 違規紀錄Table區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.recordTableContainer}
                    >
                        <OldTable
                            checkbox={false}
                            // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                            checkedRowKeyName={"id"}
                            checkboxOnChecked={
                                (checkedRowKeys, checkedRows) => {
                                    // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                    globalContextService.set("CaseInformationPage", "CheckedRowKeys", checkedRowKeys);
                                    globalContextService.set("CaseInformationPage", "CheckedRowsData", checkedRows);
                                }
                            }
                            setPerCheckBoxDisabled={(record) => {
                                return {
                                    // ...record, // 對應CheckBox當列資料
                                    // disabled: record.name === 'Edrward 11',
                                }
                            }}
                            //scrollAreaWidth={"calc( 1900px - 300px )"} // 不用傳 會自適應寬度
                            //scrollAreaHeight={"calc( 100% - 55px )"}
                            columnsAttr={
                                //#region 資料欄設定
                                [
                                    {
                                        title: '',
                                        width: "0px",
                                        dataIndex: 'leftOccupy',
                                        fixed: 'left',
                                        sorter: false
                                    },
                                    {
                                        title: '訂單編號',
                                        width: "204px",
                                        dataIndex: 'vioOrderNo',
                                        sorter: false
                                        // sorter: (a, b) => a.vioOrderNo.length - b.vioOrderNo.length,
                                        // fixed: 'left',
                                    },
                                    {
                                        title: '違規原因',
                                        width: "660px",
                                        dataIndex: 'vioReason',
                                        sorter: false
                                        // sorter: (a, b) => a.vioReason.length - b.vioReason.length,
                                        // fixed: 'left',
                                    },
                                    {
                                        title: '日期',
                                        width: "120px",
                                        dataIndex: 'vioDate',
                                        sorter: (a, b) => a.vioDate - b.vioDate,
                                        // fixed: 'left',
                                    },
                                    {
                                        title: '記點',
                                        width: "120px",
                                        dataIndex: 'vioRecord',
                                        sorter: false
                                        // sorter: (a, b) => a.vioRecord.length - b.vioRecord.length,
                                        // fixed: 'left',
                                    },
                                    {
                                        title: '',
                                        width: "0px",
                                        dataIndex: 'rightOccupy',
                                        fixed: 'right',
                                        sorter: false
                                    },
                                ]
                                //#endregion
                            }
                            sort
                            //showHeader={false}
                            data={[{ id: "asdasd-415asd1sa5d-asd", vioOrderNo: "12245", vioReason: "aaa", vioDate: "2018-06-03", vioRecord: 1, },
                            { id: "asdasd-425asd1sa5d-asd", vioOrderNo: "456412", vioReason: "bbb", vioDate: "2018-05-02", vioRecord: 1, }]}
                            // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                            // data={props.SubOrgs.data}
                            clickPage={(currentPage, pageSize) => {
                            }}
                        />
                    </BasicContainer>
                </BasicContainer>

                {/*個案預約紀錄區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptop.orderRecordContainer}
                >

                    {/* 個案預約紀錄 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"個案預約紀錄"}
                        theme={laptop.orderRecordSubTitleBar}
                    >
                        {/*  個案預約紀錄日期區間 (基本資料 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>

                            {/* 個案預約紀錄 今天按鈕 */}
                            <NativeLineButton
                                clicked={props.OrderRecord === "今天"}
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptop.orderRecordTodayButton}
                                onClick={() => { props.setOrderRecord("今天") }}
                            >
                                今天
                            </NativeLineButton>

                            {/* 個案預約紀錄 今天按鈕 */}
                            <NativeLineButton
                                clicked={props.OrderRecord === "近一週"}
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptop.orderRecordWeekButton}
                                onClick={() => { props.setOrderRecord("近一週") }}
                            >
                                近一週
                            </NativeLineButton>

                            {/* 個案預約紀錄 近一個月按鈕 */}
                            <NativeLineButton
                                clicked={props.OrderRecord === "近一個月"}
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptop.orderRecordOneMonthButton}
                                onClick={() => { props.setOrderRecord("近一個月") }}
                            >
                                近一個月
                            </NativeLineButton>

                            {/* 個案預約紀錄 近三個月按鈕 */}
                            <NativeLineButton
                                clicked={props.OrderRecord === "近三個月"}
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptop.orderRecordThreeMonthButton}
                                onClick={() => { props.setOrderRecord("近三個月") }}
                            >
                                近三個月
                            </NativeLineButton>
                        </SubContainer>

                        {/* 個案預約紀錄 查詢日期區間 OrderRecordDateTimeRange  */}
                        <RangeDateTimePicker
                            topLabel={<></>}
                            // type={"time"} time、date、week、month、quarter、year
                            type={"date"}
                            format={"YYYY-MM-DD"}
                            bascDefaultTheme={"DefaultTheme"}
                            // viewType
                            isSearchable
                            placeholder={""}
                            value={
                                (globalContextService.get("CaseInformationPage", "OrderRecordDateTimeRange") ?
                                    [moment(globalContextService.get("CaseInformationPage", "OrderRecordDateTimeRange")[0]), moment(globalContextService.get("CaseInformationPage", "OrderRecordDateTimeRange")[1])]
                                    :
                                    [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-06', "YYYY-MM-DD")]
                                )
                            }
                            onChange={(value, momentObj) => {
                                globalContextService.set("CaseInformationPage", "OrderRecordDateTimeRange", value);
                            }}
                            theme={laptop.orderRecordDateTimeRange}
                        />
                    </MainPageSubTitleBar>

                    {/* 個案預約紀錄Table區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.orderRecordTableContainer}
                    >
                        <OldTable
                            checkbox={false}
                            // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                            checkedRowKeyName={"id"}
                            checkboxOnChecked={
                                (checkedRowKeys, checkedRows) => {
                                    // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                    globalContextService.set("CaseInformationPage", "CheckedRowKeys", checkedRowKeys);
                                    globalContextService.set("CaseInformationPage", "CheckedRowsData", checkedRows);
                                }
                            }
                            setPerCheckBoxDisabled={(record) => {
                                return {
                                    // ...record, // 對應CheckBox當列資料
                                    // disabled: record.name === 'Edrward 11',
                                }
                            }}
                            //scrollAreaWidth={"calc( 1900px - 300px )"} // 不用傳 會自適應寬度
                            //scrollAreaHeight={"calc( 100% - 55px )"}
                            columnsAttr={
                                //#region 資料欄設定
                                [
                                    {
                                        title: '',
                                        width: "0px",
                                        dataIndex: 'leftOccupy',
                                        fixed: 'left',
                                        sorter: false
                                    },
                                    {
                                        title: '預約時間',
                                        width: "104px",
                                        dataIndex: 'orderRecordDate',
                                        sorter: (a, b) => a.orderRecordDate - b.orderRecordDate,
                                        // fixed: 'left',
                                    },
                                    {
                                        title: '訂單編號',
                                        width: "148px",
                                        dataIndex: 'orderRecordNo',
                                        sorter: false
                                        // sorter: (a, b) => a.orderRecordNo.length - b.orderRecordNo.length,
                                        // fixed: 'left',
                                    },
                                    {
                                        title: '狀態',
                                        width: "140px",
                                        dataIndex: 'orderRecordStatus',
                                        sorter: false
                                        // sorter: (a, b) => a.orderRecordStatus - b.orderRecordStatus,
                                        // fixed: 'left',
                                    },
                                    {
                                        title: '車資總額',
                                        width: "84px",
                                        dataIndex: 'orderRecordTotalAmt',
                                        sorter: false
                                        // sorter: (a, b) => a.orderRecordTotalAmt.length - b.orderRecordTotalAmt.length,
                                        // fixed: 'left',
                                    },
                                    {
                                        title: '補助額度',
                                        width: "84px",
                                        dataIndex: 'orderRecordSubAmt',
                                        sorter: false
                                        // sorter: (a, b) => a.orderRecordSubAmt.length - b.orderRecordSubAmt.length,
                                        // fixed: 'left',
                                    },
                                    {
                                        title: '個案負擔',
                                        width: "84px",
                                        dataIndex: 'orderRecordBur',
                                        sorter: false
                                        // sorter: (a, b) => a.orderRecordBur.length - b.orderRecordBur.length,
                                        // fixed: 'left',
                                    },
                                    {
                                        title: '政府補助',
                                        width: "84px",
                                        dataIndex: 'orderRecordGovSub',
                                        sorter: false
                                        // sorter: (a, b) => a.orderRecordGovSub.length - b.orderRecordGovSub.length,
                                        // fixed: 'left',
                                    },
                                    {
                                        title: '陪同金額',
                                        width: "84px",
                                        dataIndex: 'orderRecordComAmt',
                                        sorter: false
                                        // sorter: (a, b) => a.orderRecordComAmt.length - b.orderRecordComAmt.length,
                                        // fixed: 'left',
                                    },
                                    {
                                        title: '實收金額',
                                        width: "84px",
                                        dataIndex: 'orderRecordPaid',
                                        sorter: false
                                        // sorter: (a, b) => a.orderRecordPaid.length - b.orderRecordPaid.length,
                                        // fixed: 'left',
                                    },
                                    {
                                        title: '車行',
                                        width: "209px",
                                        dataIndex: 'orderRecordCarDeal',
                                        sorter: false
                                        // sorter: (a, b) => a.orderRecordCarDeal.length - b.orderRecordCarDeal.length,
                                        // fixed: 'left',
                                    },
                                    {
                                        title: '',
                                        width: "0px",
                                        dataIndex: 'rightOccupy',
                                        fixed: 'right',
                                        sorter: false
                                    },
                                ]
                                //#endregion
                            }
                            sort
                            //showHeader={false}
                            data={[{ id: "asdasd-415asd1sa5d-asd", orderRecordDate: "2018-02-03", orderRecordNo: "45512", vioDate: "2018-06-03", vioRecord: 1, },
                            { id: "asdasd-425asd1sa5d-asd", orderRecordDate: "2018-02-05", orderRecordNo: "456412", vioReason: "bbb", vioDate: "2018-05-02", vioRecord: 1, }]}
                            // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                            // data={props.SubOrgs.data}
                            clickPage={(currentPage, pageSize) => {
                            }}
                        />
                    </BasicContainer>
                </BasicContainer>
            </MainPageContainer>
        </>
    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`