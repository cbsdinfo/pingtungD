import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SubContainer } from '../../Containers/SubContainer';
import { BaseLevelTheme, iterateTheme } from '../../../Handlers/ThemeHandler';
import { isNil } from 'lodash/lang'
import { Radio as RadioExtend } from 'antd';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Eye } from './Assets/img/Eye.svg'
import { ReactComponent as EyeInvisible } from './Assets/img/EyeInvisible.svg'
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

//#region Radio 組件
export const RadioExtendStyle = styled(RadioExtend).attrs((props) => (
    {
        value: props.value ?? undefined,
        disabled: props.disable ?? false,
        children: props.children ?? "請勾選",

    }
))`

//#region RadioItem 容器
&.ant-radio-wrapper {
    ${props => BaseLevelTheme(props, props.theme?.['container'], switchDefaultTheme(props.baseDefaultTheme)['radio']['container'])};
}
//#endregion

//#region RadioItem 圖標
& .ant-radio {
    ${props => BaseLevelTheme(props, props.theme?.['iconContainer'], switchDefaultTheme(props.baseDefaultTheme)['radio']['iconContainer'])};

    .ant-radio-inner {
        ${props => BaseLevelTheme(props, props.theme?.['icon'], switchDefaultTheme(props.baseDefaultTheme)['radio']['icon'])};
    }

    .ant-radio-input {
        pointer-events: none;
    }
}
//#endregion

`
//#endregion

//#region Radio Group組件
export const RadioGroupExtendStyle = styled(RadioExtend.Group).attrs((props) => ({}))`

${props => BaseLevelTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme))};

`
//#endregion

//#region 顯示所選項函數 
const showViewTypeValue = (children, value) => {
    let res = "";

    if (!isNil(children) && !isNil(value)) {

        if (children instanceof Array) {
            //僅返回一項，為單選
            (children ?? []).forEach((item, index) => {
                if (item?.props?.value === value) {
                    res = item?.props?.children;
                }
            })
        }
        else {
            if (children?.props?.value === value) {
                res = children?.props?.children;
            }
        }
    }

    return res;
}
//#endregion

//#region 表單內的勾選框
export const RadioBase = (props) => {

    const [Value, setValue] = useState(undefined);
    const [OnInitial, setOnInitial] = useState(true); // 用於 onChange 中 初始渲染與 後續選染動作不同時
    const [Focus, setFocus] = useState(false); // 本組件不使用
    const [Hover, setHover] = useState(false); // 本組件不使用

    useEffect(() => {
        setValue(props.value ?? undefined);
        if (!isNil(props.value)) {
            props.onChange && props.onChange(null, props.value, OnInitial);
            setOnInitial(false);
        }
    }, [props.value, props.onChange])

    return (
        <>
            {
                props.viewType ?
                    // 展示模式 (未開放)
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
                        {/* 勾選框本體 */}
                        <BasicContainer
                            {...props.viewTypeRadioContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeRadioContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeRadioContainer") }}
                        >
                            {/* 當前展示文字 */}
                            <Text
                                {...props.viewTypeRadioEvent}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} viewTypeRadio`}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeRadio") }}
                            >
                                {showViewTypeValue(props.children, Value)}
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
                        {/* 勾選框本體 */}
                        <BasicContainer
                            {...props.radioContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} radioContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "radioContainer") }}
                        >
                            {/* Radio Group */}
                            <RadioGroupExtendStyle
                                {...props.radioGroupEvent}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} radioGroup`}
                                theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "radioGroup") }}
                                value={Value ?? undefined}
                                disabled={props.disable}
                                onChange={(e) => { setValue(v => e.target.value); props.onChange && props.onChange(e, e.target.value, OnInitial); }}
                            >
                                {/* 傳入 RadioItem */}
                                {props.children}
                            </RadioGroupExtendStyle>

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

export const Radio = styled(RadioBase).attrs((props) => ({}))`

`
//#endregion
