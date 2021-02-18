import React from 'react';
import { Container, Text, SubContainer, FormContainer, FormRow, BasicContainer } from '../../Components';
import { iterateTheme } from '../../Handlers/ThemeHandler';
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
        // case "SuccessTheme":
        //     return SuccessTheme;
        // case "BasicButtonDisableTheme":
        //     return BasicButtonDisableTheme;
        // case "PrimaryTheme":
        //     return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

export const MainPageTitleBar = (props) => {

    return (
        <>
            {/* 最外層容器 */}
            <Container
                {...props.containerEvent}
                className={`container`}
                baseDefaultTheme={"DefaultTheme"}
                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container") }}
            >
                {/* 標題文字容器 */}
                <SubContainer
                    {...props.titleContainerEvent}
                    className={`titleContainer`}
                    baseDefaultTheme={"DefaultTheme"}
                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "titleContainer") }}
                >
                    {/* 標題文字 */}
                    <Text
                        {...props.titleTextEvent}
                        className={`titleText`}
                        baseDefaultTheme={"DefaultTheme"}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "titleText") }}
                    >
                        {/* 標題圖標 */}
                        <BasicContainer
                            {...props.titleTextIconEvent}
                            className={`titleTextIcon`}
                            baseDefaultTheme={"DefaultTheme"}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "titleTextIcon") }}
                        />

                        {props.titleText ?? "標題文字"}

                        {/* 標題圖標2 */}
                        <BasicContainer
                            {...props.titleTextIcon2Event}
                            className={`titleTextIcon2`}
                            baseDefaultTheme={"DefaultTheme"}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "titleTextIcon2") }}
                        />

                    </Text>
                </SubContainer>

                {/* 標題中央內容容器 */}
                <SubContainer
                    {...props.centerContainerEvent}
                    className={`centerContainer`}
                    baseDefaultTheme={"DefaultTheme"}
                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "centerContainer") }}
                >
                    {props.centerContent}
                </SubContainer>

                {/* 右側內容容器 */}
                <SubContainer
                    {...props.rightContainerEvent}
                    className={`rightContainer`}
                    baseDefaultTheme={"DefaultTheme"}
                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "rightContainer") }}
                >
                    {/* 右側內容表單容器 */}
                    <FormContainer
                        {...props.formContainerEvent}
                        className={`formContainer`}
                        baseDefaultTheme={"DefaultTheme"}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "formContainer") }}
                        onSubmit={props?.onSubmit && ((e) => { props.onSubmit(e) })}
                    >
                        {/* 右側內容表單列 */}
                        <FormRow
                            {...props.formRowEvent}
                            className={`formRow`}
                            baseDefaultTheme={"DefaultTheme"}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "formRow") }}
                        >
                            {props.children}
                        </FormRow>
                    </FormContainer>

                </SubContainer>
            </Container>

        </>
    )
}