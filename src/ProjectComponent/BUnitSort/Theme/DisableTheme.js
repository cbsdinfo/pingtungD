export default {
    container: {
        basic: {
            //#region SubContainer預設樣式
            flexGrow: "0",
            maxWidth: "none",
            flexBasis: "auto",
            boxSizing: "border-box",
            occupy: (c) => ({ maxWidth: c * 100 / 12 + '%', flexBasis: c * 100 / 12 + '%' }),//調用時請使用如 ...(style.occupy(10))
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
            lineHeight: "normal",
            padding: "0.5rem",
            backgroundColor: "transparent",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: 'rgba(0, 0, 0, 0.25)'
            //#endregion
        }
    },
    topLabel: {
        basic: {
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            fontSize: "14px",
            color: " rgba(0, 0, 0, 0.85)",
            height: "2rem",
            userSelect: "none",
            cursor: "default"
            //#endregion
        }
    },
    bottomLabel: {
        basic: {
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            fontSize: "14px",
            color: " rgba(0, 0, 0, 0.85)",
            height: "0",// 自行調整
            userSelect: "none",
            cursor: "default"
            //#endregion
        }
    },
    textInputContainer: {
        basic: (style, props) => ({
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
            lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: 'rgba(0, 0, 0, 0.65)',
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            padding: "2px",
            width: "100%"
            //#endregion
        }),
        hover: {
            //#region 覆寫樣式
            color: '#1890ff',
            //#endregion
        },
    },
    textInput: {
        basic: (style, props) => {
            //console.log(props.leftIcon);
            return {
                //#region BasicContainer 原生樣式
                backgroundColor: "#e0e0e0",
                border: "1px solid rgba(118, 118, 118, 0.3)",
                borderRadius: "2px",
                color: "rgba(0, 0, 0, 0.65)",
                height: "2rem",
                fontSize: "14px",
                width: "100%",
                //margin: "1.25rem .3125rem .3125rem",
                padding: `5px ${!(props.openEye || props.rightIcon) ? " 12px" : " 2rem"} 5px${!props.leftIcon ? " 12px" : " 2rem"}`,
                outline: 0,
                cursor: "auto",
                fontFamily: "'Noto Sans TC', sans-serif",
                boxSizing: "border-box",
                //#endregion
            }
        },
        hover: {
            //#region 覆寫樣式
            backgroundColor: "#e0e0e0"
            //#endregion
        },
    },
    eyeIcon: {
        basic: {
            position: "absolute",
            height: "100%",
            right: "12px",
            cursor: "pointer",
            top: 0,
            color: 'rgba(0, 0, 0, 0.65)',
        }
    }
}