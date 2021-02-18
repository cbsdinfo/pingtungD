export default {
    //#region 標題列
    titleBar: {
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "96px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "1014px"
            })
        }
    },
    //#endregion   
    //#region 關鍵字 Keyword
    keyword: {
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
        selectorContainer: {
            basic: (style, props) => ({
                ...style,
                width: "200px"
            })
        },
        textInputContainer: {
            basic: (style, props) => {

                return {
                    ...style,
                    width: "200px",
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

                }
            }
        }
    },
    //#endregion
    //#region 關鍵字 右方圖標
    keywordRightIcon: {
        position: "absolute",
        height: "100%",
        right: "12px",
        cursor: "pointer",
        top: 0,
    },
    //#endregion
    //#region 新增按鈕
    addButton: {
        basic: (style) => ({
            ...style,
            width: "82px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#389E0D",
            borderColor: "#389E0D",
            borderRadius: "2px",
            margin: "0 8px"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(56, 158, 13 ,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 新增按鈕 圖標
    addButtonIcon: {
        position: "relative",
        // height: "100%",
        // right: "12px",
        right: "5px",
        cursor: "pointer",
        top: "2px",
    },
    //#endregion
    //#region 編輯按鈕
    toEditButton: {
        basic: (style) => ({
            ...style,
            width: "82px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#1890ff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: "0 8px"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255 ,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 編輯按鈕 圖標
    toEditButtonIcon: {
        position: "relative",
        // height: "100%",
        right: "5px",
        cursor: "pointer",
        top: "2px",
    },
    //#endregion
    //#region 刪除按鈕
    toDeleteButton: {
        basic: (style) => ({
            ...style,
            width: "82px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#FF4D4F",
            borderColor: "#FF4D4F",
            borderRadius: "2px",
            margin: "0 0 0 8px"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255, 77, 79, 0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 刪除按鈕 圖標
    toDeleteButtonIcon: {
        position: "relative",
        // height: "100%",
        right: "5px",
        cursor: "pointer",
        top: "2px",
    },
    //#endregion

    //#region Table區域
    //#region Table容器
    tableContainer: {
        basic: (style, props) => ({
            ...style,
            height: "calc( 100vh - 219px - 4px )",
            width: "100%",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
        })
    },
    //#endregion

    //#region 編輯按鈕
    editButton: {
        basic: (style) => ({
            ...style,
            width: "44px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: "0 4px 0 0",
            // position: "absolute",
            fontWeight: "400",
            // left: "92px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 刪除按鈕
    deleteButton: {
        basic: (style) => ({
            ...style,
            width: "44px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#FF4D4F",
            borderColor: "#FF4D4F",
            borderRadius: "2px",
            margin: "0 0 0 4px",
            // position: "absolute",
            fontWeight: "400",
            // left: "196px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255, 77, 79, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
}
