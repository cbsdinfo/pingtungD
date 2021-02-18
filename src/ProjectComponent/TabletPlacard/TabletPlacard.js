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
export const TabletPlacardBase = (props) => {

    const [Open, setOpen] = useState(false); // 控制收合
    const tabsRef = useRef({});
    const scrollBarRef = useRef();
    const mainContainerScrollBarRef = useRef();
    const containerRef = useRef();
    const tabContainerRef = useRef();
    const [PreviousTab, setPreviousTab] = useState(""); //前一次分頁
    const [NowTab, setNowTab] = useState(""); //當前分頁
    const [OffsetTop, setOffsetTop] = useState(""); //距螢幕頂部高度
    const [InnerHeight, setInnerHeight] = useState(""); //目前螢幕高度
    const [TabContainerLeftPadding, setTabContainerLeftPadding] = useState(0); //目前螢幕高度
    const [NowTabWidth, setNowTabWidth] = useState(0); // 當前分頁 tab底部光標寬度
    const [NowTabLeft, setNowTabLeft] = useState(0); // 當前分頁 tab底部光標 offsetLeft
    //#region 具有 往左、右方移動分頁按鈕 用到的State
    const [ShowTabSwich, setShowTabSwich] = useState(false); // 是否開啟 往左、右方移動分頁按鈕
    const [ToRightTabsPageRefs, setToRightTabsPageRefs] = useState([]); //紀錄 (向右翻) 第一頁、每一頁、最後一頁 Tab頁的 Ref
    const [ToRightTabsPageRefsName, setToRightTabsPageRefsName] = useState([]); //紀錄 (向右翻) 第一頁、每一頁、最後一頁 Tab頁的名稱
    const [ToLeftTabsPageRefs, setToLeftTabsPageRefs] = useState([]); //紀錄 (向左翻) 第一頁、每一頁、最後一頁 Tab頁的 Ref
    const [ToLeftTabsPageRefsName, setToLeftTabsPageRefsName] = useState([]); //紀錄 (向左翻)第一頁、每一頁、最後一頁 Tab頁的名稱
    const [NowTabsPage, setNowTabsPage] = useState(0); //現在翻到的 Tab頁
    //#endregion
    const [Width, Height] = useWindowSize();

    useEffect(() => {
        /* 接收props初始化 */
        // props.nowTab 是給父組件的State強制控制要顯示的分頁，以避免載卸組件的重置
        setNowTab(props.nowTab ?? (props.tabsName?.[0] ?? ""));
        setPreviousTab(props.nowTab ?? (props.tabsName?.[0] ?? ""));
    }, [props.tabsName, props.nowTab])

    useEffect(() => {
        setOffsetTop(containerRef?.current?.offsetTop)
        setInnerHeight(Height)

    }, [Height])

    useLayoutEffect(() => {
        //#region 這裡處理是否 tabs 需要置中 ( tabContent 的 padding )
        let tabContainerWidth = tabContainerRef.current?.getBoundingClientRect().width - 64// tabContainer減去padding總寬度
        let tabsTotalWidth = 0;
        let nowTabsLeft = {}; // 紀錄每一個Tab 距離左方應該要多遠，讓光標可以依照此距離移動到正確位置
        let toRightTabsPageRefs = []; // 紀錄 (向右翻) 第一頁、每一頁、最後一頁 Tab頁的 Ref
        let toRightTabsPageRefsName = []; // 紀錄 (向右翻) 第一頁、每一頁、最後一頁 Tab頁的名稱
        let toLeftTabsPageRefs = []; // 紀錄 (向左翻) 第一頁、每一頁、最後一頁 Tab頁的 Ref
        let toLeftTabsPageRefsName = []; // 紀錄 (向左翻) 第一頁、每一頁、最後一頁 Tab頁的名稱
        //讓物件內的 key 與 value 按照原順序 使用
        (props.tabsName ?? []).forEach((item, index, arr) => {
            nowTabsLeft[item] = tabsTotalWidth;
            tabsTotalWidth = tabsTotalWidth + tabsRef.current?.[item]?.getBoundingClientRect().width;

            //#region 處理 Tab 頁數
            if (index === arr.length - 1) {
                //最後一個 tab
                toRightTabsPageRefs.push(tabsRef.current?.[item])
                toRightTabsPageRefsName.push(item);
                //toRightTabsPageRefs[0] = tabsRef.current?.[props.tabsName?.[0]];// 替換第一個 tabsPageRefs 為 第一個 tab
                //toRightTabsPageRefsName[0] = (props.tabsName?.[0]);
                toLeftTabsPageRefs = [tabsRef.current?.[props.tabsName?.[0]], ...toLeftTabsPageRefs];
                toRightTabsPageRefsName = [props.tabsName?.[0], ...toRightTabsPageRefsName];
            } else {
                //不是最後一個 tab
                if (tabsTotalWidth >= (tabContainerWidth * (toRightTabsPageRefsName.length + 1)) - 24) {// 減去 Tab 的左邊padding + 8px
                    //向右翻陣列
                    toRightTabsPageRefs.push(tabsRef.current?.[item])
                    toRightTabsPageRefsName.push(item);
                    //向左翻陣列
                    toLeftTabsPageRefs.push(tabsRef.current?.[arr[index + 1]])
                    toLeftTabsPageRefsName.push(arr[index + 1]);
                }
            }
            //#endregion
        });

        setToRightTabsPageRefs(toRightTabsPageRefs); // 轉存成 State
        setToRightTabsPageRefsName(toRightTabsPageRefsName);

        setToLeftTabsPageRefs(toLeftTabsPageRefs); // 轉存成 State
        setToLeftTabsPageRefsName(toLeftTabsPageRefsName);

        // console.log(toRightTabsPageRefs)
        // for (const [key, value] of Object.entries(tabsRef.current)) {
        //     nowTabsLeft[key] = tabsTotalWidth;
        //     tabsTotalWidth = tabsTotalWidth + value?.getBoundingClientRect().width;
        // }

        if (tabContainerWidth - tabsTotalWidth >= 0) {
            // tabs 總寬度小於容器寬度，即無法滾動
            setTabContainerLeftPadding((tabContainerWidth - tabsTotalWidth) / 2);//透過 padding置中 
            setShowTabSwich(false)

            //#region 這裡處理底部光標寬度、距左側位置
            setNowTabWidth(`${tabsRef.current?.[NowTab]?.getBoundingClientRect().width}px`);
            setNowTabLeft(`${(tabContainerWidth - tabsTotalWidth) / 2 + nowTabsLeft?.[NowTab]}px`);
            //#endregion
        } else {
            // tabs 總寬度大於容器寬度，即可以滾動
            setShowTabSwich(true)

            //#region 這裡處理底部光標寬度、距左側位置
            setNowTabWidth(`${tabsRef.current?.[NowTab]?.getBoundingClientRect().width}px`);
            setNowTabLeft(`${nowTabsLeft?.[NowTab]}px`);
            //#endregion
        }
        //#endregion

    }, [Width, NowTab])

    //#region 控制滾動到選中的分頁上
    const isFirstRenderRef = useRef(true); // 是否為第一次渲染組件
    useEffect(() => {
        let tabsLength = Object.keys(tabsRef.current).length;
        if (tabsLength > 0) {
            //scrollBarRef.current.getScrollElement().scrollLeft = tabsRef?.current?.[NowTab]?.offsetLeft - 48;// -48 容器 paddingLeft有48

            //let scrollToView = tabsRef?.current?.[NowTab]?.scrollIntoView({ behavior: "smooth" });
            // let totalWidth = window.innerWidth; 
            let nowIndex = props.tabsName.indexOf(NowTab); // 確認 NowTab 已被設定為 props.nowTab，並取得 index
            let previousIndex = props.tabsName.indexOf(PreviousTab);
            let scrollToView = null;
            // console.log( props.tabsName)
            // console.log("n", nowIndex)
            // console.log("p", previousIndex)

            if (nowIndex > -1) {
                if (!isFirstRenderRef.current) {
                    //不是第一次渲染組件
                    // if (nowIndex === tabsLength - 1) {
                    //     scrollToView = tabsRef?.current?.[NowTab]?.scrollIntoView({ behavior: "smooth" });
                    // }
                    // else if (nowIndex === 0) {
                    //     scrollToView = tabsRef?.current?.[NowTab]?.scrollIntoView({ behavior: "smooth" });
                    // }
                    // else {
                    //     // console.log("nowIndex", nowIndex, "previousIndex", previousIndex)
                    //     if (nowIndex > previousIndex) {
                    //         //向後按
                    //         scrollToView = tabsRef?.current?.[props.tabsName?.[nowIndex + 1]]?.scrollIntoView({ behavior: "smooth" });
                    //     }
                    //     else if (nowIndex < previousIndex) {
                    //         //向前按
                    //         scrollToView = tabsRef?.current?.[props.tabsName?.[nowIndex - 1]]?.scrollIntoView({ behavior: "smooth" });
                    //     }
                    //     else {
                    //原地按
                    scrollToView = tabsRef?.current?.[props.tabsName?.[nowIndex]]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    //     }
                    // }
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
                theme={{
                    ...iterateTheme({
                        ...props,
                        height: `${InnerHeight - OffsetTop}px`,
                    }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container")
                }} //吃theme
            >
                {/* 標題容器 */}
                <BasicContainer
                    {...props.titleContainerEvent}
                    className={`titleContainer`}
                    baseDefaultTheme={"DefaultTheme"}
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
                    </Text>

                </BasicContainer>
                {/* 分頁容器 */}
                <BasicContainer
                    {...props.tabContainerEvent}
                    ref={tabContainerRef}
                    className={`tabContainer`}
                    baseDefaultTheme={"DefaultTheme"}
                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tabContainer") }} //吃theme
                >
                    {ShowTabSwich &&
                        <>
                            {/* 往左方移動分頁按鈕 */}
                            <LeftArrow
                                onClick={() => {
                                    if (NowTabsPage > 0) {
                                        let scrollToView = ToLeftTabsPageRefs[NowTabsPage - 1]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                                        //setNowTab(TabsPageRefsName[NowTabsPage - 1])
                                        setNowTabsPage(n => n - 1)
                                    }
                                }}
                                style={{
                                    ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "leftArrowIcon")["basic"],
                                    // TabsPageRefs.length
                                    ...(NowTabsPage === 0 ? { color: "rgba(0, 0, 0, 0.25)", cursor: "not-allowed" } : { color: "rgb(0, 0, 0)" })
                                }}
                            />
                            {/* 往右方移動分頁按鈕 */}
                            <RightArrow
                                onClick={() => {
                                    if (NowTabsPage < ToRightTabsPageRefs.length - 1) {
                                        let scrollToView = ToRightTabsPageRefs[NowTabsPage + 1]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                                        //setNowTab(TabsPageRefsName[NowTabsPage + 1])
                                        setNowTabsPage(n => n + 1)
                                    }
                                }}
                                style={{
                                    ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "RightArrowIcon")["basic"],
                                    ...(NowTabsPage === ToRightTabsPageRefs.length - 1 ? { color: "rgba(0, 0, 0, 0.25)", cursor: "not-allowed" } : { color: "rgb(0, 0, 0)" })
                                }}
                            />
                        </>
                    }
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
                            theme={{ ...iterateTheme({ ...props, leftPadding: TabContainerLeftPadding }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tabContent") }} //吃theme
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
                                            refCurrentWidth: NowTabWidth,
                                            refCurrentLeft: NowTabLeft
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
                        ref={mainContainerScrollBarRef}
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

export const TabletPlacard = styled(TabletPlacardBase).attrs((props) => ({}))`
`
//#endregion