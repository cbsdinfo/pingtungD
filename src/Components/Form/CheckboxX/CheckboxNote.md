- [1. Checkbox](#1-checkbox)
  - [1.1. 可用 props](#11-可用-props)
  - [1.2. 可用theme](#12-可用theme)
    - [1.2.1. theme 範例](#121-theme-範例)

# 1. Checkbox

Checkbox為輸入框，於FormRow內使用，推薦搭配 globalContextService 使用
使用範例 : 

```js
 <Checkbox
    topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
/>
                      
```

## 1.1. 可用 props

| props 名            | props 效果          | 預設值      | 類型     |
| ------------------- | ------------------- | ----------- | -------- |
| viewType            | 是否開啟展示模式    | 無          | Boolean  |
| topLabel            | 上標題              | 無          | Any      |
| viewTypeTopLabel    | 展示模式下上標題    | topLabel    | Any      |
| text                | 勾選框右側文字      | 請勾選      | String   |
| checked             | 設定勾選框值/初始值 | 無          | Boolean  |
| onChange            | 當勾選後執行的動作  | 無          | function |
| bottomLabel         | 下標題              | 無          | Any      |
| viewTypeBottomLabel | 展示模式下下標題    | bottomLabel | Any      |
| disabled            | 是否禁用勾選框      | false       | Boolean  |

## 1.2. 可用theme

| theme 名                  | theme 效果                              |
| ------------------------- | --------------------------------------- |
| 展示模式                  | 僅展示欄為值、不開放修改的模式          |
| viewTypeContainer         | 展示模式 - 容器樣式                     |
| viewTypeTopLabel          | 展示模式 - 上標題樣式                   |
| viewTypeCheckboxContainer | 展示模式 - 輸入框本體樣式               |
| viewTypeCheckbox          | 展示模式 - 當前展示文字樣式             |
| viewTypeBottomLabel       | 展示模式 - 下標題樣式                   |
| 一般模式                  | 一般模式                                |
| container                 | 一般模式 - 容器樣式                     |
| topLabel                  | 一般模式 - 上標題樣式                   |
| checkboxContainer         | 一般模式 - 輸入框本體樣式               |
| checkbox                  | 一般模式 - 暫不開放修改，欲修改請洽阿華 |
| bottomLabel               | 一般模式 - 下標題樣式                   |

| 預設樣式     |
| ------------ |
| DefaultTheme |

### 1.2.1. theme 範例
```js
{
    ...
}


```