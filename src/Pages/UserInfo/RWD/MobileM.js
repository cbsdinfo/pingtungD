import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, MainPageSubTitleBar, TimeCounterButton } from '../../../ProjectComponent';
import { Container, BasicContainer, BasicButton, TreeSelector, Tooltip, DateTimePicker, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Lock } from '../../../Assets/img/UserInfoPage/Lock.svg'
import { isNil } from 'lodash';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { fmt } from '../../../Handlers/DateHandler';
import { isUndefined, isEqual } from 'lodash';
import { valid } from '../../../Handlers';
import { WhiteSingUp } from '../../../ProjectComponent/WhiteSingUp/WhiteSingUp';


const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { userInfo: { rwd: { mobileM } } } } = Theme;
    const [Width, Height] = useWindowSize();

    return (
        <>
            <MainPageContainer
                height={Height}
                theme={mobileM.mainPageContainer}
            >
                {/* 基本資料表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={mobileM.basicInformationContainer}
                >
                    {/* 基本資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"基本資料"}
                        theme={mobileM.basicInfBaseSubTitleBar}
                    >
                        {/*  修改密碼按鈕 (標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 修改密碼按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={mobileM.editPwdButton}
                                onClick={(e) => {
                                    e.preventDefault();

                                    //#region 打開修改密碼 Modal
                                    modalsService.titleModal.normal({
                                        //id: "top1",
                                        title: "修改密碼",
                                        yes: true,
                                        yesText: "確認",
                                        no: true,
                                        noText: "取消",
                                        // autoClose: true,
                                        backgroundClose: false,
                                        noOnClick: (e) => {
                                            props.controllGCS("changePwd")
                                        },
                                        yesOnClick: (e, close) => {
                                            //#region 表單驗證
                                            let validMsg = "";
                                            if (valid(globalContextService.get("UserInfoPage", "OldPwd") ?? "", ["^.{1,}$"], ["請輸入舊密碼"])[1]) {
                                                validMsg = valid(globalContextService.get("UserInfoPage", "OldPwd") ?? "", ["^.{1,}$"], ["請輸入舊密碼"])[1]
                                            }
                                            else if (valid(globalContextService.get("UserInfoPage", "NewPwd") ?? "", ["^.{1,}$", "^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,}$"], ["請輸入新密碼", "新密碼請輸入：8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。"])[1]) {
                                                validMsg = valid(globalContextService.get("UserInfoPage", "NewPwd") ?? "", ["^.{1,}$", "^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,}$"], ["請輸入新密碼", "新密碼請輸入：8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。"])[1]
                                            }
                                            else if (valid(globalContextService.get("UserInfoPage", "ConfirmPwd") ?? "", ["^.{1,}$"], ["請輸入確認新密碼"])[1]) {
                                                validMsg = valid(globalContextService.get("UserInfoPage", "ConfirmPwd") ?? "", ["^.{1,}$"], ["請輸入確認新密碼"])[1]
                                            }
                                            else if (isEqual(globalContextService.get("UserInfoPage", "OldPwd"), globalContextService.get("UserInfoPage", "NewPwd"))) {
                                                validMsg = "新密碼請勿與舊密碼相同"
                                            }
                                            else if (!isEqual(globalContextService.get("UserInfoPage", "NewPwd"), globalContextService.get("UserInfoPage", "ConfirmPwd"))) {
                                                validMsg = "確認新密碼輸入不相符"
                                            }
                                            //#endregion

                                            //#region 表單驗證後動作
                                            if (validMsg !== "") {
                                                // console.log(validMsg, globalContextService.get("OperatingUnitSettingPage"))
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
                                                props.ChangePwdExecute({
                                                    account: props.BasicInf.account,
                                                    password: globalContextService.get("UserInfoPage", "NewPwd")
                                                })
                                                props.controllGCS("changePwd")
                                                close();
                                            }
                                            //#endregion
                                        },
                                        closeIconOnClick: (e) => {
                                            props.controllGCS("changePwd")
                                        },
                                        content: (
                                            <FormContainer
                                                baseDefaultTheme={"DefaultTheme"}
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                }}
                                                theme={mobileM.editPwdFormContainer}
                                            >
                                                <FormRow baseDefaultTheme={"DefaultTheme"}>

                                                    {/* 修改密碼提示文字 */}
                                                    < Text
                                                        theme={mobileM.editPwdTip}
                                                    >
                                                        8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。
                                                    </Text>

                                                    {/* 舊密碼 OldPwd */}
                                                    <TextInput
                                                        topLabel={<>舊密碼</>}
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        type="password"
                                                        placeholder={"請輸入舊密碼"}
                                                        leftIcon={
                                                            <Lock
                                                                style={mobileM.pwdLeftIcon}
                                                            />
                                                        }
                                                        openEye
                                                        value={globalContextService.get("UserInfoPage", "OldPwd")}
                                                        onChange={(e, value, onInitial) => {
                                                            globalContextService.set("UserInfoPage", "OldPwd", value);
                                                        }}
                                                        theme={mobileM.oldPwd}
                                                    />

                                                    {/* 新密碼 NewPwd */}
                                                    <TextInput
                                                        topLabel={<>新密碼</>}
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        type="password"
                                                        placeholder={"請輸入新密碼"}
                                                        leftIcon={
                                                            <Lock
                                                                style={mobileM.pwdLeftIcon}
                                                            />
                                                        }
                                                        openEye
                                                        value={globalContextService.get("UserInfoPage", "NewPwd")}
                                                        onChange={(e, value, onInitial) => {
                                                            globalContextService.set("UserInfoPage", "NewPwd", value);
                                                        }}
                                                        theme={mobileM.newPwd}
                                                    />

                                                    {/* 確認新密碼 ConfirmPwd */}
                                                    <TextInput
                                                        topLabel={<>確認新密碼</>}
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        type="password"
                                                        placeholder={"請輸入新密碼"}
                                                        leftIcon={
                                                            <Lock
                                                                style={mobileM.pwdLeftIcon}
                                                            />
                                                        }
                                                        openEye
                                                        value={globalContextService.get("UserInfoPage", "ConfirmPwd")}
                                                        onChange={(e, value, onInitial) => {
                                                            globalContextService.set("UserInfoPage", "ConfirmPwd", value);
                                                        }}
                                                        theme={mobileM.confirmPwd}
                                                    />

                                                </FormRow>
                                            </FormContainer>
                                        ),
                                        theme: mobileM.editPwdModal
                                    })
                                    //#endregion
                                }}
                            >
                                修改密碼
                                </NativeLineButton>
                        </SubContainer>

                        {/*  修改手機按鈕 (標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 修改手機按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={mobileM.editPhoneButton}
                                onClick={(e) => {
                                    e.preventDefault();

                                    let rowData = {};

                                    //#region 打開修改手機 發送驗證碼 Modal
                                    modalsService.titleModal.normal({
                                        //id: "top1",
                                        title: "修改手機",
                                        yes: true,
                                        yesText: "發送驗證碼",
                                        no: true,
                                        noText: "取消",
                                        // autoClose: true,
                                        backgroundClose: false,
                                        noOnClick: (e) => {
                                            // props.controllGCS("addClientModalClose")
                                        },
                                        yesOnClick: (e, close) => {
                                            //#region 表單驗證
                                            let validMsg = "";

                                            //#endregion

                                            //#region 表單驗證後動作
                                            if (validMsg !== "") {
                                                // console.log(validMsg, globalContextService.get("OperatingUnitSettingPage"))
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
                                                close();

                                                //#region 打開修改手機 提交驗證碼 Modal
                                                modalsService.titleModal.normal({
                                                    //id: "top1",
                                                    title: "修改手機",
                                                    yes: true,
                                                    yesText: "提交驗證碼",
                                                    no: true,
                                                    noText: "取消",
                                                    // autoClose: true,
                                                    backgroundClose: false,
                                                    noOnClick: (e) => {
                                                        // props.controllGCS("addClientModalClose")
                                                    },
                                                    yesOnClick: (e, close) => {
                                                        //#region 表單驗證
                                                        let validMsg = "";

                                                        //#endregion

                                                        //#region 表單驗證後動作
                                                        if (validMsg !== "") {
                                                            // console.log(validMsg, globalContextService.get("OperatingUnitSettingPage"))
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
                                                            close();

                                                            //#region 打開修手機驗證成功 Modal
                                                            modalsService.infoModal.success({
                                                                iconRightText: "手機驗證成功",
                                                                yes: true,
                                                                yesText: "確認",
                                                                // no: true,
                                                                // autoClose: true,
                                                                backgroundClose: false,
                                                                yesOnClick: (e, close) => { close(); },
                                                                theme: mobileM.successModal
                                                            })
                                                        }
                                                        //#endregion
                                                    },
                                                    closeIconOnClick: (e) => {
                                                        // props.controllGCS("addClientModalClose")
                                                    },
                                                    content: (
                                                        <>
                                                            {/*提交驗證碼容器*/}
                                                            <FormContainer
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                onSubmit={(e) => {
                                                                    e.preventDefault();
                                                                }}
                                                                theme={mobileM.confirmVerificationCodeFormContainer}
                                                            >
                                                                <FormRow baseDefaultTheme={"DefaultTheme"}>

                                                                    {/* 提交驗證碼提示文字 */}
                                                                    < Text
                                                                        theme={mobileM.confirmVerificationCodeTip}
                                                                    >
                                                                        已發送簡訊驗證碼到您的手機
                                                                    </Text>

                                                                    {/* 手機號碼 ModalEditCellPhone */}
                                                                    <TextInput
                                                                        topLabel={<>手機號碼</>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={"請輸入手機號碼"}
                                                                        value={globalContextService.get("UserInfoPage", "ModalEditCellPhone") ?? ""}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("UserInfoPage", "ModalEditCellPhone", value);
                                                                        }}
                                                                        theme={mobileM.modalEditCellPhone}
                                                                    />

                                                                    {/* 驗證碼 ModalVerificationCode */}
                                                                    <TextInput
                                                                        topLabel={<>驗證碼</>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={"請輸入驗證碼"}
                                                                        value={globalContextService.get("UserInfoPage", "ModalVerificationCode") ?? ""}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("UserInfoPage", "ModalVerificationCode", value);
                                                                        }}
                                                                        theme={mobileM.modalVerificationCode}
                                                                    />

                                                                    <Container
                                                                        theme={mobileM.timeCounterContainer}
                                                                    >
                                                                        <TimeCounterButton
                                                                            getPresetWaitSecToZero={true}
                                                                            getPresetCounter={10}
                                                                        />
                                                                    </Container>

                                                                </FormRow>
                                                            </FormContainer>
                                                        </>
                                                    ),
                                                    theme: mobileM.confirmVerificationCodeModal
                                                })
                                                //#endregion
                                            }
                                            //#endregion
                                        },
                                        closeIconOnClick: (e) => {
                                            // props.controllGCS("addClientModalClose")
                                        },
                                        content: (
                                            <>
                                                {/*發送驗證碼容器*/}
                                                <FormContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    theme={mobileM.sendVerificationCodeFormContainer}
                                                >
                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>

                                                        {/* 手機號碼 ModalEditCellPhone */}
                                                        <TextInput
                                                            topLabel={<>手機號碼</>}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={"請輸入手機號碼"}
                                                            value={globalContextService.get("UserInfoPage", "ModalEditCellPhone") ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("UserInfoPage", "ModalEditCellPhone", value);
                                                            }}
                                                            theme={mobileM.modalEditCellPhone}
                                                        />

                                                    </FormRow>
                                                </FormContainer>
                                            </>
                                        ),
                                        theme: mobileM.sendVerificationCodeModal
                                    })
                                    //#endregion
                                }}
                            >
                                修改手機
                                </NativeLineButton>
                        </SubContainer>
                    </MainPageSubTitleBar>

                    {/* 基本資料容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                    >
                        <FormRow>

                            {/* 姓名 Name */}
                            <Container
                                theme={mobileM.universalContainer}
                            >
                                {/* 姓名 標題 */}
                                <Text
                                    theme={mobileM.nameTitle}
                                >
                                    姓名
                                </Text>

                                {/* 姓名 內文 */}
                                <Text
                                    theme={mobileM.nameText}
                                >
                                    {props.BasicInf?.name}
                                </Text>

                            </Container>

                            {/* 生日 Birthday */}
                            <Container
                                theme={mobileM.universalContainer}
                            >
                                {/* 生日 標題 */}
                                <Text
                                    theme={mobileM.birthTitle}
                                >
                                    生日
                                </Text>

                                {/* 生日 標題 */}
                                <Text
                                    theme={mobileM.birthText}
                                >
                                    {(props.BasicInf?.birthday) ?
                                        fmt(moment(props.BasicInf.birthday, "YYYY-MM-DD HH:mm:ss"), "YYYY-MM-DD")
                                        :
                                        ""
                                    }
                                </Text>

                            </Container>

                            {/* 性別 Sex */}
                            <Container
                                theme={mobileM.universalContainer}
                            >

                                {/* 性別 標題 */}
                                <Text
                                    theme={mobileM.sexTitle}
                                >
                                    性別
                                </Text>


                                {/* 性別 內文 */}
                                <Text
                                    theme={mobileM.sexText}
                                >
                                    {props.BasicInf.sex === 1 ? '男' : '女'}
                                </Text>

                            </Container>

                            {/* 身分證字號 Uid */}
                            <Container
                                theme={mobileM.universalContainer}
                            >
                                {/* 身分證字號 標題 */}
                                <Text
                                    theme={mobileM.uidTitle}
                                >
                                    身分證字號
                                </Text>

                                {/* 身分證字號 內文 */}
                                <Text
                                    theme={mobileM.uidText}
                                >
                                    {props.BasicInf?.uid}
                                </Text>

                            </Container>

                            {/* 手機 Cellphone */}
                            <Container
                                theme={mobileM.universalContainer}
                            >
                                {/* 手機 標題 */}
                                <Text
                                    theme={mobileM.cellphoneTitle}
                                >
                                    手機
                                </Text>

                                {/* 手機 內文 */}
                                <Text
                                    theme={mobileM.cellphoneText}
                                >
                                    {props.BasicInf?.phone}
                                </Text>

                            </Container>

                        </FormRow>
                    </FormContainer>
                </BasicContainer>

                {/* 判斷有無長照身分 */}
                {!isEqual(props.CaseInf, {})
                    &&
                    <>
                        {/* 長照資料表單區容器 */}
                        <BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={mobileM.caseInformationContainer}
                        >
                            {/* 長照資料 子標題列 */}
                            <MainPageSubTitleBar
                                bascDefaultTheme={"DefaultTheme"}
                                titleText={"長照"}
                                theme={mobileM.caseInfBaseSubTitleBar}
                            >
                                {/*  額度狀況按鈕 (標題列右方) 容器 */}
                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                    {/* 額度狀況按鈕 */}
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // 防止提交
                                        theme={mobileM.quotaStatusButton}
                                        onClick={(e) => {
                                            e.preventDefault();

                                            let rowData = {};

                                            //#region 打開額度狀況 Modal
                                            modalsService.titleModal.normal({
                                                //id: "top1",
                                                title: "額度狀況",
                                                yes: true,
                                                yesText: "確認",
                                                no: false,
                                                // noText: "取消",
                                                // autoClose: true,
                                                backgroundClose: false,
                                                noOnClick: (e) => {
                                                    // props.controllGCS("addClientModalClose")
                                                },
                                                yesOnClick: (e, close) => {
                                                    //#region 表單驗證
                                                    let validMsg = "";

                                                    //#endregion

                                                    //#region 表單驗證後動作
                                                    if (validMsg !== "") {
                                                        // console.log(validMsg, globalContextService.get("OperatingUnitSettingPage"))
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
                                                        close();
                                                    }
                                                    //#endregion
                                                },
                                                closeIconOnClick: (e) => {
                                                    // props.controllGCS("addClientModalClose")
                                                },
                                                content: (
                                                    <FormContainer
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                        theme={mobileM.quotaStatusFormContainer}
                                                    >
                                                        <FormRow baseDefaultTheme={"DefaultTheme"}>

                                                            {/* 總額度 標題 */}
                                                            < Text
                                                                theme={mobileM.totalAmountTitle}
                                                            >
                                                                總額度
                                                                 {/* 總額度 內文 */}
                                                                <Text
                                                                    theme={mobileM.totalAmountText}
                                                                >
                                                                    ${props?.Quota?.totalDiscount}
                                                                </Text>
                                                            </Text>

                                                            {/* 使用額度 標題 */}
                                                            < Text
                                                                theme={mobileM.useQuotaTitle}
                                                            >
                                                                使用額度
                                                                 {/* 使用額度 內文 */}
                                                                <Text
                                                                    theme={mobileM.useQuotaText}
                                                                >
                                                                    ${props?.Quota?.useDiscount}
                                                                </Text>
                                                            </Text>

                                                            {/* 剩餘額度 標題 */}
                                                            < Text
                                                                theme={mobileM.remainingAmountTitle}
                                                            >
                                                                剩餘額度
                                                                 {/* 剩餘額度 內文 */}
                                                                <Text
                                                                    theme={mobileM.remainingAmountText}
                                                                >
                                                                    ${props?.Quota?.lastDiscount}
                                                                </Text>
                                                            </Text>

                                                        </FormRow>
                                                    </FormContainer>
                                                ),
                                                theme: mobileM.quotaStatusModal
                                            })
                                            //#endregion
                                        }}
                                    >
                                        額度狀況
                                </NativeLineButton>
                                </SubContainer>
                            </MainPageSubTitleBar>

                            <Container>

                                {/* 案號 CaseNumber */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 案號 標題 */}
                                    <Text
                                        theme={mobileM.caseNumberTitle}
                                    >
                                        案號
                                </Text>

                                    {/* 案號 內文 */}
                                    <Text
                                        theme={mobileM.caseNumberText}
                                    >
                                        {props.CaseInf?.caseUserNo}
                                    </Text>

                                </Container>

                                {/* 長照居住地址 CaseResidentialAddress */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 長照居住地址 標題 */}
                                    <Text
                                        theme={mobileM.caseResidentialAddressTitle}
                                    >
                                        居住地址
                                </Text>

                                    {/* 長照居住地址 內文 */}
                                    <Text
                                        theme={mobileM.caseResidentialAddressText}
                                    >
                                        {
                                            (!isUndefined(props.CaseInf?.county) && !isUndefined(props.CaseInf?.district) && !isUndefined(props.CaseInf?.addr))
                                                ?
                                                props.CaseInf?.county + props.CaseInf?.district + props.CaseInf?.addr
                                                :
                                                null
                                        }
                                    </Text>

                                </Container>

                                {/* 長照緊急聯絡人姓名 CaseEmergencyName */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 長照緊急聯絡人姓名 標題 */}
                                    <Text
                                        theme={mobileM.caseEmergencyNameTitle}
                                    >
                                        緊急聯絡人姓名
                                </Text>

                                    {/* 長照緊急聯絡人姓名 內文 */}
                                    <Text
                                        theme={mobileM.caseEmergencyNameText}
                                    >
                                        {props.CaseInf?.urgentName ?
                                            props.CaseInf?.urgentName
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 長照緊急聯絡人關係 CaseEmergencyName */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 長照緊急聯絡人關係 標題 */}
                                    <Text
                                        theme={mobileM.caseEmergencyRelationshipTitle}
                                    >
                                        緊急聯絡人關係
                                    </Text>

                                    {/* 長照緊急聯絡人關係 內文 */}
                                    <Text
                                        theme={mobileM.caseEmergencyRelationshipText}
                                    >
                                        {props.CaseInf?.urgentRelationship ?
                                            props.CaseInf?.urgentRelationship
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 長照緊急聯絡人手機 CaseEmergencyCellPhone */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 長照緊急聯絡人手機 標題 */}
                                    <Text
                                        theme={mobileM.caseEmergencyCellPhoneTitle}
                                    >
                                        緊急聯絡人手機
                                </Text>

                                    {/* 長照緊急聯絡人手機 內文 */}
                                    <Text
                                        theme={mobileM.caseEmergencyCellPhoneText}
                                    >
                                        {props.CaseInf?.urgentPhone ?
                                            props.CaseInf?.urgentPhone
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 長照緊急聯絡人市話 CaseEmergencyPhone */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 長照緊急聯絡人市話 標題 */}
                                    <Text
                                        theme={mobileM.caseEmergencyPhoneTitle}
                                    >
                                        緊急聯絡人市話
                                </Text>

                                    {/* 長照緊急聯絡人市話 內文 */}
                                    <Text
                                        theme={mobileM.caseEmergencyPhoneText}
                                    >
                                        {props.CaseInf?.urgentTel ?
                                            props.CaseInf?.urgentTel
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 長照服務車隊 CaseServiceFleet */}
                                {/* <Container
                            theme={mobileM.universalContainer}
                        > */}
                                {/* 長照服務車隊 標題 */}
                                {/* <Text
                                theme={mobileM.caseServiceFleetTitle}
                            >
                                服務車隊 */}
                                {/* </Text> */}

                                {/* 長照服務車隊 內文 */}
                                {/* <Text
                                theme={mobileM.caseServiceFleetText}
                            >
                                某車隊
                                </Text>

                        </Container> */}

                            </Container>

                        </BasicContainer>
                    </>
                }

                {/* 判斷有無共享車隊身分 */}
                {!isEqual(props.WhiteInf, {})
                    &&
                    <>
                        {/* 共享車隊資料表單區容器 */}
                        <BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={mobileM.fleetInformationContainer}
                        >
                            {/* 共享車隊資料 子標題列 */}
                            <MainPageSubTitleBar
                                bascDefaultTheme={"DefaultTheme"}
                                titleText={"共享車隊"}
                                theme={mobileM.fleetInfBaseSubTitleBar}
                            >
                            </MainPageSubTitleBar>

                            <Container>

                                {/* 共享車隊居住地址 FleetResidentialAddress */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 共享車隊居住地址 標題 */}
                                    <Text
                                        theme={mobileM.fleetResidentialAddressTitle}
                                    >
                                        居住地址
                                </Text>

                                    {/* 共享車隊居住地址 內文 */}
                                    <Text
                                        theme={mobileM.fleetResidentialAddressText}
                                    >
                                        {
                                            (!isUndefined(props.WhiteInf?.county) && !isUndefined(props.WhiteInf?.district) && !isUndefined(props.WhiteInf?.addr))
                                                ?
                                                props.WhiteInf?.county + props.WhiteInf?.district + props.WhiteInf?.addr
                                                :
                                                null
                                        }
                                    </Text>

                                </Container>

                                {/* 共享車隊緊急聯絡人姓名 FleetEmergencyName */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 共享車隊緊急聯絡人姓名 標題 */}
                                    <Text
                                        theme={mobileM.fleetEmergencyNameTitle}
                                    >
                                        緊急聯絡人姓名
                                </Text>

                                    {/* 共享車隊緊急聯絡人姓名 內文 */}
                                    <Text
                                        theme={mobileM.fleetEmergencyNameText}
                                    >
                                        {props.WhiteInf?.urgentName ?
                                            props.WhiteInf?.urgentName
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 共享車隊緊急聯絡人關係 FleetEmergencyName */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 共享車隊緊急聯絡人關係 標題 */}
                                    <Text
                                        theme={mobileM.fleetEmergencyRelationshipTitle}
                                    >
                                        緊急聯絡人關係
                                    </Text>

                                    {/* 共享車隊緊急聯絡人關係 內文 */}
                                    <Text
                                        theme={mobileM.fleetEmergencyRelationshipText}
                                    >
                                        {props.WhiteInf?.urgentRelationship ?
                                            props.WhiteInf?.urgentRelationship
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 共享車隊緊急聯絡人手機 FleetEmergencyCellPhone */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 共享車隊緊急聯絡人手機 標題 */}
                                    <Text
                                        theme={mobileM.fleetEmergencyCellPhoneTitle}
                                    >
                                        緊急聯絡人手機
                                    </Text>

                                    {/* 共享車隊緊急聯絡人手機 內文 */}
                                    <Text
                                        theme={mobileM.fleetEmergencyCellPhoneText}
                                    >
                                        {props.WhiteInf?.urgentPhone ?
                                            props.WhiteInf?.urgentPhone
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 共享車隊緊急聯絡人市話 FleetEmergencyPhone */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 共享車隊緊急聯絡人市話 標題 */}
                                    <Text
                                        theme={mobileM.fleetEmergencyPhoneTitle}
                                    >
                                        緊急聯絡人市話
                                </Text>

                                    {/* 共享車隊緊急聯絡人市話 內文 */}
                                    <Text
                                        theme={mobileM.fleetEmergencyPhoneText}
                                    >
                                        {props.WhiteInf?.urgentTel ?
                                            props.WhiteInf?.urgentTel
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 共享車隊服務車隊 FleetServiceFleet */}
                                {/* <Container
                            theme={mobileM.universalContainer}
                        > */}
                                {/* 共享車隊服務車隊 標題 */}
                                {/* <Text
                                theme={mobileM.fleetServiceFleetTitle}
                            >
                                服務車隊
                                </Text> */}

                                {/* 共享車隊服務車隊 內文 */}
                                {/* <Text
                                theme={mobileM.fleetServiceFleetText}
                            >
                                某車隊
                                </Text>

                        </Container> */}

                            </Container>

                        </BasicContainer>
                    </>
                }

                {/* 判斷有無巴士身分 */}
                {!isEqual(props.BusInf, {})
                    &&
                    <>
                        {/* 巴士資料表單區容器 */}
                        <BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={mobileM.busInformationContainer}
                        >
                            {/* 巴士資料 子標題列 */}
                            <MainPageSubTitleBar
                                bascDefaultTheme={"DefaultTheme"}
                                titleText={"巴士"}
                                theme={mobileM.busInfBaseSubTitleBar}
                            >
                            </MainPageSubTitleBar>

                            <Container>

                                {/* 巴士卡號 BusCardNumber */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 巴士卡號 標題 */}
                                    <Text
                                        theme={mobileM.busCardNumberTitle}
                                    >
                                        卡號
                                </Text>

                                    {/* 巴士卡號 內文 */}
                                    <Text
                                        theme={mobileM.busCardNumberText}
                                    >
                                        {props.BusInf?.cardNo}
                                    </Text>

                                </Container>

                                {/* 巴士居住地址 BusResidentialAddress */}
                                {/* <Container
                            theme={mobileM.universalContainer}
                        > */}
                                {/* 巴士居住地址 標題 */}
                                {/* <Text
                                theme={mobileM.busResidentialAddressTitle}
                            >
                                居住地址
                                </Text> */}

                                {/* 巴士居住地址 內文 */}
                                {/* <Text
                                theme={mobileM.busResidentialAddressText}
                            >
                                台北市大安區信義路三段143號
                                </Text>

                        </Container> */}

                                {/* 巴士緊急聯絡人姓名 BusEmergencyName */}
                                {/* <Container
                            theme={mobileM.universalContainer}
                        > */}
                                {/* 巴士緊急聯絡人姓名 標題 */}
                                {/* <Text
                                theme={mobileM.busEmergencyNameTitle}
                            >
                                緊急聯絡人姓名
                                </Text> */}

                                {/* 巴士緊急聯絡人姓名 內文 */}
                                {/* <Text
                                theme={mobileM.busEmergencyNameText}
                            >
                                王小明
                                </Text>

                        </Container> */}

                                {/* 巴士緊急聯絡人手機 BusEmergencyCellPhone */}
                                {/* <Container
                            theme={mobileM.universalContainer}
                        > */}
                                {/* 巴士緊急聯絡人手機 標題 */}
                                {/* <Text
                                theme={mobileM.busEmergencyCellPhoneTitle}
                            >
                                緊急聯絡人手機
                                </Text> */}

                                {/* 巴士緊急聯絡人手機 內文 */}
                                {/* <Text
                                theme={mobileM.busEmergencyCellPhoneText}
                            >
                                0987654321
                                </Text>

                        </Container> */}

                                {/* 巴士緊急聯絡人市話 BusEmergencyPhone */}
                                {/* <Container
                            theme={mobileM.universalContainer}
                        > */}
                                {/* 巴士緊急聯絡人市話 標題 */}
                                {/* <Text
                                theme={mobileM.busEmergencyPhoneTitle}
                            >
                                緊急聯絡人市話
                                </Text> */}

                                {/* 巴士緊急聯絡人市話 內文 */}
                                {/* <Text
                                theme={mobileM.busEmergencyPhoneText}
                            >
                                0412345678
                                </Text>

                        </Container> */}

                                {/* 巴士服務車隊 BusServiceFleet */}
                                {/* <Container
                            theme={mobileM.universalContainer}
                        > */}
                                {/* 巴士服務車隊 標題 */}
                                {/* <Text
                                theme={mobileM.busServiceFleetTitle}
                            >
                                服務車隊
                                </Text> */}

                                {/* 巴士服務車隊 內文 */}
                                {/* <Text
                                theme={mobileM.busServiceFleetText}
                            >
                                某車隊
                                </Text>

                        </Container> */}

                            </Container>

                        </BasicContainer>
                    </>
                }

                {/* 判斷有無日照身分 */}
                {!isEqual(props.DayCareInf, {})
                    &&
                    <>
                        {/* 日照資料表單區容器 */}
                        <BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={mobileM.dayCareInformationContainer}
                        >
                            {/* 日照資料 子標題列 */}
                            <MainPageSubTitleBar
                                bascDefaultTheme={"DefaultTheme"}
                                titleText={"日照"}
                                theme={mobileM.dayCareInfBaseSubTitleBar}
                            >
                            </MainPageSubTitleBar>

                            <Container>

                                {/* 案號 DayCareNumber */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 案號 標題 */}
                                    <Text
                                        theme={mobileM.dayCareNumberTitle}
                                    >
                                        案號
                                </Text>

                                    {/* 案號 內文 */}
                                    <Text
                                        theme={mobileM.dayCareNumberText}
                                    >
                                        {props.DayCareInf?.caseUserNo}
                                    </Text>

                                </Container>

                                {/* 日照居住地址 DayCareResidentialAddress */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 日照居住地址 標題 */}
                                    <Text
                                        theme={mobileM.dayCareResidentialAddressTitle}
                                    >
                                        居住地址
                                </Text>

                                    {/* 日照居住地址 內文 */}
                                    <Text
                                        theme={mobileM.dayCareResidentialAddressText}
                                    >
                                        {(!isUndefined(props.DayCareInf?.county) && !isUndefined(props.DayCareInf?.district) && !isUndefined(props.DayCareInf?.addr))
                                            ?
                                            props.DayCareInf?.county + props.DayCareInf?.district + props.DayCareInf?.addr
                                            :
                                            null
                                        }
                                    </Text>

                                </Container>

                                {/* 日照緊急聯絡人姓名 DayCareEmergencyName */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 日照緊急聯絡人姓名 標題 */}
                                    <Text
                                        theme={mobileM.dayCareEmergencyNameTitle}
                                    >
                                        緊急聯絡人姓名
                                </Text>

                                    {/* 日照緊急聯絡人姓名 內文 */}
                                    <Text
                                        theme={mobileM.dayCareEmergencyNameText}
                                    >
                                        {props.DayCareInf?.urgentName ?
                                            props.DayCareInf?.urgentName
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 日照緊急聯絡人關係 DayCareEmergencyName */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 日照緊急聯絡人關係 標題 */}
                                    <Text
                                        theme={mobileM.dayCareEmergencyRelationshipTitle}
                                    >
                                        緊急聯絡人關係
                                    </Text>

                                    {/* 日照緊急聯絡人關係 內文 */}
                                    <Text
                                        theme={mobileM.dayCareEmergencyRelationshipText}
                                    >
                                        {props.DayCareInf?.urgentRelationship ?
                                            props.DayCareInf?.urgentRelationship
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 日照緊急聯絡人手機 DayCareEmergencyCellPhone */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 日照緊急聯絡人手機 標題 */}
                                    <Text
                                        theme={mobileM.dayCareEmergencyCellPhoneTitle}
                                    >
                                        緊急聯絡人手機
                                </Text>

                                    {/* 日照緊急聯絡人手機 內文 */}
                                    <Text
                                        theme={mobileM.dayCareEmergencyCellPhoneText}
                                    >
                                        {props.DayCareInf?.urgentPhone ?
                                            props.DayCareInf?.urgentPhone
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 日照緊急聯絡人市話 DayCareEmergencyPhone */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 日照緊急聯絡人市話 標題 */}
                                    <Text
                                        theme={mobileM.dayCareEmergencyPhoneTitle}
                                    >
                                        緊急聯絡人市話
                                </Text>

                                    {/* 日照緊急聯絡人市話 內文 */}
                                    <Text
                                        theme={mobileM.dayCareEmergencyPhoneText}
                                    >
                                        {props.DayCareInf?.urgentTel ?
                                            props.DayCareInf?.urgentTel
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 日照服務車隊 DayCareServiceFleet */}
                                {/* <Container
                            theme={mobileM.universalContainer}
                        > */}
                                {/* 日照服務車隊 標題 */}
                                {/* <Text
                                theme={mobileM.dayCareServiceFleetTitle}
                            >
                                服務車隊
                                </Text> */}

                                {/* 日照服務車隊 內文 */}
                                {/* <Text
                                theme={mobileM.dayCareServiceFleetText}
                            >
                                某車隊
                                </Text>

                        </Container> */}

                            </Container>

                        </BasicContainer>

                    </>
                }

                {/* 判斷有無偏鄉身分 */}
                {!isEqual(props.CountryInf, {})
                    &&
                    <>
                        {/* 偏鄉資料表單區容器 */}
                        <BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={mobileM.ruralInformationContainer}
                        >
                            {/* 偏鄉資料 子標題列 */}
                            <MainPageSubTitleBar
                                bascDefaultTheme={"DefaultTheme"}
                                titleText={"偏鄉運能不足"}
                                theme={mobileM.ruralInfBaseSubTitleBar}
                            >
                            </MainPageSubTitleBar>

                            <Container>

                                {/* 偏鄉居住地址 RuralResidentialAddress */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 偏鄉居住地址 標題 */}
                                    <Text
                                        theme={mobileM.ruralResidentialAddressTitle}
                                    >
                                        居住地址
                                    </Text>

                                    {/* 偏鄉居住地址 內文 */}
                                    <Text
                                        theme={mobileM.ruralResidentialAddressText}
                                    >
                                        {(!isUndefined(props.CountryInf?.county) && !isUndefined(props.CountryInf?.district) && !isUndefined(props.CountryInf?.addr))
                                            ?
                                            props.CountryInf?.county + props.CountryInf?.district + props.CountryInf?.addr
                                            :
                                            null
                                        }
                                    </Text>

                                </Container>

                                {/* 偏鄉緊急聯絡人姓名 RuralEmergencyName */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 偏鄉緊急聯絡人姓名 標題 */}
                                    <Text
                                        theme={mobileM.ruralEmergencyNameTitle}
                                    >
                                        緊急聯絡人姓名
                                </Text>

                                    {/* 偏鄉緊急聯絡人姓名 內文 */}
                                    <Text
                                        theme={mobileM.ruralEmergencyNameText}
                                    >
                                        {props.CountryInf?.urgentName ?
                                            props.CountryInf?.urgentName
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 偏鄉緊急聯絡人關係 RuralEmergencyName */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 偏鄉緊急聯絡人關係 標題 */}
                                    <Text
                                        theme={mobileM.ruralEmergencyRelationshipTitle}
                                    >
                                        緊急聯絡人關係
                                    </Text>

                                    {/* 偏鄉緊急聯絡人關係 內文 */}
                                    <Text
                                        theme={mobileM.ruralEmergencyRelationshipText}
                                    >
                                        {props.CountryInf?.urgentRelationship ?
                                            props.CountryInf?.urgentRelationship
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 偏鄉緊急聯絡人手機 RuralEmergencyCellPhone */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 偏鄉緊急聯絡人手機 標題 */}
                                    <Text
                                        theme={mobileM.ruralEmergencyCellPhoneTitle}
                                    >
                                        緊急聯絡人手機
                                </Text>

                                    {/* 偏鄉緊急聯絡人手機 內文 */}
                                    <Text
                                        theme={mobileM.ruralEmergencyCellPhoneText}
                                    >
                                        {props.CountryInf?.urgentPhone ?
                                            props.CountryInf?.urgentPhone
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 偏鄉緊急聯絡人市話 RuralEmergencyPhone */}
                                <Container
                                    theme={mobileM.universalContainer}
                                >
                                    {/* 偏鄉緊急聯絡人市話 標題 */}
                                    <Text
                                        theme={mobileM.ruralEmergencyPhoneTitle}
                                    >
                                        緊急聯絡人市話
                                </Text>

                                    {/* 偏鄉緊急聯絡人市話 內文 */}
                                    <Text
                                        theme={mobileM.ruralEmergencyPhoneText}
                                    >
                                        {props.CountryInf?.urgentTel ?
                                            props.CountryInf?.urgentTel
                                            :
                                            "未填寫"
                                        }
                                    </Text>

                                </Container>

                                {/* 偏鄉服務車隊 RuralServiceFleet */}
                                {/* <Container
                            theme={mobileM.universalContainer}
                        > */}
                                {/* 偏鄉服務車隊 標題 */}
                                {/* <Text
                                theme={mobileM.ruralServiceFleetTitle}
                            >
                                服務車隊
                                </Text> */}

                                {/* 偏鄉服務車隊 內文 */}
                                {/* <Text
                                theme={mobileM.ruralServiceFleetText}
                            >
                                某車隊
                                </Text>

                        </Container> */}

                            </Container>

                        </BasicContainer>

                    </>
                }

                {(
                    isEqual(props.BusInf, {})
                    ||
                    isEqual(props.WhiteInf, {})
                )
                    &&
                    <>
                        <Container
                            theme={mobileM.bottomContainer}
                        >
                            {/* 若無共享車隊身分則可以註冊 */}
                            {isEqual(props.WhiteInf, {})
                                &&
                                <>
                                    {/* 註冊共享車隊按鈕 */}
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // 防止提交
                                        theme={mobileM.registeredFleetButton}
                                        onClick={(e) => {
                                            e.preventDefault();

                                            //#region 打開修改密碼 Modal
                                            props.setOpenWhiteModal(true)
                                        }}
                                    >
                                        註冊共享車隊
                            </NativeLineButton>
                                </>
                            }

                            {/* 若無巴士身分則可以註冊 */}
                            {isEqual(props.BusInf, {})
                                &&
                                <>
                                    {/* 註冊巴士按鈕 */}
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // 防止提交
                                        theme={mobileM.registeredBusButton}
                                        onClick={(e) => {

                                        }}
                                    >
                                        註冊巴士
                            </NativeLineButton>
                                </>
                            }
                        </Container>
                    </>
                }
            </MainPageContainer>

            {/* 檢核是否開啟共享車隊彈窗 */}
            {props.OpenWhiteModal
                &&
                <WhiteSingUp
                    UserId={props.BasicInf.id}
                    setOpenWhiteModal={props.setOpenWhiteModal}
                    GetGeocodeExecute={props.GetGeocodeExecute} //轉換經緯度
                    GetGeocodePending={props.GetGeocodePending}
                    AddWhiteUserExecute={props.AddWhiteUserExecute} // 新增共享車隊
                    AddWhiteUserPending={props.AddWhiteUserPending}
                    controllGCS={props.controllGCS}
                />
            }
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
