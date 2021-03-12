import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Store/Store'
import styled from 'styled-components';
//import { ReactComponent as MobileMbg } from '../../../Assets/img/MobileMbg.svg'
import { ReactComponent as MobileMbg } from '../../../Assets/img/MobileMbg.svg'
import { ReactComponent as LoginLogoMobileM } from '../../../Assets/img/LoginLogoMobileM.svg'
import { ReactComponent as Admin } from '../../../Assets/img/Admin.svg'
import { ReactComponent as Lock } from '../../../Assets/img/Lock.svg'
import { ReactComponent as Phone } from '../../../Assets/img/Phone.svg'
import { ReactComponent as AuthCode } from '../../../Assets/img/AuthCode.svg'
import { ReactComponent as LoginLogoNewTaipei } from '../../../Assets/img/LoginLogoNewTaipei.svg'
import { ReactComponent as LoginSplitLine } from '../../../Assets/img/LoginSplitLine.svg'
import { ReactComponent as LoginInfoIcon } from '../../../Assets/img/LoginInfoIcon.svg'
import { ReactComponent as LoginGreenCheck } from '../../../Assets/img/LoginGreenCheck.svg'
import { BasicContainer, Container, ScrollBar, Radio, SubContainer, Text, FormContainer, FormRow, NewSelector, TextInput, BasicButton, Checkbox, CheckboxItem, modalsService, InfoModal, globalContextService, DateTimePicker, RadioItem } from '../../../Components';
import { MapGoogleInput, MobileMPlacard, TitleBar } from '../../../ProjectComponent';
import moment from 'moment';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { cityAndCountiesLite, Counties } from '../../../Mappings/Mappings';
import { isEqual, isNil, isEmpty } from 'lodash';
import LoginBg from '../../../Assets/img/LoginBg.png'
import { valid } from '../../../Handlers';

//#region 倒數10秒
const TimeCounter = (props) => {

    const [Sec, setSec] = useState(300);

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

//#region 驗證手機格式
const errorPhone = () => {
    return (
        !isEmpty(valid(globalContextService.get("LoginPage", "Phone") ?? "", ["^09[0-9]{8}$"], ["請輸入正確的手機號碼"])[1])
    )
}
//#endregion

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { login: { rwd: { mobileM } } } } = Theme;
    //const [WhichForm, setWhichForm] = useState("Login"); // 切換 登入、忘記密碼、設定登入密碼 表單
    //const [SendedAuthCode, setSendedAuthCode] = useState(false);
    //const [WaitSecToZero, setWaitSecToZero] = useState(true);
    const [Width, Height] = useWindowSize();

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    //console.log(mobileM)
    return (
        <>
            {/* 最外層容器 */}
            <BasicContainer
                baseDefaultTheme={"DefaultTheme"}
                height={Height}
                theme={mobileM.outContainer} >
                {/* 最外層容器 ScrollBar */}
                <ScrollBar
                    basedefaulttheme={"DefaultTheme"}
                    theme={mobileM.outContainerScrollBar} /*autoHide={true}*/ >
                    {/* 上半部 */}
                    <BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        height={Height}
                        bigHeight={props.WhichForm === "SingUp"}
                        theme={mobileM.aboveContainer}
                    >
                        {/* 標題 */}
                        {props.WhichForm !== "Login" &&
                            <>
                                <SubContainer
                                    theme={mobileM.titleBarContainer}
                                >
                                    <TitleBar
                                        returnIcon
                                        MenuIcondontShow
                                        returnIconOnClick={(e) => {
                                            props.setWhichForm("Login");
                                            props.setWaitSecToZero(false);
                                            props.controllGCS("Return");
                                            props.setAuthCodeSuccess(true);
                                        }}
                                        customTitleText={
                                            <Text
                                                theme={mobileM.titleBar}>
                                                {["ForgetPass", "ResetPass"].includes(props.WhichForm) ? `忘記密碼` : ""}
                                            </Text>
                                        }
                                    />
                                </SubContainer>
                            </>
                        }

                        {/* 背景自適應 */}
                        {/* <MobileMbg style={mobileM.bgImage} /> */}
                        <img src={LoginBg} style={{ width: "100%" }} alt="fireSpot" />

                        {/* 登入框容器 */}
                        <Container
                            baseDefaultTheme={"DefaultTheme"}
                            height={Height}
                            theme={mobileM.loginContainer}
                        >

                            {/* 從這裡替換成其他表單 : 登入、忘記密碼、設定登入密碼 */}

                            {/* 登入表單 Login */}
                            {props.WhichForm === "Login" &&
                                <>
                                    {/* 登入表單容器  */}
                                    <BasicContainer
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={mobileM.loginFormContainer}
                                    >
                                        {/* 登入表單半圓容器 */}
                                        <Container
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={mobileM.loginFormCricleContainer}
                                        >
                                            {/* 登入表單半圓 */}
                                            <BasicContainer
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={mobileM.loginFormCricle}
                                            />
                                            {/* 新北圖標 */}
                                            <LoginLogoNewTaipei style={mobileM.loginFormCricleLogo} />

                                        </Container>

                                        {/* Logo標題文字 */}
                                        <Text
                                            theme={mobileM.titleBarLogoContainerTextMobileM}
                                        >
                                            屏東市政府
                                            <br />
                                            長照交通接送統一預約服務及管理系統
                                        </Text>

                                        {/* 登入表單標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={mobileM.loginFormTitle}
                                        >
                                            登入
                                        </Text>
                                        {/* 登入表單次標題 */}
                                        {/* <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={mobileM.loginFormSubTitle}
                                        >
                                            為了保障您的帳號安全，建議您最少於三個月變更一次密碼。
                                        </Text> */}
                                        {/* 登入表單組件 */}
                                        <FormContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            onSubmit={(e) => {
                                                if (!props.loginPending) {
                                                    props.loginExecute()
                                                }
                                            }}
                                            theme={mobileM.loginFormFormContainer}
                                        >
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 帳號 Account */}
                                                <TextInput
                                                    topLabel={<>User</>}
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="text"
                                                    placeholder={"請輸入您的帳號"}
                                                    // leftIcon={
                                                    //     <Admin
                                                    //         style={mobileM.loginFormAccountLeftIcon}
                                                    //     />
                                                    // }
                                                    theme={mobileM.loginFormAccount}
                                                    value={globalContextService.get("LoginPage", "Account") ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "Account", value);
                                                    }}
                                                />
                                            </FormRow>
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 密碼 Password */}
                                                <TextInput
                                                    topLabel={<>Password</>}
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="password"
                                                    openEye
                                                    placeholder={"請輸入您的密碼"}
                                                    // leftIcon={
                                                    //     <Lock
                                                    //         style={mobileM.loginFormPasswordLeftIcon}
                                                    //     />
                                                    // }
                                                    theme={mobileM.loginFormPassword}
                                                    value={globalContextService.get("LoginPage", "Password") ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "Password", value);
                                                    }}
                                                />
                                            </FormRow>

                                            {/* 忘記密碼連結 */}
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                <SubContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={mobileM.loginFormForgetPassContainer}
                                                >
                                                    <BasicContainer
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={mobileM.loginFormForgetPassSubContainer}
                                                    >
                                                        {/* <Text
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={mobileM.loginFormForgetPassText}
                                                            onClick={() => { props.setWhichForm("SingUp") }}
                                                        >
                                                            註冊
                                                        </Text> */}

                                                        <BasicContainer
                                                            theme={mobileM.loginFormForgetPassTextIconsContainer}
                                                        >
                                                            <LoginSplitLine />
                                                            <LoginInfoIcon style={{ position: "relative", left: "5px" }} />
                                                        </BasicContainer>
                                                        <Text
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={mobileM.loginFormForgetPassText}
                                                            onClick={() => { props.setWhichForm("ForgetPass") }}
                                                        >
                                                            忘記密碼？
                                                        </Text>

                                                        {/* <Text
                                                            theme={mobileM.loginFormNoteText}
                                                        >
                                                            <BasicContainer theme={mobileM.loginFormBlueIcon} />
                                                            此註冊頁僅提供預約共享車隊叫車服務，如需預約長照相關業務，請撥打 1966 服務專線，將會有專員提供服務。
                                                        </Text>

                                                        <Text
                                                            theme={mobileM.loginFormNoteText}
                                                        >
                                                            <BasicContainer theme={mobileM.loginFormBlueIcon} />
                                                            若已有長照資格，需預約共享車隊服務，請在登入後選擇用戶專區進行服務開通。
                                                        </Text> */}

                                                    </BasicContainer>
                                                </SubContainer>
                                            </FormRow>

                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 登入按鈕 */}
                                                <SubContainer
                                                    theme={mobileM.loginFormLoginButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"PrimaryTheme"}
                                                        text={"登入"}
                                                        theme={mobileM.loginFormLoginButton}
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
                                        </FormContainer>
                                    </BasicContainer>
                                </>
                            }

                            {/* 忘記密碼 步驟外側容器 */}
                            <SubContainer
                                view={["ForgetPass", "ResetPass"].includes(props.WhichForm)}
                                theme={mobileM.forgetPassStepOutContainer}
                            >
                                {
                                    ([
                                        "驗證身份",
                                        "設置新密碼",
                                        "完成"
                                    ]).map((item, index) => {
                                        return (
                                            <>
                                                {/* 忘記密碼 步驟容器 */}
                                                <Container
                                                    theme={mobileM.forgetPassStepContainer}
                                                >
                                                    {/* 忘記密碼 左側橫線 */}
                                                    <Text
                                                        view={index !== 0}
                                                        theme={mobileM.leftLine}
                                                    >
                                                    </Text>

                                                    {/* 忘記密碼 右側橫線 */}
                                                    <Text
                                                        view={index !== 2}
                                                        theme={mobileM.rightLine}
                                                    >
                                                    </Text>

                                                    {/* 忘記密碼 步驟 順序 */}
                                                    <Text
                                                        theme={index + 1 <= props.ForgetFlag ? mobileM.forgetPassStepNum.onpage : mobileM.forgetPassStepNum}
                                                    >
                                                        {`0${index + 1}`}
                                                    </Text>

                                                    {/* 忘記密碼 步驟 文字 */}
                                                    <Text
                                                        theme={mobileM.forgetPassStepText}
                                                    >
                                                        {item}
                                                    </Text>

                                                </Container>
                                            </>
                                        )
                                    })
                                }

                            </SubContainer>

                            {/* 忘記密碼表單 ForgetPass */}
                            {props.WhichForm === "ForgetPass" &&
                                <>
                                    {/* 忘記密碼表單容器  */}
                                    <BasicContainer
                                        height={Height}
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={mobileM.forgetPassFormContainer}
                                    >
                                        {/* 忘記密碼表單標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={mobileM.forgetPassFormTitle}
                                        >
                                            {`系統將會寄出確認簡訊至此手機號碼`}
                                        </Text>

                                        {/* 忘記密碼表單組件 */}
                                        <FormContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                            }}
                                            theme={mobileM.forgetPassFormFormContainer}
                                        >
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 手機號碼 Phone */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    error={errorPhone() && !isEmpty(globalContextService.get("LoginPage", "Phone"))}
                                                    type="number"
                                                    placeholder={"請輸入帳號(預設為手機號碼)"}
                                                    bottomLabel={
                                                        !isEmpty(globalContextService.get("LoginPage", "Phone"))
                                                            ?
                                                            (
                                                                errorPhone()
                                                                    ?
                                                                    <Text theme={mobileM.forgetPassFormRedPhone}>{`帳號格式可能錯誤`}</Text>
                                                                    :
                                                                    ""
                                                            )
                                                            :
                                                            ""
                                                    }
                                                    value={globalContextService.get("LoginPage", "Phone")}
                                                    onChange={(e, value, onInitial) => {
                                                        if (!isEqual(value, globalContextService.get("LoginPage", "Phone"))) {
                                                            globalContextService.set("LoginPage", "Phone", value);
                                                            setForceUpdate(u => !u);
                                                        }
                                                    }}
                                                    theme={mobileM.forgetPassFormPhone}
                                                />
                                            </FormRow>

                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 驗證碼 AuthCode */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="text"
                                                    placeholder={"請輸入驗證碼"}
                                                    error={!props?.AuthCodeSuccess}
                                                    bottomLabel={!props?.AuthCodeSuccess ? <Text theme={mobileM.forgetPassFormAuthRedCode}>{`驗證碼錯誤`}</Text> : ""}
                                                    value={globalContextService.get("LoginPage", "AuthCode")}
                                                    onChange={(e, value, onInitial) => {
                                                        if (!isEqual(value, globalContextService.get("LoginPage", "AuthCode"))) {
                                                            globalContextService.set("LoginPage", "AuthCode", value);
                                                            setForceUpdate(u => !u);
                                                        }
                                                    }}
                                                    theme={mobileM.forgetPassFormAuthCode}
                                                />

                                                {/* 傳送認證碼按鈕 */}
                                                <SubContainer
                                                    theme={mobileM.forgetPassFormSendAuthCodeButtonContainer}
                                                >
                                                    {!props.WaitSecToZero ?
                                                        <BasicButton
                                                            baseDefaultTheme={"PrimaryTheme"}
                                                            disable={isEmpty(globalContextService.get("LoginPage", "Phone")) || errorPhone()}
                                                            haveData={!isEmpty(globalContextService.get("LoginPage", "Phone")) && !errorPhone()}
                                                            text={`取得驗證碼`}
                                                            theme={mobileM.forgetPassFormSendAuthCodeButton}
                                                            onClick={() => {
                                                                console.log("Start")
                                                                // props.setWaitSecToZero(true);
                                                                props.SendAuthCodeExecute(globalContextService.get("LoginPage", "Phone"))
                                                            }}
                                                        />
                                                        :
                                                        <BasicButton
                                                            disable
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            text={
                                                                <>
                                                                    <TimeCounter
                                                                        onCountToZero={() => {
                                                                            props.setWaitSecToZero(false);
                                                                            console.log("End")
                                                                        }}
                                                                    />
                                                                        秒
                                                                    </>
                                                            }
                                                            theme={mobileM.forgetPassFormWaitSecToZeroButton}
                                                        />
                                                    }
                                                </SubContainer>
                                            </FormRow>

                                            <FormRow
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={mobileM.forgetPassFormCancelAndNextButtonFormRow}
                                            >
                                                {/* 驗證按鈕 */}
                                                <SubContainer
                                                    theme={mobileM.forgetPassFormNextButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"PrimaryTheme"}
                                                        haveData={!isEmpty(globalContextService.get("LoginPage", "AuthCode"))}
                                                        disable={isEmpty(globalContextService.get("LoginPage", "AuthCode"))}
                                                        text={"驗證"}
                                                        theme={mobileM.forgetPassFormNextButton}
                                                        onClick={() => {
                                                            props.ConfirmAuthCodeExecute(
                                                                globalContextService.get("LoginPage", "Phone"),
                                                                globalContextService.get("LoginPage", "AuthCode")
                                                            )
                                                            // props.setWhichForm("ResetPass")
                                                        }}
                                                    />
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
                                        height={Height}
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={mobileM.resetPassFormContainer}
                                    >
                                        {/* 設定登入密碼表單標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={mobileM.resetPassFormTitle}
                                        >
                                            {`驗證完成，請輸入新密碼`}
                                        </Text>
                                        {/* 設定登入密碼表單次標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={mobileM.resetPassFormSubTitle}
                                        >
                                            {`8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。`}
                                        </Text>
                                        {/* 設定登入密碼表單組件 */}
                                        <FormContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                            }}
                                            theme={mobileM.resetPassFormFormContainer}
                                        >
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 新密碼 NewPassword */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="password"
                                                    openEye
                                                    placeholder={"請輸入新密碼"}
                                                    // leftIcon={
                                                    //     <Lock
                                                    //         style={mobileM.resetPassFormNewPasswordLeftIcon}
                                                    //     />
                                                    // }
                                                    value={globalContextService.get("LoginPage", "NewPassword")}
                                                    onChange={(e, value, onInitial) => {
                                                        if (!isEqual(value, globalContextService.get("LoginPage", "NewPassword"))) {
                                                            globalContextService.set("LoginPage", "NewPassword", value);
                                                            setForceUpdate(u => !u)
                                                        }
                                                    }}
                                                    theme={mobileM.resetPassFormNewPassword}
                                                />
                                            </FormRow>
                                            {/* <FormRow baseDefaultTheme={"DefaultTheme"}> */}
                                            {/* 確認新密碼 ConfirmPassword */}
                                            {/* <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="password"
                                                    openEye
                                                    placeholder={"再一次輸入新密碼確認"}
                                                    leftIcon={
                                                        <Lock
                                                            style={mobileM.resetPassFormConfirmPasswordLeftIcon}
                                                        />
                                                    }
                                                    theme={mobileM.resetPassFormConfirmPassword}
                                                />
                                            </FormRow> */}
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 完成按鈕 */}
                                                <SubContainer
                                                    theme={mobileM.resetPassFormDoneButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"PrimaryTheme"}
                                                        haveData={(!isEmpty(globalContextService.get("LoginPage", "NewPassword")) || props.ForgetFlag === 3)}
                                                        text={"確定"}
                                                        theme={mobileM.resetPassFormDoneButton}
                                                        onClick={() => {
                                                            if (props.ForgetFlag !== 3) {
                                                                //#region 表單驗證
                                                                let validMsg = "";
                                                                if (valid(globalContextService.get("LoginPage", "NewPassword") ?? "", ["^.{1,}$", "^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,}$"], ["請輸入新密碼", "新密碼請輸入：8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。"])[1]) {
                                                                    validMsg = valid(globalContextService.get("LoginPage", "NewPassword") ?? "", ["^.{1,}$", "^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,}$"], ["請輸入新密碼", "新密碼請輸入：8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。"])[1]
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
                                                                    props.SetNewPwdExecute({
                                                                        userAcc: globalContextService.get("LoginPage", "Phone"),
                                                                        userPwd: globalContextService.get("LoginPage", "NewPassword")
                                                                    })
                                                                }
                                                                //#endregion
                                                            }
                                                            else {
                                                                props.setWhichForm("Login")
                                                                props.controllGCS("Return")
                                                            }

                                                        }}
                                                    />
                                                </SubContainer>
                                            </FormRow>
                                        </FormContainer>

                                        {
                                            props.ForgetFlag === 3 &&
                                            <SubContainer
                                                theme={mobileM.completeButtonContainer}
                                            >
                                                <LoginGreenCheck />

                                                {/* 修改密碼完成 */}
                                                <Text

                                                    theme={mobileM.completeButtonText}
                                                >
                                                    {`修改密碼完成`}
                                                </Text>
                                            </SubContainer>
                                        }
                                    </BasicContainer>
                                </>
                            }

                            {/* 註冊表單 SingUp */}
                            {props.WhichForm === "SingUp" &&
                                <>
                                    {/* 註冊表單容器  */}
                                    <BasicContainer
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={mobileM.singUpFormContainer}
                                    >
                                        {/* 註冊表單標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={mobileM.singUpFormTitle}
                                        >
                                            註冊
                                        </Text>
                                        {/* 註冊表單次標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={mobileM.singUpFormSubTitle}
                                        >
                                            填寫通訊地址或(與)悠遊卡/一卡通卡號，可註冊共享車隊或(與)巴士叫車服務。
                                        </Text>
                                        {/* 註冊表單組件 */}
                                        <FormContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                            }}
                                            theme={mobileM.singUpFormFormContainer}
                                        >
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 姓名 UserName */}
                                                <TextInput
                                                    topLabel={<>姓名<Text theme={mobileM.singUpFormUserNameRequired}>*</Text></>}
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    // type="password"
                                                    // openEye
                                                    placeholder={"請輸入姓名"}
                                                    theme={mobileM.singUpFormUserName}
                                                    value={globalContextService.get("LoginPage", "UserName") ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "UserName", value);
                                                    }}
                                                />

                                                {/* 電話 UserPhone */}
                                                <TextInput
                                                    topLabel={<>電話<Text theme={mobileM.singUpFormUserPhoneRequired}>*</Text></>}
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    // type="password"
                                                    // openEye
                                                    placeholder={"請輸入電話"}
                                                    theme={mobileM.singUpFormUserPhone}
                                                    value={globalContextService.get("LoginPage", "UserPhone") ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "UserPhone", value);
                                                    }}
                                                />

                                                {/* 生日 UserBirthday */}
                                                <DateTimePicker
                                                    topLabel={<>生日<Text theme={mobileM.singUpFormUserBirthdayRequired}>*</Text></>}
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
                                                    theme={mobileM.singUpFormUserBirthday}
                                                />

                                                {/* 性別 UserSex */}
                                                <Radio
                                                    // viewType
                                                    // disable
                                                    topLabel={<>性別<Text theme={mobileM.singUpFormUserSexRequired}>*</Text></>}
                                                    value={globalContextService.get("LoginPage", "UserSex") ?? 1}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "UserSex", value);
                                                    }}
                                                    theme={mobileM.singUpFormUserSex}
                                                >
                                                    {/* 性別 UserSex  選項 */}
                                                    <RadioItem value={1} >男</RadioItem>
                                                    <RadioItem value={0} >女</RadioItem>
                                                </Radio>

                                                {/* 身分證字號 UserUid */}
                                                <TextInput
                                                    topLabel={<>身分證字號<Text theme={mobileM.singUpFormUserUidRequired}>*</Text></>}
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    // type="password"
                                                    // openEye
                                                    placeholder={"請輸入身分證字號"}
                                                    theme={mobileM.singUpFormUserUid}
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
                                                            <Text theme={mobileM.singUpFormUserCardNoRequired}>
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
                                                                theme={mobileM.userNoCardNO}
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
                                                    theme={mobileM.singUpFormUserCardNo}
                                                    value={globalContextService.get("LoginPage", "UserCardNo") ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "UserCardNo", value);
                                                    }}
                                                />

                                                {/* 居住地(縣市) County */}
                                                <NewSelector
                                                    bascDefaultTheme={"DefaultTheme"}
                                                    topLabel={<>通訊地址<Text theme={mobileM.userCountyRequired}></Text></>}
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
                                                    theme={mobileM.userCounty}
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
                                                    theme={mobileM.userDistrict}
                                                />

                                                {/* 通訊地址 UserAddr */}
                                                <MapGoogleInput
                                                    placeholder={"請輸入通訊地址(XX路XX號)"}
                                                    placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // 接後端的API
                                                    // viewType 
                                                    // disable
                                                    topLabel={<>通訊地址<Text theme={mobileM.singUpFormUserAddrRequired}></Text></>}
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

                                                    theme={mobileM.singUpFormUserAddr}
                                                />
                                            </FormRow>

                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 完成按鈕 */}
                                                <SubContainer
                                                    theme={mobileM.singUpFormDoneButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"PrimaryTheme"}
                                                        text={"完成"}
                                                        theme={mobileM.singUpFormDoneButton}
                                                        onClick={() => { props.setWhichForm("Login") }}
                                                    />
                                                </SubContainer>
                                            </FormRow>

                                            {/* 已有帳號？登入連結 */}
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                <SubContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={mobileM.loginFormHaveAccountContainer}
                                                >
                                                    <BasicContainer
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={mobileM.loginFormHaveAccountSubContainer}
                                                    >
                                                        <Text
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={mobileM.loginFormForgetHaveAccount}
                                                        >
                                                            已有帳號？
                                                        </Text>

                                                        <Text
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={mobileM.loginFormToLoginText}
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
                            {/* 登入頁Logo */}
                            {/* <LoginLogoMobileM style={mobileM.logo} /> */}

                        </Container>
                    </BasicContainer>

                </ScrollBar>
            </BasicContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
