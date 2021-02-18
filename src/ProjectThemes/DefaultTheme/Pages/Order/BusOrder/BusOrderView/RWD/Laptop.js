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
                    backgroundColor: "#fafafa"
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
                    backgroundColor: "#fafafa"
                }
            }
        },
    },
    //#endregion
    //#region 標題列
    titleBar: {
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "140px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "100px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region 回上一頁按鈕
    returnButton: {
        basic: (style) => ({
            ...style,
            width: "82px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#1890ff",
            backgroundColor: "#fff",
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

    //#region 個案資訊表單區容器
    caseInformationContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "24px 12px",
                margin: "0 24px 0 0",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: "468px",
                width: "27%"
            }
        }
    },
    //#endregion
    //#region  個案資訊 子標題列
    caseInformationSubTitleBar: {
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
        // rightContainer: {
        //     basic: (style, props) => ({
        //         ...style,
        //         width: "252px",
        //         height: "32px"
        //     })
        // }
    },
    //#endregion

    //#region 訂單資訊表單區容器
    orderInformationContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "24px 12px",
                // margin: "4px 0 0 0",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: "468px",
                width: "70%"
            }
        }
    },
    //#endregion
    //#region  訂單資訊 子標題列
    orderInformationSubTitleBar: {
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
                width: "80px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "290px",
                height: "32px"
            })
        }
    },
    //#endregion
    //#region 訂單可否共乘
    carOrderCanShare: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#fa8c16",
            fontSize: "14px"
        }),
    },
    //#endregion

    //#region 訂單可共乘 圖標
    carOrderCanShareSvg: {
        margin: "0 4px 0 8px"
    },
    //#endregion

    //#region 訂單不可共乘 圖標
    carOrderNoShareSvg: {
        margin: "0 4px 0 8px"
    },
    //#endregion

    //#region 普通輪椅(可收折) 
    wheelchair: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#fa8c16",
            fontSize: "14px"
        })
    },
    //#endregion
    //#region 普通輪椅(可收折) 圖標
    wheelchairSvg: {
        margin: "0 4px 0 8px"
    },
    //#endregion

    //#region 陪同人數
    accompanyCount: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#fa8c16",
            fontSize: "14px"
        })
    },
    //#endregion
    //#region 陪同人數 圖標
    accompanyCountSvg: {
        margin: "0 4px 0 8px"
    },
    //#endregion

    //#region 車資表單區容器
    fareContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "24px 12px",
                margin: "24px 0 0 0",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: "174px",
                width: "100%"
            }
        }
    },
    //#endregion
    //#region  車資 子標題列
    fareSubTitleBar: {
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
                width: "252px",
                height: "32px"
            })
        }
    },
    //#endregion
    //#region 修改實收按鈕
    updatePaidButton: {
        basic: (style) => ({
            ...style,
            width: "88px",
            height: "28px",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#FFFFFF",
            backgroundColor: "#1890FF",
            borderColor: "#1890FF",
            borderRadius: "2px",
            // margin: "0 16px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24,144,255,0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 行車路線表單區容器
    routeContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "24px 12px",
                margin: "24px 0 0 0",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: "136px",
                width: "100%"
            }
        }
    },
    //#endregion
    //#region  行車路線 子標題列
    routeSubTitleBar: {
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
                width: "440px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region 預估里程數
    estimatedMileage: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "rgba(0,0,0,0.85)",
            fontSize: "14px",
            lineHeight: "22px",
            margin: "0 8px 0 0",
            top: "6px"
        }),
    },
    //#endregion

    //#region 里程數
    mileage: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "rgba(0,0,0,0.45)",
            fontSize: "14px",
            lineHeight: "22px",
            margin: "0 16px 0 0",
            top: "6px"
        }),
    },
    //#endregion

    //#region 預估行車時間
    estimatedTravelTime: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "rgba(0,0,0,0.85)",
            fontSize: "14px",
            lineHeight: "22px",
            margin: "0 8px 0 0",
            top: "6px"
        }),
    },
    //#endregion

    //#region 行車時間
    travelTime: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "rgba(0,0,0,0.45)",
            fontSize: "14px",
            lineHeight: "22px",
            margin: "0 16px 0 0",
            top: "6px"
        }),
    },
    //#endregion

    //#region 查看行車路線按鈕
    checkRouteButton: {
        basic: (style) => ({
            ...style,
            width: "116px",
            height: "28px",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#FFFFFF",
            backgroundColor: "#1890FF",
            borderColor: "#1890FF",
            borderRadius: "2px",
            // margin: "0 16px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24,144,255,0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 行車歷程表單區容器
    courseContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "24px 12px",
                margin: "24px 0 0 0",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: "182px",
                width: "100%"
            }
        }
    },
    //#endregion
    //#region  行車歷程 子標題列
    courseSubTitleBar: {
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
                width: "252px",
                height: "32px"
            })
        }
    },
    //#endregion
    //#endregion
}