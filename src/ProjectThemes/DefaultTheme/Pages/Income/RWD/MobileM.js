export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fff",
                    padding: "0px 0px" // 標題列的padding
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#3c4856",
                    height: `calc( ${props.height}px - 56px )`,
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "0", //188 是授權圖高度
                    // height:""
                }
            }
        },
    },
    //#endregion

    //#region 標題列
    titleBar: {
        basic: (style, props) => ({
            ...style,
            textAlign: "center",
            boxShadow: "inset 0px -1px 0px #DBE4E8",
        })
    },
    //#endregion

    //#region 標題列 預約訂車分頁
    titleBarCallCarTab: {
        basic: (style, props) => ({
            ...style,
            display: "inline-grid",
            // margin: "0 16px",
            lineHeight: "32px",
            height: "46px",
            fontSize: "14px",
            cursor: "pointer",
            width: "25%",
            color: (props.isActive ? "#1890FF" : "rgba(0, 0, 0, 0.65)"),
            borderBottom: (props.isActive ? "solid 2px #1890FF" : "unset"),
            textAlign: "center",
            alignItems: "center"
        }),
    },
    //#endregion

    //#region 選擇日期區間 DateTimeRange 
    dateTimeRange: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "8px 8px",
                display: "inline-block",
                // width: "100%"
                ...style.occupy(6),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                padding: "8px 8px",
                // width: "100%"
                ...style.occupy(6),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
        dateTimePickerContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    // width: "100%",
                    color: props.disable ? null : ((props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.25)")
                }
            }
        },
        dateTimePickerSubContainer: {
            basic: (style, props) => ({
                ...style,
                height: "28px",
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                // minHeight: "24px",
                // height: "auto"
                height: "0px"
            })
        }
    },
    //#endregion

    //#region 總額容器
    totalContainer: {
        basic: (style, props) => ({
            ...style,
            // ...style.occupy(4),
            width: "calc(33% - 8px)",
            display: "inline-block",
            margin: "4px",
            backgroundColor: "#FFFFFF",
            border: "2px solid #F8A91E",
            borderRadius: "4px",
            height: "54px",
            padding: "7px 8px"
        })
    },
    //#endregion

    //#region 總額容器2
    totalContainer2: {
        basic: (style, props) => ({
            ...style,
            // ...style.occupy(4),
            width: "calc(34% - 8px)",
            display: "inline-block",
            margin: "4px",
            backgroundColor: "#FFFFFF",
            border: "2px solid #F8A91E",
            borderRadius: "4px",
            height: "54px",
            padding: "7px 8px"
        })
    },
    //#endregion

    //#region 總額文字
    totalTitleText: {
        basic: (style, props) => ({
            ...style,
            width: "31px",
            fontSize: "14px",
            fontWeight: 500,
            color: "rgba(107,107,107,1)",
            display: "inline-block",
            top: "-2px"
        })
    },
    //#endregion

    //#region 總額文字2
    totalTitleText2: {
        basic: (style, props) => ({
            ...style,
            width: "48px",
            fontSize: "14px",
            fontWeight: 500,
            color: "rgba(107,107,107,1)",
            display: "inline-block",
            top: "-2px",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 總額金額文字1
    totalAmtText: {
        basic: (style, props) => ({
            ...style,
            width: "calc(100% - 39px)",
            fontSize: "20px",
            fontWeight: 600,
            color: "rgba(61,61,61,1)",
            display: "inline-block",
            top: "-9px",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 總額金額文字2
    totalAmtText2: {
        basic: (style, props) => ({
            ...style,
            width: "calc(100% - 56px)",
            fontSize: "20px",
            fontWeight: 600,
            color: "rgba(61,61,61,1)",
            display: "inline-block",
            top: "-9px",
            textAlign: "center"
        })
    },
    //#endregion

    //#region Table標題容器
    tableTitleContainer: {
        basic: (style, props) => ({
            ...style,
            // ...style.occupy(4),
            width: "100%",
            display: "inline-block",
            // margin: "4px",
            // backgroundColor: "#F2F2F2",
            // height: "66px",
            padding: "10px 18px"
        })
    },
    //#endregion

    //#region Table標題內容器
    tableTitleInsideContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            display: "inline-flex",
            alignItems: "center",
            // padding: "12px",
            height: "47px",
            backgroundColor: "#F2F2F2",
        })
    },
    //#endregion

    //#region Table標題 日期
    tableDateTitleText: {
        basic: (style, props) => ({
            ...style,
            width: "20%",
            fontSize: "18px",
            fontWeight: 400,
            color: "rgba(61,61,61,1)",
            // lineHeight: "47px",
            display: "inline-block",
            // top: "11px",
            textAlign: "center"
        })
    },
    //#endregion

    //#region Table標題 單數
    tableCountTitleText: {
        basic: (style, props) => ({
            ...style,
            width: "20%",
            fontSize: "18px",
            fontWeight: 400,
            color: "rgba(61,61,61,1)",
            // lineHeight: "47px",
            display: "inline-block",
            // top: "11px",
            textAlign: "center"
        })
    },
    //#endregion

    //#region Table標題 收款方式
    tablePayWayTitleText: {
        basic: (style, props) => ({
            ...style,
            width: "40%",
            fontSize: "18px",
            fontWeight: 400,
            color: "rgba(61,61,61,1)",
            // lineHeight: "47px",
            display: "inline-block",
            // top: "11px",
            textAlign: "center"
        })
    },
    //#endregion

    //#region Table標題 實收
    tablePaidTitleText: {
        basic: (style, props) => ({
            ...style,
            width: "20%",
            fontSize: "18px",
            fontWeight: 400,
            color: "rgba(61,61,61,1)",
            display: "inline-block",
            // lineHeight: "47px",
            // top: "11px",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 列表內容容器
    paymentRecordContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            // display: "inline-block",
            padding: "12px 18px",
            height: "auto"
            // backgroundColor: "#F5F5F5",
        })
    },
    //#endregion

    //#region 列表內容日期容器
    dateInsideContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            alignItems: "center",
            width: "20%",
            minHeight: "55px",
            height: "auto",
            backgroundColor: "#3F3F3F",
        })
    },
    //#endregion   

    //#region 列表內容日期文字
    dateText: {
        basic: (style, props) => ({
            ...style,
            color: "#FFFFFF",
            fontSize: "18px",
            fontWeight: 400,
            display: "block",
            width: "100%",
            textAlign: "center"
        })
    },
    //#endregion   

    //#region 列表內容單數容器
    countInsideContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            alignItems: "center",
            // width: "20%",
            width: "80%",
            minHeight: "55px",
            height: "auto",
            backgroundColor: "#F2F2F2",
        })
    },
    //#endregion   

    //#region 列表內容單數文字
    countText: {
        basic: (style, props) => ({
            ...style,
            color: "#3D3D3D",
            fontSize: "18px",
            fontWeight: 600,
            display: "inline-block",
            // width: "100%",
            width: "25%",
            textAlign: "center",
            padding: "5px 0",
            borderBottom: "1px dashed #D8D8D8",
        })
    },
    //#endregion  

    //#region 列表內容單數文字
    countLastText: {
        basic: (style, props) => ({
            ...style,
            color: "#3D3D3D",
            fontSize: "18px",
            fontWeight: 600,
            display: "inline-block",
            // width: "100%",
            width: "25%",
            textAlign: "center",
            padding: "5px 0",
            // borderBottom: "1px dashed #D8D8D8",
        })
    },
    //#endregion    

    //#region 列表內容收款方式容器
    paywayInsideContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            alignItems: "center",
            width: "40%",
            minHeight: "55px",
            height: "auto",
            backgroundColor: "#F2F2F2",
        })
    },
    //#endregion   

    //#region 列表內容收款方式文字
    payWayText: {
        basic: (style, props) => ({
            ...style,
            color: "#3D3D3D",
            fontSize: "18px",
            fontWeight: 400,
            display: "inline-block",
            // width: "100%",
            width: "50%",
            textAlign: "center",
            padding: "5px 0",
            borderBottom: "1px dashed #D8D8D8",
            borderRight: "1px solid #6B6B6B"
        })
    },
    //#endregion 

    //#region 列表內容收款方式文字
    payWayLastText: {
        basic: (style, props) => ({
            ...style,
            color: "#3D3D3D",
            fontSize: "14px",
            fontWeight: 400,
            display: "inline-block",
            // width: "100%",
            width: "50%",
            textAlign: "center",
            padding: "5px 0",
            // borderBottom: "1px dashed #D8D8D8",
            borderRight: "1px solid #6B6B6B"
        })
    },
    //#endregion 

    //#region 列表內容實收容器
    paidInsideContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            alignItems: "center",
            width: "20%",
            minHeight: "55px",
            height: "auto",
            backgroundColor: "#F2F2F2",
        })
    },
    //#endregion   

    //#region 列表內容實收文字
    paidText: {
        basic: (style, props) => ({
            ...style,
            color: "#3D3D3D",
            fontSize: "18px",
            fontWeight: 700,
            display: "inline-block",
            // width: "100%",
            width: "25%",
            textAlign: "center",
            padding: "5px 0",
            borderBottom: "1px dashed #D8D8D8",
        })
    },
    //#endregion 

    //#region 列表內容實收文字
    paidLastText: {
        basic: (style, props) => ({
            ...style,
            color: "#3D3D3D",
            fontSize: "18px",
            fontWeight: 700,
            display: "inline-block",
            // width: "100%",
            width: "25%",
            textAlign: "center",
            padding: "5px 0",
            // borderBottom: "1px dashed #D8D8D8",
        })
    },
    //#endregion 
}