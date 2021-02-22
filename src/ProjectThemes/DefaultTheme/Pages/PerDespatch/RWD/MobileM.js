export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fff",
                    padding: "0px 0px" // 標題列的padding
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#3c4856",
                    height: `calc( ${props.height}px - 56px )`,
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    padding: "0", //188 是授權圖高度
                    // height:""
                }
            }
        },
    },
    //#endregion

    //#region 卡片外側容器
    cardOutContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "0 0 12px 0",
            width: "100%",
            backgroundColor: "#3c4856"
        })
    },
    //#endregion

    //#region 卡片上層
    //#region 預估陪同 圖標
    withSvg: {
        position: "relative",
        top: "8px",
        left: "-16px"
    },
    //#endregion

    //#region 預估陪同
    familyWidhText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "55px",
            color: "#3B3B3B",
            width: "100%",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 預估陪同資料
    familyWidhData: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            position: "relative",
            top: "2px",
            fontWeight: 400,
            fontSize: "24px",
            lineHeight: "24px",
            color: "#3B3B3B",
            margin: "0 0 0 16px"
        })
    },
    //#endregion
    //#endregion

    //#region 卡片下層
    //#region 搭車時間
    timeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "44px",
            color: "#F67E01",
            width: "50%",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 搭車時間 圖標
    clockSvg: {
        position: "relative",
        top: "5px",
        left: "-16px"
    },
    //#endregion

    //#region 輪椅
    wheelchairTypeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "13px",
            lineHeight: "44px",
            color: "#3D3D3D",
            width: "50%",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 輪椅 圖標
    wheelchairSvg: {
        position: "relative",
        top: "8px",
        left: "-6px"
    },
    //#endregion

    //#region 預估
    //#region 預估容器
    estimateContainer: {
        basic: (style, props) => ({
            ...style,
            display: props.open ? "inline-block" : "none",
            width: "100%",
            backgroundColor: "#F5F5F5"
        })
    },
    //#endregion

    //#region 預估里程
    estimateMileageText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 400,
            fontSize: "36px",
            lineHeight: "73px",
            color: "#3D3D3D",
            width: "50%",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 預估里程 標題
    estimateMileageTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            width: "24px",
            height: "26px",
            fontSize: "12px",
            lineHeight: "13px",
            marginRight: "16px"
        })
    },
    //#endregion

    //#region 公里
    mileageText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "18px",
            marginLeft: "4px"
        })
    },
    //#endregion

    //#region 預估時間
    estimateTimeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 400,
            fontSize: "36px",
            lineHeight: "73px",
            color: "#3D3D3D",
            width: "50%",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 預估時間 標題
    estimateTimeTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            width: "24px",
            height: "26px",
            fontSize: "12px",
            lineHeight: "13px",
            marginRight: "16px"
        })
    },
    //#endregion

    //#region 分鐘
    minuteText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "18px",
            marginLeft: "4px"
        })
    },
    //#endregion
    //#endregion

    //#region 起迄點
    //#region 起迄點容器
    startToEndContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            padding: "8px 16px",
            backgroundColor: props.open ? "#fff" : "#F5F5F5",
        })
    },
    //#endregion

    //#region 上車地點 標題
    startTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "22px",
            color: "#E87600",
            backgroundColor: props.open ? "#fff" : "#F5F5F5",
            width: "100%",
        })
    },
    //#endregion

    //#region 上車地點 內文
    startText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "26px",
            color: "#3D3D3D",
            backgroundColor: props.open ? "#fff" : "#F5F5F5",
            width: "100%",
            margin: "6px 0 0"
        })
    },
    //#endregion

    //#region 上車地點 備註
    startRemark: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "16px",
            color: "#F46C00",
            width: "100%",
            backgroundColor: props.open ? "#F5F5F5" : "#fff",
            padding: "5px",
            margin: "2px 0 0",
        })
    },
    //#endregion

    //#region 下車地點 標題
    endTitle: {
        basic: (style, props) => ({
            ...style,
            display: props.open ? "inline-block" : "none",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "22px",
            color: "#E87600",
            backgroundColor: "#fff",
            width: "100%",
        })
    },
    //#endregion

    //#region 下車地點 內文
    endText: {
        basic: (style, props) => ({
            ...style,
            display: props.open ? "inline-block" : "none",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "26px",
            color: "#3D3D3D",
            backgroundColor: "#fff",
            width: "100%",
            margin: "6px 0 0"
        })
    },
    //#endregion

    //#region 下車地點 備註
    endRemark: {
        basic: (style, props) => ({
            ...style,
            display: props.open ? "inline-block" : "none",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "16px",
            color: "#F46C00",
            width: "100%",
            backgroundColor: "#F5F5F5",
            padding: "5px",
            margin: "2px 0 0",
        })
    },
    //#endregion

    //#endregion
    //#endregion

    //#region 地圖
    //#region 地圖容器
    mapContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: props.open ? `calc( ${props.height}px - 56px - 12px - 32px - 55px - 45px - 73px - 180px - 13px )` : `calc( ${props.height}px - 56px - 12px - 32px - 55px - 45px - 98px - 13px )`
        })
    },
    //#endregion

    //#region 導航 圖標
    toGoogleMapSvg: {
        position: "absolute",
        zIndex: 1,
        right: "12px",
        top: "12px"
    },
    //#endregion

    //#region 收合 圖標
    upSvg: {
        position: "absolute",
        zIndex: 100,
        left: 0,
        top: 0
    },
    //#endregion

    //#region 展開 圖標
    downSvg: {
        position: "absolute",
        zIndex: 100,
        left: 0,
        top: 0
    },
    //#endregion

    //#region 地圖
    map: {
        mapContainer: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "100%"
            })
        }
    },
    //#endregion
    //#endregion
}