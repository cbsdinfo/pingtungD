- [1. SubContainer](#1-subcontainer)
  - [1.1. 可用 props](#11-可用-props)
  - [1.2. 可用theme](#12-可用theme)
    - [1.2.1. theme 範例](#121-theme-範例)

# 1. SubContainer

作為Flex容器內層組件，必須與 ContainerFlex容器外層組件 搭配使用。
例如 Container + SubContainer 可實現Grid佈局。

使用範例 ( 以下實現了每個SubContainer各佔據Container一半的Grid佈局 ): 

```js
<Container baseDefaultTheme={"ContainerDefaultTheme"} theme={{ basic: (style)=>({ ...style }) }}>
    <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"} theme={{ basic: (style) => ({ ...style, ...style.occupy(6)}) }}>1</SubContainer>
    <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"} theme={{ basic: (style) => ({ ...style, ...style.occupy(6)}) }}>1</SubContainer>
</Container>    
```

## 1.1. 可用 props

| props 名 | props 效果   | 預設值 |
| -------- | ------------ | ------ |
| event    | 支援所有事件 | 無     |

## 1.2. 可用theme

| theme 名 | theme 效果                                                                             |
| -------- | -------------------------------------------------------------------------------------- |
| basic    | 調整容器樣式，其中occupy以函數型式調用，為1~12間的數字，並以此作為佔據 Container的比例 |
| hover    | 調整hover時容器樣式                                                                    |

| 預設樣式                 |
| ------------------------ |
| SubContainerDefaultTheme |

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
      ...(style.occupy()),
      //#endregion
    }),
    hover: (style) => ({
      ...style,
      //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
      //#endregion
    })
}
```