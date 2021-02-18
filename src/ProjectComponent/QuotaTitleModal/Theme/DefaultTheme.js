export default {
    //#region 可用額度彈窗 
    //#region Modal 樣式
    quotaModal: {
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
                width: "720px",
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

    //#region 可用額度表單容器
    quotaFormContainer: {
        contentContainer: (style, props) => ({
            ...style,
        })
    },
    //#endregion

    //#region 使用額度容器 UsedQuota
    usedQuota: {
        basic: (style, props) => ({
            ...style,
            padding: "12px",
            // margin: "4px",
            display: "inline-block",
            width: "140px"
        })
    },
    //#endregion
    //#region 使用額度 標題
    usedQuotaTitle: {
        basic: (style, props) => ({
            ...style, marginBottom: "8px"
        })
    },
    //#endregion
    //#region 剩餘餘額容器 RemainAmt
    remainAmt: {
        basic: (style, props) => ({
            ...style,
            padding: "12px",
            // margin: "4px",
            display: "inline-block",
            width: "140px"
        })
    },
    //#endregion
    //#region 剩餘餘額容器 標題
    remainAmtTitle: {
        basic: (style, props) => ({
            ...style, marginBottom: "8px"
        })
    },
    //#endregion
    //#region 本月可用額度容器 CanUseQuota
    canUseQuota: {
        basic: (style, props) => ({
            ...style,
            padding: "12px",
            // margin: "4px",
            display: "inline-block",
            width: "170px"
        })
    },
    //#endregion
    //#region 本月可用額度容器 標題
    canUseQuotaTitle: {
        basic: (style, props) => ({
            ...style, marginBottom: "8px"
        })
    },
    //#endregion

    //#region 可用額度 - 名稱 NewQuata 
    newQuata: {
        //#region viewType
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "12px",
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
                padding: "12px",
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

    //#region 可用額度彈窗 Table容器
    modalTableContainer: {
        basic: (style, props) => ({
            ...style,
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "100%",
            padding: "12px",
            //#endregion
        }),
    },
    //#endregion

    //#endregion

}
