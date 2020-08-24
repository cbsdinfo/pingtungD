export default {
    basic: {
        //#region BasicContainer 原生樣式
        backgroundColor: "transparent",
        border: "solid 1px #964f19",
        borderRadius: ".25rem",
        color: "#964f19",
        fontSize: "1em",
        //margin: "1.25rem .3125rem .3125rem",
        padding: ".625rem 2rem",
        fontWeight: 600,
        outline: 0,
        cursor: "pointer",
        userSelect: "none"
        //#endregion
    },
    hover: {
        //#region 覆寫樣式
        backgroundColor: "rgba(150,79,25,0.04)"
        //#endregion
    },
    focus: {
        boxShadow: "0 0 0 2px #fff, 0 0 0 4px #32649666"
    }
}