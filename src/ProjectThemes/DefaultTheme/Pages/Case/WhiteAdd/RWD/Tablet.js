export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        laptopOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa"
                }
            }
        },
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa"
                }
            }
        },
        laptopOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa"
                }
            }
        },
        laptopContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa"
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa"
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa"
                }
            }
        },
    },
    //#endregion
    //#region 標題列
    titleBar: {
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "240px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "82px",
                height: "32px"
            })
        }
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

    //#region 新增頁面表單區容器
    AddPageContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "24px 12px",
                margin: "4px 0 0 0",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: "auto"
            }
        }
    },
    //#endregion

    //#region  基本資料 子標題列
    driverBaseSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "calc( 100% - 24px )",
                margin: "0 12px 24px"
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "200px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "250px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region 儲存並接續新增身分
    saveAndAddCaseListButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "150px",
                background: "#ff7a45",
                boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
                borderRadius: "2px",
                height: "32px",
                margin: "0 16px 0 0"
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "rgb(255, 122, 69, 0.85)"
            })
        },
        text: {
            basic: (style, props) => ({
                ...style,
                fontSize: "14px",
                lineHeight: "32px",
                top: "-3px"
            }),
        }
    },
    //#endregion

    //#region 選擇欲新增身份彈窗
    //#region Modal 樣式
    caseListSelectModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "444px"
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

    //#region 選擇欲新增身份彈窗 - 用戶身份 caseList
    caseListSelect: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                //display: "inline-block"
                ...style.occupy(12)
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
                padding: "0 0 0 0",
                //display: "inline-block",
                ...style.occupy(12)
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

    //#endregion 

    //#region 儲存按鈕
    saveButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "60px",
                background: "#1890ff",
                boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
                borderRadius: "2px",
                height: "32px"
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "#40a9ff"
            })
        },
        text: {
            basic: (style, props) => ({
                ...style,
                fontSize: "14px",
                lineHeight: "32px",
                top: "-3px"
            }),
        }
    },
    //#endregion

    //#region 基本資料表單區域
    //#region 基本資料表單區域容器
    baseContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "0px 0px 24px"
        })
    },
    //#endregion

    //#region 基本資料容器
    baseFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                // display: "inline-block",
                // verticalAlign: "top",
                // zIndex: 4
            })
        }
    },
    //#endregion

    //#region 姓名 Name
    name: {
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
                // height: "24px"
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 生日 Birthday
    birthday: {
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

    //#region 性別 Sex
    sex: {
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

    //#region 身分證字號 Uid
    uid: {
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
                // height: "24px"
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 手機 Cellphone
    cellPhone: {
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
                // height: "24px"
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#endregion

    //#region 白牌車資料 子標題列
    whiteCaseDataSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "calc( 100% - 24px )",
                margin: "0 12px 24px"
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "200px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "0px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region 白牌車資料表單區域
    //#region 白牌車資料資料表單區域容器
    whiteCaseDataContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                height: "auto",
                zIndex: 4,
                padding: "0px 0px 24px"
            })
        }
    },
    //#endregion

    //#region 居住地(縣市) County
    county: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(3),
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
                minHeight: "16px",
                height: "auto",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#ff4d4f",
                // width: "400%"
            })
        }
    },
    //#endregion
    //#region 居住地(縣市) County 上標題 (必填)文字樣式
    countyRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 居住地(區域) District
    district: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(3),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                textAlign: "right",
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
                minHeight: "16px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 居住地(地址) Address
    address: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                textAlign: "right",
                display: "none",
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
                textAlign: "right",
                display: "none",
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
                // height: "24px"
                minHeight: "24px",
                height: "auto",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#ff4d4f"
            })
        }
    },
    //#endregion

    //#region 輪住地址容器
    turnAddressFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                zIndex: 2
            })
        }
    },
    //#endregion

    //#region 輪住地址 CheckboxGroup
    turnAddressCheckboxGroup: {
        basic: (style, props) => ({
            ...style,
            display: "block",
        })
    },
    //#endregion

    //#region 輪住地址 CheckboxItem
    turnAddressCheckboxItem: {
        container: {
            basic: (style, props) => ({
                ...style,
                fontFamily: "'Noto Sans TC',sans-serif",
                marginLeft: "8px"
            }),
            hover: {
                // background: "red"
            },
        },
    },
    //#endregion

    //#region 輪住地址(縣市) County
    turnCounty: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(1.5),
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
                height: "auto",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#ff4d4f",
                width: "600%"
            })
        }
    },
    //#endregion

    //#region 輪住地址(區域) TurnDistrict
    turnDistrict: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(1.5),
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

    //#region 輪住地址(地址) TurnAddress
    turnAddress: {
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
                textAlign: "right",
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
                textAlign: "right",
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
                // height: "24px"
                minHeight: "24px",
                height: "auto",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#ff4d4f"
            })
        }
    },
    //#endregion
    //#region 轉換經緯度文字容器
    convertContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#1890ff",
            fontSize: "14px",
            lineHeight: "22px",
            cursor: "pointer",
            padding: "0 2px 0 0"
        })
    },
    //#endregion
    //#region 轉換經緯度文字圖標
    convertContainerIcon: {
        margin: "0 8px 0 0"
    },
    //#endregion
    //#region 刪除文字容器
    delContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px",
            cursor: "pointer",
            padding: "0 2px 0 32px",
            width: "62px",
            margin: "0 16px 0 0"
        })
    },
    //#endregion
    //#region 刪除文字圖標
    delContainerIcon: {
        // height: "12px",
        // width: "18px",
        position: "absolute",
        margin: "0 8px 0 0",
        left: "0px",
        color: "#ff4d4f"
    },
    //#endregion


    //#region 經度 Longitude
    longitude: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(3),
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
                minHeight: "16px",
                height: "auto"
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(3),
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
                // height: "24px"
                minHeight: "16px",
                height: "auto",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#ff4d4f"
            })
        }
    },
    //#endregion
    //#region 經度 Longitude 上標題 (必填)文字樣式
    longitudeRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion
    //#region 緯度 Latitude
    latitude: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(3),
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
                minHeight: "16px",
                height: "auto"
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                display: "inline-block",
                ...style.occupy(3),
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
                // height: "24px"
                minHeight: "16px",
                height: "auto",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#ff4d4f"
            })
        }
    },
    //#endregion
    //#region 緯度 Latitude 上標題 (必填)文字樣式
    latitudeRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 新增輪住地址按鈕
    addTurnAddressButtonContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            height: "40px",
            textAlign: "center",
            padding: "8px 0 0 0"
        })
    },
    //#endregion

    //#region 新增輪住地址按鈕
    addTurnAddressButton: {
        basic: (style) => ({
            ...style,
            width: "138px",
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
    //#region 新增輪住地址按鈕 圖標
    addTurnAddressButtonIcon: {
        position: "relative",
        // height: "100%",
        // right: "12px",
        cursor: "pointer",
        top: "2px",
        left: "-4px"
    },
    //#endregion

    //#endregion

    //#region 備註 子標題列
    driverNoteSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "calc( 100% - 24px )",
                margin: "0 12px 24px"
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "50px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "0px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region 備註表單區域
    //#region 備註表單區域容器
    driverNoteContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 備註 DriverNote
    driverNote: {
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
                height: "0px"
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
                    height: "200px"
                    // height: "28px"
                }
            }
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

    //#endregion

    //#region 緊急聯絡人資訊 子標題列
    emergencyContactSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "calc( 100% - 24px )",
                margin: "0 12px 24px"
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "150px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "0px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region 緊急聯絡人資訊 區域
    //#region 緊急聯絡人資訊 區域容器
    emergencyContactContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 聯絡人姓名 ContactName
    contactName: {
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
                // height: "24px"
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 關係 Relationship
    relationship: {
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
                // height: "24px"
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 聯絡人手機 ContactCellphone
    contactCellphone: {
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
                // height: "24px"
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#region 聯絡人市話 ContactTelephone
    contactTelephone: {
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
                // height: "24px"
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#endregion

    //#region 底部儲存按鈕 外層容器
    bottomSaveButtonContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                height: "34px",
                padding: "0 12px 0 0"
            })
        }
    },
    //#endregion
    //#region 底部儲存按鈕 列容器
    bottomSaveButtonRowContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                justifyContent: "flex-end"
            })
        }
    },
    //#endregion

    //#region 底部儲存並接續新增身分按鈕
    bottomSaveAndAddCaseListButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "150px",
                background: "#ff7a45",
                boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
                borderRadius: "2px",
                height: "32px",
                margin: "0 16px 0 0"
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "rgb(255, 122, 69, 0.85)"
            })
        },
        text: {
            basic: (style, props) => ({
                ...style,
                fontSize: "14px",
                lineHeight: "32px",
                top: "-3px"
            }),
        }
    },
    //#endregion

    //#region 底部儲存按鈕
    bottomSaveButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "60px",
                background: "#1890ff",
                boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
                borderRadius: "2px",
                height: "32px"
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "#40a9ff"
            })
        },
        text: {
            basic: (style, props) => ({
                ...style,
                fontSize: "14px",
                lineHeight: "32px",
                top: "-3px"
            }),
        }
    },
    //#endregion
}