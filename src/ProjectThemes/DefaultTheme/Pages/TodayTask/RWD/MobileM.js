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

    //#region 司機名、打卡按鈕列
    driverNameAndTickContainer: {
        basic: (style, props) => ({
            ...style,
            height: "60px",
            backgroundColor: "#fff",
            borderTop: "solid 1px rgb(43 43 43 / 15%)",
            position: "fixed",
            width: "100%"
        })
    },
    //#endregion

    //#region 司機名Icon
    driverNameIcon: {
        top: "13px",
        position: "relative",
        left: "6px"
    },
    //#endregion

    //#region 司機名
    driverNameText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontSize: "18px",
            color: "#3B3B3B",
            top: "5px",
            left: "10px"
        })
    },
    //#endregion

    //#region 打卡按鈕
    TickBtn: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100px",
                position: "absolute",
                right: "9px",
                top: "9px",
                background: "rgba(248,169,30,1)",
                boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
                borderRadius: "28px",
                height: "40px"
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "rgba(248,169,30, 0.8)"
            })
        },
        text: {
            basic: (style, props) => ({
                ...style,
                fontSize: "24px",
                lineHeight: "32px",
                top: "3px"
            }),
        }
    },
    //#endregion

}