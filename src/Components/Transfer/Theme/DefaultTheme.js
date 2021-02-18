export default {


    //#region 查無資料文字樣式
    noDataMessage: {
        basic: (style, props) => ({
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // height: "auto",
            // lineHeight: "normal",
            whiteSpace: "normal",
            // textAlign: 'initial',
            // fontSize: "medium",
            // color: '#000',
            fontFamily: `'Noto Sans TC', sans-serif`,
            // fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 
            padding: "60px 0 0 0",
            color: "#ff7a45",
            fontWeight: "600",
            fontSize: "24px",
            lineHeight: "32px",
            textAlign: "center",
            boxShadow: "0 0 3px 8px #fff"
            //#endregion
        })
    },
    //#endregion
}