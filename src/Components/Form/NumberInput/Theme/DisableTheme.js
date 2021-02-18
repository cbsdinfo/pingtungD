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
    //#region 勾選框本體
    viewTypeNumberInputContainer: {
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
    viewTypeNumberInput: {
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
    //#region 數字輸入框本體
    numberInputContainer: {
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
    //#region numberInputSubContainer 數字輸入框 次容器
    numberInputSubContainer: {
        basic: (style, props) => ({
            width: "100%",
            // height: "28px",
            height: "32px",
            color: "inherit",
            transition: "none"
        })
    },
    //#endregion
    //#region numberInput 數字輸入框 的 Input
    numberInput: {
        basic: (style, props) => ({
            color: "rgba(0, 0, 0, 0.65)",
            cursor: "not-allowed",
            height: "100%"
        })
    },
    //#endregion
    //#endregion
}
