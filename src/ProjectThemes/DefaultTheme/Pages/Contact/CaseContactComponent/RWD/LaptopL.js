export default {
    //#region 無資料表單區容器
    noDataContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // padding: "24px 12px",
                margin: 0,
                background: "transparent",
                // boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: `calc( ${props.height}px - 452px)`,
                width: "100%",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }
        }
    },
    //#endregion

    //#region 關鍵字 Keyword
    keyword: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 16px 0 0",
                display: "inline-block",
                position: "absolute",
                top: "16px",
                right: "16px"
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
        right: "8px",
        cursor: "pointer",
        top: 0,
    },
    //#endregion

    //#region 卡片資料外層容器
    cardOutContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(6),
            display: "inline-block",
            padding: "8px",
            height: "auto",
        }),
        laptop: {
            basic: (style, props) => ({
                ...style,
                ...style.occupy(12),
                display: "inline-block",
                padding: "8px",
            })
        },
    },
    //#endregion

    //#region 卡片資料表單區容器
    cardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                display: "inline-block",
                padding: "24px",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                // height: "298px",
                width: "100%",
                borderRadius: "16px"
            }
        }
    },
    //#endregion

    //#region 公司
    //#region 公司 容器
    companyContainer: {
        basic: (style, props) => {
            return {
                ...style,
                width: "100%",
                display: "inline-block",
                boxShadow: "inset 0 -1px #D9D9D9",
                padding: "0 0 12px"
            }
        }
    },
    //#endregion

    //#region 公司名稱
    companyName: {
        basic: (style, props) => ({
            ...style,
            // height: "24px",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "24px",
            color: "rgba(0, 0, 0, 0.85)",
            margin: "0 0 12px"
        })
    },
    //#endregion

    //#region 公司電話
    companyPhone: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            position: "relative",
            height: "22px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            padding: "0 0 0 24px",
            width: "50%"
        })
    },
    //#endregion
    //#region 公司電話 左方圖標
    phoneSvg: {
        position: "absolute",
        top: "4px",
        left: 0
    },
    //#endregion

    //#region 提醒 
    tip: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#FF7A45",
            width: "100%",
            margin: "8px 0 0"
        }),
        laptop: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                height: "22px",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "22px",
                color: "#FF7A45",
                width: "50%",
                textAlign: "right"
            })
        }
    },
    //#endregion
    //#endregion

    //#region 車趟服務時間
    //#region 車趟服務時間 容器
    carServiceTimeContainer: {
        basic: (style, props) => {
            return {
                ...style,
                width: "100%",
                margin: "16px 0 0",
                display: "block"
            }
        },
        laptop: {
            basic: (style, props) => {
                return {
                    ...style,
                    width: "100%",
                    margin: "16px 0 0",
                    // height: "140px"
                }
            },
        }
    },
    //#endregion
    //#region 車趟服務時間 標題
    carServiceTimeTitle: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#1890FF",
            margin: "0 12px 0 0"
        })
    },
    //#endregion

    //#region 車趟服務時間 星期 
    carServiceWeekText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "50%",
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 8px 0"
        }),
        laptop: {
            basic: (style, props) => ({
                ...style,
                height: "22px",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "22px",
                color: "rgba(0,0,0,0.85)",
                margin: "0 12px"
            }),
        }
    },
    //#endregion

    //#region 車趟服務時間 時段 
    carServiceTimeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "22px",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "18px",
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 0 4px"
        })
    },
    //#endregion
    //#endregion

    //#region 客服服務時間
    //#region 客服服務時間 容器
    customerServiceTimeContainer: {
        basic: (style, props) => {
            return {
                ...style,
                width: "100%",
                margin: "16px 0 0",
                display: "block"
            }
        },
        laptop: {
            basic: (style, props) => {
                return {
                    ...style,
                    width: "100%",
                    margin: "16px 0 0",
                    // height: "140px"
                }
            },
        }
    },
    //#endregion
    //#region 客服服務時間
    customerServiceTime: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#1890FF",
            margin: "0 12px 0 0"
        })
    },
    //#endregion
    //#region 客服服務時間 星期 
    customerServiceWeekText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "50%",
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 8px 0"
        }),
        laptop: {
            basic: (style, props) => ({
                ...style,
                height: "22px",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "22px",
                color: "rgba(0,0,0,0.85)",
                margin: "0 12px"
            }),
        }
    },
    //#endregion

    //#region 客服服務時間 時段 
    customerServiceTimeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "22px",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "18px",
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 0 4px"
        })
    },
    //#endregion

    //#endregion

    //#endregion
}
