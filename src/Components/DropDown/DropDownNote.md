- [1. NativeLineButton](#1-nativelinebutton)
  - [1.1. 可用 props](#11-可用-props)
  - [1.2. 可用theme](#12-可用theme)
    - [1.2.1. theme 範例](#121-theme-範例)

# 1. NativeLineButton

使用原生button實現的邊框線按鈕
使用範例 : 

```js
<NativeLineButton baseDefaultTheme={"DefaultTheme"} theme={{...}} disable={false}>
    /* Component...  或 按鈕文字 */
</NativeLineButton>    
```

## 1.1. 可用 props

| props 名 | props 效果   | 預設值 | 類型    |
| -------- | ------------ | ------ | ------- |
| disable  | 是否禁用按鈕 | false  | boolean |
| children | 增加子元素   | 無     | any     |
| event    | 支援所有事件 | 無     | event   |

## 1.2. 可用theme

| theme 名 | theme 效果       |
| -------- | ---------------- |
| basic    | 調整原生按鈕樣式 |

| 預設樣式       |
| -------------- |
| DefaultTheme   |
| PrimaryTheme   |
| SecondaryTheme |

### 1.2.1. theme 範例
```js
{
    basic: (style) => ({
      ...style,
      //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
      backgroundColor: "transparent",
      border: "solid 1px #964f19",
      borderRadius: ".25rem",
      color: "#964f19",
      fontSize: "1em",
      padding: ".625rem 2rem",
      fontWeight: "600",
      outline: "0",
      cursor: "pointer",
      userSelect: "none",
      //#endregion

    }),
    hover: (style) => ({
      ...style,
      //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
      backgroundColor: "rgba(150,79,25,0.04)",
      //#endregion

    }),
    focus: (style) => ({
      ...style,
      //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
      boxShadow: "0 0 0 2px #fff, 0 0 0 4px #32649666",
      //#endregion

    }),
}

```