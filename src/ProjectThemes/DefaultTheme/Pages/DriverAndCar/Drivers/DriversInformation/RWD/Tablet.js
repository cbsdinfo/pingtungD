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
                width: "160px",
                height: "32px"
            })
        }
    },
    //#endregion
    //#region 列印按鈕
    printButton: {
        basic: (style) => ({
            ...style,
            width: "60px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            margin: "0 16px 0 0",
            color: "rgba(0, 0, 0, 0.65)",
            backgroundColor: "#fff",
            borderColor: "#d9d9d9",
            borderRadius: "2px",
            // margin: "0 16px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            color: "#1890ff",
            borderColor: "#1890ff",
            backgroundColor: "#fff"
        }),
        focus: (style, props) => ({})
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

    //#region 頁面 基本資料、備註 表單區容器
    BaseAndNoteContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "24px",
                margin: "4px 0 24px",
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
                width: "268px",
                height: "32px"
            })
        }
    },
    //#endregion
    //#region 查看打卡記錄按鈕
    clockInButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "116px",
                background: "#1890ff",
                boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
                borderRadius: "2px",
                height: "32px",
                margin: "0 16px 0 0"
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

    //#region 打卡記錄彈窗 區域
    //#region 打卡記錄彈窗
    clockInModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "468px"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "24px 0",
                height: "496px",
                zIndex: 100
            }),
        }
    },
    //#endregion
    //#region 打卡記錄彈窗 Content ScrollBar
    clockInModalContentScrollBar: {
        basic: {
            maxHeight: "100%",
            maxWidth: "100%",
            height: "100%",
            width: "100%"
        },
        scrollbarTrackX: {
            height: "8px",
            display: "block"
        },
        scrollbarThumbX: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear"
        },
        scrollbarTrackY: {
            //right:"8px", // nested
            width: "8px",
            display: "block"
        },
        scrollbarThumbY: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear",
            right: "0px",
            left: "0px"
        }
    },
    //#endregion
    //#region 打卡記錄彈窗 ScrollBar 下容器
    clockInModalMainContent: {
        basic: (style, props) => ({
            ...style,
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "100%",
            padding: "0 24px",
            //#endregion
        }),
    },
    //#endregion
    //#endregion

    //#region 編輯司機資料按鈕
    toEditButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "108px",
                background: "#fff",
                boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
                borderRadius: "2px",
                height: "32px",
                color: "#1890ff",
                margin: "0 0 0 24px"
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "#fff"
            })
        },
        text: {
            basic: (style, props) => ({
                ...style,
                fontSize: "18px",
                lineHeight: "32px",
                fontWeight: 500,
                top: "-3px"
            }),
        }
    },
    //#endregion 
    //#region 編輯司機資料 icon
    toEditButtonIcon: {
        position: "absolute",
        height: "18px",
        top: "7px",
        left: "-24",
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
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                width: "282px",
                padding: "0 48px 0 0",
            })
        },
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
        uploadImgContainer: {
            basic: (style, props) => ({
                ...style,
                display: props.hover ? "block" : "none"
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
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                display: "inline-block",
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
                // height: "24px"
                minHeight: "24px",
                height: "auto"
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

    //#region 身分證字號 Uid
    uid: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                //display: "inline-block",
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
                height: "auto"
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

    //#region 性別 Sex 
    sex: {
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
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                display: "inline-block",
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

    //#region 基本資料右方容器 下方容器
    baseRightSecondFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                zIndex: 2
            })
        },
    },
    //#endregion
    //#region 可否派發 CanAssign
    canAssign: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                display: "inline-block",
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

    //#region 車行 carDealership
    carDealership: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                display: "inline-block",
                ...style.occupy(12)
            })
        },
        viewTypeBottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px",
                minHeight: "24px",
                height: "auto",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#ff4d4f"
            })
        },
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
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px",
                minHeight: "24px",
                height: "auto",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#ff4d4f"
            })
        }
    },
    //#endregion

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
                // height: "24px"
                minHeight: "24px",
                height: "auto"
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
                // height: "24px"
                minHeight: "24px",
                height: "auto"
            })
        }
    },
    //#endregion

    //#endregion

    //#region 頁面 資訊卡片 區容器
    infoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0",
                margin: "0 0 24px",
                height: "auto"
            }
        }
    },
    //#endregion

    //#region 總趟次資訊卡片 容器
    totalInfoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0 12px 0 0",
                height: "auto",
                width: "calc( 20% - 7.2px )",
                maxWidth: "calc( 20% - 7.2px )",
                flexBasis: "calc( 20% - 7.2px )",
            }
        }
    },
    //#endregion
    //#region 總趟次資訊卡片 icon
    totalInfoCardIcon: {
        height: "40px",
        width: "40px",
        color: "#ff7a45"
    },
    //#endregion
    //#region 總趟次資訊卡片 
    totalInfoCard: {
        container: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "24px 0",
                }
            }
        },
        iconContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    height: "40px",
                }
            }
        },
        centerText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "20px",
                    height: "28px",
                    lineHeight: "28px"
                }
            }
        },
        bottomText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "24px",
                    height: "32px",
                    lineHeight: "32px"
                }
            }
        },
    },
    //#endregion

    //#region 已完成資訊卡片 容器
    doneInfoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0 12px",
                height: "auto",
                width: "calc( 20% + 4.8px )",
                maxWidth: "calc( 20% + 4.8px )",
                flexBasis: "calc( 20% + 4.8px )",
            }
        }
    },
    //#endregion
    //#region 已完成資訊卡片 icon
    doneInfoCardIcon: {
        height: "40px",
        width: "40px",
        color: "#ff7a45"
    },
    //#endregion
    //#region 已完成資訊卡片 
    doneInfoCard: {
        container: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "24px 0",
                }
            }
        },
        iconContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    height: "40px",
                }
            }
        },
        centerText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "20px",
                    height: "28px",
                    lineHeight: "28px"
                }
            }
        },
        bottomText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "24px",
                    height: "32px",
                    lineHeight: "32px"
                }
            }
        },
    },
    //#endregion

    //#region 空趟資訊卡片 容器
    emptyInfoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0 12px",
                height: "auto",
                width: "calc( 20% + 4.8px )",
                maxWidth: "calc( 20% + 4.8px )",
                flexBasis: "calc( 20% + 4.8px )",
            }
        }
    },
    //#endregion  
    //#region 空趟資訊卡片 icon
    emptyInfoCardIcon: {
        height: "40px",
        width: "40px",
        color: "#ff7a45"
    },
    //#endregion 
    //#region 空趟資訊卡片 
    emptyInfoCard: {
        container: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "24px 0",
                }
            }
        },
        iconContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    height: "40px",
                }
            }
        },
        centerText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "20px",
                    height: "28px",
                    lineHeight: "28px"
                }
            }
        },
        bottomText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "24px",
                    height: "32px",
                    lineHeight: "32px"
                }
            }
        },
    },
    //#endregion

    //#region 未執行資訊卡片 容器
    noDoInfoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0 12px",
                height: "auto",
                width: "calc( 20% + 4.8px )",
                maxWidth: "calc( 20% + 4.8px )",
                flexBasis: "calc( 20% + 4.8px )",
            }
        }
    },
    //#endregion
    //#region 未執行資訊卡片 icon
    noDoInfoCardIcon: {
        height: "40px",
        width: "40px",
        color: "#ff7a45"
    },
    //#endregion 
    //#region 未執行資訊卡片 
    noDoInfoCard: {
        container: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "24px 0",
                }
            }
        },
        iconContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    height: "40px",
                }
            }
        },
        centerText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "20px",
                    height: "28px",
                    lineHeight: "28px"
                }
            }
        },
        bottomText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "24px",
                    height: "32px",
                    lineHeight: "32px"
                }
            }
        },
    },
    //#endregion

    //#region 達成率資訊卡片 容器
    rateInfoCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "0 0 0 12px",
                height: "auto",
                width: "calc( 20% - 7.2px )",
                maxWidth: "calc( 20% - 7.2px )",
                flexBasis: "calc( 20% - 7.2px )",
            }
        }
    },
    //#endregion
    //#region 達成率資訊卡片 icon
    rateInfoCardIcon: {
        height: "40px",
        width: "40px",
        color: "#ff7a45"
    },
    //#endregion 
    //#region 達成率資訊卡片 
    rateInfoCard: {
        container: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "24px 0",
                }
            }
        },
        iconContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    height: "40px",
                }
            }
        },
        centerText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "20px",
                    height: "28px",
                    lineHeight: "28px"
                }
            }
        },
        bottomText: {
            basic: (style, props) => {
                return {
                    ...style,
                    fontSize: "24px",
                    height: "32px",
                    lineHeight: "32px"
                }
            }
        },
    },
    //#endregion

    //#region 頁面 證照 表單區容器
    licenseContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "24px",
                margin: "0 0 24px",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: "auto"
            }
        }
    },
    //#endregion

    //#region 證照 子標題列
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

    //#region 證照 List區域
    //#region 證照 List區域容器
    driverLicenseListContainer: {
        basic: (style, props) => ({
            ...style,
            height: `${props.length * 65 + (props.length === 0 ? 180 : 120)}px`, // 128
            width: "100%",
            // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
        })
    },
    //#endregion
    //#region 證照到期日 List 標題 (必填)文字樣式
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
    //#region 證照到期日 LicenseExpiryDate
    licenseExpiryDate: {

        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                // padding: "0 0 0 12px",
                display: "inline-block",
                ...style.occupy(12)
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                // padding: "0 0 0 12px",
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
    //#endregion

    //#region 頁面 保險 表單區容器
    insuranceContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "24px",
                margin: "0 0 24px",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: "auto"
            }
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
                // padding: "0 0 0 12px",
                display: "inline-block",
                ...style.occupy(12)
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                //left:"-8px",
                // padding: "0 0 0 12px",
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
    //#endregion

}