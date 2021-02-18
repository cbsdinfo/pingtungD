export default {
    //#region 公告外層容器
    newsContainer: {
        basic: (style, props) => ({
            ...style,
            minHeight: `calc( ${props.height}px - 56px - 94px - 48px)`,
            height: "auto",
            // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            // borderRadius: "16px"
        })
    },
    //#endregion
    //#region 公告容器
    newsCardContainer: {
        basic: (style, props) => ({
            ...style,
            height: "102px",
            width: "100%",
            // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            // borderRadius: "16px",
            margin: "8px 0 0 0",
            backgroundColor: "#FFF"
        })
    },
    //#endregion

    //#region 無資料表單區容器
    noDataContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // padding: "24px 12px",
                margin: "8px 0 0",
                background: "rgba(0,0,0,0)",
                // boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: `calc(  ${props.height}px - 451px)`,
                width: "100%",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }
        }
    },
    //#endregion

    //#region 公告內容容器
    newsCardContentContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            height: "64px",
            padding: "16px 16px 4px 16px",
            overflow: "hidden"
            // width: "100%",
        })
    },
    //#endregion
    //#region 公告內容文字
    newsCardContentText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "14px",
            lineHeight: "22px",
            fontWeight: "400",
            color: "rgba(0, 0, 0, 0.65)"
        })
    },
    //#endregion
    //#region 公告Tag容器
    newsCardTagContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(6),
            height: "auto",
            padding: "0 16px"
        })
    },
    //#endregion
    //#region 公告Tag
    newsIdentityTag: {
        //#region Tag樣式
        //#region 長照
        caseNews: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 0 0 0",
                    top: "-5px",
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
                    top: "-5px",
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
                    top: "-5px",
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
        unknownNews: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 0 0 0",
                    top: "-5px",
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
    },
    //#endregion
    //#endregion
    //#region 公告日期容器
    newsCardDateContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(6),
            height: "auto",
            padding: "0 16px"
        })
    },
    //#endregion
    //#region 公告日期文字
    newsCardDateText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "12px",
            top: "-2px",
            right: "20px",
            lineHeight: "18px",
            fontWeight: "400",
            color: "rgba(0, 0, 0, 0.45)",
            textAlign: "right",
        })
    },
    //#endregion

    //#region Modal 樣式
    newsModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "343px"
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

    //#region Modal 文字
    newsCardContentModalText: {
        basic: (style, props) => ({
            ...style,
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.65)",
        })
    },
    //#endregion

    //#region 沒有更多訂單檢視 提醒 
    noDataTip: {
        basic: (style, props) => ({
            ...style,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#1890FF",
            padding: "8px 0 0 0",
            // margin: "12px 0 0",
            width: "100%",
            textAlign: "center"
        })
    },
    //#endregion
}