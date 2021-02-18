export default {
    container: {
        basic: {
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "100%",
            minWidth: '0',//修復滾動條 x 方向
            height: "100%",
            lineHeight: "normal",
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
    },
    containerScrollBar: {
        basic: {
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            //borderRight: "1px solid #f0f0f0",
            boxSizing: "border-box",
        }
    },
    contentContainer: {
        basic: {
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "100%",
            minWidth: '0',//修復滾動條 x 方向
            height: "fit-content",
            lineHeight: "normal",
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
