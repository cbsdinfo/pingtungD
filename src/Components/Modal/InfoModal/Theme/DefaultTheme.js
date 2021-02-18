export default {
    //#region 最外層容器
    outContainer: {
        basic: {
            //#region Container預設樣式
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            boxSizing: "border-box",
            flexDirection: "row",//控制子組件排列方向: row、row-reverse、column、column-reverse
            // justifyContent: "flex-start",  //控制子組件在水平方向上的對齊: flex-start、center、flex-end、space-between、space-around、space-evenly
            //alignItems: "flex-start",   //控制子組件在垂直方向上的對齊: flex-start、center、flex-end、stretch、baseline
            // position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            // height: "auto",
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
            color: '#000',
            //#endregion
            //#region 覆寫樣式
            position: "fixed",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            height: "100%",
            alignItems: "center",
            padding: "0 24px",
            zIndex: 1000,
            justifyContent: "center",
            top: 0,
            //#endregion
        }
    },
    //#endregion
    //#region 對話框容器
    container: {
        basic: (style, props) => {
            // console.log(props)
            return {
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
                borderRadius: "2px",
                transform: props.isClose ? "scale(0.1, 0.1)" : "scale(1, 1)",
                transition: "transform .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
                zIndex: 1002
                //#endregion
            }
        },
        tablet: {
            basic: (style, props) => {
                return {
                    maxWidth: "416px"
                }
            },
        },
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
            color: "rgba(0, 0, 0, 0.65)",
            userSelect: "none",
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
    //#region errorIcon 按鈕
    errorIcon: {
        basic: {
            position: "absolute",
            left: "0px",
            height: "100%",
            color: "#ff4d4f"
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
            // textAlign: 'initial',
            fontSize: "medium",
            color: '#000',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            height: "53px",
            backgroundColor: "#ffffff",
            padding: "0 0 24px 0",
            textAlign: 'right',
            //boxShadow: "inset 0px 1px 0px #F0F0F0"
            //#endregion
        }
    },
    //#endregion
    //#region 下方取消按扭
    noButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "fit-content",
                background: "#fff",
                boxShadow: "0 2px 0 rgba(0,0,0,.015)",
                border: "1px solid #d9d9d9",
                borderRadius: "2px",
                height: "32px",
                margin: "0 8px 0 0",
                color: "rgba(0,0,0,.85)",
                padding: "0 16px",
            }),
            hover: (style, props) => ({
                ...style,
                color: "#40a9ff",
                background: "#fff",
                borderColor: "#40a9ff"
            })
        },
        text: {
            basic: (style, props) => ({
                ...style,
                fontSize: "14px",
                lineHeight: "32px",
                top: "-3px",
                fontWeight: "300"
            }),
        }
    },
    //#endregion
    //#region 下方確認按扭
    yesButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "fit-content",
                background: "#1890ff",
                boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
                borderRadius: "2px",
                height: "32px",
                margin: "0 32px 0 0",
                padding: "0 16px",
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "#40a9ff"
            })
        },
        text: {
            basic: (style, props) => ({
                ...style,
                fontSize: "14px",
                lineHeight: "32px",
                top: "-3px",
                fontWeight: "300"
            }),
        }
    },
    //#endregion
    //#region 灰階背景
    background: {
        basic: (style, props) => {
            // console.log(props)
            return {
                //#region BacisContainer預設樣式
                boxSizing: "border-box",
                // position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
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
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                height: "100%",
                width: "100%",
                position: "absolute",
                left: 0,
                zIndex: "1001"
                //#endregion
            }
        }
    }
    //#endregion

}