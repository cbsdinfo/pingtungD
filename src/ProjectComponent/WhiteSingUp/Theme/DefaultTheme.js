export default {
    //#region 註冊共享車隊
    //#region Modal 樣式
    whiteModal: {
        title: {
            basic: (style, props) => ({
                ...style,
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px"
            }),
        },
        container: {
            basic: (style, props) => ({
                ...style,
                width: "462px",
                height: "460px",
                borderRadius: "16px"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
                // zIndex: 100
            }),
        },
        yesOrNoContainer: {
            basic: (style, props) => ({
                ...style,
                borderBottomLeftRadius: "16px",
                borderBottomRightRadius: "16px"
            }),
        },
    },
    //#endregion
    //#region 白牌車資料資料表單區域容器
    whiteCaseDataContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "100%",
                zIndex: 4,
                // padding: "0px 0px 24px"
            })
        }
    },
    //#endregion

    //#region 居住地(縣市) County
    county: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 6px 0 12px",
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
                height: "0px"
                // minHeight: "24px",
                // height: "auto",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f",
            })
        }
    },
    //#endregion

    //#region 居住地(區域) District
    district: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px 0 6px",
                display: "inline-block",
                ...style.occupy(6),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                textAlign: "right"
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
                height: "0px"
                // minHeight: "24px",
                // height: "auto"
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

    //#region 居住地(地址) Address
    address: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 12px",
                ...style.occupy(12),
                // maxWidth: "calc( 33.33% - 4px )",
                // flexBasis: "calc( 33.33% - 4px )",
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 12px",
                ...style.occupy(12),
                // maxWidth: "calc( 33.33% - 4px )",
                // flexBasis: "calc( 33.33% - 4px )",
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
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
                height: "32px",
                paddingTop: "2px"
            }),
            hover: {
                //#region 覆寫樣式
                // border: "1px solid #FF7A45",
                //#endregion
            },
            focus: {
                // border: "1px solid #FF7A45",
                // boxShadow: "0px 0px 0px 2px rgba(255, 122, 69, 0.2)"
            }
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
                height: "24px"
                // minHeight: "24px",
                // height: "auto",
                // fontSize: "12px",
                // lineHeight: "18px",
                // color: "#ff4d4f",
                // width: "400%"
            })
        }
    },
    //#endregion

    //#region 居住地(地址) Address 下標題 (必填)文字樣式
    countyRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px",

        })
    },
    //#endregion

    //#region 經度 Longitude
    longitude: {
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

    //#region 聯絡人姓名 ContactName
    contactName: {
        container: {
            tablet: {
                basic: (style, props) => ({
                    ...style,
                    padding: "0 6px 0 12px",
                    display: "inline-block",
                    ...style.occupy(6),
                })
            },
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
        container: {
            tablet: {
                basic: (style, props) => ({
                    ...style,
                    padding: "0 12px 0 6px",
                    display: "inline-block",
                    ...style.occupy(6),
                })
            },
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
        container: {
            tablet: {
                basic: (style, props) => ({
                    ...style,
                    padding: "0 6px 0 12px",
                    display: "inline-block",
                    ...style.occupy(6),
                })
            },
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
        container: {
            tablet: {
                basic: (style, props) => ({
                    ...style,
                    padding: "0 12px 0 6px",
                    display: "inline-block",
                    ...style.occupy(6),
                })
            },
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


}
