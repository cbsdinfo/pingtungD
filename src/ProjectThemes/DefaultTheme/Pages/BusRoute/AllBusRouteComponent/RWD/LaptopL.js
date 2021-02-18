export default {
    //#region 卡片外側容器
    outsideContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            ...style.occupy(4),
            padding: "8px",
        }),
        laptop: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                ...style.occupy(3),
                padding: "8px",
            }),
        },
        laptopL: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                ...style.occupy(3),
                padding: "12px",
            }),
        }
    },
    //#endregion

    //#region 卡片容器
    cardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // height: "440px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "8px",
                textAlign: "center"
            }
        },
        laptop: {
            basic: (style, props) => ({
                ...style,
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "8px",
                textAlign: "center"
            }),
        },
        laptopL: {
            basic: (style, props) => ({
                ...style,
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "12px",
                textAlign: "center"
            }),
        }
    },
    //#endregion


    //#region 上傳車輛圖片
    carImgUpload: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                // height: "100%",
                padding: 0
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
                padding: 0
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

    //#region 路線名稱
    routeName: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            margin: "24px 0 12px",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "28px",
            textAlign: "center",
            color: "#1890FF",
            cursor: "pointer"
        }),
        laptopL: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                margin: "36px 0 24px",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "28px",
                textAlign: "center",
                color: "#1890FF",
                cursor: "pointer"
            })
        }
    },
    //#endregion

    //#region 查看時刻表及站點資訊
    checkTime: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "160px",
            margin: "4px 0 12px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            textAlign: "center",
            color: "#1890FF",
            cursor: "pointer"
        }),
        laptopL: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                width: "160px",
                margin: "8px 0 24px",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                textAlign: "center",
                color: "#1890FF",
                cursor: "pointer"
            }),
        }
    },
    //#endregion

    //#region 查看時刻表及站點資訊 圖標
    checkSvg: {
        position: "relative",
        top: "1px",
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
                padding: "52px 16px 0",
                width: "100%",
                height: `calc( ${props.height}px - 189px )`
            }
        },
        laptop: {
            basic: (style, props) => ({
                ...style,
                backgroundColor: "transparent",
                padding: "52px 40px 0",
                width: "100%",
                height: "calc( 100vh - 189px )"
            }),
        },
        laptopL: {
            basic: (style, props) => ({
                ...style,
                backgroundColor: "transparent",
                padding: "52px 138px 0",
                width: "100%",
                height: "calc( 100vh - 209px )"
            }),
        }
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
                height: "calc( 100% - 64px )"
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
            display: "flex",
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

    //#endregion

    //#region 回列表按鈕
    //#region 回列表按鈕容器
    returnContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            textAlign: "right",
            padding: "16px 0"
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
}