export default {
    //#region 展開Menu
    container: {
        basic: {
            //#region BasicContainer 原生樣式
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            boxSizing: "border-box",
            flexDirection: "row",//控制子組件排列方向: row、row-reverse、column、column-reverse
            justifyContent: "space-between",  //控制子組件在水平方向上的對齊: flex-start、center、flex-end、space-between、space-around、space-evenly
            alignItems: "center",   //控制子組件在垂直方向上的對齊: flex-start、center、flex-end、stretch、baseline
            minWidth: '0',//修復滾動條 x 方向
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            //#endregion
            //#region 覆寫樣式
            position: "fixed",
            height: "4rem",
            right: 0,
            top: 0,
            backgroundColor: "#1890ff",
            //boxShadow: "inset -1px 0px 0px #f0f0f0"
            //#endregion
        }
    }
    //#endregion
}