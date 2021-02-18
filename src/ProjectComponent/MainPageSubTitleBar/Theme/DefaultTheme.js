export default {
    //#region 最外層容器 
    container: {
        basic: (style, props) => {
            // console.log(style, props)
            return {
                //#region 基本設置
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                boxSizing: "border-box",
                flexDirection: "row",//控制子組件排列方向: row、row-reverse、column、column-reverse
                // justifyContent: "flex-start",  //控制子組件在水平方向上的對齊: flex-start、center、flex-end、space-between、space-around、space-evenly
                alignItems: "flex-start",   //控制子組件在垂直方向上的對齊: flex-start、center、flex-end、stretch、baseline
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                height: "auto",
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
                justifyContent: "space-between",
                zIndex: 1,
                borderBottom: "1px solid #1890ff",
                margin: "0 0 24px 0"
                //#endregion
            }
        }
    },
    //#endregion
    //#region 標題文字容器 
    titleContainer: {
        //#region 基本設置
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
        //#endregion
    },
    //#endregion
    //#region 標題文字
    titleText: {
        basic: (style, props) => ({
            //#region 基本設置
            boxSizing: "border-box",
            // display: 需要用就傳
            // flex: 需要用就傳
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
            color: "#1890ff",
            fontSize: "20px",
            lineHeight: "28px",
            padding: "2px 0 12px"
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region 右側內容容器
    rightContainer: {
        basic: (style, props) => ({
            //#region 基本設置
            flexGrow: "0",
            maxWidth: "none",
            flexBasis: "auto",
            boxSizing: "border-box",
            occupy: (c) => ({ maxWidth: c * 100 / 12 + '%', flexBasis: c * 100 / 12 + '%' }),//調用時請使用如 ...(style.occupy(10))
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            //width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
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
            width: "請計算內容總寬度"
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region 右側內容表單容器
    formContainer: {
        container: {
            basic: {
                //#region BasicContainer 原生樣式
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                width: "100%",
                minWidth: '0',//修復滾動條 x 方向
                height: "100%",
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
                color: '#000'
                //#endregion
            }
        },
        containerScrollBar: {
            basic: {
                width: "100%",
                maxWidth: "100%",
                height: "100%",
                maxHeight: "100%",
                //borderRight: "1px solid #f0f0f0",
                boxSizing: "border-box",
            }
        },
        contentContainer: {
            basic: {
                //#region BasicContainer 原生樣式
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                width: "100%",
                minWidth: '0',//修復滾動條 x 方向
                height: "fit-content",
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
                color: '#000'
                //#endregion
            }
        }
    },
    //#endregion
    //#region 右側內容表單列
    formRow: {
        container: {
            basic: (style, props) => {
                return {
                    //#region Container 原生樣式
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    boxSizing: "border-box",
                    flexDirection: "row",//控制子組件排列方向: row、row-reverse、column、column-reverse
                    // justifyContent: "flex-start",  //控制子組件在水平方向上的對齊: flex-start、center、flex-end、space-between、space-around、space-evenly
                    alignItems: "flex-start",   //控制子組件在垂直方向上的對齊: flex-start、center、flex-end、stretch、baseline
                    position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                    height: "auto",
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
                    justifyContent: "flex-end",
                }
            }
        }
    },
    //#endregion
}