export default {
    //#region 無資料表單區容器
    noDataContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "24px 12px",
                margin: "12px 12px 116px",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: "500px",
                width: "calc( 100% - 24px )",
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
                ...style.occupy(6),
                display: "inline-block",
                padding: "12px",
                height: "auto",
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
                padding: "24px",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: "230px",
                width: "100%",
                borderRadius: "16px"
            }
        }
    },
    //#endregion

    //#region 公司 容器
    companyContainer: {
        basic: (style, props) => {
            return {
                ...style,
                width: "100%",
                display: "inline-block",
                boxShadow: "inset 0 -1px #D9D9D9",
            }
        }
    },
    //#endregion

    //#region 公司名稱
    companyName: {
        basic: (style, props) => ({
            ...style,
            height: "24px",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "24px",
            color: "rgba(0, 0, 0, 0.65)",
            margin: "0 0 8px 0"
        })
    },
    //#endregion

    //#region 公司電話
    companyPhone: {
        basic: (style, props) => ({
            ...style,
            position: "relative",
            height: "38px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.85)",
            padding: "0 0 0 24px"
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

    //#region 車趟服務時間 容器
    carServiceTimeContainer: {
        basic: (style, props) => {
            return {
                ...style,
                width: "50%",
                display: "inline-block",
                boxShadow: "inset -1px 0 #D9D9D9",
                margin: "16px 0 0",
                padding: "0 16px 0 0",
                height: "96px"
            }
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
            margin: "0 0 4px"
        })
    },
    //#endregion

    //#region 車趟服務時間 星期 
    carServiceWeekText: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.65)",
            margin: "0 0 4px"
        })
    },
    //#endregion

    //#region 車趟服務時間 時段 
    carServiceTimeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "22px",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.65)",
            margin: "0 0 0 4px"
        })
    },
    //#endregion
    //#region 車趟服務時間 提醒 
    carServiceTimeTip: {
        basic: (style, props) => ({
            ...style,
            height: "44px",
            fontSize: "14px",
            lineHeight: "22px",
            color: "#FF7A45",
        })
    },
    //#endregion

    //#region 客服服務時間 容器
    customerServiceTimeContainer: {
        basic: (style, props) => {
            return {
                ...style,
                width: "50%",
                display: "inline-block",
                margin: "16px 0 0",
                padding: "0 0 0 16px",
                height: "140px"
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
            margin: "0 0 4px"
        })
    },
    //#endregion
    //#region 客服服務時間 星期 
    customerServiceWeekText: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.65)",
            margin: "0 0 4px"
        })
    },
    //#endregion

    //#region 客服服務時間 時段 
    customerServiceTimeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            height: "22px",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.65)",
            margin: "0 0 0 4px"
        })
    },
    //#endregion

    //#region 客服服務時間 提醒 
    customerServiceTimeTip: {
        basic: (style, props) => ({
            ...style,
            height: "44px",
            fontSize: "14px",
            lineHeight: "22px",
            color: "#FF7A45",
        })
    },
    //#endregion
    //#endregion

    //#endregion
}
