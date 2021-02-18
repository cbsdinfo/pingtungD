export default {
    //#region 最外層容器樣式
    container: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            // width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // height: "auto",
            lineHeight: "normal",
            // backgroundColor: "transparent",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: '#000',
            //#endregion 
            //#region 覆寫樣式
            width: "100%",
            height: "auto",
            padding: "48px 0",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "2px",
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region icon 容器
    iconContainer: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            // width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // height: "auto",
            lineHeight: "normal",
            // backgroundColor: "transparent",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            cursor: "auto",
            whiteSpace: "normal",
            // textAlign: 'initial',
            fontSize: "medium",
            color: '#000',
            //#endregion 
            //#region 覆寫樣式
            width: "100%",
            height: "80px",
            margin: "0 0 24px 0",
            textAlign: 'center',
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion

    //#region 中間文字
    centerText: {
        basic: (style, props) => ({
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            // width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // height: "auto",
            // lineHeight: "normal",
            whiteSpace: "normal",
            // textAlign: 'initial',
            // fontSize: "medium",
            // color: '#000',
            fontFamily: `'Noto Sans TC', sans-serif`,
            // fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            height: "32px",
            lineHeight: "32px",
            margin: "0 0 24px 0",
            color: "rgba(0, 0, 0, 0.65)",
            fontWeight: 700,
            fontSize: "24px",
            textAlign: 'center',
            //#endregion
        })
    },
    //#endregion

    //#region 下方文字
    bottomText: {
        basic: (style, props) => ({
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            // width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // height: "auto",
            // lineHeight: "normal",
            whiteSpace: "normal",
            // textAlign: 'initial',
            // fontSize: "medium",
            // color: '#000',
            fontFamily: `'Noto Sans TC', sans-serif`,
            // fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            height: "46px",
            lineHeight: "46px",
            margin: "0 0 0 0",
            color: "#ff7a45",
            fontWeight: 700,
            fontSize: "38px",
            textAlign: 'center',
            //#endregion
        })
    },
    //#endregion
}