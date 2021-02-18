export default {
    //#region 灰階背景
    outContainer: {
        basic: {
            //#region Container預設樣式
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            boxSizing: "border-box",
            flexDirection: "row",//控制子組件排列方向: row、row-reverse、column、column-reverse
            justifyContent: "flex-start",  //控制子組件在水平方向上的對齊: flex-start、center、flex-end、space-between、space-around、space-evenly
            //alignItems: "flex-start",   //控制子組件在垂直方向上的對齊: flex-start、center、flex-end、stretch、baseline
            // position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            // height: "auto",
            minWidth: '0',//修復滾動條 x 方向
            //backgroundColor: "transparent",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: '#000',
            //#endregion
            //#region 覆寫樣式
            position: "fixed",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            alignItems: "center",
            padding: "0 24px",
            zIndex: 1000
            //#endregion
        }
    },
    //#endregion
    //#region 對話框容器
    container: {
        basic: {
            //#region BacisContainer預設樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            // width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
            lineHeight: "normal",
            // backgroundColor: "transparent",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: '#000',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            backgroundColor: "#ffffff",
            boxShadow: "0px 9px 28px rgba(0, 0, 0, 0.05), 0px 3px 6px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08)",
            borderRadius: "2px"
            //#endregion
        }
    },
    //#endregion
    //#region 標題
    title: {
        basic: {
            //#region 預設樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            // width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // height: "auto",
            // lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            // color: '#000',
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            height: "55px",
            padding: "0 0 0 24px",
            lineHeight: "55px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 9px 28px rgba(0, 0, 0, 0.05), 0px 3px 6px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08)",
            borderRadius: "2px",
            color: "rgba(0, 0, 0, 0.65)"
            //#endregion
        }
    },
    //#endregion
    //#region 關閉按紐
    closeIcon: {
        basic: {
            position: "absolute",
            right: "20px",
            height: "100%",
            color: "black"
        }
    },
    //#endregion
    //#region 內容容器
    contentContainer: {
        basic: {
            //#region BacisContainer預設樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            // width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
            lineHeight: "normal",
            // backgroundColor: "transparent",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: '#000',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            backgroundColor: "#ffffff",
            padding: "32px 32px 24px"
            //#endregion
        }
    },
    //#endregion
    //#region icon右方文字
    iconRightText: {
        basic: {
            //#region 預設樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            // width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // height: "auto",
            // lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            // fontSize: "medium",
            // color: '#000',
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            height: "22px",
            padding: "0 0 0 38px",
            lineHeight: "22px",
            backgroundColor: "#ffffff",
            fontSize: "14px",
            color: "rgba(0, 0, 0, 0.65)"
            //#endregion
        }
    },
    //#endregion

    //#region 各種 icon 按鈕
    //#region warnIcon 按鈕
    warnIcon: {
        basic: {
            position: "absolute",
            left: "0px",
            height: "100%",
            color: "#faad14"
        }
    },
    //#endregion
    //#region successIcon 按鈕
    successIcon: {
        basic: {
            position: "absolute",
            left: "0px",
            height: "100%",
            color: "#52c41a"
        }
    },
    //#endregion
    //#endregion

    //#region 下方確認、取消按扭容器
    yesOrNoContainer: {
        basic: {
            //#region BacisContainer預設樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            // width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // height: "auto",
            lineHeight: "normal",
            // backgroundColor: "transparent",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: '#000',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            height: "53px",
            backgroundColor: "#ffffff",
            padding: "32px 32px 24px",
            boxShadow: "inset 0px 1px 0px #F0F0F0"
            //#endregion
        }
    },
    //#endregion
}