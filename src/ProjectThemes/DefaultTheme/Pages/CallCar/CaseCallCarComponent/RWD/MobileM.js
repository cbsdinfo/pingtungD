export default {

    //#region  叫車表單 子標題列
    callCarSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                margin: 0,
                backgroundColor: "#FFBB96",
                borderBottom: 0,
                height: "64px",
                padding: "16px 24px"
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "100px",
                fontSize: "24px",
                lineHeight: "24px",
                color: "rgba(0,0,0,0.85)",
                fontWeight: 600,
                padding: "4px 0 0"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "162px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region 可用補助餘額查詢按鈕
    balanceInquiryButton: {
        basic: (style) => ({
            ...style,
            width: "162px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            padding: "0 16px 0 0",
            color: "rgba(0,0,0,0.6)",
            backgroundColor: "#FFFFFF",
            borderRadius: "2px",
            boxShadow: " 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)",
            textAlign: "right",
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "#f5f5f5"
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
        color: "#1890FF",
        fillOpacity: "unset",
        top: "0px",
        color: "rgba(0,0,0,0.6)"
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

    //#region 叫車表單內容容器
    callCarContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            padding: "24px 16px",
            backgroundColor: "#FFFFFF"
        })
    },
    //#endregion

    //#region 乘車日期 TravelDate
    travelDate: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 8px 0 0",
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
                minHeight: "16px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 乘車時間暫用 TravelTime
    travelTime: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 8px",
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
                minHeight: "16px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 訂車人身分 Orderer
    orderer: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
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

    //#region 車行選擇容器
    carDealershipContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            padding: "0 16px",
            backgroundColor: "#FFFFFF"
        })
    },
    //#endregion

    //#region  車行選擇 子標題列
    carDealershipSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                margin: "0 0 12px 0",
                // backgroundColor: "#FFBB96",
                borderBottom: "2px solid #D9D9D9",
                height: "36px",
                padding: 0
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "200px",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "28px",
                color: "rgba(0,0,0,0.85)"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "162px",
                height: "32px"
            })
        }
    },
    //#endregion
    //#region 減號圖標
    minusSvg: {
        position: "relative",
        top: "-5px",
        left: "4px"
    },
    //#endregion

    //#region 優先搭乘車行排序
    bUnitSort: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                // padding: "0 12px",
                ...style.occupy(12),
                // maxWidth: "calc( 33.33% - 4px )",
                // flexBasis: "calc( 33.33% - 4px )",
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                // padding: "0 12px",
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

    //#region 行程容器
    strokeContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            backgroundColor: "#FFFFFF"
        })
    },
    //#endregion

    //#region  行程 子標題列
    strokeSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                margin: 0,
                // backgroundColor: "#FFBB96",
                borderBottom: "1px solid #D9D9D9",
                height: "36px",
                padding: "0 16px"
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "200px",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "28px",
                color: "rgba(0,0,0,0.85)"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "162px",
                height: "32px"
            })
        }
    },
    //#endregion
    //#region 減號圖標
    minusSvg: {
        position: "relative",
        top: "-5px",
        left: "4px"
    },
    //#endregion

    //#region 行程內容容器
    strokeInContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            backgroundColor: "#F0F0F0"
        })
    },
    //#endregion

    //#region 起點容器
    startPointContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            ...style.occupy(12),
            padding: "16px"
        })
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
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 12px 0",
            padding: "0 0 0 24px"
        })
    },
    //#endregion

    //#region 起點 icon
    todayToDoStartSvg: {
        position: "absolute",
        left: 0,
        top: "2px"
    },
    //#endregion

    //#region 起點內容容器
    startPointDataContainer: {
        basic: (style, props) => ({
            ...style,
            backgroundColor: "#FFFFFF",
            padding: "16px 0 0"
        })
    },
    //#endregion

    //#region 起點 StartPos
    startPos: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 16px",
                ...style.occupy(12),
                // maxWidth: "calc( 33.33% - 4px )",
                // flexBasis: "calc( 33.33% - 4px )",
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 16px",
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
                height: "8px",
                // minHeight: "24px",
            })
        }
    },
    //#endregion

    //#region 起點備註 StartPosRemarks
    startPosRemarks: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 16px",
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
                // minHeight: "8px",
                height: "8px",
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
                padding: "0 16px",
                display: "inline-block",
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
                padding: "0 16px",
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

    //#region 迄點容器
    endPointContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            ...style.occupy(12),
            padding: "36px 16px 0"
        })
    },
    //#endregion

    //#region 路線預覽按鈕
    preViewtButton: {
        basic: (style) => ({
            ...style,
            position: "absolute",
            width: "88px",
            height: "24px",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "22px",
            top: "14px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#FF7A45",
            borderColor: "#FF7A45",
            borderRadius: "2px",
            margin: 0,
            right: "130px"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255,122,69,0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 起訖點互換按鈕
    convertButton: {
        basic: (style) => ({
            ...style,
            position: "absolute",
            width: "106px",
            height: "24px",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "22px",
            top: "14px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#FF7A45",
            borderColor: "#FF7A45",
            borderRadius: "2px",
            margin: 0,
            right: "16px"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255,122,69,0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 起訖點互換圖標
    convertContainerIcon: {
        position: "relative",
        top: "3px",
        margin: "-4px 4px 0 0"
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
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 12px 0",
            padding: "0 0 0 24px"
        })
    },
    //#endregion

    //#region 迄點 icon
    todayToDoEndSvg: {
        position: "absolute",
        left: 0,
        top: "2px"
    },
    //#endregion

    //#region 迄點內容容器
    endPointDataContainer: {
        basic: (style, props) => ({
            ...style,
            backgroundColor: "#FFFFFF",
            padding: "16px 0 0"
        })
    },
    //#endregion

    //#region 迄點 EndPos
    endPos: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 16px",
                ...style.occupy(12),
                // maxWidth: "calc( 33.33% - 4px )",
                // flexBasis: "calc( 33.33% - 4px )",
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 16px",
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
                // minHeight: "24px",
                height: "8px"
            })
        }
    },
    //#endregion

    //#region 迄點備註 EndPosRemarks
    endPosRemarks: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 16px",
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
                height: "8px"
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

    //#region 迄點備註 - 其他 OtherEndPosRemarks
    otherEndPosRemarks: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 16px",
                display: "inline-block",
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
                padding: "0 16px",
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

    //#region 行程資料容器
    strokeDataContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            display: "inline-block",
            padding: "24px 16px"
        }),
    },
    //#endregion

    //#region 分隔容器
    halfContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(6),
            display: "inline-block",
        }),
    },
    //#endregion 

    //#region 願意共乘 CanShareEquipment  
    canShareEquipment: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                // display: "inline-block",
                ...style.occupy(12),
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
                margin: 0
                // height: "28px",
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                // minHeight: "16px",
                height: "0px"
            })
        }
    },
    //#endregion

    //#region 預約回程 ReturnTipEquipment  
    returnTipEquipment: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                // display: "inline-block",
                ...style.occupy(12),
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
                margin: 0
                // height: "28px",
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                minHeight: "16px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 回程乘車時間 ReturnTravelTime
    returnTravelTime: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
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
                padding: 0,
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
                // width: "90px"
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                minHeight: "16px",
                height: "16px"
            })
        }
    },
    //#endregion

    //#region 車種 CarType
    carType: {
        container: {
            basic: (style, props) => ({
                ...style,
                // padding: 0,
                padding: "0 8px 0 0",
                display: "inline-block",
                ...style.occupy(3.5),
                // width: "90px"
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
                // width: "100px"
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                minHeight: "16px",
                height: "16px",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f",
                // width: "600%"
            })
        }
    },
    //#endregion

    //#region 輪椅種類 Wheelchair
    wheelchair: {
        container: {
            basic: (style, props) => ({
                ...style,
                // padding: 0,
                display: "inline-block",
                padding: "0 8px",
                // width: "150px"
                ...style.occupy(5.8),
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
                // width: "153px"
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                minHeight: "16px",
                height: "16px",
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
                padding: "0 0 0 8px",
                display: "inline-block",
                ...style.occupy(2.7),
                // width: "71px"
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
                // width: "80px"
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: 0
                minHeight: "16px",
                height: "auto",
            })
        }
    },
    //#endregion

    //#region 接收簡訊號碼 標題
    smsNumberTitle: {
        basic: (style, props) => ({
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            width: "232px",
            margin: "0 24px 0 0",
            color: "rgba(0,0,0,0.85)"
        })
    },
    //#endregion

    //#region 接收簡訊號碼 SmsNumber
    smsNumber: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 8px",
                display: "inline-block",
                // ...style.occupy(4),
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
                padding: "0 8px",
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
                minHeight: "16px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 陪同人數 AccompanyCounts 下標題 文字樣式
    accompanyCountsRequired: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            color: "#000",
            fontSize: "14px",
            lineHeight: "22px"
        }),
        red: {
            basic: (style, props) => ({
                ...style,
                display: "block",
                fontSize: "14px",
                lineHeight: "22px",
                color: "#ff4d4f",
            }),
        }
    },
    //#endregion

    //#region 行程表格
    tableContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            padding: 0,
            display: "inline-block",
            height: "187px"
        }),
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

    //#region 個案負擔文字
    redText: {
        basic: (style, props) => ({
            ...style,
            color: "#ff4d4f",
        }),
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
            padding: "16px 24px"
        })
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

    //#region 地圖區域樣式

    //#region 叫車地圖區域容器
    mapContainer: {
        basic: (style, props) => ({
            ...style,
            // ...style.occupy(12),
            width: "100%",
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
                height: "270px"
            })
        }
    },
    //#endregion
    //#endregion


    //#endregion

}