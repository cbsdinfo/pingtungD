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
        case "BasicButtonSecondaryTheme":
            return BasicButtonSecondaryTheme;
        case "BasicButtonDisableTheme":
            return BasicButtonDisableTheme;
        case "BasicButtonPrimaryTheme":
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
            baseDefaultTheme={"BasicContainerDefaultTheme"}
            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container"), ...(props.disable && BasicButtonDisableTheme.container) }}
        >
            {props.icon}
            <Text
                baseDefaultTheme={"TextDefaultTheme"}
                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "text"), ...(props.disable && BasicButtonDisableTheme.text) }}
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