import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../../Components';
import { ReactComponent as Search } from '../../../../Assets/img/BusRoutePage/Search.svg'
import { ReactComponent as Plus } from '../../../../Assets/img/BusRoutePage/Plus.svg'
import { ReactComponent as EditPen } from '../../../../Assets/img/BusRoutePage/EditPen.svg'
import { ReactComponent as Del } from '../../../../Assets/img/BusRoutePage/Delete.svg'
import { useHistory } from 'react-router-dom';
import { fmt } from '../../../../Handlers/DateHandler';
import moment from 'moment';
import { weekDayChMapping } from '../../../../Mappings/Mappings'

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { busRoute: { rwd: { laptopL } } } } = Theme;
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"路線管理"}
                            theme={laptopL.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/* 一般輸入框 請輸入關鍵字  */}
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
                                value={globalContextService.get("BusRoutePage", "Keyword") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusRoutePage", "Keyword", value);
                                }}
                            />
                            {/* 新增按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 新增按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.addButton}
                                    onClick={() => {
                                        history.push("/BusRouteAndStop/BusRoute/Add")
                                    }}
                                >

                                    <Plus style={laptopL.addButtonIcon} />
                                新增
                                </NativeLineButton>
                                {/* 編輯按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.toEditButton}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        let checkedRowsData = globalContextService.get("BusRoutePage", "CheckedRowsData");
                                        //#region 都沒選、選超過一個
                                        if ((checkedRowsData?.length ?? 0) === 0 || checkedRowsData?.length > 1) {
                                            modalsService.infoModal.error({
                                                iconRightText: "只能選一條路線進行編輯。",
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
                                            history.push(`/BusRouteAndStop/BusRoute/Edit?id=${rowData.id}`)
                                        }
                                    }}
                                >
                                    <EditPen style={laptopL.toEditButtonIcon} />
                                編輯
                                </NativeLineButton>
                                {/* 刪除按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.toDeleteButton}
                                    onClick={() => {
                                        let checkedRowsData = globalContextService.get("BusRoutePage", "CheckedRowsData");
                                        if ((checkedRowsData?.length ?? 0) === 0) {
                                            modalsService.infoModal.error({
                                                iconRightText: "至少選一條路線進行刪除。",
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
                                                    props.BusuRouteDelExecute(globalContextService.get("BusRoutePage", "CheckedRowKeys")) // 批次刪除
                                                    close();
                                                }
                                            })
                                        }
                                    }}
                                >
                                    <Del style={laptopL.toDeleteButtonIcon} />
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
                        checkbox={true}
                        // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                        checkedRowKeyName={"id"}
                        checkboxOnChecked={
                            (checkedRowKeys, checkedRows) => {
                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                globalContextService.set("BusRoutePage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("BusRoutePage", "CheckedRowsData", checkedRows);
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
                                    }
                                    // sorter: (a, b) => a.createTime.length - b.createTime.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '路線名稱(中文)',
                                    width: "168px",
                                    dataIndex: 'name',
                                    // sorter: (a, b) => a.chRouteName.length - b.chRouteName.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '路線名稱(英文)',
                                    width: "168px",
                                    dataIndex: 'lineCode',
                                    // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '行駛日',
                                    width: "364px",
                                    dataIndex: 'workWeek',
                                    render: (rowData) => {
                                        return `${rowData?.split(",").map((day) => weekDayChMapping[day]).join()}`
                                    }
                                    // sorter: (a, b) => a.workDate.length - b.workDate.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '排序',
                                    width: "100px",
                                    dataIndex: 'sort',
                                    // sorter: (a, b) => a.seat.length - b.seat.length,
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
                                                        history.push(`/BusRouteAndStop/BusRoute/Edit?id=${rowData.id}`)
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
                                                        modalsService.infoModal.warn({
                                                            iconRightText: "是否確定進行刪除。",
                                                            yes: true,
                                                            yesText: "確認",
                                                            no: true,
                                                            noText: "取消",
                                                            // autoClose: true,
                                                            backgroundClose: false,
                                                            yesOnClick: (e, close) => {
                                                                props.BusuRouteDelExecute([rowData.id])
                                                                close();
                                                            }
                                                        })
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
                        data={props.AllBusStationLiness.data}
                        // data={[
                        //     { id: "asdasd-415asd1sa5d-asd", createTime: "2020-12-12", chRouteName: "秀巒 1 線", enRouteName: "Abcdefghijklmnopq", workDate: "星期四、星期五", sort: 1 },
                        //     { id: "asdasd-415asc1sa5d-asd", createTime: "2020-12-13", chRouteName: "秀巒 1 線", enRouteName: "Abcdefghijklmnopq", workDate: "星期四、星期五", sort: 0 },
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