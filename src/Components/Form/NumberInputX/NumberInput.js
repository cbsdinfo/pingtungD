import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SubContainer } from '../../Containers/SubContainer';
import { iterateTheme } from '../../../Handlers/ThemeHandler';
import { isNil } from 'lodash/lang'
import { NativeTextInput } from '../NativeTextInput/NativeTextInput';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Eye } from './Assets/img/Eye.svg'
import { ReactComponent as EyeInvisible } from './Assets/img/EyeInvisible.svg'
import { ReactComponent as Down } from './Assets/img/Down.svg'
import { ReactComponent as Up } from './Assets/img/Up.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
// import PrimaryTheme from './Theme/PrimaryTheme'
import DisableTheme from './Theme/DisableTheme'
import { BasicContainer } from '../../Containers/BasicContainer';
import { Text } from '../../Texts/Text/Text';
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "SecondaryTheme":
        //     return SecondaryTheme;
        case "DisableTheme":
            return DisableTheme;
        // case "PrimaryTheme":
        //     return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region 表單內的列容器
export const NumberInputBase = (props) => {

    const [OpenEye, setOpenEye] = useState(false);
    const [Value, setValue] = useState("");
    const [OnInitial, setOnInitial] = useState(true); // 用於 onChange 中 初始渲染與 後續選染動作不同時
    const [Focus, setFocus] = useState(false);
    const [Hover, setHover] = useState(false);

    useEffect(() => {
        setOpenEye(!!props.openEye);
        setValue(props.value);
        if (!isNil(props.value)) {
            props.onChange && props.onChange(null, props.value, OnInitial);
            setOnInitial(false);
        }
    }, [props.openEye, props.value, props.onChange])

    return (
        <>
            {
                props.viewType ?
                    // 展示模式
                    // 容器
                    <SubContainer
                        {...props.viewTypeContainerEvent}
                        baseDefaultTheme={"DefaultTheme"}
                        className={`${props.className} viewTypeContainer`}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeContainer") }}
                    >
                        {/* 上標題 */}
                        <Text
                            {...props.viewTypeTopLabelEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeTopLabel`}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeTopLabel") }}
                        >
                            {props.viewTypeTopLabel ?? props.topLabel}
                        </Text>
                        {/* 輸入框本體 */}
                        <BasicContainer
                            {...props.viewTypeTextInputContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeTextInputContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeTextInputContainer") }}
                        >
                            {/* 當前展示文字 */}
                            <Text
                                {...props.viewTypeTextInputEvent}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} viewTypeTextInput`}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeTextInput") }}
                            >
                                {Value ?? ""}
                            </Text>
                        </BasicContainer>
                        {/* 下標題 */}
                        <Text
                            {...props.viewTypeBottomLabelEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeBottomLabel`}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeBottomLabel") }}
                        >
                            {props.viewTypeBottomLabel ?? props.bottomLabel}
                        </Text>
                    </SubContainer>
                    :
                    // 一般編輯模式
                    // 容器
                    <SubContainer
                        {...props.containerEvent}
                        baseDefaultTheme={"DefaultTheme"}
                        className={`${props.className} container`}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "container") }}
                    >
                        {/* 上標題 */}
                        <Text
                            {...props.topLabelEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} topLabel`}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "topLabel") }}
                        >
                            {props.topLabel}
                        </Text>
                        {/* 輸入框本體 */}
                        <BasicContainer
                            {...props.textInputContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} textInputContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "textInputContainer") }}
                        >
                            <NativeTextInput
                                {...props.textInputEvent}
                                autoComplete={props.autoComplete ?? "off"}
                                type={(props.type !== "password" ? props.type : (props.openEye ? (OpenEye ? "password" : "text") : "password"))}
                                disabled={props.disable}
                                leftIcon={props.leftIcon}
                                value={Value ?? ""}
                                //onMouseEnter={(e) => { setHover(true); props.onMouseEnter && props.onMouseEnter(e); }}
                                //onMouseLeave={(e) => { setHover(false); props.onMouseLeave && props.onMouseLeave(e); }}
                                onMouseOver={(e) => { setHover(true); props.onMouseover && props.onMouseover(e); }}
                                onMouseOut={(e) => { setHover(false); props.onMouseout && props.onMouseout(e); }}
                                onFocus={(e) => { setFocus(true); props.onFocus && props.onFocus(e); }}
                                onBlur={(e) => { setFocus(false); props.onBlur && props.onBlur(e); }}
                                onChange={(e) => { setValue(e.target.value); props.onChange && props.onChange(e, e.target.value, OnInitial); }}
                                placeholder={props.placeholder}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} textInput`}
                                theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "textInput") }}
                            />
                            {props.leftIcon}
                            {props.children}
                            {props.rightIcon}

                            {/* 數字加減區 */}
                            <BasicContainer
                                onClick={() => { console.log("sdfdfs") }}
                                onFocus={(e) => { setFocus(true); props.onFocus && props.onFocus(e); }}
                                onBlur={(e) => { setFocus(false); props.onBlur && props.onBlur(e); }}
                                onMouseOver={(e) => { setHover(true); props.onMouseover && props.onMouseover(e); }}
                                onMouseOut={(e) => { setHover(false); props.onMouseout && props.onMouseout(e); }}
                                theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "upIconContainer") }}
                            >
                                <Up
                                    onClick={() => { setOpenEye(o => !o) }}
                                    {...props.upEvent}
                                    onMouseOver={(e) => { setHover(true); props.onMouseover && props.onMouseover(e); }}
                                    onMouseOut={(e) => { setHover(false); props.onMouseout && props.onMouseout(e); }}
                                    style={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "upIcon")["basic"] }}
                                />
                            </BasicContainer>
                            <BasicContainer
                                onMouseOver={(e) => { setHover(true); props.onMouseover && props.onMouseover(e); }}
                                onMouseOut={(e) => { setHover(false); props.onMouseout && props.onMouseout(e); }}
                                theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "downIconContainer") }}
                            >
                                <Down
                                    onClick={() => { setOpenEye(o => !o) }}
                                    {...props.downEvent}
                                    onMouseOver={(e) => { setHover(true); props.onMouseover && props.onMouseover(e); }}
                                    onMouseOut={(e) => { setHover(false); props.onMouseout && props.onMouseout(e); }}
                                    style={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "downIcon")["basic"] }}
                                />
                            </BasicContainer>

                        </BasicContainer>
                        {/* 下標題 */}
                        <Text
                            {...props.bottomLabelEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} bottomLabel`}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "bottomLabel") }}
                        >
                            {props.bottomLabel}
                        </Text>
                    </SubContainer >
            }
        </>
    )
}

export const NumberInput = styled(NumberInputBase).attrs((props) => ({}))`

`
//#endregion