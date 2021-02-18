import React from 'react';
import styled from 'styled-components';
import { BasicContainer } from '../../Containers/BasicContainer';
import { Text } from '../../Texts/Text/Text'
import { iterateTheme } from '../../../Handlers/ThemeHandler';
//#region 擴充基本樣式區
import BasicButtonDefaultTheme from './Theme/DefaultTheme'
import BasicButtonPrimaryTheme from './Theme/PrimaryTheme'
import BasicButtonDisableTheme from './Theme/DisableTheme'
import BasicButtonSecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        case "SecondaryTheme":
            return BasicButtonSecondaryTheme;
        case "DisableTheme":
            return BasicButtonDisableTheme;
        case "PrimaryTheme":
            return BasicButtonPrimaryTheme;
        default:
            return BasicButtonDefaultTheme;
    }
}
//#endregion

//#region 基礎按鈕
export const BasicButtonBase = (props) => {

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

export const BasicButton = styled(BasicButtonBase).attrs((props) => ({}))`

`
//#endregion