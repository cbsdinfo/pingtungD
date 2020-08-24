export default {
    basic: {
        //#region BasicContainer 原生樣式
        backgroundColor: "#d25959",
        border: 0,
        borderRadius: ".25rem",
        color: "#fff",
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
        backgroundColor: "#bd5050"
        //#endregion
    },
    focus: {
        boxShadow: "0 0 0 2px #fff, 0 0 0 4px #32649666"
    }
}