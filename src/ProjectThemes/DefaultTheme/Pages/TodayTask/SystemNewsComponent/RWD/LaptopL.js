export default {
    //#region 日期區間容器
    dateTimeRangeContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "16px 0",
                // margin: "8px 0 0",
                width: "100%",
                textAlign: "right"
                // borderRadius: "16px",
            }
        }
    },
    //#endregion

    //#region 選擇日期區間 DateTimeRange 
    dateTimeRange: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: 0,
                display: "inline-block",
                // ...style.occupy(3),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                padding: 0
                // ...style.occupy(3),
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
                    width: "244px",
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
                // minHeight: "24px",
                // height: "auto"
                height: "0px"
            })
        }
    },
    //#endregion

    //#region 無資料表單區容器
    noDataContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // padding: "24px 12px",
                // margin: "8px 0 0",
                background: "white",
                // boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                // height: "100%",
                minHeight: `calc( ${props.height}px - 295px )`,
                width: "100%",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }
        }
    },
    //#endregion
    //#region Table區域
    //#region Table外側容器
    tableOutsideContainer: {
        basic: (style, props) => ({
            ...style,
            height: "auto",
            minHeight: `calc( ${props.height}px - 240px )`,
            width: "100%",
        }),
        laptopL: {
            basic: (style, props) => ({
                ...style,
                height: "auto",
                minHeight: "calc( 100vh - 295px )",
                width: "100%",
            })
        }
    },
    //#endregion
    //#region Table容器
    tableContainer: {
        basic: (style, props) => {
            // console.log(props)
            return {
                ...style,
                height: `${((props.length) + 1) * 55 + 64}px`,
                maxHeight: `${(11) * 55 + 64}px`,
                width: "100%",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px"
            }
        }
    },
    //#endregion

    //#region 公告 身份 Tag 區域
    newsIdentityTag: {
        //#region Tag樣式
        //#region 長照
        caseNews: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 0 0 0",
                    // top: "3px",
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
        whiteNews: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 0 0 0",
                    // top: "3px",
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
        busNews: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 0 0 0",
                    // top: "3px",
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
        //#region 系統公告
        systemNews: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 0 0 0",
                    // top: "3px",
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
        //#region 無此身份
        unknownNews: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 0 0 0",
                    // top: "3px",
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

    //#region 公告內容容器
    newsContentContainer: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            overflow: "hidden"
        })
    },
    //#endregion

    //#region 公告內容文字
    newsContentText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.65)",
            cursor: "pointer",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
        })
    },
    //#endregion

    //#region Modal 樣式
    newsModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "696px"
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

}