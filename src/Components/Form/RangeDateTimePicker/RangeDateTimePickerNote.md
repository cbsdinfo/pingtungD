- [1. DateTimePicker](#1-datetimepicker)
  - [1.1. 可用 props](#11-可用-props)
  - [1.2. 可用theme](#12-可用theme)
    - [1.2.1. theme 範例](#121-theme-範例)

# 1. DateTimePicker

DateTimePicker為日期時間下拉選單，於FormRow內使用，推薦搭配 globalContextService 使用
使用範例 : 

```js
<DateTimePicker
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

| props 名            | props 效果                                                | 預設值      | 類型     |
| ------------------- | --------------------------------------------------------- | ----------- | -------- |
| viewType            | 是否開啟展示模式                                          | 無          | Boolean  |
| topLabel            | 上標題                                                    | 無          | Any      |
| viewTypeTopLabel    | 展示模式下上標題                                          | topLabel    | Any      |
| value               | 設定日期時間下拉選單值/初始值                             | 無          | Boolean  |
| type                | 設定選單種類，支援 time、date、week、month、quarter、year | date        | String   |
| canClear            | 是否開啟移除所選項功能                                    | false       | Boolean  |
| onChange            | 當選擇後執行的動作                                        | 無          | function |
| placeholder         | 提示字串                                                  | 請選擇{...} | String   |
| showToday           | 選單內顯示移動到"今天"(僅date支援)                        | false       | Boolean  |
| extraFooter         | 選單底部渲染額外組件                                      | 無          | Any      |
| hourStep            | time 小時間格                                             | 1           | Int      |
| minuteStep          | time 分鐘間格                                             | 1           | Int      |
| secondStep          | time 秒間格                                               | 1           | Int      |
| bottomLabel         | 下標題                                                    | 無          | Any      |
| viewTypeBottomLabel | 展示模式下下標題                                          | bottomLabel | Any      |
| disable             | 是否禁用日期時間下拉選單                                  | false       | Boolean  |

## 1.2. 可用theme

| theme 名                        | theme 效果                                    |
| ------------------------------- | --------------------------------------------- |
| 展示模式                        | 僅展示欄為值、不開放修改的模式                |
| viewTypeContainer               | 展示模式 - 容器樣式                           |
| viewTypeTopLabel                | 展示模式 - 上標題樣式                         |
| viewTypeDateTimePickerContainer | 展示模式 - 輸入框本體樣式                     |
| viewTypeDateTimePicker          | 展示模式 - 當前展示文字樣式                   |
| viewTypeBottomLabel             | 展示模式 - 下標題樣式                         |
| 一般模式                        | 一般模式                                      |
| container                       | 一般模式 - 容器樣式                           |
| topLabel                        | 一般模式 - 上標題樣式                         |
| dateTimePickerContainer         | 一般模式 - 日期選擇框本體樣式                 |
| dateTimePickerSubContainer      | 一般模式 -日期選擇框 次容器 (主要修改高度)    |
| dateTimePickerInput             | 一般模式 -日期選擇框 的 Input，欲修改請洽阿華 |
| bottomLabel                     | 一般模式 - 下標題樣式                         |

| 預設樣式     |
| ------------ |
| DefaultTheme |

### 1.2.1. theme 範例
```js
{
    ...
}


```