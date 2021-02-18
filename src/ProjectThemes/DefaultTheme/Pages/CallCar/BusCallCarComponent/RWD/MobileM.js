export default {
    //#region 叫車表單容器
    callCarOutContainer: {
        basic: (style, props) => ({
            ...style,
            // height: `calc(  ${props.height}px - 100px - 111px)`,
            height: "auto",
        })
    },
    //#endregion

    //#region 地圖區域樣式

    //#region 叫車地圖區域容器
    mapContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            height: "100%",
            // padding: "0 24px 24px 24px",
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

    //#region 本日行程一覽容器
    todayToDoCotainer: {
        basic: (style, props) => ({
            ...style,
            width: "46%",
            minWidth: "510px",
            height: props.open ? "340px" : "230px",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            position: "absolute",
            bottom: "48px",
            left: "24px",
            backgroundColor: "#fff",

        })
    },
    //#endregion

    //#region 本日行程一覽標題
    todayToDoTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.65)",
            height: "54px",
            padding: "16px 24px",
            boxShadow: "inset 0px -1px 0px #F0F0F0",
            cursor: "pointer"
        })
    },
    //#endregion
    //#region 本日行程一覽標題 icon
    todayToDoTitleIcon: {
        position: "absolute",
        right: "16px",
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
        left: "0px",
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
        basic: (style, props) => ({
            ...style,
            height: "auto",
            width: "100%",
            // display: props.open ? "block" : "none",
            padding: "16px 0 0 0",
            minHeight: "132px"
        })
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

    //#region 叫車表單標題列
    callCarFormTitleContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "64px",
            boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.15)",
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
            lineHeight: "32px",
            color: "rgba(0,0,0,0.85)",
            fontWeight: 700,
            display: "inline-block",
            // top: "24px",
            // left: "24px"
        })
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
            margin: "0",
            display: props.open ? "flex" : "none",
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
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#fff",
                padding: "24px 0 0 0"
            })
        }
    },
    //#endregion

    //#region 乘車日期 TravelDate
    travelDate: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 8px 0 16px",
                display: "inline-block",
                ...style.occupy(6),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 8px 0 16px",
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
                padding: "0 16px 0 8px",
                display: "inline-block",
                ...style.occupy(6),
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
                padding: "0 16px 0 8px",
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
                height: "28px",
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "24px"
            })
        }
    },
    //#endregion

    //#region 車行 CarDealership
    carDealership: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                // display: "inline-block",
                ...style.occupy(12),
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
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(12),
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
                // height: "0px"
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 路線容器
    routeContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "auto",
            // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
            backgroundColor: "transparent",
            // margin: "12px",
            padding: "24px 16px"
        })
    },
    //#endregion

    //#region 路線 icon
    routeSvg: {
        position: "absolute",
        left: "16px",
        top: "28px"
    },
    //#endregion

    //#region 路線 Route
    route: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 32px",
                // display: "inline-block",
                ...style.occupy(12),
                // backgroundColor: "#FFF",
                // margin: "16px"
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
                // minHeight: "24px",
                height: "0px"
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 32px",
                // display: "inline-block",
                ...style.occupy(12),
                // backgroundColor: "#FFF",
                // margin: "16px"
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
                // height: "24px"
                // minHeight: "24px",
                height: "0px"
            })
        }
    },
    //#endregion

    //路線搜尋 icon
    searchSvg: {
        position: "absolute",
        top: "3px",
        left: "-20px"
    },

    //路線搜尋文字
    routeSearchText: {
        basic: (style, props) => ({
            position: "absolute",
            fontSize: "14px",
            lineHeight: "22px",
            fontWeight: 500,
            color: "#1890FF",
            top: "5px",
            right: "4px"
        })
    },

    //#region 起點容器
    startPosContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "auto",
            // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
            backgroundColor: "transparent",
            padding: "16px"
        })
    },
    //#endregion

    //#region 起點
    startPos: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "16px",
                // display: "inline-block",
                ...style.occupy(12),
                marginTop: "12px",
                backgroundColor: "#FFF",
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
                padding: "16px",
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
        selectorContainer: {
            basic: (style, props) => ({
                ...style,
                //width: "200px"
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
            // top: "2px",
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
            width: "100%",
            height: "auto",
            // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
            backgroundColor: "transparent",
            // margin: "12px",
            padding: "16px"
        })
    },
    //#endregion
    //#region 迄點
    endPos: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "16px",
                // display: "inline-block",
                ...style.occupy(12),
                marginTop: "12px",
                backgroundColor: "#FFF",
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
                padding: "16px",
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
        selectorContainer: {
            basic: (style, props) => ({
                ...style,
                //width: "200px"
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
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                //display: "inline-block",
                ...style.occupy(4),
                // maxWidth: "calc( 25% - 6px )",
                // flexBasis: "calc( 25% - 6px )",
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
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
                padding: "0 12px",
                //display: "inline-block",
                ...style.occupy(4),
                // maxWidth: "calc( 25% - 6px )",
                // flexBasis: "calc( 25% - 6px )",
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        radioContainer: {
            basic: (style, props) => ({
                ...style,
                //width: "200px"
            })
        },
        radioGroup: {
            basic: (style, props) => ({
                //調高度
                ...style,
                height: "28px",
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                minHeight: "26px",
                height: "26px",
            })
        }
    },
    //#endregion

    //#region 車種 CarType
    carType: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
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
        selectorContainer: {
            basic: (style, props) => ({
                ...style,
                //width: "200px"
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

    //#region 搭車人數及簡訊容器
    numberContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "auto",
            // boxShadow: "0px 2px 0 rgba(217,217,217,1)",
            backgroundColor: "transparent",
            // margin: "12px",
            padding: "8px 16px"
        })
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

    //#region 搭車人數 AccTotalCounts
    accTotalCounts: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                // display: "inline-block",
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
                width: "80px"
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // minHeight: "24px",
                height: "0px",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f",
                // width: "600%"
            })
        }
    },
    //#endregion


    //#region 簡訊號碼 SmsNumber
    smsNumber: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                // display: "inline-block",
                // ...style.occupy(6),
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
                // minHeight: "24px",
                height: "0px"
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                // display: "inline-block",
                // ...style.occupy(6),
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
                // minHeight: "24px",
                height: "0px"
            })
        }
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
            // margin: "0 12px"
        }),
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

    //#region 立即預約按鈕
    reservationNow: {
        basic: (style) => ({
            ...style,
            width: "82px",
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