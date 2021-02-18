- [1. Textarea](#1-textarea)
  - [1.1. 可用 props](#11-可用-props)
  - [1.2. 可用theme](#12-可用theme)
    - [1.2.1. theme 範例](#121-theme-範例)

# 1. Textarea

Textarea為文字區域輸入框，於FormRow內使用，推薦搭配 globalContextService 使用
使用範例 : 

```js
<Textarea
    bascDefaultTheme={"DefaultTheme"}
    topLabel={<>標題<div style={{ display: "inline-block", color: "red" }}>(必填)</div></>}
    theme={{...}}
    type="text"
    placeholder={"請輸入關鍵字"}
    value={globalContextService.get("CasePage", "Keyword") ?? "預設選項"}
    onChange={(e, value, onInitial) => {
        globalContextService.set("CasePage", "Keyword", value);
    }}
>
                      
```

## 1.1. 可用 props

| props 名            | props 效果                                | 預設值      | 類型     |
| ------------------- | ----------------------------------------- | ----------- | -------- |
| viewType            | 是否開啟展示模式                          | 無          | Boolean  |
| topLabel            | 上標題                                    | 無          | Any      |
| viewTypeTopLabel    | 展示模式下上標題                          | topLabel    | Any      |
| textareaLineHeight  | 設定每行高度(px)                          | 32          | Int      |
| value               | 設定輸入框值/初始值                       | 無          | String   |
| onChange            | 當輸入值後執行的動作                      | 無          | function |
| bottomLabel         | 下標題                                    | 無          | Any      |
| viewTypeBottomLabel | 展示模式下下標題                          | bottomLabel | Any      |
| placeholder         | 提示文字                                  | 無          | String   |
| autoComplete        | 自動完成功能                              | "off"       | Boolean  |
| disabled            | 是否禁用輸入框                            | false       | Boolean  |
| leftIcon            | 左側圖標                                  | 無          | Any      |
| children            | 輸入框本體 (textareaContainer) 內其他組件 | 無          | Any      |
| rightIcon           | 右側圖標                                  | 無          | Any      |
| openEye             | 使否開啟顯示密碼功能                      | false       | Boolean  |

## 1.2. 可用theme

| theme 名                  | theme 效果                     |
| ------------------------- | ------------------------------ |
| 展示模式                  | 僅展示欄為值、不開放修改的模式 |
| viewTypeContainer         | 展示模式 - 容器樣式            |
| viewTypeTopLabel          | 展示模式 - 上標題樣式          |
| viewTypeTextareaContainer | 展示模式 - 輸入框本體樣式      |
| viewTypeTextarea          | 展示模式 - 當前展示文字樣式    |
| viewTypeTextareaBottom    | 展示模式 - 斷行底線樣式        |
| viewTypeBottomLabel       | 展示模式 - 下標題樣式          |
| 一般模式                  | 一般模式                       |
| container                 | 一般模式 - 容器樣式            |
| topLabel                  | 一般模式 - 上標題樣式          |
| textareaContainer         | 一般模式 - 輸入框本體樣式      |
| textarea                  | 一般模式 - NativeTextarea樣式  |
| eyeIcon                   | 一般模式 - 眼睛圖標樣式        |
| bottomLabel               | 一般模式 - 下標題樣式          |

| 預設樣式     |
| ------------ |
| DefaultTheme |

### 1.2.1. theme 範例
```js
{
    ...
}


```