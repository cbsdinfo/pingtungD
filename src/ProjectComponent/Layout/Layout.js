import React, { useState, useContext, useEffect } from 'react';
import { Context, BackstageLeftSideMenuBar, BackstagePageTabBar, BackstageTopMenuBar, ScrollBar, BasicContainer, LeftSideDrawer, SubContainer, Text, BasicButton } from '../../Components'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useWindowSize } from '../../SelfHooks/useWindowSize'
import { ReactComponent as Logo } from '../../Assets/img/Logo.svg'
import { setItemSession, setStringifyItemSession, getParseItemSession, removeByKeyItemSession } from '../../Handlers';

export const Layout = (props) => {
    const [Collapse, setCollapse] = useState(false);
    const [DrawerCollapse, setDrawerCollapse] = useState(true);
    const [width] = useWindowSize();

    const { Theme } = useContext(Context);
    const { layout } = Theme;

    useEffect(() => {
        setStringifyItemSession("tab", [{ title: "某某某頁面", path: "/xxx/yyy" }, { title: "某某某頁面", path: "/aaa/bbb" }, { title: "某某某頁面c", path: "/aaa/ccc" },
        { title: "某某某頁面", path: "/aaa/111" }, { title: "某某某頁面", path: "/aaa/333" }, { title: "某某某頁面c", path: "/aaa/555" },
        { title: "某某某頁面", path: "/aaa/222" }, { title: "某某某頁面", path: "/aaa/444" }, { title: "某某某頁面c", path: "/aaa/666" }])
        //Switch()

    }, [])

    return (
        <>
            {/* 大於768的畫面 (tablet)*/}
            {width > 768 &&
                <>
                    <BackstageLeftSideMenuBar baseDefaultTheme={"DefaultTheme"} collapse={Collapse}
                        logo={<Logo style={layout.tabletBackstageLeftSideMenuBarLogo(Collapse)} />}
                        logoText={
                            <Text
                                baseDefaultTheme={"TextDefaultTheme"}
                                theme={layout.tabletBackstageLeftSideMenuBarLogoText}
                            >
                                1966照護網 靈糧堂
                            </Text>
                        }
                    />
                    <BackstageTopMenuBar baseDefaultTheme={"DefaultTheme"} theme={layout.tabletBackstageTopMenuBar(Collapse)}>
                        <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"}>
                            <BasicButton
                                baseDefaultTheme={"BasicButtonDefaultTheme"}
                                theme={layout.tabletBasicButton}
                                icon={<MenuOpenIcon style={layout.tabletBasicButtonIcon} />}
                                text={""}
                                onClick={() => { setCollapse(c => !c) }}
                            />
                            <Text baseDefaultTheme={"TextDefaultTheme"} theme={layout.tabletPageText}>
                                預設頁面/預設功能
                            </Text>
                        </SubContainer>
                        {/* <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"}> */}
                        {/* 無 Logo */}
                        {/* </SubContainer> */}
                        <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"}>
                            <Text baseDefaultTheme={"TextDefaultTheme"} theme={layout.tabletUserNameText}>
                                管理員
                            </Text>
                        </SubContainer>
                    </BackstageTopMenuBar>
                    <BackstagePageTabBar
                        openHistory={getParseItemSession("tab")}
                        urlMapping={{
                            "/xxx/yyy": "某x", "/aaa/bbb": "某a", "/aaa/ccc": "某c",
                            "/aaa/111": "某1", "/aaa/222": "某2", "/aaa/333": "某3",
                            "/aaa/444": "某4", "/aaa/555": "某5", "/aaa/666": "某6"
                        }}
                        tabOnClose={(item, index, arr, pathname) => { removeByKeyItemSession("tab", "path", item.path) }}
                        theme={layout.tabletBackstageTopMenuBar(Collapse)}
                    />
                </>
            }
            {/* 小於等於768的畫面 (basic) */}
            {width <= 768 &&
                <>
                    <BackstageTopMenuBar baseDefaultTheme={"DefaultTheme"} >
                        <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"}>
                            <BasicButton
                                baseDefaultTheme={"BasicButtonDefaultTheme"}
                                theme={layout.basicBasicButton}
                                icon={<MenuOpenIcon style={layout.basicBasicButtonIcon} />}
                                text={""}
                                onClick={() => { setDrawerCollapse(c => !c) }} />
                            <Text baseDefaultTheme={"TextDefaultTheme"} theme={layout.basicPageText}>
                                預設頁面/預設功能
                            </Text>
                        </SubContainer>
                        <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"}>
                            {/* Logo 不做在中間了，如果要在打開註解*/}
                            {/* <Logo style={{ margin: `0.25rem 0.5rem 0 0rem`, height: "100%", width: "1.5rem" }} />
                            {width >= 520 &&
                                <Text baseDefaultTheme={"TextDefaultTheme"}
                                    theme={{
                                        basic: (style) => ({
                                            ...style,
                                            fontSize: "1rem",
                                            fontWeight: "bold",
                                            top: "-.4rem",
                                            display: "inline-block",
                                            color: "#fff"
                                        })
                                    }}
                                >1966照護網 靈糧堂
                                </Text>
                            } */}
                        </SubContainer>
                        <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"}>
                            <Text baseDefaultTheme={"TextDefaultTheme"} theme={layout.basicUserNameText}>
                                管理員
                            </Text>
                        </SubContainer>
                    </BackstageTopMenuBar>
                    <LeftSideDrawer
                        baseDefaultTheme={"DefaultTheme"}
                        collapse={DrawerCollapse}
                        containerEvent={{ onClick: () => { setDrawerCollapse(true) } }}
                    >
                        {/* logo 區 */}
                        <BasicContainer baseDefaultTheme={"BasicContainerDefaultTheme"} theme={layout.basicLogoArea} >
                            <Logo style={layout.basicLogo} />
                            <Text baseDefaultTheme={"TextDefaultTheme"} theme={layout.basicLogiText} >
                                1966照護網 靈糧堂
                            </Text>
                        </BasicContainer>
                        {/* Menu區 */}
                        <ScrollBar
                            basedefaulttheme={"DefaultTheme"}
                            className={`collapseMenuAreaScrollBar`}
                            autoHide={true}
                            theme={layout.menuAreaScrollBar}
                        >
                            <BasicContainer
                                {...props.logoAreaEvent}
                                className={`collapseMenuArea`}
                                baseDefaultTheme={"BasicContainerDefaultTheme"}
                                theme={layout.menuArea}
                            >
                                {/* 在這裡遍歷MenuItem */}
                            </BasicContainer>
                        </ScrollBar>
                    </LeftSideDrawer>
                    <BackstagePageTabBar
                        openHistory={getParseItemSession("tab")}
                        urlMapping={{
                            "/xxx/yyy": "某x", "/aaa/bbb": "某a", "/aaa/ccc": "某c",
                            "/aaa/111": "某1", "/aaa/222": "某2", "/aaa/333": "某3",
                            "/aaa/444": "某4", "/aaa/555": "某5", "/aaa/666": "某6"
                        }}
                        tabOnClose={(item, index, arr, pathname) => { removeByKeyItemSession("tab", "path", item.path) }}
                        theme={layout.basicBackstagePageTabBar(Collapse)}
                    />
                </>
            }
        </>
    )
}