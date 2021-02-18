import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Container, Text } from '../../Components/';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as LeftArrow } from './Assets/img/LeftArrow.svg'
import { ReactComponent as RightArrow } from './Assets/img/RightArrow.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
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

//#region 基礎按鈕
export const InfoCardBase = (props) => {

    return (
        <>
            {/* 最外層容器 */}
            <BasicContainer
                {...props.containerEvent}
                className={`${props.className} container`}
                baseDefaultTheme={"DefaultTheme"}
                theme={{
                    ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container")
                }} //吃theme
            >
                {/* icon 容器 */}
                <BasicContainer
                    {...props.iconContainerEvent}
                    className={`iconContainer`}
                    baseDefaultTheme={"DefaultTheme"}
                    theme={{
                        ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "iconContainer")
                    }} //吃theme
                >
                    {props.icon}
                </BasicContainer>

                {/* 中間文字 */}
                <Text
                    {...props.centerTextEvent}
                    className={`centerText`}
                    baseDefaultTheme={"DefaultTheme"}
                    theme={{
                        ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "centerText")
                    }} //吃theme
                >
                    {props.centerText}
                </Text>

                {/* 下方文字 */}
                <Text
                    {...props.bottomTextEvent}
                    className={`bottomText`}
                    baseDefaultTheme={"DefaultTheme"}
                    theme={{
                        ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "bottomText")
                    }} //吃theme
                >
                    {props.bottomText}
                </Text>

            </BasicContainer >
        </>
    )
}

export const InfoCard = styled(InfoCardBase).attrs((props) => ({}))`
`
//#endregion