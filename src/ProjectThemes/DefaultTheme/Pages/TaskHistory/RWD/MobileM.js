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
                    backgroundColor: "#3c4856",
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
                padding: "8px 8px",
                display: "inline-block",
                // width: "100%"
                ...style.occupy(6),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                padding: "8px 8px",
                // width: "100%"
                ...style.occupy(6),
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

    //#region 下車地點註記
    toAddrRemarkText: {
        basic: (style, props) => ({
            ...style,
            padding: "4px 28px 0",
            fontWeight: 600,
            fontSize: "16px"
        })
    },
    //#endregion

    //#region 下車地點
    toAddrText: {
        basic: (style, props) => ({
            ...style,
            padding: "4px 28px 0",
            fontWeight: 500,
            fontSize: "14px"
        })
    },
    //#endregion

    //#region 乘車時間(月+日)
    reserveDateFirstText: {
        basic: (style, props) => ({
            ...style,
            padding: "16px 4px 0 28px",
            color: "rgba(246,126,1,1)",
            fontWeight: 600,
            fontSize: "18px",
            display: "inline-block"
        })
    },
    //#endregion

    //#region 乘車時間(時+分)
    reserveDateSecondText: {
        basic: (style, props) => ({
            ...style,
            padding: "16px 28px 0 4px",
            fontWeight: 500,
            fontSize: "18px",
            display: "inline-block"
        })
    },
    //#endregion

    //#region 輪椅icon
    wheelChairSvg: {
        top: "10px",
        position: "absolute",
        right: "135px",
    },
    //#endregion

    //#region 輪椅
    wheelChairText: {
        basic: (style, props) => ({
            ...style,
            width: "calc(100% - 180px)",
            textAlign: "right",
            padding: "16px 28px 10px 0",
            fontWeight: 600,
            fontSize: "13px",
            display: "inline-block"
        })
    },
    //#endregion

    //#region 狀態容器
    statusContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            display: "inline-block",
            padding: "12px",
            // backgroundColor: "#F5F5F5",
        })
    },
    //#endregion

    //#region 狀態內容器
    statusInsideContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            display: "inline-block",
            padding: "12px",
            backgroundColor: "#F5F5F5",
        })
    },
    //#endregion

    //#region 訂單狀態
    statusText: {
        basic: (style, props) => ({
            ...style,
            width: "40%",
            textAlign: "center",
            top: "-4px",
            // padding: "16px 28px 10px 0",
            fontWeight: 600,
            fontSize: "14px",
            display: "inline-block"
        })
    },
    //#endregion

    //#region 訂單狀態右方文字
    statusRightText: {
        basic: (style, props) => ({
            ...style,
            width: "60%",
            textAlign: "center",
            // padding: "16px 28px 10px 0",
            fontWeight: 600,
            fontSize: "28px",
            display: "inline-block"
        })
    },
    //#endregion

    //#region 箭頭圖標
    arrowSvg: {
        position: "absolute",
        top: "14px",
        right: "-5px"
    },
    //#endregion
}