import React, { useState, useContext, useEffect } from 'react';
import { Context, Tooltip, BackstageLeftSideMenuBar, BackstagePageTabBar, BackstageTopMenuBar, ScrollBar, BasicContainer, LeftSideDrawer, SubContainer, Text, BasicButton, DropDown, modalsService, globalContextService, Container } from '../../Components'
import { ReactComponent as TitleBarReturn } from '../../Assets/img/TitleBarReturn.svg'
import { ReactComponent as MobileMMenu } from '../../Assets/img/MobileMMenu.svg'
import { getParseItemLocalStorage, setStringifyItemSession, pushAndNotExsistItemSession, getParseItemSession, removeByKeyItemSession, clearLocalStorage, clearSession, setStringifyItemLocalStorage } from '../../Handlers';
import { useHistory, useLocation } from 'react-router-dom';

export const TitleBar = (props) => {
    const { Collapse, setCollapse, DrawerCollapse, setDrawerCollapse, Theme, Switch } = useContext(Context);
    const { layout } = Theme;
    let history = useHistory();

    return (
        <>
            {/* 標題列容器 MobileM */}
            <Container
                theme={layout.titleBarContainerMobileM}
            >
                {/* 登入容器 */}
                <SubContainer
                    theme={layout.titleBarLoginContainerMobileM}
                >
                    {props?.returnIcon &&
                        <TitleBarReturn style={{
                            position: "relative",
                            left: "14px",
                            top: "6px"
                        }}
                            onClick={(e) => { props?.returnIconOnClick && props.returnIconOnClick(e) }}
                        />
                    }

                    {props?.customIcon && props.customIcon}
                </SubContainer>

                {/* Logo容器 */}
                <SubContainer
                    theme={layout.titleBarLogoContainerMobileM}
                >
                    {/* <MobileMLogo /> */}

                    {/* Logo容器文字 */}
                    {props?.customTitleText
                        ?
                        props.customTitleText
                        :
                        <Text
                            theme={layout.titleBarLogoContainerTextMobileM}
                        >
                            屏東市政府
                            <br />
                            長照交通接送統一預約服務及管理系統
                        </Text>
                    }

                </SubContainer>

                {/* 側邊欄按鈕容器 */}
                <SubContainer
                    theme={layout.titleBarLeftSIdeBtnContainerMobileM}
                >
                    {!props?.MenuIcondontShow && <MobileMMenu onClick={() => { setDrawerCollapse(false) }} />}

                </SubContainer>

            </Container>
        </>
    )
}