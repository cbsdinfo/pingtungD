export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#F5F5F5",
                    padding: "16px 0",
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                // console.log(props)
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    height: `calc(  ${props.vh}px - 222px)`,
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "0",
                    minHeight: `calc( ${props.vh}px - 222px)`,
                }
            }
        },
    },
    //#endregion

    //#region 標題
    //#region 案件類型容器
    caseTypeContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            textAlign: "left",
            width: "160px"
        })
    },
    //#endregion

    //#region 案件標籤容器
    tagContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            textAlign: "right",
            width: "auto",
            flexGrow: 1,
            paddingRight: "16px"
        })
    },
    //#endregion

    //#region 已共乘  ShareText
    shareText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "22px",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#FA541C",
            width: "62px"
            // margin: "8px 0 0"
        })
    },
    //#endregion

    //#region 已共乘 圖標  ShareSvg
    shareSvg: {
        margin: "0 4px 0 0"
    },
    //#endregion

    //#region 訂單狀態 Tag 區域
    statusTag: {
        //#region 新訂單
        newOrder: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 0 0 12px",
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
                    margin: "0 0 0 12px",
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
                    margin: "0 0 0 12px",
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
                    margin: "0 0 0 12px",
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
                    margin: "0 0 0 12px",
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
                    margin: "0 0 0 12px",
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

    //#region 訂單編號 容器
    orderNumContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            padding: "0 16px",
            width: "100%",
            margin: "12px 0 0"
        })
    },
    //#endregion

    //#region 訂單編號 標題
    orderNoTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.65)"
        })
    },
    //#endregion

    //#region 訂單編號 內文
    orderNoText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#0050B3",
        })
    },
    //#endregion

    //#region 預約搭乘時間 標題
    reserveDateTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.65)",
            marginLeft: "24px"
        })
    },
    //#endregion

    //#region 預約搭乘時間 內文
    reserveDateText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#0050B3",
        })
    },
    //#endregion
    //#endregion

    //#region 乘車明細
    //#region 乘車明細容器
    detailContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            backgroundColor: "#fff",
            padding: "16px"
        })
    },
    //#endregion

    //#region 案件明細內容器
    insideContainer: {
        basic: (style, props) => ({
            ...style,
            display: "flex",
            alignItems: "center",
        })
    },
    //#endregion

    //#region 使用者名稱 UserName
    userName: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            color: "rgba(0,0,0,0.85)",
            marginRight: "24px"
        })
    },
    //#endregion

    //#region 案號 標題
    caseNumberTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: " 0 24px 0 0"
        })
    },
    //#endregion

    //#region 案號 內文
    caseNumberText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: " 0 0 0 8px"
        })
    },
    //#endregion

    //#region 共乘容器
    shareContainer: {
        basic: (style, props) => ({
            ...style,
            display: props.caseflag ? "inline-block" : "block",
            width: props.caseflag ? "auto" : "100%",
            margin: props.caseflag ? 0 : "8px 0 0",
        })
    },
    //#endregion

    //#region 可否共乘 標題
    canShareTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: " 0 24px 0 0"
        })
    },
    //#endregion

    //#region 可否共乘 內文
    canShareText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: " 0 0 0 8px"
        })
    },
    //#endregion

    //#region 人數 標題
    numberOfPeopleTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            // margin: " 0 0 0 24px"
        })
    },
    //#endregion

    //#region 人數 內文
    numberOfPeopleText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: " 0 0 0 8px"
        })
    },
    //#endregion

    //#region 司機 標題
    driverTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "8px 0 0"
        })
    },
    //#endregion

    //#region 司機 內文
    driverText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: " 0 0 0 8px"
        })
    },
    //#endregion

    //#region 車牌 標題
    licensePlateTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: " 8px 16px 0"
        })
    },
    //#endregion

    //#region 車牌 內文
    licensePlateText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: " 0 0 0 8px"
        })
    },
    //#endregion

    //#region 服務單位 標題
    serviceUnitTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: " 8px 0 0",
            width: "100%"
        }),
    },
    //#endregion

    //#region 服務單位 內文
    serviceUnitText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: " 0 0 0 8px",
            width: "80%",
        })
    },
    //#endregion

    //#endregion

    //#region 按鈕
    //#region 按鈕容器
    buttonContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            textAlign: "center",
            display: "inline-block",
            backgroundColor: "#fff"
        }),
    },
    //#endregion

    //#region 司機未到按鈕
    noExecuteButton: {
        basic: (style) => ({
            ...style,
            width: "86px",
            height: "24px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#F5222D",
            borderColor: "#F5222D",
            borderRadius: "2px",
            margin: "0 16px 0 0",
            // position: "absolute",
            fontWeight: "400",
            // left: "116px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(245,34,45, 0.65)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 再叫一次按鈕
    againButton: {
        basic: (style) => ({
            ...style,
            width: "86px",
            height: "24px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#389E0D",
            borderColor: "#389E0D",
            borderRadius: "2px",
            margin: "0 16px 0 0",
            // position: "absolute",
            fontWeight: "400",
            // left: "116px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(56,158,13, 0.65)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 填寫問卷按鈕
    questionnaireButton: {
        basic: (style) => ({
            ...style,
            width: "86px",
            height: "24px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#1890FF",
            borderColor: "#1890FF",
            borderRadius: "2px",
            margin: 0,
            // position: "absolute",
            fontWeight: "400",
            // left: "116px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24,144,255, 0.65)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#endregion

    //#region 車資
    //#region 車資容器
    fareContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            display: "inline-block",
            backgroundColor: "#fff",
            padding: "16px 16px 0",
            textAlign: "center"
        }),
    },
    //#endregion

    //#region 車資總額 標題
    totalFareTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "0 20px 0 0 "
        }),
    },
    //#endregion

    //#region 車資總額 內文
    totalFareText: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            color: "rgba(0,0,0,0.65)",
        })
    },
    //#endregion

    //#region 政府補助 標題
    govSubsidyTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "0 20px 0 0 "
        })
    },
    //#endregion

    //#region 政府補助 內文
    govSubsidyText: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            color: "rgba(0,0,0,0.65)",
        })
    },
    //#endregion

    //#region 陪同金額 標題
    accompanyingAmountTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "0 20px 0 0 "
        })
    },
    //#endregion

    //#region 陪同金額 內文
    accompanyingAmountText: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            color: "rgba(0,0,0,0.65)",
        })
    },
    //#endregion

    //#region 個案負擔 標題
    caseBurdenTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
        }),
    },
    //#endregion

    //#region 個案負擔 內文
    caseBurdenText: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            color: "#F5222D",
        })
    },
    //#endregion

    //#endregion

    //#region 乘客
    //#region 乘客容器
    passengerContainer: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            width: "100%",
            backgroundColor: "#fff",
            padding: "0 16px"
        }),
    },
    //#endregion

    //#region 乘客標題
    passengerTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 500,
            display: "inline-block",
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "0 8px 0 0",
            width: "28px"
        }),
    },
    //#endregion

    //#region 乘客內文容器
    passengerTextContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            backgroundColor: "#F5F5F5",
            padding: "6px 8px",
            width: "100%",
        }),
    },
    //#endregion

    //#region 乘客內文
    passengerText: {
        basic: (style, props) => ({
            ...style,
            margin: "2px 4px",
            fontWeight: 500,
            // display: "inline-block",
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
        }),
    },
    //#endregion
    //#endregion

    //#region  行程一覽
    //#region 行程一覽容器
    strokeContainer: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            backgroundColor: "#fff",
            width: "100%",
            padding: "16px",
            // boxShadow: "inset 0 -1px #D9D9D9",
        })
    },
    //#endregion

    //#region 行程一覽
    stroke: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "32px",
            color: "rgba(0,0,0,0.85)",
            boxShadow: "inset 0 -4px #1890FF",
            // margin: " 16px 24px 0"
        })
    },
    //#endregion

    //#region 行程一覽容器
    shadowContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            boxShadow: "inset 0 1px #D9D9D9",
        })
    },
    //#endregion

    //#region 預估距離 標題
    distanceTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: " 12px 0 0"
        })
    },
    //#endregion

    //#region 預估距離 內文
    distanceText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#1890FF",
            margin: " 0 0 0 8px"
        })
    },
    //#endregion

    //#region 預估時間 標題
    timingTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: " 12px 0 0 24px"
        })
    },
    //#endregion

    //#region 預估時間 內文
    timingText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#1890FF",
            margin: " 0 0 0 8px"
        })
    },
    //#endregion

    //#region 起訖點容器
    startToEndContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            backgroundColor: "transparent",
            width: "100%",
            margin: "12px 0 0"
        }),
    },
    //#endregion

    //#region 地址容器
    addressContainer: {
        basic: (style, props) => ({
            ...style,
            alignItems: "center"
        }),
    },
    //#endregion

    //#region 起點 標題
    startPointTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "12px",
            lineHeight: "32px",
            color: "#FF7A45",
            minWidth: props.caseflag ? "14px" : "74px"
        })
    },
    //#endregion

    //#region 起點 內文
    startPointText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            backgroundColor: "#F5F5F5",
            margin: "0 0 0 8px",
            width: props.caseflag ? "calc( 95% - 8px )" : "calc( 78% - 8px )",
            borderRadius: "8px",
            padding: "5px 12px"
        }),
    },
    //#endregion

    //#region 起點 備註
    startPointnote: {
        basic: (style, props) => ({
            ...style,
            margin: "4px 0 0",
            display: "inline-block",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#CF1322",
        })
    },
    //#endregion

    //#region 迄點 標題
    endPointTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "12px",
            lineHeight: "32px",
            color: "#FF7A45",
            // width: "17%",
            margin: "8px 0 0",
            minWidth: props.caseflag ? "14px" : "74px"
        })
    },
    //#endregion

    //#region 迄點 內文
    endPointText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            backgroundColor: "#F5F5F5",
            margin: "8px 0 0 8px",
            width: props.caseflag ? "calc( 95% - 8px )" : "calc( 78% - 8px )",
            borderRadius: "8px",
            padding: "5px 12px"
        })
    },
    //#endregion

    //#region 迄點 備註
    endPointnote: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#CF1322",
            margin: "4px 0 0",
        })
    },
    //#endregion

    //#endregion

    //#region 行程表格容器
    strokeTableContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            backgroundColor: "transparent",
            width: "100%"
        }),
    },
    //#endregion

    //#region 地圖
    //#region 地圖容器
    mapContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%"
        }),
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
    //#endregion

    //#region 回列表按鈕
    //#region 回列表按鈕容器
    returnContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            textAlign: "right",
            padding: "16px"
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

    //#endregion

}