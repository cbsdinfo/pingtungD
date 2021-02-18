export default {
    basic: {
        //#region BasicContainer 原生樣式
        position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "solid 1px #e0e0e0",
        borderRadius: ".25rem",
        color: "#e0e0e0",
        fontSize: "1em",
        //margin: "1.25rem .3125rem .3125rem",
        padding: ".625rem 2rem",
        fontWeight: 600,
        outline: 0,
        cursor: "not-allowed",
        userSelect: "none"
        //#endregion
    },
    hover: {
        //#region 覆寫樣式
        backgroundColor: "rgba(224, 224, 224, 0.04)"
        //#endregion
    },
    focus: {
        boxShadow: "0 0 0 2px #fff, 0 0 0 4px #32649666"
    }
}