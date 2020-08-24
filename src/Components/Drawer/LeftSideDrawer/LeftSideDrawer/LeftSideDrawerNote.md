- [1. LeftSideDrawer](#1-leftsidedrawer)
  - [1.1. 可用 props](#11-可用-props)
  - [1.2. 可用theme](#12-可用theme)
    - [1.2.1. theme 範例](#121-theme-範例)

# 1. LeftSideDrawer

實現左側伸縮抽屜效果
使用範例 : 

```js
<LeftSideDrawer baseDefaultTheme={"DefaultTheme"} theme={{...}} collapse={...} >
    /* Component... */
</LeftSideDrawer>    
```

## 1.1. 可用 props

| props 名 | props 效果      | 預設值 | 類型    |
| -------- | --------------- | ------ | ------- |
| collapse | 控制展開 / 收合 | fasle  | boolean |
| event    | 支援所有事件    | 無     | event   |

## 1.2. 可用theme


| theme 名(中層) | 底層組件       | theme 名(底層) | theme 效果     |
| -------------- | -------------- | -------------- | -------------- |
| container      | Container      | basic          | 調整容器樣式   |
| content        | BasicContainer | basic          | 調整Drawer樣式 |

| 預設樣式     |
| ------------ |
| DefaultTheme |

### 1.2.1. theme 範例
```js
{                        
	container:{
		basic: (style) => ({
		...style,
		//#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
		width: "100%",
		display: "undefined",
		flexWrap: "undefined",
		boxSizing: "border-box",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		minWidth: "0",
		color: "#ffffff",
		fontSize: "1rem",
		fontWeight: "600",
		outline: "0",
		userSelect: "none",
		position: "fixed",
		height: "100%",
		left: `${props.collapse ? "-100%" : "0rem"}`,
		top: "0",
		backgroundColor: "rgba(0,0,0,0.2)",
		zIndex: "100",
		transition: "left 0s ease-in-out",
		//#endregion
		}),
	},                        
	content:{
		basic: (style) => ({
		...style,
		//#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
		boxSizing: "border-box",
		minWidth: "0",
		lineHeight: "normal",
		whiteSpace: "normal",
		textAlign: "initial",
		position: "fixed",
		width: "60%",
		maxWidth: "15rem",
		color: "#ffffff",
		fontSize: "1rem",
		fontWeight: "600",
		outline: "0",
		userSelect: "none",
		height: "100%",
		left: `${props.collapse ? "-60%" : "0rem"}`,
		top: "0",
		backgroundColor: "rgba(255,255,255)",
		zIndex: "101",
		transition: "left .3s ease-in-out",
		boxShadow: "0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)",
		//#endregion
		
		}),
	},
}
```