- [1. OldTable](#1-oldtable)
  - [1.1. 可用 props](#11-可用-props)
  - [1.2. 可用theme](#12-可用theme)
    - [1.2.1. theme 範例](#121-theme-範例)

# 1. OldTable

OldTable為table，勾選功能推薦搭配 globalContextService 使用。
使用範例 : 

```js
<OldTable
    checkbox={true} 
    checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
    checkedRowKeyName={"id"}
    checkboxOnChecked={
        (checkedRowKeys, checkedRows) => {
            console.log(`已選擇的RowKeys: ${checkedRowKeys}`, '對應已選擇的RowKeys當列資料: ', checkedRows);
        }
    }
    setPerCheckBoxDisabled={(record) => {
        return {
            // ...record, // 對應CheckBox當列資料
            disabled: record.name === 'Arhua',// 對於所有的列，設定符合條件 (name等於Arhua) 的就禁用
        }
    }}
    columnsAttr={
        //#region 資料欄設定
        [
            {
                title: '',
                width: "0px",
                dataIndex: 'leftOccupy',
                fixed: 'left',
                sorter: false
            },
            {
                title: '單位名稱',
                width: "600px",
                dataIndex: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
                // fixed: 'left',
            },
            ... 
            {
                title: '狀態控制台',
                width: "176px",
                dataIndex: 'parentName',
                sorter: (a, b) => a.name.length - b.name.length,
                fixed: 'right',
            },
            {
                title: '',
                width: "0px",
                dataIndex: 'rightOccupy',
                fixed: 'right',
                sorter: false
            },
        ]
        //#endregion
    }
    data={props.SubOrgs.data} // 後端回傳的資料
    clickPage={(currentPage, pageSize) => { 
      // 點擊換頁時 觸發的事件 ，
      // currentPage : 為點擊要跳轉的頁面、pageSize : 為目前每頁顯示比數
        ...
    }}
    onShowSizeChange={(currentPage, pageSize) => { 
      // 切換每頁筆數時 觸發的事件 ，
      // currentPage : 為點擊要跳轉的頁面、pageSize : 為目前每頁顯示比數
        ...
    }}
    sort={true}  // 是否開啟排序功能
    showHeader={true} // 是否顯示標題列
    dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
    dataChangeClearCheckedType={"valueEqual"} // 設定如何判斷Data變動，以便清空已勾選項， native、valueEqual 
    dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
        globalContextService.remove("OrgManagerPage", "CheckedRowKeys");
        globalContextService.remove("OrgManagerPage", "CheckedRowsData");
    }}
/>
                      
```

## 1.1. 可用 props

| props 名                   | props 效果                                                                                       | 預設值                   | 類型     |
| -------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------ | -------- |
| data                       | Table資料                                                                                        | 無                       | 物件陣列 |
| dataChangeClearChecked     | 當Data變動時 是否清空已勾選項，若為false，在切換不同data下有一樣的key，則會被勾選                | false                    | Boolean  |
| dataChangeClearCheckedToDo | 當Data變動時 要清空已勾選項時，執行的函數                                                        | 無                       | function |
| scrollAreaWidth            | Table滾動區寬度                                                                                  | 自適應寬度(一般無須設置) | String   |
| scrollAreaHeight           | Table滾動區高度                                                                                  | 自適應高度(一般無須設置) | String   |
| sort                       | 是否開啟排序功能                                                                                 | false                    | Boolean  |
| canSortKey                 | 能夠被排序的欄名                                                                                 | 無                       | 字串陣列 |
| columnsAttr                | Table欄 屬性設定(詳見下方)                                                                       | 無                       | 物件陣列 |
| checkbox                   | 是否開啟勾選框                                                                                   | false                    | Boolean  |
| checked                    | 設定預設勾選列(by checkedRowKey)                                                                 | []                       | Array    |
| setPerCheckBoxDisabled     | 用於指定禁用符合條件的勾選框 (record 對應CheckBox當列資料 )                                      | 無                       | function |
| checkboxOnChecked          | 勾選勾選框時觸發的函數 (checkedRowKeys 已選擇的RowKeys, checkedRows 對應已選擇的RowKeys當列資料) | 無                       | function |
| pageSize                   | 指定每頁顯示筆數                                                                                 | 10 (一般無須設置)        | int      |
| pageSizeOptions            | 顯示比數選單                                                                                     | [10, 20, 50, 100]        | Array    |
| clickPage                  | 點擊換頁時觸發的事件，(currentPage : 為點擊要跳轉的頁面, pageSize : 為目前每頁顯示比數)          | 無                       | function |
| clickPageSize              | 切換每頁筆數時觸發的事件，(currentPage : 為點擊要跳轉的頁面, pageSize : 為目前每頁顯示比數)      | 無                       | function |
| quickJump                  | 是否要開啟快速跳頁輸入框                                                                         | true                     | Boolean  |
| noDataMessage              | 查無資料時顯示的畫面                                                                             | 查無資料                 | Any      |


```js
// columnsAttr
[
    {
        //這一個是用來Table左方佔位用的 (例如只想固定勾選欄時使用)
        title: '',
        width: "0px",
        dataIndex: 'leftOccupy',
        fixed: 'left',
        sorter: false
    },
    {
        //設定Table欄
        title: '單位名稱', //標題名稱，顯示於標題欄
        width: "600px",  // 欄位寬度
        dataIndex: 'name', //欄位吃的 data 資料列裡的 Key 名
        sorter: (a, b) => a.name.length - b.name.length, //看有沒有需要 自訂排序，預設是按數字大小排
        // fixed: 'left', // 有沒有要固定於左方
    },
    ... 
    {
        //設定Table欄
        title: '狀態控制台',
        width: "176px",
        // 不傳 dataIndex ，則可在下方 render函數第一個參數獲得當列資料
        sorter: (a, b) => a.name.length - b.name.length,
        fixed: 'right', // 有沒有要固定於右方
        render: (rowData) => (<>... 自定義要渲染的項目<>)
    },
    {
        //這一個是用來Right左方佔位用的 (例如右方Table標題跑板時)
        title: '',
        width: "0px",
        dataIndex: 'rightOccupy',
        fixed: 'right',
        sorter: false
    },
]
```


## 1.2. 可用theme

| theme 名                      | theme 效果                       |
| ----------------------------- | -------------------------------- |
| outContainer                  | 最外層容器樣式                   |
| wrapper                       | table容器樣式                    |
| container                     | table子容器樣式                  |
| nested                        | table次子容器樣式                |
| tableContainer                | table本體容器樣式                |
| tableContainerWithoutPageFoot | table本體不包含頁腳容器樣式      |
| tableHeaderRow                | 標題列樣式                       |
| tableHeaderCell               | 標題列每個格子樣式               |
| tableHeaderFixLeftCell        | 標題列固定於左方的每個格子式樣式 |
| tableHeaderFixRightCell       | 標題列固定於右方的每個格子樣式   |
| tableHeaderFixRightOccupyCell | 標題列最右方佔位樣式             |
| tableRowContainer             | 表格內所有資料列容器樣式         |
| tableRow                      | 表格內資料列樣式                 |
| tableBodyCell                 | 表格內每個格子樣式               |
| tablebodyFixLeftCell          | 表格內固定於左方的每個格子樣式   |
| tablebodyFixRightCell         | 表格內固定於右方的每個格子樣式   |
| noDataMessage                 | 查無資料文字樣式樣式             |


| 預設樣式     |
| ------------ |
| DefaultTheme |

### 1.2.1. theme 範例
```js
{
    ...
}


```