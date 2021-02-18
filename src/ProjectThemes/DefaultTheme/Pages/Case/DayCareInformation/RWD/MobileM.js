export default {
    //#region 最外層容器
    outContainer: {
        basic: (style, props) => ({
            ...style,
            height: "100vh"
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
    //#region 上半部容器 
    aboveContainer: {
        basic: (style, props) => ({
            ...style,
            height: "477px"
        })
    },
    //#endregion
    //#region 上半部背景-上半段 
    aboveBgImage: (mobileMbg) => ({
        basic: (style, props) => ({
            ...style,
            backgroundImage: `url(${mobileMbg})`,
            height: "200px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        })
    }),
    //#endregion
    //#region 上半部背景-上半段 
    belowBgImage: (mobileMbg) => ({
        basic: (style, props) => ({
            ...style,
            backgroundImage: `url(${mobileMbg})`,
            height: "277px",
            backgroundPosition: "0% 100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        })
    }),
    //#endregion
    //#region 登入框容器
    loginContainer: {
        basic: (style, props) => ({
            ...style,
            position: "absolute",
            //height: "100%",
            top: 0,
            justifyContent: "center",
            padding: "0 24px"
        })
    },
    //#endregion
    //#region 屏東市政府標題容器
    bigTitleContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            padding: "17px 0 0 24px",
            userSelect: "none",
        })
    },
    //#endregion
    //#region 屏東市政府標題文字
    bigTitleText: {
        basic: (style, props) => ({
            ...style,
            color: "#2f54eb",
            fontSize: "30px",
            fontWeight: "bold",
            display: "inline-block",
            height: "100%",
            lineHeight: "60px",
            userSelect: "none",
            cursor: "default"
        })
    },
    //#endregion
    //#region 屏東市政府標題Logo
    bigTitleLogo: {
        position: "absolute",
        cursor: "default",
        userSelect: "none"
    },
    //#endregion
    //#region 屏東市政府次標題容器
    subTitleContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            padding: "0 0 12px 24px",
            userSelect: "none",
        })
    },
    //#endregion
    //#region 屏東市政府次標題文字
    subTitleText: {
        basic: (style, props) => ({
            ...style,
            color: "#2f54eb",
            fontSize: "14px",
            fontWeight: "bold",
            display: "inline-block",
            height: "22px",
            userSelect: "none",
            cursor: "default"
        })
    },
    //#endregion

    //#region 登入表單 相關樣式
    //#region 登入表單容器
    loginFormContainer: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            width: "100%",
            height: "318px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)",
            borderRadius: "2px"
        })
    },
    //#endregion
    //#region 登入表單標題
    loginFormTitle: {
        basic: (style, props) => ({
            ...style,
            color: "#1890ff",
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
            color: "rgba(0, 0, 0, 0.65)",
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
                    color: (props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => ({
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
            })
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
            color: "#1890ff",
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
            color: "#1890ff",
            cursor: "pointer",
            lineHeight: "22px",
            userSelect: "none"
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
            width: "100%",
            height: "352px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)",
            borderRadius: "2px"
        })
    },
    //#endregion
    //#region 忘記密碼表單標題
    forgetPassFormTitle: {
        basic: (style, props) => ({
            ...style,
            color: "#1890ff",
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
            color: "rgba(0, 0, 0, 0.65)",
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
                    color: (props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => ({
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
            })
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
                border: "1px solid #1890ff",
                color: "#1890ff",
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
            width: "100%",
            height: "288px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)",
            borderRadius: "2px"
        })
    },
    //#endregion
    //#region 設定登入密碼表單標題
    resetPassFormTitle: {
        basic: (style, props) => ({
            ...style,
            color: "#1890ff",
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
            color: "rgba(0, 0, 0, 0.65)",
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
                    color: (props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.65)"
                }
            }
        },
        textInput: {
            basic: (style, props) => ({
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
            })
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
        }
    },
    //#endregion
    //#region 完成按鈕容器
    resetPassFormDoneButtonContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            padding: "0 2px 8px"
        })
    },
    //#endregion
    //#region 完成按鈕
    resetPassFormDoneButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
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
    //#endregion

}