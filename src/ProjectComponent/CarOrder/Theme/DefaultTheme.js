export default {
    //#region 最外層容器樣式
    container: {
        basic: (style, props) => ({
            //#region Flex設置
            flexGrow: "0",
            maxWidth: "none",
            flexBasis: "auto",
            boxSizing: "border-box",
            occupy: (c) => ({ maxWidth: c * 100 / 12 + '%', flexBasis: c * 100 / 12 + '%' }),//調用時請使用如 ...(style.occupy(10))
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
            color: '#000',
            //#endregion
            border: props.mainColor ? `2px solid ${props.mainColor}` : "2px solid #1890ff",
            borderRadius: "0px 0px 8px 8px",
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion

    //#region 標題列容器
    title: {
        basic: (style, props) => ({
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
            // height: "auto",
            // lineHeight: "normal",
            //#endregion
            //#region 字體
            whiteSpace: "normal",
            textAlign: 'initial',
            // fontSize: "medium",
            //fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
            //fontFamily: "Noto",
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            backgroundColor: props.mainColor ? props.mainColor : "#1890ff",
            color: '#fff',
            fontSize: "14px",
            lineHeight: "22px",
            height: "38px",
            padding: "8px 16px"

        }),
        hover: {

        }
    },
    //#endregion

    //#region 內容容器
    content: {
        basic: (style, props) => ({
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
            color: '#000',
            //#endregion
            padding: "16px 0"
        }),
        hover: {

        }
    }
    //#endregion

}