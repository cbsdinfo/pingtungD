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
                width: "500px"
            })
        }
    },
    //#endregion
    //#region 單選下拉選單 請選擇車行 CarDealership
    carDealership: {
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
                width: "calc( 100% + 3px )"
            })
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

    //#region 各車行記點狀況按鈕
    carDealerRecordStatusButton: {
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
            margin: "0 16px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255 ,0.05)"
        }),
        focus: (style, props) => ({})
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
    //#region 匯出報表彈窗
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
                padding: "24px 0",
                height: "220px",
                zIndex: 100
            }),
        }
    },
    //#endregion
    //#region 匯出報表彈窗 - 開始 - 結束日期 ExportDateBetween
    exportDateBetween: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 24px",
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
    //#region 匯出報表彈窗 - 請選擇車行 ExportCarDealership
    exportCarDealership: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "24px 24px 0 24px",
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

    //#region 各車行記點狀況彈窗 區域
    //#region 各車行記點狀況彈窗
    statusModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "683px"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "24px 0",
                height: "600px",
                zIndex: 100
            }),
        }
    },
    //#endregion
    //#region 各車行記點狀況彈窗 Content ScrollBar
    statusInModalContentScrollBar: {
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
    //#region 各車行記點狀況彈窗 ScrollBar 下容器
    statusInModalMainContent: {
        basic: (style, props) => ({
            ...style,
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "100%",
            padding: "0 24px",
            //#endregion
        }),
    },
    //#endregion

    //#region Table區域
    //#region Table容器
    tableContainer: {
        basic: (style, props) => ({
            ...style,
            height: "calc( 100vh - 268px - 4px )",
            width: "100%",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
        })
    },
    //#endregion

    //#region 審核通過按鈕
    checkPassButton: {
        basic: (style) => ({
            ...style,
            width: "88px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: "0 0 0 0",
            position: "absolute",
            fontWeight: "400",
            left: "16px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 審核不通過按鈕
    checkNotPassButton: {
        basic: (style) => ({
            ...style,
            width: "102px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#FF4D4F",
            borderColor: "#FF4D4F",
            borderRadius: "2px",
            margin: "0 0 0 0",
            position: "absolute",
            fontWeight: "400",
            left: "112px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255, 77, 79, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
}