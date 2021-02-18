export default {
    //#region 標題 容器
    titleBar: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            backgroundColor: "#595959",
        }),
    },
    //#endregion

    //#region 路線名稱 標題
    routeNameTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "44px",
            textAlign: "center",
        }),
    },
    //#endregion

    //#region 操作 標題
    operatingTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "50%",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "44px",
            textAlign: "center",
        }),
    },
    //#endregion

    //#region 內文 容器
    dataContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            backgroundColor: props?.index % 2 === 0 ? "#fff" : "#F5F5F5",
        }),
    },
    //#endregion

    //#region 路線名稱 內文
    routeNameText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            color: "#1890FF",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "44px",
            textAlign: "center",
            cursor: "pointer"
        }),
    },
    //#endregion

    //#region 操作 內文
    operatingText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "50%",
            color: "#1890FF",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "44px",
            textAlign: "center",
        }),
    },
    //#endregion

    //#region 查看時刻表及站點資訊 圖標
    checkSvg: {
        position: "relative",
        top: "2px",
        right: "6px"
    },
    //#endregion

    //#region 路線詳細資訊
    //#region 路線詳細資訊容器
    detailContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // height: "440px",
                backgroundColor: "transparent",
                padding: "16px",
                width: "100%",
                height: `calc( ${props.height}px - 160px )`
            }
        },
    },
    //#endregion

    //#region 路線詳細資訊卡片容器
    detailCardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
                padding: "24px",
                borderRadius: "8px",
                width: "100%",
                height: "calc( 100% - 44px )"
            }
        },
    },
    //#endregion

    //#region 詳細資料 路線名稱
    detailRouteName: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 600,
            fontSize: "28px",
            lineHeight: "28px",
            height: "44px",
            color: "#00628F",
            boxShadow: "inset 0 -1px #D9D9D9"
        }),
    },
    //#endregion

    //#region 詳細資料 資料容器
    detailDataContainer: {
        basic: (style, props) => {
            return {
                ...style,
                padding: "16px 0 24px",
            }
        },
    },
    //#endregion

    //#region 詳細資料 營運里程 標題
    detailDataTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "32px",
            color: "#1890ff"
        }),
    },
    //#endregion

    //#region 詳細資料 營運里程 內文
    detailDataText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "32px",
            color: "rgba( 0,0,0,0.85 )"
        }),
    },
    //#endregion

    //#region 詳細資料 營運里程 提示文字
    pointText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "32px",
            color: "#F5222D"
        }),
    },
    //#endregion

    //#region 詳細資料 圖片
    detailImg: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                // height: "100%",
                padding: 0,
                flexGrow: 1
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                // height: "100%",
                padding: 0,
                flexGrow: 1
            })
        },
        viewTypeTextInputContainer: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "100%",
                minHeight: "100%",
            })
        },
        viewTypeFileInput: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                minHeight: "100%",
                padding: 0,
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
    },
    //#endregion

    //#region 回列表按鈕
    //#region 回列表按鈕容器
    returnContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            textAlign: "right",
            padding: "16px 0 0"
        }),
    },
    //#endregion

    //#region 回列表按鈕
    returnButton: {
        basic: (style) => ({
            ...style,
            width: "82px",
            height: "28px",
            fontSize: "14px",
            lineHeight: "22px",
            top: "2px",
            padding: 0,
            color: "#1890ff",
            backgroundColor: "#fff",
            borderColor: "#1890ff",
            borderRadius: "2px",
            // margin: "0 16px 0 0"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(24, 144, 255 ,0.05)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion
    //#endregion

    //#endregion

}