import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as Close } from './Asset/img/Close.svg'
import { BasicContainer, Container, Text, BasicButton } from '../..';
import { iterateTheme } from '../../../Handlers/ThemeHandler';
import { isFunction, isNil } from 'lodash/lang'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
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



const TitleModalBase = (props) => {
    // props.fromModals 自Modals傳入
    //const { Theme } = useContext(Context);

    //#region 控制Modal的開啟、關閉
    const [IsClose, setIsClose] = useState(true);
    useEffect(() => {
        // 剛開啟  true ---> false
        // 剛關閉  false ---> true
        let timeOut;
        if (isNil(props.fromModals)) {
            // 直接使用
        } else {
            // 自Modals使用
            if (props.fromModals.fade) {
                timeOut = setTimeout(() => { setIsClose(true) }, 0);
            } else {
                timeOut = setTimeout(() => { setIsClose(false) }, 0);
            }
        }

        return () => {
            clearTimeout(timeOut);
        }

    }, [props.fromModals?.fade])
    //#endregion

    return (
        <>
            {/* 直接使用 */}
            {
                isNil(props.fromModals) &&
                (
                    <>
                        {/* 最外層容器 */}
                        <Container
                            {...props.outContainerEvent}
                            className={`${props.className} outContainer`}
                            baseDefaultTheme={"DefaultTheme"}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "outContainer") }}
                        >
                            {/* 對話框容器 */}
                            <BasicContainer
                                {...props.containerEvent}
                                className={`${props.className} container`}
                                baseDefaultTheme={"DefaultTheme"}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container") }}
                            >
                                {/* 標題 */}
                                {props.title &&
                                    <Text
                                        {...props.titleEvent}
                                        className={`${props.className} title`}
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "title") }}
                                    >
                                        {props.title}
                                        {/* 關閉按紐 */}
                                        {!props?.noCloseBtn
                                            &&
                                            <Close
                                                style={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "closeIcon")['basic'] }}
                                                {...props.closeIconEvent}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    props.closeIconOnClick && props.closeIconOnClick(e);
                                                    props.closeIconEvent?.onClick && props.closeIconEvent.onClick(e);
                                                }}
                                            />
                                        }
                                    </Text>
                                }
                                {/* 內容容器 */}
                                <BasicContainer
                                    {...props.titleEvent}
                                    className={`${props.className} contentContainer`}
                                    baseDefaultTheme={"DefaultTheme"}
                                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "contentContainer") }}
                                >
                                    {props.content}
                                </BasicContainer>

                                {/* 下方確認、取消按扭容器 */}
                                {(props.yes || props.no) &&
                                    <BasicContainer
                                        {...props.titleEvent}
                                        className={`${props.className} yesOrNoContainer`}
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "yesOrNoContainer") }}
                                    >
                                        {/* 取消按鈕 */}
                                        {props.no &&
                                            <>
                                                <BasicButton
                                                    {...props.noButtonEvent}
                                                    className={`${props.className} noButton`}
                                                    baseDefaultTheme={"PrimaryTheme"}
                                                    text={props.noText}
                                                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "noButton") }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        props.noOnClick && props.noOnClick(e);
                                                        props.noButtonEvent?.onClick && props.noButtonEvent.onClick(e);
                                                        // 最後移除該Modal
                                                        // props.removeModal(props.thisModal)
                                                    }}
                                                />
                                            </>
                                        }

                                        {/* 確認按鈕 */}
                                        {props.yes &&
                                            <>
                                                <BasicButton
                                                    {...props.yesButtonEvent}
                                                    className={`${props.className} yesButton`}
                                                    baseDefaultTheme={"PrimaryTheme"}
                                                    text={props.yesText}
                                                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "yesButton") }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        props.yesOnClick && props.yesOnClick(e);
                                                        props.yesButtonEvent?.onClick && props.yesButtonEvent.onClick(e);
                                                        // 最後移除該Modal
                                                        // props.removeModal(props.thisModal)
                                                    }}
                                                />
                                            </>
                                        }

                                        {/* 多的按鈕，不預設開放 */}
                                        {props.otherBtn &&
                                            <>
                                                <BasicButton
                                                    {...props.otherBtnButtonEvent}
                                                    className={`${props.className} otherBtnButton`}
                                                    baseDefaultTheme={"PrimaryTheme"}
                                                    text={props.otherBtnText}
                                                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "yesButton") }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        props.otherBtnOnClick && props.otherBtnOnClick(e);
                                                        props.otherBtnButtonEvent?.onClick && props.otherBtnButtonEvent.onClick(e);
                                                        // 最後移除該Modal
                                                        // props.removeModal(props.thisModal)
                                                    }}
                                                />
                                            </>
                                        }
                                    </BasicContainer>
                                }
                            </BasicContainer>

                            {/* 灰階背景 */}
                            <BasicContainer
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "background") }}
                                onClick={(e) => {
                                    props.containerEvent?.onClick && props.containerEvent.onClick(e);
                                    // backgroundClose 開啟背景關閉
                                    // props.backgroundClose && props.removeModal(props.thisModal)
                                }}
                            />
                        </Container>
                    </>
                )
            }


            {/* 自Modals使用 */}
            {
                !isNil(props.fromModals) &&
                (
                    <>
                        {/* 最外層容器 */}
                        <Container
                            {...props.fromModals?.outContainerEvent}
                            className={`${props.className} outContainer`}
                            baseDefaultTheme={"DefaultTheme"}
                            theme={{ ...iterateTheme(props.fromModals, props.fromModals?.theme, switchDefaultTheme(props.fromModals?.baseDefaultTheme), "outContainer") }}
                        >
                            {/* 對話框容器 */}
                            <BasicContainer
                                {...props.fromModals?.containerEvent}
                                className={`${props.className} container`}
                                baseDefaultTheme={"DefaultTheme"}
                                theme={{ ...iterateTheme({ ...props.fromModals, isClose: IsClose }, props.fromModals?.theme, switchDefaultTheme(props.fromModals?.baseDefaultTheme), "container") }}
                            >
                                {/* 標題 */}
                                {props.fromModals?.title &&
                                    <Text
                                        {...props.fromModals?.titleEvent}
                                        className={`${props.className} title`}
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={{ ...iterateTheme(props.fromModals, props.fromModals?.theme, switchDefaultTheme(props.fromModals?.baseDefaultTheme), "title") }}
                                    >
                                        {props.fromModals?.title}
                                        {/* 關閉按紐 */}
                                        {!props.fromModals?.noCloseBtn
                                            &&
                                            <Close
                                                style={{ ...iterateTheme(props.fromModals, props.fromModals?.theme, switchDefaultTheme(props.fromModals?.baseDefaultTheme), "closeIcon")['basic'] }}
                                                {...props.fromModals?.closeIconEvent}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    props.fromModals?.closeIconOnClick && props.fromModals.closeIconOnClick(e);
                                                    props.fromModals?.closeIconEvent?.onClick && props.fromModals.closeIconEvent.onClick(e);
                                                    // 最後移除該Modal
                                                    props.fromModals.removeModal(props.fromModals.thisModal)
                                                }}
                                            />
                                        }
                                    </Text>
                                }
                                {/* 內容容器 */}
                                <BasicContainer
                                    {...props.fromModals?.titleEvent}
                                    className={`${props.className} contentContainer`}
                                    baseDefaultTheme={"DefaultTheme"}
                                    theme={{ ...iterateTheme(props.fromModals, props.fromModals?.theme, switchDefaultTheme(props.fromModals?.baseDefaultTheme), "contentContainer") }}
                                >
                                    {isFunction(props.fromModals?.content) ? props.fromModals?.content() : props.fromModals?.content}
                                </BasicContainer>

                                {/* 下方確認、取消按扭容器 */}
                                {(props.fromModals?.yes || props.fromModals?.no) &&
                                    <BasicContainer
                                        {...props.fromModals?.titleEvent}
                                        className={`${props.className} yesOrNoContainer`}
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={{ ...iterateTheme(props.fromModals, props.fromModals?.theme, switchDefaultTheme(props.fromModals?.baseDefaultTheme), "yesOrNoContainer") }}
                                    >
                                        {/* 取消按鈕 */}
                                        {props.fromModals?.no &&
                                            <>
                                                <BasicButton
                                                    {...props.fromModals?.noButtonEvent}
                                                    className={`${props.className} noButton`}
                                                    baseDefaultTheme={"PrimaryTheme"}
                                                    text={props.fromModals.noText}
                                                    theme={{ ...iterateTheme(props.fromModals, props.fromModals?.theme, switchDefaultTheme(props.fromModals?.baseDefaultTheme), "noButton") }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        props.fromModals?.noOnClick && props.fromModals.noOnClick(e);
                                                        props.fromModals?.noButtonEvent?.onClick && props.fromModals.noButtonEvent.onClick(e);
                                                        // 最後移除該Modal
                                                        props.fromModals.removeModal(props.fromModals.thisModal)
                                                    }}
                                                />
                                            </>
                                        }

                                        {/* 確認按鈕 */}
                                        {props.fromModals?.yes &&
                                            <>
                                                <BasicButton
                                                    {...props.fromModals?.yesButtonEvent}
                                                    className={`${props.className} yesButton`}
                                                    baseDefaultTheme={"PrimaryTheme"}
                                                    text={props.fromModals.yesText}
                                                    theme={{ ...iterateTheme(props.fromModals, props.fromModals?.theme, switchDefaultTheme(props.fromModals?.baseDefaultTheme), "yesButton") }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        props.fromModals?.yesOnClick && props.fromModals.yesOnClick(e, () => { props.fromModals.removeModal(props.fromModals.thisModal) });
                                                        props.fromModals?.yesButtonEvent?.onClick && props.fromModals.yesButtonEvent.onClick(e, () => { props.fromModals.removeModal(props.fromModals.thisModal) });
                                                        // 最後移除該Modal
                                                        // props.fromModals.removeModal(props.fromModals.thisModal)
                                                    }}
                                                />
                                            </>
                                        }
                                    </BasicContainer>
                                }
                            </BasicContainer>

                            {/* 灰階背景 */}
                            <BasicContainer
                                theme={{ ...iterateTheme(props.fromModals, props.fromModals?.theme, switchDefaultTheme(props.fromModals?.baseDefaultTheme), "background") }}
                                onClick={(e) => {
                                    props.fromModals?.containerEvent?.onClick && props.fromModals.containerEvent.onClick(e);
                                    // backgroundClose 開啟背景關閉
                                    props.fromModals?.backgroundClose && props.fromModals.removeModal(props.fromModals.thisModal)
                                }}
                            />
                        </Container>
                    </>
                )
            }
        </>
    )
}

export const TitleModal = styled(TitleModalBase).attrs((props) => ({}))`

`


