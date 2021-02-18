- [1. Radio](#1-radio)
  - [1.1. 可用 props](#11-可用-props)
  - [1.2. 可用theme](#12-可用theme)
    - [1.2.1. theme 範例](#121-theme-範例)

# 1. Radio

Radio為單選框，並使用 RadioItem 設定選項資訊，於FormRow內使用，推薦搭配 globalContextService 使用
使用範例 : 

```js
<Radio
  // viewType
  topLabel={"車輛審核"}
  value={1}
  onChange={(e, value, onInitial) => {
    // console.log(value)
    globalContextService.set("CarsAddPage", "CarReview", value);
    // console.log(globalContextService.get("CarsAddPage", "CarReview"));
    }}
    theme={...}
>
  {/* 選項 */}
  <RadioItem value={1} >是</RadioItem>
  <RadioItem value={0} disable >否</RadioItem>
</Radio>
                      
```

## 1.1. 可用 props

| props 名            | props 效果          | 預設值      | 類型        |
| ------------------- | ------------------- | ----------- | ----------- |
| viewType            | 是否開啟展示模式    | 無          | Boolean     |
| topLabel            | 上標題              | 無          | Any         |
| viewTypeTopLabel    | 展示模式下上標題    | topLabel    | Any         |
| children            | RadioItem 選項      | 無          | Any         |
| value               | 設定單選框值/初始值 | 無          | String、Int |
| onChange            | 當勾選後執行的動作  | 無          | function    |
| bottomLabel         | 下標題              | 無          | Any         |
| viewTypeBottomLabel | 展示模式下下標題    | bottomLabel | Any         |
| disable             | 是否禁用單選框      | false       | Boolean     |

## 1.2. 可用theme

| theme 名               | theme 效果                                               |
| ---------------------- | -------------------------------------------------------- |
| 展示模式               | 僅展示欄為值、不開放修改的模式                           |
| viewTypeContainer      | 展示模式 - 容器樣式                                      |
| viewTypeTopLabel       | 展示模式 - 上標題樣式                                    |
| viewTypeRadioContainer | 展示模式 - 單選框本體樣式                                |
| viewTypeRadio          | 展示模式 - 當前展示文字樣式                              |
| viewTypeBottomLabel    | 展示模式 - 下標題樣式                                    |
| 一般模式               | 一般模式                                                 |
| container              | 一般模式 - 容器樣式                                      |
| topLabel               | 一般模式 - 上標題樣式                                    |
| radioContainer         | 一般模式 - 單選框本體樣式                                |
| radioGroup             | 一般模式 - 單選框群組容器樣式 (主要拿來調勾選框容器高度) |
| radio                  | 為了個別  RadioItem 調整樣式 (一般無須修改)              |
| bottomLabel            | 一般模式 - 下標題樣式                                    |

| 預設樣式     |
| ------------ |
| DefaultTheme |

### 1.2.1. theme 範例
```js
{
    ...
}


```