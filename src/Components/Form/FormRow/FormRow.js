import React from 'react';
import styled from 'styled-components';
import { Container } from '../../Containers/Container';
import { iterateTheme } from '../../../Handlers/ThemeHandler';
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

//#region 表單內的列容器
export const FormRowBase = (props) => {

    return (
        <Container
            {...props}
            baseDefaultTheme={"DefaultTheme"}
            className={`${props.className} container`}
            theme={iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container")}
        >
            {props.children}
        </Container >
    )
}

export const FormRow = styled(FormRowBase).attrs((props) => ({}))`

`
//#endregion