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
                    backgroundColor: "#fff",
                    height: `calc( ${props.height}px - 56px )`,
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "14px 30px 0", //188 是授權圖高度
                    // height:""
                }
            }
        },
    },
    //#endregion

    //#region 標題 文字
    titleText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            backgroundColor: "#3C4856",
            height: "55px",
            // textAlign: "center",
            textAlignLast: "justify",
            color: "#fff",
            fontSize: "18px",
            lineHeight: "45px",
            padding: "5px 20px",
            borderRadius: "50px"
        })
    },
    //#endregion

    //#region 小標題 文字
    subTitleText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            // backgroundColor: "#3C4856",
            // height: "55px",
            // textAlign: "center",
            color: "#444",
            fontSize: "18px",
            // lineHeight: "45px",
            padding: "18px 0",
            fontWeight: "bold"
        })
    },
    //#endregion

    //#region 內文 文字
    contentText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            // backgroundColor: "#3C4856",
            // height: "auto",
            // textAlign: "center",
            color: "#666",
            fontSize: "16px",
            // lineHeight: "45px",
            padding: "0 0 16px 0",
            borderBottom: "1px solid #9a9a9a"
        })
    },
    //#endregion

    //#region 中間內文 文字(無底線)
    midContentText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            // backgroundColor: "#3C4856",
            // height: "auto",
            // textAlign: "center",
            color: "#666",
            fontSize: "16px",
            // lineHeight: "45px",
            padding: "0 0 16px 0",
            // borderBottom:"1px solid #9a9a9a"
        })
    },
    //#endregion

}