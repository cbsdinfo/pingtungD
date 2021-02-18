export default {
    //#region 過去-未來訂單 OrderTime
    orderTime: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 16px",
                display: "inline-block",
                // ...style.occupy(12),
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
                padding: "0 16px",
                display: "inline-block",
                // ...style.occupy(12),
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
                width: "120px"
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

    //#region 日期區間容器
    dateTimeRangeContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "16px 0 8px",
                // margin: "8px 0 0",
                width: "100%",
                textAlign: "right"
                // borderRadius: "16px",
            }
        }
    },
    //#endregion

    //#region 選擇日期區間 DateTimeRange 
    dateTimeRange: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
                display: "inline-block",
                // ...style.occupy(3),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                padding: 0
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

    //#region 無資料表單區容器
    noDataContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // padding: "24px 12px",
                // margin: "8px 0 0",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: "calc( 100vh - 246px)",
                width: "100%",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }
        }
    },
    //#endregion

    //#region 卡片資料表單區容器
    cardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // display: "inline-block",
                padding: "24px 16px 0 24px",
                margin: "8px 0",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: "206px",
                width: "100%",
                borderRadius: "16px"
            }
        }
    },
    //#endregion

    //#region 第一區塊 容器
    firstAreaContainer: {
        basic: (style, props) => {
            return {
                ...style,
                ...style.occupy(2.5),
                position: "relative",
                display: "inline-block",
                // boxShadow: "inset 0 0 0 1px #D9D9D9",
                height: "158px",
                padding: "0 8px 0 0"
            }
        }
    },
    //#endregion

    //#region 案件類別 圖標
    caseSvg: {
        position: "absolute",
        top: 0,
        left: "-24px",
    },
    //#endregion

    //#region 使用者名稱 UserName
    userName: {
        basic: (style, props) => ({
            ...style,
            position: "relative",
            height: "32px",
            top: "48px",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            color: "rgba(0, 0, 0, 0.65)",
            margin: "0 0 8px 0"
        })
    },
    //#endregion

    //#region 案號 標題
    caseNumberTitle: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "8px 0 12px"
        })
    },
    //#endregion

    //#region 案號 內文 
    caseNumberText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 0 8px"
        })
    },
    //#endregion

    //#region 服務單位取消
    cancelTag: {
        container: {
            basic: (style, props) => ({
                ...style,
                position: "absolute",
                margin: "0 48px 0 0",
                bottom: 0,
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

    //#region 已共乘  ShareText
    shareText: {
        basic: (style, props) => ({
            ...style,
            position: "absolute",
            height: "22px",
            bottom: 0,
            left: "104px",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#FA541C",
            // margin: "8px 0 0"
        })
    },
    //#endregion

    //#region 已共乘 圖標  ShareSvg
    shareSvg: {
        margin: "0 4px 0 0"
    },
    //#endregion
    //#endregion

    //#region 第二區塊 容器
    secondAreaContainer: {
        basic: (style, props) => {
            return {
                ...style,
                ...style.occupy(3.8),
                // display: "inline-block",
                // boxShadow: "inset 0 0 0 1px #D9D9D9",
                padding: "0 8px",
                height: "158px"
            }
        }
    },
    //#endregion
    //#region 訂單編號 標題
    orderNumberTitle: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "0 0 12px"
        })
    },
    //#endregion

    //#region 訂單編號 內文 
    orderNumberText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 0 8px"
        })
    },
    //#endregion

    //#region 預約搭乘時間 標題
    bookRideTitle: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "0 0 12px"
        })
    },
    //#endregion

    //#region 預約搭乘時間 內文 
    bookRideText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 0 8px"
        })
    },
    //#endregion

    //#region 服務單位 標題
    serviceUnitTitle: {
        basic: (style, props) => ({
            ...style,
            // height: "22px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "0 0 12px",
            display: "flex",
            alignItems: "end"
        })
    },
    //#endregion

    //#region 服務單位 內文 
    serviceUnitText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            textOverflow: "ellipsis",
            // height: "22px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 0 8px",
            maxWidth: "73%"
        }),
    },
    //#endregion

    //#region 司機 標題
    driverTitle: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "0 0 12px"
        })
    },
    //#endregion

    //#region 司機 內文 
    driverText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 0 8px"
        })
    },
    //#endregion

    //#region 車牌 標題
    licensePlateTitle: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "0 0 12px"
        })
    },
    //#endregion

    //#region 車牌 內文 
    licensePlateText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 0 8px"
        })
    },
    //#endregion

    //#region 司機未執行按鈕
    noExecuteButton: {
        basic: (style) => ({
            ...style,
            position: "absolute",
            bottom: 0,
            right: 0,
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
            margin: "0 8px 0 0",
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
    //#endregion

    //#region 第三區塊 容器
    thirdAreaContainer: {
        basic: (style, props) => {
            return {
                ...style,
                ...style.occupy(4.5),
                display: "inline-block",
                // boxShadow: "inset 0 0 0 1px #D9D9D9",
                padding: "0 8px",
                height: "158px"
            }
        }
    },
    //#endregion

    //#region 車資總額 標題
    totalFareTitle: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "0 0 12px"
        })
    },
    //#endregion

    //#region 車資總額 內文 
    totalFareText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 0 8px"
        })
    },
    //#endregion

    //#region 政府補助 標題
    govSubsidyTitle: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "0 0 12px 16px"
        })
    },
    //#endregion

    //#region 政府補助 內文 
    govSubsidyText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 0 8px"
        })
    },
    //#endregion

    //#region 陪同金額 標題
    accompanyingAmountTitle: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "0 0 12px 16px"
        })
    },
    //#endregion

    //#region 陪同金額 內文 
    accompanyingAmountText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 0 8px"
        })
    },
    //#endregion

    //#region 是否共乘 標題
    canShareTitle: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "0 16px 12px 0"
        })
    },
    //#endregion

    //#region 是否共乘 內文 
    canShareText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 0 8px"
        })
    },
    //#endregion

    //#region 人數 標題
    numberOfPeopleTitle: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "0 16px 12px 0"
        })
    },
    //#endregion

    //#region 人數 內文 
    numberOfPeopleText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 0 8px"
        })
    },
    //#endregion

    //#region 乘客 標題 
    passengerTitle: {
        basic: (style, props) => ({
            ...style,
            // height: "60px",
            // display: "inline-block",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.45)",
            margin: "0 0 12px 0",
            width: "28px"
        })
    },
    //#endregion

    //#region 乘客 內文  容器
    passengerContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "60px",
            color: "rgba(0,0,0,0.65)",
            margin: "0 0 12px 8px",
            backgroundColor: "#F5F5F5",
            width: "88%",
            padding: "4px"
        })
    },
    //#endregion

    //#region 乘客 內文 
    passengerText: {
        basic: (style, props) => ({
            ...style,
            // height: "22px",
            // display: "inline-block",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "18px",
            color: "rgba(0,0,0,0.65)",
            margin: "4px",
            width: "36px"
        })
    },
    //#endregion

    //#region 起訖點 容器
    startToEndContainer: {
        basic: (style, props) => ({
            ...style,
            position: "absolute",
            bottom: "-24px",
            width: "calc( 100% - 20px )",
            // margin: "0 12px",
            // boxShadow: "inset 0 0 0 1px #D9D9D9"
        })
    },
    // #endregion

    //#region 起點 標題
    startPointTitle: {
        basic: (style, props) => ({
            ...style,
            // height: "22px",
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#FF7A45",
            padding: "0 0 0 24px",
            alignItems: "baseline",
            display: "flex",
            width: "100%"
        })
    },
    //#endregion

    //#region 起點 圖標
    startPointSvg: {
        position: "absolute",
        top: "4px",
        left: 0
    },
    //#endregion

    //#region 起點 內文
    startPointText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            // height: "22px",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            padding: "0 0 0 8px",
            width: "calc( 100% - 28px )",
        })
    },
    //#endregion

    //#region 迄點 標題
    endPointTitle: {
        basic: (style, props) => ({
            ...style,
            // height: "22px",
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#FF7A45",
            padding: "0 0 0 24px",
            alignItems: "baseline",
            display: "flex",
            width: "100%"
        })
    },
    //#endregion

    //#region 迄點 圖標
    endPointSvg: {
        position: "absolute",
        top: "2px",
        left: 0
    },
    //#endregion

    //#region 迄點 內文
    endPointText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "44px",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            padding: "0 0 0 8px",
            width: "calc( 100% - 28px )",
        })
    },
    //#endregion

    //#endregion

    //#region 第四區塊 容器
    forthAreaContainer: {
        basic: (style, props) => {
            return {
                ...style,
                ...style.occupy(1.2),
                display: "inline-block",
                // boxShadow: "inset 0 0 0 1px #D9D9D9",
                padding: "0 0 0 8px",
                height: "158px",
                textAlign: "center"
            }
        }
    },
    //#endregion

    //#region 個案負擔 標題
    caseBurdenTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "24px",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "24px",
            color: "rgba(0,0,0,0.45)",
            // margin: "0 0 12px"
        })
    },
    //#endregion

    //#region 個案負擔 內文 
    caseBurdenText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "32px",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            color: "#F5222D",
            margin: "0 0 10px 0"
        })
    },
    //#endregion

    //#region 再叫一次按鈕
    againButton: {
        basic: (style) => ({
            ...style,
            width: "100%",
            height: "24px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#389E0D",
            borderColor: "#389E0D",
            borderRadius: "2px",
            margin: "0 0 12px 0",
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

    //#region 乘車明細按鈕
    rideDetailsButton: {
        basic: (style) => ({
            ...style,
            position: "absolute",
            bottom: "32px",
            left: "8px",
            width: "calc( 100% - 8px )",
            height: "24px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#1890FF",
            borderColor: "#1890FF",
            borderRadius: "2px",
            // margin: "0 0 8px 0",
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

    //#region 填寫問卷按鈕
    questionnaireButton: {
        basic: (style) => ({
            ...style,
            position: "absolute",
            bottom: 0,
            left: "8px",
            width: "calc( 100% - 8px )",
            height: "24px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#1890FF",
            borderColor: "#1890FF",
            borderRadius: "2px",
            // margin: "0 0 8px 0",
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

    //#endregion
}
