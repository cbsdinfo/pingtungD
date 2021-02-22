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
            minHeight: `calc( ${props.height}px - 56px - 32px - 50px )`,
            backgroundColor: "#fff",
            padding: "12px 20px"
        })
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
            margin: "0 0 2px"
        })
    },
    //#endregion

    //#region 打卡 標題
    hitCardTitle: {
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
            margin: "0 6px 0 0"
        })
    },
    //#endregion

    //#region 時間 標題
    timeTitle: {
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
        })
    },
    //#endregion

    //#region 打卡 內文
    hitCardText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "22%",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "30px",
            lineHeight: "58px",
            color: "#3D3D3D",
            backgroundColor: "transparent",
            borderBottom: "1px dashed #D8D8D8"
        })
    },
    //#endregion

    //#region 時間 內文
    timeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "30px",
            lineHeight: "58px",
            color: "#3D3D3D",
            backgroundColor: "transparent",
            flexGrow: 1,
            borderBottom: "1px dashed #D8D8D8"
        })
    },
    //#endregion
    //#endregion
}