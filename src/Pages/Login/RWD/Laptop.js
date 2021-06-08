import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { BasicContainer, ScrollBar, Container, SubContainer, Text, FormContainer, Radio, Checkbox, FormRow, TextInput, BasicButton, modalsService, globalContextService, RadioItem, DateTimePicker, NewSelector, CheckboxItem } from '../../../Components';
import { ReactComponent as LoginLogoLaptop } from '../../../Assets/img/LoginLogoLaptop.svg'
import { ReactComponent as Admin } from '../../../Assets/img/Admin.svg'
import { ReactComponent as Lock } from '../../../Assets/img/Lock.svg'
import { ReactComponent as Phone } from '../../../Assets/img/Phone.svg'
import { ReactComponent as AuthCode } from '../../../Assets/img/AuthCode.svg'
import { ReactComponent as Laptopbg } from '../../../Assets/img/Laptopbg.svg'
import { LaptopPlacard, MapGoogleInput } from '../../../ProjectComponent';
import moment from 'moment';
import { cityAndCountiesLite, Counties } from '../../../Mappings/Mappings';
import { isEqual, isNil } from 'lodash';

//#region 倒數10秒
const TimeCounter = (props) => {

    const [Sec, setSec] = useState(10);

    useEffect(() => {
        let counter = setInterval(() => {
            setSec(s => s - 1);
            if (Sec === 1) {
                props.onCountToZero && props.onCountToZero();
            }
        }, 1000)

        return () => {
            clearInterval(counter)
        }
    }, [Sec])

    return (
        <>
            {Sec}
        </>
    )
}
//#endregion

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { login: { rwd: { laptop } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    return (
        <>
            {/* 最外層容器 */}
            <BasicContainer
                baseDefaultTheme={"DefaultTheme"}
                theme={laptop.outContainer}
            >
                {/* 最外層容器 ScrollBar */}
                <ScrollBar
                    basedefaulttheme={"DefaultTheme"}
                    theme={laptop.outContainerScrollBar} /*autoHide={true}*/
                >
                    {/* 佔位容器 */}
                    <BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptop.place}
                    />

                    {/* 右半邊登入容器 */}
                    <BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptop.rightContainer}
                    >
                        {/* 背景自適應 */}
                        <Laptopbg style={laptop.bgImage} />

                        {/* 登入框容器 */}
                        <Container
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptop.loginContainer}
                        >
                            <BasicContainer>
                                {/* 登入頁Logo */}
                                <LoginLogoLaptop style={laptop.loginFormLogo} />

                                {/* Logo單位名稱 */}
                                <Text theme={laptop.loginFormLogoName}>屏東縣政府</Text>

                                {/* Logo單位說明文字 */}
                                <Text theme={laptop.loginFormLogoNOteText}> 長照交通接送預約服務管理系統</Text>

                            </BasicContainer>
                            {/* 從這裡替換成其他表單 : 登入、忘記密碼、設定登入密碼 */}

                            {/* 登入表單 Login */}
                            {props.WhichForm === "Login" &&
                                <>
                                    {/* 登入表單容器  */}
                                    <BasicContainer
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={laptop.loginFormContainer}
                                    >
                                        {/* 登入表單標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.loginFormTitle}
                                        >
                                            登入
                                        </Text>
                                        {/* 登入表單次標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.loginFormSubTitle}
                                        >
                                            為了保障您的帳號安全，建議您最少於三個月變更一次密碼。
                                        </Text>
                                        {/* 登入表單組件 */}
                                        <FormContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            onSubmit={(e) => {
                                                if (!props.loginPending) {
                                                    props.loginExecute()
                                                }
                                            }}
                                            theme={laptop.loginFormFormContainer}
                                        >
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 帳號 Account */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="text"
                                                    placeholder={"請輸入您的帳號"}
                                                    leftIcon={
                                                        <Admin
                                                            style={laptop.loginFormAccountLeftIcon}
                                                        />
                                                    }
                                                    theme={laptop.loginFormAccount}
                                                    value={globalContextService.get("LoginPage", "Account") ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "Account", value);
                                                    }}
                                                />
                                            </FormRow>
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 密碼 Password */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="password"
                                                    openEye
                                                    placeholder={"請輸入您的密碼"}
                                                    leftIcon={
                                                        <Lock
                                                            style={laptop.loginFormPasswordLeftIcon}
                                                        />
                                                    }
                                                    theme={laptop.loginFormPassword}
                                                    value={globalContextService.get("LoginPage", "Password") ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "Password", value);
                                                    }}
                                                />
                                            </FormRow>
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 登入按鈕 */}
                                                <SubContainer
                                                    theme={laptop.loginFormLoginButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"PrimaryTheme"}
                                                        text={"登入"}
                                                        theme={laptop.loginFormLoginButton}
                                                        onClick={() => {
                                                            if (!props.loginPending) {
                                                                props.loginExecute()
                                                            }
                                                            // modalsService.infoModal.warn({
                                                            //     iconRightText: "請輸入帳號密碼",
                                                            //     yes: true,
                                                            //     yesText: "確認",
                                                            //     // no: true,
                                                            //     // autoClose: true,
                                                            //     backgroundClose: true,
                                                            //     theme: {
                                                            //         title: {
                                                            //             basic: (style, props) => ({
                                                            //                 ...style,
                                                            //                 color: "blue"
                                                            //             })
                                                            //         }
                                                            //     }
                                                            // })
                                                            // modalsService.titleModal.warn({
                                                            //     title: "標題",
                                                            //     iconRightText: "請輸入帳號密碼",
                                                            //     yes: true,
                                                            //     yesText: "確認",
                                                            //     no: true,
                                                            //     // autoClose: true,
                                                            //     backgroundClose: true,
                                                            //     theme: {
                                                            //         title: {
                                                            //             basic: (style, props) => ({
                                                            //                 ...style,
                                                            //                 // color: "blue"
                                                            //             })
                                                            //         }
                                                            //     }
                                                            // })
                                                        }}
                                                    />
                                                </SubContainer>
                                            </FormRow>
                                            {/* 忘記密碼連結 */}
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                <SubContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptop.loginFormForgetPassContainer}
                                                >
                                                    <BasicContainer
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={laptop.loginFormForgetPassSubContainer}
                                                    >
                                                        <Text
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.loginFormForgetPassText}
                                                            onClick={() => { props.setWhichForm("SingUp") }}
                                                        >
                                                            註冊
                                                        </Text>

                                                        <Text
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.loginFormForgetPassText}
                                                            onClick={() => { props.setWhichForm("ForgetPass") }}
                                                        >
                                                            忘記密碼？
                                                        </Text>
                                                    </BasicContainer>

                                                    <Text
                                                        theme={laptop.loginFormNoteText}
                                                    >
                                                        <BasicContainer theme={laptop.loginFormBlueIcon} />
                                                        此註冊頁僅提供預約共享車隊叫車服務，如需預約長照相關業務，請撥打 1966 服務專線，將會有專員提供服務。
                                                    </Text>

                                                    <Text
                                                        theme={laptop.loginFormNoteText}
                                                    >
                                                        <BasicContainer theme={laptop.loginFormBlueIcon} />
                                                        若已有長照資格，需預約共享車隊服務，請在登入後選擇用戶專區進行服務開通。
                                                    </Text>

                                                </SubContainer>
                                            </FormRow>
                                        </FormContainer>
                                    </BasicContainer>
                                </>
                            }

                            {/* 忘記密碼表單 ForgetPass */}
                            {props.WhichForm === "ForgetPass" &&
                                <>
                                    {/* 忘記密碼表單容器  */}
                                    <BasicContainer
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={laptop.forgetPassFormContainer}
                                    >
                                        {/* 忘記密碼表單標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.forgetPassFormTitle}
                                        >
                                            忘記密碼
                                        </Text>
                                        {/* 忘記密碼表單次標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.forgetPassFormSubTitle}
                                        >
                                            {!props.SendedAuthCode ?
                                                "請準備好您的手機"
                                                :
                                                "已發送簡訊驗證碼到您的手機"
                                            }
                                        </Text>
                                        {/* 忘記密碼表單組件 */}
                                        <FormContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                            }}
                                            theme={laptop.forgetPassFormFormContainer}
                                        >
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 手機號碼 Phone */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="phone"
                                                    placeholder={"請輸入您的手機號碼"}
                                                    leftIcon={
                                                        <Phone
                                                            style={laptop.forgetPassFormPhoneLeftIcon}
                                                        />
                                                    }
                                                    theme={laptop.forgetPassFormPhone}
                                                />
                                            </FormRow>
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 傳送認證碼按鈕 */}
                                                <SubContainer
                                                    theme={laptop.forgetPassFormSendAuthCodeButtonContainer}
                                                >
                                                    {!props.SendedAuthCode ?
                                                        <BasicButton
                                                            baseDefaultTheme={"PrimaryTheme"}
                                                            text={`傳送驗證碼`}
                                                            theme={laptop.forgetPassFormSendAuthCodeButton}
                                                            onClick={() => {
                                                                props.setSendedAuthCode(true);
                                                            }}
                                                        />
                                                        : props.WaitSecToZero ?
                                                            <BasicButton
                                                                disable
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                text={
                                                                    <>
                                                                        重送驗證碼(
                                                                        <TimeCounter
                                                                            onCountToZero={() => {
                                                                                props.setWaitSecToZero(false);
                                                                                console.log("End")
                                                                            }}
                                                                        />
                                                                        秒)
                                                                    </>
                                                                }
                                                                theme={laptop.forgetPassFormWaitSecToZeroButton}
                                                            />
                                                            :
                                                            <BasicButton
                                                                baseDefaultTheme={"PrimaryTheme"}
                                                                text={"重送驗證碼"}
                                                                theme={laptop.forgetPassFormSendAuthCodeButton}
                                                                onClick={() => { props.setWaitSecToZero(true); console.log("Start") }}
                                                            />
                                                    }
                                                </SubContainer>
                                            </FormRow>
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 驗證碼 AuthCode */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="text"
                                                    placeholder={"請輸入簡訊內的認證碼"}
                                                    leftIcon={
                                                        <AuthCode
                                                            style={laptop.forgetPassFormAuthCodeLeftIcon}
                                                        />
                                                    }
                                                    theme={laptop.forgetPassFormAuthCode}
                                                />
                                            </FormRow>
                                            <FormRow
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={laptop.forgetPassFormCancelAndNextButtonFormRow}
                                            >
                                                {/* 取消按鈕 */}
                                                <SubContainer
                                                    theme={laptop.forgetPassFormCancelButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        text={"取消"}
                                                        theme={laptop.forgetPassFormCancelButton}
                                                        onClick={() => { props.setWhichForm("Login") }}
                                                    />
                                                </SubContainer>
                                                {/* 下一步按鈕 */}
                                                <SubContainer
                                                    theme={laptop.forgetPassFormNextButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"PrimaryTheme"}
                                                        text={"下一步"}
                                                        theme={laptop.forgetPassFormNextButton}
                                                        onClick={() => { props.setWhichForm("ResetPass") }}
                                                    />
                                                </SubContainer>
                                            </FormRow>
                                            {/* 忘記密碼連結 */}
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                <SubContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptop.forgetPassFormForgetPassContainer}
                                                >
                                                    <Text
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={laptop.forgetPassFormForgetPassText}
                                                    >
                                                        點選下一步，請依照步驟完成驗證註冊。
                                                        </Text>
                                                </SubContainer>
                                            </FormRow>
                                        </FormContainer>
                                    </BasicContainer>
                                </>
                            }

                            {/* 設定登入密碼表單 ResetPass */}
                            {props.WhichForm === "ResetPass" &&
                                <>
                                    {/* 設定登入密碼表單容器  */}
                                    <BasicContainer
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={laptop.resetPassFormContainer}
                                    >
                                        {/* 設定登入密碼表單標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.resetPassFormTitle}
                                        >
                                            設定登入密碼
                                        </Text>
                                        {/* 設定登入密碼表單次標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.resetPassFormSubTitle}
                                        >
                                            8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。
                                        </Text>
                                        {/* 設定登入密碼表單組件 */}
                                        <FormContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                            }}
                                            theme={laptop.resetPassFormFormContainer}
                                        >
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 新密碼 NewPassword */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="password"
                                                    openEye
                                                    placeholder={"請輸入新的密碼"}
                                                    leftIcon={
                                                        <Lock
                                                            style={laptop.resetPassFormNewPasswordLeftIcon}
                                                        />
                                                    }
                                                    theme={laptop.resetPassFormNewPassword}
                                                />
                                            </FormRow>
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 確認新密碼 ConfirmPassword */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="password"
                                                    openEye
                                                    placeholder={"再一次輸入新密碼確認"}
                                                    leftIcon={
                                                        <Lock
                                                            style={laptop.resetPassFormConfirmPasswordLeftIcon}
                                                        />
                                                    }
                                                    theme={laptop.resetPassFormConfirmPassword}
                                                />
                                            </FormRow>
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 完成按鈕 */}
                                                <SubContainer
                                                    theme={laptop.resetPassFormDoneButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"PrimaryTheme"}
                                                        text={"完成"}
                                                        theme={laptop.resetPassFormDoneButton}
                                                        onClick={() => { props.setWhichForm("Login") }}
                                                    />
                                                </SubContainer>
                                            </FormRow>
                                        </FormContainer>
                                    </BasicContainer>
                                </>
                            }

                            {/* 註冊表單 SingUp */}
                            {props.WhichForm === "SingUp" &&
                                <>
                                    {/* 註冊表單容器  */}
                                    <BasicContainer
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={laptop.singUpFormContainer}
                                    >
                                        {/* 註冊表單標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.singUpFormTitle}
                                        >
                                            註冊
                                        </Text>
                                        {/* 註冊表單次標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.singUpFormSubTitle}
                                        >
                                            填寫通訊地址或(與)悠遊卡/一卡通卡號，可註冊共享車隊或(與)巴士叫車服務。
                                        </Text>
                                        {/* 註冊表單組件 */}
                                        <FormContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                            }}
                                            theme={laptop.singUpFormFormContainer}
                                        >
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 姓名 UserName */}
                                                <TextInput
                                                    topLabel={<>姓名<Text theme={laptop.singUpFormUserNameRequired}>*</Text></>}
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    // type="password"
                                                    // openEye
                                                    placeholder={"請輸入姓名"}
                                                    theme={laptop.singUpFormUserName}
                                                    value={globalContextService.get("LoginPage", "UserName") ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "UserName", value);
                                                    }}
                                                />

                                                {/* 電話 UserPhone */}
                                                <TextInput
                                                    topLabel={<>電話<Text theme={laptop.singUpFormUserPhoneRequired}>*</Text></>}
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    // type="password"
                                                    // openEye
                                                    placeholder={"請輸入電話"}
                                                    theme={laptop.singUpFormUserPhone}
                                                    value={globalContextService.get("LoginPage", "UserPhone") ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "UserPhone", value);
                                                    }}
                                                />

                                            </FormRow>

                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 生日 UserBirthday */}
                                                <DateTimePicker
                                                    topLabel={<>生日<Text theme={laptop.singUpFormUserBirthdayRequired}>*</Text></>}
                                                    // type={"time"} time、date、week、month、quarter、year
                                                    type={"date"}
                                                    format={"YYYY-MM-DD"}
                                                    bascDefaultTheme={"DefaultTheme"}
                                                    // viewType
                                                    isSearchable
                                                    placeholder={"請輸入生日"}
                                                    value={
                                                        (globalContextService.get("LoginPage", `UserBirthday`) ?
                                                            moment(globalContextService.get("LoginPage", `UserBirthday`), "YYYY-MM-DD")
                                                            :
                                                            null
                                                        )
                                                    }
                                                    onChange={(value, momentObj) => {
                                                        globalContextService.set("LoginPage", `Birthday`, value);
                                                    }}
                                                    theme={laptop.singUpFormUserBirthday}
                                                />

                                                {/* 性別 UserSex */}
                                                <Radio
                                                    // viewType
                                                    // disable
                                                    topLabel={<>性別<Text theme={laptop.singUpFormUserSexRequired}>*</Text></>}
                                                    value={globalContextService.get("LoginPage", "UserSex") ?? 1}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "UserSex", value);
                                                    }}
                                                    theme={laptop.singUpFormUserSex}
                                                >
                                                    {/* 性別 UserSex  選項 */}
                                                    <RadioItem value={1} >男</RadioItem>
                                                    <RadioItem value={0} >女</RadioItem>
                                                </Radio>

                                            </FormRow>

                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 身分證字號 UserUid */}
                                                <TextInput
                                                    topLabel={<>身分證字號<Text theme={laptop.singUpFormUserUidRequired}>*</Text></>}
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    // type="password"
                                                    // openEye
                                                    placeholder={"請輸入身分證字號"}
                                                    theme={laptop.singUpFormUserUid}
                                                    value={globalContextService.get("LoginPage", "UserUid") ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "UserUid", value);
                                                    }}
                                                />

                                                {/* 悠遊卡/一卡通卡號 UserCardNo */}
                                                <TextInput
                                                    topLabel={
                                                        <>
                                                            悠遊卡/一卡通卡號
                                                            <Text theme={laptop.singUpFormUserCardNoRequired}>
                                                            </Text>
                                                            {/* 無卡註冊 UserNoCardNO */}
                                                            <Checkbox
                                                                // viewType
                                                                checked={globalContextService.get("LoginPage", "UserNoCardNO")}
                                                                // disable
                                                                topLabel={""}
                                                                onChange={(e, value, onInitial) => {
                                                                    // console.log(value)
                                                                    globalContextService.set("LoginPage", "UserNoCardNO", value);
                                                                }}
                                                                theme={laptop.userNoCardNO}
                                                            >
                                                                {/* 無卡註冊 UserNoCardNO  選項 */}
                                                                <CheckboxItem value={"NoCardNO"} >無卡註冊</CheckboxItem>
                                                            </Checkbox>
                                                        </>
                                                    }
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    // type="password"
                                                    // openEye
                                                    placeholder={"請輸入悠遊卡/一卡通卡號"}
                                                    theme={laptop.singUpFormUserCardNo}
                                                    value={globalContextService.get("LoginPage", "UserCardNo") ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "UserCardNo", value);
                                                    }}
                                                />

                                            </FormRow>

                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 居住地(縣市) County */}
                                                <NewSelector
                                                    bascDefaultTheme={"DefaultTheme"}
                                                    topLabel={<>通訊地址<Text theme={laptop.userCountyRequired}></Text></>}
                                                    // bottomLabel={"為避免無法成功預約訂車，門牌號碼及巷弄請使用半形數字，且勿填寫樓層及備註"}
                                                    //viewType
                                                    isSearchable
                                                    placeholder={"選擇縣市"}
                                                    // isMulti
                                                    // hideSelectedOptions={false}
                                                    value={globalContextService.get("LoginPage", "UserCounty") ?? null}
                                                    onChange={(e, value, onInitial) => {
                                                        // console.log(value)
                                                        if (!isEqual(value, globalContextService.get("LoginPage", "UserCounty"))) {
                                                            globalContextService.set("LoginPage", "UserCounty", value);
                                                            globalContextService.set("LoginPage", "UserDistrict", { value: 'hint', label: "選擇區域", isDisabled: true });
                                                            setForceUpdate(f => !f);
                                                        }

                                                    }}

                                                    options={[
                                                        { value: 'hint', label: "選擇縣市", isDisabled: true },
                                                        ...Counties
                                                    ]}
                                                    // menuPosition={true}
                                                    theme={laptop.userCounty}
                                                />

                                                {/* 居住地(區域) District */}
                                                <NewSelector
                                                    bascDefaultTheme={"DefaultTheme"}
                                                    topLabel={""}
                                                    //viewType
                                                    isSearchable
                                                    placeholder={"選擇區域"}
                                                    // isMulti
                                                    // hideSelectedOptions={false}
                                                    value={globalContextService.get("LoginPage", "UserDistrict") ?? null}
                                                    onChange={(e, value, onInitial) => {
                                                        // console.log(value)
                                                        globalContextService.set("LoginPage", "UserDistrict", value);
                                                    }}

                                                    options={[
                                                        { value: 'hint', label: "選擇區域", isDisabled: true },
                                                        ...(
                                                            !isNil(globalContextService.get("LoginPage", "UserCounty")) ?
                                                                cityAndCountiesLite[globalContextService.get("LoginPage", "UserCounty")?.value]
                                                                :
                                                                []
                                                        )
                                                    ]}
                                                    // menuPosition={true}
                                                    theme={laptop.userDistrict}
                                                />

                                                {/* 通訊地址 UserAddr */}
                                                <MapGoogleInput
                                                    placeholder={"請輸入通訊地址(XX路XX號)"}
                                                    placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // 接後端的API
                                                    // viewType 
                                                    // disable
                                                    // topLabel={<>通訊地址<Text theme={laptop.singUpFormUserAddrRequired}></Text></>}
                                                    // bottomLabel={"為避免無法成功預約訂車，門牌號碼及巷弄請使用半形數字，且勿填寫樓層及備註"}
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    value={globalContextService.get("LoginPage", "UserAddr") ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "UserAddr", value);
                                                        globalContextService.remove("LoginPage", "UserAddrLatLng");
                                                    }}
                                                    onSelect={(e, option, onInitial, posInfo) => {
                                                        globalContextService.set("LoginPage", "UserAddr", option.label);
                                                        globalContextService.set("LoginPage", "UserAddrLatLng", { lat: posInfo?.lat, lng: posInfo?.lon });
                                                    }}

                                                    theme={laptop.singUpFormUserAddr}
                                                />
                                            </FormRow>

                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 完成按鈕 */}
                                                <SubContainer
                                                    theme={laptop.singUpFormDoneButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"PrimaryTheme"}
                                                        text={"完成"}
                                                        theme={laptop.singUpFormDoneButton}
                                                        onClick={() => { props.setWhichForm("Login") }}
                                                    />
                                                </SubContainer>
                                            </FormRow>

                                            {/* 已有帳號？登入連結 */}
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                <SubContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptop.loginFormHaveAccountContainer}
                                                >
                                                    <BasicContainer
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={laptop.loginFormHaveAccountSubContainer}
                                                    >
                                                        <Text
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.loginFormForgetHaveAccount}
                                                        >
                                                            已有帳號？
                                                        </Text>

                                                        <Text
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.loginFormToLoginText}
                                                            onClick={() => { props.setWhichForm("Login") }}
                                                        >
                                                            登入
                                                        </Text>
                                                    </BasicContainer>
                                                </SubContainer>
                                            </FormRow>

                                        </FormContainer>
                                    </BasicContainer>
                                </>
                            }
                        </Container>
                    </BasicContainer>
                </ScrollBar>
            </BasicContainer>

        </>
    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`