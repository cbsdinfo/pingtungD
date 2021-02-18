import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../../Components';
import { ReactComponent as Search } from '../../../../Assets/img/CarsPage/Search.svg'
import { ReactComponent as Plus } from '../../../../Assets/img/CarsPage/Plus.svg'
import { ReactComponent as ToView } from '../../../../Assets/img/CarsPage/ToView.svg'
import { ReactComponent as Trash } from '../../../../Assets/img/CarsPage/Trash.svg'
import { ReactComponent as UnLock } from '../../../../Assets/img/CarsPage/UnLock.svg'
import { ReactComponent as TableDisable } from '../../../../Assets/img/CarsPage/TableDisable.svg'
import { ReactComponent as TableEdit } from '../../../../Assets/img/CarsPage/TableEdit.svg'
import { ReactComponent as TableEnable } from '../../../../Assets/img/CarsPage/TableEnable.svg'
import { useHistory } from 'react-router-dom';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cars: { rwd: { tablet } } } } = Theme;
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"車輛資料"}
                            theme={tablet.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/* 匯入司機車輛資料按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 匯入司機車輛資料按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.importButton}
                                // onClick={() => { history.push("/Case/Add") }}
                                >匯入司機車輛資料
                                </NativeLineButton>
                                {/* 下載匯入範本按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.downloadButton}
                                // onClick={() => { history.push("/Case/Add") }}
                                >下載匯入範本
                                </NativeLineButton>
                                {/* 新增車輛按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.addButton}
                                    onClick={() => { history.push("/DriverAndCar/Cars/Add") }}
                                >
                                    {/* 新增車輛按鈕 圖標 */}
                                    <Plus style={tablet.addButtonIcon} />
                                新增車輛
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                        <FormContainer theme={tablet.formContainer}>
                            <FormRow>
                                {/* 單選下拉選單 請選擇單位 */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                    //viewType
                                    isSearchable
                                    placeholder={"請選擇單位"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    // value={globalContextService.get("CarsPage", "CaseCapacity") ?? { value: '1', label: '車行A'' }}
                                    //value={globalContextService.get("CarsPage", "CaseCapacity") ?? [{ value: '1', label: '公費個案' }]}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsPage", "CaseCapacity", value);
                                    }}

                                    options={[
                                        { value: '0', label: "請選擇單位", isDisabled: true },
                                        { value: '1', label: '車行A' },
                                        { value: '2', label: '車行B' }
                                    ]}
                                    theme={tablet.unit}

                                />
                                {/* 一般輸入框 請輸入關鍵字  */}
                                <TextInput
                                    bascDefaultTheme={"DefaultTheme"}
                                    theme={tablet.keyword}
                                    type="text"
                                    placeholder={"請輸入關鍵字"}
                                    rightIcon={
                                        <Search
                                            style={tablet.keywordRightIcon}
                                        />
                                    }
                                    value={globalContextService.get("CarsPage", "Keyword") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarsPage", "Keyword", value);
                                    }}
                                />
                            </FormRow>
                        </FormContainer>
                    </>
                }
            >

                {/* Table 容器 */}
                <BasicContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={tablet.tableContainer}
                >
                    <OldTable
                        checkbox={false}
                        // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                        checkedRowKeyName={"id"}
                        checkboxOnChecked={
                            (checkedRowKeys, checkedRows) => {
                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                globalContextService.set("CarsPage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("CarsPage", "CheckedRowsData", checkedRows);
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
                                    title: '車牌號碼',
                                    width: "152px",
                                    dataIndex: 'carNo',
                                    sorter: (a, b) => a.carNo.length - b.carNo.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '車輛類別',
                                    width: "152px",
                                    dataIndex: 'carCategoryName',
                                    // 要改成 吃props.CarType 的名字
                                    // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '廠牌型號',
                                    width: "156px",
                                    dataIndex: 'factoryType',
                                    // sorter: (a, b) => a.factoryType.length - b.factoryType.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '輪椅數量',
                                    width: "152px",
                                    dataIndex: 'wheelchairNum',
                                    // sorter: (a, b) => a.wheelchairNum.length - b.wheelchairNum.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '座椅數量',
                                    width: "152px",
                                    dataIndex: 'seatNum',
                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '司機姓名',
                                    width: "132px",
                                    dataIndex: 'driverName',
                                    // sorter: (a, b) => a.driverName.length - b.driverName.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '狀態控制台',
                                    width: "256px",
                                    // dataIndex: 'parentName',
                                    // sorter: (a, b) => a.name.length - b.name.length,
                                    fixed: 'right',
                                    render: (rowData) => {
                                        return (
                                            <>
                                                {rowData.status === 0 ?
                                                    <Tag
                                                        baseDefaultTheme={"SecondaryTheme"}
                                                        theme={{
                                                            container: {
                                                                basic: (style, props) => ({
                                                                    ...style,
                                                                    margin: "0",
                                                                    padding: "0px 7px",
                                                                    fontSize: "12px",
                                                                    lineHeight: "20px"
                                                                }),
                                                                hover: {}
                                                            }
                                                        }}
                                                        text={"不可派發"}
                                                    />
                                                    :
                                                    <Tag
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={{
                                                            container: {
                                                                basic: (style, props) => ({
                                                                    ...style,
                                                                    margin: "0",
                                                                    padding: "0px 7px",
                                                                    fontSize: "12px",
                                                                    color: "#FA8C16",
                                                                    lineHeight: "20px",
                                                                    backgroundColor: "#FFF7E6",
                                                                    borderColor: "#FFD591"

                                                                }),
                                                                hover: {}
                                                            }
                                                        }}
                                                        text={"可派發"}
                                                    />
                                                }
                                                {/* 編輯按鈕 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={tablet.editButton}
                                                    onClick={() => { history.push(`/DriverAndCar/Cars/Edit?carsId=${rowData.id}`) }}
                                                >編輯
                                                    </NativeLineButton>

                                                {/* 檢視按鈕 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={tablet.toViewButton}
                                                    onClick={() => { history.push(`/DriverAndCar/Cars/Information?carsId=${rowData.id}`) }}
                                                >檢視
                                                    </NativeLineButton>

                                                {/* 刪除按鈕 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={tablet.deleteButton}
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
                                                                props.CarsDelExecute([rowData.id])
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
                        // data={[{ id: "asdasd-415asd1sa5d-asd", carType: "一般車", seat: 6, brandModel: "BMW", wheelchairCount: 1, name: "名", uid: "G12312512", sex: "男", cellphone: "0987854555", carNumber: "N8N-6541", status: 1 },
                        // { id: "asdasd-425asd1sa5d-asd", carType: "一般車", seat: 4, brandModel: "HONDA", wheelchairCount: 2, name: "名", uid: "G12312512", sex: "女", cellphone: "0987854666", carNumber: "N8N-6542", status: 0 }]}
                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                        data={props.AllCars.data}
                        clickPage={(currentPage, pageSize) => {
                        }}
                    />
                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
`