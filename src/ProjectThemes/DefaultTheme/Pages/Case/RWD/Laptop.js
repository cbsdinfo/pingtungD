export default {
    //#region 標題列
    titleBar: {
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "700px",
                // height: "32px"
            })
        }
    },
    //#endregion
    //#region 單選下拉選單 請選擇用戶身份 UserId
    userId: {
        container: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block"
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
                width: "150px"
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
                    width: "150px"
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
    //#region 帳號解鎖按鈕
    unlockButton: {
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
    //#region 新增用戶按鈕
    addUserButton: {
        basic: (style) => ({
            ...style,
            width: "110px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            margin: "0 0 0 0",
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

    //#region 姓名 容器
    nameContainer: {
        basic: (style, props) => ({
            ...style,
            fontSize: "14px",
            lineHeight: "22px",
            color: " rgba(0,0,0,0.65)"
        })
    },
    //#endregion

    //#region 編輯用戶基本資料按鈕
    editUserButton: {
        basic: (style) => ({
            ...style,
            width: "30px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "2px",
            padding: 0,
            color: "#1890ff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: "0 0 0 0",
            position: "absolute",
            top: "-4px",
            right: "-16px"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255 ,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region  編輯用戶基本資料按鈕 圖標
    editUserButtonIcon: {
        position: "relative",
        // height: "100%",
        // right: "12px",
        cursor: "pointer",
        top: "2px",
    },
    //#endregion

    //#region 可用身分 Tag 容器
    canUseCaseListTagContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "0px 12px 0 0",
        })
    },
    //#endregion
    //#region 可用身分 Tag
    canUseCaseListTag: {
        container: {
            basic: (style, props) => ({
                ...style,
                margin: "0 8px 8px 0",
                top: "3px",
                padding: "0px 6px",
                fontSize: "14px",
                lineHeight: "26px",
                color: "#FA8C16",
                backgroundColor: "#FFF7E6",
                borderColor: "#FFD591"
            }),
            hover: {}
        }
    },
    //#endregion

    //#region 新增身份按鈕
    addIdentityButton: {
        basic: (style) => ({
            ...style,
            width: "30px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            padding: 0,
            color: "#389e0d",
            borderRadius: "2px",
            borderColor: "#389e0d",
            position: "absolute",
            top: "4px",
            right: "-14px"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(56, 158, 13, 0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 新增用戶、身份按鈕 圖標
    addButtonIcon: {
        position: "relative",
        // height: "100%",
        // right: "12px",
        cursor: "pointer",
        top: "2px",
    },
    //#endregion

    //#region 帳號鎖定圖標
    userlocked: {
        position: "absolute",
        top: "3px",
        left: "-18px"
    },
    //#endregion

    //#region 下拉選單 身份 CaseList
    caseList: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                //display: "inline-block",
                ...style.occupy(12),
                left: "-2px"
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
                // zIndex: 100,
                //width: "200px"
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "8px"
                // minHeight: "24px",
                // height: "auto"
            })
        }
    },
    //#endregion

    //#region 叫車按鈕
    callCarButton: {
        basic: (style) => ({
            ...style,
            width: "44px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#13c2c2",
            borderColor: "#13c2c2",
            borderRadius: "2px",
            margin: "0 8px 0 0",
            // position: "absolute",
            fontWeight: "400",
            // left: "16px",// 16 間格52
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(19, 194, 194, 0.85)"
        }),
        focus: (style, props) => ({})
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
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: "0 8px 0 0",
            // position: "absolute",
            fontWeight: "400",
            // left: "68px",
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
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#ff7a45",
            borderColor: "#ff7a45",
            borderRadius: "2px",
            margin: "0 8px 0 0",
            // position: "absolute",
            fontWeight: "400",
            // left: "120px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(255, 122, 69, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 可用額度按鈕
    quotaButton: {
        basic: (style) => ({
            ...style,
            width: "72px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#389e0d",
            borderColor: "#389e0d",
            borderRadius: "2px",
            margin: "0 8px 0 0",
            // position: "absolute",
            fontWeight: "400",
            // left: "172px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(56, 158, 13, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region B單位按鈕
    bUnitButton: {
        basic: (style) => ({
            ...style,
            width: "53px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "13px",
            padding: 0,
            color: "#fff",
            backgroundColor: "#597ef7",
            borderColor: "#597ef7",
            borderRadius: "2px",
            margin: "0 0 0 0",
            // position: "absolute",
            fontWeight: "400",
            // left: "172px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(89, 126, 247, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

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

    //#region 客戶端用戶 編輯彈窗 (新增、檢視目前吃同一套樣式)
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

    //#region 編輯彈窗 - 姓名 Name 
    name: {
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
    //#region 編輯彈窗 - 姓名 Name 上標題 (必填)文字樣式
    nameRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 出生年月日 Birthday
    birthday: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 0 0 12px",
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
                //left:"-8px",
                padding: "0 0 0 12px",
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
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion
    //#region 編輯彈窗 - 出生年月日 Birthday 上標題 (必填)文字樣式
    birthdayRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 編輯彈窗 - 身分證字號 Uid
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
    //#region 編輯彈窗 - 身分證字號 Uid 上標題 (必填)文字樣式
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

    //#region 編輯彈窗 - 性別 Sex
    sex: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 12px",
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
                padding: "0 0 0 12px",
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
                // height: "24px"
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion
    //#region 編輯彈窗 - 性別 Sex 上標題 (必填)文字樣式
    sexRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 編輯彈窗 - 手機 Cellphone
    cellphone: {
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
    //#region 編輯彈窗 - 手機 Cellphone 上標題 (必填)文字樣式
    cellphoneRequired: {
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

}
