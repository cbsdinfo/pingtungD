export default {
    //#region 最外層容器樣式
    container: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            minWidth: '0',//修復滾動條 x 方向
            whiteSpace: "normal",
            textAlign: 'initial',
            //#endregion
            //#region 覆寫樣式
            display: "inline-block",//
            position: "relative",
            //width: "calc( 100% - 15rem )",
            color: "#52c41a", //
            cursor: "default",
            fontSize: "0.875rem",
            fontWeight: 400,//"normal",
            lineHeight: "1rem",
            outline: 0,
            userSelect: "none",
            backgroundColor: "#f6ffed", //
            border: "1px solid #b7eb8f", //
            borderRadius: "2px", //
            margin: "11px 0.5rem 10px 0", //
            padding: `0.25rem ${props.onClose ? "1.3125rem" : "0.5rem"} 0.25rem 0.5rem`,//
            //fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
            //fontFamily: "Noto",
            fontFamily: `'Noto Sans TC', sans-serif`,
            //transition: "left .3s ease-in-out",
            //boxShadow: "0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)"
            //#endregion
        }),
        hover: {
            backgroundColor: "#b7eb8f"
        }
    },
    closeIcon: {
        basic: {
            position: "absolute",
            height: "0.875rem",
            width: "1rem",
            right: "0.1rem",
            top: "0.4rem",
            color: "#52c41a"
        }
    }
    //#endregion
}