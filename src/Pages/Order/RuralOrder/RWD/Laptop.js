import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService, RangeDateTimePicker } from '../../../../Components';
import { ReactComponent as Search } from '../../../../Assets/img/RuralOrderPage/Search.svg'
import { ReactComponent as TableEnd } from '../../../../Assets/img/RuralOrderPage/TableEnd.svg'
import { ReactComponent as TableStart } from '../../../../Assets/img/RuralOrderPage/TableStart.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { order: { ruralOrder: { rwd: { laptop } } } } } = Theme;
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"偏鄉運能不足預約訂單"}
                            theme={laptop.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/* 查詢日期區間 DateTimeRange  */}
                            <RangeDateTimePicker
                                topLabel={<></>}
                                // type={"time"} time、date、week、month、quarter、year
                                type={"date"}
                                format={"YYYY-MM-DD"}
                                bascDefaultTheme={"DefaultTheme"}
                                // viewType
                                isSearchable
                                placeholder={""}
                                value={
                                    (globalContextService.get("RuralOrderPage", "DateTimeRange") ?
                                        [moment(globalContextService.get("RuralOrderPage", "DateTimeRange")[0]), moment(globalContextService.get("RuralOrderPage", "DateTimeRange")[1])]
                                        :
                                        [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-06', "YYYY-MM-DD")]
                                    )
                                }
                                onChange={(value, momentObj) => {
                                    globalContextService.set("RuralOrderPage", "DateTimeRange", value);
                                }}
                                theme={laptop.dateTimeRange}
                            />

                            {/* 單選下拉選單 請選擇訂單狀態 OrderStatus*/}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                //viewType
                                isSearchable
                                placeholder={"請選擇訂單狀態"}
                                // isMulti
                                // hideSelectedOptions={false}
                                // value={globalContextService.get("RuralOrderPage", "OrderStatus") ?? { value: '1', label: '車行A'' }}
                                //value={globalContextService.get("RuralOrderPage", "OrderStatus") ?? [{ value: '1', label: '公費個案' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralOrderPage", "OrderStatus", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇訂單狀態", isDisabled: true },
                                    { value: '1', label: '全部訂單' },
                                    { value: '2', label: '新訂單' },
                                    { value: '3', label: '已排班' },
                                    { value: '4', label: '已出發' },
                                    { value: '5', label: '抵達搭車地點' },
                                    { value: '6', label: '客上' },
                                    { value: '7', label: '客下' },
                                    { value: '8', label: '完成' },
                                    { value: '9', label: '空趟' },
                                    { value: '10', label: '個案取消' },
                                    { value: '11', label: '服務單位取消' },
                                    { value: '12', label: '無派車' },
                                    { value: '13', label: '未執行' },
                                ]}
                                theme={laptop.orderStatus}

                            />

                            {/* 一般輸入框 請輸入關鍵字 Keyword*/}
                            <TextInput
                                bascDefaultTheme={"DefaultTheme"}
                                theme={laptop.keyword}
                                type="text"
                                placeholder={"請輸入關鍵字"}
                                rightIcon={
                                    <Search
                                        style={laptop.keywordRightIcon}
                                    />
                                }
                                value={globalContextService.get("RuralOrderPage", "Keyword") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("RuralOrderPage", "Keyword", value);
                                }}
                            />
                        </MainPageTitleBar>
                    </>
                }
            >

                {/* Table 容器 */}
                <BasicContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={laptop.tableContainer}
                >
                    <OldTable
                        checkbox={false}
                        // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                        checkedRowKeyName={"id"}
                        checkboxOnChecked={
                            (checkedRowKeys, checkedRows) => {
                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                globalContextService.set("RuralOrderPage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("RuralOrderPage", "CheckedRowsData", checkedRows);
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
                                    title: '姓名',
                                    width: "112px",
                                    dataIndex: 'userName',
                                    sorter: false,
                                    // fixed: 'left',
                                },
                                {
                                    title: '訂單狀態',
                                    width: "144px",
                                    dataIndex: 'status',
                                    sorter: false,
                                    // fixed: 'left',
                                    render: (rowData) => {
                                        const statusMapping = (status, getTheme = false) => {

                                            switch (status) {
                                                case 1:
                                                    return (getTheme ? laptop.dispatchStatusTag.newOrder : "新訂單");
                                                case 2:
                                                    return (getTheme ? laptop.dispatchStatusTag.assignedOrder : "已排班");
                                                case 3:
                                                    return (getTheme ? laptop.dispatchStatusTag.arrivalOrder : "抵達搭車地點");
                                                case 4:
                                                    return (getTheme ? laptop.dispatchStatusTag.customUpOrder : "客上");
                                                case 5:
                                                    return (getTheme ? laptop.dispatchStatusTag.finishedOrder : "已完成");
                                                case 9:
                                                    return (getTheme ? laptop.dispatchStatusTag.unitCancleOrder : "已取消");
                                                default:
                                                    return (getTheme ? {} : "無此狀態");
                                            }
                                        }

                                        return (
                                            <BasicContainer>
                                                {/* {console.log(rowData)} */}
                                                <>
                                                    {/*  訂單狀態 欄位 */}
                                                    <Text theme={laptop.dispatchStatusOnly} >
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={statusMapping(rowData, true)}
                                                            text={statusMapping(rowData)}
                                                        />
                                                    </Text>
                                                </>

                                            </BasicContainer>
                                        )
                                    }
                                },
                                {
                                    title: '乘車預約時間',
                                    width: "250px",
                                    dataIndex: 'reserveDate',
                                    // sorter: false,
                                    // fixed: 'left',
                                },
                                {
                                    title: '起迄點',
                                    width: "400px",
                                    // dataIndex: 'ordererId',
                                    sorter: (a, b) => a.ordererId - b.ordererId,
                                    // fixed: 'left',
                                    render: (rowData) => {
                                        return (
                                            <BasicContainer>
                                                {/* 起迄點 容器 */}
                                                <Text theme={laptop.fromAndToAddrOne} >

                                                    {/* 起點文字 */}
                                                    <Text theme={laptop.fromAddr}>

                                                        {/* 起點 圖標 */}
                                                        <TableStart style={laptop.fromAddrIcon} />
                                                        {rowData?.fromAddr}
                                                    </Text>

                                                    {/* 迄點文字 */}
                                                    <Text theme={laptop.toAddr} >

                                                        {/* 迄點 圖標 */}
                                                        <TableEnd style={laptop.toAddrIcon} />
                                                        {rowData?.toAddr}
                                                    </Text>
                                                </Text>
                                            </BasicContainer>
                                        )
                                    }
                                },
                                {
                                    title: '共乘',
                                    width: "112px",
                                    dataIndex: 'canShared',
                                    sorter: false,
                                    // fixed: 'left',
                                    render: (rowData) => {
                                        // console.log("rowData", rowData)
                                        return (
                                            <>
                                                {rowData ?
                                                    '是'
                                                    :
                                                    '否'
                                                }
                                            </>
                                        )
                                    }
                                },
                                {
                                    title: '車輛類型',
                                    width: "112px",
                                    dataIndex: 'carCategoryName',
                                    sorter: (a, b) => a.orderTime - b.orderTime,
                                    // fixed: 'left',
                                },
                                {
                                    title: '搭乘人數',
                                    width: "112px",
                                    dataIndex: 'passengerNum',
                                    sorter: (a, b) => a.resRideTime - b.resRideTime,
                                    // fixed: 'left',
                                },
                                {
                                    title: '所屬單位',
                                    width: "112px",
                                    dataIndex: 'orgName',
                                    sorter: false,
                                    // fixed: 'left',
                                },
                                {
                                    title: '狀態控制台',
                                    width: "576px",
                                    // dataIndex: 'parentName',
                                    sorter: false,
                                    fixed: 'right',
                                    render: (rowData) => {
                                        return (
                                            <>
                                                <Container>
                                                    {rowData.orderStatus === 2 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            // theme={laptop.newOrder}
                                                            theme={laptop.newOrder}
                                                            text={"新訂單"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 3 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.assignedOrder}
                                                            text={"已排班"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 4 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.goOrder}
                                                            text={"已出發"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 5 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.arrivalOrder}
                                                            text={"抵達搭車地點"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 6 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.customUpOrder}
                                                            text={"客上"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 7 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.customDownOrder}
                                                            text={"客下"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 8 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.finishedOrder}
                                                            text={"已完成"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 9 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.emptyOrder}
                                                            text={"空趟"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 10 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.customCancleOrder}
                                                            text={"個案取消"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 11 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.unitCancleOrder}
                                                            text={"服務單位取消"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 12 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.noAssignedOrder}
                                                            text={"無派車"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 13 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.noDoOrder}
                                                            text={"未執行"}
                                                        />
                                                    }

                                                    {/* 查看訂單按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptop.checkOrderButton}
                                                        onClick={() => { history.push("/Order/RuralOrder/RuralOrderView") }}
                                                    >查看訂單
                                                </NativeLineButton>

                                                    {/* 編輯訂單按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptop.editOrderButton}
                                                    // onClick={() => { history.push("/DriverAndCar/Cars/Edit") }}
                                                    >編輯訂單
                                                </NativeLineButton>

                                                    {/* 轉單按鈕 */}
                                                    {rowData.orderStatus === 2 &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // 防止提交
                                                            theme={laptop.forwardOrderButton}
                                                        // onClick={() => { history.push("/DriverAndCar/Cars/Edit") }}
                                                        >轉單
                                                </NativeLineButton>
                                                    }

                                                    {/* 修改狀態按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptop.changeStatusButton}
                                                    // onClick={() => { history.push("/DriverAndCar/Cars/Edit") }}
                                                    >修改狀態
                                                </NativeLineButton>

                                                    {/* 取消訂單按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptop.cancelOrderButton}
                                                    // onClick={() => { history.push("/DriverAndCar/Cars/Edit") }}
                                                    >取消訂單
                                                </NativeLineButton>
                                                    {/* 空趟記點按鈕 */}
                                                    {rowData.orderStatus === 9 &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // 防止提交
                                                            theme={laptop.emptyTripRecordButton}
                                                        // onClick={() => { history.push("/DriverAndCar/Cars/Edit") }} 
                                                        >空趟記點
                                                </NativeLineButton>
                                                    }

                                                </Container>
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
                        sort
                        //showHeader={false}
                        data={[
                            { userName: 'tester01', status: 2, reserveDate: "2020-12-02 04:04:00", fromAddr: "新北市政府警察局中和派出所", toAddr: "新北市板橋區板新路1號", canShared: false, carCategoryName: "一般車", passengerNum: 2, orgName: "黃金會" },
                            { userName: 'tester02', status: 1, reserveDate: "2020-12-02 04:04:00", fromAddr: "新北市政府警察局新莊派出所", toAddr: "新北市板橋區文化路一段路1號", canShared: true, carCategoryName: "福利車", passengerNum: 2, orgName: "黃金會" },
                        ]}
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

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`