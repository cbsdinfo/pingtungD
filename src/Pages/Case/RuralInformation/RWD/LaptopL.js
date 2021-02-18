import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../ProjectComponent';
import { ReactComponent as Plus } from '../../../../Assets/img/RuralInformationPage/Plus.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/RuralInformationPage/Convert.svg'
import { ReactComponent as Delete } from '../../../../Assets/img/RuralInformationPage/Delete.svg'
import { ReactComponent as EditPen } from '../../../../Assets/img/RuralInformationPage/EditPen.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { ruralInformation: { rwd: { laptopL } } } } } = Theme;

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
                            titleText={"偏鄉運能不足詳細基本資料"}
                            theme={laptopL.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/*  列印按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 列印按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.printButton}
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
                        {/*  編輯偏鄉運能不足個案基本資料按鈕 (基本資料 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 編輯偏鄉運能不足個案基本資料按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                icon={<EditPen style={laptopL.toEditButtonIcon} />}
                                text={"編輯偏鄉運能不足個案基本資料"}
                                theme={laptopL.toEditButton}
                                onClick={() => {
                                    props.controllGCS("goToEditPage");
                                    history.push(`/Case/RuralEdit?userId=${props.UserId}&caseUserId=${props.CaseUserId}`)
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
                                    value={globalContextService.get("RuralInformationPage", "Name") ?? props.Client?.name}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("RuralInformationPage", "Name", value);
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
                                        // (globalContextService.get("RuralInformationPage", `Birthday`) ?
                                        //     moment(globalContextService.get("RuralInformationPage", `Birthday`), "YYYY-MM-DD")
                                        //     :
                                        (props.Client?.birthday) ?
                                            moment(props.Client.birthday, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                        // )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("RuralInformationPage", `Birthday`, value);
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
                                        // globalContextService.get("RuralInformationPage", "Sex") ?? { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                        (!isNil(props.Client?.sex)) ?
                                            { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                            :
                                            null
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log("value", value)
                                        globalContextService.set("RuralInformationPage", "Sex", value);
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
                                    value={globalContextService.get("RuralInformationPage", "Uid") ?? props.Client?.uid}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("RuralInformationPage", "Uid", value);
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
                                    value={globalContextService.get("RuralInformationPage", "Cellphone") ?? props.Client?.phone}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("RuralInformationPage", "Cellphone", value);
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

                            {/* 居住地(地址) Address */}
                            <TextInput
                                viewType
                                topLabel={"居住地"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                // placeholder={"請輸入居住地址"}
                                // bottomLabel={"為避免無法成功預約訂車，門牌號碼及巷弄請使用半形數字，且勿填寫樓層及備註"}
                                value={globalContextService.get("RuralInformationPage", "Address") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralInformationPage", "Address", value);
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
                                value={globalContextService.get("RuralInformationPage", "Longitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralInformationPage", "Longitude0", value);
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
                                value={globalContextService.get("RuralInformationPage", "Latitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralInformationPage", "Latitude0", value);
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
                                viewType
                                baseDefaultTheme={"DefaultTheme"}
                                placeholder={""}
                                value={globalContextService.get("RuralInformationPage", "DriverNote") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralInformationPage", "DriverNote", value);
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
                                viewType
                                topLabel={"聯絡人姓名"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("RuralInformationPage", "ContactName") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralInformationPage", "ContactName", value);
                                }}
                                theme={laptopL.contactName}
                            />

                            {/* 關係 Relationship */}
                            <TextInput
                                viewType
                                topLabel={"關係"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("RuralInformationPage", "Relationship") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralInformationPage", "Relationship", value);
                                }}
                                theme={laptopL.relationship}
                            />

                            {/* 聯絡人手機 ContactCellphone */}
                            <TextInput
                                viewType
                                topLabel={"聯絡人手機"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0987654321"}
                                value={globalContextService.get("RuralInformationPage", "ContactCellphone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralInformationPage", "ContactCellphone", value);
                                }}
                                theme={laptopL.contactCellphone}
                            />

                            {/* 聯絡人市話 ContactTelephone */}
                            <TextInput
                                viewType
                                topLabel={"聯絡人市話"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("RuralInformationPage", "ContactTelephone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralInformationPage", "ContactTelephone", value);
                                }}
                                theme={laptopL.contactTelephone}
                            />


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
                    globalContextService.set("RuralInformationPage", "TurnAddressDefault", [value?.[value.length - 1]] ?? null);
                    console.log(globalContextService.get("RuralInformationPage", "TurnAddressDefault"));
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
                            value={globalContextService.get("RuralInformationPage", "TurnCounty0") ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("RuralInformationPage", "TurnCounty0", value);
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
                            value={globalContextService.get("RuralInformationPage", "TurnDistrict0") ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("RuralInformationPage", "TurnDistrict0", value);
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
                            value={globalContextService.get("RuralInformationPage", "TurnAddress0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("RuralInformationPage", "TurnAddress0", value);
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
                            value={globalContextService.get("RuralInformationPage", "Longitude0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("RuralInformationPage", "Longitude0", value);
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
                            value={globalContextService.get("RuralInformationPage", "Latitude0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("RuralInformationPage", "Latitude0", value);
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
                            value={globalContextService.get("RuralInformationPage", `TurnCounty${index + 1}`) ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("RuralInformationPage", `TurnCounty${index + 1}`, value);
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
                            value={globalContextService.get("RuralInformationPage", `TurnDistrict${index + 1}`) ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("RuralInformationPage", `TurnDistrict${index + 1}`, value);
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
                            value={globalContextService.get("RuralInformationPage", `TurnAddress${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("RuralInformationPage", `TurnAddress${index + 1}`, value);
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
                            value={globalContextService.get("RuralInformationPage", `Longitude${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("RuralInformationPage", `Longitude${index + 1}`, value);
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
                            value={globalContextService.get("RuralInformationPage", `Latitude${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("RuralInformationPage", `Latitude${index + 1}`, value);
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

