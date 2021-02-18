export default {
    //#region 分配用戶彈窗 
    //#region Modal 樣式
    assignModal: {
        outContainer: {
            basic: (style, props) => ({
                ...style,
                zIndex: 999
            }),
            tablet: (style, props) => ({
            }),
        },
        container: {
            basic: (style, props) => ({
                ...style,
                width: "1050px",
                height: "calc( 100vh - 148px )"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: {
            basic: (style, props) => ({
                ...style,
                height: "calc( 100% - 110px)",
                padding: "24px",
                zIndex: 100
            }),
        }
    },
    //#endregion 

    //#region 左側組織樹選單子容器
    leftMenuSubContainer: {
        basic: (style, props) => {
            // console.log(style, props)
            return {
                ...style,
                height: "100%",
                width: "100%",
                display: props.step === 0 ? "block" : "none"
                // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
                // padding: "16px 0 16px 0"
            }
        }
    },
    //#endregion

    //#region 左側選單容器 ScrollBar
    leftMenuSubScrollBar: {
        basic: {
            width: "100%",
            maxWidth: "100%",
            height: "inherit",
            maxHeight: "100%",//"calc( 100% - 30px )",
            // borderRight: "1px solid #f0f0f0",
            boxSizing: "border-box",
        },
        scrollbarTrackX: {
            height: "8px",
            display: "block"
        },
        scrollbarThumbX: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear"
        },
        scrollbarTrackY: {
            width: "8px",
            display: "block"
        },
        scrollbarThumbY: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear",
            right: "0px",
            left: "0px"
        }
    },
    //#endregion

    //#region 全選
    allChecked: {
        basic: (style, props) => ({
            ...style, padding: "0 0 0 2px",
        })
    },
    //#endregion

    //#region 每一種模組下功能 ModuleFunctions  
    moduleFunctions: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 12px",
                //display: "inline-block",
                ...style.occupy(12),
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "0px"
            })
        },
        viewTypeBottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                // minHeight: "24px",
                // height: "auto"
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                //display: "inline-block",
                ...style.occupy(12),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                padding: "12px 0 0 2px",
                // height: "0px"
            })
        },
        checkboxContainer: {
            basic: (style, props) => ({
                ...style,
                //width: "200px"
            })
        },
        checkboxGroup: {
            basic: (style, props) => ({
                //調高度
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
            })
        }
    },
    //#endregion

    //#endregion

}
