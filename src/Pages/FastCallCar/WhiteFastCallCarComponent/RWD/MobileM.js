import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { CardTable } from '../../../../ProjectComponent/CardTable/CardTable'
import { ReactComponent as Plus } from '../../../../Assets/img/FastCallCarPage/Plus2.svg'
import { ReactComponent as Edit } from '../../../../Assets/img/FastCallCarPage/Edit.svg'
import { ReactComponent as End } from '../../../../Assets/img/FastCallCarPage/End.svg'
import { ReactComponent as Start } from '../../../../Assets/img/FastCallCarPage/Start.svg'
import { ReactComponent as Del } from '../../../../Assets/img/FastCallCarPage/Del.svg'
import { ReactComponent as CallCar } from '../../../../Assets/img/FastCallCarPage/CallCar.svg'
import { ReactComponent as NoData } from '../../../../Assets/img/FastCallCarPage/NoData.svg'
import { ReactComponent as Tip } from '../../../../Assets/img/FastCallCarPage/Tip.svg'
import { useHistory } from 'react-router-dom';
import { Tag,DropDown, DateTimePicker, BasicContainer, FormContainer, FormRow, Checkbox, CheckboxItem, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { toString } from 'lodash/lang';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { fastCallCar: { whiteFastCallCar: { rwd: { mobileM } } } } } = Theme;
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();
    let history = useHistory();

    const statusMapping = (status, getTheme = false) => {
        switch (toString(status)) {
            case "1":
                return (getTheme ? mobileM.fastCallCarIdentityTag.case : "長照");
            case "2":
                return (getTheme ? mobileM.fastCallCarIdentityTag.white : "共享車隊");
            case "3":
                return (getTheme ? mobileM.fastCallCarIdentityTag.bus : "巴士");
            default:
                return (getTheme ? mobileM.fastCallCarIdentityTag.unknown : "無此身份");
        }
    }

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
            {data.filter( X => X.identity === "2" ).length === 0
                ?
                <>
                    {/* 無資料表單區容器 */}
                    < BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        height={Height}
                        theme={mobileM.noDataContainer}
                    >
                        <NoData />
                    </BasicContainer>
                </>
                :
                <>
                    {/* 新增常用路線 */}
                    <NativeLineButton
                        baseDefaultTheme={"DefaultTheme"}
                        disable={false}
                        type="button" // 防止提交
                        theme={mobileM.addRouteButton}
                        onClick={(e) => {
                            e.preventDefault();

                            let rowData = {};
                            history.push("/FastCallCar/Add")
                        }}
                    >
                        {/* 新增常用路線 圖標 */}
                        <Plus style={mobileM.addRouteSvg} />
                    </NativeLineButton>
                    {
                        <CardTable
                            dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                            dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                                if (globalContextService.get("RocordPage", "orgId") !== globalContextService.get("RocordPage", "TableCheckedClearKey")) {
                                    globalContextService.remove("RocordPage", "CheckedRowKeys");
                                    globalContextService.remove("RocordPage", "CheckedRowsData");
                                }
                            }}
                            checkbox={false}
                            checked={globalContextService.get("RocordPage", "CheckedRowKeys") && globalContextService.get("RocordPage", "CheckedRowKeys")}
                            checkedRowKeyName={"id"}
                            checkboxOnChecked={
                                (checkedRowKeys, checkedRows) => {
                                    // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                    globalContextService.set("RocordPage", "CheckedRowKeys", checkedRowKeys);
                                    globalContextService.set("RocordPage", "CheckedRowsData", checkedRows);
                                    //#region 必須要在勾選項"有異動"之後除˙存一個可判斷值，以保持"已異動勾選項"不被重置
                                    //#endregion
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
                                        // title: '用戶列表',
                                        width: "100%",
                                        dataIndex: '',
                                        // sorter: (a, b) => a.carType.length - b.carType.length,
                                        // fixed: 'left',
                                        render: (rowData) => {
                                            return (
                                                <>
                                                    {/* 資料外框容器 */}
                                                    <BasicContainer
                                                        theme={mobileM.outsideContainer}
                                                    >
                                                        {/* 路線欄位 容器 */}
                                                        <BasicContainer
                                                            theme={mobileM.routeContainer}
                                                        >
                                                            {/* 身分標籤 */}
                                                            <Tag
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                theme={statusMapping(rowData.identity, true)}
                                                                text={statusMapping(rowData.identity)}
                                                            />

                                                            {/* 路線名稱 標題 */}
                                                            <Text
                                                                theme={mobileM.routeTitle}
                                                            >
                                                                路線名稱
                                                
                                                                {/* 路線名稱 內文 */}
                                                                <Text
                                                                    theme={mobileM.routeText}
                                                                >
                                                                    {rowData.roadName}
                                                                </Text>
                                                            </Text>
                                                        </BasicContainer>

                                                        {/* 起訖點 容器 */}
                                                        <BasicContainer
                                                        theme={mobileM.startToEndContainer}
                                                    >
                                                        {/* 起點 */}
                                                        <Text
                                                            theme={mobileM.startText}
                                                        >
                                                            <Start style={mobileM.startSvg} />
                                                            {rowData.start}
                                                        </Text>

                                                        {/* 迄點 */}
                                                        <Text
                                                            theme={mobileM.endText}
                                                        >
                                                            <End style={mobileM.endSvg} />
                                                            {rowData.end}
                                                        </Text>

                                                    </BasicContainer>

                                                        {/* 按鈕 容器 */}
                                                        <BasicContainer
                                                        theme={mobileM.buttonContainer}
                                                    >
                                                        {/* 預約訂車 */}
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // 防止提交
                                                            theme={mobileM.callCarButton}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                            
                                                                let rowData = {};
                                                            
                                                            }}
                                                        >
                                                            {/* 預約訂車 圖標 */}
                                                            <CallCar style={mobileM.callCarSvg} />
                                                                                預約訂車
                                                        </NativeLineButton>
                                                        
                                                        {/* 編輯 */}
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // 防止提交
                                                            theme={mobileM.editButton}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                            
                                                                let rowData = {};
                                                                history.push("/FastCallCar/Edit")
                                                            }}
                                                        >
                                                            {/* 編輯 圖標 */}
                                                            <Edit style={mobileM.editSvg} />
                                                                                編輯
                                                        </NativeLineButton>
                                                        
                                                        <SubContainer
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={mobileM.dropDownContainer}
                                                        >
                                                            <DropDown
                                                                placement={"topCenter"}
                                                                dropDownItem={
                                                                    <>
                                                                        {/* DropDown 項目容器 */}
                                                                        <BasicContainer
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            theme={mobileM.dropDownItemContainer}>
                                                                            {/* DropDown 子項目 */}
                                                                            <Text
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                theme={mobileM.dropDownSubItemContainer}
                                                                            >
                                                                                <Tip style={mobileM.tipSvg} />
                                                                                確定刪除此路線。
                                                                            </Text>
                                                                
                                                                            {/* 取消 */}
                                                                            <NativeLineButton
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                disable={false}
                                                                                type="button" // 防止提交
                                                                                theme={mobileM.cancelButton}
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
                                                                                theme={mobileM.submitButton}
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
                                                                    theme={mobileM.deleteButton}
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                    
                                                                        let rowData = {};
                                                                    
                                                                    }}
                                                                >
                                                                    {/* 刪除 圖標 */}
                                                                    <Del style={mobileM.deleteSvg} />
                                                                    刪除
                                                                </NativeLineButton>
                                                            </DropDown>
                                                        </SubContainer>

                                                        
                                                    </BasicContainer>
                                                    </BasicContainer>   
                                                </>
                                            )
                                        }
                                    },

                                ]
                                //#endregion
                            }
                            //sort
                            showHeader={false}
                            data={data.filter( X => X.identity === "2" )}
                            clickPage={(currentPage, pageSize) => {
                            }}
                        />
                    }

                    {data.filter( X => X.identity === "2").length < 11 
                        &&
                        <>
                            <Text
                                theme={mobileM.noMoreData}
                            >
                                沒有更多路線
                            </Text>
                        </>
                    }
                </>
            }
        </>
    )

}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`

