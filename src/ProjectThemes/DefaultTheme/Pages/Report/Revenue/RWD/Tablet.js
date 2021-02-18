export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        laptopOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa"
                }
            }
        },
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa"
                }
            }
        },
        laptopOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa"
                }
            }
        },
        laptopContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa",
                    padding: "0px 12px 24px"
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa"
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa",
                    padding: "0px 12px 24px"
                }
            }
        },
    },
    //#endregion

    //#region 標題列區塊
    //#region 標題列
    titleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                zIndex: 2
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "520px",
            })
        }
    },
    //#endregion
    //#region 標題列第二列
    secondTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "16px 0px 0px 0px",
                zIndex: 1
            }),
        },
    },
    //#endregion
    //#region 查詢日期區間 DateTimeRange 
    dateTimeRange: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                // padding: "0 12px",
                display: "inline-block",
                // ...style.occupy(3),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                // padding: "0 12px",
                display: "inline-block",
                // ...style.occupy(3),
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
                    width: "244px",
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

    //#region 單選下拉選單 請選擇用戶身份 UserCaseType
    userId: {
        container: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block"
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
        selectorContainer: {
            basic: (style, props) => ({
                ...style,
                width: "150px"
            })
        }
    },
    //#endregion

    //#region 單選下拉選單 請選擇服務單位 Unit
    unit: {
        container: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                width: "100%",
                padding: "0",
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
        selectorContainer: {
            basic: (style, props) => ({
                ...style,
                // width: "400px"
            })
        }
    },
    //#endregion

    //#region 匯出檔案按鈕
    exportButton: {
        basic: (style) => ({
            ...style,
            width: "88px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#1890ff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: "0 0 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255 ,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 營收報表長條圖表容器
    barChartContainer: {
        basic: (style, props) => ({
            ...style,
            background: "#fff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            // width: "100%",
            height: "302px",
            padding: "24px",
            // margin: "12px",
            width: "100%" //表容器寬度
        })
    },
    //#endregion

    //#region Table區域
    //#region Table容器
    tableContainer: {
        basic: (style, props) => ({
            ...style,
            height: "calc( 100vh - 219px - 4px - 48px )",
            width: "100%",
            margin: "24px 0 0 0",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
        })
    },
    //#endregion
    //#endregion

}