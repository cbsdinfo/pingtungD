import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SubContainer } from '../../Containers/SubContainer';
import { BaseLevelTheme, iterateTheme } from '../../../Handlers/ThemeHandler';
import { isNil } from 'lodash/lang'
import { Checkbox as CheckboxExtend } from 'antd';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Eye } from './Assets/img/Eye.svg'
import { ReactComponent as EyeInvisible } from './Assets/img/EyeInvisible.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
// import PrimaryTheme from './Theme/PrimaryTheme'
import DisableTheme from './Theme/DisableTheme'
import { BasicContainer } from '../../Containers/BasicContainer';
import { Text } from '../../Texts/Text/Text';
import { SignalCellularNull } from '@material-ui/icons';
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

//#region Checkbox 組件
export const CheckboxExtendStyle = styled(CheckboxExtend).attrs((props) => (
    {
        checked: props.checked ?? undefined,
        disabled: props.disable ?? false,
        children: props.children ?? "請勾選",
    }
))`

//#region RadioItem 容器
&.ant-checkbox-wrapper {
    ${props => BaseLevelTheme(props, props.theme?.['container'], switchDefaultTheme(props.baseDefaultTheme)['checkbox']['container'])};
}
//#endregion

//#region RadioItem 圖標
& .ant-checkbox {
    ${props => BaseLevelTheme(props, props.theme?.['iconContainer'], switchDefaultTheme(props.baseDefaultTheme)['checkbox']['iconContainer'])};

    .ant-checkbox-inner {
        ${props => BaseLevelTheme(props, props.theme?.['icon'], switchDefaultTheme(props.baseDefaultTheme)['checkbox']['icon'])};
    }

    .ant-checkbox-input {
        pointer-events: none;
    }
}
//#endregion

`
//#endregion

//#region Checkbox Group組件
export const CheckboxGroupExtendStyleOnly = styled(CheckboxExtend.Group).attrs((props) => (
    {
        value: props.checked ?? undefined,
        disabled: props.disable ?? false
    }
))`

${props => BaseLevelTheme(props, props.theme, switchDefaultTheme(props.basedefaulttheme))};

`
//#endregion

//#region Checkbox Group組件
export const CheckboxGroupExtendStyle = styled(CheckboxExtend.Group).attrs((props) => ({}))`

${props => BaseLevelTheme(props, props.theme, switchDefaultTheme(props.basedefaulttheme))};

`
//#endregion

//#region 顯示所選項函數 
const showViewTypeChecked = (children, checkedList) => {
    let res = [];
    // console.log(children, checkedList)
    if (!isNil(children) && !isNil(checkedList)) {

        if (children instanceof Array) {
            //返回多項，為多選
            (children ?? []).forEach((item, index) => {
                if (checkedList.includes(item?.props?.value)) {
                    res.push(item?.props?.children);
                    res.push(" / ");
                }
            })
            res.splice(-1);
        }
        else {
            if (checkedList.includes(children?.props?.value)) {
                res.push(children?.props?.children);
            }
        }
    }

    return res;
}
//#endregion

//#region 表單內的勾選框
export const CheckboxBase = (props) => {

    const [Checked, setChecked] = useState(undefined);
    const [OnInitial, setOnInitial] = useState(true); // 用於 onChange 中 初始渲染與 後續選染動作不同時
    const [Focus, setFocus] = useState(false); // 本組件不使用
    const [Hover, setHover] = useState(false); // 本組件不使用

    useEffect(() => {
        // console.log(props.checked)
        setChecked(props.checked ?? undefined);
        if (!isNil(props.checked)) {
            props.onChange && props.onChange(null, props.checked, OnInitial);
            setOnInitial(false);
        }
    }, [props.checked, props.onChange])

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
                            {...props.viewTypeCheckboxContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeCheckboxContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeCheckboxContainer") }}
                        >
                            {/* 當前展示文字 */}
                            <Text
                                {...props.viewTypeCheckboxEvent}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} viewTypeCheckbox`}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeCheckbox") }}
                            >
                                {showViewTypeChecked(props.children, Checked)}
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
                            {...props.checkboxContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} checkboxContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "checkboxContainer") }}
                        >
                            {/* Checkbox Group */}
                            <CheckboxGroupExtendStyle
                                {...props.checkboxGroupEvent}
                                basedefaulttheme={"DefaultTheme"}
                                className={`${props.className} checkboxGroup`}
                                theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "checkboxGroup") }}
                                value={Checked ?? undefined}
                                disabled={props.disable}
                                onChange={(checkedList) => { setChecked(v => checkedList); props.onChange && props.onChange(null, checkedList, OnInitial); }}
                            >
                                {/* 傳入 CheckboxItem */}
                                {props.children}
                            </CheckboxGroupExtendStyle>

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

export const Checkbox = styled(CheckboxBase).attrs((props) => ({}))`

`
//#endregion
