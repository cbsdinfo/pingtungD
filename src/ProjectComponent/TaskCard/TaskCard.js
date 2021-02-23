import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Container, Text } from '../../Components/';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as LeftArrow } from './Assets/img/LeftArrow.svg'
import { ReactComponent as RightArrow } from './Assets/img/RightArrow.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
// import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
// import SuccessTheme from './Theme/SuccessTheme'
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion
import moment from 'moment';
import { fmt } from '../../Handlers/DateHandler';

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
export const TaskCardBase = (props) => {

    const [NowUsePrimary, setNowUsePrimary] = useState(props?.defaultUsePrimaryKey ?? props?.data?.[0]?.[`${props?.primaryKey}`]);
    const [NowUsePrimaryData, setNowUsePrimaryData] = useState(
        props?.defaultUsePrimaryKey
            ?
            props?.data?.filter((it) => (it?.[`${props?.primaryKey}`] === props?.defaultUsePrimaryKey))?.[0]
            :
            props?.data?.[0]
    );

    useEffect(() => {
        setNowUsePrimary(props?.defaultUsePrimaryKey ?? props?.data?.[0]?.[`${props?.primaryKey}`])
        setNowUsePrimaryData(
            props?.defaultUsePrimaryKey
                ?
                props?.data?.filter((it) => (it?.[`${props?.primaryKey}`] === props?.defaultUsePrimaryKey))?.[0]
                :
                props?.data?.[0]
        )
    }, [props.data])

    return (
        <>
            {/* 最外層容器 */}
            <BasicContainer
                {...props.outcontainerEvent}
                className={`${props.className} outcontainer`}
                baseDefaultTheme={"DefaultTheme"}
                theme={{
                    ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "outcontainer")
                }} //吃theme
            >
                {/* 頁簽 容器 */}
                <BasicContainer
                    {...props.contentEvent}
                    className={`${props.className} container`}
                    baseDefaultTheme={"BasicContainerDefaultTheme"}
                    // theme={switchDefaultTheme(props.baseDefaultTheme)["container"]} //死吃 預設樣式
                    theme={{ ...iterateTheme({ ...props, type: props?.nameType }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container") }} //吃theme
                >
                    <ScrollBar
                        className={`${props.className} scrollBar`}
                        basedefaulttheme={"DefaultTheme"}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "scrollBar") }}
                    >
                        <BasicContainer
                            {...props.contentEvent}
                            className={`${props.className} content`}
                            baseDefaultTheme={"BasicContainerDefaultTheme"}
                            // theme={switchDefaultTheme(props.baseDefaultTheme)["content"]} //死吃 預設樣式
                            theme={{ ...iterateTheme({ ...props, type: props?.nameType }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "content") }} //吃theme
                        >

                            {props?.data?.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {/* 只顯示名字 */}
                                        {props?.nameType &&
                                            <JustName
                                                key={`name${index}`}
                                                needAction={props?.needAction}
                                                name={item?.[`${props?.nameKeyName ?? "name"}`]}
                                                isAction={NowUsePrimary === item?.[`${props?.primaryKey}`]}
                                                onClick={(e) => {
                                                    setNowUsePrimary(item?.[`${props?.primaryKey}`])
                                                    setNowUsePrimaryData(item)
                                                    props?.onTabClick && props.onTabClick(item)
                                                }}
                                            />
                                        }
                                        {/* 顯示名字與時間 */}
                                        {props?.timeNameType &&
                                            <NameAndTime
                                                key={`NameAndTime${index}`}
                                                needAction={props?.needAction}
                                                name={item?.[`${props?.nameKeyName ?? "name"}`]}
                                                time={item?.[`${props?.TimeKeyName ?? "time"}`]}
                                                isAction={NowUsePrimary === item?.[`${props?.primaryKey}`]}
                                                onClick={(e) => {
                                                    setNowUsePrimary(item?.[`${props?.primaryKey}`])
                                                    setNowUsePrimaryData(item)
                                                    props?.onTabClick && props.onTabClick(item)
                                                }}
                                            />
                                        }
                                    </React.Fragment>
                                )
                            })}

                            {/* <Tag text={"分頁1"} />
                        <Tag theme={{ container: { basic: (style) => ({ ...style, backgroundColor: "#f0f5ff", }) } }} onClose={() => { console.log("d") }} text={"分頁 d1"} />
                        <Tag baseDefaultTheme={"PrimaryTheme"} theme={{}} onClose={() => { console.log("::g") }} text={"aaa ss"} />
                        <Tag baseDefaultTheme={"SecondaryTheme"} onClose={() => { console.log("::g") }} text={"分頁1"} />
                        <Tag baseDefaultTheme={"SuccessTheme"} onClose={() => { console.log("::g") }} text={"分頁 d1"} />
                        <Tag text={"aaa ss"} />
                        <Tag text={"分頁1"} />
                        <Tag text={"分頁 d1"} />
                        <Tag text={"aaa ss"} /> */}
                        </BasicContainer>
                    </ScrollBar>
                </BasicContainer >

                <BasicContainer
                    {...props.topContainerEvent}
                    className={`${props.className} topContainer`}
                    baseDefaultTheme={"BasicContainerDefaultTheme"}
                    // theme={switchDefaultTheme(props.baseDefaultTheme)["content"]} //死吃 預設樣式
                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "topContainer") }} //吃theme
                >
                    {props?.topContent && props.topContent(NowUsePrimaryData)}

                    {/* 左黑點 */}
                    <BasicContainer
                        theme={{
                            basic: (style, prop) => ({
                                ...style,
                                position: "absolute",
                                backgroundColor: "#3c4856",
                                height: "30px",
                                width: "15px",
                                borderRadius: "0px 30px 30px 0px",
                                // top: props?.nameType ? "82px" : "104px",
                                bottom: "-14px",
                                left: "0px",
                                zIndex: 1,
                            })
                        }} />

                    {/* 右黑點 */}
                    <BasicContainer
                        theme={{
                            basic: (style, prop) => ({
                                ...style,
                                position: "absolute",
                                backgroundColor: "#3c4856",
                                height: "30px",
                                width: "15px",
                                borderRadius: "30px 0px 0px 30px",
                                // top: props?.nameType ? "82px" : "104px",
                                bottom: "-14px",
                                zIndex: 1,
                                right: "0px"
                            })
                        }} />

                </BasicContainer>

                <BasicContainer
                    {...props.bottomContainerEvent}
                    className={`${props.className} bottomContainer`}
                    baseDefaultTheme={"BasicContainerDefaultTheme"}
                    // theme={switchDefaultTheme(props.baseDefaultTheme)["content"]} //死吃 預設樣式
                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "bottomContainer") }} //吃theme
                >
                    {props?.bottomContent && props.bottomContent(NowUsePrimaryData)}
                </BasicContainer>

            </BasicContainer >
        </>
    )
}

export const TaskCard = styled(TaskCardBase).attrs((props) => ({}))`
`
//#endregion

const JustName = (props) => {
    return (
        <>
            {props?.needAction
                ?
                <Text
                    theme={
                        props?.isAction
                            ?
                            {
                                basic: (style) => ({
                                    ...style,
                                    display: "inline-block",
                                    width: "90px",
                                    height: "100%",
                                    color: "rgba(60,72,86,1)",
                                    background: "#fff",
                                    textAlign: "center",
                                    border: "2px solid rgba(248,169,30,1)",
                                    borderBottom: "2px solid #fff",
                                    padding: "2px 0 0 0",
                                    verticalAlign: "top"
                                })
                            }
                            :
                            {
                                basic: (style) => ({
                                    ...style,
                                    display: "inline-block",
                                    width: "90px",
                                    height: "100%",
                                    color: "#D8D8D8",
                                    background: "#6B6B6B",
                                    textAlign: "center",
                                    padding: "2px 0 0 0",
                                    verticalAlign: "top"
                                })
                            }
                    }
                    onClick={() => { props?.onClick && props.onClick() }}
                >
                    {props?.isAction ? "執行中" : props?.name}
                </Text>
                :
                <Text
                    theme={
                        props?.isAction
                            ?
                            {
                                basic: (style) => ({
                                    ...style,
                                    display: "inline-block",
                                    width: "90px",
                                    height: "100%",
                                    color: "rgba(61,61,61,1)",
                                    background: "#fff",
                                    textAlign: "center",
                                    padding: "2px 0 0 0",
                                    verticalAlign: "top"
                                })
                            }
                            :
                            {
                                basic: (style) => ({
                                    ...style,
                                    display: "inline-block",
                                    width: "90px",
                                    height: "100%",
                                    color: "#D8D8D8",
                                    background: "#6B6B6B",
                                    textAlign: "center",
                                    padding: "2px 0 0 0",
                                    verticalAlign: "top"
                                })
                            }
                    }
                    onClick={() => { props?.onClick && props.onClick() }}
                >
                    {props?.name}
                </Text>
            }
        </>
    )
}

const NameAndTime = (props) => {
    return (
        <>
            {props?.needAction
                ?
                <Text
                    theme={
                        props?.isAction
                            ?
                            {
                                basic: (style) => ({
                                    ...style,
                                    display: "inline-block",
                                    width: "90px",
                                    height: "100%",
                                    color: "rgba(60,72,86,1)",
                                    background: "#fff",
                                    textAlign: "center",
                                    border: "2px solid rgba(248,169,30,1)",
                                    borderBottom: "2px solid #fff",
                                    padding: "14px 0 0 0",
                                    verticalAlign: "top"
                                })
                            }
                            :
                            {
                                basic: (style) => ({
                                    ...style,
                                    display: "inline-block",
                                    width: "90px",
                                    height: "100%",
                                    color: "#D8D8D8",
                                    background: "#6B6B6B",
                                    textAlign: "center",
                                    padding: "2px 0 0 0",
                                    verticalAlign: "top"
                                })
                            }
                    }
                    onClick={() => { props?.onClick && props.onClick() }}
                >
                    {props?.isAction ?
                        "執行中" :
                        <>
                            {fmt(moment(props?.time, `YYYY-MM-DD HH:mm:ss`), `HH:mm`)}
                            <br />
                            {props?.name}
                        </>
                    }

                </Text>
                :
                <Text
                    theme={
                        props?.isAction
                            ?
                            {
                                basic: (style) => ({
                                    ...style,
                                    display: "inline-block",
                                    width: "90px",
                                    height: "100%",
                                    color: "rgba(61,61,61,1)",
                                    background: "#fff",
                                    textAlign: "center",
                                    padding: "2px 0 0 0",
                                    verticalAlign: "top"
                                })
                            }
                            :
                            {

                                basic: (style) => ({
                                    ...style,
                                    display: "inline-block",
                                    width: "90px",
                                    height: "100%",
                                    color: "#D8D8D8",
                                    background: "#6B6B6B",
                                    textAlign: "center",
                                    padding: "2px 0 0 0",
                                    verticalAlign: "top"
                                })
                            }
                    }
                    onClick={() => { props?.onClick && props.onClick() }}
                >
                    {fmt(moment(props?.time, `YYYY-MM-DD HH:mm:ss`), `HH:mm`)}
                    <br />
                    {props?.name}
                </Text>
            }
        </>
    )
}