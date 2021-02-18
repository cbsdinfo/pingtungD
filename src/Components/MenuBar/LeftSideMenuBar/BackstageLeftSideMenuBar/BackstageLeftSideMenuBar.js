import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar } from '../../../';
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
export const BackstageLeftSideMenuBarBase = (props) => {

    return (
        <>
            {/* 展開的情況 */}
            {!props.collapse && (
                <BasicContainer
                    {...props.containerEvent}
                    className={`${props.className} container`}
                    baseDefaultTheme={"BasicContainerDefaultTheme"}
                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("BasicContainerDefaultTheme"), "container") }}
                >
                    {/* Logo區 */}
                    <BasicContainer
                        {...props.logoAreaEvent}
                        className={`logoArea`}
                        baseDefaultTheme={"BasicContainerDefaultTheme"}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("BasicContainerDefaultTheme"), "logoArea") }}
                    >
                        {/* Logo圖與文字 */}
                        {props.logo}
                        {props.logoText}
                    </BasicContainer>
                    {/* Menu切換Page區 */}
                    <ScrollBar
                        basedefaulttheme={"DefaultTheme"}
                        className={`menuAreaScrollBar`}
                        autoHide={true}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("DefaultTheme"), "menuAreaScrollBar") }}
                    >
                        <BasicContainer
                            {...props.logoAreaEvent}
                            className={`menuArea`}
                            baseDefaultTheme={"BasicContainerDefaultTheme"}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("DefaultTheme"), "menuArea") }}
                        >
                            {/* 在這裡遍歷MenuItem */}
                            {props.menuItem}
                        </BasicContainer>
                    </ScrollBar>
                </BasicContainer>)
            }
            {/* 收合的情況 */}
            {props.collapse && (
                <BasicContainer
                    {...props.containerEvent}
                    className={`${props.className} collapseContainer`}
                    baseDefaultTheme={"BasicContainerDefaultTheme"}
                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("BasicContainerDefaultTheme"), "collapseContainer") }}
                >
                    {/* Logo區 */}
                    <BasicContainer
                        {...props.logoAreaEvent}
                        className={`collapseLogoArea`}
                        baseDefaultTheme={"BasicContainerDefaultTheme"}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("BasicContainerDefaultTheme"), "collapseLogoArea") }}
                    >
                        {/* Logo圖 */}
                        {props.logo}
                    </BasicContainer>
                    {/* Menu切換Page區 */}
                    <ScrollBar
                        basedefaulttheme={"DefaultTheme"}
                        className={`collapseMenuAreaScrollBar`}
                        autoHide={true}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("BasicContainerDefaultTheme"), "collapseMenuAreaScrollBar") }}
                    >
                        <BasicContainer
                            {...props.logoAreaEvent}
                            className={`collapseMenuArea`}
                            baseDefaultTheme={"BasicContainerDefaultTheme"}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("BasicContainerDefaultTheme"), "collapseMenuArea") }}
                        >
                            {/* 在這裡遍歷MenuItem */}
                            {props.menuItem}
                        </BasicContainer>
                    </ScrollBar>
                </BasicContainer>)
            }
        </>
    )
}

export const BackstageLeftSideMenuBar = styled(BackstageLeftSideMenuBarBase).attrs((props) => ({}))`

`
//#endregion