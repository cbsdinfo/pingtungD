export default {
    //#region 叫車表單容器
    callCarOutContainer: {
        basic: (style, props) => ({
            ...style,
            // height: "calc( 100vh - 100px - 111px)",
            height: "auto",
        })
    },
    //#endregion

    //#region 叫車表單區域容器
    formContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            height: "100%",
            padding: "0 0 0 0",
        })
    },
    //#endregion

    //#region 叫車表單容器
    callCarFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "calc( 100% - 160px )",
                // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#fff",
                padding: "24px 12px 0 12px"
            })
        }
    },
    //#endregion

    //#region 叫車表單標題列
    callCarFormTitleContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "64px",
            // boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#FFBB96",
            padding: "16px 24px"
        })
    },
    //#endregion

    //#region 個案名字
    callCarFormCaseName: {
        basic: (style, props) => ({
            ...style,
            fontSize: "24px",
            lineHeight: "24px",
            color: "rgba(0,0,0,0.85)",
            fontWeight: 600,
            display: "inline-block",
            padding: "2px 0 12px"
            // top: "24px",
            // left: "24px"
        })
    },
    //#endregion

    //#region 路線名稱 RouteName
    routeName: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
                marginLeft: "12px",
                display: "inline-block",
                width: "450px",
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
                marginLeft: "12px",
                display: "inline-block",
                width: "450px",
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                //height: "0px"
            })
        },
        textInputContainer: {
            basic: (style, props) => {

                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => {
                //console.log(style, props)
                return {
                    ...style,
                    //#region 當有開啟 openEye 並且 hover 或 focus 時變色
                    ...(
                        props.openEye && {
                            border: `1px solid ${(props.focus || props.hover) ? "#1890ff" : "#d9d9d9"}`,
                            boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(24, 144, 255, 0.2)" : null
                        }
                    ),
                    //#endregion
                    height: "28px"
                }
            }
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "24px"
                // minHeight: "16px",
                // height: "auto",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f"
            })
        }
    },
    //#endregion

    //#region 行程標題列
    strokeFormTitleContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "32px",
            boxShadow: "0px 2px 0 rgba(217,217,217,1)",
            backgroundColor: "transparent",
            margin: "0 12px"
        })
    },
    //#endregion

    //#region 行程文字
    strokeText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "18px",
            lineHeight: "32px",
            color: "rgba(0,0,0,0.85)",
            fontWeight: 500,
            display: "inline-block",
            // top: "24px",
            // left: "24px"
        })
    },
    //#endregion

    //#region 行程負號icon
    strokeMinusSvg: {
        position: "absolute",
        left: "40px",
        top: "15px"
    },
    //#endregion

    //#region 行程容器
    strokeFormContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "auto",
            // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
            backgroundColor: "#F0F0F0",
            margin: "12px 12px 0",
            padding: "0 0 24px 0",
            display: props.open ? "flex" : "none",
        })
    },
    //#endregion

    //#region 起點容器
    startPosContainer: {
        basic: (style, props) => ({
            ...style,
            width: "50%",
            height: "auto",
            // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
            backgroundColor: "transparent",
            // margin: "12px",
            padding: "36px 12px 12px"
        })
    },
    //#endregion

    //#region 起點 StartPos
    startPos: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "16px 12px 0",
                // display: "inline-block",
                ...style.occupy(12),
                marginTop: "12px",
                backgroundColor: "#FFF",
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "16px 12px 0",
                // display: "inline-block",
                ...style.occupy(12),
                marginTop: "12px",
                backgroundColor: "#FFF",
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        gmapInputContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    color: props.disable ? null : ((props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.25)")
                }
            }
        },
        gmapInputSubContainer: {
            basic: (style, props) => ({
                ...style,
                height: "28px",
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "24px",
                minHeight: "24px",
            })
        }
    },
    //#endregion

    //#region 預覽路線按鈕
    seeRouteButton: {
        basic: (style) => ({
            ...style,
            width: "88px",
            height: "24px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "14px",
            padding: 0,
            color: "#FFF",
            backgroundColor: "#FF7A45",
            borderColor: "#FF7A45",
            borderRadius: "2px",
            position: "absolute",
            right: "130px",
            margin: 0
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255,122,69,0.65)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 起訖點互換容器
    convertContainer: {
        basic: (style, props) => ({
            ...style,
            position: "absolute",
            display: "inline-block",
            color: "#1890ff",
            fontSize: "14px",
            lineHeight: "22px",
            cursor: "pointer",
            // padding: "0 2px 0 0",
            right: "4px",
            top: "-3px"
        })
    },
    //#endregion

    //#region 起訖點互換按鈕容器
    convertButtonContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            textAlign: "center",
        })
    },
    //#endregion
    //#region 起訖點互換按鈕
    convertButton: {
        basic: (style) => ({
            ...style,
            width: "106px",
            height: "24px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "14px",
            padding: 0,
            color: "#FFF",
            backgroundColor: "#FF7A45",
            borderColor: "#FF7A45",
            borderRadius: "2px",
            position: "absolute",
            right: "16px",
            margin: 0
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255,122,69,0.65)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 起訖點互換圖標
    convertContainerIcon: {
        position: "relative",
        top: "2px",
        margin: "-4px 4px 0 0",
    },
    //#endregion

    //#region 訖點容器
    endPosContainer: {
        basic: (style, props) => ({
            ...style,
            width: "50%",
            height: "auto",
            // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
            backgroundColor: "transparent",
            // margin: "12px",
            padding: "36px 12px 12px"
        })
    },
    //#endregion

    //#region 迄點
    endPos: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "16px 12px 0",
                // display: "inline-block",
                ...style.occupy(12),
                marginTop: "12px",
                backgroundColor: "#FFF",
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "16px 12px 0",
                // display: "inline-block",
                ...style.occupy(12),
                marginTop: "12px",
                backgroundColor: "#FFF",
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        gmapInputContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    color: props.disable ? null : ((props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.25)")
                }
            }
        },
        gmapInputSubContainer: {
            basic: (style, props) => ({
                ...style,
                height: "28px",
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "24px",
                minHeight: "24px",
            })
        }
    },
    //#endregion

    //#region 其他資訊容器
    otherInfoContainer: {
        laptopL: {
            basic: (style, props) => ({
                ...style,
                width: "50%",
                height: "auto",
                // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
                backgroundColor: "transparent",
                // margin: "12px",
                padding: "12px 16px"
            })
        },
        laptop: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "auto",
                // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
                backgroundColor: "transparent",
                // margin: "12px",
                padding: "12px 16px"
            })
        },
        tablet: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "auto",
                // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
                backgroundColor: "transparent",
                // margin: "12px",
                padding: "12px 16px"
            })
        },
    },
    //#endregion

    //#region 地圖區域樣式

    //#region 叫車地圖區域容器
    mapContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            height: "100%",
            padding: "0 24px 24px 24px",
            backgroundColor: "#fff"
        })
    },
    //#endregion

    //#region 地圖
    map: {
        mapContainer: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "auto",
                minHeight: "300px"
            })
        }
    },
    //#endregion

    //#region 起訖點容器
    startToEndContainer: {
        basic: (style, props) => ({
            ...style,
            boxShadow: "inset 0px -1px 0px #F0F0F0",
            padding: "8px 0 0px 24px",
            height: "176px",

        })
    },
    //#endregion

    //#region 起訖點箭頭 icon
    startToEndSvg: {
        position: "absolute",
        left: "16px",
        top: "20px"
    },
    //#endregion

    //#region 起點
    todayToDoStart: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            height: "22px",
            // color: "#FF7A45",
            margin: "0 0 8px 0",
            padding: "0 0 0 24px"
        })
    },
    //#endregion

    //#region 起點 icon
    todayToDoStartSvg: {
        position: "absolute",
        left: "0px",
        top: "2px"
    },
    //#endregion

    //#region 起點地址
    todayToDoStartAddr: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "22px",
            minHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            margin: "0 0 8px 0",
            padding: "0 0 0 24px"
        })
    },
    //#endregion

    //#region 迄點
    todayToDoEnd: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            height: "22px",
            // color: "#FF7A45",
            margin: "0 0 8px 0",
            padding: "0 0 0 24px"
        })
    },
    //#endregion

    //#region 迄點 icon
    todayToDoEndSvg: {
        position: "absolute",
        left: "0px",
        top: "2px"
    },
    //#endregion

    //#region 迄點地址
    todayToDoEndAddr: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "22px",
            minHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            margin: "0 0 8px 0",
            padding: "0 0 0 24px"
        })
    },
    //#endregion

    //#region 行程表格
    tableContainer: {
        laptopL: {
            basic: (style, props) => ({
                ...style,
                height: "auto",
                width: "50%",
                // display: props.open ? "block" : "none",
                padding: "12px 16px",
                // minHeight: "142px"
            })
        },
        laptop: {
            basic: (style, props) => ({
                ...style,
                height: "auto",
                width: "100%",
                // display: props.open ? "block" : "none",
                padding: "12px 16px",
                // minHeight: "142px"
            })
        },
        tablet: {
            basic: (style, props) => ({
                ...style,
                height: "auto",
                width: "100%",
                // display: props.open ? "block" : "none",
                padding: "12px 16px",
                // minHeight: "142px"
            })
        },
    },
    //#endregion

    //#region 行程欄位樣式
    type: {
        basic: (style, props) => ({
            ...style,
            color: "#1890ff",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion


    //#endregion


    //#region 叫車表單區域樣式







    //#region 可用補助餘額查詢按鈕
    balanceInquiryButton: {
        basic: (style) => ({
            ...style,
            position: "absolute",
            width: "166px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            padding: "0 16px 0 0",
            color: "#1890FF",
            borderColor: "#1890FF",
            backgroundColor: "#FFFFFF",
            borderRadius: "2px",
            textAlign: "right",
            right: "24px",
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24,144,255,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 可用補助餘額查詢 Modal 文字
    balanceInquiryMTodalText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.65)",
        })
    },
    //#endregion

    //#region 可用補助餘額查詢按鈕 左方圖標
    balanceInquiryButtonIcon: {
        position: "absolute",
        height: "100%",
        left: "16px",
        cursor: "pointer",
        color: "#1890FF",
        fillOpacity: "unset",
        top: "0px"
    },
    //#endregion






    //#region 乘車日期 TravelDate
    travelDate: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 8px 0 12px",
                display: "inline-block",
                // ...style.occupy(6),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 8px 0 12px",
                display: "inline-block",
                // ...style.occupy(6),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        dateTimePickerContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    color: props.disable ? null : ((props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.25)"),
                    width: "200px"
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
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 乘車時間 TravelTime
    travelTime: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px 0 8px",
                display: "inline-block",
                // ...style.occupy(6),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px 0 8px",
                display: "inline-block",
                // ...style.occupy(6),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        dateTimePickerContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    color: props.disable ? null : ((props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.25)"),
                    width: "200px"
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
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region  我要預約回程 ScheduleReturnReview
    scheduleReturnReview: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 8px 0 0",
                //display: "inline-block",
                // ...style.occupy(6),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
        checkboxContainer: {
            basic: (style, props) => ({
                ...style,
                //width: "200px"
            })
        },
        checkboxGroup: {
            basic: (style, props) => ({
                //調高度
                ...style,
                display: "inlineFlex",
                fontSize: "14px",
                lineHeight: "22px",
                color: "rgba(0,0,0,0.85)",
                fontWeight: 500,
                // height: "28px",
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                // minHeight: "18px",
                height: "0px"
            })
        }
    },
    //#endregion

    //#region 回程乘車時間 ReturnTravelTime
    returnTravelTime: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px 0 8px",
                display: "inline-block",
                // ...style.occupy(6),
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                //height: "0px"
            })
        },
        viewTypeBottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                minHeight: "24px",
                height: "auto"
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px 0 8px",
                display: "inline-block",
                // ...style.occupy(6),
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
                height: "28px",
                width: "200px"
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                // minHeight: "24px",
                height: "0px"
            })
        }
    },
    //#endregion



    //#region  願意共乘 RideTogetherReview
    rideTogetherReview: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 8px 0 0",
                //display: "inline-block",
                // ...style.occupy(6),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
        checkboxContainer: {
            basic: (style, props) => ({
                ...style,
                //width: "200px"
            })
        },
        checkboxGroup: {
            basic: (style, props) => ({
                //調高度
                ...style,
                display: "inlineFlex",
                fontSize: "14px",
                lineHeight: "22px",
                color: "rgba(0,0,0,0.85)",
                fontWeight: 500,
                // height: "28px",
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                minHeight: "18px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 小標文字
    formSubTitleText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            fontWeight: 500,
            top: "4px",
            // left: "24px"
        })
    },
    //#endregion

    //#region 車種 CarType
    carType: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 16px 0 8px",
                display: "inline-block",
                // ...style.occupy(4),
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
                width: "100px"
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                minHeight: "26px",
                height: "26px",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f",
                // width: "600%"
            })
        }
    },
    //#endregion

    //#region 去程搭車人數容器
    takerCountsContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "auto",
            // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
            backgroundColor: "transparent",
            // margin: "12px",
            padding: "12px 16px"
        })
    },
    //#endregion

    //#region 搭車人數 AccompanyCounts
    accompanyCounts: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px 0 8px",
                display: "inline-block",
                // ...style.occupy(4),
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
                width: "80px"
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // minHeight: "26px",
                // height: "26px",
                height: "0px",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f",
                // width: "600%"
            })
        }
    },
    //#endregion

    //#region 搭乘者資訊外容器
    takerInfoOutContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "auto",
            // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
            // backgroundColor: "#FFD8BF",
            // margin: "12px",
            padding: "0 16px"
        })

    },
    //#endregion

    //#region 搭乘者資訊容器
    takerInfoContainer: {
        laptopL: {
            basic: (style, props) => ({
                ...style,
                width: "50%",
                height: "auto",
                // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
                backgroundColor: "#FFD8BF",
                // margin: "12px",
                padding: "16px 8px"
            })
        },
        laptop: {
            basic: (style, props) => ({
                ...style,
                width: "50%",
                height: "auto",
                // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
                backgroundColor: "#FFD8BF",
                // margin: "12px",
                padding: "16px 0"
            })
        },
        tablet: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "auto",
                // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
                backgroundColor: "#FFD8BF",
                // margin: "12px",
                padding: "16px 0"
            })
        },
    },
    //#endregion

    //#region 搭車姓名 TakerName
    takerName: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 8px",
                display: "inline-block",
                ...style.occupy(4),
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                //height: "0px"
            })
        },
        viewTypeBottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                // minHeight: "24px",
                height: "0px"
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 8px",
                display: "inline-block",
                ...style.occupy(4),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // textAlign: "right",
                //height: "0px"
            })
        },
        textInputContainer: {
            basic: (style, props) => {

                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => {
                //console.log(style, props)
                return {
                    ...style,
                    //#region 當有開啟 openEye 並且 hover 或 focus 時變色
                    ...(
                        props.openEye && {
                            border: `1px solid ${(props.focus || props.hover) ? "#1890ff" : "#d9d9d9"}`,
                            boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(24, 144, 255, 0.2)" : null
                        }
                    ),
                    //#endregion
                    height: "28px"
                }
            }
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                // minHeight: "24px",
                height: "0px",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f"
            })
        }
    },
    //#endregion

    //#region 搭車生日 TakerBirthday
    takerBirthday: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 8px",
                display: "inline-block",
                ...style.occupy(4),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 8px",
                display: "inline-block",
                ...style.occupy(4),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
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
                // height: "24px"
                // minHeight: "24px",
                height: "0px"
            })
        }
    },
    //#endregion

    //#region 搭車電話 TakerPhone
    takerPhone: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 8px",
                display: "inline-block",
                ...style.occupy(4),
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                //height: "0px"
            })
        },
        viewTypeBottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                // minHeight: "24px",
                height: "0px"
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 8px",
                display: "inline-block",
                ...style.occupy(4),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // textAlign: "right",
                //height: "0px"
            })
        },
        textInputContainer: {
            basic: (style, props) => {

                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => {
                //console.log(style, props)
                return {
                    ...style,
                    //#region 當有開啟 openEye 並且 hover 或 focus 時變色
                    ...(
                        props.openEye && {
                            border: `1px solid ${(props.focus || props.hover) ? "#1890ff" : "#d9d9d9"}`,
                            boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(24, 144, 255, 0.2)" : null
                        }
                    ),
                    //#endregion
                    height: "28px"
                }
            }
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                // minHeight: "24px",
                height: "0px",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f"
            })
        }
    },
    //#endregion

    //#region 搭車電話刪除icon 
    deleteSvg: {
        position: "absolute",
        right: "0px",
        color: "#FF4D4F"
    },

    //#region 簡訊號碼 SmsNumber
    smsNumber: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 16px 0 8px",
                display: "inline-block",
                // ...style.occupy(4),
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
        viewTypeBottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                minHeight: "24px",
                height: "auto"
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 16px 0 8px",
                display: "inline-block",
                // ...style.occupy(4),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
        textInputContainer: {
            basic: (style, props) => {

                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.65)",
                    width: "130px"
                }
            }
        },
        textInput: {
            basic: (style, props) => {
                //console.log(style, props)
                return {
                    ...style,
                    //#region 當有開啟 openEye 並且 hover 或 focus 時變色
                    ...(
                        props.openEye && {
                            border: `1px solid ${(props.focus || props.hover) ? "#1890ff" : "#d9d9d9"}`,
                            boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(24, 144, 255, 0.2)" : null
                        }
                    ),
                    //#endregion
                    height: "28px"
                }
            }
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 回程搭車人數容器
    accompanyCountsContainer: {
        basic: (style, props) => ({
            ...style,
            width: "50%",
            height: "auto",
            // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
            backgroundColor: "transparent",
            // margin: "12px",
            padding: "12px 16px"
        })
    },
    //#endregion

    //#region 代入按鈕
    importButton: {
        basic: (style) => ({
            ...style,
            width: "112px",
            height: "24px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "4px",
            padding: 0,
            color: "#FFF",
            backgroundColor: "#FF7A45",
            borderColor: "#FF7A45",
            borderRadius: "2px",
            margin: "0 16px"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255,122,69,0.65)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 維持排版佔位
    companyEnableOccupy: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(8),
        })
    },
    //#endregion

    //#region 叫車表單下方按鈕列
    callCarFormBottomContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "64px",
            // boxShadow: "0px -2px 8px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#D9D9D9",
            textAlign: "right",
            padding: "16px 24px",
            margin: "0 12px"
        }),
    },
    //#endregion

    //#region 回列表按鈕
    returnButton: {
        basic: (style) => ({
            ...style,
            width: "74px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "2px",
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

    //#region 儲存按鈕
    saveButton: {
        basic: (style) => ({
            ...style,
            width: "60px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: 0
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24,144,255,0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
}