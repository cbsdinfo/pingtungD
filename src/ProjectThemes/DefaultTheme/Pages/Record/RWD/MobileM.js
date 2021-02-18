export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#FFFFFF",
                    padding: 0
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    height: `calc(  ${props.height}px - 197px)`,
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "1px 0 48px",
                    minHeight: `calc(  ${props.height}px - 197px)`
                }
            }
        },
    },
    //#endregion

    //#region 過去訂單按鈕
    preOrderButton: {
        basic: (style, props) => ({
            ...style,
            width: "50%",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: props.orderStatus === "1" ? "#fff" : "#1890ff",
            backgroundColor: props.orderStatus === "1" ? "#1890ff" : "#fff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: 0
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: props.orderStatus === "2" ? "rgba(24,144,255,0.05)" : ""
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 未來訂單按鈕
    futureOrderButton: {
        basic: (style, props) => ({
            ...style,
            width: "50%",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: props.orderStatus === "2" ? "#fff" : "#1890ff",
            backgroundColor: props.orderStatus === "2" ? "#1890ff" : "#fff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: 0
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: props.orderStatus === "1" ? "rgba(24,144,255,0.05)" : ""
        }),
        focus: (style, props) => ({})
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
                padding: "8px 16px",
                width: "100%"
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
                    width: "100%",
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
    titleBarRecordTab: {
        basic: (style, props) => ({
            ...style,
            display: "inline-grid",
            // margin: "0 16px",
            lineHeight: "32px",
            height: "46px",
            fontSize: "14px",
            cursor: "pointer",
            width: "33%",
            color: (props.isActive ? "#1890FF" : "rgba(0, 0, 0, 0.65)"),
            borderBottom: (props.isActive ? "solid 2px #1890FF" : "unset"),
            textAlign: "center",
            alignItems: "center"
        }),
    },
    //#endregion
}