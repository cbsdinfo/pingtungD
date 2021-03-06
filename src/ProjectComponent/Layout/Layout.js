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

import { getParseItemLocalStorage, setStringifyItemSession, pushAndNotExsistItemSession, getParseItemSession, removeByKeyItemSession, clearLogoutLocalStorage, clearLogoutSession, setStringifyItemLocalStorage, valid } from '../../Handlers';
import { iconMap, pageTabBarUrlMapping, pageTextUrlMapping } from '../../Mappings/Mappings'
import { useHistory, useLocation } from 'react-router-dom';
import { isNil } from 'lodash';
import { TitleBar } from '../TitleBar/TitleBar';
import isEqual from 'lodash/isEqual';

export const Layout = (props) => {
    const [NeedHover, setNeedHover] = useState(false); // DropDown ???????????????hover
    const [width] = useWindowSize();

    const { Collapse, APIFileUrl, setCollapse, DrawerCollapse, setDrawerCollapse, Theme, Switch, APIUrl } = useContext(Context);
    const { layout } = Theme;
    let history = useHistory();
    let location = useLocation();

    const [ExpandMenuName, setExpandMenuName] = useState([]); // ?????????????????????
    const [IsHoverMenuName, setIsHoverMenuName] = useState([]); // ?????????????????????

    if (!getParseItemLocalStorage("DMenuNameAndSubUrl")) {
        setStringifyItemLocalStorage("DMenuNameAndSubUrl",
            {
                "????????????": ["/Contact"],
                "????????????": ["/QAndA"]
            })
    }

    useEffect(() => {
        //#region ????????????????????????????????????
        // console.log(getParseItemSession("Dtab"))
        if (isNil(getParseItemSession("Dtab")) || (getParseItemSession("Dtab") ?? []).length === 0) {
            setStringifyItemSession("Dtab", [{ title: "??????", path: "/" }])
        }
        //#endregion
    })

    useEffect(() => {
        // setStringifyItemSession("Dtab", [{ title: "???????????????", path: "/xxx/yyy" }, { title: "???????????????", path: "/aaa/bbb" }, { title: "???????????????c", path: "/aaa/ccc" },
        // { title: "???????????????", path: "/aaa/111" }, { title: "???????????????", path: "/aaa/333" }, { title: "???????????????c", path: "/aaa/555" },
        // { title: "???????????????", path: "/aaa/222" }, { title: "???????????????", path: "/aaa/444" }, { title: "???????????????c", path: "/aaa/666" }])

        //#region ????????????????????????????????????
        // console.log(getParseItemSession("Dtab"))
        // if (isNil(getParseItemSession("Dtab")) || (getParseItemSession("Dtab") ?? []).length === 0) {
        //     setStringifyItemSession("Dtab", [{ title: "??????", path: "/" }])
        // }
        //#endregion

        //#region ?????????????????????????????????????????? ?????? ?????????????????????????????????
        // !! ?????? ?????????????????? pageTabBarUrlMapping ?????????????????? 
        let historyOpenTab = (getParseItemSession("Dtab") ?? []).map((item => item.path))
        if ((!historyOpenTab.includes(location.pathname) && pageTabBarUrlMapping[location.pathname])) {
            pushAndNotExsistItemSession("Dtab", "path", location.pathname, { title: pageTabBarUrlMapping[location.pathname], path: location.pathname })
        }
        //#endregion

        //#region ??????????????????????????????????????????
        let canUseFunctions = getParseItemLocalStorage("Functions") ?? []
        let menuNameAndSubUrl = getParseItemLocalStorage("DMenuNameAndSubUrl")
        let keys = Object.keys(getParseItemLocalStorage("DMenuNameAndSubUrl") ?? []) ?? []
        let res = [];

        //#region ???????????????????????????????????????????????????????????????????????? Functions
        if (canUseFunctions.includes(location.pathname)) {
            //?????????????????????
            let totalLength = location.pathname.length;
            let split = location.pathname.split("/")
            let howManyToRemove = [...split[split.length - 1]].length + 1;
            let pathnameRes = location.pathname.substring(0, totalLength - howManyToRemove);// ??????????????? ????????? ????????????

            keys.forEach(
                (item) => {
                    if (menuNameAndSubUrl[item].includes(pathnameRes)) {
                        res = [...res, item]
                    }
                }
            )
        }
        else {
            //??????????????????
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

    }, [Collapse]) // ????????????????????????????????? ????????? ?????? ??????????????????????????? ??????????????? ??????

    if (localStorage.getItem("DAuth") === null) {
        // return null
    }

    const TabMapping = (key) => {
        // ????????????  News
        // ????????????  CallCar
        // ????????????  FastCallCar
        // ????????????  Record
        // ????????????  UserInfo
        // ????????????  Contact
        // ????????????  QAndA
        switch (key) {
            case "allTabNameLaptopL":
                return [
                    { path: "/News", name: "????????????", icon: <NewsTab style={layout.titleBarTabIconLaptopL} /> },
                    {
                        path: "/CallCar", name: "????????????", icon: <CallCarTab style={layout.titleBarTabIconLaptopL} />,
                        dropDown: [
                            { path: "/CallCar", name: "????????????" },
                            { path: "/FastCallCar", name: "????????????" },
                        ]
                    },
                    { path: "/BusRoute", name: "????????????", icon: <BusRouteTab style={layout.titleBarTabIconLaptopL} /> },
                    { path: "/Record", name: "????????????", icon: <RecordTab style={layout.titleBarTabIconLaptopL} /> },
                    { path: "/UserInfo", name: "????????????", icon: <UserInfoTab style={layout.titleBarTabIconLaptopL} /> },
                    { path: "/Contact", name: "????????????", icon: <ContactTab style={layout.titleBarTabIconLaptopL} /> },
                    { path: "/QAndA", name: "????????????", icon: <QAndATab style={layout.titleBarTabIconLaptopL} /> },
                ]
            case "allTabNameLaptop":
                return [
                    { path: "/News", name: "????????????", icon: <NewsTab style={layout.titleBarTabIconLaptop} /> },
                    {
                        path: "/CallCar", name: "????????????", icon: <CallCarTab style={layout.titleBarTabIconLaptop} />,
                        dropDown: [
                            { path: "/CallCar", name: "????????????" },
                            { path: "/FastCallCar", name: "????????????" },
                        ]
                    },
                    { path: "/BusRoute", name: "????????????", icon: <BusRouteTab style={layout.titleBarTabIconLaptop} /> },
                    { path: "/Record", name: "????????????", icon: <RecordTab style={layout.titleBarTabIconLaptop} /> },
                    { path: "/UserInfo", name: "????????????", icon: <UserInfoTab style={layout.titleBarTabIconLaptop} /> },
                    { path: "/Contact", name: "????????????", icon: <ContactTab style={layout.titleBarTabIconLaptop} /> },
                    { path: "/QAndA", name: "????????????", icon: <QAndATab style={layout.titleBarTabIconLaptop} /> },
                ]
            case "allTabNameTablet":
                return [
                    { path: "/News", name: "????????????", icon: <NewsTab style={layout.titleBarTabIconTablet} /> },
                    {
                        path: "/CallCar", name: "????????????", icon: <CallCarTab style={layout.titleBarTabIconTablet} />,
                        dropDown: [
                            { path: "/CallCar", name: "????????????" },
                            { path: "/FastCallCar", name: "????????????" },
                        ]
                    },
                    { path: "/BusRoute", name: "????????????", icon: <BusRouteTab style={layout.titleBarTabIconTablet} /> },
                    { path: "/Record", name: "????????????", icon: <RecordTab style={layout.titleBarTabIconTablet} /> },
                    { path: "/UserInfo", name: "????????????", icon: <UserInfoTab style={layout.titleBarTabIconTablet} /> },
                    { path: "/Contact", name: "????????????", icon: <ContactTab style={layout.titleBarTabIconTablet} /> },
                    { path: "/QAndA", name: "????????????", icon: <QAndATab style={layout.titleBarTabIconTablet} /> },
                ]
            case "allTabNameMobileMLeftSide":
                return [
                    { path: "/Contact", name: "????????????", icon: <ContactTab style={layout.titleBarTabIconMobileM} /> },
                    { path: "/QAndA", name: "????????????", icon: <QAndATab style={layout.titleBarTabIconMobileM} /> },
                ]
            case "allTabNameMobileMFixBottom":
                return [
                    { path: "/News", name: "????????????", icon: <NewsTab style={layout.titleBarTabIconMobileM} /> },
                    { path: "/CallCar", name: "????????????", icon: <CallCarTab style={layout.titleBarTabIconMobileM} /> },
                    { path: "/BusRoute", name: "????????????", icon: <BusRouteTab style={layout.titleBarTabIconMobileM} /> },
                    { path: "/Record", name: "????????????", icon: <RecordTab style={layout.titleBarTabIconMobileM} /> },
                    { path: "/UserInfo", name: "????????????", icon: <UserInfoTab style={layout.titleBarTabIconMobileM} /> },
                ]
            default:
                break;
        }
    }

    //????????????
    const passWordVerify = () => {
        let validMsg = ""
        if (valid(globalContextService.get("LayoutPage", "NewPassword") ?? "", ["^.{1,}$", "^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,}$"], ["??????????????????", "?????????????????????8??????????????????????????????????????????????????????????????????4???3???"])[1]) {
            validMsg = valid(globalContextService.get("LayoutPage", "NewPassword") ?? "", ["^.{1,}$", "^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,}$"], ["??????????????????", "?????????????????????8??????????????????????????????????????????????????????????????????4???3???"])[1]
        }
        else if (!isEqual(globalContextService.get("LayoutPage", "NewPassword"), globalContextService.get("LayoutPage", "ConfirmPwd"))) {
            validMsg = "???????????????????????????????????????"
        }

        if (validMsg !== "") {
            modalsService.infoModal.error({
                id: "top1", //?????? ?????????????????????id
                iconRightText: validMsg,
                yes: true,
                yesText: "??????",
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
        //#region ?????????????????? (???????????????)
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
                    // ?????? ???????????? API 

                    //???????????????????????????
                    clearLogoutSession();
                    clearLogoutLocalStorage();
                    globalContextService.clear();

                    modalsService.infoModal.success({
                        iconRightText: "????????????????????????????????????",
                        yes: true,
                        yesText: "??????",
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
                    iconRightText: Error.code === 401 ? "??????????????????" : Error.message,
                    yes: true,
                    yesText: "??????",
                    // no: true,
                    // autoClose: true,
                    backgroundClose: false,
                    yesOnClick: (e, close) => {
                        if (Error.code === 401) {
                            clearLogoutSession();
                            clearLogoutLocalStorage();
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
            {/* TitleBar?????????????????? */}
            {/* <TitleBar returnIcon returnIconOnClick={(e) => { console.log(e) }} /> */}

            {/* LeftSideDrawer ?????? MobileM */}
            <LeftSideDrawer
                baseDefaultTheme={"DefaultTheme"}
                collapse={DrawerCollapse}
                containerEvent={{ onClick: () => { setDrawerCollapse(true) } }}
                theme={layout.leftSideDrawerMobileM}
            >
                {/* ????????????????????????????????? */}
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

                            //#region ?????????????????? Modal
                            modalsService.titleModal.normal({
                                //id: "top1",
                                title: "????????????",
                                yes: true,
                                yesText: "??????",
                                no: true,
                                noText: "??????",
                                // autoClose: true,
                                backgroundClose: false,
                                noOnClick: (e) => {
                                    globalContextService.remove("LayoutPage", "NewPassword")
                                    globalContextService.remove("LayoutPage", "ConfirmPwd")
                                },
                                yesOnClick: (e, close) => {
                                    //#region ????????????
                                    if (passWordVerify()) {
                                        changePassWord({
                                            account: getParseItemLocalStorage("DriverAccount"), // ??????
                                            passWord: globalContextService.get("LayoutPage", "NewPassword"), // ?????????
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

                                            {/* ???????????????????????? */}
                                            < Text
                                                theme={layout.editPwdTip}
                                            >
                                                8??????????????????????????????????????????????????????????????????4???3???
                                            </Text>

                                            {/* ????????? NewPwd */}
                                            <TextInput
                                                topLabel={<>?????????</>}
                                                baseDefaultTheme={"DefaultTheme"}
                                                type="password"
                                                placeholder={"??????????????????"}
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

                                            {/* ??????????????? ConfirmPwd */}
                                            <TextInput
                                                topLabel={<>???????????????</>}
                                                baseDefaultTheme={"DefaultTheme"}
                                                type="password"
                                                placeholder={"??????????????????"}
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
                        ????????????
                    </Text>
                    <Text
                        theme={layout.titleBarLogoutMobileM}
                        onClick={() => {
                            setDrawerCollapse(true);

                            modalsService.infoModal.warn({
                                iconRightText: "????????????????",
                                yes: true,
                                yesText: "??????",
                                no: true,
                                noText: "??????",
                                // autoClose: true,
                                backgroundClose: false,
                                yesOnClick: (e, close) => {
                                    clearLogoutLocalStorage();
                                    clearLogoutSession();
                                    globalContextService.clear();
                                    Switch();
                                    setDrawerCollapse(true);
                                    close();
                                }
                            })
                        }}
                    >
                        ??????
                    </Text>

                    {getParseItemLocalStorage("DriverAccountStatus") === "Default" &&

                        modalsService.titleModal.normal({
                            //id: "top1",
                            title: "?????????????????????????????????",
                            yes: true,
                            yesText: "??????",
                            // no: true,
                            // noText: "??????",
                            // autoClose: true,
                            noCloseBtn: true,
                            backgroundClose: false,
                            noOnClick: (e) => {
                                globalContextService.remove("LayoutPage", "NewPassword")
                                globalContextService.remove("LayoutPage", "ConfirmPwd")
                            },
                            yesOnClick: (e, close) => {
                                //#region ????????????
                                if (passWordVerify()) {
                                    changePassWord({
                                        account: getParseItemLocalStorage("DriverAccount"), // ??????
                                        passWord: globalContextService.get("LayoutPage", "NewPassword"), // ?????????
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

                                        {/* ???????????????????????? */}
                                        < Text
                                            theme={layout.editPwdTip}
                                        >
                                            8??????????????????????????????????????????????????????????????????4???3???
                                        </Text>

                                        {/* ????????? NewPwd */}
                                        <TextInput
                                            topLabel={<>?????????</>}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="password"
                                            placeholder={"??????????????????"}
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

                                        {/* ??????????????? ConfirmPwd */}
                                        <TextInput
                                            topLabel={<>???????????????</>}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="password"
                                            placeholder={"??????????????????"}
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
                            title: "?????????????????????????????????????????????",
                            yes: true,
                            yesText: "??????",
                            // no: true,
                            // noText: "??????",
                            // autoClose: true,
                            noCloseBtn: true,
                            backgroundClose: false,
                            noOnClick: (e) => {
                                globalContextService.remove("LayoutPage", "NewPassword")
                                globalContextService.remove("LayoutPage", "ConfirmPwd")
                            },
                            yesOnClick: (e, close) => {
                                //#region ????????????
                                if (passWordVerify()) {
                                    changePassWord({
                                        account: getParseItemLocalStorage("DriverAccount"), // ??????
                                        passWord: globalContextService.get("LayoutPage", "NewPassword"), // ?????????
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

                                        {/* ???????????????????????? */}
                                        < Text
                                            theme={layout.editPwdTip}
                                        >
                                            8??????????????????????????????????????????????????????????????????4???3???
                                        </Text>

                                        {/* ????????? NewPwd */}
                                        <TextInput
                                            topLabel={<>?????????</>}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="password"
                                            placeholder={"??????????????????"}
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

                                        {/* ??????????????? ConfirmPwd */}
                                        <TextInput
                                            topLabel={<>???????????????</>}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="password"
                                            placeholder={"??????????????????"}
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

                {/* Menu??? MobileM */}
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
                        {/* ???????????????MenuItem */}
                        {generateMenu([
                            {
                                children: [],
                                item: {
                                    id: "79124b7c-12ca-4ce6-802e-15ee192aac5b",
                                    name: "????????????",
                                    parentId: null,
                                    parentName: "?????????",
                                    sortNo: 3,
                                    status: 0,
                                    url: "/TodayTask",
                                }
                            },
                            {
                                children: [],
                                item: {
                                    id: "77777777-33ca-6cc6-802e-16ee172aaaaa",
                                    name: "????????????",
                                    parentId: null,
                                    parentName: "?????????",
                                    sortNo: 3,
                                    status: 0,
                                    url: "/TaskHistory",
                                }
                            },
                            {
                                children: [],
                                item: {
                                    id: "77777777-33ca-6cc6-802e-16ee172aazzz",
                                    name: "????????????",
                                    parentId: null,
                                    parentName: "?????????",
                                    sortNo: 3,
                                    status: 0,
                                    url: "/Income",
                                }
                            },
                            {
                                children: [],
                                item: {
                                    id: "77777777-339a-1cc6-802e-16ee172aazzz",
                                    name: "????????????",
                                    parentId: null,
                                    parentName: "?????????",
                                    sortNo: 3,
                                    status: 0,
                                    url: "/HitCardList",
                                }
                            },
                            {
                                children: [],
                                item: {
                                    id: "77777777-33ca-6cc6-802e-16ee172aaabbb",
                                    name: "????????????",
                                    parentId: null,
                                    parentName: "?????????",
                                    sortNo: 3,
                                    status: 0,
                                    url: "/Contact",
                                }
                            },
                            {
                                children: [],
                                item: {
                                    id: "77777777-33ca-6cc6-802e-16ee172aaaccc",
                                    name: "????????????",
                                    parentId: null,
                                    parentName: "?????????",
                                    sortNo: 3,
                                    status: 0,
                                    url: "/School",
                                }
                            },
                            {
                                children: [],
                                item: {
                                    id: "77777777-33ca-6cc6-802e-16ee172aaaddd",
                                    name: "????????????",
                                    parentId: null,
                                    parentName: "?????????",
                                    sortNo: 3,
                                    status: 0,
                                    url: "/DayCheck",
                                }
                            },
                            {
                                children: [],
                                item: {
                                    id: "77777777-33ca-6cc6-802e-16ee172aaaddd",
                                    name: "???????????????",
                                    parentId: null,
                                    parentName: "?????????",
                                    sortNo: 3,
                                    status: 0,
                                    url: "/Privacy",
                                }
                            },
                        ], history, location, ExpandMenuName, setExpandMenuName, setDrawerCollapse, true)}

                    </BasicContainer>
                </ScrollBar>
            </LeftSideDrawer>
        </>
    )
}

//#region ???????????????????????????
const generateMenu = (menuData, history, location, ExpandMenuName, setExpandMenuName, setDrawerCollapse, widthLessThan1024 = false) => {
    // console.log(menuData)
    let vdom = [];

    if (menuData instanceof Array) {
        // ?????? menuData ??????????????????????????? item ???????????????????????????????????????
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
        // ?????? menuData ????????????
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
                {/* ????????????????????? */}
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
                                //#region ?????????????????????????????????
                                ...(
                                    // ???????????????????????????????????????????????????????????????????????? Functions
                                    (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                        //?????????????????????
                                        (removeTailUrl(location.pathname) === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                        {
                                            background: "#e6f7ff",
                                            boxShadow: "inset -3px 0px 0px #1890ff",
                                            color: " #1890ff"
                                        }
                                        :
                                        //??????????????????
                                        (location.pathname === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                        {
                                            background: "#e6f7ff",
                                            boxShadow: "inset -3px 0px 0px #1890ff",
                                            color: " #1890ff"
                                        }
                                ),
                                //#endregion

                                //#region ???????????????????????????????????????
                                ...(
                                    // ???????????????????????????????????????????????????????????????????????? Functions
                                    (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                        //?????????????????????
                                        (
                                            (
                                                getParseItemLocalStorage("DMenuNameAndSubUrl")?.[menuData.item.name] ?? []
                                            ).includes(removeTailUrl(location.pathname)) && menuData.item.url.trim() === "/") &&
                                        {
                                            color: " #1890ff"
                                        }
                                        :
                                        //??????????????????
                                        (
                                            (
                                                getParseItemLocalStorage("DMenuNameAndSubUrl")?.[menuData.item.name] ?? []
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
                            // ???????????????????????????????????? 
                            if (location.pathname !== menuData.item.url.trim()) {//(?????????????????????)
                                pushAndNotExsistItemSession("Dtab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                // console.log(widthLessThan1024)
                                widthLessThan1024 && setDrawerCollapse(true);
                                history.push(menuData.item.url.trim())
                            }

                            //#region ?????????????????????????????? ????????? ?????????????????????????????????
                            if (menuData.item.parentName.trim() === "?????????") {
                                setExpandMenuName(e => {
                                    //#region ??????????????????????????????????????????
                                    let menuNameAndSubUrl = getParseItemLocalStorage("DMenuNameAndSubUrl")
                                    let keys = Object.keys(getParseItemLocalStorage("DMenuNameAndSubUrl")) ?? []
                                    let res = [];
                                    let clickItem = menuNameAndSubUrl[menuData.item.name]; // ???????????????????????????????????????

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
                            // ????????????????????????????????????
                            setExpandMenuName(e => {
                                //#region ??????????????????????????????????????????
                                let menuNameAndSubUrl = getParseItemLocalStorage("DMenuNameAndSubUrl")
                                let keys = Object.keys(getParseItemLocalStorage("DMenuNameAndSubUrl")) ?? []
                                let res = [];
                                let clickItem = menuNameAndSubUrl[menuData.item.name]; // ???????????????????????????????????????

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
                    {/* ??????????????????????????? name ??? icon ?????? */}
                    {menuData.item.url.trim() === "/" &&
                        iconMap[menuData.item.name] &&
                        iconMap[menuData.item.name]({
                            position: "absolute",
                            left: "24px",
                            height: "100%"
                        })
                    }

                    {/* ??????????????????????????? name ??? icon ?????? (??????????????????????????????) */}
                    {(menuData.item.parentName.trim() === "?????????" && menuData.item.url.trim() !== "/") &&
                        iconMap[menuData.item.name] &&
                        iconMap[menuData.item.name]({
                            position: "absolute",
                            left: "24px",
                            height: "100%"
                        })
                    }

                    {/* ????????????????????? */}
                    {menuData.item.name}
                    {/* {menuData.item.url} */}

                    {/* ????????????????????? ????????? icon ?????? */}
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

//#region ??????????????? ????????? ??????????????????
const removeTailUrl = (pathname) => {
    let totalLength = pathname.length;
    let split = pathname.split("/")
    let howManyToRemove = [...split[split.length - 1]].length + 1;
    let pathnameRes = pathname.substring(0, totalLength - howManyToRemove);// ??????????????? ????????? ????????????

    return pathnameRes
}
//#endregion

//#region ???????????????????????????
const generateThinMenu = (menuData, history, location, ExpandMenuName, setExpandMenuName, IsHoverMenuName, setIsHoverMenuName, level = 1, fatherName) => {
    // console.log(menuData)
    let vdom = [];

    if (menuData instanceof Array) {
        // ?????? menuData ??????????????????????????? item ???????????????????????????????????????
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
                    <BasicContainer key="single" name="????????????" >{list}</BasicContainer>
                );
            }
            else {
                vdom.push(
                    <BasicContainer
                        key="single"
                        name="????????????"
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

                            // ????????????????????????????????????
                            setIsHoverMenuName(e => {
                                //#region ??????????????????????????????????????????
                                let menuNameAndSubUrl = getParseItemLocalStorage("DMenuNameAndSubUrl")
                                let keys = Object.keys(getParseItemLocalStorage("DMenuNameAndSubUrl")) ?? []
                                let res = [];
                                let clickItem = menuNameAndSubUrl[fatherName]; // ???????????????????????????????????????

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
        // ?????? menuData ????????????
        // !! ?????????????????????Icon?????????????????????????????? ??? level ???????????????????????? 1 ????????????
        if (level === 1) {
            //#region ??????????????????
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
                        {/* ????????????????????? */}
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
                                        //#region ?????????????????????????????????
                                        ...(
                                            // ???????????????????????????????????????????????????????????????????????? Functions
                                            (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                                //?????????????????????
                                                (removeTailUrl(location.pathname) === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                                {
                                                    background: "#e6f7ff",
                                                    boxShadow: "inset -3px 0px 0px #1890ff",
                                                    color: " #1890ff"
                                                }
                                                :
                                                //??????????????????
                                                (location.pathname === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                                {
                                                    background: "#e6f7ff",
                                                    boxShadow: "inset -3px 0px 0px #1890ff",
                                                    color: " #1890ff"
                                                }
                                        ),
                                        //#endregion

                                        //#region ???????????????????????????????????????
                                        ...(
                                            // ???????????????????????????????????????????????????????????????????????? Functions
                                            (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                                //?????????????????????
                                                (
                                                    (
                                                        getParseItemLocalStorage("DMenuNameAndSubUrl")[menuData.item.name] ?? []
                                                    ).includes(removeTailUrl(location.pathname)) && menuData.item.url.trim() === "/") &&
                                                {
                                                    color: " #1890ff"
                                                }
                                                :
                                                //??????????????????
                                                (
                                                    (
                                                        getParseItemLocalStorage("DMenuNameAndSubUrl")[menuData.item.name] ?? []
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
                                    // ????????????????????????????????????
                                    if (location.pathname !== menuData.item.url.trim()) {//(?????????????????????)
                                        pushAndNotExsistItemSession("Dtab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                        history.push(menuData.item.url.trim())
                                    }
                                } else {
                                    // ????????????????????????????????????
                                    setExpandMenuName(e => {
                                        //#region ??????????????????????????????????????????
                                        let menuNameAndSubUrl = getParseItemLocalStorage("DMenuNameAndSubUrl")
                                        let keys = Object.keys(getParseItemLocalStorage("DMenuNameAndSubUrl")) ?? []
                                        let res = [];
                                        let clickItem = menuNameAndSubUrl[menuData.item.name]; // ???????????????????????????????????????

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
                                //     // ????????????????????????????????????
                                //     pushAndNotExsistItemSession("Dtab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                //     history.push(menuData.item.url.trim())
                                // } else 

                                if (menuData.item.url.trim() === "/") {
                                    // ????????????????????????????????????
                                    setIsHoverMenuName(e => {
                                        //#region ??????????????????????????????????????????
                                        let menuNameAndSubUrl = getParseItemLocalStorage("DMenuNameAndSubUrl")
                                        let keys = Object.keys(getParseItemLocalStorage("DMenuNameAndSubUrl")) ?? []
                                        let res = [];
                                        let clickItem = menuNameAndSubUrl[menuData.item.name]; // ???????????????????????????????????????

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
                            {/* ??????????????????????????? name ??? icon ?????? */}
                            {menuData.item.url.trim() === "/" &&
                                iconMap[menuData.item.name] ?
                                iconMap[menuData.item.name]({
                                    position: "absolute",
                                    left: "24px",
                                    height: "100%"
                                })
                                :
                                !(menuData.item.parentName.trim() === "?????????" && menuData.item.url.trim() !== "/") &&
                                <WhiteBlock style={{
                                    position: "absolute",
                                    left: "24px",
                                    height: "100%"
                                }} />
                            }

                            {/* ??????????????????????????? name ??? icon ?????? (??????????????????????????????) */}
                            {(menuData.item.parentName.trim() === "?????????" && menuData.item.url.trim() !== "/") &&
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
            //#region ????????????????????????
            vdom.push(
                <BasicContainer name="?????????"
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
                    {/* ????????????????????? */}
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
                                    //#region ?????????????????????????????????
                                    ...(
                                        // ???????????????????????????????????????????????????????????????????????? Functions
                                        (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                            //?????????????????????
                                            (removeTailUrl(location.pathname) === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                            {
                                                background: "#e6f7ff",
                                                boxShadow: "inset -3px 0px 0px #1890ff",
                                                color: " #1890ff"
                                            }
                                            :
                                            //??????????????????
                                            (location.pathname === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                            {
                                                background: "#e6f7ff",
                                                boxShadow: "inset -3px 0px 0px #1890ff",
                                                color: " #1890ff"
                                            }
                                    ),
                                    //#endregion

                                    //#region ???????????????????????????????????????
                                    ...(
                                        // ???????????????????????????????????????????????????????????????????????? Functions
                                        (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                            //?????????????????????
                                            (
                                                (
                                                    getParseItemLocalStorage("DMenuNameAndSubUrl")[menuData.item.name] ?? []
                                                ).includes(removeTailUrl(location.pathname)) && menuData.item.url.trim() === "/") &&
                                            {
                                                color: " #1890ff"
                                            }
                                            :
                                            //??????????????????
                                            (
                                                (
                                                    getParseItemLocalStorage("DMenuNameAndSubUrl")[menuData.item.name] ?? []
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
                                // ????????????????????????????????????
                                if (location.pathname !== menuData.item.url.trim()) {//(?????????????????????)
                                    pushAndNotExsistItemSession("Dtab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                    history.push(menuData.item.url.trim())
                                }
                                setIsHoverMenuName([])// ???????????????????????????????????????

                            } else {
                                // ????????????????????????????????????
                                setExpandMenuName(e => {
                                    //#region ??????????????????????????????????????????
                                    let menuNameAndSubUrl = getParseItemLocalStorage("DMenuNameAndSubUrl")
                                    let keys = Object.keys(getParseItemLocalStorage("DMenuNameAndSubUrl")) ?? []
                                    let res = [];
                                    let clickItem = menuNameAndSubUrl[menuData.item.name]; // ???????????????????????????????????????

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
                            // ????????????????????????????????????
                            if (menuData.item.url.trim() === "/") {
                                setIsHoverMenuName(e => {
                                    //#region ??????????????????????????????????????????
                                    let menuNameAndSubUrl = getParseItemLocalStorage("DMenuNameAndSubUrl")
                                    let keys = Object.keys(getParseItemLocalStorage("DMenuNameAndSubUrl")) ?? []
                                    let res = [];
                                    let clickItem = menuNameAndSubUrl[menuData.item.name]; // ???????????????????????????????????????

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
                        {/* ??????????????????????????? name ??? icon ?????? */}
                        {menuData.item.url.trim() === "/" &&
                            iconMap[menuData.item.name] &&
                            iconMap[menuData.item.name]({
                                position: "absolute",
                                left: "24px",
                                height: "100%"
                            })
                        }

                        {/* ????????????????????? */}
                        {menuData.item.name}
                        {/* {menuData.item.url} */}

                        {/* ????????????????????? ????????? icon ?????? */}
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