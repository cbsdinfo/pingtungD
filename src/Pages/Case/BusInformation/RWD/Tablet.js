import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { ReactComponent as EditPen } from '../../../../Assets/img/BusInformationPage/EditPen.svg'
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { busInformation: { rwd: { tablet } } } } } = Theme;

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
                            titleText={"幸福巴士詳細基本資料"}
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
                        {/*  編輯幸福巴士個案基本資料按鈕 (基本資料 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 編輯幸福巴士個案基本資料按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                icon={<EditPen style={tablet.toEditButtonIcon} />}
                                text={"編輯幸福巴士個案基本資料"}
                                theme={tablet.toEditButton}
                                onClick={() => {
                                    props.controllGCS("goToEditPage");
                                    history.push(`/Case/BusEdit?userId=${props.UserId}&caseUserId=${props.CaseUserId}`)
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
                                    value={globalContextService.get("BusInformationPage", "Name") ?? props.Client?.name}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusInformationPage", "Name", value);
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
                                        // (globalContextService.get("BusInformationPage", `Birthday`) ?
                                        //     moment(globalContextService.get("BusInformationPage", `Birthday`), "YYYY-MM-DD")
                                        //     :
                                        (props.Client?.birthday) ?
                                            moment(props.Client.birthday, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                        // )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("BusInformationPage", `Birthday`, value);
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
                                        // globalContextService.get("BusInformationPage", "Sex") ?? { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                        (!isNil(props.Client?.sex)) ?
                                            { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                            :
                                            null
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log("value", value)
                                        globalContextService.set("BusInformationPage", "Sex", value);
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
                                    value={globalContextService.get("BusInformationPage", "Uid") ?? props.Client?.uid}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusInformationPage", "Uid", value);
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
                                    value={globalContextService.get("BusInformationPage", "Cellphone") ?? props.Client?.phone}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusInformationPage", "Cellphone", value);
                                    }}
                                    theme={tablet.cellPhone}
                                />

                            </FormRow>
                        </FormContainer>
                    </BasicContainer>

                    {/* 幸福巴士資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"幸福巴士資料"}
                        theme={tablet.busDataSubTitleBar}
                    />

                    {/* 幸福巴士資料容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.busDataContainer}
                    >
                        <FormRow>

                            {/* 卡號 CardNumber */}
                            <TextInput
                                viewType
                                topLabel={"卡號"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("BusInformationPage", "CardNumber") ?? props.BusUsers?.cardNo}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusInformationPage", "CardNumber", value);
                                }}
                                theme={tablet.cardNumber}
                            />

                        </FormRow>
                    </FormContainer>

                    {/* 備註 子標題列 */}
                    {/* <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"備註"}
                        theme={tablet.driverNoteSubTitleBar}
                    /> */}

                    {/* 備註表單區域容器 */}
                    {/* <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.driverNoteContainer}
                    >
                        <FormRow> */}
                    {/* 備註 DriverNote */}
                    {/* <Textarea
                                baseDefaultTheme={"DefaultTheme"}
                                placeholder={""}
                                value={globalContextService.get("BusInformationPage", "DriverNote") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusInformationPage", "DriverNote", value); */}

                    {/* }}
                                theme={tablet.driverNote} */}
                    {/* /> */}
                    {/* </FormRow>
                    </FormContainer> */}

                    {/* 緊急聯絡人資訊 子標題列 */}
                    {/* <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"緊急聯絡人資訊"}
                        theme={tablet.emergencyContactSubTitleBar}
                    /> */}

                    {/* 緊急聯絡人資訊 區域容器 */}
                    {/* <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.emergencyContactContainer}
                    >
                        <FormRow> */}
                    {/* 聯絡人姓名 ContactName */}
                    {/* <TextInput
                                topLabel={"聯絡人姓名"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("BusInformationPage", "ContactName") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusInformationPage", "ContactName", value);
                                }}
                                theme={tablet.contactName}
                            /> */}

                    {/* 關係 Relationship */}
                    {/* <TextInput
                                topLabel={"關係"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("BusInformationPage", "Relationship") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusInformationPage", "Relationship", value);
                                }}
                                theme={tablet.relationship}
                            /> */}

                    {/* 聯絡人手機 ContactCellphone */}
                    {/* <TextInput
                                topLabel={"聯絡人手機"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0987654321"}
                                value={globalContextService.get("BusInformationPage", "ContactCellphone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusInformationPage", "ContactCellphone", value);
                                }}
                                theme={tablet.contactCellphone}
                            /> */}

                    {/* 聯絡人市話 ContactTelephone */}
                    {/* <TextInput
                                topLabel={"聯絡人市話"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("BusInformationPage", "ContactTelephone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusInformationPage", "ContactTelephone", value);
                                }}
                                theme={tablet.contactTelephone}
                            /> */}


                    {/* </FormRow>
                    </FormContainer> */}
                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`

