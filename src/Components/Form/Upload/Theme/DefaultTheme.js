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
            // height: "30px",
            padding: "2px",
            width: "100%",
            margin: "0 0 2px 0",
            // borderBottom: "1px dashed #91D5FF",
            //#endregion
        }),
        hover: {
            //#region 覆寫樣式
            // color: '#1890ff',
            //#endregion
        },
    },
    //#endregion
    //#region 當前展示圖片
    viewTypeFileInput: {
        basic: {
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            minWidth: '0',//修復滾動條 x 方向
            // lineHeight: "normal",
            whiteSpace: "normal",
            // textAlign: 'initial',
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            fontSize: "14px",
            color: " rgba(0, 0, 0, 0.85)",
            height: "234px",
            lineHeight: "22px",
            userSelect: "none",
            cursor: "default",
            textAlign: "center",
            verticalAlign: "top",
            backgroundColor: "#fafafa",
            border: "1px solid #d9d9d9",
            borderRadius: "2px",
            //#endregion
        }
    },
    //#endregion
    //#region 預覽圖片 Img DOM
    viewTypePreview: {
        basic: (style, props) => {
            //console.log(props)
            return {
                width: '100%',
                height: "100%",
            }
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
    uploadContainer: {
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
    //#region fileInput 
    fileInput: {
        basic: (style, props) => {
            return {
                //#region 原生樣式
                width: "100%", //"234px",
                height: "234px", //"234px",
                marginRight: "0px",
                marginBottom: "0px",
                textAlign: "center",
                verticalAlign: "top",
                backgroundColor: "#fafafa",
                border: "1px solid #d9d9d9",
                borderRadius: "2px",
                cursor: "pointer",
                transition: "border-color 0.3s",
                //#endregion
            }
        },
        hover: {
            //#region 覆寫樣式
            borderColor: "#1890ff",
            //#endregion
        },
        // focus: {
        //     border: "1px solid #1890ff",
        //     boxShadow: "0px 0px 0px 2px rgba(24, 144, 255, 0.2)"
        // }
    },
    //#endregion
    //#region 預覽圖片 Img DOM
    preview: {
        basic: (style, props) => {
            //console.log(props)
            return {
                width: '100%',
                height: "100%",
            }
        }
    },
    //#endregion
    //#region 上傳圖片遮罩
    uploadImgContainer: {
        basic: (style, props) => {
            return {
                boxSizing: "border-box",
                // position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                minWidth: '0',//修復滾動條 x 方向
                // height: "auto",
                lineHeight: "normal",
                // backgroundColor: "transparent",
                backgroundImage: "none",
                backgroundPosition: "0% 0%",
                backgroundRepeat: "repeat",
                backgroundSize: "auto auto",
                // cursor: "auto",
                whiteSpace: "normal",
                // textAlign: 'initial',
                fontSize: "medium",
                color: '#000',
                //#region 覆寫樣式
                width: "calc( 100% - 4px )",
                height: "calc( 100% - 4px )",
                border: "1px solid transparent",
                borderRadius: "2px",
                position: "absolute",
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                textAlign: "center",
                cursor: "pointer"
                //#endregion
            }
        }
    },
    //#endregion
    //#region 上傳照片圖標
    picIcon: {
        basic: (style, props) => {
            //console.log(props)
            return {
                color: "#fff",
                position: "relative",
                top: "92px",
                cursor: "pointer"
            }
        }
    },
    //#endregion
    //#region 上傳圖片文字
    uploadImgText: {
        basic: (style, props) => {
            return {
                //#region 基本設置
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                width: "auto",
                minWidth: '0',//修復滾動條 x 方向
                height: "auto",
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
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                textAlign: "center",
                color: "#fff",
                top: "92px",
                cursor: "pointer"
                //#endregion
            }
        }
    }
    //#endregion

    //#endregion
}