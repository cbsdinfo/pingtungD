export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        laptopLOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "12px 0 0 0" // 標題列的padding
                }
            }
        },
        laptopLOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
                }
            }
        },
        laptopLContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "0 150px 196px 150px",
                    minHeight: "calc( 100vh + 4px)"
                }
            }
        },
        laptopOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "12px 0 0 0" // 標題列的padding
                }
            }
        },
        laptopOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
                }
            }
        },
        laptopContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "0 48px 196px 48px", //188 是授權圖高度
                    minHeight: "calc( 100vh + 24px)"
                }
            }
        },

        tabletOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "12px 0 0 0" // 標題列的padding
                }
            }
        },
        tabletOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
                }
            }
        },
        tabletContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "0 24px 196px 24px", //188 是授權圖高度
                    minHeight: `calc(  ${props.height}px + 24px)`
                }
            }
        },
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
                }
            }
        },
    },
    //#endregion

    //#region 標題列
    titleBar: {
        basic: (style, props) => ({
            ...style,
            width: "236px",
            height: "40px",
            backgroundColor: "#FFF",
            margin: "0 24px 16px"
        })
    },
    //#endregion

    titleText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            color: "#00628F",
            width: "100%",
            textAlign: "center",
            boxShadow: "inset 8px 0px #4DB8BE",
            top: "4px"
        })
    },

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
            backgroundColor: "#6A7987"
        }),
    },
    //#endregion

    //#region 標題列 訂單檢視分頁
    titleBarRecordTab: {
        basic: (style, props) => ({
            ...style,
            display: "inline-grid",
            margin: (props.isActive ? 0 : "0 1px 0 0"),
            lineHeight: "32px",
            height: (props.isActive ? "56px" : "100%"),
            fontSize: "14px",
            cursor: "pointer",
            width: "160px",
            color: (props.isActive ? "rgba(0, 0, 0, 0.85)" : "#FFFFFF"),
            boxShadow: (props.isActive ? "inset 0px 8px 0px #1890FF" : ""),
            // borderTop: (props.isActive ? "solid 8px #1890FF" : "unset"),
            backgroundColor: (props.isActive ? "#FFFFFF" : "#9DADBE"),
            textAlign: "center",
            alignItems: "center"
        }),
    },
    //#endregion

    //#region 查詢日期區間 DateTimeRange
    dateTimeRange: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                // padding: "0 12px",
                display: "inline-block",
                // ...style.occupy(3),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                padding: 0,
                width: "250px"
                // ...style.occupy(3),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
        dateTimePickerContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    width: "244px",
                    color: props.disable ? null : ((props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.25)")
                }
            }
        },
        dateTimePickerSubContainer: {
            basic: (style, props) => ({
                ...style,
                height: "28px",
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                // minHeight: "24px",
                // height: "auto"
                height: "0px"
            })
        }
    },
    //#endregion
    //#endregion
}