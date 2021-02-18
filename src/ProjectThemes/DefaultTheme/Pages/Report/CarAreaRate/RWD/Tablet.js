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
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "520px"
            })
        }
    },
    //#endregion
    //#endregion

    //#region 頁面外層容器
    outContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "0"
        })
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
    
    //#region 單選下拉選單 請選擇用戶身分 userIdentity
    userIdentity: {
        container: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
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
        },
    },
    //#endregion
    //#region 單選下拉選單 請選擇服務單位 serviceUnits
    serviceUnits: {
        container: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                padding: "16px 0 0 0",
                width: "100%"
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
                width: "calc(  100% + 3px )"
            })
        },
    },
    //#endregion
    //#region 匯出報表按鈕
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
            // margin: "0 16px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255 ,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 出發區域比例
    //#region 出發區域比例區容器
    orderRecordContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "24px 12px",
                margin: "4px 12px 24px",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: "auto",
            }
        }
    },
    //#endregion

    //#region 出發區域比例 子標題列
    orderRecordSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "calc( 100% - 24px )",
                margin: "0 12px 24px"
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "200px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "470px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region 出發區域比例Chart區域容器
    orderRecordTableContainer: {
        basic: (style, props) => ({
            ...style,
            height: "470px",
            padding: "0px 24px 0"
        })
    },
    //#endregion
    //#endregion

    //#region 返回區域比例
    //#region 返回區域比例區容器
    returnRateContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "24px 12px",
                margin: "4px 12px 0",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: "auto"
            }
        }
    },
    //#endregion

    //#region 返回區域比例 子標題列
    returnRateSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "calc( 100% - 24px )",
                margin: "0 12px 24px"
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "200px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "470px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region 返回區域比例Chart區域容器
    returnRateTableContainer: {
        basic: (style, props) => ({
            ...style,
            height: "470px",
            padding: "0px 24px 0"
        })
    },
    //#endregion
    //#endregion

}