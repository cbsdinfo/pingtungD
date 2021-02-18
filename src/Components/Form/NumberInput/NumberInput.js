import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SubContainer } from '../../Containers/SubContainer';
import { iterateTheme } from '../../../Handlers/ThemeHandler';
import { isNil } from 'lodash/lang'
import { InputNumber as InputNumberExtend } from 'antd';
import locale from 'antd/es/locale/en_US'; //zh_CN zh_TW en_US
import moment from 'moment';
import 'moment/locale/zh-tw'; //日期名包
import { useLocation } from 'react-router-dom';
import { ReactComponent as Eye } from './Assets/img/Eye.svg'
import { ReactComponent as EyeInvisible } from './Assets/img/EyeInvisible.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
// import PrimaryTheme from './Theme/PrimaryTheme'
import DisableTheme from './Theme/DisableTheme'
import { BasicContainer } from '../../Containers/BasicContainer';
import { Text } from '../../Texts/Text/Text';
import { cssifyObject } from 'css-in-js-utils';
import { globalContextService } from '../../../Store/GlobalContext';
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

//#region 數字輸入框
const InputNumberExtendStyle = styled(InputNumberExtend).attrs((props) => ({}))`

//#region numberInputSubContainer 數字輸入框 次容器
&.ant-input-number {
    ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover, disable: props.disable }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "numberInputSubContainer")['basic']))}  
}
//#endregion

//#region 修改右方 Icon 樣式 (不開放)
& .ant-input-number-handler-wrap {
    transition: none;
}

& .ant-select-dropdown ant-select-dropdown-placement-bottomLeft  slide-up-leave slide-up-leave-active slide-up {
    color: inherit;
    transition: none;
    height: 100%;
    padding: 2px 0;

    //#region numberInputInput 數字輸入框 的 Input
    .ant-input-number-input {
        ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover, disable: props.disable }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "numberInput")['basic']))}  
    }
    //#endregion
}
//#endregion

`
//#endregion

//#region 數字輸入框
export const NumberInputBase = (props) => {

    const [Value, setValue] = useState(null);
    const [ViewTypeValue, setViewTypeValue] = useState(null);
    const [OnInitial, setOnInitial] = useState(true); // 用於 onChange 中 初始渲染與 後續選染動作不同時
    const [Focus, setFocus] = useState(false); // 本組件不使用
    const [Hover, setHover] = useState(false); // 本組件不使用

    useEffect(() => {
        setValue(props.value)
        if (props.value) {
            setViewTypeValue(((props?.formatter && props.formatter(props.value)) ?? `${props.value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')))
        }
        else {
            setViewTypeValue("")
        }

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
                            {...props.viewTypeNumberInputContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeNumberInputContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeNumberInputContainer") }}
                        >
                            {/* 當前展示文字 */}
                            <Text
                                {...props.viewTypeNumberInputEvent}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} viewTypeNumberInput`}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeNumberInput") }}
                            >
                                {ViewTypeValue ?? ""}
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
                        {/* 數字輸入框本體 */}
                        <BasicContainer
                            {...props.numberInputContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} numberInputContainer`}
                            onMouseOver={(e) => { setHover(true); props.onMouseover && props.onMouseover(e); }}
                            onMouseOut={(e) => { setHover(false); props.onMouseout && props.onMouseout(e); }}
                            onFocus={(e) => { setFocus(true); props.onFocus && props.onFocus(e); }}
                            onBlur={(e) => { setFocus(false); props.onBlur && props.onBlur(e); }}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "numberInputContainer") }}
                        >

                            {/* 數字輸入框 */}
                            < InputNumberExtendStyle
                                //onChange={(e) => { setChecked(c => !c); props.onChange && props.onChange(e, e.target.checked, OnInitial); }}
                                disabled={props.disable ?? false}
                                disable={props.disable ?? false} //供判斷
                                focus={Focus}
                                hover={Hover}
                                placeholder={props.placeholder ?? "請輸入數字"} // 具locale預設值
                                transitionName="" //取消動畫
                                // formatter //處理格式轉換，如加上$符號等， https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
                                max={props.max}
                                min={props.min}
                                step={props.step ?? 1}
                                formatter={value => ((props?.formatter && props.formatter(value)) ?? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','))} // 顯示字體格式化 (3個一撇)
                                decimalSeparator={props.decimalSeparator ?? "."} //小數點替換
                                precision={props.precision ?? 0} //小數點位數
                                value={Value}

                                onChange={(value) => {
                                    props.onChange && props.onChange(null, value, OnInitial);
                                    setValue(value);
                                    setViewTypeValue(((props?.formatter && props.formatter(value)) ?? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')))
                                }}
                                theme={props.theme}
                            />

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

