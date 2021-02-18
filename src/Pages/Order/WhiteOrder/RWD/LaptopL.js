import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService, RangeDateTimePicker } from '../../../../Components';
import { ReactComponent as Search } from '../../../../Assets/img/WhiteOrderPage/Search.svg'
import { ReactComponent as TableEnd } from '../../../../Assets/img/WhiteOrderPage/TableEnd.svg'
import { ReactComponent as TableStart } from '../../../../Assets/img/WhiteOrderPage/TableStart.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { order: { whiteOrder: { rwd: { laptopL } } } } } = Theme;
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"白牌車預約訂單"}
                            theme={laptopL.titleBar}
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
                                    (globalContextService.get("WhiteOrderPage", "DateTimeRange") ?
                                        [moment(globalContextService.get("WhiteOrderPage", "DateTimeRange")[0]), moment(globalContextService.get("WhiteOrderPage", "DateTimeRange")[1])]
                                        :
                                        [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-06', "YYYY-MM-DD")]
                                    )
                                }
                                onChange={(value, momentObj) => {
                                    globalContextService.set("WhiteOrderPage", "DateTimeRange", value);
                                }}
                                theme={laptopL.dateTimeRange}
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
                                // value={globalContextService.get("WhiteOrderPage", "OrderStatus") ?? { value: '1', label: '車行A'' }}
                                //value={globalContextService.get("WhiteOrderPage", "OrderStatus") ?? [{ value: '1', label: '公費個案' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteOrderPage", "OrderStatus", value);
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
                                theme={laptopL.orderStatus}

                            />

                            {/* 一般輸入框 請輸入關鍵字 Keyword*/}
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
                                value={globalContextService.get("WhiteOrderPage", "Keyword") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteOrderPage", "Keyword", value);
                                }}
                            />
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
                        checkbox={false}
                        // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                        checkedRowKeyName={"id"}
                        checkboxOnChecked={
                            (checkedRowKeys, checkedRows) => {
                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                globalContextService.set("WhiteOrderPage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("WhiteOrderPage", "CheckedRowsData", checkedRows);
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
                                                    return (getTheme ? laptopL.dispatchStatusTag.newOrder : "新訂單");
                                                case 2:
                                                    return (getTheme ? laptopL.dispatchStatusTag.assignedOrder : "已排班");
                                                case 3:
                                                    return (getTheme ? laptopL.dispatchStatusTag.arrivalOrder : "抵達搭車地點");
                                                case 4:
                                                    return (getTheme ? laptopL.dispatchStatusTag.customUpOrder : "客上");
                                                case 5:
                                                    return (getTheme ? laptopL.dispatchStatusTag.finishedOrder : "已完成");
                                                case 9:
                                                    return (getTheme ? laptopL.dispatchStatusTag.unitCancleOrder : "已取消");
                                                default:
                                                    return (getTheme ? {} : "無此狀態");
                                            }
                                        }

                                        return (
                                            <BasicContainer>
                                                {/* {console.log(rowData)} */}
                                                <>
                                                    {/*  訂單狀態 欄位 */}
                                                    <Text theme={laptopL.dispatchStatusOnly} >
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
                                                <Text theme={laptopL.fromAndToAddrOne} >

                                                    {/* 起點文字 */}
                                                    <Text theme={laptopL.fromAddr}>

                                                        {/* 起點 圖標 */}
                                                        <TableStart style={laptopL.fromAddrIcon} />
                                                        {rowData?.fromAddr}
                                                    </Text>

                                                    {/* 迄點文字 */}
                                                    <Text theme={laptopL.toAddr} >

                                                        {/* 迄點 圖標 */}
                                                        <TableEnd style={laptopL.toAddrIcon} />
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
                                                            // theme={LaptopL.newOrder}
                                                            theme={laptopL.newOrder}
                                                            text={"新訂單"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 3 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.assignedOrder}
                                                            text={"已排班"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 4 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.goOrder}
                                                            text={"已出發"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 5 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.arrivalOrder}
                                                            text={"抵達搭車地點"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 6 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.customUpOrder}
                                                            text={"客上"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 7 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.customDownOrder}
                                                            text={"客下"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 8 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.finishedOrder}
                                                            text={"已完成"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 9 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.emptyOrder}
                                                            text={"空趟"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 10 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.customCancleOrder}
                                                            text={"個案取消"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 11 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.unitCancleOrder}
                                                            text={"服務單位取消"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 12 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.noAssignedOrder}
                                                            text={"無派車"}
                                                        />
                                                    }
                                                    {rowData.orderStatus === 13 &&
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.noDoOrder}
                                                            text={"未執行"}
                                                        />
                                                    }

                                                    {/* 查看訂單按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptopL.checkOrderButton}
                                                        onClick={() => { history.push("/Order/WhiteOrder/WhiteOrderView") }}
                                                    >查看訂單
                                                </NativeLineButton>

                                                    {/* 編輯訂單按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptopL.editOrderButton}
                                                    // onClick={() => { history.push("/DriverAndCar/Cars/Edit") }}
                                                    >編輯訂單
                                                </NativeLineButton>

                                                    {/* 轉單按鈕 */}
                                                    {rowData.orderStatus === 2 &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // 防止提交
                                                            theme={laptopL.forwardOrderButton}
                                                        // onClick={() => { history.push("/DriverAndCar/Cars/Edit") }}
                                                        >轉單
                                                </NativeLineButton>
                                                    }

                                                    {/* 修改狀態按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptopL.changeStatusButton}
                                                    // onClick={() => { history.push("/DriverAndCar/Cars/Edit") }}
                                                    >修改狀態
                                                </NativeLineButton>

                                                    {/* 取消訂單按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptopL.cancelOrderButton}
                                                    // onClick={() => { history.push("/DriverAndCar/Cars/Edit") }}
                                                    >取消訂單
                                                </NativeLineButton>
                                                    {/* 空趟記點按鈕 */}
                                                    {rowData.orderStatus === 9 &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // 防止提交
                                                            theme={laptopL.emptyTripRecordButton}
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
                        data={props.AllWhiteOrder.data}
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