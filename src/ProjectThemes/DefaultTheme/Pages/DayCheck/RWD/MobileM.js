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
                    backgroundColor: "#fff",
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

    //#region 檢查 文字
    checkText: {
        basic: (style, props) => ({
            ...style,
            ...(
                props.changeText && {
                    fontWeight: 500
                }
            ),
            width: "100%",
            backgroundColor: "#3C4856",
            height: "62px",
            textAlign: props.changeText ? "left" : "center",
            color: "#fff",
            fontSize: props.changeText ? "24px" : "18px",
            lineHeight: "62px",
            padding: "0 48px"
        })
    },
    //#endregion

    //#region 您今日尚未完成檢查 圖示
    warningSvg: {
        position: "relative",
        top: "6px",
        right: "12px"
    },
    //#endregion

    //#region 按鈕 容器
    checkContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            width: "100%",
            boxShadow: "0px 1px 5px rgba(43, 43, 43, 0.5)",
            height: "100px",
            alignItems: "center"
        })
    },
    //#endregion

    //#region 車輛 文字
    carCheckText: {
        basic: (style, props) => ({
            ...style,
            flex: 1,
            height: "55px",
            textAlign: "center",
            color: "#000",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "55px"
        })
    },
    //#endregion

    //#region 身心 文字
    bodyCheckText: {
        basic: (style, props) => ({
            ...style,
            flex: 1,
            height: "55px",
            textAlign: "center",
            color: "#000",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "55px",
            boxShadow: "inset 1px 0 #A9A9A9"
        })
    },
    //#endregion

    //#region Check 圖示
    checkSvg: {
        position: "relative",
        top: "10px",
        right: "12px"
    },
    //#endregion

    //#region Cross 圖示
    crossSvg: {
        position: "relative",
        top: "10px",
        right: "12px"
    },
    //#endregion

    //#region 按鈕 容器
    buttonContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            // backgroundColor: "#383838",
            padding: "36px 24px",
            height: `calc(${props.height}px - 218px)`
        })
    },
    //#endregion

    //#region 車輛檢查按鈕
    carCheckButton: {
        basic: (style) => ({
            ...style,
            width: "100%",
            color: "#3D3D3D",
            backgroundColor: "#FFBE41",
            border: "#FFBE41",
            borderRadius: "50px",
            height: "105px",
            fontWeight: 500,
            fontSize: "36px",
            lineHeight: "50px",
        }),
        hover: (style, props) => ({
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region Note 圖示
    noteSvg: {
        position: "relative",
        top: "10px",
        right: "12px"
    },
    //#endregion

    //#region 身心檢查 按鈕
    bodyCheckButton: {
        basic: (style) => ({
            ...style,
            width: "100%",
            color: "#FFFFFF",
            backgroundColor: "#3C4856",
            border: "#3C4856",
            borderRadius: "50px",
            height: "105px",
            fontWeight: 500,
            fontSize: "36px",
            lineHeight: "50px",
            margin: "24px 0 0"
        }),
        hover: (style, props) => ({
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region Heart 圖示
    heartSvg: {
        position: "relative",
        top: "8px",
        right: "12px"
    },
    //#endregion

    //#region OK 文字
    okText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 900,
            fontSize: "44px",
            lineHeight: "50px",
            color: "#CCCCCC"
        })
    },
    //#endregion

    //#region 今日檢查已完成 文字
    checkCompleteText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "36px",
            lineHeight: "50px",
            color: "#CCCCCC"
        })
    },
    //#endregion

    //#region 車輛檢查
    //#region 車輛檢查 容器
    carCheckContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            boxShadow: "0px 1px 10px rgba(47, 47, 47, 0.5)",
            margin: "0 0 16px 0",
            display: "inline-blcok"
        })
    },
    //#endregion

    //#region 檢查 文字
    itemTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 500,
            width: "100%",
            backgroundColor: "#fff",
            height: "61px",
            color: "#F67E01",
            fontSize: "24px",
            lineHeight: "61px",
            padding: "0 48px",
            boxShadow: "inset 0 -1px #979797"
        })
    },
    //#endregion

    //#region 檢查 內容 
    itemData: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "20px 48px",
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
                height: "auto",
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

    //#region CheckBoxItem 容器
    checkBoxItemContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(6),
        })
    },
    //#endregion

    //#endregion


    //#region 身心檢查
    //#region 身心檢查 提醒 容器
    bodyCheckTipContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "94px",
            boxShadow: "0px 1px 10px rgba(47, 47, 47, 0.5)",
            display: "inline-flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 48px",
            margin: "0 0 16px"
        })
    },
    //#endregion

    //#region 身心檢查 提醒
    bodyCheckTip: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 300,
            fontSize: "14px",
            lineHeight: "20px",
            margin: "4px 0"
        })
    },
    //#endregion

    //#region 酒測 容器
    wineTestContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            boxShadow: "0px 1px 10px rgba(47, 47, 47, 0.5)",
            display: "inline-block",
            padding: "19px 26px 19px 42px",
            margin: "0 0 16px"
        })
    },
    //#endregion

    //#region 酒測 文字
    testText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "36px",
            display: "inline-flex",
            alignItems: "center",
            margin: "0 0 10px 0"
        })
    },
    //#endregion

    //#region 酒測 
    testInput: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
                display: "inline-block",
                width: "160px",
                margin: "0 0 0 12px"
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
                    height: "40px"
                }
            }
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: 0
                // minHeight: "10px",
                // height: "auto"
            })
        }
    },
    //#endregion

    //#region 酒測 文字
    correctOrErrorText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 300,
            fontSize: "14px",
            lineHeight: "20px",
            margin: "0 0 0 6px",
            color: props.isTrue ? "#3E9535" : "#FF2A09"
        })
    },
    //#endregion

    //#region 其他問題 容器
    otherProblemContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            boxShadow: "0px 1px 10px rgba(47, 47, 47, 0.5)",
            display: "inline-block",
            padding: "20px 28px",
            margin: "0 0 16px"
        })
    },
    //#endregion

    //#region 其他問題 文字
    otherProblemText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "28px",
            color: "#3D3D3D"
        })
    },
    //#endregion


    //#endregion



}