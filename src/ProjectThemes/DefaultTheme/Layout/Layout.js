export default {
    //#region LaptopL

    //#region 標題列容器 LaptopL
    titleBarContainerLaptopL: {
        basic: (style, props) => ({
            ...style,
            height: "100px",
            width: "100%",
            position: "fixed",
        })
    },
    //#endregion

    //#region Logo容器 LaptopL
    titleBarLogoContainerLaptopL: {
        basic: (style, props) => ({
            ...style,
            height: "100px",
            width: "335px",
        })
    },
    //#endregion

    //#region Logo ICON LaptopL
    titleBarLogoIconLaptopL: {
        position: "absolute",
        top: "-6px",
        left: "-8px"
    },
    //#endregion

    //#region Tab 容器 LaptopL
    titleBarTabContainerLaptopL: {
        basic: (style, props) => ({
            ...style,
            height: "100px",
            width: "calc( 100% - 503px )",
        })
    },
    //#endregion

    //#region Tab 次容器 LaptopL
    titleBarTabSubContainerLaptopL: {
        basic: (style, props) => ({
            ...style,
            backgroundColor: "#4DB8BE",
            height: "100px",
            justifyContent: "space-between",
        })
    },
    //#endregion

    //#region Tab項目容器
    titleBarTabItemContainerLaptopL: {
        basic: (style, props) => {
            return {
                ...style,
                backgroundColor: "#4DB8BE",
                height: "100px",
                width: "128px",
                borderBottom: props?.active ? "3px solid" : "unset",
                color: props?.active ? "#FFE977" : "#fff",
                cursor: "pointer",
                ...(props.needHover && { color: "#FFE977" })
            }
        },
        hover: (style, props) => ({
            color: "#FFE977",
            borderBottom: "3px solid",
        })
    },
    //#endregion

    //#region Tab項目圖標
    titleBarTabIconLaptopL: {
        position: "absolute",
        top: "24px",
        left: "44px",
    },
    //#endregion

    //#region Tab項目文字
    titleBarTabTextLaptopL: {
        basic: (style, props) => ({
            ...style,
            color: "inherit",
            cursor: "pointer",
            position: "absolute",
            top: "64px",
            left: "32px",
            userSelect: "none"
        })
    },
    //#endregion

    //#region 使用者名稱、登出容器
    titleBarUserAndLogoutLaptopL: {
        basic: (style, props) => ({
            ...style,
            backgroundColor: "#4DB8BE",
            height: "100px",
            width: "168px"
        })
    },
    //#endregion

    //#region 使用者名稱、登出次容器
    titleBarUserAndLogoutSubLaptopL: {
        basic: (style, props) => ({
            ...style,
            height: "100%",
            width: "100%"
        })
    },
    //#endregion

    //#region 使用者名稱
    titleBarUserLaptopL: {
        basic: (style, props) => ({
            ...style,
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "21px",
            textAlign: "center",
            padding: "16px 0 0 0px",
            cursor: "default",
            color: "#fff",
            userSelect: "none",
        })
    },
    //#endregion

    //#region 使用者名稱 分隔
    titleBarUserStepLaptopL: {
        basic: (style, props) => ({
            ...style,
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "21px",
            textAlign: "center",
            color: "#fff",
            cursor: "default",
            padding: "4px 0",
            userSelect: "none"
        })
    },
    //#endregion

    //#region 登出
    titleBarLogoutLaptopL: {
        basic: (style, props) => ({
            ...style,
            textAlign: "center",
            color: "#fff",
            padding: "4px 0",
            cursor: "pointer",
            userSelect: "none"
        }),
        hover: (style, props) => ({
            color: "#FFE977",
        })
    },
    //#endregion

    //#region 登出 Icon
    titleBarLogoutIconLaptopL: {
        position: "relative",
        top: "3px",
        left: "-5px"
    },
    //#endregion

    //#endregion

    //#region Laptop

    //#region 標題列容器 Laptop
    titleBarContainerLaptop: {
        basic: (style, props) => ({
            ...style,
            height: "80px",
            width: "100%",
            position: "fixed",
        })
    },
    //#endregion

    //#region Logo容器 Laptop
    titleBarLogoContainerLaptop: {
        basic: (style, props) => ({
            ...style,
            height: "80px",
            width: "323px",
        })
    },
    //#endregion

    //#region Logo ICON Laptop
    titleBarLogoIconLaptop: {
        position: "absolute",
        top: "0px",
        left: "0px"
    },
    //#endregion

    //#region Tab 容器 Laptop
    titleBarTabContainerLaptop: {
        basic: (style, props) => ({
            ...style,
            height: "80px",
            width: "calc( 100% - 323px - 168px )",
        })
    },
    //#endregion

    //#region Tab 次容器 Laptop
    titleBarTabSubContainerLaptop: {
        basic: (style, props) => ({
            ...style,
            backgroundColor: "#4DB8BE",
            height: "80px",
            justifyContent: "space-between",
        })
    },
    //#endregion

    //#region Tab項目容器
    titleBarTabItemContainerLaptop: {
        basic: (style, props) => ({
            ...style,
            backgroundColor: "#4DB8BE",
            height: "80px",
            width: "70px",
            borderBottom: props?.active ? "3px solid" : "unset",
            color: props?.active ? "#FFE977" : "#fff",
            cursor: "pointer",
            ...(props.needHover && { color: "#FFE977" })
        }),
        hover: (style, props) => ({
            color: "#FFE977",
            borderBottom: "3px solid",
        })
    },
    //#endregion

    //#region Tab項目圖標
    titleBarTabIconLaptop: {
        position: "absolute",
        height: "32px",
        width: "32px",
        top: "16px",
        left: "19px",
    },
    //#endregion

    //#region Tab項目文字
    titleBarTabTextLaptop: {
        basic: (style, props) => ({
            ...style,
            color: "inherit",
            cursor: "pointer",
            position: "absolute",
            top: "48px",
            left: "0px",
            userSelect: "none",
            fontSize: "16px",
            lineHeight: "28px",

        })
    },
    //#endregion

    //#region 使用者名稱、登出容器
    titleBarUserAndLogoutLaptop: {
        basic: (style, props) => ({
            ...style,
            backgroundColor: "#4DB8BE",
            height: "80px",
            width: "168px"
        })
    },
    //#endregion

    //#region 使用者名稱、登出次容器
    titleBarUserAndLogoutSubLaptop: {
        basic: (style, props) => ({
            ...style,
            height: "100%",
            width: "100%"
        })
    },
    //#endregion

    //#region 使用者名稱
    titleBarUserLaptop: {
        basic: (style, props) => ({
            ...style,
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "21px",
            textAlign: "center",
            padding: "16px 0 0 0px",
            cursor: "default",
            color: "#fff",
            userSelect: "none"
        })
    },
    //#endregion

    //#region 使用者名稱 分隔
    titleBarUserStepLaptop: {
        basic: (style, props) => ({
            ...style,
            fontSize: "12px",
            fontWeight: 600,
            lineHeight: "5px",
            textAlign: "center",
            color: "#fff",
            cursor: "default",
            padding: "4px 0",
            userSelect: "none"
        })
    },
    //#endregion

    //#region 登出
    titleBarLogoutLaptop: {
        basic: (style, props) => ({
            ...style,
            textAlign: "center",
            color: "#fff",
            padding: "4px 0",
            cursor: "pointer",
            userSelect: "none"
        }),
        hover: (style, props) => ({
            color: "#FFE977",
        })
    },
    //#endregion

    //#region 登出 Icon
    titleBarLogoutIconLaptop: {
        position: "relative",
        top: "3px",
        left: "-5px"
    },
    //#endregion

    //#endregion

    //#region Tablet

    //#region 標題列容器 Tablet
    titleBarContainerTablet: {
        basic: (style, props) => ({
            ...style,
            height: "80px",
            width: "100%",
            position: "fixed",
        })
    },
    //#endregion

    //#region Logo容器 Tablet
    titleBarLogoContainerTablet: {
        basic: (style, props) => ({
            ...style,
            height: "80px",
            width: "272px",
        })
    },
    //#endregion

    //#region Logo ICON Tablet
    titleBarLogoIconTablet: {
        position: "absolute",
        top: "0px",
        left: "0px"
    },
    //#endregion

    //#region Tab 容器 Tablet
    titleBarTabContainerTablet: {
        basic: (style, props) => ({
            ...style,
            height: "80px",
            width: "calc( 100% - 272px - 108px )",
        })
    },
    //#endregion

    //#region Tab 次容器 Tablet
    titleBarTabSubContainerTablet: {
        basic: (style, props) => ({
            ...style,
            backgroundColor: "#4DB8BE",
            height: "80px",
            justifyContent: "space-between",
        })
    },
    //#endregion

    //#region Tab項目容器
    titleBarTabItemContainerTablet: {
        basic: (style, props) => ({
            ...style,
            backgroundColor: "#4DB8BE",
            height: "80px",
            width: "54px",
            borderBottom: props?.active ? "3px solid" : "unset",
            color: props?.active ? "#FFE977" : "#fff",
            cursor: "pointer"
        }),
        hover: (style, props) => ({
            color: "#FFE977",
            borderBottom: "3px solid",
        })
    },
    //#endregion

    //#region Tab項目圖標
    titleBarTabIconTablet: {
        position: "absolute",
        height: "24px",
        width: "24px",
        top: "16px",
        left: "16px",
    },
    //#endregion

    //#region Tab項目文字
    titleBarTabTextTablet: {
        basic: (style, props) => ({
            ...style,
            color: "inherit",
            cursor: "pointer",
            position: "absolute",
            top: "48px",
            left: "0px",
            userSelect: "none",
            fontSize: "13px",
            lineHeight: "22px",
        })
    },
    //#endregion

    //#region 使用者名稱、登出容器
    titleBarUserAndLogoutTablet: {
        basic: (style, props) => ({
            ...style,
            backgroundColor: "#4DB8BE",
            height: "80px",
            width: "108px"
        })
    },
    //#endregion

    //#region 使用者名稱、登出次容器
    titleBarUserAndLogoutSubTablet: {
        basic: (style, props) => ({
            ...style,
            height: "100%",
            width: "100%"
        })
    },
    //#endregion

    //#region 使用者名稱
    titleBarUserTablet: {
        basic: (style, props) => ({
            ...style,
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "21px",
            textAlign: "center",
            padding: "16px 0 0 0px",
            cursor: "default",
            color: "#fff",
            userSelect: "none"
        })
    },
    //#endregion

    //#region 使用者名稱 分隔
    titleBarUserStepTablet: {
        basic: (style, props) => ({
            ...style,
            fontSize: "12px",
            fontWeight: 600,
            lineHeight: "5px",
            textAlign: "center",
            color: "#fff",
            cursor: "default",
            padding: "4px 0",
            userSelect: "none"
        })
    },
    //#endregion

    //#region 登出
    titleBarLogoutTablet: {
        basic: (style, props) => ({
            ...style,
            textAlign: "center",
            fontSize: "14px",
            color: "#fff",
            padding: "4px 0",
            cursor: "pointer",
            userSelect: "none"
        }),
        hover: (style, props) => ({
            color: "#FFE977",
        })
    },
    //#endregion

    //#region 登出 Icon
    titleBarLogoutIconTablet: {
        position: "relative",
        top: "3px",
        left: "-5px"
    },
    //#endregion

    //#endregion

    //#region MobileM

    //#region 標題列容器 MobileM
    titleBarContainerMobileM: {
        basic: (style, props) => ({
            ...style,
            height: "56px",
            width: "100%",
            position: "fixed",
        })
    },
    //#endregion

    //#region 登入容器
    titleBarLoginContainerMobileM: {
        basic: (style, props) => ({
            ...style,
            height: "56px",
            width: "64px",
            padding: "12px 0 0 0 ",
            backgroundColor: "#fff"
        })
    },
    //#endregion

    //#region Logo容器
    titleBarLogoContainerMobileM: {
        basic: (style, props) => ({
            ...style,
            height: "56px",
            width: "calc( 100% - 56px - 64px )",
            backgroundColor: "#fff",
            textAlign: "center",
        })
    },
    //#endregion

    //#region Logo容器文字
    titleBarLogoContainerTextMobileM: {
        basic: (style, props) => ({
            ...style,
            textAlign: "center",
            color: "rgba(0,57,121,1)",
            fontWeight: 700,
            fontSize: "1rem",
            padding: "8px 0 0 0",
            height: "100%"
        })
    },
    //#endregion

    //#region 側邊欄按鈕容器
    titleBarLeftSIdeBtnContainerMobileM: {
        basic: (style, props) => ({
            ...style,
            height: "56px",
            width: "56px",
            padding: "16px",
            backgroundColor: "#fff"
        })
    },
    //#endregion

    //#region 登入
    titleBarLoginMobileM: {
        basic: (style, props) => ({
            ...style,
            textAlign: "center",
            fontSize: "14px",
            color: "#fff",
            padding: "4px 0",
            cursor: "pointer",
            userSelect: "none"
        }),
        hover: (style, props) => ({
            color: "#FFE977",
        })
    },
    //#endregion

    //#region 登入 Icon
    titleBarLoginIconMobileM: {
        position: "relative",
        top: "3px",
        left: "-5px"
    },
    //#endregion

    //#region LeftSideDrawer 樣式 MobileM
    leftSideDrawerMobileM: {
        content: {
            basic: (style, props) => ({
                ...style,
                top: "56px",
                height: "calc( 100% - 56px )"
            })
        }
    },
    //#endregion

    //#region 登出
    titleBarLogoutMobileM: {
        basic: (style, props) => ({
            ...style,
            textAlign: "center",
            fontSize: "14px",
            color: "rgba(0, 0, 0, 0.65)",
            padding: "4px 0",
            cursor: "pointer",
            userSelect: "none",
            display: "inline-block",

        }),
        hover: (style, props) => ({
            color: "#FFE977",
        })
    },
    //#endregion

    //#region 登出 Icon
    titleBarLogoutIconMobileM: {
        position: "relative",
        top: "3px",
        left: "-5px"
    },
    //#endregion

    //#region Menu區 MobileM
    menuAreaScrollBarMobileM: {
        basic: {
            width: "100%",
            maxWidth: "15rem",
            height: "calc( 100% - 279px )",
            maxHeight: "calc( 100% - 279px )",
            borderRight: "1px solid #f0f0f0",
            boxSizing: "border-box",
        }
    },
    menuArea: {
        basic: {
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",
            color: "#d25959",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            //height: "100rem",//"fit-content",//"calc( 100% - 4rem )",
            left: 0,
            top: 0,
            backgroundColor: "#ffffff",
            padding: "6px 0 0 0"
            //#endregion
        }
    },
    //#endregion

    //#region 固定底部容器 MobileM
    titleBarFixedBottomMobileM: {
        basic: (style, props) => ({
            ...style,
            borderTop: "1px solid rgba(140, 140, 140, 0.13)",
            height: "48px",
            width: "100%",
            position: "fixed",
            justifyContent: "space-between",
            bottom: "0px",
            backgroundColor: "#fff",
            zIndex: 1000
        })
    },
    //#endregion

    //#region Tab項目容器
    titleBarTabItemContainerMobileM: {
        basic: (style, props) => ({
            ...style,
            backgroundColor: "#fff",
            height: "48px",
            width: "20%",
            borderBottom: props?.active ? "3px solid" : "unset",
            color: props?.active ? "#1890FF" : "#8C8C8C",
            cursor: "pointer"
        }),
        hover: (style, props) => ({
            color: "#1890FF",
            borderBottom: "3px solid",
        })
    },
    //#endregion

    //#region Tab項目圖標
    titleBarTabIconMobileM: {
        position: "absolute",
        width: "20px",
        height: "20px",
        top: "8px",
        left: "calc( 50% - 10px )"
    },
    //#endregion

    //#region Tab項目文字
    titleBarTabTextMobileM: {
        basic: (style, props) => ({
            ...style,
            color: "inherit",
            cursor: "pointer",
            position: "absolute",
            top: "24px",
            left: "calc( 50% - 32px )",
            userSelect: "none"
        })
    },
    //#endregion






    //#endregion






    //#region 大於1024的畫面 (laptop)
    laptopBackstageLeftSideMenuBarLogo: (Collapse) => ({
        margin: `0 0.5rem 0 ${Collapse ? "1rem" : "1.5rem"}`,
        height: "4rem"
    }),
    laptopBackstageLeftSideMenuBarLogoText: {
        basic: (style) => ({
            ...style,
            fontSize: "1.125rem",
            fontWeight: 500,//"bold",
            top: "-1.55rem",
            display: "inline-block",
            color: "#fff",
            cursor: "default"
        })
    },
    laptopBackstageTopMenuBar: (Collapse) => ({
        container: {
            basic: (style) => ({
                ...style,
                width: `calc( 100%${Collapse ? " - 4rem" : " - 15rem"} )`
            })
        }
    }),
    laptopBasicButton: {
        container: {
            basic: (style) => ({ ...style, height: "auto", width: "auto", backgroundColor: "transparent", lineHeight: "normal", padding: "0.25rem 0.25rem 0", margin: "0rem 0.75rem 0 1.5rem", }),
            hover: (style => ({ backgroundColor: "rgba(0, 0, 0, 0.1)" }))
        }
    },
    laptopBasicButtonIcon: {
        color: "#fff"
    },
    laptopPageText: {
        basic: (style) => ({
            ...style,
            fontSize: "0.875rem",
            fontWeight: 400,//"bold",
            top: "-0.46rem",
            display: "inline-block",
            color: "#fff",
            cursor: "default",
        })
    },

    //#region 選擇可訪問組織 DropDown 容器
    laptopUseOrgDropDownContainer: {
        basic: (style, props) => ({
            ...style,
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            //#endregion
            //#region 覆寫樣式
            position: "relative",
            width: "300px",
            height: `${props.height * 32 + 16}px`,
            maxHeight: "300px",
            left: 0,
            top: 0,
            backgroundColor: "#ffffff",
            zIndex: 1,
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "2px",
            //#endregion
        })
    },
    //#endregion

    //#region 選擇可訪問組織 ScrollBar 
    laptopUseOrgScrollBar: {
        basic: {
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            borderRight: "1px solid #f0f0f0",
            boxSizing: "border-box",
        }
    },
    //#endregion

    laptopUserNameText: {
        basic: (style) => ({
            ...style,
            fontSize: "0.875rem",
            margin: "0 1.5rem 0 0",
            fontWeight: 500,//"bold",
            top: "-0.1rem",
            display: "inline-block",
            color: "#fff",
            cursor: "pointer",
        })
    },
    //#region DropDown 項目容器
    laptopDropDownItemContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            padding: "8px 0px",
            background: "#fff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "2px",
        })
    },
    //#endregion
    //#region DropDown 子項目
    laptopDropDownSubItemContainer: {
        basic: (style, props) => ({
            ...style,
            color: "rgba(0, 0, 0, 0.65)",
            padding: "8px 24px",
            fontWeight: "normal",
            fontSize: "14px",
            lineHeight: "16px",
            cursor: "pointer",
            userSelect: "none"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "#e6f7ff"
        }),
    },
    //#endregion
    laptopBackstagePageTabBar: (Collapse) => ({
        cantainer: {
            basic: (style, props) => ({
                ...style,
                width: `calc( 100%${Collapse ? " - 4rem" : " - 15rem"} )`,
            })
        }
    }),
    //#endregion
    //#region 小於等於1024的畫面 (basic)
    basicBasicButton: {
        container: {
            basic: (style) => ({
                ...style,
                height: "auto",
                width: "auto",
                backgroundColor: "transparent",
                lineHeight: "normal",
                padding: "0.25rem 0.25rem 0",
                margin: "0rem 0.75rem 0 1.5rem",
            }),
            hover: (style => ({
                backgroundColor: "rgba(0, 0, 0, 0.1)"
            }))
        }
    },
    basicBasicButtonIcon: {
        color: "#fff"
    },
    basicPageText: {
        basic: (style) => ({
            ...style,
            fontSize: "0.875rem",
            fontWeight: 400,//"bold",
            top: "-0.46rem",
            display: "inline-block",
            color: "#fff",
            cursor: "default",
        })
    },
    basicUserNameText: {
        basic: (style) => ({
            ...style,
            fontSize: "0.875rem",
            margin: "0 1.5rem 0 0",
            fontWeight: 500,//"bold",
            top: "-0.1rem",
            display: "inline-block",
            color: "#fff",
            cursor: "pointer",
        })
    },

    //#region 選擇可訪問組織 DropDown 容器
    basicUseOrgDropDownContainer: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            //#endregion
            //#region 覆寫樣式
            position: "relative",
            width: "300px",
            height: `${props.height * 32 + 16}px`,
            maxHeight: "300px",
            left: 0,
            top: 0,
            backgroundColor: "#ffffff",
            zIndex: 1,
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "2px",
            //#endregion
        })
    },
    //#endregion

    //#region 選擇可訪問組織 ScrollBar 
    basicUseOrgScrollBar: {
        basic: {
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            borderRight: "1px solid #f0f0f0",
            boxSizing: "border-box",
        }
    },
    //#endregion

    //#region DropDown 項目容器
    dropDownItemContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "8px 0px",
            background: "#fff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "2px",
        })
    },
    //#endregion
    //#region DropDown 子項目
    dropDownSubItemContainer: {
        basic: (style, props) => ({
            ...style,
            color: "rgba(0, 0, 0, 0.65)",
            padding: "8px 24px",
            fontWeight: "normal",
            fontSize: "14px",
            lineHeight: "16px",
            cursor: "pointer",
            userSelect: "none"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "#e6f7ff"
        }),
    },
    //#endregion
    basicLogoArea: {
        basic: (style) => ({
            ...style,
            height: "4rem",
            backgroundColor: "#1890ff",
        })
    },
    basicLogo: {
        margin: `0 0.5rem 0 0.5rem`,
        height: "100%",
        width: "2rem"
    },
    basicLogiText: {
        basic: (style) => ({
            ...style,
            fontSize: "1rem",
            fontWeight: 500,//"bold",
            top: "-1.55rem",
            display: "inline-block",
            color: "#fff",
            cursor: "default",
        })
    },
    menuAreaScrollBar: {
        basic: {
            width: "100%",
            maxWidth: "15rem",
            height: "calc( 100% - 4rem )",
            maxHeight: "calc( 100% - 4rem )",
            borderRight: "1px solid #f0f0f0",
            boxSizing: "border-box",
        }
    },
    menuArea: {
        basic: {
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",
            color: "#d25959",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            //height: "100rem",//"fit-content",//"calc( 100% - 4rem )",
            left: 0,
            top: 0,
            backgroundColor: "#ffffff",
            padding: "6px 0 0 0"
            //#endregion
        }
    },
    basicBackstagePageTabBar: (Collapse) => ({
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
            })
        }
    }),
    //#endregion

}