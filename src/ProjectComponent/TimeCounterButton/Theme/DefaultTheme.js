export default {
    //#region B單位彈窗 
    //#region 重送驗證碼按鈕 (等待倒數中)
    resendVerificationCodeWaitButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                position: "absolute",
                width: "151px",
                background: "#f5f5f5",
                boxShadow: null,//"0px 2px 0px rgba(0, 0, 0, 0.043)",
                border: "1px solid #d9d9d9",
                borderRadius: "2px",
                height: "28px",
                padding: "0 8px",
                right: "2px",
                top: "-3px"
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "#f5f5f5"
            })
        },
        text: {
            basic: (style, props) => ({
                ...style,
                fontSize: "14px",
                lineHeight: "28px",
                top: "-5px"
            }),
        }
    },
    //#endregion
    //#region 重送驗證碼按鈕 
    resendVerificationCodeButton: {
        container: {
            basic: (style, props) => ({
                ...style,
                position: "absolute",
                width: "102px",
                background: "#FF7A45",
                boxShadow: null,//"0px 2px 0px rgba(0, 0, 0, 0.043)",
                border: "1px solid #FF7A45",
                borderRadius: "2px",
                height: "28px",
                padding: "0 8px",
                right: "2px",
                top: "-3px"
            }),
            hover: (style, props) => ({
                ...style,
                backgroundColor: "rgba(255,122,69,0.85)",
                borderColor: "rgba(255,122,69,0.85)"
            })
        },
        text: {
            basic: (style, props) => ({
                ...style,
                fontSize: "14px",
                lineHeight: "28px",
                top: "-5px",
                color: "#FFFFFF"
            }),
            hover: (style, props) => ({
                ...style,
                color: "#FFFFFF",
            })
        }
    },
    //#endregion

    //#endregion

}
