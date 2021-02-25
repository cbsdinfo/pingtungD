export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#FFFFFF",
                    padding: 0,
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#3C4856",
                    height: `calc( ${props.height}px - 56px)`
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#3C4856",
                    padding: "4px 0 24px",
                    minHeight: `calc( ${props.height}px - 246px)`
                }
            }
        },
    },
    //#endregion

    //#region 標題 TitleText
    titleText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "48px",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "48px",
            textAlign: "center",
            boxShadow: "inset 0px -1px 0px #F0F0F0"
        })
    },
    //#endregion

    //#region 關鍵字 Keyword
    keyword: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "8px 16px",
                display: "inline-block",
                width: "100%"
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
        textInputContainer: {
            basic: (style, props) => {

                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => {
                //console.log(style, props)
                return {
                    ...style,
                    //#region 當有開啟 openEye 並且 hover 或 focus 時變色
                    ...(
                        props.openEye && {
                            border: `1px solid ${(props.focus || props.hover) ? "#1890ff" : "#d9d9d9"}`,
                            boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(24, 144, 255, 0.2)" : null
                        }
                    ),
                    //#endregion
                    height: "28px",
                    width: "100%"
                }
            }
        }
    },
    //#endregion
    //#region 關鍵字 右方圖標
    keywordRightIcon: {
        position: "absolute",
        height: "100%",
        right: "8px",
        cursor: "pointer",
        top: 0,
    },
    //#endregion

    //#region 標題列 聯繫客服分頁
    titleBarContactTab: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            // margin: "0 16px",
            lineHeight: "46px",
            height: "46px",
            fontSize: "14px",
            cursor: "pointer",
            color: (props.isActive ? "#1890FF" : "rgba(0, 0, 0, 0.65)"),
            borderBottom: (props.isActive ? "solid 2px #1890FF" : "unset"),
            width: "33%",
            textAlign: "center"
        }),
    },
    //#endregion

}