import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Container } from '../../..';
import { iterateTheme } from '../../../../Handlers/ThemeHandler';
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
// import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "BasicButtonSecondaryTheme":
        //     return BasicButtonSecondaryTheme;
        // case "BasicButtonDisableTheme":
        //     return BasicButtonDisableTheme;
        // case "BasicButtonPrimaryTheme":
        //     return BasicButtonPrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region 基礎按鈕
export const RightSideDrawerBase = (props) => {

    return (
        <>
            <Container
                {...props.containerEvent}
                className={`${props.className} container`}
                baseDefaultTheme={"ContainerDefaultTheme"}
                collapse={props.collapse} // 轉發 props
                // theme={switchDefaultTheme(props.baseDefaultTheme)["container"]} //死吃 預設樣式
                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container") }} //吃theme
            >
            </Container>
            <BasicContainer
                {...props.contentEvent}
                className={`${props.className} content`}
                baseDefaultTheme={"BasicContainerDefaultTheme"}
                collapse={props.collapse} // 轉發 props
                // theme={switchDefaultTheme(props.baseDefaultTheme)["content"]} //死吃 預設樣式
                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "content") }} //吃theme
            >
                {props.children}
            </BasicContainer>
        </>
    )
}

export const RightSideDrawer = styled(RightSideDrawerBase).attrs((props) => ({}))`

`
//#endregion