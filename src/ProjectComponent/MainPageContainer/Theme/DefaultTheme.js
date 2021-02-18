export default {
    //#region 大於1440的畫面 (laptopL)
    //#region 外部傳入頂部組件容器 (laptopL)
    laptopLOutsideOutContainer: {
        basic: (style, props) => {
            // console.log(style, props)
            return {
                //#region 基本設置
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                // width: "auto",
                minWidth: '0',//修復滾動條 x 方向
                // height: "auto",
                lineHeight: "normal",
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
                // width: `calc( 100% - ${props.collapse ? "4rem" : "15rem"})`,
                width: "100%",
                top: "100px",
                // left: props.collapse ? "4rem" : "15rem",
                height: "auto",
                userSelect: "none",
                padding: props?.outSideTopComponent ? "24px" : "0px"
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器 (laptopL)
    laptopLOutContainer: {
        basic: (style, props) => {
            // console.log(style, props)
            return {
                //#region 基本設置
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                // width: "auto",
                minWidth: '0',//修復滾動條 x 方向
                // height: "auto",
                lineHeight: "normal",
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
                // width: `calc( 100% - ${props.collapse ? "4rem" : "15rem"})`,
                width: "100%",
                top: "100px",
                // left: props.collapse ? "4rem" : "15rem",
                height: `calc( 100vh - 100px ${props?.outSideTopComponentHeight && `- ${props?.outSideTopComponentHeight}px `})`,
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器內滾動條 (laptopL)
    laptopLScrollBar: {
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
    //#region 容器內 ScrollBar 下容器 (laptopL)
    laptopLContentContainer: {
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
            whiteSpace: "normal",
            textAlign: 'normal',
            fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            padding: "0px 24px 188px"
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region COPYRIGHT
    laptopLCopyRight: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            // position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // lineHeight: "normal",
            // backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'normal',
            // fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            //#endregion
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#FF7A45",
            position: "absolute",
            bottom: "18px",
            left: "14%"
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region 單位資訊 
    laptopLUnitInfo: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            // position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // lineHeight: "normal",
            // backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'normal',
            // fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            //#endregion
            color: "#fff",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "28px",
            position: "absolute",
            bottom: "44px",
            left: "43%"
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#endregion

    //#region 大於等於1024 與 小於1440的畫面 (laptop)
    //#region 外部傳入頂部組件容器 (laptop)
    laptopOutsideOutContainer: {
        basic: (style, props) => {
            // console.log(style, props)
            return {
                //#region 基本設置
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                // width: "auto",
                minWidth: '0',//修復滾動條 x 方向
                // height: "auto",
                lineHeight: "normal",
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
                // width: `calc( 100% - ${props.collapse ? "4rem" : "15rem"})`,
                width: "100%",
                top: "80px",
                // left: props.collapse ? "4rem" : "15rem",
                height: "auto",
                userSelect: "none",
                padding: props?.outSideTopComponent ? "24px" : "0px"
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器 (laptop)
    laptopOutContainer: {
        basic: (style, props) => {
            // console.log(style, props)
            return {
                //#region 基本設置
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                // width: "auto",
                minWidth: '0',//修復滾動條 x 方向
                // height: "auto",
                lineHeight: "normal",
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
                // width: `calc( 100% - ${props.collapse ? "4rem" : "15rem"})`,
                width: "100%",
                top: "80px",
                // left: props.collapse ? "4rem" : "15rem",
                height: `calc( 100vh - 80px ${props?.outSideTopComponentHeight && `- ${props?.outSideTopComponentHeight}px `})`,
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器內滾動條 (laptop)
    laptopScrollBar: {
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
    //#region 容器內 ScrollBar 下容器 (laptop)
    laptopContentContainer: {
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
            whiteSpace: "normal",
            textAlign: 'normal',
            fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            padding: "0px 24px 188px"
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region COPYRIGHT
    laptopCopyRight: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            // position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // lineHeight: "normal",
            // backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'normal',
            // fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            //#endregion
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#FF7A45",
            position: "absolute",
            bottom: "14px",
            left: "14%"
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region 單位資訊 
    laptopUnitInfo: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            // position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // lineHeight: "normal",
            // backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'normal',
            // fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            //#endregion
            color: "#fff",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "28px",
            position: "absolute",
            bottom: "44px",
            left: "46%"
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#endregion

    //#region 大於等於768 與 小於1024的畫面 (tablet)
    //#region 外部傳入頂部組件容器 (tablet)
    tabletOutsideOutContainer: {
        basic: (style, props) => {
            // console.log(style, props)
            return {
                //#region 基本設置
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                // width: "auto",
                minWidth: '0',//修復滾動條 x 方向
                // height: "auto",
                lineHeight: "normal",
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
                // width: `calc( 100% - ${props.collapse ? "4rem" : "15rem"})`,
                width: "100%",
                top: "80px",
                // left: props.collapse ? "4rem" : "15rem",
                height: "auto",
                userSelect: "none",
                padding: props?.outSideTopComponent ? "24px" : "0px"
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器 (tablet)
    tabletOutContainer: {
        basic: (style, props) => {
            // console.log(style, props.height)
            return {
                //#region 基本設置
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                // width: "auto",
                minWidth: '0',//修復滾動條 x 方向
                // height: "auto",
                lineHeight: "normal",
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
                // width: `calc( 100% - ${props.collapse ? "4rem" : "15rem"})`,
                width: "100%",
                top: "80px",
                // left: props.collapse ? "4rem" : "15rem",
                height: `calc( ${props.height}px - 80px ${props?.outSideTopComponentHeight && `- ${props?.outSideTopComponentHeight}px `})`,
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器內滾動條 (tablet)
    tabletScrollBar: {
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
    //#region 容器內 ScrollBar 下容器 (tablet)
    tabletContentContainer: {
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
            whiteSpace: "normal",
            textAlign: 'normal',
            fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            padding: "0px 24px 188px"
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region COPYRIGHT
    tabletCopyRight: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            // position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // lineHeight: "normal",
            // backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'normal',
            // fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            //#endregion
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#FF7A45",
            position: "absolute",
            bottom: "14px",
            left: "14%"
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region 單位資訊 
    tabletUnitInfo: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            // position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // lineHeight: "normal",
            // backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'normal',
            // fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            //#endregion
            color: "#fff",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "28px",
            position: "absolute",
            bottom: "64px",
            left: "14%"
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#endregion

    //#region 小於768的畫面 (basic)
    //#region 外部傳入頂部組件容器 (basic)
    basicOutsideOutContainer: {
        basic: (style, props) => {
            return {
                //#region 基本設置
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                // width: "auto",
                minWidth: '0',//修復滾動條 x 方向
                // height: "auto",
                lineHeight: "normal",
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
                //margin: `0 0.5rem 0 ${Collapse ? "1rem" : "1.5rem"}`,
                width: "100%",
                top: "56px",
                padding: props?.outSideTopComponent ? "24px" : "0px",
                userSelect: "none",
                height: "auto",
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器 (basic)
    basicOutContainer: {
        basic: (style, props) => {
            // console.log(style, props.height)
            return {
                //#region 基本設置
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                // width: "auto",
                minWidth: '0',//修復滾動條 x 方向
                // height: "auto",
                lineHeight: "normal",
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
                //margin: `0 0.5rem 0 ${Collapse ? "1rem" : "1.5rem"}`,
                width: "100%",
                top: "56px",
                height: `calc( ${props.height}px - 56px ${props?.outSideTopComponentHeight && `- ${props?.outSideTopComponentHeight}px `})`,
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器內滾動條 (basic)
    basicScrollBar: {
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
    //#region 容器內 ScrollBar 下容器 (basic)
    basicContentContainer: {
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
            whiteSpace: "normal",
            textAlign: 'normal',
            fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            padding: "0px 24px 204px"
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#endregion
}