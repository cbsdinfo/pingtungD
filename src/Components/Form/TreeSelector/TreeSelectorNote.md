- [1. TreeSelector](#1-treeselector)
  - [1.1. 可用 props](#11-可用-props)
  - [1.2. 可用theme](#12-可用theme)
    - [1.2.1. theme 範例](#121-theme-範例)

# 1. TreeSelector

TreeSelector類似於Selector為下拉選單，支持單、多選、搜尋，選後移除/不移除選項等，但options為樹狀結構，並且可指定 value 與 label 的 key 名，於FormRow內使用，推薦搭配 globalContextService 使用
使用範例 : 

```js
<TreeSelector
    bascDefaultTheme={"DefaultTheme"}
    topLabel={<>上層機構</>}
    //viewType
    isSearchable
    placeholder={"請選擇..."}
    // isMulti
    // hideSelectedOptions={false}
    value={globalContextService.get("OrgManagerPage", "UpperOrg") ?? { value: rowData.parentId, label: rowData.parentName }}
    onChange={(e, value, onInitial) => {
        globalContextService.set("OrgManagerPage", "UpperOrg", value);
    }}
    options={props.OrgsTree}
    // addHeadOptions={[{ value: null, label: "根節點" }]}
    optionsValueKeyName={"id"}
    optionsLabelKeyName={"name"}
    menuPosition={true}
    theme={...}
/>
                      
```

## 1.1. 可用 props

| props 名            | props 效果                                                                                  | 預設值                | 類型            |
| ------------------- | ------------------------------------------------------------------------------------------- | --------------------- | --------------- |
| viewType            | 是否開啟展示模式                                                                            | 無                    | Boolean         |
| topLabel            | 上標題                                                                                      | 無                    | Any             |
| viewTypeTopLabel    | 展示模式下上標題                                                                            | topLabel              | Any             |
| value               | 設定下拉選單值/初始值                                                                       | 無                    | String          |
| onChange            | 當選擇下拉選單值後執行的動作                                                                | 無                    | function        |
| isSearchable        | 是否開啟搜尋功能                                                                            | false                 | Boolean         |
| isClearable         | 是否開啟清除選項功能                                                                        | false                 | Boolean         |
| isMulti             | 是否開啟多選功能                                                                            | false                 | Boolean         |
| hideSelectedOptions | 選擇選項後是否從選單內移除                                                                  | 多選 true /單選 false | Boolean         |
| options             | 選項 ，為物件組成的陣列，物件固定有 value、label、isDisabled ；分別設定 :值、標籤、是否禁用 | 無                    | Array           |
| addHeadOptions      | 添加額外的選項至選單最上方                                                                  | 無                    | Array 或 Object |
| addTailOptions      | 添加額外的選項至選單最下方                                                                  | 無                    | Array 或 Object |
| optionsValueKeyName | 用於指定 選項的 value key                                                                   | id                    | String          |
| optionsLabelKeyName | 用於指定選項的 value name                                                                   | name                  | String          |
| maxMenuHeight       | 下拉選單最高高度                                                                            | 200px                 | String          |
| noOptionsMessage    | 無符合資料提示字串                                                                          | 無符合資料            | String          |
| placeholder         | 提示文字                                                                                    | 無                    | String          |
| bottomLabel         | 下標題                                                                                      | 無                    | Any             |
| viewTypeBottomLabel | 展示模式下下標題                                                                            | bottomLabel           | Any             |
| disabled            | 是否禁用輸入框                                                                              | false                 | Boolean         |

```js
options 資料結構 

[
    {
        item: { value: "值", label: "選項標題", ...},
        children: [ 
            {
                item: { value: "值", label: "選項標題", ...},
                children: [ ... ]
            },
            {
                item: { value: "值", label: "選項標題", ...},
                children: [ ... ]
            },
            ...
        ]
    },
    {
        item: { value: "值", label: "選項標題", ...},
        children: [ ... ]
    },
    ...
]

```

## 1.2. 可用theme

| theme 名                  | theme 效果                            |
| ------------------------- | ------------------------------------- |
| 展示模式                  | 僅展示欄為值、不開放修改的模式        |
| viewTypeContainer         | 展示模式 - 容器樣式                   |
| viewTypeTopLabel          | 展示模式 - 上標題樣式                 |
| viewTypeSelectorContainer | 展示模式 - 輸入框本體樣式             |
| viewTypeSelector          | 展示模式 - 當前展示文字樣式           |
| viewTypeBottomLabel       | 展示模式 - 下標題樣式                 |
| 一般模式                  | 一般模式                              |
| container                 | 一般模式 - 容器樣式                   |
| topLabel                  | 一般模式 - 上標題樣式                 |
| SelectorContainer         | 一般模式 - 輸入框本體樣式             |
| Selector                  | 一般模式 - 不提供修改，需修改請洽阿華 |
| rewriteTextContainer      | 一般模式 - 重寫選項文字容器           |
| rewriteCaretDownIcon      | 一般模式 - 重寫選項展開、收合圖標     |
| eyeIcon                   | 一般模式 - 眼睛圖標樣式               |
| bottomLabel               | 一般模式 - 下標題樣式                 |

| 預設樣式     |
| ------------ |
| DefaultTheme |

### 1.2.1. theme 範例
```js
{
    ...
}


```