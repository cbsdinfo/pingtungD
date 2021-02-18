export default {
    //#region 標題列區塊
    //#region 標題列
    titleBar: {
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "821px"
            })
        }
    },
    //#endregion
    //#region 關鍵字 Keyword
    keyword: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 16px 0 0",
                display: "inline-block"
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
                    height: "28px",
                    width: "200px"
                }
            }
        }
    },
    //#endregion
    //#region 關鍵字 右方圖標
    keywordRightIcon: {
        position: "absolute",
        height: "100%",
        right: "12px",
        cursor: "pointer",
        top: 0,
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
            margin: "0 16px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(56, 158, 13, 0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 新增個案按鈕 圖標
    addButtonIcon: {
        position: "relative",
        // height: "100%",
        // right: "12px",
        cursor: "pointer",
        top: "2px",
        right: "3px"
    },
    //#endregion

    //#region 分配用戶按鈕
    assignButton: {
        basic: (style) => ({
            ...style,
            width: "110px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#fa8c16",
            borderColor: "#fa8c16",
            borderRadius: "2px",
            margin: "0 16px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(250, 140, 22, 0.1)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 分配用戶按鈕 圖標
    assignButtonIcon: {
        position: "relative",
        // height: "100%",
        // right: "12px",
        cursor: "pointer",
        top: "1px",
        right: "3px"
    },
    //#endregion

    //#region 編輯按鈕
    editButton: {
        basic: (style) => ({
            ...style,
            width: "82px",
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
    //#region 編輯個案按鈕 圖標
    editButtonIcon: {
        position: "relative",
        // height: "100%",
        // right: "12px",
        cursor: "pointer",
        top: "1px",
        right: "3px"
    },
    //#endregion

    //#region 刪除按鈕
    delButton: {
        basic: (style) => ({
            ...style,
            width: "82px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#ff4d4f",
            borderColor: "#ff4d4f",
            borderRadius: "2px",
            margin: "0 16px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255, 77, 79, 0.1)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 刪除個案按鈕 圖標
    delButtonIcon: {
        position: "relative",
        // height: "100%",
        // right: "12px",
        cursor: "pointer",
        top: "2px",
        right: "3px"
    },
    //#endregion

    //#region 刷新按鈕
    refreshButton: {
        basic: (style) => ({
            ...style,
            width: "82px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#13c2c2",
            borderColor: "#13c2c2",
            borderRadius: "2px",
            margin: "0 16px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(19, 194, 194, 0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 刷新個案按鈕 圖標
    refreshButtonIcon: {
        position: "relative",
        // height: "100%",
        // right: "12px",
        cursor: "pointer",
        top: "2px",
        right: "3px"
    },
    //#endregion

    //#region id/描述 勾選框 IdDescribe
    idDescribe: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                display: "inline-block"
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        }
    },
    //#endregion
    //#endregion

    //#region 左側選單與右側 Table 容器 區塊
    leftMenuRightTableContainer: {
        basic: (style, props) => ({
            ...style,
            margin: "4px 0 0 0"
        })
    },

    //#region 左側選單 區塊
    //#region 左側選單容器
    leftMenuContainer: {
        basic: (style, props) => ({
            ...style,
            maxWidth: "19.5%",
            flexBasis: "19.5%",
            height: "calc( 100vh - 219px - 4px)",
            padding: "0 16px 0 0"
        })
    },
    //#endregion
    //#region 左側選單子容器
    leftMenuSubContainer: {
        basic: (style, props) => ({
            ...style,
            height: "100%",
            width: "100%",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            padding: "16px 0 16px 0"
        })
    },
    //#endregion
    //#region 查詢所有機構
    getSubOrgsExecute: {
        basic: (style, props) => ({
            ...style,
            fontSize: "14px",
            height: "22px",
            lineHeight: "22px",
            color: "#1890ff",
            margin: "0 0 8px 28px",
            cursor: "pointer",
        })
    },
    //#endregion
    //#region 左側選單容器 ScrollBar
    leftMenuSubScrollBar: {
        basic: {
            width: "100%",
            maxWidth: "100%",
            height: "calc( 100% - 30px )",
            maxHeight: "calc( 100% - 30px )",
            borderRight: "1px solid #f0f0f0",
            boxSizing: "border-box",
        }
    },
    //#endregion
    //#region OrgsTree遍歷項容器
    OrgsTreeContainer: {
        basic: (style, props) => ({
            ...style,
            overflow: "hidden",
            transition: "max-height .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
            maxHeight: (props.close ?? []).includes(props.id) ? "28px" : `${(props.childCount + 1) * 28}px`,
        })
    },
    //#endregion
    //#region OrgsTree項目容器
    OrgsTreeItemContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: `0 0 0 ${4 + 24 * props.level}px`,
                height: "24px",
                width: "100%",
                // margin: "8px 0px",
                color: "rgba(0, 0, 0, 0.65)",
                fontSize: "14px",
                lineHeight: "22px",
                cursor: "pointer",
                userSelect: "none",
                margin: "0 0 4px 0",
                background: ((props.select.length === 0 ? props.orgId : props.select) === props.id) ? "#e6f7ff" : "#fff"
            }
        },
        hover: (style, props) => ({
            ...style,
            color: "#1890ff"
        })
    },
    //#endregion
    //#region 展開的 icon 圖標
    caretDownIcon: (level, close, id) => ({
        position: "absolute",
        left: `${-14 + level * 24}px`,
        height: "100%",
        transition: "transform .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
        transform: (close ?? []).includes(id) ? "rotate(-90deg)" : null
    }),
    //#endregion
    //#endregion

    //#region 右側 Table 區塊
    //#region 右側 Table 容器
    rightTableContainer: {
        basic: (style, props) => ({
            ...style,
            maxWidth: "80.5%",
            flexBasis: "80.5%",
            height: "calc( 100vh - 219px - 4px )",
        })
    },
    //#endregion
    //#region 左側選單子容器
    rightTableSubContainer: {
        basic: (style, props) => ({
            ...style,
            height: "100%",
            width: "100%",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
        })
    },
    //#endregion

    //#region 編輯按鈕
    tableEditButton: {
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
            left: "72px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 啟用按鈕
    enableButton: {
        basic: (style) => ({
            ...style,
            width: "44px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#389E0D",
            borderColor: "#389E0D",
            borderRadius: "2px",
            margin: "0 0 0 0",
            position: "absolute",
            fontWeight: "400",
            left: "124px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(56, 158, 13, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 停用按鈕
    disableButton: {
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
            left: "124px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255, 77, 79, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#endregion
    //#endregion

    //#region 編輯彈窗 (新增目前吃同一套樣式)
    //#region Modal 樣式
    editModal: {
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
    //#region editFormContainer
    editFormContainer: {
        contentContainer: (style, props) => ({
            ...style,
        })
    },
    //#endregion

    //#region 編輯彈窗 - 單位名稱 unitName
    unitName: {
        //#region viewType
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0",
                //display: "inline-block"
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
                padding: "0",
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
    //#region 編輯彈窗 - 單位名稱 UnitName 上標題 (必填)文字樣式
    unitNameRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 編輯彈窗 - 統一編號 Uid
    uid: {
        //#region viewType
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                // padding: "0 16px 0 0",
                //display: "inline-block"
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
                padding: "0 12px 0 0",
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
    //#region 編輯彈窗 - 單位名稱 Uid 上標題 (必填)文字樣式
    uidRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 編輯彈窗 - 主要聯絡人 FirstContact
    firstContact: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 12px",
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
    //#region 編輯彈窗 - 單位名稱 FirstContact 上標題 (必填)文字樣式
    firstContactRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 編輯彈窗 - 主要聯絡人市話 FirstContactTelephone
    firstContactTelephone: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px 0 0",
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
    //#region 編輯彈窗 - 主要聯絡人市話 FirstContactTelephone 上標題 (必填)文字樣式
    firstContactTelephoneRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 編輯彈窗 - 主要聯絡人手機 FirstContacCellhone
    firstContacCellhone: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 12px",
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

    //#region 編輯彈窗 - 狀態 Status
    status: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px 0 0",
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
        }
    },
    //#endregion
    //#region 編輯彈窗 - 狀態 Status 上標題 (必填)文字樣式
    statusRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 編輯彈窗 - 上層機構 UpperOrg
    upperOrg: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 12px",
                // display: "inline-block",
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
                //  width: "200px"
            })
        }
    },
    //#endregion
    //#region 編輯彈窗 - 上層機構 UpperOrg 上標題 (必填)文字樣式
    upperOrgRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#endregion

    //#region 分配用戶彈窗 
    //#region Modal 樣式
    assignModal: {
        outContainer: {
            basic: (style, props) => ({
                ...style,
                zIndex: 999
            }),
            tablet: (style, props) => ({
            }),
        },
        container: {
            basic: (style, props) => ({
                ...style,
                width: "1050px",
                height: "calc( 100vh - 148px )"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: {
            basic: (style, props) => ({
                ...style,
                height: "calc( 100% - 110px)",
                padding: "24px",
                zIndex: 100
            }),
        }
    },
    //#endregion
    //#region editFormContainer
    assignFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                height: "auto"
            })
        },
        contentContainer: (style, props) => ({
            ...style,
        })
    },
    //#endregion

    //#region 分配用戶彈窗 - 關鍵字 Keyword
    assignKeyword: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 16px 0 0",
                display: "inline-block"
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
                    height: "28px",
                    width: "200px"
                }
            }
        }
    },
    //#endregion
    //#region 分配用戶彈窗 - 關鍵字 右方圖標
    assignKeywordRightIcon: {
        position: "absolute",
        height: "100%",
        right: "12px",
        cursor: "pointer",
        top: 0,
    },
    //#endregion

    //#region 選中的用戶資訊容器
    selectUserContainer: {
        basic: (style, props) => {
            return {
                ...style,
                width: "calc( 100% - 220px)"
            }
        }
    },
    //#endregion
    //#region 選中的用戶資訊文字
    selectUserText: {
        basic: (style, props) => ({
            ...style,
            height: "30px",
            lineHeight: "30px",
            fontWeight: "normal",
            fontSize: "14px",
            color: "rgba(0, 0, 0, 0.85)"
        })
    },
    //#endregion

    //#region 分配用戶彈窗 下方表格
    assignTableSubContainer: {
        basic: (style, props) => ({
            ...style,
            height: "calc( 100% - 32px )",
            width: "100%",
            padding: "24px 0 0 0 ",
            // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
        })
    },
    //#endregion

    //#region 停用狀態 Tag
    assignDisable: {
        container: {
            basic: (style, props) => ({
                ...style,
                margin: "0",
                padding: "0px 7px",
                fontSize: "12px",
                lineHeight: "20px"
            }),
            hover: {}
        }
    },
    //#endregion

    //#region 啟用狀態 Tag
    assignEnable: {
        container: {
            basic: (style, props) => ({
                ...style,
                margin: "0",
                padding: "0px 7px",
                fontSize: "12px",
                lineHeight: "20px"
            }),
            hover: {}
        }
    }
    //#endregion

    //#endregion

}