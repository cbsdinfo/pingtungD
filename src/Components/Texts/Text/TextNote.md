- [1. Text](#1-text)
  - [1.1. 可用 props](#11-可用-props)
  - [1.2. 可用theme](#12-可用theme)
    - [1.2.1. theme 範例](#121-theme-範例)

# 1. Text

為文字容器，已預設基本字體樣式。

使用範例 : 

```js
<Text baseDefaultTheme={"TextDefaultTheme"} theme={{ basic: (style)=>({ ...style }) }}>
    /* 文字內容... */
</Text>    
```

## 1.1. 可用 props

| props 名 | props 效果   | 預設值 |
| -------- | ------------ | ------ |
| event    | 支援所有事件 | 無     |

## 1.2. 可用theme

| theme 名 | theme 效果        |
| -------- | ----------------- |
| basic    | 調整文字容器樣式  |
| hover    | 調整hover時的樣式 |

| 預設樣式         |
| ---------------- |
| TextDefaultTheme |

### 1.2.1. theme 範例
```js
{
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
      color: "#000",
      fontFamily: ""Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif",
      fontWeight: "normal",
      letterSpacing: "normal",
      //#endregion
    
    }),
    hover: (style) => ({
      ...style,
      //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
      //#endregion
    })
}

```