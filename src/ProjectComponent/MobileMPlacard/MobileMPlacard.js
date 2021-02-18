import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Container, Text } from '../../Components/';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import CloseIcon from '@material-ui/icons/Close';
import { ReactComponent as UpCircle } from './Assets/img/UpCircle.svg'
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

//#region 基礎按鈕
export const MobileMPlacardBase = (props) => {

    const [Open, setOpen] = useState(false); // 控制收合
    const tabsRef = useRef({});
    const scrollBarRef = useRef();
    const containerRef = useRef();
    const [PreviousTab, setPreviousTab] = useState(""); //前一次分頁
    const [NowTab, setNowTab] = useState(""); //當前分頁
    const [OffsetTop, setOffsetTop] = useState(""); //距螢幕頂部高度
    const [InnerHeight, setInnerHeight] = useState(""); //目前螢幕高度

    useEffect(() => {
        /* 接收props初始化 */
        // props.nowTab 是給父組件的State強制控制要顯示的分頁，以避免載卸組件的重置
        setNowTab(props.nowTab ?? (props.tabsName?.[0] ?? ""));
        setPreviousTab(props.nowTab ?? (props.tabsName?.[0] ?? ""));
    }, [props.tabsName, props.nowTab])

    useEffect(() => {
        setOffsetTop(containerRef?.current?.offsetTop)
        setInnerHeight(window.innerHeight)
    }, [window.innerHeight])

    //#region 控制滾動到選中的分頁上
    const isFirstRenderRef = useRef(true);
    useEffect(() => {
        let tabsLength = Object.keys(tabsRef.current).length;
        if (tabsLength > 0) {
            //scrollBarRef.current.getScrollElement().scrollLeft = tabsRef?.current?.[NowTab]?.offsetLeft - 48;// -48 容器 paddingLeft有48

            //let scrollToView = tabsRef?.current?.[NowTab]?.scrollIntoView({ behavior: "smooth" });
            // let totalWidth = window.innerWidth; 
            let nowIndex = props.tabsName.indexOf(NowTab);
            let previousIndex = props.tabsName.indexOf(PreviousTab);
            let scrollToView = null;
            // console.log( props.tabsName)
            // console.log("n", nowIndex)
            // console.log("p", previousIndex)

            if (nowIndex > -1) {
                if (!isFirstRenderRef.current) {

                    if (nowIndex === tabsLength - 1) {
                        scrollToView = tabsRef?.current?.[NowTab]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    }
                    else if (nowIndex === 0) {
                        scrollToView = tabsRef?.current?.[NowTab]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    }
                    else {
                        // console.log("nowIndex", nowIndex, "previousIndex", previousIndex)
                        if (nowIndex > previousIndex) {
                            //向後按
                            scrollToView = tabsRef?.current?.[props.tabsName?.[nowIndex + 1]]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                        }
                        else if (nowIndex < previousIndex) {
                            //向前按
                            scrollToView = tabsRef?.current?.[props.tabsName?.[nowIndex - 1]]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                        }
                        else {
                            //原地按
                            scrollToView = tabsRef?.current?.[props.tabsName?.[nowIndex]]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                        }
                    }
                }
                isFirstRenderRef.current = false;
            }
        }
        setPreviousTab(NowTab);
    }, [NowTab])
    //#endregion

    return (
        <>
            {/* 最外層容器 */}
            <BasicContainer
                ref={containerRef}
                {...props.containerEvent}
                className={`${props.className} container`}
                baseDefaultTheme={"DefaultTheme"}
                // theme={switchDefaultTheme(props.baseDefaultTheme)["container"]} //死吃 預設樣式
                theme={{
                    ...iterateTheme({
                        ...props,
                        offsetTop: `${OffsetTop}px`,
                        height: Open ? "100vh" : `${InnerHeight - OffsetTop}px`,
                        isOpen: Open
                    }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container")
                }} //吃theme
            >
                {/* 標題容器 */}
                <BasicContainer
                    {...props.titleContainerEvent}
                    className={`titleContainer`}
                    baseDefaultTheme={"DefaultTheme"}
                    onClick={() => { console.log(Open); setOpen(c => !c) }}
                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "titleContainer") }} //吃theme
                >
                    {/* 標題文字 */}
                    <Text
                        {...props.titleTextEvent}
                        className={`titleText`}
                        baseDefaultTheme={"DefaultTheme"}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "titleText") }} //吃theme

                    >
                        {props.TitleText}
                        {/* 標題Icon */}
                        <UpCircle
                            style={{
                                ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "openIcon")["basic"],
                                ...(Open && { transform: "rotateX(180deg)" })
                            }} />
                    </Text>

                </BasicContainer>
                {/* 分頁容器 */}
                <BasicContainer
                    {...props.tabContainerEvent}
                    className={`tabContainer`}
                    baseDefaultTheme={"DefaultTheme"}
                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tabContainer") }} //吃theme
                >
                    {/* 滾動條 */}
                    <ScrollBar
                        ref={scrollBarRef}
                        className={`scrollBar`}
                        basedefaulttheme={"DefaultTheme"}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "scrollBar") }}
                    >
                        {/* 分頁 ScrollBar 下容器 */}
                        <BasicContainer
                            {...props.tabContentEvent}
                            className={`tabContent`}
                            baseDefaultTheme={"DefaultTheme"}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tabContent") }} //吃theme
                        >
                            {/* 分頁 */}
                            {(props.tabsName ?? []).map((item, index) => {
                                return (
                                    <Text
                                        key={index}
                                        ref={(tab) => (tabsRef.current[item] = tab)}
                                        {...props.tabEvent}
                                        className={`${NowTab !== item ? "tab" : "tabActive"}`}
                                        baseDefaultTheme={"DefaultTheme"}
                                        onClick={(e) => {
                                            setNowTab(item);
                                            props.tabEvent?.[`onClick`] && props.tabEvent[`onClick`](item);
                                            props.tabEvent?.[`tab${item}OnClick`] && props.tabEvent[`tab${item}OnClick`](item);
                                        }}
                                        theme={{
                                            ...(NowTab !== item ?
                                                iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tab")
                                                :
                                                iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tabActive")
                                            )
                                        }} //吃theme
                                    >
                                        {item}
                                    </Text>
                                )
                            })}
                            {/* 分頁底部光標 */}
                            <BasicContainer
                                {...props.tabHighLightEvent}
                                className={`tabHighLight`}
                                baseDefaultTheme={"DefaultTheme"}
                                theme={{
                                    ...iterateTheme(
                                        {
                                            ...props,
                                            refCurrentWidth: `${tabsRef.current?.[NowTab]?.getBoundingClientRect().width}px`,
                                            refCurrentLeft: `${tabsRef.current?.[NowTab]?.offsetLeft}px`
                                        },
                                        props.theme,
                                        switchDefaultTheme(props.baseDefaultTheme),
                                        "tabHighLight"
                                    ),

                                }} //吃theme
                            />
                        </BasicContainer>
                    </ScrollBar>
                </BasicContainer>
                {/* 各分頁內容容器 */}
                <BasicContainer
                    {...props.mainContainerEvent}
                    className={`mainContainer`}
                    baseDefaultTheme={"DefaultTheme"}
                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mainContainer") }} //吃theme
                >
                    {/* 各分頁內容滾動條 */}
                    <ScrollBar
                        ref={scrollBarRef}
                        className={`mainScrollBar`}
                        basedefaulttheme={"DefaultTheme"}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mainScrollBar") }}
                    >
                        {/* 各分頁內容 ScrollBar 下容器 */}
                        <BasicContainer
                            {...props.mainContentContainerEvent}
                            className={`mainContentContainer`}
                            baseDefaultTheme={"DefaultTheme"}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mainContentContainer") }} //吃theme
                        >
                            {props.mainContent?.[NowTab]}
                        </BasicContainer>
                    </ScrollBar>
                </BasicContainer >
            </BasicContainer >
        </>
    )
}

export const MobileMPlacard = styled(MobileMPlacardBase).attrs((props) => ({}))`

`
//#endregion