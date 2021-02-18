export default {
    //#region 最外層容器樣式
    container: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            //position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
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
            minHeight: "768px",
            width: "100%",
            // transition: "height 0.3s linear,top 0.3s linear, transform 0.3s linear",
            height: "100vh",
            backgroundColor: "#fff",
            position: "relative",
            padding: "0 32px"
            //top: props.isOpen ? 0 : 0 //props.offsetTop
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region 標題容器樣式
    titleContainer: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            height: "89px",
            lineHeight: "normal",
            backgroundColor: "#fff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            whiteSpace: "normal",
            // textAlign: 'normal',
            fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            textAlign: 'center',
            color: "#fff",
            cursor: "default",
            padding: "48px 0 0 0",
            userSelect: "none"
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region 標題文字樣式
    titleText: {
        basic: {
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
            // lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            // fontSize: "medium",
            // color: '#000',
            fontFamily: `'Noto Sans TC', sans-serif`,
            //fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            display: "inline-block",
            color: "rgba(0, 0, 0, 0.65)",
            fontSize: "24px",
            lineHeight: "32px",
            padding: "0 0 0 0",
            fontWeight: 'bold',
            cursor: "default",
            userSelect: "none"
            //#endregion
        }
    },
    //#endregion
    //#region 分頁容器樣式
    tabContainer: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "100%",
            minWidth: '0',//修復滾動條 x 方向
            height: "46px",
            lineHeight: "normal",
            backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            whiteSpace: "normal",
            // textAlign: 'normal',
            fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            textAlign: 'left',
            color: "#fff",
            cursor: "default",
            userSelect: "none",
            borderBottom: "1px solid #f0f0f0",
            padding: "0 32px 0",
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region 往左方移動分頁按鈕
    leftArrowIcon: {
        basic: {
            position: "absolute",
            height: "100%",
            cursor: "pointer",
            userSelect: "none",
            left: 0,
        }
    },
    //#endregion
    //#region 往右方移動分頁按鈕
    RightArrowIcon: {
        basic: {
            position: "absolute",
            height: "100%",
            cursor: "pointer",
            userSelect: "none",
            right: 0,
        }
    },
    //#endregion
    //#region ScrollBar 樣式
    scrollBar: {
        basic: {
            maxHeight: "100%",
            maxWidth: "100%",
            height: "100%",
            width: "100%",
            scrollBehavior: "smooth"
        },
        scrollbarTrackX: {
            height: "8px",
            //display: "block"
            display: "none"
        },
        scrollbarThumbX: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear"
        },
        scrollbarTrackY: {
            width: "8px",
            display: "block"
        },
        scrollbarThumbY: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear",
            right: "0px",
            left: "0px"
        }
    },
    //#endregion
    //#region 分頁 ScrollBar 下容器 樣式
    tabContent: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            // whiteSpace: "normal",
            // textAlign: 'normal',
            fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            textAlign: 'center',
            color: "#fff",
            cursor: "default",
            userSelect: "none",
            height: "100%",
            whiteSpace: "nowrap",
            display: "inline-block",
            padding: `0 0 0 ${props.leftPadding}px`,
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region 分頁 未選中 樣式
    tab: {
        basic: {
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
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
            display: "inline-block",
            // color: "#ffffff",
            fontSize: "14px",
            lineHeight: "43px",
            padding: "0 16px 0",
            //margin: "0 16px 0",
            cursor: "pointer",
            userSelect: "none",
            //#endregion
            //#region 覆寫樣式
            color: "rgba(0, 0, 0, 0.65)",
            //#endregion
        }
    },
    //#endregion
    //#region 分頁 選中 樣式
    tabActive: {
        basic: {
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
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
            display: "inline-block",
            // color: "#ffffff",
            fontSize: "14px",
            lineHeight: "43px",
            padding: "0 16px 0",
            //margin: "0 16px 0",
            cursor: "pointer",
            userSelect: "none",
            //#endregion
            //#region 覆寫樣式
            color: " #1890ff"
            //#endregion
        }
    },
    //#endregion
    //#region 分頁底部光標 樣式
    tabHighLight: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            // position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            // width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            // backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            // whiteSpace: "normal",
            // textAlign: 'normal',
            fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            textAlign: 'center',
            color: "#fff",
            cursor: "default",
            userSelect: "none",
            height: "2px",
            position: "absolute",
            bottom: 0,
            backgroundColor: "#1890ff",
            left: props.refCurrentLeft,
            width: props.refCurrentWidth,
            transition: "left .3s ease-in-out",
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region 各分頁內容容器樣式
    mainContainer: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "100%",
            minWidth: '0',//修復滾動條 x 方向
            // height: "calc( 100% - 88px )",
            lineHeight: "normal",
            backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            whiteSpace: "normal",
            // textAlign: 'normal',
            fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            textAlign: 'center',
            color: "#fff",
            cursor: "default",
            userSelect: "none",
            borderBottom: "1px solid #f0f0f0",
            height: "calc( 100% - 135px )",
            minHeight: "100px",
            //padding:"0 8px 0 0"
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region 各分頁內容滾動條 ScrollBar 樣式
    mainScrollBar: {
        basic: {
            maxHeight: "100%",
            maxWidth: "100%",
            height: "100%",
            width: "100%"
        },
        scrollbarTrackX: {
            height: "8px",
            display: "block"
        },
        scrollbarThumbX: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear"
        },
        scrollbarTrackY: {
            //right:"8px", // nested
            width: "8px",
            display: "block"
        },
        scrollbarThumbY: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear",
            right: "0px",
            left: "0px"
        }
    },
    //#endregion
    //#region 各分頁內容 ScrollBar 下容器 樣式
    mainContentContainer: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "fit-content",
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            // whiteSpace: "normal",
            // textAlign: 'normal',
            fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            textAlign: 'center',
            color: "#fff",
            cursor: "default",
            userSelect: "none",
            height: "fit-content",
            whiteSpace: "nowrap",
            padding: "0 0 0 48px",
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion

}