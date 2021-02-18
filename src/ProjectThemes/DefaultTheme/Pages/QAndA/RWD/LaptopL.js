export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        laptopLOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "24px 0 0" // 標題列的padding
                }
            }
        },
        laptopLOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8"
                }
            }
        },
        laptopLContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "0 43px 260px" //188 是授權圖高度
                }
            }
        },


        laptopOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "24px 0 0" // 標題列的padding
                }
            }
        },
        laptopOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8"
                }
            }
        },
        laptopContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "0 32px 212px" //188 是授權圖高度
                }
            }
        },

        tabletOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "24px 0 0" // 標題列的padding
                }
            }
        },
        tabletOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8"
                }
            }
        },
        tabletContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "0 24px 212px" //188 是授權圖高度
                }
            }
        },
    },
    //#endregion

    //#region 標題列
    titleBar: {
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "120px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "200px"
            })
        }
    },
    //#endregion

    //#region 常見問題容器
    qAContainer: {
        basic: (style, props) => ({
            ...style,
            // padding: "0 150px 24px",
            minHeight: `calc( ${props.height} - 288px )`
        })
    }
    //#endregion
}