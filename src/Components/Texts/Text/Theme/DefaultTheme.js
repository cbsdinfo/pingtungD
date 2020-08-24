export default {
    basic: {
        //#region 基本設置
        boxSizing: "border-box",
        // display: 需要用就傳
        // flex: 需要用就傳
        //#endregion
        //#region 定位
        position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
        //#endregion
        //#region 寬高
        width: "auto",
        minWidth: '0',//修復滾動條 x 方向
        height: "auto",
        lineHeight: "normal",
        //#endregion
        //#region 字體
        whiteSpace: "normal",
        textAlign: 'initial',
        fontSize: "medium",
        color: '#000',
        //fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
        //fontFamily: "Noto",
        fontFamily: `'Noto Sans TC', sans-serif`,
        fontWeight: 'normal',
        letterSpacing: 'normal'
        //#endregion
    },
    hover: {

    }
}