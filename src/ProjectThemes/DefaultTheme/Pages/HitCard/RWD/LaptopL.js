export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        laptopLOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "12px 0 0 0" // 標題列的padding
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
                    backgroundColor: "#DBE4E8",
                    padding: "0 150px 236px 150px",
                    minHeight: "calc( 100vh - 184px )"
                }
            }
        },
        laptopOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "12px 0 0 0" // 標題列的padding
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
                    backgroundColor: "#DBE4E8",
                    padding: "0 48px 204px 48px", //188 是授權圖高度
                    minHeight: "calc( 100vh - 164px )"
                }
            }
        },

        tabletOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "12px 0 0 0" // 標題列的padding
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
                    backgroundColor: "#DBE4E8",
                    padding: "0 24px 204px 24px" //188 是授權圖高度
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
        basic: (style, props) => ({
            ...style,
            width: "236px",
            height: "40px",
            backgroundColor: "#FFF",
            margin: "0 24px 16px"
        })
    },
    //#endregion

    titleText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            color: "#00628F",
            width: "100%",
            textAlign: "center",
            boxShadow: "inset 8px 0px #4DB8BE",
            top: "4px"
        })
    },

    //#region 分頁底色
    whiteContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "72px",
            backgroundColor: "#FFFFFF"
        }),
    },
    //#endregion

    //#region 分頁容器
    tabsContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "56px",
            backgroundColor: "#6A7987"
        }),
    },
    //#endregion

    //#region 標題列 預約訂車分頁
    titleBarCallCarTab: {
        basic: (style, props) => ({
            ...style,
            display: "inline-grid",
            margin: (props.isActive ? 0 : "0 1px 0 0"),
            lineHeight: "32px",
            height: (props.isActive ? "56px" : "100%"),
            fontSize: "14px",
            cursor: "pointer",
            width: "160px",
            color: (props.isActive ? "rgba(0, 0, 0, 0.85)" : "#FFFFFF"),
            boxShadow: (props.isActive ? "inset 0px 8px 0px #1890FF" : ""),
            // borderTop: (props.isActive ? "solid 8px #1890FF" : "unset"),
            backgroundColor: (props.isActive ? "#FFFFFF" : "#9DADBE"),
            textAlign: "center",
            alignItems: "center"
        }),
    },
    //#endregion

    //#region 詳細資料外側容器
    detailOutContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            minHeight: `calc( ${props.height}px - 240px )`,
            margin: "60px 0 0",
            textAlign: "right"
        }),
        laptopL: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                minHeight: `calc( ${props.height}px - 292px )`,
                margin: "60px 0 0",
                textAlign: "right"
            }),
        }
    },
    //#endregion

    //#region 詳細資料容器
    detailContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            padding: "24px",
            backgroundColor: "#fff",
            borderRadius: "8px",
        }),
    },
    //#endregion

    //#region 詳細資料 標題
    detailHeader: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "28px",
            boxShadow: "inset 0px -1px #D9D9D9",
            color: "#00628F",
            padding: "0 0 16px",
            wordBreak: "break-all"
        }),
    },
    //#endregion

    //#region 詳細資料 內文
    newsEditor: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        viewTypeTextEditorContainer: {
            basic: (style, props) => ({
                ...style,
                height: "auto"
            })
        },
        viewTypeTextEditor: {
            basic: (style, props) => ({
                ...style,
                height: "auto",
                wordBreak: "break-all"
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 24px 0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        textEditor: {
            basic: (style, props) => ({
                ...style,
                height: "500px",
            })
        },
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
            top: "2px",
            padding: 0,
            color: "#1890ff",
            backgroundColor: "#fff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            margin: "16px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24,144,255,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
}