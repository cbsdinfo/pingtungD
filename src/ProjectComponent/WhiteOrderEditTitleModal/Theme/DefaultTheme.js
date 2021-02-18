export default {
    //#region 編輯訂單 Modal 
    //#region Modal 樣式
    dispatchEditOrderModal: {
        outContainer: {
            basic: (style, props) => ({
                ...style,
                zIndex: 999
            }),
        },
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

    //#region 地圖
    map: {
        mapContainer: {
            basic: (style, props) => ({
                ...style,
                width: "0",
                height: "0"
            })
        }
    },
    //#endregion

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
            //#region Flex設置
            flexGrow: "0",
            // maxWidth: "none",
            // flexBasis: "auto",
            boxSizing: "border-box",
            occupy: (c) => ({ maxWidth: c * 100 / 12 + '%', flexBasis: c * 100 / 12 + '%' }),//調用時請使用如 ...(style.occupy(10))
            //#endregion
            //#region 定位
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            //#endregion
            //#region 寬高
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
            lineHeight: "normal",
            //#endregion
            //#region 背景
            backgroundColor: "transparent",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            //#endregion
            //#region 游標
            cursor: "auto",
            //#endregion
            //#region 字體
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: '#000',
            //#endregion
            maxWidth: "70%",
            flexBasis: "70%",
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

    //#region 聯絡電話 dispatchEditOrderPhone
    dispatchEditOrderPhone: {
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
                // height: "24px"
                minHeight: "24px",
                height: "auto"
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
                height: "8px",
            })
        }
    },
    //#endregion

    //#region 車種 CarType
    dispatchEditOrderCarType: {
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

    //#region  願意共乘 RideTogetherReview
    rideTogetherReview: {
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
                height: "8px",
            })
        }
    },
    //#endregion

    //#region 起點
    dispatchEditOrderStartPos: {
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
                height: "8px",
            })
        }
    },
    //#endregion

    //#region 迄點
    dispatchEditOrderEndPos: {
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
                height: "8px",
            })
        }
    },
    //#endregion

    //#region 搭車姓名
    dispatchEditTakerName: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0",
                display: "inline-block",
                ...style.occupy(6),
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
                ...style.occupy(6),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "22px", // 縮短了
                color: "rgba(0, 0, 0, 0.45)",
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
                height: "8px",
            })
        }
    },
    //#endregion

    //#region 搭車生日
    dispatchEditTakerBrithday: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0",
                display: "inline-block",
                ...style.occupy(6),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0",
                display: "inline-block",
                ...style.occupy(6),
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


    //#region 訂單組件右半邊容器
    dispatchEditRightContainer: {
        basic: (style, props) => ({
            //#region Flex設置
            flexGrow: "0",
            // maxWidth: "none",
            // flexBasis: "auto",
            boxSizing: "border-box",
            occupy: (c) => ({ maxWidth: c * 100 / 12 + '%', flexBasis: c * 100 / 12 + '%' }),//調用時請使用如 ...(style.occupy(10))
            //#endregion
            //#region 定位
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            //#endregion
            //#region 寬高
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // height: "auto",
            lineHeight: "normal",
            //#endregion
            //#region 背景
            // backgroundColor: "transparent",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            //#endregion
            //#region 游標
            cursor: "auto",
            //#endregion
            //#region 字體
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: '#000',
            //#endregion
            height: `${props.height ? 62 * props.height + 380 : 380}px`,
            // height: "312px",
            maxWidth: "30%",
            flexBasis: "30%",
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


    //#endregion

}
