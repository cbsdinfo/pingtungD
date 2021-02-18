export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8"
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    height: `calc( ${props.height}px - 56px - 48px )`,
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: 0
                }
            }
        },
    },
    //#endregion

    //#region 基本資料表單區
    //#region 基本資料表單區容器
    basicInformationContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // padding: "24px 12px",
                background: "#fff",
                height: "260px",
                width: "100%",

            }
        }
    },
    //#endregion
    //#region  基本資料 子標題列
    basicInfBaseSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                padding: "9px 16px",
                background: "#DBE4E8",
                border: 0,
                margin: 0,
                height: "40px"
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "48px",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "22px",
                color: "rgba(0,0,0,0.65)",
                padding: 0,
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "152px",
                height: "32px"
            })
        }
    },
    //#endregion
    //#region 修改密碼按鈕
    editPwdButton: {
        basic: (style) => ({
            ...style,
            width: "72px",
            height: "24px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "2px",
            padding: 0,
            color: "#1890ff",
            backgroundColor: "#fff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: "0 8px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255 ,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 新增修改密碼彈窗
    //#region Modal 樣式
    editPwdModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "343px",
                height: "374px"
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
    //#region 修改密碼彈窗容器
    editPwdFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "326px",
                // padding: "24px"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: (style, props) => ({
            ...style,
        })
    },
    //#endregion
    //#region 修改密碼提示文字
    editPwdTip: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.65)",
        })
    },
    //#endregion
    //#region 舊密碼 OldPwd
    oldPwd: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
                display: "inline-block",
                ...style.occupy(12),
                margin: "24px 0 0"
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
    //#region 新密碼 NewPwd 
    newPwd: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
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
    //#region 確認新密碼 ConfirmPwd
    confirmPwd: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
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
                height: 0
                // minHeight: "24px",
                // height: "auto"
            })
        }
    },
    //#endregion
    //#region 密碼 左方圖標
    pwdLeftIcon: {
        position: "absolute",
        height: "100%",
        left: "12px",
        cursor: "pointer",
        top: 0,
    },
    //#endregion
    //#endregion

    //#region 修改手機按鈕
    editPhoneButton: {
        basic: (style) => ({
            ...style,
            width: "72px",
            height: "24px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "2px",
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
    //#region 新增修改手機彈窗 發送驗證碼
    //#region Modal 樣式
    sendVerificationCodeModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "343px",
                height: "218px"
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
    //#region 修改手機彈窗容器
    sendVerificationCodeFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "62px",
                // padding: "24px"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: (style, props) => ({
            ...style,
        })
    },
    //#endregion
    //#region 手機號碼 ModalEditCellPhone
    modalEditCellPhone: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "28px"
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
                height: 0
                // minHeight: "24px",
                // height: "auto"
            })
        }
    },
    //#endregion
    //#endregion

    //#region 新增修改手機彈窗 提交驗證碼
    //#region Modal 樣式
    confirmVerificationCodeModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "390px",
                maxWidth: "343px"
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
    //#region 修改手機彈窗容器
    confirmVerificationCodeFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "234px",
                // padding: "24px"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: (style, props) => ({
            ...style,
        })
    },
    //#endregion
    //#region 提交驗證碼提示文字
    confirmVerificationCodeTip: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#1890FF",
            margin: "0 0 16px"
        })
    },
    //#endregion
    //#region 重送驗證碼按鈕 容器
    timeCounterContainer: {
        basic: (style, props) => ({
            ...style,
            height: "28px",
            margin: "19px 0 0"
        })
    },
    //#endregion
    //#region 驗證碼 ModalVerificationCode 
    modalVerificationCode: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
                display: "inline-block",
                ...style.occupy(12),
                margin: "24px 0 0"
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "28px"
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
                height: 0
                // minHeight: "24px",
                // height: "auto"
            })
        }
    },
    //#endregion
    //#endregion

    //#region 新增修改手機彈窗 驗證成功
    //#region Modal 樣式
    successModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "343px",
                height: "126px",
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: {
            basic: (style, props) => ({
                ...style,
                // padding: "24px",
                zIndex: 100
            }),
        }
    },
    //#endregion
    //#endregion

    //#region 通用容器
    universalContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "11px 16px",
                boxShadow: "inset 0 -1px #D9D9D9",
            }
        }
    },
    //#endregion

    //#region 姓名 標題 
    nameTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 姓名 內文 
    nameText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 生日 標題 
    birthTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 生日 內文 
    birthText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 性別 標題 
    sexTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 性別 內文 
    sexText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 身分證字號 標題 
    uidTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 身分證字號 內文 
    uidText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 手機 標題 
    cellphoneTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 手機 內文 
    cellphoneText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion
    //#endregion

    //#region 長照資料表單區
    //#region 長照資料表單區容器
    caseInformationContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // padding: "24px 12px",
                background: "#fff",
                // height: "304px",
                width: "100%",

            }
        }
    },
    //#endregion
    //#region  長照資料 子標題列
    caseInfBaseSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                padding: "9px 16px",
                background: "#DBE4E8",
                border: 0,
                margin: 0,
                height: "40px"
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "48px",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "22px",
                color: "rgba(0,0,0,0.65)",
                padding: 0,
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "72px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region 額度狀況按鈕
    quotaStatusButton: {
        basic: (style) => ({
            ...style,
            width: "72px",
            height: "24px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "2px",
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
    //#region 新增額度狀況彈窗
    //#region Modal 樣式
    quotaStatusModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "343px",
                height: "366px"
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
    //#region 額度狀況彈窗容器
    quotaStatusFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "210px",
                // padding: "24px"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: (style, props) => ({
            ...style,
        })
    },
    //#endregion
    //#region 總額度 標題 
    totalAmountTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            width: "100%",
            color: "rgba(0, 0, 0, 0.85)",
            margin: "0 0 24px"
        })
    },
    //#endregion
    //#region 總額度 內文 
    totalAmountText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "24px",
            color: "#FF7A45",
        })
    },
    //#endregion
    //#region 使用額度 標題 
    useQuotaTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            width: "100%",
            color: "rgba(0, 0, 0, 0.85)",
            margin: "0 0 24px"
        })
    },
    //#endregion
    //#region 使用額度 內文 
    useQuotaText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "24px",
            color: "#FF7A45",
        })
    },
    //#endregion
    //#region 剩餘額度 標題 
    remainingAmountTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            width: "100%",
            color: "rgba(0, 0, 0, 0.85)",
            margin: "0 0 24px"
        })
    },
    //#endregion
    //#region 剩餘額度 內文 
    remainingAmountText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "24px",
            color: "#FF7A45",
        })
    },
    //#endregion
    //#endregion

    //#region 案號 標題 
    caseNumberTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 案號 內文 
    caseNumberText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 長照居住地址 標題 
    caseResidentialAddressTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "30%"
        })
    },
    //#endregion
    //#region 長照居住地址 內文 
    caseResidentialAddressText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "70%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 長照緊急聯絡人姓名 標題 
    caseEmergencyNameTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 長照緊急聯絡人姓名 內文 
    caseEmergencyNameText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 長照緊急聯絡人關係 標題 
    caseEmergencyRelationshipTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 長照緊急聯絡人關係 內文 
    caseEmergencyRelationshipText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 長照緊急聯絡人手機 標題 
    caseEmergencyCellPhoneTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 長照緊急聯絡人手機 內文 
    caseEmergencyCellPhoneText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 長照緊急聯絡人市話 標題 
    caseEmergencyPhoneTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 長照緊急聯絡人市話 內文 
    caseEmergencyPhoneText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 長照服務車隊 標題 
    caseServiceFleetTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 長照服務車隊 內文 
    caseServiceFleetText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion
    //#endregion

    //#region 共享車隊資料表單區
    //#region 共享車隊資料表單區容器
    fleetInformationContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // padding: "24px 12px",
                background: "#fff",
                // height: "260px",
                width: "100%",

            }
        }
    },
    //#endregion
    //#region  共享車隊資料 子標題列
    fleetInfBaseSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                padding: "9px 16px",
                background: "#DBE4E8",
                border: 0,
                margin: 0,
                height: "40px"
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "48px",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "22px",
                color: "rgba(0,0,0,0.65)",
                padding: 0,
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "72px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region 共享車隊居住地址 標題 
    fleetResidentialAddressTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "30%"
        })
    },
    //#endregion
    //#region 共享車隊居住地址 內文 
    fleetResidentialAddressText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "70%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 共享車隊緊急聯絡人姓名 標題 
    fleetEmergencyNameTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 共享車隊緊急聯絡人姓名 內文 
    fleetEmergencyNameText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 共享車隊緊急聯絡人關係 標題 
    fleetEmergencyRelationshipTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 共享車隊緊急聯絡人關係 內文 
    fleetEmergencyRelationshipText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 共享車隊緊急聯絡人手機 標題 
    fleetEmergencyCellPhoneTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 共享車隊緊急聯絡人手機 內文 
    fleetEmergencyCellPhoneText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 共享車隊緊急聯絡人市話 標題 
    fleetEmergencyPhoneTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 共享車隊緊急聯絡人市話 內文 
    fleetEmergencyPhoneText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 共享車隊服務車隊 標題 
    fleetServiceFleetTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 共享車隊服務車隊 內文 
    fleetServiceFleetText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion
    //#endregion

    //#region 巴士資料表單區
    //#region 巴士資料表單區容器
    busInformationContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // padding: "24px 12px",
                background: "#fff",
                // height: "260px",
                width: "100%",

            }
        }
    },
    //#endregion
    //#region  巴士資料 子標題列
    busInfBaseSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                padding: "9px 16px",
                background: "#DBE4E8",
                border: 0,
                margin: 0,
                height: "40px"
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "48px",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "22px",
                color: "rgba(0,0,0,0.65)",
                padding: 0,
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "72px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region 巴士卡號 標題 
    busCardNumberTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "30%"
        })
    },
    //#endregion
    //#region 巴士卡號 內文 
    busCardNumberText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "70%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 巴士居住地址 標題 
    busResidentialAddressTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "30%"
        })
    },
    //#endregion
    //#region 巴士居住地址 內文 
    busResidentialAddressText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "70%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 巴士緊急聯絡人姓名 標題 
    busEmergencyNameTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 巴士緊急聯絡人姓名 內文 
    busEmergencyNameText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 巴士緊急聯絡人手機 標題 
    busEmergencyCellPhoneTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 巴士緊急聯絡人手機 內文 
    busEmergencyCellPhoneText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 巴士緊急聯絡人市話 標題 
    busEmergencyPhoneTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 巴士緊急聯絡人市話 內文 
    busEmergencyPhoneText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 巴士服務車隊 標題 
    busServiceFleetTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 巴士服務車隊 內文 
    busServiceFleetText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion
    //#endregion

    //#region 日照資料表單區
    //#region 日照資料表單區容器
    dayCareInformationContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // padding: "24px 12px",
                background: "#fff",
                // height: "304px",
                width: "100%",

            }
        }
    },
    //#endregion
    //#region  日照資料 子標題列
    dayCareInfBaseSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                padding: "9px 16px",
                background: "#DBE4E8",
                border: 0,
                margin: 0,
                height: "40px"
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "48px",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "22px",
                color: "rgba(0,0,0,0.65)",
                padding: 0,
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "72px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region 案號 標題 
    dayCareNumberTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 案號 內文 
    dayCareNumberText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 日照居住地址 標題 
    dayCareResidentialAddressTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "30%"
        })
    },
    //#endregion
    //#region 日照居住地址 內文 
    dayCareResidentialAddressText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "70%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 日照緊急聯絡人姓名 標題 
    dayCareEmergencyNameTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 日照緊急聯絡人姓名 內文 
    dayCareEmergencyNameText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 日照緊急聯絡人關係 標題 
    dayCareEmergencyRelationshipTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 日照緊急聯絡人關係 內文 
    dayCareEmergencyRelationshipText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 日照緊急聯絡人手機 標題 
    dayCareEmergencyCellPhoneTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 日照緊急聯絡人手機 內文 
    dayCareEmergencyCellPhoneText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 日照緊急聯絡人市話 標題 
    dayCareEmergencyPhoneTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 日照緊急聯絡人市話 內文 
    dayCareEmergencyPhoneText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 日照服務車隊 標題 
    dayCareServiceFleetTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 日照服務車隊 內文 
    dayCareServiceFleetText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion
    //#endregion

    //#region 偏鄉資料表單區
    //#region 偏鄉資料表單區容器
    ruralInformationContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // padding: "24px 12px",
                background: "#fff",
                // height: "260px",
                width: "100%",

            }
        }
    },
    //#endregion
    //#region  偏鄉資料 子標題列
    ruralInfBaseSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                padding: "9px 16px",
                background: "#DBE4E8",
                border: 0,
                margin: 0,
                height: "40px"
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "75px",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "22px",
                color: "rgba(0,0,0,0.65)",
                padding: 0,
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "72px",
                height: "32px"
            })
        }
    },
    //#endregion

    //#region 偏鄉居住地址 標題 
    ruralResidentialAddressTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "30%"
        })
    },
    //#endregion
    //#region 偏鄉居住地址 內文 
    ruralResidentialAddressText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "70%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 偏鄉緊急聯絡人姓名 標題 
    ruralEmergencyNameTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 偏鄉緊急聯絡人姓名 內文 
    ruralEmergencyNameText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 偏鄉緊急聯絡人關係 標題 
    ruralEmergencyRelationshipTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 偏鄉緊急聯絡人關係 內文 
    ruralEmergencyRelationshipText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 偏鄉緊急聯絡人手機 標題 
    ruralEmergencyCellPhoneTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 偏鄉緊急聯絡人手機 內文 
    ruralEmergencyCellPhoneText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 偏鄉緊急聯絡人市話 標題 
    ruralEmergencyPhoneTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 偏鄉緊急聯絡人市話 內文 
    ruralEmergencyPhoneText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 偏鄉服務車隊 標題 
    ruralServiceFleetTitle: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%"
        })
    },
    //#endregion
    //#region 偏鄉服務車隊 內文 
    ruralServiceFleetText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            width: "50%",
            textAlign: "right"
        })
    },
    //#endregion
    //#endregion

    //#region 下方按鈕表單表單區容器
    bottomContainer: {
        basic: (style, props) => {
            return {
                ...style,
                display: "inline-block",
                padding: "9px 16px",
                background: "transparent",
                width: "100%",
                textAlign: "right"
            }
        }
    },
    //#endregion
    //#region 註冊共享車隊按鈕
    registeredFleetButton: {
        basic: (style) => ({
            ...style,
            width: "100px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#1890ff",
            backgroundColor: "#fff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: "0 8px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255 ,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion 
    //#region 註冊巴士按鈕
    registeredBusButton: {
        basic: (style) => ({
            ...style,
            width: "88px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#1890ff",
            backgroundColor: "#fff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: 0
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255 ,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

}