import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Container, Tag } from '../../..';
import { iterateTheme } from '../../../../Handlers/ThemeHandler';
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useLocation, useHistory } from 'react-router-dom';
import { getParseItemLocalStorage } from '../../../../Handlers';
// import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "BasicButtonSecondaryTheme":
        //     return BasicButtonSecondaryTheme;
        // case "BasicButtonDisableTheme":
        //     return BasicButtonDisableTheme;
        // case "BasicButtonPrimaryTheme":
        //     return BasicButtonPrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region 去掉最尾端 子頁面 部分路由函數
const removeTailUrl = (pathname) => {
    let totalLength = pathname.length;
    let split = pathname.split("/")
    let howManyToRemove = [...split[split.length - 1]].length + 1;
    let pathnameRes = pathname.substring(0, totalLength - howManyToRemove);// 去掉最尾端 子頁面 部分路由

    return pathnameRes
}
//#endregion

//#region 遍歷歷史開啟分頁，會返回準備要跳轉的路由
const pushUrlHandler = (item, index, arr, pathname, history) => {
    let size = arr.length;
    //console.log(history)

    if (size === 1) {
        history.push('/');
        return "/";
    }
    else if (index === size - 1) {
        //console.log(arr[index - 1].path)
        if (pathname === item.path) {
            history.push(arr[index - 1].path);
            return arr[index - 1].path;
        }
    }
    else {
        //console.log(arr[index + 1].path)
        if (pathname === item.path) {
            history.push(arr[index + 1].path);
            return arr[index + 1].path;
        }
    }

    return pathname
}
/* 
   Date   : 2020-08-19 11:30:15
   Author : Arhua Ho
   Content: 
               @Param : openHistory ； 開啟的分頁 : 陣列內為要開啟的分頁，每個物件必包含key : title、path
               @Param : urlMapping ； 路由與顯示在標籤上名稱的對應 : 如 : {"/xxx/yyy": "某某某頁面", "/xxx/yyy/:id": "某某某頁面id 1" }
               @Param : pathname ； 目前路由   
               @Param : history  ； 歷史路由 
               @Param : tabOnClose ； 分頁標籤被關閉時要做的事    
               @Param : tagBaseDefaultTheme ； 分頁標籤的基礎樣式名，可直接以 tagTheme 覆寫
               @Param : tagTheme ； 覆寫分頁標籤的樣式
               @Param : tagActivebaseDefaultTheme ； 被選中分頁標籤的基礎樣式名，可直接以 tagActiveTheme 覆寫
               @Param : tagActiveTheme ； 覆寫被選中分頁標籤的樣式              
   */
const mapOpenHistory = (openHistory = [], urlMapping = {}, pathname = "", history, tabOnClick = () => false, tabOnClose = () => false, componentTabOnClose, tagBaseDefaultTheme = "PrimaryTheme", tagTheme = {}, tagActiveTheme = {}, tagActivebaseDefaultTheme = "DefaultTheme", tagsRef = []) => {

    return openHistory.map((item, index, arr) => {
        return (
            <Tag
                key={index}
                ref={(tag) => (tagsRef.current[index] = tag)}
                baseDefaultTheme={
                    // 處理進入子頁面如新增、修改等，標記於父層路由標籤 Functions
                    getParseItemLocalStorage("DFunctions").includes(pathname) ?
                        //進入子頁面路由
                        (removeTailUrl(pathname) === item.path ? tagBaseDefaultTheme : tagActivebaseDefaultTheme)
                        :
                        //進入一般分頁
                        (pathname === item.path ? tagBaseDefaultTheme : tagActivebaseDefaultTheme)

                } // 開啟指定分頁啟用樣式 : PrimaryTheme
                // baseDefaultTheme={pathname === item.path ? tagBaseDefaultTheme : tagActivebaseDefaultTheme} // 開啟指定分頁啟用樣式 : PrimaryTheme
                theme={pathname === item.path ? tagTheme : tagActiveTheme}
                onClose={(e) => { /*componentTabOnClose(item, index, arr, pathname);*/  tabOnClose(item, index, arr, pathname, componentTabOnClose(item, index, arr, pathname)) }} // 當個別分頁(標籤)被關閉時
                text={urlMapping[item.path]}
                containerEvent={{ onClick: (e) => { e.stopPropagation(); tabOnClick(item.path); (pathname !== item.path) && history.push(item.path) } }}
            />
        );
    })
}
//#endregion

//#region 基礎按鈕
export const BackstagePageTabBarBase = (props) => {

    let location = useLocation();
    let history = useHistory();
    //(location.pathname === "/Dispatch" ? menuBar.leftModeMenuLiClicked : menuBar.leftModeMenuLi)
    const [OpenHistory, setOpenHistory] = useState([]); /* 接收props初始化 [{title: "某某某頁面", path: "/xxx/yyy"}, {}, {}] */
    const [UrlMapping, setUrlMapping] = useState({});   /* 接收props初始化 {"/xxx/yyy": "某某某頁面", "/xxx/yyy/:id": "某某某頁面id 1", } */

    const tagsRef = useRef([]);
    const scrollBarRef = useRef();

    useEffect(() => {
        /* 接收props初始化 */
        setOpenHistory(props.openHistory ?? []);
        setUrlMapping(props.urlMapping ?? []);

    }, [props.openHistory, props.urlMapping])

    //#region 控制滾動到選中的分頁上
    useEffect(() => {
        //console.log("tagsRef", tagsRef)
        if (tagsRef.current.length > 0) {
            // console.log("tagsRef", tagsRef)
            // console.log("OpenHistory", OpenHistory)
            OpenHistory.forEach((item, index, arr) => {
                if (location.pathname === item.path) {
                    //console.log("tagsRef.current[index]", tagsRef.current[index])
                    //console.log("tagsRef.current[index].offsetLeft", tagsRef.current[index].offsetLeft)
                    scrollBarRef.current.getScrollElement().scrollLeft = tagsRef.current[index].offsetLeft - 2;// -2 讓左邊留一點白
                }
            })
        }
    })
    //#endregion

    return (
        <>
            <BasicContainer
                {...props.contentEvent}
                className={`${props.className} container`}
                baseDefaultTheme={"BasicContainerDefaultTheme"}
                // theme={switchDefaultTheme(props.baseDefaultTheme)["container"]} //死吃 預設樣式
                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container") }} //吃theme
            >
                <ScrollBar
                    ref={scrollBarRef}
                    className={`${props.className} scrollBar`}
                    basedefaulttheme={"DefaultTheme"}
                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "scrollBar") }}
                >
                    <BasicContainer
                        {...props.contentEvent}
                        className={`${props.className} content`}
                        baseDefaultTheme={"BasicContainerDefaultTheme"}
                        // theme={switchDefaultTheme(props.baseDefaultTheme)["content"]} //死吃 預設樣式
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "content") }} //吃theme
                    >
                        {/* 遍歷歷史開啟分頁 */}
                        {mapOpenHistory(
                            OpenHistory,
                            UrlMapping,
                            location.pathname,
                            history,
                            props.tabOnClick,
                            props.tabOnClose,
                            (item, index, arr, pathname) => {
                                setOpenHistory(o => o.filter(p => p.path !== item.path));
                                return pushUrlHandler(item, index, arr, location.pathname, history);
                            },
                            props.tagBaseDefaultTheme,
                            props.tagTheme,
                            props.tagActivebaseDefaultTheme,
                            props.tagActiveTheme,
                            tagsRef)
                        }

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
        </>
    )
}

export const BackstagePageTabBar = styled(BackstagePageTabBarBase).attrs((props) => ({}))`

`
//#endregion