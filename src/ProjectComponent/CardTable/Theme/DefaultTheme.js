export default {
    //#region 最外層容器 outContainer
    outContainer: {
        basic: (style, props) => ({
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            //    width: "auto",
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
            height: "100%",
            width: "100%"
        })
    },
    //#region 

    //#region OldTable相關
    //#region  table容器 wrapper 
    wrapper: {
        basic: (style, props) => ({
            // height: `${props.fatherHeight}px`,
            height: "auto"
        })
    },
    //#endregion
    //#region table子容器 container 
    container: {
        basic: (style, props) => ({
            // height: `${props.fatherHeight}px`,
            height: "auto"
        })
    },
    //#endregion
    //#region table次子容器 nested 
    nested: {
        basic: (style, props) => ({
            // height: `${props.fatherHeight}px`,
            height: "auto"
        })
    },
    //#endregion
    //#region table本體容器 tableContainer
    tableContainer: {
        basic: (style, props) => ({
            // height: `${props.fatherHeight - props.pageFootHeight}px`,
            height: "auto",
            backgroundColor: "rgba( 0, 0 ,0 , 0)"
        })
    },
    //#endregion
    //#region table本體不包含頁腳容器 tableContainerWithoutPageFoot
    tableContainerWithoutPageFoot: {
        basic: (style, props) => {
            return {
                // height: `${props.fatherHeight - props.pageFootHeight}px`,
                height: "auto"
            }
        }
    },
    //#endregion
    //#region 標題列 tableHeaderRow
    tableHeaderRow: {
        basic: (style, props) => ({
        })
    },
    //#endregion
    //#region 標題列每個格子 tableHeaderCell 
    tableHeaderCell: {
        basic: {
            fontSize: "13px",
            lineHeight: "22px",
            fontWeight: "700",
            color: "rgba(0, 0, 0, 0)"
        }
    },
    //#endregion
    //#region 標題列固定於左方的每個格子 tableHeaderFixLeftCell 
    tableHeaderFixLeftCell: {
        basic: {
            fontSize: "13px",
            lineHeight: "22px",
            fontWeight: "700",
            color: "rgba(0, 0, 0, 0.85)"
        }
    },
    //#endregion
    //#region 標題列固定於右方的每個格子 tableHeaderFixRightCell 
    tableHeaderFixRightCell: {
        basic: {
            fontSize: "13px",
            lineHeight: "22px",
            fontWeight: "700",
            color: "rgba(0, 0, 0, 0.85)"
        }
    },
    //#endregion
    //#region 標題列最右方佔位 tableHeaderFixRightOccupyCell 
    tableHeaderFixRightOccupyCell: {
        basic: {
        }
    },
    //#endregion
    //#region 表格內所有資料列容器 tableRowContainer
    tableRowContainer: {
        basic: (style, props) => ({
            // minHeight: `${props.fatherHeight - props.pageFootHeight - props.tableHeaderHeight}px`
        })
    },
    //#endregion
    //#region 表格內資料列 tableRow
    tableRow: {
        basic: {
        }
    },
    //#endregion
    //#region 表格內每個格子 tableBodyCell 
    tableBodyCell: {
        basic: {
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.65)",
            backgroundColor: "rgba(0,0,0,0)"
        }
    },
    //#endregion
    //#region 表格內固定於左方的每個格子 tablebodyFixLeftCell 
    tablebodyFixLeftCell: {
        basic: {
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.65)"
        }
    },
    //#endregion
    //#region 表格內固定於右方的每個格子 tablebodyFixRightCell 
    tablebodyFixRightCell: {
        basic: {
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.65)"
        }
    },
    //#endregion
    //#endregion

    //#region 查無資料文字樣式
    noDataMessage: {
        basic: (style, props) => ({
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // height: "auto",
            // lineHeight: "normal",
            whiteSpace: "normal",
            // textAlign: 'initial',
            // fontSize: "medium",
            // color: '#000',
            fontFamily: `'Noto Sans TC', sans-serif`,
            // fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 
            padding: "60px 0 0 0",
            color: "#ff7a45",
            fontWeight: "600",
            fontSize: "24px",
            lineHeight: "32px",
            textAlign: "center",
            boxShadow: "0 0 3px 8px #fff"
            //#endregion
        })
    },
    //#endregion

    //#region 頁腳翻頁 tablefooterPagination 
    tablefooterPagination: {
        basic: (style, props) => ({
            margin: "16px 8px 16px 0",
            display: `${props.data.length > 10 ? "block" : "none"}`
        })
    },
    //#endregion
    //#endregion
}