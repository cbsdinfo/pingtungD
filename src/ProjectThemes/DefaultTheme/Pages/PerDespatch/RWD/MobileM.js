export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fff",
                    padding: "0px 0px" // 標題列的padding
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#3c4856",
                    height: `calc( ${props.height}px - 56px )`,
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "0", //188 是授權圖高度
                    backgroundColor: "#3c4856",
                    // height:""
                }
            }
        },
    },
    //#endregion

    //#region 卡片外側容器
    cardOutContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "0 0 12px 0",
            width: "100%",
            backgroundColor: "#3c4856"
        })
    },
    //#endregion

    //#region 卡片上層
    //#region 預估陪同 圖標
    withSvg: {
        position: "relative",
        top: "8px",
        left: "-16px"
    },
    //#endregion

    //#region 預估陪同
    familyWidhText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "55px",
            color: "#3B3B3B",
            width: "100%",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 預估陪同資料
    familyWidhData: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            position: "relative",
            top: "2px",
            fontWeight: 400,
            fontSize: "24px",
            lineHeight: "24px",
            color: "#3B3B3B",
            margin: "0 0 0 16px"
        })
    },
    //#endregion

    //#region 收款按鈕 輪椅
    topPayWheelchairTypeText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "13px",
            lineHeight: "55px",
            color: "#3D3D3D",
            textAlign: "right",
            padding: "0 42px"
        })
    },
    //#endregion


    //#endregion

    //#region 卡片下層
    //#region 卡片下層 容器
    bottomContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            height: `calc( ${props.height}px - 56px - 113px )`,
        })
    },
    //#endregion

    //#region 搭車資料
    //#region 搭車時間 容器
    timeDataContainer: {
        basic: (style, props) => ({
            ...style,
            display: props.status === 4 ? "none" : "inline-flex",
            flexDirection: props.status === 3 ? "column" : "unset",
            width: props.status === 3 ? "50%" : "100%",
            backgroundColor: props.status === 3 ? "#F5F5F5" : "transparent",
            height: props.status === 3 ? "88px" : "auto"
        })
    },
    //#endregion

    //#region 搭車時間
    timeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "44px",
            color: "#F67E01",
            width: props.status === 3 ? "100%" : "50%",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 搭車時間 圖標
    clockSvg: {
        position: "relative",
        top: "5px",
        left: "-16px"
    },
    //#endregion

    //#region 輪椅
    wheelchairTypeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "13px",
            lineHeight: "44px",
            color: "#3D3D3D",
            width: props.status === 3 ? "100%" : "50%",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 輪椅 圖標
    wheelchairSvg: {
        position: "relative",
        top: "8px",
        left: "-6px"
    },
    //#endregion
    //#endregion

    //#region 空趟按鈕
    //#region 空趟按鈕 容器
    nullButtonContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            backgroundColor: "#F5F5F5",
            height: "88px"
        })
    },
    //#endregion

    //#region 空趟按鈕
    nullButton: {
        basic: (style) => ({
            ...style,
            width: "130px",
            color: "#CF3A3A",
            backgroundColor: "#fff",
            borderColor: "#fff",
            borderRadius: "43px",
            height: "50px",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "32px",
            padding: "10px 25px",
            textAlign: "right"
        }),
        hover: (style, props) => ({
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 空趟按鈕 圖標
    warningSvg: {
        position: "absolute",
        top: "7px",
        left: "15px"
    },
    //#endregion

    //#region 彈窗 空趟
    nullButtonText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100px",
            color: "#CF3A3A",
            height: "24px",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "32px",
            padding: "0 4px",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 彈窗 空趟按鈕 圖標
    warningSvg2: {
        position: "relative",
        top: "8px",
        left: "-4px"
    },
    //#endregion

    //#endregion

    //#region 收款按鈕
    //#region 收款按鈕 容器
    payButtonContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "73%",
            backgroundColor: "#F5F5F5",
            height: "88px",
            margin: "0 0 12px",
            boxShadow: "inset -1px 0 #C7C7C7",
            padding: "4px 24px"
        })
    },
    //#endregion

    //#region 收款按鈕
    payButton: {
        basic: (style) => ({
            ...style,
            position: "absolute",
            right: "14px",
            top: "12px",
            width: "110px",
            color: "#fff",
            backgroundColor: "#F8A91E",
            borderColor: "#F8A91E",
            borderRadius: "38px",
            height: "45px",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "32px",
            padding: "7px 0",
            zIndex: 10
        }),
        hover: (style, props) => ({
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 收款按鈕 文字
    payCheckText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "13px",
            lineHeight: "18px",
            color: "#3D3D3D",
            width: "100%",

        })
    },
    //#endregion

    //#region 收款按鈕 圖標
    payCheckSvg: {
        margin: "0 8px 0 0",
        position: "relative",
        top: "6px"
    },
    //#endregion

    //#region 收款按鈕 提示
    payCheckTip: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "18px",
            color: "#CF3A3A",
            width: "100%",

        })
    },
    //#endregion

    //#region 收款按鈕 輪椅 容器
    payWheelchairTypeContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "27%",
            backgroundColor: "#F5F5F5",
            height: "88px",
            margin: "0 0 12px",
            textAlign: "center",
            padding: "12px 0"
        })
    },
    //#endregion

    //#region 收款按鈕 輪椅
    payWheelchairTypeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "13px",
            lineHeight: "18px",
            color: "#3D3D3D",
            width: "100%",
            textAlign: "center",

        })
    },
    //#endregion

    //#endregion

    //#region 預估
    //#region 預估容器
    estimateContainer: {
        basic: (style, props) => ({
            ...style,
            display: props.open ? "inline-block" : "none",
            width: "100%",
            backgroundColor: "#F5F5F5"
        })
    },
    //#endregion

    //#region 預估里程
    estimateMileageText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 400,
            fontSize: "36px",
            lineHeight: "73px",
            color: "#3D3D3D",
            width: "50%",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 預估里程 標題
    estimateMileageTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            width: "24px",
            height: "26px",
            fontSize: "12px",
            lineHeight: "13px",
            marginRight: "16px"
        })
    },
    //#endregion

    //#region 公里
    mileageText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "18px",
            marginLeft: "4px"
        })
    },
    //#endregion

    //#region 預估時間
    estimateTimeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 400,
            fontSize: "36px",
            lineHeight: "73px",
            color: "#3D3D3D",
            width: "50%",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 預估時間 標題
    estimateTimeTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            width: "24px",
            height: "26px",
            fontSize: "12px",
            lineHeight: "13px",
            marginRight: "16px"
        })
    },
    //#endregion

    //#region 分鐘
    minuteText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "18px",
            marginLeft: "4px"
        })
    },
    //#endregion
    //#endregion

    //#region 起迄點
    //#region 起迄點容器
    startToEndContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            padding: "8px 16px",
            backgroundColor: props.open ? "#fff" : "#F5F5F5",
        })
    },
    //#endregion

    //#region 上車地點 標題
    startTitle: {
        basic: (style, props) => {
            // console.log(props.status)
            // console.log(props.open)
            return {
                ...style,
                display: ((props.status === 2) || (props.status === 3) || (props.status === 4 && props.open)) ? "inline-block" : "none",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "22px",
                color: "#E87600",
                backgroundColor: ((props.status === 2 && !props.open) || (props.status === 3 && props.open) || (props.status === 4 && !props.open)) ? "#F5F5F5" : "#fff",
                width: "100%",
            }
        }
    },
    //#endregion

    //#region 上車地點 內文
    startText: {
        basic: (style, props) => ({
            ...style,
            display: ((props.status === 2) || (props.status === 3) || (props.status === 4 && props.open)) ? "inline-block" : "none",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "26px",
            color: "#3D3D3D",
            backgroundColor: ((props.status === 2 && !props.open) || (props.status === 3 && props.open) || (props.status === 4 && !props.open)) ? "#F5F5F5" : "#fff",
            width: "100%",
            margin: "6px 0 0"
        })
    },
    //#endregion

    //#region 上車地點 備註
    startRemark: {
        basic: (style, props) => ({
            ...style,
            display: ((props.status === 2) || (props.status === 3) || (props.status === 4 && props.open)) ? "inline-block" : "none",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "16px",
            color: "#F46C00",
            width: "100%",
            backgroundColor: ((props.status === 2 && !props.open) || (props.status === 3 && props.open) || (props.status === 4 && !props.open)) ? "#fff" : "#F5F5F5",
            padding: "5px",
            margin: "2px 0 0",
        })
    },
    //#endregion

    //#region 下車地點 標題
    endTitle: {
        basic: (style, props) => ({
            ...style,
            display: ((props.status === 2 && props.open) || (props.status === 3) || (props.status === 4)) ? "inline-block" : "none",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "22px",
            color: "#E87600",
            backgroundColor: ((props.status === 2 && !props.open) || (props.status === 3 && props.open) || (props.status === 4 && !props.open)) ? "#F5F5F5" : "#fff",
            width: "100%",
            margin: "8px 0 0"
        })
    },
    //#endregion

    //#region 下車地點 內文
    endText: {
        basic: (style, props) => ({
            ...style,
            display: ((props.status === 2 && props.open) || (props.status === 3) || (props.status === 4)) ? "inline-block" : "none",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "26px",
            color: "#3D3D3D",
            backgroundColor: ((props.status === 2 && !props.open) || (props.status === 3 && props.open) || (props.status === 4 && !props.open)) ? "#F5F5F5" : "#fff",
            width: "100%",
            margin: "6px 0 0"
        })
    },
    //#endregion

    //#region 下車地點 備註
    endRemark: {
        basic: (style, props) => ({
            ...style,
            display: ((props.status === 2 && props.open) || (props.status === 3) || (props.status === 4)) ? "inline-block" : "none",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "16px",
            color: "#F46C00",
            width: "100%",
            backgroundColor: ((props.status === 2 && !props.open) || (props.status === 3 && props.open) || (props.status === 4 && !props.open)) ? "#fff" : "#F5F5F5",
            padding: "5px",
            margin: "2px 0 0",
        })
    },
    //#endregion

    //#endregion

    //#region 地圖
    //#region 地圖容器
    mapContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height:
                props.status === 2 ?
                    (props.open ? `calc( ${props.height}px - 483px )` : `calc( ${props.height}px - 320px )`)
                    :
                    (
                        props.status === 4 ?
                            (props.open ? `calc( ${props.height}px - 461px )` : `calc( ${props.height}px - 379px )`)
                            :
                            "auto"
                    )
        })
    },
    //#endregion

    //#region 導航 圖標
    toGoogleMapSvg: {
        position: "absolute",
        zIndex: 1,
        right: "12px",
        top: "12px"
    },
    //#endregion

    //#region 收合 圖標
    upSvg: {
        position: "absolute",
        zIndex: 10,
        left: 0,
        top: 0
    },
    //#endregion

    //#region 展開 圖標
    downSvg: {
        position: "absolute",
        zIndex: 10,
        left: 0,
        top: 0
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
    //#endregion

    //#region 核對身分畫面
    //#region 搭車時間
    checkTip: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: "100px",
            color: "#fff",
            width: "100%",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 檢核身分 容器
    checkIdContainer: {
        basic: (style, props) => ({
            ...style,
            position: "fixed",
            top: "56px",
            left: "0px",
            width: "100%",
            zIndex: 100,
            backgroundColor: "#F8A91E"
        })
    },
    //#endregion

    //#region 檢核資料 容器
    checkDetailContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "12px 20px",
            width: "100%",
            height: `calc( ${props.height}px - 56px - 100px )`,
            backgroundColor: "#fff",
            borderRadius: "10px 10px 0 0",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 核對身分 個案名稱 容器
    checkCaseNameContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "16px",
            width: "100%",
            backgroundColor: "#3C4856",
        })
    },
    //#endregion

    //#region 核對身分 個案名稱
    checkCaseName: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "32px",
            color: "#fff",
            backgroundColor: "#F38C00",
            // width: "80px",
            textAlign: "center",
            padding: "5px 10px"
        })
    },
    //#endregion

    //#region 核對身分 下車地點 容器
    checkEndContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            padding: "16px",
            borderBottom: "1px dashed #D8D8D8"
        })
    },
    //#endregion

    //#region 核對身分 下車地點 標題
    checkEndTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "20px",
            color: "#E87600",
            width: "35px",
            height: "42px",
            backgroundColor: "#fff",
            margin: "0 22px 0 0"
        })
    },
    //#endregion

    //#region 核對身分 下車地點 內文
    checkEndText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "26px",
            color: "#3D3D3D",
            backgroundColor: "#fff",
            width: "calc( 100% - 57px )",
        })
    },
    //#endregion

    //#region 核對身分 下車地點 備註
    checkEndRemark: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "16px",
            color: "#F46C00",
            width: "100%",
            backgroundColor: "#F5F5F5",
            padding: "5px",
            margin: "2px 0 0",
        })
    },
    //#endregion

    //#region 核對身分 提醒紅字
    redTip: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "20px",
            color: "#CF3A3A",
            width: "100%",
            margin: "13px 0 0"
        })
    },
    //#endregion
    //#endregion

    //#region 收款頁
    //#region 收款頁 容器
    payDetailContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "12px 20px",
            width: "100%",
            height: `calc( ${props.height}px - 56px - 113px )`,
            backgroundColor: "#fff",
        })
    },
    //#endregion

    //#region 收款頁 陪同人數 標題
    payDetailFamilyWithTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "23px",
            color: "#3D3D3D",
            width: props.view ? "100%" : "50%",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 收款頁 陪同人數
    payDetailFamilyWith: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                display: props.view ? "none" : "inline-block",
                width: "50%",
                padding: 0
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                display: props.view ? "none" : "inline-block",
                width: "50%",
                padding: 0
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
        numberInputContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    color: props.disable ? null : ((props.focus || props.hover) ? "#1890ff" : "#000"),
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
                height: "0px"
                // minHeight: "24px",
                // height: "auto"
            })
        }
    },
    //#endregion

    //#region 路線 Route
    route: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "16px 12px 0",
                // display: "inline-block",
                ...style.occupy(12),
                backgroundColor: "#FFF",
                // margin: "16px"
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
                padding: "16px 12px 0",
                // display: "inline-block",
                ...style.occupy(12),
                backgroundColor: "#FFF",
                // margin: "16px"
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
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 收款頁 應收車資 容器
    etFareContainer: {
        basic: (style, props) => ({
            ...style,
            width: "50%",
            height: "130px",
            backgroundColor: "#F5F5F5",
            margin: "16px 0 0",
            fontWeight: 400,
            fontSize: "20px",
            textAlign: "center",
            padding: "32px 0"
        })
    },
    //#endregion

    //#region 收款頁 應收車資 文字
    etFareText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "48px",
        })
    },
    //#endregion

    //#region 收款頁 應收車資 標題
    etFareTitle: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "18px",
            margin: "4px 0 0",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 收款頁 實收金額 容器
    realFareContainer: {
        basic: (style, props) => ({
            ...style,
            color: "#fff",
            backgroundColor: "#000",
            width: "50%",
            height: "130px",
            margin: "16px 0 0",
            fontWeight: 400,
            fontSize: "20px",
            textAlign: "center",
            padding: props.view ? "32px 0" : "21px 0"
        })
    },
    //#endregion

    //#region 收款頁 實收金額 文字
    realFareText: {
        container: {
            basic: (style, props) => ({
                ...style,
                ...style.occupy(12),
                padding: "0 12px"
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
                    height: "58px",
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "48px",
                    padding: "5px 8px"
                }
            }
        }
    },
    //#endregion

    //#region 收款頁 實收金額 檢視文字
    realFareViewText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "48px",
            color: "#fff"
        })
    },
    //#endregion

    //#region 收款頁 實收金額 標題
    realFareTitle: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "18px",
            margin: "4px 0 0",
            textAlign: "center",
            color: "#fff"
        })
    },
    //#endregion

    //#region 收款頁 備註 標題
    noteTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "18px",
            color: "#3D3D3D",
            width: "100%",
            alignItems: "center",
            margin: "4px 0  "
        })
    },
    //#endregion

    //#region 收款頁 備註 文字
    noteText: {
        container: {
            basic: (style, props) => ({
                ...style,
                ...style.occupy(12),
                padding: 0,
                margin: "0 0 0 8px",
                maxWidth: "calc( 100% - 44px )"
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
                    height: "40px",
                }
            }
        }
    },
    //#endregion

    //#region 收款頁 客戶付款方式 標題
    payDetailWaysTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "24px",
            color: "#3D3D3D",
            width: "100%",
            margin: "4px 0"
        })
    },
    //#endregion

    //#region 付款方式按鈕
    payDetailWaysButton: {
        basic: (style, props) => ({
            ...style,
            width: "auto",
            color: props?.isSelect ? "#3C4856" : "#979797",
            backgroundColor: props?.isSelect ? "#F8A91E" : "#F2F2F2",
            borderColor: props?.isSelect ? "#F8A91E" : "#F2F2F2",
            borderRadius: "5px",
            height: "55px",
            padding: "14px 20px",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "24px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            margin: "16px 8px 0 0"
        }),
        hover: (style, props) => ({
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 收款頁 修改付款方式按鈕 容器
    editPayWayButtonContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            margin: "16px 0 0",
            textAlign: "center",
        })
    },
    //#endregion

    //#region 收款頁 修改實收車資或付款方式 按鈕
    editPayWayButton: {
        basic: (style) => ({
            ...style,
            width: "250px",
            color: "#000",
            backgroundColor: "#fff",
            borderColor: "#000",
            borderRadius: "10px",
            height: "50px",
            padding: "14px 12px",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "18px",
            textAlign: "center"
        }),
        hover: (style, props) => ({
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 收款頁 實收金額 檢視文字
    payDetailWaysViewText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            color: "#3D3D3D",
            width: "calc( 100% - 40px )",
            textAlign: "center",
            position: "absolute",
            bottom: "145px"
        })
    },
    //#endregion

    //#endregion


    //#region silder
    //#region silder 容器
    silderContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "12px",
            position: "fixed",
            bottom: "5%",
            width: "100%"
        })
    },
    //#endregion

    //#endregion

    //#region 確認按鈕
    //#region 確認按鈕 容器
    comfirmButtonContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            textAlign: "center",
            width: "100%",
            position: "absolute",
            bottom: "16px",
            zIndex: 101
        })
    },
    //#endregion

    //#region 確認按鈕
    comfirmButton: {
        basic: (style) => ({
            ...style,
            width: "250px",
            color: "#fff",
            background: "#3D3D3D",
            borderRadius: "38px",
            height: "65px",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "32px",
        }),
        hover: (style, props) => ({
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#endregion

    //#region 簽名
    //#region 簽名 容器
    signContainer: {
        basic: (style, props) => ({
            ...style,
            position: "absolute",
            top: "-100px",
            width: "100%",
            backgroundColor: "#383838",
            padding: "5px",
            height: `${props.height - 56}px`,
            zIndex: 11
        })
    },
    //#endregion

    //#endregion

    //#endregion




}