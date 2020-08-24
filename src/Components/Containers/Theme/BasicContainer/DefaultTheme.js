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
        //#region 背景
        backgroundColor: "transparent",
        backgroundImage: "none",
        backgroundPosition: "0% 0%",
        backgroundRepeat: "repeat",
        backgroundSize: "auto auto",
        //#endregion
        //#region 游標
        cursor: "auto",
        //#endregion
        //#region 字體
        whiteSpace: "normal",
        textAlign: 'initial',
        fontSize: "medium",
        color: '#000'
        //#endregion
    },
    hover: {

    }
}
