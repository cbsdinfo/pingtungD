import React from 'react';
import styled from 'styled-components';
import { BasicContainer } from '../../Containers/BasicContainer';
import { Text } from '../../Texts/Text/Text'
import { cssifyObject } from 'css-in-js-utils'
import { themeBeUsed, returnObjOrExecute, iterateTheme } from '../../../Handlers/ThemeHandler';
import { mediaQueryKey } from '../../../MediaQuery/MediaQuery'
//#region 擴充基本樣式區
import LineButtonDefaultTheme from './Theme/DefaultTheme'
import LineButtonPrimaryTheme from './Theme/PrimaryTheme'
import LineButtonDisableTheme from './Theme/DisableTheme'
import LineButtonSecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        case "SecondaryTheme":
            return LineButtonSecondaryTheme;
        case "DisableTheme":
            return LineButtonDisableTheme;
        case "PrimaryTheme":
            return LineButtonPrimaryTheme;
        default:
            return LineButtonDefaultTheme;
    }
}
//#endregion

//#region 邊框線按鈕
export const LineButtonBase = (props) => {

    return (
        <BasicContainer
            {...(!(props.disable) && props)}
            baseDefaultTheme={"DefaultTheme"}
            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "container") }}
        >
            {props.icon}
            <Text
                baseDefaultTheme={"DefaultTheme"}
                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "text") }}
            >
                {props?.text ?? "按鈕"}
            </Text>
            {props.children}
        </BasicContainer>
    )
}

export const LineButton = styled(LineButtonBase).attrs((props) => ({}))`

`
//#endregion