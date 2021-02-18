export default {
    //#region 最外層容器
    outContainer: {
        basic: (style, props) => ({
            ...style,
            height: "calc( 100vh - 80px )",
            top: "80px",
        })
    },
    //#endregion
    //#region 最外層容器 ScrollBar
    outContainerScrollBar: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            boxSizing: "border-box",
        })
    },
    //#endregion
    //#region 佔位容器 
    place: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            width: "100%",
            minHeight: "768px",
            height: "calc( 100vh - 80px )",
            top: "0",
            background: "#d4d4d4",
        })
    },
    //#endregion

    //#region 右半邊登入容器 
    rightContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            minHeight: "768px",
            // height: "calc( 100vh - 2px )"
            height: "calc( 100vh - 80px )",
            position: "absolute",
            top: 0,
            right: 0
        })
    },
    //#endregion
    //#region 背景
    bgImage: {
        width: "100%",
        height: "100%"
    },
    //#endregion
    //#region 登入框容器
    loginContainer: {
        basic: (style, props) => ({
            ...style,
            position: "absolute",
            height: "100%",
            top: 0,
            justifyContent: "center",
            alignItems: "center",
            padding: "0 64px 0 0px"
        })
    },
    //#endregion

    //#region 登入表單 相關樣式
    //#region 登入頁Logo
    loginFormLogo: {
        position: "relative",
        width: "278px",
        height: "278px",
        top: "-112px",
        left: "-16px"
    },
    //#endregion
    //#region Logo單位名稱
    loginFormLogoName: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "40px",
            color: "rgba(62,185,177,1)",
            position: "absolute",
            top: "35px",
            left: "82px",
            userSelect: "none",
        })
    },
    //#endregion
    //#region Logo單位說明文字
    loginFormLogoNOteText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "8px",
            lineHeight: "40px",
            color: "rgba(62,185,177,1)",
            position: "absolute",
            top: "55px",
            left: "38px",
            userSelect: "none",
        })
    },
    //#endregion
    //#region 登入表單容器
    loginFormContainer: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            //maxWidth: "490px",
            // width: "394px",
            // height: "318px",
            width: "60%",
            height: "auto",
            minHeight: "460px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)",
            borderRadius: "16px"
        })
    },
    //#endregion
    //#region 登入表單標題
    loginFormTitle: {
        basic: (style, props) => ({
            ...style,
            color: "#FF7A45",
            fontSize: "20px",
            fontWeight: "bold",
            display: "block",
            userSelect: "none",
            lineHeight: "28px",
            padding: "24px 24px 0",
            cursor: "default"
        })
    },
    //#endregion
    //#region 登入表單次標題
    loginFormSubTitle: {
        basic: (style, props) => ({
            ...style,
            color: "#FF7A45",
            fontSize: "14px",
            fontWeight: "normal",
            display: "block",
            userSelect: "none",
            lineHeight: "22px",
            padding: "8px 24px 1rem",
            cursor: "default"
        })
    },
    //#endregion
    //#region 登入表單組件
    loginFormFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                height: "fit-content",//"214px",
                padding: "0 24px"
            })
        }
    },
    //#endregion
    //#region 帳號 Account 左方Icon
    loginFormAccountLeftIcon: {
        position: "absolute",
        height: "100%",
        left: "12px",
        cursor: "default",
        pointerEvents: "none",
        top: 0,
    },
    //#endregion
    //#region 帳號 Account
    loginFormAccount: {
        container: {
            basic: (style, props) => ({
                ...style,
                ...style.occupy(12),
                padding: "0 0 12px 0"
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
                //console.log(props)
                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#FF7A45" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => ({
                ...style,
                //#region 當有開啟 openEye 並且 hover 或 focus 時變色
                ...(
                    props.openEye && {
                        border: `1px solid ${(props.focus || props.hover) ? "#FF7A45" : "#d9d9d9"}`,
                        boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(255, 122, 69, 0.2)" : null
                    }
                ),
                //#endregion
                height: "40px"
            }),
            hover: {
                //#region 覆寫樣式
                border: "1px solid #FF7A45",
                //#endregion
            },
            focus: {
                border: "1px solid #FF7A45",
                boxShadow: "0px 0px 0px 2px rgba(255, 122, 69, 0.2)"
            }
        }
    },
    //#endregion
    //#region 密碼 Password 左方Icon
    loginFormPasswordLeftIcon: {
        position: "absolute",
        height: "100%",
        left: "12px",
        cursor: "default",
        pointerEvents: "none",
        top: 0,
    },
    //#endregion
    //#region 密碼 Password
    loginFormPassword: {
        container: {
            basic: (style, props) => ({
                ...style,
                ...style.occupy(12),
                padding: "0 0 12px 0"
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
                    color: (props.focus || props.hover) ? "#FF7A45" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => ({
                ...style,
                //#region 當有開啟 openEye 並且 hover 或 focus 時變色
                ...(
                    props.openEye && {
                        border: `1px solid ${(props.focus || props.hover) ? "#FF7A45" : "#d9d9d9"}`,
                        boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(255, 122, 69, 0.2)" : null
                    }
                ),
                //#endregion
                height: "40px"
            }),
            hover: {
                //#region 覆寫樣式
                border: "1px solid #FF7A45",
                //#endregion
            },
            focus: {
                border: "1px solid #FF7A45",
                boxShadow: "0px 0px 0px 2px rgba(255, 122, 69, 0.2)"
            }
        }
    },
    //#endregion
    //#region 登入按鈕容器
    loginFormLoginButtonContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            padding: "0 2px 8px"
        })
    },
    //#endregion
    //#region 登入按鈕
    loginFormLoginButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                background: "#FF7A45",
                boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
                borderRadius: "2px",
                height: "32px"
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "rgba(255, 122, 69, 0.8)"
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
    //#region 忘記密碼連結容器
    loginFormForgetPassContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            padding: "0 2px 24px"
        })
    },
    //#endregion
    //#region 忘記密碼連結次容器
    loginFormForgetPassSubContainer: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            textAlign: "right",
            fontSize: "14px",
            color: "#ff7a45",
            userSelect: "none"
        })
    },
    //#endregion
    //#region 忘記密碼連結文字
    loginFormForgetPassText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            textAlign: "right",
            fontSize: "14px",
            color: "#ff7a45",
            cursor: "pointer",
            lineHeight: "22px",
            userSelect: "none",
            margin: "0 0 0 8px"
        })
    },
    //#endregion
    //#region 注意事項文字
    loginFormNoteText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.65)",
            padding: "0 0 0 16px",
            userSelect: "none",
        })
    },
    //#endregion
    //#region 注意事項藍標
    loginFormBlueIcon: {
        basic: (style, props) => ({
            ...style,
            width: "8px",
            height: "8px",
            background: "#1890FF",
            display: "inline-block",
            position: "absolute",
            left: 0,
            top: "8px"
        })
    },
    //#endregion
    //#endregion

    //#region 忘記密碼表單 相關樣式
    //#region 忘記密碼表單容器
    forgetPassFormContainer: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            // width: "490px",
            //maxWidth: "490px",
            // height: "320px",
            width: "60%",
            height: "auto",
            // height: "312px",
            minHeight: "460px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)",
            borderRadius: "16px"
        })
    },
    //#endregion
    //#region 忘記密碼表單標題
    forgetPassFormTitle: {
        basic: (style, props) => ({
            ...style,
            color: "#FF7A45",
            fontSize: "20px",
            fontWeight: "bold",
            display: "block",
            userSelect: "none",
            lineHeight: "28px",
            padding: "24px 24px 0",
        })
    },
    //#endregion
    //#region 忘記密碼表單次標題
    forgetPassFormSubTitle: {
        basic: (style, props) => ({
            ...style,
            color: "#FF7A45",
            fontSize: "14px",
            fontWeight: "normal",
            display: "block",
            userSelect: "none",
            lineHeight: "22px",
            padding: "8px 24px 1rem",
        })
    },
    //#endregion
    //#region 忘記密碼表單組件
    forgetPassFormFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                height: "fit-content",//"214px",
                padding: "0 24px"
            })
        }
    },
    //#endregion
    //#region 手機號碼 Phone 左方Icon
    forgetPassFormPhoneLeftIcon: {
        position: "absolute",
        height: "100%",
        left: "12px",
        cursor: "default",
        pointerEvents: "none",
        top: 0,
    },
    //#endregion
    //#region 手機號碼 Phone
    forgetPassFormPhone: {
        container: {
            basic: (style, props) => ({
                ...style,
                ...style.occupy(12),
                padding: "0 0 12px 0"
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
                //console.log(props)
                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#FF7A45" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => ({
                ...style,
                //#region 當有開啟 openEye 並且 hover 或 focus 時變色
                ...(
                    props.openEye && {
                        border: `1px solid ${(props.focus || props.hover) ? "#FF7A45" : "#d9d9d9"}`,
                        boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(255, 122, 69, 0.2)" : null
                    }
                ),
                //#endregion
                height: "40px"
            }),
            hover: {
                //#region 覆寫樣式
                border: "1px solid #FF7A45",
                //#endregion
            },
            focus: {
                border: "1px solid #FF7A45",
                boxShadow: "0px 0px 0px 2px rgba(255, 122, 69, 0.2)"
            }
        }
    },
    //#endregion
    //#region 傳送認證碼按鈕容器
    forgetPassFormSendAuthCodeButtonContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            padding: "0 2px 8px"
        })
    },
    //#endregion
    //#region 傳送認證碼按鈕 (等待倒數中)
    forgetPassFormWaitSecToZeroButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                background: "#f5f5f5",
                boxShadow: null,//"0px 2px 0px rgba(0, 0, 0, 0.043)",
                border: "1px solid #d9d9d9",
                borderRadius: "2px",
                height: "32px"
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "#f5f5f5"
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
    //#region 傳送認證碼按鈕
    forgetPassFormSendAuthCodeButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                background: "#ff7a45",
                boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
                borderRadius: "2px",
                height: "32px"
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "rgba(255, 122, 69, 0.8)"
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
    //#region 驗證碼 AuthCode 左方Icon
    forgetPassFormAuthCodeLeftIcon: {
        position: "absolute",
        height: "100%",
        left: "12px",
        cursor: "default",
        pointerEvents: "none",
        top: 0,
    },
    //#endregion
    //#region 驗證碼 AuthCode
    forgetPassFormAuthCode: {
        container: {
            basic: (style, props) => ({
                ...style,
                ...style.occupy(12),
                padding: "0 0 12px 0"
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
                //console.log(props)
                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#FF7A45" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => ({
                ...style,
                //#region 當有開啟 openEye 並且 hover 或 focus 時變色
                ...(
                    props.openEye && {
                        border: `1px solid ${(props.focus || props.hover) ? "#FF7A45" : "#d9d9d9"}`,
                        boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(255, 122, 69, 0.2)" : null
                    }
                ),
                //#endregion
                height: "40px"
            }),
            hover: {
                //#region 覆寫樣式
                border: "1px solid #FF7A45",
                //#endregion
            },
            focus: {
                border: "1px solid #FF7A45",
                boxShadow: "0px 0px 0px 2px rgba(255, 122, 69, 0.2)"
            }
        }
    },
    //#endregion
    //#region 取消、下一步 表單列容器
    forgetPassFormCancelAndNextButtonFormRow: {
        container: {
            basic: (style, props) => ({
                ...style,
                justifyContent: "space-between"
            })
        }
    },
    //#endregion
    //#region 取消按鈕容器
    forgetPassFormCancelButtonContainer: {
        basic: (style, props) => ({
            ...style,
            maxWidth: "46.6%",
            flexBasis: "46.6%",
            padding: "0 2px 16px"
        })
    },
    //#endregion
    //#region 取消按鈕
    forgetPassFormCancelButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                background: "#ffffff",
                border: "1px solid #d9d9d9",
                borderRadius: "2px",
                height: "32px",
                color: "rgba(0, 0, 0, 0.65)",
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                border: "1px solid #ff7a45",
                color: "#ff7a45",
            })
        },
        text: {
            basic: (style, props) => ({
                ...style,
                color: "inherit",
                fontSize: "14px",
                lineHeight: "32px",
                top: "-3px"
            }),
        }
    },
    //#endregion
    //#region 下一步按鈕容器
    forgetPassFormNextButtonContainer: {
        basic: (style, props) => ({
            ...style,
            maxWidth: "46.6%",
            flexBasis: "46.6%",
            padding: "0 2px 16px"
        })
    },
    //#endregion
    //#region 下一步按鈕
    forgetPassFormNextButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                background: "#ff7a45",
                boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
                borderRadius: "2px",
                height: "32px"
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "rgba(255, 122, 69, 0.8)"
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
    //#region 忘記密碼連結容器
    forgetPassFormForgetPassContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            padding: "0 2px 24px",
            userSelect: "none"
        })
    },
    //#endregion
    //#region 忘記密碼連結文字
    forgetPassFormForgetPassText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontSize: "14px",
            color: "rgba(0, 0, 0, 0.65)",
            cursor: "default",
            lineHeight: "22px",
            userSelect: "none"
        })
    },
    //#endregion
    //#endregion

    //#region 設定登入密碼表單 相關樣式
    //#region 設定登入密碼表單容器
    resetPassFormContainer: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            // width: "490px",
            // height: "282px",
            width: "60%",
            height: "auto",
            // height: "312px",
            minHeight: "460px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)",
            borderRadius: "16px"
        })
    },
    //#endregion
    //#region 設定登入密碼表單標題
    resetPassFormTitle: {
        basic: (style, props) => ({
            ...style,
            color: "#FF7A45",
            fontSize: "20px",
            fontWeight: "bold",
            display: "block",
            userSelect: "none",
            lineHeight: "28px",
            padding: "24px 24px 0",
        })
    },
    //#endregion
    //#region 設定登入密碼表單次標題
    resetPassFormSubTitle: {
        basic: (style, props) => ({
            ...style,
            color: "#FF7A45",
            fontSize: "14px",
            fontWeight: "normal",
            display: "block",
            userSelect: "none",
            lineHeight: "22px",
            padding: "8px 24px 1rem",
        })
    },
    //#endregion
    //#region 設定登入密碼表單組件
    resetPassFormFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                height: "fit-content",//"214px",
                padding: "0 24px"
            })
        }
    },
    //#endregion
    //#region 新密碼 NewPassword 左方Icon
    resetPassFormNewPasswordLeftIcon: {
        position: "absolute",
        height: "100%",
        left: "12px",
        cursor: "default",
        pointerEvents: "none",
        top: 0,
    },
    //#endregion
    //#region 新密碼 NewPassword
    resetPassFormNewPassword: {
        container: {
            basic: (style, props) => ({
                ...style,
                ...style.occupy(12),
                padding: "0 0 12px 0"
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
                //console.log(props)
                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#FF7A45" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => ({
                ...style,
                //#region 當有開啟 openEye 並且 hover 或 focus 時變色
                ...(
                    props.openEye && {
                        border: `1px solid ${(props.focus || props.hover) ? "#FF7A45" : "#d9d9d9"}`,
                        boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(255, 122, 69, 0.2)" : null
                    }
                ),
                //#endregion
                height: "40px"
            }),
            hover: {
                //#region 覆寫樣式
                border: "1px solid #FF7A45",
                //#endregion
            },
            focus: {
                border: "1px solid #FF7A45",
                boxShadow: "0px 0px 0px 2px rgba(255, 122, 69, 0.2)"
            }
        }
    },
    //#endregion
    //#region 確認新密碼 ConfirmPassword 左方Icon
    resetPassFormConfirmPasswordLeftIcon: {
        position: "absolute",
        height: "100%",
        left: "12px",
        cursor: "default",
        pointerEvents: "none",
        top: 0,
    },
    //#endregion
    //#region 確認新密碼 ConfirmPassword
    resetPassFormConfirmPassword: {
        container: {
            basic: (style, props) => ({
                ...style,
                ...style.occupy(12),
                padding: "0 0 12px 0"
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
                //console.log(props)
                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#FF7A45" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => ({
                ...style,
                //#region 當有開啟 openEye 並且 hover 或 focus 時變色
                ...(
                    props.openEye && {
                        border: `1px solid ${(props.focus || props.hover) ? "#FF7A45" : "#d9d9d9"}`,
                        boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(255, 122, 69, 0.2)" : null
                    }
                ),
                //#endregion
                height: "40px"
            }),
            hover: {
                //#region 覆寫樣式
                border: "1px solid #FF7A45",
                //#endregion
            },
            focus: {
                border: "1px solid #FF7A45",
                boxShadow: "0px 0px 0px 2px rgba(255, 122, 69, 0.2)"
            }
        }
    },
    //#endregion
    //#region 完成按鈕容器
    resetPassFormDoneButtonContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            padding: "0 2px 32px"
        })
    },
    //#endregion
    //#region 完成按鈕
    resetPassFormDoneButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                background: "#ff7a45",
                boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
                borderRadius: "2px",
                height: "32px"
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "rgba(255, 122, 69, 0.8)"
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
    //#endregion

    //#region 註冊表單 相關樣式
    //#region 註冊表單容器
    singUpFormContainer: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            // width: "490px",
            // height: "282px",
            width: "60%",
            height: "auto",
            // height: "312px",
            minHeight: "460px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)",
            borderRadius: "16px"
        })
    },
    //#endregion
    //#region 註冊表單標題
    singUpFormTitle: {
        basic: (style, props) => ({
            ...style,
            color: "#FF7A45",
            fontSize: "20px",
            fontWeight: "bold",
            display: "block",
            userSelect: "none",
            lineHeight: "28px",
            padding: "32px 48px 0",
        })
    },
    //#endregion
    //#region 註冊表單次標題
    singUpFormSubTitle: {
        basic: (style, props) => ({
            ...style,
            color: "#FF7A45",
            fontSize: "14px",
            fontWeight: "normal",
            display: "block",
            userSelect: "none",
            lineHeight: "22px",
            padding: "8px 48px 1rem",
        })
    },
    //#endregion
    //#region 註冊表單組件
    singUpFormFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                height: "fit-content",//"214px",
                padding: "0 48px"
            })
        }
    },
    //#endregion
    //#region 姓名 UserName
    singUpFormUserName: {
        container: {
            basic: (style, props) => ({
                ...style,
                ...style.occupy(6),
                padding: "0 6px 12px 0"
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        textInputContainer: {
            basic: (style, props) => {
                //console.log(props)
                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#FF7A45" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => ({
                ...style,
                //#region 當有開啟 openEye 並且 hover 或 focus 時變色
                ...(
                    props.openEye && {
                        border: `1px solid ${(props.focus || props.hover) ? "#FF7A45" : "#d9d9d9"}`,
                        boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(255, 122, 69, 0.2)" : null
                    }
                ),
                //#endregion
                height: "32px"
            }),
            hover: {
                //#region 覆寫樣式
                border: "1px solid #FF7A45",
                //#endregion
            },
            focus: {
                border: "1px solid #FF7A45",
                boxShadow: "0px 0px 0px 2px rgba(255, 122, 69, 0.2)"
            }
        }
    },
    //#endregion
    //#region 姓名 UserName 上標題 (必填)文字樣式
    singUpFormUserNameRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion
    //#region 電話 UserPhone
    singUpFormUserPhone: {
        container: {
            basic: (style, props) => ({
                ...style,
                ...style.occupy(6),
                padding: "0 0 12px 6px"
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        textInputContainer: {
            basic: (style, props) => {
                //console.log(props)
                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#FF7A45" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => ({
                ...style,
                //#region 當有開啟 openEye 並且 hover 或 focus 時變色
                ...(
                    props.openEye && {
                        border: `1px solid ${(props.focus || props.hover) ? "#FF7A45" : "#d9d9d9"}`,
                        boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(255, 122, 69, 0.2)" : null
                    }
                ),
                //#endregion
                height: "32px"
            }),
            hover: {
                //#region 覆寫樣式
                border: "1px solid #FF7A45",
                //#endregion
            },
            focus: {
                border: "1px solid #FF7A45",
                boxShadow: "0px 0px 0px 2px rgba(255, 122, 69, 0.2)"
            }
        }
    },
    //#endregion
    //#region 電話 UserPhone 上標題 (必填)文字樣式
    singUpFormUserPhoneRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion
    //#region 生日 UserBirthday
    singUpFormUserBirthday: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 6px 12px 0",
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
                padding: "0 6px 12px 0",
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
                    color: (props.focus || props.hover) ? "#FF7A45" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        dateTimePickerSubContainer: {
            basic: (style, props) => ({
                ...style,
                height: "32px",
                color: (props.focus || props.hover) ? "#FF7A45" : "rgba(0, 0, 0, 0.65)"
            }),
            hover: {
                //#region 覆寫樣式
                border: "1px solid #FF7A45",
                //#endregion
            },
            focus: {
                border: "1px solid #FF7A45",
                boxShadow: "0px 0px 0px 2px rgba(255, 122, 69, 0.2)"
            }
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                // minHeight: "24px",
                height: "0px"
            })
        }
    },
    //#endregion
    //#region 生日 UserBirthday 上標題 (必填)文字樣式
    singUpFormUserBirthdayRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion
    //#region 性別 UserSex
    singUpFormUserSex: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 12px 6px",
                //display: "inline-block",
                ...style.occupy(6)
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
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
                padding: "0 0 12px 6px",
                //display: "inline-block",
                ...style.occupy(6),
                // maxWidth: "calc( 25% - 6px )",
                // flexBasis: "calc( 25% - 6px )",
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
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                // minHeight: "24px",
                height: "0px"
            })
        }
    },
    //#endregion
    //#region 性別 UserSex 上標題 (必填)文字樣式
    singUpFormUserSexRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion
    //#region 身分證字號 UserUid
    singUpFormUserUid: {
        container: {
            basic: (style, props) => ({
                ...style,
                ...style.occupy(6),
                padding: "0 6px 12px 0"
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        textInputContainer: {
            basic: (style, props) => {
                //console.log(props)
                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#FF7A45" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => ({
                ...style,
                //#region 當有開啟 openEye 並且 hover 或 focus 時變色
                ...(
                    props.openEye && {
                        border: `1px solid ${(props.focus || props.hover) ? "#FF7A45" : "#d9d9d9"}`,
                        boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(255, 122, 69, 0.2)" : null
                    }
                ),
                //#endregion
                height: "32px"
            }),
            hover: {
                //#region 覆寫樣式
                border: "1px solid #FF7A45",
                //#endregion
            },
            focus: {
                border: "1px solid #FF7A45",
                boxShadow: "0px 0px 0px 2px rgba(255, 122, 69, 0.2)"
            }
        }
    },
    //#endregion
    //#region 身分證字號 UserUid 上標題 (必填)文字樣式
    singUpFormUserUidRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion
    //#region 悠遊卡/一卡通卡號 UserCardNo
    singUpFormUserCardNo: {
        container: {
            basic: (style, props) => ({
                ...style,
                ...style.occupy(6),
                padding: "0 0 12px 6px"
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
                overflow: "hidden"
            })
        },
        textInputContainer: {
            basic: (style, props) => {
                //console.log(props)
                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#FF7A45" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => ({
                ...style,
                //#region 當有開啟 openEye 並且 hover 或 focus 時變色
                ...(
                    props.openEye && {
                        border: `1px solid ${(props.focus || props.hover) ? "#FF7A45" : "#d9d9d9"}`,
                        boxShadow: (props.focus) ? "0px 0px 0px 2px rgba(255, 122, 69, 0.2)" : null
                    }
                ),
                //#endregion
                height: "32px"
            }),
            hover: {
                //#region 覆寫樣式
                border: "1px solid #FF7A45",
                //#endregion
            },
            focus: {
                border: "1px solid #FF7A45",
                boxShadow: "0px 0px 0px 2px rgba(255, 122, 69, 0.2)"
            }
        }
    },
    //#endregion
    //#region 悠遊卡/一卡通卡號 UserCardNo 上標題 (必填)文字樣式
    singUpFormUserCardNoRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion
    //#region 無卡註冊 UserNoCardNO
    userNoCardNO: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                display: "inline-block",
                // ...style.occupy(6),
                position: "absolute",
                right: "-8px",
                top: "-4px"
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
                // height: "28px",
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
                // minHeight: "16px",
                // height: "auto"
            })
        }
    },
    //#endregion
    //#region 居住地(縣市) County
    userCounty: {
        container: {
            basic: (style, props) => ({
                ...style,
                ...style.occupy(6),
                padding: "0 6px 12px 0"
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        selectorContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#FF7A45" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        selectorSubContainer: {
            basic: (style, props) => ({
                ...style,
                height: "32px",
                paddingTop: "2px",
                color: (props.focus || props.hover) ? "#FF7A45" : "rgba(0, 0, 0, 0.65)"
            }),
            hover: {
                //#region 覆寫樣式
                border: "1px solid #FF7A45",
                //#endregion
            },
            focus: {
                border: "1px solid #FF7A45",
                boxShadow: "0px 0px 0px 2px rgba(255, 122, 69, 0.2)"
            },
            icon: (style, props) => {
                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#FF7A45 !important" : "rgb(217, 217, 217) !important"
                }
            }
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                // minHeight: "24px",
                height: "0px"
            })
        }
    },
    //#endregion
    //#region 居住地(縣市) County 上標題 (必填)文字樣式
    userCountyRequired: {
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
    userDistrict: {
        container: {
            basic: (style, props) => ({
                ...style,
                ...style.occupy(6),
                padding: "0 0 12px 6px"
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
        selectorSubContainer: {
            basic: (style, props) => ({
                ...style,
                height: "32px",
                paddingTop: "2px"
            }),
            hover: {
                //#region 覆寫樣式
                border: "1px solid #FF7A45",
                //#endregion
            },
            focus: {
                border: "1px solid #FF7A45",
                boxShadow: "0px 0px 0px 2px rgba(255, 122, 69, 0.2)"
            },
            icon: (style, props) => {
                return {
                    ...style,
                    color: (props.focus || props.hover) ? "#FF7A45 !important" : "rgb(217, 217, 217) !important"
                }
            }
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                // minHeight: "24px",
                height: "0px"
            })
        }
    },
    //#endregion
    //#region 通訊地址 UserAddr
    singUpFormUserAddr: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 0 12px 0",
                ...style.occupy(12),
                // maxWidth: "calc( 33.33% - 4px )",
                // flexBasis: "calc( 33.33% - 4px )",
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 0 12px 0",
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
                border: "1px solid #FF7A45",
                //#endregion
            },
            focus: {
                border: "1px solid #FF7A45",
                boxShadow: "0px 0px 0px 2px rgba(255, 122, 69, 0.2)"
            }
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
                // height: "24px"
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
    //#region 完成按鈕容器
    singUpFormDoneButtonContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            padding: "0 2px 8px"
        })
    },
    //#endregion
    //#region 完成按鈕
    singUpFormDoneButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                background: "#ff7a45",
                boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
                borderRadius: "2px",
                height: "32px"
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "rgba(255, 122, 69, 0.8)"
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
    //#region 忘記密碼連結容器
    loginFormHaveAccountContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            padding: "0 2px 32px"
        })
    },
    //#endregion
    //#region 忘記密碼連結次容器
    loginFormHaveAccountSubContainer: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            textAlign: "right",
            fontSize: "14px",
            color: "#ff7a45",
            userSelect: "none"
        })
    },
    //#endregion
    //#region 已有帳號？文字
    loginFormForgetHaveAccount: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            textAlign: "right",
            fontSize: "14px",
            color: "rgba(0,0,0,0.65)",
            cursor: "default",
            lineHeight: "22px",
            userSelect: "none",
            margin: "0 8px 0 0"
        })
    },
    //#endregion
    //#region 登入連結文字
    loginFormToLoginText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            textAlign: "right",
            fontSize: "14px",
            color: "#ff7a45",
            cursor: "pointer",
            lineHeight: "22px",
            userSelect: "none",
            margin: "0 0 0 0"
        })
    },
    //#endregion
    //#endregion

}