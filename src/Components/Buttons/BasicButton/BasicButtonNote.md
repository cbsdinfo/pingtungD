- [1. BasicButton](#1-basicbutton)
  - [1.1. 可用 props](#11-可用-props)
  - [1.2. 可用theme](#12-可用theme)
    - [1.2.1. theme 範例](#121-theme-範例)

# 1. BasicButton

並非使用原生button實現的按鈕
使用範例 : 

```js
<BasicButton baseDefaultTheme={"BasicButtonDefaultTheme"} theme={{...}} icon={...} text={...} disable={false}>
    /* Component... */
</BasicButton>    
```

## 1.1. 可用 props

| props 名 | props 效果               | 預設值 | 類型    |
| -------- | ------------------------ | ------ | ------- |
| icon     | 在按鈕文字左方增加圖標等 | 無     | any     |
| text     | 按鈕文字                 | "按鈕" | string  |
| disable  | 是否禁用按鈕             | false  | boolean |
| children | 在按鈕文字右方增加元素   | 無     | any     |
| event    | 支援所有事件             | 無     | event   |

## 1.2. 可用theme


| theme 名(中層) | 底層組件       | theme 名(底層) | theme 效果       |
| -------------- | -------------- | -------------- | ---------------- |
| container      | BasicContainer | basic          | 調整容器樣式     |
| text           | Text           | basic          | 調整文字容器樣式 |

| 預設樣式       |
| -------------- |
| DefaultTheme   |
| PrimaryTheme   |
| SecondaryTheme |

### 1.2.1. theme 範例
```js
{
    container:{
        basic: (style) => ({
            ...style,
            //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
            boxSizing: "border-box",
            position: "relative",
            minWidth: "0",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            whiteSpace: "normal",
            backgroundColor: "#964f19",
            color: "#fff",
            borderRadius: "4px",
            textAlign: "center",
            fontSize: ".875em",
            cursor: "pointer",
            fontWeight: "400",
            width: "140px",
            height: "40px",
            lineHeight: "40px",
            userSelect: "none",
            display: "inline-block",
            //#endreg
        }),
        hover: (style) => ({
            ...style,
            //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
            backgroundColor: "#6d3f00",
            //#endreg
        }),
    },
    text:{
        basic: (style) => ({
            ...style,
            //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
            boxSizing: "border-box",
            position: "relative",
            width: "auto",
            minWidth: "0",
            height: "auto",
            lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: "initial",
            fontSize: "medium",
            fontWeight: "normal",
            letterSpacing: "normal",
            display: "inline-block",
            color: "inherit",
            fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
            //#endreg
        }),
        hover: (style) => ({
            ...style,
            //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
            //#endreg
        }),
    },
}

```