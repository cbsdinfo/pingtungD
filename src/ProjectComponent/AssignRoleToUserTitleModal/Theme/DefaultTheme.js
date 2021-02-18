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
                width: "696px",
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
    //#region assignFormContainer
    assignFormContainer: {
        container: {
            basic: (style, props) => ({
                ...style,
                height: "auto"
            })
        },
        contentContainer: (style, props) => ({
            ...style,
        })
    },
    //#endregion

    //#region 分配用戶彈窗 下方表格
    assignTableSubContainer: {
        basic: (style, props) => ({
            ...style,
            height: "calc( 100% )",
            width: "100%",
            padding: "0 0 0 0 ",
            // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
        })
    },
    //#endregion

    //#region 停用狀態 Tag
    assignDisable: {
        container: {
            basic: (style, props) => ({
                ...style,
                margin: "0",
                padding: "0px 7px",
                fontSize: "12px",
                lineHeight: "20px"
            }),
            hover: {}
        }
    },
    //#endregion

    //#region 啟用狀態 Tag
    assignEnable: {
        container: {
            basic: (style, props) => ({
                ...style,
                margin: "0",
                padding: "0px 7px",
                fontSize: "12px",
                lineHeight: "20px"
            }),
            hover: {}
        }
    }
    //#endregion

    //#endregion

}