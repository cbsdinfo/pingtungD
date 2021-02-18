import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../ProjectComponent';
import { ReactComponent as Plus } from '../../../../Assets/img/WhiteInformationPage/Plus.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/WhiteInformationPage/Convert.svg'
import { ReactComponent as Delete } from '../../../../Assets/img/WhiteInformationPage/Delete.svg'
import { ReactComponent as EditPen } from '../../../../Assets/img/WhiteInformationPage/EditPen.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { whiteInformation: { rwd: { laptop } } } } } = Theme;

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
                            titleText={"白牌車詳細基本資料"}
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
                    theme={laptop.AddPageContainer}
                >

                    {/* 基本資料編輯 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"基本資料"}
                        theme={laptop.driverBaseSubTitleBar}
                    >
                        {/*  編輯白牌車個案基本資料按鈕 (基本資料 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 編輯白牌車個案基本資料按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                icon={<EditPen style={laptop.toEditButtonIcon} />}
                                text={"編輯白牌車個案基本資料"}
                                theme={laptop.toEditButton}
                                onClick={() => {
                                    props.controllGCS("goToEditPage");
                                    history.push(`/Case/WhiteEdit?userId=${props.UserId}&caseUserId=${props.CaseUserId}`)
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
                                    value={globalContextService.get("WhiteInformationPage", "Name") ?? props.Client?.name}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("WhiteInformationPage", "Name", value);
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
                                        // (globalContextService.get("WhiteInformationPage", `Birthday`) ?
                                        //     moment(globalContextService.get("WhiteInformationPage", `Birthday`), "YYYY-MM-DD")
                                        //     :
                                        (props.Client?.birthday) ?
                                            moment(props.Client.birthday, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                        // )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("WhiteInformationPage", `Birthday`, value);
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
                                        // globalContextService.get("WhiteInformationPage", "Sex") ?? { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                        (!isNil(props.Client?.sex)) ?
                                            { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                            :
                                            null
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log("value", value)
                                        globalContextService.set("WhiteInformationPage", "Sex", value);
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
                                    value={globalContextService.get("WhiteInformationPage", "Uid") ?? props.Client?.uid}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("WhiteInformationPage", "Uid", value);
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
                                    value={globalContextService.get("WhiteInformationPage", "Cellphone") ?? props.Client?.phone}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("WhiteInformationPage", "Cellphone", value);
                                    }}
                                    theme={laptop.cellPhone}
                                />

                            </FormRow>
                        </FormContainer>
                    </BasicContainer>

                    {/* 白牌車資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"白牌車資料"}
                        theme={laptop.whiteCaseDataSubTitleBar}
                    />

                    {/* 白牌車資料容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.whiteCaseDataContainer}
                    >
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
                                    globalContextService.get("WhiteInformationPage", "Address") ??
                                    (
                                        (!isNil(props.CaseUsers?.county)) ?
                                            `${props.CaseUsers.county}${props.CaseUsers.district}${props.CaseUsers.addr}`
                                            :
                                            null
                                    )
                                }
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteInformationPage", "Address", value);
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
                                value={globalContextService.get("WhiteInformationPage", "Longitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteInformationPage", "Longitude0", value);
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
                                value={globalContextService.get("WhiteInformationPage", "Latitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteInformationPage", "Latitude0", value);
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
                                value={globalContextService.get("WhiteInformationPage", "DriverNote") ?? props.CaseUsers?.remark}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteInformationPage", "DriverNote", value);
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
                                value={globalContextService.get("WhiteInformationPage", "ContactName") ?? props.CaseUsers?.urgentName}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteInformationPage", "ContactName", value);
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
                                value={globalContextService.get("WhiteInformationPage", "Relationship") ?? props.CaseUsers?.urgentRelationship}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteInformationPage", "Relationship", value);
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
                                value={globalContextService.get("WhiteInformationPage", "ContactCellphone") ?? props.CaseUsers?.urgentPhone}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteInformationPage", "ContactCellphone", value);
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
                                value={globalContextService.get("WhiteInformationPage", "ContactTelephone") ?? props.CaseUsers?.urgentTel}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteInformationPage", "ContactTelephone", value);
                                }}
                                theme={laptop.contactTelephone}
                            />


                        </FormRow>
                    </FormContainer>

                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`

//#region 輪住地址區域表單組件
const TurnAddressComponents = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { caseAdd: { rwd: { laptop } } } } } = Theme;

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
                    globalContextService.set("WhiteInformationPage", "TurnAddressDefault", [value?.[value.length - 1]] ?? null);
                    console.log(globalContextService.get("WhiteInformationPage", "TurnAddressDefault"));
                    setCheckList(c => [value?.[value.length - 1]] ?? [])
                }}
                theme={laptop.turnAddressCheckboxGroup}
            >
                {/* 基本資料下方容器 */}
                <FormContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={laptop.turnAddressFormContainer}
                >
                    <FormRow>
                        {/* 輪住地址(縣市) TurnCounty */}
                        <Selector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={
                                <>輪住地址
                                    <CheckboxItem
                                        value={0}
                                        theme={laptop.turnAddressCheckboxItem}
                                    >  </CheckboxItem>
                                </>}
                            bottomLabel={"每月分配之額度1840/2400以居住地為主，若輪住至平區或偏區導致額度不同時，需請個管修改居住地資料。"}
                            //viewType
                            isSearchable
                            placeholder={"居住縣市"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("WhiteInformationPage", "TurnCounty0") ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteInformationPage", "TurnCounty0", value);
                            }}

                            options={[
                                { value: 'hint', label: "選擇居住縣市", isDisabled: true },
                                { value: 0, label: 'XX縣' },
                                { value: 1, label: 'XX市' }
                            ]}
                            // menuPosition={true}
                            theme={laptop.turnCounty}
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
                            value={globalContextService.get("WhiteInformationPage", "TurnDistrict0") ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteInformationPage", "TurnDistrict0", value);
                            }}

                            options={[
                                { value: 'hint', label: "選擇居住區域", isDisabled: true },
                                { value: 0, label: 'XX區' },
                                { value: 1, label: 'XX區' }
                            ]}
                            // menuPosition={true}
                            theme={laptop.turnDistrict}
                        />

                        {/* 輪住地址(地址) TurnAddress */}
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
                            value={globalContextService.get("WhiteInformationPage", "TurnAddress0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteInformationPage", "TurnAddress0", value);
                            }}
                            theme={laptop.turnAddress}
                        />

                        {/* 經度 Longitude */}
                        <TextInput
                            viewType
                            topLabel={"經度"}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("WhiteInformationPage", "Longitude0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteInformationPage", "Longitude0", value);
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
                            value={globalContextService.get("WhiteInformationPage", "Latitude0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteInformationPage", "Latitude0", value);
                            }}
                            theme={laptop.latitude}
                        />

                        <MoreTurnAddress TurnAddressArray={TurnAddressArray} setTurnAddressArray={setTurnAddressArray} setCheckList={setCheckList} />

                        <SubContainer theme={laptop.addTurnAddressButtonContainer}>
                            {/* 新增輪住地址按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptop.addTurnAddressButton}
                                onClick={() => { setTurnAddressArray(t => [...t, 0]); /*console.log(CheckList)*/ }}
                            >
                                <Plus style={laptop.addTurnAddressButtonIcon} />
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
    const { pages: { cases: { caseAdd: { rwd: { laptop } } } } } = Theme;

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
                                        theme={laptop.turnAddressCheckboxItem}
                                    >  </CheckboxItem>
                                </>}
                            bottomLabel={"每月分配之額度1840/2400以居住地為主，若輪住至平區或偏區導致額度不同時，需請個管修改居住地資料。"}
                            //viewType
                            isSearchable
                            placeholder={"居住縣市"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("WhiteInformationPage", `TurnCounty${index + 1}`) ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteInformationPage", `TurnCounty${index + 1}`, value);
                            }}

                            options={
                                [
                                    { value: 'hint', label: "選擇居住縣市", isDisabled: true },
                                    { value: 0, label: 'XX縣' },
                                    { value: 1, label: 'XX市' }
                                ]}
                            // menuPosition={true}
                            theme={laptop.turnCounty}
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
                            value={globalContextService.get("WhiteInformationPage", `TurnDistrict${index + 1}`) ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteInformationPage", `TurnDistrict${index + 1}`, value);
                            }}

                            options={
                                [
                                    { value: 'hint', label: "選擇居住區域", isDisabled: true },
                                    { value: 0, label: 'XX區' },
                                    { value: 1, label: 'XX區' }
                                ]}
                            // menuPosition={true}
                            theme={laptop.turnDistrict}
                        />

                        {/* 輪住地址(地址) TurnAddress */}
                        < TextInput
                            topLabel={
                                <>
                                    <Text theme={laptop.delContainer}
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
                                        <Delete style={laptop.delContainerIcon} />
                                        刪除
                                    </Text>
                                    <Text theme={laptop.convertContainer}
                                        onClick={() => { console.log("轉換經緯度") }}
                                    >
                                        <Convert style={laptop.convertContainerIcon} />
                                        轉換經緯度
                                    </Text>
                                </>
                            }
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={"請輸入居住地址"}
                            value={globalContextService.get("WhiteInformationPage", `TurnAddress${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteInformationPage", `TurnAddress${index + 1}`, value);
                            }}
                            theme={laptop.turnAddress}
                        />

                        {/* 經度 Longitude */}
                        < TextInput
                            viewType
                            topLabel={"經度"}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("WhiteInformationPage", `Longitude${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteInformationPage", `Longitude${index + 1}`, value);
                            }}
                            theme={laptop.longitude}
                        />

                        {/* 緯度 Latitude */}
                        < TextInput
                            viewType
                            topLabel={"緯度"}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("WhiteInformationPage", `Latitude${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteInformationPage", `Latitude${index + 1}`, value);
                            }}
                            theme={laptop.latitude}
                        />
                    </React.Fragment>
                )
            })
            }
        </>
    )
}
//#endregion

