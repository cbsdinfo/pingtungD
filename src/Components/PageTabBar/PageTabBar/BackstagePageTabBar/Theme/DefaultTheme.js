export default {
    //#region 最外層容器樣式
    container: {
        basic: {
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            //#endregion
            //#region 覆寫樣式
            display: "block",
            position: "fixed",
            width: "calc( 100% - 15rem )",
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            height: "3.125rem",
            top: "4rem",
            right: 0,
            backgroundColor: "rgba(255,255,255)",
            borderBottom:"1px solid #f0f0f0"
            //transition: "left .3s ease-in-out",
            //boxShadow: "0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)"
            //#endregion
        }
    },
    //#endregion
    //#region ScrollBar 樣式
    scrollBar: {
        basic: {
            maxHeight: "100%",
            maxWidth: "100%",
            height:"100%"
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
            width: "fit-content",
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            height: "100%",
            backgroundColor: "rgba(255,255,255)",
            whiteSpace: "nowrap",
            padding:"0 1.5rem"
           //#endregion
        }
    },
    //#endregion
}