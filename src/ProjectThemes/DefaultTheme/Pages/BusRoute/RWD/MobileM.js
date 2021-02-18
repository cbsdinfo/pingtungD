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
                    height: `calc( ${props.height}px - 56px - 94px)`,
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "8px 0 0", //188 是授權圖高度
                    minHeight: `calc( ${props.height}px - 150px )`
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
            height: "46px",
            whiteSpace: "nowrap"
        })
    },
    //#endregion

    containerScrollBar: {
        basic: {
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            border: 0,
            boxSizing: "border-box",
        },
        scrollbarTrackX: {
            height: "8px",
            display: "block"
        },
        scrollbarThumbX: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear"
        },
        scrollbarTrackY: {
            width: 0,
            display: "block"
        },
        scrollbarThumbY: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear",
            right: "0px",
            left: "0px"
        }
    },

    //#region 標題列 營運路線分頁
    titleBarBusRouteCallCarTab: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            // margin: "0 16px",
            lineHeight: "32px",
            height: "46px",
            fontSize: "14px",
            cursor: "pointer",
            width: "33%",
            color: (props.isActive ? "#1890FF" : "rgba(0, 0, 0, 0.65)"),
            borderBottom: (props.isActive ? "solid 2px #1890FF" : "unset"),
            alignItems: "center",
            justifyContent: "center"
        }),
    },
    //#endregion



}