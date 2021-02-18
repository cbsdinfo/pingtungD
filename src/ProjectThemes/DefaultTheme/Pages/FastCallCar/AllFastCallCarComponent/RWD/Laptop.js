export default {
    //#region 叫車表單容器
    callCarOutContainer: {
        basic: (style, props) => ({
            ...style,
            // height: "calc( 100vh - 80px - 95px)",
            height: "100vh",
            minHeight: "1190px"
        })
    },
    //#endregion

    //#region 地圖區域樣式

    //#region 叫車地圖區域容器
    mapContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(6),
            height: "100%",
            padding: "0 0 0 0"
        })
    },
    //#endregion

    //#region 地圖
    map: {
        mapContainer: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "100%"
            })
        }
    },
    //#endregion

    //#region 本日行程一覽容器
    todayToDoCotainer: {
        basic: (style, props) => ({
            ...style,
            width: "46%",
            minWidth: "300px",
            height: props.open ? "400px" : "230px",
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
            minHeight: "176px",
            height: "auto"

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
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "22px",
            height: "22px",
            color: "#FF7A45",
            margin: "0 0 8px 0",
            padding: "0 0 0 24px"
        })
    },
    //#endregion

    //#region 起點 icon
    todayToDoStartSvg: {
        position: "absolute",
        left: "8px",
        top: "6px"
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
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "22px",
            height: "22px",
            color: "#FF7A45",
            margin: "0 0 8px 0",
            padding: "0 0 0 24px"
        })
    },
    //#endregion

    //#region 迄點 icon
    todayToDoEndSvg: {
        position: "absolute",
        left: "5px",
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
            height: "170px",
            display: props.open ? "block" : "none",
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
            ...style.occupy(6),
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
            height: "80px",
            boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#fff",
            padding: "24px"
        })
    },
    //#endregion

    //#region 個案名字
    callCarFormCaseName: {
        basic: (style, props) => ({
            ...style,
            fontSize: "24px",
            lineHeight: "32px",
            color: "#1890ff",
            fontWeight: 700,
            display: "inline-block",
            // top: "24px",
            // left: "24px"
        })
    },
    //#endregion

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
            color: "#1890ff",
            borderColor: "#1890ff",
            backgroundColor: "#fff",
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
    //#region 可用補助餘額查詢按鈕 左方圖標
    balanceInquiryButtonIcon: {
        position: "absolute",
        height: "100%",
        left: "16px",
        cursor: "pointer",
        color: "#1890ff",
        fillOpacity: "unset",
        top: "0px"
    },
    //#endregion

    //#region 可用補助餘額查詢 Modal 文字容器
    balanceInquiryMTodalTextContainer: {
        basic: (style, props) => ({
            ...style,
            width: "80px"
        })
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

    //#region 叫車表單容器
    callCarFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "calc( 100% - 160px )",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#fff",
                padding: "24px 12px 24px 12px"
            })
        }
    },
    //#endregion

    //#region 乘車日期 TravelDate
    travelDate: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(6),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
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

    //#region 乘車時間暫用 TravelTime
    travelTime: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(6),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
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

    //#region 優先搭乘車行排序
    bUnitSort: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 12px",
                ...style.occupy(12),
                // maxWidth: "calc( 33.33% - 4px )",
                // flexBasis: "calc( 33.33% - 4px )",
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 12px",
                ...style.occupy(12),
                // maxWidth: "calc( 33.33% - 4px )",
                // flexBasis: "calc( 33.33% - 4px )",
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        numberInputContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    color: props.disable ? null : ((props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.25)")
                }
            }
        },
        numberInputSubContainer: {
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

    //#region 優先搭乘車行排序 (請依序點擊完成排序)
    bUnitSortNote: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 訂車人身分 Orderer
    orderer: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: '0 12PX',
                display: "inline-block",
                ...style.occupy(12),
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
                minHeight: "24px",
                height: "auto",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f",
                // width: "600%"
            })
        }
    },
    //#endregion

    //#region 起點 StartPos
    startPos: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 12px",
                ...style.occupy(12),
                // maxWidth: "calc( 33.33% - 4px )",
                // flexBasis: "calc( 33.33% - 4px )",
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 12px",
                ...style.occupy(12),
                // maxWidth: "calc( 33.33% - 4px )",
                // flexBasis: "calc( 33.33% - 4px )",
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
            width: "122px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "2px",
            padding: 0,
            color: "#1890ff",
            backgroundColor: "#fff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: 0
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24,144,255,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 起訖點互換圖標
    convertContainerIcon: {
        position: "relative",
        top: "5px",
        margin: "-4px 4px 0 0"
    },
    //#endregion

    //#region 起點備註 StartPosRemarks
    startPosRemarks: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
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
                minHeight: "24px",
                height: "24px",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f",
                // width: "600%"
            })
        }
    },
    //#endregion

    //#region 起點備註 - 其他 OtherStartPosRemarks 
    otherStartPosRemarks: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
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
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(6),
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
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 迄點
    endPos: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 12px",
                ...style.occupy(12),
                // maxWidth: "calc( 33.33% - 4px )",
                // flexBasis: "calc( 33.33% - 4px )",
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 12px",
                ...style.occupy(12),
                // maxWidth: "calc( 33.33% - 4px )",
                // flexBasis: "calc( 33.33% - 4px )",
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        map8InputContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    color: props.disable ? null : ((props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.25)")
                }
            }
        },
        map8InputSubContainer: {
            basic: (style, props) => ({
                ...style,
                height: "28px",
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 迄點備註 EndPosRemarks
    endPosRemarks: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
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
                // height: 0
                minHeight: "24px",
                height: "auto",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f",
                // width: "600%"
            })
        }
    },
    //#endregion

    //#region 迄點備註 - 其他 OtherEndPosRemarks
    otherEndPosRemarks: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
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
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(6),
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
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region  我要預約回程(回居住地址) ScheduleReturnReview  
    scheduleReturnReview: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                //display: "inline-block",
                ...style.occupy(6),
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
                ...style.occupy(6),
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
                minHeight: "22pxx",
                height: "22px"
            })
        }
    },
    //#endregion

    //#region 回程乘車時間 ReturnEnableDate
    returnTravelTime: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(6),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
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
                minHeight: "22pxx",
                height: "22px"
            })
        }
    },
    //#endregion

    //#region 維持排版佔位
    returnEnableDateOccupy: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(6),
        })
    },
    //#endregion

    //#region  願意共乘 RideTogetherReview
    rideTogetherReview: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                //display: "inline-block",
                ...style.occupy(6),
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
                ...style.occupy(6),
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

    //#region 輪椅 Wheelchair
    wheelchair: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
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

    //#region 陪同人數 AccompanyCounts
    accompanyCounts: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
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
                height: 0
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
    //#region 陪同人數 AccompanyCounts 下標題 文字樣式
    accompanyCountsRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 簡訊號碼 SmsNumber
    smsNumber: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
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
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(6),
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

    //#region 叫車表單下方按鈕列
    callCarFormBottomContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "80px",
            boxShadow: "0px -2px 8px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#fff",
            textAlign: "right",
            padding: "24px"
        })
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
            margin: "0 16px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255 ,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 新增下個地點按鈕
    addNextLocation: {
        basic: (style) => ({
            ...style,
            width: "116px",
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
            backgroundColor: "rgba(24,144,255,0.05)"
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