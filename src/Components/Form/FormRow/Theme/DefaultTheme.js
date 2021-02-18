export default {
    container: {
        basic: {
            //#region Container 原生樣式
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            boxSizing: "border-box",
            flexDirection: "row",//控制子組件排列方向: row、row-reverse、column、column-reverse
            justifyContent: "flex-start",  //控制子組件在水平方向上的對齊: flex-start、center、flex-end、space-between、space-around、space-evenly
            alignItems: "flex-start",   //控制子組件在垂直方向上的對齊: flex-start、center、flex-end、stretch、baseline
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            height: "auto",
            minWidth: '0',//修復滾動條 x 方向
            backgroundColor: "transparent",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: '#000'
            //#endregion
        }
    }
}
