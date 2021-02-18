- [1. ScrollBar](#1-scrollbar)
  - [1.1. 可用 props](#11-可用-props)
  - [1.2. 可用theme](#12-可用theme)
    - [1.2.1. theme 範例](#121-theme-範例)

# 1. ScrollBar

ScrollBar可作用於任一div上，並支援 IE、Edge、Chrome、Safari、FireFox等瀏覽器。
使用範例 : 

```js
<ScrollBar baseDefaultTheme={"DefaultTheme"} autoHide={true} theme={{...}}>
    /* Component... */
</ScrollBar>
                      
```

## 1.1. 可用 props

| props 名 | props 效果                         | 預設值 |
| -------- | ---------------------------------- | ------ |
| autoHide | 是否過一段時間自動隱藏 ScrollBar ? | true   |

## 1.2. 可用theme

| theme 名        | theme 效果                                                          |
| --------------- | ------------------------------------------------------------------- |
| basic           | 拿來調整滾動區域寬高(height、width)、最大寬高 (maxHeight、maxWidth) |
| scrollbarTrackX | x方向滾動軌道樣式                                                   |
| scrollbarThumbX | x方向滾動塊樣式                                                     |
| scrollbarTrackX | y方向滾動軌道樣式                                                   |
| scrollbarTrackX | y方向滾動塊樣式                                                     |

| 預設樣式     |
| ------------ |
| DefaultTheme |

### 1.2.1. theme 範例
```js
{
    basic: (style) => ({
      ...style,
      //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
      maxHeight: "10rem",
      maxWidth: "5rem",
      //#endregion
    }),
    scrollbarTrackX: (style) => ({
      ...style,
      //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
      height: "8px",
      display: "block",
      //#endregion
    }),
    scrollbarThumbX: (style) => ({
      ...style,
      //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
      backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
      opacity: "0.3",
      transition: "opacity 0s linear",
      //#endregion
    }),
    scrollbarTrackY: (style) => ({
      ...style,
      //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
      width: "8px",
      display: "block",
      //#endregion
    }),
    scrollbarThumbY: (style) => ({
      ...style,
      //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
      backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
      opacity: "0.3",
      transition: "opacity 0s linear",
      right: "0px",
      left: "0px",
      //#endregion
    })
}


```