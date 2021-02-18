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
            // minHeight: "551px",
            width: "100%",
            // transition: "height 0.3s linear,top 0.3s linear, transform 0.3s linear",
            height: props.height,
            position: "relative",
            padding: "0 12px 0 4px"
            //top: props.isOpen ? 0 : 0 //props.offsetTop
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion

    //#region 容器內滾動條 ()
    scrollBar: {
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
    //#region 容器內 ScrollBar 下容器 ()
    contentContainer: {
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
            padding: "10px 4px 24px"
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion

    //#region 容器內 ScrollBar 下容器 接受容器
    dropContainer: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            // width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            // backgroundColor: "#ffffff",
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
            display: "flex",
            // flexDirection: "column",
            width: `${(props.length * (56 + 16)) + 16}px`,
            backgroundColor: `${props.isDraggingOver ? "rgba(24, 144, 255, 0.08)" : "#ffffff"}`,
            cursor: props?.isDraggingOver ? "grabbing" : "default",
            userSelect: "none",
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion

    //#region 最外層容器樣式
    stop: {
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
            // cursor: "auto",
            whiteSpace: "normal",
            // textAlign: 'initial',
            fontSize: "medium",
            color: '#000',
            //#endregion 
            //#region 覆寫樣式
            // transition: "height 0.3s linear,top 0.3s linear, transform 0.3s linear",
            // height: props.height,
            position: "relative",
            padding: "24px 0 0",
            //top: props.isOpen ? 0 : 0 //props.offsetTop
            //#endregion
            display: "inline-block",
            width: "56px",
            height: "210px",
            // writingMode: "vertical-rl",
            // backgroundColor: "#1890ff",
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            margin: "8px 8px 12px 8px",
            textAlign: "center",
            cursor: props?.isDragging ? "grabbing" : "grab",
            borderRadius: "2px",
            backgroundColor: props?.isDragging ? "#4caf90" : "#1890ff",
            userSelect: "none",
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion

    //#region 排序index
    sort: {
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
            lineHeight: "normal",
            //#endregion
            //#region 字體
            whiteSpace: "normal",
            // textAlign: 'initial',
            fontSize: "medium",
            // color: '#000',
            //fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
            //fontFamily: "Noto",
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            textAlign: "center",
            color: "#fff",
            margin: "0 0 8px 0",
            userSelect: "none",
            cursor: props?.isDragging ? "grabbing" : "grab",
        }),
        hover: {

        }
    },
    //#endregion


    //#region 名字
    name: {
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
            // height: "auto",
            lineHeight: "normal",
            //#endregion
            //#region 字體
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: '#fff',
            //fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
            //fontFamily: "Noto",
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            writingMode: "vertical-rl",
            textOrientation: "upright",
            display: "flex",
            flexWrap: "wrap",
            /* justify-content: flex-start; */
            alignItems: "center",
            width: "100%",
            height: "calc( 100% - 42px )",
            userSelect: "none",
            cursor: props?.isDragging ? "grabbing" : "grab",
        }),
        hover: {

        }
    },
    //#endregion
}