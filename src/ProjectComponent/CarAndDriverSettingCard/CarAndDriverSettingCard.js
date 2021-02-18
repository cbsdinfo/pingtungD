import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Container, Text, TextInput, globalContextService, SubContainer, BasicButton } from '../../Components/';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as Delete } from './Assets/img/Delete.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { MainPageTitleBar } from '../MainPageTitleBar/MainPageTitleBar';
import { MainPageSubTitleBar } from '../MainPageSubTitleBar/MainPageSubTitleBar';
// import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
// import SuccessTheme from './Theme/SuccessTheme'
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

//#region 基礎按鈕
export const CarAndDriverSettingCardBase = (props) => {

    return (
        <>
            {/* 最外層容器 */}
            <BasicContainer
                {...props.containerEvent}
                className={`${props.className} container`}
                baseDefaultTheme={"DefaultTheme"}
                theme={{
                    ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container")
                }} //吃theme
            >
                {/* 標題列 */}
                <MainPageSubTitleBar
                    bascDefaultTheme={"DefaultTheme"}
                    titleText={props.titleText}
                    theme={{
                        ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "titleBar")
                    }}
                >
                </MainPageSubTitleBar>

                {/* 新增輸入框、新增按鈕容器 */}
                <Container>
                    {/* 新增輸入框  */}
                    <TextInput
                        bascDefaultTheme={"DefaultTheme"}
                        theme={{
                            ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "addInput")
                        }}
                        type="text"
                        placeholder={""}
                        value={globalContextService.get(props.pageName, props.addInputKeyName) ?? ""}
                        onChange={(e, value, onInitial) => {
                            globalContextService.set(props.pageName, props.addInputKeyName, value);
                        }}
                    />

                    {/* 新增按鈕容器 */}
                    <SubContainer baseDefaultTheme={"DefaultTheme"}
                        theme={switchDefaultTheme(props.baseDefaultTheme).addButtonContainer}
                    >
                        {/* 新增按鈕 */}
                        <BasicButton
                            baseDefaultTheme={"PrimaryTheme"}
                            text={"新增"}
                            theme={switchDefaultTheme(props.baseDefaultTheme).addButton}
                            onClick={() => {
                                props?.addbuttonOnclick && props.addbuttonOnclick();
                            }}
                        />
                    </SubContainer>
                </Container>

                {/* 列表滾動區 */}
                <BasicContainer
                    //如果要調整整個滾動區高度或寬度請針對 container 調整 width、height
                    {...props.containerEvent}
                    baseDefaultTheme={"DefaultTheme"}
                    className={`${props.className} listContainer`}
                    theme={iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "listContainer")}
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
                            {(props.listData ?? []).map((item, index) => {

                                return (
                                    // 列表容器
                                    <BasicContainer
                                        key={index}
                                        basedefaulttheme={"DefaultTheme"}
                                        className={`${props.className} listItemContainer`}
                                        theme={iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "listItemContainer")}
                                    >
                                        {/* 文字 */}
                                        <Text
                                            basedefaulttheme={"DefaultTheme"}
                                            className={`${props.className} listItemText`}
                                            theme={iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "listItemText")}
                                        >
                                            {item?.[`${props.listNameIndex}`]}
                                        </Text>

                                        <Text
                                            basedefaulttheme={"DefaultTheme"}
                                            className={`${props.className} listItemDelText`}
                                            theme={iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "listItemDelText")}
                                            onClick={() => {
                                                item?.[`${props.listDelIndex}`] && item[`${props.listDelIndex}`]();
                                            }}
                                        >
                                            刪除
                                            <Delete style={{ position: "relative", top: "5px" }} />
                                        </Text>
                                    </BasicContainer>
                                )
                            })}
                        </BasicContainer>
                    </ScrollBar>
                </BasicContainer>
            </BasicContainer >
        </>
    )
}

export const CarAndDriverSettingCard = styled(CarAndDriverSettingCardBase).attrs((props) => ({}))`
`
//#endregion