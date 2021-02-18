import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SubContainer } from '../../Containers/SubContainer';
import { iterateTheme } from '../../../Handlers/ThemeHandler';
import { isNil } from 'lodash/lang'
import { useLocation } from 'react-router-dom';
import { ReactComponent as Eye } from './Assets/img/Eye.svg'
import { ReactComponent as EyeInvisible } from './Assets/img/EyeInvisible.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
// import PrimaryTheme from './Theme/PrimaryTheme'
import DisableTheme from './Theme/DisableTheme'
import { BasicContainer } from '../../Containers/BasicContainer';
import { Text } from '../../Texts/Text/Text';
import { NativeTextarea } from '../NativeTextarea/NativeTextarea';
import { NativeSpan } from '../NativeSpan/NativeSpan';
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
export const TextareaBase = (props) => {

    const [Value, setValue] = useState("");
    const [OnInitial, setOnInitial] = useState(true); // 用於 onChange 中 初始渲染與 後續選染動作不同時
    const [Focus, setFocus] = useState(false);
    const [Hover, setHover] = useState(false);
    const [Rect, setRect] = useState(null);

    const ref = useRef(null);

    useEffect(() => {
        setValue(props.value);
        if (!isNil(props.value)) {
            props.onChange && props.onChange(null, props.value, OnInitial);
            setOnInitial(false);
        }
    }, [props.value, props.onChange])

    useEffect(() => {
        setRect(ref?.current?.clientHeight)
    })

    //#region viewType 展示模式下斷行底線
    const breakLineBottom = (props, fatherHeight) => {
        let lineCount = parseInt((fatherHeight ?? 0) / (props.textareaLineHeight ?? 32));
        let lineCountArray = Array((lineCount === 0 ? 1 : lineCount)).fill(0)

        // console.log(fatherRef?.current?.getBoundingClientRect())
        // let str = "中文;；ａ"
        // alert(str.match(/[\u0000-\u00ff]/g))     //半形   
        // alert(str.match(/[\u4e00-\u9fa5]/g))     //中文   
        // alert(str.match(/[\uff00-\uffff]/g))     //全形    

        return (
            lineCountArray.map((item, index) => {
                return (
                    // 展示模式下斷行底線
                    <BasicContainer
                        key={index}
                        {...props.viewTypeTextareaBottomEvent}
                        baseDefaultTheme={"DefaultTheme"}
                        className={`viewTypeTextareaBottom`}
                        theme={{ ...iterateTheme({ ...props, index, textareaLineHeight: (props.textareaLineHeight ?? 32), focus: props.focus, hover: props.hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeTextareaBottom") }}
                    />
                )
            })
        )
    }
    //#endregion

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
                            {...props.viewTypeTextareaContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeTextareaContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeTextareaContainer") }}
                        >
                            {/* 當前展示文字 */}
                            <Text
                                ref={ref}
                                {...props.viewTypeTextareaEvent}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} viewTypeTextarea`}
                                theme={{ ...iterateTheme({ ...props, textareaLineHeight: props.textareaLineHeight }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeTextarea") }}
                            >
                                {Value ?? ""}
                            </Text>

                            {/* 展示模式下斷行底線 */}
                            {breakLineBottom(props, Rect)}

                            {/* <NativeSpan
                                {...props.viewTypeTextareaEvent}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} viewTypeTextarea`}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeTextarea") }}
                            >
                                {Value ?? ""}
                            </NativeSpan> */}
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
                            {...props.textareaContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} textareaContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "textareaContainer") }}
                        >
                            <NativeTextarea
                                {...props.textareaEvent}
                                autoComplete={props.autoComplete ?? "off"}
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
                                className={`${props.className} textarea`}
                                theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "textarea") }}
                            />
                            {props.leftIcon}
                            {props.children}
                            {props.rightIcon}
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

export const Textarea = styled(TextareaBase).attrs((props) => ({}))`

`
//#endregion