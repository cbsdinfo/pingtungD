export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#FFFFFF",
                    padding: 0,
                    boxShadow: "inset 0 -1px #F0F0F0"
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                console.log(props)
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    height: `calc( ${props.vh}px - 152px)`,
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "0",
                    minHeight: "100%"
                }
            }
        },
    },
    //#endregion

    //#region 標題文字
    titleText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "48px",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "48px",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 常見問題容器
    qAContainer: {
        basic: (style, props) => ({
            ...style,
            // padding: "0 0px 24px",
            minHeight: `calc( ${props.vh}px - 152px)`,
        })
    },
    //#endregion

    //#region 沒有更多問題
    noMoreData: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            textAlign: "center",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#1890FF",
            padding: "16px 0"
        })
    }
    //#endregion
}