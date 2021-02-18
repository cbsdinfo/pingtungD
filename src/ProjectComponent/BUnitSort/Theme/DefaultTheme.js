export default {
    //#region 展示模式
    //#region 容器
    viewTypeContainer: {
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
            // padding: "0.5rem",
            backgroundColor: "transparent",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: 'rgba(0, 0, 0, 0.25)',
            //#endregion
            //#region 覆寫樣式
            padding: "0 16px 0 0",
            //#endregion
        }
    },
    //#endregion
    //#region 上標題
    viewTypeTopLabel: {
        basic: {
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            minWidth: '0',//修復滾動條 x 方向
            // lineHeight: "normal",
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
            height: "32px",
            lineHeight: "22px",
            userSelect: "none",
            cursor: "default",
            // margin: "0 0 12px 0",
            padding: "0 0 0 2px"
            //#endregion
        }
    },
    //#endregion
    //#region 輸入框本體
    viewTypeTextInputContainer: {
        basic: (style, props) => ({
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            minWidth: '0',//修復滾動條 x 方向
            // height: "auto",
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
            height: "30px",
            padding: "2px",
            width: "100%",
            margin: "0 0 2px 0",
            borderBottom: "1px dashed #91D5FF",
            //#endregion
        }),
        hover: {
            //#region 覆寫樣式
            // color: '#1890ff',
            //#endregion
        },
    },
    //#endregion
    //#region 當前展示文字
    viewTypeTextInput: {
        basic: {
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            minWidth: '0',//修復滾動條 x 方向
            // lineHeight: "normal",
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
            height: "22px",
            lineHeight: "22px",
            userSelect: "none",
            cursor: "default"
            //#endregion
        }
    },
    //#endregion
    //#region 下標題
    viewTypeBottomLabel: {
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
            cursor: "default",
            padding: "0 0 0 2px"
            //#endregion
        }
    },
    //#endregion
    //#endregion

    //#region 一般編輯模式
    //#region 容器
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
            //padding: "0.5rem",
            backgroundColor: "transparent",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: 'rgba(0, 0, 0, 0.25)',
            //#endregion
            //#region 覆寫樣式
            padding: "0 16px 0 0",
            //#endregion
        }
    },
    //#endregion
    //#region 上標題
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
            cursor: "default",
            padding: "0 0 0 2px"
            //#endregion
        }
    },
    //#endregion
    //#region 下標題
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
            cursor: "default",
            padding: "0 0 0 2px"
            //#endregion
        }
    },
    //#endregion
    //#region 輸入框本體
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
            // color: '#1890ff',
            //#endregion
        },
    },
    //#endregion
    //#region NativeTextInput
    textInput: {
        basic: (style, props) => {
            //console.log(props.leftIcon);
            return {
                //#region BasicContainer 原生樣式
                backgroundColor: "#ffffff",
                border: "1px solid #d9d9d9",
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
                //#region 在沒有需要eyeIcon連棟變色的情況，不需要改這裡
                // ...(
                //     props.openEye && {
                //         border: `1px solid ${(props.focus || props.hover) ? "#1890ff" : "#d9d9d9"}`,
                //         boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(24, 144, 255, 0.2)" : null
                //     }
                // )
                //#endregion
            }
        },
        hover: {
            //#region 覆寫樣式
            border: "1px solid #1890ff",
            //#endregion
        },
        focus: {
            border: "1px solid #1890ff",
            boxShadow: "0px 0px 0px 2px rgba(24, 144, 255, 0.2)"
        }
    },
    //#endregion
    //#region 眼睛圖標
    eyeIcon: {
        basic: (style, props) => {
            //console.log(props)
            return {
                position: "absolute",
                height: "100%",
                right: "12px",
                cursor: "pointer",
                top: 0,
                //color: (props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.65)"
            }
        }
    }
    //#endregion
    //#endregion
}