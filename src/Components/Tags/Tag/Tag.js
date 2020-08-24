import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Container } from '../../';
import { iterateTheme } from '../../../Handlers/ThemeHandler';
import CloseIcon from '@material-ui/icons/Close';
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
import SuccessTheme from './Theme/SuccessTheme'
import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        case "SecondaryTheme":
            return SecondaryTheme;
        case "SuccessTheme":
            return SuccessTheme;
        // case "BasicButtonDisableTheme":
        //     return BasicButtonDisableTheme;
        case "PrimaryTheme":
            return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region 基礎按鈕
export const TagBase = React.forwardRef((props,ref) => {

    return (
        <>
            <BasicContainer
            ref={ref}
                {...props.containerEvent}
                className={`${props.className} container`}
                baseDefaultTheme={"BasicContainerDefaultTheme"}
                // theme={switchDefaultTheme(props.baseDefaultTheme)["container"]} //死吃 預設樣式
                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container") }} //吃theme
            >
                {props.text}
                {props.onClose && (
                    <CloseIcon
                        onClick={(e) => { e.stopPropagation(); props.onClose() }}
                        className={`${props.className} closeIcon`}
                        style={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "closeIcon").basic }}
                    />
                )
                }

            </BasicContainer >
        </>
    )
})

export const Tag = styled(TagBase).attrs((props) => ({}))`

`
//#endregion