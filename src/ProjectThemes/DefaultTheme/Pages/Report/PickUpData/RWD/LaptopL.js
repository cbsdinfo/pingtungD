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
                width: "985px"
            })
        }
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
                width: "400px"
            })
        }
    },
    //#endregion

    //#region 匯出檔案按鈕
    exportButton: {
        basic: (style) => ({
            ...style,
            width: "130px",
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
    //#region 匯出服務紀錄檔彈窗
    exportModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "496px"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                height: "292px",
                zIndex: 100
            }),
        }
    },
    //#endregion
    //#region 匯出服務紀錄檔彈窗 - 開始 - 結束日期 ExportDateBetween
    exportDateBetween: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                //display: "inline-block",
                ...style.occupy(12)
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        selectorContainer: {
            basic: (style, props) => ({
                ...style,
                //width: "200px"
            })
        }
    },
    //#endregion
    //#region 匯出服務紀錄檔彈窗 - 請選擇車行 ExportCarDealership
    exportCarDealership: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                //display: "inline-block",
                ...style.occupy(12)
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        selectorContainer: {
            basic: (style, props) => ({
                ...style,
                //width: "200px"
            })
        }
    },
    //#endregion

    //#region 匯出服務紀錄檔彈窗 - 性別 ExportSex
    exportSex: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                //display: "inline-block",
                ...style.occupy(6)
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        selectorContainer: {
            basic: (style, props) => ({
                ...style,
                //width: "200px"
            })
        }
    },
    //#endregion
    //#region 匯出服務紀錄檔彈窗 - 社會福利身份 ExportBoonType
    exportBoonType: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                //display: "inline-block",
                ...style.occupy(6)
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        selectorContainer: {
            basic: (style, props) => ({
                ...style,
                //width: "200px"
            })
        }
    },
    //#endregion

    //#region 非長照身份顯示卡片容器
    //#region 非長照身份顯示卡片容器
    totalInfoCardOutContainer: {
        basic: (style, props) => {
            return {
                ...style,
                margin: "0 0 24px 0"
            }
        }
    },
    //#endregion

    //#region 總趟次資訊卡片 容器
    totalInfoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0 12px",
                height: "auto",
                width: "20%",
                maxWidth: "20%",
                flexBasis: "20%",
            }
        }
    },
    //#endregion
    //#region 總趟次資訊卡片 icon
    totalInfoCardIcon: {
        height: "100%",
        width: "60px",
        color: "#ff7a45"
    },
    //#endregion
    //#region 總趟次資訊卡片 
    totalInfoCard: {
        container: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "32px 0",
                }
            }
        },
        iconContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    height: "60px",
                }
            }
        },
        centerText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "20px",
                    lineHeight: "28px",
                    margin: "0 0 16px 0",
                }
            }
        },
        bottomText: {
            basic: (style, props) => {
                return {
                    ...style,
                    margin: "0 0 0 0"
                }
            }
        },
    },
    //#endregion

    //#region 已完成資訊卡片 容器
    doneInfoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0 12px",
                height: "auto",
                width: "20%",
                maxWidth: "20%",
                flexBasis: "20%",
            }
        }
    },
    //#endregion
    //#region 已完成資訊卡片 icon
    doneInfoCardIcon: {
        height: "100%",
        width: "60px",
        color: "#ff7a45"
    },
    //#endregion
    //#region 已完成資訊卡片 
    doneInfoCard: {
        container: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "32px 0",
                }
            }
        },
        iconContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    height: "60px",
                }
            }
        },
        centerText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "20px",
                    lineHeight: "28px",
                    margin: "0 0 16px 0",
                }
            }
        },
        bottomText: {
            basic: (style, props) => {
                return {
                    ...style,
                    margin: "0 0 0 0"
                }
            }
        },
    },
    //#endregion

    //#region 空趟資訊卡片 容器
    emptyInfoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0 12px",
                height: "auto",
                width: "20%",
                maxWidth: "20%",
                flexBasis: "20%",
            }
        }
    },
    //#endregion  
    //#region 空趟資訊卡片 icon
    emptyInfoCardIcon: {
        height: "100%",
        width: "60px",
        color: "#ff7a45"
    },
    //#endregion 
    //#region 空趟資訊卡片 
    emptyInfoCard: {
        container: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "32px 0",
                }
            }
        },
        iconContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    height: "60px",
                }
            }
        },
        centerText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "20px",
                    lineHeight: "28px",
                    margin: "0 0 16px 0",
                }
            }
        },
        bottomText: {
            basic: (style, props) => {
                return {
                    ...style,
                    margin: "0 0 0 0"
                }
            }
        },
    },
    //#endregion

    //#region 未執行資訊卡片 容器
    noDoInfoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0 12px",
                height: "auto",
                width: "20%",
                maxWidth: "20%",
                flexBasis: "20%",
            }
        }
    },
    //#endregion
    //#region 未執行資訊卡片 icon
    noDoInfoCardIcon: {
        height: "100%",
        width: "60px",
        color: "#ff7a45"
    },
    //#endregion 
    //#region 未執行資訊卡片 
    noDoInfoCard: {
        container: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "32px 0",
                }
            }
        },
        iconContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    height: "60px",
                }
            }
        },
        centerText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "20px",
                    lineHeight: "28px",
                    margin: "0 0 16px 0",
                }
            }
        },
        bottomText: {
            basic: (style, props) => {
                return {
                    ...style,
                    margin: "0 0 0 0"
                }
            }
        },
    },
    //#endregion

    //#region 達成率資訊卡片 容器
    rateInfoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0 12px",
                height: "auto",
                width: "20%",
                maxWidth: "20%",
                flexBasis: "20%",
            }
        }
    },
    //#endregion
    //#region 達成率資訊卡片 icon
    rateInfoCardIcon: {
        height: "100%",
        width: "60px",
        color: "#ff7a45"
    },
    //#endregion 
    //#region 達成率資訊卡片 
    rateInfoCard: {
        container: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "32px 0",
                }
            }
        },
        iconContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    height: "60px",
                }
            }
        },
        centerText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "20px",
                    lineHeight: "28px",
                    margin: "0 0 16px 0",
                }
            }
        },
        bottomText: {
            basic: (style, props) => {
                return {
                    ...style,
                    margin: "0 0 0 0"
                }
            }
        },
    },
    //#endregion

    //#endregion

    //#region 長照身份顯示卡片容器
    //#region 非長照身份顯示卡片容器
    caseTotalInfoCardOutContainer: {
        basic: (style, props) => {
            return {
                ...style,
                margin: "0 0 24px 0"
            }
        }
    },
    //#endregion

    //#region 長照身份 總趟次資訊卡片 容器
    caseTotalInfoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0 12px",
                height: "auto",
                ...style.occupy(2)
            }
        }
    },
    //#endregion
    //#region 長照身份 總趟次資訊卡片 icon
    caseTotalInfoCardIcon: {
        height: "100%",
        width: "60px",
        color: "#ff7a45"
    },
    //#endregion
    //#region 長照身份 總趟次資訊卡片 
    caseTotalInfoCard: {
        container: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "32px 0",
                }
            }
        },
        iconContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    height: "60px",
                }
            }
        },
        centerText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "20px",
                    lineHeight: "28px",
                    margin: "0 0 16px 0",
                }
            }
        },
        bottomText: {
            basic: (style, props) => {
                return {
                    ...style,
                    margin: "0 0 0 0"
                }
            }
        },
    },
    //#endregion

    //#region 長照身份 已完成資訊卡片 ( 共乘與非共乘 )容器
    caseDoneInfoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0 12px",
                height: "auto",
                ...style.occupy(2)
            }
        }
    },
    //#endregion
    //#region 長照身份 已完成資訊卡片 ( 共乘與非共乘 )icon
    caseDoneInfoCardIcon: {
        height: "100%",
        width: "60px",
        color: "#ff7a45"
    },
    //#endregion
    //#region 長照身份 已完成資訊卡片 ( 共乘與非共乘 )
    caseDoneInfoCard: {
        container: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "32px 0",
                }
            }
        },
        iconContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    height: "60px",
                }
            }
        },
        centerText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "20px",
                    lineHeight: "28px",
                    margin: "0 0 16px 0",
                }
            }
        },
        bottomText: {
            basic: (style, props) => {
                return {
                    ...style,
                    margin: "0 0 0 0"
                }
            }
        },
    },
    //#endregion

    //#region 長照身份 空趟資訊卡片 容器
    caseEmptyInfoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0 12px",
                height: "auto",
                ...style.occupy(2)
            }
        }
    },
    //#endregion  
    //#region 長照身份 空趟資訊卡片 icon
    caseEmptyInfoCardIcon: {
        height: "100%",
        width: "60px",
        color: "#ff7a45"
    },
    //#endregion 
    //#region 長照身份 空趟資訊卡片 
    caseEmptyInfoCard: {
        container: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "32px 0",
                }
            }
        },
        iconContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    height: "60px",
                }
            }
        },
        centerText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "20px",
                    lineHeight: "28px",
                    margin: "0 0 16px 0",
                }
            }
        },
        bottomText: {
            basic: (style, props) => {
                return {
                    ...style,
                    margin: "0 0 0 0"
                }
            }
        },
    },
    //#endregion

    //#region 長照身份 未執行資訊卡片 容器
    caseNoDoInfoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0 12px",
                height: "auto",
                ...style.occupy(2)
            }
        }
    },
    //#endregion
    //#region 長照身份 未執行資訊卡片 icon
    caseNoDoInfoCardIcon: {
        height: "100%",
        width: "60px",
        color: "#ff7a45"
    },
    //#endregion 
    //#region 長照身份 未執行資訊卡片 
    caseNoDoInfoCard: {
        container: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "32px 0",
                }
            }
        },
        iconContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    height: "60px",
                }
            }
        },
        centerText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "20px",
                    lineHeight: "28px",
                    margin: "0 0 16px 0",
                }
            }
        },
        bottomText: {
            basic: (style, props) => {
                return {
                    ...style,
                    margin: "0 0 0 0"
                }
            }
        },
    },
    //#endregion

    //#region 長照身份 達成率資訊卡片 容器
    caseRateInfoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0 12px",
                height: "auto",
                ...style.occupy(2)
            }
        }
    },
    //#endregion
    //#region 長照身份 達成率資訊卡片 icon
    caseRateInfoCardIcon: {
        height: "100%",
        width: "60px",
        color: "#ff7a45"
    },
    //#endregion 
    //#region 長照身份 達成率資訊卡片 
    caseRateInfoCard: {
        container: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "32px 0",
                }
            }
        },
        iconContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    height: "60px",
                }
            }
        },
        centerText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "20px",
                    lineHeight: "28px",
                    margin: "0 0 16px 0",
                }
            }
        },
        bottomText: {
            basic: (style, props) => {
                return {
                    ...style,
                    margin: "0 0 0 0"
                }
            }
        },
    },
    //#endregion

    //#endregion

    //#region 接送數據
    //#region 接送數據區容器
    pickUpDataContainer: {
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

    //#region 接送數據Chart區域容器
    pickUpDataChartContainer: {
        basic: (style, props) => ({
            ...style,
            height: "470px",
            padding: "0px 24px 0"
        })
    },
    //#endregion
    //#endregion

}