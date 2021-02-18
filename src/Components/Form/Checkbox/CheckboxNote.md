- [1. Checkbox](#1-checkbox)
  - [1.1. 可用 props](#11-可用-props)
  - [1.2. 可用theme](#12-可用theme)
    - [1.2.1. theme 範例](#121-theme-範例)

# 1. Checkbox

Checkbox為勾選框，並使用 CheckboxItem 設定選項資訊，於FormRow內使用，推薦搭配 globalContextService 使用
使用範例 : 

```js
<Checkbox
  // viewType
  // checked={[0]}
  topLabel={"車輛設備"}
  onChange={(e, value, onInitial) => {
    // console.log(value)
    globalContextService.set("CarsAddPage", "CarEquipment", value);
    // console.log(globalContextService.get("CarsAddPage", "CarEquipment"));
    }}
    theme={...}
>
  {/* 選項 */}
    <CheckboxItem value={0} >GPS</CheckboxItem>
    <CheckboxItem value={1} >車機</CheckboxItem>
    <CheckboxItem value={2} disable >攝影機</CheckboxItem>
    <CheckboxItem value={3} >滅火器</CheckboxItem>
</Checkbox>
                      
```

## 1.1. 可用 props

| props 名            | props 效果          | 預設值      | 類型                           |
| ------------------- | ------------------- | ----------- | ------------------------------ |
| viewType            | 是否開啟展示模式    | 無          | Boolean                        |
| topLabel            | 上標題              | 無          | Any                            |
| viewTypeTopLabel    | 展示模式下上標題    | topLabel    | Any                            |
| children            | CheckboxItem 選項   | 無          | Any                            |
| checked             | 設定勾選框值/初始值 | 無          | Array  (CheckboxItem 的 value) |
| onChange            | 當勾選後執行的動作  | 無          | function                       |
| bottomLabel         | 下標題              | 無          | Any                            |
| viewTypeBottomLabel | 展示模式下下標題    | bottomLabel | Any                            |
| disable            | 是否禁用勾選框      | false       | Boolean                        |

## 1.2. 可用theme

| theme 名                  | theme 效果                                               |
| ------------------------- | -------------------------------------------------------- |
| 展示模式                  | 僅展示欄為值、不開放修改的模式                           |
| viewTypeContainer         | 展示模式 - 容器樣式                                      |
| viewTypeTopLabel          | 展示模式 - 上標題樣式                                    |
| viewTypeCheckboxContainer | 展示模式 - 勾選框本體樣式                                |
| viewTypeCheckbox          | 展示模式 - 當前展示文字樣式                              |
| viewTypeBottomLabel       | 展示模式 - 下標題樣式                                    |
| 一般模式                  | 一般模式                                                 |
| container                 | 一般模式 - 容器樣式                                      |
| topLabel                  | 一般模式 - 上標題樣式                                    |
| checkboxContainer         | 一般模式 - 勾選框本體樣式                                |
| checkboxGroup             | 一般模式 - 勾選框群組容器樣式 (主要拿來調勾選框容器高度) |
| checkbox                  | 為了個別  CheckboxItem 調整樣式 (一般無須修改)             |
| bottomLabel               | 一般模式 - 下標題樣式                                    |

| 預設樣式     |
| ------------ |
| DefaultTheme |

### 1.2.1. theme 範例
```js
{
    ...
}


```