export default {
    //#region 大於768的畫面 (tablet)
    tabletBackstageLeftSideMenuBarLogo: (Collapse) => ({
        margin: `0 0.5rem 0 ${Collapse ? "1rem" : "1.5rem"}`,
        height: "4rem"
    }),
    tabletBackstageLeftSideMenuBarLogoText: {
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
    tabletBackstageTopMenuBar: (Collapse) => ({
        container: {
            basic: (style) => ({
                ...style,
                width: `calc( 100%${Collapse ? " - 4rem" : " - 15rem"} )`
            })
        }
    }),
    tabletBasicButton: {
        container: {
            basic: (style) => ({ ...style, height: "auto", width: "auto", backgroundColor: "transparent", lineHeight: "normal", padding: "0.25rem 0.25rem 0", margin: "0rem 0.75rem 0 1.5rem", }),
            hover: (style => ({ backgroundColor: "rgba(0, 0, 0, 0.1)" }))
        }
    },
    tabletBasicButtonIcon: {
        color: "#fff"
    },
    tabletPageText: {
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
    tabletUserNameText: {
        basic: (style) => ({
            ...style,
            fontSize: "0.875rem",
            margin: "0 1.5rem 0 0",
            fontWeight: 500,//"bold",
            top: "-0.1rem",
            display: "inline-block",
            color: "#fff",
            cursor: "default",
        })
    },
    tabletBackstagePageTabBar: (Collapse) => ({
        cantainer: {
            basic: (style, props) => ({
                ...style,
                width: `calc( 100%${Collapse ? " - 4rem" : " - 15rem"} )`,
            })
        }
    }),
    //#endregion
    //#region 小於等於768的畫面 (basic)
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
            cursor: "default",
        })
    },
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
            height: "100rem",//"fit-content",//"calc( 100% - 4rem )",
            left: 0,
            top: 0,
            backgroundColor: "#ffffff"
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