- [1. BasicContainer](#1-basiccontainer)
  - [1.1. 可用 props](#11-可用-props)
  - [1.2. 可用theme](#12-可用theme)
    - [1.2.1. theme 範例](#121-theme-範例)

# 1. BasicContainer

作為一般div容器，但配置了一些基礎屬性。
使用範例 : 

```js
<BasicContainer baseDefaultTheme={"BasicContainerDefaultTheme"} theme={{...}}>
    /* Component... */
</BasicContainer>    
```

## 1.1. 可用 props

| props 名 | props 效果   | 預設值 |
| -------- | ------------ | ------ |
| event    | 支援所有事件 | 無     |

## 1.2. 可用theme

| theme 名 | theme 效果          |
| -------- | ------------------- |
| basic    | 調整容器樣式        |
| hover    | 調整容器hover時樣式 |

| 預設樣式                   |
| -------------------------- |
| BasicContainerDefaultTheme |

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
      backgroundColor: "transparent",
      backgroundImage: "none",
      backgroundPosition: "0% 0%",
      backgroundRepeat: "repeat",
      backgroundSize: "auto auto",
      cursor: "auto",
      whiteSpace: "normal",
      textAlign: "initial",
      fontSize: "medium",
      color: "initial",
      //#endregion
    
    }),
    hover: (style) => ({
      ...style,
      //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
      //#endregion
    })
}

```