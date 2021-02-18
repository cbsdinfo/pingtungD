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
                width: "200px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "282px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region 批輛排班表單 區域

    //#region  批輛排班表單 請選擇司機
    mulRosterOrderDriver: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 6px",
                display: "inline-block",
                ...style.occupy(6),
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
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px",
                // minHeight: "24px",
                // height: "auto",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f",
                // width: "600%"
            })
        }
    },
    //#endregion

    //#region  批輛排班表單 請選擇車輛
    mulRosterOrderCar: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 6px",
                display: "inline-block",
                ...style.occupy(6),
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
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px",
                // minHeight: "24px",
                // height: "auto",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f",
                // width: "600%"
            })
        }
    },
    //#endregion

    //#region Modal 樣式
    mulRosterModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "420px"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "24px",
                zIndex: 100
            }),
        }
    },
    //#endregion

    //#endregion

    //#region 批量排班按鈕
    mulRosterButton: {
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
            margin: "0 16px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255 ,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 回列表按鈕
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

    //#region  調度台 區域
    //#region  調度台 容器
    dispatchContainer: {
        basic: (style, props) => ({
            ...style,
            height: "auto",
            width: "100%",
            padding: "24px 12px 0px",
            margin: "4px 0 0 0",
            background: "#fff",
            boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",

        })
    },
    //#endregion

    //#region  調度台 子標題列
    dispatchSubTitleBar: {
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
                width: "60px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region  調度台表格容器
    dispatchTableContainer: {
        basic: (style, props) => ({
            ...style,
            height: "calc( 100vh - 219px - 4px - 90px )",
            width: "100%",
            padding: "0 16px",
            top: "-32px",
        })
    },
    //#endregion

    //#region 調度台 訂單狀態 Tag 區域
    dispatchStatusTag: {
        //#region 新訂單
        newOrder: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 48px 0 0",
                    top: "3px",
                    padding: "0px 7px",
                    fontSize: "12px",
                    lineHeight: "20px",
                    color: "#FA8C16",
                    backgroundColor: "#FFF7E6",
                    borderColor: "#FFD591"
                }),
                hover: {}
            }
        },
        //#endregion
        //#region 已排班
        assignedOrder: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 48px 0 0",
                    top: "3px",
                    padding: "0px 7px",
                    fontSize: "12px",
                    lineHeight: "20px",
                    color: "#52C41A",
                    backgroundColor: "#F6FFED",
                    borderColor: "#B7EB8F"

                }),
                hover: {}
            }
        },
        //#endregion
        //#region 抵達搭車地點
        arrivalOrder: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 12px 0 0",
                    top: "3px",
                    padding: "0px 7px",
                    fontSize: "12px",
                    lineHeight: "20px",
                    color: "#1890FF",
                    backgroundColor: "#E6F7FF",
                    borderColor: "#91D5FF"

                }),
                hover: {}
            }
        },
        //#endregion
        //#region 客上
        customUpOrder: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 60px 0 0",
                    top: "3px",
                    padding: "0px 7px",
                    fontSize: "12px",
                    lineHeight: "20px",
                    color: "#F5222D",
                    backgroundColor: "#FFF1F0",
                    borderColor: "#FFA39E"

                }),
                hover: {}
            }
        },
        //#endregion
        //#region 已完成
        finishedOrder: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 48px 0 0",
                    top: "3px",
                    padding: "0px 7px",
                    fontSize: "12px",
                    lineHeight: "20px",
                    color: "rgba(0, 0, 0, 0.65)",
                    backgroundColor: "#FAFAFA",
                    borderColor: "#D9D9D9"

                }),
                hover: {}
            }
        },
        //#endregion
        //#region 已取消
        unitCancleOrder: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 12px 0 0",
                    top: "3px",
                    padding: "0px 7px",
                    fontSize: "12px",
                    lineHeight: "20px",
                    color: "#FA541C",
                    backgroundColor: "#FFF2E8",
                    borderColor: "#FFBB96"

                }),
                hover: {}
            }
        },
        //#endregion
    },
    //#endregion

    //#region  調度台 起迄點 
    dispatchFromAndToAddrOne: {
        basic: (style, props) => ({
            ...style,
            // height: "55px",
        })
    },
    //#endregion

    //#region 調度台 起點文字
    dispatchFromAddr: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#1890ff",
        })
    },
    //#endregion

    //#region 調度台 起點 圖標
    dispatchFromAddrIcon: {
        margin: "0 8px 0 0"
    },
    //#endregion

    //#region 調度台 迄點文字
    dispatchToAddr: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#389e0d",
        })
    },
    //#endregion

    //#region 調度台 迄點 圖標
    dispatchToAddrIcon: {
        position: "relative",
        margin: "0px 6px 0px 0px",
        top: "3px",
        left: "-1px"
    },
    //#endregion

    //#region  調度台 請選擇司機
    dispatchOrderDriver: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 6px",
                display: "inline-block",
                ...style.occupy(12),
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
                //width: "200px"
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "8px",
                // minHeight: "24px",
                // height: "auto",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f",
                // width: "600%"
            })
        }
    },
    //#endregion

    //#region  調度台 請選擇車輛
    dispatchOrderCar: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 6px",
                display: "inline-block",
                ...style.occupy(12),
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
                //width: "200px"
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "8px",
                // minHeight: "24px",
                // height: "auto",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f",
                // width: "600%"
            })
        }
    },
    //#endregion

    //#region  調度台 排班按鈕
    dispatchRosterBtn: {
        basic: (style) => ({
            ...style,
            width: "54px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: "0 0 0 8px",
            // position: "absolute",
            fontWeight: "400",
            // left: "68px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region  調度台 編輯訂單按鈕
    dispatchEditOrderBtn: {
        basic: (style) => ({
            ...style,
            width: "82px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#389e0d",
            borderColor: "#389e0d",
            borderRadius: "2px",
            margin: "0 0 0 8px",
            // position: "absolute",
            fontWeight: "400",
            // left: "172px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(56, 158, 13, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 編輯訂單 Modal 區域

    //#region 訂單編號
    dispatchEditOrderNo: {
        basic: (style, props) => ({
            ...style,
            color: "#fff",
            fontSize: "14px",
            lineHeight: "22px",
            userSelecr: "none",
            cursor: "default"
        })
    },
    //#endregion

    //#region 訂單組件
    dispatchEditCarOrder: {
        container: {
            basic: (style, props) => ({
                ...style,
                // width: "270px",
                // margin: "0 8px 16px"
            })
        },
        content: {
            basic: (style, props) => ({
                ...style,
                padding: "0"
            })
        }
    },
    //#endregion

    //#region 訂單組件左半邊容器
    dispatchEditLeftContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(8.5),
            padding: "16px",
        })
    },
    //#endregion

    //#region 訂單姓名
    dispatchEditOrderName: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            color: "rgba(0, 0, 0, 0.65)",
            userSelecr: "none",
            cursor: "default"
        })
    },
    //#endregion

    //#region 訂單路線 DispatchEditRoute
    dispatchEditRoute: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                height: "22px", // 縮短了
                color: "rgba(0, 0, 0, 0.45)",
            })
        },
        viewTypeBottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "8px",
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "22px", // 縮短了
                color: "rgba(0, 0, 0, 0.45)",
            })
        },
        selectorContainer: {
            basic: (style, props) => ({
                ...style,
                //width: "200px"
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "8px",
            })
        }
    },
    //#endregion

    //#region 訂單起點 DispatchEditStartPos
    dispatchEditStartPos: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                height: "22px", // 縮短了
                color: "rgba(0, 0, 0, 0.45)",
            })
        },
        viewTypeBottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "8px",
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "22px", // 縮短了
                color: "rgba(0, 0, 0, 0.45)",
            })
        },
        selectorContainer: {
            basic: (style, props) => ({
                ...style,
                //width: "200px"
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "8px",
            })
        }
    },
    //#endregion

    //#region 訂單迄點 DispatchEditEndPos
    dispatchEditEndPos: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                height: "22px", // 縮短了
                color: "rgba(0, 0, 0, 0.45)",
            })
        },
        viewTypeBottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "8px",
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "22px", // 縮短了
                color: "rgba(0, 0, 0, 0.45)",
            })
        },
        selectorContainer: {
            basic: (style, props) => ({
                ...style,
                //width: "200px"
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "8px",
            })
        }
    },
    //#endregion


    //#region 訂單組件右半邊容器
    dispatchEditRightContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(3.5),
            padding: "16px",
            backgroundColor: "#fafafa",
            borderBottomRightRadius: "8px"
        })
    },
    //#endregion

    //#region 訂單乘車日期 DispatchEditTravelDate
    dispatchEditTravelDate: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "22px", // 縮短了
                color: "rgba(0, 0, 0, 0.45)",
            })
        },
        dateTimePickerContainer: {
            basic: (style, props) => {
                return {
                    ...style,
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
                height: "8px",
            })
        }
    },
    //#endregion

    //#region 訂單乘車時間 DispatchEditTravelTime
    dispatchEditTravelTime: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "22px", // 縮短了
                color: "rgba(0, 0, 0, 0.45)",
            })
        },
        dateTimePickerContainer: {
            basic: (style, props) => {
                return {
                    ...style,
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
                height: "8px",
            })
        }
    },
    //#endregion

    //#region 訂單搭車人數 DispatchEditAccTotalCounts
    dispatchEditAccTotalCounts: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "22px", // 縮短了
                color: "rgba(0, 0, 0, 0.45)",
            })
        },
        selectorContainer: {
            basic: (style, props) => ({
                ...style,
                //width: "200px"
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "8px",
            })
        }
    },
    //#endregion

    //#region 

    //#endregion




    //#region Modal 樣式
    dispatchEditOrderModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "584px"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "24px",
                zIndex: 100
            }),
        }
    },
    //#endregion

    //#endregion

    //#region  調度台 取消訂單按鈕
    dispatchECancleOrderBtn: {
        basic: (style) => ({
            ...style,
            width: "82px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#FF4D4F",
            borderColor: "#FF4D4F",
            borderRadius: "2px",
            margin: "0 8px 0 8px",
            fontWeight: "400",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255, 77, 79, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 變更司機車輛表單 區域

    //#region  變更司機車輛表單  - 司機 ChangeDriveAndCarOrderDriver
    changeDriveAndCarOrderDriver: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 6px",
                display: "inline-block",
                ...style.occupy(6),
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
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px",
                // minHeight: "24px",
                // height: "auto",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f",
                // width: "600%"
            })
        }
    },
    //#endregion

    //#region  變更司機車輛表單  - 車輛 ChangeDriveAndCarOrderCar
    changeDriveAndCarOrderCar: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 6px",
                display: "inline-block",
                ...style.occupy(6),
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
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px",
                // minHeight: "24px",
                // height: "auto",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f",
                // width: "600%"
            })
        }
    },
    //#endregion

    //#region Modal 樣式
    changeDriveAndCarModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "420px"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "24px",
                zIndex: 100
            }),
        }
    },
    //#endregion

    //#endregion

    //#region  調度台 變更司機車輛按鈕
    dispatchChangeDriveAndCarBtn: {
        basic: (style) => ({
            ...style,
            width: "104px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#d4b106",
            borderColor: "#d4b106",
            borderRadius: "2px",
            margin: "0 0 0 8px",
            // position: "absolute",
            fontWeight: "400",
            // left: "68px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgb(212, 177, 6, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region  調度台 取消排班按鈕
    dispatchECancleRosterBtn: {
        basic: (style) => ({
            ...style,
            width: "82px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#FF4D4F",
            borderColor: "#FF4D4F",
            borderRadius: "2px",
            margin: "0 8px 0 8px",
            fontWeight: "400",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255, 77, 79, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#endregion
}