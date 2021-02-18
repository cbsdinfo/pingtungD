import React from 'react';
import styled from 'styled-components';
import { BaseLevelTheme } from '../../../Handlers/ThemeHandler';
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
// import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "SecondaryTheme":
        //     return SecondaryTheme;
        // case "DisableTheme":
        //     return DisableTheme;
        // case "PrimaryTheme":
        //     return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region 原生 Input

export const NativeTextarea = styled.textarea.attrs((props) => ({ ...(props.disable && { disabled: true }) }))`

${props => BaseLevelTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme))}

`
//#endregion