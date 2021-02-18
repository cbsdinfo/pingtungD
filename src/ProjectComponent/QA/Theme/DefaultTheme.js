export default {
    //#region 最外層容器樣式
    container: {
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
            // width: "auto",
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
            width: "100%",
            borderRadius: "16px",
            overflowY: "hidden",
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion

    //#region 問題容器樣式
    questionContainer: {
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
            // width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
            lineHeight: "normal",
            //#endregion
            //#region 背景
            // backgroundColor: "transparent",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            //#endregion
            //#region 游標
            // cursor: "auto",
            //#endregion
            //#region 字體
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            // color: '#000',
            //#endregion
            width: "100%",
            padding: "24px 48px",
            backgroundColor: "#fff",
            boxShadow: props.actived ? "inset 0px 1px 0px #1890FF" : "unset",
            color: props.actived ? "#1890FF" : "rgba(0, 0, 0, 0.65)",
            cursor: "pointer"
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion

    //#region 問題文字
    questionText: {
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
            // lineHeight: "normal",
            //#endregion
            //#region 字體
            whiteSpace: "normal",
            // textAlign: 'initial',
            // fontSize: "medium",
            // color: '#000',
            //fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
            //fontFamily: "Noto",
            fontFamily: `'Noto Sans TC', sans-serif`,
            // fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: "24px",
            textAlign: "left",
            color: "inherit"
        })
    },
    //#endregion

    //#region 問題圖標
    questionHeadIcon: {
        position: "absolute",
        top: "3px",
        left: "-24px"
    },
    //#endregion

    //#region 問題展開圖標
    questionOpenIcon: {
        position: "absolute",
        top: "0px",
        right: "-24px"
    },
    //#endregion

    //#region 問題關閉圖標
    questionCloseIcon: {
        position: "absolute",
        top: "0px",
        right: "-24px"
    },
    //#endregion

    //#region 答案容器樣式
    answerContainer: {
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
            // width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
            lineHeight: "normal",
            //#endregion
            //#region 背景
            // backgroundColor: "transparent",
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
            width: "100%",
            // padding: "24px 48px",
            backgroundColor: "#E6F7FF",
            boxShadow: "inset 0px -1px 0px #1890FF",
            maxHeight: "0rem",
            transition: "max-height .3s ease-in-out",
            overflowY: "hidden",
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion

    //#region 答案文字
    answerText: {
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
            // textAlign: 'initial',
            // fontSize: "medium",
            color: '#000',
            //fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
            //fontFamily: "Noto",
            fontFamily: `'Noto Sans TC', sans-serif`,
            // fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
            textAlign: "left",
            padding: "24px 48px",
        })
    },
    //#endregion

    //#region 答案圖標
    answerHeadIcon: {
        position: "absolute",
        top: "26px",
        left: "24px"
    },
    //#endregion

}