export default {
    //#region OrgsTree遍歷項容器
    OrgsTreeContainer: {
        basic: (style, props) => ({
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
            lineHeight: "normal",
            backgroundColor: "transparent",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: '#000',
            ...style,
            overflow: "hidden",
            transition: "max-height .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
            maxHeight: (props.close ?? []).includes(props.id) ? "28px" : `${(props.childCount + 1) * 28}px`,
        })
    },
    //#endregion

    //#region OrgsTree項目容器
    OrgsTreeItemContainer: {
        basic: (style, props) => {
            return {
                //#region 基本設置
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                // width: "auto",
                minWidth: '0',//修復滾動條 x 方向
                // height: "auto",
                // lineHeight: "normal",
                whiteSpace: "normal",
                textAlign: 'initial',
                // fontSize: "medium",
                // color: '#000',
                fontFamily: `'Noto Sans TC', sans-serif`,
                fontWeight: 'normal',
                letterSpacing: 'normal',
                //#endregion
                padding: `0 0 0 ${4 + 24 * props.level}px`,
                height: "24px",
                width: "100%",
                // margin: "8px 0px",
                color: "rgba(0, 0, 0, 0.65)",
                fontSize: "14px",
                lineHeight: "22px",
                cursor: "pointer",
                userSelect: "none",
                margin: "0 0 4px 0",
                background: ((props.select?.length === 0 ? props.orgId : props.select) === props.id) ? "#e6f7ff" : "#fff"
            }
        },
        hover: (style, props) => ({
            ...style,
            color: "#1890ff"
        })
    },
    //#endregion
    //#region 展開的 icon 圖標
    caretDownIcon: (level, close, id) => ({
        position: "absolute",
        left: `${-14 + level * 24}px`,
        height: "100%",
        transition: "transform .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
        transform: (close ?? []).includes(id) ? "rotate(-90deg)" : null
    }),
    //#endregion

}