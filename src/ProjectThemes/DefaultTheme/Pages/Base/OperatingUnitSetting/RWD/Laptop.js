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
    //#region 標題列區塊
    //#region 標題列
    titleBar: {
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "600px",
                height: "32px"
            })
        }
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
            // margin: "0 16px 0 0",
            color: "#389e0d",
            borderRadius: "2px",
            borderColor: "#389e0d"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(56, 158, 13, 0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 新增彈窗
    //#region Modal 樣式
    addModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "696px"
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
    //#region addFormContainer
    addFormContainer: {
        contentContainer: (style, props) => ({
            ...style,
        })
    },
    //#endregion

    //#region 新增彈窗 - 車行名稱 CarDealerShipName 
    carDealerShipName: {
        //#region viewType
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                display: "inline-block",
                ...style.occupy(12)
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
                padding: "0 0 0 0",
                display: "inline-block",
                ...style.occupy(12)
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
    //#region 新增彈窗 - 車行名稱 CarDealerShipName 上標題 (必填)文字樣式
    carDealerShipNameRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion
    //#region 新增彈窗 - 接收訂單通知Email Email 
    email: {
        //#region viewType
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "24px 12px 0 0",
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
                padding: "24px 12px 0 0",
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
    //#region 新增彈窗 - 接收訂單通知Email Email 上標題 (必填)文字樣式
    emailRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion
    //#region 新增彈窗 - 主要聯絡人姓名 MainContactName 
    mainContactName: {
        //#region viewType
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "24px 0 0 12px",
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
                padding: "24px 0 0 12px",
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
    //#region 新增彈窗 - 主要聯絡人姓名 MainContactName 上標題 (必填)文字樣式
    mainContactNameRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion
    //#region 新增彈窗 - 聯絡市話 Phone 
    phone: {
        //#region viewType
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "24px 12px 0 0",
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
                padding: "24px 12px 0 0",
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
    //#region 新增彈窗 - 聯絡市話 Phone 上標題 (必填)文字樣式
    phoneRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion
    //#region 新增彈窗 - 聯絡手機 Cellphone 
    cellPhone: {
        //#region viewType
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "24px 0 0 12px",
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
                padding: "24px 0 0 12px",
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
    //#region 新增彈窗 - 縣市 Counties
    addCounties: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "24px 12px 0 0",
                //display: "inline-block"
                ...style.occupy(6)
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
                padding: "24px 12px 0 0",
                //display: "inline-block",
                ...style.occupy(6)
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
                height: "16px",
                // minHeight: "24px",
                // height: "auto"
            })
        }
    },
    //#endregion
    //#region 新增彈窗 - 縣市 Counties 上標題 (必填)文字樣式
    addCountiesRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion
    //#region 新增彈窗 - 區域 District
    addDistrict: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "24px 0 0 12px",
                //display: "inline-block"
                ...style.occupy(6)
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
                padding: "24px 0 0 12px",
                //display: "inline-block",
                ...style.occupy(6)
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
                height: "16px",
                // minHeight: "24px",
                // height: "auto",
            })
        }
    },
    //#endregion
    //#region 新增彈窗 - 區域 District 上標題 (必填)文字樣式
    addDistrictRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion
    //#region 新增彈窗 - 路名 Road
    addRoad: {
        //#region viewType
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                display: "inline-block",
                ...style.occupy(12)
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
                padding: "0 0 0 0",
                display: "inline-block",
                ...style.occupy(12)
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
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
        }
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
    //#endregions
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
            left: "24px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion    
    //#endregion


}