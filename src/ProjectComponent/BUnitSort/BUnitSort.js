import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { isNil } from 'lodash/lang'
import { useLocation } from 'react-router-dom';
import { ReactComponent as Eye } from './Assets/img/Eye.svg'
import { ReactComponent as EyeInvisible } from './Assets/img/EyeInvisible.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
// import PrimaryTheme from './Theme/PrimaryTheme'
import DisableTheme from './Theme/DisableTheme'
import { Container, BasicContainer, Text, SubContainer, NativeLineButton } from '../../Components';
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
export const BUnitSortBase = (props) => {

    const [Value, setValue] = useState([]);
    const [OnInitial, setOnInitial] = useState(true); // 用於 onChange 中 初始渲染與 後續選染動作不同時
    const [Focus, setFocus] = useState(false);
    const [Hover, setHover] = useState(false);

    useEffect(() => {
        setValue(props.value);
        if (!isNil(props.value)) {
            props.onChange && props.onChange(null, props.value, OnInitial);
            setOnInitial(false);
        }
    }, [props.value, props.onChange])


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
                            {...props.viewTypeBUnitSortContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeBUnitSortContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeBUnitSortContainer") }}
                        >
                            {/* 當前展示文字 */}
                            <Text
                                {...props.viewTypeBUnitSortEvent}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} viewTypeBUnitSort`}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeBUnitSort") }}
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

                            {/* 重新排序按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={{
                                    basic: (style) => ({
                                        ...style,
                                        width: "88px",
                                        height: "24px",
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        lineHeight: "22px",
                                        padding: 0,
                                        color: "#fff",
                                        backgroundColor: "#ff7a45",
                                        borderColor: "#ff7a45",
                                        borderRadius: "2px",
                                        margin: "0 0 0 16px"
                                    }),
                                    hover: (style, props) => ({
                                        ...style,
                                        backgroundColor: "rgba(255, 122, 69, 0.85)"
                                    }),
                                    focus: (style, props) => ({})
                                }}
                                onClick={(e) => { setValue([]); props.onChange && props.onChange(e, [], OnInitial); }}
                            >
                                重新排序
                            </NativeLineButton>
                        </Text>
                        {/* 輸入框本體 */}
                        <BasicContainer
                            {...props.textInputContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} textInputContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "textInputContainer") }}
                        >
                            {/* 優先搭乘車行排序容器 */}
                            <Container
                                theme={{
                                    basic: (style, props) => ({
                                        ...style,
                                        width: "100%",
                                        justifyContent: "space-between"
                                    })
                                }}
                            >
                                {(props.bUnit ?? []).map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {/* 優先搭乘車行排序項目容器 */}
                                            <SubContainer
                                                theme={{
                                                    basic: (style, props) => ({
                                                        ...style,
                                                        maxWidth: "calc( 50% - 4px )",
                                                        flexBasis: "calc( 50% - 4px )",
                                                        margin: "0 0 4px 0",
                                                        height: "60px",
                                                        border: "1px solid #8C8C8C",
                                                        borderRadius: "2px",
                                                        background: "#fff",
                                                        cursor: "pointer"
                                                    })
                                                }}
                                                onClick={(e) => {
                                                    let thisTimeRes;
                                                    let res = Value ?? [];
                                                    if (res.map((v) => (v.id)).indexOf(item.id) === -1) {
                                                        //目前選擇的項目不在已選陣列內
                                                        if (res.length > 2) {
                                                            // 若已經選了三個，則把第一個去掉，並補上於最後
                                                            res = res.slice(1);
                                                            res.push(item);
                                                        }
                                                        else {
                                                            res.push(item);
                                                        }
                                                        thisTimeRes = res;
                                                    }
                                                    else {
                                                        res = res.filter(r => r.id !== item.id)
                                                        thisTimeRes = res;
                                                    }
                                                    setValue([...thisTimeRes])
                                                    // console.log(thisTimeRes)

                                                    props.onChange && props.onChange(e, thisTimeRes, OnInitial);
                                                }}
                                            >

                                                {/* 優先搭乘車行排序項目文字 */}
                                                <Text
                                                    theme={{
                                                        basic: (style, props) => ({
                                                            ...style,
                                                            height: "100%",
                                                            width: "100%",
                                                            fontSize: "14px",
                                                            padding: "8px 24px",
                                                            lineHeight: "22px",
                                                            color: "rgba(0,0,0,0.65)",
                                                            cursor: "pointer"
                                                        })
                                                    }}
                                                >
                                                    {item.name}
                                                </Text>

                                                {/* 優先搭乘車行排序項目選中遮罩 */}

                                                {
                                                    ((Value ?? []).map((v) => (v.id)).indexOf(item.id) >= 0)
                                                    &&
                                                    <Text
                                                        theme={{
                                                            basic: (style, props) => ({
                                                                ...style,
                                                                height: "100%",
                                                                width: "100%",
                                                                position: "absolute",
                                                                top: "0px",
                                                                background: "rgba(0, 0, 0, 0.65)",
                                                                borderRadius: "2px",
                                                                // fontSize: "38px",
                                                                // lineHeight: "60px",
                                                                fontSize: "14px",
                                                                padding: "8px 24px",
                                                                lineHeight: "22px",
                                                                color: "#fff",
                                                                // textAlign: "center",
                                                                cursor: "pointer"
                                                            })
                                                        }}
                                                    >
                                                        {item.name}

                                                        {/* 優先搭乘車行排序項目選中遮罩順序 */}
                                                        <Text
                                                            theme={{
                                                                basic: (style, props) => ({
                                                                    ...style,
                                                                    position: "absolute",
                                                                    top: "8px",
                                                                    left: "-4px",
                                                                    width: "24px",
                                                                    height: "24px",
                                                                    backgroundColor: "#FAAD14",
                                                                    color: "#fff",
                                                                    fontWeight: 600,
                                                                    fontSize: "14px",
                                                                    lineHeight: "24px",
                                                                    textAlign: "center"
                                                                })
                                                            }}
                                                        >
                                                            {(Value ?? []).map((v) => (v.id)).indexOf(item.id) + 1}
                                                        </Text>
                                                    </Text>
                                                }
                                            </SubContainer>
                                        </React.Fragment>
                                    )
                                })}
                            </Container>
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

export const BUnitSort = styled(BUnitSortBase).attrs((props) => ({}))`

`
//#endregion