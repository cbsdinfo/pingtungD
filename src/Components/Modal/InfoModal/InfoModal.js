import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as CheckCircle } from './Asset/img/CheckCircle.svg'
import { ReactComponent as ExclamationCircle } from './Asset/img/ExclamationCircle.svg'
import { ReactComponent as CloseCircle } from './Asset/img/CloseCircle.svg'
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



const InfoModalBase = (props) => {
    // props.fromModals 自Modals傳入
    //const { Theme } = useContext(Context);

    //#region 依新增的 InfoModals type返回不同 Icon
    const getIconByType = (type) => {
        switch (type) {
            case "normal":
                return (
                    null
                )
            case "warn":
                return (
                    <ExclamationCircle style={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "warnIcon")["basic"] }} />
                )
            case "error":
                return (
                    <CloseCircle style={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "errorIcon")["basic"] }} />
                )
            case "success":
                return (
                    <CheckCircle style={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "successIcon")["basic"] }} />
                )
            default:
                return null;
        }
    }
    //#endregion

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
                                {/* 內容容器 */}
                                <BasicContainer
                                    {...props.titleEvent}
                                    className={`${props.className} contentContainer`}
                                    baseDefaultTheme={"DefaultTheme"}
                                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "contentContainer") }}
                                >
                                    {/* icon右方文字 */}
                                    <Text
                                        {...props.titleEvent}
                                        className={`${props.className} iconRightText`}
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "iconRightText") }}
                                    >
                                        {(!props.noIcon) && getIconByType(props.type)}
                                        {props.iconRightText}
                                    </Text>

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
                                                        props.noOnClick && props.noOnClick(e);
                                                        props.noButtonEvent?.onClick && props.noButtonEvent.onClick(e);
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
                                                        props?.yesOnClick && props.yesOnClick(e);
                                                        props.yesButtonEvent?.onClick && props.yesButtonEvent.onClick(e);
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.fromModals?.containerEvent?.onClick && props.fromModals.containerEvent.onClick(e);
                                }}
                            >
                                {/* 內容容器 */}
                                <BasicContainer
                                    {...props.fromModals?.titleEvent}
                                    className={`${props.className} contentContainer`}
                                    baseDefaultTheme={"DefaultTheme"}
                                    theme={{ ...iterateTheme(props.fromModals, props.fromModals?.theme, switchDefaultTheme(props.fromModals?.baseDefaultTheme), "contentContainer") }}
                                >
                                    {/* icon右方文字 */}
                                    <Text
                                        {...props.fromModals?.titleEvent}
                                        className={`${props.className} iconRightText`}
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={{ ...iterateTheme(props.fromModals, props.fromModals?.theme, switchDefaultTheme(props.fromModals?.baseDefaultTheme), "iconRightText") }}
                                    >
                                        {(!props.fromModals?.noIcon) && getIconByType(props.fromModals?.type)}
                                        {props.fromModals?.iconRightText}
                                    </Text>

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

export const InfoModal = styled(InfoModalBase).attrs((props) => ({}))`

`


