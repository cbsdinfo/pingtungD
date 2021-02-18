export default {
    //#region 分配用戶彈窗 
    //#region Modal 樣式
    assignModal: {
        outContainer: {
            basic: (style, props) => ({
                ...style,
                zIndex: 999
            }),
            tablet: (style, props) => ({
            }),
        },
        container: {
            basic: (style, props) => ({
                ...style,
                width: "1050px",
                height: "calc( 100vh - 148px )"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: {
            basic: (style, props) => ({
                ...style,
                height: "calc( 100% - 110px)",
                padding: "24px",
                zIndex: 100
            }),
        }
    },
    //#endregion
    //#region assignFormContainer
    assignFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                height: "auto"
            })
        },
        contentContainer: (style, props) => ({
            ...style,
        })
    },
    //#endregion

    //#region 分配用戶彈窗 - 關鍵字 Keyword
    assignKeyword: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 16px 0 0",
                display: "inline-block"
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
                    width: "200px"
                }
            }
        }
    },
    //#endregion
    //#region 分配用戶彈窗 - 關鍵字 右方圖標
    assignKeywordRightIcon: {
        basic: {
            position: "absolute",
            height: "100%",
            right: "12px",
            cursor: "pointer",
            top: 0,
        }
    },
    //#endregion

    //#region 選中的用戶資訊容器
    selectUserContainer: {
        basic: (style, props) => {
            return {
                ...style,
                width: "calc( 100% - 220px)"
            }
        }
    },
    //#endregion
    //#region 選中的用戶資訊文字
    selectUserText: {
        basic: (style, props) => ({
            ...style,
            height: "30px",
            lineHeight: "30px",
            fontWeight: "normal",
            fontSize: "14px",
            color: "rgba(0, 0, 0, 0.85)"
        })
    },
    //#endregion

    //#region 分配用戶彈窗 下方表格
    assignTableSubContainer: {
        basic: (style, props) => ({
            ...style,
            height: "calc( 100% - 32px )",
            width: "100%",
            padding: "24px 0 0 0 ",
            // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
        })
    },
    //#endregion

    //#region 停用狀態 Tag
    assignDisable: {
        container: {
            basic: (style, props) => ({
                ...style,
                margin: "0",
                padding: "0px 7px",
                fontSize: "12px",
                lineHeight: "20px"
            }),
            hover: {}
        }
    },
    //#endregion

    //#region 啟用狀態 Tag
    assignEnable: {
        container: {
            basic: (style, props) => ({
                ...style,
                margin: "0",
                padding: "0px 7px",
                fontSize: "12px",
                lineHeight: "20px"
            }),
            hover: {}
        }
    }
    //#endregion

    //#endregion

}
