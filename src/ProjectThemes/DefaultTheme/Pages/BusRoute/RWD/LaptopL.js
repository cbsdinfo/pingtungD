export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        laptopLOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "12px 0 0" // 標題列的padding
                }
            }
        },
        laptopLOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8"
                }
            }
        },
        laptopLContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "12px 12px 200px",
                    minHeight: "calc( 100vh + 4px )"
                }
            }
        },
        laptopOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "12px 0 0" // 標題列的padding
                }
            }
        },
        laptopOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8"
                }
            }
        },
        laptopContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "12px 8px 200px", //188 是授權圖高度
                    minHeight: "calc( 100vh + 24px )"
                }
            }
        },

        tabletOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "12px 0 0" // 標題列的padding
                }
            }
        },
        tabletOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8"
                }
            }
        },
        tabletContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "12px 8px 200px", //188 是授權圖高度
                    minHeight: `calc( ${props.height}px + 24px )`
                }
            }
        },
    },
    //#endregion

    //#region 標題列
    titleBar: {
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "120px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "250px"
            })
        }
    },
    //#endregion

    //#region 分頁底色
    whiteContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "72px",
            backgroundColor: "#FFFFFF"
        }),
    },
    //#endregion

    //#region 分頁容器
    tabsContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "56px",
            backgroundColor: "#6A7987",
            whiteSpace: "nowrap"
        }),
    },
    //#endregion

    containerScrollBar: {
        basic: {
            width: "100%",
            maxWidth: "100%",
            height: "72px",
            maxHeight: "72px",
            borderRight: 0,
            boxSizing: "border-box",
        },
        scrollbarTrackX: {
            height: "8px",
            display: "block"
        },
        scrollbarThumbX: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear"
        },
        scrollbarTrackY: {
            width: 0,
            display: "block"
        },
        scrollbarThumbY: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear",
            right: "0px",
            left: "0px"
        }
    },

    //#region 標題列 路線分頁
    titleBarBusRouteCallCarTab: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            margin: (props.isActive ? 0 : "0 1px 0 0"),
            lineHeight: "32px",
            height: "56px",
            fontSize: "14px",
            cursor: "pointer",
            width: "160px",
            color: (props.isActive ? "rgba(0, 0, 0, 0.85)" : "#FFFFFF"),
            boxShadow: (props.isActive ? "inset 0px 8px 0px #1890FF" : ""),
            // borderTop: (props.isActive ? "solid 8px #1890FF" : "unset"),
            backgroundColor: (props.isActive ? "#FFFFFF" : "#9DADBE"),
            justifyContent: "center",
            alignItems: "center"
        }),
    },
    //#endregion

}