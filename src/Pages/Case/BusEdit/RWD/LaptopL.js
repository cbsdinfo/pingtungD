import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../ProjectComponent';
import { ReactComponent as Plus } from '../../../../Assets/img/BusEditPage/Plus.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/BusEditPage/Convert.svg'
import { ReactComponent as Delete } from '../../../../Assets/img/BusEditPage/Delete.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { busEdit: { rwd: { laptopL } } } } } = Theme;

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
                            titleText={"幸福巴士基本資料編輯"}
                            theme={laptopL.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/*  回上一頁按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 回上一頁按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.returnButton}
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
                                    if (valid(globalContextService.get("BusEditPage", "CardNumber") ?? "", ["^.{1,}$"], ["請輸入卡號"])[1]) {
                                        validMsg = valid(globalContextService.get("BusEditPage", "CardNumber") ?? "", ["^.{1,}$"], ["請輸入卡號"])[1]
                                    }
                                    //#endregion

                                    //#region 表單驗證後動作
                                    if (validMsg !== "") {
                                        // console.log(validMsg, globalContextService.get("BusEditPage"))
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
                                        props.UpdateBusUserExecute({
                                            userId: props.UserId,
                                            cardNo: globalContextService.get("BusEditPage", "CardNumber"),
                                            id: props.BusUsers.id,// 畫面無對應欄位	id	長照個案ID，編輯須上送此欄位

                                            // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                            // remark: globalContextService.get("BusEditPage", "DriverNote"),
                                            // urgentName: globalContextService.get("BusEditPage", "ContactName"),
                                            // urgentRelationship: globalContextService.get("BusEditPage", "Relationship"),
                                            // urgentPhone: globalContextService.get("BusEditPage", "ContactCellphone"),
                                            // urgentTel: globalContextService.get("BusEditPage", "ContactTelephone"),
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
                                    value={globalContextService.get("BusEditPage", "Name") ?? props.Client?.name}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusEditPage", "Name", value);
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
                                        // (globalContextService.get("BusEditPage", `Birthday`) ?
                                        //     moment(globalContextService.get("BusEditPage", `Birthday`), "YYYY-MM-DD")
                                        //     :
                                        (props.Client?.birthday) ?
                                            moment(props.Client.birthday, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                        // )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("BusEditPage", `Birthday`, value);
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
                                        // globalContextService.get("BusEditPage", "Sex") ?? { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                        (!isNil(props.Client?.sex)) ?
                                            { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                            :
                                            null
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log("value", value)
                                        globalContextService.set("BusEditPage", "Sex", value);
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
                                    value={globalContextService.get("BusEditPage", "Uid") ?? props.Client?.uid}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusEditPage", "Uid", value);
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
                                    value={globalContextService.get("BusEditPage", "Cellphone") ?? props.Client?.phone}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusEditPage", "Cellphone", value);
                                    }}
                                    theme={laptopL.cellPhone}
                                />

                            </FormRow>
                        </FormContainer>
                    </BasicContainer>

                    {/* 幸福巴士資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"幸福巴士資料"}
                        theme={laptopL.busDataSubTitleBar}
                    />

                    {/* 幸福巴士資料容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.busDataContainer}
                    >
                        <FormRow>

                            {/* 卡號 CardNumber */}
                            <TextInput
                                // viewType
                                topLabel={<>卡號<Text theme={laptopL.cardNumberRequired}>(必填)</Text></>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("BusEditPage", "CardNumber") ?? props.BusUsers?.cardNo}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusEditPage", "CardNumber", value);
                                }}
                                theme={laptopL.cardNumber}
                            />

                        </FormRow>
                    </FormContainer>

                    {/* 備註 子標題列 */}
                    {/* <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"備註"}
                        theme={laptopL.driverNoteSubTitleBar}
                    /> */}

                    {/* 備註表單區域容器 */}
                    {/* <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.driverNoteContainer}
                    >
                        <FormRow> */}
                    {/* 備註 DriverNote */}
                    {/* <Textarea
                                baseDefaultTheme={"DefaultTheme"}
                                placeholder={""}
                                value={globalContextService.get("BusEditPage", "DriverNote") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusEditPage", "DriverNote", value); */}

                    {/* }}
                                theme={laptopL.driverNote} */}
                    {/* /> */}
                    {/* </FormRow>
                    </FormContainer> */}

                    {/* 緊急聯絡人資訊 子標題列 */}
                    {/* <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"緊急聯絡人資訊"}
                        theme={laptopL.emergencyContactSubTitleBar}
                    /> */}

                    {/* 緊急聯絡人資訊 區域容器 */}
                    {/* <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptopL.emergencyContactContainer}
                    >
                        <FormRow> */}
                    {/* 聯絡人姓名 ContactName */}
                    {/* <TextInput
                                topLabel={"聯絡人姓名"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("BusEditPage", "ContactName") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusEditPage", "ContactName", value);
                                }}
                                theme={laptopL.contactName}
                            /> */}

                    {/* 關係 Relationship */}
                    {/* <TextInput
                                topLabel={"關係"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("BusEditPage", "Relationship") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusEditPage", "Relationship", value);
                                }}
                                theme={laptopL.relationship}
                            /> */}

                    {/* 聯絡人手機 ContactCellphone */}
                    {/* <TextInput
                                topLabel={"聯絡人手機"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0987654321"}
                                value={globalContextService.get("BusEditPage", "ContactCellphone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusEditPage", "ContactCellphone", value);
                                }}
                                theme={laptopL.contactCellphone}
                            /> */}

                    {/* 聯絡人市話 ContactTelephone */}
                    {/* <TextInput
                                topLabel={"聯絡人市話"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("BusEditPage", "ContactTelephone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusEditPage", "ContactTelephone", value);
                                }}
                                theme={laptopL.contactTelephone}
                            /> */}


                    {/* </FormRow>
                    </FormContainer> */}

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
                                        if (valid(globalContextService.get("BusEditPage", "CardNumber") ?? "", ["^.{1,}$"], ["請輸入卡號"])[1]) {
                                            validMsg = valid(globalContextService.get("BusEditPage", "CardNumber") ?? "", ["^.{1,}$"], ["請輸入卡號"])[1]
                                        }
                                        //#endregion

                                        //#region 表單驗證後動作
                                        if (validMsg !== "") {
                                            // console.log(validMsg, globalContextService.get("BusEditPage"))
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
                                            props.UpdateBusUserExecute({
                                                userId: props.UserId,
                                                cardNo: globalContextService.get("BusEditPage", "CardNumber"),
                                                id: props.BusUsers.id,// 畫面無對應欄位	id	長照個案ID，編輯須上送此欄位

                                                // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                                // remark: globalContextService.get("BusEditPage", "DriverNote"),
                                                // urgentName: globalContextService.get("BusEditPage", "ContactName"),
                                                // urgentRelationship: globalContextService.get("BusEditPage", "Relationship"),
                                                // urgentPhone: globalContextService.get("BusEditPage", "ContactCellphone"),
                                                // urgentTel: globalContextService.get("BusEditPage", "ContactTelephone"),
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

