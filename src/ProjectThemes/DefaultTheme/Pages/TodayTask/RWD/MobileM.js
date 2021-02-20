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

    //#region 司機名、打卡按鈕列
    driverNameAndTickContainer: {
        basic: (style, props) => ({
            ...style,
            height: "60px",
            backgroundColor: "#fff",
            borderTop: "solid 1px rgb(43 43 43 / 15%)",
            position: "fixed",
            width: "100%",
            zIndex: 1
        })
    },
    //#endregion

    //#region 司機名Icon
    driverNameIcon: {
        top: "13px",
        position: "relative",
        left: "6px"
    },
    //#endregion

    //#region 司機名
    driverNameText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontSize: "18px",
            color: "#3B3B3B",
            top: "5px",
            left: "10px"
        })
    },
    //#endregion

    //#region 打卡按鈕
    TickBtn: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100px",
                position: "absolute",
                right: "9px",
                top: "9px",
                background: "rgba(248,169,30,1)",
                boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
                borderRadius: "28px",
                height: "40px"
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "rgba(248,169,30, 0.8)"
            })
        },
        text: {
            basic: (style, props) => ({
                ...style,
                fontSize: "24px",
                lineHeight: "32px",
                top: "3px"
            }),
        }
    },
    //#endregion

    //#region 乘車時間
    reserveDateText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 900,
            fontSize: "24px",
            lineHeight: "55px",
            color: "#3D3D3D",
            padding: "0 34px"
        }),
    },
    //#endregion

    //#region 乘車時間圖標
    clockSvg: {
        marginRight: "12px",
        position: "relative",
        top: "5px"
    },
    //#endregion

    //#region 上方容器
    //#region 乘客名稱容器
    nameContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(6),
            display: "inline-flex",
            height: "94px",
            alignItems: "center",
            justifyContent: "center"
        })
    },
    //#endregion

    //#region 乘客名稱
    nameText: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            fontWeight: 600,
            fontSize: "36px",
            lineHeight: "46px",
            color: "#3D3D3D",
            cursor: "pointer"
        }),
    },
    //#endregion

    //#region 箭頭圖標
    arrowSvg: {
        position: "absolute",
        top: "18px",
        right: "-21px"
    },
    //#endregion

    //#region 輪椅
    wheelchairTypeText: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "23px",
            color: "#F46C00",
            margin: "4px 0 0",
            cursor: "default"
        }),
    },
    //#endregion

    //#region 陪同人數容器
    withContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(6),
            display: "inline-flex",
            height: "94px",
            alignItems: "center",
            justifyContent: "center"
        })
    },
    //#endregion

    //#region 陪同人數
    withCount: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            fontWeight: 600,
            fontSize: "36px",
            lineHeight: "46px",
            color: "#3D3D3D",
            textAlign: "center"
        }),
    },
    //#endregion

    //#region 預估陪同
    withText: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "23px",
            color: "#3D3D3D",
            margin: "4px 0 0",
        }),
    },
    //#endregion
    //#endregion

    //#region 下方容器
    //#region 陪同人數容器
    addrContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            display: "inline-block",
            padding: "24px",
            backgroundColor: "#F5F5F5",
        })
    },
    //#endregion

    //#endregion

    //#region 起點
    fromAddrText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 900,
            fontSize: "18px",
            lineHeight: "18px",
            color: "#3D3D3D",
            padding: "0 0 16px 24px",
            boxShadow: "inset 3px 0 #F8A91E"
        }),
    },
    //#endregion

    //#region 起點圖標
    startSvg: {
        position: "absolute",
        top: "-8px",
        left: "-16px",
        backgroundColor: "#F5F5F5"
    },
    //#endregion

    //#region 起點備註
    fromAddrRemarkText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "18px",
            color: "#F46C00",
            margin: "6px 0 0"
        }),
    },
    //#endregion

    //#region 迄點
    toAddrText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 900,
            fontSize: "18px",
            lineHeight: "18px",
            color: "#3D3D3D",
            padding: "0 0 0 24px"
        }),
    },
    //#endregion

    //#region 迄點圖標
    EndSvg: {
        position: "absolute",
        top: "-4px",
        left: "-13px"
    },
    //#endregion

    //#region 迄點備註
    toAddrRemarkText: {
        basic: (style, props) => ({
            ...style,
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "18px",
            color: "#F46C00",
            margin: "6px 0 0"
        }),
    },
    //#endregion

    //#endregion

}