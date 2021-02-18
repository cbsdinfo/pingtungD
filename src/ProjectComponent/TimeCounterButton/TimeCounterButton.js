import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, BasicButton, ScrollBar, Checkbox, Container, Text, TitleModal, globalContextService, OldTable, Tag, FormContainer, FormRow, TextInput, SubContainer, CheckboxItem } from '../../Components';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as Search } from './Assets/img/Search.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { isNil, isUndefined } from 'lodash';
// import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
// import SuccessTheme from './Theme/SuccessTheme'
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "SecondaryTheme":
        //     return SecondaryTheme;
        // case "SuccessTheme":
        //     return SuccessTheme;
        // case "BasicButtonDisableTheme":
        //     return BasicButtonDisableTheme;
        // case "PrimaryTheme":
        //     return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region 倒數10秒
const TimeCounter = (props) => {

    const [Sec, setSec] = useState(props.counter);

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

//#region 組織樹遍歷
const TimeCounterButtonBase = (props) => {

    const [WaitSecToZero, setWaitSecToZero] = useState(props.getPresetWaitSecToZero);

    const EscapeFristRender = useRef(0); // 過濾初次渲染，跳過不執行，因為 上一次 AssignCheckedRowKeys若不為空，會直接吃到上一次的陣列


    return (
        <>
            {WaitSecToZero
                ?
                < BasicButton
                    baseDefaultTheme={"DefaultTheme"}
                    disable
                    theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "resendVerificationCodeWaitButton") }}
                    // theme={laptopL.resendVerificationCodeWaitButton}
                    text={
                        <>
                            重送驗證碼(
                            <TimeCounter
                                counter={props.getPresetCounter}
                                onCountToZero={() => {
                                    setWaitSecToZero(false);
                                    console.log("End")
                                }}
                            />
                            秒)
                        </>
                    }
                />
                :
                <BasicButton
                    baseDefaultTheme={"PrimaryTheme"}
                    text={"重送驗證碼"}
                    theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "resendVerificationCodeButton") }}
                    // theme={laptopL.resendVerificationCodeButton}
                    onClick={() => { setWaitSecToZero(true); console.log("Start") }}
                />
            }
        </>

    )
}
//#endregion

//只給 OrgManagerPage 使用
export const TimeCounterButton = styled(TimeCounterButtonBase).attrs((props) => ({}))`
`
//#endregion









