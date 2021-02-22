export default {
    //#region 最外層容器樣式
    outcontainer: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            // width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // height: "auto",
            lineHeight: "normal",
            // backgroundColor: "transparent",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: '#000',
            //#endregion 
            //#region 覆寫樣式
            width: "100%",
            height: "auto",
            padding: "12px 5px 0",
            backgroundColor: "#3c4856",
            // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            // borderRadius: "2px",
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region 頁簽 容器 
    container: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            //#endregion
            //#region 覆寫樣式
            display: "block",
            position: "relative",
            // width: "calc( 100% - 15rem )",
            width: "100%",
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            height: props?.type ? "32px" : "55px",
            // top: "4rem",
            // right: 0,
            // backgroundColor: "rgba(255,255,255)",
            // borderBottom: "1px solid #f0f0f0"
            //transition: "left .3s ease-in-out",
            //boxShadow: "0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)"
            //#endregion
        })
    },
    //#endregion
    //#region ScrollBar 樣式
    scrollBar: {
        basic: {
            maxHeight: "100%",
            maxWidth: "100%",
            height: "100%"
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
            width: "8px",
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
    //#endregion
    //#region Tab標籤容器樣式
    content: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            textAlign: 'initial',
            position: "relative",
            //#endregion
            //#region 覆寫樣式
            display: "block",
            width: "auto",
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            // height: "100%",
            // backgroundColor: "rgba(255,255,255)",
            whiteSpace: "nowrap",
            padding: "0",
            // padding: "0 1.5rem"
            //#endregion
            height: props?.type ? "32px" : "55px",
        })
    },
    //#endregion

    //#region 主要內容上半部
    topContainer: {
        basic: {
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            textAlign: 'initial',
            position: "relative",
            //#endregion
            //#region 覆寫樣式
            display: "block",
            width: "100%",
            color: "rgba(61,61,61,1)",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            // height: "100%",
            backgroundColor: "#fff",
            whiteSpace: "nowrap",
            padding: "0",
            // padding: "0 1.5rem"
            //#endregion
            // height: "55px",
            height: "auto",
            minHeight: "55px",
            borderBottom: "1px solid #D8D8D8",
        }
    },
    //#endregion

    //#region 主要內容下半部
    bottomContainer: {
        basic: {
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            textAlign: 'initial',
            position: "relative",
            //#endregion
            //#region 覆寫樣式
            display: "block",
            width: "100%",
            color: "rgba(61,61,61,1)",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            // height: "100%",
            backgroundColor: "#fff",
            whiteSpace: "nowrap",
            padding: "0",
            // padding: "0 1.5rem"
            //#endregion
            height: "auto",
            borderBottom: "1px solid #D8D8D8",
        }
    },
    //#endregion

}

