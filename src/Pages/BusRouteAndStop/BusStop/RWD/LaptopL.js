import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../../Components';
import { ReactComponent as Search } from '../../../../Assets/img/BusStop/Search.svg'
import { ReactComponent as Plus } from '../../../../Assets/img/BusStop/Plus.svg'
import { ReactComponent as Del } from '../../../../Assets/img/BusStop/Del.svg'
import { ReactComponent as Edit } from '../../../../Assets/img/BusStop/Edit.svg'
import { useHistory } from 'react-router-dom';
import { fmt } from '../../../../Handlers/DateHandler';
import moment from 'moment';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    const { pages: { busStop: { rwd: { laptopL } } } } = Theme;
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"站牌管理"}
                            theme={laptopL.titleBar}
                        >

                            {/* 一般輸入框 關鍵字 Keyword  */}
                            <TextInput
                                bascDefaultTheme={"DefaultTheme"}
                                theme={laptopL.keyword}
                                type="text"
                                placeholder={"請輸入關鍵字"}
                                rightIcon={
                                    <Search
                                        style={laptopL.keywordRightIcon}
                                    />
                                }
                                value={globalContextService.get("BusStopPage", "Keyword") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusStopPage", "Keyword", value);
                                }}
                            />

                            {/* 按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 新增按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.titleAddButton}
                                    onClick={() => {
                                        history.push("/BusRouteAndStop/BusStop/Add")
                                    }}
                                >
                                    {/* 新增司機按鈕 圖標 */}
                                    <Plus style={laptopL.titleAddButtonIcon} />
                                    新增
                                </NativeLineButton>

                                {/* 編輯按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.titleEditButton}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        let checkedRowsData = globalContextService.get("BusStopPage", "CheckedRowsData");
                                        //#region 都沒選、選超過一個
                                        if ((checkedRowsData?.length ?? 0) === 0 || checkedRowsData?.length > 1) {
                                            modalsService.infoModal.error({
                                                iconRightText: "只能選一個站牌進行編輯。",
                                                yes: true,
                                                yesText: "確認",
                                                // no: true,
                                                // autoClose: true,
                                                backgroundClose: false,
                                                yesOnClick: (e, close) => {
                                                    close();
                                                }
                                            })
                                        }
                                        //#endregion
                                        //#region 選一個
                                        else {
                                            let rowData = { ...checkedRowsData[0] };
                                            history.push(`/BusRouteAndStop/BusStop/Edit?stationId=${rowData.id}`)
                                        }
                                    }}
                                >
                                    {/* 編輯按鈕 圖標 */}
                                    <Edit style={laptopL.titleEditButtonIcon} />
                                    編輯
                                </NativeLineButton>

                                {/* 刪除按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.titleDelButton}
                                    onClick={() => {
                                        let checkedRowsData = globalContextService.get("BusStopPage", "CheckedRowsData");
                                        if ((checkedRowsData?.length ?? 0) === 0) {
                                            modalsService.infoModal.error({
                                                iconRightText: "至少選一個站牌進行刪除。",
                                                yes: true,
                                                yesText: "確認",
                                                // no: true,
                                                // autoClose: true,
                                                backgroundClose: false,
                                                yesOnClick: (e, close) => {
                                                    close();
                                                }
                                            })
                                        }
                                        //#region 
                                        else {
                                            modalsService.infoModal.warn({
                                                iconRightText: "是否確定進行刪除。",
                                                yes: true,
                                                yesText: "確認",
                                                no: true,
                                                noText: "取消",
                                                // autoClose: true,
                                                backgroundClose: false,
                                                yesOnClick: (e, close) => {
                                                    props.BusStationDelExecute(globalContextService.get("BusStopPage", "CheckedRowKeys")) // 批次刪除
                                                    close();
                                                }
                                            })
                                        }
                                        //#endregion
                                    }}
                                >
                                    {/* 刪除按鈕 圖標 */}
                                    <Del style={laptopL.titleDelButtonIcon} />
                                    刪除
                                </NativeLineButton>

                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
            >
                {/* Table 容器 */}
                <BasicContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={laptopL.tableContainer}
                >
                    <OldTable
                        dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                        dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                            globalContextService.remove("BusStopPage", "CheckedRowKeys");
                            globalContextService.remove("BusStopPage", "CheckedRowsData");
                        }}
                        checkbox={true}
                        // checked={globalContextService.get("BusStopPage", "CheckedRowKeys") && globalContextService.get("BusStopPage", "CheckedRowKeys")}
                        checkedRowKeyName={"id"}
                        checkboxOnChecked={
                            (checkedRowKeys, checkedRows) => {
                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                globalContextService.set("BusStopPage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("BusStopPage", "CheckedRowsData", checkedRows);
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
                                {
                                    title: '建立時間',
                                    width: "164px",
                                    dataIndex: 'createDate',
                                    render: (rowData) => {
                                        return `${fmt(moment().startOf("day"), `YYYY-MM-DD`)}`
                                    },
                                    //sorter: (a, b) => a.name.length - b.name.length,
                                    fixed: 'left',
                                },
                                {
                                    title: '站牌名稱(中文)',
                                    width: "300px",
                                    dataIndex: 'stationName',
                                    // sorter: (a, b) => a.uid.length - b.uid.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '站牌名稱(英文)',
                                    width: "300px",
                                    dataIndex: 'stationCode',
                                    // sorter: (a, b) => a.sex.length - b.sex.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '經度',
                                    width: "100px",
                                    dataIndex: 'lon',
                                    // sorter: (a, b) => a.cellphone.length - b.cellphone.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '緯度',
                                    width: "100px",
                                    dataIndex: 'lat',
                                    // sorter: (a, b) => a.carNumber.length - b.carNumber.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '狀態控制台',
                                    width: "128px",
                                    // dataIndex: 'parentName',
                                    // sorter: (a, b) => a.name.length - b.name.length,
                                    fixed: 'right',
                                    render: (rowData) => {
                                        return (
                                            <>
                                                {/* 編輯按鈕 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={laptopL.editButton}
                                                    onClick={() => {
                                                        history.push(`/BusRouteAndStop/BusStop/Edit?stationId=${rowData.id}`)
                                                    }}
                                                >編輯
                                            </NativeLineButton>

                                                {/* 刪除按鈕 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={laptopL.deleteButton}
                                                    onClick={() => {
                                                        //#region
                                                        modalsService.infoModal.warn({
                                                            iconRightText: "是否確定進行刪除。",
                                                            yes: true,
                                                            yesText: "確認",
                                                            no: true,
                                                            noText: "取消",
                                                            // autoClose: true,
                                                            backgroundClose: false,
                                                            yesOnClick: (e, close) => {
                                                                props.BusStationDelExecute([rowData.id])
                                                                close();
                                                            }
                                                        })
                                                        //#endregion
                                                    }}
                                                >刪除
                                            </NativeLineButton>
                                            </>
                                        )
                                    }
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
                        //sort
                        //showHeader={false}
                        data={props.AllStation.data}
                        // data={[
                        //     { id: "1", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "2", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "3", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "4", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "5", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "6", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "7", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "8", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "9", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "10", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "11", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "12", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "13", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "14", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "15", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "16", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "17", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "18", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "19", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "20", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        //     { id: "21", createtime: "2020-11-11", cstopname: "版新站", estopname: "aaaaaaaaaaaaaaaaaaaaaaaaaaa", longitude: "13.5", latitude: "145.2" },
                        // ]}
                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                        // data={props.SubOrgs.data}
                        clickPage={(currentPage, pageSize) => {
                        }}
                    />
                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`