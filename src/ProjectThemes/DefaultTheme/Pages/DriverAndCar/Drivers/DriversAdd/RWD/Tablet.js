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
                width: "160px"
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
            width: "74px",
            height: "28px",
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

    //#region 新增頁面表單區容器
    AddPageContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "24px",
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
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "200px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "60px",
                height: "32px"
            })
        }
    },
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
                lineHeight: "28px",
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
            padding: "0px 0px 24px",
            zIndex: 2
        })
    },
    //#endregion

    //#region 上傳司機圖片容器
    driverImgFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "282px",
                display: "inline-block",
                verticalAlign: "top"
            })
        }
    },
    //#endregion
    //#region 上傳司機圖片
    driverImgUpload: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "282px",
                padding: "0 48px 0 0",
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                width: "282px",
                padding: "0 48px 0 0",
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
    },
    //#endregion

    //#region 基本資料右方容器
    baseRightFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "calc( 100% - 282px )",
                display: "inline-block",
                verticalAlign: "top"
            })
        }
    },
    //#endregion

    //#region 姓名 Name
    name: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
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
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "24px"
            })
        }
    },
    //#endregion

    //#region 姓名 Name 上標題 (必填)文字樣式
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

    //#region 性別 Sex 
    sex: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px 0 12px",
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
                height: "24px"
            })
        }
    },
    //#endregion

    //#region 性別 Sex 上標題 (必填)文字樣式
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

    //#region 手機 Cellphone
    cellphone: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
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
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                minHeight: "24px",
                height: "auto",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#ff4d4f"
            })
        }
    },
    //#endregion
    //#region 手機 Cellphone 上標題 (必填)文字樣式
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

    //#region 身分證字號 Uid
    uid: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
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
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px",
                minHeight: "24px",
                height: "auto",
            })
        }
    },
    //#endregion
    //#region 身分證字號 Uid 上標題 (必填)文字樣式
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

    //#region 可否派發 CanAssign
    canAssign: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
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
                // height: "24px",
                minHeight: "24px",
                height: "auto",
            })
        },
    },
    //#endregion
    //#region 可否派發 CanAssign (必填)文字樣式
    canAssignRequired: {
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

    //#region 車行 CarDealership
    carDealership: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
                display: "inline-block",
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
    //#region 車行 CarDealership (必填)文字樣式
    carDealershipRequired: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            color: "#ff4d4f",
            fontSize: "14px",
            lineHeight: "22px"
        })
    },
    //#endregion

    //#region 備註 子標題列
    driverNoteSubTitleBar: {
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
                padding: "0 0 0 0",
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
                // height: "24px",
                minHeight: "24px",
                height: "auto",
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
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
                // height: "24px",
                minHeight: "24px",
                height: "auto",
            })
        }
    },
    //#endregion

    //#region 駕照 子標題列
    driverLicenseSubTitleBar: {
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

    //#region 駕照 List區域
    //#region 駕照 List區域容器
    driverLicenseListContainer: {
        basic: (style, props) => ({
            ...style,
            height: `${props.length * 65 + (props.length === 0 ? 180 : 120)}px`, // 128
            width: "100%",
            // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
        })
    },
    //#endregion
    //#region 駕照到期日 List 標題 (必填)文字樣式
    licenseExpiryDateRequired: {
        basic: (style, props) => ({
            ...style,
            fontSize: "13px",
            lineHeight: "22px",
            color: "#ff4d4f",
            display: "inline-block"
        })
    },
    //#endregion
    //#region 駕照到期日 LicenseExpiryDate
    licenseExpiryDate: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 0 0 0",
                display: "inline-block",
                ...style.occupy(12)
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 0 0 0",
                display: "inline-block",
                ...style.occupy(12)
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
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

    //#region 保險 子標題列
    driverInsuranceSubTitleBar: {
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

    //#region 保險 List區域
    //#region 保險 List區域容器
    driverInsuranceListContainer: {
        basic: (style, props) => ({
            ...style,
            height: `${props.length * 65 + (props.length === 0 ? 180 : 120)}px`, // 128
            width: "100%",
            // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
        })
    },
    //#endregion
    //#region 保險到期日 List 標題 (必填)文字樣式
    insuranceExpiryDateRequired: {
        basic: (style, props) => ({
            ...style,
            fontSize: "13px",
            lineHeight: "22px",
            color: "#ff4d4f",
            display: "inline-block"
        })
    },
    //#endregion
    //#region 保險到期日 insuranceExpiryDate
    insuranceExpiryDate: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 0 0 0",
                display: "inline-block",
                ...style.occupy(12)
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 0 0 0",
                display: "inline-block",
                ...style.occupy(12)
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
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
    //#region 證照 子標題列
    driverCertificateSubTitleBar: {
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

    //#region 證照 List區域
    //#region 證照 List區域容器
    driverCertificateListContainer: {
        basic: (style, props) => ({
            ...style,
            height: "158px",
            width: "100%",
            // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
        })
    },
    //#endregion
    //#region 證照到期日 List 標題 (必填)文字樣式
    certificateExpiryDateRequired: {
        basic: (style, props) => ({
            ...style,
            fontSize: "13px",
            lineHeight: "22px",
            color: "#ff4d4f",
            display: "inline-block"
        })
    },
    //#endregion
    //#region 證照到期日 certificateExpiryDate
    certificateExpiryDate: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 0 0 0",
                display: "inline-block",
                ...style.occupy(12)
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                padding: "0 0 0 0",
                display: "inline-block",
                ...style.occupy(12)
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
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
    //#region 底部儲存按鈕 外層容器
    bottomSaveButtonContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                height: "34px"
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