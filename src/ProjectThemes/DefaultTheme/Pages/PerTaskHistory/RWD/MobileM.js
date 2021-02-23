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
                    // height:""
                }
            }
        },
    },
    //#endregion

    //#region 標題列
    titleBar: {
        basic: (style, props) => ({
            ...style,
            textAlign: "center",
            boxShadow: "inset 0px -1px 0px #DBE4E8",
        })
    },
    //#endregion

    //#region 標題列 預約訂車分頁
    titleBarCallCarTab: {
        basic: (style, props) => ({
            ...style,
            display: "inline-grid",
            // margin: "0 16px",
            lineHeight: "32px",
            height: "46px",
            fontSize: "14px",
            cursor: "pointer",
            width: "25%",
            color: (props.isActive ? "#1890FF" : "rgba(0, 0, 0, 0.65)"),
            borderBottom: (props.isActive ? "solid 2px #1890FF" : "unset"),
            textAlign: "center",
            alignItems: "center"
        }),
    },
    //#endregion

    //#region 選擇日期區間 DateTimeRange 
    dateTimeRange: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "8px 8px",
                display: "inline-block",
                // width: "100%"
                ...style.occupy(6),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                padding: "8px 8px",
                // width: "100%"
                ...style.occupy(6),
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
                    // width: "100%",
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

    //#region 上下車地點標題
    toAddrTitleText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "16px",
            top: "8px",
            left: "4px"
        })
    },
    //#region 下車地點註記
    toAddrRemarkText: {
        basic: (style, props) => ({
            ...style,
            padding: "4px 0 0",
            fontWeight: 600,
            fontSize: "16px"
        })
    },
    //#endregion

    //#region 下車地點
    toAddrText: {
        basic: (style, props) => ({
            ...style,
            padding: "4px 0 0",
            fontWeight: 500,
            fontSize: "14px"
        })
    },
    //#endregion

    //#region 乘車時間(月+日)
    reserveDateFirstText: {
        basic: (style, props) => ({
            ...style,
            padding: "16px 4px 0 28px",
            color: "rgba(246,126,1,1)",
            fontWeight: 600,
            fontSize: "18px",
            display: "inline-block"
        })
    },
    //#endregion

    //#region 乘車時間(時+分)
    reserveDateSecondText: {
        basic: (style, props) => ({
            ...style,
            padding: "16px 28px 0 4px",
            fontWeight: 500,
            fontSize: "18px",
            display: "inline-block"
        })
    },
    //#endregion

    //#region 輪椅icon
    wheelChairSvg: {
        top: "10px",
        position: "absolute",
        right: "135px",
    },
    //#endregion

    //#region 輪椅
    wheelChairText: {
        basic: (style, props) => ({
            ...style,
            width: "calc(100% - 180px)",
            textAlign: "right",
            padding: "16px 28px 10px 0",
            fontWeight: 600,
            fontSize: "13px",
            display: "inline-block",
            top: "4px"
        })
    },
    //#endregion

    //#region 上下車地址容器
    addrContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "14px 28px"
        })
    },
    //#endregion

    //#region 預估容器
    expectedContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(6),
            height: "74px",
            borderRight: "0.5px solid #C7C7C7"
        })
    },
    //#endregion

    //#region 預估標題
    expectedTitleText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "12px",
            width: "26px",
            fontWeight: 600,
            top: "8px",
            left: "15px",
            display: "inline-block"
        })
    },
    //#endregion

    //#region 預估內容值
    expectedValueText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "36px",
            width: "auto",
            fontWeight: 400,
            top: "8px",
            // left: "15px",
            display: "inline-block",
            padding: "0 0 0 24px"
        })
    },
    //#endregion

    //#region 預估內容值
    expectedRightText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "18px",
            width: "auto",
            fontWeight: 600,
            top: "8px",
            right: "-2px",
            display: "inline-block",
        })
    },
    //#endregion

    //#region 地圖
    //#region 地圖容器
    mapContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "175px"
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
    //#endregion

    //#region 地圖下方容器
    mapBotContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            // display: "inline-block",
            // padding: "12px",
            backgroundColor: "#F5F5F5",
            height: "50px"
        })
    },
    //#endregion

    //#region 預估陪同容器
    accompanyContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(5),
        })
    },
    //#endregion

    //#region 預估陪同icon
    accompanyIcon: {
        position: "absolute",
        top: "12px",
        left: "30px",
    },
    //#endregion

    //#region 預估陪同文字
    accompanyText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "18px",
            width: "auto",
            fontWeight: 400,
            top: "14px",
            left: "65px",
            display: "inline-block",
        })
    },
    //#endregion

    //#region 預估陪同容器
    familyContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(3.5),
        })
    },
    //#endregion

    //#region 預估陪同文字
    familyText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "18px",
            width: "auto",
            fontWeight: 400,
            top: "7px",
            left: "8px",
            display: "inline-block",
        })
    },
    //#endregion

    //#region 預估陪同文字
    familyValueText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "24px",
            width: "auto",
            fontWeight: 400,
            top: "8px",
            padding: "0 0 0 20px",
            display: "inline-block",
        })
    },
    //#endregion

    //#region 車資外容器
    amtOutContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            backgroundColor: "#3d3d3d",
            height: "105px",
            margin: "20px 0 0 0"
        })
    },
    //#endregion

    //#region 車資容器
    amtContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(6),
            height: "100%",
        })
    },
    //#endregion

    //#region 車資標題
    amtTitleText: {
        basic: (style, props) => ({
            ...style,
            position: "absolute",
            fontSize: "18px",
            width: "36px",
            fontWeight: 600,
            top: "25px",
            left: "28px",
            display: "inline-block",
            color: "#FFFFFF"
        })
    },
    //#endregion

    //#region 車資內容值
    amtValueText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "48px",
            width: "auto",
            fontWeight: 700,
            top: "14px",
            left: "80px",
            display: "inline-block",
            // padding: "0 0 0 24px",
            color: "#FFFFFF"
        })
    },
    //#endregion

    //#region 上下車地址容器
    driverRemarkContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "14px 28px 50px"
        })
    },
    //#endregion

    //#region 司機備註標題
    driverRemarkTitleText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "18px",
            // width: "36px",
            fontWeight: 700,
            padding: "8px 0 40px"
            // top: "16px",
            // left: "15px",
            // display: "inline-block",
            // color: "#FFFFFF"
        })
    },
    //#endregion

    //#region 司機被住內容
    driverRemarkText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "18px",
            width: "auto",
            fontWeight: 400,
            // top: "14px",
            // left: "15px",
            display: "inline-block",
            // padding: "0 0 0 24px",
            // color: "#FFFFFF"
        })
    },
    //#endregion

    //#region 底部按鈕容器
    buttonContainer: {
        basic: (style, props) => ({
            ...style,
            // height: "100%", 
            padding: "18px 32px"
        })
    },
    //#endregion

    //#region 底部按鈕
    backButton: {
        basic: (style, props) => ({
            ...style,
            height: "50px",
            width: "311px",
            color: "#3D3D3D",
            background: "#FFBC46",
            border: "#FFBC46",
            borderRadius: "50px",
            fontSize: "24px",
            fontWeight: 700
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255 ,188 ,70 ,0.65)"
        }),
    },
    //#endregion
}