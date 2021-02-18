export default {
    //#region B單位彈窗 
    //#region Modal 樣式
    bUnitModal: {
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
                width: "720px",
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

    //#region 所有B單位   
    bUnits: {
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
                height: "0px"
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
