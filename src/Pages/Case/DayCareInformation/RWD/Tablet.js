import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../ProjectComponent';
import { ReactComponent as EditPen } from '../../../../Assets/img/DayCareInformationPage/EditPen.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService, Container } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption, notDistributableReasonSelectOption, weekDayChMapping } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';
import { fmt } from '../../../../Handlers/DateHandler';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { dayCareInformation: { rwd: { tablet } } } } } = Theme;

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
                            titleText={"日照個案詳細基本資料"}
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
                    theme={tablet.AddPageContainer}
                >

                    {/* 基本資料編輯 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"基本資料"}
                        theme={tablet.driverBaseSubTitleBar}
                    >
                        {/*  編輯長照個案基本資料按鈕 (基本資料 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 編輯長照個案基本資料按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                icon={<EditPen style={tablet.toEditButtonIcon} />}
                                text={"編輯長照個案基本資料"}
                                theme={tablet.toEditButton}
                                onClick={() => {
                                    props.controllGCS("goToEditPage");
                                    history.push(`/Case/DayCareEdit?userId=${props.UserId}&caseUserId=${props.CaseUserId}`)
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
                                    value={globalContextService.get("DayCareInformationPage", "Name") ?? props.Client?.name}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DayCareInformationPage", "Name", value);
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
                                        // (globalContextService.get("DayCareInformationPage", `Birthday`) ?
                                        //     moment(globalContextService.get("DayCareInformationPage", `Birthday`), "YYYY-MM-DD")
                                        //     :
                                        (props.Client?.birthday) ?
                                            moment(props.Client.birthday, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                        // )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("DayCareInformationPage", `Birthday`, value);
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
                                        // globalContextService.get("DayCareInformationPage", "Sex") ?? { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                        (!isNil(props.Client?.sex)) ?
                                            { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                            :
                                            null
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log("value", value)
                                        globalContextService.set("DayCareInformationPage", "Sex", value);
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
                                    value={globalContextService.get("DayCareInformationPage", "Uid") ?? props.Client?.uid}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DayCareInformationPage", "Uid", value);
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
                                viewType
                                topLabel={<>案號</>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareAddPage", "CaseNumber") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareAddPage", "CaseNumber", value);
                                }}
                                theme={tablet.caseNumber}
                            />

                            {/* 市話 Telephone */}
                            <TextInput
                                viewType
                                topLabel={<>市話</>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("DayCareAddPage", "Telephone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareAddPage", "Telephone", value);
                                }}
                                theme={tablet.telephone}
                            />

                            {/* 日照中心 DayCareCenter */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>日照中心</>}
                                bottomLabel={""}
                                viewType
                                isSearchable
                                placeholder={"請選擇日照中心"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("DayCareAddPage", "DayCareCenter") ?? null}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("DayCareAddPage", "DayCareCenter", value);
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

                            {/* 居住地(地址) Address */}
                            <TextInput
                                viewType
                                topLabel={"居住地"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                // placeholder={"請輸入居住地址"}
                                // bottomLabel={"為避免無法成功預約訂車，門牌號碼及巷弄請使用半形數字，且勿填寫樓層及備註"}
                                value={
                                    globalContextService.get("DayCareInformationPage", "Address") ??
                                    (
                                        (!isNil(props.CaseUsers?.county)) ?
                                            `${props.CaseUsers.county}${props.CaseUsers.district}${props.CaseUsers.addr}`
                                            :
                                            null
                                    )
                                }
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareInformationPage", "Address", value);
                                }}
                                theme={tablet.address}
                            />

                            {/* 經度 Longitude */}
                            <TextInput
                                viewType
                                topLabel={"經度"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareInformationPage", "Longitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareInformationPage", "Longitude0", value);
                                }}
                                theme={tablet.longitude}
                            />

                            {/* 緯度 Latitude */}
                            <TextInput
                                viewType
                                topLabel={"緯度"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareInformationPage", "Latitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareInformationPage", "Latitude0", value);
                                }}
                                theme={tablet.latitude}
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
                                viewType
                                // topLabel={"緯度"}
                                topLabel={<>當趟費用</>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareAddPage", "TripFee") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareAddPage", "TripFee", value);
                                }}
                                theme={tablet.tripFee}
                            />

                            {/* 首次乘車日 FirstTravelDate */}
                            <DateTimePicker
                                topLabel={<>首次乘車日</>}
                                // type={"time"} time、date、week、month、quarter、year
                                type={"date"}
                                format={"YYYY-MM-DD"}
                                bascDefaultTheme={"DefaultTheme"}
                                viewType
                                isSearchable
                                placeholder={""}
                                value={
                                    (globalContextService.get("DayCareAddPage", "FirstTravelDate")) ?
                                        moment(globalContextService.get("DayCareAddPage", "FirstTravelDate"), "YYYY-MM-DD HH:mm:ss")
                                        :
                                        null
                                }
                                onChange={(value, momentObj) => {
                                    globalContextService.set("DayCareAddPage", "FirstTravelDate", value);
                                }}
                                theme={tablet.firstTravelDate}
                            />

                            {/* 是否需要踏板 PedalReview */}
                            <Radio
                                viewType
                                // disable
                                topLabel={"是否需要踏板"}
                                value={globalContextService.get("DayCareAddPage", "PedalReview") ?? 1}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("DayCareAddPage", "PedalReview", value);
                                    // console.log(globalContextService.get("DayCareAddPage", "CarReview"));
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
                                topLabel={<>輪椅選擇</>}
                                bottomLabel={""}
                                viewType
                                isSearchable
                                placeholder={"請選擇輪椅"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("DayCareAddPage", "Wheelchair") ?? null}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("DayCareAddPage", "Wheelchair", value);
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
                                    viewType
                                    // disable
                                    topLabel={"前往日照"}
                                    value={globalContextService.get("DayCareAddPage", "GoToCenterReview") ?? 1}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareAddPage", "GoToCenterReview", value);
                                        // console.log(globalContextService.get("DayCareAddPage", "CarReview"));
                                    }}
                                    theme={tablet.goToCenterReview}
                                >
                                    {/* 前往日照 GoToCenterReview  選項 */}
                                    <RadioItem value={1} >是</RadioItem>
                                    <RadioItem value={0} >否</RadioItem>
                                </Radio>

                                {/* 前往日照 日期選擇 GoDateChoiceEquipment */}
                                <Checkbox
                                    viewType
                                    checked={globalContextService.get("DayCareAddPage", "GoDateChoiceEquipment") ?? []}
                                    // disable
                                    topLabel={"日期選擇"}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareAddPage", "GoDateChoiceEquipment", value);
                                        // console.log(globalContextService.get("DayCareAddPage", "CarEquipment"));
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
                                    viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("DayCareAddPage", "GoDepartureTime")) ?
                                            moment(globalContextService.get("DayCareAddPage", "GoDepartureTime"), "HH:mm")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("DayCareAddPage", "GoDepartureTime", value);
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
                                    viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("DayCareAddPage", "BoardingTime")) ?
                                            moment(globalContextService.get("DayCareAddPage", "BoardingTime"), "HH:mm")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("DayCareAddPage", "BoardingTime", value);
                                    }}
                                    theme={tablet.boardingTime}
                                />

                                {/* 去程車號 GoCarNumber */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>去程車號</>}
                                    bottomLabel={""}
                                    viewType
                                    isSearchable
                                    placeholder={"請選擇車號"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("DayCareAddPage", "GoCarNumber") ?? null}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareAddPage", "GoCarNumber", value);
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
                                    viewType
                                    // disable
                                    topLabel={"返回住家"}
                                    value={globalContextService.get("DayCareAddPage", "BackToHomeReview") ?? 1}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareAddPage", "BackToHomeReview", value);
                                        // console.log(globalContextService.get("DayCareAddPage", "CarReview"));
                                    }}
                                    theme={tablet.backToHomeReview}
                                >
                                    {/* 返回住家 BackToHome */}
                                    <RadioItem value={1} >是</RadioItem>
                                    <RadioItem value={0} >否</RadioItem>
                                </Radio>

                                {/* 返回住家 日期選擇 BackDateChoiceEquipment */}
                                <Checkbox
                                    viewType
                                    checked={globalContextService.get("DayCareAddPage", "BackDateChoiceEquipment") ?? []}
                                    // disable
                                    topLabel={"日期選擇"}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareAddPage", "BackDateChoiceEquipment", value);
                                        // console.log(globalContextService.get("DayCareAddPage", "CarEquipment"));
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
                                    viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("DayCareAddPage", "BackDepartureTime")) ?
                                            moment(globalContextService.get("DayCareAddPage", "BackDepartureTime"), "HH:mm")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("DayCareAddPage", "BackDepartureTime", value);
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
                                    viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("DayCareAddPage", "ArrivalTime")) ?
                                            moment(globalContextService.get("DayCareAddPage", "ArrivalTime"), "HH:mm")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("DayCareAddPage", "ArrivalTime", value);
                                    }}
                                    theme={tablet.arrivalTime}
                                />

                                {/* 回程車號 BackCarNumber */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>回程車號</>}
                                    bottomLabel={""}
                                    viewType
                                    isSearchable
                                    placeholder={"請選擇車號"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("DayCareAddPage", "BackCarNumber") ?? null}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareAddPage", "BackCarNumber", value);
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
                                viewType
                                baseDefaultTheme={"DefaultTheme"}
                                placeholder={""}
                                value={globalContextService.get("DayCareInformationPage", "DriverNote") ?? props.CaseUsers?.remark}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareInformationPage", "DriverNote", value);
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
                                viewType
                                topLabel={"聯絡人姓名"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareInformationPage", "ContactName") ?? props.CaseUsers?.urgentName}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareInformationPage", "ContactName", value);
                                }}
                                theme={tablet.contactName}
                            />

                            {/* 關係 Relationship */}
                            <TextInput
                                viewType
                                topLabel={"關係"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareInformationPage", "Relationship") ?? props.CaseUsers?.urgentRelationship}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareInformationPage", "Relationship", value);
                                }}
                                theme={tablet.relationship}
                            />

                            {/* 聯絡人手機 ContactCellphone */}
                            <TextInput
                                viewType
                                topLabel={"聯絡人手機"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0987654321"}
                                value={globalContextService.get("DayCareInformationPage", "ContactCellphone") ?? props.CaseUsers?.urgentPhone}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareInformationPage", "ContactCellphone", value);
                                }}
                                theme={tablet.contactCellphone}
                            />

                            {/* 聯絡人市話 ContactTelephone */}
                            <TextInput
                                viewType
                                topLabel={"聯絡人市話"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("DayCareInformationPage", "ContactTelephone") ?? props.CaseUsers?.urgentTel}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareInformationPage", "ContactTelephone", value);
                                }}
                                theme={tablet.contactTelephone}
                            />

                        </FormRow>
                    </FormContainer>
                </BasicContainer>
            </MainPageContainer>
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`