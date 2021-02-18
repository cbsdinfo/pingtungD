export default {
    //#region 無資料表單區容器
    noDataContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // background: "#fff",
                // boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: `calc(  ${props.height}px - 204px)`,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }
        }
    },
    //#endregion


    //#region 資料外框容器
    outsideContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            backgroundColor: "#fff",
            boxShadow: "inset 0px -1px 0px #DBE4E8"
        })
    },
    //#endregion

    //#region 路線名稱
    //#region 路線欄位 容器
    routeContainer: {
        basic: (style, props) => ({
            ...style,
            textAlign: "center",
            padding: "8px 16px"
        })
    },
    //#endregion

    //#region 快速叫車 身份 Tag 區域
    fastCallCarIdentityTag: {
        //#region Tag樣式
        //#region 長照
        case: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    position: "absolute",
                    margin: "0 0 0 0",
                    top: "8px",
                    left: "16px",
                    padding: "0px 7px",
                    fontSize: "12px",
                    lineHeight: "20px",
                    color: "#EF6C00",
                    backgroundColor: "#FFF3E0",
                    borderColor: "#FF9800"
                }),
                hover: {}
            }
        },
        //#endregion
        //#region 共享車隊
        white: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    position: "absolute",
                    margin: "0 0 0 0",
                    top: "8px",
                    left: "16px",
                    padding: "0px 7px",
                    fontSize: "12px",
                    lineHeight: "20px",
                    color: "#558B2F",
                    backgroundColor: "#E8F5E9",
                    borderColor: "#4CAF50"

                }),
                hover: {}
            }
        },
        //#endregion
        //#region 巴士
        bus: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    position: "absolute",
                    margin: "0 0 0 0",
                    top: "8px",
                    left: "16px",
                    padding: "0px 7px",
                    fontSize: "12px",
                    lineHeight: "20px",
                    color: "#00838F",
                    backgroundColor: "#E0F7FA",
                    borderColor: "#00838F"

                }),
                hover: {}
            }
        },
        //#endregion  
        //#region 無此身份
        unknown: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    position: "absolute",
                    margin: "0 0 0 0",
                    top: "8px",
                    left: "16px",
                    padding: "0px 7px",
                    fontSize: "12px",
                    lineHeight: "20px",
                    // color: "#2F54EB",
                    // backgroundColor: "#F0F5FF",
                    // borderColor: "#ADC6FF"

                }),
                hover: {}
            }
        },
        //#endregion      
        //#endregion
    },
    //#endregion

    //#region 路線名稱 標題 
    routeTitle: {
        basic: (style, props) => ({
            ...style,
            textAlign: "center",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "18px",
            color: "rgba(0,0,0,0.45)"
        })
    },
    //#endregion
    //#region 路線名稱 內文 
    routeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.65)",
            marginLeft: "8px"
        })
    },
    //#endregion
    //#endregion

    //#region 起訖點
    //#region 起訖點 容器
    startToEndContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "8px 16px",
            backgroundColor: "#F5F5F5"
        })
    },
    //#endregion

    //#region 起點
    startText: {
        basic: (style, props) => ({
            ...style,
            position: "relative",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            paddingLeft: "16px",
            color: "rgba(0,0,0,0.65)"
        })
    },
    //#endregion
    //#region 起點圖標
    startSvg: {
        position: "absolute",
        top: "6px",
        left: 0
    },
    //#endregion

    //#region 迄點
    endText: {
        basic: (style, props) => ({
            ...style,
            position: "relative",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            paddingLeft: "16px",
            color: "rgba(0,0,0,0.65)"
        })
    },
    //#endregion
    //#region 迄點圖標
    endSvg: {
        position: "absolute",
        top: "6px",
        left: 0
    },
    //#endregion
    //#endregion

    //#region 按鈕
    //#region 按鈕容器
    buttonContainer: {
        basic: (style, props) => ({
            ...style,
            textAlign: "center",
            padding: "8px 0"
        })
    },
    //#endregion

    //#region 預約訂車按鈕
    callCarButton: {
        basic: (style) => ({
            ...style,
            width: "86px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#FA541C",
            // borderColor: "#fa8c16",
            borderRadius: "2px",
            margin: "0 4px 0 0",
            border: 0,
            boxShadow: "inset -1px 0 #D9D9D9"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(0,0,0,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 預約訂車 圖標
    callCarSvg: {
        position: "relative",
        // height: "100%",
        // right: "12px",
        cursor: "pointer",
        top: "3px",
        right: "3px"
    },
    //#endregion

    //#region 編輯按鈕
    editButton: {
        basic: (style) => ({
            ...style,
            width: "58px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#1890FF",
            // borderColor: "#fa8c16",
            borderRadius: "2px",
            margin: "0 4px 0 0",
            border: 0,
            boxShadow: "inset -1px 0 #D9D9D9"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(0,0,0,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 編輯 圖標
    editSvg: {
        position: "relative",
        // height: "100%",
        // right: "12px",
        cursor: "pointer",
        top: "3px",
        right: "3px"
    },
    //#endregion

    //#region 刪除按鈕
    deleteButton: {
        basic: (style) => ({
            ...style,
            width: "50px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#F5222D",
            // borderColor: "#fa8c16",
            borderRadius: "2px",
            margin: 0,
            border: 0,
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(0,0,0,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 刪除 圖標
    deleteSvg: {
        position: "relative",
        // height: "100%",
        // right: "12px",
        cursor: "pointer",
        top: "3px",
        right: "3px"
    },
    //#endregion

    //#endregion

    //#region 沒有更多路線
    noMoreData: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#1890FF",
            width: "100%",
            textAlign: "center",
            margin: "16px 0"
        })
    },
    //#endregion

    //#region DropDown
    //#region DropDown容器
    dropDownContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block"
        })
    },
    //#endregion
    //#region DropDown 項目容器
    dropDownItemContainer: {
        basic: (style, props) => ({
            ...style,
            width: "166px",
            height: "86px",
            backgroundColor: "#fff",
            borderRadius: "2px",
            boxShadow: "0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)",
            padding: "16px",
        })
    },
    //#endregion
    //#region DropDown 子項目
    dropDownSubItemContainer: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.65)",
            paddingLeft: "20px"
        })
    },
    //#endregion
    //#region 提示圖標
    tipSvg: {
        position: "absolute",
        left: 0,
        top: "5px"
    },
    //#endregion
    //#region 取消按鈕
    cancelButton: {
        basic: (style) => ({
            ...style,
            width: "44px",
            height: "24px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "rgba(0,0,0,0.65)",
            borderColor: "#D9D9D9",
            backgroundColor: "#FFFFFF",
            borderRadius: "2px",
            margin: "8px 8px 0 38px",
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(0,0,0,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#region 確認按鈕
    submitButton: {
        basic: (style) => ({
            ...style,
            width: "44px",
            height: "24px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#fff",
            borderColor: "#1890FF",
            backgroundColor: "#1890FF",
            borderRadius: "2px",
            margin: "8px 0 0",
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24,144,255,0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#endregion

}