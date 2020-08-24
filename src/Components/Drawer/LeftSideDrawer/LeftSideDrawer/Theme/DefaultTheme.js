export default {
    //#region 展開Menu
    container: {
        basic: (style, props) => {
            // console.log("style", style)
            // console.log("props", props)
            return {
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
                height: "100%",
                left: `${props.collapse ? "-100%" : "0rem"}`,//"-100%",
                top: 0,
                backgroundColor: "rgba(0,0,0,0.2)",
                zIndex: 100,
                transition: "left 0s ease-in-out",
                //boxShadow: "inset -1px 0px 0px #f0f0f0"
                //#endregion
            }
        }
    },
    content: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            minWidth: "15rem",//'0',//修復滾動條 x 方向
            lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            //#endregion
            //#region 覆寫樣式
            position: "fixed",
            width: "60%",
            maxWidth: "15rem",
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            height: "100%",
            left: `${props.collapse ? "-17rem" : "0rem"}`,//"-100%",,
            top: 0,
            backgroundColor: "rgba(255,255,255)",
            zIndex: 101,
            transition: "left .3s ease-in-out",
            boxShadow: "0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)"
            //#endregion
        })
    }
    //#endregion
}