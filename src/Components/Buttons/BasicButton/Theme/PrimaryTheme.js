export default {
    container: {
        basic: {
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",
            minWidth: '0',
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            whiteSpace: "normal",
            //#endregion
            //#region 覆寫樣式
            backgroundColor: "#1976d2",
            color: "#fff",
            borderRadius: "4px",
            textAlign: "center",
            fontSize: ".875em",
            cursor: "pointer",
            fontWeight: 400,
            width: "140px",
            height: "40px",
            lineHeight: "40px",
            userSelect: "none",
            display: "inline-block"
            //margin: "auto auto 12px",
            //#endregion
        },
        hover: {
            //#region 覆寫樣式
            backgroundColor: "#115293"
            //#endregion
        }
    },
    text: {
        basic: {
            //#region Text 原生樣式
            boxSizing: "border-box",
            position: "relative",
            width: "auto",
            minWidth: '0',
            height: "auto",
            lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            //fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
            //fontFamily: "Noto",
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            display: "inline-block",
            color: "inherit"
            //#endregion
        },
        hover: {

        }
    }
}
