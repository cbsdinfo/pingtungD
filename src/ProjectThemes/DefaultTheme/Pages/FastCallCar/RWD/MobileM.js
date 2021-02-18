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
                    backgroundColor: "#DBE4E8",
                    height: `calc(  ${props.height}px - 56px - 46px - 48px )`,
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "8px 0 48px ", //188 是授權圖高度
                    minHeight: `calc(  ${props.height}px - 195px)`
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
            padding: "8px 16px",
            width: "100%"
        })
    },
    //#endregion

    //#region 預約訂車按鈕
    preOrderButton: {
        basic: (style) => ({
            ...style,
            width: "50%",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#1890ff",
            backgroundColor: "#fff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: 0
        }),
        hover: (style, props) => ({
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 快速叫車按鈕
    fastOrderButton: {
        basic: (style) => ({
            ...style,
            width: "50%",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: 0
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24,144,255,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 標題列 預約訂車分頁
    titleBarFastCallCarTab: {
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



}