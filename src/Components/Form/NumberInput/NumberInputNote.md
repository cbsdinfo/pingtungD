- [1. NumberInput](#1-numberinput)
  - [1.1. 可用 props](#11-可用-props)
  - [1.2. 可用theme](#12-可用theme)
    - [1.2.1. theme 範例](#121-theme-範例)

# 1. NumberInput

NumberInput為數字輸入框，於FormRow內使用，推薦搭配 globalContextService 使用
使用範例 : 

```js
<NumberInput
    // type={"time"} time、date、week、month、quarter、year
    type={"time"}
    format={"HH:mm"}
    //  disable
    bascDefaultTheme={"DefaultTheme"}
    topLabel={<>可否派發<Text theme={laptopL.canAssignRequired}>(必填)</Text></>}
    // viewType
    isSearchable
    placeholder={""}
    value={
        // (globalContextService.get("DriversAddPage", "moment") ?
        //     moment(globalContextService.get("DriversAddPage", "moment"), "HH:mm")
        //     :
        //     null
        // )
        moment()
    }
    onChange={(value, momentObj) => {
        globalContextService.set("DriversAddPage", "moment", value);
    }}
  
    theme={{...}}
/>
                      
```

## 1.1. 可用 props

| props 名            | props 效果                              | 預設值      | 類型     |
| ------------------- | --------------------------------------- | ----------- | -------- |
| viewType            | 是否開啟展示模式                        | 無          | Boolean  |
| topLabel            | 上標題                                  | 無          | Any      |
| viewTypeTopLabel    | 展示模式下上標題                        | topLabel    | Any      |
| value               | 設定數字輸入框值/初始值，(空值回傳null) | 無          | Boolean  |
| max                 | 設定數字輸入框最大值                    | 無          | Number   |
| min                 | 設定數字輸入框最小值                    | 無          | Number   |
| step                | 設定數字間格                            | 1           | Number   |
| formatter           | 設定數字顯示格式                        | 3位一撇     | function |
| precision           | 設定數字小數點位數                      | 0           | Int      |
| onChange            | 當輸入後執行的動作                      | 無          | function |
| placeholder         | 提示字串                                | 請選擇{...} | String   |
| bottomLabel         | 下標題                                  | 無          | Any      |
| viewTypeBottomLabel | 展示模式下下標題                        | bottomLabel | Any      |
| disable             | 是否禁用數字輸入框                      | false       | Boolean  |

## 1.2. 可用theme

| theme 名                     | theme 效果                                    |
| ---------------------------- | --------------------------------------------- |
| 展示模式                     | 僅展示欄為值、不開放修改的模式                |
| viewTypeContainer            | 展示模式 - 容器樣式                           |
| viewTypeTopLabel             | 展示模式 - 上標題樣式                         |
| viewTypeNumberInputContainer | 展示模式 - 輸入框本體樣式                     |
| viewTypeNumberInput          | 展示模式 - 當前展示文字樣式                   |
| viewTypeBottomLabel          | 展示模式 - 下標題樣式                         |
| 一般模式                     | 一般模式                                      |
| container                    | 一般模式 - 容器樣式                           |
| topLabel                     | 一般模式 - 上標題樣式                         |
| numberInputContainer         | 一般模式 - 日期選擇框本體樣式                 |
| numberInputSubContainer      | 一般模式 -日期選擇框 次容器 (主要修改高度)    |
| numberInput                  | 一般模式 -日期選擇框 的 Input，欲修改請洽阿華 |
| bottomLabel                  | 一般模式 - 下標題樣式                         |

| 預設樣式     |
| ------------ |
| DefaultTheme |

### 1.2.1. theme 範例
```js
{
    ...
}


```