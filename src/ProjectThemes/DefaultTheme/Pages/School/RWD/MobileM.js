export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fff",
                    padding: "0px 0px" // 標題列的padding
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#3C4856",
                    height: `calc( ${props.height}px - 56px )`,
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "0", //188 是授權圖高度
                    // height:""
                }
            }
        },
    },
    //#endregion

    //#region 標題列
    titleBar: {
        basic: (style, props) => ({
            ...style,
            textAlign: "center",
            boxShadow: "inset 0px -1px 0px #DBE4E8",
        })
    },
    //#endregion

    //#region 標題列 預約訂車分頁
    titleBarCallCarTab: {
        basic: (style, props) => ({
            ...style,
            display: "inline-grid",
            // margin: "0 16px",
            lineHeight: "32px",
            height: "46px",
            fontSize: "14px",
            cursor: "pointer",
            width: "25%",
            color: (props.isActive ? "#1890FF" : "rgba(0, 0, 0, 0.65)"),
            borderBottom: (props.isActive ? "solid 2px #1890FF" : "unset"),
            textAlign: "center",
            alignItems: "center"
        }),
    },
    //#endregion

    //#region 選擇日期區間 DateTimeRange 
    dateTimeRange: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "8px 16px",
                display: "inline-block",
                width: "100%"
                // ...style.occupy(12),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                padding: "8px 16px",
                width: "100%"
                // ...style.occupy(12),
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
                    // width: "100%",
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

    //#region 詳細資料外側容器
    detailOutContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            minHeight: `calc( ${props.height}px - 230px )`,
            margin: "16px 0 0",
            textAlign: "right",
            padding: "0 16px"
        }),
    },
    //#endregion

    //#region 詳細資料容器
    detailContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            padding: "24px",
            backgroundColor: "#fff",
            borderRadius: "8px",
        }),
    },
    //#endregion

    //#region 詳細資料 標題
    detailHeader: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "28px",
            boxShadow: "inset 0px -1px #D9D9D9",
            color: "#00628F",
            padding: "0 0 16px",
            wordBreak: "break-all"
        }),
    },
    //#endregion

    //#region 詳細資料 內文
    newsEditor: {
        viewTypeTextEditor: {
            basic: (style, props) => ({
                ...style,
                wordBreak: "break-all"
            })
        },
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 24px 0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        textEditor: {
            basic: (style, props) => ({
                ...style,
                height: "500px",
            })
        },
    },
    //#endregion

    //#region 回列表按鈕
    returnButton: {
        basic: (style) => ({
            ...style,
            width: "74px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#1890ff",
            backgroundColor: "#fff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: "16px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24,144,255,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

}