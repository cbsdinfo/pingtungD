export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        laptopLOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "24px 150px" // 標題列的padding
                }
            }
        },
        laptopLOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
                }
            }
        },
        laptopLContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "0 0 188px" //188 是授權圖高度
                }
            }
        },


        laptopOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "24px 150px" // 標題列的padding
                }
            }
        },
        laptopOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
                }
            }
        },
        laptopContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "0 0 188px" //188 是授權圖高度
                }
            }
        },

        tabletOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "24px 150px" // 標題列的padding
                }
            }
        },
        tabletOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
                }
            }
        },
        tabletContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "0 0 188px" //188 是授權圖高度
                }
            }
        },
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
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
                width: "120px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "200px"
            })
        }
    },
    //#endregion

    //#region 標題列 預約訂車分頁
    titleBarCallCarTab: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            margin: "0 16px",
            lineHeight: "32px",
            height: "46px",
            fontSize: "14px",
            cursor: "pointer",
            color: (props.isActive ? "#1890FF" : "rgba(0, 0, 0, 0.65)"),
            borderBottom: (props.isActive ? "solid 2px #1890FF" : "unset")
        }),
    },
    //#endregion



    //#region 標題新增按鈕
    titleAddButton: {
        basic: (style) => ({
            ...style,
            width: "82px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "2px",
            color: "#389e0d",
            borderColor: "#389e0d",
            borderRadius: "2px",
            margin: "0 16px 0 0",
            padding: 0
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(56, 158, 13, 0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 標題新增按鈕 圖標
    titleAddButtonIcon: {
        position: "relative",
        // height: "100%",
        // right: "12px",
        cursor: "pointer",
        top: "2px",
    },
    //#endregion
    //#region 新增彈窗
    //#region Modal 樣式
    addModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "1152px",
                height: "823px"
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
    //#region addFormContainer
    addFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "1104px",
                height: "667px"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: (style, props) => ({
            ...style,
        })
    },
    //#endregion

    //#region 標題編輯按鈕
    titleEditButton: {
        basic: (style) => ({
            ...style,
            width: "82px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            // top: "2px",
            padding: 0,
            color: "#1890FF",
            borderColor: "#1890FF",
            borderRadius: "2px",
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255, 0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 標題編輯按鈕 圖標
    titleEditButtonIcon: {
        position: "relative",
        // height: "100%",
        // right: "12px",
        cursor: "pointer",
        top: "2px",
    },
    //#endregion
    //#region 編輯彈窗
    //#region Modal 樣式
    editModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "1152px",
                height: "823px"
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
        container: {
            basic: (style, props) => ({
                ...style,
                width: "1104px",
                height: "667px"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: (style, props) => ({
            ...style,
        })
    },
    //#endregion

}