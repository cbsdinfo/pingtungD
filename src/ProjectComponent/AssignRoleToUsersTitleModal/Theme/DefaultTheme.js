export default {
    //#region 分配用戶彈窗 
    //#region Modal 樣式
    assignModal: {
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
                width: "1050px",
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

    //#region 組織樹與用戶Table外層容器
    orgTreeAndUsersTableContainer: {
        basic: (style, props) => ({
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            boxSizing: "border-box",
            flexDirection: "row",//控制子組件排列方向: row、row-reverse、column、column-reverse
            justifyContent: "flex-start",  //控制子組件在水平方向上的對齊: flex-start、center、flex-end、space-between、space-around、space-evenly
            alignItems: "flex-start",   //控制子組件在垂直方向上的對齊: flex-start、center、flex-end、stretch、baseline
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            //    height: "auto",
            minWidth: '0',//修復滾動條 x 方向
            backgroundColor: "transparent",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: '#000',
            height: "100%"
        })
    },
    //#endregion

    //#region 左側組織樹選單子容器
    leftMenuSubContainer: {
        basic: (style, props) => ({
            ...style,
            height: "100%",
            width: "208px",
            margin: "0 16px 0 0",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            padding: "16px 0 16px 0"
        })
    },
    //#endregion

    //#region 查詢所有用戶
    getSubOrgsExecute: {
        basic: (style, props) => ({
            ...style,
            fontSize: "14px",
            height: "22px",
            lineHeight: "22px",
            color: "#1890ff",
            margin: "0 0 8px 28px",
            cursor: "pointer",
        })
    },
    //#endregion

    //#region 左側選單容器 ScrollBar
    leftMenuSubScrollBar: {
        basic: {
            width: "208px",
            maxWidth: "100%",
            height: "inherit",
            maxHeight: "calc( 100% - 30px )",
            borderRight: "1px solid #f0f0f0",
            boxSizing: "border-box",
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

    //#region 用戶 Table 容器
    RightTableSubContainer: {
        basic: (style, props) => ({
            ...style,
            height: "inherit",
            width: "calc( 100% - 208px - 16px )",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            padding: "16px 0 16px 0"
        })
    },
    //#endregion

    //#region assignFormContainer
    assignFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                height: "auto"
            })
        },
        contentContainer: (style, props) => ({
            ...style,
        })
    },
    //#endregion

    //#region 分配用戶彈窗 - 關鍵字 Keyword
    assignKeyword: {
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 16px 0 0",
                display: "inline-block"
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
    //#region 分配用戶彈窗 - 關鍵字 右方圖標
    assignKeywordRightIcon: {
        basic: {
            position: "absolute",
            height: "100%",
            right: "12px",
            cursor: "pointer",
            top: 0,
        }
    },
    //#endregion

    //#region 選中的用戶資訊容器
    selectUserContainer: {
        basic: (style, props) => {
            return {
                ...style,
                width: "calc( 100% - 220px)"
            }
        }
    },
    //#endregion
    //#region 選中的用戶資訊文字
    selectUserText: {
        basic: (style, props) => ({
            ...style,
            height: "30px",
            lineHeight: "30px",
            fontWeight: "normal",
            fontSize: "14px",
            color: "rgba(0, 0, 0, 0.85)",
            cursor: "default"
        })
    },
    //#endregion

    //#region 分配用戶彈窗 下方表格
    assignTableSubContainer: {
        basic: (style, props) => ({
            ...style,
            height: "calc( 100% - 32px )",
            width: "100%",
            padding: "24px 0 0 0 ",
            // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
        })
    },
    //#endregion

    //#region 停用狀態 Tag
    assignDisable: {
        container: {
            basic: (style, props) => ({
                ...style,
                margin: "0",
                padding: "0px 7px",
                fontSize: "12px",
                lineHeight: "20px"
            }),
            hover: {}
        }
    },
    //#endregion

    //#region 啟用狀態 Tag
    assignEnable: {
        container: {
            basic: (style, props) => ({
                ...style,
                margin: "0",
                padding: "0px 7px",
                fontSize: "12px",
                lineHeight: "20px"
            }),
            hover: {}
        }
    }
    //#endregion

    //#endregion

}
