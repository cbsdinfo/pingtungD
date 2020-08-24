import React from 'react';
import DefaultTheme from './Theme/DefaultTheme';
import Default1Theme from './Theme/Default1Theme';
import { themeBeUsed } from '../../Handlers/ThemeHandler';

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        case "Default1Theme":
            return Default1Theme;
        default:
            return DefaultTheme;
    }
}
//#endregion


export const Example = (props) => {
    //console.log(props.onClick)

    return (
        <>
            <div style={themeBeUsed(props.baseDefaultTheme, switchDefaultTheme, props.theme ?? switchDefaultTheme(props.baseDefaultTheme), "a")} onClick={props.onClick}>
                Example
            </div>
            <div style={themeBeUsed(props.baseDefaultTheme, switchDefaultTheme, props.theme ?? switchDefaultTheme(props.baseDefaultTheme), "b")}>
                Example
            </div>
        </>
    )
}