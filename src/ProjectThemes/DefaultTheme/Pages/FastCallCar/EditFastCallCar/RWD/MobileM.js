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
                    padding: "8px 0 60px", //188 是授權圖高度
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
            padding: "16px 0",
            width: "100%",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "26px",
            color: "rgba(0,0,0,0.85)",
            backgroundColor: "#EEEEEE"
        })
    },
    //#endregion

    //#region 標題列 預約訂車分頁
    titleBarEditFastCallCarTab: {
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