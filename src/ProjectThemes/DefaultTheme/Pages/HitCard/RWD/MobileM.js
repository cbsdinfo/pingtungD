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

    //#region 日期
    nowDateText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "36px",
            lineHeight: "42px",
            color: "#fff",
            backgroundColor: "transparent",
            margin: "0 0 8px"
        })
    },
    //#endregion

    //#region 打卡紀錄 容器
    hitCardList: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            backgroundColor: "#fff",
            padding: "12px 16px"
        })
    },
    //#endregion

    //#region 列表標題 容器
    listTitleContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            backgroundColor: "#fff",
            padding: "12px 16px"
        })
    },
    //#endregion

    //#region 打卡 標題
    hitCardTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "36px",
            lineHeight: "42px",
            color: "#fff",
            backgroundColor: "##6B6B6B",
            margin: "0 0 8px"
        })
    },
    //#endregion
}