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
                height: `calc( ${props.height}px - 273px)`,
                width: "100%",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }
        }
    },
    //#endregion
    
    //#region 卡片資料外層容器
    cardOutContainer: {
        basic: (style, props) => {
            return {
                ...style,
                ...style.occupy(12),
                display: "inline-block",
                padding: "8px 16px",
            }
        }
    },
    //#endregion

    //#region 卡片資料表單區容器
    cardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                display: "inline-block",
                padding: "24px 16px",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                borderRadius: "8px",
                // height: "154px",
                width: "100%",
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
            // height: "22px",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "24px",
            color: "rgba(0, 0, 0, 0.85)",
            margin: "0 0 8px 0"
        })
    },
    //#endregion

    //#region 公司電話
    companyPhone: {
        basic: (style, props) => ({
            ...style,
            position: "relative",
            height: "22px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            padding: "0 0 0 54px"
        })
    },
    //#endregion
    //#region 公司電話 左方圖標
    phoneSvg: {
        position: "absolute",
        cursor: "pointer",
        top: 0,
        left: 0
    },
    //#endregion

    //#region 提醒 
    tip: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            height: "22px",
            fontSize: "14px",
            lineHeight: "22px",
            color: "#FA541C",
            width: "100%",
            margin: "8px 0 0"
        })
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

    //#region 沒有更多車行 提醒 
    noDataTip: {
        basic: (style, props) => ({
            ...style,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#1890FF",
            margin: "12px 0 0",
            width: "100%",
            textAlign: "center"
        })
    },
    //#endregion

    //#endregion
}
