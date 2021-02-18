import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SubContainer } from '../../Containers/SubContainer';
import { BasicContainer } from '../../Containers/BasicContainer';
import { Text } from '../../Texts/Text/Text';
import Select, { components } from 'react-select'
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import { iterateTheme } from '../../../Handlers/ThemeHandler';
import { isNil } from 'lodash/lang'
import { useLocation } from 'react-router-dom';
import { ReactComponent as Eye } from './Assets/img/Eye.svg'
import { ReactComponent as EyeInvisible } from './Assets/img/EyeInvisible.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
// import PrimaryTheme from './Theme/PrimaryTheme'
import DisableTheme from './Theme/DisableTheme'
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

//#region 繼承 react-select 的 Select 待替換
const SelectExtend = styled(Select).attrs((props) => ({}))`
&& {
    [class*="menu"] {
        div:nth-child(1) {
            //滾動條美化
            ::-webkit-scrollbar {
                width: 0.5em;
                height: ${props => props?.theme?.scrollHeight ?? 'initial'}; //scroll-x 的高度
            }
            ::-webkit-scrollbar-track {
                -webkit-border-radius: 10px;
                border-radius: 10px;
                margin:0px 0.1rem 5px 0;
            }
            ::-webkit-scrollbar-thumb {
                -webkit-border-radius: 4px;
                border-radius: 4px;
                background: ${props => props?.theme?.scrollUnhoverBackgroundColor ?? 'rgba(0, 0, 0, 0.25)'};
            }
            &:hover::-webkit-scrollbar-thumb {
                -webkit-border-radius: 4px;
                border-radius: 4px;
                background: ${props => props?.theme?.scrollHoverBackgroundColor ?? 'rgba(0, 0, 0, 0.25)'};
            }
        }
    }
}
`
//#endregion

//#region 表單內的下拉選單
export const SelectorBase = (props) => {

    const [Value, setValue] = useState(null);
    const [OnInitial, setOnInitial] = useState(true); // 用於 onChange 中 初始渲染與 後續選染動作不同時
    const [Focus, setFocus] = useState(false); // 本組件不使用
    const [Hover, setHover] = useState(false); // 本組件不使用
    const scrollBarRef = useRef(null);
    const selectRef = useRef(null);

    useEffect(() => {
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
                            {...props.viewTypeSelectorContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeSelectorContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeSelectorContainer") }}
                        >
                            {/* 當前展示文字 */}
                            <Text
                                {...props.viewTypeSelectorEvent}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} viewTypeSelector`}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeSelector") }}
                            >
                                {
                                    (Value instanceof Array) ?
                                        Value?.[0]?.label
                                        :
                                        Value?.label
                                }
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
                            className={`topLabel`}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "topLabel") }}
                        >
                            {props.topLabel}
                        </Text>
                        {/* 輸入框本體 */}
                        <BasicContainer
                            {...props.selectorContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`selectorContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "selectorContainer") }}
                        >
                            {/* selector 組件 */}
                            <SelectExtend
                                ref={selectRef}
                                className={`selector`}
                                isSearchable={props?.isSearchable ?? false}
                                isClearable={props?.isClearable ?? false}
                                isMulti={props?.isMulti ?? false}
                                hideSelectedOptions={props?.hideSelectedOptions ?? (props?.isMulti ? true : false)}
                                defaultValue={props?.defaultValue}
                                options={props?.options}
                                value={Value ?? ""}
                                isDisabled={props.disabled ?? false}
                                maxMenuHeight={props?.maxMenuHeight ?? "200px"}
                                //onChange={(e, t) => { console.log(e, t) }}
                                onChange={(values, action) => {
                                    // console.log(values);
                                    // console.log(action);
                                    setValue(values ?? []);
                                    (props?.isMulti ?
                                        props?.onChange && props.onChange(null, values ?? [], OnInitial)
                                        :
                                        props?.onChange && props.onChange(null, values, OnInitial))
                                }}
                                menuPosition={props.menuPosition ?? "fixed"} // 有跑版，請傳任意值修正選單位置
                                noOptionsMessage={() => (props?.noOptionsMessage ?? "無符合資料")}
                                placeholder={props?.placeholder ?? "請選擇..."}
                                styles={{
                                    ...switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme)?.selector({ ...props, ref: selectRef })
                                }}
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

export const Selector = styled(SelectorBase).attrs((props) => ({}))`

`
//#endregion