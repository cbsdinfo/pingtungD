export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        laptopOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa"
                }
            }
        },
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa"
                }
            }
        },
        laptopOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa"
                }
            }
        },
        laptopContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa",
                    padding: "0px 12px 24px"
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa"
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#fafafa",
                    padding: "0px 12px 24px"
                }
            }
        },
    },
    //#endregion

    //#region 標題列區塊
    //#region 標題列
    titleBar: {
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "821px"
            })
        }
    },
    //#endregion
    //#endregion

    //#region 頁面外層容器
    outContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "0"
        })
    },
    //#endregion

    //#region 車輛司機設定卡片 - 司機保險
    carAndDriverSettingCard: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "calc( 50% - 24px )", // 卡片寬度
                margin: "12px"
            })
        },

    },
    //#endregion

}