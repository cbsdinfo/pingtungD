import React from 'react';
import styled from 'styled-components';
import { BasicContainer } from '../../Containers/BasicContainer';
import { iterateTheme } from '../../../Handlers/ThemeHandler';
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { ScrollBar } from '../../ScrollBar/ScrollBar';
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

//#region 表單最外層包覆，支持Enter 提交
export const FormContainerBase = (props) => {

    return (
        <BasicContainer
            //如果要調整整個滾動區高度或寬度請針對 container 調整 width、height
            {...props.containerEvent}
            baseDefaultTheme={"DefaultTheme"}
            className={`${props.className} container`}
            theme={iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container")}
        >
            <ScrollBar
                basedefaulttheme={"DefaultTheme"}
                className={`containerScrollBar`}
                //autoHide={true}
                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("DefaultTheme"), "containerScrollBar") }}
            >
                <BasicContainer
                    {...props.contentContainerEvent}
                    baseDefaultTheme={"DefaultTheme"}
                    className={`${props.className} contentContainer`}
                    theme={iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "contentContainer")}
                >
                    <form onSubmit={(e) => { e.preventDefault(); (props?.onSubmit && (props.submit ?? true)) && props.onSubmit(e); }}>
                        {props.children}
                        {(props.submit ?? true) && <button style={{ display: "none" }} />}
                    </form>
                </BasicContainer>
            </ScrollBar>
        </BasicContainer>
    )
}

export const FormContainer = styled(FormContainerBase).attrs((props) => ({}))`

`
//#endregion