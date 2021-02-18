import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { SubContainer } from '../Containers/SubContainer';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { isNil } from 'lodash/lang'
import { Table as TableExtend } from 'antd';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Eye } from './Assets/img/Eye.svg'
import { ReactComponent as EyeInvisible } from './Assets/img/EyeInvisible.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
// import PrimaryTheme from './Theme/PrimaryTheme'
import DisableTheme from './Theme/DisableTheme'
import { BasicContainer } from '../Containers/BasicContainer';
import { Text } from '../Texts/Text/Text';
import { ScrollBar } from '../ScrollBar/ScrollBar';
import { cssifyObject } from 'css-in-js-utils'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "SecondaryTheme":
        //     return SecondaryTheme;
        case "DisableTheme":
            return DisableTheme;
        // case "PrimaryTheme":
        //     return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region 繼承之Table
const TableExtendStyle = styled(TableExtend).attrs((props) => ({}))`

//#region table容器 wrapper 
&&.ant-table-wrapper {
    ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "wrapper")['basic']))}  
}
//#endregion

//#region table子容器 container 
&& .ant-spin-container {
    ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container")['basic']))}  
}
//#endregion

//#region table次子容器 nested 
&& .ant-spin-nested-loading {
    ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "nested")['basic']))}  
}
//#endregion

//#region table本體容器 tableContainer
&& .ant-table {
    // 減去頁腳欄
    ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tableContainer")['basic']))}  
}
//#endregion

//#region table本體不包含頁腳容器 tableContainerWithoutPageFoot
&& .ant-table-container {
    // 減去頁腳欄
    ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tableContainerWithoutPageFoot")['basic']))}  
}
//#endregion

&& .ant-table-header {

    //#region 標題列 tableHeaderRow
    tr {
        ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tableHeaderRow")['basic']))}  
    }
    //#endregion

    //#region 標題列每個格子 tableHeaderCell 
    .ant-table-cell {
        ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tableHeaderCell")['basic']))}  
    }
    //#endregion

    //#region 標題列固定於左方的每個格子 tableHeaderFixLeftCell 
    .ant-table-cell.ant-table-cell-fix-left {
        ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tableHeaderFixLeftCell")['basic']))}  
    }
    //#endregion

    //#region 標題列固定於右方的每個格子 tableHeaderFixRightCell 
    .ant-table-cell.ant-table-cell-fix-right {
        ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tableHeaderFixRightCell")['basic']))}  
    }
    //#endregion

    //#region 標題列最右方佔位 tableHeaderFixRightOccupyCell 
    .ant-table-cell.ant-table-cell-fix-right.ant-table-cell-scrollbar {
        ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tableHeaderFixRightOccupyCell")['basic']))}  
    }
    //#endregion
}

&& .ant-table-body {

    //#region 表格內所有資料列容器 tableRowContainer
    // 減去頁腳欄，還要減去頭部的高 55 
    ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tableRowContainer")['basic']))};
    //#endregion

    //#region 表格內資料列 tableRow
    .ant-table-row {
        ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tableRow")['basic']))}  
    }
    //#endregion

    //#region 表格內每個格子 tableBodyCell 
    .ant-table-cell {
        ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tableBodyCell")['basic']))}  
    }
    //#endregion

    //#region 表格內固定於左方的每個格子 tablebodyFixLeftCell 
    .ant-table-cell.ant-table-cell-fix-left {
        ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tablebodyFixLeftCell")['basic']))}  
    }
    //#endregion

    //#region 表格內固定於右方的每個格子 tablebodyFixRightCell 
    .ant-table-cell.ant-table-cell-fix-right {
        ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tablebodyFixRightCell")['basic']))}  
    }
    //#endregion

    //#region 滾動條美化
    ::-webkit-scrollbar {
        width: 17px;
        height: 17px; //scroll-x 的高度
    }
    ::-webkit-scrollbar-track {
        //border-radius: 10px;
        background: #f5f5f5;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.25);
        overflow: auto;
        border: 5px solid transparent;
        background-clip: padding-box;
        border-radius: 60px;
        transition: height 0.2s ease-in-out;
    }
    ::-webkit-scrollbar-corner { 
        background: #f5f5f5;
    }
    &:hover::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.25);
        overflow: auto;
        border: 5px solid transparent;
        background-clip: padding-box;
        border-radius: 60px;
        transition: height 0.2s ease-in-out;
    }
    //#endregion 
}

//#region 頁腳
&& .ant-pagination {
    margin: 16px 8px 16px 0;
}
//#endregion
`
//#endregion

//#region 表單內的勾選框
export const OldTableBase = (props) => {

    // const [OnInitial, setOnInitial] = useState(true); // 用於 onChange 中 初始渲染與 後續選染動作不同時
    // const [Focus, setFocus] = useState(false); // 本組件不使用
    // const [Hover, setHover] = useState(false); // 本組件不使用

    const [Width, Height] = useWindowSize();//響應螢幕大小變化
    useEffect(() => { }, [Width, Height])

    //#region 黨傳入的資料發生改變時，可選擇要不要清除已勾選列
    useEffect(() => {
        if (props.dataChangeClearChecked) {
            setChecked([]);
            props?.dataChangeClearCheckedToDo && props.dataChangeClearCheckedToDo();
        }
    }, [props.data])
    //#endregion

    const [SortedInfo, setSortedInfo] = useState({}); //排序功能
    const [FilteredInfo, setFilteredInfo] = useState({}); //過濾功能
    const [Checked, setChecked] = useState([]);

    const outContainerRef = useRef();

    useEffect(() => {
        setChecked(props.checked ?? []);
        // if (!isNil(props.checked)) {
        //     props.onChange && props.onChange(null, props.checked, OnInitial);
        //     setOnInitial(false);
        // }
    }, [props.checked/*, props.onChange*/])

    //#region 自添加排序與過濾函數
    const initialSortAndFilter = (props, sortedInfo) => {
        let restoreColumns = []; // 將外面傳入的 columns 重新整理後的結果
        if (props.sort) {
            restoreColumns = (props.columnsAttr ?? []).map((item, index) => {
                if (props.canSortKey) {
                    //具指定排序欄
                    if ((props.canSortKey ?? []).includes(item?.dataIndex)) {
                        return {
                            sorter: (a, b) => a[`${item.dataIndex}`] - b[`${item.dataIndex}`], //
                            sortOrder: sortedInfo?.columnKey === item?.dataIndex && sortedInfo?.order,
                            ...item, //自後面遍歷保留外部覆蓋
                            key: item?.dataIndex, //Sort key自動補齊為 dataIndex
                        }
                    }
                    else {
                        return { ...item }
                    }
                }
                else {
                    //不具指定排序欄，全排
                    return {
                        sorter: (a, b) => a[`${item.dataIndex}`] - b[`${item.dataIndex}`], //
                        sortOrder: sortedInfo?.columnKey === item?.dataIndex && sortedInfo?.order,
                        ...item, //自後面遍歷保留外部覆蓋
                        key: item?.dataIndex, //Sort key自動補齊為 dataIndex
                    }
                }
            })

            return restoreColumns;
        }
        else {
            restoreColumns = (props.columnsAttr ?? []).map((item, index) => {
                return { ...item, sorter: null }
            })
            return restoreColumns;
        }
    }
    //#endregion

    //#region 排序與過濾處理函數
    const handleSortAndFilter = (pagination, filters, sorter) => {
        //console.log('Various parameters', pagination, filters, sorter);
        setSortedInfo(sorter)
        setFilteredInfo(filters)
    };
    //#endregion

    return (
        <>
            {/* 最外層容器 outContainer */}
            <BasicContainer
                ref={outContainerRef}
                baseDefaultTheme={"DefaultTheme"}
                theme={{ ...iterateTheme({ ...props, outContainerRef: outContainerRef }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "outContainer") }}
            >
                <TableExtendStyle
                    fref={outContainerRef.current}
                    locale={{
                        emptyText: props?.noDataMessage ?
                            props.noDataMessage
                            :
                            (
                                <Text
                                    baseDefaultTheme={"DefaultTheme"}
                                    theme={{ ...iterateTheme({ ...props, height: outContainerRef.current?.clientHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "noDataMessage") }}
                                >
                                    查無資料
                                    <div className={"ant-pagination"} style={{ height: "32px", margin: "16px" }} />
                                </Text>
                            ),
                        // filterTitle: 'Filter menu',
                        // filterConfirm: 'OK',
                        // filterReset: 'Reset',
                        // filterEmptyText: 'No filters',
                        // selectAll: 'Select current page',
                        // selectInvert: 'Invert current page',
                        // selectionAll: 'Select all data',
                        // sortTitle: 'Sort',
                        // expand: 'Expand row',
                        // collapse: 'Collapse row',
                        triggerDesc: '點擊遞減排序',
                        triggerAsc: '點擊遞增排序',
                        cancelSort: '點擊取消排序',
                    }}

                    rowSelection={props.checkbox ? {
                        onChange: (checkedRowKeys, checkedRows) => {
                            setChecked(checkedRowKeys)
                            props.checkboxOnChecked(checkedRowKeys, checkedRows)
                        }, //為函數 第一個參數為對應CheckBox當列資料的 "key" 值，第二個參數為 "當列資料"
                        // (selectedRowKeys, selectedRows) => {
                        //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        // },
                        getCheckboxProps: props.setPerCheckBoxDisabled, //為函數 第一個參數為對應CheckBox當列資料
                        // (record) => {
                        //     return {
                        //         // ...record, // 對應CheckBox當列資料
                        //         disabled: record.name === '誰誰誰',
                        //         //name: record.name,
                        //     }
                        // },
                        selectedRowKeys: Checked
                    } : false}
                    columns={initialSortAndFilter(props, SortedInfo)} // 用於設定欄， width 必傳
                    dataSource={(props.data ?? []).map((item, index) => ({ ...item, key: props?.checkedRowKeyName ? item[props.checkedRowKeyName] : index }))}
                    scroll={{
                        x: props?.scrollAreaWidth ?? calcScrollAreaWidth(props.columnsAttr),
                        y: props?.scrollAreaHeight ?? calcScrollAreaHeight(props.columnsAttr, outContainerRef)
                    }} //x:"1900px",y:"calc( 100% - 55px )"
                    fatherHeight={outContainerRef.current?.clientHeight}
                    fatherWidth={outContainerRef.current?.clientWidth}
                    tableHeaderHeight={outContainerRef.current?.getElementsByClassName("ant-table-thead")[0]?.clientHeight ?? 0}
                    pageFootHeight={getElementTotalHeight(outContainerRef.current?.getElementsByClassName("ant-pagination")[0])}
                    onChange={handleSortAndFilter}//處理排序
                    pagination={{
                        locale: {
                            // items_per_page: '/ 頁',
                            // jump_to: 'Go to',
                            // jump_to_confirm: 'confirm',
                            // page: '',
                            // prev_page: 'Previous Page',
                            // next_page: 'Next Page',
                            // prev_5: 'Previous 5 Pages',
                            // next_5: 'Next 5 Pages',
                            // prev_3: 'Previous 3 Pages',
                            // next_3: 'Next 3 Pages',
                            items_per_page: '/ 頁',
                            jump_to: '前往',
                            jump_to_confirm: '確認',
                            page: '',
                            prev_page: '前一頁',
                            next_page: '後一頁',
                            prev_5: '往前五頁',
                            next_5: '往後五頁',
                            prev_3: '往前三頁',
                            next_3: '往後三頁'
                        },
                        // current: 5, 
                        pageSize: props.pageSize,
                        showTitle: false,
                        pageSizeTitle: false,
                        pageSizeOptions: props?.pageSizeOptions ?? [10, 20, 50, 100],
                        showQuickJumper: props.quickJump ?? true,
                        total: props?.data?.[props?.countKeyName ?? 'count'],
                        hideOnSinglePage: false,
                        onChange: (currentPage, pageSize) => { props?.clickPage && props.clickPage(currentPage, pageSize, props?.data?.length); console.log(currentPage, pageSize) },
                        onShowSizeChange: (currentPage, pageSize) => { props.clickPageSize && props.clickPageSize(currentPage, pageSize, props?.data?.length); console.log(currentPage, pageSize) },
                        //showTotal: ((total) => { return `共 ${total} 筆` })
                    }}
                    {...props}
                />
            </BasicContainer>
        </>
    )
}

//#region 計算滾動區寬度
const calcScrollAreaWidth = (columns) => {
    // console.log(columns)
    let res = "calc(+";
    (columns ?? []).forEach(item => {
        if (item.width) {
            res = res + `+ ${item.width} `
        }
    });
    res = res + ")";
    res = res.replace("++", "");

    //console.log(res)
    if (res === "calc( +)") {
        return null;
    }

    return res;
}
//#endregion

//#region 計算Table不包含 Header高度
const calcScrollAreaHeight = (columns, fatherRef) => {
    let headerHeight = fatherRef.current?.getElementsByClassName("ant-table-thead")[0]?.clientHeight;
    // let paginationEl = fatherRef.current?.getElementsByClassName("ant-pagination")[0];

    if (headerHeight) {
        return `calc( 100% - ${headerHeight}px )`
    }
    else {
        return `calc( 100% )`
    }
}
//#endregion

//#region 計算傳入元素包含Margin高度
const getElementTotalHeight = (element) => {

    let paginationMarginTop, paginationMarginBottom, paginationHeight;

    if (element) {
        paginationMarginTop = window.getComputedStyle(element)["margin-top"];
        paginationMarginBottom = window.getComputedStyle(element)["margin-bottom"];
        paginationHeight = window.getComputedStyle(element)["height"];
    }

    let res = parseInt(paginationMarginTop, 10) + parseInt(paginationMarginBottom, 10) + parseInt(paginationHeight, 10);

    return res
}
//#endregion

export const OldTable = styled(OldTableBase).attrs((props) => ({}))`

`
//#endregion
