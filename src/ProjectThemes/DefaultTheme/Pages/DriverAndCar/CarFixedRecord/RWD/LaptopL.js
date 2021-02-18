export default {
    //#region 標題列
    titleBar: {
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "128"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "1014px"
            })
        }
    },
    //#endregion
    //#region 單選下拉選單 車行 carDealership
    carDealership: {
        container: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
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
                width: "350px"
            })
        },
    },
    //#endregion

    //#region 匯出報表按鈕
    exportButton: {
        basic: (style) => ({
            ...style,
            width: "88px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#1890ff",
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

    //#region 新增按鈕
    addButton: {
        basic: (style) => ({
            ...style,
            width: "82px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#389e0d",
            borderColor: "#389e0d",
            borderRadius: "2px",
            // margin: "0 16px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(56, 158, 13, 0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 新增按鈕 圖標
    addButtonIcon: {
        position: "relative",
        // height: "100%",
        // right: "12px",
        cursor: "pointer",
        top: "2px",
    },
    //#endregion
    //#region 新增 + 編輯彈窗
    //#region Modal 樣式
    addModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "696px",
                // height: "264px",
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                zIndex: 100
            }),
        }
    },
    //#endregion
    //#region addFormContainer
    addFormContainer: {
        contentContainer: (style, props) => ({
            ...style,
        })
    },
    //#endregion
    //#region 新增 + 編輯彈窗 - 車輛 Car 
    modalCar: {
        //#region viewType
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                display: "inline-block",
                ...style.occupy(6)
            })
        },
        viewTypeTextInput: {
            basic: (style, porps) => ({
                ...style,
                //height: "28px",
                // width: "200px"
            })

        },
        //#endregion
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                display: "inline-block",
                ...style.occupy(6)
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
        }
    },
    //#endregion
    //#region 新增 + 編輯彈窗 - 車輛 Car 上標題 (必填)文字樣式
    modalCarRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 新增 + 編輯彈窗 - 日期 Date
    modalDate: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "12px",
                display: "inline-block",
                ...style.occupy(6)
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "12px",
                display: "inline-block",
                ...style.occupy(6)
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
            })
        }
    },
    //#endregion
    //#region 新增 + 編輯彈窗 - 日期 Date 上標題 (必填)文字樣式
    modalDateRequired: {
        basic: (style, props) => ({
            ...style,
            fontSize: "13px",
            lineHeight: "22px",
            color: "#ff4d4f",
            display: "inline-block"
        })
    },
    //#endregion

    //#region 新增 + 編輯彈窗 服務選擇 SrvChoose  
    modalSrvChoose: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                //display: "inline-block",
                ...style.occupy(4),
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        // viewTypeBottomLabel: {
        //     basic: (style, props) => ({
        //         ...style,
        //         // height: "24px"
        //         minHeight: "24px",
        //         height: "auto"
        //     })
        // },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                //display: "inline-block",
                ...style.occupy(4),
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
        // bottomLabel: {
        //     basic: (style, props) => ({
        //         ...style,
        //         // height: "24px"
        //         minHeight: "24px",
        //         height: "auto"
        //     })
        // }
    },
    //#endregion
    //#region 新增 + 編輯彈窗 - 服務選擇 SrvChoose 上標題 (必填)文字樣式
    modalSrvChooseRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 新增 + 編輯彈窗 - 里程 Mileage 
    modalMileage: {
        //#region viewType
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                display: "inline-block",
                ...style.occupy(4)
            })
        },
        viewTypeTextInput: {
            basic: (style, porps) => ({
                ...style,
                //height: "28px",
                // width: "200px"
            })

        },
        //#endregion
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                display: "inline-block",
                ...style.occupy(4)
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
        }
    },
    //#endregion
    //#region 新增 + 編輯彈窗 - 里程 Mileage 上標題 (必填)文字樣式
    modalMileageRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 新增 + 編輯彈窗 - 金額 Amount 
    modalAmount: {
        //#region viewType
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                display: "inline-block",
                ...style.occupy(4)
            })
        },
        viewTypeTextInput: {
            basic: (style, porps) => ({
                ...style,
                //height: "28px",
                // width: "200px"
            })

        },
        //#endregion
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                display: "inline-block",
                ...style.occupy(4)
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
        }
    },
    //#endregion

    //#region 新增 + 編輯彈窗 - 施作項目 Project
    modalProject: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                // display: "inline-block",
                ...style.occupy(12),
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        // viewTypeBottomLabel: {
        //     basic: (style, props) => ({
        //         ...style,
        //         // height: "24px"
        //         minHeight: "24px",
        //         height: "auto"
        //     })
        // },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                // display: "inline-block",
                ...style.occupy(12),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        textareaContainer: {
            basic: (style, props) => {

                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textarea: {
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
                    height: "64px"
                    // height: "28px"
                }
            }
        },
        // bottomLabel: {
        //     basic: (style, props) => ({
        //         ...style,
        //         // height: "24px"
        //         minHeight: "24px",
        //         height: "auto"
        //     })
        // }
    },
    //#endregion
    //#region 新增 + 編輯彈窗 - 施作項目 Project 上標題 (必填)文字樣式
    modalProjectRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region Table區域
    //#region Table容器
    tableContainer: {
        basic: (style, props) => ({
            ...style,
            height: "calc( 100vh - 219px - 4px )",
            width: "100%",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
        })
    },
    //#endregion

    //#region 編輯按鈕
    editButton: {
        basic: (style) => ({
            ...style,
            width: "44px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: "0 0 0 0",
            position: "absolute",
            fontWeight: "400",
            left: "16px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 檢視按鈕
    toViewButton: {
        basic: (style) => ({
            ...style,
            width: "44px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#ff7a45",
            borderColor: "#ff7a45",
            borderRadius: "2px",
            margin: "0 0 0 0",
            position: "absolute",
            fontWeight: "400",
            left: "144px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255, 122, 69, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 刪除按鈕
    deleteButton: {
        basic: (style) => ({
            ...style,
            width: "44px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#FF4D4F",
            borderColor: "#FF4D4F",
            borderRadius: "2px",
            margin: "0 0 0 0",
            position: "absolute",
            fontWeight: "400",
            left: "196px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255, 77, 79, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
}
