import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { ReactComponent as Plus } from '../../../../Assets/img/FastCallCarPage/Plus.svg'
import { ReactComponent as Edit } from '../../../../Assets/img/FastCallCarPage/Edit.svg'
import { ReactComponent as End } from '../../../../Assets/img/FastCallCarPage/End.svg'
import { ReactComponent as Start } from '../../../../Assets/img/FastCallCarPage/Start.svg'
import { ReactComponent as Del } from '../../../../Assets/img/FastCallCarPage/Del.svg'
import { ReactComponent as CallCar } from '../../../../Assets/img/FastCallCarPage/CallCar.svg'
import { ReactComponent as Tip } from '../../../../Assets/img/FastCallCarPage/Tip.svg'
import { useHistory } from 'react-router-dom';
import { Tag, DropDown, DateTimePicker, BasicContainer, FormContainer, FormRow, Checkbox, CheckboxItem, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { toString } from 'lodash/lang';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { fastCallCar: { allFastCallCar: { rwd: { laptopL } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory()

    let data = [
        { identity: "1", roadName: "家-亞東醫院測試用個案a", start: "新北市板橋區板新路27號", end: "新北市板橋區板新路27號新北市板橋區板新路27號" },
        { identity: "2", roadName: "家-亞東醫院測試用個案a", start: "新北市板橋區板新路27號", end: "新北市板橋區板新路27號新北市板橋區板新路27號" },
        { identity: "3", roadName: "家-亞東醫院測試用個案a", start: "新北市板橋區板新路27號", end: "新北市板橋區板新路27號新北市板橋區板新路27號" },
        { identity: "1", roadName: "家-亞東醫院測試用個案a", start: "新北市板橋區板新路27號", end: "新北市板橋區板新路27號新北市板橋區板新路27號" },
        { identity: "2", roadName: "家-亞東醫院測試用個案a", start: "新北市板橋區板新路27號", end: "新北市板橋區板新路27號新北市板橋區板新路27號" },
        { identity: "2", roadName: "家-亞東醫院測試用個案a", start: "新北市板橋區板新路27號", end: "新北市板橋區板新路27號新北市板橋區板新路27號" },
        { identity: "2", roadName: "家-亞東醫院測試用個案a", start: "新北市板橋區板新路27號", end: "新北市板橋區板新路27號新北市板橋區板新路27號" },
        { identity: "3", roadName: "家-亞東醫院測試用個案a", start: "新北市板橋區板新路27號", end: "新北市板橋區板新路27號新北市板橋區板新路27號" },
        { identity: "2", roadName: "家-亞東醫院測試用個案a", start: "新北市板橋區板新路27號", end: "新北市板橋區板新路27號新北市板橋區板新路27號" },
        { identity: "1", roadName: "家-亞東醫院測試用個案a", start: "新北市板橋區板新路27號", end: "新北市板橋區板新路27號新北市板橋區板新路27號" },
        { identity: "1", roadName: "家-亞東醫院測試用個案a", start: "新北市板橋區板新路27號", end: "新北市板橋區板新路27號新北市板橋區板新路27號" },
        { identity: "2", roadName: "家-亞東醫院測試用個案a", start: "新北市板橋區板新路27號", end: "新北市板橋區板新路27號新北市板橋區板新路27號" },
        { identity: "3", roadName: "家-亞東醫院測試用個案a", start: "新北市板橋區板新路27號", end: "新北市板橋區板新路27號新北市板橋區板新路27號" },
    ]

    return (
        <>
            <BasicContainer
                theme={laptopL.buttonContainer}
            >
                {/* 新增常用路線 */}
                <NativeLineButton
                    baseDefaultTheme={"DefaultTheme"}
                    disable={false}
                    type="button" // 防止提交
                    theme={laptopL.addRouteButton}
                    onClick={(e) => {
                        e.preventDefault();

                        let rowData = {};
                        history.push("/FastCallCar/Add")
                    }}
                >
                    {/* 新增常用路線 圖標 */}
                    <Plus style={laptopL.addRouteSvg} />
                    新增常用路線
                </NativeLineButton>
            </BasicContainer>

            <OldTable
                dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                    globalContextService.remove("CaseNewsComponentPage", "CheckedRowKeys");
                    globalContextService.remove("CaseNewsComponentPage", "CheckedRowsData");
                }}
                checkbox={false}
                // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                checkedRowKeyName={"id"}
                checkboxOnChecked={
                    (checkedRowKeys, checkedRows) => {
                        // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                        globalContextService.set("CaseNewsComponentPage", "CheckedRowKeys", checkedRowKeys);
                        globalContextService.set("CaseNewsComponentPage", "CheckedRowsData", checkedRows);
                    }
                }
                setPerCheckBoxDisabled={(record) => {
                    return {
                        // ...record, // 對應CheckBox當列資料
                        // disabled: record.name === 'Edrward 11',
                    }
                }}
                //scrollAreaWidth={"calc( 1900px - 300px )"} // 不用傳 會自適應寬度
                //scrollAreaHeight={"calc( 100% - 55px )"}
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
                        //#region 身分
                        {
                            title: '身分',
                            width: "96px",
                            dataIndex: 'identity',
                            // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                            // fixed: 'left',
                            render: (rowData) => {
                                const statusMapping = (status, getTheme = false) => {
                                    switch (toString(status)) {
                                        case "1":
                                            return (getTheme ? laptopL.fastCallCarIdentityTag.case : "長照");
                                        case "2":
                                            return (getTheme ? laptopL.fastCallCarIdentityTag.white : "共享車隊");
                                        case "3":
                                            return (getTheme ? laptopL.fastCallCarIdentityTag.bus : "巴士");
                                        default:
                                            return (getTheme ? laptopL.fastCallCarIdentityTag.unknown : "無此身份");
                                    }
                                }

                                return (
                                    <>
                                        <Tag
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={statusMapping(rowData, true)}
                                            text={statusMapping(rowData)}
                                        />
                                    </>
                                )
                            }
                        },
                        //#endregion
                        //#region 路線名稱
                        {
                            title: '路線名稱',
                            width: "134px",
                            dataIndex: 'roadName',
                            // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                            // fixed: 'left',
                            render: (rowData) => {
                                return (
                                    <>
                                        <Text
                                            theme={laptopL.routeText}
                                        >
                                            {rowData}
                                        </Text>
                                    </>
                                )
                            }
                        },
                        //#endregion
                        //#region 起訖點
                        {
                            title: '起訖點',
                            width: "231px",
                            // dataIndex: 'startToEnd',
                            // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                            // fixed: 'left',
                            render: (allRowData) => {
                                return (
                                    <>
                                        {/* 起點 */}
                                        <Text
                                            theme={laptopL.startText}
                                        >
                                            <Start style={laptopL.startSvg} />
                                            {allRowData.start}
                                        </Text>

                                        {/* 迄點 */}
                                        <Text
                                            theme={laptopL.endText}
                                        >
                                            <End style={laptopL.endSvg} />
                                            {allRowData.end}
                                        </Text>

                                    </>
                                )
                            }
                        },
                        //#endregion
                        //#region 操作
                        {
                            title: '操作',
                            width: "242px",
                            // dataIndex: 'announce',
                            // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                            fixed: 'right',
                            render: (allRowData) => {
                                return (
                                    <>
                                        {/* 預約訂車 */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={laptopL.callCarButton}
                                            onClick={(e) => {
                                                e.preventDefault();

                                                let rowData = {};

                                            }}
                                        >
                                            {/* 預約訂車 圖標 */}
                                            <CallCar style={laptopL.callCarSvg} />
                                            預約訂車
                                        </NativeLineButton>

                                        {/* 編輯 */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // 防止提交
                                            theme={laptopL.editButton}
                                            onClick={(e) => {
                                                e.preventDefault();

                                                let rowData = {};
                                                history.push("/FastCallCar/Edit")
                                            }}
                                        >
                                            {/* 編輯 圖標 */}
                                            <Edit style={laptopL.editSvg} />
                                            編輯
                                        </NativeLineButton>

                                        <SubContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptopL.dropDownContainer}
                                        >
                                            <DropDown
                                                placement={"topCenter"}
                                                dropDownItem={
                                                    <>
                                                        {/* DropDown 項目容器 */}
                                                        <BasicContainer
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.dropDownItemContainer}>
                                                            {/* DropDown 子項目 */}
                                                            <Text
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                theme={laptopL.dropDownSubItemContainer}
                                                            >
                                                                <Tip style={laptopL.tipSvg} />
                                                                確定刪除此路線。
                                                            </Text>

                                                            {/* 取消 */}
                                                            <NativeLineButton
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                disable={false}
                                                                type="button" // 防止提交
                                                                theme={laptopL.cancelButton}
                                                                onClick={(e) => {
                                                                    e.preventDefault();

                                                                    let rowData = {};

                                                                }}
                                                            >
                                                                取消
                                                            </NativeLineButton>

                                                            {/* 確認 */}
                                                            <NativeLineButton
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                disable={false}
                                                                type="button" // 防止提交
                                                                theme={laptopL.submitButton}
                                                                onClick={(e) => {
                                                                    e.preventDefault();

                                                                    let rowData = {};

                                                                }}
                                                            >
                                                                確認
                                                            </NativeLineButton>

                                                        </BasicContainer>
                                                    </>
                                                }
                                            >
                                                {/* 刪除 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={laptopL.deleteButton}
                                                    onClick={(e) => {
                                                        e.preventDefault();

                                                        let rowData = {};

                                                    }}
                                                >
                                                    {/* 刪除 圖標 */}
                                                    <Del style={laptopL.deleteSvg} />
                                                    刪除
                                                </NativeLineButton>
                                            </DropDown>
                                        </SubContainer>

                                    </>
                                )
                            }
                        },
                        //#endregion

                    ]
                    //#endregion
                }
                //sort
                //showHeader={false}
                // data={ }
                data={data}
                // data={props.AllClient.data}
                clickPage={(currentPage, pageSize) => {
                }}
            />

        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`