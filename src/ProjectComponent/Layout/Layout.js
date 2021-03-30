import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Context, Tooltip, BackstageLeftSideMenuBar, BackstagePageTabBar, BackstageTopMenuBar, ScrollBar, BasicContainer, LeftSideDrawer, SubContainer, Text, BasicButton, DropDown, modalsService, globalContextService, Container, TextInput, FormRow, FormContainer } from '../../Components'
import { useWindowSize } from '../../SelfHooks/useWindowSize'
import { ReactComponent as ArrowUp } from '../../Assets/img/BackstageLeftSideMenuBar/ArrowUp.svg'
import { ReactComponent as WhiteBlock } from '../../Assets/img/BackstageLeftSideMenuBar/WhiteBlock.svg'
import { ReactComponent as Close } from '../../Assets/img/BackstageLeftSideMenuBar/Close.svg'

import { ReactComponent as LaptopLLogo } from '../../Assets/img/LaptopLLogo.svg'
import { ReactComponent as LaptopLogo } from '../../Assets/img/LaptopLogo.svg'
import { ReactComponent as TabletLogo } from '../../Assets/img/TabletLogo.svg'
import { ReactComponent as MobileMLogo } from '../../Assets/img/MobileMLogo.svg'
import { ReactComponent as MobileMMenu } from '../../Assets/img/MobileMMenu.svg'

import { ReactComponent as NewsTab } from '../../Assets/img/NewsTab.svg'
import { ReactComponent as CallCarTab } from '../../Assets/img/CallCarTab.svg'
import { ReactComponent as BusRouteTab } from '../../Assets/img/BusRouteTab.svg'
import { ReactComponent as RecordTab } from '../../Assets/img/RecordTab.svg'
import { ReactComponent as UserInfoTab } from '../../Assets/img/UserInfoTab.svg'
import { ReactComponent as ContactTab } from '../../Assets/img/ContactTab.svg'
import { ReactComponent as QAndATab } from '../../Assets/img/QAndATab.svg'
import { ReactComponent as LogoutLaptop } from '../../Assets/img/LogoutLaptop.svg'
import { ReactComponent as LoginLaptop } from '../../Assets/img/LoginLaptop.svg'

import { ReactComponent as Lock } from '../../Assets/img/Lock.svg'
import { ReactComponent as Line } from '../../Assets/img/Line.svg'
import { ReactComponent as Castle } from '../../Assets/img/Castle.svg'
import { ReactComponent as Clock } from '../../Assets/img/Clock.svg'
import { ReactComponent as CallWorkTime } from '../../Assets/img/CallWorkTime.svg'
import { ReactComponent as DotOfmap } from '../../Assets/img/DotOfmap.svg'

import { getParseItemLocalStorage, setStringifyItemSession, pushAndNotExsistItemSession, getParseItemSession, removeByKeyItemSession, clearLocalStorage, clearSession, setStringifyItemLocalStorage, valid } from '../../Handlers';
import { iconMap, pageTabBarUrlMapping, pageTextUrlMapping } from '../../Mappings/Mappings'
import { useHistory, useLocation } from 'react-router-dom';
import { isNil } from 'lodash';
import { TitleBar } from '../TitleBar/TitleBar';
import isEqual from 'lodash/isEqual';

export const Layout = (props) => {
    const [NeedHover, setNeedHover] = useState(false); // DropDown 開啟時需要hover
    const [width] = useWindowSize();

    const { Collapse, APIFileUrl, setCollapse, DrawerCollapse, setDrawerCollapse, Theme, Switch, APIUrl } = useContext(Context);
    const { layout } = Theme;
    let history = useHistory();
    let location = useLocation();

    const [ExpandMenuName, setExpandMenuName] = useState([]); // 當前開啟的分頁
    const [IsHoverMenuName, setIsHoverMenuName] = useState([]); // 當前開啟的分頁

    if (!getParseItemLocalStorage("MenuNameAndSubUrl")) {
        setStringifyItemLocalStorage("MenuNameAndSubUrl",
            {
                "聯繫客服": ["/Contact"],
                "常見問題": ["/QAndA"]
            })
    }

    useEffect(() => {
        //#region 設定剛登入時，開啟歡迎頁
        // console.log(getParseItemSession("Dtab"))
        if (isNil(getParseItemSession("Dtab")) || (getParseItemSession("Dtab") ?? []).length === 0) {
            setStringifyItemSession("Dtab", [{ title: "首頁", path: "/" }])
        }
        //#endregion
    })

    useEffect(() => {
        // setStringifyItemSession("Dtab", [{ title: "某某某頁面", path: "/xxx/yyy" }, { title: "某某某頁面", path: "/aaa/bbb" }, { title: "某某某頁面c", path: "/aaa/ccc" },
        // { title: "某某某頁面", path: "/aaa/111" }, { title: "某某某頁面", path: "/aaa/333" }, { title: "某某某頁面c", path: "/aaa/555" },
        // { title: "某某某頁面", path: "/aaa/222" }, { title: "某某某頁面", path: "/aaa/444" }, { title: "某某某頁面c", path: "/aaa/666" }])

        //#region 設定剛登入時，開啟歡迎頁
        // console.log(getParseItemSession("Dtab"))
        // if (isNil(getParseItemSession("Dtab")) || (getParseItemSession("Dtab") ?? []).length === 0) {
        //     setStringifyItemSession("Dtab", [{ title: "首頁", path: "/" }])
        // }
        //#endregion

        //#region 處理當直接從瀏覽器網址列輸入 路由 ，一樣要新增分頁的情況
        // !! 注意 只處理包含在 pageTabBarUrlMapping 物件中的路由 
        let historyOpenTab = (getParseItemSession("Dtab") ?? []).map((item => item.path))
        if ((!historyOpenTab.includes(location.pathname) && pageTabBarUrlMapping[location.pathname])) {
            pushAndNotExsistItemSession("Dtab", "path", location.pathname, { title: pageTabBarUrlMapping[location.pathname], path: location.pathname })
        }
        //#endregion

        //#region 處理當前應被標記與開啟的父層
        let canUseFunctions = getParseItemLocalStorage("Functions") ?? []
        let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
        let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl") ?? []) ?? []
        let res = [];

        //#region 處理進入子頁面如新增、修改等，標記於父層路由標籤 Functions
        if (canUseFunctions.includes(location.pathname)) {
            //進入子頁面路由
            let totalLength = location.pathname.length;
            let split = location.pathname.split("/")
            let howManyToRemove = [...split[split.length - 1]].length + 1;
            let pathnameRes = location.pathname.substring(0, totalLength - howManyToRemove);// 去掉最尾端 子頁面 部分路由

            keys.forEach(
                (item) => {
                    if (menuNameAndSubUrl[item].includes(pathnameRes)) {
                        res = [...res, item]
                    }
                }
            )
        }
        else {
            //進入一般分頁
            keys.forEach(
                (item) => {
                    if (menuNameAndSubUrl[item].includes(location.pathname)) {
                        res = [...res, item]
                    }
                }
            )
        }
        //#endregion

        setExpandMenuName(res)
        //#endregion

    }, [Collapse]) // 除了初始設置外，由窄版 切換至 寬版 亦需要重新設定展開 應該展開的 父層

    if (localStorage.getItem("DAuth") === null) {
        // return null
    }

    const TabMapping = (key) => {
        // 最新消息  News
        // 預約訂車  CallCar
        // 快速叫車  FastCallCar
        // 訂單檢視  Record
        // 用戶資料  UserInfo
        // 聯繫客服  Contact
        // 常見問題  QAndA
        switch (key) {
            case "allTabNameLaptopL":
                return [
                    { path: "/News", name: "最新消息", icon: <NewsTab style={layout.titleBarTabIconLaptopL} /> },
                    {
                        path: "/CallCar", name: "預約訂車", icon: <CallCarTab style={layout.titleBarTabIconLaptopL} />,
                        dropDown: [
                            { path: "/CallCar", name: "預約訂車" },
                            { path: "/FastCallCar", name: "快速叫車" },
                        ]
                    },
                    { path: "/BusRoute", name: "營運路線", icon: <BusRouteTab style={layout.titleBarTabIconLaptopL} /> },
                    { path: "/Record", name: "訂單檢視", icon: <RecordTab style={layout.titleBarTabIconLaptopL} /> },
                    { path: "/UserInfo", name: "用戶資料", icon: <UserInfoTab style={layout.titleBarTabIconLaptopL} /> },
                    { path: "/Contact", name: "聯繫客服", icon: <ContactTab style={layout.titleBarTabIconLaptopL} /> },
                    { path: "/QAndA", name: "常見問題", icon: <QAndATab style={layout.titleBarTabIconLaptopL} /> },
                ]
            case "allTabNameLaptop":
                return [
                    { path: "/News", name: "最新消息", icon: <NewsTab style={layout.titleBarTabIconLaptop} /> },
                    {
                        path: "/CallCar", name: "預約訂車", icon: <CallCarTab style={layout.titleBarTabIconLaptop} />,
                        dropDown: [
                            { path: "/CallCar", name: "預約訂車" },
                            { path: "/FastCallCar", name: "快速叫車" },
                        ]
                    },
                    { path: "/BusRoute", name: "營運路線", icon: <BusRouteTab style={layout.titleBarTabIconLaptop} /> },
                    { path: "/Record", name: "訂單檢視", icon: <RecordTab style={layout.titleBarTabIconLaptop} /> },
                    { path: "/UserInfo", name: "用戶資料", icon: <UserInfoTab style={layout.titleBarTabIconLaptop} /> },
                    { path: "/Contact", name: "聯繫客服", icon: <ContactTab style={layout.titleBarTabIconLaptop} /> },
                    { path: "/QAndA", name: "常見問題", icon: <QAndATab style={layout.titleBarTabIconLaptop} /> },
                ]
            case "allTabNameTablet":
                return [
                    { path: "/News", name: "最新消息", icon: <NewsTab style={layout.titleBarTabIconTablet} /> },
                    {
                        path: "/CallCar", name: "預約訂車", icon: <CallCarTab style={layout.titleBarTabIconTablet} />,
                        dropDown: [
                            { path: "/CallCar", name: "預約訂車" },
                            { path: "/FastCallCar", name: "快速叫車" },
                        ]
                    },
                    { path: "/BusRoute", name: "營運路線", icon: <BusRouteTab style={layout.titleBarTabIconTablet} /> },
                    { path: "/Record", name: "訂單檢視", icon: <RecordTab style={layout.titleBarTabIconTablet} /> },
                    { path: "/UserInfo", name: "用戶資料", icon: <UserInfoTab style={layout.titleBarTabIconTablet} /> },
                    { path: "/Contact", name: "聯繫客服", icon: <ContactTab style={layout.titleBarTabIconTablet} /> },
                    { path: "/QAndA", name: "常見問題", icon: <QAndATab style={layout.titleBarTabIconTablet} /> },
                ]
            case "allTabNameMobileMLeftSide":
                return [
                    { path: "/Contact", name: "聯繫客服", icon: <ContactTab style={layout.titleBarTabIconMobileM} /> },
                    { path: "/QAndA", name: "常見問題", icon: <QAndATab style={layout.titleBarTabIconMobileM} /> },
                ]
            case "allTabNameMobileMFixBottom":
                return [
                    { path: "/News", name: "最新消息", icon: <NewsTab style={layout.titleBarTabIconMobileM} /> },
                    { path: "/CallCar", name: "預約訂車", icon: <CallCarTab style={layout.titleBarTabIconMobileM} /> },
                    { path: "/BusRoute", name: "營運路線", icon: <BusRouteTab style={layout.titleBarTabIconMobileM} /> },
                    { path: "/Record", name: "訂單檢視", icon: <RecordTab style={layout.titleBarTabIconMobileM} /> },
                    { path: "/UserInfo", name: "用戶資料", icon: <UserInfoTab style={layout.titleBarTabIconMobileM} /> },
                ]
            default:
                break;
        }
    }

    //驗證密碼
    const passWordVerify = () => {
        let validMsg = ""
        if (valid(globalContextService.get("LayoutPage", "NewPassword") ?? "", ["^.{1,}$", "^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,}$"], ["請輸入新密碼", "新密碼請輸入：8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。"])[1]) {
            validMsg = valid(globalContextService.get("LayoutPage", "NewPassword") ?? "", ["^.{1,}$", "^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,}$"], ["請輸入新密碼", "新密碼請輸入：8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。"])[1]
        }
        else if (!isEqual(globalContextService.get("LayoutPage", "NewPassword"), globalContextService.get("LayoutPage", "ConfirmPwd"))) {
            validMsg = "請確認兩次密碼輸入是否相符"
        }

        if (validMsg !== "") {
            modalsService.infoModal.error({
                id: "top1", //注意 這裡要加上固定id
                iconRightText: validMsg,
                yes: true,
                yesText: "確認",
                // no: true,
                // autoClose: true,
                backgroundClose: false,
                yesOnClick: (e, close) => {
                    close();
                }
            })
            return false
        }
        else {
            return true
        }
    }

    const changePassWord = useCallback(async (changePassWordObject) => {
        //#region 修改密碼彈窗 (確認後發送)
        fetch(`${APIUrl}Users/ChangePassword`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...changePassWordObject })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功 修改密碼 API 

                    //修改成功後強制登出
                    clearSession();
                    clearLocalStorage();
                    globalContextService.clear();

                    modalsService.infoModal.success({
                        iconRightText: "修改密碼成功，請重新登入",
                        yes: true,
                        yesText: "確認",
                        // no: true,
                        // autoClose: true,
                        backgroundClose: false,
                        yesOnClick: (e, close) => {
                            Switch();
                            close();
                        }
                    })
                }
                else {
                    throw PreResult;
                }
            })
            .catch((Error) => {
                modalsService.infoModal.warn({
                    iconRightText: Error.code === 401 ? "請重新登入。" : Error.message,
                    yes: true,
                    yesText: "確認",
                    // no: true,
                    // autoClose: true,
                    backgroundClose: false,
                    yesOnClick: (e, close) => {
                        if (Error.code === 401) {
                            clearSession();
                            clearLocalStorage();
                            globalContextService.clear();
                            Switch();
                        }
                        close();
                    }
                })
                throw Error.message;
            })
            .finally(() => {
            });
        //#endregion
    }, [APIUrl, Switch])

    return (
        <>
            {/* TitleBar拆分至各組件 */}
            {/* <TitleBar returnIcon returnIconOnClick={(e) => { console.log(e) }} /> */}

            {/* LeftSideDrawer 樣式 MobileM */}
            <LeftSideDrawer
                baseDefaultTheme={"DefaultTheme"}
                collapse={DrawerCollapse}
                containerEvent={{ onClick: () => { setDrawerCollapse(true) } }}
                theme={layout.leftSideDrawerMobileM}
            >
                {/* 若已登入，則秀登出按鈕 */}
                <BasicContainer
                    theme={{
                        basic: (style, props) => ({
                            ...style,
                            // position: "absolute",
                            // bottom: "10px",
                            textAlign: "center",
                            width: "100%",
                            paddingTop: "8px",
                            height: "279px",
                            background: "#3C4856",
                        })
                    }}
                >
                    <Close
                        style={{
                            position: "absolute",
                            right: "9px"
                        }}
                        onClick={() => {
                            setDrawerCollapse(true)
                        }}
                    />

                    <img
                        src={`${APIFileUrl}${getParseItemLocalStorage("DriverPic")}${isNil(getParseItemLocalStorage("DriverPic")) ? ".jpg" : ""}`}
                        alt=""
                        height="100px"
                        width="100px"
                        style={{ borderRadius: "99em", border: "6px solid #fff", top: "36px", left: "-14px", position: "relative" }}
                    />

                    <Text
                        theme={{
                            basic: (style, props) => ({
                                ...style,
                                fontSize: "18px",
                                lineHeight: "24px",
                                textAlign: "center",
                                color: "#fff",
                                display: "inline-block",
                                marginRight: "16px",
                                top: "33px",
                                left: "16px",
                                fontWeight: 300
                            })
                        }}
                    >
                        {getParseItemLocalStorage("DUserName")}
                    </Text>

                    <Text
                        theme={{
                            basic: (style, props) => ({
                                ...style,
                                fontSize: "18px",
                                lineHeight: "24px",
                                textAlign: "center",
                                color: "#fff",
                                display: "inline-block",
                                marginRight: "16px",
                                position: "absolute",
                                fontWeight: 300,
                                width: "100%",
                                bottom: "93px",
                                left: "-34px"
                            })
                        }}
                    >
                        {getParseItemLocalStorage("DriverOrg")?.orgName}
                    </Text>

                    <Text
                        theme={layout.titleBarChangePasswordMobileM}
                        onClick={(e) => {
                            e.preventDefault();
                            setDrawerCollapse(true);

                            //#region 打開修改密碼 Modal
                            modalsService.titleModal.normal({
                                //id: "top1",
                                title: "修改密碼",
                                yes: true,
                                yesText: "確認",
                                no: true,
                                noText: "取消",
                                // autoClose: true,
                                backgroundClose: false,
                                noOnClick: (e) => {
                                    globalContextService.remove("LayoutPage", "NewPassword")
                                    globalContextService.remove("LayoutPage", "ConfirmPwd")
                                },
                                yesOnClick: (e, close) => {
                                    //#region 表單驗證
                                    if (passWordVerify()) {
                                        changePassWord({
                                            account: getParseItemLocalStorage("DriverAccount"), // 帳號
                                            passWord: globalContextService.get("LayoutPage", "NewPassword"), // 新密碼
                                        })
                                        close();
                                    }
                                    //#endregion
                                },
                                closeIconOnClick: (e) => {
                                    globalContextService.remove("LayoutPage", "NewPassword")
                                    globalContextService.remove("LayoutPage", "ConfirmPwd")
                                },
                                content: (
                                    <FormContainer
                                        baseDefaultTheme={"DefaultTheme"}
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                        }}
                                        theme={layout.editPwdFormContainer}
                                    >
                                        <FormRow baseDefaultTheme={"DefaultTheme"}>

                                            {/* 修改密碼提示文字 */}
                                            < Text
                                                theme={layout.editPwdTip}
                                            >
                                                8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。
                                            </Text>

                                            {/* 新密碼 NewPwd */}
                                            <TextInput
                                                topLabel={<>新密碼</>}
                                                baseDefaultTheme={"DefaultTheme"}
                                                type="password"
                                                placeholder={"請輸入新密碼"}
                                                leftIcon={
                                                    <Lock
                                                        style={layout.pwdLeftIcon}
                                                    />
                                                }
                                                openEye
                                                value={globalContextService.get("LayoutPage", "NewPassword") ?? props.Client?.name}
                                                onChange={(e, value, onInitial) => {
                                                    globalContextService.set("LayoutPage", "NewPassword", value);
                                                }}
                                                theme={layout.newPwd}
                                            />

                                            {/* 確認新密碼 ConfirmPwd */}
                                            <TextInput
                                                topLabel={<>確認新密碼</>}
                                                baseDefaultTheme={"DefaultTheme"}
                                                type="password"
                                                placeholder={"請輸入新密碼"}
                                                leftIcon={
                                                    <Lock
                                                        style={layout.pwdLeftIcon}
                                                    />
                                                }
                                                openEye
                                                value={globalContextService.get("LayoutPage", "ConfirmPwd") ?? props.Client?.name}
                                                onChange={(e, value, onInitial) => {
                                                    globalContextService.set("LayoutPage", "ConfirmPwd", value);
                                                }}
                                                theme={layout.confirmPwd}
                                            />

                                        </FormRow>
                                    </FormContainer>
                                ),
                                theme: layout.editPwdModal
                            })
                            //#endregion
                        }}
                    >
                        修改密碼
                    </Text>
                    <Text
                        theme={layout.titleBarLogoutMobileM}
                        onClick={() => {
                            setDrawerCollapse(true);

                            modalsService.infoModal.warn({
                                iconRightText: "是否要登出?",
                                yes: true,
                                yesText: "確認",
                                no: true,
                                noText: "取消",
                                // autoClose: true,
                                backgroundClose: false,
                                yesOnClick: (e, close) => {
                                    clearLocalStorage();
                                    clearSession();
                                    globalContextService.clear();
                                    Switch();
                                    setDrawerCollapse(true);
                                    close();
                                }
                            })
                        }}
                    >
                        登出
                    </Text>

                    {getParseItemLocalStorage("DriverAccountStatus") === "Default" &&

                        modalsService.titleModal.normal({
                            //id: "top1",
                            title: "首次登入，請設定新密碼",
                            yes: true,
                            yesText: "確認",
                            // no: true,
                            // noText: "取消",
                            // autoClose: true,
                            noCloseBtn: true,
                            backgroundClose: false,
                            noOnClick: (e) => {
                                globalContextService.remove("LayoutPage", "NewPassword")
                                globalContextService.remove("LayoutPage", "ConfirmPwd")
                            },
                            yesOnClick: (e, close) => {
                                //#region 表單驗證
                                if (passWordVerify()) {
                                    changePassWord({
                                        account: getParseItemLocalStorage("DriverAccount"), // 帳號
                                        passWord: globalContextService.get("LayoutPage", "NewPassword"), // 新密碼
                                    })
                                    close();
                                }
                                //#endregion
                            },
                            closeIconOnClick: (e) => {
                                globalContextService.remove("LayoutPage", "NewPassword")
                                globalContextService.remove("LayoutPage", "ConfirmPwd")
                            },
                            content: (
                                <FormContainer
                                    baseDefaultTheme={"DefaultTheme"}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                    }}
                                    theme={layout.editPwdFormContainer}
                                >
                                    <FormRow baseDefaultTheme={"DefaultTheme"}>

                                        {/* 修改密碼提示文字 */}
                                        < Text
                                            theme={layout.editPwdTip}
                                        >
                                            8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。
                                        </Text>

                                        {/* 新密碼 NewPwd */}
                                        <TextInput
                                            topLabel={<>新密碼</>}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="password"
                                            placeholder={"請輸入新密碼"}
                                            leftIcon={
                                                <Lock
                                                    style={layout.pwdLeftIcon}
                                                />
                                            }
                                            openEye
                                            value={globalContextService.get("LayoutPage", "NewPassword") ?? props.Client?.name}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("LayoutPage", "NewPassword", value);
                                            }}
                                            theme={layout.newPwd}
                                        />

                                        {/* 確認新密碼 ConfirmPwd */}
                                        <TextInput
                                            topLabel={<>確認新密碼</>}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="password"
                                            placeholder={"請輸入新密碼"}
                                            leftIcon={
                                                <Lock
                                                    style={layout.pwdLeftIcon}
                                                />
                                            }
                                            openEye
                                            value={globalContextService.get("LayoutPage", "ConfirmPwd") ?? props.Client?.name}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("LayoutPage", "ConfirmPwd", value);
                                            }}
                                            theme={layout.confirmPwd}
                                        />

                                    </FormRow>
                                </FormContainer>
                            ),
                            theme: layout.editPwdModal
                        })
                    }

                    {getParseItemLocalStorage("DriverAccountStatus") === "ThreeMonth" &&

                        modalsService.titleModal.normal({
                            //id: "top1",
                            title: "三個月未修改密碼，請設定新密碼",
                            yes: true,
                            yesText: "確認",
                            // no: true,
                            // noText: "取消",
                            // autoClose: true,
                            noCloseBtn: true,
                            backgroundClose: false,
                            noOnClick: (e) => {
                                globalContextService.remove("LayoutPage", "NewPassword")
                                globalContextService.remove("LayoutPage", "ConfirmPwd")
                            },
                            yesOnClick: (e, close) => {
                                //#region 表單驗證
                                if (passWordVerify()) {
                                    changePassWord({
                                        account: getParseItemLocalStorage("DriverAccount"), // 帳號
                                        passWord: globalContextService.get("LayoutPage", "NewPassword"), // 新密碼
                                    })
                                    close();
                                }
                                //#endregion
                            },
                            closeIconOnClick: (e) => {
                                globalContextService.remove("LayoutPage", "NewPassword")
                                globalContextService.remove("LayoutPage", "ConfirmPwd")
                            },
                            content: (
                                <FormContainer
                                    baseDefaultTheme={"DefaultTheme"}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                    }}
                                    theme={layout.editPwdFormContainer}
                                >
                                    <FormRow baseDefaultTheme={"DefaultTheme"}>

                                        {/* 修改密碼提示文字 */}
                                        < Text
                                            theme={layout.editPwdTip}
                                        >
                                            8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。
                                        </Text>

                                        {/* 新密碼 NewPwd */}
                                        <TextInput
                                            topLabel={<>新密碼</>}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="password"
                                            placeholder={"請輸入新密碼"}
                                            leftIcon={
                                                <Lock
                                                    style={layout.pwdLeftIcon}
                                                />
                                            }
                                            openEye
                                            value={globalContextService.get("LayoutPage", "NewPassword") ?? props.Client?.name}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("LayoutPage", "NewPassword", value);
                                            }}
                                            theme={layout.newPwd}
                                        />

                                        {/* 確認新密碼 ConfirmPwd */}
                                        <TextInput
                                            topLabel={<>確認新密碼</>}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="password"
                                            placeholder={"請輸入新密碼"}
                                            leftIcon={
                                                <Lock
                                                    style={layout.pwdLeftIcon}
                                                />
                                            }
                                            openEye
                                            value={globalContextService.get("LayoutPage", "ConfirmPwd") ?? props.Client?.name}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("LayoutPage", "ConfirmPwd", value);
                                            }}
                                            theme={layout.confirmPwd}
                                        />

                                    </FormRow>
                                </FormContainer>
                            ),
                            theme: layout.editPwdModal
                        })
                    }
                </BasicContainer>

                {/* Menu區 MobileM */}
                <ScrollBar
                    basedefaulttheme={"DefaultTheme"}
                    className={`collapseMenuAreaScrollBar`}
                    autoHide={true}
                    theme={layout.menuAreaScrollBarMobileM}
                >
                    <BasicContainer
                        {...props.logoAreaEvent}
                        className={`collapseMenuArea`}
                        baseDefaultTheme={"BasicContainerDefaultTheme"}
                        theme={layout.menuArea}
                    >
                        {/* 在這裡遍歷MenuItem */}
                        {generateMenu([
                            {
                                children: [],
                                item: {
                                    id: "79124b7c-12ca-4ce6-802e-15ee192aac5b",
                                    name: "今日任務",
                                    parentId: null,
                                    parentName: "根節點",
                                    sortNo: 3,
                                    status: 0,
                                    url: "/TodayTask",
                                }
                            },
                            {
                                children: [],
                                item: {
                                    id: "77777777-33ca-6cc6-802e-16ee172aaaaa",
                                    name: "任務歷程",
                                    parentId: null,
                                    parentName: "根節點",
                                    sortNo: 3,
                                    status: 0,
                                    url: "/TaskHistory",
                                }
                            },
                            {
                                children: [],
                                item: {
                                    id: "77777777-33ca-6cc6-802e-16ee172aazzz",
                                    name: "收入列表",
                                    parentId: null,
                                    parentName: "根節點",
                                    sortNo: 3,
                                    status: 0,
                                    url: "/Income",
                                }
                            },
                            {
                                children: [],
                                item: {
                                    id: "77777777-339a-1cc6-802e-16ee172aazzz",
                                    name: "打卡紀錄",
                                    parentId: null,
                                    parentName: "根節點",
                                    sortNo: 3,
                                    status: 0,
                                    url: "/HitCardList",
                                }
                            },
                            {
                                children: [],
                                item: {
                                    id: "77777777-33ca-6cc6-802e-16ee172aaabbb",
                                    name: "聯繫行控",
                                    parentId: null,
                                    parentName: "根節點",
                                    sortNo: 3,
                                    status: 0,
                                    url: "/Contact",
                                }
                            },
                            {
                                children: [],
                                item: {
                                    id: "77777777-33ca-6cc6-802e-16ee172aaaccc",
                                    name: "司機學院",
                                    parentId: null,
                                    parentName: "根節點",
                                    sortNo: 3,
                                    status: 0,
                                    url: "/School",
                                }
                            },
                            {
                                children: [],
                                item: {
                                    id: "77777777-33ca-6cc6-802e-16ee172aaaddd",
                                    name: "每日檢查",
                                    parentId: null,
                                    parentName: "根節點",
                                    sortNo: 3,
                                    status: 0,
                                    url: "/DayCheck",
                                }
                            },
                        ], history, location, ExpandMenuName, setExpandMenuName, setDrawerCollapse, true)}

                    </BasicContainer>
                </ScrollBar>
            </LeftSideDrawer>
        </>
    )
}

//#region 產生寬版左側欄內容
const generateMenu = (menuData, history, location, ExpandMenuName, setExpandMenuName, setDrawerCollapse, widthLessThan1024 = false) => {
    // console.log(menuData)
    let vdom = [];

    if (menuData instanceof Array) {
        // 如果 menuData 是陣列，則對每一個 item 遞迴一次，並將它放入容器中
        let list = [];
        for (var item of menuData) {
            list.push(generateMenu(item, history, location, ExpandMenuName, setExpandMenuName, setDrawerCollapse, widthLessThan1024));
        }

        if (list.length > 0) {
            for (var item1 of list) {
                vdom.push(item1);
            }
            // vdom.push(
            //     <BasicContainer key="single" disable={false}>{list}</BasicContainer>
            // );
        }

    } else {
        // 如果 menuData 不是陣列
        vdom.push(
            <BasicContainer
                key={menuData.item.id}
                baseDeafultTheme={"DefaultTheme"}
                theme={{
                    basic: (style, props) => ({
                        ...style,
                        overflow: "hidden",
                        transition: "max-height .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
                        maxHeight: ExpandMenuName.includes(menuData.item.name) ? `${(menuData.children.length + 1) * 40}px` : "40px",
                    })
                }}
            >
                {/* 左側欄項目容器 */}
                <Text
                    key={menuData.item.id}
                    baseDeafultTheme={"DefaultTheme"}
                    theme={{
                        basic: (style, props) => {
                            return {
                                ...style,
                                padding: `0 0 0 50px`,
                                height: "40px",
                                width: "100%",
                                // margin: "8px 0px",
                                color: " #000000",
                                fontSize: "14px",
                                lineHeight: "40px",
                                cursor: "pointer",
                                userSelect: "none",
                                borderBottom: "1px solid rgba(216,216,216,1)",
                                //#region 被選中的左側欄項目樣式
                                ...(
                                    // 處理進入子頁面如新增、修改等，標記於父層路由標籤 Functions
                                    (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                        //進入子頁面路由
                                        (removeTailUrl(location.pathname) === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                        {
                                            background: "#e6f7ff",
                                            boxShadow: "inset -3px 0px 0px #1890ff",
                                            color: " #1890ff"
                                        }
                                        :
                                        //進入一般分頁
                                        (location.pathname === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                        {
                                            background: "#e6f7ff",
                                            boxShadow: "inset -3px 0px 0px #1890ff",
                                            color: " #1890ff"
                                        }
                                ),
                                //#endregion

                                //#region 被選中的左側欄父層項目樣式
                                ...(
                                    // 處理進入子頁面如新增、修改等，標記於父層路由標籤 Functions
                                    (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                        //進入子頁面路由
                                        (
                                            (
                                                getParseItemLocalStorage("MenuNameAndSubUrl")?.[menuData.item.name] ?? []
                                            ).includes(removeTailUrl(location.pathname)) && menuData.item.url.trim() === "/") &&
                                        {
                                            color: " #1890ff"
                                        }
                                        :
                                        //進入一般分頁
                                        (
                                            (
                                                getParseItemLocalStorage("MenuNameAndSubUrl")?.[menuData.item.name] ?? []
                                            ).includes(location.pathname) && menuData.item.url.trim() === "/") &&
                                        {
                                            color: " #1890ff"
                                        }

                                ),
                                //#endregion
                            }
                        },
                        hover: (style, props) => ({
                            ...style,
                            color: " #1890ff"
                        })
                    }}
                    onClick={() => {
                        if (menuData.item.url.trim() !== "/") {
                            // 若是次層目錄，則跳轉路由 
                            if (location.pathname !== menuData.item.url.trim()) {//(路由不變不跳轉)
                                pushAndNotExsistItemSession("Dtab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                // console.log(widthLessThan1024)
                                widthLessThan1024 && setDrawerCollapse(true);
                                history.push(menuData.item.url.trim())
                            }

                            //#region 處理最上層就是分頁時 點擊了 要把其他展開的的收起來
                            if (menuData.item.parentName.trim() === "根節點") {
                                setExpandMenuName(e => {
                                    //#region 處理當前應被標記與開啟的父層
                                    let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                    let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                    let res = [];
                                    let clickItem = menuNameAndSubUrl[menuData.item.name]; // 所點擊項目所包含的所有路由

                                    keys.forEach(
                                        (item) => {
                                            if (menuNameAndSubUrl[item].containAll(clickItem)) {
                                                res = [...res, item]
                                            }
                                        }
                                    )

                                    if (res.length === 0) {
                                        return [...res, menuData.item.name]
                                    }
                                    else {
                                        return [...res]
                                    }
                                    //#endregion
                                })
                            }
                            //#endregion

                        } else {
                            // 若是父層則伸縮側邊欄項目
                            setExpandMenuName(e => {
                                //#region 處理當前應被標記與開啟的父層
                                let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                let res = [];
                                let clickItem = menuNameAndSubUrl[menuData.item.name]; // 所點擊項目所包含的所有路由

                                keys.forEach(
                                    (item) => {
                                        if (menuNameAndSubUrl[item].containAll(clickItem)) {
                                            res = [...res, item]
                                        }
                                    }
                                )

                                if (res.length === 0) {
                                    return [...res, menuData.item.name]
                                }
                                else {
                                    return [...res]
                                }
                                //#endregion
                            })
                        }
                    }}
                >
                    {/* 若為最上層則給對應 name 的 icon 圖標 */}
                    {menuData.item.url.trim() === "/" &&
                        iconMap[menuData.item.name] &&
                        iconMap[menuData.item.name]({
                            position: "absolute",
                            left: "24px",
                            height: "100%"
                        })
                    }

                    {/* 若為最上層則給對應 name 的 icon 圖標 (最上層即功能頁的情況) */}
                    {(menuData.item.parentName.trim() === "根節點" && menuData.item.url.trim() !== "/") &&
                        iconMap[menuData.item.name] &&
                        iconMap[menuData.item.name]({
                            position: "absolute",
                            left: "24px",
                            height: "100%"
                        })
                    }

                    {/* 左側欄項目名稱 */}
                    {menuData.item.name}
                    {/* {menuData.item.url} */}

                    {/* 若為最上層則給 展開的 icon 圖標 */}
                    {menuData.item.url.trim() === "/" &&
                        <ArrowUp
                            style={{
                                position: "absolute",
                                right: "24px",
                                height: "100%"
                            }}
                        />
                    }
                </Text>
                {generateMenu(menuData.children, history, location, ExpandMenuName, setExpandMenuName, setDrawerCollapse, widthLessThan1024)
                }
            </BasicContainer >
        );
    }
    return vdom;
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

//#region 產生窄版左側欄內容
const generateThinMenu = (menuData, history, location, ExpandMenuName, setExpandMenuName, IsHoverMenuName, setIsHoverMenuName, level = 1, fatherName) => {
    // console.log(menuData)
    let vdom = [];

    if (menuData instanceof Array) {
        // 如果 menuData 是陣列，則對每一個 item 遞迴一次，並將它放入容器中
        let list = [];
        for (var item of menuData) {
            if (level === 1) {
                list.push(generateThinMenu(item, history, location, ExpandMenuName, setExpandMenuName, IsHoverMenuName, setIsHoverMenuName, level));
            } else {
                list.push(generateThinMenu(item, history, location, ExpandMenuName, setExpandMenuName, IsHoverMenuName, setIsHoverMenuName, level + 1));
            }
        }

        if (list.length > 0) {
            // for (var item1 of list) {
            //     vdom.push(item1);
            // }
            if (level === 1) {
                vdom.push(
                    <BasicContainer key="single" name="頂層容器" >{list}</BasicContainer>
                );
            }
            else {
                vdom.push(
                    <BasicContainer
                        key="single"
                        name="子級容器"
                        theme={{
                            basic: (style, props) => ({
                                ...style,
                                position: "fixed",
                                width: "240px",
                                left: "56px",
                                overflow: "hidden",
                                backgroundColor: "#fff",
                                boxShadow: "0px 9px 28px rgba(0, 0, 0, 0.05), 0px 3px 6px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08)",
                                //transition: "max-height .7s cubic-bezier(0.075, 0.82, 0.165, 1), opacity .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
                                transition: "all .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
                                // maxHeight: (IsHoverMenuName && ExpandMenuName.includes(fatherName)) ? `${(list.length) * 40 + 16}px` : "0px",
                                // opacity: (IsHoverMenuName && ExpandMenuName.includes(fatherName)) ? "1" : "0",
                                // padding: (IsHoverMenuName && ExpandMenuName.includes(fatherName)) ? "8px 0px" : "0",
                                maxHeight: (IsHoverMenuName.includes(fatherName)) ? `${(list.length) * 40 + 16}px` : "0px",
                                opacity: (IsHoverMenuName.includes(fatherName)) ? "1" : "0",
                                padding: (IsHoverMenuName.includes(fatherName)) ? "8px 0px" : "0",
                                zIndex: 1
                            })
                        }}
                        onMouseEnter={() => {
                            // setIsHoverMenuName(true);

                            // 若是父層則伸縮側邊欄項目
                            setIsHoverMenuName(e => {
                                //#region 處理當前應被標記與開啟的父層
                                let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                let res = [];
                                let clickItem = menuNameAndSubUrl[fatherName]; // 所點擊項目所包含的所有路由

                                keys.forEach(
                                    (item) => {
                                        if (menuNameAndSubUrl[item].containAll(clickItem)) {
                                            res = [...res, item]
                                        }
                                    }
                                )

                                if (res.length === 0) {
                                    return [...res, fatherName]
                                }
                                else {
                                    return [...res]
                                }
                                //#endregion
                            })
                        }}
                        onMouseLeave={() => {
                            setIsHoverMenuName([])
                        }}
                    >
                        {list}
                    </BasicContainer>
                );
            }

        }

    } else {
        // 如果 menuData 不是陣列
        // !! 因應第一層只有Icon的情況所以拆開來做， 依 level 判斷目前是第幾層 1 為最頂層
        if (level === 1) {
            //#region 最頂層的情況
            vdom.push(
                <BasicContainer
                    key={menuData.item.id}
                    baseDeafultTheme={"DefaultTheme"}
                    theme={{
                        basic: (style, props) => ({
                            ...style,
                            width: "100%",
                            height: "40px",
                            //overflow: "hidden",// WhiteBlock
                            //transition: "max-height .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
                            //maxHeight: ExpandMenuName.includes(menuData.item.name) ? `${(menuData.children.length + 1) * 40}px` : "40px",
                        })
                    }}
                >
                    <Tooltip placement="right" title={menuData.item.name} >
                        {/* 左側欄項目容器 */}
                        <Text
                            key={menuData.item.id}
                            baseDeafultTheme={"DefaultTheme"}
                            theme={{
                                basic: (style, props) => {
                                    return {
                                        ...style,
                                        padding: `0 0 0 50px`,
                                        height: "40px",
                                        width: "100%",
                                        // margin: "8px 0px",
                                        color: " #000000",
                                        fontSize: "14px",
                                        lineHeight: "40px",
                                        cursor: "pointer",
                                        userSelect: "none",
                                        //#region 被選中的左側欄項目樣式
                                        ...(
                                            // 處理進入子頁面如新增、修改等，標記於父層路由標籤 Functions
                                            (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                                //進入子頁面路由
                                                (removeTailUrl(location.pathname) === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                                {
                                                    background: "#e6f7ff",
                                                    boxShadow: "inset -3px 0px 0px #1890ff",
                                                    color: " #1890ff"
                                                }
                                                :
                                                //進入一般分頁
                                                (location.pathname === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                                {
                                                    background: "#e6f7ff",
                                                    boxShadow: "inset -3px 0px 0px #1890ff",
                                                    color: " #1890ff"
                                                }
                                        ),
                                        //#endregion

                                        //#region 被選中的左側欄父層項目樣式
                                        ...(
                                            // 處理進入子頁面如新增、修改等，標記於父層路由標籤 Functions
                                            (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                                //進入子頁面路由
                                                (
                                                    (
                                                        getParseItemLocalStorage("MenuNameAndSubUrl")[menuData.item.name] ?? []
                                                    ).includes(removeTailUrl(location.pathname)) && menuData.item.url.trim() === "/") &&
                                                {
                                                    color: " #1890ff"
                                                }
                                                :
                                                //進入一般分頁
                                                (
                                                    (
                                                        getParseItemLocalStorage("MenuNameAndSubUrl")[menuData.item.name] ?? []
                                                    ).includes(location.pathname) && menuData.item.url.trim() === "/") &&
                                                {
                                                    color: " #1890ff"
                                                }

                                        ),
                                        //#endregion

                                    }
                                },
                                hover: (style, props) => ({
                                    ...style,
                                    color: " #1890ff"
                                })
                            }}
                            onClick={() => {
                                if (menuData.item.url.trim() !== "/") {
                                    // 若是次層目錄，則跳轉路由
                                    if (location.pathname !== menuData.item.url.trim()) {//(路由不變不跳轉)
                                        pushAndNotExsistItemSession("Dtab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                        history.push(menuData.item.url.trim())
                                    }
                                } else {
                                    // 若是父層則伸縮側邊欄項目
                                    setExpandMenuName(e => {
                                        //#region 處理當前應被標記與開啟的父層
                                        let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                        let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                        let res = [];
                                        let clickItem = menuNameAndSubUrl[menuData.item.name]; // 所點擊項目所包含的所有路由

                                        keys.forEach(
                                            (item) => {
                                                if (menuNameAndSubUrl[item].containAll(clickItem)) {
                                                    res = [...res, item]
                                                }
                                            }
                                        )

                                        if (res.length === 0) {
                                            return [...res, menuData.item.name]
                                        }
                                        else {
                                            return [...res]
                                        }
                                        //#endregion
                                    })
                                }
                            }}
                            onMouseEnter={() => {
                                // setIsHoverMenuName(true);
                                // if (menuData.item.url.trim() !== "/") {
                                //     // 若是次層目錄，則跳轉路由
                                //     pushAndNotExsistItemSession("Dtab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                //     history.push(menuData.item.url.trim())
                                // } else 

                                if (menuData.item.url.trim() === "/") {
                                    // 若是父層則伸縮側邊欄項目
                                    setIsHoverMenuName(e => {
                                        //#region 處理當前應被標記與開啟的父層
                                        let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                        let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                        let res = [];
                                        let clickItem = menuNameAndSubUrl[menuData.item.name]; // 所點擊項目所包含的所有路由

                                        keys.forEach(
                                            (item) => {
                                                if (menuNameAndSubUrl[item].containAll(clickItem)) {
                                                    res = [...res, item]
                                                }
                                            }
                                        )

                                        if (res.length === 0) {
                                            return [...res, menuData.item.name]
                                        }
                                        else {
                                            return [...res]
                                        }
                                        //#endregion
                                    })
                                }
                            }}
                            onMouseLeave={() => {
                                setIsHoverMenuName([])
                            }}
                        >
                            {/* 若為最上層則給對應 name 的 icon 圖標 */}
                            {menuData.item.url.trim() === "/" &&
                                iconMap[menuData.item.name] ?
                                iconMap[menuData.item.name]({
                                    position: "absolute",
                                    left: "24px",
                                    height: "100%"
                                })
                                :
                                !(menuData.item.parentName.trim() === "根節點" && menuData.item.url.trim() !== "/") &&
                                <WhiteBlock style={{
                                    position: "absolute",
                                    left: "24px",
                                    height: "100%"
                                }} />
                            }

                            {/* 若為最上層則給對應 name 的 icon 圖標 (最上層即功能頁的情況) */}
                            {(menuData.item.parentName.trim() === "根節點" && menuData.item.url.trim() !== "/") &&
                                iconMap[menuData.item.name] &&
                                iconMap[menuData.item.name]({
                                    position: "absolute",
                                    left: "24px",
                                    height: "100%"
                                })
                            }

                        </Text>
                    </Tooltip>
                    {generateThinMenu(menuData.children, history, location, ExpandMenuName, setExpandMenuName, IsHoverMenuName, setIsHoverMenuName, level + 1, menuData.item.name)}
                </BasicContainer >
            );

            //#endregion
        }
        else {
            //#region 不是最頂層的情況
            vdom.push(
                <BasicContainer name="正在看"
                    key={menuData.item.id}
                    baseDeafultTheme={"DefaultTheme"}
                    theme={{
                        basic: (style, props) => ({
                            ...style,
                            overflow: "hidden",
                            transition: "max-height .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
                            // maxHeight: ExpandMenuName.includes(menuData.item.name) ? `${(menuData.children.length + 1) * 40}px` : "40px",
                        })
                    }}
                >
                    {/* 左側欄項目容器 */}
                    <Text
                        key={menuData.item.id}
                        baseDeafultTheme={"DefaultTheme"}
                        theme={{
                            basic: (style, props) => {
                                return {
                                    ...style,
                                    padding: `0 0 0 8px`,
                                    height: "40px",
                                    width: "100%",
                                    // margin: "8px 0px",
                                    color: " #000000",
                                    fontSize: "14px",
                                    lineHeight: "40px",
                                    cursor: "pointer",
                                    userSelect: "none",
                                    //#region 被選中的左側欄項目樣式
                                    ...(
                                        // 處理進入子頁面如新增、修改等，標記於父層路由標籤 Functions
                                        (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                            //進入子頁面路由
                                            (removeTailUrl(location.pathname) === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                            {
                                                background: "#e6f7ff",
                                                boxShadow: "inset -3px 0px 0px #1890ff",
                                                color: " #1890ff"
                                            }
                                            :
                                            //進入一般分頁
                                            (location.pathname === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                            {
                                                background: "#e6f7ff",
                                                boxShadow: "inset -3px 0px 0px #1890ff",
                                                color: " #1890ff"
                                            }
                                    ),
                                    //#endregion

                                    //#region 被選中的左側欄父層項目樣式
                                    ...(
                                        // 處理進入子頁面如新增、修改等，標記於父層路由標籤 Functions
                                        (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                            //進入子頁面路由
                                            (
                                                (
                                                    getParseItemLocalStorage("MenuNameAndSubUrl")[menuData.item.name] ?? []
                                                ).includes(removeTailUrl(location.pathname)) && menuData.item.url.trim() === "/") &&
                                            {
                                                color: " #1890ff"
                                            }
                                            :
                                            //進入一般分頁
                                            (
                                                (
                                                    getParseItemLocalStorage("MenuNameAndSubUrl")[menuData.item.name] ?? []
                                                ).includes(location.pathname) && menuData.item.url.trim() === "/") &&
                                            {
                                                color: " #1890ff"
                                            }

                                    ),
                                    //#endregion

                                }
                            },
                            hover: (style, props) => ({
                                ...style,
                                color: " #1890ff"
                            })
                        }}
                        onClick={() => {
                            if (menuData.item.url.trim() !== "/") {
                                // 若是次層目錄，則跳轉路由
                                if (location.pathname !== menuData.item.url.trim()) {//(路由不變不跳轉)
                                    pushAndNotExsistItemSession("Dtab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                    history.push(menuData.item.url.trim())
                                }
                                setIsHoverMenuName([])// 點擊具路由分頁後關閉分頁框

                            } else {
                                // 若是父層則伸縮側邊欄項目
                                setExpandMenuName(e => {
                                    //#region 處理當前應被標記與開啟的父層
                                    let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                    let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                    let res = [];
                                    let clickItem = menuNameAndSubUrl[menuData.item.name]; // 所點擊項目所包含的所有路由

                                    keys.forEach(
                                        (item) => {
                                            if (menuNameAndSubUrl[item].containAll(clickItem)) {
                                                res = [...res, item]
                                            }
                                        }
                                    )

                                    if (res.length === 0) {
                                        return [...res, menuData.item.name]
                                    }
                                    else {
                                        return [...res]
                                    }
                                    //#endregion
                                })
                            }
                        }}
                        onMouseEnter={() => {
                            // 若是父層則伸縮側邊欄項目
                            if (menuData.item.url.trim() === "/") {
                                setIsHoverMenuName(e => {
                                    //#region 處理當前應被標記與開啟的父層
                                    let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                    let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                    let res = [];
                                    let clickItem = menuNameAndSubUrl[menuData.item.name]; // 所點擊項目所包含的所有路由

                                    keys.forEach(
                                        (item) => {
                                            if (menuNameAndSubUrl[item].containAll(clickItem)) {
                                                res = [...res, item]
                                            }
                                        }
                                    )

                                    if (res.length === 0) {
                                        return [...res, menuData.item.name]
                                    }
                                    else {
                                        return [...res]
                                    }
                                    //#endregion
                                })
                            }
                        }}
                        onMouseLeave={() => {
                            // console.log(IsHoverMenuName)
                            setIsHoverMenuName(i => {
                                i.shift();
                                return i;
                            })
                        }}
                    >
                        {/* 若為最上層則給對應 name 的 icon 圖標 */}
                        {menuData.item.url.trim() === "/" &&
                            iconMap[menuData.item.name] &&
                            iconMap[menuData.item.name]({
                                position: "absolute",
                                left: "24px",
                                height: "100%"
                            })
                        }

                        {/* 左側欄項目名稱 */}
                        {menuData.item.name}
                        {/* {menuData.item.url} */}

                        {/* 若為最上層則給 展開的 icon 圖標 */}
                        {menuData.item.url.trim() === "/" &&
                            <ArrowUp
                                style={{
                                    position: "absolute",
                                    right: "24px",
                                    height: "100%",
                                    transform: "rotate(90deg)"
                                }}
                            />
                        }
                    </Text>
                    {generateThinMenu(menuData.children, history, location, ExpandMenuName, setExpandMenuName, IsHoverMenuName, setIsHoverMenuName, level + 1, menuData.item.name)}
                </BasicContainer >
            );
            //#endregion
        }
    }
    return vdom;
}
//#endregion