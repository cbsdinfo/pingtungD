import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Container, Text, SubContainer } from '../../Components/';
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
export const CarOrderBase = (props) => {

    return (
        <>
            {/* 最外層容器 */}
            <SubContainer
                {...props.containerEvent}
                className={`${props.className} container`}
                baseDefaultTheme={"DefaultTheme"}
                theme={{
                    ...iterateTheme({ ...props, mainColor: props.mainColor }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container")
                }} //吃theme
            >
                {/* 標題列容器 */}
                <Text
                    {...props.titleEvent}
                    className={`titleEvent`}
                    baseDefaultTheme={"DefaultTheme"}
                    theme={{
                        ...iterateTheme({ ...props, mainColor: props.mainColor }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "title")
                    }} //吃theme
                >
                    {props.title ?? "預約訂單"}
                </Text>

                {/* 內容容器 */}
                <BasicContainer
                    {...props.contentEvent}
                    className={`contentEvent`}
                    baseDefaultTheme={"DefaultTheme"}
                    theme={{
                        ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "content")
                    }} //吃theme
                >
                    {props.children}
                </BasicContainer>

            </SubContainer >
        </>
    )
}

export const CarOrder = styled(CarOrderBase).attrs((props) => ({}))`
`
//#endregion