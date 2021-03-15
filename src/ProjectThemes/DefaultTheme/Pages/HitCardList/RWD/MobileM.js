export default {
    //#region 標題名稱
    titleBar: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 700,
            fontSize: "30px",
            lineHeight: "56px",
            color: "#3C4856",
        })
    },
    //#endregion

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
                    padding: "16px"
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "0", //188 是授權圖高度
                    backgroundColor: "#3c4856",
                    // height:""
                }
            }
        },
    },
    //#endregion

    //#region 打卡紀錄 容器
    hitCardList: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            minHeight: `calc( ${props.height}px - 56px - 32px - 50px )`,
            backgroundColor: "#fff",
            padding: "12px 20px"
        })
    },
    //#endregion

    //#region 選擇日期區間 DateTimeRange 
    dateTimeRange: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0px 8px 8px",
                display: "inline-block",
                // width: "100%"
                ...style.occupy(6),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                padding: "0px 8px 8px",
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

    //#region 列表標題
    //#region 列表標題 容器
    listTitleContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            width: "100%",
            backgroundColor: "#fff",
            margin: "0 0 2px",
            padding: "0px 0px 6px"
        })
    },
    //#endregion

    //#region 日期 標題
    dateTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "22%",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "55px",
            color: "#fff",
            backgroundColor: "#6B6B6B",
            // margin: "0 6px 0 0"
        })
    },
    //#endregion

    //#region 上班 標題
    startWorkTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "55px",
            color: "#fff",
            backgroundColor: "#6B6B6B",
            flexGrow: 1
        })
    },
    //#endregion

    //#region 下班 標題
    endWorkTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "55px",
            color: "#fff",
            backgroundColor: "#6B6B6B",
            flexGrow: 1
        })
    },
    //#endregion
    //#endregion

    //#region 列表內文
    //#region 列表內文外側 容器
    listOutContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            backgroundColor: "#fff",
        })
    },
    //#endregion

    //#region 列表內文 容器
    listContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            width: "100%",
            border: "dashed 2px #ababab",
            // padding: "6px 0px"
        })
    },
    //#endregion

    //#region 日期(年) 內文
    hitCardYearText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            textAlign: "center",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "29px",
            color: "#FFFFFF",
            top: "5px"
            // backgroundColor: "#3f3f3f",
            // borderBottom: "1px dashed #D8D8D8"
        })
    },
    //#endregion

    //#region 日期(日) 內文
    hitCardDateText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            textAlign: "center",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "29px",
            color: "#FFFFFF",
            top: "-5px"
            // backgroundColor: "#3f3f3f",
            // borderBottom: "1px dashed #D8D8D8"
        })
    },
    //#endregion

    //#region 箭頭icon
    arrowIcon: {
        backgroundColor: "#e5e5e5",
        height: "auto",
        color: "#3C4856",
        position: "absolute",
        left: "8px",
        top: "25px"
    },
    //#endregion

    //#region 時間 內文
    timeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "22px",
            lineHeight: "58px",
            color: "#3D3D3D",
            backgroundColor: "#e5e5e5",
            flexGrow: 1,
            // borderBottom: "1px dashed #D8D8D8"
        })
    },
    //#endregion
    //#endregion
}